import { useState, type FormEvent } from "react";
import {
  CalendarDays,
  MapPin,
  Phone,
  Mail,
  MonitorPlay,
  Radio,
  Send,
  BookOpen,
  ExternalLink,
  Play,
} from "lucide-react";
import { Eyebrow, Reveal, SlantHeader } from "../shared";
import { LINKS, mapsLink } from "../data";
import posterCrowd from "../assets/CROWD_poster.jpg";

/* ------------------------------ EVENTS ------------------------------ */

const PLACEHOLDER_EVENTS = [
  {
    tag: "First Sunday",
    title: "Special Miracle Service",
    date: "First Sunday of every month · 8:00am (WAT)",
    venue: "GLT Lekki Auditorium and all extensions",
    body: "One combined service of worship, the Word, and the working of miracles. Come expectant; bring someone who needs a touch from God.",
  },
  {
    tag: "Weekly",
    title: "Bible Study",
    date: "Every Tuesday · 6:30pm (WAT)",
    venue: "GLT Lekki Auditorium and online",
    body: "The Word taught with simplicity, clarity, and power. Bring your Bible, your notes, and your hunger.",
  },
  {
    tag: "Coming up",
    title: "Your next event flyer goes here",
    date: "Date and time",
    venue: "Venue",
    body: "This space is built for your monthly event flyers, with a caption and details to the right. Swap in real flyers as they are released.",
  },
];

function EventFlyer({ tag, title }: { tag: string; title: string }) {
  return (
    <div
      className="slant-bottom relative flex aspect-[4/5] w-full flex-col justify-between overflow-hidden p-7 text-white"
      style={{
        background:
          "linear-gradient(150deg, var(--glt-ink) 0%, var(--glt-ink-soft) 55%, var(--glt-green-deep) 130%)",
      }}
      aria-hidden
    >
      <p className="eyebrow text-[var(--glt-lime)]">{tag}</p>
      <div>
        <p className="font-display text-[clamp(1.8rem,3vw,2.6rem)] leading-none">{title}</p>
        <p className="eyebrow mt-4 text-white/60">GLT Church Worldwide</p>
      </div>
      <div
        className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full opacity-20"
        style={{ background: "var(--glt-green)" }}
      />
    </div>
  );
}

