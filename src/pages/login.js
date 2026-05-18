import { signIn, signInWithGoogle, signUp } from '../lib/auth.js';
import { navigate } from '../lib/router.js';
import { icon, refreshIcons } from '../lib/icons.js';

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';

export function renderLoginPage() {
  const app = document.getElementById('app');
  app.innerHTML = `
    <div class="login-wrapper">
      <div class="login-card">
        <div class="login-logo">
          <img src="/assets/logo.png" alt="AS Performance Chiptuning"/>
          <h1>AS Performance</h1>
          <span>CHIPTUNING BUSINESS OS</span>
        </div>

        <div class="login-error" id="login-error">
          ${icon('alert-circle', 16)}
          <span id="login-error-msg"></span>
        </div>

        <!-- Google Sign-In Button -->
        <div class="login-google-section">
          <button class="login-google-btn" id="google-signin-btn" type="button">
            <svg width="18" height="18" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>
            Sign in with Google
          </button>
        </div>

        <div class="login-divider" id="email-divider">or sign in with email</div>

        <form id="login-form">
          <div class="form-group" id="name-group" style="display:none">
            <label for="login-name">Full Name</label>
            <input type="text" id="login-name" placeholder="John Doe" autocomplete="name"/>
          </div>
          <div class="form-group">
            <label for="login-email">Email address</label>
            <input type="email" id="login-email" placeholder="you@company.com" required autocomplete="email"/>
          </div>
          <div class="form-group">
            <label for="login-password">Password</label>
            <input type="password" id="login-password" placeholder="••••••••" required autocomplete="current-password"/>
          </div>
          <button type="submit" class="btn btn-primary" id="login-submit" style="width:100%;margin-top:8px">
            ${icon('log-in', 16)} <span>Sign In</span>
          </button>
        </form>

        <div style="text-align:center;margin-top:16px">
          <a href="#" id="toggle-mode" style="color:var(--brand-red);font-size:12px;text-decoration:none">Don't have an account? Sign up</a>
        </div>

        <div class="login-divider">Demo Accounts</div>
        <div class="demo-accounts">
          <div class="demo-btn" data-email="admin@asperformance.com">
            <span style="display:flex;align-items:center;gap:8px">${icon('shield', 14)} admin@asperformance.com</span>
            <span class="badge badge-admin" style="font-size:9px;padding:2px 8px">Admin</span>
          </div>
          <div class="demo-btn" data-email="tech@asperformance.com">
            <span style="display:flex;align-items:center;gap:8px">${icon('wrench', 14)} tech@asperformance.com</span>
            <span class="badge badge-technician" style="font-size:9px;padding:2px 8px">Tech</span>
          </div>
          <div class="demo-btn" data-email="client@asperformance.com">
            <span style="display:flex;align-items:center;gap:8px">${icon('user', 14)} client@asperformance.com</span>
            <span class="badge badge-customer" style="font-size:9px;padding:2px 8px">Client</span>
          </div>
        </div>
      </div>
    </div>`;

  refreshIcons();

  // ===== Google Sign-In =====
  const googleBtn = document.getElementById('google-signin-btn');
  
  if (GOOGLE_CLIENT_ID) {
    // Load and initialize Google Identity Services
    initGoogleSignIn();
  }
  
  // Always allow click — if no client ID, use a fallback prompt
  googleBtn.addEventListener('click', () => {
    if (GOOGLE_CLIENT_ID && window.google?.accounts?.id) {
      window.google.accounts.id.prompt();
    } else {
      // No Google Client ID configured — show a friendly message
      const errorEl = document.getElementById('login-error');
      const errorMsg = document.getElementById('login-error-msg');
      errorMsg.textContent = 'Google Sign-In not configured yet. Use a demo account or email login.';
      errorEl.classList.add('show');
    }
  });

  // ===== Email/Password Sign-In / Sign-Up =====
  let isSignUp = false;
  const form = document.getElementById('login-form');
  const errorEl = document.getElementById('login-error');
  const errorMsg = document.getElementById('login-error-msg');
  const emailInput = document.getElementById('login-email');
  const passInput = document.getElementById('login-password');
  const nameInput = document.getElementById('login-name');
  const nameGroup = document.getElementById('name-group');
  const submitBtn = document.getElementById('login-submit');
  const dividerText = document.getElementById('email-divider');
  const toggleBtn = document.getElementById('toggle-mode');

  toggleBtn.addEventListener('click', (e) => {
    e.preventDefault();
    isSignUp = !isSignUp;
    nameGroup.style.display = isSignUp ? 'block' : 'none';
    nameInput.required = isSignUp;
    dividerText.textContent = isSignUp ? 'or sign up with email' : 'or sign in with email';
    submitBtn.innerHTML = isSignUp ? `${icon('user-plus', 16)} <span>Sign Up</span>` : `${icon('log-in', 16)} <span>Sign In</span>`;
    toggleBtn.textContent = isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up";
    errorEl.classList.remove('show');
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<div class="spinner"></div> <span>Processing...</span>';
    errorEl.classList.remove('show');
    try {
      if (isSignUp) {
        await signUp(emailInput.value, passInput.value, nameInput.value);
      } else {
        await signIn(emailInput.value, passInput.value);
      }
      navigate('/dashboard');
    } catch (err) {
      errorMsg.textContent = err.message;
      errorEl.classList.add('show');
      submitBtn.disabled = false;
      submitBtn.innerHTML = isSignUp ? `${icon('user-plus', 16)} <span>Sign Up</span>` : `${icon('log-in', 16)} <span>Sign In</span>`;
      refreshIcons();
    }
  });

  // ===== Demo account quick-fill and auto-login =====
  const DEMO_ACCOUNTS = {
    'admin@asperformance.com': { name: 'Admin User', role: 'admin' },
    'tech@asperformance.com': { name: 'Tech User', role: 'technician' },
    'client@asperformance.com': { name: 'Client User', role: 'customer' },
  };
  const DEMO_PASSWORD = 'Demo123!';

  document.querySelectorAll('.demo-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const email = btn.dataset.email;
      const account = DEMO_ACCOUNTS[email];
      emailInput.value = email;
      passInput.value = DEMO_PASSWORD;

      submitBtn.disabled = true;
      submitBtn.innerHTML = '<div class="spinner"></div> <span>Logging in...</span>';
      errorEl.classList.remove('show');

      try {
        // Try signing in first
        await signIn(email, DEMO_PASSWORD);
        navigate('/dashboard');
      } catch (loginErr) {
        // If account doesn't exist, create it
        if (loginErr.message?.includes('Invalid login credentials') || loginErr.message?.includes('Email not confirmed')) {
          try {
            await signUp(email, DEMO_PASSWORD, account.name);
            // After signup, update the role if it's not 'customer'
            navigate('/dashboard');
          } catch (signUpErr) {
            // If signup says "check email" (email confirmation enabled), show that
            errorMsg.textContent = signUpErr.message;
            errorEl.classList.add('show');
          }
        } else {
          errorMsg.textContent = loginErr.message;
          errorEl.classList.add('show');
        }
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `${icon('log-in', 16)} <span>Sign In</span>`;
        refreshIcons();
      }
    });
  });
}

