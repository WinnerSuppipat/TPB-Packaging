# TPB Packaging Co., Ltd — Website

Marketing site for TPB Packaging Co., Ltd, a corrugated cardboard box manufacturer in Phanat Nikhom, Chonburi, Thailand.

## Pages

All public files live in `docs/` (the GitHub Pages publishing folder), with Thai versions in `docs/th/`.

- `docs/index.html` — Home (tagline, mission & vision)
- `docs/about.html` — About (company history, core values, industries served)
- `docs/products.html` — Products/Capabilities (liner grades, flute types, design capabilities)
- `docs/contact.html` — Contact (details, map, quote request form)

## Stack

Static HTML/CSS/JS. Tailwind is compiled to `docs/tailwind.css` with `npm run build:css` (rerun after adding Tailwind classes); all custom styling lives in `docs/styles.css`. Shared nav/footer behavior and animations are in `docs/main.js`.

## Local development

```bash
node serve.mjs
```

Serves `docs/` at `http://localhost:3000`, including the custom `404.html` for missing paths.

### Screenshots (for design review)

```bash
node screenshot.mjs http://localhost:3000/index.html
```

Requires `puppeteer` (see `package.json`) — run `npm install` first. Screenshots save to `temporary screenshots/` (gitignored).

## Deploy

GitHub Pages publishes `docs/` from the `main` branch (Settings → Pages → Deploy from a branch → `main` / `/docs`). Files outside `docs/` (this README, `CLAUDE.md`, `package.json`, scripts, `_originals/`) are not published.

Before each deploy, refresh the sitemap dates, then commit and push:

```bash
npm run sitemap
```

## Notes

- Several sections still contain placeholder content pending real specs/copy (see inline `[ Placeholder ]` markers), e.g. some liner grade descriptions and the design-capabilities imagery.
- The contact form does not yet send anywhere — it shows a demo success message only. See project notes for form-backend options under consideration (Web3Forms/Formspree vs. mailto).
