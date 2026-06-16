// ===== Brand Logo Library =====
// Local image paths or premium inline SVG Data URIs for all vehicle brands.
// Optimized for dark backgrounds with high-fidelity, transparent visual aesthetics.

import allCarBrandsAndModels from '../data/all_car_brands_and_models.json';

const scrapedLogos = {};
allCarBrandsAndModels.forEach(item => {
  if (item.logo) {
    scrapedLogos[item.brand] = item.logo;
  }
});


// ===== High-Fidelity Custom Inline SVG Logo Catalog =====
// Fully self-contained, guaranteeing zero CORS, network, or hotlinking issues.

const MERCURY_SVG = `data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 120'>
  <rect width='116' height='116' x='2' y='2' rx='20' fill='#121212' stroke='#6b7280' stroke-width='2'/>
  <path d='M35 70 C 40 40, 50 35, 60 55 C 70 35, 80 40, 85 70' fill='none' stroke='#ffffff' stroke-width='5' stroke-linecap='round'/>
  <path d='M48 65 C 53 50, 60 55, 60 55 C 60 55, 67 50, 72 65' fill='none' stroke='#94a3b8' stroke-width='3' stroke-linecap='round'/>
  <text x='60' y='96' text-anchor='middle' dominant-baseline='middle' font-family='Arial, sans-serif' font-weight='800' font-size='11' fill='#ffffff' letter-spacing='1.5'>MERCURY</text>
</svg>`)}`;

const VOLVO_PENTA_SVG = `data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 120'>
  <rect width='116' height='116' x='2' y='2' rx='20' fill='#081a2e' stroke='#38bdf8' stroke-width='2'/>
  <circle cx='60' cy='48' r='18' fill='none' stroke='#38bdf8' stroke-width='3'/>
  <path d='M72 36 L80 28 M80 28 L72 28 M80 28 L80 36' fill='none' stroke='#38bdf8' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'/>
  <text x='60' y='82' text-anchor='middle' dominant-baseline='middle' font-family='Arial, sans-serif' font-weight='800' font-size='11' fill='#ffffff' letter-spacing='0.5'>VOLVO PENTA</text>
</svg>`)}`;

const CUMMINS_SVG = `data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 120'>
  <rect width='116' height='116' x='2' y='2' rx='20' fill='#ffffff' stroke='#e31b23' stroke-width='2'/>
  <path d='M82 40 C 72 30, 48 30, 48 60 C 48 90, 72 90, 82 80' fill='none' stroke='#e31b23' stroke-width='12' stroke-linecap='round'/>
  <text x='63' y='64' text-anchor='middle' dominant-baseline='middle' font-family='Arial, sans-serif' font-weight='900' font-size='14' fill='#111111'>C</text>
  <text x='60' y='100' text-anchor='middle' dominant-baseline='middle' font-family='Arial, sans-serif' font-weight='800' font-size='10' fill='#111111' letter-spacing='0.5'>CUMMINS</text>
</svg>`)}`;

const SEA_RAY_SVG = `data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 120'>
  <rect width='116' height='116' x='2' y='2' rx='20' fill='#111111' stroke='#444444' stroke-width='2'/>
  <path d='M40 70 C 40 50, 50 45, 60 45 C 70 45, 75 50, 75 58 C 75 68, 65 72, 60 72 C 50 72, 45 75, 45 80' fill='none' stroke='#ffffff' stroke-width='6' stroke-linecap='round'/>
  <path d='M50 38 C 65 38, 80 43, 80 55 C 80 65, 70 70, 58 70' fill='none' stroke='#ffffff' stroke-width='6' stroke-linecap='round'/>
  <text x='60' y='100' text-anchor='middle' dominant-baseline='middle' font-family='Arial, sans-serif' font-weight='800' font-size='11' fill='#ffffff' letter-spacing='1'>SEA RAY</text>
</svg>`)}`;

