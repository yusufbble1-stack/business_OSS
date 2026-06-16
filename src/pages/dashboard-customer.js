import { renderSidebar, renderHeader, initLayoutEvents } from '../components/layout.js';
import { getCurrentUser } from '../lib/auth.js';
import { demoRequests, demoVehicles, createVehicle } from '../lib/store.js';
import { timeAgo, SERVICE_LABELS, STATUS_LABELS, showToast, showModal } from '../lib/utils.js';
import { icon } from '../lib/icons.js';
import { getWallet } from '../lib/wallet.js';
import { t } from '../lib/i18n.js';
import { getOrCreateReferralCode, referralSignups } from '../lib/referrals.js';

export async function renderCustomerDashboard() {
  const app = document.getElementById('app');
  const user = getCurrentUser();
  const myRequests = demoRequests.filter(r => r.customer_id === user.id);
  const active = myRequests.filter(r => !['delivered','cancelled'].includes(r.status));
  const myVehicles = demoVehicles.filter(v => v.customer_id === user.id);
  const wallet = await getWallet(user.id);

  // Referral status
  const codeEntry = getOrCreateReferralCode(user.id, user.full_name);
  const successfulReferrals = referralSignups.filter(s => s.code === codeEntry?.code && s.qualifies).length;
  const isUnlocked = wallet.total_purchased > 0 || wallet.balance > 0 || successfulReferrals >= 3;

  // Bookings vs File Orders
  const bookings = myRequests.filter(r => r.start_date !== null);
  const fileOrders = myRequests.filter(r => r.start_date === null);

  // Extract all files
  const uploadedFiles = [];
  myRequests.forEach(r => {
    if (r.original_file) {
      uploadedFiles.push({
        reqTitle: r.title,
        type: 'Original File',
        filename: r.original_file.split('/').pop(),
        url: r.original_file,
        isPhoto: false
      });
    }
    if (r.log_file) {
      uploadedFiles.push({
        reqTitle: r.title,
        type: 'Diagnostic Log',
        filename: r.log_file.split('/').pop(),
        url: r.log_file,
        isPhoto: false
      });
    }
    if (r.ecu_photo) {
      uploadedFiles.push({
        reqTitle: r.title,
        type: 'ECU Label Photo',
        filename: r.ecu_photo.split('/').pop(),
        url: r.ecu_photo,
        isPhoto: true
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
      .badge-unlocked {
        background: rgba(46, 204, 113, 0.15);
        color: #2ecc71;
      }
      .badge-locked {
        background: rgba(231, 76, 60, 0.15);
        color: #e74c3c;
      }
    </style>

    <div class="app-layout">
      ${renderSidebar()}
      <main class="app-main">
        ${renderHeader()}
        <div class="page-content">
          <div class="page-header animate-in">
            <div>
              <h1>${t('welcome_back')} ${user?.full_name?.split(' ')[0] || t('client')}</h1>
              <p>${t('track_requests_manage_vehicles', {}, 'Track your mapping requests and manage your vehicles.')}</p>
            </div>
            <a href="#/requests/new" class="btn btn-primary btn-lg">${icon('plus', 16)} ${t('new_request')}</a>
          </div>

          <div class="tabs-header animate-in">
            <button class="tab-btn active" data-tab="overview">${icon('grid', 14)} ${t('overview', {}, 'Overview')}</button>
            <button class="tab-btn" data-tab="bookings">${icon('calendar', 14)} ${t('bookings_label')}</button>
            <button class="tab-btn" data-tab="history">${icon('file-text', 14)} ${t('file_orders', {}, 'File Orders')}</button>
            <button class="tab-btn" data-tab="files">${icon('upload-cloud', 14)} ${t('uploaded_files_label')}</button>
            <button class="tab-btn" data-tab="referrals">${icon('users', 14)} ${t('referrals', {}, 'Referrals')}</button>
          </div>

          <!-- TAB OVERVIEW -->
          <div class="tab-content" id="tab-overview">
            <div class="stats-grid animate-in">
              <div class="stat-card highlighted">
                <div class="stat-top"><span class="stat-label">${t('credits_balance')}</span><div class="stat-arrow">${icon('arrow-up-right', 16)}</div></div>
                <div class="stat-value" style="color:var(--brand-red-light)">${wallet.balance}</div>
                <div class="stat-change"><a href="#/credits" style="color:var(--brand-red-light);text-decoration:none;font-size:11px">${icon('plus', 12)} ${t('buy_more_credits', {}, 'Buy More Credits')}</a></div>
              </div>
              <div class="stat-card">
                <div class="stat-top"><span class="stat-label">${t('file_orders', {}, 'File Orders')}</span><div class="stat-arrow">${icon('arrow-up-right', 16)}</div></div>
                <div class="stat-value">${fileOrders.length}</div>
                <div class="stat-change">${icon('clipboard-list', 12)} ${t('total_files_submitted', {}, 'Total files submitted')}</div>
              </div>
              <div class="stat-card">
                <div class="stat-top"><span class="stat-label">${t('active_bookings', {}, 'Active Bookings')}</span><div class="stat-arrow">${icon('arrow-up-right', 16)}</div></div>
                <div class="stat-value" style="color:var(--status-progress)">${bookings.filter(b => !['completed','cancelled'].includes(b.status)).length}</div>
                <div class="stat-change">${icon('loader', 12)} ${t('in_calendar_scheduling', {}, 'In calendar scheduling')}</div>
              </div>
              <div class="stat-card">
                <div class="stat-top"><span class="stat-label">${t('my_vehicles')}</span><div class="stat-arrow">${icon('arrow-up-right', 16)}</div></div>
                <div class="stat-value">${myVehicles.length}</div>
                <div class="stat-change">${icon('car', 12)} ${t('registered', {}, 'Registered')}</div>
              </div>
            </div>

            <!-- EXCLUSIVITY CARD -->
            <div class="card animate-in" style="margin-top: 24px; margin-bottom: 24px;">
              <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:16px;">
                <div>
                  <h3 style="margin:0 0 4px; display:flex; align-items:center; gap:8px">${icon('award', 18)} ${t('account_status_exclusivity', {}, 'Account Status & Exclusivity')}</h3>
                  <p style="margin:0; font-size:13px; color:rgba(255,255,255,0.6)">${t('learn_about_loyalty_rewards', {}, 'Learn about your loyalty rewards and booking priority level.')}</p>
                </div>
                <div style="display:flex; gap:12px; flex-wrap:wrap">
                  <span class="badge ${isUnlocked ? 'badge-unlocked' : 'badge-locked'}" style="font-size:12px; padding:6px 14px">
                    ${isUnlocked ? t('priority_unlocked', {}, '🔓 Priority Unlocked') : t('standard_access_only', {}, '🔒 Standard Access Only')}
                  </span>
                  <span class="badge badge-assigned" style="font-size:12px; padding:6px 14px">
                    Loyalty Tier: ${wallet.priority || 'Standard'}
                  </span>
                </div>
              </div>
              
              <div style="margin-top:20px; padding:16px; background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.06); border-radius:6px;">
                <h4 style="margin:0 0 8px; font-size:14px; color:#fff">Unlock criteria for Priority (High) & Express (Urgent) scheduling:</h4>
                <ul style="margin:0; padding-left:20px; font-size:13px; color:rgba(255,255,255,0.7); display:flex; flex-direction:column; gap:6px;">
                  <li>Option A: Purchase a credit pack (any active package). <a href="#/credits" style="color:var(--brand-red-light); text-decoration:none">${t('buy_more_credits')} ${icon('plus', 10)}</a></li>
                  <li>Option B: Refer at least 3 successful clients/partners. Your successful referrals: <strong style="color:#fff">${successfulReferrals} / 3</strong></li>
                </ul>
                ${!isUnlocked ? `
                <div style="margin-top:16px; background:rgba(231, 76, 60, 0.05); border:1px solid rgba(231, 76, 60, 0.1); padding:10px 14px; border-radius:4px; font-size:12px; color:#e74c3c; display:flex; align-items:center; gap:8px">
                  ${icon('lock', 14)} Note: You currently have Standard booking access. Priority & Express slots are hidden/disabled on calendar.
                </div>
                ` : `
                <div style="margin-top:16px; background:rgba(46, 204, 113, 0.05); border:1px solid rgba(46, 204, 113, 0.1); padding:10px 14px; border-radius:4px; font-size:12px; color:#2ecc71; display:flex; align-items:center; gap:8px">
                  ${icon('unlock', 14)} Congratulations! Priority & Express slots are unlocked for your ECU calibration bookings.
                </div>
                `}
              </div>
            </div>

            <div class="dash-grid-2">
              <div class="card" style="padding:0; overflow-x:auto">
                <div class="card-header" style="padding:20px 24px 0">
                  <h3>${icon('clipboard-list', 18)} ${t('active_requests', {}, 'Active Requests')}</h3>
                  <a href="#/requests" class="btn btn-ghost btn-sm" style="color:#fff">${t('view_all')} ${icon('arrow-right', 14)}</a>
                </div>
                ${active.length ? `<table style="margin-top:12px;min-width:500px">
                  <thead><tr><th>${t('request', {}, 'Request')}</th><th>${t('service', {}, 'Service')}</th><th>${t('status', {}, 'Status')}</th><th>${t('updated', {}, 'Updated')}</th><th></th></tr></thead>
                  <tbody>
                    ${active.map(r => `<tr>
                      <td class="font-semibold" style="color:#fff">${r.title}</td>
                      <td><span class="badge badge-assigned" style="font-size:9px">${SERVICE_LABELS[r.service_type]}</span></td>
                      <td><span class="badge badge-${r.status}">${STATUS_LABELS[r.status]}</span></td>
                      <td class="text-xs text-muted">${timeAgo(r.updated_at)}</td>
                      <td><a href="#/requests/${r.id}" class="btn btn-secondary btn-sm">${icon('eye', 14)}</a></td>
                    </tr>`).join('')}
                  </tbody>
                </table>` : `<div class="empty-state" style="padding:48px"><h3>${t('no_active_requests', {}, 'No active requests')}</h3><p>${t('submit_first_request', {}, 'Submit your first mapping request!')}</p></div>`}
              </div>

              <div class="card">
                <div class="card-header">
                  <h3>${icon('car', 18)} ${t('my_vehicles')}</h3>
                  <button class="btn btn-secondary btn-sm" id="btn-add-vehicle-dash">${icon('plus', 14)} ${t('add', {}, 'Add')}</button>
                </div>
                <div style="display:flex;flex-direction:column;gap:8px">
                  ${myVehicles.length ? myVehicles.slice(0, 4).map(v => `
                    <div style="display:flex;align-items:center;gap:14px;padding:14px;background:linear-gradient(135deg,rgba(255,255,255,0.04),rgba(255,255,255,0.01));border:1px solid rgba(255,255,255,0.06);border-radius:4px;transition:all 0.2s var(--ease);cursor:default" onmouseover="this.style.borderColor='rgba(196,30,30,0.3)'" onmouseout="this.style.borderColor='rgba(255,255,255,0.06)'">
                      <div style="width:42px;height:42px;border-radius:4px;background:linear-gradient(135deg,rgba(196,30,30,0.15),rgba(196,30,30,0.05));display:flex;align-items:center;justify-content:center;color:var(--brand-red-light);flex-shrink:0">${icon('car', 20)}</div>
                      <div style="flex:1;min-width:0">
                        <div class="font-semibold text-sm" style="color:#fff">${v.make} ${v.model}</div>
                        <div class="text-xs" style="color:rgba(255,255,255,0.5)">${v.year} · ECU: ${v.ecu_type || 'N/A'} · ${v.plate_number || ''}</div>
                      </div>
                    </div>
                  `).join('') : `<div class="empty-state" style="padding:32px"><p>${t('no_vehicles_yet', {}, 'No vehicles yet. Add your first vehicle to get started.')}</p></div>`}
                </div>
              </div>
            </div>
          </div>

          <!-- TAB BOOKINGS -->
          <div class="tab-content" id="tab-bookings" style="display:none">
            <div class="card animate-in" style="padding:0; overflow-x:auto">
              <div class="card-header" style="padding:20px 24px">
                <h3>${icon('calendar', 18)} ${t('bookings_label')}</h3>
              </div>
              ${bookings.length ? `
                <table style="min-width:600px">
                  <thead><tr><th>Vehicle</th><th>Date</th><th>Service</th><th>Priority</th><th>Status</th><th>Action</th></tr></thead>
                  <tbody>
                    ${bookings.map(r => `
                      <tr>
                        <td class="font-semibold" style="color:#fff">${r.title}</td>
                        <td>${new Date(r.start_date).toLocaleDateString()}</td>
                        <td><span class="badge badge-assigned" style="font-size:9px">${SERVICE_LABELS[r.service_type]}</span></td>
                        <td><span class="text-xs" style="color:var(--brand-silver)">${r.priority}</span></td>
                        <td><span class="badge badge-${r.status}">${STATUS_LABELS[r.status]}</span></td>
                        <td><a href="#/requests/${r.id}" class="btn btn-secondary btn-sm">${icon('eye', 14)}</a></td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              ` : `
                <div class="empty-state" style="padding:48px">
                  <h3>No scheduled bookings</h3>
                  <p>Schedule a vehicle tuning session in the calendar page!</p>
                </div>
              `}
            </div>
          </div>

          <!-- TAB HISTORY -->
          <div class="tab-content" id="tab-history" style="display:none">
            <div class="card animate-in" style="padding:0; overflow-x:auto">
              <div class="card-header" style="padding:20px 24px">
                <h3>${icon('file-text', 18)} File Service Orders</h3>
              </div>
              ${fileOrders.length ? `
                <table style="min-width:600px">
                  <thead><tr><th>Request</th><th>Service</th><th>Priority</th><th>Status</th><th>Submitted</th><th>Action</th></tr></thead>
                  <tbody>
                    ${fileOrders.map(r => `
                      <tr>
                        <td class="font-semibold" style="color:#fff">${r.title}</td>
                        <td><span class="badge badge-assigned" style="font-size:9px">${SERVICE_LABELS[r.service_type]}</span></td>
                        <td><span class="text-xs" style="color:var(--brand-silver)">${r.priority}</span></td>
                        <td><span class="badge badge-${r.status}">${STATUS_LABELS[r.status]}</span></td>
                        <td class="text-xs text-muted">${timeAgo(r.created_at)}</td>
                        <td><a href="#/requests/${r.id}" class="btn btn-secondary btn-sm">${icon('eye', 14)}</a></td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              ` : `
                <div class="empty-state" style="padding:48px">
                  <h3>No file service orders</h3>
                  <p>Request a fileservice chiptuning tune today!</p>
                </div>
              `}
            </div>
          </div>

          <!-- TAB FILES -->
          <div class="tab-content" id="tab-files" style="display:none">
            <div class="card animate-in" style="padding:0; overflow-x:auto">
              <div class="card-header" style="padding:20px 24px">
                <h3>${icon('upload-cloud', 18)} ${t('uploaded_files_label')}</h3>
              </div>
              ${uploadedFiles.length ? `
                <table style="min-width:600px">
                  <thead><tr><th>Request</th><th>File Type</th><th>File Name</th><th>Action</th></tr></thead>
                  <tbody>
                    ${uploadedFiles.map(f => `
                      <tr>
                        <td class="font-semibold" style="color:#fff">${f.reqTitle}</td>
                        <td><span class="badge badge-assigned" style="font-size:10px">${f.type}</span></td>
                        <td class="text-xs" style="word-break:break-all">${f.filename}</td>
                        <td>
                          ${f.isPhoto ? `
                            <button class="btn btn-secondary btn-sm btn-preview-photo" data-photo="${f.url}" style="margin-right:6px">${icon('image', 14)} Preview</button>
                          ` : ''}
                          <a href="${f.url}" download class="btn btn-secondary btn-sm" target="_blank">${icon('download', 14)}</a>
                        </td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              ` : `
                <div class="empty-state" style="padding:48px">
                  <h3>No files uploaded yet</h3>
                  <p>Any original files, diagnostic logs, or ECU label photos will appear here.</p>
                </div>
              `}
            </div>
          </div>

          <!-- TAB REFERRALS -->
          <div class="tab-content" id="tab-referrals" style="display:none">
            <div class="dash-grid-2 animate-in">
              <div class="card">
                <h3>${icon('users', 18)} Referral Link & Invite</h3>
                <p style="font-size:13px; color:rgba(255,255,255,0.6)">Share your code and link with friends/partners. They get 15% discount on chiptuning files, and you earn free token credits!</p>
                
                <div class="form-group" style="margin-top:20px">
                  <label>Your Referral Code</label>
                  <div style="display:flex; gap:8px">
                    <input type="text" id="ref-code-input" value="${codeEntry?.code || 'N/A'}" readonly style="flex:1; background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); border-radius:4px; color:#fff; text-align:center; font-weight:600; letter-spacing:1px" />
                    <button class="btn btn-secondary" id="btn-copy-code">${icon('copy', 14)} Copy</button>
                  </div>
                </div>

                <div class="form-group" style="margin-top:16px">
                  <label>Shareable Link</label>
                  <div style="display:flex; gap:8px">
                    <input type="text" id="ref-link-input" value="https://asperformance.com/?ref=${codeEntry?.code || ''}" readonly style="flex:1; background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); border-radius:4px; color:#fff; font-size:12px" />
                    <button class="btn btn-secondary" id="btn-copy-link">${icon('copy', 14)} Copy</button>
                  </div>
                </div>
              </div>

              <div class="card">
                <h3>${icon('award', 18)} Referral Tier Perks</h3>
                <div style="display:flex; flex-direction:column; gap:12px; margin-top:16px">
                  <div style="padding:12px; background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.05); border-radius:4px; display:flex; justify-content:space-between; align-items:center">
                    <div>
                      <strong style="color:#fff">Successful Referrals:</strong>
                      <div style="font-size:11px; color:rgba(255,255,255,0.5)">Successfully completed and validated orders</div>
                    </div>
                    <div style="font-size:24px; font-weight:700; color:var(--brand-red-light)">${successfulReferrals}</div>
                  </div>

                  <div style="padding:12px; background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.05); border-radius:4px; display:flex; justify-content:space-between; align-items:center">
                    <div>
                      <strong style="color:#fff">Total Credits Earned:</strong>
                      <div style="font-size:11px; color:rgba(255,255,255,0.5)">Rewards deposited in your wallet</div>
                    </div>
                    <div style="font-size:24px; font-weight:700; color:#2ecc71">${successfulReferrals * 5}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>`;

  initLayoutEvents();

  // Tab switching implementation
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

  // Copy referral code
  document.getElementById('btn-copy-code')?.addEventListener('click', () => {
    const input = document.getElementById('ref-code-input');
    input.select();
    navigator.clipboard.writeText(input.value);
    showToast('Code copied to clipboard!', 'success');
  });

  // Copy referral link
  document.getElementById('btn-copy-link')?.addEventListener('click', () => {
    const input = document.getElementById('ref-link-input');
    input.select();
    navigator.clipboard.writeText(input.value);
    showToast('Link copied to clipboard!', 'success');
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

  // Add vehicle from dashboard
  document.getElementById('btn-add-vehicle-dash')?.addEventListener('click', () => {
    showModal(t('add_vehicle', {}, 'Add Vehicle'), `
      <div class="form-row">
        <div class="form-group"><label>${t('make_brand')}</label><input type="text" id="v-make" placeholder="Renault"/></div>
        <div class="form-group"><label>${t('model')}</label><input type="text" id="v-model" placeholder="Trafic III"/></div>
      </div>
      <div class="form-row">
        <div class="form-group"><label>${t('year')}</label><input type="number" id="v-year" placeholder="2020"/></div>
        <div class="form-group"><label>${t('plate_number')}</label><input type="text" id="v-plate" placeholder="AB-123-CD"/></div>
      </div>
      <div class="form-group"><label>${t('engine_ecu_optional')}</label><input type="text" id="v-ecu" placeholder="Bosch EDC17C42"/></div>
    `, [{
      id: 'modal-add-v', label: `${icon('plus', 14)} ${t('add_vehicle', {}, 'Add Vehicle')}`, class: 'btn-primary',
      onClick: async (_, close) => {
        const make = document.getElementById('v-make')?.value?.trim();
        const model = document.getElementById('v-model')?.value?.trim();
        if (!make || !model) { showToast(t('error_required_fields'), 'error'); return; }
        await createVehicle({ customer_id: user.id, make, model, year: parseInt(document.getElementById('v-year')?.value) || new Date().getFullYear(), plate_number: document.getElementById('v-plate')?.value || '', ecu_type: document.getElementById('v-ecu')?.value || '' });
        showToast(t('vehicle_added_success', { vehicle: `${make} ${model}` }, `${make} ${model} added!`), 'success');
        close();
        renderCustomerDashboard();
      },
    }]);
  });
}
