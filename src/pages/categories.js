import { renderSidebar, renderHeader, initLayoutEvents } from '../components/layout.js';
import { icon } from '../lib/icons.js';

const categories = [
  { id: 'cars', title: 'Cars & Passenger Vehicles', icon: 'car', desc: 'Standard passenger vehicles, hatchbacks, sedans, SUVs, and sports cars.', note: 'Most reads can be done via OBD, but bench reads are recommended for full backups.' },
  { id: 'trucks', title: 'Trucks & HGV', icon: 'truck', desc: 'Heavy Goods Vehicles, Lorries, and commercial trucks.', note: 'Trucks often have two ECUs: Engine ECU + ACM (Aftertreatment Control Module). Both may need modification for AdBlue/DPF deletes. ACM reset is mandatory.' },
  { id: 'vans', title: 'Vans & LCV', icon: 'package', desc: 'Light Commercial Vehicles, delivery vans, and minibuses.', note: 'Common ECUs include Delphi DCM6.2V and SID208. Often suffer from DPF/AdBlue issues.' },
  { id: 'agri', title: 'Agricultural', icon: 'tractor', desc: 'Tractors, combines, and heavy farm machinery.', note: 'Requires specialized cables (e.g. 9-pin Deutsch). Bench reading is very common for brands like John Deere or Case IH.' },
  { id: 'marine', title: 'Marine', icon: 'anchor', desc: 'Boat and yacht engines, outboard and inboard.', note: 'Specialized waterproof ECUs. Frequently require opening for boot mode if OBD marine cables are unavailable.' },
  { id: 'moto', title: 'Motorcycles', icon: 'bike', desc: 'Street bikes, track bikes, ATVs, and snowmobiles.', note: 'Often use Keihin or small Bosch/Marelli ECUs. Tuning focuses heavily on RPM limiters, Vmax, and pops/bangs.' },
  { id: 'construction', title: 'Construction Equipment', icon: 'wrench', desc: 'Excavators, loaders, cranes, bulldozers, and industrial machinery.', note: 'Heavy-duty ECUs similar to trucks/agri. Often requires bench or boot reading. Caterpillar, Komatsu, Volvo CE, JCB common.' }
];

export function renderCategoriesPage() {
  const app = document.getElementById('app');

  app.innerHTML = `
    <div class="app-layout">
      ${renderSidebar()}
      <main class="app-main">
        ${renderHeader()}
        <div class="page-content">
          <div class="page-header animate-in">
            <div style="flex:1">
              <h1>Vehicle Categories</h1>
              <p>Select a vehicle category to see specific guidelines and start an order.</p>
            </div>
          </div>

          <div class="card animate-in" style="animation-delay:0.06s; border-left: 4px solid var(--brand-orange); background:rgba(255,165,0,0.04); padding:14px 18px; margin-bottom:24px">
            <div style="display:flex; gap:12px; align-items:flex-start">
              <div style="color:var(--brand-orange); flex-shrink:0; margin-top:2px">${icon('alert-triangle', 20)}</div>
              <div>
                <h4 style="margin:0 0 6px 0; color:var(--brand-orange); font-size:13px">⚠️ Important — ECU Reference May Not Match Your Real Hardware</h4>
                <p style="margin:0; font-size:12px; color:var(--brand-muted); line-height:1.6">
                  The ECU references in our database are <strong style="color:#fff">generic entries</strong> and may <strong style="color:var(--brand-orange)">not match the actual ECU</strong> installed in your specific vehicle. The same model can have different ECU variants depending on production date, market, or factory updates. 
                  <strong style="color:#fff">Before ordering, always verify your real ECU</strong> by running a <strong style="color:#fff">diagnostic scan</strong> (VCDS, Delphi, Launch, etc.), using your <strong style="color:#fff">programming tool's "Get ID"</strong> function, or <strong style="color:#fff">physically checking</strong> the ECU label on the unit.
                </p>
              </div>
            </div>
          </div>
          
          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 24px;">
            ${categories.map((c, i) => `
              <div class="glass-card animate-in" style="animation-delay: ${0.1 + i * 0.05}s; display: flex; flex-direction: column; height: 100%;">
                <div style="display:flex; gap:16px; align-items:flex-start; margin-bottom: 24px;">
                  <div class="icon-box">
                    ${icon(c.icon, 24)}
                  </div>
                  <div>
                    <h3 style="margin:0 0 4px 0">${c.title}</h3>
                    <p style="margin:0; font-size:13px; color:var(--brand-muted); line-height:1.4">${c.desc}</p>
                  </div>
                </div>
                <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.05); padding:10px; border-radius:6px; font-size:12px; color:#aaa; margin-bottom:16px">
                  <strong>Note:</strong> ${c.note}
                </div>
                <div style="margin-top: auto;">
                  <a href="#/requests/new?type=${c.id}" class="btn btn-primary" style="width:100%; justify-content:center">START NEW ORDER</a>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </main>
    </div>
    <style>
      .glass-card {
        background: linear-gradient(145deg, rgba(30, 30, 34, 0.6) 0%, rgba(15, 15, 18, 0.8) 100%);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 12px;
        padding: 24px;
        color: #fff;
        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        position: relative;
        overflow: hidden;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
      }
      .glass-card::before {
        content: '';
        position: absolute;
        top: 0; left: -100%;
        width: 50%; height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.05), transparent);
        transform: skewX(-20deg);
        transition: 0.5s;
        pointer-events: none;
      }
      .glass-card:hover {
        transform: translateY(-5px) scale(1.02);
        border-color: rgba(196, 30, 30, 0.4);
        box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4), 0 0 20px rgba(196, 30, 30, 0.15);
      }
      .glass-card:hover::before {
        left: 150%;
      }
      .icon-box {
        width: 54px; height: 54px; border-radius: 12px;
        background: linear-gradient(135deg, rgba(196,30,30,0.2) 0%, rgba(196,30,30,0.05) 100%);
        color: var(--brand-red);
        display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        border: 1px solid rgba(196,30,30,0.2);
        transition: all 0.3s ease;
        box-shadow: inset 0 0 10px rgba(196,30,30,0.1);
      }
      .glass-card:hover .icon-box {
        background: linear-gradient(135deg, rgba(196,30,30,0.4) 0%, rgba(196,30,30,0.1) 100%);
        color: #ff4d4d;
        box-shadow: inset 0 0 15px rgba(196,30,30,0.3), 0 0 15px rgba(196,30,30,0.2);
        transform: scale(1.05) rotate(5deg);
      }
    </style>
  `;

  initLayoutEvents();
}
