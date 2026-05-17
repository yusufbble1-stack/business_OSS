import { icon, refreshIcons } from './icons.js';

// ===== TOAST SYSTEM =====
export function showToast(message, type = 'info', duration = 3500) {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  const icons = { success: 'check-circle', error: 'x-circle', warning: 'alert-triangle', info: 'info' };
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `${icon(icons[type] || 'info', 18)} <span>${message}</span>`;
  container.appendChild(toast);
  refreshIcons();
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(20px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

// ===== MODAL SYSTEM =====
export function showModal(title, bodyHTML, buttons = []) {
  const overlay = document.createElement('div');
  overlay.className = 'overlay';
  overlay.id = 'modal-overlay';
  overlay.innerHTML = `
    <div class="modal">
      <div class="modal-header">
        <h2>${title}</h2>
        <button class="btn btn-ghost btn-icon modal-close" id="modal-close-btn">${icon('x', 20)}</button>
      </div>
      <div class="modal-body">${bodyHTML}</div>
      ${buttons.length ? `<div class="modal-footer">
        <button class="btn btn-secondary modal-close">Cancel</button>
        ${buttons.map(b => `<button class="btn ${b.class || 'btn-primary'}" id="${b.id}">${b.label}</button>`).join('')}
      </div>` : ''}
    </div>`;
  document.body.appendChild(overlay);
  refreshIcons();

  // Close handlers
  const closeModal = () => { overlay.style.opacity = '0'; setTimeout(() => overlay.remove(), 200); };
  overlay.querySelectorAll('.modal-close').forEach(el => el.addEventListener('click', closeModal));
  overlay.addEventListener('click', (e) => { if (e.target === overlay) closeModal(); });

  // Button handlers
  buttons.forEach(b => {
    const btn = overlay.querySelector(`#${b.id}`);
    if (btn && b.onClick) {
      btn.addEventListener('click', () => {
        const formData = {};
        overlay.querySelectorAll('input, select, textarea').forEach(input => {
          const label = input.closest('.form-group')?.querySelector('label')?.textContent?.toLowerCase()?.replace(/[^a-z]/g, '_') || '';
          formData[label] = input.value;
        });
        b.onClick(formData, closeModal);
      });
    }
  });

  return { close: closeModal, overlay };
}

// ===== CONFIRM DIALOG =====
export function confirmDialog(title, message) {
  return new Promise((resolve) => {
    showModal(title, `<p style="color:#fff;font-size:var(--text-sm)">${message}</p>`, [
      { id: 'confirm-yes', label: 'Confirm', class: 'btn-primary', onClick: (_, close) => { resolve(true); close(); } },
    ]);
    // If cancelled, resolve false
    const overlay = document.getElementById('modal-overlay');
    if (overlay) {
      const origClose = () => { resolve(false); };
      overlay.querySelectorAll('.modal-close').forEach(el => el.addEventListener('click', origClose, { once: true }));
    }
  });
}

// ===== FORMATTING =====
export function timeAgo(date) {
  const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
  if (seconds < 60) return 'just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
  return new Date(date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}

export function formatDate(date) {
  return new Date(date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

export function formatDateTime(date) {
  return new Date(date).toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}

// ===== LABELS =====
export const SERVICE_LABELS = {
  stage1: 'Stage 1', stage2: 'Stage 2', dpf_off: 'DPF Off',
  egr_off: 'EGR Off', adblue_off: 'AdBlue Off', dtc_off: 'DTC Off', custom: 'Custom',
};
export const STATUS_LABELS = {
  pending: 'Pending', assigned: 'Assigned', in_progress: 'In Progress',
  completed: 'Completed', delivered: 'Delivered', cancelled: 'Cancelled',
};
export const PRIORITY_COLORS = {
  low: 'var(--brand-muted)', normal: 'var(--brand-silver)', high: 'var(--status-pending)', urgent: 'var(--status-cancelled)',
};
