import fs from 'fs';
import path from 'path';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Load environment variables from .env
dotenv.config();

const LEADS_JSON_PATH = './leads_with_emails.json';
const EMAILED_LOG_PATH = './emailed_leads.json';

// Configuration check
const smtpConfig = {
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587', 10),
  secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
};

const fromEmail = process.env.SMTP_FROM || `"AS Performance" <${process.env.SMTP_USER}>`;

// Check for dry-run flag
const isDryRun = process.argv.includes('--dry-run');

// Parse contacted list
function loadEmailedLogs() {
  if (fs.existsSync(EMAILED_LOG_PATH)) {
    try {
      return JSON.parse(fs.readFileSync(EMAILED_LOG_PATH, 'utf8'));
    } catch (e) {
      return {};
    }
  }
  return {};
}

function saveEmailedLog(email, title, status) {
  const logs = loadEmailedLogs();
  logs[email] = {
    title: title,
    timestamp: new Date().toISOString(),
    status: status
  };
  fs.writeFileSync(EMAILED_LOG_PATH, JSON.stringify(logs, null, 2), 'utf8');
}

// Compile Subject Line
function compileSubject(lead) {
  const template = !lead.website || lead.website === ''
    ? 'New website & workflow dashboard for {title}'
    : 'Custom booking portals for {title}';
  return template.replace(/{title}/g, lead.title);
}

// Compile HTML Email Body
function compileHtmlBody(lead) {
  const title = lead.title || 'there';
  const city = lead.city || 'your area';
  const website = lead.website || '';
  
  let pitchParagraph = '';
  if (!website) {
    pitchParagraph = `<p style="font-size: 16px;">I was looking at your Google Maps listing in <strong>${city}</strong> and noticed you don't have a website listed. We build premium, high-end websites for auto workshops, complete with integrated scheduling systems to automate your bookings.</p>`;
  } else {
    pitchParagraph = `<p style="font-size: 16px;">I came across your website (${website}) for your workshop in <strong>${city}</strong>. You've got great reviews! We help workshops upgrade their customer experience by adding custom booking and workflow dashboards directly to their existing site.</p>`;
  }

  return `
<div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1e293b; line-height: 1.6; background-color: #ffffff;">
  <div style="background: #0f172a; padding: 24px; text-align: center; border-radius: 8px 8px 0 0;">
    <h2 style="color: #f1f5f9; margin: 0; font-family: Arial, sans-serif; letter-spacing: 0.5px;">AS Performance</h2>
    <p style="color: #94a3b8; margin: 4px 0 0 0; font-size: 13px;">Workshop Automation Solutions</p>
  </div>
  <div style="padding: 32px 24px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 8px 8px;">
    <p style="font-size: 16px; margin-top: 0;">Hi ${title},</p>
    
    ${pitchParagraph}

    <p style="font-size: 15px;">We deploy a unified <strong>3-portal system</strong> tailored for auto service centers, designed in a premium supercar theme:</p>
    
    <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
      <tr>
        <td style="padding: 12px; border: 1px solid #e2e8f0; background: #f8fafc; font-weight: bold; width: 30%;">⚙️ Admin Portal</td>
        <td style="padding: 12px; border: 1px solid #e2e8f0;">Oversee all active bookings, dispatch jobs, and manage invoice status in a clean dashboard.</td>
      </tr>
      <tr>
        <td style="padding: 12px; border: 1px solid #e2e8f0; background: #f8fafc; font-weight: bold;">🔑 Client Portal</td>
        <td style="padding: 12px; border: 1px solid #e2e8f0;">Let your customers schedule services, get live progress updates, and pay invoices online.</td>
      </tr>
      <tr>
        <td style="padding: 12px; border: 1px solid #e2e8f0; background: #f8fafc; font-weight: bold;">🔧 Tech Portal</td>
        <td style="padding: 12px; border: 1px solid #e2e8f0;">Mobile-friendly dashboard for your mechanics to log work, update tasks, and upload photos on the floor.</td>
      </tr>
    </table>

    <p style="font-size: 15px;">You can review the live dashboard we created to see the design and workflow in action:</p>
    
    <div style="text-align: center; margin: 30px 0;">
      <a href="https://business-92l42c023-youssef-s-projects17.vercel.app" style="background: #e11d48; color: white; padding: 12px 28px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">Review Live Dashboard Demo</a>
    </div>

    <p style="font-size: 15px; margin-bottom: 24px;">Would you be open to a brief 5-minute chat this week to see how this scheduling system can help save time and improve efficiency for ${title}?</p>
    
    <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 24px 0;">
    
    <p style="font-size: 13px; color: #64748b; margin: 0;">Best regards,</p>
    <p style="font-size: 15px; font-weight: bold; margin: 4px 0 0 0;">Youssef</p>
    <p style="font-size: 13px; color: #64748b; margin: 0;">AS Performance</p>
  </div>
</div>
  `;
}