const BAYLINER_SVG = `data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 120'>
  <rect width='116' height='116' x='2' y='2' rx='20' fill='#031628' stroke='#00a2e8' stroke-width='2'/>
  <path d='M45 35 L45 85 M45 35 C65 35, 75 45, 68 57 C78 68, 65 85, 45 85' fill='none' stroke='#00a2e8' stroke-width='6' stroke-linecap='round' stroke-linejoin='round'/>
  <path d='M45 58 L65 58' fill='none' stroke='#00a2e8' stroke-width='6' stroke-linecap='round'/>
  <text x='60' y='102' text-anchor='middle' dominant-baseline='middle' font-family='Arial, sans-serif' font-weight='700' font-size='11' fill='#ffffff' letter-spacing='1'>BAYLINER</text>
</svg>`)}`;

const CHAPARRAL_SVG = `data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 120'>
  <rect width='116' height='116' x='2' y='2' rx='20' fill='#0d0d0d' stroke='#555555' stroke-width='2'/>
  <ellipse cx='60' cy='55' rx='35' ry='22' fill='none' stroke='#cccccc' stroke-width='3'/>
  <path d='M38 55 C 50 40, 75 40, 82 55 C 72 55, 60 52, 45 62' fill='none' stroke='#ffffff' stroke-width='4' stroke-linecap='round'/>
  <text x='60' y='98' text-anchor='middle' dominant-baseline='middle' font-family='Arial, sans-serif' font-weight='700' font-size='10' fill='#ffffff' letter-spacing='1'>CHAPARRAL</text>
</svg>`)}`;

const REGAL_SVG = `data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 120'>
  <rect width='116' height='116' x='2' y='2' rx='20' fill='#141108' stroke='#d4af37' stroke-width='2'/>
  <path d='M45 35 L45 80 M45 35 C70 35, 75 50, 60 58 C72 68, 78 80, 78 80' fill='none' stroke='#d4af37' stroke-width='6' stroke-linecap='round' stroke-linejoin='round'/>
  <path d='M45 58 L60 58' fill='none' stroke='#d4af37' stroke-width='6' stroke-linecap='round'/>
  <text x='60' y='100' text-anchor='middle' dominant-baseline='middle' font-family='Arial, sans-serif' font-weight='700' font-size='11' fill='#ffffff' letter-spacing='1.5'>REGAL</text>
</svg>`)}`;

const FOUR_WINNS_SVG = `data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 120'>
  <rect width='116' height='116' x='2' y='2' rx='20' fill='#051428' stroke='#2563eb' stroke-width='2'/>
  <g transform='translate(35, 30)'>
    <path d='M0 0 C 15 -5, 25 5, 45 0 L 45 8 C 25 13, 15 3, 0 8 Z' fill='#2563eb'/>
    <path d='M0 12 C 15 7, 25 17, 45 12 L 45 20 C 25 25, 15 15, 0 20 Z' fill='#3b82f6'/>
    <path d='M0 24 C 15 19, 25 29, 45 24 L 45 32 C 25 37, 15 27, 0 32 Z' fill='#60a5fa'/>
    <path d='M0 36 C 15 31, 25 41, 45 36 L 45 44 C 25 49, 15 39, 0 44 Z' fill='#93c5fd'/>
  </g>
  <text x='60' y='100' text-anchor='middle' dominant-baseline='middle' font-family='Arial, sans-serif' font-weight='700' font-size='10' fill='#ffffff' letter-spacing='1'>FOUR WINNS</text>
</svg>`)}`;

const COBALT_SVG = `data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 120'>
  <rect width='116' height='116' x='2' y='2' rx='20' fill='#020e24' stroke='#1d4ed8' stroke-width='2'/>
  <circle cx='60' cy='52' r='22' fill='none' stroke='#94a3b8' stroke-width='2' stroke-dasharray='6 3'/>
  <path d='M72 40 C 60 36, 45 44, 45 55 C 45 66, 60 70, 72 65' fill='none' stroke='#ffffff' stroke-width='5' stroke-linecap='round'/>
  <text x='60' y='98' text-anchor='middle' dominant-baseline='middle' font-family='Arial, sans-serif' font-weight='800' font-size='11' fill='#ffffff' letter-spacing='1.5'>COBALT</text>
</svg>`)}`;

const MONTEREY_SVG = `data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 120'>
  <rect width='116' height='116' x='2' y='2' rx='20' fill='#1b1c1e' stroke='#4b5563' stroke-width='2'/>
  <path d='M35 75 L50 35 L60 55 L70 35 L85 75' fill='none' stroke='#ffffff' stroke-width='6' stroke-linecap='round' stroke-linejoin='round'/>
  <text x='60' y='100' text-anchor='middle' dominant-baseline='middle' font-family='Arial, sans-serif' font-weight='700' font-size='11' fill='#ffffff' letter-spacing='1'>MONTEREY</text>
