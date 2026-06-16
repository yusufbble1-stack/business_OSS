import { renderSidebar, renderHeader, initLayoutEvents } from '../components/layout.js';
import { icon, refreshIcons } from '../lib/icons.js';
import { getLang, setLang, t } from '../lib/i18n.js';
import { getTypes, getBrands, getModels, getGenerations, getEngines, getSpecs, typeLabels, typeIcons } from '../lib/vehicle-data.js';
import { getCurrentUser } from '../lib/auth.js';
import { getBrandLogo } from '../lib/brand-logos.js';

let currentSpecs = null;
let currentSelection = null;
let currentStage = 'stage1';

function renderBrandLogo(brand) {
  const src = getBrandLogo(brand);
  return `<img src="${src}" alt="${brand}" class="gains-brand-logo-img">`;
}

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
    // Eco tune: prioritize torque for driveability, less HP gain
    // Diesel eco = big torque gain for fuel savings; Petrol eco = mild all-round
    const isDiesel = specs.fuel === 'Diesel';
    targetHp = specs.hp + Math.round(hpGainStg1 * (isDiesel ? 0.30 : 0.40));
    targetNm = specs.nm + Math.round(nmGainStg1 * (isDiesel ? 0.70 : 0.55));
    stageName = getLang() === 'fr' ? 'Reprog ECO' : 'Eco Tune';
    stageColor = '#22c55e'; // Green
    stageIcon = 'leaf';
    stageDesc = getLang() === 'fr' ? 'Optimisé pour la consommation de carburant et la souplesse du couple. Jusqu\'à 15% d\'économie.' : 'Optimized for fuel efficiency and smoother torque delivery. Up to 15% fuel savings.';
  } else if (stage === 'stage2') {
    // Stage 2: hardware mods (downpipe/intake/intercooler) unlock more potential
    // Diesel benefits more from exhaust mods; Petrol from intake + downpipe
    const isDiesel = specs.fuel === 'Diesel';
    const isNA = specs.fuel === 'Gasoline' && hpGainStg1 < (specs.hp * 0.10); // NA engines have small Stage 1 gains
    if (isNA) {
      // NA Stage 2 is limited without forced induction
      targetHp = specs.hp + Math.round(hpGainStg1 * 1.6);
      targetNm = specs.nm + Math.round(nmGainStg1 * 1.5);
    } else {
      targetHp = specs.hp + Math.round(hpGainStg1 * (isDiesel ? 1.40 : 1.30));
      targetNm = specs.nm + Math.round(nmGainStg1 * (isDiesel ? 1.30 : 1.22));
    }
    stageName = 'Stage 2';
    stageColor = '#a855f7'; // Purple
    stageIcon = 'rocket';
    stageDesc = getLang() === 'fr' ? 'Performances maximales de sécurité. Pièces mécaniques (downpipe, admission) fortement recommandées.' : 'Maximum safe performance. Hardware modifications (downpipe, intake) recommended.';
  } else {
    targetHp = specs.hp1;
    targetNm = specs.nm1;
    stageName = 'Stage 1';
    stageColor = '#FF6B6B'; // Red
    stageIcon = 'zap';
    stageDesc = getLang() === 'fr' ? 'Le meilleur compromis entre puissance et fiabilité. Aucune modification mécanique requise.' : 'Best balance of power and reliability. No hardware modifications required.';
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
  const rating = avgPct >= 25 ? (getLang() === 'fr' ? 'Exceptionnel' : 'Exceptional') : avgPct >= 18 ? (getLang() === 'fr' ? 'Excellent' : 'Excellent') : avgPct >= 12 ? (getLang() === 'fr' ? 'Très Bon' : 'Very Good') : (getLang() === 'fr' ? 'Bon' : 'Good');
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
      <div class="gains-brand-logo">${renderBrandLogo(brand)}</div>
    </div>

    <!-- Stage Tabs -->
    <div class="gains-stage-tabs animate-in" style="animation-delay:0.04s">
      <button class="stage-tab ${stage === 'eco' ? 'active' : ''}" data-stage="eco" style="${stage === 'eco' ? `border-color:${stageColor}; color:${stageColor}; background:rgba(34,197,94,0.1)` : ''}">
        ${icon('leaf', 16)} ${getLang() === 'fr' ? 'Reprog ECO' : 'Eco Tune'}
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
        <div class="gains-rating-label">${getLang() === 'fr' ? 'Indice d\'efficacité du tuning' : 'Tuning Efficiency Rating'}</div>
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
        <h3>${icon('activity', 16)} ${getLang() === 'fr' ? 'Puissance' : 'Horsepower'}</h3>
        <div class="gains-gauge-row">
          ${buildGauge(specs.hp, maxHp, 'hp', '#94a3b8')}
          <div class="gains-spec-col">
            <h4>${getLang() === 'fr' ? 'Origine' : 'Standard'}</h4>
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
        <div class="gains-compare-bar"><div class="gains-compare-label">${getLang() === 'fr' ? 'Origine' : 'Stock'}</div><div class="gains-bar-track"><div class="gains-bar-fill hp-bar" style="width:${hpBarStock}%; background:#475569"></div></div><div class="gains-compare-val">${specs.hp} hp</div></div>
        <div class="gains-compare-bar"><div class="gains-compare-label" style="color:${stageColor}">${stageName}</div><div class="gains-bar-track"><div class="gains-bar-fill hp-bar tuned" style="width:100%; background:${stageColor}"></div></div><div class="gains-compare-val" style="color:${stageColor}">${targetHp} hp</div></div>
        <div class="gains-diff-row hp-diff" style="background:${stageColor}15; border-color:${stageColor}30">
          <div class="gains-diff-icon hp-icon" style="background:${stageColor}20; color:${stageColor}">${icon('trending-up', 16)}</div>
          <div><div class="gains-diff-label">${getLang() === 'fr' ? 'Gain de Puissance' : 'Power Gain'}</div></div>
          <div class="gains-diff-value hp-val" style="color:${stageColor}">+${hpGain} hp <small style="font-size:12px;opacity:0.7">(+${hpPct}%)</small></div>
        </div>
      </div>

      <div class="gains-power-card nm-card animate-in" style="animation-delay:0.2s">
        <div class="card-bg-icon">${icon('gauge', 120)}</div>
        <h3>${icon('gauge', 16)} ${getLang() === 'fr' ? 'Couple' : 'Torque'}</h3>
        <div class="gains-gauge-row">
          ${buildGauge(specs.nm, maxNm, 'nm', '#94a3b8')}
          <div class="gains-spec-col">
            <h4>${getLang() === 'fr' ? 'Origine' : 'Standard'}</h4>
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
        <div class="gains-compare-bar"><div class="gains-compare-label">${getLang() === 'fr' ? 'Origine' : 'Stock'}</div><div class="gains-bar-track"><div class="gains-bar-fill nm-bar" style="width:${nmBarStock}%; background:#475569"></div></div><div class="gains-compare-val">${specs.nm} Nm</div></div>
        <div class="gains-compare-bar"><div class="gains-compare-label" style="color:#FBBF24">${stageName}</div><div class="gains-bar-track"><div class="gains-bar-fill nm-bar tuned" style="width:100%; background:#FBBF24"></div></div><div class="gains-compare-val" style="color:#FBBF24">${targetNm} Nm</div></div>
        <div class="gains-diff-row nm-diff">
          <div class="gains-diff-icon nm-icon">${icon('trending-up', 16)}</div>
          <div><div class="gains-diff-label">${getLang() === 'fr' ? 'Gain de Couple' : 'Torque Gain'}</div></div>
          <div class="gains-diff-value nm-val">+${nmGain} Nm <small style="font-size:12px;opacity:0.7">(+${nmPct}%)</small></div>
        </div>
      </div>
    </div>

    <!-- Engine Specs -->
    <div class="gains-specs animate-in" style="animation-delay:0.3s">
      <h3>${icon('cpu', 16)} ${getLang() === 'fr' ? 'Spécifications Moteur' : 'Engine Specifications'}</h3>
      <div class="gains-specs-grid">
        <div class="gains-spec-item"><div class="spec-label">${getLang() === 'fr' ? 'Type de Véhicule' : 'Vehicle Type'}</div><div class="spec-value flex-val">${icon(typeIcon, 14)} ${typeLabel}</div></div>
        <div class="gains-spec-item"><div class="spec-label">${getLang() === 'fr' ? 'Carburant' : 'Motor Fuel'}</div><div class="spec-value flex-val">${icon('fuel', 14)} ${specs.fuel === 'Diesel' ? (getLang() === 'fr' ? 'Diesel' : 'Diesel') : specs.fuel === 'Petrol' ? (getLang() === 'fr' ? 'Essence' : 'Petrol') : specs.fuel}</div></div>
        <div class="gains-spec-item"><div class="spec-label">${getLang() === 'fr' ? 'Cylindrée' : 'Cylinder Capacity'}</div><div class="spec-value flex-val">${icon('database', 14)} ${specs.cc.toLocaleString()} cc</div></div>
        <div class="gains-spec-item"><div class="spec-label">${getLang() === 'fr' ? 'Code Moteur' : 'Engine Code'}</div><div class="spec-value flex-val">${icon('settings', 14)} ${specs.code}</div></div>
        <div class="gains-spec-item"><div class="spec-label">${getLang() === 'fr' ? 'Type de Calculateur' : 'ECU Type'}</div><div class="spec-value flex-val">${icon('cpu', 14)} ${specs.ecu}</div></div>
        <div class="gains-spec-item"><div class="spec-label">${getLang() === 'fr' ? 'Gain Puissance %' : 'HP Gain %'}</div><div class="spec-value flex-val" style="color:${stageColor}">${icon('arrow-up-right', 14)} +${hpPct}%</div></div>
        <div class="gains-spec-item"><div class="spec-label">${getLang() === 'fr' ? 'Gain Couple %' : 'Torque Gain %'}</div><div class="spec-value flex-val" style="color:#FBBF24">${icon('arrow-up-right', 14)} +${nmPct}%</div></div>
        <div class="gains-spec-item"><div class="spec-label">${getLang() === 'fr' ? 'Efficacité' : 'Efficiency'}</div><div class="spec-value flex-val" style="color:${ratingColor}">${icon('award', 14)} ${rating}</div></div>
      </div>
    </div>

    <!-- Data Accuracy Notice -->
    <div class="gains-specs animate-in" style="animation-delay:0.35s; border-left:3px solid #f59e0b; background:rgba(245,158,11,0.04)">
      <h3 style="color:#f59e0b; font-size:13px; display:flex; align-items:center; gap:8px">${icon('alert-triangle', 16)} ${getLang() === 'fr' ? 'Avis de précision des données' : 'Data Accuracy Notice'}</h3>
      <p style="font-size:12px; color:var(--text-muted); line-height:1.6; margin:8px 0 0 0">
        ${getLang() === 'fr'
          ? `Le type d'ECU, les chiffres de puissance et les gains affichés ci-dessus sont des <strong style="color:#fff">valeurs de référence estimées</strong> basées sur les configurations courantes. Le matériel ECU <strong style="color:#f59e0b">réel de votre véhicule peut différer</strong> en raison de variations de production ou de mises à jour d'usine. Vérifiez toujours la référence réelle de votre ECU à l'aide d'un <strong style="color:#fff">scan de diagnostic</strong> ou en <strong style="color:#fff">inspectant physiquement</strong> l'étiquette de l'ECU avant de commander.`
          : `The ECU type, power figures, and tuning gains shown above are <strong style="color:#fff">estimated reference values</strong> based on common configurations. Your vehicle's <strong style="color:#f59e0b">real ECU hardware may differ</strong> due to production variations, market-specific builds, or factory updates. Always verify your actual ECU reference using a <strong style="color:#fff">diagnostic scan</strong>, your <strong style="color:#fff">programming tool's Get ID function</strong>, or by <strong style="color:#fff">physically inspecting</strong> the ECU label before ordering a file service.`}
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
        <h1>${icon('gauge', 24)} ${getLang() === 'fr' ? 'Calculateur de gains' : 'Gains Calculator'}</h1>
        <p>${getLang() === 'fr' ? 'Sélectionnez votre véhicule pour estimer les gains de performance avec notre reprogrammation.' : 'Select your vehicle to see the performance gains with our Stage 1 remap.'}</p>
      </div>

      <div class="gains-selector animate-in" style="animation-delay:0.05s">
        <h2>${icon('search', 16)} ${getLang() === 'fr' ? 'Sélectionnez Votre Véhicule' : 'Select Your Vehicle'}</h2>
        
        <div class="gains-type-cards">
          ${getTypes().map(t => `
            <button class="gains-type-card" data-type="${t}">
              ${icon(typeIcons[t] || 'car', 24)}
              <span>${typeLabels[t] || t}</span>
            </button>
          `).join('')}
        </div>
        <select id="gains-type" style="display:none;"><option value="">Select type</option>${getTypes().map(t => `<option value="${t}">${typeLabels[t]}</option>`).join('')}</select>

        <div class="gains-brand-grid-wrap">
          <label class="gains-select-label">${getLang() === 'fr' ? 'Marque' : 'Brand'} <span id="gains-brand-count" class="gains-brand-count"></span></label>
          <div class="gains-brand-search-wrap" id="gains-brand-search-wrap" style="display:none">
            <div class="gains-brand-search-icon">${icon('search', 14)}</div>
            <input type="text" id="gains-brand-search" placeholder="${getLang() === 'fr' ? 'Rechercher une marque...' : 'Search brand...'}" autocomplete="off" />
            <button type="button" id="gains-brand-search-clear" class="gains-brand-search-clear" style="display:none">${icon('x', 14)}</button>
          </div>
          <div class="gains-brand-grid" id="gains-brand-grid">
            <div class="gains-brand-placeholder">${getLang() === 'fr' ? 'Sélectionnez un type de véhicule ci-dessus' : 'Select a vehicle type above to see available brands'}</div>
          </div>
          <div id="gains-brand-show-more" class="gains-brand-show-more" style="display:none">
            <button type="button" class="gains-show-more-btn" id="gains-show-more-btn">${icon('chevrons-down', 14)} ${getLang() === 'fr' ? 'Afficher plus de marques' : 'Show more brands'}</button>
          </div>
          <select id="gains-brand" style="display:none" disabled><option value="">Select brand</option></select>
        </div>

        <div class="gains-select-grid">
          <div class="gains-select-group" style="display:none"></div>
          <div class="gains-select-group">
            <label>${getLang() === 'fr' ? 'Modèle' : 'Model'}</label>
            <select id="gains-model" disabled><option value="">Select model</option></select>
          </div>
          <div class="gains-select-group">
            <label>${getLang() === 'fr' ? 'Année / Génération' : 'Year / Generation'}</label>
            <select id="gains-gen" disabled><option value="">Select generation</option></select>
          </div>
          <div class="gains-select-group">
            <label>${getLang() === 'fr' ? 'Motorisation' : 'Engine'}</label>
            <select id="gains-engine" disabled><option value="">Select engine</option></select>
          </div>
        </div>
        
        <div id="gains-custom-engine-form" style="display:none; margin-top:20px; border-top:1px dashed var(--border-color); padding-top:20px;" class="animate-in">
          <h3 style="font-size:15px; margin-bottom:15px; color:#fff; display:flex; align-items:center; gap:8px;">
            ${icon('settings', 16)} ${getLang() === 'fr' ? 'Configuration personnalisée du moteur' : 'Custom Engine Configuration'}
          </h3>
          <div class="gains-select-grid" style="grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); margin-bottom:0;">
            <div class="gains-select-group">
              <label>${getLang() === 'fr' ? 'Type d\'induction / Moteur' : 'Induction / Motor Type'}</label>
              <select id="custom-induction" style="width:100%">
                <option value="turbo-diesel">${getLang() === 'fr' ? 'Turbo Diesel' : 'Turbo Diesel'}</option>
                <option value="turbo-petrol">${getLang() === 'fr' ? 'Turbo Petrol' : 'Turbo Petrol'}</option>
                <option value="na-petrol">${getLang() === 'fr' ? 'Naturally Aspirated Petrol' : 'Naturally Aspirated Petrol'}</option>
                <option value="supercharged">${getLang() === 'fr' ? 'Supercharged Petrol' : 'Supercharged Petrol'}</option>
                <option value="electric">${getLang() === 'fr' ? 'Electric Motor' : 'Electric Motor'}</option>
              </select>
            </div>
            <div class="gains-select-group">
              <label>${getLang() === 'fr' ? 'Puissance d\'origine (ch)' : 'Stock Power (HP)'}</label>
              <input type="number" id="custom-hp" value="150" min="20" max="1500" style="width:100%; background:var(--card-bg); border:1px solid var(--border-color); color:#fff; padding:10px 14px; border-radius:8px;">
            </div>
            <div class="gains-select-group">
              <label>${getLang() === 'fr' ? 'Couple d\'origine (Nm)' : 'Stock Torque (Nm)'}</label>
              <input type="number" id="custom-nm" value="320" min="20" max="2000" style="width:100%; background:var(--card-bg); border:1px solid var(--border-color); color:#fff; padding:10px 14px; border-radius:8px;">
            </div>
            <div class="gains-select-group">
              <label>${getLang() === 'fr' ? 'Cylindrée (cc)' : 'Displacement (cc)'}</label>
              <input type="number" id="custom-cc" value="1968" min="0" max="10000" style="width:100%; background:var(--card-bg); border:1px solid var(--border-color); color:#fff; padding:10px 14px; border-radius:8px;">
            </div>
          </div>
        </div>

        <button class="btn btn-primary gains-view-btn" id="gains-view-btn" disabled>${icon('zap', 16)} ${getLang() === 'fr' ? 'Voir les Gains' : 'View Gains'}</button>
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
            <a href="#/home" class="hp-nav-brand" style="text-decoration:none">
              <img src="/assets/logo.png" alt="AS Performance" class="hp-logo"/>
              <div>
                <span class="hp-brand-name">AS</span>
                <span class="hp-brand-bold">Performance</span>
                <span class="hp-brand-sub">chiptuning</span>
              </div>
            </a>
            <div class="hp-nav-pill">
              <a href="#/home" class="hp-nav-link">${t('home')}</a>
              <a href="#/pricing" class="hp-nav-link">${t('pricing')}</a>
              <a href="#/credits" class="hp-nav-link">${t('credits')}</a>
              <a href="#/network" class="hp-nav-link">${t('network')}</a>
              <a href="#/gains" class="hp-nav-link active">${t('calculator')}</a>
            </div>
            <div class="hp-nav-actions">
              <button id="lang-switch-public" class="hp-lang-switch">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                ${getLang() === 'fr' ? 'FR' : 'EN'}
              </button>
              <a href="mailto:asperformance.contact@gmail.com" class="hp-nav-cta">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                ${t('contact_us')}
              </a>
              <a href="#/login" class="hp-nav-login">${t('partner_login')}</a>
            </div>
            <button class="hp-mobile-toggle" id="hp-mobile-toggle">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
            </button>
          </div>
          <div class="hp-mobile-nav" id="hp-mobile-nav">
            <a href="#/home">${t('home')}</a>
            <a href="#/pricing">${t('pricing')}</a>
            <a href="#/credits">${t('credits')}</a>
            <a href="#/network">${t('network')}</a>
            <a href="#/gains">${t('calculator')}</a>
            <div class="hp-mobile-nav-actions">
              <button id="lang-switch-mobile" class="hp-lang-switch hp-lang-switch--mobile">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                ${getLang() === 'fr' ? 'FR' : 'EN'}
              </button>
              <a href="mailto:asperformance.contact@gmail.com" class="hp-nav-cta">${t('contact_us')}</a>
              <a href="#/login" class="hp-nav-login">${t('partner_login')}</a>
            </div>
          </div>
        </nav>
        <div class="hp-mobile-backdrop" id="hp-mobile-backdrop"></div>
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

      // === Language Switcher ===
      const langSwitchPublic = document.getElementById('lang-switch-public');
      if (langSwitchPublic) {
        langSwitchPublic.addEventListener('click', (e) => {
          e.preventDefault();
          const nextLang = getLang() === 'en' ? 'fr' : 'en';
          setLang(nextLang);
        });
      }

      const langSwitchMobile = document.getElementById('lang-switch-mobile');
      if (langSwitchMobile) {
        langSwitchMobile.addEventListener('click', (e) => {
          e.preventDefault();
          const nextLang = getLang() === 'en' ? 'fr' : 'en';
          setLang(nextLang);
        });
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

let _allBrandsForType = [];
let _visibleBrandCount = 60;
const BRANDS_PER_PAGE = 60;

function populateBrandGrid(brands) {
  const grid = document.getElementById('gains-brand-grid');
  const searchWrap = document.getElementById('gains-brand-search-wrap');
  const countEl = document.getElementById('gains-brand-count');
  const showMoreWrap = document.getElementById('gains-brand-show-more');
  if (!grid) return;
  if (!brands || brands.length === 0) {
    grid.innerHTML = `<div class="gains-brand-placeholder">${getLang() === 'fr' ? 'Sélectionnez un type de véhicule ci-dessus' : 'Select a vehicle type above to see available brands'}</div>`;
    if (searchWrap) searchWrap.style.display = 'none';
    if (countEl) countEl.textContent = '';
    if (showMoreWrap) showMoreWrap.style.display = 'none';
    return;
  }

  _allBrandsForType = brands;
  _visibleBrandCount = BRANDS_PER_PAGE;

  // Show search bar if more than 20 brands
  if (searchWrap) searchWrap.style.display = brands.length > 20 ? 'flex' : 'none';
  if (countEl) countEl.textContent = `(${brands.length})`;
  
  // Clear search
  const searchInput = document.getElementById('gains-brand-search');
  if (searchInput) searchInput.value = '';
  const clearBtn = document.getElementById('gains-brand-search-clear');
  if (clearBtn) clearBtn.style.display = 'none';

  renderBrandCards(brands.slice(0, BRANDS_PER_PAGE));
  
  // Show/hide "show more" button
  if (showMoreWrap) {
    showMoreWrap.style.display = brands.length > BRANDS_PER_PAGE ? 'flex' : 'none';
  }
}

function renderBrandCards(brands) {
  const grid = document.getElementById('gains-brand-grid');
  if (!grid) return;

  grid.innerHTML = brands.map(b => `
    <button type="button" class="gains-brand-card" data-brand="${b}">
      <div class="gains-brand-card-logo">
        ${renderBrandLogo(b)}
      </div>
      <span class="gains-brand-card-name">${b.replace(/_/g, ' ')}</span>
    </button>
  `).join('');

  // Attach click events
  grid.querySelectorAll('.gains-brand-card').forEach(card => {
    card.addEventListener('click', () => {
      grid.querySelectorAll('.gains-brand-card').forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      const brandEl = document.getElementById('gains-brand');
      brandEl.value = card.dataset.brand;
      brandEl.dispatchEvent(new Event('change'));
    });
  });
}

function filterBrands(query) {
  const q = query.toLowerCase().trim();
  const countEl = document.getElementById('gains-brand-count');
  const showMoreWrap = document.getElementById('gains-brand-show-more');
  const clearBtn = document.getElementById('gains-brand-search-clear');
  
  if (clearBtn) clearBtn.style.display = q ? 'flex' : 'none';
  
  if (!q) {
    if (countEl) countEl.textContent = `(${_allBrandsForType.length})`;
    _visibleBrandCount = BRANDS_PER_PAGE;
    renderBrandCards(_allBrandsForType.slice(0, BRANDS_PER_PAGE));
    if (showMoreWrap) showMoreWrap.style.display = _allBrandsForType.length > BRANDS_PER_PAGE ? 'flex' : 'none';
    return;
  }
  
  const filtered = _allBrandsForType.filter(b => b.toLowerCase().includes(q));
  if (countEl) countEl.textContent = `(${filtered.length}/${_allBrandsForType.length})`;
  renderBrandCards(filtered.slice(0, 120));
  if (showMoreWrap) showMoreWrap.style.display = 'none';
}

function resetBrandGrid() {
  const grid = document.getElementById('gains-brand-grid');
  if (grid) grid.innerHTML = `<div class="gains-brand-placeholder">${getLang() === 'fr' ? 'Sélectionnez un type de véhicule ci-dessus' : 'Select a vehicle type above to see available brands'}</div>`;
  const brandEl = document.getElementById('gains-brand');
  if (brandEl) { brandEl.value = ''; brandEl.disabled = true; }
  const searchWrap = document.getElementById('gains-brand-search-wrap');
  if (searchWrap) searchWrap.style.display = 'none';
  const countEl = document.getElementById('gains-brand-count');
  if (countEl) countEl.textContent = '';
  const showMoreWrap = document.getElementById('gains-brand-show-more');
  if (showMoreWrap) showMoreWrap.style.display = 'none';
  _allBrandsForType = [];
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

  // Brand search input
  const brandSearchInput = document.getElementById('gains-brand-search');
  if (brandSearchInput) {
    brandSearchInput.addEventListener('input', (e) => filterBrands(e.target.value));
  }
  const brandSearchClear = document.getElementById('gains-brand-search-clear');
  if (brandSearchClear) {
    brandSearchClear.addEventListener('click', () => {
      if (brandSearchInput) brandSearchInput.value = '';
      filterBrands('');
      brandSearchInput?.focus();
    });
  }
  // Show more brands button
  const showMoreBtn = document.getElementById('gains-show-more-btn');
  if (showMoreBtn) {
    showMoreBtn.addEventListener('click', () => {
      _visibleBrandCount += BRANDS_PER_PAGE;
      const q = brandSearchInput?.value?.toLowerCase()?.trim() || '';
      const list = q ? _allBrandsForType.filter(b => b.toLowerCase().includes(q)) : _allBrandsForType;
      renderBrandCards(list.slice(0, _visibleBrandCount));
      const showMoreWrap = document.getElementById('gains-brand-show-more');
      if (showMoreWrap && _visibleBrandCount >= list.length) showMoreWrap.style.display = 'none';
    });
  }

  typeEl.addEventListener('change', () => {
    const type = typeEl.value;
    resetSelect(modelEl, getLang() === 'fr' ? 'Sélectionner le modèle' : 'Select model');
    resetSelect(genEl, getLang() === 'fr' ? 'Sélectionner la génération' : 'Select generation');
    resetSelect(engineEl, getLang() === 'fr' ? 'Sélectionner le moteur' : 'Select engine');
    viewBtn.disabled = true;
    resultsArea.innerHTML = '';
    if (type) {
      const brands = getBrands(type);
      populateSelect(brandEl, brands, getLang() === 'fr' ? 'Sélectionner la marque' : 'Select brand');
      populateBrandGrid(brands);
    } else {
      resetSelect(brandEl, getLang() === 'fr' ? 'Sélectionner la marque' : 'Select brand');
      resetBrandGrid();
    }
  });

  function hideCustomForm() {
    const form = document.getElementById('gains-custom-engine-form');
    if (form) form.style.display = 'none';
  }

  brandEl.addEventListener('change', () => {
    const type = typeEl.value, brand = brandEl.value;
    resetSelect(genEl, getLang() === 'fr' ? 'Sélectionner la génération' : 'Select generation');
    resetSelect(engineEl, getLang() === 'fr' ? 'Sélectionner le moteur' : 'Select engine');
    hideCustomForm();
    viewBtn.disabled = true;
    resultsArea.innerHTML = '';
    if (brand) {
      populateSelect(modelEl, getModels(type, brand), getLang() === 'fr' ? 'Sélectionner le modèle' : 'Select model');
    } else {
      resetSelect(modelEl, getLang() === 'fr' ? 'Sélectionner le modèle' : 'Select model');
    }
  });

  modelEl.addEventListener('change', () => {
    const type = typeEl.value, brand = brandEl.value, model = modelEl.value;
    resetSelect(engineEl, getLang() === 'fr' ? 'Sélectionner le moteur' : 'Select engine');
    hideCustomForm();
    viewBtn.disabled = true;
    resultsArea.innerHTML = '';
    if (model) {
      populateSelect(genEl, getGenerations(type, brand, model), getLang() === 'fr' ? 'Sélectionner la génération' : 'Select generation');
    } else {
      resetSelect(genEl, getLang() === 'fr' ? 'Sélectionner la génération' : 'Select generation');
    }
  });

  genEl.addEventListener('change', () => {
    const type = typeEl.value, brand = brandEl.value, model = modelEl.value, gen = genEl.value;
    hideCustomForm();
    viewBtn.disabled = true;
    resultsArea.innerHTML = '';
    if (gen) {
      populateSelect(engineEl, getEngines(type, brand, model, gen), getLang() === 'fr' ? 'Sélectionner le moteur' : 'Select engine');
    } else {
      resetSelect(engineEl, getLang() === 'fr' ? 'Sélectionner le moteur' : 'Select engine');
    }
  });

  engineEl.addEventListener('change', () => {
    const isCustom = engineEl.value === 'Other / Custom Engine';
    const form = document.getElementById('gains-custom-engine-form');
    if (form) {
      form.style.display = isCustom ? 'block' : 'none';
      if (isCustom) {
        form.classList.add('animate-in');
      }
    }
    viewBtn.disabled = !engineEl.value;
  });

  viewBtn.addEventListener('click', () => {
    const type = typeEl.value, brand = brandEl.value, model = modelEl.value, gen = genEl.value, engine = engineEl.value;
    
    if (engine === 'Other / Custom Engine') {
      const induction = document.getElementById('custom-induction').value;
      const hp = parseInt(document.getElementById('custom-hp').value, 10) || 150;
      const nm = parseInt(document.getElementById('custom-nm').value, 10) || 320;
      const cc = parseInt(document.getElementById('custom-cc').value, 10) || 1968;
      
      // ===== Accurate Stage 1 Gain Calculations =====
      // HP-range-sensitive multipliers modeled on real-world tuning data.
      // Small engines gain less absolute power; larger/higher-power engines gain more.
      // Diesel turbos gain more than petrol turbos due to boost/fueling headroom.
      // NA gains are marginal (intake/exhaust/mapping only).
      let hpFactor, nmFactor, fuel, ecu;

      if (induction === 'turbo-diesel') {
        fuel = 'Diesel';
        // Small diesel (< 120hp): conservative +22-25%, large diesel (> 200hp): aggressive +20-22%
        if (hp <= 100) { hpFactor = 1.28; nmFactor = 1.26; ecu = 'Bosch EDC17C46'; }
        else if (hp <= 150) { hpFactor = 1.27; nmFactor = 1.25; ecu = 'Bosch EDC17C64'; }
        else if (hp <= 200) { hpFactor = 1.24; nmFactor = 1.22; ecu = 'Bosch EDC17C74'; }
        else if (hp <= 300) { hpFactor = 1.20; nmFactor = 1.18; ecu = 'Bosch MD1CP004'; }
        else { hpFactor = 1.16; nmFactor = 1.15; ecu = 'Bosch MD1CS006'; }
      } else if (induction === 'turbo-petrol') {
        fuel = 'Gasoline';
        // Small turbo petrol: +20-25%, large turbo petrol: +15-18%
        if (hp <= 120) { hpFactor = 1.24; nmFactor = 1.26; ecu = 'Bosch MED17.5.21'; }
        else if (hp <= 180) { hpFactor = 1.22; nmFactor = 1.24; ecu = 'Bosch MED17.5.25'; }
        else if (hp <= 250) { hpFactor = 1.20; nmFactor = 1.22; ecu = 'Siemens Simos 18.1'; }
        else if (hp <= 400) { hpFactor = 1.17; nmFactor = 1.19; ecu = 'Bosch MG1CS011'; }
        else { hpFactor = 1.13; nmFactor = 1.16; ecu = 'Bosch MG1CS002'; }
      } else if (induction === 'na-petrol') {
        fuel = 'Gasoline';
        // NA gains are small: intake + exhaust + remap = 5-10%
        if (hp <= 120) { hpFactor = 1.08; nmFactor = 1.07; ecu = 'Generic OEM ECU'; }
        else if (hp <= 200) { hpFactor = 1.07; nmFactor = 1.06; ecu = 'Generic OEM ECU'; }
        else if (hp <= 350) { hpFactor = 1.06; nmFactor = 1.05; ecu = 'Bosch MED9.1'; }
        else { hpFactor = 1.05; nmFactor = 1.04; ecu = 'Bosch MED17.1'; }
      } else if (induction === 'supercharged') {
        fuel = 'Gasoline';
        // Supercharged: pulley swap + remap = 12-18%
        if (hp <= 250) { hpFactor = 1.18; nmFactor = 1.15; ecu = 'Bosch MED17'; }
        else if (hp <= 400) { hpFactor = 1.15; nmFactor = 1.13; ecu = 'Siemens Simos 8.4'; }
        else { hpFactor = 1.12; nmFactor = 1.10; ecu = 'Bosch MG1CS111'; }
      } else if (induction === 'electric') {
        fuel = 'Electric';
        hpFactor = 1.00; nmFactor = 1.00; ecu = 'OEM BMS (locked)';
      } else {
        fuel = 'Unknown'; hpFactor = 1.15; nmFactor = 1.15; ecu = 'Generic';
      }
      
      const hp1 = Math.round(hp * hpFactor);
      const nm1 = Math.round(nm * nmFactor);
      
      const specs = {
        fuel,
        cc,
        code: 'Custom/DIY',
        ecu,
        hp,
        nm,
        hp1,
        nm1
      };
      
      currentSpecs = specs;
      const cleanBrand = brand.replace(/_/g, ' ');
      const cleanModel = model.replace(/_/g, ' ');
      currentSelection = { 
        type, 
        brand: cleanBrand, 
        model: cleanModel, 
        gen, 
        engine: `${getLang() === 'fr' ? 'Moteur personnalisé' : 'Custom Engine'} (${hp} hp)` 
      };
      currentStage = 'stage1';
      updateResults();
      return;
    }

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
