/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";

export const metadata = {
  title: "A personnel manual the public can read | Transparent Towns",
  description:
    "The Town of Paonia paid an out-of-state firm $7,500 for an employee handbook no resident has seen. Transparent Towns built a free, Colorado-specific model in the open. Read it, download it, comment on it.",
};

// Downloadable PDF of the model manual (lives in /public).
const PDF_URL = "/town-of-paonia-personnel-manual.pdf";

// Public, commentable Google Doc of the same manual (anyone with the link can
// comment). To swap it, replace this URL; an empty string hides the Doc buttons.
const DOC_URL =
  "https://docs.google.com/document/d/1kXmDjb5vy6u8-RghYhmT4_1MrsZrfSl5KOpho7sMCcQ/edit?usp=sharing";
const HAS_DOC = DOC_URL.length > 0;

export default function HandbookPage() {
  return (
    <article
      className="shell-narrow"
      style={{ paddingTop: "2rem", paddingBottom: "2.5rem" }}
    >
      <Link className="back" href="/">
        ← Dashboard
      </Link>

      <p className="eyebrow" style={{ marginBottom: "0.6rem" }}>
        Personnel policy
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
        An employee handbook the public can actually read
      </h1>
      <p className="byline" style={{ fontSize: "1.05rem" }}>
        A free, Colorado-specific model manual, open for comment
      </p>

      <div className="callout">
        <p style={{ margin: 0 }}>
          The Town of Paonia paid an out-of-state firm <strong>$7,500</strong>{" "}
          for a new employee handbook. The Town&apos;s own reports called it
          &ldquo;complete&rdquo; in October 2025. A year later, the Board has not
          adopted it and no resident has seen it.
        </p>
        <p style={{ margin: "0.7rem 0 0" }}>
          So Transparent Towns built one, in the open: a complete,
          Colorado-specific model personnel manual. It is free. You can read it,
          download it, and leave comments on it.
        </p>
      </div>

      {/* Primary actions: read/comment + download */}
      <div className="doc-card">
        <p className="eyebrow" style={{ marginBottom: "0.7rem" }}>
          Read the manual
        </p>
        <div className="cta-row">
          {HAS_DOC && (
            <a
              className="btn btn-fill"
              href={DOC_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Read &amp; comment (Google Doc)
            </a>
          )}
          <a
            className="btn btn-outline"
            href={PDF_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Download the PDF
          </a>
        </div>
        <p className="doc-note">
          {HAS_DOC ? (
            <>
              The Google Doc is open for public comments: anyone with the link
              can highlight a passage and leave a note. No sign-in changes are
              needed and you cannot edit the text. The PDF is the same document,
              formatted to print.
            </>
          ) : (
            <>
              A public, commentable Google Doc version is being prepared. For now,
              the full manual is in the PDF above.
            </>
          )}
        </p>
      </div>

      <div className="prose">
        <h2>What this is</h2>
        <p>
          This is a <strong>model</strong> personnel policy manual and employee
          handbook for a Colorado statutory town. Transparent Towns wrote it as a
          public service. It is independent of the Town of Paonia government and
          is offered as a starting point the Town Attorney and CIRSA (the
          Town&apos;s insurer) can review before the Board of Trustees considers
          adopting anything.
        </p>
        <p>
          It is roughly 37,000 words across 13 sections, built from current
          Colorado employment law and six real Colorado municipal handbooks
          (Durango, Carbondale, Manitou Springs, Cedaredge, and Douglas and El
          Paso counties). A few hundred spots are marked{" "}
          <span className="confirm">[CONFIRM: ...]</span> where a Town-specific
          fact (pay dates, benefit plans, position titles, policy choices) has to
          be filled in before adoption. Those marks are there on purpose, so the
          decisions a town actually has to make are easy to find.
        </p>
        <p>
          It is built to be useful, not generic. It includes the things
          Paonia&apos;s recent history shows it needs: a real complaint procedure
          that runs to the Board rather than through the person being complained
          about, clear anti-retaliation and anti-harassment rules written to the
          current Colorado standard, a consistent grievance process, and current
          Colorado leave law (paid sick leave, paid family leave, public-health
          emergency leave). It keeps Colorado at-will employment intact while
          still being fair and predictable.
        </p>

        <h2>Why we built it</h2>
        <p className="disclaimer">
          What follows is not an accusation. It does not claim anyone broke a law
          or profited improperly, and it draws no conclusion about motive. It is
          built from the Town&apos;s own public records: meeting packets,
          disbursement registers, and staff reports. It ends, as it should, in
          questions the Town can simply answer.
        </p>

        <h3>An out-of-state firm, hired without a bid</h3>
        <p>
          In June 2025 the Board approved a contract with{" "}
          <strong>New Focus HR, LLC</strong>, a firm in Noblesville, Indiana, to
          redesign the Town&apos;s employee handbook and serve as its
          &ldquo;outsourced human resources consulting company.&rdquo; The terms:
          $7,500 for the handbook, $150 a year for updates, and{" "}
          <strong>$175 an hour for open-ended consulting with no cap.</strong>{" "}
          Four features of how that contract came together are documented in the
          Town&apos;s own June 2025 meeting packet.
        </p>
        <ul className="ed-list">
          <li>
            <strong>It was sole-sourced.</strong> No competitive bid was sought,
            and no competing quote from any other firm appears in the packet, for
            a service that is neither specialized nor scarce.
          </li>
          <li>
            <strong>The justification came after the signature.</strong> New
            Focus HR signed and dated the agreement on May 23, 2025. The Town did
            not send the firm its &ldquo;sole source justification&rdquo;
            questions until May 28, five days after the contract was already
            signed and dated.
          </li>
          <li>
            <strong>The vendor wrote its own justification.</strong> The Town
            Clerk emailed New Focus HR the eight sole-source questions, and New
            Focus HR, the firm that benefits from there being no competition,
            wrote the answers and returned them. Three of the eight answers are
            &ldquo;Not applicable.&rdquo;
          </li>
          <li>
            <strong>The contract is governed by Indiana law.</strong> Its terms
            specify that the agreement is governed by &ldquo;the laws of the
            State of Indiana,&rdquo; that all work is done in the firm&apos;s
            Indiana offices, and that the firm&apos;s six references are all
            Indiana municipalities. A Colorado town&apos;s handbook has to be
            built around Colorado statutes (the Healthy Families and Workplaces
            Act, the state paid family-leave program, the POWR Act, the COMPS
            wage order, the Equal Pay for Equal Work Act). None of those is
            Indiana law.
          </li>
        </ul>

        <h3>The Indiana connection</h3>
        <p>
          The Town Administrator who signed the contract, Stefen Wynn, came to
          Paonia from Indiana. Before Paonia (and a stop in Florida) he served as
          Town Manager of Albion, Indiana, and holds a public-administration
          degree from an Indiana university. The firm he selected, its governing
          law, and all of its listed clients are in the same state he came from.
        </p>
        <p>
          The procurement file itself carries the clearest sign that the two
          sides were not strangers. The proposal arrived attached to an email
          from the firm&apos;s president to Wynn that reads, in part:
        </p>
        <blockquote>
          Stefen, I hope that you are enjoying your time in Indy? We look forward
          to attending the race on Sunday, although the temperatures may be a bit
          cool compared to past races.
        </blockquote>
        <p>
          That email is in the Town&apos;s public packet, sent two days before
          the Indianapolis 500. On its face it describes people who already knew
          each other. None of that is improper by itself. It is simply
          unexplained: the Town has never said how it came to choose a firm a
          thousand miles away, in the administrator&apos;s home state, without
          looking at anyone else.
        </p>

        <h3>The money</h3>
        <p>
          From the Town&apos;s own bi-weekly disbursement registers, June 2025
          through May 2026, the documented payments to New Focus HR total{" "}
          <strong>$9,575</strong>: the full $7,500 handbook fee (both halves), the
          $150 subscription, and about $1,925 of hourly consulting (roughly eleven
          hours). To be fair about that figure, $9,575 over a year is not an
          extraordinary sum, and the open-ended rate has been billed modestly so
          far. The amount is not the point. The point is that the rate, the firm,
          and the arrangement were never measured against a single competing
          offer. A competitive process is how a town learns whether $175 an hour
          is high, low, or fair, and whether a Colorado firm would have done the
          work better, cheaper, or both. That test was never run.
        </p>

        <h3>The deliverable that isn&apos;t there</h3>
        <p>
          This is the simplest question of all. The Town has now paid New Focus
          HR the full $7,500 for the handbook, the second half in January 2026.
          The Town&apos;s own staff status reports show the draft was
          &ldquo;complete&rdquo; by October 2025 and then &ldquo;under review by
          the Town Administrator and Treasurer,&rdquo; still described that way in
          board packets through February 2026. A review of every Town of Paonia
          board packet from January 2024 through May 2026 found that the finished
          handbook has not been brought to the Board for adoption and has not been
          made public. The Town paid in full, in January, for a deliverable its
          own reports called &ldquo;complete&rdquo; the previous October, and as
          of the most recent record, no resident has seen it.
        </p>

        <h3>The questions that remain</h3>
        <p>
          None of this is a charge. Each of these is a question the Town has the
          documents to answer.
        </p>
        <ol className="q-list">
          <li>Why was a contract of this kind never put out for competitive bid?</li>
          <li>
            Why was the sole-source justification assembled, and answered by the
            vendor, only after the contract was already signed?
          </li>
          <li>
            Why an out-of-state firm, working under another state&apos;s law, for
            Colorado-specific HR work?
          </li>
          <li>How did the Town come to select this particular firm?</li>
          <li>
            Where is the employee handbook the Town paid $7,500 for, and when will
            the Board and the public see it?
          </li>
        </ol>

        <h3>There was a closer way</h3>
        <p>
          An employee handbook is not exotic work. Colorado towns build, adapt,
          and publish their own as a matter of routine, and the resources to do it
          are ones Paonia already has. The Town is a dues-paying member of CIRSA,
          which gives member towns employment-policy review, an employment-law
          hotline, and HR training, all built around Colorado municipal law. The
          Town also retains a Town Attorney, whose review is exactly the step that
          localizes a handbook to Colorado law. And other Colorado towns&apos;
          handbooks are public documents anyone can use as a starting template. A
          handbook built that way would cost a fraction of $9,575, and, more to
          the point, it would be public and adopted by the Board in the open. This
          page is a working example of that approach.
        </p>

        <h2>What you can verify yourself</h2>
        <p>This relies entirely on public records. Each of these can be checked.</p>
        <ul className="ed-list">
          <li>
            <strong>
              The contract, the sole-source email exchange, and the timeline
            </strong>{" "}
            are in the Town of Paonia Board of Trustees packet for June 10, 2025,
            on CivicClerk, pages 110 to 126.
          </li>
          <li>
            <strong>The payment total</strong> is drawn from the Town&apos;s
            bi-weekly &ldquo;Payment Approval Report&rdquo; disbursement registers
            in board packets, June 2025 through May 2026 (New Focus HR is Town
            vendor #1463).
          </li>
          <li>
            <strong>The handbook&apos;s status</strong> (&ldquo;complete&rdquo; in
            October 2025, &ldquo;under review&rdquo; through February 2026, never
            adopted) is stated in the staff status reports carried in successive
            2025 and 2026 board packets.
          </li>
          <li>
            <strong>Colorado&apos;s handbook-relevant statutes</strong> (HFWA,
            FAMLI, the POWR Act, the COMPS Order, and the Equal Pay for Equal Work
            Act) are published by the Colorado Department of Labor and Employment.{" "}
            <strong>CIRSA&apos;s services</strong> to member towns are described at
            cirsa.org.
          </li>
        </ul>

        <h2>Read it and weigh in</h2>
        <p>
          {HAS_DOC ? (
            <>
              The model manual is open for public comment. If you work for the
              Town, have worked for it, or simply live here, your read is worth
              more than ours. Open the Google Doc, highlight anything that is
              wrong, missing, or unclear, and leave a comment. Good notes will
              make it better.
            </>
          ) : (
            <>
              Read the manual in the PDF above. A public, commentable version is
              being prepared so that anyone who works for the Town, has worked for
              it, or simply lives here can mark anything that is wrong, missing, or
              unclear. Good notes will make it better.
            </>
          )}
        </p>
      </div>

      {HAS_DOC && (
        <div className="cta-row" style={{ marginTop: "1.4rem" }}>
          <a className="btn btn-fill" href={DOC_URL} target="_blank" rel="noopener noreferrer">
            Read &amp; comment (Google Doc)
          </a>
          <a className="btn btn-outline" href={PDF_URL} target="_blank" rel="noopener noreferrer">
            Download the PDF
          </a>
        </div>
      )}

      <p className="sec-aside" style={{ marginTop: "1.6rem" }}>
        This page is general civic information, not legal advice. The model manual
        is a draft offered for review and is not adopted Town policy. Transparent
        Towns is independent of the Town of Paonia government.
      </p>
    </article>
  );
}
