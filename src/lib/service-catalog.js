// ===== AS Performance — Service Catalog =====
// Single source of truth for all services, credit costs, and metadata.
// Used by: request-new.js (order wizard), pricing.js, wallet.js

// ===== SERVICE CATEGORIES =====
export const SERVICE_CATEGORIES = {
  performance: {
    id: 'performance',
    title: 'Performance Calibration',
    icon: 'zap',
    order: 1,
    tab: 'standard',
  },
  emission: {
    id: 'emission',
    title: 'Emission / Delete',
    icon: 'wind',
    order: 2,
    tab: 'standard',
  },
  acoustic: {
    id: 'acoustic',
    title: 'Acoustic & Features',
    icon: 'volume-2',
    order: 3,
    tab: 'standard',
  },
  advanced: {
    id: 'advanced',
    title: 'Advanced / Custom ECU',
    icon: 'cpu',
    order: 4,
    tab: 'advanced',
  },
  gearbox: {
    id: 'gearbox',
    title: 'Gearbox / TCU',
    icon: 'settings',
    order: 5,
    tab: 'advanced',
  },
  diagnostic: {
    id: 'diagnostic',
    title: 'Diagnostic & Support',
    icon: 'search',
    order: 6,
    tab: 'advanced',
  },
};

// ===== FULL SERVICE LIST =====
export const SERVICES = [

  // ── Performance ─────────────────────────────────────────
  {
    id: 'stage1',
    name: 'Stage 1',
    category: 'performance',
    credits: 3,
    price: '70€',
    description: 'Optimized ECU calibration within OEM hardware limits. More power, better throttle response.',
    beginner_tip: 'Stage 1 is the most popular tuning level. No hardware changes needed. Safe for daily use.',
    warnings: [],
    requires_dtcs: false,
    is_advanced: false,
  },
  {
    id: 'stage2',
    name: 'Stage 2',
    category: 'performance',
    credits: 5,
    price: '110€',
    description: 'Aggressive calibration requiring supporting hardware modifications (downpipe, intercooler, etc).',
    beginner_tip: 'Stage 2 requires hardware mods. Without them, the tune may cause issues or limp mode.',
    warnings: ['Stage 2 requires hardware modifications (downpipe, intercooler, intake). Confirm hardware is installed before requesting.'],
    requires_dtcs: false,
    is_advanced: false,
  },
  {
    id: 'stage3',
    name: 'Stage 3',
    category: 'performance',
    credits: 8,
    price: '230€',
    description: 'Full-send calibration for highly modified vehicles. Requires extensive hardware.',
    beginner_tip: 'Stage 3 is for serious builds with upgraded turbo, fuel system, exhaust, and intercooler.',
    warnings: ['Stage 3 is for heavily modified vehicles only. Provide a full hardware modification list.'],
    requires_dtcs: false,
    is_advanced: false,
  },
  {
    id: 'stage4',
    name: 'Stage 4 / Big Turbo / Hybrid Turbo',
    category: 'performance',
    credits: 10,
    price: '390€',
    description: 'Custom calibration for big turbo or hybrid turbo setups. Requires full specs.',
    beginner_tip: 'This is a fully custom build. You must provide turbo specs, injector size, fuel pump details.',
    warnings: ['Please provide complete turbo specifications and supporting mod list.', 'This is a premium custom service — delivery may take longer.'],
    requires_dtcs: false,
    is_advanced: true,
  },
  {
    id: 'custom-dyno',
    name: 'Full Custom Dyno Setup',
    category: 'performance',
    credits: 10,
    price: 'Custom Quote',
    description: 'Dyno-assisted calibration for maximum precision. Reserved for high-end builds.',
    beginner_tip: 'This requires dyno access and live data logging. Contact us first to discuss your setup.',
    warnings: ['Custom dyno calibration requires coordination. Contact us before ordering.'],
    requires_dtcs: false,
    is_advanced: true,
  },
  {
    id: 'motorsport',
    name: 'Motorsport Calibration',
    category: 'performance',
    credits: 10,
    price: 'Custom Quote',
    description: 'Race-specific calibration for track, drag, or rally use. Not road legal.',
    beginner_tip: 'Motorsport tunes remove all safety limiters and emissions. For off-road / track use only.',
    warnings: ['Motorsport calibration is NOT road legal. For competition use only.'],
    requires_dtcs: false,
    is_advanced: true,
  },
  {
    id: 'ethanol-flexfuel',
    name: 'Ethanol / FlexFuel',
    category: 'performance',
    credits: 4,
    price: '100€',
    description: 'E85 or flex-fuel calibration with ethanol content detection.',
    beginner_tip: 'Your fuel system must support ethanol (injectors, pump, fuel lines). Standard pumps may fail on E85.',
    warnings: ['Ensure your fuel system (injectors, pump, lines) can handle ethanol before requesting.'],
    requires_dtcs: false,
    is_advanced: false,
  },
  {
    id: 'launch-control',
    name: 'Launch Control',
    category: 'performance',
    credits: 3,
    price: '60€',
    description: 'Controlled launch RPM with two-step limiter for consistent launches.',
    beginner_tip: 'Launch control holds RPM at a set point for fast acceleration from standstill. Works best with automatic or DSG gearboxes.',
    warnings: [],
    requires_dtcs: false,
    is_advanced: false,
  },
  {
    id: 'hardcut',
    name: 'Hardcut Limiter',
    category: 'performance',
    credits: 3,
    price: '55€',
    description: 'Aggressive rev limiter with ignition cut for dramatic effect.',
    beginner_tip: 'Hardcut changes the rev limiter behavior. It cuts fuel/ignition sharply instead of soft limiter.',
    warnings: [],
    requires_dtcs: false,
    is_advanced: false,
  },
  {
    id: 'rolling-antilag',
    name: 'Rolling AntiLag',
    category: 'performance',
    credits: 5,
    price: '150€',
    description: 'Maintains boost pressure during gear shifts. For turbocharged vehicles.',
    beginner_tip: 'AntiLag keeps the turbo spooled between shifts. Increases exhaust temperatures significantly.',
    warnings: ['AntiLag increases exhaust gas temperatures dramatically. Ensure your exhaust system can handle it.'],
    requires_dtcs: false,
    is_advanced: true,
  },
  {
    id: 'multimap',
    name: 'MultiMap Switching',
    category: 'performance',
    credits: 5,
    price: '120€',
    description: 'Multiple maps switchable via cruise control or pedal sequence (e.g. Stock / Eco / Sport / Race).',
    beginner_tip: 'MultiMap lets you switch between different tunes without reflashing. Activated by a button sequence.',
    warnings: ['MultiMap compatibility depends on ECU type. Not available on all vehicles.'],
    requires_dtcs: false,
    is_advanced: false,
  },

  // ── Emission / Delete ───────────────────────────────────
  {
    id: 'egr-off',
    name: 'EGR OFF',
    category: 'emission',
    credits: 2,
    price: '50€',
    description: 'Disables Exhaust Gas Recirculation valve in software.',
    beginner_tip: 'EGR recirculates exhaust gases back into the intake. Removing it keeps the intake cleaner.',
    warnings: [],
    requires_dtcs: true,
    is_advanced: false,
  },
  {
    id: 'dpf-off',
    name: 'DPF / FAP OFF',
    category: 'emission',
    credits: 2,
    price: '50€',
    description: 'Disables Diesel Particulate Filter regeneration and monitoring.',
    beginner_tip: 'DPF traps soot from the exhaust. Software delete stops regen cycles but the physical filter must also be removed.',
    warnings: ['Physical DPF must be removed mechanically. Software-only delete without hardware removal will cause issues.'],
    requires_dtcs: true,
    is_advanced: false,
  },
  {
    id: 'adblue-off',
    name: 'AdBlue / SCR OFF',
    category: 'emission',
    credits: 2,
    price: '50€',
    description: 'Disables AdBlue/SCR dosing system and monitoring.',
    beginner_tip: 'AdBlue is a urea solution injected into the exhaust to reduce NOx. Software delete stops the dosing and countdown timer.',
    warnings: ['AdBlue system must be emptied or bypassed mechanically for clean operation.'],
    requires_dtcs: true,
    is_advanced: false,
  },
  {
    id: 'lambda-off',
    name: 'Lambda / O2 OFF',
    category: 'emission',
    credits: 2,
    price: '45€',
    description: 'Disables rear oxygen sensor monitoring (post-cat lambda).',
    beginner_tip: 'Lambda sensors measure oxygen in exhaust. Removing the rear one prevents catalyst efficiency faults.',
    warnings: [],
    requires_dtcs: true,
    is_advanced: false,
  },
  {
    id: 'nox-off',
    name: 'NOx OFF',
    category: 'emission',
    credits: 2,
    price: '45€',
    description: 'Disables NOx sensor monitoring and related DTCs.',
    beginner_tip: 'NOx sensors monitor nitrogen oxide levels. Often fails on older vehicles causing expensive replacements.',
    warnings: [],
    requires_dtcs: true,
    is_advanced: false,
  },
  {
    id: 'swirl-off',
    name: 'Swirl Flaps OFF',
    category: 'emission',
    credits: 2,
    price: '50€',
    description: 'Disables intake swirl flap monitoring.',
    beginner_tip: 'Swirl flaps control air flow in the intake manifold. They can break and fall into the engine if not removed.',
    warnings: [],
    requires_dtcs: false,
    is_advanced: false,
  },
  {
    id: 'cat-off',
    name: 'CAT OFF',
    category: 'emission',
    credits: 2,
    price: '50€',
    description: 'Disables catalytic converter monitoring.',
    beginner_tip: 'Removes catalyst efficiency monitoring faults after decat or sport cat installation.',
    warnings: [],
    requires_dtcs: true,
    is_advanced: false,
  },
  {
    id: 'maf-off',
    name: 'MAF OFF',
    category: 'emission',
    credits: 2,
    price: '50€',
    description: 'Disables Mass Air Flow sensor and switches to calculated load.',
    beginner_tip: 'MAF delete forces the ECU to calculate airflow from other sensors instead of measuring it directly.',
    warnings: ['MAF delete changes how the ECU calculates fueling. Only recommended if MAF sensor is defective or removed.'],
    requires_dtcs: false,
    is_advanced: false,
  },

  // ── Acoustic & Features ─────────────────────────────────
  {
    id: 'pops-bangs',
    name: 'Pops & Bangs / Crackle Map',
    category: 'acoustic',
    credits: 3,
    price: '60€',
    description: 'Exhaust crackles and pops on overrun (deceleration).',
    beginner_tip: 'Creates crackling sounds from the exhaust when you lift off the throttle. Works best on petrol engines.',
    warnings: ['Pops & Bangs work best on petrol vehicles. On diesel, results may be limited or not possible.'],
    requires_dtcs: false,
    is_advanced: false,
  },
  {
    id: 'vmax-off',
    name: 'Vmax OFF (Speed Limiter)',
    category: 'acoustic',
    credits: 1,
    price: '50€',
    description: 'Removes electronic top speed limiter.',
    beginner_tip: 'Removes the factory speed limiter. Your actual top speed depends on power and aerodynamics.',
    warnings: [],
    requires_dtcs: false,
    is_advanced: false,
  },
  {
    id: 'start-stop-off',
    name: 'Start/Stop OFF',
    category: 'acoustic',
    credits: 1,
    price: '40€',
    description: 'Permanently disables automatic engine start/stop system.',
    beginner_tip: 'Disables the auto start/stop feature permanently so it doesn\'t activate at traffic lights.',
    warnings: [],
    requires_dtcs: false,
    is_advanced: false,
  },
  {
    id: 'dtc-off',
    name: 'DTC OFF (Specific Fault Codes)',
    category: 'acoustic',
    credits: 1,
    price: '40€',
    description: 'Removes specific fault codes from ECU monitoring.',
    beginner_tip: 'Removes specific fault codes that keep coming back after hardware modifications.',
    warnings: [],
    requires_dtcs: true,
    is_advanced: false,
  },
  {
    id: 'hot-start-fix',
    name: 'Hot Start Fix',
    category: 'acoustic',
    credits: 1,
    price: '40€',
    description: 'Fixes difficult hot restart issues (common on modified vehicles).',
    beginner_tip: 'Some vehicles struggle to restart when the engine is hot. This calibration fixes that.',
    warnings: [],
    requires_dtcs: false,
    is_advanced: false,
  },
  {
    id: 'cold-start-fix',
    name: 'Cold Start Reduction',
    category: 'acoustic',
    credits: 1,
    price: '50€',
    description: 'Reduces cold start enrichment for smoother cold starts.',
    beginner_tip: 'Reduces the high-RPM and rich fueling during cold starts for quieter operation.',
    warnings: [],
    requires_dtcs: false,
    is_advanced: false,
  },

  // ── Advanced / Custom ECU ───────────────────────────────
  {
    id: 'clone-ecu',
    name: 'Clone ECU',
    category: 'advanced',
    credits: 6,
    price: '100€',
    description: 'Clone one ECU to another (hardware replacement). Requires both original and donor files.',
    beginner_tip: 'ECU cloning copies all calibration data from a broken ECU to a replacement unit.',
    warnings: ['Both the original and donor ECU files are required. Provide full bench reads.'],
    requires_dtcs: false,
    is_advanced: true,
  },
  {
    id: 'clone-tcu',
    name: 'Clone TCU',
    category: 'advanced',
    credits: 6,
    price: '120€',
    description: 'Clone TCU (Transmission Control Unit) to replacement hardware.',
    beginner_tip: 'Same as ECU cloning but for the gearbox computer.',
    warnings: ['Both the original and donor TCU files are required.'],
    requires_dtcs: false,
    is_advanced: true,
  },
  {
    id: 'eeprom-service',
    name: 'EEPROM Service',
    category: 'advanced',
    credits: 6,
    price: '80€',
    description: 'EEPROM reading, writing, or repair for ECU configuration data.',
    beginner_tip: 'EEPROM contains VIN, ISN, immobilizer data, and adaptation values. Corrupted EEPROM can prevent starting.',
    warnings: ['EEPROM work is delicate. Incorrect data can brick the ECU permanently.'],
    requires_dtcs: false,
    is_advanced: true,
  },
  {
    id: 'frf-odx',
    name: 'FRF / ODX Extraction',
    category: 'advanced',
    credits: 4,
    price: '60€',
    description: 'Extract flash data from FRF/ODX container files.',
    beginner_tip: 'FRF/ODX are manufacturer container files. Extraction provides the raw flash data needed for tuning.',
    warnings: [],
    requires_dtcs: false,
    is_advanced: true,
  },
  {
    id: 'cvn-fix',
    name: 'CVN Fix',
    category: 'advanced',
    credits: 5,
    price: '100€',
    description: 'Calibration Verification Number correction after ECU modification.',
    beginner_tip: 'CVN is a checksum used by dealers to detect modifications. CVN fix restores the expected value.',
    warnings: [],
    requires_dtcs: false,
    is_advanced: true,
  },
  {
    id: 'recovery',
    name: 'Recovery / Unbrick ECU',
    category: 'advanced',
    credits: 8,
    price: '120€',
    description: 'Emergency ECU recovery after failed flash or bricked unit.',
    beginner_tip: 'If your ECU stopped responding after a flash attempt, this service may recover it.',
    warnings: ['This is an emergency service. Please provide as much detail as possible about what happened, error codes from your tool, and screenshots if available.'],
    requires_dtcs: false,
    is_advanced: true,
  },
  {
    id: 'bench-unlock',
    name: 'Bench Unlock',
    category: 'advanced',
    credits: 5,
    price: '80€',
    description: 'Unlock ECU for bench reading/writing capability.',
    beginner_tip: 'Some ECUs are locked and cannot be read on the bench. This unlocks them for full access.',
    warnings: [],
    requires_dtcs: false,
    is_advanced: true,
  },
  {
    id: 'boot-unlock',
    name: 'Boot Unlock',
    category: 'advanced',
    credits: 6,
    price: '100€',
    description: 'Unlock ECU boot mode for recovery or full read access.',
    beginner_tip: 'Boot mode gives direct access to the ECU chip. Required when OBD and bench methods fail.',
    warnings: ['Boot mode requires opening the ECU and direct chip connection. Risk of damage if done incorrectly.'],
    requires_dtcs: false,
    is_advanced: true,
  },
  {
    id: 'tprot-patch',
    name: 'TProt Patch',
    category: 'advanced',
    credits: 5,
    price: '70€',
    description: 'Tuning Protection bypass for locked ECUs.',
    beginner_tip: 'TProt is a protection system that prevents unauthorized ECU modifications. This patches it.',
    warnings: [],
    requires_dtcs: false,
    is_advanced: true,
  },
  {
    id: 'vin-correction',
    name: 'VIN Correction',
    category: 'advanced',
    credits: 4,
    price: '70€',
    description: 'Correct or update VIN number stored in ECU.',
    beginner_tip: 'VIN correction updates the vehicle identification number stored inside the ECU memory.',
    warnings: ['VIN correction is for legitimate hardware replacement only.'],
    requires_dtcs: false,
    is_advanced: true,
  },
  {
    id: 'immo-off',
    name: 'Immo OFF',
    category: 'advanced',
    credits: 4,
    price: '80€',
    description: 'Disable immobilizer system in ECU.',
    beginner_tip: 'Immobilizer prevents the engine from starting without the correct key signal. Disabling it is useful for ECU swaps.',
    warnings: ['Immo OFF removes anti-theft protection. For legitimate use only.'],
    requires_dtcs: false,
    is_advanced: true,
  },
  {
    id: 'virgin-file',
    name: 'Virgin File',
    category: 'advanced',
    credits: 4,
    price: '90€',
    description: 'Reset ECU to virgin/unprogrammed state for new key learning.',
    beginner_tip: 'Virgin state allows the ECU to accept new keys and relearn the immobilizer from scratch.',
    warnings: ['After virgin reset, all keys must be reprogrammed. Vehicle will not start until new keys are learned.'],
    requires_dtcs: false,
    is_advanced: true,
  },
  {
    id: 'isn-sync',
    name: 'ISN Sync',
    category: 'advanced',
    credits: 5,
    price: '100€',
    description: 'Synchronize ISN between DME and CAS/FEM (BMW specific).',
    beginner_tip: 'ISN is a security code that must match between ECU and key module. Needed after ECU or module replacement.',
    warnings: ['ISN Sync is mainly for BMW/Mini. Requires both DME and CAS/FEM data.'],
    requires_dtcs: false,
    is_advanced: true,
  },

  // ── Gearbox / TCU ──────────────────────────────────────
  {
    id: 'tcu-tune',
    name: 'TCU Tune (Gearbox Optimization)',
    category: 'gearbox',
    credits: 5,
    price: '140€',
    description: 'Optimize shift points, torque limits, and gear behavior for automatic/DSG/PDK transmissions.',
    beginner_tip: 'TCU tune makes gear shifts faster and allows higher torque to pass through the gearbox.',
    warnings: ['TCU tune must match your ECU power level. Provide your current ECU tune stage.'],
    requires_dtcs: false,
    is_advanced: true,
  },

  // ── Diagnostic & Support ────────────────────────────────
  {
    id: 'diagnostic-help',
    name: 'Diagnostic Help',
    category: 'diagnostic',
    credits: 1,
    price: '50€',
    description: 'Remote diagnostic assistance for troubleshooting issues.',
    beginner_tip: 'If you have a problem you can\'t solve, our engineers can help analyze your data remotely.',
    warnings: [],
    requires_dtcs: true,
    is_advanced: false,
  },
  {
    id: 'log-review',
    name: 'Log Review',
    category: 'diagnostic',
    credits: 1,
    price: '40€',
    description: 'Professional analysis of your data logs.',
    beginner_tip: 'Send us your log files and we\'ll analyze them for issues or optimization opportunities.',
    warnings: [],
    requires_dtcs: false,
    is_advanced: false,
  },
  {
    id: 'file-verification',
    name: 'File Verification',
    category: 'diagnostic',
    credits: 1,
    price: '30€',
    description: 'Verify if a modified file is correct and safe to flash.',
    beginner_tip: 'If you received a file from another source and want to verify it before flashing, we can check it.',
    warnings: [],
    requires_dtcs: false,
    is_advanced: false,
  },
  {
    id: 'checksum-only',
    name: 'Checksum Correction Only',
    category: 'diagnostic',
    credits: 1,
    price: '30€',
    description: 'Correct checksum in a modified file.',
    beginner_tip: 'If you modified a file yourself but need the checksum corrected, this service handles that.',
    warnings: [],
    requires_dtcs: false,
    is_advanced: false,
  },
  {
    id: 'custom-review',
    name: 'Custom Manual Review',
    category: 'diagnostic',
    credits: 2,
    price: '60€',
    description: 'Manual review and analysis of your specific situation.',
    beginner_tip: 'For complex or unusual requests that don\'t fit standard services.',
    warnings: [],
    requires_dtcs: false,
    is_advanced: false,
  },
  {
    id: 'custom-request',
    name: 'Special / Custom Request',
    category: 'diagnostic',
    credits: 0, // credits determined after review
    price: 'Custom Quote',
    description: 'Describe your specific need and we\'ll evaluate and quote it.',
    beginner_tip: 'Use this for anything not listed above. We\'ll review your request and get back to you with a quote.',
    warnings: ['Custom requests require manual evaluation. Credit cost will be determined after review.'],
    requires_dtcs: false,
    is_advanced: false,
    is_custom: true,
  },
];

