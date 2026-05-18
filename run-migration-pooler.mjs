import { readFileSync } from 'fs';
import pg from 'pg';
const { Client } = pg;

const sql = readFileSync('supabase-migration.sql', 'utf8');

const regions = [
  'eu-west-1', 'eu-west-2', 'eu-west-3', 'eu-central-1', 'eu-north-1',
  'us-east-1', 'us-east-2', 'us-west-1', 'us-west-2',
  'ap-southeast-1', 'ap-southeast-2', 'ap-northeast-1', 'ap-northeast-2', 'ap-south-1',
  'sa-east-1', 'ca-central-1'
];

async function main() {
  console.log('🚀 Connecting to Supabase pooler...');
  
  for (const region of regions) {
    const host = `aws-0-${region}.pooler.supabase.com`;
    console.log(`Trying ${host}...`);
    
    // For pooler, user must be postgres.[project-ref]
    const client = new Client({
      host,
      port: 5432,
      database: 'postgres',
      user: 'postgres.rjpdymsdmlxvokqtnlgi',
      password: 'Yousssefaz11@',
      ssl: { rejectUnauthorized: false },
      connectionTimeoutMillis: 3000
    });
    
    try {
      await client.connect();
      console.log(`\\n✅ Connected successfully to ${region}!`);
      
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
      return;
    } catch (err) {
      const msg = err.message;
      if (msg.includes('password authentication failed')) {
        console.log(`❌ Password failed for ${region}. This might be the right region but wrong password!`);
        await client.end();
        return;
      }
      // Suppress connection errors for wrong regions to keep output clean
      await client.end();
    }
  }
  
  console.log('\\n❌ Exhausted all regions. Could not connect.');
}

main();
