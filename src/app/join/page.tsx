import RecallForm from "@/components/RecallForm";

export const metadata = {
  title: "Get involved | Recall Mayor Paige Smith — Paonia",
  description:
    "Sign up to stay involved in the effort to recall Mayor Paige Smith. Get updates, help gather signatures, or just keep posted. Plus where to find Pete in person.",
};

export default function JoinPage() {
  return (
    <article className="shell-narrow" style={{ paddingTop: "2.5rem", paddingBottom: "2rem" }}>
      <p className="eyebrow" style={{ marginBottom: "1rem" }}>
        Get involved
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
        Stay involved in the recall
      </h1>
      <p className="byline">An effort to recall Mayor Paige Smith</p>

      <hr className="rule" style={{ margin: "1.4rem 0 1.8rem" }} />

      <p className="prose" style={{ fontSize: "1.18rem", lineHeight: 1.6 }}>
        If you cannot make it in person, you can still be part of this. Leave your
        contact below and I will keep you posted on what is happening and where you can
        sign, help, or weigh in. No spam, and you can opt out of emails any time.
      </p>
      <p className="prose">
        New to this? <a href="/recall">Read the case for the recall</a>, sourced from
        public records.
      </p>

      <div style={{ marginTop: "1.6rem" }}>
        <RecallForm />
      </div>

      <hr className="rule" style={{ margin: "2.4rem 0 1.8rem" }} />

      {/* The in-person option: Pete's standing Greet & Meet. */}
      <h2 className="font-display" style={{ fontWeight: 560, fontSize: "1.5rem", margin: "0 0 0.6rem" }}>
        Or come find me in person
      </h2>
      <p className="prose">
        I host an open Greet &amp; Meet twice a week. Anyone is welcome, including board
        members. Come say hello, bring your own questions, and sign the petition if you
        want to. I am there to listen.
      </p>
      <ul className="ed-list">
        <li>
          <strong>Tuesdays, 10:15 AM to noon</strong> at the park, by the center stage.
        </li>
        <li>
          <strong>Thursdays, 10:15 AM to noon</strong> at Sweetgrass.
        </li>
      </ul>
      <p className="prose" style={{ color: "var(--muted)", fontSize: "0.95rem" }}>
        Each week I post that week&apos;s topics ahead of time, but you are always free to
        bring your own.
      </p>
    </article>
  );
}
