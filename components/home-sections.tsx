"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
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

function SocialIcon({
  name,
}: {
  name: "github" | "linkedin" | "leetcode" | "instagram";
}) {
  if (name === "github") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M9 19c-4 1.2-4-2-5-2m10 4v-3.9c0-1.1.4-1.8 1-2.3-3.3-.4-6.8-1.6-6.8-7a5.5 5.5 0 0 1 1.5-3.8A5.1 5.1 0 0 1 9.8 3S11 2.6 14 4.6a10.5 10.5 0 0 1 5.5 0C22.5 2.6 23.7 3 23.7 3a5.1 5.1 0 0 1 .1 5 5.5 5.5 0 0 1 1.5 3.8c0 5.4-3.5 6.6-6.8 7 .6.5 1 1.4 1 2.8V21" />
      </svg>
    );
  }

  if (name === "linkedin") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M6.5 8.5V18M6.5 5.5v.01M11 18v-5.2a2.8 2.8 0 0 1 5.6 0V18M11 10.8V18M19 18v-5.2a5.2 5.2 0 0 0-10.4 0" />
      </svg>
    );
  }

  if (name === "leetcode") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M9.5 3 4 8.5 9.5 14M14.5 10 20 15.5 14.5 21M13 3 11 21" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function Hero() {
  const carouselImages = [
    "/images/IMG.jpg",
    "/images/img2.jpg",
    "/images/img3.jpeg",
  ];
  const [activeImage, setActiveImage] = useState(1);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveImage((current) => (current + 1) % carouselImages.length);
    }, 4200);

    return () => window.clearInterval(interval);
  }, [carouselImages.length]);

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
          I&apos;m Anjali Kamal, a final-year student at IIITDM Jabalpur who
          genuinely enjoys building things and figuring out how they work. Most
          of my time goes into full-stack development, DSA, and turning random
          ideas into projects that I can actually use.
        </p>

        <p className="hero-description" data-reveal>
          I&apos;m curious about what happens behind the interface too, from how
          APIs and databases fit together to how a system can stay fast and
          reliable as it grows. These days, I&apos;m preparing for placements,
          working on my projects, and usually finding something new to build,
          break, and fix.
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
      {/* CAROUSEL */}
      <div className="about-photo-stack" data-reveal>
        {carouselImages.map((image, index) => {
          const position =
            index === activeImage
              ? "main"
              : index === (activeImage + 1) % carouselImages.length
                ? "right"
                : "left";

          return (
            <div key={image} className={`about-photo about-photo-${position}`}>
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
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [avatarSize, setAvatarSize] = useState(0);

  useEffect(() => {
    const heading = headingRef.current;

    if (!heading) return;

    const updateAvatarSize = () => {
      const height = heading.getBoundingClientRect().height;
      setAvatarSize(height);
    };

    updateAvatarSize();

    const observer = new ResizeObserver(updateAvatarSize);
    observer.observe(heading);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* CONTACT */}
      <section className="contact-section">
        <div className="contact-inner">
          {/* Heading */}
          <div className="contact-heading">
            <div
              className="contact-avatar"
              aria-hidden="true"
              style={{
                width: avatarSize > 0 ? `${avatarSize}px` : undefined,
                height: avatarSize > 0 ? `${avatarSize}px` : undefined,
                flex: avatarSize > 0 ? `0 0 ${avatarSize}px` : undefined,
              }}
            >
              <img src="/images/avatar.jpg" alt="" />
            </div>

            <h2 ref={headingRef}>
              <span className="contact-line-primary">Let&apos;s create</span>

              <span className="contact-line-muted">
                <span className="contact-line-secondary">something</span>{" "}
                <span className="contact-line-tertiary">real.</span>
              </span>
            </h2>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="site-footer-rich">
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
            {/* GENERAL */}
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

            {/* ABOUT */}
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

            {/* CONNECT */}
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
                aria-label="GitHub"
                title="GitHub"
              >
                <SocialIcon name="github" />
              </a>

              <a
                href="https://linkedin.com/in/theanjalikamal"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                title="LinkedIn"
              >
                <SocialIcon name="linkedin" />
              </a>

              <a
                href="https://leetcode.com/u/A-verse/"
                target="_blank"
                rel="noreferrer"
                aria-label="LeetCode"
                title="LeetCode"
              >
                <SocialIcon name="leetcode" />
              </a>

              <a
                href="https://instagram.com/anjalikamal31"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                title="Instagram"
              >
                <SocialIcon name="instagram" />
              </a>
            </div>
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
