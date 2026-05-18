import { supabase, isDemoMode } from './supabase.js';
import { showToast } from './utils.js';

let currentUser = null;

// ===== AUTH FUNCTIONS =====

export async function signIn(email, password) {
  if (isDemoMode) {
    throw new Error('Demo mode is disabled. Please connect to Supabase.');
  }
  
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  
  const profile = await getProfile(data.user.id);
  if (!profile.is_active) {
    await supabase.auth.signOut();
    throw new Error('Account is deactivated');
  }
  
  currentUser = profile;
  return currentUser;
}

export async function signUp(email, password, fullName) {
  if (isDemoMode) {
    throw new Error('Demo mode is disabled. Please connect to Supabase.');
  }

  // Pass fullName in user metadata so the handle_new_user trigger can pick it up
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName
      }
    }
  });

  if (error) throw error;
  
  if (!data.session) {
    throw new Error('Sign up successful! Please check your email to confirm your account before logging in.');
  }

  const profile = await getProfile(data.user.id);
  currentUser = profile;
  return currentUser;
}

/**
 * Sign in with Google using the credential JWT from Google Identity Services.
 */
export async function signInWithGoogle(credentialResponse) {
  if (isDemoMode) {
    throw new Error('Demo mode is disabled. Please connect to Supabase.');
  }

  try {
    const { data, error } = await supabase.auth.signInWithIdToken({
      provider: 'google',
      token: credentialResponse.credential,
    });
    
    if (error) throw error;

    // The database trigger automatically creates the profile on first signup.
    // We just fetch it here.
    const profile = await getProfile(data.user.id);
    
    if (!profile.is_active) {
      await supabase.auth.signOut();
      throw new Error('Account is deactivated');
    }
    
    currentUser = profile;
    return currentUser;
  } catch (err) {
    console.error('[Auth] Google sign-in failed:', err);
    throw new Error('Google sign-in failed. Please try again.');
  }
}

export async function signOut() {
  if (!isDemoMode) {
    await supabase.auth.signOut();
  }
  currentUser = null;
  window.location.hash = '#/home';
}

/**
 * Async: loads user from Supabase session. Use in auth guards.
 */
export async function initCurrentUser() {
  if (currentUser) return currentUser;
  
  if (isDemoMode) return null;

  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) return null;
    
    currentUser = await getProfile(session.user.id);
    return currentUser;
  } catch (err) {
    console.error('[Auth] Error initializing user:', err);
    return null;
  }
}

/**
 * Sync: returns the already-loaded current user (for rendering). 
 * Must only be called AFTER initCurrentUser() has resolved.
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
  }
}

async function getProfile(userId, retries = 5) {
  for (let i = 0; i < retries; i++) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle();
      
    if (error) throw error;
    if (data) return data;
    
    // Wait 500ms before retrying to allow trigger to complete
    await new Promise(r => setTimeout(r, 500));
  }
  throw new Error('Could not load profile. Please refresh or contact support.');
}

export function getUserRole() {
  return currentUser?.role || null;
}

export function isAdmin() { return currentUser?.role === 'admin'; }
export function isTechnician() { return currentUser?.role === 'technician'; }
export function isCustomer() { return currentUser?.role === 'customer'; }

export function requireAuth() {
  if (!currentUser) { 
    window.location.hash = '#/login'; 
    return false; 
  }
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
