import { useEffect } from "react";

/**
 * Production origin. Everything canonical and every share image is built from
 * this, so it is the single place to change if the domain ever moves.
 *
 * Note: link scrapers (WhatsApp, iMessage, Facebook, Slack) do not run
 * JavaScript, so they never see anything this component sets. They read the
 * static tags baked into each page at build time by scripts/prerender.mjs.
 * This component keeps the tags correct for in-app navigation and for search
 * engines that do execute JavaScript.
 */
export const SITE = "https://www.glt.church";
export const OG_IMAGE = `${SITE}/og-image.jpg`;

function setMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

export default function Seo({
  title,
  description,
  path,
  image = OG_IMAGE,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
}) {
  useEffect(() => {
    const url = `${SITE}${path}`;
    document.title = title;
    setMeta("name", "description", description);
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", url);
    setMeta("property", "og:image", image);
    setMeta("property", "og:image:secure_url", image);
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", image);

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = url;
  }, [title, description, path, image]);
  return null;
}
