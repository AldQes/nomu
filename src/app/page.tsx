import Image from "next/image";
import Link from "next/link";
import Hero from "@/components/Hero";
import ReservationForm from "@/components/ReservationForm";
import ScrollReveal from "@/components/ScrollReveal";
import { getHome } from "@/lib/content";

export default function Home() {
  const home = getHome();

  return (
    <>
      {/* ── 1. HERO ── */}
      <Hero
        image={home.hero.image}
        imageAlt={home.hero.imageAlt}
        title={home.hero.title}
        subtitle={home.hero.subtitle}
        ctaButtons={[
          { text: home.hero.primaryCtaText, href: "#reservation" },
          { text: home.hero.secondaryCtaText, href: "/menu", variant: "secondary" },
        ]}
      />

      {/* ── 2. INTRO SECTION ── */}
      <ScrollReveal>
        <section
          className="bg-nomu-soft-white py-24 sm:py-32 px-6 sm:px-8"
          aria-labelledby="intro-heading"
        >
          <div className="mx-auto max-w-3xl text-center">
            <h2
              id="intro-heading"
              className="font-serif text-3xl sm:text-4xl text-nomu-charcoal mb-8 leading-tight"
            >
              {home.intro.heading}
            </h2>
            <p className="text-lg sm:text-xl text-nomu-charcoal/70 leading-relaxed max-w-2xl mx-auto whitespace-pre-line">
              {home.intro.body}
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* ── 3. FEATURED MENU HIGHLIGHTS ── */}
      <ScrollReveal>
        <section
          className="bg-nomu-beige py-24 sm:py-32 px-6 sm:px-8"
          aria-labelledby="featured-heading"
        >
          <div className="mx-auto max-w-6xl">
            <h2
              id="featured-heading"
              className="font-serif text-3xl sm:text-4xl text-nomu-charcoal text-center mb-4 leading-tight"
            >
              {home.featured.heading}
            </h2>
            <p className="text-lg text-center text-nomu-charcoal/60 mb-16 max-w-xl mx-auto">
              {home.featured.subheading}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {home.featured.items.map((item) => (
                <article
                  key={item.name}
                  className="group rounded-2xl bg-white shadow-sm overflow-hidden transition-shadow duration-300 hover:shadow-md"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  </div>
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-serif text-lg text-nomu-charcoal leading-snug">
                        {item.name}
                      </h3>
                      <span className="text-sm font-medium text-nomu-sage whitespace-nowrap pt-0.5">
                        CHF {item.price}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-nomu-charcoal/60 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-14 text-center">
              <Link
                href="/menu"
                className="inline-flex items-center justify-center rounded-full border-2 border-nomu-charcoal px-8 py-3.5 text-base font-medium text-nomu-charcoal transition-all duration-200 hover:bg-nomu-charcoal hover:text-white"
              >
                {home.featured.ctaText}
              </Link>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ── 4. RESERVATION FORM ── */}
      <ScrollReveal>
        <section
          id="reservation"
          className="bg-nomu-soft-white py-24 sm:py-32 px-6 sm:px-8 scroll-mt-20"
          aria-labelledby="reservation-heading"
        >
          <div className="mx-auto max-w-3xl">
            <h2
              id="reservation-heading"
              className="font-serif text-3xl sm:text-4xl text-nomu-charcoal text-center mb-4 leading-tight"
            >
              {home.reservation.heading}
            </h2>
            <p className="text-lg text-center text-nomu-charcoal/60 mb-12 max-w-xl mx-auto">
              {home.reservation.subheading}
            </p>
            <ReservationForm />
          </div>
        </section>
      </ScrollReveal>

      {/* ── 5. PRIVATE EVENTS TEASER ── */}
      <section
        className="relative py-24 sm:py-32 px-6 sm:px-8 flex items-center justify-center overflow-hidden"
        aria-labelledby="events-heading"
      >
        <Image
          src={home.eventsTeaser.image}
          alt={home.eventsTeaser.imageAlt}
          fill
          className="object-cover"
          loading="eager"
          sizes="100vw"
        />

        <div className="absolute inset-0 bg-nomu-charcoal/60" aria-hidden="true" />

        <ScrollReveal threshold={0.3}>
          <div className="relative z-10 mx-auto max-w-2xl text-center">
            <h2
              id="events-heading"
              className="font-serif text-3xl sm:text-4xl text-white mb-6 leading-tight"
            >
              {home.eventsTeaser.heading}
            </h2>
            <p className="text-lg text-white/85 leading-relaxed mb-10 max-w-xl mx-auto whitespace-pre-line">
              {home.eventsTeaser.body}
            </p>
            <Link
              href="/private-events"
              className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3.5 text-base font-medium text-nomu-charcoal transition-all duration-200 hover:bg-white/90 shadow-lg"
            >
              {home.eventsTeaser.ctaText}
            </Link>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}
