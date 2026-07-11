import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Eyebrow, Reveal, SlantHeader } from "../shared";
import Seo from "../Seo";
import { ONIONS } from "../data";
import setman from "../assets/setman.jpg";
// TODO: replace src/assets/onions.jpg with the approved photo of Daddy with the onions
// (Google Drive: https://drive.google.com/file/d/1rpOukbi3aLPBC05oWrX5VlIFl2DvdNKI/view)
import onionsPhoto from "../assets/onions.jpg";

function History() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 md:py-28">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
        <Reveal>
          <Eyebrow>A brief history</Eyebrow>
          <h2 className="font-display text-[clamp(1.9rem,4vw,3.2rem)]">
            From seven people
            <br />
            in a small room
          </h2>
          <div className="mt-8 space-y-1 border-l-4 pl-5" style={{ borderColor: "var(--glt-green)" }}>
            {[
              ["Oct 2005", "The Lord speaks expressly in Abuja"],
              ["Nov 11, 2005", "Obedience: the move to Ile-Ife"],
              ["Feb 18, 2007", "GLT begins with about seven people"],
              ["Today", "Thousands, with extensions on 3 continents"],
            ].map(([d, t]) => (
              <p key={d} className="py-2 text-sm">
                <span className="font-display mr-3 text-base" style={{ color: "var(--glt-green-deep)" }}>
                  {d}
                </span>
                <span className="text-[var(--glt-ink-soft)]">{t}</span>
              </p>
            ))}
          </div>
        </Reveal>
        <Reveal delay={120}>
          <div className="space-y-5 text-[15.5px] leading-[1.85] text-[var(--glt-ink-soft)]">
            <p>
              October 2005, the Lord spoke expressly to Segun and Funke Obadje,
              who were in Abuja, to leave the Federal Capital and start a work
              for Him in Ile-Ife, Osun State, Nigeria. On the 11th of November
              2005, in obedience, the couple left Abuja for Ile-Ife. The mandate
              God had given them was to preach and teach with all simplicity
              and clarity the New Creation Realities in Christ Jesus, stressing
              emphatically the integrity of God's Word.
            </p>
            <p>
              14 months after their departure from Abuja, on the 18th of
              February 2007, God's Love Tabernacle International Church kicked
              off in a small room in Ile-Ife with about seven people in
              attendance. In one of his interviews on the vision of GLT, Pastor
              Segun said: "I like to stress this, GLT is not another
              denomination, but a movement; an on-going move of God's Spirit to
              awaken the truth of His Word and the reality of His blessed Holy
              Spirit. I must tell you, God has been faithful since we left
              Abuja. The Apostolic, Prophetic, Teaching, and Healing Grace have
              been so evident on this movement."
            </p>
            <p>
              Remember that it started with seven people in a small room. The
              testimony has been from tens to hundreds, hundreds to thousands.
              The church now has her own property, an auditorium which seats on
              average one thousand, seven hundred people, with various
              extensions (our branches) and outreaches within and outside
              Nigeria. God's Word is true; the path of the just is as a shining
              light that shines brighter and brighter even unto the perfect
              day.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function VisionMission() {
  return (
    <section className="slant-both text-white" style={{ background: "var(--glt-green)" }}>
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-24 md:grid-cols-2 md:py-32">
        <Reveal>
          <Eyebrow light>Our vision</Eyebrow>
          <p className="text-lg leading-[1.85] text-white md:text-xl">
            We are commissioned to teach and preach with all simplicity and
            clarity the New Creation Realities in Christ Jesus, stressing
            emphatically the integrity of God's Word by the power of the Holy
            Spirit.
          </p>
        </Reveal>
        <Reveal delay={120}>
          <Eyebrow light>Our mission</Eyebrow>
          <p className="font-display text-[clamp(1.5rem,2.7vw,2.2rem)] leading-tight text-white">
            Raising Kingdom Ambassadors manifesting abundant Zoe.
          </p>
          <p className="mt-4 text-[15px] leading-relaxed text-[var(--glt-mint)]">
            Zoe is the God-kind of life: the very life of God at work in His
            people.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Onions() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 md:py-28">
      <Reveal>
        <Eyebrow>The Onions of GLT</Eyebrow>
        <h2 className="font-display max-w-2xl text-[clamp(1.9rem,4vw,3.2rem)]">
          Eleven things that make this house, this house
        </h2>
      </Reveal>
      <div className="mt-12 grid gap-px overflow-hidden border border-[var(--glt-line)] bg-[var(--glt-line)] sm:grid-cols-2 lg:grid-cols-3">
        {ONIONS.map((o, i) => (
          <Reveal key={o.title} delay={(i % 3) * 90} className="h-full">
            <article className="h-full bg-white p-7 transition hover:bg-[var(--glt-leaf)]">
              <p className="font-display text-sm" style={{ color: "var(--glt-green-deep)" }}>
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="font-display mt-2 text-xl">{o.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--glt-ink-soft)]">
                {o.body}
              </p>
            </article>
          </Reveal>
        ))}
        <div
          className="hidden items-end p-7 text-white lg:flex"
          style={{ background: "var(--glt-ink)" }}
        >
          <p className="font-display text-2xl leading-tight">
            God says it.
            <br />
            We believe it.
            <br />
            We act on it.
            <br />
            <span className="text-[var(--glt-lime)]">That settles it.</span>
          </p>
        </div>
      </div>
      <Reveal delay={140}>
        <figure className="mt-12">
          <img
            src={onionsPhoto}
            alt="Apostle Segun Obadje teaching on the Onions of GLT"
            className="w-full max-w-4xl border-8 border-[var(--glt-leaf)] object-cover md:mx-auto"
            loading="lazy"
            width={1100}
            height={1320}
          />
          <figcaption className="mt-4 text-center text-sm text-[var(--glt-ink-soft)]">
            Daddy with the Onions of GLT
          </figcaption>
        </figure>
      </Reveal>
    </section>
  );
}

