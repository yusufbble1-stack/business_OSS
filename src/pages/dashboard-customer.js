import { renderSidebar, renderHeader, initLayoutEvents } from '../components/layout.js';
import { getCurrentUser } from '../lib/auth.js';
import { demoRequests, demoVehicles, createVehicle } from '../lib/store.js';
import { timeAgo, SERVICE_LABELS, STATUS_LABELS, showToast, showModal } from '../lib/utils.js';
import { icon } from '../lib/icons.js';
import { getWallet } from '../lib/wallet.js';

export async function renderCustomerDashboard() {
  const app = document.getElementById('app');
  const user = getCurrentUser();
  const myRequests = demoRequests.filter(r => r.customer_id === user.id);
  const active = myRequests.filter(r => !['delivered','cancelled'].includes(r.status));
  const myVehicles = demoVehicles.filter(v => v.customer_id === user.id);
  const wallet = await getWallet(user.id);

  app.innerHTML = `
    <div class="app-layout">
      ${renderSidebar()}
      <main class="app-main">
        ${renderHeader()}
        <div class="page-content">
          <div class="page-header animate-in">
            <div><h1>Welcome back, ${user?.full_name?.split(' ')[0] || 'Client'}</h1><p>Track your mapping requests and manage your vehicles.</p></div>
            <a href="#/requests/new" class="btn btn-primary btn-lg">${icon('plus', 16)} New Request</a>
          </div>

          <div class="stats-grid" style="grid-template-columns:repeat(4,1fr)">
            <div class="stat-card highlighted animate-in" style="animation-delay:0.05s">
              <div class="stat-top"><span class="stat-label">Credit Balance</span><div class="stat-arrow">${icon('arrow-up-right', 16)}</div></div>
              <div class="stat-value" style="color:var(--brand-red-light)">${wallet.balance}</div>
              <div class="stat-change"><a href="#/credits" style="color:var(--brand-red-light);text-decoration:none;font-size:11px">${icon('plus', 12)} Buy More Credits</a></div>
            </div>
            <div class="stat-card animate-in" style="animation-delay:0.1s">
              <div class="stat-top"><span class="stat-label">My Requests</span><div class="stat-arrow">${icon('arrow-up-right', 16)}</div></div>
              <div class="stat-value">${myRequests.length}</div>
              <div class="stat-change">${icon('clipboard-list', 12)} Total submitted</div>
            </div>
            <div class="stat-card animate-in" style="animation-delay:0.15s">
              <div class="stat-top"><span class="stat-label">Active Now</span><div class="stat-arrow">${icon('arrow-up-right', 16)}</div></div>
              <div class="stat-value" style="color:var(--status-progress)">${active.length}</div>
              <div class="stat-change">${icon('loader', 12)} In processing</div>
            </div>
            <div class="stat-card animate-in" style="animation-delay:0.2s">
              <div class="stat-top"><span class="stat-label">My Vehicles</span><div class="stat-arrow">${icon('arrow-up-right', 16)}</div></div>
              <div class="stat-value">${myVehicles.length}</div>
              <div class="stat-change">${icon('car', 12)} Registered</div>
            </div>
          </div>

          <div class="dash-grid-2">
            <div class="card animate-in" style="animation-delay:0.2s;padding:0;overflow-x:auto">
              <div class="card-header" style="padding:20px 24px 0">
                <h3>${icon('clipboard-list', 18)} Active Requests</h3>
                <a href="#/requests" class="btn btn-ghost btn-sm" style="color:#fff">View All ${icon('arrow-right', 14)}</a>
              </div>
              ${active.length ? `<table style="margin-top:12px;min-width:500px">
                <thead><tr><th>Request</th><th>Service</th><th>Status</th><th>Updated</th><th></th></tr></thead>
                <tbody>
                  ${active.map(r => `<tr>
                    <td class="font-semibold" style="color:#fff">${r.title}</td>
                    <td><span class="badge badge-assigned" style="font-size:9px">${SERVICE_LABELS[r.service_type]}</span></td>
                    <td><span class="badge badge-${r.status}">${STATUS_LABELS[r.status]}</span></td>
                    <td class="text-xs text-muted">${timeAgo(r.updated_at)}</td>
                    <td><a href="#/requests/${r.id}" class="btn btn-secondary btn-sm">${icon('eye', 14)}</a></td>
                  </tr>`).join('')}
                </tbody>
              </table>` : '<div class="empty-state" style="padding:48px"><h3>No active requests</h3><p>Submit your first mapping request!</p></div>'}
            </div>

            <div class="card animate-in" style="animation-delay:0.25s">
              <div class="card-header">
                <h3>${icon('car', 18)} My Vehicles</h3>
                <button class="btn btn-secondary btn-sm" id="btn-add-vehicle-dash">${icon('plus', 14)} Add</button>
              </div>
              <div style="display:flex;flex-direction:column;gap:8px">
                ${myVehicles.length ? myVehicles.map(v => `
                  <div style="display:flex;align-items:center;gap:14px;padding:14px;background:linear-gradient(135deg,rgba(255,255,255,0.04),rgba(255,255,255,0.01));border:1px solid rgba(255,255,255,0.06);border-radius:4px;transition:all 0.2s var(--ease);cursor:default" onmouseover="this.style.borderColor='rgba(196,30,30,0.3)'" onmouseout="this.style.borderColor='rgba(255,255,255,0.06)'">
                    <div style="width:42px;height:42px;border-radius:4px;background:linear-gradient(135deg,rgba(196,30,30,0.15),rgba(196,30,30,0.05));display:flex;align-items:center;justify-content:center;color:var(--brand-red-light);flex-shrink:0">${icon('car', 20)}</div>
                    <div style="flex:1;min-width:0">
                      <div class="font-semibold text-sm" style="color:#fff">${v.make} ${v.model}</div>
                      <div class="text-xs" style="color:rgba(255,255,255,0.5)">${v.year} · ECU: ${v.ecu_type || 'N/A'} · ${v.plate_number || ''}</div>
                    </div>
                  </div>
                `).join('') : '<div class="empty-state" style="padding:32px"><p>No vehicles yet. Add your first vehicle to get started.</p></div>'}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>`;

  initLayoutEvents();

  // Add vehicle from dashboard
  document.getElementById('btn-add-vehicle-dash')?.addEventListener('click', () => {
    showModal('Add Vehicle', `
      <div class="form-row">
        <div class="form-group"><label>Make *</label><input type="text" id="v-make" placeholder="Renault"/></div>
        <div class="form-group"><label>Model *</label><input type="text" id="v-model" placeholder="Trafic III"/></div>
      </div>
      <div class="form-row">
        <div class="form-group"><label>Year</label><input type="number" id="v-year" placeholder="2020"/></div>
        <div class="form-group"><label>Plate</label><input type="text" id="v-plate" placeholder="AB-123-CD"/></div>
      </div>
      <div class="form-group"><label>ECU Type</label><input type="text" id="v-ecu" placeholder="Bosch EDC17C42"/></div>
    `, [{
      id: 'modal-add-v', label: `${icon('plus', 14)} Add Vehicle`, class: 'btn-primary',
      onClick: async (_, close) => {
        const make = document.getElementById('v-make')?.value?.trim();
        const model = document.getElementById('v-model')?.value?.trim();
        if (!make || !model) { showToast('Make and model required', 'error'); return; }
        await createVehicle({ customer_id: user.id, make, model, year: parseInt(document.getElementById('v-year')?.value) || new Date().getFullYear(), plate_number: document.getElementById('v-plate')?.value || '', ecu_type: document.getElementById('v-ecu')?.value || '' });
        showToast(`${make} ${model} added!`, 'success');
        close();
        renderCustomerDashboard();
      },
    }]);
  });
}
