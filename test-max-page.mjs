async function checkPages() {
  let page = 1;
  const brandRegex = /<div class="brand_logo">\s*<a href="([^"]+)"[^>]+style="background-image:\s*url\('([^']+)'\);"[^>]*>([\s\S]*?)<\/a>\s*<\/div>\s*<a[^>]+class="[^"]*brand_name[^"]*"[^>]*>([^<]+)<\/a>/g;

  while (true) {
    const url = `https://www.car.info/en-se/brands?page=${page}`;
    try {
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        }
      });
      if (response.status !== 200) {
        console.log(`Page ${page} returned status ${response.status}. Stopping.`);
        break;
      }
      const text = await response.text();
      
      // Check if page contains the canonical link of the actual page, or if it redirected us
      const canonicalMatch = text.match(/<link rel="canonical" href="https:\/\/www\.car\.info\/en-se\/brands\?page=(\d+)"/);
      if (canonicalMatch && parseInt(canonicalMatch[1]) !== page) {
        console.log(`Page ${page} redirected to page ${canonicalMatch[1]}. Stopping.`);
        break;
      }

      let count = 0;
      let match;
      brandRegex.lastIndex = 0;
      while ((match = brandRegex.exec(text)) !== null) {
        count++;
      }
      console.log(`Page ${page}: found ${count} brands`);
      if (count === 0) {
        console.log(`Page ${page} has 0 brands. Stopping.`);
        break;
      }
      page++;
    } catch (e) {
      console.error(`Error on page ${page}:`, e.message);
      break;
    }
    // Polite delay
    await new Promise(resolve => setTimeout(resolve, 300));
  }
}

checkPages();
