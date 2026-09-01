"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { PageFrame, PageHero, SiteShell } from "./site-shell";
import { Reveal } from "./reveal";
import { BehindTheCurtains, ContactFooter } from "./home-sections";
import { Github, Linkedin, Instagram } from "lucide-react";

export function BookCallPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  const [error, setError] = useState("");

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error ?? "Something went wrong.");
      }

      setStatus("success");

      setForm({
        name: "",
        email: "",
        message: "",
      });
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  return (
    <SiteShell>
      <PageHero
        eyebrow="Open to opportunities"
        title="LET'S TALK"
        sub="ABOUT WHAT YOU'RE"
        em="building."
      />

      <PageFrame>
        {/* =========================
            CONTACT CARDS
        ========================== */}
        <div className="book-call-cards">
          {/* =========================
              LEFT INFO CARD
          ========================== */}
          <Reveal>
            <div className="guestbook-signin book-call-info-card" data-reveal>
              <div className="book-call-info-top">
                <h2>ANJALI KAMAL</h2>

                <p>Full Stack Developer &amp; Data Engineer</p>

                <div className="book-call-image-wrap">
                  <img
                    src="/images/avatar.jpg"
                    alt="Anjali"
                    className="book-call-image"
                  />
                </div>

                <div className="book-call-socials">
                  <a
                    href="https://github.com/"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="GitHub"
                  >
                    <Github size={22} strokeWidth={1.8} />
                  </a>

                  <a
                    href="https://linkedin.com/"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="LinkedIn"
                  >
                    <Linkedin size={22} strokeWidth={1.8} />
                  </a>

                  <a
                    href="https://instagram.com/"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Instagram"
                  >
                    <Instagram size={22} strokeWidth={1.8} />
                  </a>
                </div>
              </div>
            </div>
          </Reveal>

          {/* =========================
              RIGHT MESSAGE CARD
          ========================== */}
          <Reveal>
            <form
              className="guestbook-signin book-call-form"
              data-reveal
              onSubmit={submit}
            >
              <h2>
                Send a <em>message.</em>
              </h2>

              <p>
                Goes straight into my inbox queue — I check it daily during
                placement season.
              </p>

              <input
                className="guestbook-input"
                placeholder="Your name"
                value={form.name}
                maxLength={80}
                required
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    name: e.target.value,
                  }))
                }
              />

              <input
                className="guestbook-input"
                type="email"
                placeholder="Your email"
                value={form.email}
                maxLength={120}
                required
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    email: e.target.value,
                  }))
                }
              />

              <textarea
                className="guestbook-input guestbook-textarea"
                placeholder="What are you building?"
                value={form.message}
                maxLength={2000}
                required
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    message: e.target.value,
                  }))
                }
              />

              <button
                className="guestbook-submit"
                type="submit"
                disabled={status === "submitting"}
              >
                {status === "submitting" ? "Sending…" : "Send message"}
              </button>

              {status === "success" && (
                <small
                  style={{
                    display: "block",
                    marginTop: ".6rem",
                    color: "#3ddc84",
                  }}
                >
                  Sent — thank you! I&apos;ll reply by email soon.
                </small>
              )}

              {status === "error" && (
                <small className="guestbook-error">{error}</small>
              )}

              <small>
                Prefer email directly?{" "}
                <a
                  href="mailto:anjalikamal3105@gmail.com"
                  style={{ textDecoration: "underline" }}
                >
                  anjalikamal3105@gmail.com
                </a>
              </small>
            </form>
          </Reveal>
        </div>

        <Link
          href="/"
          className="mt-12 inline-block text-sm text-muted-foreground hover:text-foreground"
        >
          ← Back home
        </Link>
      </PageFrame>

      <BehindTheCurtains />
      <ContactFooter />

      <style jsx>{`
        /* =========================
           TWO CARD LAYOUT
        ========================== */

        .book-call-cards {
          width: 100%;
          display: grid;
          grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.15fr);
          gap: clamp(1.5rem, 4vw, 4rem);
          align-items: start;
          margin-top: clamp(2rem, 5vh, 4rem);
        }

        /* =========================
           LEFT INFO CARD
        ========================== */

        .book-call-info-card {
          width: 100%;
          max-width: none !important;
          min-height: 100%;
          box-sizing: border-box;

          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .book-call-info-top {
          display: flex;
          flex-direction: column;
        }

        .book-call-info-card h2 {
          margin: 0;
        }

        .book-call-info-card p {
          margin-top: 0.8rem;
          max-width: 24rem;
        }

        /* =========================
           PHOTO
        ========================== */

        .book-call-image-wrap {
          width: 100%;
          height: clamp(12rem, 17vw, 16rem);
          overflow: hidden;
          border-radius: 0.7rem;
          margin-top: 1.8rem;
          background: rgba(255, 255, 255, 0.03);
        }

        .book-call-image {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: cover;
        }

        /* =========================
           SOCIALS
        ========================== */

        .book-call-socials {
          display: flex;
          gap: 0.55rem;
          margin-top: 1.2rem;
        }

        .book-call-socials a {
          width: 3.2rem;
          height: 3.2rem;
          padding: 0;

          display: grid;
          place-items: center;

          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 0.55rem;

          background: rgba(255, 255, 255, 0.96);
          color: #111;

          text-decoration: none;

          transition:
            transform 0.2s ease,
            opacity 0.2s ease;
        }

        .book-call-socials a:hover {
          transform: translateY(-2px);
          opacity: 0.8;
        }

        /* =========================
           CONTACT INFO
        ========================== */

        .book-call-contact {
          display: flex;
          flex-direction: column;
          gap: 0.65rem;

          margin-top: 2.5rem;
          padding-top: 1.3rem;

          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }

        .book-call-contact a {
          color: inherit;
          text-decoration: none;
          font-size: 0.9rem;

          transition: opacity 0.2s ease;
        }

        .book-call-contact a:hover {
          opacity: 0.65;
        }

        /* =========================
           RIGHT FORM
        ========================== */

        .book-call-form {
          width: 100%;
          max-width: none !important;
          height: auto;
          min-height: 0;
          box-sizing: border-box;
        }

        /* =========================
           TABLET
        ========================== */

        @media (max-width: 900px) {
          .book-call-cards {
            grid-template-columns: 1fr 1fr;
            gap: 1.5rem;
          }

          .book-call-image-wrap {
            height: 16rem;
          }
        }

        /* =========================
           MOBILE
        ========================== */

        @media (max-width: 700px) {
          .book-call-cards {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .book-call-info-card {
            min-height: auto;
          }

          .book-call-form {
            height: auto;
            min-height: 0;
          }

          .book-call-image-wrap {
            height: 18rem;
          }
        }
      `}</style>
    </SiteShell>
  );
}
