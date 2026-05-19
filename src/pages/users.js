import { renderSidebar, renderHeader, initLayoutEvents } from '../components/layout.js';
import { isAdmin } from '../lib/auth.js';
import { demoProfiles, createProfile, updateProfile, toggleProfileActive } from '../lib/store.js';
import { formatDate, showToast, showModal } from '../lib/utils.js';
import { navigate } from '../lib/router.js';
import { icon, refreshIcons } from '../lib/icons.js';
import { avatarImg } from '../lib/avatars.js';

export function renderUsersPage() {
  if (!isAdmin()) { navigate('/dashboard'); return; }
  const app = document.getElementById('app');

  app.innerHTML = `
    <div class="app-layout">
      ${renderSidebar()}
      <main class="app-main">
        ${renderHeader()}
        <div class="page-content">
          <div class="page-header animate-in">
            <div><h1>User Management</h1><p>Manage customers, technicians and admin accounts.</p></div>
            <button class="btn btn-primary" id="btn-add-user">${icon('user-plus', 16)} Add User</button>
          </div>

          <div class="flex gap-3 flex-wrap" style="margin-bottom:16px">
            <select id="filter-role" style="width:auto;padding:8px 32px 8px 12px">
              <option value="">All Roles</option>
              <option value="admin">Admin</option>
              <option value="technician">Technician</option>
              <option value="customer">Customer</option>
            </select>
            <input type="text" id="search-users" placeholder="Search by name or email..." style="max-width:300px"/>
          </div>

          <div class="card animate-in" style="padding:0;overflow-x:auto">
            <table style="min-width: 800px;">
              <thead><tr><th>User</th><th>Email</th><th>Role</th><th>Company</th><th>Phone</th><th>Status</th><th>Joined</th><th>Actions</th></tr></thead>
              <tbody id="users-tbody">${renderUserRows(demoProfiles)}</tbody>
            </table>
          </div>
        </div>
      </main>
    </div>`;

  initLayoutEvents();
  bindUserEvents();
}

function renderUserRows(users) {
  return users.map(u => `
    <tr>
      <td><div style="display:flex;align-items:center;gap:12px">
        ${avatarImg(u.full_name, 34)}
        <span class="font-semibold" style="color:#fff">${u.full_name}</span>
      </div></td>
      <td style="color:rgba(255,255,255,0.6)" class="text-sm">${u.email}</td>
      <td><span class="badge badge-${u.role}">${u.role}</span></td>
      <td style="color:rgba(255,255,255,0.6)" class="text-sm">${u.company_name || '—'}</td>
      <td style="color:rgba(255,255,255,0.6)" class="text-sm">${u.phone || '—'}</td>
      <td><span style="color:${u.is_active ? 'var(--status-completed)' : 'var(--status-cancelled)'};font-size:var(--text-xs);font-weight:600;display:flex;align-items:center;gap:4px">
        <span style="width:6px;height:6px;border-radius:50%;background:currentColor"></span>${u.is_active ? 'Active' : 'Inactive'}
      </span></td>
      <td class="text-xs" style="color:rgba(255,255,255,0.4)">${formatDate(u.created_at)}</td>
      <td>
        <div class="flex gap-1">
          <button class="btn btn-ghost btn-sm edit-user-btn" data-id="${u.id}">${icon('pencil', 14)}</button>
          <button class="btn btn-ghost btn-sm toggle-user-btn" data-id="${u.id}" style="color:${u.is_active ? 'var(--status-cancelled)' : 'var(--status-completed)'}">${u.is_active ? icon('user-x', 14) : icon('user-check', 14)}</button>
        </div>
      </td>
    </tr>
  `).join('');
}

function bindUserEvents() {
  // Add User
  document.getElementById('btn-add-user')?.addEventListener('click', () => {
    showModal('Add New User', `
      <div class="form-group"><label>Full Name *</label><input type="text" id="new-name" placeholder="John Doe"/></div>
      <div class="form-group"><label>Email *</label><input type="email" id="new-email" placeholder="user@email.com"/></div>
      <div class="form-row">
        <div class="form-group"><label>Role</label><select id="new-role"><option value="customer">Customer</option><option value="technician">Technician</option><option value="admin">Admin</option></select></div>
        <div class="form-group"><label>Phone</label><input type="tel" id="new-phone" placeholder="+33 6 ..."/></div>
      </div>
      <div class="form-group"><label>Company</label><input type="text" id="new-company" placeholder="Company name"/></div>
    `, [{
      id: 'modal-create-user', label: `${icon('plus', 14)} Create User`, class: 'btn-primary',
      onClick: async (_, close) => {
        const name = document.getElementById('new-name')?.value?.trim();
        const email = document.getElementById('new-email')?.value?.trim();
        if (!name || !email) { showToast('Name and email are required', 'error'); return; }
        await createProfile({
          full_name: name, email,
          role: document.getElementById('new-role')?.value || 'customer',
          phone: document.getElementById('new-phone')?.value || '',
          company_name: document.getElementById('new-company')?.value || '',
        });
        showToast(`User "${name}" created successfully`, 'success');
        close();
        renderUsersPage();
      },
    }]);
  });

  // Toggle active
  document.querySelectorAll('.toggle-user-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const profile = await toggleProfileActive(btn.dataset.id);
      if (profile) {
        showToast(`${profile.full_name} ${profile.is_active ? 'activated' : 'deactivated'}`, 'success');
        renderUsersPage();
      }
    });
  });

  // Edit user
  document.querySelectorAll('.edit-user-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const u = demoProfiles.find(p => p.id === btn.dataset.id);
      if (!u) return;
      showModal(`Edit ${u.full_name}`, `
        <div class="form-group"><label>Full Name</label><input type="text" id="edit-name" value="${u.full_name}"/></div>
        <div class="form-row">
          <div class="form-group"><label>Phone</label><input type="tel" id="edit-phone" value="${u.phone || ''}"/></div>
          <div class="form-group"><label>Company</label><input type="text" id="edit-company" value="${u.company_name || ''}"/></div>
        </div>
      `, [{
        id: 'modal-save-user', label: `${icon('save', 14)} Save`, class: 'btn-primary',
        onClick: async (_, close) => {
          await updateProfile(u.id, {
            full_name: document.getElementById('edit-name')?.value || u.full_name,
            phone: document.getElementById('edit-phone')?.value || '',
            company_name: document.getElementById('edit-company')?.value || '',
          });
          showToast('User updated', 'success');
          close();
          renderUsersPage();
        },
      }]);
    });
  });

  // Filter + Search
  const filterFn = () => {
    let filtered = [...demoProfiles];
    const role = document.getElementById('filter-role')?.value;
    const search = document.getElementById('search-users')?.value?.toLowerCase() || '';
    if (role) filtered = filtered.filter(p => p.role === role);
    if (search) filtered = filtered.filter(p => p.full_name.toLowerCase().includes(search) || p.email.toLowerCase().includes(search));
    document.getElementById('users-tbody').innerHTML = renderUserRows(filtered);
    refreshIcons();
    // Re-bind after re-render
    document.querySelectorAll('.toggle-user-btn').forEach(b => b.addEventListener('click', async () => {
      await toggleProfileActive(b.dataset.id);
      renderUsersPage();
    }));
  };
  document.getElementById('filter-role')?.addEventListener('change', filterFn);
  document.getElementById('search-users')?.addEventListener('input', filterFn);
}
