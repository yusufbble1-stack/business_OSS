import { renderSidebar, renderHeader, initLayoutEvents } from '../components/layout.js';
import { icon, refreshIcons } from '../lib/icons.js';
import { getTypes, getBrands, getModels, getGenerations, getEngines, getSpecs, typeLabels, typeIcons } from '../lib/vehicle-data.js';
import { getCurrentUser } from '../lib/auth.js';

let currentSpecs = null;
let currentSelection = null;
let currentStage = 'stage1';

function buildGauge(value, max, cls, color) {
  const r = 42, c = 2 * Math.PI * r;
  const pct = Math.min(value / max, 1);
  const offset = c * (1 - pct);
  return `<div class="gains-gauge">
    <svg viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="${r}" class="gains-gauge-bg"/>
      <circle cx="50" cy="50" r="${r}" class="gains-gauge-fill ${cls}-fill" stroke="${color || ''}" stroke-dasharray="${c}" stroke-dashoffset="${offset}"/>
    </svg>
    <div class="gains-gauge-center">
      <span class="gains-gauge-value count-up" data-target="${value}">0</span>
      <span class="gains-gauge-unit ${cls}-unit" ${color ? `style="background:${color}"` : ''}>${cls === 'hp' ? 'Hp' : 'Nm'}</span>
    </div>
  </div>`;
}