</svg>`)}`;

const LUND_SVG = `data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 120'>
  <rect width='116' height='116' x='2' y='2' rx='20' fill='#2d0a0a' stroke='#ef4444' stroke-width='2'/>
  <text x='60' y='58' text-anchor='middle' dominant-baseline='middle' font-family='Arial, sans-serif' font-weight='900' font-size='24' fill='#ffffff' letter-spacing='1' transform='rotate(-5, 60, 58)'>LUND</text>
  <path d='M25 72 Q 60 78, 95 72' fill='none' stroke='#ef4444' stroke-width='3'/>
</svg>`)}`;

const TRACKER_SVG = `data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 120'>
  <rect width='116' height='116' x='2' y='2' rx='20' fill='#111111' stroke='#ef4444' stroke-width='2'/>
  <text x='60' y='56' text-anchor='middle' dominant-baseline='middle' font-family='Arial, sans-serif' font-style='italic' font-weight='900' font-size='16' fill='#ffffff' letter-spacing='0.5'>TRACKER</text>
  <line x1='25' y1='72' x2='95' y2='72' stroke='#ef4444' stroke-width='4'/>
</svg>`)}`;

const FENDT_SVG = `data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 120'>
  <rect width='116' height='116' x='2' y='2' rx='20' fill='#1b3a15' stroke='#3a7d2c' stroke-width='2'/>
  <text x='60' y='65' text-anchor='middle' dominant-baseline='middle' font-family='Arial, sans-serif' font-weight='800' font-size='20' fill='#ffffff' letter-spacing='1'>FENDT</text>
</svg>`)}`;

const CLAAS_SVG = `data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 120'>
  <rect width='116' height='116' x='2' y='2' rx='20' fill='#ffffff' stroke='#df231a' stroke-width='2'/>
  <text x='60' y='60' text-anchor='middle' dominant-baseline='middle' font-family='Arial, sans-serif' font-weight='900' font-size='24' fill='#df231a' letter-spacing='1'>CLAAS</text>
</svg>`)}`;

const CASE_IH_SVG = `data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 120'>
  <rect width='116' height='116' x='2' y='2' rx='20' fill='#360a0a' stroke='#e1251b' stroke-width='2'/>
  <text x='60' y='55' text-anchor='middle' dominant-baseline='middle' font-family='Arial, sans-serif' font-weight='900' font-size='20' fill='#ffffff' letter-spacing='1.5'>CASE</text>
  <text x='60' y='80' text-anchor='middle' dominant-baseline='middle' font-family='Arial, sans-serif' font-weight='900' font-size='22' fill='#e1251b'>IH</text>
</svg>`)}`;

const NEW_HOLLAND_SVG = `data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 120'>
  <rect width='116' height='116' x='2' y='2' rx='20' fill='#041530' stroke='#003da5' stroke-width='2'/>
  <path d='M60 25 C45 35 45 65 60 75 C75 65 75 35 60 25 Z' fill='#ffbc00' opacity='0.9'/>
  <path d='M60 25 C53 35 53 65 60 75 Z' fill='#e0a500'/>
  <text x='60' y='100' text-anchor='middle' dominant-baseline='middle' font-family='Arial, sans-serif' font-weight='700' font-size='11' fill='#ffffff' letter-spacing='0.5'>NEW HOLLAND</text>
</svg>`)}`;

