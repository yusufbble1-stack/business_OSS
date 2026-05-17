import { getCurrentUser, signOut, isAdmin, isTechnician, isCustomer } from '../lib/auth.js';
import { navigate } from '../lib/router.js';
import { icon, refreshIcons } from '../lib/icons.js';
import { avatarImg } from '../lib/avatars.js';
import { demoRequests } from '../lib/store.js';
import { getUnreadNotifCount, getUnreadMsgCount, renderNotifPanel, renderMsgPanel, markAllNotifsRead, markNotifRead, markMsgRead } from '../lib/notifications.js';

function getNavItems() {
  const pendingCount = isAdmin() ? demoRequests.filter(r => r.status === 'pending').length : 0;
  const items = { menu: [], general: [] };

  items.menu.push({ ic: 'layout-dashboard', label: 'Dashboard', path: '/dashboard' });
  items.menu.push({ ic: 'clipboard-list', label: 'Requests', path: '/requests', badge: pendingCount || null });
  if (isCustomer()) items.menu.push({ ic: 'plus-circle', label: 'New Request', path: '/requests/new' });
  if (isAdmin()) items.menu.push({ ic: 'users', label: 'Users', path: '/users' });
  items.menu.push({ ic: 'car', label: 'Vehicles', path: '/vehicles' });
  if (isAdmin()) items.menu.push({ ic: 'file-text', label: 'Invoices', path: '/invoices' });
  items.menu.push({ ic: 'calendar', label: 'Calendar', path: '/calendar' });
  items.menu.push({ ic: 'gift', label: 'Referrals', path: '/referrals' });
  items.menu.push({ ic: 'credit-card', label: 'Credits', path: '/credits' });
  items.menu.push({ ic: 'gauge', label: 'Gains Calculator', path: '/gains' });
  items.menu.push({ ic: 'cpu', label: 'ECU Database', path: '/ecus' });
  items.menu.push({ ic: 'wrench', label: 'Tools Database', path: '/tools' });
  items.menu.push({ ic: 'car-front', label: 'Vehicle Categories', path: '/categories' });
  if (isAdmin()) items.menu.push({ ic: 'activity', label: 'Activity Log', path: '/activity' });

  items.general.push({ ic: 'settings', label: 'Settings', path: '/settings' });

  return items;
}

export function renderSidebar() {
  const user = getCurrentUser();
  const items = getNavItems();
  const currentPath = window.location.hash.slice(1);

  return `
    <aside class="sidebar" id="sidebar">
      <div class="sidebar-header">
        <img src="/assets/logo.png" alt="AS Performance" class="sidebar-logo"/>
        <div class="sidebar-brand">
          <span class="sidebar-title">AS Performance</span>
          <span class="sidebar-subtitle">Chiptuning</span>
        </div>
      </div>

      <nav class="sidebar-nav">
        <div class="sidebar-section">
          <div class="sidebar-section-label">Menu</div>
          ${items.menu.map(item => `
            <a href="#${item.path}" class="sidebar-link ${currentPath === item.path || (item.path !== '/dashboard' && currentPath.startsWith(item.path)) ? 'active' : ''}">
              ${icon(item.ic, 18)}
              <span>${item.label}</span>
              ${item.badge ? `<span class="nav-badge">${item.badge}</span>` : ''}
            </a>
          `).join('')}
        </div>

        <div class="sidebar-section" style="margin-top:auto">
          <div class="sidebar-section-label">General</div>
          ${items.general.map(item => `
            <a href="#${item.path}" class="sidebar-link ${currentPath === item.path ? 'active' : ''}">
              ${icon(item.ic, 18)}
              <span>${item.label}</span>
            </a>
          `).join('')}
          <button class="sidebar-link sidebar-logout" id="btn-logout" style="border:none;background:none;cursor:pointer;width:100%;text-align:left;font-size:var(--text-sm)">
            ${icon('log-out', 18)}
            <span>Logout</span>
          </button>
        </div>
      </nav>

      <div class="sidebar-footer">
        <div class="sidebar-user">
          ${avatarImg(user?.full_name || 'User', 36)}
          <div class="sidebar-user-info">
            <span class="sidebar-user-name">${user?.full_name || 'User'}</span>
            <span class="sidebar-user-role">${user?.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : ''}</span>
          </div>
        </div>
      </div>
    </aside>`;
}

