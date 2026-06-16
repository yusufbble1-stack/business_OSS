// Main application logic for Standalone WhatsApp Outreach Panel
let leads = [];
let selectedLead = null;
let apiStatus = 'DISCONNECTED';
let activeTemplateId = 'web_creation';
let sessionLogs = [];

// Predefined Message Templates
const TEMPLATES = [
  {
    id: 'web_creation',
    name: 'Website & Portals Offer'
  },
  {
    id: 'reputation_efficiency',
    name: 'Reputation & Workflow'
  },
  {
    id: 'portal_focused',
    name: 'Sleek Portal Showcase'
  }
];

// RFC 4180 Compliant CSV Parser
function parseCSV(text) {
  const lines = [];
  let row = [""];
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const nextChar = text[i + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        row[row.length - 1] += '"';
        i++; // Skip escape quote
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      row.push("");
    } else if ((char === '\r' || char === '\n') && !inQuotes) {
      if (char === '\r' && nextChar === '\n') {
        i++;
      }
      lines.push(row);
      row = [""];
    } else {
      row[row.length - 1] += char;
    }
  }
  if (row.length > 1 || row[0] !== "") {
    lines.push(row);
  }

  const header = lines[0].map(h => h.trim().replace(/^"|"$/g, ''));
  const data = [];
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i];
    if (values.length < header.length) continue;
    const obj = {};
    for (let j = 0; j < header.length; j++) {
      obj[header[j]] = values[j] ? values[j].trim().replace(/^"|"$/g, '') : '';
    }
    data.push(obj);
  }
  return data;
}

// LocalStorage persistence for contacted leads
function isContacted(phone) {
  if (!phone) return false;
  const list = JSON.parse(localStorage.getItem('whatsapp_contacted_leads') || '{}');
  return !!list[phone];
}

function markAsContacted(phone) {
  if (!phone) return;
  const list = JSON.parse(localStorage.getItem('whatsapp_contacted_leads') || '{}');
  list[phone] = new Date().toISOString();
  localStorage.setItem('whatsapp_contacted_leads', JSON.stringify(list));
}

// Check WhatsApp API Server status
async function checkApiStatus() {
  try {
    const res = await fetch('/status');
    const data = await res.json();
    apiStatus = data.status;
  } catch (err) {
    apiStatus = 'DISCONNECTED';
  }
  updateStatusUI();
}

function updateStatusUI() {
  const dot = document.getElementById('conn-status-dot');
  const label = document.getElementById('conn-status-label');
  if (!dot || !label) return;

  dot.className = 'status-dot';
  if (apiStatus === 'CONNECTED') {
    dot.classList.add('connected');
    label.textContent = 'Connected';
  } else if (apiStatus === 'QR_RECEIVED' || apiStatus === 'AUTHENTICATING') {
    dot.classList.add('connecting');
    label.textContent = 'QR Code Pending / Linking';
  } else {
    dot.classList.add('disconnected');
    label.textContent = 'Server Disconnected';
  }
}