export function Events() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const subscribe = (e: FormEvent) => {
    e.preventDefault();
    if (email.trim()) setDone(true);
  };
  return (
    <>
      <SlantHeader
        kicker="Events"
        title="What's on at GLT"
        sub="Conferences, outreaches, and special gatherings across the GLT family. Check back monthly; better still, let us land in your inbox."
      />
      <section className="mx-auto max-w-6xl space-y-16 px-5 py-20 md:py-28">
        {PLACEHOLDER_EVENTS.map((ev, i) => (
          <Reveal key={ev.title}>
            <article
              className={`grid items-center gap-8 md:grid-cols-[0.85fr_1.15fr] ${
                i % 2 ? "md:[&>*:first-child]:order-2" : ""
              }`}
            >
              <EventFlyer tag={ev.tag} title={ev.title} />
              <div>
                <p className="eyebrow" style={{ color: "var(--glt-green)" }}>
                  {ev.tag}
                </p>
                <h2 className="font-display mt-2 text-[clamp(1.8rem,3.4vw,2.8rem)]">
                  {ev.title}
                </h2>
                <p className="mt-4 flex items-center gap-2.5 text-sm font-semibold">
                  <CalendarDays size={16} style={{ color: "var(--glt-green)" }} />
                  {ev.date}
                </p>
                <p className="mt-2 flex items-center gap-2.5 text-sm text-[var(--glt-ink-soft)]">
                  <MapPin size={16} style={{ color: "var(--glt-green)" }} />
                  {ev.venue}
                </p>
                <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-[var(--glt-ink-soft)]">
                  {ev.body}
                </p>
              </div>
            </article>
          </Reveal>
        ))}
      </section>
      <section className="slant-top text-white" style={{ background: "var(--glt-ink)" }}>
        <div className="mx-auto max-w-4xl px-5 pb-20 pt-28 text-center">
          <Reveal>
            <h2 className="font-display text-[clamp(1.9rem,3.8vw,3rem)]">
              Never miss what God is doing
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-white/75">
              Subscribe to our monthly email and get upcoming events,
              announcements, and resources delivered to you.
            </p>
            {done ? (
              <p
                className="mx-auto mt-8 max-w-md border border-[var(--glt-lime)]/40 p-4 text-sm text-[var(--glt-lime)]"
                role="status"
              >
                You're on the list. Watch your inbox at the start of next
                month.
              </p>
            ) : (
              <form
                onSubmit={subscribe}
                className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
              >
                <label className="sr-only" htmlFor="sub-email">
                  Email address
                </label>
                <input
                  id="sub-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@email.com"
                  className="field flex-1 border-white/20 bg-white/10 text-white placeholder:text-white/40"
                />
                <button className="btn btn-solid shrink-0" type="submit">
                  Subscribe
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </section>
    </>
  );
}

/* ----------------------------- RESOURCES ----------------------------- */

const PLATFORMS = [
  {
    icon: MonitorPlay,
    name: "YouTube",
    desc: "Full services, sermons, and special programs on GLT Church Worldwide.",
    href: LINKS.youtube,
    cta: "Watch on YouTube",
  },
  {
    icon: Radio,
    name: "Mixlr Live Audio",
    desc: "Join every service live in audio, wherever you are in the world.",
    href: LINKS.mixlr,
    cta: "Listen live",
  },
  {
    icon: Send,
    name: "Telegram Messages",
    desc: "Download messages and stay connected to the Word on the go.",
    href: LINKS.telegram,
    cta: "Open Telegram",
  },
  {
    icon: BookOpen,
    name: "Leverage Devotional",
    desc: "Daily fuel for your walk: a devotional from the house, for the house.",
    href: "#/contact",
    cta: "Get the devotional",
    internal: true,
  },
];

export function Resources() {
  return (
    <>
      <SlantHeader
        kicker="Resources"
        title="Take the Word with you"
        sub="Perhaps you missed a Sunday and want to get caught up? Or maybe you want to share a recent service with a friend? Start here."
      />
      <section className="mx-auto max-w-7xl px-5 py-20 md:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-[1.2fr_1fr]">
          <Reveal>
            <a
              href={LINKS.youtube}
              target="_blank"
              rel="noreferrer"
              className="group relative block overflow-hidden"
              aria-label="Watch last Sunday's service on YouTube"
            >
              <img
                src={posterCrowd}
                alt="GLT Church congregation in worship"
                className="aspect-video w-full object-cover transition duration-500 group-hover:scale-[1.03]"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <span className="absolute inset-0 flex items-center justify-center">
                <span
                  className="flex h-20 w-20 items-center justify-center rounded-full text-white shadow-2xl transition group-hover:scale-110"
                  style={{ background: "var(--glt-green)" }}
                >
                  <Play size={30} className="ml-1" fill="currentColor" />
                </span>
              </span>
              <span className="absolute bottom-5 left-6 right-6 text-white">
                <span className="eyebrow text-[var(--glt-lime)]">Catch up</span>
                <span className="font-display block text-2xl md:text-3xl">
                  Watch last Sunday's service
                </span>
              </span>
            </a>
          </Reveal>
          <Reveal delay={120}>
            <Eyebrow>Missed a Sunday?</Eyebrow>
            <h2 className="font-display text-[clamp(1.9rem,3.6vw,3rem)]">
              Get caught up, then pass it on
            </h2>
            <p className="mt-5 text-[15.5px] leading-[1.85] text-[var(--glt-ink-soft)]">
              Every service is available to watch, listen to, and share. The
              same Word that is transforming lives in the auditorium is one tap
              away, anywhere on earth.
            </p>
          </Reveal>
        </div>
        <div className="mt-16 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {PLATFORMS.map((p, i) => (
            <Reveal key={p.name} delay={i * 90} className="h-full">
              <a
                href={p.href}
                target={p.internal ? undefined : "_blank"}
                rel={p.internal ? undefined : "noreferrer"}
                className="card-line group flex h-full flex-col p-7 transition hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(14,21,12,0.12)]"
              >
                <p.icon size={26} style={{ color: "var(--glt-green)" }} />
                <h3 className="font-display mt-4 text-xl">{p.name}</h3>
                <p className="mt-2.5 flex-1 text-sm leading-relaxed text-[var(--glt-ink-soft)]">
                  {p.desc}
                </p>
                <span
                  className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em]"
                  style={{ color: "var(--glt-green)" }}
                >
                  {p.cta} <ExternalLink size={13} />
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}

/* ------------------------------ CONTACT ------------------------------ */

export function Contact() {
  const [sent, setSent] = useState(false);
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const subject = encodeURIComponent(
      `[Website] ${fd.get("subject") || "Enquiry"} — ${fd.get("name")}`
    );
    const body = encodeURIComponent(
      `Name: ${fd.get("name")}\nEmail: ${fd.get("email")}\nPhone: ${
        fd.get("phone") || "-"
      }\n\n${fd.get("message")}`
    );
    window.location.href = `mailto:${LINKS.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };
  return (
    <>
      <SlantHeader
        kicker="Contact us"
        title="We'd love to hear from you"
        sub="Questions, prayer requests, testimonies, or planning a visit: reach out and the team will get back to you."
      />
      <section className="mx-auto max-w-7xl px-5 py-20 md:py-28">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_1fr]">
          <Reveal>
            <div className="card-line p-8 md:p-10">
              <Eyebrow>Send a message</Eyebrow>
              <form onSubmit={submit} className="mt-6 grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="flabel" htmlFor="c-name">
                    Name
                  </label>
                  <input id="c-name" name="name" required className="field" />
                </div>
                <div>
                  <label className="flabel" htmlFor="c-email">
                    Email
                  </label>
                  <input id="c-email" name="email" type="email" required className="field" />
                </div>
                <div>
                  <label className="flabel" htmlFor="c-phone">
                    Phone (optional)
                  </label>
                  <input id="c-phone" name="phone" className="field" />
                </div>
                <div>
                  <label className="flabel" htmlFor="c-subject">
                    Subject
                  </label>
                  <select id="c-subject" name="subject" className="field">
                    <option>General enquiry</option>
                    <option>Planning a visit</option>
                    <option>Prayer request</option>
                    <option>Testimony</option>
                    <option>Giving</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="flabel" htmlFor="c-message">
                    Message
                  </label>
                  <textarea
                    id="c-message"
                    name="message"
                    rows={6}
                    required
                    className="field resize-y"
                  />
                </div>
                <div className="sm:col-span-2">
                  <button type="submit" className="btn btn-solid w-full sm:w-auto">
                    Send message
                  </button>
                  {sent && (
                    <p className="mt-3 text-sm" style={{ color: "var(--glt-green)" }} role="status">
                      Your email app has opened with the message ready to send.
                    </p>
                  )}
                </div>
              </form>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="space-y-5">
              <div className="card-line p-8">
                <Eyebrow>Visit us</Eyebrow>
                <p className="flex gap-3 text-[15px] leading-relaxed">
                  <MapPin size={18} className="mt-1 shrink-0" style={{ color: "var(--glt-green)" }} />
                  <span>
                    <strong>GLT Lekki Auditorium</strong>
                    <br />
                    {LINKS.hqAddress}
                  </span>
                </p>
                <a
                  href={mapsLink(LINKS.hqAddress)}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-outline-ink mt-6"
                >
                  Open in Google Maps
                </a>
              </div>
              <div className="card-line p-8">
                <Eyebrow>Talk to us</Eyebrow>
                <p className="flex items-center gap-3 text-[15px]">
                  <Phone size={17} style={{ color: "var(--glt-green)" }} />
                  <a href={`tel:${LINKS.phone}`} className="font-semibold hover:underline">
                    {LINKS.phoneDisplay}
                  </a>
                </p>
                <p className="mt-3 flex items-center gap-3 text-[15px]">
                  <Mail size={17} style={{ color: "var(--glt-green)" }} />
                  <a href={`mailto:${LINKS.email}`} className="font-semibold hover:underline">
                    {LINKS.email}
                  </a>
                </p>
              </div>
              <div className="card-line p-8">
                <Eyebrow>Follow GLT</Eyebrow>
                <div className="flex gap-3">
                  {[
                    { icon: MonitorPlay, href: LINKS.youtube, label: "YouTube" },
                    { icon: Radio, href: LINKS.mixlr, label: "Mixlr" },
                    { icon: Send, href: LINKS.telegram, label: "Telegram" },
                  ].map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`GLT Church on ${s.label}`}
                      className="rounded-full border border-[var(--glt-line)] p-3 transition hover:bg-[var(--glt-green)] hover:text-white"
                    >
                      <s.icon size={18} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
