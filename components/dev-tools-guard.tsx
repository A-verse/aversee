"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function DevToolsGuard() {
  const [blocked, setBlocked] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkDevTools = () => {
      const widthGap = window.outerWidth - window.innerWidth;
      const heightGap = window.outerHeight - window.innerHeight;

      const widthDetected = widthGap > 160;
      const heightDetected = heightGap > 160;

      if (widthDetected || heightDetected) {
        setBlocked(true);
      }
    };

    const onKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();

      const shortcut =
        key === "f12" ||
        (e.ctrlKey && e.shiftKey && ["i", "j", "c"].includes(key)) ||
        (e.metaKey && e.altKey && ["i", "j", "c"].includes(key)) ||
        (e.ctrlKey && key === "u");

      if (shortcut) {
        setBlocked(true);
      }
    };

    checkDevTools();

    const interval = window.setInterval(checkDevTools, 500);

    window.addEventListener("resize", checkDevTools);
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.clearInterval(interval);
      window.removeEventListener("resize", checkDevTools);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  if (!blocked) return null;

  return (
    <div className="devtools-overlay" role="alertdialog" aria-modal="true">
      <div className="devtools-card">
        <div className="devtools-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="26" height="26" fill="none">
            <circle
              cx="12"
              cy="12"
              r="9.25"
              stroke="currentColor"
              strokeWidth="1.4"
            />
            <path
              d="M12 7.5V12l3 2"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <p className="devtools-eyebrow">ACCESS RESTRICTED</p>

        <h2 className="devtools-title">
          DEV TOOLS <em>detected</em>
        </h2>

        <p className="devtools-copy">
          Curious about how this was built?
          <br />
          Let&apos;s connect and chat about it.
        </p>

        <button
          className="devtools-btn devtools-btn-primary"
          onClick={() => {
            setBlocked(false);
            router.push("/");
          }}
        >
          <span aria-hidden="true">⌂</span>
          Return Home
        </button>

        <a
          className="devtools-btn devtools-btn-ghost"
          href="mailto:anjalikamal3105@gmail.com"
        >
          <span aria-hidden="true">✉</span>
          Get in Touch
        </a>

        <div className="devtools-footer">
          <div className="devtools-footer-links">
            <a href="/">Privacy</a>
            <span>·</span>
            <a href="/">Terms</a>
            <span>·</span>
            <a href="/about">About</a>
          </div>

          <p>
            © 2026 Anjali <em>Kamal</em>
          </p>
        </div>
      </div>
    </div>
  );
}
