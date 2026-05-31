import { getSchedule } from "@/lib/meetings";
import { LINKS } from "@/data/town";
import { SEARCH_PUBLISHED } from "@/data/position";
import LiveBanner from "@/components/LiveBanner";
import NextMeetingHero from "@/components/NextMeetingHero";
import MeetingRow from "@/components/MeetingRow";

// Rendered fresh each request so "happening now" and "next" are always current.
export const dynamic = "force-dynamic";

export default function HomePage() {
  const { live, next, upcoming, recent } = getSchedule();
  const moreUpcoming = upcoming.filter((m) => m.id !== next?.id).slice(0, 4);
  const recentFew = recent.slice(0, 4);

  return (
    <div className="shell-narrow" style={{ paddingTop: "2rem", paddingBottom: "2.5rem" }}>
      <p className="eyebrow">What is happening in Paonia</p>
      <h1 className="title-h1 font-display">Paonia town meetings</h1>
      <p className="title-sub">
        Upcoming meetings, how to take part, and where to read the agendas and
        notes.
      </p>
      <hr className="rule" />

      {live && <LiveBanner meeting={live} />}
      {next && <NextMeetingHero meeting={next} />}

      {moreUpcoming.length > 0 && (
        <section className="sec" aria-label="More upcoming meetings">
          <h2 className="sec-h">Upcoming meetings</h2>
          <ul className="mlist">
            {moreUpcoming.map((m) => (
              <MeetingRow key={m.id} meeting={m} variant="upcoming" />
            ))}
          </ul>
          <p className="sec-aside">
            Full calendar on the{" "}
            <a href={LINKS.agendaPortal} target="_blank" rel="noopener noreferrer">
              Town meeting portal &rarr;
            </a>
          </p>
        </section>
      )}

      {recentFew.length > 0 && (
        <section className="sec" aria-label="Recent meetings">
          <h2 className="sec-h">Recent meetings</h2>
          <ul className="mlist">
            {recentFew.map((m) => (
              <MeetingRow key={m.id} meeting={m} variant="recent" />
            ))}
          </ul>
          <p className="sec-aside">
            Older meetings and recordings on the{" "}
            <a href={LINKS.agendaPortal} target="_blank" rel="noopener noreferrer">
              Town meeting portal &rarr;
            </a>
          </p>
        </section>
      )}

      <section className="sec" aria-label="Common tasks">
        <h2 className="sec-h">Other things you can do</h2>
        <div className="actions">
          <a className="acard" href="/handbook">
            <span className="ac-t">Read the employee handbook</span>
            <span className="ac-s">A free, Colorado-specific model manual, open for comment.</span>
          </a>
          {SEARCH_PUBLISHED && (
            <a className="acard" href="/administrator">
              <span className="ac-t">Help find the next administrator</span>
              <span className="ac-s">An open, public search. See the job and raise your hand.</span>
            </a>
          )}
          <a className="acard" href="/cora">
            <span className="ac-t">Ask for a record</span>
            <span className="ac-s">A guided CORA request, with a template.</span>
          </a>
          <a className="acard" href={LINKS.officialSite} target="_blank" rel="noopener noreferrer">
            <span className="ac-t">Town news &amp; alerts</span>
            <span className="ac-s">On the official Town site.</span>
          </a>
          <a className="acard" href={LINKS.contact} target="_blank" rel="noopener noreferrer">
            <span className="ac-t">Contact the Town</span>
            <span className="ac-s">Phone, email, office hours.</span>
          </a>
        </div>
      </section>
    </div>
  );
}
