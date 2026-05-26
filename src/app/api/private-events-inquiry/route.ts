import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/email";

const EVENTS_EMAIL =
  process.env.EVENTS_EMAIL || "events@nomu-zurich.ch";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, preferredDate, eventType, guestCount, message } =
      body;

    // Validation
    const errors: string[] = [];

    if (!name || typeof name !== "string" || name.trim().length === 0) {
      errors.push("name is required");
    }
    if (!email || typeof email !== "string" || !email.includes("@")) {
      errors.push("valid email is required");
    }
    if (!phone || typeof phone !== "string" || phone.trim().length === 0) {
      errors.push("phone is required");
    }
    if (
      !preferredDate ||
      typeof preferredDate !== "string" ||
      preferredDate.trim().length === 0
    ) {
      errors.push("preferredDate is required");
    }
    if (
      !eventType ||
      typeof eventType !== "string" ||
      eventType.trim().length === 0
    ) {
      errors.push("eventType is required");
    }
    if (!guestCount || typeof guestCount !== "number" || guestCount < 1) {
      errors.push("guestCount must be at least 1");
    }
    if (
      !message ||
      typeof message !== "string" ||
      message.trim().length === 0
    ) {
      errors.push("message is required");
    }

    if (errors.length > 0) {
      return NextResponse.json(
        { success: false, error: errors.join(", ") },
        { status: 400 },
      );
    }

    // Build email text
    const text = [
      `New Private Events Inquiry`,
      `──────────────────────────────`,
      `Name:          ${name}`,
      `Email:         ${email}`,
      `Phone:         ${phone}`,
      `Preferred Date: ${preferredDate}`,
      `Event Type:    ${eventType}`,
      `Guest Count:   ${guestCount}`,
      `Message:       ${message}`,
    ].join("\n");

    const sent = await sendEmail({
      to: EVENTS_EMAIL,
      subject: `Private Event Inquiry: ${name} — ${eventType}`,
      text,
    });

    if (!sent) {
      return NextResponse.json(
        { success: false, error: "Failed to send email. Please try again later." },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid request body." },
      { status: 400 },
    );
  }
}
