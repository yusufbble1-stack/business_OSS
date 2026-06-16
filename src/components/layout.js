import { getCurrentUser, signOut, isAdmin, isTechnician, isCustomer } from '../lib/auth.js';
import { navigate } from '../lib/router.js';
import { icon, refreshIcons } from '../lib/icons.js';
import { avatarImg } from '../lib/avatars.js';
import { demoRequests } from '../lib/store.js';
import { getUnreadNotifCount, getUnreadMsgCount, renderNotifPanel, renderMsgPanel, markAllNotifsRead, markNotifRead, markMsgRead } from '../lib/notifications.js';
import { getLang, setLang, t } from '../lib/i18n.js';

function getNavItems() {
  const pendingCount = isAdmin() ? demoRequests.filter(r => r.status === 'pending').length : 0;
  const items = { menu: [], general: [] };

  items.menu.push({ ic: 'layout-dashboard', label: t('dashboard'), path: '/dashboard' });
  items.menu.push({ ic: 'clipboard-list', label: t('requests'), path: '/requests', badge: pendingCount || null });
  if (isCustomer()) items.menu.push({ ic: 'plus-circle', label: t('new_request'), path: '/requests/new' });
  if (isAdmin()) items.menu.push({ ic: 'users', label: t('users'), path: '/users' });
  items.menu.push({ ic: 'car', label: t('vehicles'), path: '/vehicles' });
  if (isAdmin()) items.menu.push({ ic: 'file-text', label: t('invoices'), path: '/invoices' });
  items.menu.push({ ic: 'calendar', label: t('calendar'), path: '/calendar' });
  items.menu.push({ ic: 'gift', label: t('referrals'), path: '/referrals' });
  items.menu.push({ ic: 'credit-card', label: t('credits'), path: '/credits' });
  items.menu.push({ ic: 'gauge', label: t('gains'), path: '/gains' });
  items.menu.push({ ic: 'cpu', label: t('ecus'), path: '/ecus' });
  items.menu.push({ ic: 'wrench', label: t('tools'), path: '/tools' });
  items.menu.push({ ic: 'car-front', label: t('categories'), path: '/categories' });
  if (isAdmin()) items.menu.push({ ic: 'activity', label: t('activity'), path: '/activity' });

  items.general.push({ ic: 'settings', label: t('settings'), path: '/settings' });

  return items;
}

export function renderSidebar() {
  const user = getCurrentUser();
  const items = getNavItems();
  const currentPath = window.location.hash.slice(1);

  return `
    <aside class="sidebar" id="sidebar">
      <div class="sidebar-header" style="cursor:pointer" onclick="window.location.hash='#/'">
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
            <span>${t('logout')}</span>
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
  const activeLang = getLang();

  return `
    <header class="app-header" id="app-header">
      <button class="btn btn-ghost btn-icon mobile-menu" id="mobile-menu-btn">
        ${icon('menu', 20)}
      </button>
      <div class="header-search">
        <span class="header-search-icon">${icon('search', 16)}</span>
        <input type="text" placeholder="${t('search_placeholder')}" id="header-search-input"/>
        <div class="header-search-shortcut"><kbd>⌘</kbd><kbd>F</kbd></div>
      </div>
      <div class="header-spacer"></div>
      <div class="header-actions">
        <button class="btn btn-ghost" id="lang-switch-dashboard" style="font-size:13px;font-weight:500;display:flex;align-items:center;gap:4px;padding:6px 10px;border-radius:6px;cursor:pointer;color:var(--text-muted);border:none;background:none;">
          ${activeLang === 'fr' ? '🇫🇷 FR' : '🇬🇧 EN'}
        </button>
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

  // Language switcher toggle
  document.getElementById('lang-switch-dashboard')?.addEventListener('click', () => {
    const nextLang = getLang() === 'en' ? 'fr' : 'en';
    setLang(nextLang);
  });

  // Mobile sidebar toggle with backdrop
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const sidebar = document.getElementById('sidebar');
  if (mobileBtn && sidebar) {
    // Create backdrop element if it doesn't exist
    let backdrop = document.querySelector('.sidebar-backdrop');
    if (!backdrop) {
      backdrop = document.createElement('div');
      backdrop.className = 'sidebar-backdrop';
      sidebar.parentNode.insertBefore(backdrop, sidebar.nextSibling);
    }

    const openSidebar = () => {
      sidebar.classList.add('mobile-open');
      backdrop.classList.add('visible');
      document.body.style.overflow = 'hidden';
    };
    const closeSidebar = () => {
      sidebar.classList.remove('mobile-open');
      backdrop.classList.remove('visible');
      document.body.style.overflow = '';
    };

    mobileBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (sidebar.classList.contains('mobile-open')) closeSidebar();
      else openSidebar();
    });

    // Close on backdrop click
    backdrop.addEventListener('click', closeSidebar);

    // Close sidebar when clicking a nav link (on mobile)
    sidebar.querySelectorAll('.sidebar-link').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 768) closeSidebar();
      });
    });

    // Global click listener attached only once per session
    if (!window.layoutEventInitialized) {
      document.addEventListener('click', (e) => {
        const curSidebar = document.getElementById('sidebar');
        const curBtn = document.getElementById('mobile-menu-btn');
        if (curSidebar && curSidebar.classList.contains('mobile-open')) {
          if (!curSidebar.contains(e.target) && curBtn && !curBtn.contains(e.target) && !e.target.closest('.sidebar-backdrop')) {
            curSidebar.classList.remove('mobile-open');
            document.querySelector('.sidebar-backdrop')?.classList.remove('visible');
            document.body.style.overflow = '';
          }
        }
      });
      window.layoutEventInitialized = true;
    }
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
