"use client";

import { useEffect, useState } from "react";

type Day = { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 };

const GITHUB_USERNAME = "A-verse";

function useGitHubContributions() {
  const [days, setDays] = useState<Day[] | null>(null);
  const [total, setTotal] = useState<number | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch(
      `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`,
    )
      .then((res) => {
        if (!res.ok) throw new Error("bad response");
        return res.json();
      })
      .then((data) => {
        if (cancelled) return;
        const contributions: Day[] = data.contributions ?? [];
        setDays(contributions.slice(-371));
        const totals = data.total ?? {};
        const sum = Object.values(totals).reduce(
          (a: number, b) => a + (Number(b) || 0),
          0,
        );
        setTotal(sum);
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return { days, total, failed };
}

/** Full section — used on the About page. */
export function GitHubActivity() {
  const { days, total, failed } = useGitHubContributions();
  if (failed) return null;

  const weeks: Day[][] = [];
  if (days) {
    for (let i = 0; i < days.length; i += 7) weeks.push(days.slice(i, i + 7));
  }

  return (
    <section className="gh-activity">
      <p className="eyebrow">MY CODE JOURNEY</p>
      <h2 className="gh-activity-title">
        GitHub Activity <em>&amp; Open Source</em>
      </h2>
      {!days && (
        <p className="gh-activity-loading">Loading contribution history…</p>
      )}
      {days && (
        <>
          <div className="gh-activity-meta">
            <span className="gh-activity-mark">◨</span>
            <strong>{total ?? "—"} contributions in the last year</strong>
          </div>
          <div className="gh-activity-scroll">
            <div className="gh-grid">
              {weeks.map((week, wi) => (
                <div key={wi} className="gh-col">
                  {week.map((day) => (
                    <span
                      key={day.date}
                      className={`gh-cell gh-level-${day.level}`}
                      title={`${day.count} contributions on ${day.date}`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className="gh-legend">
            <span>Less</span>
            {[0, 1, 2, 3, 4].map((l) => (
              <span key={l} className={`gh-cell gh-level-${l}`} />
            ))}
            <span>More</span>
          </div>
        </>
      )}
    </section>
  );
}

/** Compact card variant — used inside the "Behind the Curtains" grid.
 * Deliberately skips the dense contribution-grid look (that lives on the
 * About page instead) in favor of a couple of fun, glanceable stats. */
export function GitHubActivityCard() {
  const { days, total, failed } = useGitHubContributions();

  let streak = 0;
  if (days) {
    for (let i = days.length - 1; i >= 0; i--) {
      if (days[i].count > 0) streak++;
      else break;
    }
  }

  const sparkline = days ? days.slice(-14) : null;
  const maxCount = sparkline
    ? Math.max(1, ...sparkline.map((d) => d.count))
    : 1;

  return (
    <a
      href="https://github.com/A-verse"
      target="_blank"
      rel="noreferrer"
      className="curtain-card curtain-gh-card"
    >
      <p className="curtain-tag">🐙 GitHub activity</p>
      <h3>
        Shipping <em>in public.</em>
      </h3>
      {failed && (
        <p className="curtain-gh-fallback">
          Couldn&apos;t load live activity right now — check the profile
          directly.
        </p>
      )}
      {!failed && !days && <p className="curtain-gh-fallback">Loading…</p>}
      {!failed && days && (
        <>
          <div className="curtain-gh-stats">
            <div>
              <strong>{total ?? "—"}</strong>
              <span>commits this year</span>
            </div>
            <div>
              <strong>{streak}</strong>
              <span>day{streak === 1 ? "" : "s"} current streak</span>
            </div>
          </div>
          {sparkline && (
            <div className="curtain-gh-spark" aria-hidden="true">
              {sparkline.map((day) => (
                <span
                  key={day.date}
                  className="curtain-gh-bar"
                  style={{ height: `${8 + (day.count / maxCount) * 100}%` }}
                  title={`${day.count} on ${day.date}`}
                />
              ))}
            </div>
          )}
        </>
      )}
      <div className="curtain-card-foot">
        <span>github.com/A-verse</span>
        <span>→</span>
      </div>
    </a>
  );
}
