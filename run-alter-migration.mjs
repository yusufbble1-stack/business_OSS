import pg from 'pg';
const { Client } = pg;

const sql = `
  ALTER TABLE public.requests ADD COLUMN IF NOT EXISTS original_file TEXT DEFAULT '';
  ALTER TABLE public.requests ADD COLUMN IF NOT EXISTS acm_file TEXT DEFAULT '';
  ALTER TABLE public.requests ADD COLUMN IF NOT EXISTS log_file TEXT DEFAULT '';
  ALTER TABLE public.requests ADD COLUMN IF NOT EXISTS ecu_photo TEXT DEFAULT '';
`;

const regions = [
  'eu-west-1', 'eu-west-2', 'eu-west-3', 'eu-central-1', 'eu-north-1',
  'us-east-1', 'us-east-2', 'us-west-1', 'us-west-2',
  'ap-southeast-1', 'ap-southeast-2', 'ap-northeast-1', 'ap-northeast-2', 'ap-south-1',
  'sa-east-1', 'ca-central-1'
];

async function main() {
  console.log('🚀 Connecting to Supabase pooler for schema alter...');
  
  for (const region of regions) {
    const host = `aws-0-${region}.pooler.supabase.com`;
    console.log(`Trying ${host}...`);
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
      console.log(`\n✅ Connected successfully to ${region}!`);
      
      console.log('📦 Executing Alter Table queries...');
      await client.query(sql);
      console.log('✅ Columns added successfully!');
      
      await client.end();
      return;
    } catch (err) {
      // Clean up connection
      try { await client.end(); } catch (_) {}
    }
  }
  console.log('\n❌ Exhausted all regions. Could not connect.');
}

main();
