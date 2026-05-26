import Image from "next/image";
import Link from "next/link";

interface CTAButton {
  text: string;
  href: string;
  variant?: "primary" | "secondary";
}

interface HeroProps {
  image: string; // path relative to /public, e.g. "/images/NOMU_PIC_3.jpeg"
  imageAlt: string;
  title: string;
  subtitle?: string;
  ctaButtons?: CTAButton[];
  /** Height override — defaults to min-h-screen on desktop, min-h-[80vh] on mobile */
  heightClass?: string;
  /** Override overlay opacity — defaults to 50% */
  overlayOpacity?: string;
}

export default function Hero({
  image,
  imageAlt,
  title,
  subtitle,
  ctaButtons,
  heightClass = "min-h-[80vh] sm:min-h-screen",
  overlayOpacity = "bg-black/50",
}: HeroProps) {
  return (
    <section
      className={`relative ${heightClass} flex items-center justify-center overflow-hidden`}
      aria-label={title}
    >
      {/* Background image */}
      <Image
        src={image}
        alt={imageAlt}
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />

      {/* Dark overlay */}
      <div
        className={`absolute inset-0 ${overlayOpacity}`}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-3xl px-6 sm:px-8 text-center">
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-tight tracking-tight">
          {title}
        </h1>

        {subtitle && (
          <p className="mt-6 text-lg sm:text-xl text-white/85 max-w-xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        )}

        {ctaButtons && ctaButtons.length > 0 && (
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            {ctaButtons.map(({ text, href, variant = "primary" }) => {
              const isPrimary = variant === "primary";
              return (
                <Link
                  key={`${href}-${text}`}
                  href={href}
                  className={`inline-flex items-center justify-center rounded-full px-8 py-3.5 text-base font-medium transition-all duration-200 ${
                    isPrimary
                      ? "bg-nomu-charcoal text-white hover:bg-nomu-charcoal/85 shadow-lg"
                      : "border-2 border-white/60 text-white hover:bg-white hover:text-nomu-charcoal"
                  }`}
                >
                  {text}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
