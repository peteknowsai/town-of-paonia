import Link from "next/link";
import { LINKS } from "@/data/town";

// The masthead is deliberately not the site's navigation. Sections live in the
// directory on the home page and in the footer, so this bar stays the same size
// no matter how many sections the site grows. The name returns you home (to the
// directory); the one link points at the official Town site we are independent
// of.
export default function SiteHeader() {
  return (
    <header className="mast">
      <div className="shell mast-top">
        <Link href="/" className="mast-mark">
          <span className="gem" aria-hidden>
            ◆
          </span>{" "}
          Transparent Towns
          <span className="mast-tag">Paonia, Colo.</span>
        </Link>
        <a
          className="mast-official"
          href={LINKS.officialSite}
          target="_blank"
          rel="noopener noreferrer"
        >
          Official town site ↗
        </a>
      </div>
    </header>
  );
}
