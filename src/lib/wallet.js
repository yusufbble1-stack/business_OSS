// ===== Wallet / Credit System — Data Store =====
// Manages credit balances, transactions, and wallet operations
// Works in demo mode (in-memory) or with Supabase when configured

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

// ===== DEMO WALLET DATA =====
const demoWallets = {
  'admin-1':    { user_id: 'admin-1',    balance: 99, total_purchased: 150, total_used: 51, priority: 'VIP' },
  'customer-1': { user_id: 'customer-1', balance: 12, total_purchased: 35,  total_used: 23, priority: 'High' },
  'customer-2': { user_id: 'customer-2', balance: 3,  total_purchased: 10,  total_used: 7,  priority: 'Priority' },
  'tech-1':     { user_id: 'tech-1',     balance: 0,  total_purchased: 0,   total_used: 0,  priority: 'Standard' },
};

const demoTransactions = [
  // Customer-1 transactions
  { id: 'tx-1', user_id: 'customer-1', type: 'credit', amount: 10, description: 'Tuner 10 Pack Purchased', reference: 'Payhip — Credit Card', reference_id: 'PH-001', created_at: '2026-05-12T14:00:00Z' },
  { id: 'tx-2', user_id: 'customer-1', type: 'debit',  amount: 1,  description: 'Stage 1 ECO — BMW 320d', reference: 'Request #AS-0047', reference_id: 'req-1', created_at: '2026-05-12T11:00:00Z' },
  { id: 'tx-3', user_id: 'customer-1', type: 'debit',  amount: 1,  description: 'DPF OFF — Audi A4 2.0 TDI', reference: 'Request #AS-0046', reference_id: 'req-2', created_at: '2026-05-11T10:00:00Z' },
  { id: 'tx-4', user_id: 'customer-1', type: 'credit', amount: 5,  description: 'Pro 5 Pack Purchased', reference: 'Payhip — PayPal', reference_id: 'PH-002', created_at: '2026-05-09T09:00:00Z' },
  { id: 'tx-5', user_id: 'customer-1', type: 'debit',  amount: 1,  description: 'Stage 2 — Golf GTI MK7', reference: 'Request #AS-0044', reference_id: 'req-3', created_at: '2026-05-08T15:00:00Z' },
  { id: 'tx-6', user_id: 'customer-1', type: 'debit',  amount: 1,  description: 'Pops & Bangs — Mercedes C200', reference: 'Request #AS-0043', reference_id: 'req-4', created_at: '2026-05-07T12:00:00Z' },
  { id: 'tx-7', user_id: 'customer-1', type: 'credit', amount: 10, description: 'Tuner 10 Pack Purchased', reference: 'Payhip — Apple Pay', reference_id: 'PH-003', created_at: '2026-05-05T08:00:00Z' },
  { id: 'tx-8', user_id: 'customer-1', type: 'credit', amount: 10, description: 'Tuner 10 Pack Purchased', reference: 'Payhip — Credit Card', reference_id: 'PH-004', created_at: '2026-04-20T10:00:00Z' },
  // Customer-2 transactions
  { id: 'tx-9',  user_id: 'customer-2', type: 'credit', amount: 5, description: 'Pro 5 Pack Purchased', reference: 'Payhip — PayPal', reference_id: 'PH-005', created_at: '2026-05-10T09:00:00Z' },
  { id: 'tx-10', user_id: 'customer-2', type: 'debit',  amount: 1, description: 'EGR OFF — Golf 7 GTD', reference: 'Request #AS-0048', reference_id: 'req-5', created_at: '2026-05-11T14:00:00Z' },
  { id: 'tx-11', user_id: 'customer-2', type: 'credit', amount: 5, description: 'Pro 5 Pack Purchased', reference: 'Payhip — Google Pay', reference_id: 'PH-006', created_at: '2026-05-01T10:00:00Z' },
  { id: 'tx-12', user_id: 'customer-2', type: 'debit',  amount: 1, description: 'Stage 1 — BMW 320d', reference: 'Request #AS-0041', reference_id: 'req-6', created_at: '2026-05-03T16:00:00Z' },
];

