import MenuSection from "@/components/MenuSection";
import ScrollReveal from "@/components/ScrollReveal";
import { getMenu, getMenuPage } from "@/lib/content";

export default function MenuPage() {
  const page = getMenuPage();
  const menuCategories = getMenu();

  return (
    <>
      {/* Page header */}
      <section className="bg-nomu-beige pt-28 pb-16 sm:pt-32 sm:pb-20 px-6 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-nomu-charcoal tracking-tight">
            {page.heading}
          </h1>
          <p className="mt-4 text-nomu-charcoal/60 text-base sm:text-lg max-w-md mx-auto leading-relaxed">
            {page.subheading}
          </p>
        </div>
      </section>

      {/* Anchor navigation — sticky below the main nav */}
      <nav
        className="sticky top-[72px] z-40 bg-nomu-soft-white/90 backdrop-blur-sm border-b border-nomu-beige-light overflow-x-auto"
        aria-label="Menu categories"
      >
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <ul className="flex gap-1 py-3 min-w-max sm:justify-center" role="list">
            {menuCategories.map((cat) => (
              <li key={cat.id}>
                <a
                  href={`#${cat.id}`}
                  className="inline-block px-3 py-1.5 text-sm font-medium text-nomu-charcoal/70 hover:text-nomu-sage transition-colors duration-200 rounded-md hover:bg-nomu-beige/50 whitespace-nowrap"
                >
                  {cat.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Menu sections */}
      <div className="pt-20 pb-8">
        {menuCategories.map((category, idx) => (
          <ScrollReveal key={category.id} delay={idx * 80}>
            <MenuSection category={category} />
          </ScrollReveal>
        ))}
      </div>

      {/* Footer notes */}
      <section className="px-6 sm:px-8 lg:px-12 pb-24">
        <div className="mx-auto max-w-3xl border-t border-nomu-beige-light pt-12">
          <ul className="space-y-3 text-center text-sm text-nomu-charcoal/60 leading-relaxed">
            {page.notes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
