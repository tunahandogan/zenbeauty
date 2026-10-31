import { ArrowUpRight } from "lucide-react";
import { priceCta, serviceCategories, services } from "@/content/site";
import { serviceWhatsappUrl } from "@/lib/booking";

export function PriceTable() {
  return (
    <div className="grid gap-14">
      {serviceCategories.map((cat) => (
        <section key={cat.id} aria-labelledby={`fiyat-${cat.id}`}>
          <h2 id={`fiyat-${cat.id}`} className="eyebrow text-accent">
            {cat.label}
          </h2>
          <ul className="mt-4 divide-y divide-ink/15 border-y border-ink/15">
            {services
              .filter((s) => s.category === cat.id)
              .map((s) => {
                const wa = serviceWhatsappUrl(s);
                return (
                  <li key={s.slug} className="grid gap-3 py-5 sm:grid-cols-[1fr_auto] sm:items-center sm:gap-8">
                    <div>
                      <h3 className="font-serif text-xl">{s.title}</h3>
                      <p className="mt-1 max-w-xl text-sm leading-relaxed text-stone-600">{s.short}</p>
                    </div>
                    {s.price ? (
                      <p className="text-lg font-medium">{s.price}</p>
                    ) : wa ? (
                      <a
                        href={wa}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${s.title} için fiyat al, WhatsApp`}
                        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-sm border border-ink/70 px-5 text-[0.78rem] font-semibold tracking-[0.12em] uppercase transition-colors hover:bg-ink hover:text-paper"
                      >
                        {priceCta}
                        <ArrowUpRight className="size-4" strokeWidth={1.5} aria-hidden />
                      </a>
                    ) : null}
                  </li>
                );
              })}
          </ul>
        </section>
      ))}
    </div>
  );
}
