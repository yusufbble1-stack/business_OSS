import fs from 'fs';
import path from 'path';

// Get page from command line argument, default to 11
const page = process.argv[2] || '11';
const outputFilename = `brands_page_${page}.json`;
const delayMs = 500; // Polite delay between requests

async function fetchWithRetry(url, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        }
      });
      if (response.status === 200) {
        return await response.text();
      }
      console.warn(`  ⚠️ Status ${response.status} for ${url}, retrying (${i + 1}/${retries})...`);
    } catch (e) {
      console.warn(`  ⚠️ Error fetching ${url}: ${e.message}, retrying (${i + 1}/${retries})...`);
    }
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  return null;
}

async function scrape() {
  console.log('====================================================');
  console.log(`🔍 SCRAPING CAR BRANDS & MODELS FROM PAGE ${page}`);
  console.log('====================================================');

  const mainUrl = `https://www.car.info/en-se/brands?page=${page}`;
  console.log(`Fetching brands list from: ${mainUrl}...`);
  const mainHtml = await fetchWithRetry(mainUrl);

  if (!mainHtml) {
    console.error('❌ Failed to fetch the main brands page.');
    process.exit(1);
  }

  // Regex to extract brand info: link, background-image logo URL, and name
  // Format:
  // <div class="brand_logo"><a href="https://www.car.info/en-se/aeon" class="..." style="background-image: url('...');" aria-label="Aeon"></a></div>
  // <a href="..." class="... brand_name ...">Aeon</a>
  const brandRegex = /<div class="brand_logo">\s*<a href="([^"]+)"[^>]+style="background-image:\s*url\('([^']+)'\);"[^>]*>([\s\S]*?)<\/a>\s*<\/div>\s*<a[^>]+class="[^"]*brand_name[^"]*"[^>]*>([^<]+)<\/a>/g;

  const brands = [];
  let match;
  while ((match = brandRegex.exec(mainHtml)) !== null) {
    const url = match[1];
    const logoUrl90 = match[2];
    // Transform logo to 180x180 size as requested
    const logoUrl180 = logoUrl90.replace('/logos/90/', '/logos/180/');
    let name = match[4].trim();
    name = name.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"');
    brands.push({ name, url, logo: logoUrl180 });
  }

  console.log(`\nFound ${brands.length} brands on page ${page}.`);
  console.log('Starting to fetch models for each brand...\n');

  const results = [];
  for (let i = 0; i < brands.length; i++) {
    const brand = brands[i];
    console.log(`[${i + 1}/${brands.length}] Fetching models for: ${brand.name}...`);
    
    // Fetch brand page
    const brandHtml = await fetchWithRetry(brand.url);
    const models = [];

    if (brandHtml) {
      // Extract models using regex matching mg_stop_link class inside the series table
      const modelRegex = /class="[^"]*mg_stop_link[^"]*"[^>]*>([^<]+)<\/a>/g;
      let modelMatch;
      while ((modelMatch = modelRegex.exec(brandHtml)) !== null) {
        let modelName = modelMatch[1].trim();
        modelName = modelName.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"');
        if (!models.includes(modelName)) {
          models.push(modelName);
        }
      }
      console.log(`  Found ${models.length} models: ${models.slice(0, 5).join(', ')}${models.length > 5 ? '...' : ''}`);
    } else {
      console.error(`  ❌ Failed to load page for ${brand.name}`);
    }

    results.push({
      brand: brand.name,
      logo: brand.logo,
      url: brand.url,
      models: models
    });

    // Polite delay
    if (i < brands.length - 1) {
      await new Promise(resolve => setTimeout(resolve, delayMs));
    }
  }

  // Save results to JSON file
  fs.writeFileSync(outputFilename, JSON.stringify(results, null, 2), 'utf8');

  console.log('\n====================================================');
  console.log(`🏁 Done! Scraped ${results.length} brands with their models.`);
  console.log(`💾 Saved to: ${outputFilename}`);
  console.log('====================================================');
}

scrape();
