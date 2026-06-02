/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";

export const metadata = {
  title: "A parking code that lets downtown fill back up | Transparent Towns",
  description:
    "Paonia's off-street parking rule has stalled one downtown business after another. Two smaller Colorado towns, Mancos and Ouray, already fixed it. Here is a draft rewrite of Chapter 16, Article 6, written to drop into our code, plus the proposal, a downtown survey, and slides.",
};

// Downloadable documents (live in /public).
const PROPOSAL_URL = "/parking-proposal.pdf";
const SLIDES_URL = "/parking-slides.pdf";

export default function ParkingPage() {
  return (
    <article
      className="shell-narrow"
      style={{ paddingTop: "2rem", paddingBottom: "2.5rem" }}
    >
      <Link className="back" href="/">
        ← Dashboard
      </Link>

      <p className="eyebrow" style={{ marginBottom: "0.6rem" }}>
        Land use &middot; Downtown
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
        A parking code that lets downtown fill back up
      </h1>
      <p className="byline" style={{ fontSize: "1.05rem" }}>
        What two smaller Colorado towns already did, drafted to drop into our code
      </p>

      <figure className="parking-hero">
        <img
          src="/parking/grand-ave.png"
          alt="A historic brick main street at golden hour, with a snow-capped mesa rising behind it and people walking the sidewalk."
          width={1456}
          height={816}
        />
        <figcaption>
          A historic downtown that predates the automobile. Our parking code does
          not.
        </figcaption>
      </figure>

      <div className="callout">
        <p style={{ margin: 0 }}>
          This is <strong>not</strong> a proposal to get rid of parking.
          Single-family neighborhoods keep their parking exactly as they are. It
          fixes the one part of the code that has actually been a problem: the
          off-street parking mandate that has stalled downtown businesses like the
          bookstore, CIRC, the Learning Council, and Blue Sage.
        </p>
        <p style={{ margin: "0.7rem 0 0" }}>
          It does what <strong>Mancos</strong> and <strong>Ouray</strong>, two
          Colorado towns smaller than Paonia, already did: require no off-street
          parking downtown, and keep ordinary residential parking everywhere else.
        </p>
      </div>

      {/* Primary actions: read the three documents */}
      <div className="doc-card">
        <p className="eyebrow" style={{ marginBottom: "0.7rem" }}>
          Read the proposal
        </p>
        <div className="cta-row">
          <a
            className="btn btn-fill"
            href={PROPOSAL_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            The proposal (PDF)
          </a>
          <a
            className="btn btn-outline"
            href={SLIDES_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Slides (PDF)
          </a>
          <Link className="btn btn-outline" href="/parking/survey">
            Downtown survey
          </Link>
        </div>
        <p className="doc-note">
          The proposal is a short brief on why this matters and what comparable
          towns have done, followed by a draft of Article 6 written so it can drop
          into our code. The downtown survey is a live, two-minute form you can fill
          out or print to hand out. The slides are the same proposal in presentation
          form.
        </p>
      </div>

      <div className="prose">
        <h2>What this is</h2>
        <p>
          This is a <strong>draft rewrite</strong> of Paonia's off-street parking
          code, Chapter 16, Article 6. Transparent Towns prepared it as a public
          service, with Pete McCarthy, after the Planning Commission's June 1, 2026
          discussion of parking. It is independent of the Town government and is
          offered as a starting point for the Commission's own recommendation to
          the Board of Trustees, not as a finished product.
        </p>
        <p>
          It is built on a simple, proven model: require no off-street parking for
          commercial uses, keep ordinary residential parking, and let on-street and
          shared parking count. Every comparison it draws is to a real Colorado
          town whose adopted code you can read for yourself.
        </p>

        <h2>The problem</h2>
        <p>
          The off-street parking requirements in Article 6 were last amended in
          2015 and carry language going back to 1983. Several recent businesses
          have run into them on the 200 and 300 blocks of Grand Avenue, where the
          buildings predate the automobile and the code now makes them hard and
          expensive to reuse. At the Commission's June 1 discussion, members named
          the bookstore (mid-process now), the Learning Council, CIRC, and Blue
          Sage as businesses that struggled with the parking requirement.
        </p>
        <p>The current code also:</p>
        <ul className="ed-list">
          <li>
            Sets residential parking by <strong>bedroom count</strong>, an approach
            widely considered outdated.
          </li>
          <li>
            Lists requirements for <strong>hospitals and high schools</strong> that
            Paonia does not have.
          </li>
          <li>
            Triggers requirements on "construction, addition or change of use"
            without defining those terms, so an applicant cannot tell when the rule
            applies.
          </li>
          <li>
            Directs any business that cannot provide on-site parking to pay into a{" "}
            <strong>"Parking Fund" that has been suspended since 2015</strong>, and
            cross-references it by the wrong section number, so the requirement
            does not actually function.
          </li>
        </ul>

        <h2>What comparable towns have done</h2>
        <p>
          Small towns lead this reform. Towns under 25,000 people make up roughly
          40 percent of known U.S. jurisdictions that have removed parking
          minimums, and about twice as many small towns as large cities (250,000
          and up) have fully repealed parking mandates. Comparable small Colorado
          towns have done it, and their adopted code can be quoted directly:
        </p>
        <div className="table-wrap">
          <table className="peer-table">
            <thead>
              <tr>
                <th>Town</th>
                <th>Population</th>
                <th>What their code does</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <strong>Mancos</strong>
                </td>
                <td>~1,200</td>
                <td>
                  No off-street parking or loading required downtown; small
                  commercial spaces (2,000 sq ft or less) exempt town-wide;
                  on-street parking counts; an ADU needs one space, waivable by
                  staff.
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Ouray</strong>
                </td>
                <td>~900</td>
                <td>
                  No off-street parking required for buildings fronting US 550
                  through downtown; ordinary residential parking kept elsewhere; an
                  ADU needs one space.
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Del Norte</strong>
                </td>
                <td>~1,460</td>
                <td>
                  Downtown Commercial Business district exempt from off-street
                  parking requirements (since 2015).
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Wray</strong>
                </td>
                <td>~2,360</td>
                <td>
                  "There is no minimum off-street parking requirement in the B-B
                  district."
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Dolores</strong>
                </td>
                <td>~885</td>
                <td>
                  No parking required downtown, or for any nonresidential use in a
                  space 2,000 sq ft or smaller anywhere in town.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="sec-aside">
          Mancos and Ouray are both smaller than Paonia (~1,450). Del Norte and
          Wray are comparable and slightly larger, shown for reference.
        </p>
        <p>
          Mancos, in Montezuma County, is the closest comparison: a roughly
          1,200-person town with a historic main street that exempted its downtown
          in 2019 and has lived with it since. Ouray's rule, no parking required
          for the buildings fronting its main highway downtown (2023), is a direct
          parallel to Grand Avenue. The documented experience in these towns is
          consistent: empty buildings get reused, businesses open, and no parking
          shortage materializes. Neither town has reversed its decision.
        </p>

        <h2>Why parking minimums work against a town like Paonia</h2>
        <p>
          The State of Colorado, in its 2024 legislative findings (House Bill
          24-1304), concluded that minimum parking requirements
        </p>
        <blockquote>
          "put small businesses at a disadvantage relative to large corporations"
        </blockquote>
        <p>
          because large companies have the capital to build parking and rely less
          on foot traffic and a sense of place. The same findings cite a published
          analysis that an off-street parking space can add{" "}
          <strong>$200 to $500 per month</strong> to rent, and note that
          lower-density, parking-heavy development raises a town's infrastructure
          costs while lowering its tax revenue.
        </p>
        <p>
          Colorado has since moved to remove parking mandates in many situations.
          Those laws do not bind Paonia, because they apply only inside the state's
          large metropolitan planning areas, and Delta County is not in one. But
          they show the clear direction of state policy, and Paonia is free to
          adopt the same approach voluntarily.
        </p>

        <h2>It carries out the Town's own Comprehensive Plan</h2>
        <p>
          The 2024 Comprehensive Plan calls for exactly the outcomes this proposal
          supports:
        </p>
        <ul className="ed-list">
          <li>
            <strong>Policy ECON-3:</strong> "Create and maintain a healthy,
            vibrant, and beautiful economic downtown corridor on and around Grand
            Avenue."
          </li>
          <li>
            <strong>Policy LUF-1:</strong> preserve rural character "while balancing
            the need for infill, economic growth, housing and redevelopment."
          </li>
          <li>
            <strong>Policies TRANS-9 and TRANS-16:</strong> "encourage, enhance, and
            promote pedestrian access and walkability to and within the Historic
            Town Core."
          </li>
        </ul>
        <p>
          The plan's vision describes "walkable, tree-lined streets that surround a
          small but vibrant historic downtown." Removing the parking barrier
          downtown is a direct step toward those adopted goals.
        </p>

        <h2>Common questions</h2>
        <h3>Will people have nowhere to park downtown?</h3>
        <p>
          Removing the requirement does not remove parking. It stops forcing it.
          Paonia already has substantial parking, including two town lots, and the
          Commission was advised that the Town's 2025 downtown business survey found
          general satisfaction with parking availability. Grand Avenue's on-street
          parking stays available for visitors.
        </p>
        <h3>Is this a big-city idea?</h3>
        <p>
          No. The towns that have done this are overwhelmingly small, including
          several in Colorado, two of them smaller than Paonia.
        </p>
        <h3>What about accessible parking?</h3>
        <p>
          Federal ADA accessible-parking requirements are unaffected and fully
          kept.
        </p>
        <h3>Won't businesses just provide no parking?</h3>
        <p>
          Businesses provide what their customers need. Letting each use decide is
          more sensible than a 2015 table that sets parking by bedroom count and
          lists hospitals the town does not have.
        </p>

        <h2>What the proposal would do</h2>
        <p>The draft rewrite of Article 6, in summary, would:</p>
        <ol className="q-list">
          <li>
            Require <strong>no off-street parking for any commercial or other
            non-residential use</strong> town-wide.
          </li>
          <li>
            Require <strong>no off-street parking at all in the C-1 Core Commercial
            District</strong> (the downtown core), while residences and lodging keep
            one space per unit.
          </li>
          <li>Let on-street and shared parking count toward any residential requirement.</li>
          <li>
            Keep ordinary residential parking, accessible (ADA) parking, and
            sensible design standards.
          </li>
          <li>Repeal the suspended Parking Fund.</li>
        </ol>

        <h2>A note on accessory dwelling units</h2>
        <p>
          Paonia does not yet regulate accessory dwelling units (ADUs), so this
          proposal does <strong>not</strong> change ADU parking. The Commission has
          noted that an ADU code is coming. When it is written, it is worth deciding
          in advance not to let an old-style parking minimum quietly make ADUs
          impossible. Mancos and Ouray both ask for just one space for an ADU, and
          Mancos lets staff waive even that when on-street parking is available. A
          recommended provision for that future ADU code is included with the draft,
          clearly marked as a recommendation rather than part of this proposal.
        </p>
      </div>

      <div className="cta-row" style={{ marginTop: "1.6rem" }}>
        <a className="btn btn-fill" href={PROPOSAL_URL} target="_blank" rel="noopener noreferrer">
          The proposal (PDF)
        </a>
        <a className="btn btn-outline" href={SLIDES_URL} target="_blank" rel="noopener noreferrer">
          Slides (PDF)
        </a>
        <Link className="btn btn-outline" href="/parking/survey">
          Downtown survey
        </Link>
      </div>

      <p className="sec-aside" style={{ marginTop: "1.6rem" }}>
        This page is general civic information, not legal advice. The draft
        ordinance is offered for review and is not adopted Town policy. Transparent
        Towns is independent of the Town of Paonia government.
      </p>
    </article>
  );
}
