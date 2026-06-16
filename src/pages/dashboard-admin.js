import { renderSidebar, renderHeader, initLayoutEvents } from '../components/layout.js';
import { getCurrentUser } from '../lib/auth.js';
import { demoRequests, demoProfiles, demoActivity, getProfileById, getStats, changeRequestStatus, updateProfile } from '../lib/store.js';
import { timeAgo, SERVICE_LABELS, STATUS_LABELS, showToast, showModal } from '../lib/utils.js';
import { icon, refreshIcons } from '../lib/icons.js';
import { avatarImg } from '../lib/avatars.js';
import { t } from '../lib/i18n.js';
import { getWallet, adjustCredits } from '../lib/wallet.js';
import { SERVICES, SERVICE_CATEGORIES } from '../lib/service-catalog.js';
import { supabase } from '../lib/supabase.js';

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

export async function renderAdminDashboard() {
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

  // Fetch wallets data from Supabase for all users in profiles
  const { data: walletsData } = await supabase.from('wallets').select('*');
  const walletsMap = {};
  (walletsData || []).forEach(w => { walletsMap[w.user_id] = w; });

  // Get active vehicle bookings (start_date is not null)
  const bookings = demoRequests.filter(r => r.start_date !== null);

  // Compile uploaded files explorer
  const allUploadedFiles = [];
  demoRequests.forEach(r => {
    const custName = getProfileById(r.customer_id)?.full_name || 'Client';
    if (r.original_file) {
      allUploadedFiles.push({
        reqId: r.id,
        reqTitle: r.title,
        custName,
        type: 'Original File',
        columnName: 'original_file',
        filename: r.original_file.split('/').pop(),
        url: r.original_file,
        isPhoto: false,
        date: r.created_at
      });
    }
    if (r.log_file) {
      allUploadedFiles.push({
        reqId: r.id,
        reqTitle: r.title,
        custName,
        type: 'Diagnostic Log',
        columnName: 'log_file',
        filename: r.log_file.split('/').pop(),
        url: r.log_file,
        isPhoto: false,
        date: r.created_at
      });
    }
    if (r.ecu_photo) {
      allUploadedFiles.push({
        reqId: r.id,
        reqTitle: r.title,
        custName,
        type: 'ECU Label Photo',
        columnName: 'ecu_photo',
        filename: r.ecu_photo.split('/').pop(),
        url: r.ecu_photo,
        isPhoto: true,
        date: r.created_at
      });
    }
  });

  app.innerHTML = `
    <style>
      .tabs-header {
        display: flex;
        gap: 8px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        padding-bottom: 0px;
        margin-bottom: 24px;
        flex-wrap: wrap;
      }
      .tab-btn {
        padding: 12px 20px;
        background: transparent;
        border: none;
        color: rgba(255, 255, 255, 0.6);
        cursor: pointer;
        border-radius: 4px 4px 0 0;
        font-weight: 500;
        font-size: 14px;
        transition: all 0.2s;
        border-bottom: 2px solid transparent;
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .tab-btn:hover {
        color: #fff;
        background: rgba(255, 255, 255, 0.03);
      }
      .tab-btn.active {
        color: var(--brand-red-light, #e63946);
        border-bottom-color: var(--brand-red-light, #e63946);
        background: rgba(196, 30, 30, 0.05);
      }
      .admin-table select {
        background: rgba(0,0,0,0.3);
        border: 1px solid rgba(255,255,255,0.1);
        color: #fff;
        font-size: 12px;
        padding: 4px 8px;
        border-radius: 4px;
        cursor: pointer;
      }
    </style>

    <div class="app-layout">
      ${renderSidebar()}
      <main class="app-main">
        ${renderHeader()}
        <div class="page-content">
          <div class="page-header animate-in">
            <div>
              <h1>Admin Control Center</h1>
              <p>System configuration, bookings management, files explorer, and user permissions.</p>
            </div>
            <div class="flex gap-3 flex-wrap">
              <a href="#/requests/new" class="btn btn-primary">${icon('plus', 16)} ${t('new_request')}</a>
            </div>
          </div>

          <div class="tabs-header animate-in">
            <button class="tab-btn active" data-tab="overview">${icon('grid', 14)} Overview</button>
            <button class="tab-btn" data-tab="bookings">${icon('calendar', 14)} Bookings Manager</button>
            <button class="tab-btn" data-tab="users">${icon('users', 14)} Users & VIP/Dealers</button>
            <button class="tab-btn" data-tab="services">${icon('settings', 14)} Service Editor</button>
            <button class="tab-btn" data-tab="files">${icon('upload-cloud', 14)} File Explorer</button>
          </div>

          <!-- TAB OVERVIEW -->
          <div class="tab-content" id="tab-overview">
            <div class="stats-grid">
              <div class="stat-card highlighted animate-in" style="animation-delay:0.05s">
                <div class="stat-top"><span class="stat-label">${t('total_requests', {}, 'Total Requests')}</span><div class="stat-arrow">${icon('arrow-up-right', 16)}</div></div>
                <div class="stat-value" data-count="${stats.total}">0</div>
                <div class="stat-change up">${icon('trending-up', 12)} Increased from last month</div>
              </div>
              <div class="stat-card animate-in" style="animation-delay:0.1s">
                <div class="stat-top"><span class="stat-label">${t('completed')}</span><div class="stat-arrow">${icon('arrow-up-right', 16)}</div></div>
                <div class="stat-value" style="color:var(--status-completed)" data-count="${stats.completed}">0</div>
                <div class="stat-change up">${icon('check-circle', 12)} Delivered</div>
              </div>
              <div class="stat-card animate-in" style="animation-delay:0.15s">
                <div class="stat-top"><span class="stat-label">${t('in_progress')}</span><div class="stat-arrow">${icon('arrow-up-right', 16)}</div></div>
                <div class="stat-value" style="color:var(--status-progress)" data-count="${stats.inProgress}">0</div>
                <div class="stat-change">${icon('clock', 12)} Active now</div>
              </div>
              <div class="stat-card animate-in" style="animation-delay:0.2s">
                <div class="stat-top"><span class="stat-label">${t('pending')}</span><div class="stat-arrow">${icon('arrow-up-right', 16)}</div></div>
                <div class="stat-value" style="color:var(--status-pending)" data-count="${stats.pending}">0</div>
                <div class="stat-change" style="color:var(--status-pending)">${icon('alert-circle', 12)} Needs attention</div>
              </div>
            </div>

            <div class="dash-grid" style="margin-top:24px; margin-bottom:24px">
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
                <div class="card-header"><h3>${icon('euro', 18)} Total Revenue</h3></div>
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
              </div>
            </div>

            <div class="dash-grid-2">
              <div class="card animate-in" style="animation-delay:0.4s">
                <div class="card-header">
                  <h3>${icon('users', 18)} Team Members</h3>
                  <a href="#/users" class="btn btn-secondary btn-sm">${icon('plus', 14)} Add Member</a>
                </div>
                ${[...techs, ...demoProfiles.filter(p => p.role === 'admin')].map((t_prof, i) => {
                  const assigned = demoRequests.filter(r => r.assigned_to === t_prof.id).length;
                  return `<div class="member-row">
                    ${avatarImg(t_prof.full_name, 36)}
                    <div class="member-info"><div class="member-name">${t_prof.full_name}</div><div class="member-detail">${assigned} assigned request${assigned !== 1 ? 's' : ''}</div></div>
                    <span class="badge badge-${t_prof.role}">${t_prof.role}</span>
                  </div>`;
                }).join('')}
              </div>

              <div class="card animate-in" style="animation-delay:0.45s;padding:0;overflow-x:auto">
                <div class="card-header" style="padding:20px 24px 0">
                  <h3>${icon('clipboard-list', 18)} Recent Requests</h3>
                  <a href="#/requests" class="btn btn-ghost btn-sm" style="color:#fff">${t('view_all')} ${icon('arrow-right', 14)}</a>
                </div>
                <table style="margin-top:12px;min-width:500px">
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

          <!-- TAB BOOKINGS MANAGER -->
          <div class="tab-content" id="tab-bookings" style="display:none">
            <div class="card animate-in" style="padding:0; overflow-x:auto">
              <div class="card-header" style="padding:20px 24px">
                <h3>${icon('calendar', 18)} ${t('bookings_manager', {}, 'Vehicle Tuning Bookings Manager')}</h3>
              </div>
              ${bookings.length ? `
                <table class="admin-table" style="min-width:700px">
                  <thead><tr><th>${t('request', {}, 'Request')}/${t('vehicle', {}, 'Vehicle')}</th><th>${t('customer', {}, 'Client')}</th><th>${t('date', {}, 'Date')}</th><th>${t('service', {}, 'Service')}</th><th>${t('priority', {}, 'Priority')}</th><th>${t('status', {}, 'Status')}</th><th>${t('actions', {}, 'Actions')}</th></tr></thead>
                  <tbody>
                    ${bookings.map(r => {
                      const custName = getProfileById(r.customer_id)?.full_name || 'Client';
                      return `
                        <tr>
                          <td>
                            <div class="font-semibold" style="color:#fff">${r.title}</div>
                            <div class="text-xs text-muted">ID: ${r.id.substring(0,8)}</div>
                          </td>
                          <td>${custName}</td>
                          <td>${r.start_date}</td>
                          <td><span class="badge badge-assigned" style="font-size:9px">${SERVICE_LABELS[r.service_type]}</span></td>
                          <td><span class="text-xs">${r.priority}</span></td>
                          <td><span class="badge badge-${r.status}">${STATUS_LABELS[r.status]}</span></td>
                          <td>
                            <div style="display:flex; gap:6px; align-items:center; flex-wrap:wrap">
                              ${r.status === 'pending' ? `
                                <button class="btn btn-primary btn-sm btn-action-booking" data-id="${r.id}" data-action="assigned">${icon('check', 12)} ${t('confirm', {}, 'Confirm')}</button>
                              ` : ''}
                              ${r.status === 'assigned' ? `
                                <button class="btn btn-secondary btn-sm btn-action-booking" style="background:#f39c12; color:#fff; border-color:#f39c12" data-id="${r.id}" data-action="in_progress">${icon('play', 12)} ${t('start', {}, 'Start')}</button>
                              ` : ''}
                              ${r.status === 'in_progress' ? `
                                <button class="btn btn-secondary btn-sm btn-action-booking" style="background:#2ecc71; color:#fff; border-color:#2ecc71" data-id="${r.id}" data-action="completed">${icon('check-circle', 12)} ${t('complete', {}, 'Complete')}</button>
                              ` : ''}
                              ${!['completed','cancelled'].includes(r.status) ? `
                                <span style="width:1px;height:20px;background:rgba(255,255,255,0.1);margin:0 2px"></span>
                                <button class="btn btn-danger btn-sm btn-action-booking" data-id="${r.id}" data-action="cancelled" style="font-size:10px;padding:6px 10px">${icon('x', 12)} ${t('cancel', {}, 'Cancel')}</button>
                              ` : `<span class="text-xs text-muted">—</span>`}
                            </div>
                          </td>
                        </tr>
                      `;
                    }).join('')}
                  </tbody>
                </table>
              ` : `
                <div class="empty-state" style="padding:48px">
                  <h3>${t('no_bookings_found', {}, 'No bookings found')}</h3>
                </div>
              `}
            </div>
          </div>

          <!-- TAB USERS & LOYALTY -->
          <div class="tab-content" id="tab-users" style="display:none">
            <div class="card animate-in" style="padding:0; overflow-x:auto">
              <div class="card-header" style="padding:20px 24px">
                <h3>${icon('users', 18)} ${t('user_accounts_roles', {}, 'User Accounts, Roles & VIP/Dealer Access')}</h3>
              </div>
              <table class="admin-table" style="min-width:800px">
                <thead><tr><th>${t('user', {}, 'User')}</th><th>${t('email', {}, 'Email')}</th><th>${t('system_role', {}, 'System Role')}</th><th>${t('vip_dealer_level', {}, 'VIP/Dealer Level')}</th><th>${t('credits', {}, 'Credits')}</th><th>${t('actions', {}, 'Actions')}</th></tr></thead>
                <tbody>
                  ${demoProfiles.map(p => {
                    const wallet = walletsMap[p.id] || { balance: 0, priority: 'Standard' };
                    return `
                      <tr>
                        <td>
                          <div class="font-semibold" style="color:#fff">${p.full_name}</div>
                          <div class="text-xs text-muted">${p.company_name || 'Individual'}</div>
                        </td>
                        <td>${p.email}</td>
                        <td>
                          <select class="role-select" data-uid="${p.id}">
                            <option value="customer" ${p.role === 'customer' ? 'selected' : ''}>Customer</option>
                            <option value="technician" ${p.role === 'technician' ? 'selected' : ''}>Technician</option>
                            <option value="admin" ${p.role === 'admin' ? 'selected' : ''}>Admin</option>
                          </select>
                        </td>
                        <td>
                          <select class="priority-select" data-uid="${p.id}">
                            <option value="Standard" ${wallet.priority === 'Standard' ? 'selected' : ''}>Standard</option>
                            <option value="Priority" ${wallet.priority === 'Priority' ? 'selected' : ''}>Priority Partner</option>
                            <option value="High" ${wallet.priority === 'High' ? 'selected' : ''}>High VIP</option>
                            <option value="VIP" ${wallet.priority === 'VIP' ? 'selected' : ''}>Gold VIP</option>
                            <option value="Partner" ${wallet.priority === 'Partner' ? 'selected' : ''}>Affiliate Partner</option>
                            <option value="Dealer" ${wallet.priority === 'Dealer' ? 'selected' : ''}>Official Dealer</option>
                          </select>
                        </td>
                        <td class="font-semibold" style="color:#2ecc71">${wallet.balance}</td>
                        <td>
                          <button class="btn btn-secondary btn-sm btn-adjust-credits" data-uid="${p.id}" data-name="${p.full_name}">${icon('plus', 12)} ${t('adjust_credits', {}, 'Adjust Credits')}</button>
                        </td>
                      </tr>
                    `;
                  }).join('')}
                </tbody>
              </table>
            </div>
          </div>

          <!-- TAB SERVICE Price EDITOR -->
          <div class="tab-content" id="tab-services" style="display:none">
            <div class="card animate-in" style="padding:0; overflow-x:auto">
              <div class="card-header" style="padding:20px 24px">
                <h3>${icon('settings', 18)} Services Catalog Costs & Price Editor</h3>
              </div>
              <table class="admin-table" style="min-width:700px">
                <thead><tr><th>Service Name</th><th>Category</th><th>Credits Cost</th><th>Price (display)</th><th>Action</th></tr></thead>
                <tbody>
                  ${SERVICES.map(s => `
                    <tr>
                      <td class="font-semibold" style="color:#fff">${s.name}</td>
                      <td><span class="badge badge-assigned" style="font-size:9px">${SERVICE_CATEGORIES[s.category]?.title || s.category}</span></td>
                      <td>
                        <input type="number" class="service-credits-input" data-sid="${s.id}" value="${s.credits}" style="width:70px; background:rgba(0,0,0,0.3); border:1px solid rgba(255,255,255,0.1); color:#fff; padding:4px 8px; border-radius:4px" />
                      </td>
                      <td>
                        <input type="text" class="service-price-input" data-sid="${s.id}" value="${s.price}" style="width:120px; background:rgba(0,0,0,0.3); border:1px solid rgba(255,255,255,0.1); color:#fff; padding:4px 8px; border-radius:4px" />
                      </td>
                      <td>
                        <button class="btn btn-primary btn-sm btn-save-service" data-sid="${s.id}">Save</button>
                      </td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>

          <!-- TAB FILE EXPLORER -->
          <div class="tab-content" id="tab-files" style="display:none">
            <div class="card animate-in" style="padding:0; overflow-x:auto">
              <div class="card-header" style="padding:20px 24px">
                <h3>${icon('upload-cloud', 18)} Request Files Explorer</h3>
              </div>
              ${allUploadedFiles.length ? `
                <table class="admin-table" style="min-width:700px">
                  <thead><tr><th>Request/User</th><th>File Type</th><th>File Name</th><th>Date Uploaded</th><th>Actions</th></tr></thead>
                  <tbody>
                    ${allUploadedFiles.map(f => `
                      <tr>
                        <td>
                          <div class="font-semibold" style="color:#fff">${f.reqTitle}</div>
                          <div class="text-xs text-muted">Uploaded by: ${f.custName}</div>
                        </td>
                        <td><span class="badge badge-assigned" style="font-size:10px">${f.type}</span></td>
                        <td class="text-xs" style="word-break:break-all">${f.filename}</td>
                        <td class="text-xs text-muted">${new Date(f.date).toLocaleString()}</td>
                        <td>
                          <div style="display:flex; gap:6px">
                            ${f.isPhoto ? `
                              <button class="btn btn-secondary btn-sm btn-preview-photo" data-photo="${f.url}">${icon('image', 14)} Preview</button>
                            ` : ''}
                            <a href="${f.url}" download class="btn btn-secondary btn-sm" target="_blank">${icon('download', 14)}</a>
                            <button class="btn btn-secondary btn-sm btn-delete-file" data-req-id="${f.reqId}" data-col="${f.columnName}" style="background:#e74c3c; color:#fff">${icon('trash-2', 14)} Delete</button>
                          </div>
                        </td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              ` : `
                <div class="empty-state" style="padding:48px">
                  <h3>No files uploaded yet in the system</h3>
                </div>
              `}
            </div>
          </div>

        </div>
      </main>
    </div>`;

  initLayoutEvents();

  // Trigger animations
  requestAnimationFrame(() => {
    animateCounters();
    animateBars();
    animateRing();
  });

  // Handle tab switching
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');
  
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabId = btn.getAttribute('data-tab');
      
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      tabContents.forEach(c => {
        if (c.id === `tab-${tabId}`) {
          c.style.display = 'block';
        } else {
          c.style.display = 'none';
        }
      });
      refreshIcons();
    });
  });

  // Booking actions (Confirm, Start, Complete, Cancel)
  document.querySelectorAll('.btn-action-booking').forEach(btn => {
    btn.addEventListener('click', async () => {
      const bId = btn.getAttribute('data-id');
      const action = btn.getAttribute('data-action');
      await changeRequestStatus(bId, action, user.id);
      showToast(`Booking status updated to ${action}!`, 'success');
      renderAdminDashboard();
    });
  });

  // User Role changes
  document.querySelectorAll('.role-select').forEach(select => {
    select.addEventListener('change', async () => {
      const uId = select.getAttribute('data-uid');
      const newRole = select.value;
      await updateProfile(uId, { role: newRole });
      showToast('User role updated!', 'success');
    });
  });

  // User VIP/Loyalty Priority level changes
  document.querySelectorAll('.priority-select').forEach(select => {
    select.addEventListener('change', async () => {
      const uId = select.getAttribute('data-uid');
      const newPriority = select.value;
      const { error } = await supabase.from('wallets').update({ priority: newPriority }).eq('user_id', uId);
      if (error) {
        console.error(error);
        showToast('Failed to update VIP status', 'error');
      } else {
        showToast('Loyalty status tier updated!', 'success');
      }
    });
  });

  // Adjust credits button
  document.querySelectorAll('.btn-adjust-credits').forEach(btn => {
    btn.addEventListener('click', () => {
      const uId = btn.getAttribute('data-uid');
      const name = btn.getAttribute('data-name');
      showModal(`Adjust Credits - ${name}`, `
        <div style="display:flex; flex-direction:column; gap:12px; padding:10px 0">
          <div class="form-group">
            <label>Amount (Positive to add, Negative to deduct)</label>
            <input type="number" id="adj-amount" placeholder="e.g. 5 or -3" style="width:100%; padding:8px; border:1px solid rgba(255,255,255,0.15); background:rgba(0,0,0,0.2); color:#fff; border-radius:4px" />
          </div>
          <div class="form-group">
            <label>Reason / Description</label>
            <input type="text" id="adj-desc" placeholder="Token pack adjustment, loyalty bonus etc." style="width:100%; padding:8px; border:1px solid rgba(255,255,255,0.15); background:rgba(0,0,0,0.2); color:#fff; border-radius:4px" />
          </div>
        </div>
      `, [{
        id: 'btn-confirm-adj', label: 'Apply Adjustment', class: 'btn-primary',
        onClick: async (_, close) => {
          const amount = parseInt(document.getElementById('adj-amount')?.value);
          const desc = document.getElementById('adj-desc')?.value?.trim();
          if (isNaN(amount) || !desc) { showToast('Please fill out all fields', 'error'); return; }
          await adjustCredits(uId, amount, desc);
          showToast('Wallet balance adjusted successfully!', 'success');
          close();
          renderAdminDashboard();
        }
      }]);
    });
  });

  // Save service prices
  document.querySelectorAll('.btn-save-service').forEach(btn => {
    btn.addEventListener('click', () => {
      const sId = btn.getAttribute('data-sid');
      const row = btn.closest('tr');
      const creditsInput = row.querySelector('.service-credits-input');
      const priceInput = row.querySelector('.service-price-input');
      
      const newCredits = parseInt(creditsInput.value);
      const newPrice = priceInput.value.trim();
      
      if (isNaN(newCredits) || !newPrice) {
        showToast('Invalid price/credits values', 'error');
        return;
      }
      
      const service = SERVICES.find(s => s.id === sId);
      if (service) {
        service.credits = newCredits;
        service.price = newPrice;
        showToast(`Updated cost for ${service.name}!`, 'success');
      }
    });
  });

  // Delete file explorer file
  document.querySelectorAll('.btn-delete-file').forEach(btn => {
    btn.addEventListener('click', async () => {
      const reqId = btn.getAttribute('data-req-id');
      const columnName = btn.getAttribute('data-col');
      
      if (confirm('Are you sure you want to permanently delete this uploaded file?')) {
        const updates = {};
        updates[columnName] = '';
        const { error } = await supabase.from('requests').update(updates).eq('id', reqId);
        if (error) {
          console.error(error);
          showToast('Failed to delete file from DB', 'error');
        } else {
          const r = demoRequests.find(x => x.id === reqId);
          if (r) r[columnName] = '';
          showToast('File deleted successfully!', 'success');
          renderAdminDashboard();
        }
      }
    });
  });

  // Photo preview
  document.querySelectorAll('.btn-preview-photo').forEach(btn => {
    btn.addEventListener('click', () => {
      const url = btn.getAttribute('data-photo');
      showModal('ECU Label Photo Preview', `
        <div style="text-align:center; padding:10px">
          <img src="${url}" style="max-width:100%; max-height:450px; border-radius:6px; box-shadow:0 8px 24px rgba(0,0,0,0.5)" />
        </div>
      `, []);
    });
  });
}
