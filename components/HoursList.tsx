import { business } from "@/content/site";

export function HoursList({ tone = "ink", className = "" }: { tone?: "ink" | "paper"; className?: string }) {
  const muted = tone === "paper" ? "text-on-ink-muted" : "text-stone-600";
  return (
    <dl className={`grid gap-2 ${className}`}>
      {business.hours.map((h) => (
        <div key={h.days} className="flex flex-wrap justify-between gap-x-6 gap-y-0.5 border-b border-current/10 pb-2 last:border-0">
          <dt className={muted}>{h.days}</dt>
          <dd className="font-medium">{h.time}</dd>
        </div>
      ))}
    </dl>
  );
}
