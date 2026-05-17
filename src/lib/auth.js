import { supabase, isDemoMode } from './supabase.js';
import { showToast } from './utils.js';

// ===== DEMO DATA =====
const DEMO_USERS = {
  'admin@asperformance.com': { id: 'admin-1', email: 'admin@asperformance.com', full_name: 'Yussuf Admin', role: 'admin', phone: '+33 6 00 00 00', is_active: true },
  'tech@asperformance.com': { id: 'tech-1', email: 'tech@asperformance.com', full_name: 'Alex Technician', role: 'technician', phone: '+33 6 11 11 11', is_active: true },
  'client@asperformance.com': { id: 'customer-1', email: 'client@asperformance.com', full_name: 'Jean Dupont', role: 'customer', company_name: 'SOS Reprog', phone: '+33 6 22 22 22', is_active: true },
};

// Demo passwords — prevents unauthorized access when deployed publicly
const DEMO_PASSWORD = 'demo2026';

let currentUser = null;

// ===== AUTH FUNCTIONS =====
export async function signIn(email, password) {
  if (isDemoMode) {
    const user = DEMO_USERS[email.toLowerCase()];
    if (!user || password !== DEMO_PASSWORD) throw new Error('Invalid credentials. Try: admin@asperformance.com with password demo2026');
    currentUser = { ...user };
    localStorage.setItem('asp_demo_user', JSON.stringify(currentUser));
    return currentUser;
  }
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  const profile = await getProfile(data.user.id);
  if (!profile.is_active) { await supabase.auth.signOut(); throw new Error('Account is deactivated'); }
  currentUser = profile;
  return currentUser;
}

/**
 * Sign in with Google using the credential JWT from Google Identity Services.
 * Decodes the JWT payload to extract user info (name, email, picture).
 * Creates a customer account in demo mode.
 */
export async function signInWithGoogle(credentialResponse) {
  try {
    // Decode the JWT payload (base64url → JSON)
    const payload = JSON.parse(atob(credentialResponse.credential.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')));
    
    const email = payload.email;
    const fullName = payload.name || payload.given_name || email.split('@')[0];
    const picture = payload.picture || '';

    // Check if this Google user already exists in demo users
    if (DEMO_USERS[email.toLowerCase()]) {
      currentUser = { ...DEMO_USERS[email.toLowerCase()], picture };
    } else {
      // Create a new customer account for this Google user
      currentUser = {
        id: 'google-' + payload.sub,
        email: email,
        full_name: fullName,
        role: 'customer',
        company_name: '',
        phone: '',
        picture: picture,
        is_active: true,
        provider: 'google',
      };
    }
    
    localStorage.setItem('asp_demo_user', JSON.stringify(currentUser));
    return currentUser;
  } catch (err) {
    console.error('[Auth] Google sign-in failed:', err);
    throw new Error('Google sign-in failed. Please try again.');
  }
}

export async function signOut() {
  if (isDemoMode) {
    currentUser = null;
    localStorage.removeItem('asp_demo_user');
    window.location.hash = '#/home';
    return;
  }
  await supabase.auth.signOut();
  currentUser = null;
  window.location.hash = '#/home';
}

/**
 * Async: loads user from cache/localStorage/supabase. Use in auth guards.
 */
export async function initCurrentUser() {
  if (currentUser) return currentUser;
  if (isDemoMode) {
    const saved = localStorage.getItem('asp_demo_user');
    if (saved) { currentUser = JSON.parse(saved); return currentUser; }
    return null;
  }
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  currentUser = await getProfile(user.id);
  return currentUser;
}

/**
 * Sync: returns the already-loaded current user (for rendering). 
 * Must only be called AFTER initCurrentUser() has resolved (handled by withAuth in main.js).
 */
export function getCurrentUser() {
  return currentUser;
}

/**
 * Update the cached user object (e.g. after profile save)
 */
export function updateCurrentUserCache(updates) {
  if (currentUser) {
    Object.assign(currentUser, updates);
    if (isDemoMode) {
      localStorage.setItem('asp_demo_user', JSON.stringify(currentUser));
    }
  }
}

async function getProfile(userId) {
  const { data, error } = await supabase.from('profiles').select('*').eq('id', userId).single();
  if (error) throw error;
  return data;
}

export function getUserRole() {
  return currentUser?.role || null;
}

export function isAdmin() { return currentUser?.role === 'admin'; }
export function isTechnician() { return currentUser?.role === 'technician'; }
export function isCustomer() { return currentUser?.role === 'customer'; }

export function requireAuth() {
  if (!currentUser) { window.location.hash = '#/login'; return false; }
  return true;
}

export function requireRole(role) {
  if (!requireAuth()) return false;
  if (currentUser.role !== role && currentUser.role !== 'admin') {
    showToast('Access denied', 'error');
    return false;
  }
  return true;
}
