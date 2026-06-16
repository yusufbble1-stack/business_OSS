import pg from 'pg';
const { Client } = pg;

const sql = `
  SELECT column_name, data_type 
  FROM information_schema.columns 
  WHERE table_name = 'requests' AND table_schema = 'public';
`;

const PROJECT_REF = 'rjpdymsdmlxvokqtnlgi';
const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJqcGR5bXNkbWx4dm9rcXRubGdpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3OTAwNzAyOCwiZXhwIjoyMDk0NTgzMDI4fQ.fVP7YTLTkeLJzuhoUGVlmjp1RnknnsryKgn9KbqJ0w4';

// Use same connection strings from run-migration.mjs
const connections = [
  `postgresql://postgres.${PROJECT_REF}:${SERVICE_ROLE_KEY}@aws-0-eu-west-1.pooler.supabase.com:5432/postgres`,
  `postgresql://postgres.${PROJECT_REF}:${SERVICE_ROLE_KEY}@aws-0-eu-west-1.pooler.supabase.com:6543/postgres`,
];

async function main() {
  for (const conn of connections) {
    const client = new Client({ connectionString: conn, connectionTimeoutMillis: 5000, ssl: { rejectUnauthorized: false } });
    try {
      await client.connect();
      const res = await client.query(sql);
      console.log('Columns:');
      res.rows.forEach(r => console.log(` - ${r.column_name}: ${r.data_type}`));
      await client.end();
      return;
    } catch (e) {
      console.log(`Failed: ${e.message}`);
      await client.end();
    }
  }
}

main();
