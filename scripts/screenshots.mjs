// Takes fresh 16:9 screenshots of the live project sites into public/.
// Run from GitHub: Actions -> Screenshots -> Run workflow.
import { chromium } from 'playwright';

const SITES = {
  koninghoek: 'https://www.koninghoek.de/de',
  puntcode: 'https://puntcode.de',
  kraftlab: 'https://kraftlab.app',
};

const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: 1920, height: 1080 },
  deviceScaleFactor: 2,
  reducedMotion: 'reduce',
});

for (const [name, url] of Object.entries(SITES)) {
  const page = await context.newPage();
  await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(3000);
  await page.screenshot({ path: `public/${name}.jpg`, type: 'jpeg', quality: 85 });
  console.log(`${name}: ${await page.title()}`);
  await page.close();
}

await browser.close();
