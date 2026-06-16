import { renderSidebar, renderHeader, initLayoutEvents } from '../components/layout.js';
import { icon } from '../lib/icons.js';
import { t } from '../lib/i18n.js';

const tools = [
  { name: 'KessV3', brand: 'Alientech', protocols: ['OBD', 'Boot', 'BDM', 'JTAG', 'Tricore', 'Bench'], risk: 'Official' },
  { name: 'Kess V2 (old)', brand: 'Alientech', protocols: ['OBD'], risk: 'Clones exist — caution' },
  { name: 'K-TAG', brand: 'Alientech', protocols: ['Boot', 'BDM', 'JTAG', 'Tricore', 'Bench'], risk: 'Official' },
  { name: 'Autotuner', brand: 'Autotuner', protocols: ['OBD', 'Boot', 'BDM', 'JTAG', 'Tricore', 'Bench'], risk: 'Official' },
  { name: 'BFlash', brand: 'BFlash', protocols: ['OBD', 'Boot', 'BDM', 'JTAG', 'Tricore', 'Bench'], risk: 'Official' },
  { name: 'AMT Flex', brand: 'Magic Motorsport', protocols: ['OBD', 'Boot', 'BDM', 'JTAG', 'Tricore', 'Bench'], risk: 'Official' },
  { name: 'Dfox', brand: 'Dimsport', protocols: ['OBD', 'Boot', 'BDM', 'Tricore', 'Bench'], risk: 'Official' },
  { name: 'Hexaprog', brand: 'PCMTec/Generic', protocols: ['Boot', 'BDM', 'JTAG', 'Tricore', 'Bench'], risk: 'Official' },
  { name: 'Multiprog', brand: 'Generic', protocols: ['Boot', 'BDM', 'JTAG', 'Tricore', 'Bench'], risk: 'Official' },
  { name: 'PCM Flash', brand: 'PCM Flash', protocols: ['OBD', 'Boot', 'Bench'], risk: 'Official' },
  { name: 'Foxflash', brand: 'Foxflash', protocols: ['OBD', 'Boot', 'BDM', 'JTAG', 'Tricore', 'Bench'], risk: 'Clone — results may vary', isClone: true },
  { name: 'KT200 v1/v2', brand: 'KT200', protocols: ['OBD', 'Boot', 'BDM', 'JTAG', 'Tricore', 'Bench'], risk: 'Clone — results may vary', isClone: true },
  { name: 'MPPS v18/v21', brand: 'MPPS', protocols: ['OBD'], risk: 'Clone — high brick risk', isClone: true },
  { name: 'Trasdata', brand: 'Dimsport', protocols: ['Boot', 'BDM', 'JTAG', 'Tricore', 'Bench'], risk: 'Official' },
  { name: 'CMD Flash', brand: 'CMD', protocols: ['OBD', 'Boot', 'BDM', 'JTAG', 'Tricore', 'Bench'], risk: 'Official' },
  { name: 'ECUTEK', brand: 'ECUTEK', protocols: ['OBD'], risk: 'Official, mainly Subaru/Nissan' },
  { name: 'HP Tuners MPVI3', brand: 'HP Tuners', protocols: ['OBD'], risk: 'Official, mainly GM/Ford' }
];

export function renderToolsPage() {
  const app = document.getElementById('app');

  app.innerHTML = `
    <div class="app-layout">
      ${renderSidebar()}
      <main class="app-main">
        ${renderHeader()}
        <div class="page-content">
          <div class="page-header animate-in">
            <div style="flex:1">
              <h1>${t('supported_tools_database', {}, 'Supported Tools Database')}</h1>
              <p>${t('supported_tools_desc', {}, 'Reference guide for officially supported reading/writing tools and protocols.')}</p>
            </div>
            <div class="search-wrap">
              ${icon('search', 16)}
              <input type="text" id="tool-search" placeholder="${t('search_tools_placeholder', {}, 'Search tools...')}" class="input" style="padding-left:36px">
            </div>
          </div>
          
          <div class="card bg-warning-dim mb-4" style="border-left: 4px solid var(--brand-orange)">
            <div style="display:flex; gap:12px; align-items:flex-start">
              <div style="color:var(--brand-orange); margin-top:2px">${icon('alert-triangle', 20)}</div>
              <div>
                <h4 style="margin:0 0 4px 0; color:var(--brand-orange)">${t('clone_tool_detected', {}, 'Clone Tool Detected')}</h4>
                <p style="margin:0; font-size:13px; color:var(--brand-muted)">
                  ${t('clone_tool_warning_desc', {}, 'Tools marked with clone warnings have known clone versions on the market. Clone tools may produce corrupted reads. If you experience issues with file compatibility, consider using an official tool. We will do our best but cannot guarantee results from confirmed clone reads.')}
                </p>
              </div>
            </div>
          </div>

          <div class="grid" id="tools-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 16px;">
            ${tools.map(tool => `
              <div class="tool-glass-card tool-card animate-in" data-name="${tool.name.toLowerCase()}" data-brand="${tool.brand.toLowerCase()}">
                <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:12px">
                  <div>
                    <h3 style="margin:0 0 4px 0">${tool.name}</h3>
                    <div class="text-xs text-muted">${tool.brand}</div>
                  </div>
                  ${tool.isClone ? `<div class="badge badge-error" style="font-size:11px">${icon('alert-octagon', 12)} ${t('clone', {}, 'Clone')}</div>` : `<div class="badge badge-assigned" style="font-size:11px">${icon('check-circle', 12)} ${t('official', {}, 'Official')}</div>`}
                </div>
                
                <div style="margin-bottom:12px">
                  <div class="text-xs text-muted" style="margin-bottom:4px">${t('supported_protocols', {}, 'Supported Protocols:')}</div>
                  <div style="display:flex; flex-wrap:wrap; gap:4px">
                    ${tool.protocols.map(p => `<span class="badge" style="background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1)">${p}</span>`).join('')}
                  </div>
                </div>
                
                <div class="text-xs" style="color:${tool.isClone ? 'var(--brand-red)' : 'var(--brand-muted)'}">
                  <strong>${t('risk_note', {}, 'Risk Note:')}</strong> ${t(tool.risk, {}, tool.risk)}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </main>
    </div>
    <style>
      .tool-glass-card {
        background: linear-gradient(145deg, rgba(30, 30, 35, 0.4) 0%, rgba(15, 15, 18, 0.6) 100%);
        border: 1px solid rgba(255, 255, 255, 0.06);
        border-radius: 8px;
        padding: 20px;
        color: #fff;
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
        position: relative;
        overflow: hidden;
      }
      .tool-glass-card::before {
        content: '';
        position: absolute;
        top: 0; left: 0; right: 0; height: 2px;
        background: linear-gradient(90deg, transparent, rgba(196, 30, 30, 0.3), transparent);
        opacity: 0;
        transition: opacity 0.3s ease;
      }
      .tool-glass-card:hover {
        transform: translateY(-3px);
        border-color: rgba(196, 30, 30, 0.3);
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3), 0 0 15px rgba(196, 30, 30, 0.1);
        background: linear-gradient(145deg, rgba(35, 25, 25, 0.5) 0%, rgba(15, 15, 18, 0.7) 100%);
      }
      .tool-glass-card:hover::before {
        opacity: 1;
      }
    </style>
  `;

  initLayoutEvents();

  // Search filter
  document.getElementById('tool-search')?.addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase();
    document.querySelectorAll('.tool-card').forEach(card => {
      if (card.dataset.name.includes(q) || card.dataset.brand.includes(q)) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
}
