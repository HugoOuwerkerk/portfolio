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
  colorScheme: 'light',
});

for (const [name, url] of Object.entries(SITES)) {
  const page = await context.newPage();
  // KraftLab defaults to dark and keeps its theme in localStorage, so ask for light mode.
  if (name === 'kraftlab') {
    await page.addInitScript(() => localStorage.setItem('kraftlab_theme', 'light'));
  }
  await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(3000);
  await page.screenshot({ path: `public/${name}.jpg`, type: 'jpeg', quality: 85 });
  console.log(`${name}: ${await page.title()}`);
  await page.close();
}

await browser.close();
