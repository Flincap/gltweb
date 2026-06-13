import { useEffect, useRef, useState } from "react";
import { ArrowRight, CalendarDays, Megaphone, Church } from "lucide-react";
import { Eyebrow, Reveal } from "../shared";
import { LINKS } from "../data";
import videoCrowd from "../assets/CROWD.mp4";
import videoAso from "../assets/ASO.mp4";
import videoPfo from "../assets/PFO.mp4";
import posterCrowd from "../assets/CROWD_poster.jpg";
import posterAso from "../assets/ASO_poster.jpg";
import posterPfo from "../assets/PFO_poster.jpg";

const SLIDES = [
  { src: videoCrowd, poster: posterCrowd, line: "A people of God's love." },
  { src: videoAso, poster: posterAso, line: "A people of God's light." },
  { src: videoPfo, poster: posterPfo, line: "A people of great grace." },
];

function Hero() {
  const [index, setIndex] = useState(0);
  const refs = useRef<(HTMLVideoElement | null)[]>([]);
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    refs.current.forEach((v, i) => {
      if (!v) return;
      if (i === index && !reduced) {
        v.currentTime = 0;
        v.play().catch(() => {});
      } else {
        v.pause();
      }
    });
    if (reduced) {
      const t = setTimeout(() => setIndex((i) => (i + 1) % SLIDES.length), 8000);
      return () => clearTimeout(t);
    }
  }, [index, reduced]);

  return (
    <section className="relative flex min-h-[100svh] items-end overflow-hidden bg-black">
      {SLIDES.map((s, i) => (
        <video
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          className={`fade-swap absolute inset-0 h-full w-full object-cover ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
          src={s.src}
          poster={s.poster}
          muted
          playsInline
          preload={i === 0 ? "auto" : "metadata"}
          onEnded={() => setIndex((v) => (v + 1) % SLIDES.length)}
          aria-hidden={i !== index}
        />
      ))}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(8,12,7,0.92) 0%, rgba(8,12,7,0.35) 45%, rgba(8,12,7,0.25) 100%)",
        }}
      />
      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-20 pt-36 md:pb-24">
        <p className="eyebrow mb-4 text-[var(--glt-lime)]">
          Africa · Europe · North America
        </p>
        <h1 className="font-display hero-statement max-w-5xl text-white">
          GLT Church.
          <br />
          <span key={index} className="rise-in inline-block text-[var(--glt-lime)]">
            {SLIDES[index].line}
          </span>
        </h1>
        <div className="mt-9 flex flex-wrap gap-3">
          <a href="#/im-new" className="btn btn-solid">
            I'm New <ArrowRight size={16} />
          </a>
          <a
            href={LINKS.mixlr}
            target="_blank"
            rel="noreferrer"
            className="btn btn-outline-light"
          >
            Join Live Online
          </a>
          <a
            href={LINKS.youtube}
            target="_blank"
            rel="noreferrer"
            className="btn btn-outline-light"
          >
            Sermons
          </a>
        </div>
        <div className="mt-10 flex gap-2" aria-hidden>
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className="h-[3px] w-10 transition"
              style={{
                background: i === index ? "var(--glt-lime)" : "rgba(255,255,255,0.3)",
              }}
              tabIndex={-1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function JoinUs() {
  return (
    <section
      className="slant-bottom relative z-10 -mt-px text-white"
      style={{ background: "var(--glt-green)" }}
    >
      <div className="mx-auto grid max-w-7xl gap-10 px-5 pb-24 pt-16 md:grid-cols-[1.1fr_1fr] md:pb-28 md:pt-20">
        <Reveal>
          <Eyebrow light>Join us for church</Eyebrow>
          <h2 className="font-display text-[clamp(2.1rem,4.4vw,3.6rem)]">
            Sundays 7:45am &amp; 10:00am
            <br />
            Tuesdays 6:30pm <span className="text-[var(--glt-lime)]">(WAT)</span>
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <div className="space-y-4 text-[15px] leading-relaxed text-white/90 md:pt-2">
            <p>
              We worship on Sundays by 7:45am for 1st service and 10:00am (WAT)
              for 2nd service. Join us for the Special Miracle Service (SMS)
              every first Sunday of the month by 8:00am.
            </p>
            <p>Tuesdays: we have our Bible Study by 6:30pm.</p>
            <a href="#/extensions" className="btn btn-outline-light mt-2">
              Find a GLT near you <ArrowRight size={16} />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Happening() {
  const items = [
    {
      icon: Church,
      title: "Weekly Services",
      body: "Sundays at 7:45am and 10:00am, Bible Study on Tuesdays at 6:30pm, and SMS every first Sunday.",
      href: "#/im-new",
      label: "Plan a visit",
    },
    {
      icon: CalendarDays,
      title: "Upcoming Events",
      body: "Conferences, outreaches, and special gatherings across the GLT family. See what's ahead this month.",
      href: "#/events",
      label: "See events",
    },
    {
      icon: Megaphone,
      title: "Announcements",
      body: "Stay current with everything happening in the house, all in one place.",
      href: LINKS.announcements,
      label: "Read announcements",
      external: true,
    },
  ];
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 md:py-28">
      <Reveal>
        <Eyebrow>This month</Eyebrow>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="font-display max-w-xl text-[clamp(2.1rem,4.6vw,3.6rem)]">
            What's happening at GLT
          </h2>
          <p className="max-w-md text-[15px] leading-relaxed text-[var(--glt-ink-soft)]">
            Check out what's happening this month at GLT. See upcoming events
            and stay up to date by subscribing to our monthly email.
          </p>
        </div>
      </Reveal>
      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {items.map((it, i) => (
          <Reveal key={it.title} delay={i * 110}>
            <a
              href={it.href}
              target={it.external ? "_blank" : undefined}
              rel={it.external ? "noreferrer" : undefined}
              className="card-line group flex h-full flex-col p-8 transition hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(14,21,12,0.12)]"
            >
              <it.icon size={28} style={{ color: "var(--glt-green)" }} />
              <h3 className="font-display mt-5 text-2xl">{it.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--glt-ink-soft)]">
                {it.body}
              </p>
              <span
                className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em]"
                style={{ color: "var(--glt-green)" }}
              >
                {it.label}
                <ArrowRight size={14} className="transition group-hover:translate-x-1" />
              </span>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Vision() {
  return (
    <section className="slant-both text-white" style={{ background: "var(--glt-ink)" }}>
      <div className="mx-auto max-w-6xl px-5 py-28 md:py-36">
        <Reveal>
          <Eyebrow light>Our vision</Eyebrow>
          <p className="font-display text-[clamp(1.7rem,3.8vw,3.1rem)] leading-tight">
            We are commissioned to teach and preach with all simplicity and
            clarity{" "}
            <span className="text-[var(--glt-lime)]">
              the New Creation Realities in Christ Jesus
            </span>
            , stressing emphatically the integrity of God's Word by the power
            of the Holy Spirit.
          </p>
          <a href="#/who-we-are" className="btn btn-outline-light mt-10">
            Who we are <ArrowRight size={16} />
          </a>
        </Reveal>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <JoinUs />
      <Happening />
      <Vision />
    </>
  );
}
