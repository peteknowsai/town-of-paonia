// The site's section directory: one source of truth for the home-page tile
// grid (SectionDirectory) and the footer's section list. Adding a section means
// adding one row here; the grid reflows and the footer list grows. Nothing in
// the masthead ever has to make room, which is the whole point of the redesign.
import { SEARCH_PUBLISHED } from "./position";

export type SectionIcon =
  | "meetings"
  | "parking"
  | "water"
  | "grants"
  | "handbook"
  | "records"
  | "recall"
  | "job";

export type Section = {
  href: string;
  name: string;
  desc: string;
  icon: SectionIcon;
};

// The Town Administrator search only appears when it is published.
const JOB: Section = {
  href: "/administrator",
  name: "The Job",
  icon: "job",
  desc: "An open, public search for the next Town Administrator.",
};

export const SECTIONS: Section[] = [
  {
    href: "/",
    name: "Meetings",
    icon: "meetings",
    desc: "Agendas, live join links, and the upcoming calendar.",
  },
  {
    href: "/parking",
    name: "Parking",
    icon: "parking",
    desc: "A draft fix for the downtown parking code.",
  },
  {
    href: "/water",
    name: "Water",
    icon: "water",
    desc: "Where the town's water projects and money stand.",
  },
  {
    href: "/grants",
    name: "Grants",
    icon: "grants",
    desc: "Every grant the town is chasing, tracked in one place.",
  },
  {
    href: "/handbook",
    name: "Handbook",
    icon: "handbook",
    desc: "A model employee manual the public can read.",
  },
  {
    href: "/cora",
    name: "Records",
    icon: "records",
    desc: "Request a public record, with a ready-made template.",
  },
  ...(SEARCH_PUBLISHED ? [JOB] : []),
  {
    href: "/recall",
    name: "The Recall",
    icon: "recall",
    desc: "The effort to recall a trustee, explained.",
  },
];
