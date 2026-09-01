"use client";

import { useState } from "react";
import Link from "next/link";
import { SectionHeading } from "./site-shell";
import { Reveal } from "./reveal";
import { PhotoTilt } from "./photo-tilt";
import { SparkleIcon } from "./projects/sparkle-icon";
import { GitHubActivityCard } from "./github-activity";
import { SpotifyCard } from "./spotify-card";

const skills: { name: string; slug: string; emoji?: string }[] = [
  { name: "Next.js", slug: "nextdotjs" },
  { name: "React", slug: "react" },
  { name: "TypeScript", slug: "typescript" },
  { name: "JavaScript", slug: "javascript" },
  { name: "Tailwind CSS", slug: "tailwindcss" },

  { name: "Node.js", slug: "nodedotjs" },
  { name: "Express.js", slug: "express" },
  { name: "Python", slug: "python" },
  { name: "C++", slug: "cplusplus" },

  { name: "PostgreSQL", slug: "postgresql" },
  { name: "MongoDB", slug: "mongodb" },
  { name: "Supabase", slug: "supabase" },
  { name: "Prisma", slug: "prisma" },

  { name: "REST APIs", slug: "fastapi" },
  { name: "Git", slug: "git" },
  { name: "GitHub", slug: "github" },

  { name: "GSAP", slug: "greensock" },
  { name: "Framer Motion", slug: "framer" },
];

const traits = [
  "User-Friendly",
  "Adaptive",
  "Thorough",
  "Fast-Learning",
  "SEO-Ready",
  "Detail-Oriented",
  "Dependable",
  "Curious",
  "Scalable",
  "Type-Safe",
  "Accessible",
  "Performant",
  "Battle-Tested",
  "Responsive",
  "Secure",
];

export function Hero() {
  return (
    <section className="hero-section">
      <Reveal className="hero-copy" stagger={0.12}>
        <p className="eyebrow" data-reveal>
          A QUICK GLANCE
        </p>
        <h1 data-reveal>
          Turning ideas
          <br />
          into products
          <br />
          that <em>work</em>
        </h1>
        <p className="hero-description" data-reveal>
          I&apos;m Anjali Kamal, a final-year Full Stack Developer at IIITDM
          Jabalpur. I build end-to-end web products — from React/Next.js
          interfaces to Node and PostgreSQL-backed systems — with a focus on
          clean architecture and shipping things that actually work.
        </p>
        <p className="hero-description" data-reveal>
          Recent work spans an AI-assisted communication platform, a full-stack
          e-commerce store, and internal tools built during my internship.
          Currently deep in placement prep and always building something on the
          side.
        </p>
        <div className="social-links" data-reveal>
          <a href="https://github.com/A-verse" target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/theanjalikamal"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
          <a
            href="https://leetcode.com/u/A-verse/"
            target="_blank"
            rel="noreferrer"
          >
            LeetCode
          </a>
          <a
            href="https://instagram.com/anjalikamal31"
            target="_blank"
            rel="noreferrer"
          >
            Instagram
          </a>
        </div>
        <Link href="/about" className="dive-link" data-reveal>
          Dive in deeper <span>→</span>
        </Link>
      </Reveal>
      <div className="hero-photo hero-photo-in">
        <div
          className="photo-card photo-card-left"
          style={{ backgroundImage: "url('/images/travel-forest.jpg')" }}
        />

        <div
          className="photo-card photo-card-main"
          style={{ backgroundImage: "url('/images/avatar.jpg')" }}
        />

        <div
          className="photo-card photo-card-right"
          style={{ backgroundImage: "url('/images/travel-mountains.jpg')" }}
        />
      </div>
    </section>
  );
}

