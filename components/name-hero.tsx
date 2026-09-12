"use client";

import { Reveal } from "./reveal";

export function NameHero() {
  return (
    <section className="name-hero">
      <div className="name-hero-inner">
        <Reveal stagger={0.12}>
          {/* =====================================================
              TOP CTA
              ===================================================== */}

          <a
            href="https://www.linkedin.com/in/theanjalikamal"
            target="_blank"
            rel="noreferrer"
            className="name-hero-pill"
            data-reveal
            style={{
              position: "relative",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "7px",
              height: "32px",
              padding: "0 11px 0 13px",
              borderRadius: "999px",

              /* VERY SUBTLE NORMAL BORDER */
              border: "1px solid rgba(255,255,255,0.055)",

              /* PURE PITCH BLACK */
              background: "#000000",
              backgroundColor: "#000000",

              color: "#929292",
              textDecoration: "none",
              fontSize: "0.68rem",
              fontWeight: 700,
              letterSpacing: "-0.01em",
              lineHeight: 1,
              whiteSpace: "nowrap",
              overflow: "visible",

              /* NO EXTRA OUTER GLOW */
              boxShadow: "none",
            }}
          >
            {/* =====================================================
      MOVING BOUNDARY TRACE
      ===================================================== */}

            <svg
              aria-hidden="true"
              viewBox="0 0 100 32"
              preserveAspectRatio="none"
              style={{
                position: "absolute",
                top: "-1px",
                left: "-1px",
                width: "calc(100% + 2px)",
                height: "calc(100% + 2px)",
                overflow: "visible",
                pointerEvents: "none",
                zIndex: 0,
              }}
            >
              <defs>
                {/* GRADIENT */}

                <linearGradient
                  id="linkedin-arc-gradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#ff9a00" />
                  <stop offset="38%" stopColor="#ff4d4d" />
                  <stop offset="68%" stopColor="#ff00a8" />
                  <stop offset="100%" stopColor="#762cff" />
                </linearGradient>

                {/* VERY SOFT GLOW */}

                <filter
                  id="linkedin-arc-glow"
                  x="-100%"
                  y="-100%"
                  width="300%"
                  height="300%"
                >
                  <feGaussianBlur stdDeviation="0.8" result="blur" />

                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* =================================================
        SOFT GLOW TRACE
        ================================================= */}

              <rect
                x="1"
                y="1"
                width="98"
                height="30"
                rx="15"
                pathLength="100"
                fill="none"
                stroke="url(#linkedin-arc-gradient)"
                strokeWidth="1.35"
                strokeDasharray="9 91"
                strokeDashoffset="0"
                strokeLinecap="round"
                filter="url(#linkedin-arc-glow)"
              >
                <animate
                  attributeName="stroke-dashoffset"
                  from="0"
                  to="-100"
                  dur="7s"
                  repeatCount="indefinite"
                />
              </rect>

              {/* =================================================
        SHARP THIN TRACE
        ================================================= */}

              <rect
                x="1"
                y="1"
                width="98"
                height="30"
                rx="15"
                pathLength="100"
                fill="none"
                stroke="url(#linkedin-arc-gradient)"
                strokeWidth="0.75"
                strokeDasharray="9 91"
                strokeDashoffset="0"
                strokeLinecap="round"
              >
                <animate
                  attributeName="stroke-dashoffset"
                  from="0"
                  to="-100"
                  dur="7s"
                  repeatCount="indefinite"
                />
              </rect>
            </svg>

            {/* =====================================================
      CONTENT
      ===================================================== */}

            <span
              style={{
                position: "relative",
                zIndex: 2,
              }}
            >
              Say Hi on
            </span>

            {/* LINKEDIN ICON */}

            <svg
              className="linkedin-mark"
              viewBox="0 0 24 24"
              aria-hidden="true"
              style={{
                position: "relative",
                zIndex: 2,
                width: "13px",
                height: "13px",
                stroke: "#eeeeee",
                strokeWidth: 2.2,
                fill: "none",
                flexShrink: 0,
              }}
            >
              <path d="M6.5 8.5V18" />
              <path d="M6.5 5.5v.01" />
              <path d="M11 18v-5.2a2.8 2.8 0 0 1 5.6 0V18" />
              <path d="M11 10.8V18" />
            </svg>

            {/* ARROW */}

            <span
              style={{
                position: "relative",
                zIndex: 2,
                marginLeft: "1px",
                fontSize: "15px",
                lineHeight: 1,
                color: "#555555",
                transform: "translateY(-1px)",
              }}
            >
              ›
            </span>
          </a>

          {/* =====================================================
              NAME
              ===================================================== */}

          <h1 className="name-hero-name" data-reveal>
            ANJALI
          </h1>

          {/* =====================================================
              TAGLINE
              ===================================================== */}

          <p className="name-hero-tagline" data-reveal>
            I DESIGN AND BUILD PRODUCTS THAT
            <br />
            <em>ship, and actually work.</em>
          </p>

          {/* =====================================================
              LEFT / RIGHT META
              ===================================================== */}

          <div className="name-hero-badges" data-reveal>
            {/* LEFT */}

            <div className="name-hero-badge name-hero-badge-left">
              <span className="name-hero-badge-icon location-icon">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M12 21s6-5.1 6-11a6 6 0 1 0-12 0c0 5.9 6 11 6 11Z" />
                  <circle cx="12" cy="10" r="2" />
                </svg>
              </span>

              <div>
                <strong>BASED IN JABALPUR,</strong>
                <small>INDIA</small>
              </div>
            </div>

            {/* RIGHT */}

            <div className="name-hero-badge name-hero-badge-right">
              <span className="name-hero-badge-icon stack-icon">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <rect x="5" y="4" width="11" height="14" rx="1.5" />
                  <rect x="8" y="7" width="11" height="13" rx="1.5" />
                  <path d="M11 10h5" />
                  <path d="M11 13h5" />
                </svg>
              </span>

              <div>
                <strong>FULL STACK DEV,</strong>
                <small>&amp; Design</small>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
