import { renderSidebar, renderHeader, initLayoutEvents } from '../components/layout.js';
import { getCurrentUser } from '../lib/auth.js';
import { demoRequests, getProfileById, getVehicleById, changeRequestStatus } from '../lib/store.js';
import { timeAgo, SERVICE_LABELS, STATUS_LABELS, showToast } from '../lib/utils.js';
import { icon } from '../lib/icons.js';
import { t } from '../lib/i18n.js';

export async function renderTechDashboard() {
  const app = document.getElementById('app');
  const user = getCurrentUser();

  const myRequests = demoRequests.filter(r => r.assigned_to === user.id);
  const inProgress = myRequests.filter(r => r.status === 'in_progress').length;
  const completed = myRequests.filter(r => r.status === 'completed' || r.status === 'delivered').length;
  const queue = myRequests.filter(r => r.status === 'assigned' || r.status === 'in_progress');

  app.innerHTML = `
    <div class="app-layout">
      ${renderSidebar()}
      <main class="app-main">
        ${renderHeader()}
        <div class="page-content">
          <div class="page-header animate-in">
            <div><h1>${t('welcome_back')} ${user?.full_name?.split(' ')[0] || t('tech')}</h1><p>${t('assigned_tuning')}</p></div>
          </div>

          <div class="stats-grid" style="grid-template-columns:repeat(3,1fr)">
            <div class="stat-card highlighted animate-in" style="animation-delay:0.05s">
              <div class="stat-top"><span class="stat-label">${t('my_queue', {}, 'My Queue')}</span><div class="stat-arrow">${icon('arrow-up-right', 16)}</div></div>
              <div class="stat-value">${myRequests.length}</div>
              <div class="stat-change">${icon('clipboard-list', 12)} ${t('total_assigned', {}, 'Total assigned')}</div>
            </div>
            <div class="stat-card animate-in" style="animation-delay:0.1s">
              <div class="stat-top"><span class="stat-label">${t('in_progress')}</span><div class="stat-arrow">${icon('arrow-up-right', 16)}</div></div>
              <div class="stat-value" style="color:var(--status-progress)">${inProgress}</div>
              <div class="stat-change">${icon('zap', 12)} ${t('working_on_now', {}, 'Working on now')}</div>
            </div>
            <div class="stat-card animate-in" style="animation-delay:0.15s">
              <div class="stat-top"><span class="stat-label">${t('completed')}</span><div class="stat-arrow">${icon('arrow-up-right', 16)}</div></div>
              <div class="stat-value" style="color:var(--status-completed)">${completed}</div>
              <div class="stat-change up">${icon('check-circle', 12)} ${t('delivered')}</div>
            </div>
          </div>

          <div class="card animate-in" style="animation-delay:0.2s;padding:0;overflow-x:auto">
            <div class="card-header" style="padding:20px 24px 0">
              <h3>${icon('list-todo', 18)} ${t('active_queue', {}, 'Active Queue')}</h3>
            </div>
            ${queue.length ? `<table style="margin-top:12px;min-width:600px">
              <thead><tr><th>${t('request', {}, 'Request')}</th><th>${t('vehicle', {}, 'Vehicle')}</th><th>${t('service', {}, 'Service')}</th><th>${t('priority')}</th><th>${t('status', {}, 'Status')}</th><th>${t('action', {}, 'Action')}</th></tr></thead>
              <tbody>
                ${queue.map(r => {
                  const vehicle = getVehicleById(r.vehicle_id);
                  return `<tr>
                    <td class="font-semibold" style="color:#fff">${r.title}</td>
                    <td style="color:rgba(255,255,255,0.6)">${vehicle ? `${vehicle.make} ${vehicle.model}` : '—'}</td>
                    <td><span class="badge badge-assigned" style="font-size:9px">${SERVICE_LABELS[r.service_type]}</span></td>
                    <td><span style="color:var(--priority-${r.priority});font-size:var(--text-xs);font-weight:600;text-transform:uppercase">${t(r.priority)}</span></td>
                    <td><span class="badge badge-${r.status}">${STATUS_LABELS[r.status]}</span></td>
                    <td>
                       <div class="flex gap-2">
                        ${r.status === 'assigned' ? `<button class="btn btn-primary btn-sm start-btn" data-id="${r.id}">${icon('play', 14)} ${t('start')}</button>` : ''}
                        ${r.status === 'in_progress' ? `<button class="btn btn-primary btn-sm complete-btn" data-id="${r.id}">${icon('check', 14)} ${t('done', {}, 'Done')}</button>` : ''}
                        <a href="#/requests/${r.id}" class="btn btn-secondary btn-sm">${icon('external-link', 14)}</a>
                      </div>
                    </td>
                  </tr>`;
                }).join('')}
              </tbody>
            </table>` : `<div class="empty-state" style="padding:48px"><h3>${t('queue_empty', {}, 'Queue empty')}</h3><p>${t('no_active_requests_assigned', {}, 'No active requests assigned to you right now.')}</p></div>`}
          </div>
        </div>
      </main>
    </div>`;

  initLayoutEvents();

  // Bind action buttons
  document.querySelectorAll('.start-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      await changeRequestStatus(btn.dataset.id, 'in_progress', user.id);
      showToast(t('work_started', {}, 'Work started!'), 'success');
      renderTechDashboard();
    });
  });
  document.querySelectorAll('.complete-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      await changeRequestStatus(btn.dataset.id, 'completed', user.id);
      showToast(t('request_completed', {}, 'Request completed!'), 'success');
      renderTechDashboard();
    });
  });
}
