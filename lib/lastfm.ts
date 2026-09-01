type LastFmTrack = {
  name: string;
  artist: string;
  album: string;
  url: string;
  image: string | null;
  timestamp?: number;
  isPlaying: boolean;
};

export type LastFmResponse = {
  configured: boolean;
  track: LastFmTrack | null;
};

type LastFmApiTrack = {
  name?: string;
  artist?: { "#text"?: string };
  album?: { "#text"?: string };
  image?: Array<{ "#text"?: string; size?: string }>;
  url?: string;
  date?: { uts?: string };
  "@attr"?: { nowplaying?: string };
};

type LastFmApiResponse = {
  recenttracks?: {
    track?: LastFmApiTrack[];
  };
};

const CACHE_KEY = "lastfm-track";
const CACHE_TTL_MS = 60_000;
const cache = new Map<string, { expiresAt: number; data: LastFmResponse }>();

function parseTrack(
  track: LastFmApiTrack | undefined,
  isPlaying: boolean,
): LastFmTrack | null {
  if (!track) return null;

  const image =
    track.image
      ?.find((item) => item.size === "extralarge" || item.size === "large")
      ?.["#text"]?.trim() ||
    track.image?.[track.image.length - 1]?.["#text"]?.trim() ||
    null;

  const timestampValue = Number(track.date?.uts ?? 0);

  return {
    name: track.name?.trim() || "Unknown track",
    artist: track.artist?.["#text"]?.trim() || "Unknown artist",
    album: track.album?.["#text"]?.trim() || "Unknown album",
    url: track.url?.trim() || "",
    image,
    timestamp: timestampValue > 0 ? timestampValue * 1000 : undefined,
    isPlaying,
  };
}

async function fetchLastFmTrack(): Promise<LastFmResponse> {
  const apiKey = process.env.LASTFM_API_KEY?.trim();
  const username = process.env.LASTFM_USERNAME?.trim();

  if (!apiKey || !username) {
    console.log("LASTFM DEBUG:", {
      hasApiKey: !!apiKey,
      hasUsername: !!username,
    });

    return { configured: false, track: null };
  }

  const endpoint = new URL("https://ws.audioscrobbler.com/2.0/");
  endpoint.searchParams.set("method", "user.getrecenttracks");
  endpoint.searchParams.set("user", username);
  endpoint.searchParams.set("api_key", apiKey);
  endpoint.searchParams.set("format", "json");
  endpoint.searchParams.set("limit", "2");

  const response = await fetch(endpoint.toString(), { cache: "no-store" });
  if (!response.ok) {
    throw new Error("Last.fm request failed.");
  }

  const payload = (await response.json()) as LastFmApiResponse;
  const tracks = payload.recenttracks?.track ?? [];
  const currentTrack = tracks[0];

  if (!currentTrack) {
    return { configured: true, track: null };
  }

  const currentlyPlaying = Boolean(currentTrack["@attr"]?.nowplaying);
  const selectedTrack = parseTrack(currentTrack, currentlyPlaying);

  if (!selectedTrack) {
    return { configured: true, track: null };
  }

  return { configured: true, track: selectedTrack };
}

export async function getLastFmTrack(): Promise<LastFmResponse> {
  const cached = cache.get(CACHE_KEY);
  const now = Date.now();

  if (cached && cached.expiresAt > now) {
    return cached.data;
  }

  try {
    const fresh = await fetchLastFmTrack();
    cache.set(CACHE_KEY, { expiresAt: now + CACHE_TTL_MS, data: fresh });
    return fresh;
  } catch {
    if (cached) {
      return cached.data;
    }

    return { configured: true, track: null };
  }
}
