import Link from "next/link";
import { kindLabel, kindBlurb, type Meeting } from "@/lib/meetings";

// The hero: the next meeting (the next Board meeting by default, or the next of
// any body in the "all" view). The date is the visual focal point. Two big
// actions: understand the meeting, and see the agenda on the Town portal.
export default function NextMeetingHero({
  meeting,
  showBody = false,
}: {
  meeting: Meeting;
  /** Show which public body this is. Used in the "all meetings" view. */
  showBody?: boolean;
}) {
  // "Tuesday, June 2" without the year, which the context makes obvious.
  const dateNoYear = meeting.dateLabel.replace(/,\s*\d{4}$/, "");
  return (
    <section className="next" aria-label="Next meeting">
      <p className="eyebrow">Next {showBody ? "public" : "town"} meeting</p>
      {showBody && <p className="next-org">{meeting.body}</p>}
      <div className="next-row">
        <div>
          <div className="next-date font-display">{dateNoYear}</div>
          <p className="next-when">
            {meeting.timeLabel} &middot; Paonia Town Hall, 214 Grand Avenue
          </p>
        </div>
        <span className="chip chip-muted">{kindLabel(meeting.kind)}</span>
      </div>
      <p className="next-lead">{kindBlurb(meeting.kind, meeting.body)}</p>
      <div className="next-actions">
        <Link className="btn btn-fill" href={`/meetings/${meeting.id}`}>
          See what this meeting is about
        </Link>
        <a className="btn btn-outline" href={meeting.eventUrl} target="_blank" rel="noopener noreferrer">
          View the agenda
        </a>
      </div>
      {meeting.bodyKey === "board" && (
        <p className="next-foot">
          Regular meetings are the 2nd and 4th Tuesday at 6:30 PM. Work sessions
          and special meetings are added as needed.
        </p>
      )}
    </section>
  );
}
