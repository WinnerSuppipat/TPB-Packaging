// Sets each <lastmod> in docs/sitemap.xml to the last git commit date of the
// page's HTML file in docs/ (following renames). Files with uncommitted changes
// get today's date, since that's when those changes will ship.
// Run before each deploy:  npm run sitemap
import { execFileSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const sitemapPath = path.join(root, 'docs', 'sitemap.xml');
const SITE = 'https://www.tpbpackaging.com';

const git = (...args) => execFileSync('git', args, { cwd: root, encoding: 'utf8' }).trim();
const today = new Date().toLocaleDateString('en-CA'); // YYYY-MM-DD, local time

// https://www.tpbpackaging.com/th/about -> docs/th/about.html, .../th/ -> docs/th/index.html
function fileFor(loc) {
  let p = loc.slice(SITE.length).replace(/^\//, '');
  if (p === '' || p.endsWith('/')) p += 'index.html';
  else if (!path.extname(p)) p += '.html';
  return 'docs/' + p;
}

function lastModified(file) {
  if (git('status', '--porcelain', '--', file)) return today; // uncommitted or untracked
  return git('log', '-1', '--follow', '--format=%cs', '--', file) || today;
}

let changed = 0;
const xml = fs.readFileSync(sitemapPath, 'utf8').replace(
  /<loc>([^<]+)<\/loc>(\s*)<lastmod>([^<]*)<\/lastmod>/g,
  (match, loc, ws, old) => {
    const file = fileFor(loc);
    if (!fs.existsSync(path.join(root, file))) throw new Error(`No file for ${loc} (expected ${file})`);
    const date = lastModified(file);
    console.log(`${date === old ? ' ' : '*'} ${date}  ${loc}  (${file})`);
    if (date !== old) changed++;
    return `<loc>${loc}</loc>${ws}<lastmod>${date}</lastmod>`;
  }
);

fs.writeFileSync(sitemapPath, xml);
console.log(`\n${changed} lastmod date(s) updated in sitemap.xml`);
