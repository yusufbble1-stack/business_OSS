import { renderSidebar, renderHeader, initLayoutEvents } from '../components/layout.js';
import { icon } from '../lib/icons.js';

const ecus = [
  { name: 'EDC17C46', brand: 'Bosch', vehicles: 'VW, Audi, Skoda, Seat 2.0 TDI', protocols: ['OBD', 'Boot', 'Bench'], tools: ['Autotuner', 'KessV3', 'CMD'], services: ['Stage 1', 'Stage 2', 'DPF OFF', 'EGR OFF', 'AdBlue OFF'], note: 'OBD read is virtual — ECU ref from OBD may NOT be the real hardware. Verify with diag or check ECU label physically.' },
  { name: 'MD1CS003', brand: 'Bosch', vehicles: 'Peugeot, Citroen, Ford 1.5 BlueHDi', protocols: ['Bench'], tools: ['Autotuner', 'BFlash', 'KessV3'], services: ['Stage 1', 'DPF OFF', 'AdBlue OFF'], note: 'Bench only. Newer versions might be locked.' },
  { name: 'SID208', brand: 'Continental', vehicles: 'Ford Transit, Peugeot Boxer 2.2', protocols: ['OBD', 'Boot'], tools: ['KessV3', 'CMD', 'Flex'], services: ['Stage 1', 'DPF OFF', 'EGR OFF'], note: 'OBD read available but Boot recommended for full backup.' },
  { name: 'DCM6.2V', brand: 'Delphi', vehicles: 'VW Crafter, Amarok 2.0 TDI', protocols: ['OBD', 'Bench'], tools: ['Autotuner', 'Foxflash', 'Flex'], services: ['Stage 1', 'DPF OFF', 'EGR OFF', 'AdBlue OFF'], note: 'Very common in light commercial vehicles.' },
  { name: 'Simos 18.1', brand: 'Continental', vehicles: 'VW Golf 7 GTI, Audi S3 2.0 TSI', protocols: ['OBD', 'Boot', 'Bench'], tools: ['Autotuner', 'BFlash', 'KessV3'], services: ['Stage 1', 'Stage 2', 'Pops & Bangs'], note: 'Excellent tuning potential.' },
  { name: 'EDC17CV41', brand: 'Bosch', vehicles: 'Iveco Stralis, Case IH (Agri)', protocols: ['OBD', 'Bench', 'Boot'], tools: ['K-TAG', 'Autotuner', 'Trasdata'], services: ['Stage 1', 'EGR OFF', 'DPF OFF', 'AdBlue OFF'], note: 'Heavy duty ECU. Often paired with DCU/ACM.' }
];

export function renderEcusPage() {
  const app = document.getElementById('app');

  app.innerHTML = `
    <div class="app-layout">
      ${renderSidebar()}
      <main class="app-main">
        ${renderHeader()}
        <div class="page-content">
          <div class="page-header animate-in">
            <div style="flex:1">
              <h1>Supported ECU Database</h1>
              <p>Reference guide for ECUs, supported services, and specific tuning notes.</p>
            </div>
            <div class="search-wrap">
              ${icon('search', 16)}
              <input type="text" id="ecu-search" placeholder="Search by ECU Ref or Vehicle..." class="input" style="padding-left:36px; width:260px">
            </div>
          </div>
          
          <div class="card animate-in" style="animation-delay:0.08s; border-left: 4px solid var(--brand-orange); background:rgba(255,165,0,0.04); padding:16px 20px">
            <div style="display:flex; gap:14px; align-items:flex-start">
              <div style="color:var(--brand-orange); flex-shrink:0; margin-top:2px">${icon('alert-triangle', 22)}</div>
              <div>
                <h4 style="margin:0 0 6px 0; color:var(--brand-orange); font-size:14px">⚠️ Data Accuracy Notice — ECU Reference May Differ</h4>
                <p style="margin:0 0 8px 0; font-size:13px; color:var(--brand-muted); line-height:1.6">
                  The ECU references listed below are <strong style="color:#fff">generic database entries</strong> and may <strong style="color:var(--brand-orange)">not match the real ECU hardware</strong> installed in your specific vehicle. The same car model can have different ECU variants depending on production date, market, or factory updates.
                </p>
                <div style="display:flex; flex-wrap:wrap; gap:8px; margin-top:10px">
                  <div class="badge" style="background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.1); padding:6px 12px; font-size:12px; display:flex; align-items:center; gap:6px">
                    ${icon('search', 14)} <strong>Option 1:</strong> Run a diagnostic scan (VCDS, Delphi, Launch, etc.)
                  </div>
                  <div class="badge" style="background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.1); padding:6px 12px; font-size:12px; display:flex; align-items:center; gap:6px">
                    ${icon('cpu', 14)} <strong>Option 2:</strong> Use your tool's "Get ID" / "Identification" function
                  </div>
                  <div class="badge" style="background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.1); padding:6px 12px; font-size:12px; display:flex; align-items:center; gap:6px">
                    ${icon('eye', 14)} <strong>Option 3:</strong> Physically check the ECU label on the hardware
                  </div>
                </div>
                <p style="margin:10px 0 0 0; font-size:12px; color:var(--brand-muted); opacity:0.8">
                  Always confirm the <strong style="color:#fff">exact ECU hardware reference</strong> before placing a file service order. Sending the wrong ECU info can lead to incompatible files.
                </p>
              </div>
            </div>
          </div>

          <div class="card p-0 animate-in" style="animation-delay:0.15s; overflow-x: auto;">
            <table class="table" id="ecu-table" style="min-width: 1000px;">
              <thead>
                <tr>
                  <th>ECU Ref</th>
                  <th>Brand</th>
                  <th>Vehicles</th>
                  <th>Protocols</th>
                  <th>Tools</th>
                  <th>Available Services</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                ${ecus.map(ecu => `
                  <tr class="ecu-row" data-search="${ecu.name.toLowerCase()} ${ecu.brand.toLowerCase()} ${ecu.vehicles.toLowerCase()}">
                    <td style="font-weight:600; font-family:monospace; color:var(--brand-red)">${ecu.name}</td>
                    <td>${ecu.brand}</td>
                    <td style="font-size:13px">${ecu.vehicles}</td>
                    <td>
                      <div style="display:flex; flex-wrap:wrap; gap:4px">
                        ${ecu.protocols.map(p => `<span class="badge" style="background:rgba(255,255,255,0.05)">${p}</span>`).join('')}
                      </div>
                    </td>
                    <td style="font-size:12px; color:var(--brand-muted)">${ecu.tools.join(', ')}</td>
                    <td style="font-size:12px">
                      ${ecu.services.slice(0,3).join(', ')}${ecu.services.length > 3 ? '...' : ''}
                    </td>
                    <td style="font-size:12px; color:var(--brand-muted); max-width: 200px;">${ecu.note}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  `;

  initLayoutEvents();

  // Search filter
  document.getElementById('ecu-search')?.addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase();
    document.querySelectorAll('.ecu-row').forEach(row => {
      if (row.dataset.search.includes(q)) {
        row.style.display = '';
      } else {
        row.style.display = 'none';
      }
    });
  });
}
