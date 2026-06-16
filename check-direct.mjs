import pg from 'pg';
const { Client } = pg;

const sql = `
  SELECT column_name, data_type 
  FROM information_schema.columns 
  WHERE table_name = 'requests' AND table_schema = 'public';
`;

const PROJECT_REF = 'rjpdymsdmlxvokqtnlgi';
const PASSWORD = 'Yousssefaz11@';

async function main() {
  const client = new Client({
    host: `db.${PROJECT_REF}.supabase.co`,
    port: 5432,
    database: 'postgres',
    user: 'postgres',
    password: PASSWORD,
    ssl: { rejectUnauthorized: false }
  });
  
  try {
    await client.connect();
    console.log('✅ Connected successfully to direct host!');
    const res = await client.query(sql);
    console.log('Columns:');
    res.rows.forEach(r => console.log(` - ${r.column_name}: ${r.data_type}`));
    await client.end();
  } catch (e) {
    console.log(`❌ Direct connection failed: ${e.message}`);
    try { await client.end(); } catch (_) {}
  }
}

main();
