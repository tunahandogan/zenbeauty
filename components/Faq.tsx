import { Plus } from "lucide-react";
import { faqs } from "@/content/site";

export function Faq({ limit, className = "" }: { limit?: number; className?: string }) {
  const items = limit ? faqs.slice(0, limit) : faqs;
  return (
    <div className={`divide-y divide-ink/15 border-y border-ink/15 ${className}`}>
      {items.map((f) => (
        <details key={f.q} className="group">
          <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-4 font-serif text-lg marker:hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent [&::-webkit-details-marker]:hidden">
            {f.q}
            <Plus
              className="size-5 shrink-0 text-accent transition-transform duration-300 group-open:rotate-45"
              strokeWidth={1.5}
              aria-hidden
            />
          </summary>
          <p className="measure pb-5 leading-relaxed text-stone-700">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
