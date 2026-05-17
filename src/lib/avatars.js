// ===== Deterministic Illustrated Avatar Generator =====
// Creates unique geometric/illustrated SVG avatars per user

const PALETTES = [
  ['#C41E1E', '#E63946', '#FF6B6B'],  // Red (brand)
  ['#3B82F6', '#60A5FA', '#93C5FD'],  // Blue
  ['#10B981', '#34D399', '#6EE7B7'],  // Green
  ['#F59E0B', '#FBBF24', '#FCD34D'],  // Amber
  ['#8B5CF6', '#A78BFA', '#C4B5FD'],  // Purple
  ['#EC4899', '#F472B6', '#F9A8D4'],  // Pink
  ['#06B6D4', '#22D3EE', '#67E8F9'],  // Cyan
  ['#F97316', '#FB923C', '#FDBA74'],  // Orange
];

function hashStr(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function seededRandom(seed) {
  let s = seed;
  return () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; };
}

/**
 * Generate an illustrated avatar SVG string
 * Each user gets a unique pattern based on their name
 */
export function generateAvatar(name, size = 40) {
  const hash = hashStr(name || 'User');
  const rand = seededRandom(hash);
  const palette = PALETTES[hash % PALETTES.length];
  const bg = palette[0];
  const mid = palette[1];
  const light = palette[2];
  const initial = (name || '?').charAt(0).toUpperCase();
  
  // Determine avatar style based on hash
  const style = hash % 5;
  let patternSVG = '';

  switch (style) {
    case 0: // Geometric circles
      patternSVG = `
        <circle cx="${12 + rand() * 16}" cy="${12 + rand() * 16}" r="${6 + rand() * 8}" fill="${mid}" opacity="0.4"/>
        <circle cx="${22 + rand() * 16}" cy="${22 + rand() * 16}" r="${4 + rand() * 6}" fill="${light}" opacity="0.3"/>
        <circle cx="${8 + rand() * 10}" cy="${28 + rand() * 8}" r="${3 + rand() * 5}" fill="${light}" opacity="0.25"/>
      `;
      break;
    case 1: // Diagonal stripes
      patternSVG = `
        <rect x="-5" y="8" width="50" height="4" rx="2" fill="${mid}" opacity="0.25" transform="rotate(-30 20 20)"/>
        <rect x="-5" y="20" width="50" height="4" rx="2" fill="${light}" opacity="0.2" transform="rotate(-30 20 20)"/>
        <rect x="-5" y="32" width="50" height="3" rx="1.5" fill="${mid}" opacity="0.15" transform="rotate(-30 20 20)"/>
      `;
      break;
    case 2: // Abstract shapes
      patternSVG = `
        <path d="M0,${15 + rand() * 10} Q${10 + rand() * 10},${5 + rand() * 10} ${20 + rand() * 10},${20 + rand() * 15} T40,${25 + rand() * 10}" fill="none" stroke="${mid}" stroke-width="3" opacity="0.3"/>
        <circle cx="${30 + rand() * 8}" cy="${8 + rand() * 8}" r="${3 + rand() * 4}" fill="${light}" opacity="0.3"/>
        <rect x="${5 + rand() * 5}" y="${28 + rand() * 5}" width="${8 + rand() * 6}" height="${8 + rand() * 6}" rx="3" fill="${mid}" opacity="0.2" transform="rotate(${rand() * 45} 15 32)"/>
      `;
      break;
    case 3: // Concentric arcs
      patternSVG = `
        <circle cx="20" cy="20" r="16" fill="none" stroke="${mid}" stroke-width="2" opacity="0.25" stroke-dasharray="8 4"/>
        <circle cx="20" cy="20" r="10" fill="none" stroke="${light}" stroke-width="2" opacity="0.2" stroke-dasharray="5 3"/>
        <circle cx="${28 + rand() * 8}" cy="${28 + rand() * 8}" r="${2 + rand() * 3}" fill="${light}" opacity="0.35"/>
      `;
      break;
    case 4: // Diamond grid
      patternSVG = `
        <rect x="14" y="14" width="12" height="12" rx="2" fill="${mid}" opacity="0.2" transform="rotate(45 20 20)"/>
        <rect x="14" y="14" width="8" height="8" rx="1" fill="${light}" opacity="0.25" transform="rotate(45 20 20)"/>
        <circle cx="${8 + rand() * 6}" cy="${8 + rand() * 6}" r="${2 + rand() * 3}" fill="${mid}" opacity="0.3"/>
        <circle cx="${30 + rand() * 6}" cy="${30 + rand() * 6}" r="${2 + rand() * 2}" fill="${light}" opacity="0.2"/>
      `;
      break;
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="${size}" height="${size}">
    <rect width="40" height="40" rx="8" fill="${bg}"/>
    ${patternSVG}
    <text x="20" y="20" text-anchor="middle" dominant-baseline="central" 
      fill="#fff" font-family="Outfit,sans-serif" font-weight="700" font-size="16"
      style="text-shadow:0 1px 3px rgba(0,0,0,0.3)">${initial}</text>
  </svg>`;
}

/**
 * Returns an inline <img> tag with the avatar as a data URI
 */
export function avatarImg(name, size = 36, extraClass = '') {
  const svg = generateAvatar(name, size);
  const encoded = btoa(unescape(encodeURIComponent(svg)));
  return `<img src="data:image/svg+xml;base64,${encoded}" width="${size}" height="${size}" alt="${name}" 
    class="avatar-img ${extraClass}" style="border-radius:8px;flex-shrink:0;display:block"/>`;
}

/**
 * Returns the avatar as a background div (for use in CSS layouts)
 */
export function avatarDiv(name, size = 36, extraStyle = '') {
  const svg = generateAvatar(name, size);
  const encoded = btoa(unescape(encodeURIComponent(svg)));
  return `<div class="avatar-illustrated" style="width:${size}px;height:${size}px;border-radius:8px;background-image:url('data:image/svg+xml;base64,${encoded}');background-size:cover;flex-shrink:0;${extraStyle}"></div>`;
}
