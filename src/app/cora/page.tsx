import Link from "next/link";
import { LINKS } from "@/data/town";

export const metadata = {
  title: "Request a public record (CORA) | Transparent Towns",
  description:
    "A plain-language guide to filing a Colorado Open Records Act request with the Town of Paonia, with a ready-to-send template.",
};

const TEMPLATE = `Dear Town Clerk,

Under the Colorado Open Records Act (C.R.S. 24-72-201 et seq.), I request to inspect and receive copies of the following public records:

[Describe the records as specifically as you can: what, who, and the date range. For example: "All emails between the Town Administrator and the Board of Trustees about the water rate increase, from January 1, 2026 to today."]

If any part of this request is denied, please cite the specific exemption. If fees will exceed $25, please contact me with an estimate before proceeding.

Please send the records electronically if possible.

Name:
Mailing address:
Email:
Phone:
Date:`;

export default function CoraPage() {
  return (
    <article className="shell-narrow" style={{ paddingTop: "2rem", paddingBottom: "2.5rem" }}>
      <Link className="back" href="/">
        ← Dashboard
      </Link>

      <p className="eyebrow" style={{ marginBottom: "0.6rem" }}>Public records</p>
      <h1
        className="font-display"
        style={{
          fontWeight: 560,
          fontSize: "clamp(1.9rem, 4.5vw, 2.6rem)",
          lineHeight: 1.08,
          letterSpacing: "-0.02em",
          margin: "0 0 0.4rem",
        }}
      >
        Request a public record
      </h1>
      <p className="byline" style={{ fontSize: "1.05rem" }}>
        The Colorado Open Records Act, in plain language
      </p>

      <hr className="rule" style={{ margin: "1.4rem 0 1.8rem" }} />

      <div className="prose">
        <p>
          Almost everything the Town creates is a public record: emails, budgets,
          contracts, meeting recordings, and more. The Colorado Open Records Act,
          known as CORA, gives any person the right to inspect those records. You
          do not have to say why you want them.
        </p>

        <h2>What to expect</h2>
        <ul className="ed-list">
          <li>
            <strong>Response time.</strong> The Town must respond within three
            business days. It can extend that to seven if the request takes
            extra work.
          </li>
          <li>
            <strong>Fees.</strong> The first hour of research and retrieval is
            free. After that the Town may charge a set hourly rate, plus a small
            per-page copy fee. Ask for an estimate first.
          </li>
          <li>
            <strong>Denials.</strong> If part of your request is withheld, the
            Town must tell you which legal exemption applies.
          </li>
        </ul>

        <h2>How to write a good request</h2>
        <p>
          Be specific. Name the records, the people or department, and a date
          range. A narrow request is faster and cheaper than a broad one.
        </p>

        <h2>Copy this template</h2>
        <p>
          Paste this into an email, fill in the brackets, and send it to the Town
          Clerk.
        </p>
        <pre className="cora-template">{TEMPLATE}</pre>

        <h2>Where to send it</h2>
        <p>
          Send your request to the Town Clerk. You can find the current clerk
          email and mailing address on the{" "}
          <a href={LINKS.contact} target="_blank" rel="noopener noreferrer">
            Town contact page
          </a>
          . Keep a copy of what you send and the date you sent it.
        </p>

        <p className="sec-aside">
          This is general information, not legal advice. The full law is the
          Colorado Open Records Act, C.R.S. 24-72-201 and following.
        </p>
      </div>
    </article>
  );
}
