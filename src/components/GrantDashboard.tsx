"use client";

import { useMemo, useState } from "react";
import {
  APPLICANT_META,
  CATEGORIES,
  STATUS_META,
  computeStats,
  formatUSD,
  formatUSDFull,
  isMunicipal,
  isPending,
  parseDeadline,
  upcomingOpportunities,
  type Applicant,
  type Grant,
  type GrantCategory,
  type Opportunity,
} from "@/lib/grants";

export default function GrantDashboard({
  grants,
  opportunities,
  asOf,
}: {
  grants: Grant[];
  opportunities: Opportunity[];
  // Today as a YYYYMMDD key, computed at request time and passed in so the
  // forward-looking buckets are consistent between server and client renders.
  asOf: number;
}) {
  const {
    community,
    inMotion,
    pending,
    trackRecord,
    stats,
    inMotionTotal,
  } = useMemo(() => {
    // "In motion" = grants actively being spent, plus awards won in roughly the
    // last two years. Older awards drop into the track record so the top of the
    // page stays about what is happening now, not a 2019 win shown as active.
    const recentAwardFrom = Math.floor(asOf / 10000) - 2;
    const isRecentAward = (g: Grant) =>
      g.status === "awarded" && g.year != null && g.year >= recentAwardFrom;

    const municipal = grants.filter(isMunicipal);
    const community = grants.filter((g) => !isMunicipal(g));
    const inMotion = municipal
      .filter((g) => g.status === "in-progress" || isRecentAward(g))
      .sort((a, b) => (b.amount ?? 0) - (a.amount ?? 0));
    const pending = municipal.filter(isPending);
    const trackRecord = municipal
      .filter(
        (g) =>
          g.status === "completed" ||
          (g.status === "awarded" && !isRecentAward(g))
      )
      .sort((a, b) => (b.year ?? 0) - (a.year ?? 0));
    return {
      community,
      inMotion,
      pending,
      trackRecord,
      stats: computeStats(municipal),
      inMotionTotal: inMotion.reduce((s, g) => s + (g.amount ?? 0), 0),
    };
  }, [grants, asOf]);

  const upcoming = useMemo(
    () => upcomingOpportunities(opportunities, asOf),
    [opportunities, asOf]
  );

  const empty = grants.length === 0 && opportunities.length === 0;

  return (
    <div className="gp">
      {/* Headline numbers, forward-leaning */}
      <div className="gp-stats">
        <Stat
          big={formatUSD(inMotionTotal)}
          label="Grant money in motion"
          sub={`${inMotion.length} grant${inMotion.length === 1 ? "" : "s"} active right now`}
        />
        <Stat
          big={
            stats.pendingAmount > 0
              ? formatUSD(stats.pendingAmount)
              : String(pending.length)
          }
          label="On the plate"
          sub={
            pending.length
              ? stats.pendingAmount > 0
                ? `${pending.length} application${pending.length === 1 ? "" : "s"} awaiting word`
                : `application${pending.length === 1 ? "" : "s"} awaiting word · amount not yet public`
              : "no pending applications"
          }
        />
        <Stat
          big={String(opportunities.length)}
          label="Could pursue"
          sub={
            upcoming.length
              ? `community programs · ${upcoming.length} with a date coming up`
              : "community programs Paonia is eligible for"
          }
        />
        <Stat
          big={formatUSD(stats.totalReceived)}
          label="Secured to date"
          sub={
            stats.span
              ? `${stats.receivedCount} grants since ${stats.span.from}`
              : `${stats.receivedCount} grants on record`
          }
        />
      </div>

      {empty && (
        <p className="gp-empty">
          Grant data is being compiled and fact-checked from town council
          minutes and state and federal sources. Check back shortly.
        </p>
      )}

      {/* 1. In motion now */}
      {inMotion.length > 0 && (
        <section className="gp-section">
          <h2 className="gp-h2">In motion now</h2>
          <p className="gp-section-note">
            Grant money Paonia has secured and is actively putting to work.
          </p>
          <div className="gp-grid">
            {inMotion.map((g) => (
              <GrantCard key={g.id} g={g} />
            ))}
          </div>
        </section>
      )}

      {/* 2. On the plate (pending) */}
      {pending.length > 0 && (
        <section className="gp-section">
          <h2 className="gp-h2">On the plate</h2>
          <p className="gp-section-note">
            Applications filed and awaiting a decision.
          </p>
          <div className="gp-grid">
            {pending.map((g) => (
              <GrantCard key={g.id} g={g} />
            ))}
          </div>
        </section>
      )}

      {/* 3. Coming up: deadline calendar */}
      {upcoming.length > 0 && (
        <section className="gp-section">
          <h2 className="gp-h2">Coming up</h2>
          <p className="gp-section-note">
            Programs with a deadline or application window opening ahead, soonest
            first. A map of what the town and its partners could go after next.
          </p>
          <ol className="gp-timeline">
            {upcoming.map(({ opp }) => (
              <li key={opp.id} className="gp-tl-row">
                <span
                  className="gp-tl-date"
                  style={{ borderColor: CATEGORIES[opp.category].color }}
                >
                  {opp.nextDeadline}
                </span>
                <span className="gp-tl-body">
                  <span className="gp-tl-name">
                    {opp.link ? (
                      <a href={opp.link} target="_blank" rel="noopener noreferrer">
                        {opp.name}
                      </a>
                    ) : (
                      opp.name
                    )}
                  </span>
                  <span className="gp-tl-meta">
                    {opp.funder} · {APPLICANT_META[opp.eligibleApplicant].short}
                    {opp.awardRange ? ` · ${opp.awardRange}` : ""}
                  </span>
                </span>
              </li>
            ))}
          </ol>
        </section>
      )}

      {/* 4. What Paonia could pursue: community-aligned, filterable */}
      {opportunities.length > 0 && (
        <OpportunityExplorer opportunities={opportunities} />
      )}

      {/* 5. Track record: de-emphasized, collapsible */}
      {(trackRecord.length > 0 || stats.byCategory.length > 0 || community.length > 0) && (
        <TrackRecord
          trackRecord={trackRecord}
          community={community}
          stats={stats}
        />
      )}
    </div>
  );
}

