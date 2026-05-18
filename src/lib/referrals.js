// ===== AS Performance — Referral / Affiliate System =====
// Professional referral ecosystem with credit-based rewards,
// tier system, anti-abuse protections, and scalable partner tiers.

import { addNotification } from './notifications.js';
import { addActivity } from './store.js';

// ===== CONFIGURATION =====
export const REFERRAL_CONFIG = {
  // New customer benefit
  discountPercent: 15,        // 15% OFF for referred customer
  minOrderAmount: 100,        // Only on orders above 100€
  firstOrderOnly: true,       // First order only
  noStacking: true,           // Cannot stack with other promotions

  // Referrer reward
  rewardType: 'credits',      // 'credits' (NOT cash)
  rewardCreditsMin: 5,        // Minimum 5€ equivalent in credits
  rewardCreditsMax: 10,       // Maximum 10€ equivalent in credits
  rewardValidationRequired: true, // Only after validated order/payment

  // Referral limits per tier
  tierLimits: {
    standard: 3,              // Standard users: 3 rewarded referrals
    pro: 10,                  // PRO pack users: 10 referrals
    partner: 999,             // Partners: unlimited (effectively)
    dealer: 999,              // Dealers: unlimited
  },

  // Code format: ASP-NAME-XXX
  codePrefix: 'ASP',
  baseUrl: 'https://asperformance.com',
  expiryDays: 90,
};

// ===== AFFILIATE TIER SYSTEM =====
export const AFFILIATE_TIERS = {
  standard: {
    id: 'standard',
    name: 'Standard',
    label: 'Member',
    maxReferrals: 3,
    rewardCredits: 5,
    icon: '👤',
    color: '#9CA3AF',
    perks: ['3 rewarded referrals', 'Standard support'],
  },
  bronze: {
    id: 'bronze',
    name: 'Bronze Partner',
    label: 'Bronze',
    maxReferrals: 5,
    rewardCredits: 6,
    icon: '🥉',
    color: '#CD7F32',
    perks: ['5 rewarded referrals', 'Priority support', 'Partner badge'],
  },
  silver: {
    id: 'silver',
    name: 'Silver Partner',
    label: 'Silver',
    maxReferrals: 15,
    rewardCredits: 7,
    icon: '🥈',
    color: '#C0C0C0',
    perks: ['15 rewarded referrals', 'Priority support', 'Custom pricing access'],
  },
  gold: {
    id: 'gold',
    name: 'Gold Partner',
    label: 'Gold',
    maxReferrals: 50,
    rewardCredits: 8,
    icon: '🥇',
    color: '#FFD700',
    perks: ['50 rewarded referrals', 'Dedicated account manager', 'Best commissions'],
  },
  dealer: {
    id: 'dealer',
    name: 'Official Dealer',
    label: 'Dealer',
    maxReferrals: 999,
    rewardCredits: 10,
    icon: '🏆',
    color: '#E63946',
    perks: ['Unlimited referrals', 'White-label access', 'Dealer dashboard', 'Custom pricing'],
  },
};

// ===== REFERRAL CODE GENERATOR =====
function generateCode(name) {
  const cleanName = name.replace(/[^A-Za-z]/g, '').slice(0, 4).toUpperCase();
  const rand = Math.floor(100 + Math.random() * 900); // 3-digit number
  return `${REFERRAL_CONFIG.codePrefix}-${cleanName}-${rand}`;
}

/**
 * Calculate reward credits based on order amount (5€–10€ range)
 */
function calculateRewardCredits(orderAmount, tier = 'standard') {
  const tierConfig = AFFILIATE_TIERS[tier] || AFFILIATE_TIERS.standard;
  return tierConfig.rewardCredits;
}

// ===== DATA STORE =====
export const referralCodes = [
  { code: 'ASP-JEAN-248', ownerId: 'customer-1', ownerName: 'Jean Dupont', tier: 'standard', createdAt: '2025-04-01T10:00:00Z', active: true },
  { code: 'ASP-PAUL-531', ownerId: 'customer-2', ownerName: 'Paul Martin', tier: 'standard', createdAt: '2025-04-15T10:00:00Z', active: true },
];

