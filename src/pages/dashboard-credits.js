// ===== Dashboard Credits Page (inside sidebar layout) =====
import { renderSidebar, renderHeader, initLayoutEvents } from '../components/layout.js';
import { getCurrentUser } from '../lib/auth.js';
import { getWalletStats, getTransactions } from '../lib/wallet.js';
import { CREDIT_PACKS, SINGLE_CREDIT_PRICE, getCheckoutUrl, isPayhipConfigured } from '../lib/payhip.js';
import { icon } from '../lib/icons.js';
import { t } from '../lib/i18n.js';

const CHECK_SVG = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>';
const ARROW_SVG = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>';

export async function renderDashboardCreditsPage() {
  const app = document.getElementById('app');
  const user = getCurrentUser();

  // Fetch wallet stats asynchronously
  let stats = { balance: 0, filesProcessed: 0, priority: 'Standard', rating: '—', recentTransactions: [] };
  try { stats = await getWalletStats(user?.id); } catch(e) { console.warn('[DashCredits] Stats error:', e); }
  const transactions = stats.recentTransactions || [];

  app.innerHTML = `
    <div class="app-layout">
      ${renderSidebar()}
      <main class="app-main">
        ${renderHeader()}
        <div class="page-content">
          <div class="page-header animate-in">
            <div>
              <h1>${icon('credit-card', 24)} ${t('credits')}</h1>
              <p>${t('credits_sub')}</p>
            </div>
          </div>

          <!-- Wallet Stats Cards -->
          <div class="stats-row animate-in" style="animation-delay:0.05s">
            <div class="stat-card">
              <div class="stat-icon" style="background:rgba(76,175,80,0.15);color:#4CAF50">
                ${icon('credit-card', 22)}
              </div>
              <div>
                <span class="stat-value" id="dcr-balance">${stats.balance}</span>
                <span class="stat-label">${t('credits_balance')}</span>
              </div>
            </div>
            <div class="stat-card">
              <div class="stat-icon" style="background:rgba(33,150,243,0.15);color:#2196F3">
                ${icon('file-text', 22)}
              </div>
              <div>
                <span class="stat-value">${stats.filesProcessed}</span>
                <span class="stat-label">${t('files_processed', {}, 'Files Processed')}</span>
              </div>
            </div>
            <div class="stat-card">
              <div class="stat-icon" style="background:rgba(196,30,30,0.15);color:#C41E1E">
                ${icon('star', 22)}
              </div>
              <div>
                <span class="stat-value">${stats.priority}</span>
                <span class="stat-label">${t('priority_level', {}, 'Priority Level')}</span>
              </div>
            </div>
            <div class="stat-card">
              <div class="stat-icon" style="background:rgba(255,193,7,0.15);color:#FFC107">
                ${icon('award', 22)}
              </div>
              <div>
                <span class="stat-value">${stats.rating}</span>
                <span class="stat-label">${t('avg_rating', {}, 'Avg Rating')}</span>
              </div>
            </div>
          </div>

          <!-- Credit Packs Section -->
          <div class="card animate-in" style="animation-delay:0.1s;padding:24px">
            <div class="card-header" style="margin-bottom:20px">
              <h3>${t('purchase_professional_packs', {}, 'Purchase <span style="color:#C41E1E">Professional Packs</span>')}</h3>
              <p class="text-sm text-muted" style="margin:4px 0 0">${t('purchase_packs_sub', {}, 'Bigger packs = lower per-credit cost + higher priority + faster delivery')}</p>
            </div>
            <div class="dcr-packs-grid">
              ${CREDIT_PACKS.map(pack => `
                <div class="dcr-pack ${pack.featured ? 'dcr-pack-featured' : ''} ${pack.elite ? 'dcr-pack-elite' : ''} ${pack.discreet ? 'dcr-pack-discreet' : ''}">
                  ${pack.badge ? `<span class="dcr-pack-badge ${pack.featured ? 'dcr-badge-best' : ''} ${pack.elite ? 'dcr-badge-elite' : ''}">${pack.badge}</span>` : ''}
                  <div class="dcr-pack-tier">${pack.tier}</div>
                  <div class="dcr-pack-credits">${pack.credits} <span>${pack.credits > 1 ? t('credits') : t('credit', {}, 'credit')}</span></div>
                  <div class="dcr-pack-price">${pack.price}</div>
                  <div class="dcr-pack-per">
                    ${pack.perCredit}/credit · ${pack.priority}
                    ${pack.savingsPercent > 0 ? `<span class="dcr-savings-tag">-${pack.savingsPercent}%</span>` : ''}
                  </div>
                  <ul class="dcr-pack-features">
                    ${pack.features.map(f => `<li>${CHECK_SVG} ${f}</li>`).join('')}
                  </ul>
                  <a href="${getCheckoutUrl(pack.credits, user?.email)}"
                     ${getCheckoutUrl(pack.credits) !== '#' ? 'target="_blank" rel="noopener"' : ''}
                     class="btn ${pack.featured ? 'btn-primary' : 'btn-secondary'} dcr-buy-btn"
                     data-credits="${pack.credits}">
                    ${getCheckoutUrl(pack.credits) !== '#' ? `${t('buy_now', {}, 'Buy Now')} ${ARROW_SVG}` : t('coming_soon', {}, 'Coming Soon')}
                  </a>
                </div>
              `).join('')}
            </div>

            <!-- Payment Methods -->
            <div class="dcr-payment-strip">
              <span style="color:rgba(255,255,255,0.4);font-size:12px">${t('secure_payments_via', {}, 'Secure payments via')}</span>
              <div class="dcr-payment-icons">
                <span class="dcr-pm">💳 Visa / MC</span>
                <span class="dcr-pm">🌐 PayPal</span>
                <span class="dcr-pm">🍎 Apple Pay</span>
                <span class="dcr-pm">📱 Google Pay</span>
              </div>
            </div>
          </div>

          <!-- Transaction History -->
          <div class="card animate-in" style="animation-delay:0.15s;padding:0;margin-top:20px">
            <div class="card-header" style="padding:20px 24px;border-bottom:1px solid rgba(255,255,255,0.06)">
              <h3>${icon('clock', 18)} ${t('transaction_history', {}, 'Transaction History')}</h3>
              <span class="text-xs text-muted">${t('last_30_days', {}, 'Last 30 days')}</span>
            </div>
            <div class="dcr-tx-list">
              ${transactions.length > 0 ? transactions.map(tx => `
                <div class="dcr-tx-row">
                  <div class="dcr-tx-icon ${tx.type === 'credit' ? 'dcr-tx-credit' : 'dcr-tx-debit'}">
                    ${tx.type === 'credit' ? icon('plus', 16) : icon('minus', 16)}
                  </div>
                  <div class="dcr-tx-info">
                    <div class="dcr-tx-title">${tx.description}</div>
                    <div class="dcr-tx-ref">${tx.reference}</div>
                  </div>
                  <span class="dcr-tx-amount ${tx.type === 'credit' ? 'dcr-amount-pos' : 'dcr-amount-neg'}">
                    ${tx.type === 'credit' ? '+' : '-'}${tx.amount}
                  </span>
                  <span class="dcr-tx-time">${tx.time_ago}</span>
                </div>
              `).join('') : `
                <div style="padding:40px;text-align:center;color:rgba(255,255,255,0.3)">
                  <p>${t('no_transactions_yet', {}, 'No transactions yet. Purchase a credit pack to get started.')}</p>
                </div>
              `}
            </div>
          </div>

        </div>
      </main>
    </div>`;

  initLayoutEvents();

  // Animate balance counter
  animateBalance(stats.balance);
}

function animateBalance(targetBalance) {
  const el = document.getElementById('dcr-balance');
  if (!el || !targetBalance) return;
  const duration = 1200;
  const start = performance.now();
  function step(now) {
    const progress = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(targetBalance * ease);
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}
