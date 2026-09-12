"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PageFrame, PageHero, SectionHeading, SiteShell } from "./site-shell";
import { Reveal } from "./reveal";
import { GitHubActivity } from "./github-activity";
import { ExperienceTimeline } from "./experience-timeline";
import { BehindTheCurtains, ContactFooter } from "./home-sections";

const aboutCarouselImages = [
  "/images/IMG.jpg",
  "/images/img2.jpg",
  "/images/img3.jpeg",
];

export function AboutPage() {
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveImage((current) => (current + 1) % aboutCarouselImages.length);
    }, 4200);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <SiteShell>
      <PageHero
        eyebrow="A LITTLE MORE"
        title="ABOUT ME"
        sub="GET TO KNOW MORE ABOUT"
        em="who i am."
      />

      <PageFrame>
        <section className="about-intro-section">
          <div className="about-intro-grid">
            {/* LEFT */}
            <div className="about-intro-content">
              <SectionHeading
                title="Nice to meet you. I'm Anjali."
                copy=" "
                eyebrow=""
              />

              <Reveal>
                <div className="about-intro-copy" data-reveal>
                  <p>
                    Most of my time goes into building full-stack applications,
                    solving DSA problems, and learning through projects. There's
                    something deeply satisfying about taking an idea from a
                    blank screen to a product people can actually use, and then
                    spending the next few hours figuring out why one API call
                    still refuses to cooperate. I'm particularly interested in
                    software engineering and data engineering. I'm fascinated by
                    how large systems are designed, how data flows through them,
                    and how good engineering decisions make products reliable,
                    scalable, and fast. That's what I'm currently spending most
                    of my time learning alongside strengthening my foundations
                    in DSA and core computer science.
                  </p>

                  <p>
                    Outside of coding, you'll probably find me with a camera, a
                    book, on a badminton court, or rewriting a playlist that
                    somehow never feels finished. Photography has become my
                    favorite hobby. It reminds me a lot of software engineering.
                    Both reward patience, attention to detail, and seeing things
                    from a different perspective.
                  </p>
                </div>
              </Reveal>
            </div>

            {/* CAROUSEL */}
            <div className="about-photo-stack" data-reveal>
              {aboutCarouselImages.map((image, index) => {
                const position =
                  index === activeImage
                    ? "main"
                    : index === (activeImage + 1) % aboutCarouselImages.length
                      ? "right"
                      : "left";

                return (
                  <div
                    key={image}
                    className={`about-photo about-photo-${position}`}
                  >
                    <Image
                      src={image}
                      alt={index === 1 ? "AK" : ""}
                      fill
                      sizes="(max-width: 700px) 80vw, 400px"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <ExperienceTimeline />
        <GitHubActivity />

        <section className="off-clock-section">
          <div className="off-clock-card">
            <div className="off-clock-image">
              <img src="/images/avatar.jpg" alt="Off the Clock" />
            </div>

            <div className="off-clock-content">
              <p className="off-clock-eyebrow">OFF THE CLOCK</p>

              <h2 className="off-clock-title">
                Camera roll & half-finished notes.
              </h2>

              <p className="off-clock-description">
                When I'm not shipping code, I'm usually somewhere with a camera
                or writing things down that may never see daylight. A small,
                honest corner, not a portfolio.
              </p>

              <a href="/off-the-clock" className="off-clock-link">
                Take a look
              </a>
            </div>
          </div>
        </section>
      </PageFrame>

      <BehindTheCurtains />
      <ContactFooter />
    </SiteShell>
  );
}
