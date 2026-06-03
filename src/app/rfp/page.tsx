import Link from "next/link";
import { paoniaOpen, PAONIA_BIDNET_URL } from "@/data/rfps";
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
        bid or a request for proposals on the Rocky Mountain e-Purchasing System
        (BidNet), the same system most Colorado local governments use. Anyone can
        read the list for free. Below is what is open right now.
      </p>

      {/* Current open solicitations */}
      <h2 className="section-head">Open right now</h2>
      <div style={{ margin: "1.1rem 0 0.4rem" }}>
        {paoniaOpen.map((r) => (
          <a
            key={r.number}
            href={r.url}
            target="_blank"
            rel="noopener noreferrer"
            className="card"
            style={{
              display: "block",
              marginBottom: "0.8rem",
              textDecoration: "none",
            }}
          >
            <h3 style={{ marginBottom: "0.3rem" }}>
              {r.number}: {r.title}
            </h3>
            <p>
              Published {r.published} &middot;{" "}
              <strong style={{ color: "var(--accent-deep)" }}>
                Closes {r.closing}
              </strong>{" "}
              &middot; View on BidNet →
            </p>
          </a>
        ))}
      </div>

      <div className="note" style={{ marginTop: "1rem" }}>
        <p>
          On BidNet, the full description, documents, and contact for an{" "}
          <strong>open</strong> solicitation are visible only to registered
          vendors. Registration is free. Once a solicitation closes, its full
          record becomes public, which is why the comparison below can show other
          towns&rsquo; searches in detail.
        </p>
      </div>

      <p className="prose" style={{ marginTop: "1.2rem" }}>
        See the Town&rsquo;s full bid board, including closed and awarded
        solicitations, on{" "}
        <a href={PAONIA_BIDNET_URL} target="_blank" rel="noopener noreferrer">
          the Town of Paonia BidNet page
        </a>
        , or on the{" "}
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
