// ===== Pricing Page =====

const PRICING_CATEGORIES = [
  {
    title: 'Performance Calibration',
    icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>',
    featured: true,
    items: [
      { name:'Stage 1 ECO / Daily', price:'60€' },
      { name:'Stage 1 Performance', price:'70€' },
      { name:'Stage 2', price:'110€' },
      { name:'Stage 3', price:'230€' },
      { name:'Stage 4 / Big Turbo / Hybrid', price:'390€' },
      { name:'Custom Dyno / Full Setup', price:'SUR DEVIS' },
    ]
  },
  {
    title: 'Performance Packs',
    icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M2 12h20"/></svg>',
    items: [
      { name:'Stage 1 + Pops & Bangs', price:'90€' },
      { name:'Stage 1 + Hardcut', price:'100€' },
      { name:'Stage 1 + E85', price:'110€' },
      { name:'Stage 2 + Pops & Bangs', price:'180€' },
      { name:'Full Performance Pack', price:'200€' },
    ]
  },
  {
    title: 'Advanced Performance Features',
    icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="m4.93 4.93 4.24 4.24"/><path d="m14.83 9.17 4.24-4.24"/><path d="m14.83 14.83 4.24 4.24"/><path d="m9.17 14.83-4.24 4.24"/><circle cx="12" cy="12" r="4"/></svg>',
    items: [
      { name:'Launch Control', price:'60€' },
      { name:'Rev Limiter', price:'50€' },
      { name:'Hard Cut Limiter', price:'55€' },
      { name:'Vmax OFF', price:'50€' },
      { name:'Anti-Lag', price:'120€' },
      { name:'Rolling Anti-Lag', price:'150€' },
      { name:'Multi-Map Switching', price:'120€' },
      { name:'Ethanol Sensor Integration', price:'100€' },
      { name:'Burble Custom Calibration', price:'60€' },
      { name:'TCU Tune Support', price:'100€' },
    ]
  },
  {
    title: 'Emission Control Solutions',
    icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76Z"/></svg>',
    items: [
      { name:'AdBlue / SCR OFF', price:'50€' },
      { name:'EGR / DPF OFF', price:'50€' },
      { name:'Lambda / Cata OFF', price:'45€' },
      { name:'NOx OFF', price:'45€' },
      { name:'Swirl Flaps OFF', price:'50€' },
      { name:'MAF OFF', price:'50€' },
    ],
    highlight: { name:'Reliability Pack', desc:'EGR OFF + DPF OFF + AdBlue OFF + DTC OFF', price:'120€' }
  },
  {
    title: 'FlexFuel / E85',
    icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 3h12l4 6-10 13L2 9Z"/></svg>',
    items: [
      { name:'E85 Basic', price:'80€' },
      { name:'E85 + Stage 1', price:'110€' },
      { name:'Full FlexFuel Sensor Setup', price:'180€' },
      { name:'Cold Start Optimization', price:'40€' },
      { name:'Ethanol Content Sensor Calibration', price:'90€' },
    ]
  },
  {
    title: 'Acoustic Calibration',
    icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>',
    items: [
      { name:'Pops & Bangs (Petrol)', price:'50€' },
      { name:'Overrun Crackles', price:'50€' },
    ]
  },
  {
    title: 'ECU Management',
    icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M7 7h.01"/><path d="M17 7h.01"/><path d="M7 17h.01"/><path d="M17 17h.01"/></svg>',
    items: [
      { name:'IMMO OFF / Virgin File', price:'80€' },
      { name:'IMMO Back ON', price:'80€' },
      { name:'Virgin File', price:'90€' },
      { name:'Clone ECU', price:'100€' },
      { name:'ISN Synchronization', price:'100€' },
      { name:'Start & Stop OFF', price:'40€' },
      { name:'Hot Start Fix', price:'40€' },
      { name:'DTC OFF', price:'40€' },
      { name:'TProt Patch', price:'70€' },
      { name:'Recovery / Unbrick ECU', price:'120€' },
      { name:'CVN Fix', price:'100€' },
      { name:'FRF / ODX Extraction', price:'60€' },
    ]
  },
  {
    title: 'Diagnostic & Support',
    icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>',
    items: [
      { name:'Log Analysis', price:'40€' },
      { name:'Remote Diagnostic', price:'50€' },
      { name:'File Verification', price:'30€' },
      { name:'Tuning Consultation', price:'50€' },
      { name:'Hardware Recommendation', price:'40€' },
    ]
  },
  {
    title: 'Gearbox / TCU',
    icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>',
    items: [
      { name:'DSG Tune', price:'140€' },
      { name:'ZF8 Tune', price:'160€' },
      { name:'Torque Limiter Adjustments', price:'80€' },
      { name:'Gear Display Activation', price:'50€' },
      { name:'Launch RPM Optimization', price:'60€' },
    ]
  },
  {
    title: 'Truck / Agri / Heavy Duty',
    icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 13.52 9H12"/><circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/></svg>',
    items: [
      { name:'Truck Stage 1', price:'140€' },
      { name:'SCR OFF Truck', price:'180€' },
      { name:'DPF OFF Truck', price:'180€' },
      { name:'AGRI Tune', price:'SUR DEVIS' },
      { name:'Construction Equipment Tune', price:'SUR DEVIS' },
    ]
  },
  {
    title: 'Motorsport / Premium',
    icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09Z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2Z"/></svg>',
    items: [
      { name:'Motorsport Calibration', price:'SUR DEVIS' },
      { name:'Dyno Assisted Calibration', price:'SUR DEVIS' },
      { name:'Drag Setup', price:'SUR DEVIS' },
      { name:'Trackday Calibration', price:'SUR DEVIS' },
      { name:'Flame Tune Custom', price:'150€' },
    ]
  },
];