function renderResults(type, brand, model, gen, engine, specs, stage = 'stage1') {
  const hpGainStg1 = specs.hp1 - specs.hp;
  const nmGainStg1 = specs.nm1 - specs.nm;
  
  let targetHp, targetNm, stageName, stageColor, stageIcon, stageDesc;
  
  if (stage === 'eco') {
    targetHp = specs.hp + Math.round(hpGainStg1 * 0.4);
    targetNm = specs.nm + Math.round(nmGainStg1 * 0.65);
    stageName = 'Eco Tune';
    stageColor = '#22c55e'; // Green
    stageIcon = 'leaf';
    stageDesc = 'Optimized for fuel efficiency and smoother torque delivery. Up to 15% fuel savings.';
  } else if (stage === 'stage2') {
    targetHp = specs.hp + Math.round(hpGainStg1 * 1.35);
    targetNm = specs.nm + Math.round(nmGainStg1 * 1.25);
    stageName = 'Stage 2';
    stageColor = '#a855f7'; // Purple
    stageIcon = 'rocket';
    stageDesc = 'Maximum safe performance. Hardware modifications (downpipe, intake) recommended.';
  } else {
    targetHp = specs.hp1;
    targetNm = specs.nm1;
    stageName = 'Stage 1';
    stageColor = '#FF6B6B'; // Red
    stageIcon = 'zap';
    stageDesc = 'Best balance of power and reliability. No hardware modifications required.';
  }

  const hpGain = targetHp - specs.hp;
  const nmGain = targetNm - specs.nm;
  const hpPct = Math.round((hpGain / specs.hp) * 100);
  const nmPct = Math.round((nmGain / specs.nm) * 100);
  const maxHp = Math.ceil(targetHp / 50) * 50 + 50;
  const maxNm = Math.ceil(targetNm / 100) * 100 + 100;
  const typeLabel = typeLabels[type] || type;
  const typeIcon = typeIcons[type] || 'car';
  const hpBarStock = Math.round((specs.hp / targetHp) * 100);
  const nmBarStock = Math.round((specs.nm / targetNm) * 100);
  
  // Efficiency rating based on gain percentage
  const avgPct = (hpPct + nmPct) / 2;
  const rating = avgPct >= 25 ? 'Exceptional' : avgPct >= 18 ? 'Excellent' : avgPct >= 12 ? 'Very Good' : 'Good';
  const ratingColor = avgPct >= 25 ? '#22c55e' : avgPct >= 18 ? '#3b82f6' : avgPct >= 12 ? '#f59e0b' : '#94a3b8';
  const stars = avgPct >= 25 ? 5 : avgPct >= 18 ? 4 : avgPct >= 12 ? 3 : 2;

  return `
  <div class="gains-results" id="gains-results-content">
    <!-- Vehicle Header -->
    <div class="gains-vehicle-header animate-in">
      <div class="gains-vehicle-info">
        <div class="gains-type-badge" style="--badge-color:${ratingColor}">${icon(typeIcon, 14)} ${typeLabel}</div>
        <h2>${brand} ${model}</h2>
        <span class="gains-gen-label">${gen} &bull; ${engine}</span>
      </div>
      <div class="gains-brand-logo">${brand.substring(0, 2).toUpperCase()}</div>
    </div>

    <!-- Stage Tabs -->
    <div class="gains-stage-tabs animate-in" style="animation-delay:0.04s">
      <button class="stage-tab ${stage === 'eco' ? 'active' : ''}" data-stage="eco" style="${stage === 'eco' ? `border-color:${stageColor}; color:${stageColor}; background:rgba(34,197,94,0.1)` : ''}">
        ${icon('leaf', 16)} Eco Tune
      </button>
      <button class="stage-tab ${stage === 'stage1' ? 'active' : ''}" data-stage="stage1" style="${stage === 'stage1' ? `border-color:${stageColor}; color:${stageColor}; background:rgba(255,107,107,0.1)` : ''}">
        ${icon('zap', 16)} Stage 1
      </button>
      <button class="stage-tab ${stage === 'stage2' ? 'active' : ''}" data-stage="stage2" style="${stage === 'stage2' ? `border-color:${stageColor}; color:${stageColor}; background:rgba(168,85,247,0.1)` : ''}">
        ${icon('rocket', 16)} Stage 2
      </button>
    </div>
    
    <div class="gains-stage-desc animate-in" style="animation-delay:0.06s">
      ${icon('info', 16)} ${stageDesc}
    </div>

    <!-- Tuning Rating -->
    <div class="gains-rating-card animate-in" style="animation-delay:0.08s">
      <div class="gains-rating-left">
        <div class="gains-rating-label">Tuning Efficiency Rating</div>
        <div class="gains-rating-stars">${'★'.repeat(stars)}${'☆'.repeat(5 - stars)}</div>
        <div class="gains-rating-text" style="color:${ratingColor}">${rating}</div>
      </div>
      <div class="gains-rating-right">
        <div class="gains-rating-stat"><span class="gains-rating-num" style="color:${stageColor}">+${hpGain}</span><span class="gains-rating-unit">HP</span></div>
        <div class="gains-rating-divider"></div>
        <div class="gains-rating-stat"><span class="gains-rating-num" style="color:#FBBF24">+${nmGain}</span><span class="gains-rating-unit">Nm</span></div>
        <div class="gains-rating-divider"></div>
        <div class="gains-rating-stat"><span class="gains-rating-num" style="color:#22c55e">+${Math.round(avgPct)}%</span><span class="gains-rating-unit">AVG</span></div>
      </div>
    </div>

    <!-- Power & Torque -->
    <div class="gains-power-grid">
      <div class="gains-power-card hp-card animate-in" style="animation-delay:0.1s; --card-theme:${stageColor}">
        <div class="card-bg-icon">${icon('zap', 120)}</div>
        <h3>${icon('activity', 16)} Horsepower</h3>
        <div class="gains-gauge-row">
          ${buildGauge(specs.hp, maxHp, 'hp', '#94a3b8')}
          <div class="gains-spec-col">
            <h4>Standard</h4>
            <div class="gains-spec-val">${specs.hp} <small style="font-size:14px;color:var(--text-muted)">hp</small></div>
          </div>
        </div>
        <div class="gains-gauge-row">
          ${buildGauge(targetHp, maxHp, 'hp', stageColor)}
          <div class="gains-spec-col">
            <h4>${stageName}</h4>
            <div class="gains-spec-val" style="color:${stageColor}">${targetHp} <small style="font-size:14px;color:var(--text-muted)">hp</small></div>
          </div>
        </div>
        <div class="gains-compare-bar"><div class="gains-compare-label">Stock</div><div class="gains-bar-track"><div class="gains-bar-fill hp-bar" style="width:${hpBarStock}%; background:#475569"></div></div><div class="gains-compare-val">${specs.hp} hp</div></div>
        <div class="gains-compare-bar"><div class="gains-compare-label" style="color:${stageColor}">${stageName}</div><div class="gains-bar-track"><div class="gains-bar-fill hp-bar tuned" style="width:100%; background:${stageColor}"></div></div><div class="gains-compare-val" style="color:${stageColor}">${targetHp} hp</div></div>
        <div class="gains-diff-row hp-diff" style="background:${stageColor}15; border-color:${stageColor}30">
          <div class="gains-diff-icon hp-icon" style="background:${stageColor}20; color:${stageColor}">${icon('trending-up', 16)}</div>
          <div><div class="gains-diff-label">Power Gain</div></div>
          <div class="gains-diff-value hp-val" style="color:${stageColor}">+${hpGain} hp <small style="font-size:12px;opacity:0.7">(+${hpPct}%)</small></div>
        </div>
      </div>

      <div class="gains-power-card nm-card animate-in" style="animation-delay:0.2s">
        <div class="card-bg-icon">${icon('gauge', 120)}</div>
        <h3>${icon('gauge', 16)} Torque</h3>
        <div class="gains-gauge-row">
          ${buildGauge(specs.nm, maxNm, 'nm', '#94a3b8')}
          <div class="gains-spec-col">
            <h4>Standard</h4>
            <div class="gains-spec-val">${specs.nm} <small style="font-size:14px;color:var(--text-muted)">Nm</small></div>
          </div>
        </div>
        <div class="gains-gauge-row">
          ${buildGauge(targetNm, maxNm, 'nm', '#FBBF24')}
          <div class="gains-spec-col">
            <h4>${stageName}</h4>
            <div class="gains-spec-val" style="color:#FBBF24">${targetNm} <small style="font-size:14px;color:var(--text-muted)">Nm</small></div>
          </div>
        </div>
        <div class="gains-compare-bar"><div class="gains-compare-label">Stock</div><div class="gains-bar-track"><div class="gains-bar-fill nm-bar" style="width:${nmBarStock}%; background:#475569"></div></div><div class="gains-compare-val">${specs.nm} Nm</div></div>
        <div class="gains-compare-bar"><div class="gains-compare-label" style="color:#FBBF24">${stageName}</div><div class="gains-bar-track"><div class="gains-bar-fill nm-bar tuned" style="width:100%; background:#FBBF24"></div></div><div class="gains-compare-val" style="color:#FBBF24">${targetNm} Nm</div></div>
        <div class="gains-diff-row nm-diff">
          <div class="gains-diff-icon nm-icon">${icon('trending-up', 16)}</div>
          <div><div class="gains-diff-label">Torque Gain</div></div>
          <div class="gains-diff-value nm-val">+${nmGain} Nm <small style="font-size:12px;opacity:0.7">(+${nmPct}%)</small></div>
        </div>
      </div>
    </div>

    <!-- Engine Specs -->
    <div class="gains-specs animate-in" style="animation-delay:0.3s">
      <h3>${icon('cpu', 16)} Engine Specifications</h3>
      <div class="gains-specs-grid">
        <div class="gains-spec-item"><div class="spec-label">Vehicle Type</div><div class="spec-value flex-val">${icon(typeIcon, 14)} ${typeLabel}</div></div>
        <div class="gains-spec-item"><div class="spec-label">Motor Fuel</div><div class="spec-value flex-val">${icon('fuel', 14)} ${specs.fuel}</div></div>
        <div class="gains-spec-item"><div class="spec-label">Cylinder Capacity</div><div class="spec-value flex-val">${icon('database', 14)} ${specs.cc.toLocaleString()} cc</div></div>
        <div class="gains-spec-item"><div class="spec-label">Engine Code</div><div class="spec-value flex-val">${icon('settings', 14)} ${specs.code}</div></div>
        <div class="gains-spec-item"><div class="spec-label">ECU Type</div><div class="spec-value flex-val">${icon('cpu', 14)} ${specs.ecu}</div></div>
        <div class="gains-spec-item"><div class="spec-label">HP Gain %</div><div class="spec-value flex-val" style="color:${stageColor}">${icon('arrow-up-right', 14)} +${hpPct}%</div></div>
        <div class="gains-spec-item"><div class="spec-label">Torque Gain %</div><div class="spec-value flex-val" style="color:#FBBF24">${icon('arrow-up-right', 14)} +${nmPct}%</div></div>
        <div class="gains-spec-item"><div class="spec-label">Efficiency</div><div class="spec-value flex-val" style="color:${ratingColor}">${icon('award', 14)} ${rating}</div></div>
      </div>
    </div>

    <!-- Data Accuracy Notice -->
    <div class="gains-specs animate-in" style="animation-delay:0.35s; border-left:3px solid #f59e0b; background:rgba(245,158,11,0.04)">
      <h3 style="color:#f59e0b; font-size:13px; display:flex; align-items:center; gap:8px">${icon('alert-triangle', 16)} Data Accuracy Notice</h3>
      <p style="font-size:12px; color:var(--text-muted); line-height:1.6; margin:8px 0 0 0">
        The ECU type, power figures, and tuning gains shown above are <strong style="color:#fff">estimated reference values</strong> based on common configurations. Your vehicle's <strong style="color:#f59e0b">real ECU hardware may differ</strong> due to production variations, market-specific builds, or factory updates. Always verify your actual ECU reference using a <strong style="color:#fff">diagnostic scan</strong>, your <strong style="color:#fff">programming tool's Get ID function</strong>, or by <strong style="color:#fff">physically inspecting</strong> the ECU label before ordering a file service.
      </p>
    </div>
  </div>`;
}