// ===== HELPER FUNCTIONS =====

/**
 * Get all services for a specific category
 */
export function getServicesByCategory(categoryId) {
  return SERVICES.filter(s => s.category === categoryId);
}

/**
 * Get all services for a tab (standard or advanced)
 */
export function getServicesByTab(tab) {
  const cats = Object.values(SERVICE_CATEGORIES).filter(c => c.tab === tab);
  const catIds = cats.map(c => c.id);
  return SERVICES.filter(s => catIds.includes(s.category));
}

/**
 * Get a service by ID
 */
export function getServiceById(id) {
  return SERVICES.find(s => s.id === id) || null;
}

/**
 * Calculate total credits for a list of service IDs
 */
export function calculateTotalCredits(serviceIds) {
  return serviceIds.reduce((total, id) => {
    const service = getServiceById(id);
    return total + (service ? service.credits : 0);
  }, 0);
}

/**
 * Get all warnings for a list of selected service IDs
 */
export function getWarningsForServices(serviceIds) {
  const warnings = [];
  serviceIds.forEach(id => {
    const service = getServiceById(id);
    if (service && service.warnings.length > 0) {
      warnings.push({ service: service.name, warnings: service.warnings });
    }
  });
  return warnings;
}

/**
 * Check if any selected service requires DTC information
 */
