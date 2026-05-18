import { readFileSync } from 'fs';
import pg from 'pg';
const { Client } = pg;

const sql = readFileSync('supabase-migration.sql', 'utf8');

const hosts = [
  'aws-0-eu-west-2.pooler.supabase.com',
  'aws-0-eu-west-1.pooler.supabase.com',
  'aws-0-eu-west-3.pooler.supabase.com',
  'aws-0-us-east-1.pooler.supabase.com',
  'aws-0-us-west-1.pooler.supabase.com',
];

async function main() {
  console.log('🚀 Connecting to Supabase pooler...');
  
  for (const host of hosts) {
    console.log(`Trying ${host}...`);
    const client = new Client({
      host,
      port: 5432,
      database: 'postgres',
      user: 'postgres.rjpdymsdmlxvokqtnlgi',
      password: 'Yousssefaz11@',
      ssl: { rejectUnauthorized: false },
      connectionTimeoutMillis: 5000
    });
    
    try {
      await client.connect();
      console.log('✅ Connected successfully!');
      
      console.log('📦 Executing SQL migration...');
      await client.query(sql);
      console.log('✅ Migration executed successfully!');
      
      const res = await client.query(`
        SELECT table_name FROM information_schema.tables 
        WHERE table_schema = 'public' ORDER BY table_name
      `);
      console.log('\\n📋 Tables created:');
      res.rows.forEach(r => console.log(`   ✓ ${r.table_name}`));
      
      await client.end();
      return; // Stop if successful
    } catch (err) {
      console.log(`❌ Failed: ${err.message}`);
      await client.end();
    }
  }
}

main();