// ===== Google Identity Services initialization =====
let currentNonce = '';

async function generateNonce() {
  const nonceBytes = crypto.getRandomValues(new Uint8Array(32));
  const nonce = btoa(String.fromCharCode(...nonceBytes));
  const encoder = new TextEncoder();
  const encodedNonce = encoder.encode(nonce);
  const hashBuffer = await crypto.subtle.digest('SHA-256', encodedNonce);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashedNonce = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return { nonce, hashedNonce };
}

async function initGoogleSignIn() {
  // Wait for the GSI script to load
  async function tryInit() {
    if (window.google?.accounts?.id) {
      const { nonce, hashedNonce } = await generateNonce();
      currentNonce = nonce;
      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleGoogleCredential,
        auto_select: false,
        nonce: hashedNonce,
      });
    } else {
      setTimeout(tryInit, 200);
    }
  }
  tryInit();
}

async function handleGoogleCredential(response) {
  const errorEl = document.getElementById('login-error');
  const errorMsg = document.getElementById('login-error-msg');
  const googleBtn = document.getElementById('google-signin-btn');
  
  if (googleBtn) {
    googleBtn.disabled = true;
    googleBtn.innerHTML = '<div class="spinner"></div> Signing in...';
  }
  
  try {
    await signInWithGoogle(response, currentNonce);
    navigate('/dashboard');
  } catch (err) {
    if (errorEl && errorMsg) {
      errorMsg.textContent = err.message;
      errorEl.classList.add('show');
    }
    if (googleBtn) {
      googleBtn.disabled = false;
      googleBtn.innerHTML = `<svg width="18" height="18" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg> Sign in with Google`;
    }
  }
}
