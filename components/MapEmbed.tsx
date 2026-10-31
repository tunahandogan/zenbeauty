import { ArrowUpRight } from "lucide-react";
import { business } from "@/content/site";

export function MapEmbed({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <div className="aspect-[4/3] overflow-hidden rounded-md border border-ink/15 bg-paper-deep sm:aspect-[16/10]">
        <iframe
          src={business.mapEmbedUrl}
          title={business.mapTitle}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="size-full border-0"
        />
      </div>
      <a
        href={business.mall.directionsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 inline-flex min-h-11 items-center gap-2 font-semibold underline underline-offset-4 hover:text-accent"
      >
        {business.mall.directionsLabel}
        <ArrowUpRight className="size-4 text-accent" strokeWidth={1.5} aria-hidden />
      </a>
    </div>
  );
}
