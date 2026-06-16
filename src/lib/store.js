// ===== AS Performance Business OS — Data Store =====
// Connects to Supabase to manage all core data (Profiles, Vehicles, Requests)

import { supabase, isDemoMode } from './supabase.js';
import { notifyAssignment, notifyStatusChange, notifyMessage } from './notifications.js';

function now() { return new Date().toISOString(); }

// ===== IN-MEMORY CACHE (Populated by initStore) =====
export let demoProfiles = [];
export let demoVehicles = [];
export let demoRequests = [];
export let demoMessages = [];
export let demoActivity = [];

// Flag to track initialization
let isStoreInitialized = false;

// ===== INITIALIZE STORE FROM SUPABASE =====
export async function initStore(forceReload = false) {
  if (isDemoMode) throw new Error('Demo mode is disabled');
  if (isStoreInitialized && !forceReload) return;

  try {
    const [
      { data: profiles },
      { data: vehicles },
      { data: requests },
      { data: messages },
      { data: activity }
    ] = await Promise.all([
      supabase.from('profiles').select('*'),
      supabase.from('vehicles').select('*'),
      supabase.from('requests').select('*'),
      supabase.from('messages').select('*').order('created_at', { ascending: true }),
      supabase.from('activity_log').select('*').order('created_at', { ascending: false })
    ]);

    demoProfiles = profiles || [];
    demoVehicles = vehicles || [];
    demoRequests = requests || [];
    demoMessages = messages || [];
    demoActivity = activity || [];

    isStoreInitialized = true;
  } catch (err) {
    console.error('[Store] Initialization failed:', err);
  }
}

// ===== LOOKUP HELPERS =====
export function getProfileById(id) { return demoProfiles.find(p => p.id === id) || null; }
export function getVehicleById(id) { return demoVehicles.find(v => v.id === id) || null; }
export function getRequestById(id) { return demoRequests.find(r => r.id === id) || null; }

// ===== CRUD: PROFILES =====
export async function createProfile(data) {
  // Profiles should generally be created via auth signup, 
  // but if admins create them manually:
  const { _actor, ...profileData } = data;
  const { data: profile, error } = await supabase
    .from('profiles')
    .insert([profileData])
    .select()
    .single();
    
  if (error) { console.error(error); return null; }
  
  demoProfiles.push(profile);
  await addActivity(_actor || 'admin-1', 'Created user', { name: profile.full_name });
  return profile;
}

export async function updateProfile(id, updates) {
  const { _actor, ...updateData } = updates;
  const { data: profile, error } = await supabase
    .from('profiles')
    .update(updateData)
    .eq('id', id)
    .select()
    .single();

  if (error) { console.error(error); return null; }
  
  const index = demoProfiles.findIndex(p => p.id === id);
  if (index !== -1) demoProfiles[index] = profile;

  await addActivity(_actor || 'admin-1', 'Updated user', { name: profile.full_name });
  return profile;
}

export async function toggleProfileActive(id) {
  const p = getProfileById(id);
  if (!p) return null;
  
  const newStatus = !p.is_active;
  const { data: profile, error } = await supabase
    .from('profiles')
    .update({ is_active: newStatus })
    .eq('id', id)
    .select()
    .single();

  if (error) { console.error(error); return null; }
  
  const index = demoProfiles.findIndex(x => x.id === id);
  if (index !== -1) demoProfiles[index] = profile;

  await addActivity('admin-1', newStatus ? 'Activated user' : 'Deactivated user', { name: profile.full_name });
  return profile;
}

// ===== CRUD: VEHICLES =====
export async function createVehicle(data) {
  const { _actor, ...vehicleData } = data;
  const { data: vehicle, error } = await supabase
    .from('vehicles')
    .insert([{ ...vehicleData }])
    .select()
    .single();

  if (error) { console.error(error); return null; }
  
  demoVehicles.push(vehicle);
  await addActivity(_actor || data.customer_id, 'Added vehicle', { name: `${vehicle.make} ${vehicle.model}` });
  return vehicle;
}

export async function updateVehicle(id, updates) {
  const { data: vehicle, error } = await supabase
    .from('vehicles')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) { console.error(error); return null; }
  
  const index = demoVehicles.findIndex(v => v.id === id);
  if (index !== -1) demoVehicles[index] = vehicle;
  
  return vehicle;
}