export function requiresDTCs(serviceIds) {
  return serviceIds.some(id => {
    const service = getServiceById(id);
    return service && service.requires_dtcs;
  });
}

/**
 * Get categories sorted by order
 */
export function getSortedCategories() {
  return Object.values(SERVICE_CATEGORIES).sort((a, b) => a.order - b.order);
}

// ===== CHECKSUM AUTO-DETECTION =====
export const TOOL_CHECKSUM_MAP = {
  'Autotuner':  'auto',
  'KessV3':     'auto',
  'BFlash':     'auto',
  'AMT Flex':   'auto',
  'Dfox':       'auto',
  'CMD Flash':  'auto',
  'Foxflash':   'auto',
  'PCM Flash':  'manual',
  'K-TAG':      'auto',
  'Kess V2':    'auto',
  'KT200':      'manual',
  'MPPS':       'manual',
  'Other':      'unknown',
};

/**
 * Get checksum recommendation for a tool
 * @returns {'auto'|'manual'|'unknown'}
 */
export function getChecksumRecommendation(toolName) {
  return TOOL_CHECKSUM_MAP[toolName] || 'unknown';
}

// ===== VEHICLE CATEGORIES =====
export const VEHICLE_TYPES = [
  { value: 'Car', label: 'Car / Passenger', category_id: 'cars' },
  { value: 'Truck', label: 'Truck / Heavy Duty', category_id: 'trucks' },
  { value: 'Van', label: 'Van / LCV', category_id: 'vans' },
  { value: 'Agricultural', label: 'Agricultural / Tractor', category_id: 'agri' },
  { value: 'Bike', label: 'Bike / Motorcycle / ATV', category_id: 'moto' },
  { value: 'Marine', label: 'Marine / Jetski / Boat', category_id: 'marine' },
  { value: 'Construction', label: 'Construction Equipment', category_id: 'construction' },
];
