import Link from "next/link";
import { notFound } from "next/navigation";
import { position, isOpen, SEARCH_PUBLISHED } from "@/data/position";
import InterestForm from "@/components/InterestForm";
import CommitteeForm from "@/components/CommitteeForm";

export const metadata = {
  title: "The Town Administrator Job | Transparent Towns — Paonia",
  description:
    "Paonia, Colorado is looking for a Town Administrator. The job, told honestly. The expensive part of a $30,000 executive search, made free and public.",
};

const coverageLabel: Record<string, string> = {
  replaces: "Replaces it",
  scaffolds: "Supports it",
  declined: "We don't do this",
};

const tierLabel: Record<string, string> = {
  tier1: "Where administrators look",
  values: "Where the aligned ones are",
  broad: "Broad reach",
};

export default function AdministratorPage() {
  // Unpublished for now: the page is unreachable until SEARCH_PUBLISHED is true.
  if (!SEARCH_PUBLISHED) notFound();
  const p = position;
  const open = isOpen(p);

  return (
    <article className="shell-narrow" style={{ paddingTop: "2.5rem", paddingBottom: "2rem" }}>
      <p className="eyebrow" style={{ marginBottom: "1rem" }}>
        The job, told honestly &middot; {p.asOf}
      </p>
      <h1
        className="font-display"
        style={{
          fontWeight: 560,
          fontSize: "clamp(2.1rem, 5vw, 3rem)",
          lineHeight: 1.07,
          letterSpacing: "-0.02em",
          margin: "0 0 0.8rem",
          textWrap: "balance",
        }}
      >
        {p.place} is looking for a {p.title}
      </h1>
      <p className="byline">A public search, published by Transparent Towns</p>

      <hr className="rule" style={{ margin: "1.4rem 0 1.8rem" }} />

      <p className="prose" style={{ fontSize: "1.18rem", lineHeight: 1.6 }}>
        {p.intro}
      </p>

      {/* Disclosure band: the creepy-AI pre-empt, the conflict, and who decides. */}
      <aside className="note" style={{ marginTop: "1.8rem" }}>
        <p>
          <strong>A note before you read on.</strong> No software scores or judges anyone here.
          People raise their hand on their own, and people read every reply. The person who
          built this is running for mayor and is involved in a recall. He does not decide who
          gets hired. The Board of Trustees does. This is offered to the Town for $1 to use or
          ignore, and it runs either way.
        </p>
      </aside>

      <div className="prose">
        {p.sections.map((s) => (
          <section key={s.heading}>
            <h2>{s.heading}</h2>
            {s.body.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </section>
        ))}

        <h2>The real challenges right now</h2>
        <p>We would rather say this plainly than have you find out later.</p>
        <ul className="ed-list">
          {p.challenges.map((c, i) => (
            <li key={i}>{c}</li>
          ))}
        </ul>

        <h2>What it pays</h2>
        <p>
          <strong>{p.pay.range}.</strong> {p.pay.note}
        </p>
      </div>

      {/* Conduct-only candidate criteria. */}
      <h2 className="section-head">Who we are looking for</h2>
      <p className="prose" style={{ marginTop: 0 }}>
        Every line below is something a person has <em>done</em>, that you can check in a public
        record. None of it is about who someone is.
      </p>
      <div className="spread">
        {p.idealCandidate.map((c) => (
          <div className="card" key={c.competency}>
            <h3>{c.competency}</h3>
            <p>{c.evidence}</p>
          </div>
        ))}
      </div>

      {/* The citizens' committee. */}
      <h2 className="section-head">Who judges: a committee of residents</h2>
      <p className="prose" style={{ marginTop: 0 }}>{p.committee.lead}</p>
      <div className="spread spread-tight">
        {p.committee.members.map((m) => (
          <div className="card card-quiet" key={m.role}>
            <h3>{m.role}</h3>
            <p>{m.blurb}</p>
          </div>
        ))}
      </div>
      <p className="prose">
        <em>These are the kinds of neighbors we are looking for, not real names yet. The
        committee is open. Anyone in town can join.</em>{" "}
        <a href="#join">Sign up below.</a>
      </p>

      {/* The free-vs-firm ledger. */}
      <h2 className="section-head">Behind closed doors, or in the open</h2>
      <p className="prose" style={{ marginTop: 0 }}>
        A town usually pays an executive search firm to run this. Here is what that buys, phase
        by phase, next to what this page does instead.
      </p>
      <div className="ledger">
        {p.ledger.map((row) => (
          <div className="ledger-row" key={row.phase}>
            <div className="ledger-phase">
              {row.phase}
              <span className={`tag tag-${row.coverage}`}>{coverageLabel[row.coverage]}</span>
            </div>
            <div className="ledger-firm">
              <span className="ledger-k">A firm</span>
              {row.firmDoes}
            </div>
            <div className="ledger-we">
              <span className="ledger-k">This page</span>
              {row.weDo}
            </div>
          </div>
        ))}
      </div>
      <div className="cost-strip">
        {p.costPoints.map((c) => (
          <div key={c.label}>
            <strong>{c.amount}</strong>
            <span>{c.label}</span>
            <em>{c.detail}</em>
          </div>
        ))}
      </div>

      {/* The channel map. */}
      <h2 className="section-head">Where this job goes</h2>
      <p className="prose" style={{ marginTop: 0 }}>
        A firm posts to a handful of boards. We put Paonia in front of every network that breeds
        the kind of administrator this town wants, including the ones a firm would never think
        of.
      </p>
      <div className="channels">
        {(["tier1", "values", "broad"] as const).map((tier) => (
          <div key={tier} className="channel-group">
            <h4>{tierLabel[tier]}</h4>
            <ul>
              {p.channels
                .filter((c) => c.tier === tier)
                .map((c) => (
                  <li key={c.name}>
                    <strong>{c.name}</strong> {c.audience}
                    {c.note ? <em> {c.note}</em> : null}
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>

      {/* The funnels. */}
      <hr className="rule" />
      {open ? (
        <>
          <section className="funnel" id="apply">
            <h2 className="section-head" style={{ marginTop: 0 }}>Raise your hand</h2>
            <p className="prose" style={{ marginTop: 0 }}>
              If this sounds like the job you have been waiting for, tell us. This is an
              independent project, not an application to the Town. It is confidential.
            </p>
            <InterestForm />
          </section>

          <section className="funnel" id="join">
            <h2 className="section-head">Help choose. Join the committee.</h2>
            <p className="prose" style={{ marginTop: 0 }}>
              You do not have to be a candidate to take part. Any Paonia resident can sign up to
              help talk with candidates and recommend a hire to the Board. No gatekeeping.
            </p>
            <CommitteeForm />
          </section>
        </>
      ) : (
        <section className="funnel">
          <p className="prose">
            <strong>This search is {p.status === "filled" ? "closed" : "paused"}</strong> as of{" "}
            {p.asOf}. Thank you to everyone who took part.
          </p>
        </section>
      )}

      <hr className="rule" />
      <p style={{ fontSize: "0.95rem", color: "var(--muted)" }}>
        Published by Transparent Towns, independent of the Town government. The official Town
        site is <a href="https://townofpaonia.colorado.gov">townofpaonia.colorado.gov</a>. The
        Board of Trustees conducts the official hire. See also{" "}
        <Link href="/">the rest of this site</Link>.
      </p>
    </article>
  );
}
