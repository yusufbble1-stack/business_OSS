import { renderSidebar, renderHeader, initLayoutEvents } from '../components/layout.js';
import { getCurrentUser, isAdmin, isTechnician, isCustomer } from '../lib/auth.js';
import { demoRequests, demoVehicles, demoProfiles, getProfileById, getVehicleById } from '../lib/store.js';
import { icon, refreshIcons } from '../lib/icons.js';
import { avatarImg } from '../lib/avatars.js';
import { showToast, showModal, SERVICE_LABELS, STATUS_LABELS } from '../lib/utils.js';
import {
  isGCalConnected, getGCalStatus, connectGoogleCalendar,
  disconnectGoogleCalendar, syncEventsToGoogleCalendar,
  getGoogleClientId, setGoogleClientId,
} from '../lib/google-calendar.js';

const WEEKDAYS = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
const MONTH_NAMES = ['January','February','March','April','May','June','July','August','September','October','November','December'];

// Priority-based colors
const PRIORITY_CHIP = {
  low:    { bg: 'rgba(107,114,128,0.15)', color: '#9CA3AF', border: '#6B7280', label: 'Low' },
  normal: { bg: 'rgba(59,130,246,0.15)',  color: '#60A5FA', border: '#3B82F6', label: 'Normal' },
  high:   { bg: 'rgba(245,158,11,0.15)',  color: '#FBBF24', border: '#F59E0B', label: 'High' },
  urgent: { bg: 'rgba(239,68,68,0.15)',   color: '#FF6B6B', border: '#EF4444', label: 'Urgent' },
};

let currentYear = 2026;
let currentMonth = 4; // May (0-indexed)
let currentView = 'month';
let upcomingSlide = 0;

// ===== BUILD CAR EVENTS FROM REQUESTS + VEHICLES =====
function buildCarEvents() {
  return demoRequests.map(req => {
    const vehicle = getVehicleById(req.vehicle_id);
    const customer = getProfileById(req.customer_id);
    const tech = req.assigned_to ? getProfileById(req.assigned_to) : null;
    return {
      id: req.id,
      vehicleId: req.vehicle_id,
      customerId: req.customer_id,
      assignedTo: req.assigned_to,
      carName: vehicle ? `${vehicle.make} ${vehicle.model}` : 'Unknown',
      plate: vehicle?.plate_number || '',
      year: vehicle?.year || '',
      ecu: vehicle?.ecu_type || '',
      title: req.title,
      service: req.service_type,
      status: req.status,
      priority: req.priority,
      price: req.price,
      customerName: customer?.full_name || '',
      techName: tech?.full_name || '',
      startDate: req.start_date,
      finishDate: req.finish_date,
      description: req.description,
    };
  });
}

// ===== ROLE-BASED FILTERING =====
function getVisibleCarEvents(user) {
  const events = buildCarEvents();
  if (isAdmin()) return events;
  if (isTechnician()) return events.filter(ev => ev.assignedTo === user.id);
  if (isCustomer()) return events.filter(ev => ev.customerId === user.id);
  return [];
}

// ===== CALENDAR UTILS =====
function getDaysInMonth(y, m) { return new Date(y, m + 1, 0).getDate(); }
function getFirstDayOfWeek(y, m) { const d = new Date(y, m, 1).getDay(); return d === 0 ? 6 : d - 1; }
function isToday(y, m, d) { const t = new Date(); return t.getFullYear() === y && t.getMonth() === m && t.getDate() === d; }

// Check if a date falls within [startDate, finishDate]
function dateInRange(dateStr, startDate, finishDate) {
  if (!startDate || !finishDate) return false;
  return dateStr >= startDate && dateStr <= finishDate;
}

