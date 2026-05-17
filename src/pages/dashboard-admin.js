import { renderSidebar, renderHeader, initLayoutEvents } from '../components/layout.js';
import { getCurrentUser } from '../lib/auth.js';
import { demoRequests, demoProfiles, demoActivity, getProfileById, getStats } from '../lib/store.js';
import { timeAgo, SERVICE_LABELS, STATUS_LABELS } from '../lib/utils.js';
import { icon } from '../lib/icons.js';
import { avatarImg } from '../lib/avatars.js';

// Animated counter — counts from 0 to target
function animateCounters() {
  document.querySelectorAll('[data-count]').forEach(el => {
    const target = parseInt(el.dataset.count);
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    const duration = 1200;
    const start = performance.now();
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      el.textContent = prefix + Math.round(eased * target) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  });
}

// Animate bars growing from 0
function animateBars() {
  document.querySelectorAll('[data-bar-height]').forEach(bar => {
    const targetH = bar.dataset.barHeight;
    bar.style.height = '0px';
    requestAnimationFrame(() => {
      setTimeout(() => {
        bar.style.transition = 'height 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        bar.style.height = targetH + 'px';
      }, 100);
    });
  });
}

// Animate progress ring
function animateRing() {
  document.querySelectorAll('[data-ring-offset]').forEach(circle => {
    const finalOffset = circle.dataset.ringOffset;
    const fullCircle = circle.dataset.ringFull;
    circle.style.strokeDashoffset = fullCircle;
    requestAnimationFrame(() => {
      setTimeout(() => {
        circle.style.transition = 'stroke-dashoffset 1.2s cubic-bezier(0.4, 0, 0.2, 1)';
        circle.style.strokeDashoffset = finalOffset;
      }, 200);
    });
  });
}

