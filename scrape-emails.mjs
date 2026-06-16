import fs from 'fs';
import path from 'path';

const CSV_PATH = process.argv[2] || './outreach-ui/googleMaps1.csv';
const OUTPUT_JSON_PATH = './leads_with_emails.json';
const CONCURRENCY_LIMIT = 5;

// RFC 4180 Compliant CSV Parser
function parseCSV(text) {
  const lines = [];
  let row = [""];
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const nextChar = text[i + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        row[row.length - 1] += '"';
        i++; // Skip escape quote
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      row.push("");
    } else if ((char === '\r' || char === '\n') && !inQuotes) {
      if (char === '\r' && nextChar === '\n') {
        i++;
      }
      lines.push(row);
      row = [""];
    } else {
      row[row.length - 1] += char;
    }
  }
  if (row.length > 1 || row[0] !== "") {
    lines.push(row);
  }

  const header = lines[0].map(h => h.trim().replace(/^"|"$/g, ''));
  const data = [];
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i];
    if (values.length < header.length) continue;
    const obj = {};
    for (let j = 0; j < header.length; j++) {
      obj[header[j]] = values[j] ? values[j].trim().replace(/^"|"$/g, '') : '';
    }
    data.push(obj);
  }
  return data;
}

// Regex to extract email addresses
const EMAIL_REGEX = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,20}/g;

// Clean text and extract unique emails
function extractEmails(html) {
  if (!html) return [];
  // Strip script and style blocks to avoid picking up junk
  const cleanHtml = html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '');
  
  const matches = cleanHtml.match(EMAIL_REGEX) || [];
  
  // Filter out common false positives (like image extensions or junk domains)
  const junkExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp', '.pdf', 'example.com', 'sentry.io'];
  const uniqueEmails = [...new Set(matches.map(email => email.toLowerCase()))]
    .filter(email => !junkExtensions.some(ext => email.endsWith(ext) || email.includes(ext)));
    
  return uniqueEmails;
}

// Helper to crawl a specific URL with timeout
async function fetchWithTimeout(url, timeout = 8000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });
    clearTimeout(id);
    if (!response.ok) return null;
    return await response.text();
  } catch (e) {
    clearTimeout(id);
    return null;
  }
}

// Crawl a website: try homepage, then /contact, then /contact-us
async function crawlWebsite(lead) {
  const baseWeb = lead.website.trim();
  if (!baseWeb.startsWith('http')) return { ...lead, emails: [] };

  console.log(`Crawling: ${lead.title} (${baseWeb})...`);
  
  // Try homepage
  let html = await fetchWithTimeout(baseWeb);
  let emails = extractEmails(html);
  
  // If no email on homepage, check common sub-pages
  if (emails.length === 0) {
    const origin = new URL(baseWeb).origin;
    const paths = ['/contact', '/contact-us', '/about'];
    
    for (const p of paths) {
      const subUrl = `${origin.endsWith('/') ? origin.slice(0, -1) : origin}${p}`;
      const subHtml = await fetchWithTimeout(subUrl);
      const subEmails = extractEmails(subHtml);
      if (subEmails.length > 0) {
        emails = subEmails;
        break;
      }
    }
  }

  if (emails.length > 0) {
    console.log(`  🎉 Found emails for ${lead.title}: ${emails.join(', ')}`);
  } else {
    console.log(`  ❌ No emails found for ${lead.title}`);
  }

  return {
    ...lead,
    emails: emails
  };
}

// Run campaign crawler with concurrency limit
async function run() {
  console.log('====================================================');
  console.log('🔍 CRAWLING LEADS WEBSITES FOR EMAIL ADDRESSES');
  console.log('====================================================');

  if (!fs.existsSync(CSV_PATH)) {
    console.error(`CSV file not found at: ${CSV_PATH}`);
    process.exit(1);
  }

  const csvText = fs.readFileSync(CSV_PATH, 'utf8');
  const leads = parseCSV(csvText);
  const leadsWithWeb = leads.filter(l => l.website && l.website.startsWith('http'));

  console.log(`Total Leads: ${leads.length}`);
  console.log(`Leads with Websites: ${leadsWithWeb.length}\n`);

  const results = [];
  const queue = [...leadsWithWeb];

  // Helper to run workers in parallel
  async function worker() {
    while (queue.length > 0) {
      const lead = queue.shift();
      try {
        const result = await crawlWebsite(lead);
        results.push(result);
      } catch (e) {
        console.error(`Error crawling ${lead.title}:`, e.message);
      }
    }
  }

  // Launch workers
  const workers = Array.from({ length: CONCURRENCY_LIMIT }, () => worker());
  await Promise.all(workers);

  // Filter only those leads where we actually found emails
  const successfulLeads = results.filter(r => r.emails && r.emails.length > 0);
  
  // Write output
  fs.writeFileSync(OUTPUT_JSON_PATH, JSON.stringify(successfulLeads, null, 2), 'utf8');

  console.log('\n====================================================');
  console.log(`🏁 Crawl complete! Saved ${successfulLeads.length} leads with emails to: ${OUTPUT_JSON_PATH}`);
  console.log('====================================================');
}

run();