// Helper to show modern notification toasts
function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  
  const iconName = type === 'success' ? 'check-circle' : (type === 'error' ? 'x-circle' : 'info');
  toast.innerHTML = `<i data-lucide="${iconName}" style="width:16px;height:16px;flex-shrink:0;"></i><span>${message}</span>`;
  container.appendChild(toast);
  
  if (window.lucide) {
    window.lucide.createIcons();
  }

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(20px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Compile template with placeholders and dynamic customization logic
function compileMessage(templateId, lead) {
  if (!lead) return '';
  let text = '';
  
  if (templateId === 'web_creation') {
    if (!lead.website || lead.website === '') {
      text = 'Hi {title},\n\nI saw your Google Maps listing in {city} and noticed you don\'t have a website yet. We build premium websites for auto workshops with a high-end supercar design aesthetic.\n\nMore than just a website, we set you up with 3 integrated portals to automate your workflow:\n1. Admin Portal: Track job statuses, dispatch mechanics, and handle invoices.\n2. Client Portal: Let customers book online, view live repair progress, and pay.\n3. Technician Portal: Let your mechanics check job sheets and log details from their phones.\n\nYou can check out a live demonstration of the portal dashboard we created here: https://business-92l42c023-youssef-s-projects17.vercel.app\n\nWould you be open to a quick chat to see how we could set this up for {title}?';
    } else {
      text = 'Hi {title},\n\nI came across your website ({website}) for your workshop in {city}. You\'ve got great reviews! We help workshops upgrade their customer experience by building premium websites with integrated portal systems in a very clean style.\n\nWe can add 3 custom portals directly connected to your business:\n1. Admin Dashboard: Manage your schedule, track invoice statuses, and assign jobs.\n2. Client Portal: Let clients book slots online and track their repair progress live.\n3. Technician Portal: Let your mechanics update sheets and log repair photos from their phones.\n\nCheck out a live review of the dashboard platform we built: https://business-92l42c023-youssef-s-projects17.vercel.app\n\nWould you be interested in upgrading your current site with these portals?';
    }
  } else if (templateId === 'reputation_efficiency') {
    if (!lead.website || lead.website === '') {
      text = 'Hello from AS Performance!\n\nI noticed {title} has a stellar {totalScore}⭐ rating from {reviewsCount} reviews on Google Maps in {city}, but no website. With that kind of demand, managing bookings manually can be exhausting.\n\nWe build custom websites with full workflow automation:\n- Admin Control Center: To coordinate jobs and invoices.\n- Client Booking Portal: To automate reservations.\n- Technician App: For mechanics to log updates live.\n\nSee the premium supercar style we design in this live demo: https://business-92l42c023-youssef-s-projects17.vercel.app\n\nLet us know if you\'d like to bring {title} online with a professional site!';
    } else {
      text = 'Hello from AS Performance!\n\nI saw that {title} in {city} has an excellent rating of {totalScore}⭐ with {reviewsCount} Google reviews!\n\nTo match your strong reputation, we create styled website upgrades featuring dedicated Admin, Client, and Technician portals. It replaces manual calls and texts with a sleek, automated booking & workflow dashboard.\n\nTake a look at a live example of the system here: https://business-92l42c023-youssef-s-projects17.vercel.app\n\nWould you like to discuss how we can integrate this premium dashboard into {website}?';
    }
  } else if (templateId === 'portal_focused') {
    if (!lead.website || lead.website === '') {
      text = 'Hi {title},\n\nWe build custom websites for auto tuning and service centers in {city}. We specialize in a premium dark/supercar styling that immediately stands out.\n\nOur websites come with three built-in portals to run your garage:\n⚙️ Admin Portal: Assign bookings, manage invoices, and overview business stats.\n🔑 Client Portal: Customers can book, view status, and see their service history.\n🔧 Technician Portal: Mechanics update job sheets on-the-go from their mobile.\n\nHave a look at the live platform demo: https://business-92l42c023-youssef-s-projects17.vercel.app\n\nCan we set up a quick demo for {title} this week?';
    } else {
      text = 'Hi {title},\n\nWe build custom web dashboards for auto centers in {city}. Checked out {website} and loved your branding!\n\nWe help shops like yours deploy custom booking and workflow systems featuring:\n⚙️ Admin Portal: Oversee bookings, track invoice statuses, and dispatch jobs.\n🔑 Client Portal: Let customers schedule services, get live updates, and view history.\n🔧 Technician Portal: Mobile dashboard for mechanics to update jobs on the floor.\n\nYou can review the live dashboard we created to see the design and style: https://business-92l42c023-youssef-s-projects17.vercel.app\n\nWould you be open to adding this booking and scheduling system to {website}?';
    }
  } else {
    text = 'Hi {title},\n\nWe build styled web platforms with integrated admin, client, and technician portals for garages in {city}. Review a live example of our portal dashboard here: https://business-92l42c023-youssef-s-projects17.vercel.app.';
  }

  return text
    .replace(/{title}/g, lead.title || 'there')
    .replace(/{city}/g, lead.city || 'your area')
    .replace(/{phone}/g, lead.phone || '')
    .replace(/{website}/g, lead.website || '')
    .replace(/{totalScore}/g, lead.totalScore || '5')
    .replace(/{reviewsCount}/g, lead.reviewsCount || '10');
}

// Filter and render list of leads
function filterAndRenderLeads() {
  const searchQ = document.getElementById('lead-search')?.value.toLowerCase() || '';
  const cityF = document.getElementById('filter-city')?.value || '';
  const statusF = document.getElementById('filter-status')?.value || 'all';
  const listElement = document.getElementById('leads-list');
  if (!listElement) return;

  const filtered = leads.filter(lead => {
    const matchesSearch = lead.title.toLowerCase().includes(searchQ) || 
                          lead.city.toLowerCase().includes(searchQ) ||
                          (lead.categories && lead.categories.toLowerCase().includes(searchQ));
    const matchesCity = !cityF || lead.city === cityF;
    
    let matchesStatus = true;
    if (statusF === 'with_phone') matchesStatus = !!lead.phone;
    else if (statusF === 'contacted') matchesStatus = isContacted(lead.phone);
    else if (statusF === 'pending') matchesStatus = !!lead.phone && !isContacted(lead.phone);

    return matchesSearch && matchesCity && matchesStatus;
  });

  // Calculate and display mini stats
  const totalLeads = leads.length;
  const withPhoneCount = leads.filter(l => !!l.phone).length;
  const contactedCount = leads.filter(l => isContacted(l.phone)).length;

  document.getElementById('stat-total').textContent = totalLeads;
  document.getElementById('stat-phone').textContent = withPhoneCount;
  document.getElementById('stat-contacted').textContent = contactedCount;

  if (!filtered.length) {
    listElement.innerHTML = `<div style="padding:40px; text-align:center; color:var(--brand-muted); font-size:13px">No leads match filters.</div>`;
    return;
  }

  listElement.innerHTML = filtered.map(lead => {
    const isActive = selectedLead && selectedLead.phone === lead.phone ? 'active' : '';
    const contactedState = isContacted(lead.phone);
    const badgeMarkup = lead.phone 
      ? (contactedState 
          ? `<span class="badge-lead badge-lead-contacted"><i data-lucide="check" style="width:10px;height:10px;margin-right:3px;"></i>Contacted</span>` 
          : `<span class="badge-lead badge-lead-pending"><i data-lucide="clock" style="width:10px;height:10px;margin-right:3px;"></i>Pending</span>`)
      : `<span class="badge-lead" style="background:rgba(255,255,255,0.03); color:var(--brand-muted)">No Phone</span>`;

    return `
      <div class="lead-item-card ${isActive}" data-phone="${lead.phone}">
        <div class="lead-item-title">${lead.title}</div>
        <div class="lead-item-meta">
          <span>${lead.city || 'UK'}</span>
          <span class="lead-item-rating"><i data-lucide="star" style="width:10px;height:10px;fill:#fbbf24;stroke:#fbbf24;"></i> ${lead.totalScore || '0'}</span>
        </div>
        <div class="lead-item-badges">
          ${badgeMarkup}
        </div>
      </div>
    `;
  }).join('');

  if (window.lucide) {
    window.lucide.createIcons();
  }

  // Bind click items
  listElement.querySelectorAll('.lead-item-card').forEach(card => {
    card.addEventListener('click', () => {
      const phone = card.getAttribute('data-phone');
      const lead = leads.find(l => l.phone === phone);
      if (lead) selectLead(lead);
    });
  });
}

// Select a lead and render the Composer View
function selectLead(lead) {
  selectedLead = lead;

  // Highlight in sidebar
  document.querySelectorAll('.lead-item-card').forEach(card => {
    if (card.getAttribute('data-phone') === lead.phone) {
      card.classList.add('active');
    } else {
      card.classList.remove('active');
    }
  });

  const detailView = document.getElementById('detail-composer-view');
  if (!detailView) return;

  const compiledText = compileMessage(activeTemplateId, lead);

  detailView.innerHTML = `
    <!-- Header Details -->
    <div class="lead-details-header animate-in">
      <h2>${lead.title}</h2>
      <div class="lead-meta-row" style="margin-top: 8px;">
        <span class="badge-meta"><i data-lucide="map-pin" style="width:12px;height:12px;"></i> ${lead.street || ''}, ${lead.city || 'UK'}</span>
        <span class="badge-meta" style="color:#fbbf24;"><i data-lucide="star" style="width:12px;height:12px;fill:#fbbf24;stroke:#fbbf24;"></i> ${lead.totalScore} (${lead.reviewsCount} reviews)</span>
        <span class="badge-meta"><i data-lucide="tag" style="width:12px;height:12px;"></i> ${lead.categories || 'Garages'}</span>
      </div>

      <div style="display:flex; flex-wrap:wrap; gap:8px; margin-top:16px">
        ${lead.phone ? `
          <span class="badge-meta phone"><i data-lucide="phone" style="width:12px;height:12px;"></i> ${lead.phone}</span>
        ` : ''}
        ${lead.website ? `
          <a href="${lead.website}" target="_blank" class="badge-meta link-btn"><i data-lucide="external-link" style="width:12px;height:12px;"></i> Website</a>
        ` : ''}
        ${lead.url ? `
          <a href="${lead.url}" target="_blank" class="badge-meta link-btn" style="color:var(--brand-red-light);"><i data-lucide="map" style="width:12px;height:12px;"></i> Google Maps</a>
        ` : ''}
      </div>
    </div>

    <!-- Message Composer Section -->
    <div class="composer-section animate-in" style="animation-delay: 0.1s;">
      <!-- Templates tabs -->
      <div>
        <span class="template-label">Outreach Templates</span>
        <div class="template-tabs">
          ${TEMPLATES.map(t => `
            <button class="template-tab-btn ${activeTemplateId === t.id ? 'active' : ''}" data-tid="${t.id}">
              ${t.name}
            </button>
          `).join('')}
        </div>
      </div>

      <!-- Composer box -->
      <div class="composer-box">
        <span class="template-label">Message Composer</span>
        <textarea id="composer-textarea" class="input" style="min-height: 140px; line-height:1.6; font-size:14px;">${compiledText}</textarea>
        
        <div class="composer-meta-tip">
          <span>Custom templates can include placeholders like {title} or {city}.</span>
          <span id="char-count">0 characters</span>
        </div>
      </div>

      <!-- Composer actions -->
      <div class="composer-actions">
        <div class="outreach-status-message">
          ${isContacted(lead.phone) 
            ? `<span style="color:#34d399; font-weight:600; display:inline-flex; align-items:center; gap:6px;"><i data-lucide="check" style="width:14px;height:14px;"></i> Already Contacted</span>` 
            : `<span style="color:var(--brand-silver); display:inline-flex; align-items:center; gap:6px;"><i data-lucide="play" style="width:14px;height:14px;"></i> Ready for outreach</span>`}
        </div>

        <button class="btn btn-primary" id="btn-send-outreach" ${!lead.phone ? 'disabled' : ''}>
          <i data-lucide="send" style="width:14px;height:14px;"></i>
          <span>Send via WhatsApp</span>
        </button>
      </div>

      <!-- Execution logs -->
      <div class="composer-log-area" id="composer-log">
        <div class="log-entry info">Ready. Select outreach templates and tap Send.</div>
        ${sessionLogs.map(l => `<div class="log-entry ${l.type}">${l.text}</div>`).join('')}
      </div>
    </div>
  `;

  if (window.lucide) {
    window.lucide.createIcons();
  }

  updateCharCount();

  // Template switch listeners
  detailView.querySelectorAll('.template-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      activeTemplateId = btn.getAttribute('data-tid');
      detailView.querySelectorAll('.template-tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const textarea = document.getElementById('composer-textarea');
      if (textarea) {
        textarea.value = compileMessage(activeTemplateId, selectedLead);
        updateCharCount();
      }
    });
  });

  // Character counter event
  const textarea = document.getElementById('composer-textarea');
  textarea?.addEventListener('input', updateCharCount);

  // Send action event
  const sendBtn = document.getElementById('btn-send-outreach');
  sendBtn?.addEventListener('click', sendOutreachMessage);
}

