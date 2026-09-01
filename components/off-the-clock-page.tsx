"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PageFrame, PageHero, SiteShell } from "./site-shell";
import { Reveal } from "./reveal";
import { BehindTheCurtains, ContactFooter } from "./home-sections";

type Entry =
  | { type: "photo"; src: string; caption: string; size?: "tall" | "wide" }
  | { type: "photo-empty"; caption: string; size?: "tall" | "wide" }
  | { type: "writing"; title: string; excerpt: string; date: string };

// TODO(Anjali): replace the "photo-empty" tiles with real photos as you take
// them, and the "writing" excerpts with actual notes/journal snippets.
// This grid is meant to feel unfinished and honest, not polished — add to it
// over time rather than filling it all at once.
const entries: Entry[] = [
  {
    type: "photo",
    src: "/images/travel-mountains.jpg",
    caption: "Somewhere up in the mountains, mid-scroll of my own thoughts.",
    size: "tall",
  },
  {
    type: "writing",
    title: "On starting over",
    excerpt:
      "Add a short note here — a few lines on something you\u2019ve been thinking about.",
    date: "Aug 2026",
  },
  {
    type: "photo",
    src: "/images/travel-forest.jpg",
    caption: "Forest air, bad phone signal, good thinking conditions.",
  },
  { type: "photo-empty", caption: "Add a photo" },
  {
    type: "writing",
    title: "Untitled",
    excerpt:
      "Add a short note here — a few lines on something you\u2019ve been thinking about.",
    date: "Planned",
  },
  { type: "photo-empty", caption: "Add a photo", size: "wide" },
  { type: "photo-empty", caption: "Add a photo" },
  {
    type: "writing",
    title: "Untitled",
    excerpt:
      "Add a short note here — a few lines on something you\u2019ve been thinking about.",
    date: "Planned",
  },
  { type: "photo-empty", caption: "Add a photo" },
];

const filters = ["All", "Photos", "Writing"] as const;

export function OffTheClockPage() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const [lightbox, setLightbox] = useState<{
    src: string;
    caption: string;
  } | null>(null);

  const visible = useMemo(() => {
    if (filter === "All") return entries;
    if (filter === "Photos")
      return entries.filter(
        (e) => e.type === "photo" || e.type === "photo-empty",
      );
    return entries.filter((e) => e.type === "writing");
  }, [filter]);

  return (
    <SiteShell>
      <PageHero
        eyebrow="Off the clock"
        title="OFF THE CLOCK"
        sub="CAMERA ROLL &"
        em="half-finished notes."
      />

      <PageFrame>
        <div className="ootc-intro">
          <p>
            No filters, no curation pressure — just photos I liked and things I
            wrote down. This page is meant to grow slowly, not launch finished.
          </p>
          <div className="ootc-filters">
            {filters.map((f) => (
              <button
                key={f}
                className={f === filter ? "ootc-filter-active" : ""}
                onClick={() => setFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <Reveal className="ig-grid" stagger={0.06} y={16}>
          {visible.map((entry, i) => {
            if (entry.type === "photo") {
              return (
                <button
                  key={i}
                  className={`ig-tile ig-tile-photo ${entry.size === "tall" ? "ig-tile-tall" : ""} ${entry.size === "wide" ? "ig-tile-wide" : ""}`}
                  data-reveal
                  onClick={() =>
                    setLightbox({ src: entry.src, caption: entry.caption })
                  }
                >
                  <Image
                    src={entry.src}
                    alt={entry.caption}
                    fill
                    sizes="(min-width: 768px) 33vw, 50vw"
                    className="object-cover"
                  />
                  <div className="ig-tile-overlay">
                    <p>{entry.caption}</p>
                  </div>
                </button>
              );
            }
            if (entry.type === "photo-empty") {
              return (
                <div
                  key={i}
                  className={`ig-tile ig-tile-empty ${entry.size === "wide" ? "ig-tile-wide" : ""}`}
                  data-reveal
                >
                  <span>+</span>
                  <small>{entry.caption}</small>
                </div>
              );
            }
            return (
              <div key={i} className="ig-tile ig-tile-writing" data-reveal>
                <span className="quote-mark">&ldquo;</span>
                <small className="ig-tile-writing-date">{entry.date}</small>
                <strong>{entry.title}</strong>
                <p>{entry.excerpt}</p>
              </div>
            );
          })}
        </Reveal>

        <Link
          href="/about"
          className="mt-12 inline-block text-sm text-muted-foreground hover:text-foreground"
        >
          ← Back to about
        </Link>
      </PageFrame>

      {lightbox && (
        <div className="ootc-lightbox" onClick={() => setLightbox(null)}>
          <div
            className="ootc-lightbox-frame"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={lightbox.src}
              alt={lightbox.caption}
              fill
              sizes="90vw"
              className="object-cover"
            />
            <p>{lightbox.caption}</p>
            <button onClick={() => setLightbox(null)} aria-label="Close">
              ×
            </button>
          </div>
        </div>
      )}

      <BehindTheCurtains />
      <ContactFooter />
    </SiteShell>
  );
}
