import Link from "next/link";

export default function HomePage() {
  return (
    <div className="shell-narrow" style={{ paddingTop: "2.5rem", paddingBottom: "2rem" }}>
      <p className="eyebrow" style={{ marginBottom: "1rem" }}>
        A demonstration by Transparent Towns
      </p>
      <h1
        className="font-display"
        style={{
          fontWeight: 560,
          fontSize: "clamp(2.1rem, 5vw, 3rem)",
          lineHeight: 1.06,
          letterSpacing: "-0.02em",
          margin: "0 0 1.2rem",
          textWrap: "balance",
        }}
      >
        What a useful Town of Paonia website could be
      </h1>

      <hr className="rule" style={{ margin: "0 0 2rem" }} />

      <div className="prose">
        <p>
          This site is a demonstration. It shows, by example, what the Town of
          Paonia&apos;s web presence could do for the people who actually use it: make
          meetings easy to find and join, make public records easy to request, and
          answer the simple question of what your town government is doing right now.
        </p>
        <p>
          It is published by Transparent Towns, and it is not the official town site.
          For official business, go to{" "}
          <a href="https://townofpaonia.colorado.gov">townofpaonia.colorado.gov</a>.
        </p>

        <h2>Here now</h2>
        <ul className="ed-list">
          <li>
            <Link href="/recall">The case for recalling Mayor Paige Smith</Link>
          </li>
        </ul>

        <h2>Coming</h2>
        <ul className="ed-list">
          <li>
            A live meeting tracker: what is scheduled, and a one-click link to join
            when a meeting is happening.
          </li>
          <li>A guided helper for filing Colorado Open Records Act (CORA) requests.</li>
        </ul>
      </div>
    </div>
  );
}