export function Skillset() {
  return (
    <section className="skill-section">
      <Reveal>
        <div data-reveal>
          <SectionHeading
            eyebrow="MY SKILLSET"
            title={
              <>
                The Magic <em>Behind</em>
              </>
            }
            copy="A focused stack for building polished, fast, production-ready web experiences."
          />
        </div>
      </Reveal>
      <div className="skill-marquee-viewport">
        <div className="skill-marquee">
          {skills.map((skill) => (
            <span key={skill.name}>
              {skill.slug ? (
                <img
                  src={`https://cdn.simpleicons.org/${skill.slug}/ffffff`}
                  alt=""
                  className="skill-icon"
                  width={18}
                  height={18}
                />
              ) : (
                <span className="skill-icon" aria-hidden="true">
                  {skill.emoji}
                </span>
              )}
              {skill.name}
            </span>
          ))}
        </div>
      </div>
      <div className="trait-band-wrap">
        <div className="trait-band trait-band-back">
          <div className="trait-marquee-viewport">
            <div className="trait-marquee">
              {[...traits, ...traits].map((trait, i) => (
                <span key={`back-${trait}-${i}`}>
                  {trait}
                  <SparkleIcon className="trait-star" />
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="trait-band trait-band-front">
          <div className="trait-marquee-viewport">
            <div className="trait-marquee">
              {[...traits, ...traits].map((trait, i) => (
                <span key={`front-${trait}-${i}`}>
                  {trait}
                  <SparkleIcon className="trait-star" />
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function BehindTheCurtains() {
  return (
    <section className="curtain-section">
      <Reveal>
        <div data-reveal>
          <SectionHeading
            eyebrow="BEHIND THE CURTAINS"
            title={
              <>
                Decoding logic <em>&amp;&amp; the lyrics.</em>
              </>
            }
          />
        </div>
      </Reveal>
      <Reveal className="curtain-grid" stagger={0.1}>
        <div data-reveal>
          <GitHubActivityCard />
        </div>
        <Link
          href="/guestbook"
          className="curtain-card curtain-guestbook-card"
          data-reveal
        >
          <p className="curtain-tag">VISITORS</p>
          <h3>
            Leave your <em>signature.</em>
          </h3>
          <p className="curtain-gh-fallback">Let me know you were here.</p>
          <div className="curtain-card-foot">
            <span>Sign Guestbook</span>
            <span>→</span>
          </div>
        </Link>
        <div data-reveal>
          <SpotifyCard />
        </div>
      </Reveal>
    </section>
  );
}

export function ContactFooter() {
  return (
    <>
      {/* CONTACT */}
      <section
        className="contact-section"
        style={{
          width: "100%",
          boxSizing: "border-box",
          padding: "70px 0 60px",
        }}
      >
        <div
          className="contact-inner"
          style={{
            position: "relative",
            width: "100%",
            maxWidth: "1400px",
            minHeight: "220px",
            margin: "0 auto",
            padding: "0 40px",
            boxSizing: "border-box",
            display: "flex",
            alignItems: "center",
          }}
        >
          {/* Heading */}
          <div
            className="contact-heading"
            style={{
              position: "relative",
              zIndex: 2,
              width: "100%",
              maxWidth: "950px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <h2
              style={{
                margin: 0,
                padding: 0,
                lineHeight: "0.88",
                letterSpacing: "-0.055em",
              }}
            >
              <span
                className="contact-line-primary"
                style={{
                  display: "block",
                  fontSize: "clamp(3.5rem, 7vw, 7rem)",
                  lineHeight: "0.88",
                  whiteSpace: "nowrap",
                }}
              >
                Let&apos;s create
              </span>

              <span
                className="contact-line-secondary"
                style={{
                  display: "block",
                  fontSize: "clamp(3.5rem, 7vw, 7rem)",
                  lineHeight: "0.88",
                  whiteSpace: "nowrap",
                }}
              >
                something real.
              </span>
            </h2>
          </div>

          {/* Orb */}
          <div className="contact-orb" aria-hidden="true">
            <div className="contact-orb-core" />
          </div>
        </div>

        <style jsx>{`
          .contact-section {
            width: 100%;
            box-sizing: border-box;
          }

          .contact-inner {
            position: relative;
          }

          .contact-heading {
            position: relative;
            z-index: 2;
          }

          /* =========================
             ORB
             ========================= */

          .contact-orb {
            position: absolute;
            width: 18rem;
            height: 18rem;

            /* Same as desktop container padding */
            right: 40px;
            top: 50%;

            transform: translateY(-50%);
            border-radius: 50%;

            background: radial-gradient(
              circle,
              transparent 54%,
              rgba(80, 70, 255, 0.18) 58%,
              rgba(95, 65, 255, 0.85) 66%,
              rgba(70, 150, 255, 0.75) 73%,
              rgba(50, 100, 255, 0.1) 80%,
              transparent 84%
            );

            filter: blur(1px);

            box-shadow:
              0 0 18px rgba(105, 80, 255, 0.5),
              0 0 45px rgba(70, 100, 255, 0.28);

            animation: contact-orb-float 5s ease-in-out infinite;

            z-index: 1;
            pointer-events: none;
          }

          .contact-orb-core {
            position: absolute;
            inset: 15%;
            border-radius: 50%;
            background: #000;
          }

          @keyframes contact-orb-float {
            0%,
            100% {
              transform: translateY(-50%) scale(1);
            }

            50% {
              transform: translateY(calc(-50% - 8px)) scale(1.025);
            }
          }

          /* =========================
             TABLET
             ========================= */

          @media (max-width: 900px) {
            .contact-section {
              padding: 60px 0 50px !important;
            }

            .contact-inner {
              min-height: 190px;
              padding: 0 24px !important;
            }

            .contact-line-primary,
            .contact-line-secondary {
              font-size: clamp(3rem, 10vw, 5rem) !important;
            }

            .contact-orb {
              width: 13rem !important;
              height: 13rem !important;

              /* Same as tablet container padding */
              right: 24px !important;

              top: 50% !important;
            }
          }

          /* =========================
             MOBILE
             ========================= */

          @media (max-width: 600px) {
            .contact-section {
              padding: 45px 0 45px !important;
            }

            .contact-inner {
              min-height: 150px;
              padding: 0 20px !important;
            }

            .contact-line-primary,
            .contact-line-secondary {
              font-size: clamp(2.5rem, 10.5vw, 4rem) !important;
              white-space: nowrap !important;
            }

            .contact-orb {
              width: 5rem !important;
              height: 5rem !important;

              /* Same as mobile container padding */
              right: 20px !important;

              top: 50% !important;
              opacity: 0.65;
            }
          }

          /* =========================
             SMALL MOBILE
             ========================= */

          @media (max-width: 400px) {
            .contact-line-primary,
            .contact-line-secondary {
              font-size: 2.3rem !important;
            }

            .contact-orb {
              width: 4rem !important;
              height: 4rem !important;
              right: 20px !important;
              top: 50% !important;
            }
          }

          /* =========================
             REDUCED MOTION
             ========================= */

          @media (prefers-reduced-motion: reduce) {
            .contact-orb {
              animation: none;
              transform: translateY(-50%);
            }
          }
        `}</style>
      </section>

      {/* FOOTER */}
      <footer
        className="site-footer-rich"
        style={{
          width: "100%",
          boxSizing: "border-box",
          padding: "60px 40px 28px",
        }}
      >
        <div
          className="footer-top"
          style={{
            width: "100%",
            maxWidth: "1400px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "minmax(260px, 1.1fr) minmax(420px, 1fr)",
            gap: "clamp(50px, 8vw, 120px)",
            alignItems: "start",
          }}
        >
          {/* BRAND */}
          <div
            className="footer-brand"
            style={{
              maxWidth: "420px",
            }}
          >
            <span
              className="footer-script"
              style={{
                display: "block",
                marginBottom: "18px",
              }}
            >
              ANJALI
            </span>

            <p
              style={{
                margin: 0,
                maxWidth: "390px",
                lineHeight: 1.65,
              }}
            >
              Building products that ship. Still learning, still figuring most
              of it out, and documenting the process along the way.
            </p>
          </div>

          {/* FOOTER COLUMNS */}
          <div
            className="footer-cols"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, minmax(100px, 1fr))",
              gap: "clamp(25px, 4vw, 60px)",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              <h4 style={{ margin: "0 0 6px" }}>General</h4>
              <Link href="/">Home</Link>
              <Link href="/blogs">Blogs</Link>
              <Link href="/guestbook">Guestbook</Link>
              <Link href="/uses">Uses</Link>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              <h4 style={{ margin: "0 0 6px" }}>About</h4>
              <Link href="/about">About Me</Link>
              <Link href="/projects">Projects</Link>
              <Link href="/off-the-clock">Off the Clock</Link>
              <Link href="/book-call">Contact</Link>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              <h4 style={{ margin: "0 0 6px" }}>Connect</h4>

              <a
                href="https://github.com/A-verse"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>

              <a
                href="https://linkedin.com/in/theanjalikamal"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>

              <a
                href="https://leetcode.com/u/A-verse/"
                target="_blank"
                rel="noreferrer"
              >
                LeetCode
              </a>

              <a
                href="https://instagram.com/anjalikamal31"
                target="_blank"
                rel="noreferrer"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>

        {/* FOOTER BOTTOM */}
        <div
          className="footer-bottom"
          style={{
            width: "100%",
            maxWidth: "1400px",
            margin: "55px auto 0",
            paddingTop: "22px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "20px",
            boxSizing: "border-box",
          }}
        >
          <span>© 2026 Anjali Kamal</span>

          <div
            className="footer-socials"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "24px",
              flexWrap: "wrap",
            }}
          >
            <a
              href="https://github.com/A-verse"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
            >
              GitHub
            </a>

            <a
              href="https://linkedin.com/in/theanjalikamal"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
            >
              LinkedIn
            </a>

            <a
              href="https://leetcode.com/u/A-verse/"
              target="_blank"
              rel="noreferrer"
              aria-label="LeetCode"
            >
              LeetCode
            </a>

            <a
              href="https://instagram.com/anjalikamal31"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
            >
              Instagram
            </a>
          </div>
        </div>

        {/* FOOTER RESPONSIVE */}
        <style jsx>{`
          @media (max-width: 900px) {
            .site-footer-rich {
              padding: 50px 24px 24px !important;
            }

            .footer-top {
              grid-template-columns: 1fr !important;
              gap: 45px !important;
            }

            .footer-cols {
              grid-template-columns: repeat(3, 1fr) !important;
            }
          }

          @media (max-width: 600px) {
            .site-footer-rich {
              padding: 45px 20px 20px !important;
            }

            .footer-top {
              gap: 40px !important;
            }

            .footer-cols {
              grid-template-columns: repeat(2, 1fr) !important;
              gap: 35px 25px !important;
            }

            .footer-cols > div:last-child {
              grid-column: 1 / -1;
            }

            .footer-bottom {
              margin-top: 45px !important;
              flex-direction: column !important;
              align-items: flex-start !important;
              gap: 18px !important;
            }

            .footer-socials {
              gap: 18px !important;
            }
          }
        `}</style>
      </footer>
    </>
  );
}
