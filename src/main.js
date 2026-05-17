import './styles/global.css';
import './styles/layout.css';
import './styles/login.css';
import './styles/invoices.css';
import './styles/calendar.css';
import './styles/referrals.css';
import './styles/gains.css';
import './styles/homepage.css';
import './styles/credits.css';
import './styles/chatbot.css';
import './styles/dashboard-credits.css';

import { registerRoute, startRouter, navigate } from './lib/router.js';
import { initCurrentUser, isAdmin, isTechnician, isCustomer } from './lib/auth.js';

import { renderLoginPage } from './pages/login.js';
import { renderAdminDashboard } from './pages/dashboard-admin.js';
import { renderTechDashboard } from './pages/dashboard-tech.js';
import { renderCustomerDashboard } from './pages/dashboard-customer.js';
import { renderRequestsPage } from './pages/requests.js';
import { renderRequestDetail } from './pages/request-detail.js';
import { renderNewRequest } from './pages/request-new.js';
import { renderUsersPage } from './pages/users.js';
import { renderActivityPage } from './pages/activity.js';
import { renderSettingsPage } from './pages/settings.js';
import { renderInvoicesPage } from './pages/invoices.js';
import { renderVehiclesPage } from './pages/vehicles.js';
import { renderCalendarPage } from './pages/calendar.js';
import { renderReferralsPage } from './pages/referrals.js';
import { renderGainsPage } from './pages/gains.js';
import { renderHomepage } from './pages/homepage.js';
import { renderNetworkPage } from './pages/network.js';
import { renderPricingPage } from './pages/pricing.js';
import { renderCreditsPage } from './pages/credits.js';
import { renderToolsPage } from './pages/tools.js';
import { renderEcusPage } from './pages/ecus.js';
import { renderCategoriesPage } from './pages/categories.js';
import { renderDashboardCreditsPage } from './pages/dashboard-credits.js';

// Auth guard wrapper
function withAuth(renderFn) {
  return async (params) => {
    const user = await initCurrentUser();
    if (!user) { navigate('/login'); return; }
    renderFn(params);
  };
}

// Dashboard router - redirects based on role
async function dashboardRouter() {
  const user = await initCurrentUser();
  if (!user) { navigate('/login'); return; }
  if (isAdmin()) renderAdminDashboard();
  else if (isTechnician()) renderTechDashboard();
  else renderCustomerDashboard();
}

// Register all routes
// Public routes (no auth required)
registerRoute('/home', renderHomepage);
registerRoute('/network', renderNetworkPage);
registerRoute('/pricing', renderPricingPage);
registerRoute('/credits', async () => {
  const user = await initCurrentUser();
  if (user) {
    renderDashboardCreditsPage();
  } else {
    renderCreditsPage();
  }
});
registerRoute('/gains', renderGainsPage);
registerRoute('/tools', renderToolsPage);
registerRoute('/ecus', renderEcusPage);
registerRoute('/categories', renderCategoriesPage);

// Auth routes
registerRoute('/login', renderLoginPage);
registerRoute('/dashboard', dashboardRouter);
registerRoute('/requests', withAuth(renderRequestsPage));
registerRoute('/requests/new', withAuth(renderNewRequest));
registerRoute('/requests/:id', withAuth(renderRequestDetail));
registerRoute('/users', withAuth(renderUsersPage));
registerRoute('/activity', withAuth(renderActivityPage));
registerRoute('/vehicles', withAuth(renderVehiclesPage));
registerRoute('/invoices', withAuth(renderInvoicesPage));
registerRoute('/calendar', withAuth(renderCalendarPage));
registerRoute('/referrals', withAuth(renderReferralsPage));
// gains is registered as public above
registerRoute('/settings', withAuth(renderSettingsPage));

// Initialize
const PUBLIC_ROUTES = ['/home', '/network', '/pricing', '/credits', '/gains', '/tools', '/ecus', '/categories', '/login'];

async function init() {
  const user = await initCurrentUser();
  const hash = window.location.hash.slice(1) || '';
  const isPublic = PUBLIC_ROUTES.some(r => hash.startsWith(r));

  if (!user && !isPublic) {
    navigate('/home');
  } else if (user && (!hash || hash === '/' || hash === '')) {
    navigate('/dashboard');
  }
  startRouter();
}

init();
