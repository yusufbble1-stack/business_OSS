import { createClient } from '@supabase/supabase-js';

// Clean hash for Single Page Application routing gotchas before Supabase client is created
const currentHash = window.location.hash || '';
const oAuthKeywords = ['access_token=', 'code=', 'id_token=', 'error='];
for (const keyword of oAuthKeywords) {
  if (currentHash.includes(keyword)) {
    const index = currentHash.indexOf(keyword);
    if (index > 1) { // has a prefix like #/dashboard& or #/login&
      window.location.hash = '#' + currentHash.substring(index);
      break;
    }
  }
}

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Demo mode when Supabase is not configured
export const isDemoMode = !supabase;
