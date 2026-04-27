import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

await page.goto('https://www.stayfolio.com/findstay', { waitUntil: 'domcontentloaded', timeout: 15000 });
await page.waitForTimeout(3000);

// Click "일정" button
await page.evaluate(() => {
  const buttons = document.querySelectorAll('button');
  for (const b of buttons) {
    if (b.textContent.trim() === '일정' && b.offsetParent !== null) {
      b.click();
      break;
    }
  }
});
await page.waitForTimeout(1000);

await page.screenshot({
  path: '/Users/yundoun/Desktop/demo/coolstay-hotel-demo3/.harness/screenshots/ref-findstay-calendar.jpeg',
  type: 'jpeg',
  quality: 90,
});
console.log('✓ calendar open');

// Also click 인원
await page.goto('https://www.stayfolio.com/findstay', { waitUntil: 'domcontentloaded', timeout: 15000 });
await page.waitForTimeout(3000);
await page.evaluate(() => {
  const buttons = document.querySelectorAll('button');
  for (const b of buttons) {
    if (b.textContent.trim() === '인원' && b.offsetParent !== null) {
      b.click();
      break;
    }
  }
});
await page.waitForTimeout(1000);

await page.screenshot({
  path: '/Users/yundoun/Desktop/demo/coolstay-hotel-demo3/.harness/screenshots/ref-findstay-guests.jpeg',
  type: 'jpeg',
  quality: 90,
});
console.log('✓ guests open');

await browser.close();
