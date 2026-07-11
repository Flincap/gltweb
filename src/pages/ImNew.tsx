import { Link } from "react-router-dom";
import { ArrowRight, MapPin } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Eyebrow, Reveal, SlantHeader } from "../shared";
import Seo from "../Seo";
import { FAQS, LINKS, mapsLink } from "../data";

export default function ImNew() {
  return (
    <>
      <Seo
        title="I'm New | GLT Church"
        description="Planning your first visit to GLT Church? We meet Sundays at 7:45am & 10:00am (WAT) at the GLT Lekki Auditorium, Lekki-Epe Expressway, Lagos. Here's what to expect."
        path="/im-new"
      />
      <SlantHeader
        kicker="I'm new"
        title="Welcome. We're so glad you're here."
        sub="Whether you're exploring faith for the first time, coming back to church after a while, or searching for a place to truly belong, you're welcome at GLT."
      />

      <section className="mx-auto max-w-7xl px-5 py-20 md:py-28">
        <div className="grid gap-12 lg:grid-cols-2">
          <Reveal>
            <Eyebrow>What to expect</Eyebrow>
            <h2 className="font-display text-[clamp(2rem,4vw,3.2rem)]">
              Come as you are
            </h2>
            <p className="mt-6 text-[15.5px] leading-[1.85] text-[var(--glt-ink-soft)]">
              We're a community of all ages and stages, growing together in
              faith, encouraging one another, and experiencing God's love in
              real and meaningful ways. You'll find warm people, hearty
              worship, and the Word taught with simplicity, clarity, and power.
            </p>
            <ul className="tick-list mt-8 space-y-3 text-[15px] text-[var(--glt-ink-soft)]">
              <li>Someone to help you park, walk in, and find a seat</li>
              <li>Contemporary worship and a practical, Bible-based message</li>
              <li>Safe, engaging services for children and teenagers</li>
              <li>No pressure. Sit, listen, ask questions, or just observe</li>
            </ul>
          </Reveal>
          <Reveal delay={120}>
            <div className="card-line h-full p-8 md:p-10">
              <Eyebrow>Service times</Eyebrow>
              <p className="font-display text-3xl leading-tight">
                Sundays 7:45am &amp; 10:00am
                <br />
                Tuesdays 6:30pm{" "}
                <span style={{ color: "var(--glt-green)" }}>(WAT)</span>
              </p>
              <div className="mt-6 space-y-3 text-sm leading-relaxed text-[var(--glt-ink-soft)]">
                <p>
                  We worship on Sundays by 7:45am for 1st service and 10:00am
                  (WAT) for 2nd service. Join us for the Special Miracle
                  Service (SMS) every first Sunday of the month by 8:00am at
                  the international headquarters. Extensions in Nigeria hold
                  theirs on the last Sunday of the month.
                </p>
                <p>Tuesdays: we have our Bible Study by 6:30pm.</p>
              </div>
              <div className="mt-8 border-t border-[var(--glt-line)] pt-7">
                <Eyebrow>Where we meet</Eyebrow>
                <p className="flex gap-3 text-[15px] leading-relaxed">
                  <MapPin
                    size={18}
                    className="mt-1 shrink-0"
                    style={{ color: "var(--glt-green)" }}
                  />
                  <span>
                    <strong>GLT Lekki Auditorium (our international headquarters)</strong>
                    <br />
                    Piccadilly Suites, behind Kon-X, Igbo-Efon Bus Stop,
                    Lekki-Epe Expressway, Lekki, Lagos
                  </span>
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href={mapsLink(LINKS.hqAddress)}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-solid"
                  >
                    Get directions
                  </a>
                  <Link to="/extensions" className="btn btn-outline-ink">
                    Find our other extensions <ArrowRight size={16} aria-hidden />
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="slant-top" style={{ background: "var(--glt-leaf)" }}>
        <div className="mx-auto max-w-4xl px-5 pb-24 pt-28">
          <Reveal>
            <Eyebrow>Questions, answered</Eyebrow>
            <h2 className="font-display text-[clamp(2rem,4vw,3.2rem)]">FAQs</h2>
          </Reveal>
          <Reveal delay={120}>
            <Accordion type="single" collapsible className="mt-10 space-y-3">
              {FAQS.map((f, i) => (
                <AccordionItem
                  key={i}
                  value={`q${i}`}
                  className="card-line border px-6 data-[state=open]:border-[var(--glt-green)]"
                >
                  <AccordionTrigger className="py-5 text-left text-[15.5px] font-bold hover:no-underline">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="pb-6 text-[15px] leading-relaxed text-[var(--glt-ink-soft)]">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
          <Reveal delay={200}>
            <div className="mt-12 flex flex-col items-start justify-between gap-6 border-t border-[var(--glt-ink)]/15 pt-10 md:flex-row md:items-center">
              <p className="font-display text-2xl">
                Still have a question? We'd love to hear from you.
              </p>
              <Link to="/contact" className="btn btn-ink shrink-0">
                Contact us <ArrowRight size={16} aria-hidden />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
