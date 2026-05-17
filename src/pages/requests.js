import { renderSidebar, renderHeader, initLayoutEvents } from '../components/layout.js';
import { getCurrentUser, isAdmin, isCustomer, isTechnician } from '../lib/auth.js';
import { demoRequests, getProfileById } from '../lib/store.js';
import { timeAgo, STATUS_LABELS } from '../lib/utils.js';
import { icon, refreshIcons } from '../lib/icons.js';

function parseDescription(desc) {
  if (!desc) return {};
  const data = {};
  const lines = desc.split('\\n');
  lines.forEach(line => {
    const p = line.trim().split(': ');
    if (p.length >= 2) {
      data[p[0]] = p.slice(1).join(': ');
    }
  });
  return data;
}

function computeFlags(req, parsed) {
  const flags = [];
  const services = req.service_type || '';
  
  if (parsed.DTCs) {
    const hasDtc = parsed.DTCs.toLowerCase() !== 'none' && parsed.DTCs.trim().length > 0;
    const needsDtc = services.includes('DPF OFF') || services.includes('AdBlue OFF');
    if (needsDtc && !hasDtc) {
      flags.push('No DTCs provided for Emission OFF');
    }
    if (parsed.Limp === 'Yes' && !hasDtc) {
      flags.push('Limp mode active but no DTCs');
    }
  }

  if (parsed.Tool) {
    if (parsed.Tool.includes('Virtual')) flags.push('Virtual read detected');
    if (parsed.Tool.includes('KT200') || parsed.Tool.includes('MPPS')) flags.push('Clone tool used');
  }

  if (parsed.Vehicle && parsed.Vehicle.includes('Truck')) {
    // Currently we don't store ACM file status strictly in db, but we can flag missing if we had it
    // flags.push('Check ACM file');
  }

  return flags;
}

export function renderRequestsPage() {
  const app = document.getElementById('app');
  const user = getCurrentUser();

  let requests = [...demoRequests];
  if (isCustomer()) requests = requests.filter(r => r.customer_id === user.id);
  else if (isTechnician()) requests = requests.filter(r => r.assigned_to === user.id);
  requests.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  app.innerHTML = `
    <div class="app-layout">
      ${renderSidebar()}
      <main class="app-main">
        ${renderHeader()}
        <div class="page-content">
          <div class="page-header animate-in">
            <div><h1>Orders Dashboard</h1><p>Manage and track ECU file requests</p></div>
            <div class="flex gap-3 flex-wrap">
              <select id="filter-status" style="width:auto;padding:8px 32px 8px 12px">
                <option value="">All Status</option>
                ${Object.entries(STATUS_LABELS).map(([k,v]) => `<option value="${k}">${v}</option>`).join('')}
              </select>
              ${isCustomer() || isAdmin() ? `<a href="#/requests/new" class="btn btn-primary">${icon('plus', 16)} New Order</a>` : ''}
            </div>
          </div>

          <div class="card animate-in" style="padding:0;overflow-x:auto">
            <table id="requests-table" style="min-width:1000px">
              <thead><tr>
                <th style="width:60px">ID</th>
                ${isAdmin() ? '<th>Customer</th>' : ''}
                <th>Vehicle & ECU</th>
                <th>Services</th>
                <th>Tool & Data</th>
                <th>Status / Turnaround</th>
                <th>Flags</th>
              </tr></thead>
              <tbody id="requests-tbody">${renderRequestRows(requests)}</tbody>
            </table>
            ${!requests.length ? '<div class="empty-state"><h3>No orders found</h3><p>No mapping orders to display.</p></div>' : ''}
          </div>
        </div>
      </main>
    </div>`;

  initLayoutEvents();

  document.getElementById('filter-status')?.addEventListener('change', (e) => {
    let filtered = [...demoRequests];
    if (isCustomer()) filtered = filtered.filter(r => r.customer_id === user.id);
    else if (isTechnician()) filtered = filtered.filter(r => r.assigned_to === user.id);
    if (e.target.value) filtered = filtered.filter(r => r.status === e.target.value);
    filtered.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    document.getElementById('requests-tbody').innerHTML = renderRequestRows(filtered);
    refreshIcons();
  });
}

function renderRequestRows(requests) {
  const admin = isAdmin();
  return requests.map(r => {
    const customer = getProfileById(r.customer_id);
    const parsed = parseDescription(r.description);
    const flags = computeFlags(r, parsed);
    
    const vehicleText = parsed.Vehicle || r.title || 'Unknown Vehicle';
    const ecuText = parsed.ECU || 'Unknown ECU';
    const toolText = parsed.Tool || 'Unknown Tool';
    const dtcText = parsed.DTCs || 'None';
    
    // Turnaround time logic (simple mock)
    const dt = new Date(r.created_at);
    const now = new Date();
    const diffHours = Math.floor((now - dt) / (1000 * 60 * 60));
    let tatClass = 'text-muted';
    if (r.status === 'pending' || r.status === 'in_progress') {
      if (diffHours > 2) tatClass = 'text-error'; // Delayed
      else if (diffHours > 1) tatClass = 'text-warning';
    }

    return `
      <tr style="cursor:pointer" onclick="window.location.hash='#/requests/${r.id}'">
        <td class="text-xs text-muted font-mono" style="padding-left:16px">${r.id.split('-')[0]}</td>
        ${admin ? `<td style="color:#fff" class="text-sm"><strong>${customer?.full_name || '—'}</strong></td>` : ''}
        <td>
          <div class="font-semibold" style="color:#fff; font-size:13px">${vehicleText}</div>
          <div class="text-xs text-muted" style="margin-top:2px">${ecuText}</div>
        </td>
        <td>
          <div style="display:flex; flex-wrap:wrap; gap:4px">
            ${(r.service_type || '').split(',').map(s => `<span class="badge" style="background:rgba(196,30,30,0.1); color:var(--brand-red-light); border:1px solid rgba(196,30,30,0.2); font-size:10px; padding:2px 6px">${s.trim()}</span>`).join('')}
          </div>
        </td>
        <td>
          <div class="text-xs" style="color:#fff">${toolText}</div>
          <div class="text-xs text-muted truncate" style="margin-top:2px; max-width:150px" title="${dtcText}">DTCs: ${dtcText}</div>
        </td>
        <td>
          <div style="margin-bottom:4px"><span class="badge badge-${r.status}">${STATUS_LABELS[r.status]}</span></div>
          <div class="text-xs ${tatClass}">${r.status === 'completed' || r.status === 'delivered' ? 'Finished' : `Waiting ${timeAgo(r.created_at)}`}</div>
        </td>
        <td>
          ${flags.length > 0 ? `
            <div style="display:flex; flex-direction:column; gap:4px">
              ${flags.map(f => `<span class="badge badge-error" style="font-size:9px; white-space:nowrap" title="${f}">${icon('flag', 10)} Flag</span>`).join('')}
            </div>
          ` : `<span class="text-xs" style="color:var(--status-completed)">OK</span>`}
        </td>
      </tr>`;
  }).join('');
}
