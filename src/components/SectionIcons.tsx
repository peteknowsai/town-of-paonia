import type { ReactNode } from "react";
import type { SectionIcon } from "@/data/sections";

// Single-stroke line icons, one per section. They render with currentColor and
// inherit stroke settings from the .dir-ic / .secbar svg rules, so the same set
// works in both the home tile grid and the compact section bar.
export const ICONS: Record<SectionIcon, ReactNode> = {
  meetings: (
    <svg viewBox="0 0 24 24">
      <rect x="3" y="4" width="18" height="17" rx="1.5" />
      <line x1="3" y1="9" x2="21" y2="9" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="16" y1="2" x2="16" y2="6" />
    </svg>
  ),
  parking: (
    <svg viewBox="0 0 24 24">
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <path d="M9 17V8h3.5a2.5 2.5 0 0 1 0 5H9" />
    </svg>
  ),
  water: (
    <svg viewBox="0 0 24 24">
      <path d="M12 3s-6.5 7.2-6.5 11a6.5 6.5 0 0 0 13 0C18.5 10.2 12 3 12 3Z" />
    </svg>
  ),
  grants: (
    <svg viewBox="0 0 24 24">
      <rect x="2.5" y="6" width="19" height="12" rx="1.5" />
      <circle cx="12" cy="12" r="2.6" />
      <line x1="6" y1="12" x2="6.01" y2="12" />
      <line x1="18" y1="12" x2="18.01" y2="12" />
    </svg>
  ),
  handbook: (
    <svg viewBox="0 0 24 24">
      <path d="M12 6C10 4.6 6.5 4.6 4 5.2V19c2.5-.6 6-.6 8 .8 2-1.4 5.5-1.4 8-.8V5.2C17.5 4.6 14 4.6 12 6Z" />
      <line x1="12" y1="6" x2="12" y2="19.8" />
    </svg>
  ),
  records: (
    <svg viewBox="0 0 24 24">
      <path d="M6 3h8l5 5v13H6Z" />
      <path d="M14 3v5h5" />
      <line x1="9" y1="13" x2="16" y2="13" />
      <line x1="9" y1="16.5" x2="16" y2="16.5" />
    </svg>
  ),
  recall: (
    <svg viewBox="0 0 24 24">
      <path d="M4 10v4h3l8 4V6l-8 4H4Z" />
      <path d="M18 9.5a4 4 0 0 1 0 5" />
    </svg>
  ),
  job: (
    <svg viewBox="0 0 24 24">
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20a7 7 0 0 1 14 0" />
    </svg>
  ),
};
