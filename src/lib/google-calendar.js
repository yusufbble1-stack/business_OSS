// ===== Google Calendar Integration =====
// Uses Google Calendar API v3 with OAuth2 for browser-side auth

const GOOGLE_CLIENT_ID = localStorage.getItem('asp_gcal_client_id') || '';
const SCOPES = 'https://www.googleapis.com/auth/calendar.events';
const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest';

let gapiLoaded = false;
let gisLoaded = false;
let tokenClient = null;
let accessToken = sessionStorage.getItem('asp_gcal_token') || null;
let tokenExpiry = parseInt(sessionStorage.getItem('asp_gcal_token_expiry') || '0');

// ===== STATE =====
export function isGCalConnected() {
  return !!accessToken && Date.now() < tokenExpiry;
}

export function getGCalStatus() {
  if (!GOOGLE_CLIENT_ID) return 'not_configured';
  if (isGCalConnected()) return 'connected';
  return 'disconnected';
}

// ===== LOAD GOOGLE API SCRIPTS =====
function loadScript(src) {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) { resolve(); return; }
    const s = document.createElement('script');
    s.src = src; s.async = true; s.defer = true;
    s.onload = resolve; s.onerror = reject;
    document.head.appendChild(s);
  });
}

async function ensureGapiLoaded() {
  if (gapiLoaded) return;
  await loadScript('https://apis.google.com/js/api.js');
  await new Promise((resolve) => {
    window.gapi.load('client', resolve);
  });
  await window.gapi.client.init({});
  await window.gapi.client.load(DISCOVERY_DOC);
  gapiLoaded = true;
}

async function ensureGisLoaded() {
  if (gisLoaded) return;
  await loadScript('https://accounts.google.com/gsi/client');
  gisLoaded = true;
}

// ===== AUTH =====
export async function connectGoogleCalendar(clientId) {
  // Save client ID
  if (clientId) {
    localStorage.setItem('asp_gcal_client_id', clientId);
  }
  const cid = clientId || GOOGLE_CLIENT_ID;
  if (!cid) throw new Error('Google Client ID not configured');

  await ensureGapiLoaded();
  await ensureGisLoaded();

  return new Promise((resolve, reject) => {
    tokenClient = window.google.accounts.oauth2.initTokenClient({
      client_id: cid,
      scope: SCOPES,
      callback: (response) => {
        if (response.error) {
          reject(new Error(response.error));
          return;
        }
        accessToken = response.access_token;
        tokenExpiry = Date.now() + (response.expires_in * 1000);
        sessionStorage.setItem('asp_gcal_token', accessToken);
        sessionStorage.setItem('asp_gcal_token_expiry', String(tokenExpiry));
        resolve(response);
      },
    });
    tokenClient.requestAccessToken({ prompt: 'consent' });
  });
}

export function disconnectGoogleCalendar() {
  if (accessToken && window.google?.accounts?.oauth2) {
    window.google.accounts.oauth2.revoke(accessToken);
  }
  accessToken = null;
  tokenExpiry = 0;
  sessionStorage.removeItem('asp_gcal_token');
  sessionStorage.removeItem('asp_gcal_token_expiry');
}

// ===== PRIORITY → COLOR MAP for Google Calendar =====
const GCAL_COLORS = {
  urgent: '11',  // Red (Tomato)
  high:   '5',   // Yellow (Banana)
  normal: '9',   // Blue (Blueberry)
  low:    '8',   // Grey (Graphite)
};

// ===== SYNC EVENTS TO GOOGLE CALENDAR =====
export async function syncEventsToGoogleCalendar(events) {
  if (!isGCalConnected()) throw new Error('Not connected to Google Calendar');

  await ensureGapiLoaded();
  window.gapi.client.setToken({ access_token: accessToken });

  const results = { created: 0, updated: 0, errors: 0 };

  // Get existing events to avoid duplicates (look for our custom tag)
  let existingEvents = [];
  try {
    const listRes = await window.gapi.client.calendar.events.list({
      calendarId: 'primary',
      q: 'ASPerformance',
      maxResults: 250,
      singleEvents: true,
    });
    existingEvents = listRes.result.items || [];
  } catch (e) {
    console.warn('Could not list existing events:', e);
  }

  for (const ev of events) {
    const eventId = `asp_${ev.id.replace(/[^a-z0-9]/gi, '')}`;
    const existing = existingEvents.find(e =>
      e.extendedProperties?.private?.aspId === ev.id
    );

    const gcalEvent = {
      summary: `🔧 ${ev.carName} — ${ev.title}`,
      description: [
        `Service: ${ev.service}`,
        `Status: ${ev.status}`,
        `Priority: ${ev.priority}`,
        `Customer: ${ev.customerName}`,
        ev.techName ? `Technician: ${ev.techName}` : '',
        ev.plate ? `Plate: ${ev.plate}` : '',
        ev.price ? `Price: €${ev.price}` : '',
        ev.description || '',
        '',
        '— ASPerformance Business OS',
      ].filter(Boolean).join('\n'),
      start: { date: ev.startDate },
      end: {
        // Google Calendar end date is exclusive, so add 1 day
        date: addDays(ev.finishDate, 1),
      },
      colorId: GCAL_COLORS[ev.priority] || GCAL_COLORS.normal,
      extendedProperties: {
        private: {
          aspId: ev.id,
          aspPriority: ev.priority,
          aspService: ev.service,
        },
      },
    };

    try {
      if (existing) {
        await window.gapi.client.calendar.events.update({
          calendarId: 'primary',
          eventId: existing.id,
          resource: gcalEvent,
        });
        results.updated++;
      } else {
        await window.gapi.client.calendar.events.insert({
          calendarId: 'primary',
          resource: gcalEvent,
        });
        results.created++;
      }
    } catch (e) {
      console.error('Failed to sync event:', ev.id, e);
      results.errors++;
    }
  }

  return results;
}

function addDays(dateStr, days) {
  const d = new Date(dateStr);
  d.setDate(d.getDate() + days);
  return d.toISOString().split('T')[0];
}

// ===== SAVE CONFIG =====
export function setGoogleClientId(clientId) {
  localStorage.setItem('asp_gcal_client_id', clientId);
}

export function getGoogleClientId() {
  return localStorage.getItem('asp_gcal_client_id') || '';
}
