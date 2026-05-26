import type { Metadata } from "next";
import Hero from "@/components/Hero";
import PrivateEventForm from "@/components/PrivateEventForm";
import ScrollReveal from "@/components/ScrollReveal";
import { getPrivateEvents } from "@/lib/content";

const events = getPrivateEvents();

export const metadata: Metadata = {
  title: `${events.hero.title} — NOMU Zurich`,
  description: events.metaDescription,
};

export default function PrivateEvents() {
  return (
    <>
      {/* ── 1. HERO ── */}
      <Hero
        image={events.hero.image}
        imageAlt={events.hero.imageAlt}
        title={events.hero.title}
        subtitle={events.hero.subtitle}
        heightClass="min-h-[70vh] sm:min-h-[80vh]"
        overlayOpacity="bg-black/55"
      />

      {/* ── 2. PITCH SECTION ── */}
      <ScrollReveal>
        <section className="px-6 sm:px-8 py-20 sm:py-28 max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl sm:text-4xl text-nomu-charcoal mb-6">
              {events.pitch.heading}
            </h2>
            <p className="text-lg text-nomu-charcoal/70 max-w-2xl mx-auto leading-relaxed whitespace-pre-line">
              {events.pitch.body}
            </p>
          </div>

          {/* Event type cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {events.pitch.eventTypes.map(({ title, description }) => (
              <div
                key={title}
                className="rounded-2xl bg-nomu-beige/60 p-8 text-center hover:bg-nomu-beige transition-colors duration-200"
              >
                <h3 className="font-serif text-xl text-nomu-charcoal mb-3">
                  {title}
                </h3>
                <p className="text-sm text-nomu-charcoal/65 leading-relaxed">
                  {description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center text-nomu-charcoal/60 text-sm">
            <p>{events.pitch.capacityNote}</p>
            <p className="mt-1 whitespace-pre-line">{events.pitch.extraNote}</p>
          </div>
        </section>
      </ScrollReveal>

      {/* ── 3. WHAT'S INCLUDED ── */}
      <ScrollReveal>
        <section className="bg-nomu-beige-light/50 px-6 sm:px-8 py-20 sm:py-28">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-3xl sm:text-4xl text-nomu-charcoal text-center mb-14">
              {events.includes.heading}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-10">
              {events.includes.items.map(({ title, description }) => (
                <div key={title} className="flex gap-4">
                  <div className="flex-shrink-0 mt-0.5">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-nomu-sage/20 text-nomu-sage">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-serif text-lg text-nomu-charcoal mb-1.5">
                      {title}
                    </h3>
                    <p className="text-sm text-nomu-charcoal/65 leading-relaxed">
                      {description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ── 4. PRICE ON REQUEST ── */}
      <ScrollReveal>
        <section className="px-6 sm:px-8 py-16 sm:py-20">
          <div className="max-w-xl mx-auto text-center">
            <div className="inline-block rounded-2xl bg-nomu-charcoal px-8 py-5">
              <p className="font-serif text-2xl sm:text-3xl text-white">
                {events.pricing.label}
              </p>
            </div>
            <p className="mt-6 text-nomu-charcoal/65 leading-relaxed whitespace-pre-line">
              {events.pricing.body}
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* ── 5. INQUIRY FORM ── */}
      <ScrollReveal>
        <section className="px-6 sm:px-8 py-20 sm:py-28 bg-nomu-beige/40">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl sm:text-4xl text-nomu-charcoal mb-4">
                {events.inquiry.heading}
              </h2>
              <p className="text-nomu-charcoal/70 max-w-lg mx-auto leading-relaxed whitespace-pre-line">
                {events.inquiry.body}
              </p>
            </div>

            <PrivateEventForm />
          </div>
        </section>
      </ScrollReveal>
    </>
  );
}
