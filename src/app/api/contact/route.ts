import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/email";

const CONTACT_EMAIL =
  process.env.CONTACT_EMAIL || "info@nomu-zurich.ch";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Validation
    const errors: string[] = [];

    if (!name || typeof name !== "string" || name.trim().length === 0) {
      errors.push("name is required");
    }
    if (!email || typeof email !== "string" || !email.includes("@")) {
      errors.push("valid email is required");
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
      `New Contact Form Message`,
      `─────────────────────────`,
      `Name:    ${name}`,
      `Email:   ${email}`,
      `Message: ${message}`,
    ].join("\n");

    const sent = await sendEmail({
      to: CONTACT_EMAIL,
      subject: `Contact Form: ${name}`,
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
