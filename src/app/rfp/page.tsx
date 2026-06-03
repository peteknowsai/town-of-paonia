import Link from "next/link";
import { paoniaRfps, PAONIA_BIDNET_URL } from "@/data/rfps";
import { SEARCH_PUBLISHED } from "@/data/position";

export const metadata = {
  title: "What the Town has out to bid | Transparent Towns — Paonia",
  description:
    "The Town of Paonia's open bids and requests for proposals, posted on the Rocky Mountain e-Purchasing System, in one place. Plus how comparable Colorado towns hire an executive search firm.",
};

const OFFICIAL_RFP_URL =
  "https://www.townofpaonia.colorado.gov/bids-rfps";

export default function RfpPage() {
  return (
    <article
      className="shell-narrow"
      style={{ paddingTop: "2rem", paddingBottom: "2.5rem" }}
    >
      <Link className="back" href="/">
        ← Dashboard
      </Link>

      <p className="eyebrow" style={{ marginBottom: "0.6rem" }}>
        Procurement &middot; Bids &amp; RFPs
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
        What the Town has out to bid
      </h1>
      <p className="byline" style={{ fontSize: "1.05rem" }}>
        Paonia&rsquo;s open solicitations, in one place, with the details linked
      </p>

      <hr className="rule" style={{ margin: "1.4rem 0 1.6rem" }} />

      <p className="prose" style={{ fontSize: "1.12rem" }}>
        When the Town needs a contractor, an engineer, or a service, it posts a
        bid or a request for proposals. The official versions live on a vendor
        system called BidNet, where reading the full documents means making an
        account. We have written each one up in plain language and mirrored the
        documents here, so you can follow along without signing in anywhere.
      </p>

      {/* Current open solicitations -> citizen explainer pages */}
      <h2 className="section-head">Open right now</h2>
      <div style={{ margin: "1.1rem 0 0.4rem" }}>
        {paoniaRfps.map((r) => (
          <Link
            key={r.slug}
            href={`/rfp/${r.slug}`}
            className="card"
            style={{ display: "block", marginBottom: "0.8rem", textDecoration: "none" }}
          >
            <h3 style={{ marginBottom: "0.3rem" }}>
              {r.number}: {r.title}
            </h3>
            <p>{r.oneLiner}</p>
            <p style={{ marginTop: "0.45rem" }}>
              <strong style={{ color: "var(--accent-deep)" }}>
                Bids due {r.closing}
              </strong>{" "}
              &middot; Read the plain-language explainer →
            </p>
          </Link>
        ))}
      </div>

      <p className="prose" style={{ marginTop: "1.2rem" }}>
        For the Town&rsquo;s full bid board, including closed and awarded
        solicitations, see{" "}
        <a href={PAONIA_BIDNET_URL} target="_blank" rel="noopener noreferrer">
          the Town of Paonia BidNet page
        </a>{" "}
        or the{" "}
        <a href={OFFICIAL_RFP_URL} target="_blank" rel="noopener noreferrer">
          official Town website
        </a>
        .
      </p>

      {/* Hand-off to the comparables research */}
      <h2 className="section-head">Hiring an executive search firm</h2>
      <p className="prose">
        The Town has weighed hiring an executive search firm to help recruit its
        next Town Administrator. To inform that decision, we pulled every
        comparable executive-search solicitation other Colorado governments have
        posted on the same system: who they hired a firm to find, how they
        structured the RFP, which firms competed, and who won.
      </p>

      <div className="doc-card">
        <p className="eyebrow" style={{ marginBottom: "0.7rem" }}>
          The research
        </p>
        <div className="cta-row">
          <Link className="btn btn-fill" href="/rfp/executive-search">
            Comparable executive-search RFPs
          </Link>
          {SEARCH_PUBLISHED && (
            <Link className="btn btn-outline" href="/administrator">
              The Town Administrator search
            </Link>
          )}
        </div>
        <p className="doc-note">
          A working reference for the Board and the public: real Colorado
          comparables drawn from BidNet, including a checkable shortlist of the
          search firms that actually compete for these jobs.
        </p>
      </div>
    </article>
  );
}
