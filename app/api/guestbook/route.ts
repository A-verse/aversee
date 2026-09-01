import { NextRequest, NextResponse } from "next/server";
import {
  insertGuestbookSignature,
  readGuestbookSignatures,
} from "@/lib/data-store";
import { getRequestRateLimiter } from "@/lib/rate-limit";

const MAX_NAME_LENGTH = 60;
const MAX_MESSAGE_LENGTH = 400;
const MAX_REQUESTS_PER_MINUTE = 5;

export type Signature = {
  id: string;
  name: string;
  message: string;
  createdAt: string;
};

function getClientIdentifier(request: NextRequest) {
  const forwarded = request.headers.get("x-forwarded-for") ?? "";
  const realIp = request.headers.get("x-real-ip") ?? "";
  return (forwarded.split(",")[0]?.trim() || realIp || "unknown-client").slice(
    0,
    64,
  );
}

export async function GET() {
  try {
    const signatures = await readGuestbookSignatures();
    return NextResponse.json({ signatures });
  } catch (error) {
    const message = error instanceof Error ? error.message : "";
    const isConfigIssue =
      /Supabase.*configured|service-role key|misconfigured/i.test(message);

    return NextResponse.json(
      {
        signatures: [],
        error: isConfigIssue
          ? "Guestbook is temporarily unavailable."
          : "Unable to load signatures right now.",
      },
      { status: isConfigIssue ? 503 : 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  let body: { name?: string; message?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 },
    );
  }

  const ip = getClientIdentifier(request);
  const rateLimit = getRequestRateLimiter(ip, MAX_REQUESTS_PER_MINUTE);
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please try again in a minute." },
      { status: 429 },
    );
  }

  const rawName = typeof body.name === "string" ? body.name : "";
  const rawMessage = typeof body.message === "string" ? body.message : "";

  const name = rawName.trim().slice(0, MAX_NAME_LENGTH);
  const message = rawMessage.trim().slice(0, MAX_MESSAGE_LENGTH);

  if (!message) {
    return NextResponse.json(
      { error: "A message is required." },
      { status: 400 },
    );
  }

  if (message.length < 2) {
    return NextResponse.json(
      { error: "Message is too short." },
      { status: 400 },
    );
  }

  if (rawMessage.trim().length > MAX_MESSAGE_LENGTH) {
    return NextResponse.json(
      { error: "Message is too long." },
      { status: 400 },
    );
  }

  try {
    const signature = await insertGuestbookSignature({
      name: name || "Anonymous",
      message,
    });

    return NextResponse.json({ signatures: [signature] }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "";
    const isConfigIssue =
      /Supabase.*configured|service-role key|misconfigured/i.test(message);

    return NextResponse.json(
      {
        error: isConfigIssue
          ? "Guestbook is temporarily unavailable."
          : "Unable to save your signature right now.",
      },
      { status: isConfigIssue ? 503 : 500 },
    );
  }
}
