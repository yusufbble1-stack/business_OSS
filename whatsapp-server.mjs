import express from 'express';
import cors from 'cors';
import pkg from 'whatsapp-web.js';
const { Client, LocalAuth } = pkg;
import qrcode from 'qrcode-terminal';
import QRCode from 'qrcode';
import fs from 'fs';

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.static('outreach-ui'));

// Helper to find the system's Chrome installation
const getChromePath = () => {
    const paths = [
        '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
        '/Applications/Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary',
        '/Applications/Chromium.app/Contents/MacOS/Chromium',
        '/usr/bin/google-chrome-stable',
        '/usr/bin/google-chrome',
        '/usr/bin/chromium',
        '/usr/bin/chromium-browser'
    ];
    for (const p of paths) {
        if (fs.existsSync(p)) {
            return p;
        }
    }
    return null;
};

const executablePath = getChromePath();

if (!executablePath) {
    console.error('\n❌ ERROR: Google Chrome / Chromium was not found on your system.');
    console.error('Since the Puppeteer chromium download was skipped, you must have Google Chrome installed on your machine.');
    console.error('Please install Google Chrome or update the "getChromePath" function in whatsapp-server.mjs with your custom installation path.\n');
    process.exit(1);
}

console.log(`Using system Chrome at: ${executablePath}`);

// Initialize client
const client = new Client({
    authStrategy: new LocalAuth({
        dataPath: './.wwebjs_auth'
    }),
    webVersionCache: {
        type: 'remote',
        remotePath: 'https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/{version}.html',
        strict: false
    },
    puppeteer: {
        headless: true,
        executablePath: executablePath,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--no-first-run',
            '--no-zygote',
            '--disable-gpu'
        ]
    }
});

let clientStatus = 'DISCONNECTED';

client.on('qr', (qr) => {
    console.log('\n--- SCAN THE QR CODE BELOW TO CONNECT ---');
    qrcode.generate(qr, { small: true });
    clientStatus = 'QR_RECEIVED';

    // Save QR code as a PNG file so the user can easily open it in the editor
    QRCode.toFile('./whatsapp-qr.png', qr, {
        color: {
            dark: '#000000',
            light: '#ffffff'
        },
        width: 300
    }).then(() => {
        console.log('Saved QR code image to: ./whatsapp-qr.png');
    }).catch(err => {
        console.error('Failed to save QR code image:', err);
    });
});

client.on('ready', () => {
    console.log('\nWhatsApp client is ready and connected!');
    clientStatus = 'CONNECTED';
});

client.on('authenticated', () => {
    console.log('WhatsApp client authenticated successfully.');
    clientStatus = 'AUTHENTICATED';
});

client.on('auth_failure', (msg) => {
    console.error('Authentication failure:', msg);
    clientStatus = 'AUTH_FAILURE';
});

client.on('disconnected', (reason) => {
    console.log('Client was logged out:', reason);
    clientStatus = 'DISCONNECTED';
});

// Load outreach logs helper
const OUTREACH_LOG_PATH = './whatsapp_outreach_log.json';

const loadOutreachLogs = () => {
    if (fs.existsSync(OUTREACH_LOG_PATH)) {
        try {
            return JSON.parse(fs.readFileSync(OUTREACH_LOG_PATH, 'utf8'));
        } catch (e) {
            console.error('Error reading outreach logs:', e);
            return {};
        }
    }
    return {};
};

const saveOutreachLog = (phone, data) => {
    const logs = loadOutreachLogs();
    logs[phone] = {
        ...logs[phone],
        ...data,
        updatedAt: new Date().toISOString()
    };
    fs.writeFileSync(OUTREACH_LOG_PATH, JSON.stringify(logs, null, 2), 'utf8');
};

const compilePitch = (lead) => {
    const title = lead.title || 'there';
    const website = lead.website || '';
    
    if (website && website.startsWith('http')) {
        return `Awesome, thanks for getting back to me!\n\nI saw your site (${website}) and wanted to offer an upgrade. We build custom websites with integrated Admin, Client, and Technician portals in a premium supercar style. It automates bookings, invoice dispatching, and job logging for mechanics.\n\nYou can review a live demonstration of the platform we created here: https://business-92l42c023-youssef-s-projects17.vercel.app\n\nLet me know if you would like to discuss adding a portal system to your current site!`;
    } else {
        return `Awesome, thanks for getting back to me!\n\nWe actually build custom websites with integrated Admin, Client, and Technician portals specifically for auto centers in a premium supercar design style. It handles online bookings, mechanic schedules, and digital invoices.\n\nHave a look at a live demonstration of the system: https://business-92l42c023-youssef-s-projects17.vercel.app\n\nWould you be open to a quick demo or chat about setting this up for ${title}?`;
    }
};

client.on('message', async (msg) => {
    // Only handle personal chats, ignore groups/broadcasts
    if (msg.from.endsWith('@g.us') || msg.from.endsWith('@broadcast')) return;

    // Extract clean phone number
    const senderNumber = msg.from.replace(/\D/g, '');
    const logs = loadOutreachLogs();

    // Find if this phone number is a lead in our outreach database
    const leadKey = Object.keys(logs).find(key => key.replace(/\D/g, '') === senderNumber);

    if (leadKey) {
        const lead = logs[leadKey];
        if (lead.status === 'HOOK_SENT') {
            console.log(`[Autoresponder] Detected reply from lead: ${lead.title} (${leadKey})`);
            
            // Mark as replied
            saveOutreachLog(leadKey, { status: 'REPLIED' });

            // Compile customized Stage 2 Pitch
            const pitchText = compilePitch(lead);

            // Wait a random delay (2-5 seconds) to look more human before replying
            const delay = 2000 + Math.round(Math.random() * 3000);
            setTimeout(async () => {
                try {
                    // Send message (always reply to the sender ID, which could be JID or LID)
                    await client.sendMessage(msg.from, pitchText);
                    console.log(`[Autoresponder] Sent customized Stage 2 pitch to ${lead.title}`);
                    saveOutreachLog(leadKey, { status: 'PITCH_SENT' });
                } catch (err) {
                    console.error(`[Autoresponder] Failed to send pitch to ${lead.title}:`, err.message);
                }
            }, delay);
        }
    }
});

// REST Endpoints
app.get('/status', (req, res) => {
    res.json({ status: clientStatus });
});

app.post('/send-message', async (req, res) => {
    const { number, message } = req.body;

    if (!number || !message) {
        return res.status(400).json({ error: 'Please provide both "number" and "message".' });
    }

    if (clientStatus !== 'CONNECTED') {
        return res.status(503).json({ error: 'WhatsApp client is not connected. Current status: ' + clientStatus });
    }

    try {
        // WhatsApp numbers require the country code and must end with @c.us
        // Sanitizing input: remove non-digit characters and append @c.us
        let formattedNumber = number.replace(/\D/g, ''); 
        
        // Resolve target ID from WhatsApp (resolves traditional JID or new privacy LID formats)
        const numberId = await client.getNumberId(formattedNumber);
        if (!numberId) {
            return res.status(404).json({ error: 'This phone number is not registered on WhatsApp.' });
        }

        const response = await client.sendMessage(numberId._serialized, message);
        res.json({ success: true, messageId: response.id._serialized });
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).json({ error: 'Failed to send message: ' + error.message });
    }
});

// Start Express server
app.listen(port, () => {
    console.log(`WhatsApp API helper server running on http://localhost:${port}`);
});

// Initialize client
console.log('Initializing WhatsApp client...');
client.initialize().catch(err => {
    console.error('Initialization error:', err);
});
