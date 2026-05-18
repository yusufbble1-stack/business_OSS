import { renderSidebar, renderHeader, initLayoutEvents } from '../components/layout.js';
import { getCurrentUser, isAdmin, isTechnician } from '../lib/auth.js';
import { demoRequests, getProfileById, getVehicleById, demoProfiles, assignRequest, changeRequestStatus, sendMessage, getMessagesForRequest } from '../lib/store.js';
import { formatDateTime, SERVICE_LABELS, STATUS_LABELS, showToast } from '../lib/utils.js';
import { icon, refreshIcons } from '../lib/icons.js';
import { navigate } from '../lib/router.js';
import { avatarImg } from '../lib/avatars.js';

export function renderRequestDetail({ id }) {
  const app = document.getElementById('app');
  const user = getCurrentUser();
  const request = demoRequests.find(r => r.id === id);

  if (!request) {
    app.innerHTML = `<div class="app-layout">${renderSidebar()}<main class="app-main">${renderHeader()}<div class="page-content"><div class="empty-state" style="padding:80px 20px"><h3>Request not found</h3><p>This request doesn't exist or has been removed.</p><a href="#/requests" class="btn btn-primary" style="margin-top:16px">${icon('arrow-left', 16)} Back to Requests</a></div></div></main></div>`;
    initLayoutEvents(); return;
  }

  const customer = getProfileById(request.customer_id);
  const vehicle = getVehicleById(request.vehicle_id);
  const technician = request.assigned_to ? getProfileById(request.assigned_to) : null;
  const messages = getMessagesForRequest(id);
  const techs = demoProfiles.filter(p => p.role === 'technician' && p.is_active);
  const steps = ['pending','assigned','in_progress','completed','delivered'];
  const currentStep = steps.indexOf(request.status);

  let postFlashHtml = '';
  // Check for checklist: first per-request key, then legacy one-shot key
  const perRequestKey = `postFlashChecklist_${id}`;
  let storedChecklistStr = localStorage.getItem(perRequestKey);
  // Migrate from one-shot key if present
  const legacyStr = localStorage.getItem('postFlashChecklist');
  if (!storedChecklistStr && legacyStr) {
    storedChecklistStr = legacyStr;
    localStorage.setItem(perRequestKey, legacyStr);
    localStorage.removeItem('postFlashChecklist');
  }
  if (storedChecklistStr) {
    try {
      const cl = JSON.parse(storedChecklistStr);
      const svcList = (cl.services || '').toLowerCase();
      const hasPerf = ['stage 1','stage 2','stage 3','stage 4','motorsport'].some(s => svcList.includes(s));
      const hasE85 = svcList.includes('ethanol') || svcList.includes('flexfuel') || svcList.includes('e85');
      const hasPops = svcList.includes('pops') || svcList.includes('crackle') || svcList.includes('pop');

      postFlashHtml = `
        <div class="card animate-in" style="margin-bottom:20px; border:1px solid var(--status-completed); background:rgba(16,185,129,0.05)">
          <div class="card-header" style="border-bottom:1px solid rgba(16,185,129,0.2); cursor:pointer" onclick="this.parentElement.querySelector('.checklist-body').style.display = this.parentElement.querySelector('.checklist-body').style.display === 'none' ? 'block' : 'none'; this.querySelector('.chev').style.transform = this.parentElement.querySelector('.checklist-body').style.display === 'none' ? 'rotate(0deg)' : 'rotate(180deg)'">
            <h3 style="color:var(--status-completed); display:flex; align-items:center; gap:8px; margin:0">
              ${icon('clipboard-check', 18)} POST-FLASH WORKSHOP CHECKLIST — ${cl.vehicle}
              <span class="chev" style="margin-left:auto; transition:transform 0.2s">${icon('chevron-down', 16)}</span>
            </h3>
          </div>
          <div class="checklist-body" style="font-size:13px; color:#fff; line-height:1.7; padding-top:12px">
            <p style="margin:0 0 8px; color:var(--brand-muted); font-size:12px"><strong>Services applied: ${cl.services}</strong></p>

            <div style="background:rgba(59,130,246,0.06); border:1px solid rgba(59,130,246,0.15); border-radius:6px; padding:12px; margin-bottom:16px">
              <strong style="color:#93c5fd; font-size:12px">📋 BEFORE STARTING ENGINE (Pre-Flash Verification)</strong>
              <ol style="margin:8px 0 0 16px; padding:0; display:flex; flex-direction:column; gap:4px; font-size:12px; color:var(--brand-muted)">
                <li>Key ON / Engine OFF — full diagnostic scan</li>
                <li>Save ALL DTCs (active + stored) as screenshot</li>
                <li>Clear all DTCs once</li>
                <li>Check which faults return immediately — these are real existing faults</li>
              </ol>
            </div>

            <strong style="color:var(--status-completed); font-size:13px">✅ AFTER WRITING THE MODIFIED FILE:</strong>
            <ol style="margin:8px 0 0 20px; padding:0; display:flex; flex-direction:column; gap:6px">
              <li>Start the engine and let it idle for <strong>2–3 minutes</strong> minimum</li>
              <li>Connect diagnostic tool — read ALL fault codes</li>
              <li>Clear ALL fault codes (active + stored + pending)</li>
              <li>Turn ignition OFF, wait 30 seconds, turn ON again</li>
              <li>Read faults again — if new faults appear, <strong>note them immediately</strong></li>

              ${cl.dpf ? `<li style="color:#f59e0b"><strong>⚠️ DPF/FAP was modified:</strong><ul style="margin:4px 0 0 16px; list-style:disc">
                <li>Confirm P2002, P242F, P2463 codes are gone after clear</li>
                <li>Verify no regen attempts occur during test drive</li>
                <li>If physical DPF is removed: check for exhaust leaks</li>
                <li>If physical DPF is still present: it will fill up — <strong>must be removed</strong></li>
              </ul></li>` : ''}

              ${cl.adblue ? `<li style="color:#f59e0b"><strong>⚠️ AdBlue/SCR was modified:</strong><ul style="margin:4px 0 0 16px; list-style:disc">
                <li>Confirm P20E8, P20BA, P207F codes are gone after clear</li>
                <li>Verify AdBlue countdown timer is removed</li>
                <li>Check that "Start Not Possible In XXX km" message is gone</li>
                <li>If tank has fluid: no action needed. If empty: system must be bypassed</li>
              </ul></li>` : ''}

              ${cl.limp ? `<li style="color:#ef4444"><strong>🚨 Vehicle was in LIMP MODE:</strong><ul style="margin:4px 0 0 16px; list-style:disc">
                <li>After fault clear: confirm limp mode is lifted</li>
                <li>If limp persists after clear: turn OFF ignition for 2 minutes, then restart</li>
                <li>If still in limp: disconnect battery for 5 minutes as last resort</li>
                <li>Remaining limp = existing mechanical issue, NOT a file problem</li>
              </ul></li>` : ''}

              ${hasPerf ? `<li style="color:#3b82f6"><strong>🏎️ Performance tune applied:</strong><ul style="margin:4px 0 0 16px; list-style:disc">
                <li>Test drive: 3rd or 4th gear, steady 2000–3000 RPM for 30 seconds</li>
                <li>Then do a full-throttle pull from 2000 RPM to redline in 3rd gear</li>
                <li>Monitor boost pressure — should reach expected values without spikes</li>
                <li>Check for knock events or misfires in logs if possible</li>
                <li>Listen for unusual noises under load (turbo surge, detonation)</li>
              </ul></li>` : ''}

              ${hasE85 ? `<li style="color:#a855f7"><strong>⛽ E85/FlexFuel calibration:</strong><ul style="margin:4px 0 0 16px; list-style:disc">
                <li>Ensure tank has E85 or correct blend BEFORE test drive</li>
                <li>If switching from gasoline: run at least 30% E85 in tank</li>
                <li>Monitor fuel trims during first 50km — ECU is adapting</li>
              </ul></li>` : ''}

              ${hasPops ? `<li style="color:#f59e0b"><strong>💥 Pops & Bangs / Crackle:</strong><ul style="margin:4px 0 0 16px; list-style:disc">
                <li>Pops activate on deceleration (lift off throttle in gear)</li>
                <li>May take 5–10 minutes of driving for ECU to adapt</li>
                <li>Best results above 3000 RPM in sport mode or manual</li>
                <li>On diesel: results may be minimal — this is normal</li>
              </ul></li>` : ''}

              <li>Test drive 10–15 minutes in varied conditions</li>
              <li>Return — read faults one final time</li>
              <li><strong>If any new/unexpected fault remains → contact us with full fault list BEFORE claiming file issue</strong></li>
            </ol>

            <div style="margin-top:16px; padding:12px; background:rgba(0,0,0,0.3); border-radius:6px; border:1px solid rgba(255,255,255,0.06)">
              <p style="margin:0; font-size:12px; color:var(--brand-muted)">
                ⚠️ <strong>Important:</strong> Faults that were stored BEFORE flashing may reappear if the underlying mechanical issue exists. This is NOT a file problem.
                Any pre-existing fault (sensor failure, wiring issue, mechanical wear) must be fixed separately.
              </p>
            </div>
          </div>
        </div>
      `;
    } catch(e) {}
  }

  app.innerHTML = `
    <div class="app-layout">
      ${renderSidebar()}
      <main class="app-main">
        ${renderHeader()}
        <div class="page-content">
          <div class="page-header animate-in">
            <div style="display:flex;align-items:center;gap:16px;flex-wrap:wrap">
              <a href="#/requests" class="btn btn-ghost btn-icon">${icon('arrow-left', 20)}</a>
              <div>
                <h1 style="font-size:var(--text-2xl)">${request.title}</h1>
                <p style="margin-top:2px">ID: ${request.id}</p>
              </div>
            </div>
            <span class="badge badge-${request.status}" style="font-size:var(--text-xs);padding:6px 14px">${STATUS_LABELS[request.status]}</span>
          </div>

          ${postFlashHtml}

          <!-- Timeline -->
          <div class="card animate-in" style="animation-delay:0.05s;margin-bottom:20px;overflow-x:auto">
            <div style="display:flex;align-items:center;justify-content:space-between;position:relative;padding:0 20px;min-width:500px">
              <div style="position:absolute;top:50%;left:40px;right:40px;height:2px;background:rgba(255,255,255,0.06);z-index:0"></div>
              ${steps.map((s, i) => `
                <div style="display:flex;flex-direction:column;align-items:center;gap:8px;z-index:1">
                  <div style="width:36px;height:36px;border-radius:50%;display:flex;align-items:center;justify-content:center;
                    ${i <= currentStep ? 'background:linear-gradient(135deg,var(--brand-red),#8B0000);color:#fff;box-shadow:0 0 12px rgba(196,30,30,0.4)' : 'background:rgba(255,255,255,0.05);border:2px solid rgba(255,255,255,0.1);color:rgba(255,255,255,0.3)'}">
                    ${i < currentStep ? icon('check', 16) : `<span style="font-size:12px;font-weight:700">${i + 1}</span>`}
                  </div>
                  <span class="text-xs ${i <= currentStep ? 'font-semibold' : ''}" style="color:${i <= currentStep ? '#fff' : 'var(--brand-muted)'}">${STATUS_LABELS[s]}</span>
                </div>
              `).join('')}
            </div>
          </div>

          <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px">
            <div style="display:flex;flex-direction:column;gap:20px">
              <!-- Request Info -->
              <div class="card animate-in" style="animation-delay:0.1s">
                <div class="card-header"><h3>${icon('file-text', 18)} Request Info</h3></div>
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
                  <div><label>Service Type</label><p class="font-semibold" style="color:#fff">${SERVICE_LABELS[request.service_type]}</p></div>
                  <div><label>Priority</label><p style="color:var(--priority-${request.priority});font-weight:600;text-transform:uppercase">${request.priority}</p></div>
                  <div><label>Price</label><p class="font-semibold" style="color:#fff">${request.price ? `€${request.price}` : 'TBD'}</p></div>
                  <div><label>Payment</label><p style="color:${request.is_paid ? 'var(--status-completed)' : 'var(--status-pending)'};font-weight:600">${request.is_paid ? '✓ Paid' : '✕ Unpaid'}</p></div>
                </div>
                <div style="margin-top:16px"><label>Description</label><p style="color:#fff">${request.description || 'No description'}</p></div>
                <div style="margin-top:12px"><label>Created</label><p style="color:rgba(255,255,255,0.7)">${formatDateTime(request.created_at)}</p></div>
              </div>

              <!-- Vehicle -->
              <div class="card animate-in" style="animation-delay:0.15s">
                <div class="card-header"><h3>${icon('car', 18)} Vehicle</h3></div>
                ${vehicle ? `<div style="display:flex;align-items:center;gap:16px;flex-wrap:wrap">
                  <div style="width:48px;height:48px;border-radius:4px;background:linear-gradient(135deg,rgba(196,30,30,0.15),rgba(196,30,30,0.05));display:flex;align-items:center;justify-content:center;color:var(--brand-red-light);flex-shrink:0">${icon('car', 24)}</div>
                  <div><h4 style="color:#fff">${vehicle.make} ${vehicle.model}</h4><p class="text-sm" style="color:rgba(255,255,255,0.6)">${vehicle.year} · ECU: ${vehicle.ecu_type || 'N/A'} · ${vehicle.plate_number || ''}</p></div>
                </div>` : '<p class="text-muted">No vehicle linked</p>'}
              </div>

              <!-- ECU Verification Reminder -->
              <div class="card animate-in" style="animation-delay:0.17s; border-left:3px solid var(--brand-orange); background:rgba(255,165,0,0.03); padding:12px 16px">
                <div style="display:flex; gap:10px; align-items:flex-start">
                  <div style="color:var(--brand-orange); flex-shrink:0; margin-top:1px">${icon('alert-triangle', 16)}</div>
                  <div>
                    <p style="margin:0; font-size:12px; color:var(--brand-muted); line-height:1.5">
                      <strong style="color:var(--brand-orange)">ECU Accuracy Notice:</strong> The ECU reference shown above may <strong style="color:#fff">not match your real hardware ECU</strong>. Always verify using a <strong style="color:#fff">diagnostic scan</strong>, your <strong style="color:#fff">tool's "Get ID" function</strong>, or by <strong style="color:#fff">physically checking the ECU label</strong>. Sending wrong ECU info = incompatible file.
                    </p>
                  </div>
                </div>
              </div>

              ${isAdmin() ? `
              <div class="card animate-in" style="animation-delay:0.2s">
                <div class="card-header"><h3>${icon('user-check', 18)} Assignment & Status</h3></div>
                <div class="form-group">
                  <label>Assign Technician</label>
                  <select id="assign-tech">
                    <option value="">Unassigned</option>
                    ${techs.map(t => `<option value="${t.id}" ${request.assigned_to === t.id ? 'selected' : ''}>${t.full_name}</option>`).join('')}
                  </select>
                </div>
                <div class="form-group">
                  <label>Status</label>
                  <select id="change-status">
                    ${steps.map(s => `<option value="${s}" ${request.status === s ? 'selected' : ''}>${STATUS_LABELS[s]}</option>`).join('')}
                    <option value="cancelled" ${request.status === 'cancelled' ? 'selected' : ''}>Cancelled</option>
                  </select>
                </div>
                <div class="form-row">
                  <div class="form-group">
                    <label>Price (€)</label>
                    <input type="number" id="req-price" value="${request.price || ''}" placeholder="0"/>
                  </div>
                  <div class="form-group">
                    <label>Payment</label>
                    <select id="req-paid">
                      <option value="false" ${!request.is_paid ? 'selected' : ''}>Unpaid</option>
                      <option value="true" ${request.is_paid ? 'selected' : ''}>Paid</option>
                    </select>
                  </div>
                </div>
                <button class="btn btn-primary" id="btn-save-request">${icon('save', 16)} Save Changes</button>
              </div>` : ''}

              ${isTechnician() ? `
              <div class="card animate-in" style="animation-delay:0.2s">
                <div class="card-header"><h3>${icon('zap', 18)} Quick Actions</h3></div>
                <div class="flex gap-3 flex-wrap">
                  ${request.status === 'assigned' ? `<button class="btn btn-primary" id="btn-start-work">${icon('play', 16)} Start Working</button>` : ''}
                  ${request.status === 'in_progress' ? `<button class="btn btn-primary" id="btn-complete">${icon('check-circle', 16)} Mark Complete</button>` : ''}
                </div>
              </div>` : ''}
            </div>

            <div style="display:flex;flex-direction:column;gap:20px">
              <!-- Customer -->
              <div class="card animate-in" style="animation-delay:0.1s">
                <div class="card-header"><h3>${icon('user', 18)} Customer</h3></div>
                <div style="display:flex;align-items:center;gap:12px">
                  ${avatarImg(customer?.full_name || 'Unknown', 40)}
                  <div><h4 style="color:#fff">${customer?.full_name || 'Unknown'}</h4><p class="text-sm" style="color:rgba(255,255,255,0.6)">${customer?.company_name || ''} · ${customer?.phone || ''}</p></div>
                </div>
              </div>

              <!-- Messages -->
              <div class="card animate-in" style="animation-delay:0.2s;display:flex;flex-direction:column;max-height:380px">
                <div class="card-header"><h3>${icon('message-circle', 18)} Messages</h3></div>
                <div style="flex:1;overflow-y:auto;display:flex;flex-direction:column;gap:12px;padding-right:6px" id="messages-list">
                  ${messages.length ? messages.map(m => {
                    const sender = getProfileById(m.sender_id);
                    const isMe = m.sender_id === user.id;
                    return `<div style="display:flex;gap:10px;${isMe ? 'flex-direction:row-reverse' : ''}">
                      ${avatarImg(sender?.full_name || 'Unknown', 30)}
                      <div style="background:${isMe ? 'linear-gradient(135deg,rgba(196,30,30,0.15),rgba(196,30,30,0.05))' : 'rgba(255,255,255,0.04)'};border:1px solid ${isMe ? 'rgba(196,30,30,0.2)' : 'rgba(255,255,255,0.06)'};padding:10px 14px;border-radius:4px;max-width:80%">
                        <p class="text-xs font-semibold" style="color:${isMe ? 'var(--brand-red-light)' : 'rgba(255,255,255,0.6)'};margin-bottom:4px">${sender?.full_name || 'Unknown'}</p>
                        <p style="font-size:var(--text-sm);color:#fff">${m.content}</p>
                      </div>
                    </div>`;
                  }).join('') : '<p class="text-muted text-center" style="padding:20px">No messages yet</p>'}
                </div>
                <div style="display:flex;gap:8px;margin-top:14px;padding-top:12px;border-top:1px solid rgba(255,255,255,0.06)">
                  <input type="text" id="msg-input" placeholder="Type a message..."/>
                  <button class="btn btn-primary" id="btn-send">${icon('send', 16)}</button>
                </div>
              </div>

              <!-- Files -->
              <div class="card animate-in" style="animation-delay:0.25s">
                <div class="card-header"><h3>${icon('folder', 18)} Files</h3></div>
                <div style="display:flex;flex-direction:column;gap:10px">
                  <div style="display:flex;align-items:center;justify-content:space-between;padding:12px 16px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);border-radius:4px">
                    <div class="flex items-center gap-3"><span style="color:var(--brand-muted)">${icon('file', 18)}</span><span class="text-sm" style="color:#fff">${request.original_file || 'Original ECU File'}</span></div>
                    <button class="btn btn-ghost btn-sm">${icon('download', 14)}</button>
                  </div>
                  ${request.acm_file ? `
                  <div style="display:flex;align-items:center;justify-content:space-between;padding:12px 16px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);border-radius:4px">
                    <div class="flex items-center gap-3"><span style="color:var(--brand-muted)">${icon('file', 18)}</span><span class="text-sm" style="color:#fff">${request.acm_file}</span></div>
                    <button class="btn btn-ghost btn-sm">${icon('download', 14)}</button>
                  </div>` : ''}
                  ${request.status === 'completed' || request.status === 'delivered' ? `
                  <div style="display:flex;align-items:center;justify-content:space-between;padding:12px 16px;background:linear-gradient(135deg,rgba(16,185,129,0.08),rgba(16,185,129,0.02));border:1px solid rgba(16,185,129,0.15);border-radius:4px">
                    <div class="flex items-center gap-3"><span style="color:var(--status-completed)">${icon('file-check', 18)}</span><span class="text-sm font-semibold" style="color:var(--status-completed)">Modified File (Ready)</span></div>
                    <button class="btn btn-primary btn-sm">${icon('download', 14)}</button>
                  </div>` : `
                  <div style="padding:14px;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.06);border-radius:4px;text-align:center">
                    <p class="text-sm text-muted">Modified file not yet available</p>
                  </div>`}
                  ${isTechnician() || isAdmin() ? `
                  <div id="file-drop-zone" style="border:2px dashed rgba(255,255,255,0.1);border-radius:4px;padding:28px;text-align:center;cursor:pointer;transition:all 0.2s var(--ease)">
                    <p class="text-sm text-muted">${icon('upload', 16)} Drop modified file here or click to upload</p>
                    <input type="file" id="file-upload" style="display:none" accept=".bin,.ori,.mod,.hex"/>
                  </div>` : ''}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>`;

  initLayoutEvents();
  bindRequestDetailEvents(request, user);
}

