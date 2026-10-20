/** @type {import('tailwindcss').Config} */
module.exports = {
  // main.js / cookie-consent.js add classes at runtime (e.g. `visible`),
  // so they're scanned too — the Play CDN used to pick those up from the DOM
  content: ['./docs/*.html', './docs/th/*.html', './docs/main.js', './docs/cookie-consent.js'],
  theme: { extend: {} },
  plugins: [],
};