// ===== WALLET OPERATIONS =====

/**
 * Get wallet balance and stats for a user
 * @param {string} [userId] - defaults to current user
 * @returns {Object} { balance, total_purchased, total_used, priority }
 */
export function getWallet(userId) {
  const id = userId || getCurrentUser()?.id;
  if (!id) return { balance: 0, total_purchased: 0, total_used: 0, priority: 'Standard' };

  if (isDemoMode) {
    return demoWallets[id] || { user_id: id, balance: 0, total_purchased: 0, total_used: 0, priority: 'Standard' };
  }

  // Supabase would go here
  return demoWallets[id] || { user_id: id, balance: 0, total_purchased: 0, total_used: 0, priority: 'Standard' };
}

/**
 * Get transaction history for a user
 * @param {string} [userId] - defaults to current user
 * @param {number} [limit] - max results
 * @returns {Array} sorted by date descending
 */
export function getTransactions(userId, limit = 20) {
  const id = userId || getCurrentUser()?.id;
  if (!id) return [];

  if (isDemoMode) {
    return demoTransactions
      .filter(tx => tx.user_id === id)
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      .slice(0, limit)
      .map(tx => ({ ...tx, time_ago: timeAgo(tx.created_at) }));
  }

  // Supabase would go here
  return [];
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
export function addCredits(userId, amount, description, reference, referenceId) {
  // Idempotency check — don't add credits twice for same transaction
  const existing = demoTransactions.find(tx => tx.reference_id === referenceId && tx.type === 'credit');
  if (existing) {
    console.warn(`[Wallet] Duplicate credit attempt for reference ${referenceId}`);
    return existing;
  }

  const tx = {
    id: uid(),
    user_id: userId,
    type: 'credit',
    amount,
    description,
    reference,
    reference_id: referenceId,
    created_at: now(),
  };
  demoTransactions.push(tx);

  // Update wallet balance
  if (!demoWallets[userId]) {
    demoWallets[userId] = { user_id: userId, balance: 0, total_purchased: 0, total_used: 0, priority: 'Standard' };
  }
  demoWallets[userId].balance += amount;
  demoWallets[userId].total_purchased += amount;

  // Update priority based on total purchased
  const total = demoWallets[userId].total_purchased;
  if (total >= 30) demoWallets[userId].priority = 'VIP';
  else if (total >= 10) demoWallets[userId].priority = 'High';
  else if (total >= 5) demoWallets[userId].priority = 'Priority';

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
export function useCredit(userId, description, referenceId, amount = 1) {
  const wallet = getWallet(userId);
  if (wallet.balance < amount) {
    console.warn(`[Wallet] Insufficient credits for user ${userId} (need ${amount}, have ${wallet.balance})`);
    return null;
  }

  const tx = {
    id: uid(),
    user_id: userId,
    type: 'debit',
    amount,
    description,
    reference: `Request #${referenceId}`,
    reference_id: referenceId,
    created_at: now(),
  };
  demoTransactions.push(tx);

  demoWallets[userId].balance -= amount;
  demoWallets[userId].total_used += amount;

  return tx;
}

/**
 * Check if a user has enough credits
 * @param {string} [userId]
 * @param {number} [required=1]
 * @returns {boolean}
 */
export function hasCredits(userId, required = 1) {
  const wallet = getWallet(userId);
  return wallet.balance >= required;
}

/**
 * Get formatted stats for display
 * @param {string} [userId]
 * @returns {Object}
 */
export function getWalletStats(userId) {
  const wallet = getWallet(userId);
  const transactions = getTransactions(userId);
  const rating = '4.9★'; // Mock — would come from reviews system

  return {
    balance: wallet.balance,
    filesProcessed: wallet.total_used,
    priority: wallet.priority,
    rating,
    recentTransactions: transactions,
  };
}
