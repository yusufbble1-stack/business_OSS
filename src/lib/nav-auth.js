// ===== Public Navigation Auth State =====
// Shared helper for rendering user profile / login state in the public nav bar

import { getCurrentUser, signOut } from './auth.js';

/**
 * Returns HTML for the nav actions area on public pages.
 * - Logged in: shows avatar, name, Dashboard button, and Logout
 * - Not logged in: shows Contact Us and Sign In link
 */
export function getNavAuthHTML() {
  const user = getCurrentUser();

  if (user) {
    const initials = (user.full_name || user.email || 'U')
      .split(' ')
      .map(w => w[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
    
    const picture = user.picture
      ? `<img src="${user.picture}" alt="${user.full_name}" class="hp-nav-avatar-img"/>`
      : `<span class="hp-nav-avatar-initials">${initials}</span>`;

    return `
      <div class="hp-nav-actions">
        <a href="#/dashboard" class="hp-nav-cta hp-nav-dashboard-btn">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>
          Dashboard
        </a>
        <div class="hp-nav-profile" id="hp-nav-profile">
          <div class="hp-nav-avatar">
            ${picture}
          </div>
          <span class="hp-nav-user-label">${user.full_name || user.email}</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg>
          <div class="hp-nav-dropdown" id="hp-nav-dropdown">
            <div class="hp-nav-dropdown-header">
              <div class="hp-nav-dropdown-avatar">${picture}</div>
              <div>
                <div class="hp-nav-dropdown-name">${user.full_name || 'User'}</div>
                <div class="hp-nav-dropdown-email">${user.email || ''}</div>
              </div>
            </div>
            <div class="hp-nav-dropdown-divider"></div>
            <a href="#/dashboard" class="hp-nav-dropdown-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>
              Dashboard
            </a>
            <a href="#/credits" class="hp-nav-dropdown-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="20" height="14" x="2" y="5" rx="2"/><path d="M2 10h20"/></svg>
              My Credits
            </a>
            <a href="#/settings" class="hp-nav-dropdown-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
              Settings
            </a>
            <div class="hp-nav-dropdown-divider"></div>
            <button class="hp-nav-dropdown-item hp-nav-dropdown-logout" id="hp-nav-logout-btn">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
              Logout
            </button>
          </div>
        </div>
      </div>
    `;
  }

  return `
    <div class="hp-nav-actions">
      <a href="mailto:asperformance.contact@gmail.com" class="hp-nav-cta">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
        Contact Us
      </a>
      <a href="#/login" class="hp-nav-login">Sign In</a>
    </div>
  `;
}

/**
 * Attach event listeners for the nav profile dropdown and logout.
 * Call this after rendering a page that uses getNavAuthHTML().
 */
export function initNavAuthEvents() {
  const profile = document.getElementById('hp-nav-profile');
  const dropdown = document.getElementById('hp-nav-dropdown');

  if (profile && dropdown) {
    profile.addEventListener('click', (e) => {
      e.stopPropagation();
      dropdown.classList.toggle('show');
    });

    document.addEventListener('click', (e) => {
      if (!profile.contains(e.target)) {
        dropdown.classList.remove('show');
      }
    });
  }

  // Logout button
  document.getElementById('hp-nav-logout-btn')?.addEventListener('click', async () => {
    await signOut();
    window.location.reload();
  });
}
