# Chirag Chauhan — React portfolio

A premium dark portfolio built from your existing React + Vite project. Includes a CSS 3D hero, project filtering, accessible native project dialogs, freelance services, a project brief builder, responsive styles, and reduced-motion support. No WebGL or animation library is required.

## Start locally

Use Node.js 22.12+ (or a compatible newer LTS version).

```bash
npm ci
npm run dev
```

Open the local URL printed by Vite. Use a terminal inside the extracted project folder, beside package.json.

## Production build

```bash
npm run build
npm run preview
```

The build prerenders the initial homepage into dist/index.html, then React hydrates it for interactivity. Metadata, structured data, a social-sharing PNG, robots.txt, and sitemap.xml are included. This is a static site and needs no backend.

## Deploy to your existing Netlify website

### Manual upload

The included dist folder is already built. Upload **the dist folder**, not the entire source ZIP, through Netlify's deploy interface for your existing site. Keep the existing custom domain attached to that site.

### Git deployment

Copy the project into your existing repository, commit, and push. The included netlify.toml uses:

- Build command: npm run build
- Publish directory: dist
- Node version: 22

This ZIP does not include your old Git history or node_modules.

## Contact configuration

Your existing Upwork URL is preserved. GitHub and LinkedIn links are in src/content.js.

Your email address and WhatsApp number were not in the supplied source, so they are not invented. To enable them, copy .env.example to .env and set your actual public details:

```text
VITE_CONTACT_EMAIL=your actual email address
VITE_WHATSAPP_NUMBER=country code followed by your actual number
```

Use digits only for WhatsApp (no plus sign or spaces). In Netlify Git deployments, add those values as build environment variables. Rebuild after changes. These are public contact details, never secrets.

The brief builder validates the visitor's fields, creates a message, and lets them copy it to Upwork or another channel. With email configured, it also opens an email draft. It does **not** submit, store, email, or transmit inquiries automatically. Clipboard failure has a manual-copy fallback. No server-side contact delivery is installed.

## Edit content and design

- src/content.js: profile links, services, project summaries, details, and statuses.
- src/App.jsx: layout and interactions.
- src/styles.css: typography, colors, breakpoints, and motion.
- index.html: SEO title, description, canonical URL, social tags, and structured data.
- public/social-preview.png: sharing graphic.
- public/chirag-chauhan.png: your supplied portrait, used in the About section without face edits.

The site uses Google Fonts with local system font fallbacks. No external scripts, analytics, or trackers are added.

## Project honesty

Maru Rajwadu Restaurant and Hi-Tech Dholka are shown as deployed React websites, with the exact live and GitHub links you supplied. Descriptions are grounded in the restaurant page title and the repositories. Website cover cards are graphic designs, not screenshots. No paid-client or testimonial claims are made. create-smart-api is shown as published open source. Salon Management SaaS and PlatePilot are marked **In development**, with no live-demo buttons. Their system maps are clearly labeled architecture illustrations. The terminal is an illustrative workflow, not a captured session. No client reviews, revenue figures, project screenshots, or customer results are fabricated. Replace the maps with actual screenshots when you have them and update statuses only when verified.

## Verification

Production build and prerendering are checked. DOM interaction checks cover project filtering, modal opening/closing, navigation, brief generation, clipboard failure, and React hydration. These are not browser visual checks; inspect the final layout on your own desktop and phone before replacing your live deployment.
