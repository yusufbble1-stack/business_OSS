import { renderSidebar, renderHeader, initLayoutEvents } from '../components/layout.js';
import { getCurrentUser, isCustomer } from '../lib/auth.js';
import { createRequest } from '../lib/store.js';
import { showToast } from '../lib/utils.js';
import { navigate } from '../lib/router.js';
import { icon, refreshIcons } from '../lib/icons.js';
import { hasCredits, useCredit, getWallet } from '../lib/wallet.js';
import { SERVICES, SERVICE_CATEGORIES, getSortedCategories, getServicesByCategory, calculateTotalCredits, getWarningsForServices, requiresDTCs, getServiceById, getChecksumRecommendation } from '../lib/service-catalog.js';

function renderServiceCard(svc) {
  const creditColor = svc.credits >= 6 ? '#f59e0b' : svc.credits >= 3 ? 'var(--brand-red)' : '#22c55e';
  const isDpf = svc.id === 'dpf-off';
  const isAdblue = svc.id === 'adblue-off';
  return `<label class="svc-card tooltip-wrap" style="display:flex;align-items:flex-start;gap:10px;padding:10px 12px;border-radius:8px;border:1px solid rgba(255,255,255,0.06);background:rgba(255,255,255,0.02);cursor:pointer;transition:all 0.2s ease" data-svc-id="${svc.id}">
    <input type="checkbox" name="services" value="${svc.id}" class="service-cb ${svc.category === 'performance' ? 'stage-cb' : ''}" ${isDpf ? 'id="cb-dpf"' : ''} ${isAdblue ? 'id="cb-adblue"' : ''} style="margin-top:3px">
    <div style="flex:1;min-width:0">
      <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap">
        <span style="font-weight:600;font-size:13px;color:#fff">${svc.name}</span>
        <span style="font-size:11px;padding:2px 8px;border-radius:10px;background:${creditColor}20;color:${creditColor};font-weight:700">${svc.credits === 0 ? 'Quote' : svc.credits + ' cr'}</span>
        ${svc.is_advanced ? '<span style="font-size:10px;padding:2px 6px;border-radius:8px;background:rgba(168,85,247,0.15);color:#a855f7">ADV</span>' : ''}
      </div>
      <p style="margin:4px 0 0;font-size:11px;color:var(--brand-muted);line-height:1.4">${svc.description}</p>
      ${svc.beginner_tip ? `<div class="svc-tip" style="display:none;margin-top:6px;padding:6px 8px;border-radius:4px;background:rgba(59,130,246,0.08);border:1px solid rgba(59,130,246,0.15);font-size:11px;color:#93c5fd;line-height:1.4">💡 ${svc.beginner_tip}</div>` : ''}
    </div>
  </label>`;
}

