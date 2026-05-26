import { Resend } from "resend";

type EmailOptions = {
  to: string;
  subject: string;
  text: string;
};

const RESEND_API_KEY = process.env.RESEND_API_KEY;

const FROM_ADDRESS = "NOMU Zurich <noreply@nomu-zurich.ch>";

export async function sendEmail(opts: EmailOptions): Promise<boolean> {
  if (!RESEND_API_KEY || RESEND_API_KEY === "re_") {
    // Dev mode — log the email to console instead of sending
    console.log("─── DEV EMAIL (Resend not configured) ───");
    console.log(`From:    ${FROM_ADDRESS}`);
    console.log(`To:      ${opts.to}`);
    console.log(`Subject: ${opts.subject}`);
    console.log("Body:");
    console.log(opts.text);
    console.log("────────────────────────────────────────────");
    return true;
  }

  try {
    const resend = new Resend(RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: FROM_ADDRESS,
      to: opts.to,
      subject: opts.subject,
      text: opts.text,
    });

    if (error) {
      console.error("Resend send error:", error);
      return false;
    }

    return true;
  } catch (err) {
    console.error("Resend exception:", err);
    return false;
  }
}
