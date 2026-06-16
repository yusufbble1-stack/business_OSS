import fs from 'fs';
import path from 'path';

const CONCURRENCY_LIMIT = 5;
const DELAY_BETWEEN_REQUESTS = 300; // delay in ms for each worker after a request
const outputFilename = 'all_car_brands_and_models.json';

async function fetchWithRetry(url, retries = 3, delay = 1000) {
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
      console.warn(`  ⚠️ Status ${response.status} for ${url}, retrying (${i + 1}/${retries}) in ${delay}ms...`);
    } catch (e) {
      console.warn(`  ⚠️ Error fetching ${url}: ${e.message}, retrying (${i + 1}/${retries}) in ${delay}ms...`);
    }
    await new Promise(resolve => setTimeout(resolve, delay));
    delay *= 2; // Exponential backoff
  }
  return null;
}

async function scrapeAll() {
  console.log('====================================================');
  console.log('🚀 STARTING FULL CRAWL: ALL CAR BRANDS AND MODELS');
  console.log('====================================================');

  const brands = [];
  const brandRegex = /<div class="brand_logo">\s*<a href="([^"]+)"[^>]+style="background-image:\s*url\('([^']+)'\);"[^>]*>([\s\S]*?)<\/a>\s*<\/div>\s*<a[^>]+class="[^"]*brand_name[^"]*"[^>]*>([^<]+)<\/a>/g;

  // Step 1: Scrape all pages to get the complete list of brands
  console.log('Step 1: Scraping brand list from pages 1 to 31...');
  for (let page = 1; page <= 31; page++) {
    const url = `https://www.car.info/en-se/brands?page=${page}`;
    console.log(`  Fetching page ${page}/31...`);
    const html = await fetchWithRetry(url);
    if (!html) {
      console.error(`  ❌ Failed to fetch page ${page}`);
      continue;
    }

    let pageBrandCount = 0;
    let match;
    brandRegex.lastIndex = 0;
    while ((match = brandRegex.exec(html)) !== null) {
      const brandUrl = match[1];
      const logoUrl90 = match[2];
      const logoUrl180 = logoUrl90.replace('/logos/90/', '/logos/180/');
      let name = match[4].trim();
      name = name.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"');
      
      // Prevent duplicates
      if (!brands.some(b => b.url === brandUrl)) {
        brands.push({ name, url: brandUrl, logo: logoUrl180 });
        pageBrandCount++;
      }
    }
    console.log(`  Page ${page}: Added ${pageBrandCount} brands. Total so far: ${brands.length}`);
    await new Promise(resolve => setTimeout(resolve, 300));
  }

  console.log(`\n🎉 Step 1 Complete! Found ${brands.length} unique brands.`);
  console.log('Step 2: Crawling each brand page for models concurrently...');

  const results = [];
  const queue = [...brands];
  let completedCount = 0;

  async function worker() {
    while (queue.length > 0) {
      const brand = queue.shift();
      const currentIdx = ++completedCount;
      console.log(`[${currentIdx}/${brands.length}] Crawling: ${brand.name}...`);
      
      try {
        const brandHtml = await fetchWithRetry(brand.url);
        const models = [];

        if (brandHtml) {
          const modelRegex = /class="[^"]*mg_stop_link[^"]*"[^>]*>([^<]+)<\/a>/g;
          let modelMatch;
          while ((modelMatch = modelRegex.exec(brandHtml)) !== null) {
            let modelName = modelMatch[1].trim();
            modelName = modelName.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"');
            if (!models.includes(modelName)) {
              models.push(modelName);
            }
          }
        } else {
          console.error(`  ❌ Failed to fetch models for ${brand.name}`);
        }

        results.push({
          brand: brand.name,
          logo: brand.logo,
          url: brand.url,
          models: models
        });

      } catch (e) {
        console.error(`  ❌ Error processing ${brand.name}: ${e.message}`);
        results.push({
          brand: brand.name,
          logo: brand.logo,
          url: brand.url,
          models: [],
          error: e.message
        });
      }

      // Polite delay between requests for this worker
      await new Promise(resolve => setTimeout(resolve, DELAY_BETWEEN_REQUESTS));
    }
  }

  // Spawn parallel workers
  const workers = Array.from({ length: CONCURRENCY_LIMIT }, () => worker());
  await Promise.all(workers);

  // Sort results by brand name for convenience
  results.sort((a, b) => a.brand.localeCompare(b.brand));

  // Save the complete JSON
  fs.writeFileSync(outputFilename, JSON.stringify(results, null, 2), 'utf8');

  console.log('\n====================================================');
  console.log('🏁 FULL CRAWL COMPLETE!');
  console.log(`💾 Scraped ${results.length} brands total.`);
  console.log(`💾 Saved database to: ${outputFilename}`);
  console.log('====================================================');
}

scrapeAll();
