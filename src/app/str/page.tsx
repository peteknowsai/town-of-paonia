/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";

// The two source drafts, typeset and served from /public.
const RESIDENT_DRAFT_URL = "/str/resident-occupied-str-ordinance.pdf";
const REGISTRATION_DRAFT_URL = "/str/str-registration-ordinance.pdf";

export const metadata = {
  title: "A short-term rental rule that protects our homes | Transparent Towns",
  description:
    "Two short-term rental drafts are in front of Paonia, and they agree on more than either side expects. Here is a compromise built from that overlap: grandfather every Airbnb operating today with no time limit, stop investors from buying single-family homes to run as Airbnbs, and let residents who live here rent freely with no fees.",
};

export default function StrPage() {
  return (
    <article
      className="shell-narrow"
      style={{ paddingTop: "2rem", paddingBottom: "2.5rem" }}
    >
      <Link className="back" href="/">
        ← Dashboard
      </Link>

      <p className="eyebrow" style={{ marginBottom: "0.6rem" }}>
        Housing &middot; Short-term rentals
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
        A short-term rental rule that protects our homes
      </h1>
      <p className="byline" style={{ fontSize: "1.05rem" }}>
        Grandfather what exists, stop investors from turning houses into Airbnbs,
        and let residents who live here earn freely
      </p>

      <figure className="str-fig">
        <img
          src="/str/hero.jpg"
          alt="An editorial illustration of a modest single-family house with a large luggage tag tied around it, as if the home itself had been checked as baggage, a mesa in the distance."
          width={1536}
          height={1024}
        />
        <figcaption>
          When a house becomes lodging, it stops being a home someone can buy.
        </figcaption>
      </figure>

      <div className="callout">
        <p style={{ margin: 0 }}>
          This is <strong>not</strong> a ban on short-term rentals. Anyone running
          an Airbnb today keeps running it. Anyone who lives in Paonia can rent
          their own home, a spare room, or a backyard unit as much as they want.
        </p>
        <p style={{ margin: "0.7rem 0 0" }}>
          It draws one line: <strong>no more buying up single-family houses to run
          as full-time investor Airbnbs.</strong> That is the part that takes homes
          off the market and forces residents to bid against investors just to buy
          a place to live.
        </p>
      </div>

      <div className="prose">
        <h2>What this is</h2>
        <p>
          There are two short-term rental drafts in front of Paonia right now. One
          is a registration framework from the lodging and investor side. The other
          is the resident-occupied and grandfathered ordinance written from the
          housing-protection side. They disagree on real things. But they agree on
          more than either side expects, and this page is a compromise built on that
          overlap, plus the one line that matters most.
        </p>
        <p>
          Transparent Towns prepared it, with Pete McCarthy, as a public service. It
          is independent of the Town government and is offered as a starting point,
          not adopted policy. It supports the citizen initiative's core goal of a
          simple, proportional rule, and it shows where both sides already stand
          together.
        </p>

        <div className="doc-card">
          <p className="eyebrow" style={{ marginBottom: "0.7rem" }}>
            Read both drafts
          </p>
          <div className="cta-row">
            <a
              className="btn btn-fill"
              href={RESIDENT_DRAFT_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              The resident-occupied draft (PDF)
            </a>
            <a
              className="btn btn-outline"
              href={REGISTRATION_DRAFT_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              The registration draft (PDF)
            </a>
          </div>
          <p className="doc-note">
            The resident-occupied draft is the housing-protection ordinance: it
            frees resident hosts, grandfathers existing rentals, and stops new
            investor rentals in single-family homes. The registration draft is the
            lodging side's framework: register, meet safety standards, and pay a
            small fee. The compromise on this page is built from where the two meet.
          </p>
        </div>

        <h2>Where both drafts already agree</h2>
        <p>
          Before the disagreements, here is the common ground. Both drafts, written
          by people who start from opposite ends, land on all of this:
        </p>
        <ul className="ed-list">
          <li>
            <strong>Existing Airbnbs are grandfathered.</strong> Both let
            short-term rentals operating today keep going. Nobody gets shut down
            overnight.
          </li>
          <li>
            <strong>Grandfathered status is not transferable.</strong> Both say the
            same thing: the right belongs to the current owner, not the building.
            Sell the property and the new owner does not inherit it.
          </li>
          <li>
            <strong>Enforcement is complaint-based.</strong> Neither sends
            inspectors door to door. The Town acts on written complaints.
          </li>
          <li>
            <strong>The same penalty for operating off the books:</strong> $300 a
            day. Both drafts land on the identical number.
          </li>
          <li>
            <strong>Operators pay their taxes.</strong> Both require collecting and
            remitting the applicable lodging and sales tax.
          </li>
          <li>
            <strong>No special-use permit, no density buffers, no spacing rules.</strong>{" "}
            Both keep the process simple and by-right.
          </li>
          <li>
            <strong>The Town reviews how it is working.</strong> Both build in a
            regular public review. The investor draft does it annually, with a
            saturation check if short-term rentals pass 8 percent of housing; the
            resident draft sets a review by May 2027.
          </li>
        </ul>
        <p>
          That overlap is the foundation. The compromise keeps every bit of it.
        </p>

        <h2>The compromise</h2>
        <p>
          Here is the blended rule. It takes the shared ground above and settles the
          parts the two drafts leave open.
        </p>
        <ol className="q-list">
          <li>
            <strong>Grandfather every short-term rental operating today, with no
            time limit.</strong> If you run an Airbnb now, you keep running it. No
            sunset, no forced shutdown. This follows the investor draft, and it is
            the right call. It is more generous than the resident draft, which would
            phase out single-family investor rentals.
          </li>
          <li>
            <strong>That grandfathered status is non-transferable.</strong> It is
            yours, not the building's. When you sell, the short-term rental right
            does not go with the house. The next owner starts from the same rules as
            everyone else. Both drafts already agree on this.
          </li>
          <li>
            <strong>No new investor short-term rentals in single-family homes.</strong>{" "}
            If you do not live there, you cannot start a new Airbnb in a
            single-family house. This is the one line the whole thing is built to
            draw, and it is the part the resident draft is right about. It is what
            keeps houses on the market for people who want to live in them.
          </li>
          <li>
            <strong>Live here and rent freely, with no fees and no license.</strong>{" "}
            If a home is your principal residence (you live in it at least 183 days a
            year), you can short-term rent the house, a room, or a separate unit on
            your lot as much as you want. No registration, no permit, no fee.
          </li>
          <li>
            <strong>The backyard-unit bonus.</strong> If you live on the property and
            add an accessory dwelling unit, or, when the Town allows them, a yurt or
            similar, you can short-term rent that extra unit all you want, with no
            fees at all. This is a deliberate reward for living here: a resident on
            their own land can earn on the side, where an absentee investor cannot.
          </li>
          <li>
            <strong>New short-term rentals are still allowed in commercial and
            mixed-use zones, with a license.</strong> The line is drawn at
            single-family homes, not at short-term rentals as a business. Buy a
            property in a commercial or mixed-use zone and you can run a new
            short-term rental there, the same as the grandfathered ones, by getting
            licensed and meeting the safety standards.
          </li>
        </ol>

        <figure className="str-fig">
          <img
            src="/str/backyard.jpg"
            alt="An editorial illustration of a small lit backyard cottage beside a family home at dusk, a tree and a string of warm lights overhead."
            width={1536}
            height={1024}
          />
          <figcaption>
            Live here, and a spare room or a backyard unit is yours to rent, free.
          </figcaption>
        </figure>

        <h2>How it works in practice</h2>
        <div className="str-cases">
          <div className="str-case">
            <div className="q">You live in Paonia and rent your house when you travel</div>
            <div className="a">Rent it freely. No fee, no license.</div>
          </div>
          <div className="str-case">
            <div className="q">You live here and Airbnb a spare room or a backyard ADU</div>
            <div className="a">Rent it freely. No fee, no license.</div>
          </div>
          <div className="str-case">
            <div className="q">You already run an Airbnb in a house you do not live in</div>
            <div className="a">
              Keep running it, with no time limit. Register once. The right ends
              when you sell.
            </div>
          </div>
          <div className="str-case">
            <div className="q">You want to buy a single-family house to run as an Airbnb</div>
            <div className="a">Not allowed. This is the door the compromise closes.</div>
          </div>
          <div className="str-case">
            <div className="q">
              You want to open a new short-term rental in a commercial or mixed-use
              building
            </div>
            <div className="a">Allowed. Get licensed and meet the safety standards.</div>
          </div>
        </div>

        <h2>Why draw the line at single-family homes</h2>
        <p>
          The investor draft's own findings note that short-term rentals are still a
          small share of Paonia's roughly 943 housing units. The goal here is to keep
          it that way before it becomes a problem, not after. Every single-family
          house bought to run as a full-time Airbnb is a house a family or a local
          worker did not get to buy.
        </p>
        <p>
          The compromise does not touch the people already operating, and it does not
          touch residents earning on a home they live in. It stops the one thing that
          quietly shrinks the housing supply: investors converting houses into
          lodging.
        </p>

        <h2>The safety standards everyone keeps</h2>
        <p>
          Licensed and grandfathered rentals meet the same common-sense standards the
          investor draft already spells out: working smoke and carbon-monoxide alarms,
          a fire extinguisher near the kitchen, safe exits from each bedroom, a posted
          24-hour local contact, occupancy matched to the septic or sewer system, and
          written notice to neighbors within 300 feet. None of that is controversial.
          The compromise keeps it.
        </p>

        <h2>Common questions</h2>
        <h3>Does this shut down existing Airbnbs?</h3>
        <p>
          No. Every short-term rental operating today is grandfathered, with no time
          limit.
        </p>
        <h3>I live here. Do I have to pay or register?</h3>
        <p>
          No. If the home is your principal residence, you rent freely with no fee and
          no license, including a room or a backyard unit on your lot.
        </p>
        <h3>Can I still buy a place and run an Airbnb?</h3>
        <p>
          Yes, in a commercial or mixed-use zone, with a license. Not in a
          single-family home you do not live in.
        </p>
        <h3>What happens when a grandfathered owner sells?</h3>
        <p>
          The short-term rental right ends. It was personal to that owner. The buyer
          follows the same rules as everyone else. Both drafts already agree on this.
        </p>
        <h3>Is this anti-tourism?</h3>
        <p>
          No. It protects the people already hosting, rewards residents who host, and
          keeps short-term rentals as a business where they belong, in commercial and
          mixed-use space. It just stops houses from being bought out from under
          residents.
        </p>
      </div>

      <p className="sec-aside" style={{ marginTop: "1.6rem" }}>
        This page is general civic information, not legal advice. The compromise is
        offered for public discussion and is not adopted Town policy. Transparent
        Towns is independent of the Town of Paonia government.
      </p>
    </article>
  );
}