const MASSEY_FERGUSON_SVG = `data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 120'>
  <rect width='116' height='116' x='2' y='2' rx='20' fill='#2d0505' stroke='#e31b23' stroke-width='2'/>
  <g transform='translate(60, 52) scale(1.1)'>
    <polygon points='0,0 -16,-20 16,-20' fill='#e31b23'/>
    <polygon points='0,0 -20,16 -4,22' fill='#e31b23'/>
    <polygon points='0,0 4,22 20,16' fill='#e31b23'/>
  </g>
  <text x='60' y='96' text-anchor='middle' dominant-baseline='middle' font-family='Arial, sans-serif' font-weight='700' font-size='9' fill='#ffffff' letter-spacing='0.5'>MASSEY FERGUSON</text>
</svg>`)}`;

// ===== Premium Custom Inline SVG Brand Logos for Missing Assets =====
const SUZUKI_SVG = `data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 120'>
  <rect width='116' height='116' x='2' y='2' rx='20' fill='#0e0e0e' stroke='#e11d48' stroke-width='2'/>
  <path d='M42 35 C42 32, 45 30, 50 30 H75 C82 30, 82 38, 72 48 L52 68 H70 C75 68, 78 70, 78 74 C78 77, 75 80, 70 80 H45 C38 80, 38 72, 48 62 L68 42 H50 C45 42, 42 40, 42 35 Z' fill='url(#szGrad)'/>
  <defs>
    <linearGradient id='szGrad' x1='0%' y1='0%' x2='100%' y2='100%'>
      <stop offset='0%' stop-color='#f43f5e'/>
      <stop offset='100%' stop-color='#be123c'/>
    </linearGradient>
  </defs>
  <text x='60' y='102' text-anchor='middle' dominant-baseline='middle' font-family='Arial, sans-serif' font-weight='900' font-size='11' fill='#ffffff' letter-spacing='1.5'>SUZUKI</text>
</svg>`)}`;

const TRIUMPH_SVG = `data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 120'>
  <rect width='116' height='116' x='2' y='2' rx='20' fill='#08111c' stroke='#1e293b' stroke-width='2'/>
  <circle cx='60' cy='52' r='25' fill='none' stroke='#ffffff' stroke-width='2' opacity='0.15'/>
  <path d='M38 35 H82 M60 35 V75 C60 82, 45 80, 40 75' fill='none' stroke='#ffffff' stroke-width='5' stroke-linecap='round' stroke-linejoin='round'/>
  <path d='M32 55 C 45 68, 75 68, 88 55' fill='none' stroke='#3b82f6' stroke-width='3.5' stroke-linecap='round'/>
  <text x='60' y='100' text-anchor='middle' dominant-baseline='middle' font-family='Georgia, serif' font-style='italic' font-weight='bold' font-size='10' fill='#ffffff' letter-spacing='2'>TRIUMPH</text>
</svg>`)}`;

const APRILIA_SVG = `data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 120'>
  <rect width='116' height='116' x='2' y='2' rx='20' fill='#111111' stroke='#dc2626' stroke-width='2'/>
  <rect width='76' height='40' x='22' y='32' rx='6' fill='#dc2626'/>
  <text x='60' y='52' text-anchor='middle' dominant-baseline='middle' font-family='Arial, sans-serif' font-style='italic' font-weight='900' font-size='18' fill='#ffffff' letter-spacing='0.5'>aprilia</text>
  <text x='60' y='96' text-anchor='middle' dominant-baseline='middle' font-family='Arial, sans-serif' font-weight='800' font-size='10' fill='#94a3b8' letter-spacing='2'>RACING</text>
</svg>`)}`;

const ALFA_ROMEO_SVG = `data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 120'>
  <rect width='116' height='116' x='2' y='2' rx='20' fill='#0a0a0c' stroke='#8e1b1b' stroke-width='2'/>
  <circle cx='60' cy='52' r='28' fill='#0e3a5f' stroke='#d4af37' stroke-width='2'/>
  <clipPath id='ring'>
    <circle cx='60' cy='52' r='27'/>
  </clipPath>
  <g clip-path='url(#ring)'>
    <rect x='32' y='24' width='28' height='56' fill='#ffffff'/>
    <line x1='46' y1='24' x2='46' y2='80' stroke='#e11d48' stroke-width='6'/>
    <line x1='32' y1='52' x2='60' y2='52' stroke='#e11d48' stroke-width='6'/>
    <rect x='60' y='24' width='28' height='56' fill='#0e3a5f'/>
    <path d='M68 65 Q 64 55, 68 45 Q 72 35, 78 45 Q 84 55, 78 65 Z' fill='none' stroke='#22c55e' stroke-width='4' stroke-linecap='round'/>
    <circle cx='76' cy='40' r='3' fill='#e11d48'/>
  </g>
  <text x='60' y='100' text-anchor='middle' dominant-baseline='middle' font-family='Arial, sans-serif' font-weight='800' font-size='10' fill='#ffffff' letter-spacing='1'>ALFA ROMEO</text>
</svg>`)}`;

const MAZDA_SVG = `data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 120'>
  <rect width='116' height='116' x='2' y='2' rx='20' fill='#18181b' stroke='#52525b' stroke-width='2'/>
  <circle cx='60' cy='52' r='24' fill='none' stroke='#d4d4d8' stroke-width='3.5'/>
  <path d='M42 48 C 50 54, 52 64, 60 64 C 68 64, 70 54, 78 48 C 70 68, 50 68, 42 48 Z' fill='#e4e4e7'/>
  <path d='M45 42 Q 60 55, 75 42' fill='none' stroke='#e4e4e7' stroke-width='2' stroke-linecap='round'/>
  <text x='60' y='100' text-anchor='middle' dominant-baseline='middle' font-family='Arial, sans-serif' font-weight='900' font-size='11' fill='#ffffff' letter-spacing='2'>MAZDA</text>
