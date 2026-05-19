import { renderSidebar, renderHeader, initLayoutEvents } from '../components/layout.js';
import { getCurrentUser } from '../lib/auth.js';
import { demoProfiles, demoRequests, getProfileById } from '../lib/store.js';
import { icon, refreshIcons } from '../lib/icons.js';
import { showToast } from '../lib/utils.js';

// In-memory invoice store
const savedInvoices = [];
let lineItems = [{ description: 'Stage 1 ECU Remap', qty: 1, price: 280 }];
let nextInvNum = 1001;

function uid() { return 'inv-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2,6); }

function getCustomers() { return demoProfiles.filter(p => p.role === 'customer' && p.is_active); }

function calcTotals(items, taxPct, discountPct) {
  const subtotal = items.reduce((s, i) => s + (i.qty * i.price), 0);
  const discount = subtotal * (discountPct / 100);
  const afterDiscount = subtotal - discount;
  const tax = afterDiscount * (taxPct / 100);
  const total = afterDiscount + tax;
  return { subtotal, discount, tax, total };
}

function buildInvoicePaperHTML(data) {
  const { subtotal, discount, tax, total } = calcTotals(data.items, data.taxPct, data.discountPct);
  return `
    <div class="inv-header">
      <div class="inv-brand">
        <img src="/assets/logo.png" class="inv-logo" alt="Logo"/>
        <div>
          <div class="inv-company-name">AS Performance</div>
          <div class="inv-company-sub">Chiptuning</div>
        </div>
      </div>
      <div class="inv-title-block">
        <div class="inv-title">INVOICE</div>
        <div class="inv-number">#INV-${data.invoiceNum}</div>
        <div class="inv-date">${data.date}</div>
      </div>
    </div>

    <div class="inv-addresses">
      <div>
        <div class="inv-addr-label">From</div>
        <div class="inv-addr-name">AS Performance</div>
        <div class="inv-addr-line">123 Rue de la Performance<br/>75001 Paris, France<br/>+33 6 00 00 00 00<br/>admin@asperformance.com</div>
      </div>
      <div>
        <div class="inv-addr-label">Bill To</div>
        <div class="inv-addr-name">${data.clientName || '—'}</div>
        <div class="inv-addr-line">${data.clientCompany ? data.clientCompany + '<br/>' : ''}${data.clientPhone ? data.clientPhone + '<br/>' : ''}${data.clientEmail || ''}</div>
      </div>
    </div>

    <table class="inv-table">
      <thead><tr><th>Description</th><th>Qty</th><th>Unit Price</th><th>Amount</th></tr></thead>
      <tbody>
        ${data.items.map(i => `<tr>
          <td>${i.description || '—'}</td>
          <td>${i.qty}</td>
          <td>€${Number(i.price).toFixed(2)}</td>
          <td>€${(i.qty * i.price).toFixed(2)}</td>
        </tr>`).join('')}
      </tbody>
    </table>

    <div class="inv-totals">
      <div class="inv-totals-table">
        <div class="inv-totals-row subtotal"><span class="label">Subtotal</span><span class="value">€${subtotal.toFixed(2)}</span></div>
        ${data.discountPct > 0 ? `<div class="inv-totals-row"><span class="label">Discount (${data.discountPct}%)</span><span class="value">-€${discount.toFixed(2)}</span></div>` : ''}
        ${data.taxPct > 0 ? `<div class="inv-totals-row"><span class="label">Tax (${data.taxPct}%)</span><span class="value">€${tax.toFixed(2)}</span></div>` : ''}
        <div class="inv-totals-row grand-total"><span class="label">Total</span><span class="value">€${total.toFixed(2)}</span></div>
      </div>
    </div>

    ${data.notes ? `<div class="inv-notes"><div class="inv-notes-label">Notes</div><div class="inv-notes-text">${data.notes}</div></div>` : ''}

    <div class="inv-footer">
      <div class="inv-footer-text">Thank you for choosing AS Performance!<br/>Payment due within 30 days. Bank transfer or cash accepted.</div>
    </div>`;
}

function getFormData() {
  const clientId = document.getElementById('inv-client')?.value || '';
  const client = getProfileById(clientId);
  return {
    invoiceNum: document.getElementById('inv-num')?.value || nextInvNum,
    date: document.getElementById('inv-date')?.value || new Date().toLocaleDateString('en-GB'),
    clientId,
    clientName: client?.full_name || document.getElementById('inv-client-name')?.value || '',
    clientCompany: client?.company_name || '',
    clientPhone: client?.phone || '',
    clientEmail: client?.email || '',
    items: lineItems,
    taxPct: parseFloat(document.getElementById('inv-tax')?.value) || 0,
    discountPct: parseFloat(document.getElementById('inv-discount')?.value) || 0,
    notes: document.getElementById('inv-notes')?.value || '',
  };
}

function refreshPreview() {
  const paper = document.getElementById('invoice-paper');
  if (paper) paper.innerHTML = buildInvoicePaperHTML(getFormData());
}

function initFormEvents() {
  // Client select
  document.getElementById('inv-client')?.addEventListener('change', refreshPreview);
  // All inputs
  document.querySelectorAll('.inv-form-input').forEach(el => el.addEventListener('input', refreshPreview));

  // Add line item
  document.getElementById('btn-add-line')?.addEventListener('click', () => {
    lineItems.push({ description: '', qty: 1, price: 0 });
    renderLineItems();
    refreshPreview();
  });

  // Export PDF
  document.getElementById('btn-export-pdf')?.addEventListener('click', async () => {
    const paper = document.getElementById('invoice-paper');
    if (!paper) return;
    try {
      const html2pdf = (await import('html2pdf.js')).default;
      const data = getFormData();
      html2pdf().set({
        margin: 0, filename: `Invoice-${data.invoiceNum}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, backgroundColor: '#ffffff' },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      }).from(paper).save();
      showToast('PDF exported successfully!', 'success');
    } catch (e) { showToast('PDF export failed: ' + e.message, 'error'); }
  });

  // WhatsApp
  document.getElementById('btn-whatsapp')?.addEventListener('click', () => {
    const data = getFormData();
    const { total } = calcTotals(data.items, data.taxPct, data.discountPct);
    const phone = (data.clientPhone || '').replace(/[\s\-\(\)]/g, '');
    const msg = encodeURIComponent(
      `📄 *Invoice #INV-${data.invoiceNum}*\n` +
      `From: AS Performance\n` +
      `To: ${data.clientName}\n` +
      `Date: ${data.date}\n\n` +
      data.items.map(i => `• ${i.description} (x${i.qty}) — €${(i.qty * i.price).toFixed(2)}`).join('\n') +
      `\n\n💰 *Total: €${total.toFixed(2)}*\n\n` +
      `Thank you for choosing AS Performance!`
    );
    const url = phone ? `https://wa.me/${phone}?text=${msg}` : `https://wa.me/?text=${msg}`;
    window.open(url, '_blank');
    showToast('Opening WhatsApp…', 'info');
  });

  // Save invoice
  document.getElementById('btn-save-inv')?.addEventListener('click', () => {
    const data = getFormData();
    const { total } = calcTotals(data.items, data.taxPct, data.discountPct);
    savedInvoices.push({ id: uid(), ...data, total, status: 'draft', created_at: new Date().toISOString() });
    nextInvNum++;
    showToast('Invoice saved!', 'success');
    renderInvoicesPage();
  });
}

function renderLineItems() {
  const list = document.getElementById('line-items-list');
  if (!list) return;
  list.innerHTML = lineItems.map((item, i) => `
    <div class="line-item-row" data-idx="${i}">
      <input type="text" value="${item.description}" placeholder="Description" data-field="description" class="inv-line-input"/>
      <input type="number" value="${item.qty}" min="1" data-field="qty" class="inv-line-input" style="text-align:center"/>
      <input type="number" value="${item.price}" min="0" step="0.01" data-field="price" class="inv-line-input" style="text-align:right"/>
      <button class="btn-remove-item" data-idx="${i}" title="Remove">×</button>
    </div>`).join('');

  // Bind events
  list.querySelectorAll('.inv-line-input').forEach(inp => {
    inp.addEventListener('input', (e) => {
      const row = e.target.closest('.line-item-row');
      const idx = parseInt(row.dataset.idx);
      const field = e.target.dataset.field;
      lineItems[idx][field] = field === 'description' ? e.target.value : parseFloat(e.target.value) || 0;
      refreshPreview();
    });
  });
  list.querySelectorAll('.btn-remove-item').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const idx = parseInt(e.currentTarget.dataset.idx);
      if (lineItems.length > 1) { lineItems.splice(idx, 1); renderLineItems(); refreshPreview(); }
    });
  });
}

