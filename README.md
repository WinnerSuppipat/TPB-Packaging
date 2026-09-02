# TPB Packaging Co., Ltd — Website

Marketing site for TPB Packaging Co., Ltd, a corrugated cardboard box manufacturer in Phanat Nikhom, Chonburi, Thailand.

## Pages

- `index.html` — Home (tagline, mission & vision)
- `about.html` — About (company history, core values, industries served)
- `products.html` — Products/Capabilities (liner grades, flute types, design capabilities)
- `contact.html` — Contact (details, map, quote request form)

## Stack

Static HTML/CSS/JS, no build step. Tailwind is loaded via CDN for utility classes; all custom styling lives in `styles.css`. Shared nav/footer behavior and animations are in `main.js`.

## Local development

```bash
node serve.mjs
```

Serves the project root at `http://localhost:3000`.

### Screenshots (for design review)

```bash
node screenshot.mjs http://localhost:3000/index.html
```

Requires `puppeteer` (see `package.json`) — run `npm install` first. Screenshots save to `temporary screenshots/` (gitignored).

## Notes

- Several sections still contain placeholder content pending real specs/copy (see inline `[ Placeholder ]` markers), e.g. some liner grade descriptions and the design-capabilities imagery.
- The contact form does not yet send anywhere — it shows a demo success message only. See project notes for form-backend options under consideration (Web3Forms/Formspree vs. mailto).
