export const metadata = {
  title: "The Case for Recall — Mayor Paige Smith | Transparent Towns",
  description:
    "Why Pete McCarthy is working to recall Paonia Mayor Paige Smith. The record, sourced from public documents.",
};

export default function RecallPage() {
  return (
    <article className="shell-narrow" style={{ paddingTop: "2.5rem", paddingBottom: "2rem" }}>
      <p className="eyebrow" style={{ marginBottom: "1rem" }}>The case for recall</p>
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
        Why I am working to recall Mayor Paige Smith
      </h1>
      <p className="byline">By Pete McCarthy, Paonia resident</p>

      <hr className="rule" style={{ margin: "1.4rem 0 2rem" }} />

      <div className="prose">
        <p>
          I do not take this lightly. Recalling an elected official is a serious step,
          and it is the most direct tool residents have when the people in office stop
          answering to them. I believe we are there. Over the past two years, Mayor
          Paige Smith has repeatedly used the power of her office against the residents
          she was elected to serve. Here is the record. Every fact below comes from
          public documents.
        </p>

        <h2>A town employee asked a question. Her name was handed to the person she asked about.</h2>
        <p>
          In September 2025, a town employee went to Mayor Smith on behalf of several
          coworkers and asked a simple question: was there a process for raising a
          concern about the Town Administrator and HR? She had not filed a complaint.
          She was asking how. The Mayor took that question straight to the Town
          Administrator, named the employee, and characterized her inquiry as a
          complaint before she had ever called it one. Twenty-three days later, that
          employee was terminated. The Town has never explained the basis for the
          firing.
        </p>

        <h2>An elected trustee was removed after he started asking questions.</h2>
        <p>
          In April 2024, voters elected Bill Brunner to the Board of Trustees with more
          than two-thirds of the vote. Months later, after Brunner began asking
          questions, filing records requests, and pushing for oversight, the Town
          Administrator submitted a resignation he said he would withdraw only if
          Brunner were removed. Mayor Smith brought the charges and personally
          prosecuted Brunner&apos;s removal. The choice voters had just made was undone.
        </p>

        <h2>She branded my sourced criticism &ldquo;libelous,&rdquo; and pushed to spend public money attacking it.</h2>
        <p>
          In March 2026, I distributed a flyer citing the Town&apos;s own
          budgets, court records, and published news coverage. Mayor Smith authored an
          official Town statement branding my criticism &ldquo;erroneous and
          libelous,&rdquo; without disputing a single source it cited, and pushed to
          spend public money on newspaper ads attacking it. Even the Board would not go
          that far, and refused the ads.
        </p>

        <h2>And when residents asked for accountability, silence was the answer.</h2>
        <p>
          A formal complaint laying out this pattern sat unanswered for sixteen months.
          A flyer, by contrast, got a special meeting within five days. That tells you
          who this government believes it answers to.
        </p>

        <h2>The same letter misled residents about the surveillance cameras.</h2>
        <p>
          That official March 2026 letter did something else. It told residents the
          Town&apos;s cameras were &ldquo;motion activated&rdquo; and not a &ldquo;private
          property surveillance apparatus.&rdquo; Both claims are false. The cameras
          record around the clock. Verkada&apos;s own product documentation, the
          Town&apos;s signed contract, and the Town&apos;s own audit logs, every one of
          them inside the Town&apos;s own records, prove it. I showed this on the record
          and asked the Town to take the false claim down. They refused and left it on
          the town website, while two of those cameras keep filming the public to this
          day.
        </p>

        <h2>Why a recall, and why now</h2>
        <p>
          A mayor who exposes the name of an employee for asking a question, removes the
          colleagues voters elected, and brands residents&apos; documented criticism
          &ldquo;libelous&rdquo; has lost the trust this office requires. The Board
          cannot fix this. The voters can. A recall puts the question exactly where it
          belongs: to the people of Paonia. And it is available to us now. It is legal,
          it is grassroots, and it runs on signatures from our own neighbors.
        </p>

        <h2>What I am asking</h2>
        <p>
          To get the recall on the ballot, the petition needs a small committee: three
          to five registered Paonia voters who live inside town limits and are willing
          to be named as its official sponsors. That is the ask. Lending your name. You
          do not have to gather signatures or run anything unless you choose to.
        </p>
        <p>
          If you are reading this because I sent it to you, this is the &ldquo;why&rdquo;
          behind that ask. If you are in, tell me and I will send the next steps. If you
          have questions first, ask me anything.
        </p>

        <hr className="rule" />
        <p style={{ fontSize: "0.95rem", color: "var(--muted)" }}>
          Every fact on this page comes from public records: Town budgets and meeting
          records, the Board complaint letter of March 2026, court filings, and
          published news coverage. Nothing here is rumor. If a claim could not be
          sourced to a public document, it is not on this page.
        </p>
      </div>
    </article>
  );
}
