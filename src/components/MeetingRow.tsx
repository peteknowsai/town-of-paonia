import Link from "next/link";
import { kindLabel, type Meeting } from "@/lib/meetings";

// A departures-board row: a stacked date block, the meeting title, and a status
// line or document link. Upcoming rows are a single tappable link to the detail
// page. Recent rows add a sibling link to the Town portal (agenda, minutes,
// recording), never nested inside the row link, so the markup stays accessible.
export default function MeetingRow({
  meeting,
  variant = "upcoming",
  showBody = false,
}: {
  meeting: Meeting;
  variant?: "upcoming" | "recent";
  /** Label the row with its public body. Used in the "all meetings" view. */
  showBody?: boolean;
}) {
  const dateBlock = (
    <span className="dateblock" aria-hidden>
      <span className="mo">{meeting.month}</span>
      <span className="dy">{meeting.day}</span>
    </span>
  );
  const org = showBody ? <span className="mb-org">{meeting.body}</span> : null;

  if (variant === "recent") {
    return (
      <li className="mrow">
        <Link className="mrow-link" href={`/meetings/${meeting.id}`}>
          {dateBlock}
          <span className="mrow-body">
            {org}
            <span className="mb-name">{meeting.title}</span>
            <span className="mb-status">{meeting.timeLabel}</span>
          </span>
        </Link>
        <span className="mrow-pills">
          <a className="pill" href={meeting.eventUrl} target="_blank" rel="noopener noreferrer">
            Agenda &amp; notes
          </a>
        </span>
      </li>
    );
  }

  return (
    <li className="mrow">
      <Link className="mrow-link" href={`/meetings/${meeting.id}`}>
        {dateBlock}
        <span className="mrow-body">
          {org}
          <span className="mb-name">{meeting.title}</span>
          <span className="mb-status">
            {meeting.timeLabel} &middot; {kindLabel(meeting.kind)}
          </span>
        </span>
        <span className="mrow-chev" aria-hidden>
          &rsaquo;
        </span>
      </Link>
    </li>
  );
}
