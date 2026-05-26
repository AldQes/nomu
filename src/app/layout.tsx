import type { Metadata } from "next";
import Script from "next/script";
import { Fraunces, DM_Sans } from "next/font/google";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "NOMU Zurich — All-Day Brunch & Matcha Bar",
  description:
    "Calm, minimal, premium all-day brunch café and matcha bar in Zurich. Fresh smoothies, healthy bowls, specialty toasts, and crafted matcha drinks.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-nomu-soft-white text-nomu-charcoal">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
        {/* Netlify Identity — redirects invited users to /admin/ after they
            confirm their email and set a password. Required for the CMS
            invite flow; harmless on the public site otherwise. */}
        <Script
          src="https://identity.netlify.com/v1/netlify-identity-widget.js"
          strategy="afterInteractive"
        />
        <Script id="netlify-identity-redirect" strategy="afterInteractive">
          {`
            if (window.netlifyIdentity) {
              window.netlifyIdentity.on("init", function (user) {
                // If already logged in (e.g., returning user or just confirmed invite), redirect
                if (user) {
                  document.location.href = "/admin/";
                } else {
                  // Otherwise, wait for login to complete
                  window.netlifyIdentity.on("login", function () {
                    document.location.href = "/admin/";
                  });
                }
              });
            }
          `}
        </Script>
      </body>
    </html>
  );
}
