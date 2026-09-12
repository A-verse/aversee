import { NextRequest, NextResponse } from "next/server";

import { insertContactSubmission } from "@/lib/data-store";
import { sendContactNotification } from "@/lib/email";
import { getRequestRateLimiter } from "@/lib/rate-limit";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const MAX_NAME_LENGTH = 80;
const MAX_EMAIL_LENGTH = 120;
const MAX_MESSAGE_LENGTH = 2000;

const MAX_REQUESTS_PER_MINUTE = 5;

function getClientIdentifier(request: NextRequest) {
  const forwarded = request.headers.get("x-forwarded-for") ?? "";
  const realIp = request.headers.get("x-real-ip") ?? "";

  return (forwarded.split(",")[0]?.trim() || realIp || "unknown-client").slice(
    0,
    64,
  );
}

export async function POST(request: NextRequest) {
  let body: {
    name?: string;
    email?: string;
    message?: string;
  };

  // ---------------------------------------------
  // Parse request
  // ---------------------------------------------

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      {
        error: "Invalid request body.",
      },
      {
        status: 400,
      },
    );
  }

  // ---------------------------------------------
  // Rate limiting
  // ---------------------------------------------

  const ip = getClientIdentifier(request);

  const rateLimit = getRequestRateLimiter(ip, MAX_REQUESTS_PER_MINUTE);

  if (!rateLimit.allowed) {
    return NextResponse.json(
      {
        error: "Too many requests. Please try again in a minute.",
      },
      {
        status: 429,
      },
    );
  }

  // ---------------------------------------------
  // Clean input
  // ---------------------------------------------

  const name = (typeof body.name === "string" ? body.name : "")
    .trim()
    .slice(0, MAX_NAME_LENGTH);

  const email = (typeof body.email === "string" ? body.email : "")
    .trim()
    .slice(0, MAX_EMAIL_LENGTH);

  const message = (typeof body.message === "string" ? body.message : "")
    .trim()
    .slice(0, MAX_MESSAGE_LENGTH);

  // ---------------------------------------------
  // Validation
  // ---------------------------------------------

  // Name is optional in the frontend.
  if (!message) {
    return NextResponse.json(
      {
        error: "Message is required.",
      },
      {
        status: 400,
      },
    );
  }

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      {
        error: "A valid email address is required.",
      },
      {
        status: 400,
      },
    );
  }

  if (message.length < 10) {
    return NextResponse.json(
      {
        error: "Message is too short.",
      },
      {
        status: 400,
      },
    );
  }

  // ---------------------------------------------
  // Save + email
  // ---------------------------------------------

  try {
    // 1. Save message in MongoDB
    const saved = await insertContactSubmission({
      name,
      email,
      message,
    });

    // 2. Send notification email through Resend
    const notification = await sendContactNotification({
      name: saved.name,
      email: saved.email,
      message: saved.message,
    });

    // ---------------------------------------------
    // MongoDB succeeded, email did not
    // ---------------------------------------------

    if (!notification.sent) {
      console.error(
        "Contact saved to MongoDB, but notification email was not sent.",
        {
          emailStatus: notification.reason,
        },
      );

      return NextResponse.json(
        {
          ok: true,
          saved: true,
          emailSent: false,
          emailStatus: notification.reason,
          error:
            notification.reason === "not_configured"
              ? "Message was saved, but email notifications are not configured."
              : "Message was saved, but the email notification could not be sent.",
        },
        {
          status: 201,
        },
      );
    }

    // ---------------------------------------------
    // Everything succeeded
    // ---------------------------------------------

    return NextResponse.json(
      {
        ok: true,
        saved: true,
        emailSent: true,
        emailStatus: "sent",
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.error("Contact submission failed:", error);

    return NextResponse.json(
      {
        ok: false,
        error: "Unable to save your message right now.",
      },
      {
        status: 500,
      },
    );
  }
}
