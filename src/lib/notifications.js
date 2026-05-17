// ===== Notification & Messages System =====
import { icon } from './icons.js';
import { avatarImg } from './avatars.js';

// ===== NOTIFICATION STORE =====
const notifications = [
  { id: 'n1', userId: 'admin-1', type: 'assignment', title: 'Request Assigned', message: 'Stage 2 + AdBlue Off - 320d assigned to Mehdi Mapper', priority: 'urgent', read: false, link: '#/requests/req-3', created_at: '2025-05-05T09:00:00Z' },
  { id: 'n2', userId: 'tech-1', type: 'assignment', title: 'New Assignment', message: 'You were assigned Stage 1 Remap - Trafic III (HIGH priority)', priority: 'high', read: false, link: '#/requests/req-1', created_at: '2025-05-01T09:05:00Z' },
  { id: 'n3', userId: 'tech-1', type: 'assignment', title: 'New Assignment', message: 'You were assigned DPF + EGR Delete - 308 GT', priority: 'normal', read: true, link: '#/requests/req-2', created_at: '2025-04-20T11:30:00Z' },
  { id: 'n4', userId: 'tech-2', type: 'assignment', title: 'New Assignment (URGENT)', message: 'Stage 2 + AdBlue Off - 320d — Customer says car is on the lift!', priority: 'urgent', read: false, link: '#/requests/req-3', created_at: '2025-05-05T09:00:00Z' },
  { id: 'n5', userId: 'customer-1', type: 'status', title: 'Request Completed', message: 'DPF + EGR Delete - 308 GT is now complete. File ready for download.', priority: 'normal', read: false, link: '#/requests/req-2', created_at: '2025-05-02T16:00:00Z' },
  { id: 'n6', userId: 'admin-1', type: 'request', title: 'New Request Submitted', message: 'Paul Martin submitted Custom Map - 320d Track', priority: 'high', read: false, link: '#/requests/req-6', created_at: '2025-05-08T08:00:00Z' },
];

// ===== MESSAGES STORE (inbox-style) =====
const inboxMessages = [
  { id: 'im1', userId: 'tech-1', fromName: 'Jean Dupont', fromId: 'customer-1', subject: 'Re: Stage 1 Remap - Trafic III', preview: 'Can you also check the injector correction values?', read: false, requestId: 'req-1', created_at: '2025-05-01T11:00:00Z' },
  { id: 'im2', userId: 'admin-1', fromName: 'Paul Martin', fromId: 'customer-2', subject: 'Re: Stage 2 + AdBlue Off - 320d', preview: 'Please prioritize this one, car is on the lift.', read: false, requestId: 'req-3', created_at: '2025-05-05T08:30:00Z' },
  { id: 'im3', userId: 'customer-1', fromName: 'Alex Technician', fromId: 'tech-1', subject: 'Re: DPF + EGR Delete - 308 GT', preview: 'DPF and EGR removal done. File is ready for download.', read: true, requestId: 'req-2', created_at: '2025-05-02T16:00:00Z' },
];

// ===== CRUD =====
let _uidCounter = 100;
function uid() { return 'n-' + (++_uidCounter); }

export function getNotifications(userId) {
  return notifications.filter(n => n.userId === userId).sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
}

export function getUnreadNotifCount(userId) {
  return notifications.filter(n => n.userId === userId && !n.read).length;
}

export function markNotifRead(id) {
  const n = notifications.find(x => x.id === id);
  if (n) n.read = true;
}

export function markAllNotifsRead(userId) {
  notifications.filter(n => n.userId === userId).forEach(n => n.read = true);
}

export function addNotification({ userId, type, title, message, priority = 'normal', link = '' }) {
  const notif = { id: uid(), userId, type, title, message, priority, read: false, link, created_at: new Date().toISOString() };
  notifications.unshift(notif);
  return notif;
}

export function getInboxMessages(userId) {
  return inboxMessages.filter(m => m.userId === userId).sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
}

export function getUnreadMsgCount(userId) {
  return inboxMessages.filter(m => m.userId === userId && !m.read).length;
}

export function markMsgRead(id) {
  const m = inboxMessages.find(x => x.id === id);
  if (m) m.read = true;
}

export function addInboxMessage({ userId, fromName, fromId, subject, preview, requestId }) {
  const msg = { id: uid(), userId, fromName, fromId, subject, preview, read: false, requestId, created_at: new Date().toISOString() };
  inboxMessages.unshift(msg);
  return msg;
}

/**
 * Create assignment notifications for a technician
 */
export function notifyAssignment(techId, techName, requestTitle, priority, requestId) {
  const priorityLabel = priority === 'urgent' ? '🔴 URGENT' : priority === 'high' ? '🟠 HIGH' : '';
  const prioritySuffix = priorityLabel ? ` (${priorityLabel} priority)` : '';

  // Notify the technician
  addNotification({
    userId: techId,
    type: 'assignment',
    title: priorityLabel ? `${priorityLabel} — New Assignment` : 'New Assignment',
    message: `You were assigned "${requestTitle}"${prioritySuffix}`,
    priority,
    link: `#/requests/${requestId}`,
  });

  // Notify admins
  addNotification({
    userId: 'admin-1',
    type: 'assignment',
    title: 'Request Assigned',
    message: `${requestTitle} assigned to ${techName}${prioritySuffix}`,
    priority,
    link: `#/requests/${requestId}`,
  });
}

