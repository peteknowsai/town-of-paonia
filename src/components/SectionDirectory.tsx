import Link from "next/link";
import { SECTIONS } from "@/data/sections";
import { ICONS } from "@/components/SectionIcons";

// The home-page section directory. Pass the current pathname to mark the tile
// you are on. Renders its own wide shell so it can sit above the narrower
// reading column.
export default function SectionDirectory({
  currentPath,
}: {
  currentPath?: string;
}) {
  return (
    <nav className="dir" aria-label="Browse the site">
      {SECTIONS.map((s) => {
        const current = s.href === currentPath;
        return (
          <Link
            key={s.href}
            href={s.href}
            className={`dir-tile${current ? " is-current" : ""}`}
            aria-current={current ? "page" : undefined}
          >
            <span className="dir-ic" aria-hidden>
              {ICONS[s.icon]}
            </span>
            <span className="dir-name">
              {s.name}
              {current && <span className="dir-cur">You are here</span>}
            </span>
            <span className="dir-desc">{s.desc}</span>
          </Link>
        );
      })}
    </nav>
  );
}
