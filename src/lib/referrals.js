// ===== AS Performance — Referral / Affiliate System =====
import { addNotification } from './notifications.js';
import { addActivity } from './store.js';

// Referral code generator — clean, human-readable
function generateCode(name) {
  const prefix = name.replace(/[^A-Za-z]/g, '').slice(0, 4).toUpperCase();
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `${prefix}-${rand}`;
}

// ===== REFERRAL DATA STORE =====
export const referralCodes = [
  { code: 'JEAN-X7R2', ownerId: 'customer-1', ownerName: 'Jean Dupont', createdAt: '2025-04-01T10:00:00Z', active: true },
  { code: 'PAUL-K9M3', ownerId: 'customer-2', ownerName: 'Paul Martin', createdAt: '2025-04-15T10:00:00Z', active: true },
];

// Referral tracking — who signed up using whose code
export const referralSignups = [
  { id: 'ref-1', code: 'JEAN-X7R2', referrerId: 'customer-1', referredId: 'customer-2', referredName: 'Paul Martin', orderAmount: 450, qualifies: true, discountIssued: true, discountAmount: 67.5, createdAt: '2025-04-15T10:00:00Z' },
];

// Discount rewards earned by referrers
export const referralRewards = [
  { id: 'rw-1', referrerId: 'customer-1', referrerName: 'Jean Dupont', code: 'JEAN-X7R2', referredName: 'Paul Martin', orderAmount: 450, discountPercent: 15, discountValue: 67.5, used: false, expiresAt: '2025-07-15T10:00:00Z', createdAt: '2025-04-15T10:00:00Z' },
];

// ===== CONSTANTS =====
export const REFERRAL_CONFIG = {
  discountPercent: 15,
  minOrderAmount: 100,
  baseUrl: 'https://asperformance.com',
  expiryDays: 90,
};

// ===== CRUD =====

/**
 * Generate or get referral code for a customer
 */
export function getOrCreateReferralCode(customerId, customerName) {
  let existing = referralCodes.find(r => r.ownerId === customerId && r.active);
  if (existing) return existing;

  const code = generateCode(customerName);
  const entry = {
    code,
    ownerId: customerId,
    ownerName: customerName,
    createdAt: new Date().toISOString(),
    active: true,
  };
  referralCodes.push(entry);
  return entry;
}

/**
 * Get a customer's referral code
 */
export function getReferralCode(customerId) {
  return referralCodes.find(r => r.ownerId === customerId && r.active) || null;
}

/**
 * Get full referral link
 */
export function getReferralLink(code) {
  return `${REFERRAL_CONFIG.baseUrl}/?ref=${code}`;
}

/**
 * Track a referral signup — called when a new customer signs up with a referral code
 * Returns the tracking entry if successful
 */
export function trackReferralSignup(refCode, newCustomerId, newCustomerName) {
  const codeEntry = referralCodes.find(r => r.code === refCode && r.active);
  if (!codeEntry) return null;
  if (codeEntry.ownerId === newCustomerId) return null; // no self-referrals

  const signup = {
    id: 'ref-' + Date.now().toString(36),
    code: refCode,
    referrerId: codeEntry.ownerId,
    referredId: newCustomerId,
    referredName: newCustomerName,
    orderAmount: 0,
    qualifies: false,
    discountIssued: false,
    discountAmount: 0,
    createdAt: new Date().toISOString(),
  };
  referralSignups.push(signup);
  addActivity(codeEntry.ownerId, 'New referral signup', { name: newCustomerName, code: refCode });
  return signup;
}

/**
 * Check and issue discount — called when an order is placed/paid
 * If the referred customer's order is >= €100, auto-issue 15% discount to referrer
 */
export function checkAndIssueReferralDiscount(customerId, orderAmount) {
  const signup = referralSignups.find(s => s.referredId === customerId && !s.discountIssued);
  if (!signup) return null;
  if (orderAmount < REFERRAL_CONFIG.minOrderAmount) return null;

  // Qualify and issue discount
  signup.orderAmount = orderAmount;
  signup.qualifies = true;
  signup.discountIssued = true;
  const discountValue = Math.round(orderAmount * (REFERRAL_CONFIG.discountPercent / 100) * 100) / 100;
  signup.discountAmount = discountValue;

  // Create reward for referrer
  const reward = {
    id: 'rw-' + Date.now().toString(36),
    referrerId: signup.referrerId,
    referrerName: referralCodes.find(c => c.code === signup.code)?.ownerName || '',
    code: signup.code,
    referredName: signup.referredName,
    orderAmount,
    discountPercent: REFERRAL_CONFIG.discountPercent,
    discountValue,
    used: false,
    expiresAt: new Date(Date.now() + REFERRAL_CONFIG.expiryDays * 86400000).toISOString(),
    createdAt: new Date().toISOString(),
  };
  referralRewards.push(reward);

  // Notify referrer about their earned discount
  addNotification({
    userId: signup.referrerId,
    type: 'referral',
    title: '🎉 You earned a 15% discount!',
    message: `Your referral ${signup.referredName} placed an order of €${orderAmount}. You earned a €${discountValue} discount on your next service!`,
    priority: 'high',
    link: '#/referrals',
  });

  // Notify admin
  addNotification({
    userId: 'admin-1',
    type: 'referral',
    title: 'Referral Discount Issued',
    message: `${reward.referrerName} earned €${discountValue} discount (referred ${signup.referredName}, order €${orderAmount})`,
    priority: 'normal',
    link: '#/referrals',
  });

  addActivity(signup.referrerId, 'Earned referral discount', {
    amount: `€${discountValue}`,
    from: signup.referredName,
  });

  return reward;
}

/**
 * Get rewards for a specific customer
 */
export function getRewardsForCustomer(customerId) {
  return referralRewards.filter(r => r.referrerId === customerId);
}

/**
 * Get signups tracked by a specific referral code
 */
export function getSignupsForCode(code) {
  return referralSignups.filter(s => s.code === code);
}

/**
 * Get all referral stats for admin
 */
export function getReferralStats() {
  const totalCodes = referralCodes.filter(c => c.active).length;
  const totalSignups = referralSignups.length;
  const qualified = referralSignups.filter(s => s.qualifies).length;
  const totalDiscounts = referralRewards.reduce((sum, r) => sum + r.discountValue, 0);
  const unusedRewards = referralRewards.filter(r => !r.used).length;
  const conversionRate = totalSignups ? Math.round((qualified / totalSignups) * 100) : 0;
  return { totalCodes, totalSignups, qualified, totalDiscounts, unusedRewards, conversionRate };
}

/**
 * Mark a reward as used
 */
export function useReward(rewardId) {
  const r = referralRewards.find(rw => rw.id === rewardId);
  if (r) { r.used = true; return r; }
  return null;
}

/**
 * Deactivate a referral code
 */
export function deactivateCode(code) {
  const c = referralCodes.find(r => r.code === code);
  if (c) { c.active = false; return c; }
  return null;
}
