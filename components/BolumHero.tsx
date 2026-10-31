import { ArrowRight, Phone as PhoneIcon } from "lucide-react";
import Image from "next/image";
import { bolumler, business, getPhone, inspirationLabel } from "@/content/site";
import type { Bolum } from "@/lib/bolum";
import { BolumOtherLink } from "./BolumSwitch";
import { ButtonLink } from "./ButtonLink";

// Tailwind sınıfları statik olmalı: her bölümün görünürlük sınıfı burada açıkça yazılı
const visible: Record<Bolum, string> = { kuafor: "kuafor:grid", guzellik: "guzellik:grid" };

/**
 * Seçilen bölümün hero'su. İki varyant da sunucuda üretilir; hangisinin görüneceğini
 * <html data-bolum> belirler. Görünür olduğu anda CSS giriş animasyonları yeniden oynar.
 * Fotoğraf seçim ekranındaki panelle aynıdır: seçilen panel genişleyip bu hero'ya dönüşür.
 */
export function BolumHero({ id }: { id: Bolum }) {
  const b = bolumler[id];
  const phone = getPhone(b.desk);
  return (
    <section
      data-hero={id}
      aria-labelledby={`hero-${id}`}
      className={`container-x hidden gap-x-12 pt-8 pb-16 md:pt-10 lg:grid-cols-12 lg:grid-rows-[auto_auto_1fr] lg:pb-24 ${visible[id]}`}
    >
      <div className="lg:col-span-5 lg:row-start-1 lg:pt-[8vh]">
        <p className="eyebrow animate-rise inline-flex items-center gap-3 text-accent">
          <span className="h-px w-7 bg-accent/60" aria-hidden />
          {business.city} · {business.district} · {b.label}
        </p>
        <h1
          id={`hero-${id}`}
          tabIndex={-1}
          className="mt-5 animate-rise text-display outline-none [animation-delay:80ms] lg:mt-8 lg:-mr-24"
        >
          {b.heroTitle} <em className="text-accent">{b.heroAccent}</em>
        </h1>
      </div>

      <div className="order-4 mt-10 animate-rise [animation-delay:200ms] lg:order-none lg:col-span-5 lg:row-start-2 lg:mt-8">
        <p className="measure max-w-md border-l-2 border-accent/40 pl-4 text-lead text-stone-600">
          {b.lead} {business.district}, {business.mall.name}.
        </p>
      </div>

      <div className="order-2 mt-8 animate-rise [animation-delay:160ms] lg:order-none lg:col-span-5 lg:row-start-3 lg:mt-10 lg: flex lg:flex-col lg:justify-between">
        <div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/randevu">
              {b.cta} <ArrowRight className="size-4" strokeWidth={1.5} aria-hidden />
            </ButtonLink>
            <ButtonLink href="/galeri" variant="outline">
              Çalışmaları keşfet
            </ButtonLink>
          </div>
          <div className="mt-3">
            <BolumOtherLink to={b.other} />
          </div>
        </div>

        {/* Sol sütun altını dengeleyen editoryal özet şeridi */}
        <div className="mt-10 hidden grid-cols-2 gap-6 border-t border-ink/15 pt-5 lg:grid">
          <div>
            <p className="eyebrow text-[0.65rem] text-stone-500">Bölüm {b.letter}</p>
            <p className="mt-1 font-serif text-lg italic">{b.chooserText}</p>
          </div>
          {phone && (
            <div>
              <p className="eyebrow text-[0.65rem] text-stone-500">{b.label} Hattı</p>
              <a
                href={`tel:${phone.e164}`}
                className="mt-1 inline-flex min-h-11 items-center gap-2 font-serif text-lg italic transition-colors hover:text-accent"
              >
                <PhoneIcon className="size-3.5 text-accent" strokeWidth={1.5} aria-hidden />
                {phone.display}
              </a>
            </div>
          )}
        </div>
      </div>

      <div className="group relative order-3 mt-6 -mr-[clamp(1rem,0.4rem+2.6vw,3rem)] ml-10 sm:ml-24 lg:order-none lg:col-span-6 lg:col-start-7 lg:row-span-3 lg:row-start-1 lg:mt-0 lg:ml-0">
        <div className="editorial-frame relative aspect-[4/5] max-h-[calc(100svh-7rem)] w-full overflow-hidden rounded-md border border-ink/10 bg-stone-200">
          <Image
            src={b.photo.src}
            alt={b.photo.alt}
            fill
            placeholder="blur"
            sizes="(min-width: 1024px) 50vw, 85vw"
            className="animate-unveil object-cover transition-transform duration-[1.6s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
            style={{ objectPosition: b.photo.focal }}
          />
          <div className="pointer-events-none absolute bottom-4 left-4 hidden rounded-sm border border-ink/10 bg-paper/90 px-4 py-2.5 sm:block">
            <p className="eyebrow text-[0.62rem] text-accent">
              Bölüm {b.letter} · {b.label}
            </p>
            <p className="mt-0.5 font-serif text-sm text-ink italic">
              {business.mall.name} · {business.district}
            </p>
          </div>
        </div>
        <p className="mt-2.5 flex items-center gap-2 text-[0.7rem] tracking-wide text-stone-500">
          <span className="h-px w-4 bg-ink/25" aria-hidden />
          {inspirationLabel} · Foto: {b.photo.credit.photographer} / Pexels
        </p>
        <p className="absolute bottom-10 -left-8 hidden rotate-180 text-[0.7rem] font-semibold tracking-[0.3em] text-stone-500 uppercase [writing-mode:vertical-rl] sm:block lg:-left-10">
          {b.letter} · {b.label} bölümü
        </p>
      </div>
    </section>
  );
}

