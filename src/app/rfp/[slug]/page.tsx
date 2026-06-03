import Link from "next/link";
import { notFound } from "next/navigation";
import { paoniaRfps, getPaoniaRfp } from "@/data/rfps";

export function generateStaticParams() {
  return paoniaRfps.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const r = getPaoniaRfp(slug);
  if (!r) return {};
  return {
    title: `${r.number}: ${r.title} | Transparent Towns — Paonia`,
    description: r.oneLiner,
  };
}

const HERO: Record<string, { src: string; alt: string; caption: string }> = {
  "2026-02-raw-water-monitoring": {
    src: "/rfp/2026-02/hero.png",
    alt: "A mountain spring water-monitoring station with a small telemetry enclosure and pipework, below the West Elk peaks.",
    caption:
      "Raw water begins at mountain springs above town. This project lets operators watch four of those sites without driving to each one.",
  },
  "2026-01-west-loop-water-main": {
    src: "/rfp/2026-01/hero.png",
    alt: "A small-town street trench with new blue water pipe being laid, Mount Lamborn rising behind.",
    caption:
      "The west loop's last steel water mains, replaced with new pipe along Lamborn Mesa Road.",
  },
};

export default async function RfpDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const r = getPaoniaRfp(slug);
  if (!r) notFound();
  const hero = HERO[r.slug];

  return (
    <article
      className="shell-narrow"
      style={{ paddingTop: "2rem", paddingBottom: "2.5rem" }}
    >
      <Link className="back" href="/rfp">
        ← Bids &amp; RFPs
      </Link>

      <p className="eyebrow" style={{ marginBottom: "0.6rem" }}>
        {r.number}
        {r.status === "open" && (
          <>
            {" "}
            &middot;{" "}
            <span style={{ color: "var(--accent-deep)" }}>Bids due {r.closing}</span>
          </>
        )}
      </p>
      <h1
        className="font-display"
        style={{
          fontWeight: 560,
          fontSize: "clamp(1.9rem, 4.8vw, 2.7rem)",
          lineHeight: 1.07,
          letterSpacing: "-0.02em",
          margin: "0 0 0.5rem",
          textWrap: "balance",
        }}
      >
        {r.title}
      </h1>
      <p className="byline" style={{ fontSize: "1.08rem" }}>
        {r.oneLiner}
      </p>

      {hero && (
        <figure className="rfp-hero">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={hero.src} alt={hero.alt} width={1456} height={816} />
          <figcaption>{hero.caption}</figcaption>
        </figure>
      )}

      {/* Infographic: the project at a glance */}
      <div className="fact-grid" aria-label="Key facts">
        {r.facts.map((f) => (
          <div key={f.label} className="fact">
            <span className="fact-v">{f.value}</span>
            <span className="fact-l">{f.label}</span>
          </div>
        ))}
      </div>

      {r.summary.map((p, i) => (
        <p key={i} className="prose" style={{ fontSize: i === 0 ? "1.12rem" : "1rem" }}>
          {p}
        </p>
      ))}

      <h2 className="section-head">What the project does</h2>
      <ul className="prose tick">
        {r.whatItDoes.map((b, i) => (
          <li key={i}>{b}</li>
        ))}
      </ul>

      <h2 className="section-head">Where</h2>
      <p className="prose">{r.where}</p>

      {/* Who pays */}
      <h2 className="section-head">Who is paying for it</h2>
      <div className="spread" style={{ marginTop: "1rem" }}>
        {r.funding.map((f) => (
          <div key={f.source} className="card">
            <h3>
              {f.source}{" "}
              <span
                className={`chip ${f.kind === "grant" ? "chip-civic" : "chip-muted"}`}
                style={{ fontSize: "0.6rem", marginLeft: "0.3rem" }}
              >
                {f.kind === "grant" ? "Grant" : "Loan"}
              </span>
            </h3>
            <p>{f.detail}</p>
          </div>
        ))}
      </div>
      <p className="doc-note" style={{ marginTop: "0.8rem" }}>
        <strong>Cost:</strong> {r.cost}
      </p>

      {/* Timeline */}
      <h2 className="section-head">Timeline</h2>
      <ol className="rfp-timeline">
        {r.timeline.map((e, i) => (
          <li key={i} className={e.done ? "is-done" : "is-next"}>
            <span className="tl-date">{e.date}</span>
            <span className="tl-label">{e.label}</span>
          </li>
        ))}
      </ol>

      {/* How it works */}
      <h2 className="section-head">How this bid works</h2>
      <ul className="prose tick">
        {r.howItWorks.map((b, i) => (
          <li key={i}>{b}</li>
        ))}
      </ul>

      {/* People */}
      <h2 className="section-head">Who is running it</h2>
      <div className="spread spread-tight" style={{ marginTop: "1rem" }}>
        {r.people.map((p) => (
          <div key={p.name} className="card">
            <h3 style={{ marginBottom: "0.2rem" }}>{p.name}</h3>
            <p>{p.role}</p>
          </div>
        ))}
      </div>

      {/* Documents */}
      <h2 className="section-head">The documents</h2>
      <p className="prose" style={{ marginTop: "0.4rem" }}>
        The full bid package, hosted here so you do not need a BidNet account to
        read it.
      </p>
      <div style={{ margin: "1rem 0" }}>
        {r.docs.map((d) => (
          <a
            key={d.file}
            href={d.file}
            target="_blank"
            rel="noopener noreferrer"
            className="doc-row"
          >
            <span className="doc-row-main">
              <strong>{d.label}</strong>
              {d.note && <span className="doc-row-note">{d.note}</span>}
            </span>
            <span className="doc-row-size">{d.size} PDF →</span>
          </a>
        ))}
      </div>

      <hr className="rule" />
      <p className="byline">
        Published by Transparent Towns, independent of the Town government, from
        the Town&rsquo;s own solicitation and its public pre-bid meeting record.
      </p>
    </article>
  );
}
