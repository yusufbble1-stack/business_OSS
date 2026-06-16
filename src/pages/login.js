import { signIn, signInWithGoogle, signUp } from '../lib/auth.js';
import { navigate } from '../lib/router.js';
import { icon, refreshIcons } from '../lib/icons.js';
import { t } from '../lib/i18n.js';

export function renderLoginPage() {
  const app = document.getElementById('app');
  app.innerHTML = `
    <div class="login-wrapper">
      <div class="login-card">
        <a href="#/home" class="login-logo" style="text-decoration:none; color:inherit;">
          <img src="/assets/logo.png" alt="AS Performance Chiptuning"/>
          <h1>AS Performance</h1>
          <span>CHIPTUNING BUSINESS OS</span>
        </a>

        <div class="login-error" id="login-error">
          ${icon('alert-circle', 16)}
          <span id="login-error-msg"></span>
        </div>

        <!-- Google Sign-In Button -->
        <div class="login-google-section">
          <button class="login-google-btn" id="google-signin-btn" type="button">
            <svg width="18" height="18" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>
            ${t('sign_in_google')}
          </button>
        </div>

        <div class="login-divider" id="email-divider">${t('or_signin_email')}</div>

        <div class="registration-notice" id="registration-notice" style="display:none; padding:16px 20px; background:rgba(196,30,30,0.05); border:1px solid rgba(196,30,30,0.15); border-radius:4px; text-align:center; margin-bottom:16px;">
          <p style="font-size:13px; line-height:1.6; color:rgba(255,255,255,0.9); margin:0 0 12px 0; font-family:var(--font-sans);">
            <strong>Tuning Accounts Registration</strong><br/>
            New registration is exclusive to Google Accounts. Simply click the <strong>Sign In with Google</strong> button above to instantly create your secure profile and tuning credits wallet.
          </p>
          <p style="font-size:11px; color:var(--brand-red-light); margin:0; font-family:var(--font-heading); font-weight:600; letter-spacing:0.5px;">
            * ENFORCES TWO-FACTOR SECURITY FOR CREDITS AND TUNING FILES
          </p>
        </div>

        <form id="login-form">
          <div class="form-group">
            <label for="login-email">${t('email_address')}</label>
            <input type="email" id="login-email" placeholder="you@company.com" required autocomplete="email"/>
          </div>
          <div class="form-group">
            <label for="login-password">${t('password')}</label>
            <input type="password" id="login-password" placeholder="••••••••" required autocomplete="current-password"/>
          </div>
          <button type="submit" class="btn btn-primary" id="login-submit" style="width:100%;margin-top:8px">
            ${icon('log-in', 16)} <span>${t('sign_in')}</span>
          </button>
        </form>

        <div style="text-align:center;margin-top:16px">
          <a href="#" id="toggle-mode" style="color:var(--brand-red);font-size:12px;text-decoration:none">${t('dont_have_account')}</a>
        </div>
      </div>
    </div>`;

  refreshIcons();

  // Check for any OAuth errors saved in sessionStorage
  const authError = sessionStorage.getItem('auth_error');
  if (authError) {
    sessionStorage.removeItem('auth_error');
    const errorEl = document.getElementById('login-error');
    const errorMsg = document.getElementById('login-error-msg');
    if (errorEl && errorMsg) {
      errorMsg.textContent = authError;
      errorEl.classList.add('show');
    }
  }

  // ===== Google Sign-In (Supabase OAuth redirect) =====
  const googleBtn = document.getElementById('google-signin-btn');
  googleBtn.addEventListener('click', async () => {
    googleBtn.disabled = true;
    googleBtn.innerHTML = `<div class="spinner"></div> ${t('redirecting')}`;
    try {
      await signInWithGoogle();
      // Page will redirect to Google — no further action needed here
    } catch (err) {
      const errorEl = document.getElementById('login-error');
      const errorMsg = document.getElementById('login-error-msg');
      errorMsg.textContent = err.message;
      errorEl.classList.add('show');
      googleBtn.disabled = false;
      googleBtn.innerHTML = `<svg width="18" height="18" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg> ${t('sign_in_google')}`;
    }
  });

  // ===== Email/Password Sign-In & Google Sign-Up View Switch =====
  let isSignUp = false;
  const form = document.getElementById('login-form');
  const errorEl = document.getElementById('login-error');
  const errorMsg = document.getElementById('login-error-msg');
  const emailInput = document.getElementById('login-email');
  const passInput = document.getElementById('login-password');
  const submitBtn = document.getElementById('login-submit');
  const dividerText = document.getElementById('email-divider');
  const toggleBtn = document.getElementById('toggle-mode');
  const registrationNotice = document.getElementById('registration-notice');

  toggleBtn.addEventListener('click', (e) => {
    e.preventDefault();
    isSignUp = !isSignUp;
    if (isSignUp) {
      form.style.display = 'none';
      dividerText.style.display = 'none';
      registrationNotice.style.display = 'block';
      toggleBtn.textContent = t('already_have_account');
    } else {
      form.style.display = 'block';
      dividerText.style.display = 'flex';
      registrationNotice.style.display = 'none';
      toggleBtn.textContent = t('dont_have_account');
    }
    errorEl.classList.remove('show');
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<div class="spinner"></div> <span>${t('processing')}</span>`;
    errorEl.classList.remove('show');
    try {
      await signIn(emailInput.value, passInput.value);
      navigate('/dashboard');
    } catch (err) {
      errorMsg.textContent = err.message;
      errorEl.classList.add('show');
      submitBtn.disabled = false;
      submitBtn.innerHTML = `${icon('log-in', 16)} <span>${t('sign_in')}</span>`;
      refreshIcons();
    }
  });
}