function OpportunityExplorer({
  opportunities,
}: {
  opportunities: Opportunity[];
}) {
  const [category, setCategory] = useState<GrantCategory | "all">("all");
  const [applicant, setApplicant] = useState<Applicant | "all">("all");

  const usedCategories = useMemo(
    () => new Set(opportunities.map((o) => o.category)),
    [opportunities]
  );
  const usedApplicants = useMemo(
    () => new Set(opportunities.map((o) => o.eligibleApplicant)),
    [opportunities]
  );

  const shown = opportunities.filter(
    (o) =>
      (category === "all" || o.category === category) &&
      (applicant === "all" || o.eligibleApplicant === applicant)
  );

  return (
    <section className="gp-section">
      <div className="gp-section-head">
        <h2 className="gp-h2">What Paonia could pursue</h2>
      </div>
      <p className="gp-section-note">
        Open and recurring programs a Paonia-community applicant is eligible for,
        chosen for fit with the town&apos;s farms, arts, river, Main Street, and
        coal-transition status. This is a map of what is out there, not a list
        of applications the town has filed.
      </p>
      <div className="gp-controls gp-controls-stack">
        <div className="gp-filters">
          <Chip active={category === "all"} onClick={() => setCategory("all")}>
            All themes
          </Chip>
          {(Object.keys(CATEGORIES) as GrantCategory[])
            .filter((c) => usedCategories.has(c))
            .map((c) => (
              <Chip
                key={c}
                active={category === c}
                color={CATEGORIES[c].color}
                onClick={() => setCategory(category === c ? "all" : c)}
              >
                {CATEGORIES[c].short}
              </Chip>
            ))}
        </div>
        <div className="gp-filters">
          <Chip active={applicant === "all"} onClick={() => setApplicant("all")}>
            Anyone
          </Chip>
          {(Object.keys(APPLICANT_META) as Applicant[])
            .filter((a) => usedApplicants.has(a))
            .map((a) => (
              <Chip
                key={a}
                active={applicant === a}
                onClick={() => setApplicant(applicant === a ? "all" : a)}
              >
                {APPLICANT_META[a].short}
              </Chip>
            ))}
        </div>
      </div>
      <div className="gp-grid">
        {shown.map((o) => (
          <OpportunityCard key={o.id} o={o} />
        ))}
      </div>
    </section>
  );
}