export function renderHeader() {
  const user = getCurrentUser();
  const notifCount = getUnreadNotifCount(user?.id);
  const msgCount = getUnreadMsgCount(user?.id);

  return `
    <header class="app-header" id="app-header">
      <button class="btn btn-ghost btn-icon mobile-menu" id="mobile-menu-btn">
        ${icon('menu', 20)}
      </button>
      <div class="header-search">
        <span class="header-search-icon">${icon('search', 16)}</span>
        <input type="text" placeholder="Search requests, users..." id="header-search-input"/>
        <div class="header-search-shortcut"><kbd>⌘</kbd><kbd>F</kbd></div>
      </div>
      <div class="header-spacer"></div>
      <div class="header-actions">
        <div class="header-panel-wrap">
          <button class="btn btn-ghost btn-icon" id="msg-toggle-btn" style="position:relative">
            ${icon('mail', 18)}
            ${msgCount ? `<span class="header-dot" style="background:#3B82F6;border-color:#141414"></span>` : ''}
          </button>
        </div>
        <div class="header-panel-wrap">
          <button class="btn btn-ghost btn-icon" id="notif-toggle-btn" style="position:relative">
            ${icon('bell', 18)}
            ${notifCount ? `<span class="header-dot" style="background:var(--brand-red);border-color:#141414"></span>` : ''}
          </button>
        </div>
      </div>
      <div class="header-user">
        <div class="header-user-info">
          <div class="header-user-name">${user?.full_name || 'User'}</div>
          <div class="header-user-email">${user?.email || ''}</div>
        </div>
        ${avatarImg(user?.full_name || 'User', 36)}
      </div>
    </header>`;
}

export function initLayoutEvents() {
  refreshIcons();
  const user = getCurrentUser();

  // Logout
  document.getElementById('btn-logout')?.addEventListener('click', () => signOut());

  // Mobile sidebar toggle
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const sidebar = document.getElementById('sidebar');
  if (mobileBtn && sidebar) {
    mobileBtn.addEventListener('click', () => sidebar.classList.toggle('mobile-open'));
    document.addEventListener('click', (e) => {
      if (sidebar.classList.contains('mobile-open') && !sidebar.contains(e.target) && e.target !== mobileBtn && !mobileBtn.contains(e.target)) {
        sidebar.classList.remove('mobile-open');
      }
    });
  }

  // ===== Notification panel toggle =====
  const notifBtn = document.getElementById('notif-toggle-btn');
  const notifWrap = notifBtn?.closest('.header-panel-wrap');
  if (notifBtn && notifWrap) {
    notifBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      // Close msg panel if open
      document.getElementById('msg-panel')?.remove();
      const existing = document.getElementById('notif-panel');
      if (existing) { existing.remove(); return; }
      notifWrap.insertAdjacentHTML('beforeend', renderNotifPanel(user?.id));
      refreshIcons();

      // Mark all read button
      document.getElementById('mark-all-read')?.addEventListener('click', () => {
        markAllNotifsRead(user?.id);
        document.getElementById('notif-panel')?.remove();
        // Update badge
        const dot = notifBtn.querySelector('.header-dot');
        if (dot) dot.remove();
      });

      // Click on notification item
      document.querySelectorAll('.notif-item[data-nid]').forEach(item => {
        item.addEventListener('click', () => {
          markNotifRead(item.dataset.nid);
          document.getElementById('notif-panel')?.remove();
        });
      });
    });
  }

  // ===== Messages panel toggle =====
  const msgBtn = document.getElementById('msg-toggle-btn');
  const msgWrap = msgBtn?.closest('.header-panel-wrap');
  if (msgBtn && msgWrap) {
    msgBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      // Close notif panel if open
      document.getElementById('notif-panel')?.remove();
      const existing = document.getElementById('msg-panel');
      if (existing) { existing.remove(); return; }
      msgWrap.insertAdjacentHTML('beforeend', renderMsgPanel(user?.id));
      refreshIcons();

      // Click on message item
      document.querySelectorAll('.notif-item[data-mid]').forEach(item => {
        item.addEventListener('click', () => {
          markMsgRead(item.dataset.mid);
          document.getElementById('msg-panel')?.remove();
        });
      });
    });
  }

  // Close panels when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.header-panel-wrap') && !e.target.closest('.notif-panel')) {
      document.getElementById('notif-panel')?.remove();
      document.getElementById('msg-panel')?.remove();
    }
  });
}
