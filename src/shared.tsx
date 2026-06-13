import { useEffect, useRef, useState, type ReactNode } from "react";
import { Menu, X, MapPin, Phone, Mail, MonitorPlay, Radio, Send } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import logoWhite from "./assets/logo_white.png";
import { LINKS } from "./data";

export const PAGES = [
  { id: "home", label: "Home" },
  { id: "who-we-are", label: "Who We Are" },
  { id: "extensions", label: "Our Extensions" },
  { id: "im-new", label: "I'm New" },
  { id: "events", label: "Events" },
  { id: "resources", label: "Resources" },
  { id: "contact", label: "Contact Us" },
] as const;

export type PageId = (typeof PAGES)[number]["id"];

export function navigate(id: PageId) {
  window.location.hash = `/${id}`;
}

export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
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
  }, []);
  return (
    <div
      ref={ref}
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
      style={{ color: light ? "var(--glt-lime)" : "var(--glt-green)" }}
    >
      <span
        className="inline-block h-[2px] w-8"
        style={{ background: light ? "var(--glt-lime)" : "var(--glt-green)" }}
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
  sub?: string;
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
        <h1 className="font-display rise-in text-[clamp(2.6rem,6.5vw,5rem)]">{title}</h1>
        {sub && (
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/85 md:text-lg">
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
            <DialogDescription className="text-white/85">
              Cheerful, willful, sacrificial. Thank you for advancing the Gospel
              with us.
            </DialogDescription>
          </DialogHeader>
        </div>
        <div className="space-y-4 px-7 pb-8 pt-2 text-sm leading-relaxed">
          <div className="card-line p-4">
            <p className="eyebrow mb-1" style={{ color: "var(--glt-green)" }}>
              Bank transfer
            </p>
            <p className="text-[var(--glt-ink)]">
              [Account name, bank, and account number go here before launch]
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

export function Nav({
  page,
  onGive,
}: {
  page: PageId;
  onGive: () => void;
}) {
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [page]);
  return (
    <nav
      className="fixed inset-x-0 top-0 z-50 shadow-[0_2px_18px_rgba(0,0,0,0.22)]"
      style={{ background: "var(--glt-green)" }}
      aria-label="Main"
    >
      <div className="mx-auto flex h-[72px] max-w-7xl items-center gap-6 px-5">
        <a
          href="#/home"
          className="flex shrink-0 items-center gap-3"
          aria-label="GLT Church home"
        >
          <img src={logoWhite} alt="GLT Church emblem" className="h-11 w-auto" />
          <span className="hidden flex-col leading-none text-white min-[420px]:flex lg:hidden xl:flex">
            <span className="font-display text-lg tracking-wide">GLT Church</span>
            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/75">
              Worldwide
            </span>
          </span>
        </a>
        <div className="ml-auto hidden items-center gap-6 lg:flex">
          {PAGES.map((p) => (
            <a
              key={p.id}
              href={`#/${p.id}`}
              className={`nav-link ${page === p.id ? "active" : ""}`}
              aria-current={page === p.id ? "page" : undefined}
            >
              {p.label}
            </a>
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
            <a
              key={p.id}
              href={`#/${p.id}`}
              className={`nav-link block py-3 text-base ${page === p.id ? "active" : ""}`}
            >
              {p.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

export function Footer({ onGive }: { onGive: () => void }) {
  return (
    <footer className="slant-top text-white" style={{ background: "var(--glt-ink)" }}>
      <div className="mx-auto grid max-w-7xl gap-12 px-5 pb-12 pt-24 md:grid-cols-[1.3fr_1fr_1fr_1.1fr] md:pt-28">
        <div>
          <img src={logoWhite} alt="GLT Church emblem" className="h-14 w-auto" />
          <p className="font-display mt-5 text-2xl leading-tight">
            God's Love Tabernacle
            <br />
            International Church
          </p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/65">
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
              <li key={p.id}>
                <a href={`#/${p.id}`} className="text-white/80 transition hover:text-white">
                  {p.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="eyebrow mb-5" style={{ color: "var(--glt-lime)" }}>
            Gather with us
          </p>
          <ul className="space-y-3 text-sm text-white/80">
            <li>Sundays · 7:45am &amp; 10:00am (WAT)</li>
            <li>SMS · 1st Sundays, 8:00am</li>
            <li>Bible Study · Tuesdays, 6:30pm</li>
          </ul>
          <p className="eyebrow mb-3 mt-7" style={{ color: "var(--glt-lime)" }}>
            Follow
          </p>
          <div className="flex gap-3">
            <a
              href={LINKS.youtube}
              target="_blank"
              rel="noreferrer"
              aria-label="GLT Church on YouTube"
              className="rounded-full border border-white/25 p-2.5 transition hover:border-white hover:bg-white hover:text-[var(--glt-ink)]"
            >
              <MonitorPlay size={18} />
            </a>
            <a
              href={LINKS.mixlr}
              target="_blank"
              rel="noreferrer"
              aria-label="GLT Church live audio on Mixlr"
              className="rounded-full border border-white/25 p-2.5 transition hover:border-white hover:bg-white hover:text-[var(--glt-ink)]"
            >
              <Radio size={18} />
            </a>
            <a
              href={LINKS.telegram}
              target="_blank"
              rel="noreferrer"
              aria-label="GLT messages on Telegram"
              className="rounded-full border border-white/25 p-2.5 transition hover:border-white hover:bg-white hover:text-[var(--glt-ink)]"
            >
              <Send size={18} />
            </a>
          </div>
        </div>
        <div>
          <p className="eyebrow mb-5" style={{ color: "var(--glt-lime)" }}>
            Headquarters
          </p>
          <ul className="space-y-4 text-sm text-white/80">
            <li className="flex gap-3">
              <MapPin size={16} className="mt-0.5 shrink-0 text-[var(--glt-lime)]" />
              {LINKS.hqAddress}
            </li>
            <li className="flex gap-3">
              <Phone size={16} className="mt-0.5 shrink-0 text-[var(--glt-lime)]" />
              <a href={`tel:${LINKS.phone}`} className="hover:text-white">
                {LINKS.phoneDisplay}
              </a>
            </li>
            <li className="flex gap-3">
              <Mail size={16} className="mt-0.5 shrink-0 text-[var(--glt-lime)]" />
              <a href={`mailto:${LINKS.email}`} className="hover:text-white">
                {LINKS.email}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-5 text-xs text-white/50 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} God's Love Tabernacle International
            Church. All rights reserved.
          </p>
          <p>Not another denomination. A movement.</p>
        </div>
      </div>
    </footer>
  );
}
