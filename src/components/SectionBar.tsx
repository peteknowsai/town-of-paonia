"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SECTIONS } from "@/data/sections";
import { ICONS } from "@/components/SectionIcons";

// Compact section nav shown at the top of every page EXCEPT home. Home leads
// with the full descriptive tile grid (SectionDirectory); everywhere else this
// tight, wrapping strip gives the same reach without burying the page content.
// Rendered once in the root layout, so every current and future page gets it.
export default function SectionBar() {
  const pathname = usePathname();

  // Home shows the full directory instead, so skip the bar there.
  if (pathname === "/") return null;

  return (
    <nav className="secbar" aria-label="Sections">
      <div className="shell secbar-inner">
        {SECTIONS.map((s) => {
          const current =
            s.href === pathname ||
            (s.href === "/" && pathname.startsWith("/meetings"));
          return (
            <Link
              key={s.href}
              href={s.href}
              className={current ? "is-current" : undefined}
              aria-current={current ? "page" : undefined}
            >
              <span className="secbar-ic" aria-hidden>
                {ICONS[s.icon]}
              </span>
              {s.name}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
