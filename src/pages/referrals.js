import { renderSidebar, renderHeader, initLayoutEvents } from '../components/layout.js';
import { getCurrentUser, isAdmin, isCustomer, isTechnician } from '../lib/auth.js';
import { demoProfiles, getProfileById } from '../lib/store.js';
import { icon, refreshIcons } from '../lib/icons.js';
import { showToast, showModal } from '../lib/utils.js';
import {
  referralCodes, referralSignups, referralRewards,
  getOrCreateReferralCode, getReferralLink, getReferralStats,
  getRewardsForCustomer, getSignupsForCode, REFERRAL_CONFIG,
  trackReferralSignup, validateAndReward, useReward,
  getRemainingSlots, AFFILIATE_TIERS, calculateReferralDiscount,
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
        <div class="stat-top"><span class="stat-label">Credits Rewarded</span><div class="stat-arrow">${icon('gift', 16)}</div></div>
        <div class="stat-value" style="color:#34D399">${stats.totalCreditsRewarded}</div>
        <div class="stat-change">${icon('shield', 12)} ${stats.abuseAttempts} abuse attempts blocked</div>
      </div>
    </div>

    <!-- Referral Codes Table -->
    <div class="card animate-in" style="animation-delay:0.25s;padding:0;overflow:hidden;margin-bottom:20px">
      <div class="card-header" style="padding:20px 24px 0">
        <h3>${icon('link', 18)} Active Referral Codes</h3>
        <button class="btn btn-primary btn-sm" id="btn-sim-referral">${icon('zap', 14)} Simulate Referral</button>
      </div>
      <table style="margin-top:12px">
        <thead><tr><th>Client</th><th>Code</th><th>Tier</th><th>Referrals</th><th>Credits Earned</th><th>Slots</th></tr></thead>
        <tbody>
          ${allCodes.map(c => {
            const signups = referralSignups.filter(s => s.code === c.code);
            const qualified = signups.filter(s => s.qualifies).length;
            const rewards = referralRewards.filter(r => r.code === c.code);
            const totalCredits = rewards.reduce((s, r) => s + r.rewardCredits, 0);
            const tierConfig = AFFILIATE_TIERS[c.tier] || AFFILIATE_TIERS.standard;
            const slots = getRemainingSlots(c.ownerId);
            return `<tr>
              <td><div class="font-semibold" style="color:#fff">${c.ownerName}</div></td>
              <td><code class="ref-code-badge">${c.code}</code></td>
              <td><span style="color:${tierConfig.color};font-weight:600;font-size:12px">${tierConfig.icon} ${tierConfig.label}</span></td>
              <td><span class="badge badge-assigned">${qualified}/${signups.length}</span></td>
              <td><span style="color:#34D399;font-weight:700">${totalCredits} credits</span></td>
              <td><span style="color:${slots.remaining > 0 ? '#FBBF24' : '#EF4444'};font-size:12px;font-weight:600">${slots.used}/${slots.max}</span></td>
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
        <thead><tr><th>Referrer</th><th>Referred</th><th>Order</th><th>Reward</th><th>Status</th><th>Date</th></tr></thead>
        <tbody>
          ${referralSignups.map(s => {
            const referrerName = referralCodes.find(c => c.code === s.code)?.ownerName || '—';
            return `<tr>
              <td><div class="font-semibold" style="color:#fff">${referrerName}</div><div class="text-xs text-muted">${s.code}</div></td>
              <td style="color:#fff">${s.referredName}</td>
              <td style="font-weight:600;color:${s.orderAmount >= 100 ? '#34D399' : '#fff'}">${s.orderAmount ? fmtCurrency(s.orderAmount) : '—'}</td>
              <td style="color:#FBBF24;font-weight:700">${s.rewardIssued ? `${s.rewardCredits} credits` : '—'}</td>
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
  const totalCredits = rewards.reduce((s, r) => s + r.rewardCredits, 0);
  const slots = getRemainingSlots(user.id);
  const tierConfig = AFFILIATE_TIERS[codeEntry.tier] || AFFILIATE_TIERS.standard;

  return `
    <!-- Hero Banner -->
    <div class="ref-hero animate-in" style="animation-delay:0.05s">
      <div class="ref-hero-content">
        <div class="ref-hero-icon">${icon('gift', 32)}</div>
        <h2 class="ref-hero-title">Invite Professionals & Earn Credits</h2>
        <p class="ref-hero-desc">Share your unique link with other professionals. When they place their first order of <strong>€100+</strong>, you earn <strong>${tierConfig.rewardCredits} credits</strong> added directly to your wallet.</p>
      </div>
      <div class="ref-hero-visual">
        <div class="ref-step">
          <div class="ref-step-num">1</div>
          <div class="ref-step-label">Share Your<br/>Unique Link</div>
        </div>
        <div class="ref-step-arrow">${icon('arrow-right', 20)}</div>
        <div class="ref-step">
          <div class="ref-step-num">2</div>
          <div class="ref-step-label">They Order<br/>€100+</div>
        </div>
        <div class="ref-step-arrow">${icon('arrow-right', 20)}</div>
        <div class="ref-step">
          <div class="ref-step-num">3</div>
          <div class="ref-step-label">You Earn<br/>${tierConfig.rewardCredits} Credits</div>
        </div>
      </div>
    </div>

    <!-- Referral Link Card -->
    <div class="ref-link-card animate-in" style="animation-delay:0.12s">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:20px;flex-wrap:wrap;gap:12px">
        <h3 style="color:#fff;display:flex;align-items:center;gap:8px;font-size:16px;font-weight:700">${icon('link', 18)} Your Referral Link</h3>
        <div style="display:flex;align-items:center;gap:12px">
          <div class="ref-code-badge">${codeEntry.code}</div>
          <span style="color:${tierConfig.color};font-size:12px;font-weight:700">${tierConfig.icon} ${tierConfig.label}</span>
        </div>
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
      <!-- Slots Remaining -->
      <div style="margin-top:16px;padding:14px 18px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);border-radius:4px;display:flex;align-items:center;justify-content:space-between">
        <div style="display:flex;align-items:center;gap:10px">
          ${icon('users', 16)}
          <span style="font-size:13px;color:var(--brand-silver)">Referral Slots Used</span>
        </div>
        <div style="display:flex;align-items:center;gap:8px">
          <div style="width:120px;height:6px;background:rgba(255,255,255,0.08);border-radius:3px;overflow:hidden">
            <div style="height:100%;width:${(slots.used/slots.max)*100}%;background:${slots.remaining > 0 ? 'linear-gradient(90deg,#C41E1E,#E63946)' : '#EF4444'};border-radius:3px;transition:width 0.5s"></div>
          </div>
          <span style="font-weight:700;font-size:14px;color:${slots.remaining > 0 ? '#fff' : '#EF4444'}">${slots.used} / ${slots.max}</span>
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
            <div class="ref-stat-value" style="color:#34D399">${totalCredits}</div>
            <div class="ref-stat-label">Credits Earned</div>
          </div>
          <div class="ref-stat-item">
            <div class="ref-stat-value" style="color:#FBBF24">${slots.remaining}</div>
            <div class="ref-stat-label">Slots Remaining</div>
          </div>
          <div class="ref-stat-item">
            <div class="ref-stat-value">${tierConfig.rewardCredits}</div>
            <div class="ref-stat-label">Credits per Referral</div>
          </div>
        </div>
      </div>

      <!-- Rewards -->
      <div class="card">
        <div class="card-header"><h3>${icon('gift', 18)} Credit Rewards</h3></div>
        ${rewards.length ? rewards.map(r => `
          <div class="ref-reward-card ${r.status === 'credited' ? '' : 'pending'}">
            <div class="ref-reward-left">
              <div class="ref-reward-amount">+${r.rewardCredits} credits</div>
              <div class="ref-reward-meta">Referred ${r.referredName} · Order ${fmtCurrency(r.orderAmount)}</div>
              <div class="ref-reward-meta">${r.status === 'credited' ? 'Added to wallet' : `Pending · Valid until ${fmtDate(r.expiresAt)}`}</div>
            </div>
            <div class="ref-reward-right">
              ${r.status === 'credited'
                ? `<span class="badge badge-completed" style="opacity:0.9">${icon('check', 10)} Credited</span>`
                : `<span class="badge" style="background:rgba(245,158,11,0.12);color:#FBBF24;border:1px solid rgba(245,158,11,0.2);padding:4px 10px;border-radius:20px;font-size:11px;font-weight:700">${icon('clock', 10)} Pending</span>`
              }
            </div>
          </div>
        `).join('') : `
          <div style="padding:32px;text-align:center">
            <div style="font-size:36px;margin-bottom:12px;opacity:0.3">🎁</div>
            <div style="color:var(--brand-silver);font-weight:600;margin-bottom:4px">No rewards yet</div>
            <div style="color:var(--brand-muted);font-size:var(--text-xs)">Share your link to start earning credits!</div>
          </div>
        `}
      </div>
    </div>

    <!-- Rules & Info -->
    <div class="ref-how-works animate-in" style="animation-delay:0.22s">
      <div class="ref-how-card">
        <div class="ref-how-icon" style="background:rgba(196,30,30,0.1);color:var(--brand-red-light)">${icon('send', 22)}</div>
        <div class="ref-how-title">Share Your Link</div>
        <div class="ref-how-desc">Send your unique referral link to professionals, garages, and colleagues via WhatsApp, email, or SMS.</div>
      </div>
      <div class="ref-how-card">
        <div class="ref-how-icon" style="background:rgba(59,130,246,0.1);color:#60A5FA">${icon('user-plus', 22)}</div>
        <div class="ref-how-title">They Get 15% Off</div>
        <div class="ref-how-desc">Your referral gets 15% discount on their first order of €100+. One use per customer, cannot be stacked.</div>
      </div>
      <div class="ref-how-card">
        <div class="ref-how-icon" style="background:rgba(52,211,153,0.1);color:#34D399">${icon('credit-card', 22)}</div>
        <div class="ref-how-title">You Earn Credits</div>
        <div class="ref-how-desc">After their order is validated, ${tierConfig.rewardCredits} credits are added to your wallet. Use them for any service on the platform.</div>
      </div>
    </div>

    <!-- Referred Friends -->
    ${signups.length ? `
    <div class="card animate-in" style="animation-delay:0.26s;margin-top:20px">
      <div class="card-header"><h3>${icon('users', 18)} Referred Professionals</h3></div>
      ${signups.map(s => `
        <div class="ref-friend-row">
          <div class="ref-friend-info">
            <div class="ref-friend-name">${icon('user', 14)} ${s.referredName}</div>
            <div class="ref-friend-date">Joined ${fmtDate(s.createdAt)}</div>
          </div>
          <div style="text-align:right">
            ${s.qualifies
              ? `<span style="color:#34D399;font-weight:700;font-size:15px">+${s.rewardCredits} credits</span><br/><span class="text-xs" style="color:#34D399;display:inline-flex;align-items:center;gap:4px">${icon('check-circle', 10)} Validated</span>`
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
  const pageTitle = isAdminView ? 'Referral Program' : 'Refer & Earn Credits';
  const pageDesc = isAdminView
    ? 'Manage referral codes, track conversions, monitor credit rewards and anti-abuse.'
    : 'Invite professionals to AS Performance and earn credits for your wallet.';

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
    const text = encodeURIComponent(`🔧 Professional chiptuning from AS Performance. Use my referral link for 15% off your first order:\n${link}`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  });

  // Email share
  document.getElementById('btn-share-email')?.addEventListener('click', () => {
    const code = getOrCreateReferralCode(user.id, user.full_name);
    const link = getReferralLink(code.code);
    const subject = encodeURIComponent('AS Performance — Professional Chiptuning Platform');
    const body = encodeURIComponent(`Hi,\n\nI've been using AS Performance for professional ECU chiptuning and wanted to recommend them.\n\nUse my referral link to get 15% off your first order (€100+ minimum):\n${link}\n\nThey offer fast turnaround, professional quality, and a great credit system for regular use.\n\nBest regards`);
    window.open(`mailto:?subject=${subject}&body=${body}`, '_blank');
  });

  // SMS share
  document.getElementById('btn-share-sms')?.addEventListener('click', () => {
    const code = getOrCreateReferralCode(user.id, user.full_name);
    const link = getReferralLink(code.code);
    const text = encodeURIComponent(`🔧 AS Performance chiptuning — 15% off with my link: ${link}`);
    window.open(`sms:?body=${text}`, '_blank');
  });

  // Admin: Simulate referral
  document.getElementById('btn-sim-referral')?.addEventListener('click', () => {
    const codeOptions = referralCodes.filter(c => c.active)
      .map(c => `<option value="${c.code}">${c.ownerName} (${c.code})</option>`).join('');

    showModal('Simulate Referral', `
      <p class="text-sm text-muted" style="margin-bottom:16px">Test the referral flow by simulating a new customer signup and validated order.</p>
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

        const fakeId = 'sim-' + Date.now().toString(36);
        const signup = trackReferralSignup(code, fakeId, name);

        if (!signup) {
          showToast('Referral blocked — check anti-abuse log (self-referral, duplicate, or limit reached)', 'error');
          close();
          return;
        }

        if (amount >= REFERRAL_CONFIG.minOrderAmount) {
          const reward = validateAndReward(fakeId, amount);
          if (reward) {
            showToast(`✅ ${reward.rewardCredits} credits rewarded to ${reward.referrerName}!`, 'success');
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
