// ===== Credits / Payment Page — Premium Credit System =====
import { CREDIT_PACKS, PARTNER_PACK, SINGLE_CREDIT_PRICE, getCheckoutUrl, isPayhipConfigured, getProductKeyStatus, calculateSavings } from '../lib/payhip.js';
import { getWalletStats } from '../lib/wallet.js';
import { getCurrentUser, signOut, initCurrentUser } from '../lib/auth.js';

const CHECK_SVG = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>';
const ARROW_SVG = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>';
const LOCK_SVG = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>';
const FIRE_SVG = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>';
const SHIELD_SVG = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>';
const STAR_SVG = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>';

export async function renderCreditsPage() {
  const app = document.getElementById('app');
  const user = await initCurrentUser();
  let stats = { balance: 0, filesProcessed: 0, priority: 'Standard', rating: '—', recentTransactions: [] };
  if (user) {
    try { stats = await getWalletStats(user.id); } catch(e) { console.warn('[Credits] Wallet stats error:', e); }
  }
  const transactions = stats.recentTransactions || [];
  const urlParams = new URLSearchParams(window.location.hash.split('?')[1] || '');
  const showSuccess = urlParams.get('success') === 'true';

  // Nav actions
  const navActions = user ? `
    <div class="hp-nav-actions">
      <span class="hp-nav-user-name" style="color:#ccc;font-size:13px;font-weight:500;">${user.full_name || user.email}</span>
      <button class="hp-nav-login" id="cr-logout-btn" style="cursor:pointer;border:none;background:none;font-family:inherit;">Logout</button>
    </div>
  ` : `
    <div class="hp-nav-actions">
      <a href="mailto:asperformance.contact@gmail.com" class="hp-nav-cta">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
        Contact Us
      </a>
      <a href="#/login" class="hp-nav-login">Sign In</a>
    </div>
  `;

  // Build savings calculator example for Stage 1 (4 credits)
  const exampleCredits = 4;
  const exampleService = 'Stage 1';
  const savingsData = CREDIT_PACKS.filter(p => !p.discreet).map(pack => {
    const sv = calculateSavings(exampleCredits, pack);
    return { pack, ...sv };
  });

  app.innerHTML = `
    <div class="hp-page">
      <!-- Navigation -->
      <nav class="hp-nav scrolled">
        <div class="hp-nav-inner">
          <div class="hp-nav-brand">
            <img src="/assets/logo.png" alt="AS Performance" class="hp-logo"/>
            <div>
              <span class="hp-brand-name">AS</span>
              <span class="hp-brand-bold">Performance</span>
              <span class="hp-brand-sub">chiptuning</span>
            </div>
          </div>
          <div class="hp-nav-pill">
            <a href="#/home" class="hp-nav-link">Home</a>
            <a href="#/pricing" class="hp-nav-link">Pricing</a>
            <a href="#/credits" class="hp-nav-link active">Credits</a>
            <a href="#/network" class="hp-nav-link">Network</a>
            <a href="#/gains" class="hp-nav-link">Calculator</a>
          </div>
          ${navActions}
          <button class="hp-mobile-toggle" id="hp-mobile-toggle">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          </button>
        </div>
      </nav>

      <!-- Hero Section -->
      <section class="cr-hero">
        <div class="cr-hero-particles" id="cr-particles"></div>
        <span class="hp-section-tag">Professional Credit System</span>
        <h1>Professional Packs,<br/><span class="hp-text-red">Serious Savings</span></h1>
        <p>Purchase credit packs to unlock lower per-file costs and priority processing. Built for garages, resellers, and professionals.</p>
        <div class="cr-hero-stats">
          <div class="cr-hero-stat">
            <span class="cr-hero-stat-value">50+</span>
            <span class="cr-hero-stat-label">Active Partners</span>
          </div>
          <div class="cr-hero-stat-divider"></div>
          <div class="cr-hero-stat">
            <span class="cr-hero-stat-value">5,000+</span>
            <span class="cr-hero-stat-label">Files Delivered</span>
          </div>
          <div class="cr-hero-stat-divider"></div>
          <div class="cr-hero-stat">
            <span class="cr-hero-stat-value">99.8%</span>
            <span class="cr-hero-stat-label">Client Satisfaction</span>
          </div>
        </div>
      </section>

      ${showSuccess ? `
        <div class="cr-success-banner">
          <div class="cr-success-inner">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            <span>Payment successful! Your credits have been added to your wallet. Thank you for your purchase.</span>
          </div>
        </div>
      ` : ''}

      <!-- Wallet Balance (for logged-in users) -->
      ${user ? `
        <div class="cr-wallet-bar">
          <div class="cr-wallet-inner">
            <div class="cr-wallet-left">
              <div class="cr-wallet-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect width="20" height="14" x="2" y="5" rx="2"/><path d="M2 10h20"/></svg>
              </div>
              <div class="cr-wallet-info">
                <span class="cr-wallet-label">Your Wallet Balance</span>
                <div class="cr-wallet-balance">
                  <span id="cr-balance-count">${stats.balance}</span>
                  <small>credits available</small>
                </div>
              </div>
            </div>
            <div class="cr-wallet-right">
              <div class="cr-wallet-stat">
                <span class="cr-wallet-stat-num">${stats.filesProcessed}</span>
                <span class="cr-wallet-stat-label">Files Processed</span>
              </div>
              <div class="cr-wallet-stat">
                <span class="cr-wallet-stat-num">${stats.priority}</span>
                <span class="cr-wallet-stat-label">Priority Level</span>
              </div>
              <div class="cr-wallet-stat">
                <span class="cr-wallet-stat-num">${stats.rating}</span>
                <span class="cr-wallet-stat-label">Avg Rating</span>
              </div>
            </div>
          </div>
        </div>
      ` : ''}

      <!-- Credit Packs Section -->
      <section class="cr-section">
        <div class="cr-section-header">
          <h2>Choose Your <span class="hp-text-red">Professional Pack</span></h2>
          <p>Bigger packs = lower per-credit cost + higher priority + faster delivery</p>
        </div>

        <div class="cr-packs-grid">
          ${CREDIT_PACKS.map((pack, i) => `
            <div class="cr-pack ${pack.featured ? 'cr-pack-featured' : ''} ${pack.elite ? 'cr-pack-elite' : ''} ${pack.discreet ? 'cr-pack-discreet' : ''}" style="animation-delay: ${i * 0.08}s">
              ${pack.badge ? `<span class="cr-pack-badge ${pack.featured ? 'cr-pack-badge-popular' : ''} ${pack.elite ? 'cr-pack-badge-elite' : ''}">${pack.badge}</span>` : ''}
              ${pack.featured ? '<div class="cr-pack-glow"></div>' : ''}
              <div class="cr-pack-tier">${pack.tier}</div>
              <div class="cr-pack-credits">${pack.credits} <span>credit${pack.credits > 1 ? 's' : ''}</span></div>
              <div class="cr-pack-price">${pack.price}</div>
              <div class="cr-pack-per">
                ${pack.perCredit} per credit
                ${pack.savingsPercent > 0 ? `<span class="cr-pack-savings-tag">-${pack.savingsPercent}%</span>` : ''}
              </div>
              <div class="cr-pack-priority">
                ${SHIELD_SVG}
                <span>${pack.priority} processing</span>
              </div>
              <ul class="cr-pack-features">
                ${pack.features.map(f => `<li>${CHECK_SVG} ${f}</li>`).join('')}
              </ul>
              <a href="${user ? getCheckoutUrl(pack.credits, user.email) : '#/login'}"
                 ${user ? 'target="_blank" rel="noopener"' : ''}
                 class="cr-pack-btn ${pack.featured ? 'cr-pack-btn-primary' : ''} ${pack.elite ? 'cr-pack-btn-elite' : ''} ${!user ? 'cr-pack-btn-locked' : ''}"
                 id="cr-buy-${pack.tier.toLowerCase().replace(/[\\s/]/g, '-')}"
                 data-credits="${pack.credits}">
                ${!user ? `${LOCK_SVG} Sign In to Buy` :
                  (getCheckoutUrl(pack.credits) !== '#' ? `Buy Now ${ARROW_SVG}` : 'Coming Soon')}
              </a>
            </div>
          `).join('')}
        </div>

        <!-- Partner Pack Banner -->
        <div class="cr-partner-banner">
          <div class="cr-partner-inner">
            <div class="cr-partner-left">
              <span class="cr-partner-badge">🤝 Partner Program</span>
              <h3>200+ Credits — <span class="hp-text-red">Partner / White Label</span></h3>
              <p>Reserved for official partners, large resellers, and strategic collaborations. Custom pricing, white-label support, and volume discounts. <strong>Manual approval required.</strong></p>
            </div>
            <a href="mailto:asperformance.contact@gmail.com?subject=Partner%20Application%20-%20AS%20Performance" class="cr-partner-btn">
              Apply for Partner Access ${ARROW_SVG}
            </a>
          </div>
        </div>

        <!-- Payment Methods -->
        <div class="cr-payment-strip">
          <span>Secure Payment via</span>
          <div class="cr-payment-methods">
            <div class="cr-payment-method">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="20" height="14" x="2" y="5" rx="2"/><path d="M2 10h20"/></svg>
              Visa / Mastercard
            </div>
            <div class="cr-payment-method">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
              PayPal
            </div>
            <div class="cr-payment-method">
              ${SHIELD_SVG}
              Apple Pay
            </div>
            <div class="cr-payment-method">
              ${SHIELD_SVG}
              Google Pay
            </div>
          </div>
        </div>

        <!-- Savings Calculator Section -->
        <div class="cr-savings-section">
          <div class="cr-section-header">
            <h2>See Your <span class="hp-text-red">Savings</span></h2>
            <p>Example: ${exampleService} costs <strong>${exampleCredits} credits</strong>. Here's what you pay with each pack:</p>
          </div>
          <div class="cr-savings-card">
            <div class="cr-savings-header">
              <div class="cr-savings-service">
                ${FIRE_SVG}
                <span>${exampleService}</span>
              </div>
              <div class="cr-savings-credits">${exampleCredits} Credits Required</div>
            </div>
            <div class="cr-savings-rows">
              <div class="cr-savings-row cr-savings-row-base">
                <div class="cr-savings-row-label">
                  <span class="cr-savings-row-icon">💰</span>
                  <span>Without pack <small>(single credit rate)</small></span>
                </div>
                <div class="cr-savings-row-price">
                  <span class="cr-savings-price-strike">${exampleCredits * SINGLE_CREDIT_PRICE}€</span>
                </div>
              </div>
              ${savingsData.map((sd, idx) => `
                <div class="cr-savings-row ${sd.pack.featured ? 'cr-savings-row-featured' : ''} ${sd.pack.elite ? 'cr-savings-row-elite' : ''}">
                  <div class="cr-savings-row-label">
                    <span class="cr-savings-row-icon">${sd.pack.featured ? '⭐' : sd.pack.elite ? '🔥' : '📦'}</span>
                    <span>With <strong>${sd.pack.tier}</strong> Pack</span>
                  </div>
                  <div class="cr-savings-row-price">
                    <span class="cr-savings-price">${sd.withPack}€</span>
                    ${sd.savings > 0 ? `<span class="cr-savings-tag">Save ${sd.savings}€</span>` : ''}
                  </div>
                </div>
              `).join('')}
            </div>
            <div class="cr-savings-footer">
              ${STAR_SVG}
              <span>Save up to <strong>${(exampleCredits * SINGLE_CREDIT_PRICE) - (exampleCredits * CREDIT_PACKS[3].perCreditNum)}€</strong> per ${exampleService} with professional packs.</span>
            </div>
          </div>
        </div>

        <!-- How It Works -->
        <div class="cr-section-header" style="margin-top: 80px;">
          <h2>How It <span class="hp-text-red">Works</span></h2>
        </div>
        <div class="cr-how">
          <div class="cr-how-step">
            <div class="cr-how-num">01</div>
            <h4>Create Account</h4>
            <p>Sign in with Google or email to create your free account.</p>
            <div class="cr-how-arrow">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </div>
          </div>
          <div class="cr-how-step">
            <div class="cr-how-num">02</div>
            <h4>Choose a Pack</h4>
            <p>Select the credit pack that fits your volume. More credits = better rate.</p>
            <div class="cr-how-arrow">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </div>
          </div>
          <div class="cr-how-step">
            <div class="cr-how-num">03</div>
            <h4>Secure Payment</h4>
            <p>Pay via Payhip with card, PayPal, Apple Pay or Google Pay. Instant confirmation.</p>
            <div class="cr-how-arrow">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </div>
          </div>
          <div class="cr-how-step">
            <div class="cr-how-num">04</div>
            <h4>Submit Files</h4>
            <p>Submit ECU files for remapping. Credits deducted per service. Priority based on your pack.</p>
          </div>
        </div>

        <!-- Trust Indicators -->
        <div class="cr-trust-bar">
          <div class="cr-trust-item">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            <span>256-bit SSL Encrypted</span>
          </div>
          <div class="cr-trust-item">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            <span>Instant Credit Delivery</span>
          </div>
          <div class="cr-trust-item">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
            <span>24/7 Support Available</span>
          </div>
          <div class="cr-trust-item">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            <span>Professional B2B Platform</span>
          </div>
        </div>

        <!-- Transaction History -->
        <div class="cr-history">
          <div class="cr-history-card">
            <div class="cr-history-header">
              <h3>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 8v4l3 3"/><circle cx="12" cy="12" r="10"/></svg>
                Transaction History
              </h3>
              <span class="text-xs text-muted">Last 30 days</span>
            </div>
            <div class="cr-history-list">
              ${user && transactions.length > 0 ? transactions.map(tx => `
                <div class="cr-tx">
                  <div class="cr-tx-icon ${tx.type === 'credit' ? 'cr-tx-icon-credit' : 'cr-tx-icon-debit'}">
                    ${tx.type === 'credit'
                      ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14"/><path d="M5 12h14"/></svg>'
                      : '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/></svg>'}
                  </div>
                  <div class="cr-tx-info">
                    <div class="cr-tx-title">${tx.description}</div>
                    <div class="cr-tx-desc">${tx.reference}</div>
                  </div>
                  <span class="cr-tx-amount ${tx.type === 'credit' ? 'cr-tx-amount-pos' : 'cr-tx-amount-neg'}">${tx.type === 'credit' ? '+' : '-'}${tx.amount}</span>
                  <span class="cr-tx-time">${tx.time_ago}</span>
                </div>
              `).join('') : `
                <div class="cr-tx" style="justify-content: center; opacity: 0.5; padding: 2rem;">
                  <p style="margin: 0; color: #999;">${user ? 'No transactions yet. Purchase a credit pack to get started.' : 'Sign in to view your transaction history.'}</p>
                </div>
              `}
            </div>
          </div>
        </div>
      </section>

      <!-- Footer -->
      <footer class="hp-footer">
        <div class="hp-container">
          <div class="hp-footer-bottom">
            <span>© 2025 AS Performance Chiptuning. All rights reserved.</span>
            <span class="hp-footer-tagline">Precision. <span class="hp-text-red">Power.</span> Performance.</span>
          </div>
        </div>
      </footer>
    </div>
  `;

  // Animate balance counter (only if logged in)
  if (user) animateBalance(stats.balance);

  // Logout button handler
  document.getElementById('cr-logout-btn')?.addEventListener('click', async () => {
    await signOut();
    window.location.hash = '#/credits';
    window.location.reload();
  });

  // Generate floating particles in hero
  generateParticles();

  // Log Payhip config status for debugging
  if (!isPayhipConfigured()) {
    console.info('[AS Performance] Payhip product keys not yet configured. Set VITE_PAYHIP_PRODUCT_* in .env');
    console.table(getProductKeyStatus());
  }
}

function animateBalance(targetBalance) {
  const el = document.getElementById('cr-balance-count');
  if (!el) return;
  const target = targetBalance || 0;
  if (target === 0) { el.textContent = '0'; return; }
  const duration = 1500;
  const start = performance.now();
  function step(now) {
    const progress = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(target * ease);
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

function generateParticles() {
  const container = document.getElementById('cr-particles');
  if (!container) return;
  for (let i = 0; i < 30; i++) {
    const p = document.createElement('div');
    p.className = 'cr-particle';
    p.style.left = `${Math.random() * 100}%`;
    p.style.top = `${Math.random() * 100}%`;
    p.style.animationDelay = `${Math.random() * 6}s`;
    p.style.animationDuration = `${4 + Math.random() * 6}s`;
    p.style.width = p.style.height = `${2 + Math.random() * 3}px`;
    container.appendChild(p);
  }
}
