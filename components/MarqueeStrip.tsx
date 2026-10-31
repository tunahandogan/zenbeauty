import { business, services, tesettur } from "@/content/site";

const items = [
  ...services.map((s) => ({ number: s.number, text: s.title })),
  { number: "—", text: `${tesettur.title}` },
  { number: "—", text: `${business.city} · ${business.district} · ${business.mall.name}` },
];

/**
 * Bölmeler arasında sürekli akan editoryal tipografi şeridi (slide marquee).
 */
export function MarqueeStrip({ tone = "ink" }: { tone?: "ink" | "paper" }) {
  const bg = tone === "ink" ? "bg-ink text-paper border-paper/10" : "bg-paper-deep text-ink border-ink/10";
  const accent = tone === "ink" ? "text-accent-tint" : "text-accent";
  const muted = tone === "ink" ? "text-on-ink-muted" : "text-stone-500";

  return (
    <div
      aria-hidden="true"
      className={`overflow-hidden border-y py-4 select-none ${bg}`}
    >
      <div className="flex w-max animate-marquee items-center hover:[animation-play-state:paused]">
        {[0, 1].map((dup) => (
          <div key={dup} className="flex shrink-0 items-center">
            {items.map((item, idx) => (
              <span key={`${dup}-${idx}`} className="inline-flex items-center gap-4 px-6 sm:px-8">
                <span className={`font-serif text-sm italic ${accent}`}>{item.number}</span>
                <span className="font-serif text-lg tracking-wide italic sm:text-xl">{item.text}</span>
                <span className={`ml-4 text-[0.6rem] ${muted}`}>•</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