</svg>`)}`;

const FERRARI_SVG = `data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 120'>
  <rect width='116' height='116' x='2' y='2' rx='20' fill='#0a0a0a' stroke='#facc15' stroke-width='2'/>
  <path d='M40 30 H80 V60 C80 75, 60 88, 60 88 C60 88, 40 75, 40 60 Z' fill='#facc15'/>
  <rect x='40' y='30' width='13.3' height='6' fill='#22c55e'/>
  <rect x='53.3' y='30' width='13.3' height='6' fill='#ffffff'/>
  <rect x='66.6' y='30' width='13.4' height='6' fill='#ef4444'/>
  <path d='M58 74 C58 74, 56 68, 59 66 C62 64, 65 65, 65 62 C65 60, 60 59, 61 55 C62 51, 66 52, 67 47 C65 47, 62 49, 61 47 C60 45, 62 43, 60 41 C58 41, 57 44, 55 45 C54 46, 52 45, 52 46 C52 48, 55 50, 54 53 C53 56, 49 58, 51 63 C52 66, 56 65, 55 70 C54 75, 58 74, 58 74 Z' fill='#000000'/>
  <text x='48' y='80' font-family='Georgia, serif' font-weight='bold' font-size='7' fill='#000000'>S</text>
  <text x='66' y='80' font-family='Georgia, serif' font-weight='bold' font-size='7' fill='#000000'>F</text>
  <text x='60' y='104' text-anchor='middle' dominant-baseline='middle' font-family='Georgia, serif' font-weight='900' font-size='10' fill='#ffffff' letter-spacing='2'>FERRARI</text>
</svg>`)}`;

const LAMBORGHINI_SVG = `data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 120'>
  <rect width='116' height='116' x='2' y='2' rx='20' fill='#09090b' stroke='#d4af37' stroke-width='2'/>
  <path d='M42 32 H78 V62 C78 74, 60 84, 60 84 C60 84, 42 74, 42 62 Z' fill='#121214' stroke='#d4af37' stroke-width='2'/>
  <path d='M50 48 L56 46 L60 52 L64 46 L70 48 L66 56 L64 64 L56 64 L54 56 Z M56 42 L58 46 M64 42 L62 46' stroke='#d4af37' stroke-width='2' fill='#d4af37' stroke-linecap='round' stroke-linejoin='round'/>
  <text x='60' y='102' text-anchor='middle' dominant-baseline='middle' font-family='Arial, sans-serif' font-weight='800' font-size='8.5' fill='#ffffff' letter-spacing='1.2'>LAMBORGHINI</text>
</svg>`)}`;

