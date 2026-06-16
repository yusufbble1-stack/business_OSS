// ===== Wallet / Credit System — Data Store =====
// Manages credit balances, transactions, and wallet operations using Supabase

import { supabase, isDemoMode } from './supabase.js';
import { getCurrentUser } from './auth.js';

function uid() { return 'tx-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 7); }
function now() { return new Date().toISOString(); }
function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  return `${Math.floor(days / 30)}mo ago`;
}

// ===== WALLET OPERATIONS =====

/**
 * Get wallet balance and stats for a user
 * @param {string} [userId] - defaults to current user
 * @returns {Object} { balance, total_purchased, total_used, priority }
 */
export async function getWallet(userId) {
  const id = userId || getCurrentUser()?.id;
  if (!id) return { balance: 0, total_purchased: 0, total_used: 0, priority: 'Standard' };

  if (isDemoMode) {
    throw new Error('Demo mode disabled');
  }

  const { data, error } = await supabase
    .from('wallets')
    .select('*')
    .eq('user_id', id)
    .single();

  if (error) {
    console.error('[Wallet] Error fetching wallet:', error);
    return { user_id: id, balance: 0, total_purchased: 0, total_used: 0, priority: 'Standard' };
  }
  
  return data || { user_id: id, balance: 0, total_purchased: 0, total_used: 0, priority: 'Standard' };
}

/**
 * Get transaction history for a user
 * @param {string} [userId] - defaults to current user
 * @param {number} [limit] - max results
 * @returns {Array} sorted by date descending
 */
export async function getTransactions(userId, limit = 20) {
  const id = userId || getCurrentUser()?.id;
  if (!id) return [];

  if (isDemoMode) {
    throw new Error('Demo mode disabled');
  }

  const { data, error } = await supabase
    .from('transactions')
    .select('*')
    .eq('user_id', id)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('[Wallet] Error fetching transactions:', error);
    return [];
  }

  return (data || []).map(tx => ({ ...tx, time_ago: timeAgo(tx.created_at) }));
}

/**
 * Add credits to a user's wallet (called by webhook or admin)
 * @param {string} userId
 * @param {number} amount - number of credits to add
 * @param {string} description
 * @param {string} reference - payment reference
 * @param {string} referenceId - Payhip transaction ID
 * @returns {Object} transaction record
 */
export async function addCredits(userId, amount, description, reference, referenceId) {
  if (isDemoMode) throw new Error('Demo mode disabled');

  // Insert transaction (Unique index on reference_id + type prevents duplicates automatically)
  const { data: tx, error: txError } = await supabase
    .from('transactions')
    .insert({
      user_id: userId,
      type: 'credit',
      amount,
      description,
      reference,
      reference_id: referenceId
    })
    .select()
    .single();

  if (txError) {
    if (txError.code === '23505') { // Unique violation
      console.warn(`[Wallet] Duplicate credit attempt for reference ${referenceId}`);
      return null;
    }
    console.error('[Wallet] Error adding transaction:', txError);
    throw txError;
  }

  // Update wallet
  const currentWallet = await getWallet(userId);
  const newTotal = currentWallet.total_purchased + amount;
  let newPriority = currentWallet.priority;
  
  if (newTotal >= 30) newPriority = 'VIP';
  else if (newTotal >= 10) newPriority = 'High';
  else if (newTotal >= 5) newPriority = 'Priority';

  const { error: walletError } = await supabase
    .from('wallets')
    .update({
      balance: currentWallet.balance + amount,
      total_purchased: newTotal,
      priority: newPriority
    })
    .eq('user_id', userId);

  if (walletError) {
    console.error('[Wallet] Error updating wallet balance:', walletError);
  }

  return tx;
}

/**
 * Deduct credits from a user's wallet (called when submitting a file request)
 * @param {string} userId
 * @param {string} description - what the credit was used for
 * @param {string} referenceId - request ID
 * @param {number} [amount=1] - number of credits to deduct
 * @returns {Object|null} transaction or null if insufficient balance
 */
export async function useCredit(userId, description, referenceId, amount = 1) {
  if (isDemoMode) throw new Error('Demo mode disabled');

  const currentWallet = await getWallet(userId);
  if (currentWallet.balance < amount) {
    console.warn(`[Wallet] Insufficient credits for user ${userId} (need ${amount}, have ${currentWallet.balance})`);
    return null;
  }

  // Insert transaction
  const { data: tx, error: txError } = await supabase
    .from('transactions')
    .insert({
      user_id: userId,
      type: 'debit',
      amount,
      description,
      reference: `Request #${referenceId.substring(0,8)}`,
      reference_id: referenceId
    })
    .select()
    .single();

  if (txError) {
    console.error('[Wallet] Error inserting debit transaction:', txError);
    return null;
  }

  // Update wallet
  const { error: walletError } = await supabase
    .from('wallets')
    .update({
      balance: currentWallet.balance - amount,
      total_used: currentWallet.total_used + amount
    })
    .eq('user_id', userId);

  if (walletError) {
    console.error('[Wallet] Error updating wallet balance:', walletError);
  }

  return tx;
}

/**
 * Check if a user has enough credits
 * @param {string} [userId]
 * @param {number} [required=1]
 * @returns {boolean}
 */
export async function hasCredits(userId, required = 1) {
  const wallet = await getWallet(userId);
  return wallet.balance >= required;
}

/**
 * Get formatted stats for display
 * @param {string} [userId]
 * @returns {Object}
 */
export async function getWalletStats(userId) {
  const wallet = await getWallet(userId);
  const transactions = await getTransactions(userId);
  const rating = '4.9★'; // Mock — would come from reviews system

  return {
    balance: wallet.balance,
    filesProcessed: wallet.total_used,
    priority: wallet.priority,
    rating,
    recentTransactions: transactions,
  };
}

/**
 * Manually adjust user credits (admin action)
 * @param {string} userId
 * @param {number} amount - positive to add, negative to deduct
 * @param {string} description
 * @returns {Object|null} transaction record
 */
export async function adjustCredits(userId, amount, description) {
  if (isDemoMode) throw new Error('Demo mode disabled');
  if (amount === 0) return null;

  const type = amount > 0 ? 'credit' : 'debit';
  const absAmount = Math.abs(amount);
  const refId = `adj-${Date.now()}-${Math.random().toString(36).slice(2,7)}`;

  // Insert transaction
  const { data: tx, error: txError } = await supabase
    .from('transactions')
    .insert({
      user_id: userId,
      type,
      amount: absAmount,
      description,
      reference: 'Manual Adjustment',
      reference_id: refId
    })
    .select()
    .single();

  if (txError) {
    console.error('[Wallet] Error adjusting credits transaction:', txError);
    throw txError;
  }

  // Update wallet
  const currentWallet = await getWallet(userId);
  const newBalance = currentWallet.balance + amount;
  
  const updates = { balance: newBalance };
  if (amount > 0) {
    const newTotal = currentWallet.total_purchased + amount;
    updates.total_purchased = newTotal;
    
    let newPriority = currentWallet.priority;
    if (newTotal >= 30) newPriority = 'VIP';
    else if (newTotal >= 10) newPriority = 'High';
    else if (newTotal >= 5) newPriority = 'Priority';
    updates.priority = newPriority;
  } else {
    updates.total_used = currentWallet.total_used + absAmount;
  }

  const { error: walletError } = await supabase
    .from('wallets')
    .update(updates)
    .eq('user_id', userId);

  if (walletError) {
    console.error('[Wallet] Error updating wallet balance after adjustment:', walletError);
  }

  return tx;
}
