import ContactForm from "@/components/ContactForm";
import ScrollReveal from "@/components/ScrollReveal";
import { getContactPage, getSite } from "@/lib/content";

const ICONS = {
  pin: (
    <svg
      className="h-6 w-6 text-nomu-sage"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  ),
  phone: (
    <svg
      className="h-6 w-6 text-nomu-sage"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
      />
    </svg>
  ),
  envelope: (
    <svg
      className="h-6 w-6 text-nomu-sage"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </svg>
  ),
};

export default function ContactPage() {
  const page = getContactPage();
  const site = getSite();

  const contactInfo = [
    {
      label: "Address",
      lines: [site.address.street, site.address.country],
      icon: ICONS.pin,
    },
    {
      label: "Phone",
      lines: [site.phone],
      href: `tel:${site.phoneHref}`,
      icon: ICONS.phone,
    },
    {
      label: "Email",
      lines: [site.email],
      href: `mailto:${site.email}`,
      icon: ICONS.envelope,
    },
  ];

  return (
    <div className="font-sans">
      {/* Section 1 — Page Header */}
      <div className="bg-nomu-beige">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 py-20 md:py-28">
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-nomu-charcoal text-center tracking-tight">
            {page.heading}
          </h1>
          <p className="mt-4 text-nomu-charcoal/60 text-base sm:text-lg max-w-lg mx-auto text-center">
            {page.subheading}
          </p>
        </div>
      </div>

      {/* Section 2 — Info Grid */}
      <ScrollReveal>
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 py-16 lg:py-24">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {contactInfo.map((item) => (
              <div
                key={item.label}
                className="text-center sm:text-left bg-white rounded-2xl border border-nomu-stone/20 p-6 sm:p-8 flex flex-col sm:flex-row items-center sm:items-start gap-4"
              >
                <div className="flex-shrink-0 flex h-12 w-12 items-center justify-center rounded-full bg-nomu-sage/10">
                  {item.icon}
                </div>
                <div>
                  <h2 className="font-serif text-lg text-nomu-charcoal mb-1.5">
                    {item.label}
                  </h2>
                  {item.href
                    ? item.lines.map((line) => (
                        <a
                          key={line}
                          href={item.href}
                          className="block text-sm text-nomu-charcoal/70 hover:text-nomu-sage transition-colors"
                        >
                          {line}
                        </a>
                      ))
                    : item.lines.map((line) => (
                        <p
                          key={line}
                          className="text-sm text-nomu-charcoal/70"
                        >
                          {line}
                        </p>
                      ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* Section 3 — Opening Hours */}
      <ScrollReveal>
        <div className="bg-nomu-soft-white">
          <div className="mx-auto max-w-3xl px-6 sm:px-8 lg:px-12 py-16 lg:py-24">
            <h2 className="font-serif text-2xl sm:text-3xl text-nomu-charcoal text-center mb-10">
              {page.hoursHeading}
            </h2>
            <div className="overflow-hidden rounded-2xl border border-nomu-stone/20">
              <table className="w-full text-sm" aria-label="Opening hours">
                <thead>
                  <tr className="bg-nomu-beige text-left">
                    <th className="px-6 py-4 font-serif text-nomu-charcoal font-medium">
                      Day
                    </th>
                    <th className="px-6 py-4 font-serif text-nomu-charcoal font-medium">
                      Hours
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {site.hours.map(({ day, hours }, i) => (
                    <tr
                      key={day}
                      className={i % 2 === 1 ? "bg-nomu-beige/40" : "bg-white"}
                    >
                      <td className="px-6 py-4 text-nomu-charcoal">{day}</td>
                      <td className="px-6 py-4 text-nomu-charcoal/70 tabular-nums">
                        {hours}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Section 4 — Embedded Map */}
      <ScrollReveal>
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 py-16 lg:py-24">
          <h2 className="font-serif text-2xl sm:text-3xl text-nomu-charcoal text-center mb-10">
            {page.mapHeading}
          </h2>
          <div className="overflow-hidden rounded-2xl border border-nomu-stone/20 shadow-sm">
            <div className="relative w-full h-0 pb-[56.25%]">
              <iframe
                title={`${site.name} Location`}
                src={site.mapEmbedUrl}
                className="absolute inset-0 w-full h-full border-0"
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Section 5 — Contact Form */}
      <ScrollReveal>
        <div className="bg-nomu-beige">
          <div className="mx-auto max-w-2xl px-6 sm:px-8 lg:px-12 py-16 lg:py-24">
            <h2 className="font-serif text-2xl sm:text-3xl text-nomu-charcoal text-center mb-2">
              {page.formHeading}
            </h2>
            <p className="text-nomu-charcoal/60 text-sm text-center mb-10 max-w-md mx-auto">
              {page.formSubheading}
            </p>
            <ContactForm />
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}
