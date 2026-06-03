import Link from "next/link";
import {
  comparables,
  searchFirms,
  RMEPS_CLOSED_COUNT,
  RMEPS_CLOSED_URL,
} from "@/data/rfps";

export const metadata = {
  title: "How Colorado towns hire an executive search firm | Transparent Towns — Paonia",
  description:
    "Comparable executive-search-firm RFPs from Colorado cities, towns, and counties, pulled from the Rocky Mountain e-Purchasing System: who they searched for, how they wrote the RFP, which firms competed, and who won.",
};

const govLabel: Record<string, string> = {
  city: "Home-rule city",
  town: "Statutory town",
  county: "County",
  special: "Special district",
};

const vehicleNote: Record<string, string> = {
  RFP: "Request for Proposals",
  RFQ: "Request for Qualifications",
  IFB: "Invitation for Bid",
};

export default function ExecutiveSearchPage() {
  // Manager-tier rows are the real Town Administrator comparables; show them
  // first, then the broader set, but in one continuous table.
  const ordered = [...comparables].sort((a, b) => {
    const rank = { manager: 0, department: 1, general: 2 } as const;
    if (rank[a.tier] !== rank[b.tier]) return rank[a.tier] - rank[b.tier];
    return b.year - a.year;
  });

  const managerStandouts = comparables.filter(
    (c) => c.note && (c.firms || c.awardedTo) && c.tier !== "general"
  );

  return (
    <article
      className="shell-narrow"
      style={{ paddingTop: "2rem", paddingBottom: "2.5rem" }}
    >
      <Link className="back" href="/rfp">
        ← Bids &amp; RFPs
      </Link>

      <p className="eyebrow" style={{ marginBottom: "0.6rem" }}>
        Procurement &middot; Comparables
      </p>
      <h1
        className="font-display"
        style={{
          fontWeight: 560,
          fontSize: "clamp(1.9rem, 4.8vw, 2.7rem)",
          lineHeight: 1.07,
          letterSpacing: "-0.02em",
          margin: "0 0 0.5rem",
        }}
      >
        How Colorado governments hire an executive search firm
      </h1>
      <p className="byline" style={{ fontSize: "1.05rem" }}>
        Real comparables for a Town Administrator search, pulled from BidNet
      </p>

      <hr className="rule" style={{ margin: "1.4rem 0 1.6rem" }} />

      <p className="prose" style={{ fontSize: "1.12rem" }}>
        Before a town pays a firm to run a search, it helps to see how comparable
        governments have done it. The Rocky Mountain e-Purchasing System (RMEPS),
        the same BidNet platform Paonia posts on, keeps a public record of every
        closed solicitation. We searched it for executive-search-firm
        contracts and pulled{" "}
        <a href={RMEPS_CLOSED_URL} target="_blank" rel="noopener noreferrer">
          all {RMEPS_CLOSED_COUNT} matches
        </a>
        . The ones most like a Town Administrator search are below.
      </p>

      {/* The headline finding */}
      <div className="callout">
        <p style={{ margin: 0 }}>
          <strong>What the record shows:</strong> almost every Colorado
          executive-search RFP comes from a home-rule{" "}
          <em>city</em> or a county, not a statutory <em>town</em>. No small
          statutory town has posted a manager or administrator search on this
          system. The closest comparables are City Manager searches from
          small-to-mid Colorado cities.
        </p>
        <p style={{ margin: "0.7rem 0 0" }}>
          The practical read for Paonia: hiring an outside firm to run a Town
          Administrator search would put us at the high end of what towns our
          size do, and there is no off-the-shelf &ldquo;small town&rdquo; RFP to
          copy. The City Manager RFPs below are the model to adapt.
        </p>
      </div>

      {/* The comparison table */}
      <h2 className="section-head">The comparables</h2>
      <div className="table-wrap">
        <table className="peer-table">
          <thead>
            <tr>
              <th>Government</th>
              <th>Searched for</th>
              <th>Year</th>
              <th>Vehicle</th>
              <th>Firms</th>
            </tr>
          </thead>
          <tbody>
            {ordered.map((c) => (
              <tr key={c.url + c.year}>
                <td>
                  <a
                    href={c.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "var(--civic)", textDecoration: "none" }}
                  >
                    <strong>{c.agency}</strong>
                  </a>
                  <br />
                  <span style={{ fontSize: "0.8rem", color: "var(--muted)" }}>
                    {govLabel[c.govType]} &middot; {c.county} County
                  </span>
                </td>
                <td>
                  {c.role}
                  {c.awardedTo && (
                    <>
                      <br />
                      <span
                        style={{ fontSize: "0.8rem", color: "var(--civic-deep)" }}
                      >
                        Won by {c.awardedTo}
                      </span>
                    </>
                  )}
                </td>
                <td>{c.year}</td>
                <td>
                  <abbr title={vehicleNote[c.vehicle]}>{c.vehicle}</abbr>
                </td>
                <td>{c.firms ?? "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="doc-note" style={{ marginTop: 0 }}>
        &ldquo;Firms&rdquo; is the number of vendors that downloaded the RFP on
        BidNet, a ceiling on interest rather than the count of actual bids (an em
        dash means BidNet shows no count). Where an award was published, the
        winning firm is noted under the role; awarded dollar values are almost
        always undisclosed.
      </p>

      {/* What stands out */}
      <h2 className="section-head">What stands out</h2>
      <div style={{ margin: "1.1rem 0" }}>
        {managerStandouts.map((c) => (
          <div
            key={c.url}
            className="card"
            style={{ marginBottom: "0.8rem" }}
          >
            <h3 style={{ marginBottom: "0.35rem" }}>
              {c.agency} &mdash; {c.role}{" "}
              <span
                style={{
                  fontWeight: 400,
                  color: "var(--muted)",
                  fontSize: "0.85rem",
                }}
              >
                ({c.vehicle}, {c.year})
              </span>
            </h3>
            <p>{c.note}</p>
          </div>
        ))}
      </div>

      {/* The firm roster */}
      <h2 className="section-head">Who competes for these searches</h2>
      <p className="prose">
        This is a real shortlist, not a guess: these are the executive-search
        firms that downloaded the City of Durango&rsquo;s City Manager RFP in
        2019 and actually do municipal recruitment. Four are Colorado-based. Any
        RFP Paonia issued would likely draw from the same pool.
      </p>
      <div className="spread" style={{ marginTop: "1.1rem" }}>
        {searchFirms.map((f) => (
          <div key={f.name} className="card">
            <h3 style={{ marginBottom: "0.25rem" }}>
              {f.name}
              {f.co && (
                <span
                  className="chip chip-civic"
                  style={{ marginLeft: "0.5rem", fontSize: "0.62rem" }}
                >
                  Colorado
                </span>
              )}
            </h3>
            <p>
              {f.base}
              {f.note ? ` — ${f.note}` : ""}
            </p>
          </div>
        ))}
      </div>

      {/* Sourcing */}
      <h2 className="section-head">How this was gathered</h2>
      <p className="prose">
        Every row links to its source record on BidNet. The list was built by
        searching the Rocky Mountain e-Purchasing System&rsquo;s closed
        solicitations for executive-search contracts and keeping the ones for
        government leadership roles. It is not exhaustive: RMEPS covers member
        agencies over roughly the last two decades, and many small towns post
        only on their own websites, so a search missing here is not a search that
        never happened. Figures are drawn from the public BidNet record as of
        June 2026.
      </p>

      <hr className="rule" />
      <p className="byline">
        Compiled by Transparent Towns, independent of the Town government, from
        the public BidNet record.
      </p>
    </article>
  );
}
