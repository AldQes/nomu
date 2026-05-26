import Link from "next/link";
import { getSite } from "@/lib/content";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

export default function Footer() {
  const site = getSite();
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="bg-nomu-beige text-nomu-charcoal"
      role="contentinfo"
      aria-label="Site footer"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 py-16 lg:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
          {/* Column 1 — Hours */}
          <section aria-labelledby="footer-hours-heading">
            <h3
              id="footer-hours-heading"
              className="font-serif text-lg text-nomu-charcoal mb-4"
            >
              Opening Hours
            </h3>
            <dl className="space-y-3">
              {site.hours.map(({ day, hours }) => (
                <div key={day} className="flex flex-col">
                  <dt className="text-sm text-nomu-charcoal/70">{day}</dt>
                  <dd className="text-sm font-medium">{hours}</dd>
                </div>
              ))}
            </dl>
          </section>

          {/* Column 2 — Address */}
          <section aria-labelledby="footer-address-heading">
            <h3
              id="footer-address-heading"
              className="font-serif text-lg text-nomu-charcoal mb-4"
            >
              Visit Us
            </h3>
            <address className="not-italic space-y-1 text-sm">
              <p>{site.name}</p>
              <p className="text-nomu-charcoal/70">{site.address.street}</p>
              <p className="text-nomu-charcoal/70">{site.address.country}</p>
            </address>
            <p className="mt-4 text-sm">
              <a
                href={`tel:${site.phoneHref}`}
                className="text-nomu-sage hover:text-nomu-sage/80 transition-colors"
              >
                {site.phone}
              </a>
            </p>
            <p className="mt-1 text-sm">
              <a
                href={`mailto:${site.email}`}
                className="text-nomu-sage hover:text-nomu-sage/80 transition-colors"
              >
                {site.email}
              </a>
            </p>
          </section>

          {/* Column 3 — Social / Follow */}
          <section aria-labelledby="footer-social-heading">
            <h3
              id="footer-social-heading"
              className="font-serif text-lg text-nomu-charcoal mb-4"
            >
              Follow Us
            </h3>
            <a
              href={site.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-nomu-sage hover:text-nomu-sage/80 transition-colors"
              aria-label={`${site.name} on Instagram (opens in new tab)`}
            >
              <InstagramIcon className="h-5 w-5" />
              <span>{site.instagram.handle}</span>
            </a>
          </section>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-nomu-stone/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-nomu-charcoal/60">
          <p>&copy; {currentYear} {site.name}. All rights reserved.</p>
          <Link
            href="/contact"
            className="text-nomu-sage hover:text-nomu-sage/80 transition-colors"
          >
            Contact &amp; Location
          </Link>
        </div>
      </div>
    </footer>
  );
}
