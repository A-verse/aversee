'use client'

import { useEffect, useState } from 'react'

type Day = { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 }

const GITHUB_USERNAME = 'A-verse'

export function GitHubActivityCard() {
  const [days, setDays] = useState<Day[] | null>(null)
  const [total, setTotal] = useState<number | null>(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    let cancelled = false
    fetch(`https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`)
      .then((res) => {
        if (!res.ok) throw new Error('bad response')
        return res.json()
      })
      .then((data) => {
        if (cancelled) return
        const contributions: Day[] = data.contributions ?? []
        // Last ~17 weeks (roughly 4 months) so it fits neatly in a card.
        setDays(contributions.slice(-119))
        const totals = data.total ?? {}
        const sum = Object.values(totals).reduce((a: number, b) => a + (Number(b) || 0), 0)
        setTotal(sum)
      })
      .catch(() => {
        if (!cancelled) setFailed(true)
      })
    return () => {
      cancelled = true
    }
  }, [])

  const weeks: Day[][] = []
  if (days) {
    for (let i = 0; i < days.length; i += 7) weeks.push(days.slice(i, i + 7))
  }

  return (
    <a href={`https://github.com/${GITHUB_USERNAME}`} target="_blank" rel="noreferrer" className="curtain-card curtain-github">
      <p className="curtain-tag">🐙 GitHub Activity</p>
      <h3>
        Shipping <em>in public.</em>
      </h3>

      {failed && <p className="curtain-github-fallback">Couldn&apos;t load live activity right now — check back shortly.</p>}

      {!failed && !days && <p className="curtain-github-fallback">Loading activity…</p>}

      {!failed && days && (
        <>
          <div className="curtain-github-mini-grid">
            {weeks.map((week, wi) => (
              <div key={wi} className="gh-col">
                {week.map((day) => (
                  <span key={day.date} className={`gh-cell gh-level-${day.level}`} title={`${day.count} contributions on ${day.date}`} />
                ))}
              </div>
            ))}
          </div>
          <div className="curtain-card-foot">
            <span>{total ?? '—'} contributions this year</span>
            <span>→</span>
          </div>
        </>
      )}
    </a>
  )
}