// Helper to create consistent circular badge logos
function circleBadge(letter, color = '#c0c0c0') {
  return `data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0%' stop-color='#e0e0e0'/><stop offset='50%' stop-color='${color}'/><stop offset='100%' stop-color='#808080'/></linearGradient><linearGradient id='bg' x1='0' y1='0' x2='0' y2='1'><stop offset='0%' stop-color='#1a1a1a'/><stop offset='100%' stop-color='#0a0a0a'/></defs><circle cx='50' cy='50' r='48' fill='url(#bg)' stroke='url(#g)' stroke-width='2.5'/><text x='50' y='55' text-anchor='middle' dominant-baseline='middle' font-family='Arial,Helvetica,sans-serif' font-weight='700' font-size='32' fill='url(#g)'>${letter}</text></svg>`)}`;
}

const SUBARU_SVG = `data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 120'>
  <rect width='116' height='116' x='2' y='2' rx='20' fill='#02183a' stroke='#1e40af' stroke-width='2'/>
  <ellipse cx='60' cy='52' rx='36' ry='22' fill='none' stroke='#3b82f6' stroke-width='2'/>
  <circle cx='40' cy='52' r='7' fill='#ffffff'/>
  <circle cx='58' cy='44' r='4' fill='#ffffff'/>
  <circle cx='68' cy='48' r='4' fill='#ffffff'/>
  <circle cx='62' cy='58' r='4' fill='#ffffff'/>
  <circle cx='76' cy='54' r='4' fill='#ffffff'/>
  <circle cx='72' cy='62' r='3' fill='#ffffff'/>
  <text x='60' y='98' text-anchor='middle' dominant-baseline='middle' font-family='Arial, sans-serif' font-weight='900' font-size='10' fill='#ffffff' letter-spacing='2'>SUBARU</text>
</svg>`)}`;

const TESLA_SVG = `data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 120'>
  <rect width='116' height='116' x='2' y='2' rx='20' fill='#0e0e0e' stroke='#dc2626' stroke-width='2'/>
  <path d='M35 32 C50 34, 70 34, 85 32 M35 38 C50 48, 60 58, 60 82 C60 58, 70 48, 85 38' fill='none' stroke='#dc2626' stroke-width='7' stroke-linecap='round' stroke-linejoin='round'/>
  <path d='M45 32 Q 60 38, 75 32' fill='none' stroke='#dc2626' stroke-width='3'/>
  <text x='60' y='102' text-anchor='middle' dominant-baseline='middle' font-family='Arial, sans-serif' font-weight='900' font-size='11' fill='#ffffff' letter-spacing='3'>TESLA</text>
</svg>`)}`;

const LEXUS_SVG = `data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 120'>
  <rect width='116' height='116' x='2' y='2' rx='20' fill='#121214' stroke='#94a3b8' stroke-width='2'/>
  <circle cx='60' cy='50' r='24' fill='none' stroke='#94a3b8' stroke-width='4'/>
  <path d='M48 62 L60 38 H68 L56 62 H72' fill='none' stroke='#ffffff' stroke-width='5' stroke-linecap='round' stroke-linejoin='round'/>
  <text x='60' y='98' text-anchor='middle' dominant-baseline='middle' font-family='Arial, sans-serif' font-weight='800' font-size='11' fill='#ffffff' letter-spacing='2.5'>LEXUS</text>
</svg>`)}`;

