import { renderSidebar, renderHeader, initLayoutEvents } from '../components/layout.js';
import { isAdmin } from '../lib/auth.js';
import { demoActivity, getProfileById } from '../lib/store.js';
import { timeAgo } from '../lib/utils.js';
import { navigate } from '../lib/router.js';
import { icon } from '../lib/icons.js';
import { avatarImg } from '../lib/avatars.js';
import { t } from '../lib/i18n.js';

export function renderActivityPage() {
  if (!isAdmin()) { navigate('/dashboard'); return; }
  const app = document.getElementById('app');
  const sorted = [...demoActivity].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  const actionIcons = {
    'Created request': 'plus-circle', 'Submitted request': 'send', 'Assigned technician': 'user-check',
    'Started work': 'play', 'Completed request': 'check-circle', 'Created user': 'user-plus',
    'Updated user': 'pencil', 'Activated user': 'user-check', 'Deactivated user': 'user-x',
  };

  app.innerHTML = `
    <div class="app-layout">
      ${renderSidebar()}
      <main class="app-main">
        ${renderHeader()}
        <div class="page-content">
          <div class="page-header animate-in">
            <div><h1>${t('activity_log', {}, 'Activity Log')}</h1><p>${t('activity_log_desc', {}, 'Track all system actions and changes.')}</p></div>
          </div>
          <div class="card animate-in" style="padding:0;overflow-x:auto">
            <table style="min-width:500px">
              <thead><tr><th>${t('user', {}, 'User')}</th><th>${t('action', {}, 'Action')}</th><th>${t('details', {}, 'Details')}</th><th>${t('time', {}, 'Time')}</th></tr></thead>
              <tbody>
                ${sorted.map(a => {
                  const actor = getProfileById(a.user_id);
                  const actIcon = Object.entries(actionIcons).find(([k]) => a.action.toLowerCase().includes(k.toLowerCase()));
                  return `<tr>
                    <td><div style="display:flex;align-items:center;gap:10px">
                      ${avatarImg(actor?.full_name || 'System', 30)}
                      <div><span class="font-semibold text-sm" style="color:#fff">${actor?.full_name || 'System'}</span><br/><span class="badge badge-${actor?.role || 'customer'}" style="font-size:8px;padding:1px 6px">${actor?.role || ''}</span></div>
                    </div></td>
                    <td style="color:#fff" class="font-semibold text-sm">
                      <span style="display:flex;align-items:center;gap:6px">${actIcon ? icon(actIcon[1], 14) : ''} ${t(a.action, {}, a.action)}</span>
                    </td>
                    <td style="color:rgba(255,255,255,0.5)" class="text-sm">${a.details?.title || a.details?.name || a.details?.to || '—'}</td>
                    <td class="text-xs" style="color:rgba(255,255,255,0.4)">${timeAgo(a.created_at)}</td>
                  </tr>`;
                }).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>`;
  initLayoutEvents();
}