function bindRequestDetailEvents(request, user) {
  // Send message
  const sendBtn = document.getElementById('btn-send');
  const msgInput = document.getElementById('msg-input');
  if (sendBtn && msgInput) {
    const doSend = async () => {
      if (!msgInput.value.trim()) return;
      await sendMessage(request.id, user.id, msgInput.value.trim());
      showToast('Message sent', 'success');
      msgInput.value = '';
      renderRequestDetail({ id: request.id });
    };
    sendBtn.addEventListener('click', doSend);
    msgInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') doSend(); });
  }

  // Admin: Save changes
  document.getElementById('btn-save-request')?.addEventListener('click', async () => {
    const techId = document.getElementById('assign-tech')?.value || null;
    const status = document.getElementById('change-status')?.value;
    const price = parseFloat(document.getElementById('req-price')?.value) || null;
    const isPaid = document.getElementById('req-paid')?.value === 'true';

    if (techId && techId !== request.assigned_to) await assignRequest(request.id, techId, user.id);
    if (status !== request.status) await changeRequestStatus(request.id, status, user.id);
    request.price = price;
    request.is_paid = isPaid;
    request.updated_at = new Date().toISOString();

    showToast('Request updated successfully', 'success');
    setTimeout(() => renderRequestDetail({ id: request.id }), 500);
  });

  // Tech: Start work
  document.getElementById('btn-start-work')?.addEventListener('click', async () => {
    await changeRequestStatus(request.id, 'in_progress', user.id);
    showToast('Work started!', 'success');
    setTimeout(() => renderRequestDetail({ id: request.id }), 500);
  });

  // Tech: Complete
  document.getElementById('btn-complete')?.addEventListener('click', async () => {
    await changeRequestStatus(request.id, 'completed', user.id);
    showToast('Request marked as completed!', 'success');
    setTimeout(() => renderRequestDetail({ id: request.id }), 500);
  });

  // File upload zone
  const dropZone = document.getElementById('file-drop-zone');
  const fileInput = document.getElementById('file-upload');
  if (dropZone && fileInput) {
    dropZone.addEventListener('click', () => fileInput.click());
    dropZone.addEventListener('dragover', (e) => { e.preventDefault(); dropZone.style.borderColor = 'var(--brand-red)'; dropZone.style.background = 'rgba(196,30,30,0.05)'; });
    dropZone.addEventListener('dragleave', () => { dropZone.style.borderColor = 'rgba(255,255,255,0.1)'; dropZone.style.background = 'transparent'; });
    dropZone.addEventListener('drop', (e) => { e.preventDefault(); showToast(`File "${e.dataTransfer.files[0]?.name}" uploaded`, 'success'); dropZone.style.borderColor = 'var(--status-completed)'; });
    fileInput.addEventListener('change', () => { if (fileInput.files[0]) showToast(`File "${fileInput.files[0].name}" uploaded`, 'success'); });
  }
}