export function renderInvoicesPage() {
  const app = document.getElementById('app');
  const customers = getCustomers();
  const today = new Date().toISOString().split('T')[0];

  // Stats
  const totalInv = savedInvoices.length;
  const totalRevenue = savedInvoices.reduce((s, i) => s + (i.total || 0), 0);
  const draftCount = savedInvoices.filter(i => i.status === 'draft').length;
  const paidCount = savedInvoices.filter(i => i.status === 'paid').length;

  app.innerHTML = `
    <div class="app-layout">
      ${renderSidebar()}
      <main class="app-main">
        ${renderHeader()}
        <div class="page-content">
          <div class="page-header animate-in">
            <div>
              <h1>${icon('file-text', 28)} Invoices</h1>
              <p>Generate, preview and send professional invoices to your clients.</p>
            </div>
          </div>

          <!-- Stats -->
          <div class="invoice-stats animate-in" style="animation-delay:0.05s">
            <div class="invoice-stat-card">
              <div class="invoice-stat-label">Total Invoices</div>
              <div class="invoice-stat-value">${totalInv}</div>
            </div>
            <div class="invoice-stat-card">
              <div class="invoice-stat-label">Revenue</div>
              <div class="invoice-stat-value" style="color:var(--status-completed)">€${totalRevenue.toFixed(2)}</div>
            </div>
            <div class="invoice-stat-card">
              <div class="invoice-stat-label">Drafts</div>
              <div class="invoice-stat-value" style="color:var(--status-pending)">${draftCount}</div>
            </div>
            <div class="invoice-stat-card">
              <div class="invoice-stat-label">Paid</div>
              <div class="invoice-stat-value" style="color:var(--status-completed)">${paidCount}</div>
            </div>
          </div>

          <div class="invoice-page-grid animate-in" style="animation-delay:0.1s">
            <!-- LEFT: Form -->
            <div class="invoice-form-panel">
              <div class="form-section">
                <div class="form-section-title">${icon('hash', 14)} Invoice Details</div>
                <div class="form-row" style="margin-bottom:12px">
                  <div class="form-group">
                    <label>Invoice #</label>
                    <input type="text" id="inv-num" value="${nextInvNum}" class="inv-form-input"/>
                  </div>
                  <div class="form-group">
                    <label>Date</label>
                    <input type="date" id="inv-date" value="${today}" class="inv-form-input"/>
                  </div>
                </div>
              </div>

              <div class="form-section">
                <div class="form-section-title">${icon('user', 14)} Client</div>
                <div class="form-group">
                  <label>Select Client</label>
                  <select id="inv-client" class="inv-form-input">
                    <option value="">— Choose a client —</option>
                    ${customers.map(c => `<option value="${c.id}">${c.full_name}${c.company_name ? ' (' + c.company_name + ')' : ''}</option>`).join('')}
                  </select>
                </div>
              </div>

              <div class="form-section">
                <div class="form-section-title">${icon('list', 14)} Line Items</div>
                <div class="line-item-header">
                  <span>Description</span><span>Qty</span><span>Price (€)</span><span></span>
                </div>
                <div id="line-items-list" class="line-items-list"></div>
                <button class="btn-add-item" id="btn-add-line">${icon('plus', 14)} Add Line Item</button>
              </div>

              <div class="form-section">
                <div class="form-section-title">${icon('percent', 14)} Tax & Discount</div>
                <div class="extras-row">
                  <div class="form-group">
                    <label>Tax %</label>
                    <input type="number" id="inv-tax" value="20" min="0" max="100" class="inv-form-input"/>
                  </div>
                  <div class="form-group">
                    <label>Discount %</label>
                    <input type="number" id="inv-discount" value="0" min="0" max="100" class="inv-form-input"/>
                  </div>
                </div>
              </div>

              <div class="form-section">
                <div class="form-section-title">${icon('message-square', 14)} Notes</div>
                <div class="form-group">
                  <textarea id="inv-notes" class="inv-form-input" rows="3" placeholder="Payment terms, thank you note…">Payment due within 30 days.</textarea>
                </div>
              </div>

              <button class="btn btn-primary w-full" id="btn-save-inv" style="margin-top:8px">${icon('save', 16)} Save Invoice</button>
            </div>

            <!-- RIGHT: Preview -->
            <div class="invoice-preview-panel">
              <div class="preview-toolbar">
                <div class="preview-toolbar-left">
                  <h3>${icon('eye', 16)} Live Preview</h3>
                </div>
                <div class="preview-toolbar-right">
                  <button class="btn btn-whatsapp btn-sm" id="btn-whatsapp">${icon('message-circle', 14)} WhatsApp</button>
                  <button class="btn btn-primary btn-sm" id="btn-export-pdf">${icon('download', 14)} Export PDF</button>
                </div>
              </div>
              <div class="invoice-paper-wrap">
                <div class="invoice-paper" id="invoice-paper"></div>
              </div>
            </div>
          </div>

          ${savedInvoices.length > 0 ? `
          <div class="card animate-in" style="margin-top:24px;padding:0;overflow:hidden;animation-delay:0.2s">
            <div class="card-header" style="padding:20px 24px 0">
              <h3>${icon('archive', 18)} Saved Invoices</h3>
            </div>
            <div class="invoices-table-wrap" style="border:none;background:none">
              <table style="min-width:600px">
                <thead><tr><th>Invoice</th><th>Client</th><th>Date</th><th>Total</th><th>Status</th></tr></thead>
                <tbody>
                  ${savedInvoices.map(inv => {
                    const d = new Date(inv.created_at).toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric' });
                    return `<tr>
                      <td class="font-semibold" style="color:#fff">#INV-${inv.invoiceNum}</td>
                      <td>${inv.clientName || '—'}</td>
                      <td class="text-muted">${d}</td>
                      <td class="font-bold" style="color:var(--status-completed)">€${(inv.total || 0).toFixed(2)}</td>
                      <td><span class="inv-status-tag inv-status-${inv.status}">${inv.status}</span></td>
                    </tr>`;
                  }).join('')}
                </tbody>
              </table>
            </div>
          </div>` : ''}

        </div>
      </main>
    </div>`;

  initLayoutEvents();
  refreshIcons();
  renderLineItems();
  refreshPreview();
  initFormEvents();
}
