"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PageFrame, PageHero, SiteShell } from "./site-shell";
import { Reveal } from "./reveal";
import { BehindTheCurtains, ContactFooter } from "./home-sections";

type Entry =
  | {
      type: "photo";
      src: string;
      caption: string;
      size?: "tall" | "wide";
    }
  | {
      type: "photo-empty";
      caption: string;
      size?: "tall" | "wide";
    }
  | {
      type: "writing";
      title: string;
      excerpt: string;
      date: string;
    };

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
      "Add a short note here — a few lines on something you’ve been thinking about.",
    date: "Aug 2026",
  },
  {
    type: "photo",
    src: "/images/travel-forest.jpg",
    caption: "Forest air, bad phone signal, good thinking conditions.",
  },
  {
    type: "photo-empty",
    caption: "A space for something I haven't photographed yet.",
  },
  {
    type: "writing",
    title: "Untitled",
    excerpt:
      "Add a short note here — a few lines on something you’ve been thinking about.",
    date: "Planned",
  },
  {
    type: "photo-empty",
    caption: "Another little frame waiting for a memory.",
    size: "wide",
  },
  {
    type: "photo-empty",
    caption: "Add a photo",
  },
  {
    type: "writing",
    title: "Untitled",
    excerpt: "Some thoughts are better left half-finished for a while.",
    date: "Planned",
  },
  {
    type: "photo-empty",
    caption: "Add a photo",
  },
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

    if (filter === "Photos") {
      return entries.filter(
        (entry) => entry.type === "photo" || entry.type === "photo-empty",
      );
    }

    return entries.filter((entry) => entry.type === "writing");
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
        {/* =========================
            INTRO
           ========================= */}

        <section className="ootc-intro">
          <div className="ootc-intro-copy">
            <span className="ootc-intro-number">01</span>

            <p>
              No filters, no curation pressure. Just photos I liked, places I
              remembered, and things I wrote down.
            </p>

            <small>
              A small corner of the internet that is allowed to stay unfinished.
            </small>
          </div>

          <div className="ootc-filters" aria-label="Filter entries">
            {filters.map((f) => (
              <button
                key={f}
                type="button"
                className={f === filter ? "ootc-filter-active" : ""}
                onClick={() => setFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>
        </section>

        {/* =========================
            GRID
           ========================= */}

        <Reveal className="ootc-grid" stagger={0.07} y={18}>
          {visible.map((entry, i) => {
            /* PHOTO */

            if (entry.type === "photo") {
              return (
                <button
                  key={`${entry.src}-${i}`}
                  type="button"
                  className={`ootc-entry ootc-photo ${
                    entry.size === "tall" ? "ootc-photo-tall" : ""
                  } ${entry.size === "wide" ? "ootc-photo-wide" : ""}`}
                  data-reveal
                  onClick={() =>
                    setLightbox({
                      src: entry.src,
                      caption: entry.caption,
                    })
                  }
                >
                  <div className="ootc-photo-image">
                    <Image
                      src={entry.src}
                      alt={entry.caption}
                      fill
                      sizes="(min-width: 1100px) 33vw, (min-width: 700px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </div>

                  <div className="ootc-photo-meta">
                    <span>PHOTO</span>
                    <p>{entry.caption}</p>
                  </div>
                </button>
              );
            }

            /* EMPTY PHOTO */

            if (entry.type === "photo-empty") {
              return (
                <div
                  key={`empty-${i}`}
                  className={`ootc-entry ootc-empty ${
                    entry.size === "tall" ? "ootc-empty-tall" : ""
                  } ${entry.size === "wide" ? "ootc-empty-wide" : ""}`}
                  data-reveal
                >
                  <div className="ootc-empty-mark">
                    <span>+</span>
                  </div>

                  <div className="ootc-empty-copy">
                    <small>NOT YET</small>
                    <p>{entry.caption}</p>
                  </div>
                </div>
              );
            }

            /* WRITING */

            return (
              <article
                key={`writing-${i}`}
                className="ootc-entry ootc-writing"
                data-reveal
              >
                <div className="ootc-writing-top">
                  <span className="ootc-writing-label">NOTE</span>

                  <small>{entry.date}</small>
                </div>

                <div className="ootc-writing-body">
                  <span className="ootc-quote">&ldquo;</span>

                  <h3>{entry.title}</h3>

                  <p>{entry.excerpt}</p>
                </div>

                <div className="ootc-writing-line" />
              </article>
            );
          })}
        </Reveal>

        {/* =========================
            BOTTOM
           ========================= */}

        <div className="ootc-bottom">
          <span>MORE TO COME, EVENTUALLY.</span>

          <Link href="/about">← Back to about</Link>
        </div>
      </PageFrame>

      {/* =========================
          LIGHTBOX
         ========================= */}

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
              className="object-contain"
            />

            <div className="ootc-lightbox-caption">
              <p>{lightbox.caption}</p>
            </div>

            <button
              type="button"
              onClick={() => setLightbox(null)}
              aria-label="Close image"
              className="ootc-lightbox-close"
            >
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
