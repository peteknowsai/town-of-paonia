import type { Metadata } from "next";
import {
  WATER,
  OFFICIAL,
  type Alert,
  type AlertKind,
  type Confidence,
  type FundingItem,
  type FundingType,
  type Kpi,
  type Source,
  type TimelineItem,
} from "@/data/water";
import WaterProjectCard from "./WaterProjectCard";
import styles from "./water.module.css";

export const metadata: Metadata = {
  title: "Paonia Water Rebuild — Tracker | Transparent Towns",
  description:
    "A plain-language dashboard of the Town of Paonia's water-system rebuild: the big projects, where each one stands, the grants and loans paying for it, and where the problems are. Published by Transparent Towns.",
};

// ---- small presentational helpers (server-rendered) ----

function ConfDot({ level }: { level: Confidence }) {
  const cls =
    level === "high" ? styles.confHigh : level === "medium" ? styles.confMedium : styles.confLow;
  const title =
    level === "high"
      ? "Well sourced"
      : level === "medium"
        ? "Reasonably sourced"
        : "Not yet confirmed";
  return <span className={`${styles.confDot} ${cls}`} title={title} aria-label={title} />;
}

function SourceLinks({ sources }: { sources: Source[] }) {
  if (!sources.length) return null;
  return (
    <div className={styles.sourceList}>
      {sources.map((s, i) => (
        <a
          key={`${s.url}-${i}`}
          className={styles.sourceLink}
          href={s.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {s.title}
          {s.date ? ` (${s.date})` : ""}
        </a>
      ))}
    </div>
  );
}

const ALERT_META: Record<AlertKind, { cls: string; chip: string; label: string }> = {
  problem: { cls: styles.alertProblem, chip: styles.alertChip, label: "Problem" },
  watch: { cls: styles.alertWatch, chip: styles.alertChip, label: "Watch" },
  success: { cls: styles.alertSuccess, chip: styles.alertChip, label: "Win" },
  info: { cls: styles.alertInfo, chip: styles.alertChip, label: "Note" },
};
const ALERT_ORDER: AlertKind[] = ["problem", "watch", "success", "info"];

function AlertCard({ a }: { a: Alert }) {
  const m = ALERT_META[a.kind];
  return (
    <div className={`${styles.alert} ${m.cls}`}>
      <span className={m.chip}>{m.label}</span>
      <p className={styles.alertTitle}>
        {a.title}
        <ConfDot level={a.confidence} />
      </p>
      <p className={styles.alertDetail}>{a.detail}</p>
      {a.date && <span className={styles.alertDate}>{a.date}</span>}
    </div>
  );
}

function KpiCard({ k }: { k: Kpi }) {
  return (
    <div className={styles.kpi}>
      <span className={styles.kpiValue}>{k.value}</span>
      <span className={styles.kpiLabel}>
        {k.label}
        <ConfDot level={k.confidence} />
      </span>
      {k.context && <span className={styles.kpiContext}>{k.context}</span>}
    </div>
  );
}

const TYPE_META: Record<FundingType, { cls: string; label: string }> = {
  grant: { cls: styles.typeGrant, label: "Grant" },
  loan: { cls: styles.typeLoan, label: "Loan" },
  match: { cls: styles.typeMatch, label: "Local match" },
  mixed: { cls: styles.typeMixed, label: "Mixed" },
  unknown: { cls: styles.typeUnknown, label: "Type unclear" },
};

function fmtMoney(n: number): string {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(n % 1_000_000 === 0 ? 0 : 1)}M`;
  if (n >= 1_000) return `$${Math.round(n / 1_000)}k`;
  return `$${n}`;
}

function FundingSection({ funding }: { funding: FundingItem[] }) {
  const sum = (t: FundingType[]) =>
    funding
      .filter((f) => t.includes(f.type) && f.amountNumeric != null)
      .reduce((acc, f) => acc + (f.amountNumeric as number), 0);

  const grantTotal = sum(["grant"]);
  const loanTotal = sum(["loan"]);
  const otherTotal = sum(["match", "mixed", "unknown"]);
  const barTotal = grantTotal + loanTotal + otherTotal;
  const knownTotal = funding.reduce((a, f) => a + (f.amountNumeric ?? 0), 0);

  // Only draw the split bar when we actually have numbers to split.
  const showBar = barTotal > 0 && funding.filter((f) => f.amountNumeric != null).length >= 2;
  const pct = (v: number) => `${(v / barTotal) * 100}%`;

  return (
    <section aria-label="Funding">
      <div className={styles.sectionHead}>
        <h2 className={styles.sectionTitle}>Where the money comes from</h2>
        {knownTotal > 0 && (
          <span className={styles.sectionAside}>{fmtMoney(knownTotal)} tracked</span>
        )}
      </div>

      {showBar && (
        <>
          <div className={styles.fundBar} role="img" aria-label="Grants versus loans">
            {grantTotal > 0 && (
              <div className={`${styles.fundBarSeg} ${styles.fundBarGrant}`} style={{ width: pct(grantTotal) }}>
                {fmtMoney(grantTotal)}
              </div>
            )}
            {loanTotal > 0 && (
              <div className={`${styles.fundBarSeg} ${styles.fundBarLoan}`} style={{ width: pct(loanTotal) }}>
                {fmtMoney(loanTotal)}
              </div>
            )}
            {otherTotal > 0 && (
              <div className={`${styles.fundBarSeg} ${styles.fundBarOther}`} style={{ width: pct(otherTotal) }}>
                {fmtMoney(otherTotal)}
              </div>
            )}
          </div>
          <div className={styles.fundLegend}>
            {grantTotal > 0 && (
              <span>
                <i className={styles.fundBarGrant} /> Grants (do not repay): {fmtMoney(grantTotal)}
              </span>
            )}
            {loanTotal > 0 && (
              <span>
                <i className={styles.fundBarLoan} /> Loans (residents repay): {fmtMoney(loanTotal)}
              </span>
            )}
            {otherTotal > 0 && (
              <span>
                <i className={styles.fundBarOther} /> Other / local match: {fmtMoney(otherTotal)}
              </span>
            )}
          </div>
        </>
      )}

      <div className={styles.fundTable}>
        {funding.map((f, i) => {
          const tm = TYPE_META[f.type];
          return (
            <div key={`${f.source}-${i}`} className={styles.fundRow}>
              <div>
                <span className={styles.fundSource}>{f.source}</span>
                {f.program && <span className={styles.fundProgram}>{f.program}</span>}
                <span className={`${styles.typeBadge} ${tm.cls}`}>{tm.label}</span>
              </div>
              <div>
                <span className={styles.fundAmount}>{f.amount || "Amount not public"}</span>
                {f.year && <span className={styles.fundProgram}>{f.year}</span>}
              </div>
              <div>
                <span className={styles.fundWhat}>
                  {f.fundsWhat} <ConfDot level={f.confidence} />
                </span>
                <SourceLinks sources={f.sources} />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function TimelineRow({ t }: { t: TimelineItem }) {
  const cls =
    t.status === "done"
      ? styles.tlDone
      : t.status === "in-progress"
        ? styles.tlInProgress
        : t.status === "planned"
          ? styles.tlPlanned
          : "";
  return (
    <li className={`${styles.tlItem} ${cls}`}>
      <span className={styles.tlDot} />
      <span className={styles.tlDate}>{t.date}</span>
      <p className={styles.tlLabel}>{t.label}</p>
      {t.detail && <p className={styles.tlDetail}>{t.detail}</p>}
    </li>
  );
}

export default function WaterPage() {
  const d = WATER;
  const alerts = [...d.alerts].sort(
    (a, b) => ALERT_ORDER.indexOf(a.kind) - ALERT_ORDER.indexOf(b.kind),
  );
  const hasData = d.projects.length > 0 || d.funding.length > 0 || d.kpis.length > 0;

  return (
    <div className={`shell ${styles.page}`}>
      <header className={styles.head}>
        <p className="eyebrow">Paonia water rebuild · tracker</p>
        <h1 className={`font-display ${styles.h1}`}>
          Rebuilding Paonia&apos;s water system
        </h1>
        {d.overview && <p className={styles.lead}>{d.overview}</p>}
        <div className={styles.metaRow}>
          <span>
            Updated <strong>{d.lastUpdated}</strong>
          </span>
          <span>Independent tracker by Transparent Towns</span>
        </div>
      </header>

      {d.vision && (
        <section className={styles.vision} aria-label="The vision">
          <p className={styles.visionLabel}>The goal</p>
          <p className={styles.visionText}>{d.vision}</p>
        </section>
      )}

      {d.approachNote && (
        <section className={styles.approach} aria-label="The approach">
          <p className={styles.approachLabel}>Holistic vision, brass tacks first</p>
          <p className={styles.approachText}>{d.approachNote}</p>
        </section>
      )}

      {!hasData && (
        <p className={styles.emptyNote}>
          This tracker is being compiled from the Town&apos;s public records,
          budgets, grant awards, and engineering reports. Project details will
          appear here as they are verified. In the meantime, the Town&apos;s
          official site is{" "}
          <a href={OFFICIAL.site} target="_blank" rel="noopener noreferrer">
            townofpaonia.colorado.gov
          </a>
          .
        </p>
      )}

      {alerts.length > 0 && (
        <section aria-label="Where it stands right now">
          <div className={styles.sectionHead}>
            <h2 className={styles.sectionTitle}>Where it stands right now</h2>
            <span className={styles.sectionAside}>Problems, watch items, and wins</span>
          </div>
          <div className={styles.alertGrid}>
            {alerts.map((a, i) => (
              <AlertCard key={`${a.title}-${i}`} a={a} />
            ))}
          </div>
        </section>
      )}

      {d.kpis.length > 0 && (
        <section aria-label="Key numbers">
          <div className={styles.sectionHead}>
            <h2 className={styles.sectionTitle}>The numbers</h2>
            <span className={styles.sectionAside}>The system at a glance</span>
          </div>
          <div className={styles.kpiGrid}>
            {d.kpis.map((k, i) => (
              <KpiCard key={`${k.label}-${i}`} k={k} />
            ))}
          </div>
        </section>
      )}

      {d.projects.length > 0 && (
        <section aria-label="The big projects">
          <div className={styles.sectionHead}>
            <h2 className={styles.sectionTitle}>The big projects</h2>
            <span className={styles.sectionAside}>
              {d.projects.length} project{d.projects.length === 1 ? "" : "s"} · tap for detail
            </span>
          </div>
          <div className={styles.projectList}>
            {d.projects.map((p) => (
              <WaterProjectCard key={p.id} project={p} />
            ))}
          </div>
        </section>
      )}

      {d.funding.length > 0 && <FundingSection funding={d.funding} />}

      {d.timeline.length > 0 && (
        <section aria-label="Timeline">
          <div className={styles.sectionHead}>
            <h2 className={styles.sectionTitle}>How it has tracked</h2>
            <span className={styles.sectionAside}>Milestones over time</span>
          </div>
          <ul className={styles.timeline}>
            {d.timeline.map((t, i) => (
              <TimelineRow key={`${t.date}-${i}`} t={t} />
            ))}
          </ul>
        </section>
      )}

      {d.openQuestions.length > 0 && (
        <section aria-label="Open questions">
          <div className={styles.sectionHead}>
            <h2 className={styles.sectionTitle}>What we don&apos;t know yet</h2>
            <span className={styles.sectionAside}>Good questions to ask the Town</span>
          </div>
          <ul className={styles.openQ}>
            {d.openQuestions.map((q, i) => (
              <li key={i}>{q}</li>
            ))}
          </ul>
        </section>
      )}

      <div className={styles.footNote}>
        <p>
          {d.dataConfidenceNote} Each item above links to its source, and a colored
          dot shows how well confirmed it is:{" "}
          <ConfDot level="high" /> well sourced, <ConfDot level="medium" /> reasonably
          sourced, <ConfDot level="low" /> not yet confirmed. The official record lives
          on the{" "}
          <a href={OFFICIAL.site} target="_blank" rel="noopener noreferrer">
            Town of Paonia website
          </a>
          .
        </p>
        {d.allSources.length > 0 && (
          <ul className={`${styles.allSources} ed-list`}>
            {d.allSources.map((s, i) => (
              <li key={`${s.url}-${i}`}>
                <a href={s.url} target="_blank" rel="noopener noreferrer">
                  {s.title}
                </a>
                {s.date ? ` — ${s.date}` : ""}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