function updateCharCount() {
  const textarea = document.getElementById('composer-textarea');
  const count = document.getElementById('char-count');
  if (textarea && count) {
    count.textContent = `${textarea.value.length} characters`;
  }
}

// Send WhatsApp Outreach Message
async function sendOutreachMessage() {
  if (!selectedLead || !selectedLead.phone) return;

  const textarea = document.getElementById('composer-textarea');
  if (!textarea) return;
  const messageText = textarea.value.trim();

  if (!messageText) {
    showToast('Message content cannot be empty.', 'error');
    return;
  }

  const sendBtn = document.getElementById('btn-send-outreach');
  if (sendBtn) {
    sendBtn.disabled = true;
    sendBtn.querySelector('span').textContent = 'Sending...';
  }

  const logArea = document.getElementById('composer-log');
  const addLog = (text, type = 'info') => {
    const entry = { text: `[${new Date().toLocaleTimeString()}] ${text}`, type };
    sessionLogs.unshift(entry);
    if (logArea) {
      logArea.innerHTML = sessionLogs.map(l => `<div class="log-entry ${l.type}">${l.text}</div>`).join('');
    }
  };

  addLog(`Sending message to ${selectedLead.title}...`, 'info');

  try {
    const res = await fetch('/send-message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        number: selectedLead.phone,
        message: messageText
      })
    });

    const data = await res.json();
    if (res.ok && data.success) {
      addLog(`Success! Delivered successfully. Message ID: ${data.messageId}`, 'success');
      showToast(`Outreach message sent to ${selectedLead.title}!`, 'success');
      markAsContacted(selectedLead.phone);

      // Re-render views
      filterAndRenderLeads();
      selectLead(selectedLead);
    } else {
      addLog(`Failed: ${data.error || 'Server error'}`, 'error');
      showToast(`Delivery failed: ${data.error || 'Error'}`, 'error');
      if (sendBtn) {
        sendBtn.disabled = false;
        sendBtn.querySelector('span').textContent = 'Send via WhatsApp';
      }
    }
  } catch (err) {
    addLog(`Network error: ${err.message}`, 'error');
    showToast(`Network error: Verify WhatsApp Server is running.`, 'error');
    if (sendBtn) {
      sendBtn.disabled = false;
      sendBtn.querySelector('span').textContent = 'Send via WhatsApp';
    }
  }
}

