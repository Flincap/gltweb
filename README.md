# GLT Church Website

React + TypeScript + Vite + Tailwind. Deploys on Vercel (vercel.json included for SPA rewrites).

## Run locally
npm install
npm run dev

## Build (what Vercel runs)
npm run build        # outputs to dist/

## Where things live
- src/data.ts        -> all extensions, the Onions, giving details, FAQs, links, social URLs (edit here to update content)
- src/pages/         -> Home, WhoWeAre, Extensions, ImNew, Other (Events/Sermons/Contact)
- src/shared.tsx     -> nav, footer, give dialog, slant header
- src/Seo.tsx        -> per-route titles/meta (site URL constant lives here)
- src/site.css       -> design tokens (brand green #257f18) and the slant signature
- public/            -> favicon, og-image, robots.txt, sitemap.xml

## Placeholders to fill in (search the codebase for TODO)
1. src/assets/onions.jpg -> replace with the approved photo of Daddy with the Onions (Google Drive link in WhoWeAre.tsx).
2. When the glt.church domain is attached: update the SITE constant in src/Seo.tsx, the URLs in index.html OG/Twitter tags, public/robots.txt and public/sitemap.xml (currently gltweb.vercel.app).
