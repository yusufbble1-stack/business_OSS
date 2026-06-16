import { renderSidebar, renderHeader, initLayoutEvents } from '../components/layout.js';
import { getCurrentUser, isAdmin, isCustomer, isTechnician } from '../lib/auth.js';
import { demoProfiles, getProfileById } from '../lib/store.js';
import { icon, refreshIcons } from '../lib/icons.js';
import { showToast, showModal } from '../lib/utils.js';
import { t, getLang } from '../lib/i18n.js';
import {
  referralCodes, referralSignups, referralRewards,
  getOrCreateReferralCode, getReferralLink, getReferralStats,
  getRewardsForCustomer, getSignupsForCode, REFERRAL_CONFIG,
  trackReferralSignup, validateAndReward, useReward,
  getRemainingSlots, AFFILIATE_TIERS, calculateReferralDiscount,
} from '../lib/referrals.js';

function fmtDate(d) {
  const locale = getLang() === 'fr' ? 'fr-FR' : 'en-GB';
  return new Date(d).toLocaleDateString(locale, { day:'numeric', month:'short', year:'numeric' });
}
function fmtCurrency(n) { return `€${Number(n).toFixed(2)}`; }

// ===== ADMIN VIEW =====
function renderAdminReferralView() {
  const stats = getReferralStats();
  const allCodes = referralCodes.filter(c => c.active);

  return `
    <!-- Stats Cards -->
    <div class="stats-grid" style="margin-bottom:24px">
      <div class="stat-card highlighted animate-in" style="animation-delay:0.05s">
        <div class="stat-top"><span class="stat-label">${t('active_codes', {}, 'Active Codes')}</span><div class="stat-arrow">${icon('link', 16)}</div></div>
        <div class="stat-value">${stats.totalCodes}</div>
        <div class="stat-change">${icon('users', 12)} ${t('clients_referral_links_desc', {}, 'Clients with referral links')}</div>
      </div>
      <div class="stat-card animate-in" style="animation-delay:0.1s">
        <div class="stat-top"><span class="stat-label">${t('total_signups', {}, 'Total Signups')}</span><div class="stat-arrow">${icon('user-plus', 16)}</div></div>
        <div class="stat-value" style="color:#60A5FA">${stats.totalSignups}</div>
        <div class="stat-change">${icon('trending-up', 12)} ${t('referred_customers_desc', {}, 'Referred customers')}</div>
      </div>
      <div class="stat-card animate-in" style="animation-delay:0.15s">
        <div class="stat-top"><span class="stat-label">${t('conversion', {}, 'Conversion')}</span><div class="stat-arrow">${icon('target', 16)}</div></div>
        <div class="stat-value" style="color:#FBBF24">${stats.conversionRate}%</div>
        <div class="stat-change">${icon('zap', 12)} ${t('qualified_orders_desc', {}, 'Qualified orders (€100+)')}</div>
      </div>
      <div class="stat-card animate-in" style="animation-delay:0.2s">
        <div class="stat-top"><span class="stat-label">${t('credits_rewarded', {}, 'Credits Rewarded')}</span><div class="stat-arrow">${icon('gift', 16)}</div></div>
        <div class="stat-value" style="color:#34D399">${stats.totalCreditsRewarded}</div>
        <div class="stat-change">${icon('shield', 12)} ${t('abuse_attempts_blocked_desc', { num: stats.abuseAttempts }, '{num} abuse attempts blocked')}</div>
      </div>
    </div>
 
    <!-- Referral Codes Table -->
    <div class="card animate-in" style="animation-delay:0.25s;padding:0;overflow:hidden;margin-bottom:20px">
      <div class="card-header" style="padding:20px 24px 0">
        <h3>${icon('link', 18)} ${t('active_referral_codes', {}, 'Active Referral Codes')}</h3>
        <button class="btn btn-primary" id="btn-sim-referral" style="padding: 6px 12px; font-size: var(--text-xs); border-radius: 6px;">${icon('zap', 14)} ${t('simulate_referral', {}, 'Simulate Referral')}</button>
      </div>
      <div style="overflow-x:auto"><table style="margin-top:12px;min-width:600px">
        <thead><tr><th>${t('client')}</th><th>${t('code', {}, 'Code')}</th><th>${t('tier', {}, 'Tier')}</th><th>${t('referrals')}</th><th>${t('credits_earned', {}, 'Credits Earned')}</th><th>${t('slots', {}, 'Slots')}</th></tr></thead>
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
              <td><span style="color:#34D399;font-weight:700">${totalCredits} ${t('credits')}</span></td>
              <td><span style="color:${slots.remaining > 0 ? '#FBBF24' : '#EF4444'};font-size:12px;font-weight:600">${slots.used}/${slots.max}</span></td>
            </tr>`;
          }).join('')}
        </tbody>
      </table></div>
    </div>
 
    <!-- Recent Referral Activity -->
    <div class="card animate-in" style="animation-delay:0.35s;padding:0;overflow:hidden">
      <div class="card-header" style="padding:20px 24px 0">
        <h3>${icon('activity', 18)} ${t('referral_history', {}, 'Referral History')}</h3>
      </div>
      <div style="overflow-x:auto"><table style="margin-top:12px;min-width:600px">
        <thead><tr><th>${t('referrer', {}, 'Referrer')}</th><th>${t('referred', {}, 'Referred')}</th><th>${t('order', {}, 'Order')}</th><th>${t('reward', {}, 'Reward')}</th><th>${t('status')}</th><th>${t('date')}</th></tr></thead>
        <tbody>
          ${referralSignups.map(s => {
            const referrerName = referralCodes.find(c => c.code === s.code)?.ownerName || '—';
            return `<tr>
              <td><div class="font-semibold" style="color:#fff">${referrerName}</div><div class="text-xs text-muted">${s.code}</div></td>
              <td style="color:#fff">${s.referredName}</td>
              <td style="font-weight:600;color:${s.orderAmount >= 100 ? '#34D399' : '#fff'}">${s.orderAmount ? fmtCurrency(s.orderAmount) : '—'}</td>
              <td style="color:#FBBF24;font-weight:700">${s.rewardIssued ? `${s.rewardCredits} ${t('credits')}` : '—'}</td>
              <td>${s.qualifies
                ? `<span class="badge badge-completed">${icon('check', 10)} ${t('qualified', {}, 'Qualified')}</span>`
                : `<span class="badge badge-pending">${t('pending')}</span>`}</td>
              <td class="text-xs text-muted">${fmtDate(s.createdAt)}</td>
            </tr>`;
          }).join('')}
          ${!referralSignups.length ? `<tr><td colspan="6" style="text-align:center;padding:24px;color:var(--brand-muted)">${t('no_referrals_yet', {}, 'No referrals yet')}</td></tr>` : ''}
        </tbody>
      </table></div>
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
        <h2 class="ref-hero-title">${t('invite_professionals_earn_credits', {}, 'Invite Professionals & Earn Credits')}</h2>
        <p class="ref-hero-desc">${t('referral_hero_desc', { credits: tierConfig.rewardCredits }, `Share your unique link with other professionals. When they place their first order of <strong>€100+</strong>, you earn <strong>{credits} credits</strong> added directly to your wallet.`)}</p>
      </div>
      <div class="ref-hero-visual">
        <div class="ref-step">
          <div class="ref-step-num">1</div>
          <div class="ref-step-label">${t('step_1_share_link', {}, 'Share Your<br/>Unique Link')}</div>
        </div>
        <div class="ref-step-arrow">${icon('arrow-right', 20)}</div>
        <div class="ref-step">
          <div class="ref-step-num">2</div>
          <div class="ref-step-label">${t('step_2_order_min', {}, 'They Order<br/>€100+')}</div>
        </div>
        <div class="ref-step-arrow">${icon('arrow-right', 20)}</div>
        <div class="ref-step">
          <div class="ref-step-num">3</div>
          <div class="ref-step-label">${t('step_3_earn_reward', { credits: tierConfig.rewardCredits }, 'You Earn<br/>{credits} Credits')}</div>
        </div>
      </div>
    </div>
 
    <!-- Referral Link Card -->
    <div class="ref-link-card animate-in" style="animation-delay:0.12s">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:20px;flex-wrap:wrap;gap:12px">
        <h3 style="color:#fff;display:flex;align-items:center;gap:8px;font-size:16px;font-weight:700">${icon('link', 18)} ${t('your_referral_link', {}, 'Your Referral Link')}</h3>
        <div style="display:flex;align-items:center;gap:12px">
          <div class="ref-code-badge">${codeEntry.code}</div>
          <span style="color:${tierConfig.color};font-size:12px;font-weight:700">${tierConfig.icon} ${tierConfig.label}</span>
        </div>
      </div>
      <div class="ref-link-box">
        <div class="ref-link-field">
          <input type="text" class="ref-link-input" value="${link}" readonly id="ref-link-input" />
          <button class="btn btn-primary" id="btn-copy-link" style="padding:14px 24px;font-weight:700">${icon('copy', 14)} ${t('copy_link', {}, 'Copy Link')}</button>
        </div>
        <div class="ref-share-buttons">
          <button class="btn ref-share-btn ref-share-whatsapp" id="btn-share-wa">${icon('message-circle', 14)} ${t('share_via_whatsapp', {}, 'Share via WhatsApp')}</button>
          <button class="btn ref-share-btn ref-share-email" id="btn-share-email">${icon('mail', 14)} ${t('share_via_email', {}, 'Share via Email')}</button>
          <button class="btn ref-share-btn ref-share-sms" id="btn-share-sms">${icon('smartphone', 14)} ${t('share_via_sms', {}, 'Share via SMS')}</button>
        </div>
      </div>
      <!-- Slots Remaining -->
      <div style="margin-top:16px;padding:14px 18px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);border-radius:4px;display:flex;align-items:center;justify-content:space-between">
        <div style="display:flex;align-items:center;gap:10px">
          ${icon('users', 16)}
          <span style="font-size:13px;color:var(--brand-silver)">${t('referral_slots_used', {}, 'Referral Slots Used')}</span>
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
        <div class="card-header"><h3>${icon('bar-chart-3', 18)} ${t('your_stats', {}, 'Your Stats')}</h3></div>
        <div class="ref-stats-grid">
          <div class="ref-stat-item">
            <div class="ref-stat-value">${signups.length}</div>
            <div class="ref-stat-label">${t('friends_referred', {}, 'Friends Referred')}</div>
          </div>
          <div class="ref-stat-item">
            <div class="ref-stat-value" style="color:#34D399">${totalCredits}</div>
            <div class="ref-stat-label">${t('credits_earned', {}, 'Credits Earned')}</div>
          </div>
          <div class="ref-stat-item">
            <div class="ref-stat-value" style="color:#FBBF24">${slots.remaining}</div>
            <div class="ref-stat-label">${t('slots_remaining', {}, 'Slots Remaining')}</div>
          </div>
          <div class="ref-stat-item">
            <div class="ref-stat-value">${tierConfig.rewardCredits}</div>
            <div class="ref-stat-label">${t('credits_per_referral', {}, 'Credits per Referral')}</div>
          </div>
        </div>
      </div>
 
      <!-- Rewards -->
      <div class="card">
        <div class="card-header"><h3>${icon('gift', 18)} ${t('credit_rewards', {}, 'Credit Rewards')}</h3></div>
        ${rewards.length ? rewards.map(r => `
          <div class="ref-reward-card ${r.status === 'credited' ? '' : 'pending'}">
            <div class="ref-reward-left">
              <div class="ref-reward-amount">+${r.rewardCredits} ${t('credits')}</div>
              <div class="ref-reward-meta">${t('referred_details', { name: r.referredName, amount: fmtCurrency(r.orderAmount) }, `Referred {name} · Order {amount}`)}</div>
              <div class="ref-reward-meta">${r.status === 'credited' ? t('added_to_wallet', {}, 'Added to wallet') : t('pending_reward_details', { date: fmtDate(r.expiresAt) }, `Pending · Valid until {date}`)}</div>
            </div>
            <div class="ref-reward-right">
              ${r.status === 'credited'
                ? `<span class="badge badge-completed" style="opacity:0.9">${icon('check', 10)} ${t('credited', {}, 'Credited')}</span>`
                : `<span class="badge" style="background:rgba(245,158,11,0.12);color:#FBBF24;border:1px solid rgba(245,158,11,0.2);padding:4px 10px;border-radius:20px;font-size:11px;font-weight:700">${icon('clock', 10)} ${t('pending')}</span>`
              }
            </div>
          </div>
        `).join('') : `
          <div style="padding:32px;text-align:center">
            <div style="font-size:36px;margin-bottom:12px;opacity:0.3">🎁</div>
            <div style="color:var(--brand-silver);font-weight:600;margin-bottom:4px">${t('no_rewards_yet', {}, 'No rewards yet')}</div>
            <div style="color:var(--brand-muted);font-size:var(--text-xs)">${t('share_link_to_earn_desc', {}, 'Share your link to start earning credits!')}</div>
          </div>
        `}
      </div>
    </div>
 
    <!-- Rules & Info -->
    <div class="ref-how-works animate-in" style="animation-delay:0.22s">
      <div class="ref-how-card">
        <div class="ref-how-icon" style="background:rgba(196,30,30,0.1);color:var(--brand-red-light)">${icon('send', 22)}</div>
        <div class="ref-how-title">${t('rule_1_title', {}, 'Share Your Link')}</div>
        <div class="ref-how-desc">${t('rule_1_desc', {}, 'Send your unique referral link to professionals, garages, and colleagues via WhatsApp, email, or SMS.')}</div>
      </div>
      <div class="ref-how-card">
        <div class="ref-how-icon" style="background:rgba(59,130,246,0.1);color:#60A5FA">${icon('user-plus', 22)}</div>
        <div class="ref-how-title">${t('rule_2_title', {}, 'They Get 15% Off')}</div>
        <div class="ref-how-desc">${t('rule_2_desc', {}, 'Your referral gets 15% discount on their first order of €100+. One use per customer, cannot be stacked.')}</div>
      </div>
      <div class="ref-how-card">
        <div class="ref-how-icon" style="background:rgba(52,211,153,0.1);color:#34D399">${icon('credit-card', 22)}</div>
        <div class="ref-how-title">${t('rule_3_title', {}, 'You Earn Credits')}</div>
        <div class="ref-how-desc">${t('rule_3_desc', { credits: tierConfig.rewardCredits }, `After their order is validated, {credits} credits are added to your wallet. Use them for any service on the platform.`)}</div>
      </div>
    </div>
 
    <!-- Referred Friends -->
    ${signups.length ? `
    <div class="card animate-in" style="animation-delay:0.26s;margin-top:20px">
      <div class="card-header"><h3>${icon('users', 18)} ${t('referred_professionals', {}, 'Referred Professionals')}</h3></div>
      ${signups.map(s => `
        <div class="ref-friend-row">
          <div class="ref-friend-info">
            <div class="ref-friend-name">${icon('user', 14)} ${s.referredName}</div>
            <div class="ref-friend-date">${t('joined_date', { date: fmtDate(s.createdAt) }, `Joined {date}`)}</div>
          </div>
          <div style="text-align:right">
            ${s.qualifies
              ? `<span style="color:#34D399;font-weight:700;font-size:15px">+${s.rewardCredits} ${t('credits')}</span><br/><span class="text-xs" style="color:#34D399;display:inline-flex;align-items:center;gap:4px">${icon('check-circle', 10)} ${t('qualified', {}, 'Qualified')}</span>`
              : `<span style="display:inline-flex;align-items:center;gap:4px;padding:4px 10px;border-radius:20px;background:rgba(245,158,11,0.08);color:#FBBF24;font-size:11px;font-weight:600">${icon('clock', 10)} ${t('awaiting_order', {}, 'Awaiting order')}</span>`
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
  const pageTitle = isAdminView ? t('referral_program', {}, 'Referral Program') : t('refer_earn_credits', {}, 'Refer & Earn Credits');
  const pageDesc = isAdminView
    ? t('referral_admin_desc', {}, 'Manage referral codes, track conversions, monitor credit rewards and anti-abuse.')
    : t('referral_client_desc', {}, 'Invite professionals to AS Performance and earn credits for your wallet.');

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
              <span class="cal-role-badge ${isAdminView ? 'admin' : 'customer'}">${icon(isAdminView ? 'shield' : 'user', 14)} ${isAdminView ? 'Admin' : t('my_referrals', {}, 'My Referrals')}</span>
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
        .then(() => showToast(t('link_copied_toast', {}, 'Link copied to clipboard!'), 'success'))
        .catch(() => { input.select(); document.execCommand('copy'); showToast(t('link_copied_toast', {}, 'Link copied to clipboard!'), 'success'); });
    }
  });

  // WhatsApp share
  document.getElementById('btn-share-wa')?.addEventListener('click', () => {
    const code = getOrCreateReferralCode(user.id, user.full_name);
    const link = getReferralLink(code.code);
    const text = encodeURIComponent(t('whatsapp_share_text', { link }, `🔧 Professional chiptuning from AS Performance. Use my referral link for 15% off your first order:\n{link}`));
    window.open(`https://wa.me/?text=${text}`, '_blank');
  });

  // Email share
  document.getElementById('btn-share-email')?.addEventListener('click', () => {
    const code = getOrCreateReferralCode(user.id, user.full_name);
    const link = getReferralLink(code.code);
    const subject = encodeURIComponent(t('email_share_subject', {}, 'AS Performance — Professional Chiptuning Platform'));
    const body = encodeURIComponent(t('email_share_body', { link }, `Hi,\n\nI've been using AS Performance for professional ECU chiptuning and wanted to recommend them.\n\nUse my referral link to get 15% off your first order (€100+ minimum):\n{link}\n\nThey offer fast turnaround, professional quality, and a great credit system for regular use.\n\nBest regards`));
    window.open(`mailto:?subject=${subject}&body=${body}`, '_blank');
  });

  // SMS share
  document.getElementById('btn-share-sms')?.addEventListener('click', () => {
    const code = getOrCreateReferralCode(user.id, user.full_name);
    const link = getReferralLink(code.code);
    const text = encodeURIComponent(t('sms_share_text', { link }, `🔧 AS Performance chiptuning — 15% off with my link: {link}`));
    window.open(`sms:?body=${text}`, '_blank');
  });

  // Admin: Simulate referral
  document.getElementById('btn-sim-referral')?.addEventListener('click', () => {
    const codeOptions = referralCodes.filter(c => c.active)
      .map(c => `<option value="${c.code}">${c.ownerName} (${c.code})</option>`).join('');

    showModal(t('simulate_referral', {}, 'Simulate Referral'), `
      <p class="text-sm text-muted" style="margin-bottom:16px">${t('simulate_referral_desc', {}, 'Test the referral flow by simulating a new customer signup and validated order.')}</p>
      <div class="form-group"><label>${t('referral_code', {}, 'Referral Code')}</label><select id="sim-code">${codeOptions}</select></div>
      <div class="form-row">
        <div class="form-group"><label>${t('new_customer_name', {}, 'New Customer Name')}</label><input type="text" id="sim-name" value="Marc Dubois" placeholder="Customer name"/></div>
        <div class="form-group"><label>${t('order_amount', {}, 'Order Amount (€)')}</label><input type="number" id="sim-amount" value="280" placeholder="100+"/></div>
      </div>
    `, [{
      id: 'btn-sim-go', label: `${icon('zap', 14)} ${t('run_simulation', {}, 'Run Simulation')}`, class: 'btn-primary',
      onClick: (_, close) => {
        const code = document.getElementById('sim-code')?.value;
        const name = document.getElementById('sim-name')?.value?.trim();
        const amount = parseFloat(document.getElementById('sim-amount')?.value);
        if (!code || !name) { showToast(t('code_name_required', {}, 'Code and name required'), 'error'); return; }

        const fakeId = 'sim-' + Date.now().toString(36);
        const signup = trackReferralSignup(code, fakeId, name);

        if (!signup) {
          showToast(t('referral_blocked_toast', {}, 'Referral blocked — check anti-abuse log (self-referral, duplicate, or limit reached)'), 'error');
          close();
          return;
        }

        if (amount >= REFERRAL_CONFIG.minOrderAmount) {
          const reward = validateAndReward(fakeId, amount);
          if (reward) {
            showToast(t('credits_rewarded_success_toast', { num: reward.rewardCredits, name: reward.referrerName }, `✅ {num} credits rewarded to {name}!`), 'success');
          }
        } else {
          showToast(t('signup_tracked_below_min_toast', { amount, min: REFERRAL_CONFIG.minOrderAmount }, `Signup tracked but order €{amount} is below €{min} minimum`), 'warning');
        }
        close();
        renderReferralsPage();
      },
    }]);
  });
}