const ADDITIONAL_SERVICES = [
  { name:'OPF / GPF OFF', price:'60€' },
  { name:'Cold Start Reduction', price:'50€' },
  { name:'Catalyst Heating OFF', price:'50€' },
  { name:'Torque Monitoring OFF', price:'50€' },
  { name:'Popcorn Limiter', price:'60€' },
  { name:'Smoke Limiter Calibration', price:'70€' },
  { name:'Bench Unlock', price:'80€' },
  { name:'Boot Unlock', price:'100€' },
  { name:'EEPROM Service', price:'80€' },
  { name:'Clone TCU', price:'120€' },
  { name:'Pops & Bangs (Soft)', price:'50€' },
  { name:'Pops & Bangs (Aggressive)', price:'70€' },
  { name:'OEM Style Burble', price:'60€' },
  { name:'Duration Adjustment', price:'40€' },
  { name:'Live Log Review', price:'50€' },
  { name:'Remote Assistance', price:'60€' },
  { name:'Custom File Revision', price:'60€' },
  { name:'Dealer Support', price:'SUR DEVIS' },
];

export function renderPricingPage() {
  const app = document.getElementById('app');

  app.innerHTML = `
    <div class="hp-page">
      <!-- Navigation -->
      <nav class="hp-nav scrolled">
        <div class="hp-nav-inner">
          <div class="hp-nav-brand">
            <img src="/assets/logo.png" alt="AS Performance" class="hp-logo"/>
            <div>
              <span class="hp-brand-name">AS</span>
              <span class="hp-brand-bold">Performance</span>
              <span class="hp-brand-sub">chiptuning</span>
            </div>
          </div>
          <div class="hp-nav-pill">
            <a href="#/home" class="hp-nav-link">Home</a>
            <a href="#/pricing" class="hp-nav-link active">Pricing</a>
            <a href="#/credits" class="hp-nav-link">Credits</a>
            <a href="#/network" class="hp-nav-link">Network</a>
            <a href="#/gains" class="hp-nav-link">Calculator</a>
          </div>
          <div class="hp-nav-actions">
            <a href="mailto:asperformance.contact@gmail.com" class="hp-nav-cta">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              Contact Us
            </a>
            <a href="#/login" class="hp-nav-login">Partner Login</a>
          </div>
          <button class="hp-mobile-toggle" id="hp-mobile-toggle">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          </button>
        </div>
      </nav>

      <!-- Pricing Hero -->
      <section class="pr-hero">
        <div class="pr-hero-content">
          <span class="hp-section-tag">Transparent Pricing</span>
          <h1>Professional Tuning,<br/><span class="hp-text-red">Clear Pricing</span></h1>
          <p>All prices shown are starting rates. Complex projects may vary. Contact us for custom quotes.</p>
        </div>
      </section>

      <!-- Pricing Grid -->
      <section class="pr-section">
        <div class="hp-container">
          <div class="pr-grid">
            ${PRICING_CATEGORIES.map(cat => `
              <div class="pr-card ${cat.featured ? 'pr-card-featured' : ''}">
                <div class="pr-card-header">
                  <div class="pr-card-icon">${cat.icon}</div>
                  <h3>${cat.title}</h3>
                </div>
                <div class="pr-card-body">
                  ${cat.items.map(item => `
                    <div class="pr-item">
                      <span class="pr-item-name">${item.name}</span>
                      <span class="pr-item-dots"></span>
                      <span class="pr-item-price ${item.price === 'SUR DEVIS' ? 'pr-price-custom' : ''}">${item.price === 'SUR DEVIS' ? 'SUR DEVIS' : 'dès ' + item.price}</span>
                    </div>
                  `).join('')}
                  ${cat.highlight ? `
                    <div class="pr-highlight">
                      <div class="pr-highlight-header">
                        <span class="pr-highlight-name">${cat.highlight.name}</span>
                        <span class="pr-highlight-price">dès ${cat.highlight.price}</span>
                      </div>
                      <span class="pr-highlight-desc">${cat.highlight.desc}</span>
                    </div>
                  ` : ''}
                </div>
              </div>
            `).join('')}
          </div>

          <!-- Additional Services -->
          <div class="pr-additional">
            <div class="pr-additional-header">
              <h3>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v8"/><path d="M8 12h8"/></svg>
                Additional Services
              </h3>
            </div>
            <div class="pr-additional-grid">
              ${ADDITIONAL_SERVICES.map(s => `
                <div class="pr-add-item">
                  <span>${s.name}</span>
                  <span class="pr-add-price ${s.price === 'SUR DEVIS' ? 'pr-price-custom' : ''}">${s.price === 'SUR DEVIS' ? 'SUR DEVIS' : 'dès ' + s.price}</span>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Contact Bar -->
          <div class="pr-contact-bar">
            <div class="pr-contact-item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              <span>asperformance.contact@gmail.com</span>
            </div>
            <div class="pr-contact-item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
              <span>WhatsApp — Contact direct disponible</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Footer -->
      <footer class="hp-footer">
        <div class="hp-container">
          <div class="hp-footer-bottom">
            <span>© 2025 AS Performance Chiptuning. All rights reserved.</span>
            <span class="hp-footer-tagline">Precision. <span class="hp-text-red">Power.</span> Performance.</span>
          </div>
        </div>
      </footer>
    </div>
  `;

  // Mobile menu
  const toggle = document.getElementById('hp-mobile-toggle');
  const links = document.querySelector('.hp-nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => links.classList.toggle('hp-mobile-open'));
  }
}
