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
 * @param {number} credits - Number of credits (1, 10, 50, or 100)
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

// ===== SINGLE CREDIT PRICE (base rate, no pack discount) =====
export const SINGLE_CREDIT_PRICE = 16; // €16 per credit when buying individually

// ===== CREDIT PACKS — FINAL PRICING =====
// Psychological logic: "I save money by buying packs" (NOT "services are cheap")
export const CREDIT_PACKS = [
  {
    tier: 'Single Credit',
    credits: 1,
    price: '16€',
    priceNum: 16,
    perCredit: '16.00€',
    perCreditNum: 16,
    priority: 'Standard',
    badge: null,
    featured: false,
    discreet: true, // visually minimal
    savingsPercent: 0,
    features: [
      'Standard processing',
      'Email support',
      '1 ECU file request',
    ],
    description: 'For testing or emergency one-time jobs.',
  },
  {
    tier: 'Starter',
    credits: 10,
    price: '120€',
    priceNum: 120,
    perCredit: '12.00€',
    perCreditNum: 12,
    priority: 'Priority',
    badge: null,
    featured: false,
    discreet: false,
    savingsPercent: 25,
    features: [
      'Priority processing',
      'Email + WhatsApp support',
      '10 ECU file requests',
      'Save 25% vs single credits',
    ],
    description: 'Perfect for first orders and occasional users.',
  },
  {
    tier: 'PRO',
    credits: 50,
    price: '550€',
    priceNum: 550,
    perCredit: '11.00€',
    perCreditNum: 11,
    priority: 'High Priority',
    badge: '⭐ Most Popular',
    featured: true, // visually dominant
    discreet: false,
    savingsPercent: 31,
    features: [
      'High priority — first in queue',
      'Dedicated WhatsApp line',
      '50 ECU file requests',
      'Save 31% vs single credits',
      'Rush delivery included',
      'Free file revisions',
    ],
    description: 'The professional standard. Best balance for recurring users and resellers.',
  },
  {
    tier: 'Enterprise',
    credits: 100,
    price: '950€',
    priceNum: 950,
    perCredit: '9.50€',
    perCreditNum: 9.5,
    priority: 'Elite VIP',
    badge: '🔥 Best Value',
    featured: false,
    elite: true, // premium styling
    discreet: false,
    savingsPercent: 41,
    features: [
      'Elite VIP — absolute top priority',
      'Dedicated engineer assigned',
      '100 ECU file requests',
      'Save 41% vs single credits',
      'Instant rush delivery',
      'Unlimited revisions',
      'Priority phone support',
    ],
    description: 'For garages, file services, and daily professional users.',
  },
];

// ===== PARTNER PACK (not publicly displayed) =====
export const PARTNER_PACK = {
  tier: 'Partner / White Label',
  credits: 200,
  price: 'Partner Access Only',
  priceNum: null,
  perCredit: 'Custom',
  perCreditNum: null,
  priority: 'Partner VIP',
  badge: '🤝 Partner',
  featured: false,
  partner: true,
  savingsPercent: null,
  features: [
    'Custom partner pricing',
    'White-label support',
    'Volume discounts',
    'API access (coming soon)',
    'Dedicated account manager',
    'Monthly invoicing',
  ],
  description: 'Reserved for official partners, resellers, and strategic collaborations. Manual approval required.',
};

// ===== CREDIT CALCULATION HELPERS =====

/**
 * Calculate the cost of N credits using a specific pack
 * @param {number} creditCount - Number of credits needed
 * @param {Object} pack - A CREDIT_PACKS entry
 * @returns {number} Estimated cost in €
 */
export function calculateCostWithPack(creditCount, pack) {
  return creditCount * pack.perCreditNum;
}

/**
 * Calculate savings for N credits compared to single credit price
 * @param {number} creditCount - Number of credits needed
 * @param {Object} pack - A CREDIT_PACKS entry
 * @returns {{ withoutPack: number, withPack: number, savings: number, savingsPercent: number }}
 */
export function calculateSavings(creditCount, pack) {
  const withoutPack = creditCount * SINGLE_CREDIT_PRICE;
  const withPack = creditCount * pack.perCreditNum;
  const savings = withoutPack - withPack;
  const savingsPercent = Math.round((savings / withoutPack) * 100);
  return { withoutPack, withPack, savings, savingsPercent };
}

/**
 * Get the best pack recommendation for a given credit count
 * @param {number} creditCount - Credits needed
 * @returns {Object} The recommended pack
 */
export function getRecommendedPack(creditCount) {
  if (creditCount >= 50) return CREDIT_PACKS[3]; // Enterprise
  if (creditCount >= 10) return CREDIT_PACKS[2]; // PRO
  if (creditCount >= 3) return CREDIT_PACKS[1];  // Starter
  return CREDIT_PACKS[0]; // Single
}

/**
 * Generate savings comparison HTML for a service
 * @param {number} creditCost - Credits required for the service
 * @returns {string} HTML string
 */
export function getSavingsComparisonHTML(creditCost) {
  if (creditCost <= 0) return '';
  
  const withoutPack = creditCost * SINGLE_CREDIT_PRICE;
  const proPack = CREDIT_PACKS[2]; // PRO 50
  const enterprisePack = CREDIT_PACKS[3]; // Enterprise 100
  
  const proCost = creditCost * proPack.perCreditNum;
  const enterpriseCost = creditCost * enterprisePack.perCreditNum;
  const maxSaving = withoutPack - enterpriseCost;
  
  return `
    <div class="sv-comparison">
      <div class="sv-row">
        <span class="sv-label">Credits required</span>
        <span class="sv-value sv-credits">${creditCost} credit${creditCost > 1 ? 's' : ''}</span>
      </div>
      <div class="sv-row sv-row-dim">
        <span class="sv-label">Without pack</span>
        <span class="sv-value sv-strikethrough">${withoutPack}€</span>
      </div>
      <div class="sv-row sv-row-highlight">
        <span class="sv-label">With <strong>PRO</strong> Pack</span>
        <span class="sv-value sv-pro">${proCost}€</span>
      </div>
      <div class="sv-row sv-row-elite">
        <span class="sv-label">With <strong>Enterprise</strong> Pack</span>
        <span class="sv-value sv-enterprise">${enterpriseCost}€</span>
      </div>
      ${maxSaving > 0 ? `
        <div class="sv-savings-badge">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg>
          Save up to <strong>${maxSaving}€</strong> with professional packs
        </div>
      ` : ''}
    </div>
  `;
}

/**
 * Get all packs sorted by value (best value first)
 * @returns {Array} packs sorted by per-credit cost ascending
 */
export function getPacksSortedByValue() {
  return [...CREDIT_PACKS].sort((a, b) => a.perCreditNum - b.perCreditNum);
}
