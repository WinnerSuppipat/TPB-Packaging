import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Optional flags (all default to the original behaviour):
//   --width=390   viewport width (default 1440)
//   --dpr=2       device pixel ratio (default 1)
//   --out=path    exact output file (default: auto-numbered in 'temporary screenshots/')
//   --scroll      scroll to the bottom and back before capturing, so lazy images load
//   --no-banner   pre-decline cookie consent so the fixed banner doesn't cover the page
const flags = Object.fromEntries(process.argv.slice(2).filter(a => a.startsWith('--'))
  .map(a => { const [k, v] = a.slice(2).split('='); return [k, v ?? true]; }));
const args = process.argv.slice(2).filter(a => !a.startsWith('--'));

const url = args[0] || 'http://localhost:3000';
const label = args[1] || '';
const width = parseInt(flags.width) || 1440;
const dpr = parseFloat(flags.dpr) || 1;

let outPath;
if (flags.out) {
  outPath = path.resolve(__dirname, flags.out);
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
} else {
  const dir = path.join(__dirname, 'temporary screenshots');
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  const existing = fs.readdirSync(dir).filter(f => f.endsWith('.png'));
  const nums = existing.map(f => parseInt(f.match(/^screenshot-(\d+)/)?.[1] || '0')).filter(Boolean);
  const n = nums.length ? Math.max(...nums) + 1 : 1;
  const filename = label ? `screenshot-${n}-${label}.png` : `screenshot-${n}.png`;
  outPath = path.join(dir, filename);
}

const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width, height: 900, deviceScaleFactor: dpr });
if (flags['no-banner']) {
  await page.evaluateOnNewDocument(() => localStorage.setItem('tpb-analytics-consent', 'denied'));
}
await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
if (flags.scroll) {
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 400) {
      window.scrollTo(0, y);
      await new Promise(r => setTimeout(r, 120));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForNetworkIdle({ idleTime: 500, timeout: 30000 });
  // lazy images may still be fetching — wait until every one has loaded
  await page.waitForFunction(() => [...document.images].every(i => i.complete && i.naturalWidth > 0), { timeout: 15000 });
}
await new Promise(r => setTimeout(r, 2500));
await page.screenshot({ path: outPath, fullPage: true });
await browser.close();

console.log(`Screenshot saved: ${outPath}`);
