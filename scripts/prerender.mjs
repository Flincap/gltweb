/*
 * Writes a static HTML file per route into dist/, each with its own title,
 * description, canonical URL and Open Graph tags.
 *
 * Why this exists: link scrapers (WhatsApp, iMessage, Facebook, LinkedIn,
 * Slack, Twitter) fetch the HTML and never execute JavaScript. In a plain SPA
 * every URL returns the same index.html, so sharing /extensions or /sermons
 * shows the homepage title and description. Vercel serves a real file in
 * preference to a rewrite, so dist/extensions/index.html wins over the
 * catch-all and the scraper gets the right tags.
 *
 * The React app still handles navigation normally - each file loads the same
 * bundle.
 *
 * Plain Node, no dependencies. Runs after `vite build`.
 */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DIST = join(ROOT, "dist");
const SITE = "https://www.glt.church";
const OG_IMAGE = `${SITE}/og-image.jpg`;

/* Keep these in step with the <Seo> props on each page. */
const ROUTES = [
  {
    path: "/",
    title: "GLT Church | God's Love Tabernacle International Church",
    description:
      "GLT Church: a people of God's love. Join us Sundays at 7:45am & 10:00am and Tuesdays at 6:30pm (WAT) in Lekki, Lagos, with extensions across Africa, Europe and North America.",
  },
  {
    path: "/who-we-are",
    title: "Who We Are | GLT Church",
    description:
      "Our vision, our Setman, and the culture of the house: the New Creation Realities taught with simplicity, clarity and power at GLT Church.",
  },
  {
    path: "/extensions",
    title: "Our Extensions | GLT Church Locations Worldwide",
    description:
      "Find a GLT Church near you: extensions across Nigeria, Ghana, the United Kingdom, the United States and Canada, with service times, addresses and directions.",
  },
  {
    path: "/im-new",
    title: "I'm New | GLT Church",
    description:
      "Planning your first visit to GLT Church? We meet Sundays at 7:45am & 10:00am (WAT) at the GLT Lekki Auditorium, Lekki-Epe Expressway, Lagos. Here's what to expect.",
  },
  {
    path: "/events",
    title: "Events | GLT Church",
    description:
      "What's on at GLT Church: the Special Miracle Service every first Sunday at 8:00am at the international headquarters, Bible Study on Tuesdays at 6:30pm (WAT), plus conferences and outreaches.",
  },
  {
    path: "/sermons",
    title: "Sermons | GLT Church",
    description:
      "Watch and listen to GLT Church sermons: full services on YouTube, live audio on Mixlr, message downloads on Telegram, and the Leverage daily devotional.",
  },
  {
    path: "/contact",
    title: "Contact Us | GLT Church",
    description:
      "Reach GLT Church in Lekki, Lagos: send a message, call +234 906 280 7057, email enquiries@glt.church, or visit the GLT Lekki Auditorium on the Lekki-Epe Expressway.",
  },
];

const escapeAttr = (s) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

/** Replace the content of a meta tag, matched on its name/property. */
function setMeta(html, attr, key, value) {
  const re = new RegExp(
    `(<meta\\s+${attr}="${key}"[^>]*content=")[^"]*(")`,
    "i"
  );
  if (re.test(html)) return html.replace(re, `$1${escapeAttr(value)}$2`);

  // Multi-line tags: content sits on its own line after the key.
  const multi = new RegExp(
    `(<meta\\s*\\n?\\s*${attr}="${key}"\\s*\\n?\\s*content=")[^"]*(")`,
    "i"
  );
  if (multi.test(html)) return html.replace(multi, `$1${escapeAttr(value)}$2`);

  return html.replace(
    "</head>",
    `    <meta ${attr}="${key}" content="${escapeAttr(value)}" />\n  </head>`
  );
}

const template = await readFile(join(DIST, "index.html"), "utf8");

let written = 0;
const problems = [];

for (const route of ROUTES) {
  const url = `${SITE}${route.path}`;
  let html = template;

  html = html.replace(
    /<title>[^<]*<\/title>/i,
    `<title>${escapeAttr(route.title)}</title>`
  );
  html = html.replace(
    /(<link\s+rel="canonical"\s+href=")[^"]*(")/i,
    `$1${url}$2`
  );

  html = setMeta(html, "name", "description", route.description);
  html = setMeta(html, "property", "og:title", route.title);
  html = setMeta(html, "property", "og:description", route.description);
  html = setMeta(html, "property", "og:url", url);
  html = setMeta(html, "property", "og:image", OG_IMAGE);
  html = setMeta(html, "name", "twitter:title", route.title);
  html = setMeta(html, "name", "twitter:description", route.description);
  html = setMeta(html, "name", "twitter:image", OG_IMAGE);

  // Verify the swap actually happened rather than trusting the regex.
  if (!html.includes(`<title>${escapeAttr(route.title)}</title>`)) {
    problems.push(`${route.path}: title not replaced`);
  }
  if (!html.includes(`content="${url}"`)) {
    problems.push(`${route.path}: og:url not replaced`);
  }
  if (!html.includes(escapeAttr(route.description))) {
    problems.push(`${route.path}: description not replaced`);
  }

  const target =
    route.path === "/"
      ? join(DIST, "index.html")
      : join(DIST, route.path.replace(/^\//, ""), "index.html");
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, html, "utf8");
  written++;
}

if (problems.length) {
  console.error("\nPrerender failed:\n  " + problems.join("\n  ") + "\n");
  process.exit(1);
}

console.log(`prerender: ${written} routes written with per-page share tags`);
