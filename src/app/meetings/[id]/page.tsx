import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getMeeting, kindLabel } from "@/lib/meetings";
import { ATTEND, LINKS, BODY_EXPLAINER, TOWN } from "@/data/town";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const meeting = getMeeting(id);
  if (!meeting) return { title: "Meeting not found | Transparent Towns" };
  return {
    title: `${meeting.title}, ${meeting.dateLabel} | Transparent Towns`,
    description: `Paonia ${meeting.body} ${meeting.title.toLowerCase()} on ${meeting.dateLabel} at ${meeting.timeLabel}. How to attend, the agenda, and the minutes.`,
  };
}

// The standard order of a Board of Trustees meeting. These recurring parts are
// explained in plain language so the official agenda is easier to read. The
// specific items for a given night live in the official agenda, which we link
// to. We never restate the agenda contents, so nothing is paraphrased.
const AGENDA_PARTS = [
  {
    name: "Call to order and roll call",
    what: "The Mayor opens the meeting and the clerk notes who is present.",
  },
  {
    name: "Public comment",
    what: "Time for any resident to speak, usually a few minutes each. You do not need to be on the agenda to talk.",
  },
  {
    name: "Consent agenda",
    what: "Routine items, like prior minutes and bills, approved together in one vote unless a trustee pulls one out.",
  },
  {
    name: "Action items",
    what: "The decisions of the night: ordinances, resolutions, contracts, and spending the Board votes on.",
  },
  {
    name: "Reports",
    what: "Updates from the Mayor, staff, and town departments. Usually no vote.",
  },
  { name: "Adjournment", what: "The meeting ends." },
];

export default async function MeetingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const meeting = getMeeting(id);
  if (!meeting) notFound();

  const joinHref = ATTEND.zoomUrl ?? meeting.eventUrl;
  const when = meeting.isLive
    ? "Happening now"
    : meeting.isPast
    ? "Past meeting"
    : "Upcoming meeting";
  const isWorkSession = meeting.kind === "work-session";

  return (
    <article className="shell-narrow" style={{ paddingTop: "2rem", paddingBottom: "2.5rem" }}>
      <Link className="back" href="/">
        &larr; All meetings
      </Link>

      <p className="eyebrow" style={{ marginBottom: "0.6rem" }}>
        {when} &middot; {kindLabel(meeting.kind)}
      </p>
      <h1 className="d-h1 font-display">{meeting.body}</h1>
      <p className="d-when">
        {meeting.title} &middot; {meeting.dateLabel} &middot; {meeting.timeLabel}
      </p>

      <hr className="rule" />

      <div className="prose">
        <p>{BODY_EXPLAINER}</p>

        <h2 id="attend">How to attend</h2>
        <dl className="attend">
          <dt>In person</dt>
          <dd>{ATTEND.inPerson}. Meetings are open to the public.</dd>
          <dt>Online</dt>
          <dd>
            The Town streams meetings on Zoom and posts the join link with each
            agenda.{" "}
            <a href={joinHref} target="_blank" rel="noopener noreferrer">
              Open this meeting on the Town portal
            </a>{" "}
            for the link, agenda, and recording.
          </dd>
          {ATTEND.dialIn && (
            <>
              <dt>By phone</dt>
              <dd>
                <a href={`tel:${ATTEND.dialIn.tel}`}>{ATTEND.dialIn.display}</a>.
                You will be asked for the meeting ID, shown on the Town meeting
                page.
              </dd>
            </>
          )}
        </dl>

        <h2>The agenda</h2>
        <p>
          {meeting.isPast
            ? "This meeting has passed. The agenda, minutes, and recording are on the Town portal."
            : isWorkSession
            ? "At a work session the Board reviews what is coming up. The agenda is on the Town portal."
            : "The official agenda lists what the Board will take up. It is posted on the Town portal before the meeting."}
        </p>
        <p>
          <a
            className="btn btn-fill"
            href={meeting.eventUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{ minHeight: "52px" }}
          >
            {meeting.isPast ? "Agenda, minutes, and recording" : "Open the official agenda"}
          </a>
        </p>

        <h3>What is usually on the agenda</h3>
        <p>
          Board meetings follow the same outline. Here is what each part means, so
          the official agenda is easier to read.
        </p>
        <ul className="agenda-list">
          {AGENDA_PARTS.map((p) => (
            <li key={p.name}>
              <strong>{p.name}.</strong> {p.what}
            </li>
          ))}
        </ul>

        <h2>Have your say</h2>
        <p>
          You can speak during public comment, in person or on Zoom. You can also
          reach the Board year round through the{" "}
          <a href={LINKS.contact} target="_blank" rel="noopener noreferrer">
            Town Clerk
          </a>
          , or <Link href="/cora">request public records</Link> tied to anything
          the Board decides.
        </p>
        <p className="sec-aside">
          Mayor: {TOWN.mayor}. This is an independent guide; the official record
          lives on the{" "}
          <a href={meeting.eventUrl} target="_blank" rel="noopener noreferrer">
            Town portal
          </a>
          .
        </p>
      </div>
    </article>
  );
}
