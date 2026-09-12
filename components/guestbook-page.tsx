"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { PageFrame, SiteShell } from "./site-shell";
import { BehindTheCurtains, ContactFooter } from "./home-sections";

type Signature = {
  id: string;
  name: string;
  message: string;
  createdAt: string;
};

const pinned = {
  name: "Anjali Kamal",
  date: "Aug 2026",
  message: "Welcome — leave a note if you stopped by 👋",
};

function formatDate(iso: string) {
  try {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
    }).format(new Date(iso));
  } catch {
    return "";
  }
}

function initials(name: string) {
  return (
    name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join("") || "?"
  );
}

export function GuestbookPage() {
  const [signatures, setSignatures] = useState<Signature[] | null>(null);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    fetch("/api/guestbook")
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) {
          setSignatures(data.signatures ?? []);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setSignatures([]);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const submit = async (e: FormEvent) => {
    e.preventDefault();

    if (!message.trim()) {
      setError("Say at least a little something.");
      setStatus("error");
      return;
    }

    setStatus("submitting");
    setError("");

    try {
      const res = await fetch("/api/guestbook", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          message,
        }),
      });

      if (!res.ok) {
        throw new Error("Request failed");
      }

      const data = await res.json();

      setSignatures(data.signatures ?? []);
      setName("");
      setMessage("");
      setStatus("idle");
    } catch {
      setError("Something went wrong — try again in a moment.");
      setStatus("error");
    }
  };

  return (
    <SiteShell>
      <PageFrame>
        {/* HERO */}
        <div className="guestbook-hero">
          {/* LEFT */}
          <div className="guestbook-hero-copy">
            <p className="eyebrow">LEAVE YOUR SIGNATURE</p>

            <h1 className="guestbook-title">
              GUEST
              <br />
              <em>book</em>
            </h1>
          </div>

          {/* RIGHT FORM */}
          <form className="guestbook-signin" onSubmit={submit}>
            <h2>
              Leave your <em>signature!</em>
            </h2>

            <p>
              No sign-in needed — just drop a name (or stay anonymous) and a
              note.
            </p>

            <input
              className="guestbook-input"
              placeholder="Your name (optional)"
              value={name}
              maxLength={60}
              onChange={(e) => setName(e.target.value)}
            />

            <textarea
              className="guestbook-input guestbook-textarea"
              placeholder="Leave a message..."
              value={message}
              maxLength={400}
              onChange={(e) => setMessage(e.target.value)}
              required
            />

            <button
              className="guestbook-submit"
              type="submit"
              disabled={status === "submitting"}
            >
              {status === "submitting" ? "Signing…" : "Sign the guestbook"}
            </button>

            {status === "error" && (
              <small className="guestbook-error">{error}</small>
            )}

            <small>Messages are public and shown below instantly.</small>
          </form>
        </div>

        {/* RECENT SIGNATURES */}
        <p className="guestbook-section-label">RECENT SIGNATURES</p>

        <div className="guestbook-grid">
          {/* PINNED */}
          <div className="guestbook-card guestbook-pinned">
            <div className="guestbook-card-head">
              <div className="guestbook-avatar">{initials(pinned.name)}</div>

              <div>
                <strong>{pinned.name}</strong>
                <small>{pinned.date}</small>
              </div>

              <span className="guestbook-pin">📌</span>
            </div>

            <p>{pinned.message}</p>

            <em>— {pinned.name}</em>
          </div>

          {/* LOADING */}
          {signatures === null && (
            <div className="guestbook-card guestbook-empty">
              <p>Loading signatures…</p>
            </div>
          )}

          {/* EMPTY */}
          {signatures?.length === 0 && (
            <div className="guestbook-card guestbook-empty">
              <p>No other signatures yet.</p>

              <small>Be the first to leave one — the form above is live.</small>
            </div>
          )}

          {/* SIGNATURES */}
          {signatures?.map((sig) => (
            <div key={sig.id} className="guestbook-card">
              <div className="guestbook-card-head">
                <div className="guestbook-avatar">{initials(sig.name)}</div>

                <div>
                  <strong>{sig.name}</strong>
                  <small>{formatDate(sig.createdAt)}</small>
                </div>
              </div>

              <p>{sig.message}</p>

              <em>— {sig.name}</em>
            </div>
          ))}
        </div>

        {/* BACK HOME */}
        <Link
          href="/"
          className="mt-12 inline-block text-sm text-muted-foreground hover:text-foreground"
        >
          ← Back home
        </Link>
      </PageFrame>

      <BehindTheCurtains />
      <ContactFooter />
    </SiteShell>
  );
}
