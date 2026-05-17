// ===== AS Performance Business OS — Data Store =====
// Full in-memory data store with CRUD operations for demo/testing
import { notifyAssignment, notifyStatusChange, notifyMessage } from './notifications.js';

function uid() { return 'id-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 7); }
function now() { return new Date().toISOString(); }

// ===== PROFILES =====
export const demoProfiles = [
  { id: 'admin-1', email: 'admin@asperformance.com', full_name: 'Yussuf Admin', role: 'admin', phone: '+33 6 00 00 00', company_name: 'AS Performance', is_active: true, created_at: '2025-01-01T10:00:00Z' },
  { id: 'tech-1', email: 'tech@asperformance.com', full_name: 'Alex Technician', role: 'technician', phone: '+33 6 11 11 11', company_name: '', is_active: true, created_at: '2025-02-15T10:00:00Z' },
  { id: 'tech-2', email: 'mehdi@asperformance.com', full_name: 'Mehdi Mapper', role: 'technician', phone: '+33 6 33 33 33', company_name: '', is_active: true, created_at: '2025-03-10T10:00:00Z' },
  { id: 'customer-1', email: 'client@asperformance.com', full_name: 'Jean Dupont', role: 'customer', company_name: 'SOS Reprog', phone: '+33 6 22 22 22', is_active: true, created_at: '2025-03-01T10:00:00Z' },
  { id: 'customer-2', email: 'paul@garage.fr', full_name: 'Paul Martin', role: 'customer', company_name: 'Garage Martin', phone: '+33 6 44 44 44', is_active: true, created_at: '2025-04-01T10:00:00Z' },
];

// ===== VEHICLES =====
export const demoVehicles = [
  { id: 'v1', customer_id: 'customer-1', make: 'Renault', model: 'Trafic III', year: 2019, ecu_type: 'Bosch EDC17C42', plate_number: 'AB-123-CD', created_at: '2025-03-05T10:00:00Z' },
  { id: 'v2', customer_id: 'customer-1', make: 'Peugeot', model: '308 GT', year: 2021, ecu_type: 'Continental SID208', plate_number: 'EF-456-GH', created_at: '2025-03-06T10:00:00Z' },
  { id: 'v3', customer_id: 'customer-2', make: 'BMW', model: '320d F30', year: 2018, ecu_type: 'Bosch EDC17C50', plate_number: 'IJ-789-KL', created_at: '2025-04-02T10:00:00Z' },
  { id: 'v4', customer_id: 'customer-2', make: 'Volkswagen', model: 'Golf 7 GTD', year: 2020, ecu_type: 'Bosch EDC17C74', plate_number: 'MN-012-OP', created_at: '2025-04-03T10:00:00Z' },
];

// ===== REQUESTS =====
export const demoRequests = [
  { id: 'req-1', customer_id: 'customer-1', vehicle_id: 'v1', assigned_to: 'tech-1', title: 'Stage 1 Remap - Trafic III', description: 'Full Stage 1 remap for the 2.0 dCi engine. Customer wants more torque for towing.', service_type: 'stage1', priority: 'high', status: 'in_progress', price: 280, is_paid: true, start_date: '2026-05-05', finish_date: '2026-05-09', created_at: '2025-05-01T09:00:00Z', updated_at: '2025-05-03T14:00:00Z' },
  { id: 'req-2', customer_id: 'customer-1', vehicle_id: 'v2', assigned_to: 'tech-1', title: 'DPF + EGR Delete - 308 GT', description: 'Remove DPF and EGR from the mapping. Physically already removed.', service_type: 'dpf_off', priority: 'normal', status: 'completed', price: 250, is_paid: true, start_date: '2026-05-01', finish_date: '2026-05-04', created_at: '2025-04-20T11:00:00Z', updated_at: '2025-05-02T16:00:00Z' },
  { id: 'req-3', customer_id: 'customer-2', vehicle_id: 'v3', assigned_to: 'tech-2', title: 'Stage 2 + AdBlue Off - 320d', description: 'Stage 2 with AdBlue removal. Customer has downpipe installed.', service_type: 'stage2', priority: 'urgent', status: 'assigned', price: 450, is_paid: false, start_date: '2026-05-08', finish_date: '2026-05-10', created_at: '2025-05-05T08:00:00Z', updated_at: '2025-05-05T09:00:00Z' },
  { id: 'req-4', customer_id: 'customer-2', vehicle_id: 'v4', assigned_to: null, title: 'EGR Off - Golf 7 GTD', description: 'EGR valve removal from map.', service_type: 'egr_off', priority: 'low', status: 'pending', price: null, is_paid: false, start_date: '2026-05-14', finish_date: '2026-05-16', created_at: '2025-05-07T15:00:00Z', updated_at: '2025-05-07T15:00:00Z' },
  { id: 'req-5', customer_id: 'customer-1', vehicle_id: 'v1', assigned_to: 'tech-1', title: 'DTC Off - Trafic III', description: 'Remove specific DTCs after hardware mods.', service_type: 'dtc_off', priority: 'normal', status: 'delivered', price: 100, is_paid: true, start_date: '2026-05-11', finish_date: '2026-05-13', created_at: '2025-04-10T10:00:00Z', updated_at: '2025-04-15T12:00:00Z' },
  { id: 'req-6', customer_id: 'customer-2', vehicle_id: 'v3', assigned_to: null, title: 'Custom Map - 320d Track', description: 'Custom aggressive track map with higher boost levels.', service_type: 'custom', priority: 'high', status: 'pending', price: null, is_paid: false, start_date: '2026-05-19', finish_date: '2026-05-23', created_at: '2025-05-08T08:00:00Z', updated_at: '2025-05-08T08:00:00Z' },
];

// ===== MESSAGES =====
export const demoMessages = [
  { id: 'msg-1', request_id: 'req-1', sender_id: 'customer-1', content: 'Hi, here\'s the original file from the Trafic. Let me know if you need the slave tool read.', created_at: '2025-05-01T09:30:00Z' },
  { id: 'msg-2', request_id: 'req-1', sender_id: 'tech-1', content: 'Got it! File looks clean. I\'ll have the Stage 1 ready by tomorrow morning.', created_at: '2025-05-01T10:15:00Z' },
  { id: 'msg-3', request_id: 'req-1', sender_id: 'customer-1', content: 'Perfect, thanks! Can you also check the injector correction values?', created_at: '2025-05-01T11:00:00Z' },
  { id: 'msg-4', request_id: 'req-2', sender_id: 'tech-1', content: 'DPF and EGR removal done. File is ready for download.', created_at: '2025-05-02T16:00:00Z' },
  { id: 'msg-5', request_id: 'req-3', sender_id: 'customer-2', content: 'Please prioritize this one, car is on the lift.', created_at: '2025-05-05T08:30:00Z' },
];

// ===== ACTIVITY LOG =====
export const demoActivity = [
  { id: 'act-1', user_id: 'admin-1', action: 'Created request', details: { title: 'Stage 1 Remap - Trafic III' }, created_at: '2025-05-01T09:00:00Z' },
  { id: 'act-2', user_id: 'admin-1', action: 'Assigned technician', details: { name: 'Alex Technician', to: 'req-1' }, created_at: '2025-05-01T09:05:00Z' },
  { id: 'act-3', user_id: 'tech-1', action: 'Started work', details: { title: 'Stage 1 Remap - Trafic III' }, created_at: '2025-05-01T10:00:00Z' },
  { id: 'act-4', user_id: 'tech-1', action: 'Completed request', details: { title: 'DPF + EGR Delete - 308 GT' }, created_at: '2025-05-02T16:00:00Z' },
  { id: 'act-5', user_id: 'customer-2', action: 'Submitted request', details: { title: 'Stage 2 + AdBlue Off - 320d' }, created_at: '2025-05-05T08:00:00Z' },
  { id: 'act-6', user_id: 'admin-1', action: 'Created user', details: { name: 'Paul Martin' }, created_at: '2025-04-01T10:00:00Z' },
  { id: 'act-7', user_id: 'customer-2', action: 'Submitted request', details: { title: 'Custom Map - 320d Track' }, created_at: '2025-05-08T08:00:00Z' },
];

// ===== LOOKUP HELPERS =====
export function getProfileById(id) { return demoProfiles.find(p => p.id === id) || null; }
export function getVehicleById(id) { return demoVehicles.find(v => v.id === id) || null; }
export function getRequestById(id) { return demoRequests.find(r => r.id === id) || null; }

// ===== CRUD: PROFILES =====
export function createProfile(data) {
  const profile = { id: uid(), ...data, is_active: true, created_at: now() };
  demoProfiles.push(profile);
  addActivity(data._actor || 'admin-1', 'Created user', { name: profile.full_name });
  return profile;
}
export function updateProfile(id, updates) {
  const p = getProfileById(id);
  if (!p) return null;
  Object.assign(p, updates);
  addActivity(updates._actor || 'admin-1', 'Updated user', { name: p.full_name });
  return p;
}
export function toggleProfileActive(id) {
  const p = getProfileById(id);
  if (!p) return null;
  p.is_active = !p.is_active;
  addActivity('admin-1', p.is_active ? 'Activated user' : 'Deactivated user', { name: p.full_name });
  return p;
}

// ===== CRUD: VEHICLES =====
export function createVehicle(data) {
  const vehicle = { id: uid(), ...data, created_at: now() };
  demoVehicles.push(vehicle);
  addActivity(data._actor || data.customer_id, 'Added vehicle', { name: `${vehicle.make} ${vehicle.model}` });
  return vehicle;
}
export function updateVehicle(id, updates) {
  const v = getVehicleById(id);
  if (!v) return null;
  Object.assign(v, updates);
  return v;
}

// ===== CRUD: REQUESTS =====
export function createRequest(data) {
  const req = {
    id: uid(), ...data,
    status: 'pending', assigned_to: null,
    is_paid: false, price: null,
    created_at: now(), updated_at: now(),
  };
  demoRequests.push(req);
  addActivity(data.customer_id || data._actor, 'Submitted request', { title: req.title });
  return req;
}
export function updateRequest(id, updates) {
  const r = getRequestById(id);
  if (!r) return null;
  const oldStatus = r.status;
  Object.assign(r, updates, { updated_at: now() });
  if (updates.status && updates.status !== oldStatus) {
    addActivity(updates._actor || 'admin-1', `Changed status to ${updates.status}`, { title: r.title });
  }
  if (updates.assigned_to && updates.assigned_to !== r.assigned_to) {
    const tech = getProfileById(updates.assigned_to);
    addActivity(updates._actor || 'admin-1', 'Assigned technician', { name: tech?.full_name, to: r.title });
  }
  return r;
}
export function assignRequest(reqId, techId, actorId = 'admin-1') {
  const r = getRequestById(reqId);
  if (!r) return null;
  r.assigned_to = techId;
  if (r.status === 'pending') r.status = 'assigned';
  r.updated_at = now();
  const tech = getProfileById(techId);
  addActivity(actorId, 'Assigned technician', { name: tech?.full_name || techId, to: r.title });
  // Notify the technician with priority info
  if (tech) {
    notifyAssignment(techId, tech.full_name, r.title, r.priority, r.id);
  }
  return r;
}
export function changeRequestStatus(reqId, newStatus, actorId = 'admin-1') {
  const r = getRequestById(reqId);
  if (!r) return null;
  r.status = newStatus;
  r.updated_at = now();
  addActivity(actorId, `Changed status to ${newStatus}`, { title: r.title });
  // Notify customer about status changes
  if (['completed', 'delivered', 'in_progress'].includes(newStatus) && r.customer_id) {
    notifyStatusChange(r.customer_id, r.title, newStatus, r.id);
  }
  // Notify assigned tech about status changes
  if (r.assigned_to && actorId !== r.assigned_to) {
    notifyStatusChange(r.assigned_to, r.title, newStatus, r.id);
  }
  return r;
}

// ===== CRUD: MESSAGES =====
export function sendMessage(requestId, senderId, content) {
  const msg = { id: uid(), request_id: requestId, sender_id: senderId, content, created_at: now() };
  demoMessages.push(msg);
  // Notify other participants in the request
  const request = getRequestById(requestId);
  const sender = getProfileById(senderId);
  if (request && sender) {
    const recipients = new Set([request.customer_id, request.assigned_to, 'admin-1'].filter(id => id && id !== senderId));
    recipients.forEach(recipientId => {
      notifyMessage(recipientId, sender.full_name, senderId, request.title, content, requestId);
    });
  }
  return msg;
}
export function getMessagesForRequest(requestId) {
  return demoMessages.filter(m => m.request_id === requestId).sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
}

// ===== ACTIVITY LOG =====
export function addActivity(userId, action, details = {}) {
  const entry = { id: uid(), user_id: userId, action, details, created_at: now() };
  demoActivity.unshift(entry);
  return entry;
}

// ===== STATS =====
export function getStats() {
  const total = demoRequests.length;
  const pending = demoRequests.filter(r => r.status === 'pending').length;
  const inProgress = demoRequests.filter(r => r.status === 'in_progress').length;
  const completed = demoRequests.filter(r => r.status === 'completed' || r.status === 'delivered').length;
  const revenue = demoRequests.filter(r => r.is_paid).reduce((s, r) => s + (r.price || 0), 0);
  const activeCustomers = demoProfiles.filter(p => p.role === 'customer' && p.is_active).length;
  const activeTechs = demoProfiles.filter(p => p.role === 'technician' && p.is_active).length;
  return { total, pending, inProgress, completed, revenue, activeCustomers, activeTechs };
}
