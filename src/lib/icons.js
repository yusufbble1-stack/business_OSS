import { createIcons, icons } from 'lucide';

// Re-export createIcons for use after DOM updates
export function refreshIcons() {
  createIcons({ icons });
}

// Helper to get icon HTML string
export function icon(name, size = 18, cls = '') {
  return `<i data-lucide="${name}" class="${cls}" style="width:${size}px;height:${size}px"></i>`;
}
