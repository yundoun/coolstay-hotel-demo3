import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

const pages = [
  { url: 'http://localhost:3000/hotels', name: '18-search-panel' },
  { url: 'http://localhost:3000/hotels/list', name: '19-hotel-list' },
  { url: 'http://localhost:3000/hotels/list?region=제주', name: '20-hotel-list-jeju' },
];

for (const p of pages) {
  try {
    await page.goto(p.url, { waitUntil: 'domcontentloaded', timeout: 15000 });
    await page.waitForTimeout(3000);
    await page.screenshot({
      path: `.harness/screenshots/${p.name}.jpeg`,
      type: 'jpeg',
      quality: 90,
    });
    console.log(`✓ ${p.name}`);
  } catch (e) {
    console.log(`✗ ${p.name}: ${e.message}`);
  }
}

await browser.close();