const SMART_SVG = `data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 120'>
  <rect width='116' height='116' x='2' y='2' rx='20' fill='#1c1c1e' stroke='#e5e7eb' stroke-width='2'/>
  <circle cx='54' cy='50' r='20' fill='none' stroke='#94a3b8' stroke-width='6' stroke-dasharray='100 30'/>
  <polygon points='72,50 56,38 56,62' fill='#ea580c'/>
  <text x='60' y='98' text-anchor='middle' dominant-baseline='middle' font-family='Arial, sans-serif' font-weight='800' font-size='11' fill='#ffffff' letter-spacing='2'>SMART</text>
</svg>`)}`;

const BRAND_SVG = {
  // CAR BRANDS
  "Audi": "/assets/brands/audi.png",
  "BMW": "/assets/brands/bmw.png",
  "Mercedes": "/assets/brands/mercedes.png",
  "Volkswagen": "/assets/brands/volkswagen.png",
  "Renault": "/assets/brands/renault.png",
  "Peugeot": "/assets/brands/peugeot.png",
  "Toyota": "/assets/brands/toyota.png",
  "Ford": "/assets/brands/ford.png",
  "Seat": "/assets/brands/seat.png",
  "Skoda": "/assets/brands/skoda.png",
  "Citroen": "/assets/brands/citroen.png",
  "Fiat": "/assets/brands/fiat.png",
  "Opel": "/assets/brands/opel.png",
  "Porsche": "/assets/brands/porsche.png",
  "Jaguar": "/assets/brands/jaguar.png",
  "Nissan": "/assets/brands/nissan.png",
  "Hyundai": "/assets/brands/hyundai.png",
  "Kia": "/assets/brands/kia.png",
  "Alfa Romeo": ALFA_ROMEO_SVG,
  "Mazda": MAZDA_SVG,
  "Ferrari": FERRARI_SVG,
  "Lamborghini": LAMBORGHINI_SVG,
  "Smart": SMART_SVG,
  "Subaru": SUBARU_SVG,
  "Tesla": TESLA_SVG,
  "Lexus": LEXUS_SVG,
  "SsangYong": circleBadge('SY', '#0f766e'),
  "Vauxhall": circleBadge('VX', '#dc2626'),
  "Lancia": circleBadge('LN', '#1d4ed8'),
  "Lincoln": circleBadge('LC', '#4b5563'),
  "Lotus": circleBadge('LT', '#eab308'),
  "Luxgen": circleBadge('LX', '#2563eb'),
  "Lynk & Co": circleBadge('LK', '#000000'),

  // TRUCK BRANDS
  "MAN": "/assets/brands/man.png",
  "DAF": "/assets/brands/daf.png",
  "Volvo": "/assets/brands/volvo.png",
  "Scania": "/assets/brands/scania.png",
  "Iveco": "/assets/brands/iveco.png",

  // MOTORCYCLE BRANDS
  "Yamaha": "/assets/brands/yamaha.svg",
  "Honda": "/assets/brands/honda.svg",
  "Ducati": "/assets/brands/ducati.svg",
  "KTM": "/assets/brands/ktm.png",
  "Suzuki": SUZUKI_SVG,
  "Triumph": TRIUMPH_SVG,
  "Aprilia": APRILIA_SVG,

  // BOAT BRANDS
  "Yamaha_Marine": "/assets/brands/yamaha_marine.svg",
  "Caterpillar_Marine": "/assets/brands/caterpillar_marine.svg",
  "Mercury": MERCURY_SVG,
  "Volvo_Penta": VOLVO_PENTA_SVG,
  "Cummins_Marine": CUMMINS_SVG,
  "Sea_Ray": SEA_RAY_SVG,
  "Bayliner": BAYLINER_SVG,
  "Chaparral": CHAPARRAL_SVG,
  "Regal": REGAL_SVG,
  "Four_Winns": FOUR_WINNS_SVG,
  "Cobalt": COBALT_SVG,
  "Monterey": MONTEREY_SVG,
  "Lund": LUND_SVG,
  "Tracker": TRACKER_SVG,

  // AGRICULTURAL BRANDS
  "John Deere": "/assets/brands/john_deere.svg",
  "Fendt": FENDT_SVG,
  "Claas": CLAAS_SVG,
  "Case IH": CASE_IH_SVG,
  "New Holland": NEW_HOLLAND_SVG,
  "Massey Ferguson": MASSEY_FERGUSON_SVG,
  "Steyr": circleBadge('ST', '#b91c1c'),
  "Valtra": circleBadge('VA', '#b91c1c'),
  "Krone": circleBadge('KR', '#15803d'),
  "Lamborghini Tractors": circleBadge('LT', '#eab308')
};

// Fallback badges for other brands not downloaded
const FALLBACKS = {
  "Kawasaki": circleBadge('KW'),
  "Suzuki": circleBadge('SZ', '#3b82f6'),
  "Triumph": circleBadge('TR', '#ef4444'),
  "Aprilia": circleBadge('AP', '#f59e0b'),
  "Alfa Romeo": circleBadge('AR', '#dc2626'),
  "Mazda": circleBadge('MZ', '#4b5563')
};

/**
 * Get image source path or fallback SVG data URI for a brand
 * @param {string} brand - Brand name
 * @returns {string} Path string or data URI string for use in img src
 */
export function getBrandLogo(brand) {
  return BRAND_SVG[brand] || scrapedLogos[brand] || FALLBACKS[brand] || circleBadge(brand.substring(0, 2).toUpperCase());
}

/**
 * Check if a brand has a detailed logo reference or custom fallback
 * @param {string} brand
 * @returns {boolean}
 */
export function hasDetailedLogo(brand) {
  return !!BRAND_SVG[brand] || !!scrapedLogos[brand] || !!FALLBACKS[brand];
}

export default BRAND_SVG;
