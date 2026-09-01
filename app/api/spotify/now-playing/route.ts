import { NextResponse } from "next/server";

import { getLastFmTrack } from "@/lib/lastfm";

export async function GET() {
  try {
    const data = await getLastFmTrack();

    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=600",
      },
    });
  } catch (error) {
    console.error("Last.fm error:", error);

    return NextResponse.json(
      {
        configured: false,
        track: null,
        error: error instanceof Error ? error.message : "Unknown Last.fm error",
      },
      { status: 500 },
    );
  }
}
