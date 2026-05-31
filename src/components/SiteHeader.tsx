import Link from "next/link";
import { SEARCH_PUBLISHED } from "@/data/position";

export default function SiteHeader() {
  return (
    <header className="mast">
      <div className="shell mast-top">
        <Link href="/" className="mast-mark">
          <span className="gem" aria-hidden>◆</span> Transparent Towns
          <span className="mast-tag">Paonia, Colo.</span>
        </Link>
        <nav className="mast-nav">
          <Link href="/">Meetings</Link>
          <Link href="/water">Water</Link>
          <Link href="/cora">Records</Link>
          <Link href="/handbook">Handbook</Link>
          <Link href="/grants">Grant Tracker</Link>
          {SEARCH_PUBLISHED && <Link href="/administrator">The Job</Link>}
          <Link href="/recall">The Recall</Link>
        </nav>
      </div>
    </header>
  );
}
