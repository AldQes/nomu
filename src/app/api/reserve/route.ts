import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/email";

const RESTAURANT_EMAIL =
  process.env.RESTAURANT_EMAIL || "info@nomu-zurich.ch";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { date, time, partySize, name, email, phone, message } = body;

    // Validation
    const errors: string[] = [];

    if (!date) errors.push("date is required");
    if (!time) errors.push("time is required");
    if (!partySize || partySize < 1 || partySize > 12) {
      errors.push("partySize must be between 1 and 12");
    }
    if (!name || typeof name !== "string" || name.trim().length === 0) {
      errors.push("name is required");
    }
    if (!email || typeof email !== "string" || !email.includes("@")) {
      errors.push("valid email is required");
    }
    if (!phone || typeof phone !== "string" || phone.trim().length === 0) {
      errors.push("phone is required");
    }

    if (errors.length > 0) {
      return NextResponse.json(
        { success: false, error: errors.join(", ") },
        { status: 400 },
      );
    }

    // Build email text
    const text = [
      `New Reservation Request`,
      `─────────────────────────`,
      `Date:       ${date}`,
      `Time:       ${time}`,
      `Party Size: ${partySize}`,
      `Name:       ${name}`,
      `Email:      ${email}`,
      `Phone:      ${phone}`,
      message ? `Message:    ${message}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    const sent = await sendEmail({
      to: RESTAURANT_EMAIL,
      subject: `New Reservation: ${name} — ${date} at ${time}`,
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
