import { renderSidebar, renderHeader, initLayoutEvents } from '../components/layout.js';
import { getCurrentUser, updateCurrentUserCache } from '../lib/auth.js';
import { updateProfile } from '../lib/store.js';
import { showToast } from '../lib/utils.js';
import { icon } from '../lib/icons.js';
import { avatarImg } from '../lib/avatars.js';

export function renderSettingsPage() {
  const app = document.getElementById('app');
  const user = getCurrentUser();

  app.innerHTML = `
    <div class="app-layout">
      ${renderSidebar()}
      <main class="app-main">
        ${renderHeader()}
        <div class="page-content">
          <div class="page-header animate-in">
            <div><h1>Settings</h1><p>Manage your profile and security preferences.</p></div>
          </div>
          <div style="max-width:600px">
            <div class="card animate-in" style="animation-delay:0.05s;margin-bottom:20px">
              <div class="card-header"><h3>${icon('user', 18)} Profile</h3></div>
              <div style="display:flex;align-items:center;gap:16px;margin-bottom:20px">
                ${avatarImg(user?.full_name || 'User', 56)}
                <div><h4 style="color:#fff">${user?.full_name || 'User'}</h4><p class="text-sm" style="color:rgba(255,255,255,0.5)">${user?.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : ''} · ${user?.email || ''}</p></div>
              </div>
              <div class="form-row">
                <div class="form-group"><label>Full Name</label><input type="text" id="set-name" value="${user?.full_name || ''}"/></div>
                <div class="form-group"><label>Email</label><input type="email" value="${user?.email || ''}" disabled style="opacity:0.4;cursor:not-allowed"/></div>
              </div>
              <div class="form-row">
                <div class="form-group"><label>Phone</label><input type="tel" id="set-phone" value="${user?.phone || ''}"/></div>
                <div class="form-group"><label>Company</label><input type="text" id="set-company" value="${user?.company_name || ''}"/></div>
              </div>
              <button class="btn btn-primary" id="btn-save-profile">${icon('save', 16)} Save Changes</button>
            </div>
            <div class="card animate-in" style="animation-delay:0.1s">
              <div class="card-header"><h3>${icon('lock', 18)} Security</h3></div>
              <div class="form-group"><label>Current Password</label><input type="password" id="set-cur-pw" placeholder="••••••••"/></div>
              <div class="form-row">
                <div class="form-group"><label>New Password</label><input type="password" id="set-new-pw" placeholder="••••••••"/></div>
                <div class="form-group"><label>Confirm Password</label><input type="password" id="set-confirm-pw" placeholder="••••••••"/></div>
              </div>
              <button class="btn btn-secondary" id="btn-update-pw">${icon('key', 16)} Update Password</button>
            </div>
          </div>
        </div>
      </main>
    </div>`;

  initLayoutEvents();

  // Save profile
  document.getElementById('btn-save-profile')?.addEventListener('click', () => {
    const name = document.getElementById('set-name')?.value?.trim();
    const phone = document.getElementById('set-phone')?.value?.trim();
    const company = document.getElementById('set-company')?.value?.trim();
    if (!name) { showToast('Name cannot be empty', 'error'); return; }
    updateProfile(user.id, { full_name: name, phone, company_name: company });
    updateCurrentUserCache({ full_name: name, phone, company_name: company });
    showToast('Profile updated successfully', 'success');
  });

  // Update password
  document.getElementById('btn-update-pw')?.addEventListener('click', () => {
    const cur = document.getElementById('set-cur-pw')?.value;
    const newPw = document.getElementById('set-new-pw')?.value;
    const confirm = document.getElementById('set-confirm-pw')?.value;
    if (!cur) { showToast('Enter current password', 'error'); return; }
    if (!newPw || newPw.length < 8) { showToast('Password must be at least 8 characters', 'error'); return; }
    if (!/[A-Z]/.test(newPw)) { showToast('Password must contain at least one uppercase letter', 'error'); return; }
    if (!/[0-9]/.test(newPw)) { showToast('Password must contain at least one number', 'error'); return; }
    if (newPw !== confirm) { showToast('Passwords do not match', 'error'); return; }
    showToast('Password updated successfully', 'success');
    document.getElementById('set-cur-pw').value = '';
    document.getElementById('set-new-pw').value = '';
    document.getElementById('set-confirm-pw').value = '';
  });
}