function getEventsForDate(events, y, m, d) {
  const ds = `${y}-${String(m+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
  return events.filter(ev => dateInRange(ds, ev.startDate, ev.finishDate));
}

// Check if a date is the start, middle, or end of a range
function getDatePosition(dateStr, startDate, finishDate) {
  if (dateStr === startDate && dateStr === finishDate) return 'single';
  if (dateStr === startDate) return 'start';
  if (dateStr === finishDate) return 'end';
  return 'mid';
}

function fmtDate(d) {
  return new Date(d).toLocaleDateString('en-GB', { day:'numeric', month:'short' });
}

// ===== RENDER MONTH VIEW =====
function renderMonthGrid(events) {
  const dim = getDaysInMonth(currentYear, currentMonth);
  const first = getFirstDayOfWeek(currentYear, currentMonth);
  const prevDim = getDaysInMonth(currentMonth === 0 ? currentYear-1 : currentYear, currentMonth === 0 ? 11 : currentMonth-1);

  let h = `<div class="cal-grid"><div class="cal-weekdays">`;
  WEEKDAYS.forEach(d => { h += `<div class="cal-weekday">${d}</div>`; });
  h += `</div><div class="cal-days">`;

  for (let i = first - 1; i >= 0; i--)
    h += `<div class="cal-day other-month"><div class="cal-day-num">${prevDim - i}</div></div>`;

  for (let d = 1; d <= dim; d++) {
    const td = isToday(currentYear, currentMonth, d);
    const ds = `${currentYear}-${String(currentMonth+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
    const de = getEventsForDate(events, currentYear, currentMonth, d);

    h += `<div class="cal-day ${td?'today':''} ${de.length?'has-events':''}" data-date="${ds}">`;
    h += `<div class="cal-day-num">${d}</div><div class="cal-day-events">`;

    de.slice(0, 2).forEach(ev => {
      const pc = PRIORITY_CHIP[ev.priority] || PRIORITY_CHIP.normal;
      const pos = getDatePosition(ds, ev.startDate, ev.finishDate);
      const posIcon = pos === 'start' ? 'play' : pos === 'end' ? 'flag' : pos === 'single' ? 'car' : 'minus';
      const posLabel = pos === 'start' ? '▶' : pos === 'end' ? '◼' : '';

      h += `<div class="cal-event cal-event-${ev.priority}" data-evid="${ev.id}" style="background:${pc.bg};color:${pc.color};border-left:2px solid ${pc.border}" title="${ev.carName} · ${ev.title}\n${fmtDate(ev.startDate)} → ${fmtDate(ev.finishDate)}\nPriority: ${pc.label}">`;
      h += `${icon('car', 10)} ${ev.carName}`;
      h += `</div>`;
    });
    if (de.length > 2) h += `<div class="cal-event-more">+${de.length-2} more</div>`;
    h += `</div></div>`;
  }

  const total = first + dim;
  const rem = total % 7 === 0 ? 0 : 7 - (total % 7);
  for (let d = 1; d <= rem; d++)
    h += `<div class="cal-day other-month"><div class="cal-day-num">${d}</div></div>`;

  h += `</div></div>`;
  return h;
}

// ===== RENDER WEEK VIEW =====
function renderWeekGrid(events) {
  const now = new Date();
  const cur = new Date(currentYear, currentMonth, now.getDate());
  const dow = cur.getDay();
  const mon = new Date(cur); mon.setDate(cur.getDate() + (dow === 0 ? -6 : 1 - dow));
  const days = []; for (let i = 0; i < 7; i++) { const d = new Date(mon); d.setDate(mon.getDate()+i); days.push(d); }

  let h = `<div class="cal-week"><div class="cal-week-header"><div class="cal-week-corner"></div>`;
  days.forEach((d,i) => {
    const t = isToday(d.getFullYear(), d.getMonth(), d.getDate());
    h += `<div class="cal-week-day-header ${t?'today':''}"><div class="cal-week-day-name">${WEEKDAYS[i]}</div><div class="cal-week-day-date">${d.getDate()}</div></div>`;
  });
  h += `</div>`;

  [8,9,10,11,12,13,14,15,16,17,18].forEach(hr => {
    h += `<div class="cal-week-row"><div class="cal-week-time">${String(hr).padStart(2,'0')}:00</div>`;
    days.forEach(d => {
      const t = isToday(d.getFullYear(), d.getMonth(), d.getDate());
      const ds = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
      const de = getEventsForDate(events, currentYear, currentMonth, d.getDate());
      h += `<div class="cal-week-cell ${t?'today-col':''}">`;
      if (hr === 9) de.forEach(ev => {
        const pc = PRIORITY_CHIP[ev.priority] || PRIORITY_CHIP.normal;
        h += `<div class="cal-event" data-evid="${ev.id}" style="background:${pc.bg};color:${pc.color};border-left:2px solid ${pc.border};font-size:9px;margin-bottom:2px">${ev.carName}</div>`;
      });
      h += `</div>`;
    });
    h += `</div>`;
  });
  h += `</div>`;
  return h;
}

// ===== RENDER SLIDING UPCOMING PANEL =====
function renderUpcomingSlider(events) {
  const sorted = [...events].sort((a,b) => (a.startDate||'').localeCompare(b.startDate||''));
  if (!sorted.length) return '<div class="empty-state" style="padding:32px"><p>No cars scheduled</p></div>';

  const perSlide = 3;
  const totalSlides = Math.ceil(sorted.length / perSlide);
  if (upcomingSlide >= totalSlides) upcomingSlide = 0;
  const slideItems = sorted.slice(upcomingSlide * perSlide, (upcomingSlide + 1) * perSlide);

  let h = `<div class="cal-slider"><div class="cal-slider-track">`;
  slideItems.forEach((ev, i) => {
    const pc = PRIORITY_CHIP[ev.priority] || PRIORITY_CHIP.normal;
    h += `<div class="cal-slide-card animate-in" style="animation-delay:${i * 0.08}s" data-evid="${ev.id}">
      <div class="cal-slide-header">
        <div class="cal-slide-car-icon" style="background:${pc.bg};color:${pc.color}">${icon('car', 18)}</div>
        <div class="cal-slide-car-info">
          <div class="cal-slide-car-name">${ev.carName}</div>
          <div class="cal-slide-car-plate">${ev.plate} · ${ev.year}</div>
        </div>
        <div class="cal-slide-status" style="background:${pc.bg};color:${pc.color};border:1px solid ${pc.border}">${pc.label}</div>
      </div>
      <div class="cal-slide-body">
        <div class="cal-slide-row">${icon('wrench', 12)} <span>${SERVICE_LABELS[ev.service] || ev.service}</span></div>
        <div class="cal-slide-row">${icon('user', 12)} <span>${ev.customerName}</span></div>
        ${ev.techName ? `<div class="cal-slide-row">${icon('hard-hat', 12)} <span>${ev.techName}</span></div>` : ''}
        <div class="cal-slide-row">${icon('calendar', 12)} <span>${fmtDate(ev.startDate)} → ${fmtDate(ev.finishDate)}</span></div>
      </div>
    </div>`;
  });
  h += `</div>`;

  if (totalSlides > 1) {
    h += `<div class="cal-slider-controls">
      <button class="cal-slider-btn" id="slide-prev">${icon('chevron-left', 14)}</button>
      <div class="cal-slider-dots">${Array.from({length: totalSlides}, (_,i) =>
        `<div class="cal-slider-dot ${i === upcomingSlide ? 'active' : ''}" data-slide="${i}"></div>`
      ).join('')}</div>
      <button class="cal-slider-btn" id="slide-next">${icon('chevron-right', 14)}</button>
    </div>`;
  }
  h += `</div>`;
  return h;
}

// ===== RENDER LEGEND =====
function renderLegend() {
  return `<div class="cal-legend">${Object.entries(PRIORITY_CHIP).map(([key, val]) =>
    `<div class="cal-legend-item">
      <div class="cal-legend-dot" style="background:${val.border}"></div>
      <span>${val.label} Priority</span>
    </div>`
  ).join('')}</div>`;
}

// ===== SHOW CAR POPUP =====
function showCarPopup(evId) {
  const events = buildCarEvents();
  const ev = events.find(e => e.id === evId);
  if (!ev) return;
  const pc = PRIORITY_CHIP[ev.priority] || PRIORITY_CHIP.normal;

  document.getElementById('cal-popup')?.remove();
  document.getElementById('cal-backdrop')?.remove();

  const popup = document.createElement('div');
  popup.className = 'cal-popup';
  popup.id = 'cal-popup';
  popup.innerHTML = `
    <div class="cal-popup-header">
      <div class="cal-popup-title">${icon('car', 20)} ${ev.carName}</div>
      <button class="cal-popup-close" id="cal-popup-close">${icon('x', 16)}</button>
    </div>
    <div style="display:flex;gap:8px;margin-bottom:14px;flex-wrap:wrap">
      <div class="cal-popup-type" style="background:${pc.bg};color:${pc.color}">
        <span style="width:6px;height:6px;border-radius:50%;background:${pc.border}"></span>
        ${pc.label} Priority
      </div>
      <div class="cal-popup-type" style="background:rgba(255,255,255,0.06);color:var(--brand-silver)">
        ${STATUS_LABELS[ev.status]}
      </div>
    </div>
    <div class="cal-popup-row">${icon('hash', 16)} ${ev.plate || 'No plate'} · ${ev.year}</div>
    <div class="cal-popup-row">${icon('cpu', 16)} ECU: ${ev.ecu || 'N/A'}</div>
    <div class="cal-popup-row">${icon('wrench', 16)} ${SERVICE_LABELS[ev.service] || ev.service} — ${ev.title}</div>
    <div class="cal-popup-row">${icon('play', 16)} Start: <strong style="color:#fff;margin-left:4px">${fmtDate(ev.startDate)}</strong></div>
    <div class="cal-popup-row">${icon('flag', 16)} Finish: <strong style="color:#fff;margin-left:4px">${fmtDate(ev.finishDate)}</strong></div>
    <div class="cal-popup-row">${icon('user', 16)} Client: ${ev.customerName}</div>
    ${ev.techName ? `<div class="cal-popup-row">${icon('hard-hat', 16)} Tech: ${ev.techName}</div>` : ''}
    ${ev.price ? `<div class="cal-popup-row">${icon('euro', 16)} €${ev.price}</div>` : ''}
    ${ev.description ? `<div class="cal-popup-row">${icon('align-left', 16)} ${ev.description}</div>` : ''}
    <div class="cal-popup-row"><a href="#/requests/${ev.id}" class="btn btn-primary btn-sm" style="margin-top:4px">${icon('external-link', 14)} View Request</a></div>
  `;
  popup.style.cssText = 'top:50%;left:50%;transform:translate(-50%,-50%)';
  document.body.appendChild(popup);
  refreshIcons();

  const backdrop = document.createElement('div');
  backdrop.style.cssText = 'position:fixed;inset:0;z-index:340;background:rgba(0,0,0,0.4);backdrop-filter:blur(2px)';
  backdrop.id = 'cal-backdrop';
  document.body.insertBefore(backdrop, popup);

  const dismissPopup = () => { popup.remove(); backdrop.remove(); };

  popup.querySelector('#cal-popup-close').addEventListener('click', dismissPopup);
  backdrop.addEventListener('click', dismissPopup);

  // Auto-dismiss when clicking View Request link (navigates away)
  popup.querySelectorAll('a[href]').forEach(link => {
    link.addEventListener('click', () => { dismissPopup(); });
  });

  // Also dismiss on hash change (safety net)
  const onNav = () => { dismissPopup(); window.removeEventListener('hashchange', onNav); };
  window.addEventListener('hashchange', onNav);
}

// ===== MAIN RENDER =====
export function renderCalendarPage() {
  const app = document.getElementById('app');
  const user = getCurrentUser();
  const events = getVisibleCarEvents(user);

  const roleLabel = isAdmin() ? 'All Cars' : isTechnician() ? 'My Cars' : 'My Vehicles';
  const roleClass = isAdmin() ? 'admin' : isTechnician() ? 'technician' : 'customer';
  const roleDesc = isAdmin()
    ? 'All vehicles across all clients and technician assignments.'
    : isTechnician()
    ? 'Cars assigned to you for chiptuning work.'
    : 'Your vehicles and their service schedule.';

  app.innerHTML = `
    <div class="app-layout">
      ${renderSidebar()}
      <main class="app-main">
        ${renderHeader()}
        <div class="page-content">
          <div class="page-header animate-in">
            <div>
              <h1>${icon('calendar', 28)} Calendar</h1>
              <p>${roleDesc}</p>
            </div>
            <div class="flex gap-3 items-center flex-wrap">
              <span class="cal-role-badge ${roleClass}">${icon(isAdmin() ? 'shield' : isTechnician() ? 'wrench' : 'user', 14)} ${roleLabel}</span>
              ${renderGCalButton()}
            </div>
          </div>

          <div class="cal-controls animate-in" style="animation-delay:0.05s">
            <div class="cal-controls-left">
              <button class="cal-nav-btn" id="cal-prev">${icon('chevron-left', 16)}</button>
              <button class="cal-today-btn" id="cal-today">Today</button>
              <button class="cal-nav-btn" id="cal-next">${icon('chevron-right', 16)}</button>
              <span class="cal-month-title">${MONTH_NAMES[currentMonth]} ${currentYear}</span>
            </div>
            <div class="cal-controls-right">
              ${isGCalConnected() ? `<button class="cal-view-btn gcal-sync-btn" id="gcal-sync" title="Sync all events to Google Calendar">${icon('refresh-cw', 14)} Sync</button>` : ''}
              <button class="cal-view-btn ${currentView === 'month' ? 'active' : ''}" data-view="month">Month</button>
              <button class="cal-view-btn ${currentView === 'week' ? 'active' : ''}" data-view="week">Week</button>
            </div>
          </div>

          ${renderLegend()}

          <div class="cal-layout animate-in" style="animation-delay:0.1s">
            <div class="cal-main-area">
              ${currentView === 'month' ? renderMonthGrid(events) : renderWeekGrid(events)}
            </div>
            <div class="cal-sidebar-panel">
              <div class="card cal-upcoming-card">
                <div class="card-header"><h3>${icon('car', 18)} Upcoming Cars</h3></div>
                ${renderUpcomingSlider(events)}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>`;

  initLayoutEvents();
  bindCalendarEvents();
}

// ===== GOOGLE CALENDAR BUTTON =====
function renderGCalButton() {
  const status = getGCalStatus();
  if (status === 'connected') {
    return `<button class="gcal-badge connected" id="gcal-toggle" title="Connected to Google Calendar">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
      Google Calendar
    </button>`;
  }
  return `<button class="gcal-badge disconnected" id="gcal-toggle" title="Connect Google Calendar">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" stroke-width="2"/><path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" stroke-width="2"/></svg>
    ${status === 'not_configured' ? 'Setup Google Cal' : 'Connect Google Cal'}
  </button>`;
}

// ===== BIND EVENTS =====
function bindCalendarEvents() {
  document.getElementById('cal-prev')?.addEventListener('click', () => {
    currentMonth--; if (currentMonth < 0) { currentMonth = 11; currentYear--; }
    renderCalendarPage();
  });
  document.getElementById('cal-next')?.addEventListener('click', () => {
    currentMonth++; if (currentMonth > 11) { currentMonth = 0; currentYear++; }
    renderCalendarPage();
  });
  document.getElementById('cal-today')?.addEventListener('click', () => {
    const t = new Date(); currentYear = t.getFullYear(); currentMonth = t.getMonth();
    renderCalendarPage();
  });
  document.querySelectorAll('.cal-view-btn:not(.gcal-sync-btn)').forEach(btn => {
    if (btn.dataset.view) btn.addEventListener('click', () => { currentView = btn.dataset.view; renderCalendarPage(); });
  });
  document.querySelectorAll('.cal-event[data-evid], .cal-slide-card[data-evid]').forEach(el => {
    el.addEventListener('click', (e) => { e.stopPropagation(); showCarPopup(el.dataset.evid); });
  });
  // Slider controls
  document.getElementById('slide-prev')?.addEventListener('click', () => { upcomingSlide--; if (upcomingSlide < 0) upcomingSlide = 0; renderCalendarPage(); });
  document.getElementById('slide-next')?.addEventListener('click', () => { upcomingSlide++; renderCalendarPage(); });
  document.querySelectorAll('.cal-slider-dot').forEach(dot => {
    dot.addEventListener('click', () => { upcomingSlide = parseInt(dot.dataset.slide); renderCalendarPage(); });
  });

  // Google Calendar connect/disconnect
  document.getElementById('gcal-toggle')?.addEventListener('click', () => {
    if (isGCalConnected()) {
      showModal('Google Calendar', `
        <p style="color:#fff;margin-bottom:16px">You are connected to Google Calendar. All events are synced with priority-based colors.</p>
        <div style="display:flex;gap:8px;align-items:center;padding:12px;background:rgba(52,211,153,0.08);border:1px solid rgba(52,211,153,0.2);border-radius:8px">
          <span style="color:#34D399;font-weight:700">● Connected</span>
          <span class="text-sm text-muted">Events sync to your primary Google Calendar</span>
        </div>
      `, [{
        id: 'gcal-disconnect', label: 'Disconnect', class: 'btn-secondary',
        onClick: (_, close) => { disconnectGoogleCalendar(); close(); showToast('Google Calendar disconnected', 'info'); renderCalendarPage(); },
      }]);
    } else {
      const savedId = getGoogleClientId();
      showModal('Connect Google Calendar', `
        <p class="text-sm text-muted" style="margin-bottom:16px">Enter your Google Cloud OAuth Client ID to sync events. Get one from <a href="https://console.cloud.google.com/apis/credentials" target="_blank" style="color:var(--brand-red-light)">Google Cloud Console</a>.</p>
        <div class="form-group">
          <label>OAuth Client ID</label>
          <input type="text" id="gcal-client-id" value="${savedId}" placeholder="123456789.apps.googleusercontent.com" style="font-size:12px" />
        </div>
        <div class="gcal-setup-steps">
          <div class="gcal-setup-step">
            <span class="gcal-setup-num">1</span>
            <span>Create project in Google Cloud Console</span>
          </div>
          <div class="gcal-setup-step">
            <span class="gcal-setup-num">2</span>
            <span>Enable Google Calendar API</span>
          </div>
          <div class="gcal-setup-step">
            <span class="gcal-setup-num">3</span>
            <span>Create OAuth 2.0 Client ID (Web application)</span>
          </div>
          <div class="gcal-setup-step">
            <span class="gcal-setup-num">4</span>
            <span>Add <code style="color:var(--brand-red-light);font-size:11px">${window.location.origin}</code> as authorized origin</span>
          </div>
        </div>
      `, [{
        id: 'gcal-connect-btn', label: `${icon('check', 14)} Connect`, class: 'btn-primary',
        onClick: async (_, close) => {
          const clientId = document.getElementById('gcal-client-id')?.value?.trim();
          if (!clientId) { showToast('Client ID required', 'error'); return; }
          try {
            setGoogleClientId(clientId);
            await connectGoogleCalendar(clientId);
            showToast('✅ Google Calendar connected!', 'success');
            close();
            renderCalendarPage();
          } catch (e) {
            showToast(`Connection failed: ${e.message}`, 'error');
          }
        },
      }]);
    }
  });

  // Sync button
  document.getElementById('gcal-sync')?.addEventListener('click', async () => {
    const btn = document.getElementById('gcal-sync');
    if (!btn) return;
    btn.innerHTML = `${icon('loader', 14)} Syncing...`;
    btn.disabled = true;
    refreshIcons();
    try {
      const user = getCurrentUser();
      const events = getVisibleCarEvents(user);
      const result = await syncEventsToGoogleCalendar(events);
      showToast(`✅ Synced! ${result.created} created, ${result.updated} updated${result.errors ? `, ${result.errors} errors` : ''}`, 'success');
    } catch (e) {
      showToast(`Sync failed: ${e.message}`, 'error');
    }
    btn.innerHTML = `${icon('refresh-cw', 14)} Sync`;
    btn.disabled = false;
    refreshIcons();
  });
}
