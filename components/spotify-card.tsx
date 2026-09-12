"use client";

import { useEffect, useState } from "react";

type Track = {
  isPlaying: boolean;
  name: string;
  artist: string;
  album: string;
  url: string;
  image: string | null;
};

type Response = {
  configured: boolean;
  track?: Track | null;
};

export function SpotifyCard() {
  const [data, setData] = useState<Response | null>(null);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const res = await fetch("/api/spotify/now-playing");

        if (!res.ok) {
          throw new Error("Spotify request failed");
        }

        const json = await res.json();

        if (!cancelled) {
          setData(json);
        }
      } catch {
        if (!cancelled) {
          setData({ configured: false });
        }
      }
    };

    load();

    const id = setInterval(load, 60_000);

    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, []);

  const track = data?.track;

  return (
    <div className="curtain-card spotify-last-played-card">
      {/* Spotify Header */}
      <div className="spotify-card-header">
        <div className="spotify-brand">
          <svg viewBox="0 0 24 24" aria-hidden="true" className="spotify-icon">
            <path
              fill="currentColor"
              d="M12 1.8A10.2 10.2 0 1 0 22.2 12 10.21 10.21 0 0 0 12 1.8Zm4.68 14.7a.75.75 0 0 1-1.03.25c-2.82-1.72-6.36-2.11-10.54-1.15a.75.75 0 1 1-.34-1.46c4.57-1.05 8.49-.6 11.66 1.34a.75.75 0 0 1 .25 1.02Zm1.37-3.05a.94.94 0 0 1-1.29.31c-3.22-1.98-8.13-2.55-11.94-1.4a.94.94 0 1 1-.55-1.79c4.35-1.32 9.76-.68 13.47 1.6a.94.94 0 0 1 .31 1.28Zm.12-3.18C14.3 8.1 8.16 7.92 4.6 9a1.12 1.12 0 1 1-.65-2.14c4.09-1.24 10.9-.99 15.05 1.47a1.12 1.12 0 0 1-1.15 1.94Z"
            />
          </svg>

          <span>{track?.isPlaying ? "Now Playing" : "Last Played"}</span>
        </div>
      </div>

      {/* Empty / loading state */}
      {!data && <div className="spotify-empty-state">Loading...</div>}

      {data && !data.configured && (
        <div className="spotify-empty-state">Spotify not connected yet.</div>
      )}

      {data && data.configured && !track && (
        <div className="spotify-empty-state">Nothing to show yet.</div>
      )}

      {/* Track */}
      {track && (
        <a
          href={track.url || "#"}
          target="_blank"
          rel="noreferrer"
          className="spotify-track-content"
        >
          {/* Blurred background artwork */}
          {track.image && (
            <div
              className="spotify-art-background"
              style={{
                backgroundImage: `url("${track.image}")`,
              }}
            />
          )}

          {/* Track text */}
          <div className="spotify-track-copy">
            <p>
              I recently listened to <strong>{track.name}</strong>
              by from the album <strong>{track.album}</strong>.
            </p>
          </div>

          {/* Vinyl */}
          <div className="spotify-vinyl">
            <div className="spotify-vinyl-ring ring-one" />
            <div className="spotify-vinyl-ring ring-two" />
            <div className="spotify-vinyl-ring ring-three" />

            <div className="spotify-vinyl-center">
              <div className="spotify-vinyl-label" />
            </div>
          </div>

          {/* Album cover */}
          {track.image && (
            <div className="spotify-album-cover">
              <img src={track.image} alt={track.album} />
            </div>
          )}
        </a>
      )}
    </div>
  );
}
