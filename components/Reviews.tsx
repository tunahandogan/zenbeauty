import { ArrowUpRight, Star } from "lucide-react";
import { business, reviews } from "@/content/site";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/PageIntro";

const dateFmt = new Intl.DateTimeFormat("tr-TR", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

export function Reviews({ className = "" }: { className?: string }) {
  const { rating, reviewCount, photoCount, checkedAt } = business.google;
  const ratingText = rating.toString().replace(".", ",");
  const photoCountText = new Intl.NumberFormat("tr-TR").format(photoCount);
  const checked = dateFmt.format(new Date(`${checkedAt}T00:00:00Z`));
  return (
    <section className={`container-x py-20 md:py-28 ${className}`} aria-labelledby="yorumlar-baslik">
      <Reveal className="grid gap-6 md:grid-cols-12 md:items-end">
        <div className="md:col-span-7">
          <SectionHeading
            eyebrow="Yorumlar"
            title={
              <span id="yorumlar-baslik">
                Gelenler <em>ne diyor?</em>
              </span>
            }
          />
        </div>
        <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-stone-700 md:col-span-5 md:justify-end">
          <Star className="size-4 fill-accent text-accent" strokeWidth={1.5} aria-hidden />
          <span>
            Google&apos;da <strong className="font-semibold text-ink">{ratingText}</strong> · {reviewCount} yorum · {photoCountText} fotoğraf
          </span>
          <span className="text-sm text-stone-600">({checked} itibarıyla)</span>
        </p>
      </Reveal>

      <ul className="mt-10 grid gap-5 md:grid-cols-3">
        {reviews.slice(0, 3).map((r, i) => (
          <li key={`${r.initials}-${r.when}`}>
            <Reveal delay={i * 0.06} className="h-full">
              <figure className="flex h-full flex-col rounded-md border border-ink/15 bg-paper-deep/55 p-6">
                <blockquote className="flex-1 text-lg leading-relaxed">&ldquo;{r.text}&rdquo;</blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-ink/10 pt-4 text-sm">
                  <span
                    aria-hidden
                    className="grid size-9 shrink-0 place-items-center rounded-full bg-accent-tint text-xs font-semibold text-accent-deep"
                  >
                    {r.initials.charAt(0)}
                  </span>
                  <span>
                    <span className="block font-medium">{r.initials}</span>
                    <span className="block text-stone-600">
                      {r.topic} · {r.when}
                    </span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          </li>
        ))}
      </ul>

      <a
        href={business.mall.sourceUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group mt-8 inline-flex min-h-11 items-center gap-2 font-semibold underline underline-offset-4 hover:text-accent"
      >
        Google&apos;da tüm yorumlar
        <ArrowUpRight className="size-4 text-accent" strokeWidth={1.5} aria-hidden />
      </a>
    </section>
  );
}
