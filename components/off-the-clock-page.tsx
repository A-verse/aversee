"use client";

import Image from "next/image";
import { PageFrame, PageHero, SiteShell } from "./site-shell";
import { BehindTheCurtains, ContactFooter } from "./home-sections";

type PhotoEntry = {
  src: string;
  title: string;
  caption: string;
};

const photos: PhotoEntry[] = [
  {
    src: "/images/bee and flower.jpeg",
    title: "Small Things",
    caption: "A little detail hiding in plain sight.",
  },
  {
    src: "/images/jaipur city road.jpeg",
    title: "Jaipur",
    caption: "A road carrying the colours of a city.",
  },
  {
    src: "/images/patrika gate.jpeg",
    title: "Patterns",
    caption: "Architecture, colour, symmetry.",
  },
  {
    src: "/images/kedarnath.jpeg",
    title: "Kedarnath",
    caption: "Some places make you stop and look twice.",
  },
  {
    src: "/images/dog.jpeg",
    title: "Passing By",
    caption: "A quiet moment in the middle of everything.",
  },
];

export function OffTheClockPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Beyond the code"
        title="OFF THE CLOCK"
        sub="PHOTOS, STORIES &"
        em="everything in between."
      />

      <PageFrame>
        <section className="ootc-photo-section">
          {/* HEADER */}
          <div className="ootc-photo-header">
            <div className="ootc-photo-header-top">
              <span className="ootc-photo-label">PHOTOGRAPHY / 01</span>

              <span className="ootc-photo-header-line" />

              <span className="ootc-photo-header-small">STORIES IN FRAMES</span>
            </div>

            <h2>
              Framing life,
              <br />
              freezing moments,
              <br />
              and finding the beauty in everyday.
            </h2>

            <p>
              A collection of moments, places, people, and little details that
              were worth keeping.
            </p>
          </div>

          {/* PHOTO WALL */}
          <section className="ootc-photo-wall">
            {photos.map((photo, index) => (
              <article
                key={photo.src}
                className={`ootc-wall-photo ootc-wall-photo-${index + 1}`}
              >
                <Image
                  src={photo.src}
                  alt={photo.title}
                  fill
                  sizes="(min-width: 1000px) 25vw, (min-width: 700px) 50vw, 100vw"
                  className="ootc-wall-image"
                />

                <div className="ootc-wall-overlay" />

                <div className="ootc-wall-caption">
                  <span className="ootc-wall-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div>
                    <h3>{photo.title}</h3>
                    <p>{photo.caption}</p>
                  </div>
                </div>
              </article>
            ))}
          </section>
        </section>
      </PageFrame>

      <BehindTheCurtains />
      <ContactFooter />
    </SiteShell>
  );
}
