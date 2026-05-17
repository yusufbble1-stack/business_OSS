import { renderSidebar, renderHeader, initLayoutEvents } from '../components/layout.js';
import { getCurrentUser, isAdmin, isCustomer, isTechnician } from '../lib/auth.js';
import { demoProfiles, getProfileById } from '../lib/store.js';
import { icon, refreshIcons } from '../lib/icons.js';
import { showToast, showModal } from '../lib/utils.js';
import {
  referralCodes, referralSignups, referralRewards,
  getOrCreateReferralCode, getReferralLink, getReferralStats,
  getRewardsForCustomer, getSignupsForCode, REFERRAL_CONFIG,
  trackReferralSignup, checkAndIssueReferralDiscount, useReward,
} from '../lib/referrals.js';

function fmtDate(d) { return new Date(d).toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric' }); }
function fmtCurrency(n) { return `€${Number(n).toFixed(2)}`; }

// ===== ADMIN VIEW =====
function renderAdminReferralView() {
  const stats = getReferralStats();
  const allCodes = referralCodes.filter(c => c.active);

  return `
    <!-- Stats Cards -->
    <div class="stats-grid" style="margin-bottom:24px">
      <div class="stat-card highlighted animate-in" style="animation-delay:0.05s">
        <div class="stat-top"><span class="stat-label">Active Codes</span><div class="stat-arrow">${icon('link', 16)}</div></div>
        <div class="stat-value">${stats.totalCodes}</div>
        <div class="stat-change">${icon('users', 12)} Clients with referral links</div>
      </div>
      <div class="stat-card animate-in" style="animation-delay:0.1s">
        <div class="stat-top"><span class="stat-label">Total Signups</span><div class="stat-arrow">${icon('user-plus', 16)}</div></div>
        <div class="stat-value" style="color:#60A5FA">${stats.totalSignups}</div>
        <div class="stat-change">${icon('trending-up', 12)} Referred customers</div>
      </div>
      <div class="stat-card animate-in" style="animation-delay:0.15s">
        <div class="stat-top"><span class="stat-label">Conversion</span><div class="stat-arrow">${icon('target', 16)}</div></div>
        <div class="stat-value" style="color:#FBBF24">${stats.conversionRate}%</div>
        <div class="stat-change">${icon('zap', 12)} Qualified orders (€100+)</div>
      </div>
      <div class="stat-card animate-in" style="animation-delay:0.2s">
        <div class="stat-top"><span class="stat-label">Discounts Issued</span><div class="stat-arrow">${icon('gift', 16)}</div></div>
        <div class="stat-value" style="color:#34D399">${fmtCurrency(stats.totalDiscounts)}</div>
        <div class="stat-change">${icon('percent', 12)} ${stats.unusedRewards} unused rewards</div>
      </div>
    </div>

    <!-- Referral Codes Table -->
    <div class="card animate-in" style="animation-delay:0.25s;padding:0;overflow:hidden;margin-bottom:20px">
      <div class="card-header" style="padding:20px 24px 0">
        <h3>${icon('link', 18)} Active Referral Codes</h3>
        <button class="btn btn-primary btn-sm" id="btn-sim-referral">${icon('zap', 14)} Simulate Referral</button>
      </div>
      <table style="margin-top:12px">
        <thead><tr><th>Client</th><th>Code</th><th>Link</th><th>Signups</th><th>Earned</th><th>Created</th></tr></thead>
        <tbody>
          ${allCodes.map(c => {
            const signups = referralSignups.filter(s => s.code === c.code);
            const rewards = referralRewards.filter(r => r.code === c.code);
            const totalEarned = rewards.reduce((s, r) => s + r.discountValue, 0);
            return `<tr>
              <td><div class="font-semibold" style="color:#fff">${c.ownerName}</div></td>
              <td><code class="ref-code-badge">${c.code}</code></td>
              <td><span class="text-xs text-muted ref-link-text" title="${getReferralLink(c.code)}">${getReferralLink(c.code).slice(0, 35)}...</span></td>
              <td><span class="badge badge-assigned">${signups.length}</span></td>
              <td><span style="color:#34D399;font-weight:700">${fmtCurrency(totalEarned)}</span></td>
              <td class="text-xs text-muted">${fmtDate(c.createdAt)}</td>
            </tr>`;
          }).join('')}
        </tbody>
      </table>
    </div>

    <!-- Recent Referral Activity -->
    <div class="card animate-in" style="animation-delay:0.35s;padding:0;overflow:hidden">
      <div class="card-header" style="padding:20px 24px 0">
        <h3>${icon('activity', 18)} Referral History</h3>
      </div>
      <table style="margin-top:12px">
        <thead><tr><th>Referrer</th><th>Referred</th><th>Order</th><th>Discount</th><th>Status</th><th>Date</th></tr></thead>
        <tbody>
          ${referralSignups.map(s => {
            const referrerName = referralCodes.find(c => c.code === s.code)?.ownerName || '—';
            return `<tr>
              <td><div class="font-semibold" style="color:#fff">${referrerName}</div><div class="text-xs text-muted">${s.code}</div></td>
              <td style="color:#fff">${s.referredName}</td>
              <td style="font-weight:600;color:${s.orderAmount >= 100 ? '#34D399' : '#fff'}">${s.orderAmount ? fmtCurrency(s.orderAmount) : '—'}</td>
              <td style="color:#FBBF24;font-weight:700">${s.discountIssued ? fmtCurrency(s.discountAmount) : '—'}</td>
              <td>${s.qualifies
                ? `<span class="badge badge-completed">${icon('check', 10)} Qualified</span>`
                : `<span class="badge badge-pending">Pending</span>`}</td>
              <td class="text-xs text-muted">${fmtDate(s.createdAt)}</td>
            </tr>`;
          }).join('')}
          ${!referralSignups.length ? '<tr><td colspan="6" style="text-align:center;padding:24px;color:var(--brand-muted)">No referrals yet</td></tr>' : ''}
        </tbody>
      </table>
    </div>
  `;
}

// ===== CLIENT VIEW =====
function renderClientReferralView(user) {
  const codeEntry = getOrCreateReferralCode(user.id, user.full_name);
  const link = getReferralLink(codeEntry.code);
  const signups = getSignupsForCode(codeEntry.code);
  const rewards = getRewardsForCustomer(user.id);
  const totalEarned = rewards.reduce((s, r) => s + r.discountValue, 0);
  const unusedRewards = rewards.filter(r => !r.used);

  return `
    <!-- Hero Banner -->
    <div class="ref-hero animate-in" style="animation-delay:0.05s">
      <div class="ref-hero-content">
        <div class="ref-hero-icon">${icon('gift', 32)}</div>
        <h2 class="ref-hero-title">Refer & Earn 15% Off</h2>
        <p class="ref-hero-desc">Share your unique link with friends. When they order <strong>€100+</strong> in chiptuning services, you automatically get <strong>15% off</strong> your next service!</p>
      </div>
      <div class="ref-hero-visual">
        <div class="ref-step">
          <div class="ref-step-num">1</div>
          <div class="ref-step-label">Share Your<br/>Unique Link</div>
        </div>
        <div class="ref-step-arrow">${icon('arrow-right', 20)}</div>
        <div class="ref-step">
          <div class="ref-step-num">2</div>
          <div class="ref-step-label">Friend Places<br/>Order €100+</div>
        </div>
        <div class="ref-step-arrow">${icon('arrow-right', 20)}</div>
        <div class="ref-step">
          <div class="ref-step-num">3</div>
          <div class="ref-step-label">You Get 15%<br/>Discount</div>
        </div>
      </div>
    </div>

    <!-- Your Referral Link (accent card) -->
    <div class="ref-link-card animate-in" style="animation-delay:0.12s">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:20px;flex-wrap:wrap;gap:12px">
        <h3 style="color:#fff;display:flex;align-items:center;gap:8px;font-size:16px;font-weight:700">${icon('link', 18)} Your Referral Link</h3>
        <div class="ref-code-badge">${codeEntry.code}</div>
      </div>
      <div class="ref-link-box">
        <div class="ref-link-field">
          <input type="text" class="ref-link-input" value="${link}" readonly id="ref-link-input" />
          <button class="btn btn-primary" id="btn-copy-link" style="padding:14px 24px;font-weight:700">${icon('copy', 14)} Copy Link</button>
        </div>
        <div class="ref-share-buttons">
          <button class="btn ref-share-btn ref-share-whatsapp" id="btn-share-wa">${icon('message-circle', 14)} Share via WhatsApp</button>
          <button class="btn ref-share-btn ref-share-email" id="btn-share-email">${icon('mail', 14)} Share via Email</button>
          <button class="btn ref-share-btn ref-share-sms" id="btn-share-sms">${icon('smartphone', 14)} Share via SMS</button>
        </div>
      </div>
    </div>

    <div class="dash-grid-2 animate-in" style="animation-delay:0.18s">
      <!-- Stats -->
      <div class="card">
        <div class="card-header"><h3>${icon('bar-chart-3', 18)} Your Stats</h3></div>
        <div class="ref-stats-grid">
          <div class="ref-stat-item">
            <div class="ref-stat-value">${signups.length}</div>
            <div class="ref-stat-label">Friends Referred</div>
          </div>
          <div class="ref-stat-item">
            <div class="ref-stat-value" style="color:#34D399">${fmtCurrency(totalEarned)}</div>
            <div class="ref-stat-label">Total Earned</div>
          </div>
          <div class="ref-stat-item">
            <div class="ref-stat-value" style="color:#FBBF24">${unusedRewards.length}</div>
            <div class="ref-stat-label">Available Rewards</div>
          </div>
          <div class="ref-stat-item">
            <div class="ref-stat-value">${REFERRAL_CONFIG.discountPercent}%</div>
            <div class="ref-stat-label">Discount Rate</div>
          </div>
        </div>
      </div>

      <!-- Rewards -->
      <div class="card">
        <div class="card-header"><h3>${icon('gift', 18)} Your Rewards</h3></div>
        ${rewards.length ? rewards.map(r => `
          <div class="ref-reward-card ${r.used ? 'used' : ''}">
            <div class="ref-reward-left">
              <div class="ref-reward-amount">${fmtCurrency(r.discountValue)}</div>
              <div class="ref-reward-meta">${r.discountPercent}% off · Referred ${r.referredName}</div>
              <div class="ref-reward-meta">${r.used ? 'Used' : `Valid until ${fmtDate(r.expiresAt)}`}</div>
            </div>
            <div class="ref-reward-right">
              ${r.used
                ? `<span class="badge badge-completed" style="opacity:0.7">${icon('check', 10)} Used</span>`
                : `<span class="badge" style="background:rgba(52,211,153,0.12);color:#34D399;border:1px solid rgba(52,211,153,0.2);padding:4px 10px;border-radius:20px;font-size:11px;font-weight:700">${icon('zap', 10)} Available</span>`
              }
            </div>
          </div>
        `).join('') : `
          <div style="padding:32px;text-align:center">
            <div style="font-size:36px;margin-bottom:12px;opacity:0.3">🎁</div>
            <div style="color:var(--brand-silver);font-weight:600;margin-bottom:4px">No rewards yet</div>
            <div style="color:var(--brand-muted);font-size:var(--text-xs)">Share your link to start earning discounts!</div>
          </div>
        `}
      </div>
    </div>

    <!-- How it Works Guide -->
    <div class="ref-how-works animate-in" style="animation-delay:0.22s">
      <div class="ref-how-card">
        <div class="ref-how-icon" style="background:rgba(196,30,30,0.1);color:var(--brand-red-light)">${icon('send', 22)}</div>
        <div class="ref-how-title">Share Your Link</div>
        <div class="ref-how-desc">Copy your unique referral link and send it to friends, family, or colleagues via WhatsApp, email, or SMS.</div>
      </div>
      <div class="ref-how-card">
        <div class="ref-how-icon" style="background:rgba(59,130,246,0.1);color:#60A5FA">${icon('user-plus', 22)}</div>
        <div class="ref-how-title">Friend Signs Up</div>
        <div class="ref-how-desc">When your friend clicks your link and submits their first chiptuning request of €100 or more, they're tracked as your referral.</div>
      </div>
      <div class="ref-how-card">
        <div class="ref-how-icon" style="background:rgba(52,211,153,0.1);color:#34D399">${icon('badge-percent', 22)}</div>
        <div class="ref-how-title">You Get Rewarded</div>
        <div class="ref-how-desc">You automatically receive a 15% discount on your next service. The reward is valid for 90 days. No limits on referrals!</div>
      </div>
    </div>

    <!-- Referral Activity -->
    ${signups.length ? `
    <div class="card animate-in" style="animation-delay:0.26s;margin-top:20px">
      <div class="card-header"><h3>${icon('users', 18)} Referred Friends</h3></div>
      ${signups.map(s => `
        <div class="ref-friend-row">
          <div class="ref-friend-info">
            <div class="ref-friend-name">${icon('user', 14)} ${s.referredName}</div>
            <div class="ref-friend-date">Joined ${fmtDate(s.createdAt)}</div>
          </div>
          <div style="text-align:right">
            ${s.qualifies
              ? `<span style="color:#34D399;font-weight:700;font-size:15px">${fmtCurrency(s.orderAmount)}</span><br/><span class="text-xs" style="color:#34D399;display:inline-flex;align-items:center;gap:4px">${icon('check-circle', 10)} Qualified</span>`
              : `<span style="display:inline-flex;align-items:center;gap:4px;padding:4px 10px;border-radius:20px;background:rgba(245,158,11,0.08);color:#FBBF24;font-size:11px;font-weight:600">${icon('clock', 10)} Awaiting order</span>`
            }
          </div>
        </div>
      `).join('')}
    </div>` : ''}
  `;
}

// ===== MAIN RENDER =====
export function renderReferralsPage() {
  const app = document.getElementById('app');
  const user = getCurrentUser();

  const isAdminView = isAdmin();
  const pageTitle = isAdminView ? 'Referral Program' : 'Refer & Earn';
  const pageDesc = isAdminView
    ? 'Manage affiliate codes, track referrals, and monitor discount rewards.'
    : 'Share your link. When friends order €100+, you get 15% off your next service!';

  app.innerHTML = `
    <div class="app-layout">
      ${renderSidebar()}
      <main class="app-main">
        ${renderHeader()}
        <div class="page-content">
          <div class="page-header animate-in">
            <div>
              <h1>${icon('gift', 28)} ${pageTitle}</h1>
              <p>${pageDesc}</p>
            </div>
            <div class="flex gap-3 items-center flex-wrap">
              <span class="cal-role-badge ${isAdminView ? 'admin' : 'customer'}">${icon(isAdminView ? 'shield' : 'user', 14)} ${isAdminView ? 'Admin' : 'My Referrals'}</span>
            </div>
          </div>

          ${isAdminView ? renderAdminReferralView() : renderClientReferralView(user)}
        </div>
      </main>
    </div>`;

  initLayoutEvents();
  bindReferralEvents(user);
}

// ===== EVENT BINDINGS =====
function bindReferralEvents(user) {
  // Copy link
  document.getElementById('btn-copy-link')?.addEventListener('click', () => {
    const input = document.getElementById('ref-link-input');
    if (input) {
      navigator.clipboard?.writeText(input.value)
        .then(() => showToast('Link copied to clipboard!', 'success'))
        .catch(() => { input.select(); document.execCommand('copy'); showToast('Link copied!', 'success'); });
    }
  });

  // WhatsApp share
  document.getElementById('btn-share-wa')?.addEventListener('click', () => {
    const code = getOrCreateReferralCode(user.id, user.full_name);
    const link = getReferralLink(code.code);
    const text = encodeURIComponent(`🔧 Get chiptuning from AS Performance! Use my referral link and we both win:\n${link}`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  });

  // Email share
  document.getElementById('btn-share-email')?.addEventListener('click', () => {
    const code = getOrCreateReferralCode(user.id, user.full_name);
    const link = getReferralLink(code.code);
    const subject = encodeURIComponent('Check out AS Performance — Chiptuning');
    const body = encodeURIComponent(`Hey!\n\nI've been using AS Performance for chiptuning and they're great. Use my referral link to sign up:\n\n${link}\n\nWhen you place your first order of €100+, I get 15% off my next service. Win-win!\n\nCheers`);
    window.open(`mailto:?subject=${subject}&body=${body}`, '_blank');
  });

  // SMS share
  document.getElementById('btn-share-sms')?.addEventListener('click', () => {
    const code = getOrCreateReferralCode(user.id, user.full_name);
    const link = getReferralLink(code.code);
    const text = encodeURIComponent(`🔧 AS Performance chiptuning — use my link: ${link}`);
    window.open(`sms:?body=${text}`, '_blank');
  });

  // Admin: Simulate referral
  document.getElementById('btn-sim-referral')?.addEventListener('click', () => {
    const customers = demoProfiles.filter(p => p.role === 'customer' && p.is_active);
    const codeOptions = referralCodes.filter(c => c.active)
      .map(c => `<option value="${c.code}">${c.ownerName} (${c.code})</option>`).join('');

    showModal('Simulate Referral', `
      <p class="text-sm text-muted" style="margin-bottom:16px">Test the referral flow by simulating a new customer signup and order.</p>
      <div class="form-group"><label>Referral Code</label><select id="sim-code">${codeOptions}</select></div>
      <div class="form-row">
        <div class="form-group"><label>New Customer Name</label><input type="text" id="sim-name" value="Marc Dubois" placeholder="Customer name"/></div>
        <div class="form-group"><label>Order Amount (€)</label><input type="number" id="sim-amount" value="280" placeholder="100+"/></div>
      </div>
    `, [{
      id: 'btn-sim-go', label: `${icon('zap', 14)} Run Simulation`, class: 'btn-primary',
      onClick: (_, close) => {
        const code = document.getElementById('sim-code')?.value;
        const name = document.getElementById('sim-name')?.value?.trim();
        const amount = parseFloat(document.getElementById('sim-amount')?.value);
        if (!code || !name) { showToast('Code and name required', 'error'); return; }

        // Track signup
        const fakeId = 'sim-' + Date.now().toString(36);
        trackReferralSignup(code, fakeId, name);

        // Check discount
        if (amount >= REFERRAL_CONFIG.minOrderAmount) {
          const reward = checkAndIssueReferralDiscount(fakeId, amount);
          if (reward) {
            showToast(`✅ Discount of €${reward.discountValue} issued to ${reward.referrerName}!`, 'success');
          }
        } else {
          showToast(`Signup tracked but order €${amount} is below €${REFERRAL_CONFIG.minOrderAmount} minimum`, 'warning');
        }
        close();
        renderReferralsPage();
      },
    }]);
  });
}
