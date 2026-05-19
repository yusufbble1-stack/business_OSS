// ===== Network / Partner Locations Page — 3D Globe =====
import Globe from 'globe.gl';
import { PARTNERS, COUNTRY_FLAGS, PARTNER_COUNT, COUNTRY_COUNT } from '../data/partners.js';

// Region groupings for filter bar
const REGIONS = {
  'Europe': ['Portugal','France','United Kingdom','Germany','Switzerland','Italy','Spain','Netherlands','Belgium','Denmark','Sweden','Norway','Poland','Czech Republic','Austria','Hungary','Romania','Croatia','Greece','Serbia','Bulgaria','North Macedonia','Albania','Kosovo','Turkey'],
  'Americas': ['USA','Canada','Colombia','Venezuela','Brazil'],
  'Middle East': ['UAE','Saudi Arabia','Qatar','Kuwait','Bahrain'],
  'Africa': ['Morocco','South Africa'],
  'Asia Pacific': ['China','Thailand','Japan','South Korea','Malaysia','Singapore','Australia','New Zealand']
};
function getRegion(country) {
  for (const [region, countries] of Object.entries(REGIONS)) {
    if (countries.includes(country)) return region;
  }
  return 'Other';
}

// Car SVG icon for map markers
const CAR_SVG = `<svg viewBox="0 0 24 14" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M3 7.5L5 3.5C5.5 2.5 6.5 2 7.5 2H16.5C17.5 2 18.5 2.5 19 3.5L21 7.5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
  <rect x="1" y="7" width="22" height="5" rx="2" fill="currentColor" opacity="0.3"/>
  <rect x="2" y="7.5" width="20" height="4" rx="1.5" stroke="currentColor" stroke-width="0.8"/>
  <circle cx="6.5" cy="12" r="1.8" fill="currentColor"/>
  <circle cx="17.5" cy="12" r="1.8" fill="currentColor"/>
  <rect x="8" y="3.5" width="3" height="3.5" rx="0.5" fill="currentColor" opacity="0.15" stroke="currentColor" stroke-width="0.4"/>
  <rect x="12" y="3.5" width="4" height="3.5" rx="0.5" fill="currentColor" opacity="0.15" stroke="currentColor" stroke-width="0.4"/>
</svg>`;

let globeInstance = null;

function createMarkerEl(partner) {
  const el = document.createElement('div');
  el.className = 'globe-marker';
  el.innerHTML = `
    <div class="globe-marker-car">${CAR_SVG}</div>
    <div class="globe-marker-pulse"></div>
    <div class="globe-marker-label">${partner.city}</div>
  `;
  el.addEventListener('mouseenter', () => showInfoCard(partner));
  el.addEventListener('mouseleave', hideInfoCard);
  el.addEventListener('click', () => scrollToPartnerCard(partner));
  return el;
}

function showInfoCard(partner) {
  const info = document.getElementById('nw-globe-info');
  if (!info) return;
  document.getElementById('nw-info-flag').textContent = COUNTRY_FLAGS[partner.country] || '🌍';
  document.getElementById('nw-info-partner').textContent = partner.partner;
  document.getElementById('nw-info-city').textContent = `${partner.city}, ${partner.country}`;
  document.getElementById('nw-info-tags').innerHTML = partner.specialties.map(s =>
    `<span class="nw-specialty-tag">${s}</span>`
  ).join('');
  info.style.display = 'flex';
}

function hideInfoCard() {
  const info = document.getElementById('nw-globe-info');
  if (info) info.style.display = 'none';
}

function scrollToPartnerCard(partner) {
  const idx = PARTNERS.indexOf(partner);
  const card = document.querySelector(`.nw-partner-card[data-idx="${idx}"]`);
  if (card) {
    card.scrollIntoView({ behavior: 'smooth', block: 'center' });
    card.style.borderColor = '#C41E1E';
    card.style.boxShadow = '0 0 25px rgba(196,30,30,0.3)';
    setTimeout(() => { card.style.borderColor = ''; card.style.boxShadow = ''; }, 2500);
  }
}

