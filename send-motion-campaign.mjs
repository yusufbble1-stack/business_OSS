import fs from 'fs';
import path from 'path';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// --- PATHS ---
const LEADS_CSV_PATH = './src/assets/googleMaps/hot_leads_motion_design.csv';
const EMAILED_LOG_PATH = './motion_emailed_leads.json';

// --- SENDER CONFIG ---
// Update SMTP_FROM in .env to use your personal brand name for this campaign
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

// --- YOUR PORTFOLIO LINK ---
const PORTFOLIO_URL = 'https://business-92l42c023-youssef-s-projects17.vercel.app';

// Check for flags
const isDryRun = process.argv.includes('--dry-run');
const maxSend = parseInt(process.argv.find(a => a.startsWith('--limit='))?.split('=')[1] || '0', 10);

// =============================================
// CSV Parser (simple, no dependencies needed)
// =============================================
function parseCSV(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8').trim();
  const lines = raw.split('\n');
  const headers = lines[0].split(',').map(h => h.trim());

  return lines.slice(1).filter(l => l.trim()).map(line => {
    // Handle commas inside fields (basic)
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
// EMAILED LOG (prevent double-sends)
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
  log[email] = {
    company,
    timestamp: new Date().toISOString(),
    status
  };
  fs.writeFileSync(EMAILED_LOG_PATH, JSON.stringify(log, null, 2), 'utf8');
}

// =============================================
// PERSONALIZED OPENER (product-specific line)
// =============================================
function buildOpener(lead) {
  const company = lead['Company'];
  const desc = lead['Product Description'] || '';
  const industry = lead['Industry / Type'] || '';

  // Build a personalized "I came across X and your Y really caught my attention" line
  // mirroring the winning Saldo template
  const openerMap = {
    'Skincare': `Hello! I came across ${company} and your beautifully crafted skincare line really caught my attention.`,
    'Candles': `Hello! I came across ${company} and your stunning candle designs really caught my attention.`,
    'Candles / Fragrance': `Hello! I came across ${company} and your luxury fragrance collection really caught my attention.`,
    'Coffee': `Hello! I came across ${company} and your specialty coffee brand really caught my attention.`,
    'Supplements': `Hello! I came across ${company} and your premium supplement packaging really caught my attention.`,
    'Fragrance': `Hello! I came across ${company} and your luxury fragrance line really caught my attention.`,
    'Candles / Wellness': `Hello! I came across ${company} and your wellness-focused product line really caught my attention.`,
  };

  return openerMap[industry] || `Hello! I came across ${company} and your product line really caught my attention.`;
}

// =============================================
// EMAIL SUBJECT (personalized per company)
// =============================================
function compileSubject(lead) {
  return `Partnership Proposal`;
}

// =============================================
// EMAIL BODY — PLAIN TEXT STYLE (winning template)
// =============================================
function compileTextBody(lead) {
  const company = lead['Company'];
  const opener = buildOpener(lead);

  return `${opener}

My name is Youssef and I'm writing to you with a collaboration proposal.
I noticed a huge opportunity to increase your product's sales through motion design (which has a proven impact on brand perception. 63% of people worldwide prefer watching a short video about a product before buying it.)

I specialize in motion design and I'd love to create a high-converting video for ${company}.
Here's my portfolio: ${PORTFOLIO_URL}

If you're interested, I'd be happy to discuss the details. I would greatly appreciate any feedback! Have a wonderful day.

Best regards,
Youssef`;
}

// =============================================
// HTML BODY — clean, minimal (mirrors plain text)
// =============================================
function compileHtmlBody(lead) {
  const company = lead['Company'];
  const opener = buildOpener(lead);

  return `
<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; color: #1a1a1a; line-height: 1.7; font-size: 15px;">
  <p>${opener}</p>

  <p>My name is Youssef and I'm writing to you with a collaboration proposal.<br>
  I noticed a huge opportunity to increase your product's sales through motion design (which has a proven impact on brand perception. 63% of people worldwide prefer watching a short video about a product before buying it.)</p>

  <p>I specialize in motion design and I'd love to create a high-converting video for ${company}.<br>
  Here's my <a href="${PORTFOLIO_URL}" style="color: #1a73e8; text-decoration: underline;">portfolio</a></p>

  <p>If you're interested, I'd be happy to discuss the details. I would greatly appreciate any feedback! Have a wonderful day.</p>

  <p>Best regards,<br>
  Youssef</p>
</div>
  `.trim();
}

// =============================================
// MAIN CAMPAIGN RUNNER
// =============================================
async function run() {
  console.log('====================================================');
  console.log(isDryRun
    ? '🔍 MOTION DESIGN CAMPAIGN — DRY-RUN MODE'
    : '🚀 MOTION DESIGN CAMPAIGN — LIVE MODE');
  console.log('====================================================\n');

  // Load leads
  if (!fs.existsSync(LEADS_CSV_PATH)) {
    console.error(`❌ Leads CSV not found at ${LEADS_CSV_PATH}`);
    process.exit(1);
  }

  const allLeads = parseCSV(LEADS_CSV_PATH);
  const emailed = loadEmailedLog();

  // Filter: must have email, not already sent, not a "form only" placeholder
  const pending = allLeads.filter(lead => {
    const email = lead['Email']?.trim();
    if (!email || email === '' || email.toLowerCase().includes('form only')) return false;
    return !emailed[email];
  });

  console.log(`📋 Total leads loaded: ${allLeads.length}`);
  console.log(`📧 Leads with email: ${allLeads.filter(l => l['Email']?.trim() && !l['Email'].toLowerCase().includes('form only')).length}`);
  console.log(`⏳ Pending (not yet emailed): ${pending.length}`);
  if (maxSend > 0) console.log(`🔒 Send limit set to: ${maxSend}`);
  console.log('');

  if (pending.length === 0) {
    console.log('✅ All leads have been emailed already. Nothing to do.');
    process.exit(0);
  }

  const toSend = maxSend > 0 ? pending.slice(0, maxSend) : pending;

  // --- DRY RUN ---
  if (isDryRun) {
    console.log('--- DRY RUN: PREVIEWING ALL PENDING EMAILS ---\n');
    toSend.forEach((lead, i) => {
      const email = lead['Email'].trim();
      const subject = compileSubject(lead);
      const text = compileTextBody(lead);
      console.log(`[${i + 1}/${toSend.length}] → ${lead['Company']} <${email}>`);
      console.log(`Subject: ${subject}`);
      console.log(`Body:\n${text}`);
      console.log('----------------------------------------------------\n');
    });
    console.log(`✅ Dry-run complete. ${toSend.length} emails previewed.`);
    console.log('Run without --dry-run to send for real.');
    process.exit(0);
  }

  // --- LIVE MODE ---
  if (!smtpConfig.host || !smtpConfig.auth.user || !smtpConfig.auth.pass) {
    console.error('❌ SMTP credentials missing in .env! Add SMTP_HOST, SMTP_USER, SMTP_PASS.');
    process.exit(1);
  }

  console.log(`📡 Connecting to SMTP: ${smtpConfig.host}:${smtpConfig.port}...`);
  const transporter = nodemailer.createTransport(smtpConfig);

  try {
    await transporter.verify();
    console.log('✅ SMTP connection verified!\n');
  } catch (e) {
    console.error(`❌ SMTP connection failed: ${e.message}`);
    process.exit(1);
  }

  let sent = 0;
  let failed = 0;

  for (let i = 0; i < toSend.length; i++) {
    const lead = toSend[i];
    const email = lead['Email'].trim();
    const subject = compileSubject(lead);
    const html = compileHtmlBody(lead);
    const text = compileTextBody(lead);

    console.log(`----------------------------------------------------`);
    console.log(`[${i + 1}/${toSend.length}] Sending to: ${lead['Company']}`);
    console.log(`📧 ${email}`);
    console.log(`📝 Subject: ${subject}`);
    console.log(`----------------------------------------------------`);

    try {
      const info = await transporter.sendMail({
        from: fromLine,
        to: email,
        subject,
        text,
        html
      });

      console.log(`✅ Sent! Response: ${info.response}`);
      saveEmailedLog(email, lead['Company'], 'SUCCESS');
      sent++;
    } catch (e) {
      console.error(`❌ Failed: ${e.message}`);
      saveEmailedLog(email, lead['Company'], `FAILED: ${e.message}`);
      failed++;
    }

    // Pace deliveries: 4-7 seconds between sends (looks natural, protects sender reputation)
    if (i < toSend.length - 1) {
      const delay = 4000 + Math.round(Math.random() * 3000);
      console.log(`⏱️  Waiting ${(delay / 1000).toFixed(1)}s before next send...\n`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }

  console.log('\n====================================================');
  console.log('🏁 Campaign Complete!');
  console.log(`   ✅ Sent: ${sent}  |  ❌ Failed: ${failed}`);
  console.log('====================================================');
}

run();
