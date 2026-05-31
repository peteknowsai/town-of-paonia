import type { Metadata } from "next";
import GrantDashboard from "@/components/GrantDashboard";
import { GRANTS, OPPORTUNITIES, todayKey } from "@/lib/grants";

export const metadata: Metadata = {
  title: "Grant Tracker for the Town of Paonia | Transparent Towns",
  description:
    "Follow the grant money: what the Town of Paonia has secured, what is in progress, and what it could pursue. A plain-language tracker for residents, published by Transparent Towns.",
};

// Render per request so "coming up" deadlines and the recent-award window are
// computed against the current date, not frozen at build time.
export const dynamic = "force-dynamic";

export default function GrantsPage() {
  const asOf = todayKey();
  return (
    <div className="shell" style={{ paddingTop: "2.5rem", paddingBottom: "2rem" }}>
      <div className="shell-narrow" style={{ padding: 0 }}>
        <p className="eyebrow" style={{ marginBottom: "1rem" }}>
          Following the money · 2026
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
          Paonia&apos;s grants: what is working, what is coming, what is possible
        </h1>
        <hr className="rule" style={{ margin: "0 0 1.6rem" }} />
        <div className="prose" style={{ marginBottom: "2.4rem" }}>
          <p>
            Small towns run on grants. Water lines, parks, street paving, fire
            equipment, the farms and the arts scene that make this place what it
            is. Much of it is paid for with money won from state and federal
            programs, not local taxes. But that money is hard to follow. It
            surfaces in the middle of council minutes and disappears into budget
            line items.
          </p>
          <p>
            This tracker keeps it current: the grant dollars at work in Paonia
            right now, what the town is waiting to hear on, the deadlines coming
            up, and the programs the whole community could go after next, from
            water and streets to local food, the river, and the Creative
            District. It is built for residents, not staff. Every figure links
            back to a source. Published by Transparent Towns; not the official
            town site.
          </p>
        </div>
      </div>

      <GrantDashboard grants={GRANTS} opportunities={OPPORTUNITIES} asOf={asOf} />

      <div className="shell-narrow" style={{ padding: 0, marginTop: "3rem" }}>
        <hr className="rule" style={{ margin: "0 0 1.4rem" }} />
        <p className="byline">
          How this is built: grants are compiled by hand from Town of Paonia
          council minutes and agendas, the Colorado Department of Local Affairs
          (DOLA), Great Outdoors Colorado (GOCO), CDOT, History Colorado, and
          federal award records. It is a curated snapshot, updated as new awards
          appear, not a live government feed. Spot something missing or wrong?
          That is exactly the kind of thing a town site should make easy to
          flag.
        </p>
      </div>
    </div>
  );
}
