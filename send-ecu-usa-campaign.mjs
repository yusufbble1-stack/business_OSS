import fs from 'fs';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// --- PATHS ---
const LEADS_CSV_PATH = './src/assets/googleMaps/ecu_usa_leads.csv';
const EMAILED_LOG_PATH = './ecu_usa_emailed_leads.json';

// --- SMTP CONFIG ---
const smtpConfig = {
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587', 10),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
};

const senderName = 'Youssef';
const senderEmail = process.env.SMTP_USER;
const fromLine = `"${senderName}" <${senderEmail}>`;

// --- LIVE DEMO LINK ---
const DEMO_URL = 'https://business-92l42c023-youssef-s-projects17.vercel.app';

// Flags
const isDryRun = process.argv.includes('--dry-run');
const maxSend = parseInt(process.argv.find(a => a.startsWith('--limit='))?.split('=')[1] || '0', 10);

// =============================================
// CSV Parser
// =============================================
function parseCSV(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8').trim();
  const lines = raw.split('\n');
  const headers = lines[0].split(',').map(h => h.trim());

  return lines.slice(1).filter(l => l.trim()).map(line => {
    const values = [];
    let current = '';
    let inQuotes = false;
    for (const char of line) {
      if (char === '"') { inQuotes = !inQuotes; continue; }
      if (char === ',' && !inQuotes) { values.push(current.trim()); current = ''; continue; }
      current += char;
    }
    values.push(current.trim());

    const obj = {};
    headers.forEach((h, i) => { obj[h] = values[i] || ''; });
    return obj;
  });
}

// =============================================
// EMAILED LOG
// =============================================
function loadEmailedLog() {
  if (fs.existsSync(EMAILED_LOG_PATH)) {
    try { return JSON.parse(fs.readFileSync(EMAILED_LOG_PATH, 'utf8')); }
    catch { return {}; }
  }
  return {};
}

function saveEmailedLog(email, company, status) {
  const log = loadEmailedLog();
  log[email] = { company, timestamp: new Date().toISOString(), status };
  fs.writeFileSync(EMAILED_LOG_PATH, JSON.stringify(log, null, 2), 'utf8');
}

// =============================================
// SUBJECT LINE
// =============================================
function compileSubject(lead) {
  return `Partnership Proposal`;
}

// =============================================
// EMAIL BODY — WINNING TEMPLATE STYLE
// Mirrors the Saldo email: personal opener + stat + demo link
// =============================================
function compileTextBody(lead) {
  const company = lead['Company'];
  const city = lead['City'] || '';
  const specialty = lead['Specialty'] || 'ECU tuning';

  return `Hello! I came across ${company} and your ${specialty} shop${city ? ` in ${city}` : ''} really caught my attention.

My name is Youssef and I'm writing to you with a collaboration proposal.
I noticed a huge opportunity to streamline your workshop operations with a custom booking and management system (which has a proven impact on customer retention. 67% of customers prefer booking services online rather than calling.)

I specialize in building premium workshop management dashboards and I'd love to set one up for ${company}.
Here's a live demo: ${DEMO_URL}

It includes:
- Admin Portal: manage all bookings, dispatch jobs, and track invoices
- Client Portal: let your customers book services and get live progress updates
- Tech Portal: mobile dashboard for your mechanics to log work and upload photos

If you're interested, I'd be happy to discuss the details. I would greatly appreciate any feedback! Have a wonderful day.

Best regards,
Youssef`;
}

// =============================================
// HTML BODY — clean, plain-text style
// =============================================
function compileHtmlBody(lead) {
  const company = lead['Company'];
  const city = lead['City'] || '';
  const specialty = lead['Specialty'] || 'ECU tuning';

  return `
<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; color: #1a1a1a; line-height: 1.7; font-size: 15px;">
  <p>Hello! I came across ${company} and your ${specialty} shop${city ? ` in ${city}` : ''} really caught my attention.</p>

  <p>My name is Youssef and I'm writing to you with a collaboration proposal.<br>
  I noticed a huge opportunity to streamline your workshop operations with a custom booking and management system (which has a proven impact on customer retention. 67% of customers prefer booking services online rather than calling.)</p>

  <p>I specialize in building premium workshop management dashboards and I'd love to set one up for ${company}.<br>
  Here's a <a href="${DEMO_URL}" style="color: #1a73e8; text-decoration: underline;">live demo</a></p>

  <p>It includes:</p>
  <ul style="padding-left: 20px; margin: 8px 0;">
    <li><strong>Admin Portal</strong> — manage all bookings, dispatch jobs, and track invoices</li>
    <li><strong>Client Portal</strong> — let your customers book services and get live progress updates</li>
    <li><strong>Tech Portal</strong> — mobile dashboard for your mechanics to log work and upload photos</li>
  </ul>

  <p>If you're interested, I'd be happy to discuss the details. I would greatly appreciate any feedback! Have a wonderful day.</p>

  <p>Best regards,<br>
  Youssef</p>
</div>
  `.trim();
}

