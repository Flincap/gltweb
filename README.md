# GLT Church Website

React + TypeScript + Vite + Tailwind. Deploys on Vercel (vercel.json included for SPA rewrites).

## Run locally
npm install
npm run dev

## Build (what Vercel runs)
npm run build        # outputs to dist/

## Where things live
- src/data.ts        -> all extensions, pillars, FAQs, links, social URLs (edit here to update content)
- src/pages/         -> Home, WhoWeAre, Extensions, ImNew, Other (Events/Sermons/Contact)
- src/shared.tsx     -> nav, footer, newsletter form, give dialog, slant header
- src/Seo.tsx        -> per-route titles/meta (site URL constant lives here)
- src/site.css       -> design tokens (brand green #257f18) and the slant signature
- public/            -> favicon, og-image, robots.txt, sitemap.xml

## Placeholders to fill in (search the codebase for TODO)
1. src/data.ts -> SOCIALS.instagram (#TODO-instagram)
2. src/data.ts -> SOCIALS.facebook (#TODO-facebook)
3. src/data.ts -> LINKS.newsletterEndpoint (#TODO-newsletter-endpoint). Create a free Formspree form and paste its endpoint; the form already POSTs JSON {email}.
4. src/shared.tsx -> Give dialog bank details.
5. When the glt.church domain is attached: update the SITE constant in src/Seo.tsx, the URLs in index.html OG/Twitter tags, public/robots.txt and public/sitemap.xml (currently gltweb.vercel.app).