// Compile Text Fallback
function compileTextBody(lead) {
  const title = lead.title || 'there';
  const city = lead.city || 'your area';
  const website = lead.website || '';
  
  let intro = '';
  if (!website) {
    intro = `I was looking at your Google Maps listing in ${city} and noticed you don't have a website listed. We build premium, high-end websites for auto workshops, complete with integrated scheduling systems to automate your bookings.`;
  } else {
    intro = `I came across your website (${website}) for your workshop in ${city}. You've got great reviews! We help workshops upgrade their customer experience by adding custom booking and workflow dashboards directly to their existing site.`;
  }

  return `Hi ${title},

${intro}

We deploy a unified 3-portal system tailored for auto service centers, designed in a premium supercar theme:

1. Admin Portal: Oversee all active bookings, dispatch jobs, and manage invoice status in a clean dashboard.
2. Client Portal: Let your customers schedule services, get live progress updates, and pay invoices online.
3. Tech Portal: Mobile-friendly dashboard for your mechanics to log work, update tasks, and upload photos on the floor.

You can review the live dashboard we created to see the design and workflow in action:
https://business-92l42c023-youssef-s-projects17.vercel.app

Would you be open to a brief 5-minute chat this week to see how this scheduling system can help save time and improve efficiency for ${title}?

Best regards,

Youssef
AS Performance
`;
}

async function run() {
  console.log('====================================================');
  console.log(isDryRun ? '🔍 RUNNING EMAIL CAMPAIGN IN DRY-RUN MODE' : '🚀 RUNNING EMAIL CAMPAIGN IN LIVE MODE');
  console.log('====================================================');

  // Verify leads json exists
  if (!fs.existsSync(LEADS_JSON_PATH)) {
    console.error(`Error: Leads JSON file not found at ${LEADS_JSON_PATH}. Run "node scrape-emails.mjs" first.`);
    process.exit(1);
  }

  const leads = JSON.parse(fs.readFileSync(LEADS_JSON_PATH, 'utf8'));
  const emailed = loadEmailedLogs();

  // Filter leads that have emails and haven't been emailed yet
  const pendingLeads = leads.filter(lead => {
    if (!lead.emails || lead.emails.length === 0) return false;
    const primaryEmail = lead.emails[0];
    return !emailed[primaryEmail];
  });

  console.log(`Loaded ${leads.length} leads with email addresses.`);
  console.log(`Found ${pendingLeads.length} leads pending outreach.\n`);

  if (pendingLeads.length === 0) {
    console.log('All pending leads have already been emailed. Exiting.');
    process.exit(0);
  }

  if (isDryRun) {
    console.log('--- DRY RUN: PREVIEWING FIRST 2 EMAIL COMPILATIONS ---\n');
    const previewLeads = pendingLeads.slice(0, 2);
    previewLeads.forEach((lead, index) => {
      const email = lead.emails[0];
      const subject = compileSubject(lead);
      const text = compileTextBody(lead);
      console.log(`[Preview ${index + 1}] Send To: ${lead.title} (${email})`);
      console.log(`Subject: ${subject}`);
      console.log(`Text Body Preview:\n${text}`);
      console.log(`----------------------------------------------------\n`);
    });
    console.log('Dry-run complete. Configure .env and run without --dry-run for live delivery.');
    process.exit(0);
  }

  // Live Mode check for credentials
  if (!smtpConfig.host || !smtpConfig.auth.user || !smtpConfig.auth.pass) {
    console.error('❌ Error: SMTP configuration is missing in the .env file!');
    console.log('\nPlease add the following environment variables to your .env file:');
    console.log('SMTP_HOST=your-smtp-host (e.g. smtp.gmail.com)');
    console.log('SMTP_PORT=your-smtp-port (e.g. 587 or 465)');
    console.log('SMTP_SECURE=false (set to true if using port 465)');
    console.log('SMTP_USER=your-smtp-username (e.g. your email address)');
    console.log('SMTP_PASS=your-smtp-password (or App Password)');
    console.log('SMTP_FROM="AS Performance" <your-email-address>');
    process.exit(1);
  }

  // Create transporter
  console.log(`Connecting to SMTP server ${smtpConfig.host}:${smtpConfig.port}...`);
  const transporter = nodemailer.createTransport(smtpConfig);

  // Verify connection
  try {
    await transporter.verify();
    console.log('✅ SMTP connection verified successfully!');
  } catch (e) {
    console.error(`❌ Failed to connect to SMTP server: ${e.message}`);
    process.exit(1);
  }

  for (let i = 0; i < pendingLeads.length; i++) {
    const lead = pendingLeads[i];
    const email = lead.emails[0];
    const subject = compileSubject(lead);
    const htmlBody = compileHtmlBody(lead);
    const textBody = compileTextBody(lead);

    console.log(`\n----------------------------------------------------`);
    console.log(`[${i + 1}/${pendingLeads.length}] E-mailing: ${lead.title}`);
    console.log(`To: ${email}`);
    console.log(`Subject: ${subject}`);
    console.log(`----------------------------------------------------`);

    try {
      const info = await transporter.sendMail({
        from: fromEmail,
        to: email,
        subject: subject,
        text: textBody,
        html: htmlBody
      });

      console.log(`✅ Success! Email sent. Response: ${info.response}`);
      saveEmailedLog(email, lead.title, 'SUCCESS');
    } catch (e) {
      console.error(`❌ Failed to send email to ${email}: ${e.message}`);
      saveEmailedLog(email, lead.title, `FAILED: ${e.message}`);
    }

    // Delay between sends to prevent trigger filters (e.g., 3-5 seconds)
    if (i < pendingLeads.length - 1) {
      const delay = 3000 + Math.round(Math.random() * 2000);
      console.log(`Sleeping ${delay / 1000}s...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }

  console.log('\n====================================================');
  console.log('🏁 Email Outreach Campaign Complete!');
  console.log('====================================================');
}

run();