function TrackRecord({
  trackRecord,
  community,
  stats,
}: {
  trackRecord: Grant[];
  community: Grant[];
  stats: ReturnType<typeof computeStats>;
}) {
  const maxCat = stats.byCategory[0]?.total ?? 0;
  return (
    <details className="gp-details">
      <summary className="gp-summary">
        <span className="gp-h2" style={{ border: "none", padding: 0, margin: 0 }}>
          Track record &amp; where the money has gone
        </span>
        <span className="gp-summary-hint">
          {formatUSD(stats.totalReceived)} across {stats.receivedCount} grants, tap to open
        </span>
      </summary>

      {stats.byCategory.length > 0 && (
        <div className="gp-bars" style={{ marginTop: "1.2rem" }}>
          {stats.byCategory.map((c) => (
            <div key={c.category} className="gp-bar-row gp-bar-static">
              <span className="gp-bar-label">
                <span
                  className="gp-dot"
                  style={{ background: CATEGORIES[c.category].color }}
                  aria-hidden
                />
                {CATEGORIES[c.category].label}
              </span>
              <span className="gp-bar-track">
                <span
                  className="gp-bar-fill"
                  style={{
                    width: `${maxCat ? (c.total / maxCat) * 100 : 0}%`,
                    background: CATEGORIES[c.category].color,
                  }}
                />
              </span>
              <span className="gp-bar-amt">{formatUSD(c.total)}</span>
            </div>
          ))}
        </div>
      )}

      {trackRecord.length > 0 && (
        <div className="gp-grid" style={{ marginTop: "1.4rem" }}>
          {trackRecord.map((g) => (
            <GrantCard key={g.id} g={g} />
          ))}
        </div>
      )}

      {community.length > 0 && (
        <>
          <h3 className="gp-sub-h">Grants to Paonia organizations</h3>
          <p className="gp-section-note">
            Won by local nonprofits, not the Town. Counted separately. They are
            community money, but not town money.
          </p>
          <div className="gp-grid">
            {community.map((g) => (
              <GrantCard key={g.id} g={g} />
            ))}
          </div>
        </>
      )}
    </details>
  );
}

function Stat({ big, label, sub }: { big: string; label: string; sub: string }) {
  return (
    <div className="gp-stat">
      <div className="gp-stat-big font-display">{big}</div>
      <div className="gp-stat-label">{label}</div>
      <div className="gp-stat-sub">{sub}</div>
    </div>
  );
}

function Chip({
  active,
  color,
  onClick,
  children,
}: {
  active: boolean;
  color?: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      className={`gp-chip${active ? " is-active" : ""}`}
      onClick={onClick}
      // Active chips use a dark background with light text (set in CSS). Tint
      // only the border with the category color so the label keeps full
      // contrast instead of dark-color-on-dark.
      style={active && color ? { borderColor: color } : undefined}
    >
      {children}
    </button>
  );
}

function GrantCard({ g }: { g: Grant }) {
  const cat = CATEGORIES[g.category];
  const status = STATUS_META[g.status];
  return (
    <article className="gp-card">
      <div className="gp-card-top">
        <span className="gp-tag" style={{ borderColor: cat.color, color: cat.color }}>
          <span className="gp-dot" style={{ background: cat.color }} aria-hidden />
          {cat.label}
        </span>
        <span className={`gp-status gp-status-${status.tone}`}>{status.label}</span>
      </div>
      <div className="gp-card-amt font-display">
        {g.amountLabel ?? formatUSDFull(g.amount)}
      </div>
      <h3 className="gp-card-title">{g.name}</h3>
      <p className="gp-card-meta">
        {g.recipient && g.isMunicipal === false ? `${g.recipient} · ` : ""}
        {g.funder}
        {g.year ? ` · ${g.year}` : ""}
      </p>
      <p className="gp-card-purpose">{g.purpose}</p>
      {(g.source || g.notes) && (
        <p className="gp-card-foot">
          {g.notes && <span className="gp-note">{g.notes} </span>}
          {g.source && (
            <a href={g.source} target="_blank" rel="noopener noreferrer">
              {g.sourceLabel ?? "Source"}
            </a>
          )}
        </p>
      )}
    </article>
  );
}

function OpportunityCard({ o }: { o: Opportunity }) {
  const cat = CATEGORIES[o.category];
  const dl = parseDeadline(o.nextDeadline);
  return (
    <article className="gp-card gp-card-opp">
      <div className="gp-card-top">
        <span className="gp-tag" style={{ borderColor: cat.color, color: cat.color }}>
          <span className="gp-dot" style={{ background: cat.color }} aria-hidden />
          {cat.label}
        </span>
        <span className={`gp-status ${dl.rolling ? "gp-status-active" : "gp-status-pending"}`}>
          {o.nextDeadline ? (dl.rolling ? "Rolling" : o.nextDeadline) : "TBD"}
        </span>
      </div>
      <div className="gp-card-amt gp-card-amt-range font-display">{o.awardRange}</div>
      <h3 className="gp-card-title">{o.name}</h3>
      <p className="gp-card-meta">
        {o.funder}
        {o.cycle ? ` · ${o.cycle}` : ""}
      </p>
      <p className="gp-card-purpose">{o.funds}</p>
      <p className="gp-card-fit">
        <strong>Why it fits Paonia:</strong> {o.fit}
      </p>
      <div className="gp-card-badges">
        <span className="gp-badge">{APPLICANT_META[o.eligibleApplicant].label}</span>
        {o.communityTheme && <span className="gp-badge gp-badge-soft">{o.communityTheme}</span>}
      </div>
      {o.link && (
        <p className="gp-card-foot">
          <a href={o.link} target="_blank" rel="noopener noreferrer">
            Program details
          </a>
        </p>
      )}
    </article>
  );
}
