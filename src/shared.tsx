import { useState, type FormEvent, type ReactNode } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, MapPin, Phone, Mail } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import logoWhite from "./assets/logo_white.png";
import { GIVING, LINKS, PAGES, SOCIAL_ICONS } from "./data";

export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const [shown, setShown] = useState(false);
  return (
    <div
      ref={(el) => {
        if (!el || shown) return;
        const io = new IntersectionObserver(
          (entries) => {
            if (entries[0].isIntersecting) {
              setShown(true);
              io.disconnect();
            }
          },
          { threshold: 0.12 }
        );
        io.observe(el);
        return () => io.disconnect();
      }}
      className={`reveal ${shown ? "in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export function Eyebrow({ children, light }: { children: ReactNode; light?: boolean }) {
  return (
    <p
      className="eyebrow mb-4 flex items-center gap-3"
      style={{ color: light ? "var(--glt-mint)" : "var(--glt-green)" }}
    >
      <span
        className="inline-block h-[2px] w-8"
        style={{ background: light ? "var(--glt-mint)" : "var(--glt-green)" }}
      />
      {children}
    </p>
  );
}

export function SlantHeader({
  title,
  kicker,
  sub,
}: {
  title: string;
  kicker: string;
  sub?: ReactNode;
}) {
  return (
    <header
      className="slant-bottom text-white"
      style={{
        background:
          "linear-gradient(112deg, var(--glt-green-deep) 0%, var(--glt-green) 58%, #2f9a1f 100%)",
      }}
    >
      <div className="mx-auto max-w-6xl px-5 pt-28 pb-24 md:pt-36 md:pb-32">
        <Eyebrow light>{kicker}</Eyebrow>
        <h1 className="font-display rise-in text-[clamp(2.4rem,5.6vw,4.6rem)] [overflow-wrap:break-word]">
          {title}
        </h1>
        {sub && (
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white md:text-lg">
            {sub}
          </p>
        )}
      </div>
    </header>
  );
}

export function GiveDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md border-none bg-white p-0">
        <div
          className="slant-bottom px-7 pb-10 pt-8 text-white"
          style={{ background: "var(--glt-green)" }}
        >
          <DialogHeader>
            <DialogTitle className="font-display text-3xl font-normal text-white">
              Give
            </DialogTitle>
            <DialogDescription className="text-white">
              Cheerful, willful, sacrificial. Thank you for advancing the Gospel
              with us.
            </DialogDescription>
          </DialogHeader>
        </div>
        <div className="max-h-[55vh] space-y-4 overflow-y-auto px-7 pb-8 pt-2 text-sm leading-relaxed">
          <div className="card-line p-4">
            <p className="eyebrow mb-1" style={{ color: "var(--glt-green)" }}>
              Bank transfer (Naira)
            </p>
            <p className="text-[var(--glt-ink)]">
              <strong>{GIVING.main.accountName}</strong>
              <br />
              {GIVING.main.bank} · {GIVING.main.accountNumber}
            </p>
          </div>
          <div className="card-line p-4">
            <p className="eyebrow mb-1" style={{ color: "var(--glt-green)" }}>
              GLT Dom accounts
            </p>
            <p className="text-[var(--glt-ink)]">
              <strong>{GIVING.dom.accountName}</strong>
              <br />
              {GIVING.dom.bank} · Sort code {GIVING.dom.sortCode}
            </p>
            <ul className="mt-2 space-y-1 text-[var(--glt-ink)]">
              {GIVING.dom.accounts.map((a) => (
                <li key={a.currency}>
                  {a.currency}: <strong>{a.number}</strong>
                </li>
              ))}
            </ul>
          </div>
          <div className="card-line p-4">
            <p className="eyebrow mb-1" style={{ color: "var(--glt-green)" }}>
              North America
            </p>
            <p className="text-[var(--glt-ink)]">
              <strong>{GIVING.northAmerica.accountName}</strong>
              <br />
              {GIVING.northAmerica.bank} · {GIVING.northAmerica.accountNumber}
              <br />
              Zelle: <strong>{GIVING.northAmerica.zelle}</strong>
            </p>
          </div>
          <div className="card-line p-4">
            <p className="eyebrow mb-1" style={{ color: "var(--glt-green)" }}>
              Give in person
            </p>
            <p>At any GLT service, worldwide.</p>
          </div>
          <p className="text-[13px] text-[var(--glt-ink-soft)]">
            For giving enquiries, write to{" "}
            <a className="font-semibold underline" href={`mailto:${LINKS.email}`}>
              {LINKS.email}
            </a>
            .
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function Nav({ onGive }: { onGive: () => void }) {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  // Close the mobile menu whenever the route changes (render-time derivation, no effect needed)
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }
  return (
    <nav
      className="fixed inset-x-0 top-0 z-50 shadow-[0_2px_18px_rgba(0,0,0,0.22)]"
      style={{ background: "var(--glt-green)" }}
      aria-label="Main"
    >
      <div className="mx-auto flex h-[72px] max-w-7xl items-center gap-6 px-5">
        <Link to="/" className="flex shrink-0 items-center gap-3" aria-label="GLT Church home">
          <img src={logoWhite} alt="GLT Church emblem" className="h-11 w-auto" width={295} height={220} />
          <span className="hidden flex-col leading-none text-white min-[420px]:flex lg:hidden xl:flex">
            <span className="font-display text-lg tracking-wide">GLT Church</span>
            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/90">
              Worldwide
            </span>
          </span>
        </Link>
        <div className="ml-auto hidden items-center gap-6 lg:flex">
          {PAGES.map((p) => (
            <NavLink
              key={p.path}
              to={p.path}
              end={p.path === "/"}
              className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
            >
              {p.label}
            </NavLink>
          ))}
          <button className="btn btn-give px-6 py-2.5" onClick={onGive}>
            Give
          </button>
        </div>
        <div className="ml-auto flex items-center gap-3 lg:hidden">
          <button className="btn btn-give px-5 py-2" onClick={onGive}>
            Give
          </button>
          <button
            className="p-1 text-white"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>
      {open && (
        <div
          className="border-t border-white/15 px-5 pb-6 pt-3 lg:hidden"
          style={{ background: "var(--glt-green-deep)" }}
        >
          {PAGES.map((p) => (
            <NavLink
              key={p.path}
              to={p.path}
              end={p.path === "/"}
              className={({ isActive }) => `nav-link block py-3 text-base ${isActive ? "active" : ""}`}
            >
              {p.label}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
}

export function NewsletterForm({ dark }: { dark?: boolean }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    if (LINKS.newsletterEndpoint.includes("TODO")) {
      // Endpoint not configured yet: accept locally so the UX is complete.
      setState("done");
      return;
    }
    setState("sending");
    try {
      const res = await fetch(LINKS.newsletterEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email }),
      });
      setState(res.ok ? "done" : "error");
    } catch {
      setState("error");
    }
  };

  if (state === "done") {
    return (
      <p
        role="status"
        className={`border p-3 text-sm ${
          dark ? "border-[var(--glt-mint)]/50 text-[var(--glt-mint)]" : "border-[var(--glt-green)] text-[var(--glt-green-deep)]"
        }`}
      >
        You're on the list. Watch your inbox at the start of next month.
      </p>
    );
  }
  return (
    <form onSubmit={submit} className="flex flex-col gap-3 sm:flex-row">
      <label className="sr-only" htmlFor={dark ? "nl-dark" : "nl-light"}>
        Email address
      </label>
      <input
        id={dark ? "nl-dark" : "nl-light"}
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@email.com"
        className={`field flex-1 ${dark ? "border-white/25 bg-white/10 text-white placeholder:text-white/60" : ""}`}
      />
      <button className="btn btn-solid shrink-0" type="submit" disabled={state === "sending"}>
        {state === "sending" ? "Subscribing…" : "Subscribe"}
      </button>
      {state === "error" && (
        <p role="alert" className="text-sm text-red-300">
          That didn't go through. Try again or email {LINKS.email}.
        </p>
      )}
    </form>
  );
}

export function Footer({ onGive }: { onGive: () => void }) {
  return (
    <footer className="slant-top text-white" style={{ background: "var(--glt-ink)" }}>
      <div className="mx-auto grid max-w-7xl gap-12 px-5 pb-12 pt-24 md:grid-cols-2 md:pt-28 xl:grid-cols-[1.3fr_0.9fr_1fr_1.2fr]">
        <div>
          <img src={logoWhite} alt="GLT Church emblem" className="h-14 w-auto" width={295} height={220} loading="lazy" />
          <p className="font-display mt-5 text-2xl leading-tight">
            God's Love Tabernacle
            <br />
            International Church
          </p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/75">
            A movement awakening the truth of God's Word and the reality of His
            blessed Holy Spirit. Africa. Europe. North America.
          </p>
          <button className="btn btn-solid mt-6" onClick={onGive}>
            Give
          </button>
        </div>
        <div>
          <p className="eyebrow mb-5" style={{ color: "var(--glt-lime)" }}>
            Explore
          </p>
          <ul className="space-y-3 text-sm">
            {PAGES.map((p) => (
              <li key={p.path}>
                <Link to={p.path} className="text-white/85 transition hover:text-white">
                  {p.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href={LINKS.leverage}
                target="_blank"
                rel="noreferrer"
                className="text-white/85 transition hover:text-white"
              >
                Leverage Devotional
              </a>
            </li>
          </ul>
        </div>
        <div>
          <p className="eyebrow mb-5" style={{ color: "var(--glt-lime)" }}>
            Gather with us
          </p>
          <ul className="space-y-3 text-sm text-white/85">
            <li>Sundays · 7:45am &amp; 10:00am (WAT)</li>
            <li>Special Miracle Service · 1st Sundays, 8:00am (HQ)</li>
            <li>Bible Study · Tuesdays, 6:30pm</li>
          </ul>
          <p className="eyebrow mb-3 mt-7" style={{ color: "var(--glt-lime)" }}>
            International Headquarters
          </p>
          <ul className="space-y-3 text-sm text-white/85">
            <li className="flex gap-3">
              <MapPin size={16} className="mt-0.5 shrink-0 text-[var(--glt-lime)]" aria-hidden />
              {LINKS.hqAddress}
            </li>
            <li className="flex gap-3">
              <Phone size={16} className="mt-0.5 shrink-0 text-[var(--glt-lime)]" aria-hidden />
              <a href={`tel:${LINKS.phone}`} className="hover:text-white">
                {LINKS.phoneDisplay}
              </a>
            </li>
            <li className="flex gap-3">
              <Mail size={16} className="mt-0.5 shrink-0 text-[var(--glt-lime)]" aria-hidden />
              <a href={`mailto:${LINKS.email}`} className="hover:text-white">
                {LINKS.email}
              </a>
            </li>
          </ul>
        </div>
        <div>
          <p className="eyebrow mb-5" style={{ color: "var(--glt-lime)" }}>
            Monthly email
          </p>
          <p className="mb-4 text-sm leading-relaxed text-white/75">
            Upcoming events, announcements, and resources, once a month.
          </p>
          <NewsletterForm dark />
          <p className="eyebrow mb-3 mt-8" style={{ color: "var(--glt-lime)" }}>
            Follow
          </p>
          <div className="flex gap-3">
            {SOCIAL_ICONS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="rounded-full border border-white/25 p-2.5 transition hover:border-white hover:bg-white hover:text-[var(--glt-ink)]"
              >
                <s.icon size={18} aria-hidden />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