// =============================================
// MAIN
// =============================================
async function run() {
  console.log('====================================================');
  console.log(isDryRun
    ? '🔍 ECU USA CAMPAIGN — DRY-RUN MODE'
    : '🚀 ECU USA CAMPAIGN — LIVE MODE');
  console.log('====================================================\n');

  if (!fs.existsSync(LEADS_CSV_PATH)) {
    console.error(`❌ Leads CSV not found at ${LEADS_CSV_PATH}`);
    process.exit(1);
  }

  const allLeads = parseCSV(LEADS_CSV_PATH);
  const emailed = loadEmailedLog();

  const pending = allLeads.filter(lead => {
    const email = lead['Email']?.trim();
    if (!email) return false;
    return !emailed[email];
  });

  console.log(`📋 Total leads: ${allLeads.length}`);
  console.log(`⏳ Pending: ${pending.length}`);
  if (maxSend > 0) console.log(`🔒 Limit: ${maxSend}`);
  console.log('');

  if (pending.length === 0) {
    console.log('✅ All leads emailed. Nothing to do.');
    process.exit(0);
  }

  const toSend = maxSend > 0 ? pending.slice(0, maxSend) : pending;

  // DRY RUN
  if (isDryRun) {
    console.log('--- DRY RUN PREVIEW ---\n');
    toSend.forEach((lead, i) => {
      const email = lead['Email'].trim();
      console.log(`[${i + 1}/${toSend.length}] → ${lead['Company']} (${lead['City']}, ${lead['State']}) <${email}>`);
      console.log(`Subject: ${compileSubject(lead)}`);
      console.log(`Body:\n${compileTextBody(lead)}`);
      console.log('----------------------------------------------------\n');
    });
    console.log(`✅ ${toSend.length} emails previewed. Run without --dry-run to send.`);
    process.exit(0);
  }

  // LIVE
  if (!smtpConfig.host || !smtpConfig.auth.user || !smtpConfig.auth.pass) {
    console.error('❌ SMTP credentials missing in .env!');
    process.exit(1);
  }

  console.log(`📡 Connecting to ${smtpConfig.host}:${smtpConfig.port}...`);
  const transporter = nodemailer.createTransport(smtpConfig);

  try {
    await transporter.verify();
    console.log('✅ SMTP verified!\n');
  } catch (e) {
    console.error(`❌ SMTP failed: ${e.message}`);
    process.exit(1);
  }

  let sent = 0, failed = 0;

  for (let i = 0; i < toSend.length; i++) {
    const lead = toSend[i];
    const email = lead['Email'].trim();

    console.log(`----------------------------------------------------`);
    console.log(`[${i + 1}/${toSend.length}] ${lead['Company']} (${lead['City']}, ${lead['State']})`);
    console.log(`📧 ${email}`);
    console.log(`----------------------------------------------------`);

    try {
      const info = await transporter.sendMail({
        from: fromLine,
        to: email,
        subject: compileSubject(lead),
        text: compileTextBody(lead),
        html: compileHtmlBody(lead)
      });

      console.log(`✅ Sent! ${info.response}`);
      saveEmailedLog(email, lead['Company'], 'SUCCESS');
      sent++;
    } catch (e) {
      console.error(`❌ Failed: ${e.message}`);
      saveEmailedLog(email, lead['Company'], `FAILED: ${e.message}`);
      failed++;
    }

    if (i < toSend.length - 1) {
      const delay = 4000 + Math.round(Math.random() * 3000);
      console.log(`⏱️  ${(delay / 1000).toFixed(1)}s...\n`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }

  console.log('\n====================================================');
  console.log(`🏁 Done! ✅ ${sent} sent | ❌ ${failed} failed`);
  console.log('====================================================');
}

run();
