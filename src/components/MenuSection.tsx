import Image from "next/image";
import type { MenuCategory } from "@/lib/content";

interface MenuSectionProps {
  category: MenuCategory;
}

function formatPrice(item: {
  price: number;
  priceNote?: string;
}): string {
  if (item.priceNote) return item.priceNote;
  return `${item.price.toFixed(2)} CHF`;
}

export default function MenuSection({ category }: MenuSectionProps) {
  return (
    <section
      id={category.id}
      className="scroll-mt-28 px-6 sm:px-8 lg:px-12 pb-16"
      aria-labelledby={`heading-${category.id}`}
    >
      <div className="mx-auto max-w-3xl">
        {/* Category header with decorative line */}
        <div className="mb-10">
          <h2
            id={`heading-${category.id}`}
            className="font-serif text-3xl sm:text-4xl text-nomu-charcoal tracking-tight"
          >
            {category.name}
          </h2>
          <div
            className="mt-3 h-px w-16 bg-nomu-sage/60"
            aria-hidden="true"
          />
        </div>

        {/* Category description */}
        {category.description && (
          <p className="mb-8 text-nomu-charcoal/70 text-base leading-relaxed max-w-xl">
            {category.description}
          </p>
        )}

        {/* Category image — shown inline within the section */}
        {category.image && (
          <div className="mb-10">
            <div className="overflow-hidden rounded-2xl shadow-md aspect-[16/9] relative">
              <Image
                src={category.image}
                alt={`${category.name} — NOMU Zurich`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 720px"
              />
            </div>
          </div>
        )}

        {/* Menu items */}
        <ul className="space-y-6" role="list">
          {category.items.map((item) => (
            <li
              key={item.name}
              className="flex items-baseline justify-between gap-4"
            >
              <div className="min-w-0">
                <span className="text-nomu-charcoal font-medium text-base sm:text-lg">
                  {item.name}
                </span>
                {item.description && (
                  <p className="mt-1 text-sm text-nomu-charcoal/60 leading-relaxed">
                    {item.description}
                  </p>
                )}
              </div>
              <span className="shrink-0 text-right text-nomu-charcoal/80 text-base sm:text-lg tabular-nums">
                {formatPrice(item)}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
