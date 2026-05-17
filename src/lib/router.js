// Simple hash-based router
const routes = {};
let currentRoute = null;

export function registerRoute(path, handler) {
  routes[path] = handler;
}

export function navigate(path) {
  currentRoute = null; // Reset to force re-render
  window.location.hash = '#' + path;
}

export function getCurrentPath() {
  const hash = window.location.hash.slice(1) || '/login';
  return hash.split('?')[0];
}

export function startRouter() {
  const handleRoute = () => {
    const path = getCurrentPath();
    if (path === currentRoute) return;
    currentRoute = path;

    // Find matching route (support :id params)
    // Try exact match first
    let handler = routes[path];
    let params = {};

    if (!handler) {
      // Sort routes so static paths come before parameterized ones
      const sortedRoutes = Object.entries(routes).sort(([a], [b]) => {
        const aHasParam = a.includes(':');
        const bHasParam = b.includes(':');
        if (aHasParam && !bHasParam) return 1;
        if (!aHasParam && bHasParam) return -1;
        return b.length - a.length; // longer paths first
      });

      for (const [pattern, h] of sortedRoutes) {
        const patternParts = pattern.split('/');
        const pathParts = path.split('/');
        if (patternParts.length !== pathParts.length) continue;
        let match = true;
        const p = {};
        for (let i = 0; i < patternParts.length; i++) {
          if (patternParts[i].startsWith(':')) {
            p[patternParts[i].slice(1)] = pathParts[i];
          } else if (patternParts[i] !== pathParts[i]) {
            match = false; break;
          }
        }
        if (match) { handler = h; params = p; break; }
      }
    }

    if (handler) {
      handler(params);
    } else {
      navigate('/login');
    }
  };

  window.addEventListener('hashchange', handleRoute);
  handleRoute();
}