export const referralSignups = [
  { id: 'ref-1', code: 'ASP-JEAN-248', referrerId: 'customer-1', referredId: 'customer-2', referredName: 'Paul Martin', orderAmount: 450, qualifies: true, rewardIssued: true, rewardCredits: 5, discountGiven: 67.5, createdAt: '2025-04-15T10:00:00Z', validatedAt: '2025-04-15T12:00:00Z' },
];

export const referralRewards = [
  { id: 'rw-1', referrerId: 'customer-1', referrerName: 'Jean Dupont', code: 'ASP-JEAN-248', referredName: 'Paul Martin', orderAmount: 450, rewardCredits: 5, rewardType: 'credits', status: 'credited', expiresAt: '2025-07-15T10:00:00Z', createdAt: '2025-04-15T10:00:00Z' },
];

// ===== ANTI-ABUSE TRACKING =====
const abuseLog = [];

function logAbuseAttempt(type, details) {
  abuseLog.push({ type, details, timestamp: new Date().toISOString() });
  console.warn(`[Referral Anti-Abuse] ${type}:`, details);
}

// ===== CRUD OPERATIONS =====

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
    tier: 'standard',
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
 * Get remaining referral slots for a user
 */
export function getRemainingSlots(customerId) {
  const codeEntry = referralCodes.find(r => r.ownerId === customerId && r.active);
  if (!codeEntry) return { used: 0, max: REFERRAL_CONFIG.tierLimits.standard, remaining: REFERRAL_CONFIG.tierLimits.standard };

  const tier = codeEntry.tier || 'standard';
  const tierConfig = AFFILIATE_TIERS[tier] || AFFILIATE_TIERS.standard;
  const successfulReferrals = referralSignups.filter(s => s.code === codeEntry.code && s.qualifies).length;
  const max = tierConfig.maxReferrals;
  const remaining = Math.max(0, max - successfulReferrals);

  return { used: successfulReferrals, max, remaining, tier };
}

/**
 * Track a referral signup — anti-abuse checks included
 */
export function trackReferralSignup(refCode, newCustomerId, newCustomerName, metadata = {}) {
  const codeEntry = referralCodes.find(r => r.code === refCode && r.active);
  if (!codeEntry) return null;

  // Anti-abuse: Self-referral
  if (codeEntry.ownerId === newCustomerId) {
    logAbuseAttempt('self-referral', { code: refCode, userId: newCustomerId });
    return null;
  }

  // Anti-abuse: Duplicate referral (same person already referred)
  const existingSignup = referralSignups.find(s => s.referredId === newCustomerId);
  if (existingSignup) {
    logAbuseAttempt('duplicate-referral', { code: refCode, userId: newCustomerId });
    return null;
  }

  // Anti-abuse: Check referral slots remaining
  const slots = getRemainingSlots(codeEntry.ownerId);
  if (slots.remaining <= 0) {
    logAbuseAttempt('limit-exceeded', { code: refCode, ownerId: codeEntry.ownerId, used: slots.used, max: slots.max });
    return null;
  }

  const signup = {
    id: 'ref-' + Date.now().toString(36),
    code: refCode,
    referrerId: codeEntry.ownerId,
    referredId: newCustomerId,
    referredName: newCustomerName,
    orderAmount: 0,
    qualifies: false,
    rewardIssued: false,
    rewardCredits: 0,
    discountGiven: 0,
    createdAt: new Date().toISOString(),
    validatedAt: null,
    metadata, // IP, email, etc for anti-abuse
  };
  referralSignups.push(signup);
  addActivity(codeEntry.ownerId, 'New referral signup', { name: newCustomerName, code: refCode });
  return signup;
}

/**
 * Validate referral and issue credit reward — called after payment validation
 */
