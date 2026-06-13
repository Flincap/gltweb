# GLT Church Website

React + TypeScript + Vite + Tailwind. Deploys on Vercel out of the box.

## Run locally
npm install
npm run dev

## Build for deployment (what Vercel runs)
npm run build        # outputs to dist/

Vercel: framework preset "Vite", build command "npm run build", output directory "dist". No other config needed. Routing is hash-based, so no rewrites are required.

## Where things live
- src/data.ts        -> all extensions, onions, FAQs, links (edit here to update content)
- src/pages/         -> Home, WhoWeAre, Extensions, ImNew, Other (Events/Resources/Contact)
- src/shared.tsx     -> nav, footer, give dialog, slant page header
- src/site.css       -> design tokens (brand green #257f18) and the slant signature
- src/assets/        -> hero videos (web-compressed), posters, logos, Setman photo

## Before launch
1. Hero videos are compressed for the web (1.9MB total). To use higher-quality versions, replace the files in src/assets/ with same-named higher-bitrate MP4s and rebuild.
2. Put real bank details in the Give dialog (src/shared.tsx).
3. Point Leverage Devotional to its real link (src/pages/Other.tsx).
4. Connect the contact form and the email subscribe field to your provider (currently the form opens the visitor's email app addressed to enquiries@glt.church).
5. Replace placeholder event flyers on the Events page with real ones (src/pages/Other.tsx).
6. Swap the Google Maps links for embedded maps if you want maps on the page.