export function renderAdminDashboard() {
  const app = document.getElementById('app');
  const user = getCurrentUser();
  const stats = getStats();

  const recentRequests = [...demoRequests].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 5);
  const recentActivity = [...demoActivity].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 6);
  const techs = demoProfiles.filter(p => p.role === 'technician' && p.is_active);
  const pctDone = stats.total ? Math.round((stats.completed / stats.total) * 100) : 0;

  const serviceCounts = {};
  demoRequests.forEach(r => { serviceCounts[r.service_type] = (serviceCounts[r.service_type] || 0) + 1; });
  const maxService = Math.max(...Object.values(serviceCounts), 1);

  const circumference = 2 * Math.PI * 58;
  const ringOffset = circumference * (1 - pctDone / 100);

  app.innerHTML = `
    <div class="app-layout">
      ${renderSidebar()}
      <main class="app-main">
        ${renderHeader()}
        <div class="page-content">
          <div class="page-header animate-in">
            <div>
              <h1>Dashboard</h1>
              <p>Track your chiptuning requests, team and revenue at a glance.</p>
            </div>
            <div class="flex gap-3 flex-wrap">
              <a href="#/requests/new" class="btn btn-primary">${icon('plus', 16)} New Request</a>
              <button class="btn btn-secondary">${icon('download', 16)} Export</button>
            </div>
          </div>

          <div class="stats-grid">
            <div class="stat-card highlighted animate-in" style="animation-delay:0.05s">
              <div class="stat-top"><span class="stat-label">Total Requests</span><div class="stat-arrow">${icon('arrow-up-right', 16)}</div></div>
              <div class="stat-value" data-count="${stats.total}">0</div>
              <div class="stat-change up">${icon('trending-up', 12)} Increased from last month</div>
            </div>
            <div class="stat-card animate-in" style="animation-delay:0.1s">
              <div class="stat-top"><span class="stat-label">Completed</span><div class="stat-arrow">${icon('arrow-up-right', 16)}</div></div>
              <div class="stat-value" style="color:var(--status-completed)" data-count="${stats.completed}">0</div>
              <div class="stat-change up">${icon('check-circle', 12)} Delivered</div>
            </div>
            <div class="stat-card animate-in" style="animation-delay:0.15s">
              <div class="stat-top"><span class="stat-label">In Progress</span><div class="stat-arrow">${icon('arrow-up-right', 16)}</div></div>
              <div class="stat-value" style="color:var(--status-progress)" data-count="${stats.inProgress}">0</div>
              <div class="stat-change">${icon('clock', 12)} Active now</div>
            </div>
            <div class="stat-card animate-in" style="animation-delay:0.2s">
              <div class="stat-top"><span class="stat-label">Pending</span><div class="stat-arrow">${icon('arrow-up-right', 16)}</div></div>
              <div class="stat-value" style="color:var(--status-pending)" data-count="${stats.pending}">0</div>
              <div class="stat-change" style="color:var(--status-pending)">${icon('alert-circle', 12)} Needs attention</div>
            </div>
          </div>

          <div class="dash-grid" style="margin-bottom:16px">
            <div class="card animate-in" style="animation-delay:0.25s">
              <div class="card-header"><h3>${icon('bar-chart-3', 18)} Service Analytics</h3></div>
              <div style="display:flex;align-items:flex-end;gap:8px;height:140px;padding-top:8px">
                ${Object.entries(SERVICE_LABELS).map(([key, label]) => {
                  const count = serviceCounts[key] || 0;
                  const height = Math.max((count / maxService) * 100, 8);
                  return `<div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:6px;min-width:0">
                    <span class="text-xs font-bold" style="color:#fff" data-count="${count}">0</span>
                    <div data-bar-height="${height}" style="width:100%;height:0;background:linear-gradient(to top,var(--brand-red),var(--brand-red-light));border-radius:6px 6px 4px 4px"></div>
                    <span style="font-size:7px;color:var(--brand-muted);text-align:center;line-height:1.15;word-break:break-word;max-width:100%">${label}</span>
                  </div>`;
                }).join('')}
              </div>
            </div>

            <div class="card animate-in" style="animation-delay:0.3s">
              <div class="card-header"><h3>${icon('euro', 18)} Revenue</h3></div>
              <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;padding:12px 0">
                <div style="font-family:var(--font-heading);font-size:42px;font-weight:800;color:var(--status-completed);line-height:1" data-count="${stats.revenue}" data-prefix="€">€0</div>
                <p style="margin-top:8px;font-size:var(--text-xs)">From paid invoices</p>
                <div style="display:flex;gap:16px;margin-top:20px;flex-wrap:wrap;justify-content:center">
                  <div style="text-align:center"><div class="text-sm font-bold" style="color:#fff" data-count="${stats.activeCustomers}">0</div><div class="text-xs text-muted">Customers</div></div>
                  <div style="width:1px;background:var(--brand-border)"></div>
                  <div style="text-align:center"><div class="text-sm font-bold" style="color:#fff" data-count="${stats.activeTechs}">0</div><div class="text-xs text-muted">Technicians</div></div>
                  <div style="width:1px;background:var(--brand-border)"></div>
                  <div style="text-align:center"><div class="text-sm font-bold" style="color:#fff" data-count="${stats.completed ? Math.round(stats.revenue / stats.completed) : 0}" data-prefix="€">€0</div><div class="text-xs text-muted">Avg/Job</div></div>
                </div>
              </div>
            </div>

            <div class="card animate-in" style="animation-delay:0.35s">
              <div class="card-header"><h3>${icon('pie-chart', 18)} Completion</h3></div>
              <div class="progress-ring">
                <svg width="140" height="140" viewBox="0 0 140 140">
                  <circle cx="70" cy="70" r="58" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="10"/>
                  <circle cx="70" cy="70" r="58" fill="none" stroke="var(--brand-red)" stroke-width="10"
                    stroke-dasharray="${circumference}"
                    data-ring-offset="${ringOffset}" data-ring-full="${circumference}"
                    stroke-linecap="round" style="stroke-dashoffset:${circumference};filter:drop-shadow(0 0 6px rgba(196,30,30,0.4))"/>
                </svg>
                <div class="progress-ring-value">
                  <span class="progress-ring-pct" data-count="${pctDone}" data-suffix="%">0%</span>
                  <span class="progress-ring-label">Completed</span>
                </div>
              </div>
              <div style="display:flex;justify-content:center;gap:16px;margin-top:16px;flex-wrap:wrap">
                <span class="text-xs" style="display:flex;align-items:center;gap:4px;color:#fff"><span style="width:8px;height:8px;border-radius:50%;background:var(--status-completed)"></span> Done</span>
                <span class="text-xs" style="display:flex;align-items:center;gap:4px;color:#fff"><span style="width:8px;height:8px;border-radius:50%;background:var(--status-progress)"></span> Active</span>
                <span class="text-xs" style="display:flex;align-items:center;gap:4px;color:#fff"><span style="width:8px;height:8px;border-radius:50%;background:var(--status-pending)"></span> Pending</span>
              </div>
            </div>
          </div>

          <div class="dash-grid-2">
            <div class="card animate-in" style="animation-delay:0.4s">
              <div class="card-header">
                <h3>${icon('users', 18)} Team</h3>
                <a href="#/users" class="btn btn-secondary btn-sm">${icon('plus', 14)} Add Member</a>
              </div>
              ${[...techs, ...demoProfiles.filter(p => p.role === 'admin')].map((t, i) => {
                const assigned = demoRequests.filter(r => r.assigned_to === t.id).length;
                return `<div class="member-row">
                  ${avatarImg(t.full_name, 36)}
                  <div class="member-info"><div class="member-name">${t.full_name}</div><div class="member-detail">${assigned} assigned request${assigned !== 1 ? 's' : ''}</div></div>
                  <span class="badge badge-${t.role}">${t.role}</span>
                </div>`;
              }).join('')}
            </div>

            <div class="card animate-in" style="animation-delay:0.45s;padding:0;overflow:hidden">
              <div class="card-header" style="padding:20px 24px 0">
                <h3>${icon('clipboard-list', 18)} Recent Requests</h3>
                <a href="#/requests" class="btn btn-ghost btn-sm" style="color:#fff">View All ${icon('arrow-right', 14)}</a>
              </div>
              <table style="margin-top:12px">
                <thead><tr><th>Request</th><th>Service</th><th>Status</th><th>Date</th></tr></thead>
                <tbody>
                  ${recentRequests.map(r => {
                    const cust = getProfileById(r.customer_id);
                    return `<tr style="cursor:pointer" onclick="window.location.hash='#/requests/${r.id}'">
                      <td><div class="font-semibold truncate" style="max-width:180px;color:#fff">${r.title}</div><div class="text-xs text-muted">${cust?.full_name || '—'}</div></td>
                      <td><span class="badge badge-assigned" style="font-size:9px">${SERVICE_LABELS[r.service_type]}</span></td>
                      <td><span class="badge badge-${r.status}">${STATUS_LABELS[r.status]}</span></td>
                      <td class="text-xs text-muted">${timeAgo(r.created_at)}</td>
                    </tr>`;
                  }).join('')}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>`;

  initLayoutEvents();

  // Trigger animations after DOM is ready
  requestAnimationFrame(() => {
    animateCounters();
    animateBars();
    animateRing();
  });
}
