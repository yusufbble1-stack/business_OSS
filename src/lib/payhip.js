// ===== Payhip Integration Service =====
// Handles checkout links, webhook verification, and coupon management

const PAYHIP_BASE = import.meta.env.VITE_PAYHIP_STORE_URL || 'https://payhip.com';

// Product key mapping — populated from .env or set after creating products on Payhip dashboard
const PRODUCT_KEYS = {
  1:   import.meta.env.VITE_PAYHIP_PRODUCT_1_CREDIT   || '',
  10:  import.meta.env.VITE_PAYHIP_PRODUCT_10_CREDITS  || '',
  50:  import.meta.env.VITE_PAYHIP_PRODUCT_50_CREDITS  || '',
  100: import.meta.env.VITE_PAYHIP_PRODUCT_100_CREDITS || '',
};

/**
 * Get the direct checkout URL for a credit pack.
 * Opens Payhip checkout page directly (skips product landing page).
 * 
 * @param {number} credits - Number of credits (1, 5, 10, 50, or 100)
 * @param {string} [email] - Pre-fill customer email if known
 * @returns {string} Direct checkout URL or product page URL
 */
export function getCheckoutUrl(credits, email) {
  const key = PRODUCT_KEYS[credits];
  if (!key) {
    console.warn(`[Payhip] No product key configured for ${credits} credits. Set VITE_PAYHIP_PRODUCT_${credits}_CREDIT(S) in .env`);
    return '#';
  }
  
  // Direct checkout URL bypasses the product landing page
  let url = `${PAYHIP_BASE}/buy?link=${key}`;
  
  // Pre-fill email if we have it (logged in user)
  if (email) {
    url += `&email=${encodeURIComponent(email)}`;
  }
  
  return url;
}

/**
 * Get the product page URL (with description, not direct checkout)
 * @param {number} credits
 * @returns {string}
 */
export function getProductPageUrl(credits) {
  const key = PRODUCT_KEYS[credits];
  if (!key) return '#';
  return `${PAYHIP_BASE}/b/${key}`;
}

/**
 * Check if Payhip product keys are configured
 * @returns {boolean}
 */
export function isPayhipConfigured() {
  return Object.values(PRODUCT_KEYS).some(k => k && k.length > 0);
}

/**
 * Get all configured product keys for debugging
 * @returns {Object}
 */
export function getProductKeyStatus() {
  return {
    '1 Credit':    PRODUCT_KEYS[1]   ? '✓ Configured' : '✗ Missing',
    '10 Credits':  PRODUCT_KEYS[10]  ? '✓ Configured' : '✗ Missing',
    '50 Credits':  PRODUCT_KEYS[50]  ? '✓ Configured' : '✗ Missing',
    '100 Credits': PRODUCT_KEYS[100] ? '✓ Configured' : '✗ Missing',
  };
}

/**
 * Generate the Payhip embed button script tag
 * Use this if you want an overlay checkout instead of redirect
 * @param {number} credits
 * @returns {string} HTML to inject
 */
export function getEmbedButton(credits) {
  const key = PRODUCT_KEYS[credits];
  if (!key) return '';
  return `<a href="https://payhip.com/b/${key}" class="payhip-buy-button" data-theme="none" data-product="${key}">Buy Now</a>`;
}

// Credit pack definitions — single source of truth
export const CREDIT_PACKS = [
  {
    tier: 'Starter',
    credits: 1,
    price: '16€',
    priceNum: 16,
    perCredit: '16.00€',
    priority: 'Standard',
    badge: null,
    featured: false,
    features: [
      'Standard processing',
      'Email support',
      '1 ECU file request',
    ],
  },
  {
    tier: 'Tuner 10',
    credits: 10,
    price: '110€',
    priceNum: 110,
    perCredit: '11.00€',
    priority: 'High Priority',
    badge: 'Best Value',
    featured: true,
    features: [
      'High priority processing',
      'Dedicated WhatsApp line',
      '10 ECU file requests',
      'Save 31%',
      'Rush delivery included',
    ],
  },
  {
    tier: 'Business 50',
    credits: 50,
    price: '450€',
    priceNum: 450,
    perCredit: '9.00€',
    priority: 'VIP',
    badge: 'Pro',
    featured: false,
    features: [
      'VIP priority — first in queue',
      'Personal account manager',
      '50 ECU file requests',
      'Save 44%',
      'Rush delivery included',
      'Custom file revisions free',
    ],
  },
  {
    tier: 'Enterprise 100',
    credits: 100,
    price: '800€',
    priceNum: 800,
    perCredit: '8.00€',
    priority: 'Elite VIP',
    badge: 'Elite',
    featured: false,
    features: [
      'Elite VIP — absolute top priority',
      'Dedicated engineer assigned',
      '100 ECU file requests',
      'Save 50%',
      'Instant rush delivery',
      'Unlimited revisions',
      'Priority phone support',
    ],
  },
];