function animateCountUp() {
  document.querySelectorAll('.count-up').forEach(el => {
    const target = parseInt(el.dataset.target, 10);
    const duration = 1200;
    const start = performance.now();
    function step(now) {
      const progress = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      el.textContent = Math.round(target * ease);
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  });
}

export function renderGainsPage() {
  const app = document.getElementById('app');
  const user = getCurrentUser();

  const gainsContent = `
    <div class="gains-page">
      <div class="gains-page-header animate-in">
        <h1>${icon('gauge', 24)} Gains Calculator</h1>
        <p>Select your vehicle to see the performance gains with our Stage 1 remap.</p>
      </div>

      <div class="gains-selector animate-in" style="animation-delay:0.05s">
        <h2>${icon('search', 16)} Select Your Vehicle</h2>
        
        <div class="gains-type-cards">
          ${getTypes().map(t => `
            <button class="gains-type-card" data-type="${t}">
              ${icon(typeIcons[t] || 'car', 24)}
              <span>${typeLabels[t] || t}</span>
            </button>
          `).join('')}
        </div>
        <select id="gains-type" style="display:none;"><option value="">Select type</option>${getTypes().map(t => `<option value="${t}">${typeLabels[t]}</option>`).join('')}</select>

        <div class="gains-select-grid">
          <div class="gains-select-group">
            <label>Brand</label>
            <select id="gains-brand" disabled><option value="">Select brand</option></select>
          </div>
          <div class="gains-select-group">
            <label>Model</label>
            <select id="gains-model" disabled><option value="">Select model</option></select>
          </div>
          <div class="gains-select-group">
            <label>Year / Generation</label>
            <select id="gains-gen" disabled><option value="">Select generation</option></select>
          </div>
          <div class="gains-select-group">
            <label>Engine</label>
            <select id="gains-engine" disabled><option value="">Select engine</option></select>
          </div>
        </div>
        <button class="btn btn-primary gains-view-btn" id="gains-view-btn" disabled>${icon('zap', 16)} View Gains</button>
      </div>

      <div id="gains-results-area"></div>
    </div>
  `;

  if (user) {
    // Authenticated view with sidebar
    app.innerHTML = `
      <div class="app-layout">
      ${renderSidebar()}
      <main class="app-main">
        ${renderHeader()}
        <div class="page-content">
          ${gainsContent}
        </div>
      </main>
      </div>`;
    initLayoutEvents();
  } else {
    // Public standalone view
    app.innerHTML = `
      <div class="hp-page">
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
              <a href="#/pricing" class="hp-nav-link">Pricing</a>
              <a href="#/credits" class="hp-nav-link">Credits</a>
              <a href="#/network" class="hp-nav-link">Network</a>
              <a href="#/gains" class="hp-nav-link active">Calculator</a>
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
        <div style="padding-top:100px;max-width:1200px;margin:0 auto;padding-left:32px;padding-right:32px;padding-bottom:60px">
          ${gainsContent}
        </div>
        <footer class="hp-footer">
          <div class="hp-container">
            <div class="hp-footer-bottom">
              <span>© 2025 AS Performance Chiptuning. All rights reserved.</span>
              <span class="hp-footer-tagline">Precision. <span class="hp-text-red">Power.</span> Performance.</span>
            </div>
          </div>
        </footer>
      </div>`;

    // Mobile toggle
    const toggle = document.getElementById('hp-mobile-toggle');
    const links = document.querySelector('.hp-nav-links');
    if (toggle && links) {
      toggle.addEventListener('click', () => links.classList.toggle('hp-mobile-open'));
    }
  }

  refreshIcons();
  initGainsEvents();
}

function resetSelect(el, placeholder) {
  el.innerHTML = `<option value="">${placeholder}</option>`;
  el.disabled = true;
}

function populateSelect(el, items, placeholder) {
  el.innerHTML = `<option value="">${placeholder}</option>` + items.map(i => `<option value="${i}">${i}</option>`).join('');
  el.disabled = false;
}

function initGainsEvents() {
  const typeEl = document.getElementById('gains-type');
  const brandEl = document.getElementById('gains-brand');
  const modelEl = document.getElementById('gains-model');
  const genEl = document.getElementById('gains-gen');
  const engineEl = document.getElementById('gains-engine');
  const viewBtn = document.getElementById('gains-view-btn');
  const resultsArea = document.getElementById('gains-results-area');
  const typeCards = document.querySelectorAll('.gains-type-card');

  typeCards.forEach(card => {
    card.addEventListener('click', () => {
      typeCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      typeEl.value = card.dataset.type;
      typeEl.dispatchEvent(new Event('change'));
    });
  });

  typeEl.addEventListener('change', () => {
    const type = typeEl.value;
    resetSelect(modelEl, 'Select model');
    resetSelect(genEl, 'Select generation');
    resetSelect(engineEl, 'Select engine');
    viewBtn.disabled = true;
    resultsArea.innerHTML = '';
    if (type) {
      populateSelect(brandEl, getBrands(type), 'Select brand');
    } else {
      resetSelect(brandEl, 'Select brand');
    }
  });

  brandEl.addEventListener('change', () => {
    const type = typeEl.value, brand = brandEl.value;
    resetSelect(genEl, 'Select generation');
    resetSelect(engineEl, 'Select engine');
    viewBtn.disabled = true;
    resultsArea.innerHTML = '';
    if (brand) {
      populateSelect(modelEl, getModels(type, brand), 'Select model');
    } else {
      resetSelect(modelEl, 'Select model');
    }
  });

  modelEl.addEventListener('change', () => {
    const type = typeEl.value, brand = brandEl.value, model = modelEl.value;
    resetSelect(engineEl, 'Select engine');
    viewBtn.disabled = true;
    resultsArea.innerHTML = '';
    if (model) {
      populateSelect(genEl, getGenerations(type, brand, model), 'Select generation');
    } else {
      resetSelect(genEl, 'Select generation');
    }
  });

  genEl.addEventListener('change', () => {
    const type = typeEl.value, brand = brandEl.value, model = modelEl.value, gen = genEl.value;
    viewBtn.disabled = true;
    resultsArea.innerHTML = '';
    if (gen) {
      populateSelect(engineEl, getEngines(type, brand, model, gen), 'Select engine');
    } else {
      resetSelect(engineEl, 'Select engine');
    }
  });

  engineEl.addEventListener('change', () => {
    viewBtn.disabled = !engineEl.value;
  });

  viewBtn.addEventListener('click', () => {
    const type = typeEl.value, brand = brandEl.value, model = modelEl.value, gen = genEl.value, engine = engineEl.value;
    const specs = getSpecs(type, brand, model, gen, engine);
    if (!specs) return;
    currentSpecs = specs;
    currentSelection = { type, brand, model, gen, engine };
    currentStage = 'stage1'; // Default
    updateResults();
  });

  function updateResults() {
    if (!currentSpecs || !currentSelection) return;
    const { type, brand, model, gen, engine } = currentSelection;
    resultsArea.innerHTML = renderResults(type, brand, model, gen, engine, currentSpecs, currentStage);
    refreshIcons();
    
    // Add event listeners to tabs
    document.querySelectorAll('.stage-tab').forEach(tab => {
      tab.addEventListener('click', (e) => {
        currentStage = e.currentTarget.dataset.stage;
        updateResults();
      });
    });

    // Trigger gauge and count animations after render
    requestAnimationFrame(() => {
      animateCountUp();
      resultsArea.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }
}