/**
 * Create status change notification
 */
export function notifyStatusChange(userId, requestTitle, newStatus, requestId) {
  const statusLabels = { completed: 'Completed', delivered: 'Delivered', in_progress: 'In Progress', cancelled: 'Cancelled' };
  addNotification({
    userId,
    type: 'status',
    title: `Request ${statusLabels[newStatus] || newStatus}`,
    message: `"${requestTitle}" status changed to ${statusLabels[newStatus] || newStatus}`,
    priority: newStatus === 'completed' || newStatus === 'delivered' ? 'normal' : 'normal',
    link: `#/requests/${requestId}`,
  });
}

/**
 * Create message notification
 */
export function notifyMessage(recipientId, senderName, senderId, requestTitle, preview, requestId) {
  addInboxMessage({
    userId: recipientId,
    fromName: senderName,
    fromId: senderId,
    subject: `Re: ${requestTitle}`,
    preview: preview.substring(0, 80),
    requestId,
  });
  addNotification({
    userId: recipientId,
    type: 'message',
    title: 'New Message',
    message: `${senderName}: "${preview.substring(0, 60)}${preview.length > 60 ? '...' : ''}"`,
    priority: 'normal',
    link: `#/requests/${requestId}`,
  });
}

// ===== UI RENDERING =====
function timeAgo(date) {
  const s = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
  if (s < 60) return 'now';
  if (s < 3600) return `${Math.floor(s / 60)}m`;
  if (s < 86400) return `${Math.floor(s / 3600)}h`;
  return `${Math.floor(s / 86400)}d`;
}

const priorityStyles = {
  urgent: 'border-left:3px solid #EF4444;background:linear-gradient(135deg,rgba(239,68,68,0.08),rgba(239,68,68,0.02))',
  high: 'border-left:3px solid #F59E0B;background:linear-gradient(135deg,rgba(245,158,11,0.08),rgba(245,158,11,0.02))',
  normal: 'border-left:3px solid rgba(255,255,255,0.06)',
  low: 'border-left:3px solid rgba(255,255,255,0.04)',
};

const typeIcons = {
  assignment: 'user-check',
  status: 'refresh-cw',
  message: 'message-circle',
  request: 'clipboard-list',
  referral: 'gift',
};

export function renderNotifPanel(userId) {
  const notifs = getNotifications(userId).slice(0, 12);
  const unread = getUnreadNotifCount(userId);

  return `
    <div class="notif-panel" id="notif-panel">
      <div class="notif-panel-header">
        <h4 style="color:#fff;display:flex;align-items:center;gap:8px">${icon('bell', 16)} Notifications ${unread ? `<span class="nav-badge">${unread}</span>` : ''}</h4>
        <button class="btn btn-ghost btn-sm" id="mark-all-read" style="font-size:11px">Mark all read</button>
      </div>
      <div class="notif-panel-list">
        ${notifs.length ? notifs.map(n => `
          <a href="${n.link || '#'}" class="notif-item ${n.read ? 'read' : ''}" style="${priorityStyles[n.priority] || priorityStyles.normal}" data-nid="${n.id}">
            <div class="notif-icon">${icon(typeIcons[n.type] || 'bell', 16)}</div>
            <div class="notif-body">
              <div class="notif-title">${n.title}</div>
              <div class="notif-msg">${n.message}</div>
            </div>
            <span class="notif-time">${timeAgo(n.created_at)}</span>
            ${!n.read ? '<span class="notif-dot"></span>' : ''}
          </a>
        `).join('') : '<div class="notif-empty">No notifications yet</div>'}
      </div>
    </div>`;
}

export function renderMsgPanel(userId) {
  const msgs = getInboxMessages(userId).slice(0, 10);
  const unread = getUnreadMsgCount(userId);

  return `
    <div class="notif-panel msg-panel" id="msg-panel">
      <div class="notif-panel-header">
        <h4 style="color:#fff;display:flex;align-items:center;gap:8px">${icon('mail', 16)} Messages ${unread ? `<span class="nav-badge">${unread}</span>` : ''}</h4>
      </div>
      <div class="notif-panel-list">
        ${msgs.length ? msgs.map(m => `
          <a href="#/requests/${m.requestId}" class="notif-item ${m.read ? 'read' : ''}" data-mid="${m.id}">
            <div style="flex-shrink:0">${avatarImg(m.fromName, 32)}</div>
            <div class="notif-body">
              <div class="notif-title">${m.fromName}</div>
              <div class="notif-msg" style="font-weight:500;color:rgba(255,255,255,0.7)">${m.subject}</div>
              <div class="notif-msg">${m.preview}</div>
            </div>
            <span class="notif-time">${timeAgo(m.created_at)}</span>
            ${!m.read ? '<span class="notif-dot"></span>' : ''}
          </a>
        `).join('') : '<div class="notif-empty">No messages</div>'}
      </div>
    </div>`;
}