export function renderNetworkPage() {
  const app = document.getElementById('app');
  const countries = [...new Set(PARTNERS.map(p => p.country))];
  const regionNames = Object.keys(REGIONS);

  app.innerHTML = `
    <div class="hp-page">
      <nav class="hp-nav scrolled">
        <div class="hp-nav-inner">
          <a href="#/home" class="hp-nav-brand" style="text-decoration:none">
            <img src="/assets/logo.png" alt="AS Performance" class="hp-logo"/>
            <div>
              <span class="hp-brand-name">AS</span>
              <span class="hp-brand-bold">Performance</span>
              <span class="hp-brand-sub">chiptuning</span>
            </div>
          </a>
          <div class="hp-nav-pill">
            <a href="#/home" class="hp-nav-link">Home</a>
            <a href="#/pricing" class="hp-nav-link">Pricing</a>
            <a href="#/credits" class="hp-nav-link">Credits</a>
            <a href="#/network" class="hp-nav-link active">Network</a>
            <a href="#/gains" class="hp-nav-link">Calculator</a>
          </div>
          <div class="hp-nav-actions">
            <a href="mailto:asperformance.contact@gmail.com" class="hp-nav-cta">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              Contact Us
            </a>
            <a href="#/login" class="hp-nav-login">Partner Login</a>
          </div>
          <button class="hp-mobile-toggle" id="hp-mobile-toggle">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          </button>
        </div>
        <div class="hp-mobile-nav" id="hp-mobile-nav">
          <a href="#/home">Home</a>
          <a href="#/pricing">Pricing</a>
          <a href="#/credits">Credits</a>
          <a href="#/network">Network</a>
          <a href="#/gains">Calculator</a>
          <div class="hp-mobile-nav-actions">
            <a href="mailto:asperformance.contact@gmail.com" class="hp-nav-cta">Contact Us</a>
            <a href="#/login" class="hp-nav-login">Partner Login</a>
          </div>
        </div>
      </nav>
      <div class="hp-mobile-backdrop" id="hp-mobile-backdrop"></div>

      <!-- Network Hero -->
      <section class="nw-hero">
        <div class="nw-hero-content">
          <span class="hp-section-tag">Partner Network</span>
          <h1>Find a Certified <span class="hp-text-red">Partner</span> Near You</h1>
          <p>Our growing network of professional tuning partners ensures expert service close to your location.</p>
          <div class="nw-hero-stats">
            <div class="nw-mini-stat"><strong>${PARTNER_COUNT}+</strong><span>Locations</span></div>
            <div class="nw-mini-stat"><strong>${COUNTRY_COUNT}</strong><span>Countries</span></div>
            <div class="nw-mini-stat"><strong>100%</strong><span>Certified</span></div>
          </div>
        </div>
      </section>

      <!-- 3D Globe — no borders, native look -->
      <section class="nw-globe-section">
        <div class="nw-globe-full">
          <div id="nw-globe-container" class="nw-globe-container"></div>
          <div class="nw-globe-info" id="nw-globe-info" style="display:none">
            <div class="nw-globe-info-flag" id="nw-info-flag"></div>
            <div class="nw-globe-info-body">
              <h4 id="nw-info-partner"></h4>
              <span id="nw-info-city"></span>
              <div class="nw-globe-info-tags" id="nw-info-tags"></div>
            </div>
          </div>
          <div class="nw-globe-hint">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
            Grab to spin · Scroll to zoom in/out · Hover a location for details
          </div>
        </div>
      </section>

      <!-- Partner Cards — Premium Glassmorphism -->
      <section class="nw-partners-section">
        <div class="hp-container">
          <div class="hp-section-header">
            <span class="hp-section-tag">Our Network</span>
            <h2>Certified <span class="hp-text-red">Partners</span> Worldwide</h2>
          </div>
          <div class="nw-filter-bar">
            <button class="nw-filter-btn nw-filter-active" data-filter="all">🌍 All Regions</button>
            ${regionNames.map(r => `<button class="nw-filter-btn" data-filter="${r}">📍 ${r}</button>`).join('')}
          </div>
          <div class="nw-partner-grid" id="nw-partner-grid">
            ${PARTNERS.map((p, i) => `
              <div class="nw-card-glass nw-scroll-reveal" data-country="${p.country}" data-region="${getRegion(p.country)}" data-idx="${i}" style="--reveal-delay:${Math.min(i, 20) * 60}ms">
                <div class="nw-card-num">${String(i + 1).padStart(2, '0')}</div>
                <div class="nw-card-glow"></div>
                <div class="nw-card-content">
                  <div class="nw-card-head">
                    <span class="nw-card-flag">${COUNTRY_FLAGS[p.country] || '🌍'}</span>
                    <div class="nw-card-status"><span class="nw-status-dot"></span>Active</div>
                  </div>
                  <h3 class="nw-card-title">${p.partner}</h3>
                  <span class="nw-card-location">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                    ${p.city}, ${p.country}
                  </span>
                  <div class="nw-card-tags">
                    ${p.specialties.map(s => `<span class="nw-card-tag">${s}</span>`).join('')}
                  </div>
                  <div class="nw-card-actions">
                    <a href="mailto:asperformance.contact@gmail.com" class="nw-card-btn-primary">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                      Contact
                    </a>
                    <a href="https://maps.google.com/?q=${p.lat},${p.lng}" target="_blank" class="nw-card-btn-ghost">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                      Directions
                    </a>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

      <!-- CTA -->
      <section class="hp-cta">
        <div class="hp-container">
          <div class="hp-cta-inner">
            <h2>Want to <span class="hp-text-red">Join Our Network</span>?</h2>
            <p>We're always looking for professional tuning workshops to expand our worldwide coverage.</p>
            <div class="hp-cta-btns">
              <a href="mailto:asperformance.contact@gmail.com" class="hp-btn-primary hp-btn-lg">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/></svg>
                Apply as Partner
              </a>
            </div>
          </div>
        </div>
      </section>

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

  // Small delay to let DOM settle before initializing WebGL
  requestAnimationFrame(() => {
    initGlobe();
    initNetworkEvents();
  });
}

