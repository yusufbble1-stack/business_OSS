import fs from 'fs';
import path from 'path';

const LOG_DB_PATH = './whatsapp_outreach_log.json';
const API_URL = 'http://localhost:3001/send-message';

// Check for dry-run flag
const isDryRun = process.argv.includes('--dry-run');

// Load database logs
function loadLogDb() {
  if (fs.existsSync(LOG_DB_PATH)) {
    try {
      return JSON.parse(fs.readFileSync(LOG_DB_PATH, 'utf8'));
    } catch (e) {
      console.error('Failed to parse database logs, exiting...');
      process.exit(1);
    }
  }
  console.error(`Database file not found at: ${LOG_DB_PATH}. Please run the initialiser first.`);
  process.exit(1);
}

function saveLogDb(phone, status) {
  const db = loadLogDb();
  if (db[phone]) {
    db[phone].status = status;
    db[phone].updatedAt = new Date().toISOString();
    fs.writeFileSync(LOG_DB_PATH, JSON.stringify(db, null, 2), 'utf8');
  }
}

// Compile Stage 1 Hook Message (No links, inquiry format)
function compileHook(lead) {
  let title = lead.title || 'there';
  
  // Clean up title (remove descriptive suffixes) to sound human
  if (title.includes(' - ')) {
    title = title.split(' - ')[0];
  }
  if (title.includes(' | ')) {
    title = title.split(' | ')[0];
  }
  title = title.trim();

  const template = 'Hi {title}, quick question—do you guys handle vehicle remapping and diagnostics at your shop in {city}?';
  return template
    .replace(/{title}/g, title)
    .replace(/{city}/g, lead.city || 'your area');
}

async function run() {
  console.log('====================================================');
  console.log(isDryRun ? '🔍 RUNNING TWO-STEP HOOK CAMPAIGN IN DRY-RUN MODE' : '🚀 RUNNING TWO-STEP HOOK CAMPAIGN IN LIVE MODE');
  console.log('====================================================');

  const db = loadLogDb();
  
  // Find all pending leads
  const pendingPhones = Object.keys(db).filter(phone => db[phone].status === 'PENDING');
  
  console.log(`Total Leads in Database: ${Object.keys(db).length}`);
  console.log(`Found ${pendingPhones.length} pending leads with status "PENDING".\n`);

  if (pendingPhones.length === 0) {
    console.log('No pending leads left to contact. All outreach is processed!');
    process.exit(0);
  }

  for (let i = 0; i < pendingPhones.length; i++) {
    const phone = pendingPhones[i];
    const lead = db[phone];
    const hookText = compileHook(lead);
    
    console.log(`\n----------------------------------------------------`);
    console.log(`[${i + 1}/${pendingPhones.length}] Lead: ${lead.title}`);
    console.log(`Phone: ${phone}`);
    console.log(`City: ${lead.city}`);
    console.log(`Status: PENDING -> HOOK_SENT`);
    console.log(`----------------------------------------------------`);
    
    if (isDryRun) {
      console.log('Hook Message to Send:');
      console.log(hookText);
      continue;
    }

    console.log('Sending inquiry hook via WhatsApp server...');
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          number: phone,
          message: hookText
        })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        console.log(`✅ Success! Hook sent. Message ID: ${data.messageId}`);
        saveLogDb(phone, 'HOOK_SENT');
      } else if (response.status === 404) {
        console.log(`❌ Failed: Phone number is not registered on WhatsApp.`);
        saveLogDb(phone, 'NOT_REGISTERED');
      } else {
        console.log(`❌ Failed to send: ${data.error || 'Server error'}`);
        // Do not save status so we can retry on temporary connection errors
      }
    } catch (e) {
      console.error(`❌ Network error connecting to WhatsApp server: ${e.message}`);
      console.log('Ensure the WhatsApp server is running on http://localhost:3001');
      process.exit(1);
    }

    // Delay between outbound messages to look natural and protect the account
    if (i < pendingPhones.length - 1) {
      const delay = 12000 + Math.round(Math.random() * 3000);
      console.log(`Sleeping for ${(delay / 1000).toFixed(1)} seconds to pace delivery...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }

  console.log('\n====================================================');
  console.log(isDryRun ? '🔍 Dry-run complete. Run without --dry-run for live delivery.' : '🏁 Hook campaign complete! Autoresponder is active.');
  console.log('====================================================');
}

run();
