"use client";

import { useState } from "react";
import type { WaterProject, ProjectStatus, Source } from "@/data/water";
import styles from "./water.module.css";

// The canonical pipeline every project moves through. The stepper shows where a
// given project sits, derived from its status. Granular statuses (bidding,
// nearly complete) collapse onto the nearest node so the picture stays simple.
const STAGES = ["Planning", "Design", "Funded", "Building", "Complete"] as const;

interface StatusMeta {
  label: string;
  badgeClass: string;
  /** Index into STAGES, or null when there is no meaningful stage to show. */
  stageIndex: number | null;
  stalled: boolean;
}

function statusMeta(status: ProjectStatus): StatusMeta {
  switch (status) {
    case "planning":
      return { label: "Planning", badgeClass: styles.stPlanning, stageIndex: 0, stalled: false };
    case "design":
      return { label: "In design", badgeClass: styles.stDesign, stageIndex: 1, stalled: false };
    case "funded":
      return { label: "Funded", badgeClass: styles.stFunded, stageIndex: 2, stalled: false };
    case "bidding":
      return { label: "Out to bid", badgeClass: styles.stBidding, stageIndex: 2, stalled: false };
    case "construction":
      return { label: "Under construction", badgeClass: styles.stConstruction, stageIndex: 3, stalled: false };
    case "substantially-complete":
      return { label: "Nearly complete", badgeClass: styles.stNearly, stageIndex: 3, stalled: false };
    case "complete":
      return { label: "Complete", badgeClass: styles.stComplete, stageIndex: 4, stalled: false };
    case "stalled":
      return { label: "Stalled", badgeClass: styles.stStalled, stageIndex: null, stalled: true };
    default:
      return { label: "Status unclear", badgeClass: styles.stUnknown, stageIndex: null, stalled: false };
  }
}

function ConfDot({ level }: { level: "high" | "medium" | "low" }) {
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

function Stepper({ stageIndex, stalled }: { stageIndex: number; stalled: boolean }) {
  return (
    <div
      className={`${styles.stepper} ${stalled ? styles.stepperStalled : ""}`}
      role="img"
      aria-label={`Stage: ${STAGES[stageIndex]} (${stageIndex + 1} of ${STAGES.length})`}
    >
      {STAGES.map((label, i) => {
        const state =
          i < stageIndex ? styles.stepDone : i === stageIndex ? styles.stepActive : "";
        return (
          <div key={label} className={`${styles.step} ${state}`}>
            <span className={styles.stepDot} />
            <span className={styles.stepLabel}>{label}</span>
          </div>
        );
      })}
    </div>
  );
}

export default function WaterProjectCard({ project }: { project: WaterProject }) {
  const [open, setOpen] = useState(false);
  const meta = statusMeta(project.status);
  const detailId = `proj-detail-${project.id}`;

  const hasDetail =
    !!project.whatItIs ||
    !!project.scope ||
    !!project.detail ||
    project.funding.length > 0 ||
    project.sources.length > 0;

  return (
    <article id={project.id} className={styles.project}>
      <div className={styles.projectInner}>
        <div className={styles.projectTop}>
          <div>
            <h3 className={styles.projectName}>
              {project.name}
              <ConfDot level={project.confidence} />
            </h3>
            <p className={styles.projectSummary}>{project.summary}</p>
          </div>
          <span className={`${styles.badge} ${meta.badgeClass}`}>{meta.label}</span>
        </div>

        {project.statusNote && <p className={styles.statusNote}>{project.statusNote}</p>}

        {meta.stageIndex !== null && (
          <Stepper stageIndex={meta.stageIndex} stalled={meta.stalled} />
        )}

        {(project.targetDate || project.percentComplete !== null || project.funding.length > 0) && (
          <div className={styles.projectMeta}>
            {project.percentComplete !== null && (
              <span className={styles.metaItem}>
                <span className={styles.metaKey}>Progress</span>
                <span className={styles.metaVal}>{project.percentComplete}% complete</span>
              </span>
            )}
            {project.startDate && (
              <span className={styles.metaItem}>
                <span className={styles.metaKey}>Started</span>
                <span className={styles.metaVal}>{project.startDate}</span>
              </span>
            )}
            {project.targetDate && (
              <span className={styles.metaItem}>
                <span className={styles.metaKey}>Target</span>
                <span className={styles.metaVal}>{project.targetDate}</span>
              </span>
            )}
            {project.funding.length > 0 && (
              <span className={styles.metaItem}>
                <span className={styles.metaKey}>Funding</span>
                <span className={styles.metaVal}>
                  {project.funding
                    .map((f) => f.amount || f.source)
                    .filter(Boolean)
                    .join(" · ")}
                </span>
              </span>
            )}
          </div>
        )}

        {hasDetail && (
          <button
            className={`${styles.toggle} ${open ? styles.toggleOpen : ""}`}
            aria-expanded={open}
            aria-controls={detailId}
            onClick={() => setOpen((v) => !v)}
          >
            <span className={styles.toggleCaret} aria-hidden>
              ▸
            </span>
            {open ? "Less detail" : "More detail"}
          </button>
        )}

        {hasDetail && open && (
          <div id={detailId} className={styles.detail}>
            {project.whatItIs && (
              <div className={styles.detailBlock}>
                <p className={styles.detailKey}>What it is</p>
                <p className={styles.detailText}>{project.whatItIs}</p>
              </div>
            )}
            {project.scope && (
              <div className={styles.detailBlock}>
                <p className={styles.detailKey}>Scope</p>
                <p className={styles.detailText}>{project.scope}</p>
              </div>
            )}
            <div className={styles.detailBlock}>
              <p className={styles.detailKey}>Why it matters</p>
              <p className={styles.detailText}>{project.whyItMatters}</p>
            </div>
            {project.detail && (
              <div className={styles.detailBlock}>
                <p className={styles.detailKey}>More</p>
                <p className={styles.detailText}>{project.detail}</p>
              </div>
            )}
            {project.funding.length > 0 && (
              <div className={styles.detailBlock}>
                <p className={styles.detailKey}>Funding</p>
                <ul className={styles.fundingMini}>
                  {project.funding.map((f, i) => (
                    <li key={`${f.source}-${i}`}>
                      <span>
                        {f.source}
                        {f.type ? ` · ${f.type}` : ""}
                      </span>
                      {f.amount && <span className={styles.fAmt}>{f.amount}</span>}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {project.sources.length > 0 && (
              <div className={styles.detailBlock}>
                <p className={styles.detailKey}>Sources</p>
                <SourceLinks sources={project.sources} />
              </div>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