function initGlobe() {
  const container = document.getElementById('nw-globe-container');
  if (!container) return;

  // Cleanup previous instance
  if (globeInstance) {
    try { globeInstance._destructor && globeInstance._destructor(); } catch(e) {}
    container.innerHTML = '';
    globeInstance = null;
  }

  // Arcs from Paris HQ to regional hubs only (performance + visual clarity)
  const HQ = { lat: 48.86, lng: 2.35 };
  const hubCities = ['Dubai','New York','Los Angeles','São Paulo','Beijing','Bangkok','Casablanca','Istanbul','London','Toronto','Sydney','Bogotá','Riyadh','Tokyo','Copenhagen','Belgrade'];
  const arcsData = PARTNERS
    .filter(p => hubCities.includes(p.city))
    .map(p => ({
      startLat: HQ.lat, startLng: HQ.lng,
      endLat: p.dLat, endLng: p.dLng,
      color: ['rgba(196,30,30,0.5)', 'rgba(196,30,30,0.08)']
    }));

  // Pulsating rings — sample every 3rd partner for performance
  const ringsData = PARTNERS.filter((_, i) => i % 3 === 0).map((p, i) => ({
    lat: p.dLat, lng: p.dLng,
    maxR: 2,
    propagationSpeed: 1.5,
    repeatPeriod: 1500 + (i * 150)
  }));

  const globe = new Globe(container, {
    animateIn: true,
    waitForGlobeReady: true,
    rendererConfig: { antialias: true, alpha: true }
  })
    .width(container.offsetWidth)
    .height(600)
    .backgroundColor('rgba(0,0,0,0)')

    // Dark texture (the one you liked)
    .globeImageUrl('https://unpkg.com/three-globe/example/img/earth-dark.jpg')
    .bumpImageUrl('https://unpkg.com/three-globe/example/img/earth-topology.png')
    .showAtmosphere(true)
    .atmosphereColor('#C41E1E')
    .atmosphereAltitude(0.18)
    .showGraticules(false)

    // Car markers — display coordinates for spacing
    .htmlElementsData(PARTNERS)
    .htmlLat(d => d.dLat)
    .htmlLng(d => d.dLng)
    .htmlAltitude(0.02)
    .htmlElement(d => createMarkerEl(d))
    .htmlTransitionDuration(800)

    // Arcs
    .arcsData(arcsData)
    .arcColor('color')
    .arcDashLength(0.5)
    .arcDashGap(0.3)
    .arcDashAnimateTime(3000)
    .arcStroke(0.35)
    .arcAltitudeAutoScale(0.25)

    // Rings
    .ringsData(ringsData)
    .ringLat(d => d.lat)
    .ringLng(d => d.lng)
    .ringColor(() => t => `rgba(196,30,30,${Math.max(0, 1 - t)})`)
    .ringMaxRadius('maxR')
    .ringPropagationSpeed('propagationSpeed')
    .ringRepeatPeriod('repeatPeriod');

  // Center on Europe
  globe.pointOfView({ lat: 25, lng: 20, altitude: 2.5 }, 2000);

  // Controls
  const controls = globe.controls();
  controls.enableDamping = true;
  controls.dampingFactor = 0.15;
  controls.rotateSpeed = 0.6;
  controls.zoomSpeed = 0.8;
  controls.enableZoom = true;
  controls.minDistance = 120;
  controls.maxDistance = 500;
  controls.enablePan = false;

  // Auto-rotation ON by default
  controls.autoRotate = true;
  controls.autoRotateSpeed = 0.35;

  // Pause auto-rotate when user interacts, resume after 6s idle
  let resumeTimer = null;
  const pauseAutoRotate = () => {
    controls.autoRotate = false;
    clearTimeout(resumeTimer);
  };
  const scheduleResume = () => {
    clearTimeout(resumeTimer);
    resumeTimer = setTimeout(() => { controls.autoRotate = true; }, 6000);
  };

  container.addEventListener('pointerdown', pauseAutoRotate);
  container.addEventListener('pointerup', scheduleResume);
  container.addEventListener('touchstart', pauseAutoRotate, { passive: true });
  container.addEventListener('touchend', scheduleResume);

  // FIX: Prevent scroll-zoom from scrolling the page
  container.addEventListener('wheel', (e) => {
    e.preventDefault();
    e.stopPropagation();
  }, { passive: false });

  // Also pause auto-rotate on wheel zoom
  container.addEventListener('wheel', () => {
    pauseAutoRotate();
    scheduleResume();
  });

  // Resize handler
  const ro = new ResizeObserver(() => {
    const w = container.offsetWidth;
    globe.width(w).height(Math.min(600, w * 0.55));
  });
  ro.observe(container);

  globeInstance = globe;
}

