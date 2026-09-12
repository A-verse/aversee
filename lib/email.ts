import { Resend } from "resend";

export type ContactNotificationInput = {
  name: string;
  email: string;
  message: string;
};

export type ContactNotificationResult = {
  sent: boolean;
  reason: "not_configured" | "sent" | "failed";
};

const EMAIL_CACHE = new Map<string, string>();

function getNotificationEmail() {
  const configured = process.env.CONTACT_NOTIFICATION_EMAIL?.trim();

  if (!configured) {
    return null;
  }

  EMAIL_CACHE.set("notification-email", configured);

  return configured;
}

export async function sendContactNotification(
  input: ContactNotificationInput,
): Promise<ContactNotificationResult> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const toEmail = getNotificationEmail();

  if (!apiKey || !toEmail) {
    console.warn(
      "Contact email is not configured. Missing RESEND_API_KEY or CONTACT_NOTIFICATION_EMAIL.",
    );

    return {
      sent: false,
      reason: "not_configured",
    };
  }

  try {
    const resend = new Resend(apiKey);

    const response = await resend.emails.send({
      from: "Portfolio Contact <no-reply@resend.dev>",
      to: [toEmail],
      replyTo: input.email,
      subject: `New message from ${input.name}`,
      text: `Name: ${input.name}
Email: ${input.email}

${input.message}`,
    });

    if (response.error) {
      console.error("Resend error:", response.error);

      return {
        sent: false,
        reason: "failed",
      };
    }

    console.log("Contact email sent successfully.");

    return {
      sent: true,
      reason: "sent",
    };
  } catch (error) {
    console.error("Contact email send failed:", error);

    return {
      sent: false,
      reason: "failed",
    };
  }
}