// Initialise Application
async function init() {
  try {
    // Check local API status
    await checkApiStatus();
    setInterval(checkApiStatus, 10000);

    // Fetch and parse leads CSV
    const res = await fetch('/googleMaps1.csv');
    if (!res.ok) throw new Error('Failed to fetch leads list.');
    const text = await res.text();
    leads = parseCSV(text);

    // Sort: leads with phone numbers first, then sort by rating
    leads.sort((a, b) => {
      if (a.phone && !b.phone) return -1;
      if (!a.phone && b.phone) return 1;
      return b.totalScore - a.totalScore;
    });

    // Populate City filter select dropdown options
    const cities = [...new Set(leads.map(l => l.city).filter(Boolean))].sort();
    const citySelect = document.getElementById('filter-city');
    if (citySelect) {
      cities.forEach(city => {
        const opt = document.createElement('option');
        opt.value = city;
        opt.textContent = city;
        citySelect.appendChild(opt);
      });
    }

    // Render leads list
    filterAndRenderLeads();

    // Bind listeners
    document.getElementById('lead-search')?.addEventListener('input', filterAndRenderLeads);
    document.getElementById('filter-city')?.addEventListener('change', filterAndRenderLeads);
    document.getElementById('filter-status')?.addEventListener('change', filterAndRenderLeads);

  } catch (err) {
    console.error('Initialization error:', err);
    const listElement = document.getElementById('leads-list');
    if (listElement) {
      listElement.innerHTML = `<div style="padding:40px; text-align:center; color:#f87171; font-size:13px">Failed to load leads database file (googleMaps1.csv).</div>`;
    }
  }
}

document.addEventListener('DOMContentLoaded', init);