function initNetworkEvents() {
  // Region filter
  const filterBtns = document.querySelectorAll('.nw-filter-btn');
  const cards = document.querySelectorAll('.nw-card-glass');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('nw-filter-active'));
      btn.classList.add('nw-filter-active');
      const filter = btn.dataset.filter;
      cards.forEach(card => {
        if (filter === 'all' || card.dataset.region === filter) {
          card.style.display = '';
          card.classList.remove('nw-revealed');
          requestAnimationFrame(() => card.classList.add('nw-revealed'));
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Scroll-reveal: animate cards as they enter viewport
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('nw-revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.nw-scroll-reveal').forEach(el => revealObserver.observe(el));

  // Mobile menu
  const toggle = document.getElementById('hp-mobile-toggle');
  const mobileNav = document.getElementById('hp-mobile-nav');
  const backdrop = document.getElementById('hp-mobile-backdrop');

  if (toggle && mobileNav) {
    const closeMobileNav = () => {
      mobileNav.classList.remove('hp-mobile-open');
      if (backdrop) backdrop.classList.remove('visible');
      document.body.style.overflow = '';
    };
    const openMobileNav = () => {
      mobileNav.classList.add('hp-mobile-open');
      if (backdrop) backdrop.classList.add('visible');
      document.body.style.overflow = 'hidden';
    };

    toggle.addEventListener('click', () => {
      if (mobileNav.classList.contains('hp-mobile-open')) closeMobileNav();
      else openMobileNav();
    });

    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMobileNav);
    });

    if (backdrop) backdrop.addEventListener('click', closeMobileNav);
  }
}
