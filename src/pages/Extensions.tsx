import { useMemo, useState } from "react";
import { MapPin, Phone, Mail, Clock, BookOpen, Search, ExternalLink } from "lucide-react";
import { Eyebrow, Reveal, SlantHeader } from "../shared";
import Seo from "../Seo";
import { EXTENSIONS, mapsLink, type Extension } from "../data";

const REGIONS = ["All", "Africa", "Europe", "North America"] as const;

function ExtensionCard({ ext }: { ext: Extension }) {
  return (
    <article className="card-line flex h-full flex-col p-7">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="eyebrow" style={{ color: "var(--glt-green)" }}>
            {ext.flag} {ext.country}
          </p>
          <h3 className="font-display mt-1.5 text-2xl">{ext.name}</h3>
          <p className="mt-1 text-sm text-[var(--glt-ink-soft)]">{ext.city}</p>
        </div>
        {ext.hq && (
          <span
            className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white"
            style={{ background: "var(--glt-green-deep)" }}
          >
            HQ
          </span>
        )}
      </div>

      <div className="mt-5 space-y-2.5 border-t border-[var(--glt-line)] pt-5 text-sm">
        {ext.services.map((s) => (
          <p key={s.label} className="flex items-center gap-2.5">
            <Clock size={15} className="shrink-0" style={{ color: "var(--glt-green)" }} />
            <span className="font-semibold">{s.label}:</span>
            <span className="text-[var(--glt-ink-soft)]">
              {s.time} ({ext.tz})
            </span>
          </p>
        ))}
        {ext.bibleStudy && (
          <p className="flex items-center gap-2.5">
            <BookOpen size={15} className="shrink-0" style={{ color: "var(--glt-green)" }} />
            <span className="font-semibold">Bible Study:</span>
            <span className="text-[var(--glt-ink-soft)]">{ext.bibleStudy}</span>
          </p>
        )}
        {ext.note && (
          <p className="text-[13px] italic text-[var(--glt-ink-soft)]">{ext.note}</p>
        )}
      </div>

      <div className="mt-5 flex-1 space-y-2.5 border-t border-[var(--glt-line)] pt-5 text-sm text-[var(--glt-ink-soft)]">
        <p className="flex gap-2.5">
          <MapPin size={15} className="mt-1 shrink-0" style={{ color: "var(--glt-green)" }} />
          {ext.address}
        </p>
        <p className="pl-[26px] text-[13px]">
          Set Man Representative: <span className="font-semibold text-[var(--glt-ink)]">{ext.smr}</span>
        </p>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-[var(--glt-line)] pt-5 text-[13px] font-semibold">
        <a
          href={mapsLink(ext.address)}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 uppercase tracking-[0.08em]"
          style={{ color: "var(--glt-green-deep)" }}
        >
          <ExternalLink size={14} /> Directions
        </a>
        {ext.phone && (
          <a
            href={`tel:${ext.phone.replace(/[^+\d]/g, "")}`}
            className="inline-flex items-center gap-1.5 text-[var(--glt-ink)] hover:underline"
          >
            <Phone size={14} /> {ext.phone}
          </a>
        )}
        {ext.email && (
          <a
            href={`mailto:${ext.email}`}
            className="inline-flex items-center gap-1.5 break-all text-[var(--glt-ink)] hover:underline"
          >
            <Mail size={14} /> {ext.email}
          </a>
        )}
      </div>
    </article>
  );
}

export default function Extensions() {
  const [region, setRegion] = useState<(typeof REGIONS)[number]>("All");
  const [query, setQuery] = useState("");

  const list = useMemo(() => {
    return EXTENSIONS.filter((e) => {
      const inRegion = region === "All" || e.region === region;
      const q = query.trim().toLowerCase();
      const matches =
        !q ||
        [e.name, e.city, e.country, e.address].join(" ").toLowerCase().includes(q);
      return inRegion && matches;
    });
  }, [region, query]);

  const counts = useMemo(() => {
    const c: Record<string, number> = { All: EXTENSIONS.length };
    for (const e of EXTENSIONS) c[e.region] = (c[e.region] || 0) + 1;
    return c;
  }, []);

  return (
    <>
      <Seo
        title="Our Extensions | GLT Church Locations Worldwide"
        description="Find a GLT Church near you: 20+ extensions (branches) across Nigeria, the United Kingdom, the United States and Canada, with service times, addresses and directions."
        path="/extensions"
      />
      <SlantHeader
        kicker="Our extensions"
        title="One house. Three continents."
        sub="Extensions are our branches. From Lekki to Birmingham to Houston to Calgary, find the GLT family closest to you and join us this Sunday."
      />
      <section className="mx-auto max-w-7xl px-5 py-16 md:py-20">
        <Reveal>
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <Eyebrow>Find a location</Eyebrow>
              <h2 className="font-display text-[clamp(1.9rem,3.8vw,3rem)]">
                {EXTENSIONS.length}+ extensions worldwide
              </h2>
            </div>
            <label className="relative block w-full max-w-sm">
              <span className="sr-only">Search locations</span>
              <Search
                size={17}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[var(--glt-ink-soft)]"
              />
              <input
                className="field pl-11"
                placeholder="Search city, country, or address"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </label>
          </div>
          <div className="mt-8 flex flex-wrap gap-2" role="tablist" aria-label="Filter by region">
            {REGIONS.map((r) => (
              <button
                key={r}
                role="tab"
                aria-selected={region === r}
                onClick={() => setRegion(r)}
                className="px-5 py-2.5 text-xs font-bold uppercase tracking-[0.14em] transition"
                style={
                  region === r
                    ? { background: "var(--glt-ink)", color: "#fff" }
                    : {
                        background: "#fff",
                        color: "var(--glt-ink)",
                        boxShadow: "inset 0 0 0 1px var(--glt-line)",
                      }
                }
              >
                {r} <span className="opacity-60">({counts[r] || 0})</span>
              </button>
            ))}
          </div>
        </Reveal>

        {list.length === 0 ? (
          <div className="card-line mt-10 p-12 text-center">
            <p className="font-display text-2xl">No locations match that search</p>
            <p className="mt-2 text-sm text-[var(--glt-ink-soft)]">
              Try a different city or clear the search to see all {EXTENSIONS.length} extensions.
            </p>
            <button
              className="btn btn-outline-ink mt-6"
              onClick={() => {
                setQuery("");
                setRegion("All");
              }}
            >
              Show all locations
            </button>
          </div>
        ) : (
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {list.map((e, i) => (
              <Reveal key={e.name} delay={(i % 3) * 80} className="h-full">
                <ExtensionCard ext={e} />
              </Reveal>
            ))}
          </div>
        )}
      </section>

      <section className="slant-top text-white" style={{ background: "var(--glt-green)" }}>
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-5 pb-16 pt-24 md:flex-row md:items-center">
          <div>
            <p className="font-display text-[clamp(1.7rem,3.4vw,2.8rem)]">
              Not near a GLT yet?
            </p>
            <p className="mt-2 max-w-lg text-white/85">
              Join the international headquarters live online every Sunday and Tuesday,
              wherever you are in the world.
            </p>
          </div>
          <a
            href="https://mixlr.com/gltchurchlive"
            target="_blank"
            rel="noreferrer"
            className="btn btn-give shrink-0"
          >
            Join Live Online
          </a>
        </div>
      </section>
    </>
  );
}
