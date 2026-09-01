import Image from "next/image";
import Link from "next/link";
import { PageFrame, PageHero, SectionHeading, SiteShell } from "./site-shell";
import { Reveal } from "./reveal";
import { GitHubActivity } from "./github-activity";
import { ExperienceTimeline } from "./experience-timeline";
import { BehindTheCurtains, ContactFooter } from "./home-sections";

export function AboutPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="A LITTLE MORE"
        title="ABOUT ME"
        sub="GET TO KNOW MORE ABOUT"
        em="who i am."
      />

      <PageFrame>
        {/* =====================================================
      ABOUT INTRO
      LEFT = TEXT
      RIGHT = PHOTO STACK
      ===================================================== */}

        <section className="about-intro-grid">
          {/* LEFT SIDE */}

          <div className="about-intro-content">
            <SectionHeading
              title="Still figuring it out, one shipped project at a time."
              copy="I'm Anjali Kamal, a final-year Full Stack Developer at IIITDM Jabalpur. I like taking things from a rough idea to something people can actually use — most of what I've learned came from getting stuck on real projects, not tutorials."
            />

            <Reveal>
              <p className="about-lede" data-reveal>
                Right now I&apos;m deep in placement season, prepping for SDE,
                Full Stack, and Data Engineering roles, while sharpening DSA
                fundamentals and exploring RAG / agentic-AI systems on the side.
                Outside of that, I&apos;ve built an assistive communication
                platform, a fashion e-commerce store, and a metro commuter
                portal during my internship — each one taught me something I
                couldn&apos;t have learned from a course.
              </p>
            </Reveal>
          </div>

          {/* RIGHT SIDE */}

          <div className="about-photo-stack" data-reveal>
            <div className="about-photo about-photo-left">
              <img src="/images/IMG.jpg" alt="" />
            </div>

            <div className="about-photo about-photo-main">
              <img src="/images/img2.jpg" alt="AK" />
            </div>

            <div className="about-photo about-photo-right">
              <img src="/images/img3.jpeg" alt="" />
            </div>
          </div>
        </section>

        {/* =====================================================
      OFF THE CLOCK
      ===================================================== */}

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
                When I&apos;m not shipping code, I&apos;m usually somewhere with
                a camera or writing things down that may never see daylight. A
                small, honest corner, not a portfolio.
              </p>

              <a href="/off-the-clock" className="off-clock-link">
                Take a look
              </a>
            </div>
          </div>
        </section>
      </PageFrame>

      <GitHubActivity />
      <ExperienceTimeline />
      <BehindTheCurtains />
      <ContactFooter />
    </SiteShell>
  );
}
