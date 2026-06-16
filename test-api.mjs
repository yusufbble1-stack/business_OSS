import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rjpdymsdmlxvokqtnlgi.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJqcGR5bXNkbWx4dm9rcXRubGdpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkwMDcwMjgsImV4cCI6MjA5NDU4MzAyOH0.l0NG-nb_8uqqxqI1Kk9TIVwMqno_PzbeGpvYKOvdg94';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function main() {
  console.log('Testing Supabase API connection...');
  try {
    const { data, error } = await supabase.from('profiles').select('*').limit(1);
    if (error) {
      console.log('❌ API Error:', error.message);
    } else {
      console.log('✅ API Success! Profiles:', data);
    }
  } catch (e) {
    console.log('❌ Connection failed:', e.message);
  }
}

main();
