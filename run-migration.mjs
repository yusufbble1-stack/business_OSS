import { readFileSync } from 'fs';
import pg from 'pg';
const { Client } = pg;

const PROJECT_REF = 'rjpdymsdmlxvokqtnlgi';
const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJqcGR5bXNkbWx4dm9rcXRubGdpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3OTAwNzAyOCwiZXhwIjoyMDk0NTgzMDI4fQ.fVP7YTLTkeLJzuhoUGVlmjp1RnknnsryKgn9KbqJ0w4';

const sql = readFileSync('supabase-migration.sql', 'utf8');

// Connection strings to try (different regions & modes)
const connections = [
  // Direct connection (port 5432)
  `postgresql://postgres.${PROJECT_REF}:${SERVICE_ROLE_KEY}@db.${PROJECT_REF}.supabase.co:5432/postgres`,
  // Session pooler (port 5432)
  `postgresql://postgres.${PROJECT_REF}:${SERVICE_ROLE_KEY}@aws-0-eu-west-1.pooler.supabase.com:5432/postgres`,
  `postgresql://postgres.${PROJECT_REF}:${SERVICE_ROLE_KEY}@aws-0-eu-west-2.pooler.supabase.com:5432/postgres`,
  `postgresql://postgres.${PROJECT_REF}:${SERVICE_ROLE_KEY}@aws-0-us-east-1.pooler.supabase.com:5432/postgres`,
  // Transaction pooler (port 6543)
  `postgresql://postgres.${PROJECT_REF}:${SERVICE_ROLE_KEY}@aws-0-eu-west-1.pooler.supabase.com:6543/postgres`,
  `postgresql://postgres.${PROJECT_REF}:${SERVICE_ROLE_KEY}@aws-0-eu-west-2.pooler.supabase.com:6543/postgres`,
  `postgresql://postgres.${PROJECT_REF}:${SERVICE_ROLE_KEY}@aws-0-us-east-1.pooler.supabase.com:6543/postgres`,
];

async function tryConnection(connStr) {
  const label = connStr.replace(SERVICE_ROLE_KEY, '***').substring(0, 120);
  const client = new Client({ connectionString: connStr, connectionTimeoutMillis: 8000, ssl: { rejectUnauthorized: false } });
  try {
    await client.connect();
    console.log(`✅ Connected: ${label}`);
    
    // Run the migration
    console.log('📦 Executing migration SQL...');
    await client.query(sql);
    console.log('✅ Migration completed successfully!');
    
    // Verify tables
    const res = await client.query(`
      SELECT table_name FROM information_schema.tables 
      WHERE table_schema = 'public' ORDER BY table_name
    `);
    console.log('\n📋 Tables created:');
    res.rows.forEach(r => console.log(`   ✓ ${r.table_name}`));
    
    await client.end();
    return true;
  } catch (e) {
    console.log(`❌ Failed (${label}): ${e.message.substring(0, 100)}`);
    try { await client.end(); } catch (_) {}
    return false;
  }
}

async function main() {
  console.log('🚀 Connecting to Supabase PostgreSQL...\n');
  
  for (const conn of connections) {
    if (await tryConnection(conn)) return;
  }
  
  console.log('\n⚠️  Could not connect with service_role JWT as password.');
  console.log('Please provide the DATABASE PASSWORD from:');
  console.log('  Dashboard → Settings → Database → Database Password');
}

main();