export function validateAndReward(customerId, orderAmount) {
  const signup = referralSignups.find(s => s.referredId === customerId && !s.rewardIssued);
  if (!signup) return null;
  if (orderAmount < REFERRAL_CONFIG.minOrderAmount) return null;

  const codeEntry = referralCodes.find(c => c.code === signup.code);
  const tier = codeEntry?.tier || 'standard';

  // Check slots again
  const slots = getRemainingSlots(signup.referrerId);
  if (slots.remaining <= 0) return null;

  // Calculate discount for referred customer
  const discountValue = Math.round(orderAmount * (REFERRAL_CONFIG.discountPercent / 100) * 100) / 100;

  // Calculate credit reward for referrer
  const rewardCredits = calculateRewardCredits(orderAmount, tier);

  // Update signup
  signup.orderAmount = orderAmount;
  signup.qualifies = true;
  signup.rewardIssued = true;
  signup.rewardCredits = rewardCredits;
  signup.discountGiven = discountValue;
  signup.validatedAt = new Date().toISOString();

  // Create reward record
  const reward = {
    id: 'rw-' + Date.now().toString(36),
    referrerId: signup.referrerId,
    referrerName: codeEntry?.ownerName || '',
    code: signup.code,
    referredName: signup.referredName,
    orderAmount,
    rewardCredits,
    rewardType: 'credits',
    status: 'pending', // pending → credited (after admin validation or auto)
    expiresAt: new Date(Date.now() + REFERRAL_CONFIG.expiryDays * 86400000).toISOString(),
    createdAt: new Date().toISOString(),
  };
  referralRewards.push(reward);

  // Notify referrer
  addNotification({
    userId: signup.referrerId,
    type: 'referral',
    title: `🎉 You earned ${rewardCredits} credits!`,
    message: `Your referral ${signup.referredName} placed an order of €${orderAmount}. ${rewardCredits} credits have been added to your wallet!`,
    priority: 'high',
    link: '#/referrals',
  });

  // Notify admin
  addNotification({
    userId: 'admin-1',
    type: 'referral',
    title: 'Referral Reward Issued',
    message: `${reward.referrerName} earned ${rewardCredits} credits (referred ${signup.referredName}, order €${orderAmount})`,
    priority: 'normal',
    link: '#/referrals',
  });

  addActivity(signup.referrerId, 'Earned referral credits', {
    credits: rewardCredits,
    from: signup.referredName,
  });

  return reward;
}

/**
 * Calculate referral discount for checkout display
 */
export function calculateReferralDiscount(refCode, orderAmount) {
  if (!refCode || orderAmount < REFERRAL_CONFIG.minOrderAmount) {
    return { valid: false, reason: orderAmount < REFERRAL_CONFIG.minOrderAmount ? 'minimum_not_met' : 'invalid_code' };
  }

  const codeEntry = referralCodes.find(r => r.code === refCode && r.active);
  if (!codeEntry) return { valid: false, reason: 'invalid_code' };

  const discountAmount = Math.round(orderAmount * (REFERRAL_CONFIG.discountPercent / 100) * 100) / 100;
  const finalPrice = Math.round((orderAmount - discountAmount) * 100) / 100;

  return {
    valid: true,
    originalPrice: orderAmount,
    discountPercent: REFERRAL_CONFIG.discountPercent,
    discountAmount,
    finalPrice,
    savedAmount: discountAmount,
    referrerName: codeEntry.ownerName,
  };
}

// ===== STATS & QUERIES =====

export function getRewardsForCustomer(customerId) {
  return referralRewards.filter(r => r.referrerId === customerId);
}

export function getSignupsForCode(code) {
  return referralSignups.filter(s => s.code === code);
}

export function getReferralStats() {
  const totalCodes = referralCodes.filter(c => c.active).length;
  const totalSignups = referralSignups.length;
  const qualified = referralSignups.filter(s => s.qualifies).length;
  const totalCreditsRewarded = referralRewards.reduce((sum, r) => sum + r.rewardCredits, 0);
  const pendingRewards = referralRewards.filter(r => r.status === 'pending').length;
  const conversionRate = totalSignups ? Math.round((qualified / totalSignups) * 100) : 0;
  const abuseAttempts = abuseLog.length;
  return { totalCodes, totalSignups, qualified, totalCreditsRewarded, pendingRewards, conversionRate, abuseAttempts };
}

export function useReward(rewardId) {
  const r = referralRewards.find(rw => rw.id === rewardId);
  if (r) { r.status = 'credited'; return r; }
  return null;
}

export function deactivateCode(code) {
  const c = referralCodes.find(r => r.code === code);
  if (c) { c.active = false; return c; }
  return null;
}

/**
 * Upgrade a user's affiliate tier
 */
export function upgradeTier(customerId, newTier) {
  const codeEntry = referralCodes.find(r => r.ownerId === customerId && r.active);
  if (codeEntry && AFFILIATE_TIERS[newTier]) {
    codeEntry.tier = newTier;
    return codeEntry;
  }
  return null;
}

// Legacy compatibility — map old function names
export const checkAndIssueReferralDiscount = validateAndReward;