export async function renderNewRequest() {
  const app = document.getElementById('app');
  const user = getCurrentUser();
  const wallet = await getWallet(user.id);
  
  // Extract pre-selected vehicle type from URL if any
  const urlParams = new URLSearchParams(window.location.hash.split('?')[1] || '');
  const preSelectedType = urlParams.get('type') || '';

  app.innerHTML = `
    <div class="app-layout">
      ${renderSidebar()}
      <main class="app-main">
        ${renderHeader()}
        <div class="page-content">
          <div class="page-header animate-in">
            <div style="display:flex;align-items:center;gap:16px;flex-wrap:wrap">
              <a href="#/requests" class="btn btn-ghost btn-icon">${icon('arrow-left', 20)}</a>
              <div style="flex:1">
                <h1>New ECU File Request</h1>
                <p>Guided order form. Please fill all fields carefully.</p>
              </div>
              <div class="badge badge-assigned" style="font-size:13px;padding:6px 12px">
                ${icon('credit-card', 14)} Balance: ${wallet.balance} Credits
              </div>
            </div>
          </div>

          <div class="wizard-glass-container animate-in" style="animation-delay:0.1s; max-width:850px; margin:0 auto; overflow:hidden">
            <!-- Progress Bar -->
            <div style="display:flex; background:rgba(0,0,0,0.6); border-bottom:1px solid rgba(255,255,255,0.05)">
              ${[1,2,3,4,5,6,7,8,9,10].map(step => `
                <div id="step-indicator-${step}" style="flex:1; height:4px; background:${step === 1 ? 'var(--brand-red)' : 'rgba(255,255,255,0.05)'}; transition:all 0.4s cubic-bezier(0.4, 0, 0.2, 1); box-shadow: ${step === 1 ? '0 0 10px rgba(196,30,30,0.5)' : 'none'}"></div>
              `).join('')}
            </div>

            <form id="ecu-wizard-form" style="padding:32px">
              
              <!-- STEP 1: Vehicle Information -->
              <div class="wizard-step" id="step-1">
                <h2 style="margin-top:0; margin-bottom:24px; color:var(--brand-red); display:flex; align-items:center; gap:8px">
                  <span style="display:inline-flex; align-items:center; justify-content:center; width:24px; height:24px; border-radius:12px; background:var(--brand-red); color:#fff; font-size:14px">1</span>
                  Vehicle Information
                </h2>
                
                <div class="form-row">
                  <div class="form-group">
                    <label>Vehicle Type *</label>
                    <select id="v-type" required>
                      <option value="">Select Type</option>
                      <option value="Car" ${preSelectedType === 'cars' ? 'selected' : ''}>Car / Passenger</option>
                      <option value="Truck" ${preSelectedType === 'trucks' ? 'selected' : ''}>Truck / HGV / Commercial</option>
                      <option value="Van" ${preSelectedType === 'vans' ? 'selected' : ''}>Van / LCV</option>
                      <option value="Agricultural" ${preSelectedType === 'agri' ? 'selected' : ''}>Agricultural / Tractor</option>
                      <option value="Marine" ${preSelectedType === 'marine' ? 'selected' : ''}>Marine / Boat</option>
                      <option value="Motorcycle" ${preSelectedType === 'moto' ? 'selected' : ''}>Motorcycle</option>
                      <option value="Construction" ${preSelectedType === 'construction' ? 'selected' : ''}>Construction Equipment</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label>Make (Brand) *</label>
                    <input type="text" id="v-make" placeholder="e.g. Volkswagen" required />
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group">
                    <label>Model *</label>
                    <input type="text" id="v-model" placeholder="e.g. Golf" required />
                  </div>
                  <div class="form-group">
                    <label>Year *</label>
                    <input type="number" id="v-year" placeholder="e.g. 2018" required />
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group">
                    <label>Engine & Fuel *</label>
                    <input type="text" id="v-engine" placeholder="e.g. 2.0 TDI Diesel" required />
                  </div>
                  <div class="form-group">
                    <label>Gearbox *</label>
                    <select id="v-gearbox" required>
                      <option value="">Select Gearbox</option>
                      <option value="Manual">Manual</option>
                      <option value="Automatic">Automatic (Torque Converter)</option>
                      <option value="DSG">DSG / Dual Clutch</option>
                      <option value="CVT">CVT</option>
                    </select>
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group">
                    <label>Power (OEM HP/kW) *</label>
                    <input type="text" id="v-power" placeholder="e.g. 150 HP" required />
                  </div>
                  <div class="form-group">
                    <label>Mileage</label>
                    <input type="text" id="v-mileage" placeholder="e.g. 120,000 km" />
                  </div>
                </div>
              </div>

              <!-- STEP 2: ECU Information -->
              <div class="wizard-step" id="step-2" style="display:none">
                <h2 style="margin-top:0; margin-bottom:24px; color:var(--brand-red); display:flex; align-items:center; gap:8px">
                  <span style="display:inline-flex; align-items:center; justify-content:center; width:24px; height:24px; border-radius:12px; background:var(--brand-red); color:#fff; font-size:14px">2</span>
                  ECU Information
                </h2>

                <div class="form-group">
                  <label>ECU Brand *</label>
                  <select id="ecu-brand" required>
                    <option value="">Select Brand</option>
                    <option value="Bosch">Bosch</option>
                    <option value="Continental">Continental</option>
                    <option value="Delphi">Delphi</option>
                    <option value="Siemens">Siemens</option>
                    <option value="Denso">Denso</option>
                    <option value="Marelli">Magneti Marelli</option>
                    <option value="Motorola">Motorola</option>
                    <option value="Valeo">Valeo</option>
                    <option value="Visteon">Visteon</option>
                    <option value="Hitachi">Hitachi</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                
                <div class="form-group">
                  <label>ECU Reference Number (Hardware Label) *</label>
                  <input type="text" id="ecu-ref" placeholder="e.g. EDC17C46, MD1CS003" required />
                </div>

                <div class="form-group">
                  <label>ECU Software Version (Optional)</label>
                  <input type="text" id="ecu-sw" placeholder="e.g. 1037521345" />
                </div>

                <div style="background:rgba(255,165,0,0.06); border:1px solid rgba(255,165,0,0.2); border-left:4px solid var(--brand-orange); border-radius:8px; padding:14px 16px; margin-top:16px">
                  <div style="display:flex; gap:12px; align-items:flex-start">
                    <div style="color:var(--brand-orange); flex-shrink:0; margin-top:1px">${icon('alert-triangle', 18)}</div>
                    <div>
                      <h4 style="margin:0 0 6px 0; color:var(--brand-orange); font-size:13px">⚠️ Important: Verify Your Real ECU Reference</h4>
                      <p style="margin:0; font-size:12px; color:var(--brand-muted); line-height:1.5">
                        Online databases and vehicle listings may <strong style="color:#fff">not reflect the actual ECU</strong> installed in your vehicle. The same model can have different ECU variants.
                      </p>
                      <p style="margin:8px 0 0 0; font-size:12px; color:var(--brand-muted); line-height:1.5">
                        <strong style="color:#fff">How to confirm:</strong>
                      </p>
                      <ul style="margin:4px 0 0 0; padding-left:16px; font-size:12px; color:var(--brand-muted); line-height:1.8">
                        <li>Run a <strong style="color:#fff">diagnostic scan</strong> (VCDS, Delphi, Launch, iCarsoft, etc.)</li>
                        <li>Use your <strong style="color:#fff">programming tool's "Get ID"</strong> / Identification function (Autotuner, KessV3, BFlash, etc.)</li>
                        <li><strong style="color:#fff">Physically inspect</strong> the ECU label on the hardware unit</li>
                      </ul>
                      <p style="margin:8px 0 0 0; font-size:11px; color:var(--brand-orange); opacity:0.9">
                        ❌ Sending wrong ECU info = incompatible file. Always double-check before ordering.
                      </p>
                    </div>
                  </div>
                </div>

                <!-- Truck Specific: ACM -->
                <div id="truck-acm-section" style="display:none; background:rgba(255,255,255,0.03); padding:16px; border-radius:8px; border:1px solid rgba(255,255,255,0.1); margin-top:16px">
                  <h4 style="margin:0 0 12px 0; display:flex; align-items:center; gap:8px">${icon('truck', 16)} Truck ACM Information (Pollution ECU)</h4>
                  <p style="font-size:12px; color:var(--brand-muted); margin-bottom:12px">Trucks have two separate ECUs. If modifying AdBlue/DPF, you must provide ACM details.</p>
                  
                  <div class="form-group">
                    <label>ACM Brand</label>
                    <input type="text" id="acm-brand" placeholder="e.g. Bosch" />
                  </div>
                  <div class="form-group">
                    <label>ACM Reference</label>
                    <input type="text" id="acm-ref" placeholder="e.g. DCU17HD01" />
                  </div>
                  <div class="form-group">
                    <label>Has ACM been reset before? *</label>
                    <select id="acm-reset">
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                      <option value="Unknown" selected>Unknown</option>
                    </select>
                  </div>
                </div>
              </div>

              <!-- STEP 3: Read Tool & Method -->
              <div class="wizard-step" id="step-3" style="display:none">
                <h2 style="margin-top:0; margin-bottom:24px; color:var(--brand-red); display:flex; align-items:center; gap:8px">
                  <span style="display:inline-flex; align-items:center; justify-content:center; width:24px; height:24px; border-radius:12px; background:var(--brand-red); color:#fff; font-size:14px">3</span>
                  Read Tool & Method
                </h2>

                <div class="form-group">
                  <label>Tool used to read the ECU *</label>
                  <select id="tool-used" required>
                    <option value="">Select Tool</option>
                    <option value="Autotuner">Autotuner</option>
                    <option value="KessV3">KessV3</option>
                    <option value="BFlash">BFlash</option>
                    <option value="AMT Flex">AMT Flex</option>
                    <option value="Dfox">Dfox</option>
                    <option value="CMD Flash">CMD Flash</option>
                    <option value="K-TAG">K-TAG (Alientech)</option>
                    <option value="Kess V2">Kess V2 (Alientech)</option>
                    <option value="Foxflash">Foxflash</option>
                    <option value="PCM Flash">PCM Flash</option>
                    <option value="KT200">KT200 (Clone Warning)</option>
                    <option value="MPPS">MPPS (Clone Warning)</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div id="clone-warning" class="card bg-warning-dim mb-4" style="display:none; border-left: 4px solid var(--brand-orange); padding:12px">
                  <div style="display:flex; gap:12px; align-items:flex-start">
                    <div style="color:var(--brand-orange)">${icon('alert-triangle', 20)}</div>
                    <div>
                      <h4 style="margin:0 0 4px 0; color:var(--brand-orange)">Clone Tool Detected</h4>
                      <p style="margin:0; font-size:12px; color:var(--brand-muted)">
                        This tool has known clone versions on the market. Clone tools may produce corrupted reads. If you experience issues with file compatibility, consider using an official tool. We cannot guarantee results from confirmed clone reads.
                      </p>
                    </div>
                  </div>
                </div>

                <div class="form-group">
                  <label>Read Method *</label>
                  <select id="read-method" required>
                    <option value="">Select Method</option>
                    <option value="OBD">OBD (via OBD port)</option>
                    <option value="Bench">FULL Bench Read</option>
                    <option value="Boot">Boot mode</option>
                    <option value="BDM">BDM</option>
                    <option value="JTAG">JTAG</option>
                    <option value="Tricore">Tricore</option>
                    <option value="Virtual">Virtual read (clone/emulated)</option>
                  </select>
                </div>

                <div id="virtual-warning" class="card bg-warning-dim mb-4" style="display:none; border-left: 4px solid var(--brand-orange); padding:12px">
                  <div style="display:flex; gap:12px; align-items:flex-start">
                    <div style="color:var(--brand-orange)">${icon('alert-triangle', 20)}</div>
                    <div>
                      <h4 style="margin:0 0 4px 0; color:var(--brand-orange)">Virtual Read</h4>
                      <p style="margin:0; font-size:12px; color:var(--brand-muted)">
                        Virtual reads are not real dumps from the ECU. We cannot guarantee file compatibility. If possible, provide a full bench or OBD read instead.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- STEP 4: Requested Services -->
              <div class="wizard-step" id="step-4" style="display:none">
                <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;flex-wrap:wrap;gap:8px">
                  <h2 style="margin:0; color:var(--brand-red); display:flex; align-items:center; gap:8px">
                    <span style="display:inline-flex; align-items:center; justify-content:center; width:24px; height:24px; border-radius:12px; background:var(--brand-red); color:#fff; font-size:14px">4</span>
                    Requested Services
                  </h2>
                  <div id="credit-counter" style="display:flex;align-items:center;gap:8px;padding:6px 14px;border-radius:8px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08)">
                    <span style="font-size:12px;color:var(--brand-muted)">Selected:</span>
                    <span id="credit-total" style="font-weight:700;color:var(--brand-red);font-size:14px">0 credits</span>
                  </div>
                </div>

                <!-- Beginner Mode Toggle -->
                <div style="display:flex;align-items:center;gap:8px;margin-bottom:16px">
                  <label style="display:flex;align-items:center;gap:6px;cursor:pointer;font-size:12px;color:var(--brand-muted)">
                    <input type="checkbox" id="beginner-mode"> ${icon('info', 14)} Show beginner tips for each service
                  </label>
                </div>

                <!-- Tab Switcher -->
                <div style="display:flex;gap:8px;margin-bottom:20px">
                  <button type="button" class="svc-tab active" data-tab="standard" style="padding:8px 16px;border-radius:8px;font-size:12px;font-weight:600;cursor:pointer;border:1px solid var(--brand-red);background:var(--brand-red);color:#fff;transition:all 0.2s ease">${icon('zap', 14)} Standard Services</button>
                  <button type="button" class="svc-tab" data-tab="advanced" style="padding:8px 16px;border-radius:8px;font-size:12px;font-weight:600;cursor:pointer;border:1px solid rgba(255,255,255,0.1);background:transparent;color:var(--brand-muted);transition:all 0.2s ease">${icon('cpu', 14)} Advanced / Custom</button>
                </div>

                <!-- Standard Tab -->
                <div id="tab-standard">
                  ${getSortedCategories().filter(c => c.tab === 'standard').map(cat => `
                    <div style="margin-bottom:20px">
                      <h3 style="font-size:13px;margin:0 0 10px;color:rgba(255,255,255,0.7);display:flex;align-items:center;gap:6px;border-bottom:1px solid rgba(255,255,255,0.06);padding-bottom:8px">${icon(cat.icon, 14)} ${cat.title}</h3>
                      <div style="display:flex;flex-direction:column;gap:6px">
                        ${getServicesByCategory(cat.id).map(svc => renderServiceCard(svc)).join('')}
                      </div>
                    </div>
                  `).join('')}
                </div>

                <!-- Advanced Tab -->
                <div id="tab-advanced" style="display:none">
                  ${getSortedCategories().filter(c => c.tab === 'advanced').map(cat => `
                    <div style="margin-bottom:20px">
                      <h3 style="font-size:13px;margin:0 0 10px;color:rgba(255,255,255,0.7);display:flex;align-items:center;gap:6px;border-bottom:1px solid rgba(255,255,255,0.06);padding-bottom:8px">${icon(cat.icon, 14)} ${cat.title}</h3>
                      <div style="display:flex;flex-direction:column;gap:6px">
                        ${getServicesByCategory(cat.id).map(svc => renderServiceCard(svc)).join('')}
                      </div>
                    </div>
                  `).join('')}

                  <!-- Custom Request Textarea -->
                  <div class="form-group" style="margin-top:16px">
                    <label>Custom Request Details (if applicable)</label>
                    <textarea id="custom-request-text" placeholder="Describe your specific need in detail: hardware specs, what you've tried, error messages, etc." style="height:80px"></textarea>
                  </div>
                </div>

                <!-- Dynamic Warnings Area -->
                <div id="service-warnings" style="display:none;margin-top:16px"></div>

                <!-- Stage Options (shown when performance service selected) -->
                <div id="stage-options" style="display:none; background:rgba(255,255,255,0.03); padding:16px; border-radius:8px; border:1px solid rgba(255,255,255,0.1); margin-top:16px">
                  <h4 style="margin:0 0 12px 0">Performance Settings</h4>
                  <div class="form-row">
                    <div class="form-group">
                      <label>Goal</label>
                      <select id="stage-goal">
                        <option value="Balanced">Balanced (Power + Economy)</option>
                        <option value="Full Power">Full Power / Track</option>
                        <option value="Economy">Economy (Fuel saving)</option>
                      </select>
                    </div>
                    <div class="form-group">
                      <label>Fuel Quality Available</label>
                      <select id="stage-fuel">
                        <option value="95 RON">95 RON</option>
                        <option value="98 RON" selected>98 RON</option>
                        <option value="100 RON">100 RON</option>
                        <option value="E10">E10</option>
                        <option value="E85">E85 (Flexfuel)</option>
                        <option value="Diesel">Diesel</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <!-- STEP 5: Vehicle Current State -->
              <div class="wizard-step" id="step-5" style="display:none">
                <h2 style="margin-top:0; margin-bottom:24px; color:var(--brand-red); display:flex; align-items:center; gap:8px">
                  <span style="display:inline-flex; align-items:center; justify-content:center; width:24px; height:24px; border-radius:12px; background:var(--brand-red); color:#fff; font-size:14px">5</span>
                  Vehicle Current State
                </h2>

                <div class="form-group">
                  <label class="tooltip-wrap" style="display:flex; align-items:center; gap:8px">
                    Is the car currently in limp mode? *
                    <div class="tooltip">${icon('info', 14)}<span class="tooltip-text">Limp mode limits engine power due to a fault. The modified file will NOT remove limp mode automatically. You must clear faults.</span></div>
                  </label>
                  <select id="limp-mode" required>
                    <option value="">Select Option</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                    <option value="Unknown">Unknown</option>
                  </select>
                </div>

                <div id="limp-warning" class="card bg-warning-dim mb-4" style="display:none; border-left: 4px solid var(--brand-orange); padding:12px">
                  <div style="display:flex; gap:12px; align-items:flex-start">
                    <div style="color:var(--brand-orange)">${icon('info', 20)}</div>
                    <div>
                      <p style="margin:0; font-size:12px; color:var(--brand-muted)">
                        Limp mode must be resolved before or after flash. The modified file alone will not clear limp mode. You must reset faults with your diagnostic tool after writing the file.
                      </p>
                    </div>
                  </div>
                </div>

                <div class="form-group">
                  <label>Current DTCs (Fault Codes) *</label>
                  <textarea id="dtcs" placeholder="Paste ALL active and stored faults. Example: P2002, P0401, U0001" style="height:80px"></textarea>
                  <p style="font-size:11px; color:var(--brand-muted); margin-top:4px">Even if you think the fault is unrelated, paste everything. This helps us modify the file correctly.</p>
                </div>

                <!-- Dynamic reset questions based on services -->
                <div id="dpf-reset-group" class="form-group" style="display:none">
                  <label>Has DPF/FAP regeneration been reset before reading? *</label>
                  <select id="dpf-reset">
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                    <option value="Not applicable">Not applicable</option>
                  </select>
                </div>
                <div id="dpf-warning" class="card bg-warning-dim mb-4" style="display:none; border-left: 4px solid var(--brand-orange); padding:12px">
                  <p style="margin:0; font-size:12px; color:var(--brand-muted)">
                    ⚠️ We recommend resetting DPF data and clearing faults before reading the ECU for best results.
                  </p>
                </div>

                <div id="adblue-reset-group" class="form-group" style="display:none">
                  <label>Has AdBlue/SCR system been reset before reading? *</label>
                  <select id="adblue-reset">
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                    <option value="Not applicable">Not applicable</option>
                  </select>
                </div>
                <div id="adblue-warning" class="card bg-warning-dim mb-4" style="display:none; border-left: 4px solid var(--brand-orange); padding:12px">
                  <p style="margin:0; font-size:12px; color:var(--brand-muted)">
                    ⚠️ We recommend resetting AdBlue data and clearing faults before reading the ECU for best results.
                  </p>
                </div>
              </div>

              <!-- STEP 6: Checksum -->
              <div class="wizard-step" id="step-6" style="display:none">
                <h2 style="margin-top:0; margin-bottom:24px; color:var(--brand-red); display:flex; align-items:center; gap:8px">
                  <span style="display:inline-flex; align-items:center; justify-content:center; width:24px; height:24px; border-radius:12px; background:var(--brand-red); color:#fff; font-size:14px">6</span>
                  Checksum Handling
                </h2>

                <div class="card" style="background:rgba(255,255,255,0.02); margin-bottom:16px">
                  <label class="tooltip-wrap" style="display:flex; align-items:flex-start; gap:12px; cursor:pointer">
                    <input type="radio" name="checksum" value="Tool Corrects Auto" checked style="margin-top:2px">
                    <div>
                      <strong style="display:block; margin-bottom:4px">My tool corrects checksum automatically during write (Recommended)</strong>
                      <span style="font-size:12px; color:var(--brand-muted)">Most modern tools (Autotuner, KessV3, Foxflash, etc.) handle checksum automatically during the write process. If unsure, select this — it is almost always correct.</span>
                    </div>
                  </label>
                </div>

                <div class="card" style="background:rgba(255,255,255,0.02)">
                  <label style="display:flex; align-items:flex-start; gap:12px; cursor:pointer">
                    <input type="radio" name="checksum" value="Manual Correction Needed" style="margin-top:2px">
                    <div>
                      <strong style="display:block; margin-bottom:4px">I need checksum corrected inside the modified file</strong>
                      <span style="font-size:12px; color:var(--brand-muted)">For older tools or manual writing methods where the tool does not calculate checksums.</span>
                    </div>
                  </label>
                </div>
              </div>

              <!-- STEP 7: File Upload -->
              <div class="wizard-step" id="step-7" style="display:none">
                <h2 style="margin-top:0; margin-bottom:24px; color:var(--brand-red); display:flex; align-items:center; gap:8px">
                  <span style="display:inline-flex; align-items:center; justify-content:center; width:24px; height:24px; border-radius:12px; background:var(--brand-red); color:#fff; font-size:14px">7</span>
                  File Upload
                </h2>

                <div class="form-group">
                  <label>Upload original (stock) read file *</label>
                  <div id="file-drop" style="border:2px dashed rgba(255,255,255,0.1);border-radius:4px;padding:36px;text-align:center;cursor:pointer;transition:all 0.2s var(--ease)">
                    <div style="color:var(--brand-muted);margin-bottom:8px">${icon('upload-cloud', 32)}</div>
                    <p class="text-sm" style="color:#fff">Drag & drop your original ECU file here</p>
                    <p class="text-xs text-muted" style="margin-top:4px">Max 50MB. .bin, .hex, .damos, .ori, .mod, .kp, .frf</p>
                    <p id="file-name" class="text-xs" style="color:var(--status-completed);margin-top:8px;display:none"></p>
                    <input type="file" id="req-file" style="display:none" accept=".bin,.hex,.damos,.ori,.mod,.kp,.frf" required />
                  </div>
                </div>

                <div id="acm-upload-group" class="form-group" style="display:none; margin-top:24px">
                  <label>Upload second ECU file (ACM/Truck) - Optional</label>
                  <div id="acm-file-drop" style="border:2px dashed rgba(255,255,255,0.1);border-radius:4px;padding:24px;text-align:center;cursor:pointer;transition:all 0.2s var(--ease); background:rgba(0,0,0,0.2)">
                    <p class="text-sm" style="color:#fff">Drag & drop ACM file here</p>
                    <p id="acm-file-name" class="text-xs" style="color:var(--status-completed);margin-top:8px;display:none"></p>
                    <input type="file" id="acm-file" style="display:none" accept=".bin,.hex,.damos,.ori,.mod,.kp,.frf" />
                  </div>
                </div>
              </div>

              <!-- STEP 8: Additional Notes -->
              <div class="wizard-step" id="step-8" style="display:none">
                <h2 style="margin-top:0; margin-bottom:24px; color:var(--brand-red); display:flex; align-items:center; gap:8px">
                  <span style="display:inline-flex; align-items:center; justify-content:center; width:24px; height:24px; border-radius:12px; background:var(--brand-red); color:#fff; font-size:14px">8</span>
                  Additional Notes
                </h2>

                <div class="form-group">
                  <label>Anything else we should know?</label>
                  <textarea id="notes" placeholder="e.g. Car has aftermarket downpipe. EGR already deleted mechanically. Customer wants economy tune, daily driver." style="height:120px"></textarea>
                </div>
              </div>

              <!-- STEP 9: Pre-Read Workshop Checklist -->
              <div class="wizard-step" id="step-9" style="display:none">
                <h2 style="margin-top:0; margin-bottom:16px; color:var(--brand-red); display:flex; align-items:center; gap:8px">
                  <span style="display:inline-flex; align-items:center; justify-content:center; width:24px; height:24px; border-radius:12px; background:var(--brand-red); color:#fff; font-size:14px">9</span>
                  Pre-Read Diagnostic Checklist
                </h2>
                <p style="font-size:12px; color:var(--brand-muted); margin-bottom:20px">Confirm you have followed the correct workshop procedure before submitting your file. This ensures we can deliver the best result and reduces rework.</p>

                <div style="display:flex; flex-direction:column; gap:10px">
                  <label class="precheck-item" style="display:flex; align-items:flex-start; gap:10px; padding:10px 12px; border-radius:8px; border:1px solid rgba(255,255,255,0.06); background:rgba(255,255,255,0.02); cursor:pointer; transition:all 0.2s ease">
                    <input type="checkbox" class="precheck-cb" style="margin-top:3px; accent-color:var(--brand-red)">
                    <div>
                      <strong style="font-size:12px; color:#fff">1. Full diagnostic scan completed</strong>
                      <p style="margin:2px 0 0; font-size:11px; color:var(--brand-muted)">Engine running at idle — saved ALL DTCs (active + stored) before reading the ECU file.</p>
                    </div>
                  </label>

                  <label class="precheck-item" style="display:flex; align-items:flex-start; gap:10px; padding:10px 12px; border-radius:8px; border:1px solid rgba(255,255,255,0.06); background:rgba(255,255,255,0.02); cursor:pointer; transition:all 0.2s ease">
                    <input type="checkbox" class="precheck-cb" style="margin-top:3px; accent-color:var(--brand-red)">
                    <div>
                      <strong style="font-size:12px; color:#fff">2. DTCs cleared and re-checked</strong>
                      <p style="margin:2px 0 0; font-size:11px; color:var(--brand-muted)">Cleared all faults once, then checked which faults return immediately — those are real existing faults.</p>
                    </div>
                  </label>

                  <label class="precheck-item" style="display:flex; align-items:flex-start; gap:10px; padding:10px 12px; border-radius:8px; border:1px solid rgba(255,255,255,0.06); background:rgba(255,255,255,0.02); cursor:pointer; transition:all 0.2s ease">
                    <input type="checkbox" class="precheck-cb" style="margin-top:3px; accent-color:var(--brand-red)">
                    <div>
                      <strong style="font-size:12px; color:#fff">3. ECU file is a clean original read</strong>
                      <p style="margin:2px 0 0; font-size:11px; color:var(--brand-muted)">The uploaded file is the original stock read — not previously modified, not corrupted, and not a partial read.</p>
                    </div>
                  </label>

                  <label class="precheck-item" id="precheck-dpf" style="display:none; align-items:flex-start; gap:10px; padding:10px 12px; border-radius:8px; border:1px solid rgba(245,158,11,0.2); background:rgba(245,158,11,0.04); cursor:pointer; transition:all 0.2s ease">
                    <input type="checkbox" class="precheck-cb" style="margin-top:3px; accent-color:#f59e0b">
                    <div>
                      <strong style="font-size:12px; color:#f59e0b">4. DPF regeneration reset before reading</strong>
                      <p style="margin:2px 0 0; font-size:11px; color:var(--brand-muted)">DPF soot level and regen data cleared via diagnostic tool before ECU read. This prevents stale data in the file.</p>
                    </div>
                  </label>

                  <label class="precheck-item" id="precheck-adblue" style="display:none; align-items:flex-start; gap:10px; padding:10px 12px; border-radius:8px; border:1px solid rgba(245,158,11,0.2); background:rgba(245,158,11,0.04); cursor:pointer; transition:all 0.2s ease">
                    <input type="checkbox" class="precheck-cb" style="margin-top:3px; accent-color:#f59e0b">
                    <div>
                      <strong style="font-size:12px; color:#f59e0b">5. AdBlue/SCR system reset before reading</strong>
                      <p style="margin:2px 0 0; font-size:11px; color:var(--brand-muted)">AdBlue countdown and dosing data cleared before ECU read. Prevents countdown from persisting after modification.</p>
                    </div>
                  </label>

                  <label class="precheck-item" id="precheck-perf" style="display:none; align-items:flex-start; gap:10px; padding:10px 12px; border-radius:8px; border:1px solid rgba(59,130,246,0.2); background:rgba(59,130,246,0.04); cursor:pointer; transition:all 0.2s ease">
                    <input type="checkbox" class="precheck-cb" style="margin-top:3px; accent-color:#3b82f6">
                    <div>
                      <strong style="font-size:12px; color:#93c5fd">6. Test drive and data log completed (recommended)</strong>
                      <p style="margin:2px 0 0; font-size:11px; color:var(--brand-muted)">For performance tunes: recorded logs in 3rd/4th gear, steady 2000-3000 RPM for 30 seconds. This helps us calibrate accurately.</p>
                    </div>
                  </label>

                  <label class="precheck-item" style="display:flex; align-items:flex-start; gap:10px; padding:10px 12px; border-radius:8px; border:1px solid rgba(255,255,255,0.06); background:rgba(255,255,255,0.02); cursor:pointer; transition:all 0.2s ease">
                    <input type="checkbox" class="precheck-cb" style="margin-top:3px; accent-color:var(--brand-red)">
                    <div>
                      <strong style="font-size:12px; color:#fff">7. ECU hardware verified</strong>
                      <p style="margin:2px 0 0; font-size:11px; color:var(--brand-muted)">Confirmed the real ECU hardware reference via diagnostic tool "Get ID" or physical label — not just from database lookup.</p>
                    </div>
                  </label>
                </div>

                <div id="precheck-status" style="margin-top:16px; padding:10px 12px; border-radius:6px; background:rgba(239,68,68,0.06); border:1px solid rgba(239,68,68,0.15); font-size:12px; color:#fca5a5">
                  ${icon('alert-circle', 14)} Please check all mandatory items above to proceed.
                </div>
              </div>

              <!-- STEP 10: Summary & Confirm -->
              <div class="wizard-step" id="step-10" style="display:none">
                <h2 style="margin-top:0; margin-bottom:24px; color:var(--brand-red); display:flex; align-items:center; gap:8px">
                  <span style="display:inline-flex; align-items:center; justify-content:center; width:24px; height:24px; border-radius:12px; background:var(--brand-red); color:#fff; font-size:14px">10</span>
                  Summary & Confirm
                </h2>

                <div class="card" style="background:rgba(255,255,255,0.02)">
                  <div id="summary-content" style="font-size:13px; line-height:1.6; color:var(--brand-muted)">
                    <!-- Populated by JS -->
                  </div>
                </div>

                <div class="card bg-warning-dim mb-4" style="border-left: 4px solid var(--brand-red); margin-top:24px; padding:12px">
                  <div style="display:flex; gap:12px; align-items:center">
                    <div style="color:var(--brand-red)">${icon('check-circle', 20)}</div>
                    <div>
                      <p style="margin:0; font-size:13px; color:#fff">
                        Submitting this order will consume <strong>1 Credit</strong> from your balance.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div style="display:flex;gap:12px;justify-content:space-between;margin-top:32px;border-top:1px solid var(--border);padding-top:24px">
                <button type="button" class="btn btn-secondary" id="btn-prev" style="display:none">${icon('arrow-left', 16)} Back</button>
                <div style="flex:1"></div>
                <button type="button" class="btn btn-primary" id="btn-next">Next ${icon('arrow-right', 16)}</button>
                <button type="submit" class="btn btn-primary" id="btn-submit" style="display:none">${icon('send', 16)} Confirm & Submit</button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>

    <style>
      .wizard-glass-container {
        background: linear-gradient(180deg, rgba(22, 22, 25, 0.8) 0%, rgba(12, 12, 14, 0.9) 100%);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 16px;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.02) inset;
        position: relative;
      }
      .wizard-glass-container::before {
        content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px;
        background: linear-gradient(90deg, transparent, rgba(196, 30, 30, 0.5), transparent);
      }
      .tooltip-wrap { position:relative; }
      .tooltip { display:inline-flex; align-items:center; color:var(--brand-muted); position:relative; }
      .tooltip .tooltip-text { 
        visibility:hidden; width:260px; background:linear-gradient(145deg, #1f1f22, #141416); color:#fff; 
        text-align:left; border-radius:8px; padding:12px 16px; position:absolute; z-index:10; 
        bottom:150%; left:50%; margin-left:-130px; opacity:0; transition:all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        border:1px solid rgba(196,30,30,0.3); font-size:12px; font-weight:normal;
        box-shadow: 0 10px 25px rgba(0,0,0,0.6), 0 0 15px rgba(196,30,30,0.1);
        transform: translateY(10px);
      }
      .tooltip .tooltip-text::after {
        content: ""; position: absolute; top: 100%; left: 50%; margin-left: -6px;
        border-width: 6px; border-style: solid; border-color: rgba(196,30,30,0.3) transparent transparent transparent;
      }
      .tooltip:hover .tooltip-text { visibility:visible; opacity:1; transform: translateY(0); }
      .wizard-step { animation: stepFadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; }
      @keyframes stepFadeIn { from { opacity: 0; transform: translateY(15px) scale(0.98); } to { opacity: 1; transform: translateY(0) scale(1); } }
      .form-group input, .form-group select, .form-group textarea {
        background: rgba(0,0,0,0.2); border: 1px solid rgba(255,255,255,0.06); transition: all 0.3s ease;
      }
      .form-group input:focus, .form-group select:focus, .form-group textarea:focus {
        background: rgba(0,0,0,0.4); border-color: rgba(196,30,30,0.5); box-shadow: 0 0 0 3px rgba(196,30,30,0.15);
      }
    </style>
  `;

  initLayoutEvents();

  // Wizard logic
  let currentStep = 1;
  const totalSteps = 10;
  
  const btnPrev = document.getElementById('btn-prev');
  const btnNext = document.getElementById('btn-next');
  const btnSubmit = document.getElementById('btn-submit');
  
  function updateWizard() {
    for(let i=1; i<=totalSteps; i++) {
      const stepEl = document.getElementById(`step-${i}`);
      if(stepEl) stepEl.style.display = i === currentStep ? 'block' : 'none';
      
      const indEl = document.getElementById(`step-indicator-${i}`);
      if(indEl) indEl.style.background = i <= currentStep ? 'var(--brand-red)' : 'rgba(255,255,255,0.1)';
    }

    btnPrev.style.display = currentStep > 1 ? 'flex' : 'none';
    
    if (currentStep === totalSteps) {
      btnNext.style.display = 'none';
      btnSubmit.style.display = 'flex';
      buildSummary();
    } else {
      btnNext.style.display = 'flex';
      btnSubmit.style.display = 'none';
    }

    // When entering Step 9, show/hide dynamic precheck items based on services
    if (currentStep === 9) {
      const selSvcs = Array.from(document.querySelectorAll('.service-cb:checked')).map(cb => cb.value);
      const dpfEl = document.getElementById('precheck-dpf');
      const adblueEl = document.getElementById('precheck-adblue');
      const perfEl = document.getElementById('precheck-perf');
      const perfIds = ['stage1','stage2','stage3','stage4','custom-dyno','motorsport','ethanol-flexfuel','rolling-antilag'];
      if (dpfEl) dpfEl.style.display = selSvcs.includes('dpf-off') ? 'flex' : 'none';
      if (adblueEl) adblueEl.style.display = selSvcs.includes('adblue-off') ? 'flex' : 'none';
      if (perfEl) perfEl.style.display = selSvcs.some(id => perfIds.includes(id)) ? 'flex' : 'none';
    }
  }

  function validateStep() {
    // Step 1
    if (currentStep === 1) {
      if (!document.getElementById('v-type').value || !document.getElementById('v-make').value || !document.getElementById('v-model').value || !document.getElementById('v-year').value || !document.getElementById('v-engine').value || !document.getElementById('v-gearbox').value || !document.getElementById('v-power').value) {
        showToast('Please fill all mandatory fields in Step 1.', 'error'); return false;
      }
    }
    // Step 2
    if (currentStep === 2) {
      if (!document.getElementById('ecu-brand').value || !document.getElementById('ecu-ref').value) {
        showToast('Please fill ECU Brand and Reference.', 'error'); return false;
      }
    }
    // Step 3
    if (currentStep === 3) {
      if (!document.getElementById('tool-used').value || !document.getElementById('read-method').value) {
        showToast('Please select Tool and Read Method.', 'error'); return false;
      }
    }
    // Step 4
    if (currentStep === 4) {
      const services = Array.from(document.querySelectorAll('.service-cb:checked')).map(cb => cb.value);
      if (services.length === 0) {
        showToast('Please select at least one service.', 'error'); return false;
      }
    }
    // Step 5
    if (currentStep === 5) {
      if (!document.getElementById('limp-mode').value) {
        showToast('Please answer the Limp Mode question.', 'error'); return false;
      }
      const dtcs = document.getElementById('dtcs').value.trim();
      const cbDpf = document.getElementById('cb-dpf').checked;
      const cbAdblue = document.getElementById('cb-adblue').checked;
      
      if ((cbDpf || cbAdblue) && !dtcs) {
        showToast('❌ You selected DPF OFF or AdBlue OFF but provided no DTCs. Please connect your diagnostic tool and paste all active and stored fault codes before ordering.', 'error');
        return false;
      }
    }
    // Step 7
    if (currentStep === 7) {
      if (!document.getElementById('req-file').files[0]) {
        showToast('❌ Original file is required. We cannot modify a file we haven\'t received.', 'error'); return false;
      }
    }
    // Step 9 - Pre-read checklist
    if (currentStep === 9) {
      // Show/hide dynamic precheck items based on selected services
      const selSvcs = Array.from(document.querySelectorAll('.service-cb:checked')).map(cb => cb.value);
      const hasDpfSvc = selSvcs.includes('dpf-off');
      const hasAdblueSvc = selSvcs.includes('adblue-off');
      const perfIds = ['stage1','stage2','stage3','stage4','custom-dyno','motorsport','ethanol-flexfuel','rolling-antilag'];
      const hasPerfSvc = selSvcs.some(id => perfIds.includes(id));
      const dpfEl = document.getElementById('precheck-dpf');
      const adblueEl = document.getElementById('precheck-adblue');
      const perfEl = document.getElementById('precheck-perf');
      if (dpfEl) dpfEl.style.display = hasDpfSvc ? 'flex' : 'none';
      if (adblueEl) adblueEl.style.display = hasAdblueSvc ? 'flex' : 'none';
      if (perfEl) perfEl.style.display = hasPerfSvc ? 'flex' : 'none';

      // Validate all VISIBLE checkboxes are checked
      const visibleChecks = Array.from(document.querySelectorAll('.precheck-item')).filter(el => el.style.display !== 'none');
      const allChecked = visibleChecks.every(item => item.querySelector('.precheck-cb')?.checked);
      const statusEl = document.getElementById('precheck-status');
      if (!allChecked) {
        if (statusEl) { statusEl.style.display = 'block'; statusEl.style.background = 'rgba(239,68,68,0.06)'; statusEl.style.borderColor = 'rgba(239,68,68,0.15)'; statusEl.style.color = '#fca5a5'; statusEl.innerHTML = `${icon('alert-circle', 14)} Please check all mandatory items above to proceed.`; }
        showToast('Please confirm all checklist items before proceeding.', 'error');
        return false;
      } else {
        if (statusEl) { statusEl.style.background = 'rgba(16,185,129,0.06)'; statusEl.style.borderColor = 'rgba(16,185,129,0.15)'; statusEl.style.color = '#6ee7b7'; statusEl.innerHTML = `${icon('check-circle', 14)} All items confirmed. You may proceed.`; }
      }
    }
    return true;
  }

  btnNext.addEventListener('click', () => {
    if (validateStep() && currentStep < totalSteps) {
      currentStep++;
      updateWizard();
    }
  });

  btnPrev.addEventListener('click', () => {
    if (currentStep > 1) {
      currentStep--;
      updateWizard();
    }
  });

  // Dynamic Listeners
  document.getElementById('v-type').addEventListener('change', (e) => {
    const isTruck = e.target.value === 'Truck';
    document.getElementById('truck-acm-section').style.display = isTruck ? 'block' : 'none';
    document.getElementById('acm-upload-group').style.display = isTruck ? 'block' : 'none';
  });

  document.getElementById('tool-used').addEventListener('change', (e) => {
    const val = e.target.value;
    const isClone = val === 'KT200' || val === 'MPPS';
    document.getElementById('clone-warning').style.display = isClone ? 'block' : 'none';
  });

  document.getElementById('read-method').addEventListener('change', (e) => {
    document.getElementById('virtual-warning').style.display = e.target.value === 'Virtual' ? 'block' : 'none';
  });

  // Service Tab Switcher
  document.querySelectorAll('.svc-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.svc-tab').forEach(t => { t.style.background = 'transparent'; t.style.borderColor = 'rgba(255,255,255,0.1)'; t.style.color = 'var(--brand-muted)'; t.classList.remove('active'); });
      tab.classList.add('active'); tab.style.background = 'var(--brand-red)'; tab.style.borderColor = 'var(--brand-red)'; tab.style.color = '#fff';
      document.getElementById('tab-standard').style.display = tab.dataset.tab === 'standard' ? 'block' : 'none';
      document.getElementById('tab-advanced').style.display = tab.dataset.tab === 'advanced' ? 'block' : 'none';
    });
  });

  // Beginner Mode Toggle
  document.getElementById('beginner-mode')?.addEventListener('change', (e) => {
    document.querySelectorAll('.svc-tip').forEach(tip => { tip.style.display = e.target.checked ? 'block' : 'none'; });
  });

  // Credit Counter + Warnings + Stage Options
  function updateServiceState() {
    const selected = Array.from(document.querySelectorAll('.service-cb:checked')).map(cb => cb.value);
    const totalCredits = calculateTotalCredits(selected);
    const el = document.getElementById('credit-total');
    if (el) {
      el.textContent = `${totalCredits} credit${totalCredits !== 1 ? 's' : ''}`;
      el.style.color = totalCredits > wallet.balance ? '#ef4444' : 'var(--brand-red)';
    }
    // Stage options
    const perfIds = ['stage1','stage2','stage3','stage4','custom-dyno','motorsport','ethanol-flexfuel'];
    const anyPerf = selected.some(id => perfIds.includes(id));
    const stageOpts = document.getElementById('stage-options');
    if (stageOpts) stageOpts.style.display = anyPerf ? 'block' : 'none';
    // Dynamic Warnings
    const warningsArea = document.getElementById('service-warnings');
    const warnings = getWarningsForServices(selected);
    if (warningsArea) {
      if (warnings.length > 0) {
        warningsArea.style.display = 'block';
        warningsArea.innerHTML = warnings.map(w => `
          <div style="background:rgba(255,165,0,0.06);border:1px solid rgba(255,165,0,0.15);border-left:3px solid var(--brand-orange);border-radius:6px;padding:10px 12px;margin-bottom:8px">
            <div style="display:flex;gap:8px;align-items:flex-start">
              <div style="color:var(--brand-orange);flex-shrink:0;margin-top:1px">${icon('alert-triangle', 14)}</div>
              <div><strong style="color:var(--brand-orange);font-size:12px">${w.service}:</strong>
                ${w.warnings.map(msg => `<p style="margin:4px 0 0;font-size:11px;color:var(--brand-muted);line-height:1.4">${msg}</p>`).join('')}
              </div>
            </div>
          </div>
        `).join('');
      } else {
        warningsArea.style.display = 'none';
        warningsArea.innerHTML = '';
      }
    }
    // Card visual highlight
    document.querySelectorAll('.svc-card').forEach(card => {
      const cb = card.querySelector('.service-cb');
      if (cb?.checked) { card.style.borderColor = 'rgba(196,30,30,0.4)'; card.style.background = 'rgba(196,30,30,0.06)'; }
      else { card.style.borderColor = 'rgba(255,255,255,0.06)'; card.style.background = 'rgba(255,255,255,0.02)'; }
    });
    refreshIcons();
  }
  document.querySelectorAll('.service-cb').forEach(cb => { cb.addEventListener('change', updateServiceState); });

  // Precheck checkbox visual feedback
  document.querySelectorAll('.precheck-cb').forEach(cb => {
    cb.addEventListener('change', () => {
      const item = cb.closest('.precheck-item');
      if (item) {
        if (cb.checked) { item.style.borderColor = 'rgba(16,185,129,0.3)'; item.style.background = 'rgba(16,185,129,0.06)'; }
        else { item.style.borderColor = 'rgba(255,255,255,0.06)'; item.style.background = 'rgba(255,255,255,0.02)'; }
      }
      // Update status message
      const visibleChecks = Array.from(document.querySelectorAll('.precheck-item')).filter(el => el.style.display !== 'none');
      const allChecked = visibleChecks.every(el => el.querySelector('.precheck-cb')?.checked);
      const statusEl = document.getElementById('precheck-status');
      if (statusEl) {
        if (allChecked) { statusEl.style.background = 'rgba(16,185,129,0.06)'; statusEl.style.borderColor = 'rgba(16,185,129,0.15)'; statusEl.style.color = '#6ee7b7'; statusEl.innerHTML = `${icon('check-circle', 14)} All items confirmed. You may proceed.`; }
        else { statusEl.style.background = 'rgba(239,68,68,0.06)'; statusEl.style.borderColor = 'rgba(239,68,68,0.15)'; statusEl.style.color = '#fca5a5'; statusEl.innerHTML = `${icon('alert-circle', 14)} Please check all mandatory items above to proceed.`; }
        refreshIcons();
      }
    });
  });

  document.getElementById('limp-mode').addEventListener('change', (e) => {
    document.getElementById('limp-warning').style.display = e.target.value === 'Yes' ? 'block' : 'none';
  });

  document.getElementById('cb-dpf').addEventListener('change', (e) => {
    document.getElementById('dpf-reset-group').style.display = e.target.checked ? 'block' : 'none';
  });
  document.getElementById('dpf-reset').addEventListener('change', (e) => {
    document.getElementById('dpf-warning').style.display = e.target.value === 'No' ? 'block' : 'none';
  });

  document.getElementById('cb-adblue').addEventListener('change', (e) => {
    document.getElementById('adblue-reset-group').style.display = e.target.checked ? 'block' : 'none';
  });
  document.getElementById('adblue-reset').addEventListener('change', (e) => {
    document.getElementById('adblue-warning').style.display = e.target.value === 'No' ? 'block' : 'none';
  });

  // File Drops
  const fileDrop = document.getElementById('file-drop');
  const fileInput = document.getElementById('req-file');
  const fileName = document.getElementById('file-name');
  fileDrop?.addEventListener('click', () => fileInput?.click());
  fileDrop?.addEventListener('dragover', (e) => { e.preventDefault(); fileDrop.style.borderColor = 'var(--brand-red)'; });
  fileDrop?.addEventListener('dragleave', () => { fileDrop.style.borderColor = 'rgba(255,255,255,0.1)'; });
  fileDrop?.addEventListener('drop', (e) => {
    e.preventDefault();
    if (e.dataTransfer.files[0]) { fileName.textContent = `✓ ${e.dataTransfer.files[0].name}`; fileName.style.display = 'block'; }
    fileDrop.style.borderColor = 'var(--status-completed)';
  });
  fileInput?.addEventListener('change', () => {
    if (fileInput.files[0]) { fileName.textContent = `✓ ${fileInput.files[0].name}`; fileName.style.display = 'block'; fileDrop.style.borderColor = 'var(--status-completed)'; }
  });

  const acmFileDrop = document.getElementById('acm-file-drop');
  const acmFileInput = document.getElementById('acm-file');
  const acmFileName = document.getElementById('acm-file-name');
  acmFileDrop?.addEventListener('click', () => acmFileInput?.click());
  acmFileInput?.addEventListener('change', () => {
    if (acmFileInput.files[0]) { acmFileName.textContent = `✓ ${acmFileInput.files[0].name}`; acmFileName.style.display = 'block'; acmFileDrop.style.borderColor = 'var(--status-completed)'; }
  });

  function buildSummary() {
    const s = document.getElementById('summary-content');
    const selectedIds = Array.from(document.querySelectorAll('.service-cb:checked')).map(cb => cb.value);
    const totalCredits = calculateTotalCredits(selectedIds);
    const serviceNames = selectedIds.map(id => { const svc = getServiceById(id); return svc ? `${svc.name} (${svc.credits}cr)` : id; }).join(', ');
    const isTruck = document.getElementById('v-type').value === 'Truck';

    s.innerHTML = `
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px">
        <div>
          <strong style="color:#fff">Vehicle:</strong><br/>
          ${document.getElementById('v-make').value} ${document.getElementById('v-model').value} ${document.getElementById('v-year').value}<br/>
          ${document.getElementById('v-engine').value} (${document.getElementById('v-power').value})<br/>
          Type: ${document.getElementById('v-type').value} | Gearbox: ${document.getElementById('v-gearbox').value}
        </div>
        <div>
          <strong style="color:#fff">ECU Info:</strong><br/>
          ${document.getElementById('ecu-brand').value} - ${document.getElementById('ecu-ref').value}<br/>
          SW: ${document.getElementById('ecu-sw').value || 'N/A'}<br/>
          Tool: ${document.getElementById('tool-used').value} (${document.getElementById('read-method').value})
        </div>
      </div>
      <hr style="border:0; border-top:1px solid rgba(255,255,255,0.1); margin:16px 0"/>
      <div>
        <strong style="color:#fff">Services Requested:</strong><br/>
        <span style="color:var(--brand-red); font-weight:bold">${serviceNames}</span>
      </div>
      <hr style="border:0; border-top:1px solid rgba(255,255,255,0.1); margin:16px 0"/>
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px">
        <div>
          <strong style="color:#fff">Vehicle State:</strong><br/>
          Limp Mode: ${document.getElementById('limp-mode').value}<br/>
          DTCs: ${document.getElementById('dtcs').value ? 'Provided' : 'None'}
        </div>
        <div>
          <strong style="color:#fff">Checksum:</strong><br/>
          ${document.querySelector('input[name="checksum"]:checked')?.value || 'Auto'}
        </div>
      </div>
      ${isTruck ? `
        <hr style="border:0; border-top:1px solid rgba(255,255,255,0.1); margin:16px 0"/>
        <div>
          <strong style="color:#fff">Truck ACM:</strong><br/>
          ${document.getElementById('acm-brand').value} ${document.getElementById('acm-ref').value} | Reset: ${document.getElementById('acm-reset').value}
        </div>
      ` : ''}
    `;

    // Update the credit confirm message
    const confirmArea = document.querySelector('#step-10 .card.bg-warning-dim');
    if (confirmArea) {
      const hasEnough = wallet.balance >= totalCredits;
      confirmArea.style.borderLeftColor = hasEnough ? 'var(--brand-red)' : '#ef4444';
      confirmArea.innerHTML = `
        <div style="display:flex; gap:12px; align-items:center">
          <div style="color:${hasEnough ? 'var(--brand-red)' : '#ef4444'}">${icon(hasEnough ? 'check-circle' : 'alert-triangle', 20)}</div>
          <div>
            <p style="margin:0; font-size:13px; color:#fff">
              ${hasEnough
                ? `Submitting this order will consume <strong>${totalCredits} Credit${totalCredits !== 1 ? 's' : ''}</strong> from your balance (${wallet.balance} available).`
                : `<strong style="color:#ef4444">Insufficient credits!</strong> This order requires <strong>${totalCredits} credits</strong> but you only have <strong>${wallet.balance}</strong>. <a href="#/credits" style="color:var(--brand-red);text-decoration:underline">Buy more credits</a>`
              }
            </p>
          </div>
        </div>
      `;
    }
  }

  // Submit Handler
  document.getElementById('ecu-wizard-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const selectedIds = Array.from(document.querySelectorAll('.service-cb:checked')).map(cb => cb.value);
    const totalCredits = calculateTotalCredits(selectedIds);
    
    if (!(await hasCredits(user.id, totalCredits))) {
      showToast(`Insufficient credits. You need ${totalCredits} but have ${wallet.balance}. Please purchase more.`, 'error');
      setTimeout(() => navigate('/credits'), 1500);
      return;
    }

    const serviceNames = selectedIds.map(id => { const svc = getServiceById(id); return svc ? svc.name : id; });
    const title = `${document.getElementById('v-make').value} ${document.getElementById('v-model').value} - ${serviceNames[0] || 'File Service'}`;
    const services = serviceNames.join(', ');

    const newReq = await createRequest({
      customer_id: user.id,
      vehicle_id: null,
      title: title,
      description: `
        Vehicle: ${document.getElementById('v-type').value} ${document.getElementById('v-make').value} ${document.getElementById('v-model').value}
        Engine: ${document.getElementById('v-engine').value} (${document.getElementById('v-power').value})
        ECU: ${document.getElementById('ecu-brand').value} ${document.getElementById('ecu-ref').value}
        Tool: ${document.getElementById('tool-used').value} (${document.getElementById('read-method').value})
        Limp: ${document.getElementById('limp-mode').value}
        DTCs: ${document.getElementById('dtcs').value}
        Notes: ${document.getElementById('notes').value}
        Custom: ${document.getElementById('custom-request-text')?.value || ''}
      `,
      service_type: services,
      priority: 'normal',
      _actor: user.id,
      original_file: document.getElementById('req-file').files[0]?.name || 'Original_ECU_Read.bin',
      acm_file: document.getElementById('acm-file')?.files[0]?.name || null
    });

    await useCredit(user.id, `${title} (${totalCredits} credits)`, newReq.id, totalCredits);

    showToast(`Order submitted! ${totalCredits} credit${totalCredits !== 1 ? 's' : ''} deducted. Generating post-flash checklist...`, 'success');
    
    const hasDpf = document.getElementById('cb-dpf')?.checked || false;
    const hasAdblue = document.getElementById('cb-adblue')?.checked || false;
    localStorage.setItem(`postFlashChecklist_${newReq.id}`, JSON.stringify({
      vehicle: `${document.getElementById('v-make').value} ${document.getElementById('v-model').value}`,
      services: services,
      dpf: hasDpf,
      adblue: hasAdblue,
      limp: document.getElementById('limp-mode').value === 'Yes'
    }));

    setTimeout(() => navigate(`/requests/${newReq.id}`), 1500);
  });
}
