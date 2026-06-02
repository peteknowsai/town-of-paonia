import Link from "next/link";
import { SECTIONS } from "@/data/sections";

// The footer carries the full section list, so every page has a complete,
// always-visible way to reach every other section (no hidden menu). The home
// page also shows these as the tile directory; this is the cross-page backstop.
export default function SiteFooter() {
  return (
    <footer className="site-foot">
      <div className="shell site-foot-inner">
        <nav className="foot-nav" aria-label="All sections">
          {SECTIONS.map((s) => (
            <Link key={s.href} href={s.href}>
              {s.name}
            </Link>
          ))}
        </nav>
        <p className="foot-notice">
          <span className="dot" aria-hidden>●</span>&nbsp; Published by{" "}
          <strong>Transparent Towns</strong>, an independent civic project. This is{" "}
          <strong>not the official Town of Paonia website</strong>. The Town&apos;s
          official site is{" "}
          <a href="https://townofpaonia.colorado.gov">townofpaonia.colorado.gov</a>.
        </p>
        <p style={{ margin: 0, maxWidth: "62ch" }}>
          A demonstration of what a useful town website could do for residents: track
          meetings, simplify records, and make it easy to ask questions of your
          government.
        </p>
      </div>
    </footer>
  );
}
