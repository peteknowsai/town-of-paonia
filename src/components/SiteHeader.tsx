import Link from "next/link";

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
          <Link href="/cora">Records</Link>
          <Link href="/recall">The Recall</Link>
        </nav>
      </div>
    </header>
  );
}