// ===== CRUD: REQUESTS =====
export async function createRequest(data) {
  const reqData = {
    customer_id: data.customer_id,
    vehicle_id: data.vehicle_id,
    title: data.title,
    description: data.description,
    service_type: data.service_type,
    priority: data.priority || 'normal',
    status: 'pending',
    start_date: data.start_date || null,
    finish_date: data.finish_date || null,
    services_selected: data.services_selected || [],
    credits_charged: data.credits_charged || 0,
    price: data.price || 0,
    is_paid: data.is_paid || false,
    tool_used: data.tool_used || '',
    read_method: data.read_method || '',
    checksum_mode: data.checksum_mode || '',
    dtc_codes: data.dtc_codes || '',
    notes: data.notes || '',
    original_file: data.original_file || '',
    acm_file: data.acm_file || '',
    log_file: data.log_file || '',
    ecu_photo: data.ecu_photo || '',
  };

  const { data: req, error } = await supabase
    .from('requests')
    .insert([reqData])
    .select()
    .single();

  if (error) { console.error(error); return null; }
  
  demoRequests.unshift(req);
  await addActivity(data.customer_id || data._actor, 'Submitted request', { title: req.title });
  return req;
}

export async function updateRequest(id, updates) {
  const r = getRequestById(id);
  if (!r) return null;
  const oldStatus = r.status;
  const { _actor, ...updateData } = updates;

  const { data: req, error } = await supabase
    .from('requests')
    .update(updateData)
    .eq('id', id)
    .select()
    .single();

  if (error) { console.error(error); return null; }
  
  const index = demoRequests.findIndex(x => x.id === id);
  if (index !== -1) demoRequests[index] = req;

  if (updates.status && updates.status !== oldStatus) {
    await addActivity(_actor || 'admin-1', `Changed status to ${updates.status}`, { title: req.title });
  }
  if (updates.assigned_to && updates.assigned_to !== r.assigned_to) {
    const tech = getProfileById(updates.assigned_to);
    await addActivity(_actor || 'admin-1', 'Assigned technician', { name: tech?.full_name, to: req.title });
  }
  return req;
}

export async function assignRequest(reqId, techId, actorId = 'admin-1') {
  const r = getRequestById(reqId);
  if (!r) return null;
  
  const updates = { assigned_to: techId };
  if (r.status === 'pending') updates.status = 'assigned';

  const { data: req, error } = await supabase
    .from('requests')
    .update(updates)
    .eq('id', reqId)
    .select()
    .single();

  if (error) { console.error(error); return null; }
  
  const index = demoRequests.findIndex(x => x.id === reqId);
  if (index !== -1) demoRequests[index] = req;

  const tech = getProfileById(techId);
  await addActivity(actorId, 'Assigned technician', { name: tech?.full_name || techId, to: req.title });
  
  if (tech) {
    notifyAssignment(techId, tech.full_name, req.title, req.priority, req.id);
  }
  return req;
}

export async function changeRequestStatus(reqId, newStatus, actorId = 'admin-1') {
  const { data: req, error } = await supabase
    .from('requests')
    .update({ status: newStatus })
    .eq('id', reqId)
    .select()
    .single();

  if (error) { console.error(error); return null; }

  const index = demoRequests.findIndex(x => x.id === reqId);
  if (index !== -1) demoRequests[index] = req;

  await addActivity(actorId, `Changed status to ${newStatus}`, { title: req.title });
  
  if (['completed', 'delivered', 'in_progress'].includes(newStatus) && req.customer_id) {
    notifyStatusChange(req.customer_id, req.title, newStatus, req.id);
  }
  if (req.assigned_to && actorId !== req.assigned_to) {
    notifyStatusChange(req.assigned_to, req.title, newStatus, req.id);
  }
  return req;
}

// ===== CRUD: MESSAGES =====
export async function sendMessage(requestId, senderId, content) {
  const { data: msg, error } = await supabase
    .from('messages')
    .insert([{ request_id: requestId, sender_id: senderId, content }])
    .select()
    .single();

  if (error) { console.error(error); return null; }

  demoMessages.push(msg);

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
export async function addActivity(userId, action, details = {}) {
  // Skip activity logging if userId is not a valid UUID (e.g. old fallback 'admin-1')
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  if (!userId || !uuidRegex.test(userId)) {
    console.warn('[Store] Skipping activity log — no valid user_id');
    return null;
  }

  const { data: entry, error } = await supabase
    .from('activity_log')
    .insert([{ user_id: userId, action, details }])
    .select()
    .single();

  if (error) { console.error(error); return null; }
  
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
