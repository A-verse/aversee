"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { CommandPalette } from "./command-palette";

const primary = [
  ["Home", "/"],
  ["About", "/about"],
  ["Work", "/projects"],
  ["Blogs", "/blogs"],
];

const more = [
  ["Links", "/links"],
  ["Guestbook", "/guestbook"],
  ["Off the Clock", "/off-the-clock"],
];

function OffTheClockIcon() {
  return (
    <svg className="off-clock-icon" viewBox="0 0 180 180" aria-hidden="true">
      <circle cx="90" cy="90" r="68" className="clock-outer" />

      <circle cx="90" cy="90" r="61" className="clock-face" />

      <g className="clock-markers">
        <path d="M90 34V42" />
        <path d="M146 90H138" />
        <path d="M90 146V138" />
        <path d="M34 90H42" />

        <path d="M118 42L114 49" />
        <path d="M138 118L131 114" />
        <path d="M62 138L66 131" />
        <path d="M42 62L49 66" />
      </g>

      <path d="M90 90V54" className="clock-hour" />

      <path d="M90 90L119 73" className="clock-minute" />

      <circle cx="90" cy="90" r="4" className="clock-center" />
    </svg>
  );
}

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const [menu, setMenu] = useState(false);
  const [palette, setPalette] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const active = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    onScroll();

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPalette((p) => !p);
      }

      if (e.key === "Escape") {
        setMenu(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <div className="site-grid min-h-screen bg-background text-foreground">
      {/* =====================================================
          NAVBAR
          ===================================================== */}

      <header
        className={`site-nav fixed inset-x-0 top-0 z-[100] mx-auto flex max-w-[1680px] items-center justify-between px-5 py-3 lg:px-10 ${
          scrolled ? "nav-scrolled" : ""
        }`}
      >
        {/* ===================================================
            BRAND
            =================================================== */}

        <Link href="/" className="brand-lockup" onClick={() => setMenu(false)}>
          <span className="brand-mark">AK</span>

          <span className="brand-rule" />

          <span className="brand-copy">
            <small>FULL STACK DEVELOPER</small>

            <strong>
              <i /> Open to Opportunities
            </strong>
          </span>
        </Link>

        {/* ===================================================
            DESKTOP NAV
            =================================================== */}

        <nav className="nav-pill hidden lg:flex">
          {primary.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className={active(href) ? "nav-active" : ""}
            >
              {label}
            </Link>
          ))}

          <button
            type="button"
            onClick={() => setMenu((p) => !p)}
            className={menu ? "nav-active" : ""}
            aria-expanded={menu}
            aria-haspopup="true"
          >
            More⌄
          </button>

          <span className="nav-divider" />

          {/* DESKTOP RESUME */}

          <a
            href="/resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="resume-button"
          >
            Resume
            <span>↗</span>
          </a>
        </nav>

        {/* ===================================================
            COMMAND BUTTON
            =================================================== */}

        <button
          type="button"
          className="command-button"
          aria-label="Open command menu (⌘K)"
          onClick={() => setPalette(true)}
          title="⌘K"
        >
          ⌘
        </button>

        {/* ===================================================
            MOBILE MENU BUTTON
            =================================================== */}

        <button
          type="button"
          className="mobile-menu lg:hidden"
          onClick={() => setMenu((p) => !p)}
          aria-label="Toggle navigation"
          aria-expanded={menu}
        >
          {menu ? "×" : "☰"}
        </button>

        {/* ===================================================
            DESKTOP MORE MENU

            Desktop ONLY.
            Home / About / Work / Blogs are NOT repeated.
            =================================================== */}

        {menu && (
          <div className="desktop-more-menu">
            {/* OFF THE CLOCK */}

            <Link
              href="/off-the-clock"
              className="more-feature"
              onClick={() => setMenu(false)}
            >
              <OffTheClockIcon />

              <div className="more-feature-content">
                <span>Off the Clock</span>

                <small>Life beyond the code</small>
              </div>
            </Link>

            {/* LINKS + GUESTBOOK */}

            <div className="more-links">
              <Link href="/links" onClick={() => setMenu(false)}>
                <span>Links</span>

                <small>Socials & Profiles</small>
              </Link>

              <Link href="/guestbook" onClick={() => setMenu(false)}>
                <span>Guestbook</span>

                <small>Sign my wall</small>
              </Link>
            </div>
          </div>
        )}

        {/* ===================================================
            MOBILE EXPANDED MENU

            Mobile ONLY.
            Home removed.
            Resume added instead.
            =================================================== */}

        {menu && (
          <div className="mobile-expanded-menu">
            {/* PRIMARY NAV */}

            <div className="mobile-primary-links">
              {primary
                .filter(([label]) => label !== "Home")
                .map(([label, href]) => (
                  <Link
                    key={href}
                    href={href}
                    className={active(href) ? "nav-active" : ""}
                    onClick={() => setMenu(false)}
                  >
                    {label}
                  </Link>
                ))}

              {/* MOBILE RESUME */}

              <a
                href="/resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="resume-button"
                onClick={() => setMenu(false)}
              >
                Resume
                <span>↗</span>
              </a>
            </div>

            {/* SECONDARY / FEATURED */}

            <div className="mobile-more-content">
              {/* OFF THE CLOCK */}

              <Link
                href="/off-the-clock"
                className="more-feature"
                onClick={() => setMenu(false)}
              >
                <OffTheClockIcon />

                <div className="more-feature-content">
                  <span>Off the Clock</span>

                  <small>Life beyond the code</small>
                </div>
              </Link>

              {/* LINKS + GUESTBOOK */}

              <div className="more-links">
                <Link href="/links" onClick={() => setMenu(false)}>
                  <span>Links</span>

                  <small>Socials & Profiles</small>
                </Link>

                <Link href="/guestbook" onClick={() => setMenu(false)}>
                  <span>Guestbook</span>

                  <small>Sign my wall</small>
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* =====================================================
          COMMAND PALETTE
          ===================================================== */}

      <CommandPalette open={palette} onClose={() => setPalette(false)} />

      {/* =====================================================
          PAGE
          ===================================================== */}

      <main className="pt-20">{children}</main>
    </div>
  );
}

/* ===========================================================
   SECTION HEADING
   =========================================================== */

export function SectionHeading({
  eyebrow,
  title,
  copy,
}: {
  eyebrow: string;
  title: string;
  copy?: string;
}) {
  return (
    <div className="section-heading">
      <p>{eyebrow}</p>

      <h1>{title}</h1>

      {copy && <div className="section-copy">{copy}</div>}
    </div>
  );
}

/* ===========================================================
   PAGE FRAME
   =========================================================== */

export function PageFrame({ children }: { children: React.ReactNode }) {
  return <div className="page-frame">{children}</div>;
}

/* ===========================================================
   PAGE HERO
   =========================================================== */

export function PageHero({
  eyebrow,
  title,
  sub,
  em,
}: {
  eyebrow?: string;
  title: string;
  sub: string;
  em: string;
}) {
  return (
    <section className="about-statement">
      {eyebrow && <p className="about-statement-eyebrow">{eyebrow}</p>}

      <h1>{title}</h1>

      <p className="about-statement-sub">{sub}</p>

      <p className="about-statement-em">{em}</p>
    </section>
  );
}
