import Link from "next/link";
import { ATTEND } from "@/data/town";
import { type Meeting } from "@/lib/meetings";

// Shown only when a Board meeting is in progress. The one saturated block on the
// page: a resident lands and gets toward the meeting in one tap. The join button
// goes to the meeting's portal page (with the live video link and agenda) unless
// a standing Zoom URL is configured, in which case it joins directly.
export default function LiveBanner({ meeting }: { meeting: Meeting }) {
  const joinHref = ATTEND.zoomUrl ?? meeting.eventUrl;
  const direct = Boolean(ATTEND.zoomUrl);
  return (
    <section className="live" aria-label="Meeting happening now">
      <p className="live-flag">
        <span className="live-dot" aria-hidden /> A meeting is happening now
      </p>
      <h2 className="live-title font-display">The {meeting.body} is meeting</h2>
      <p className="live-sub">
        {meeting.title}. Started {meeting.timeLabel} at Town Hall.
      </p>

      <a className="btn-join" href={joinHref} target="_blank" rel="noopener noreferrer">
        {direct ? "Join the meeting online" : "Open the live meeting page"}
      </a>
      {!direct && (
        <p className="live-help">
          This opens the Town meeting page, where the live video link is posted.
        </p>
      )}

      {ATTEND.dialIn && (
        <>
          <a className="btn-call" href={`tel:${ATTEND.dialIn.tel}`}>
            Or call in: {ATTEND.dialIn.display}
          </a>
          <p className="live-help">
            You will be asked for the meeting ID, shown on the Town meeting page.
          </p>
        </>
      )}

      <p className="live-reassure">Watching is free. You do not have to speak.</p>
      <Link className="live-link" href={`/meetings/${meeting.id}`}>
        See what this meeting is about
      </Link>
    </section>
  );
}
