import { renderSidebar, renderHeader, initLayoutEvents } from '../components/layout.js';
import { getCurrentUser, isAdmin, isCustomer } from '../lib/auth.js';
import { demoVehicles, demoRequests, createVehicle, getProfileById, demoProfiles } from '../lib/store.js';
import { showToast, showModal, formatDate } from '../lib/utils.js';
import { icon, refreshIcons } from '../lib/icons.js';
import { t } from '../lib/i18n.js';

export function renderVehiclesPage() {
  const app = document.getElementById('app');
  const user = getCurrentUser();

  let vehicles = [...demoVehicles];
  if (isCustomer()) vehicles = vehicles.filter(v => v.customer_id === user.id);

  app.innerHTML = `
    <div class="app-layout">
      ${renderSidebar()}
      <main class="app-main">
        ${renderHeader()}
        <div class="page-content">
          <div class="page-header animate-in">
            <div><h1>${t('vehicles')}</h1><p>${isCustomer() ? t('your_registered_vehicles', {}, 'Your registered vehicles') : t('all_customer_vehicles', {}, 'All customer vehicles')}</p></div>
            <button class="btn btn-primary" id="btn-add-vehicle">${icon('plus', 16)} ${t('add_vehicle', {}, 'Add Vehicle')}</button>
          </div>

          ${isAdmin() ? `<div class="flex gap-3 flex-wrap" style="margin-bottom:16px">
            <input type="text" id="search-vehicles" placeholder="${t('search_vehicles_placeholder', {}, 'Search by make, model, plate...')}" style="max-width:300px"/>
          </div>` : ''}

          <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(340px,1fr));gap:16px" id="vehicles-grid">
            ${vehicles.map(v => renderVehicleCard(v)).join('')}
          </div>
          ${!vehicles.length ? `<div class="empty-state" style="padding:60px"><h3>${t('no_vehicles_yet', {}, 'No vehicles yet')}</h3><p>${t('add_first_vehicle_desc', {}, 'Add your first vehicle to start submitting requests.')}</p></div>` : ''}
        </div>
      </main>
    </div>`;

  initLayoutEvents();
  bindVehicleEvents(user);
}

function renderVehicleCard(v) {
  const owner = getProfileById(v.customer_id);
  const reqCount = demoRequests.filter(r => r.vehicle_id === v.id).length;
  return `
    <div class="card animate-in" style="padding:20px;cursor:default">
      <div style="display:flex;align-items:center;gap:16px;margin-bottom:16px">
        <div style="width:48px;height:48px;border-radius:4px;background:linear-gradient(135deg,rgba(196,30,30,0.15),rgba(196,30,30,0.05));display:flex;align-items:center;justify-content:center;color:var(--brand-red-light);flex-shrink:0">${icon('car', 24)}</div>
        <div style="flex:1;min-width:0">
          <h3 style="font-size:var(--text-base);color:#fff">${v.make} ${v.model}</h3>
          <p class="text-xs" style="color:rgba(255,255,255,0.5)">${v.year} · ${v.plate_number || t('no_plate')}</p>
        </div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
        <div><label style="margin-bottom:2px">${t('ecu_type', {}, 'ECU Type')}</label><p class="text-sm" style="color:#fff">${v.ecu_type || 'N/A'}</p></div>
        <div><label style="margin-bottom:2px">${t('requests')}</label><p class="text-sm" style="color:#fff">${reqCount}</p></div>
        ${owner ? `<div><label style="margin-bottom:2px">${t('owner', {}, 'Owner')}</label><p class="text-sm" style="color:#fff">${owner.full_name}</p></div>` : ''}
        <div><label style="margin-bottom:2px">${t('added', {}, 'Added')}</label><p class="text-sm" style="color:rgba(255,255,255,0.5)">${formatDate(v.created_at)}</p></div>
      </div>
    </div>`;
}

function bindVehicleEvents(user) {
  const customers = demoProfiles.filter(p => p.role === 'customer');

  document.getElementById('btn-add-vehicle')?.addEventListener('click', () => {
    showModal(t('add_vehicle', {}, 'Add Vehicle'), `
      ${!isCustomer() ? `<div class="form-group"><label>${t('customer')} *</label><select id="v-customer">${customers.map(c => `<option value="${c.id}">${c.full_name}</option>`).join('')}</select></div>` : ''}
      <div class="form-row">
        <div class="form-group"><label>${t('make_brand')} *</label><input type="text" id="v-make" placeholder="Renault"/></div>
        <div class="form-group"><label>${t('model')} *</label><input type="text" id="v-model" placeholder="Trafic III"/></div>
      </div>
      <div class="form-row">
        <div class="form-group"><label>${t('year')}</label><input type="number" id="v-year" placeholder="2020"/></div>
        <div class="form-group"><label>${t('plate_number')}</label><input type="text" id="v-plate" placeholder="AB-123-CD"/></div>
      </div>
      <div class="form-group"><label>${t('ecu_type', {}, 'ECU Type')}</label><input type="text" id="v-ecu" placeholder="Bosch EDC17C42"/></div>
    `, [{
      id: 'modal-add-v', label: `${icon('plus', 14)} ${t('add_vehicle', {}, 'Add Vehicle')}`, class: 'btn-primary',
      onClick: async (_, close) => {
        const make = document.getElementById('v-make')?.value?.trim();
        const model = document.getElementById('v-model')?.value?.trim();
        if (!make || !model) { showToast(t('make_model_required', {}, 'Make and model are required'), 'error'); return; }
        await createVehicle({
          customer_id: isCustomer() ? user.id : (document.getElementById('v-customer')?.value || user.id),
          make, model,
          year: parseInt(document.getElementById('v-year')?.value) || new Date().getFullYear(),
          plate_number: document.getElementById('v-plate')?.value || '',
          ecu_type: document.getElementById('v-ecu')?.value || '',
          _actor: user.id,
        });
        showToast(t('vehicle_added_success', { make, model }, 'Vehicle "{make} {model}" added'), 'success');
        close();
        renderVehiclesPage();
      },
    }]);
  });

  document.getElementById('search-vehicles')?.addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase();
    let filtered = [...demoVehicles];
    if (q) filtered = filtered.filter(v => `${v.make} ${v.model} ${v.plate_number} ${v.ecu_type}`.toLowerCase().includes(q));
    document.getElementById('vehicles-grid').innerHTML = filtered.map(v => renderVehicleCard(v)).join('');
    refreshIcons();
  });
}