function Setman() {
  return (
    <section className="slant-top text-white" style={{ background: "var(--glt-ink)" }}>
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 pb-16 pt-24 md:pb-20 lg:grid-cols-[1fr_1.15fr]">
        <Reveal>
          <img
            src={setman}
            alt="Apostle Segun Obadje and Pastor Funke Obadje"
            className="w-full max-w-md justify-self-center border-8 border-white/5 object-cover lg:max-w-none"
            loading="lazy"
            width={1100}
            height={1320}
          />
        </Reveal>
        <Reveal delay={120}>
          <Eyebrow light>Meet the Setman</Eyebrow>
          <h2 className="font-display text-[clamp(1.9rem,4vw,3.2rem)]">
            Apostle Segun &amp;
            <br />
            Pastor Funke Obadje
          </h2>
          <div className="mt-7 space-y-5 text-[15.5px] leading-[1.85] text-white/85">
            <p>
              The Setman is the leader God has set over the house: our lead
              pastor. With over two decades of active ministry, Apostle Segun
              Obadje has dedicated his entire life to teaching and preaching
              New Creation Realities in Christ Jesus with all simplicity and
              clarity. An Apostle by calling, with an uncommon teaching grace
              accompanied by a strong prophetic cutting edge.
            </p>
            <p>
              He is married to Pastor Funke, a dynamic minister of God's Word;
              a prophetic gift to this generation and beyond, whose ministry is
              characterized by powerful expressions of revelation gifts and
              miraculous signs. She is a New Testament prophet with an
              impactful, life-changing message.
            </p>
          </div>
          <Link to="/sermons" className="btn btn-solid mt-9">
            Hear the Word <ArrowRight size={16} aria-hidden />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

export default function WhoWeAre() {
  return (
    <>
      <Seo
        title="Who We Are | GLT Church"
        description="GLT is not another denomination but a movement: from seven people in Ile-Ife in 2007 to thousands across Africa, Europe and North America. Meet Apostle Segun and Pastor Funke Obadje."
        path="/who-we-are"
      />
      <SlantHeader
        kicker="Who we are"
        title={"Not another denomination. A\u00A0movement."}
        sub="An on-going move of God's Spirit to awaken the truth of His Word and the reality of His blessed Holy Spirit."
      />
      <History />
      <VisionMission />
      <Onions />
      <Setman />
    </>
  );
}
