import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getMeeting, kindLabel } from "@/lib/meetings";
import { ATTEND, LINKS, BODY_INFO, TOWN } from "@/data/town";

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

// Recurring agenda parts (per body) live in src/data/town.ts. They are
// explained in plain language so the official agenda is easier to read. The
// specific items for a given night live in the official agenda, which we link
// to. We never restate the agenda contents, so nothing is paraphrased.

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
  const isBoard = meeting.bodyKey === "board";
  const info = BODY_INFO[meeting.bodyKey] ?? BODY_INFO.other;

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
        <p>{info.explainer}</p>

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
            ? `At a work session the ${meeting.body} reviews what is coming up. The agenda is on the Town portal.`
            : `The official agenda lists what the ${meeting.body} will take up. It is posted on the Town portal before the meeting.`}
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
          {isBoard
            ? "Board meetings follow the same outline."
            : `${meeting.body} meetings follow a standard outline.`}{" "}
          Here is what each part means, so the official agenda is easier to read.
        </p>
        <ul className="agenda-list">
          {info.agendaParts.map((p) => (
            <li key={p.name}>
              <strong>{p.name}.</strong> {p.what}
            </li>
          ))}
        </ul>

        <h2>Have your say</h2>
        <p>
          You can speak during public comment, in person or on Zoom. You can also
          reach {isBoard ? "the Board" : `the ${meeting.body}`} year round through
          the{" "}
          <a href={LINKS.contact} target="_blank" rel="noopener noreferrer">
            Town Clerk
          </a>
          , or <Link href="/cora">request public records</Link> tied to anything{" "}
          {isBoard ? "the Board" : "this body"} decides.
        </p>
        <p className="sec-aside">
          {isBoard ? `Mayor: ${TOWN.mayor}. ` : ""}This is an independent guide;
          the official record lives on the{" "}
          <a href={meeting.eventUrl} target="_blank" rel="noopener noreferrer">
            Town portal
          </a>
          .
        </p>
      </div>
    </article>
  );
}
