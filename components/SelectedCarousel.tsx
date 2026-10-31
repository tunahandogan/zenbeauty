"use client";

import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { inspirationLabel } from "@/content/site";
import type { Photo } from "@/content/types";

/** Ana sayfadaki dokunmatik "seçili kareler" şeridi (Embla). */
export function SelectedCarousel({ frames }: { frames: readonly (Photo & { caption: string })[] }) {
  const [viewportRef, embla] = useEmblaCarousel({ align: "start", containScroll: "trimSnaps", dragFree: false });
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const sync = useCallback(() => {
    if (!embla) return;
    setCanPrev(embla.canScrollPrev());
    setCanNext(embla.canScrollNext());
    setSelectedIndex(embla.selectedScrollSnap());
    const p = Math.max(0, Math.min(1, embla.scrollProgress()));
    setProgress(p);
  }, [embla]);

  useEffect(() => {
    if (!embla) return;
    embla.on("select", sync).on("reInit", sync).on("scroll", sync);
    const id = requestAnimationFrame(sync);
    return () => {
      cancelAnimationFrame(id);
      embla.off("select", sync).off("reInit", sync).off("scroll", sync);
    };
  }, [embla, sync]);

  return (
    <div role="region" aria-roledescription="carousel" aria-label="Seçili kareler">
      <div className="container-x mb-8 flex flex-wrap items-end justify-between gap-6">
        <p className="max-w-md border-l border-accent/35 pl-4 text-sm leading-relaxed text-stone-600">
          Bu kareler temsilî görsellerdir, salonun kendi çalışmaları değildir; gerçek fotoğraflar geldikçe değişecek. Kaydırarak gezinin.
        </p>
        <div className="flex items-center gap-5">
          <div className="hidden items-center gap-3 sm:flex" aria-hidden>
            <span className="font-serif text-sm italic text-accent">0{selectedIndex + 1}</span>
            <span className="h-[2px] w-24 overflow-hidden bg-ink/15">
              <span
                className="block h-full bg-accent transition-transform duration-300 ease-out"
                style={{
                  transform: `scaleX(${Math.max(1 / frames.length, progress)})`,
                  transformOrigin: "left center",
                }}
              />
            </span>
            <span className="font-serif text-sm text-stone-500 italic">0{frames.length}</span>
          </div>
          <div className="flex shrink-0 gap-2">
            <button
              type="button"
              onClick={() => embla?.scrollPrev()}
              disabled={!canPrev}
              aria-label="Önceki kareler"
              className="btn-slide inline-flex size-12 items-center justify-center border border-ink/30 bg-paper text-ink transition-colors hover:border-ink hover:text-paper disabled:pointer-events-none disabled:opacity-30 [--slide-bg:var(--color-ink)]"
            >
              <ArrowLeft className="size-5" strokeWidth={1.5} aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => embla?.scrollNext()}
              disabled={!canNext}
              aria-label="Sonraki kareler"
              className="btn-slide inline-flex size-12 items-center justify-center border border-ink/30 bg-paper text-ink transition-colors hover:border-ink hover:text-paper disabled:pointer-events-none disabled:opacity-30 [--slide-bg:var(--color-ink)]"
            >
              <ArrowRight className="size-5" strokeWidth={1.5} aria-hidden />
            </button>
          </div>
        </div>
      </div>
      <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={viewportRef}>
        <ul className="flex touch-pan-y gap-5 pl-[clamp(1rem,0.4rem+2.6vw,3rem)] md:gap-7">
          {frames.map((f, i) => (
            <li
              key={f.alt}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} / ${frames.length}`}
              className={`group min-w-0 shrink-0 ${
                i % 3 === 1
                  ? "basis-[68%] sm:basis-[42%] lg:basis-[30%]"
                  : "basis-[78%] sm:basis-[48%] lg:basis-[34%]"
              } last:mr-[clamp(1rem,0.4rem+2.6vw,3rem)]`}
            >
              <figure>
                <div className="mb-2 flex items-center justify-between text-[0.68rem] tracking-[0.2em] text-stone-500">
                  <span className="font-serif text-sm text-accent italic">0{i + 1}</span>
                  <span className="uppercase">{inspirationLabel}</span>
                </div>
                <div
                  className={`editorial-frame relative overflow-hidden border border-ink/10 bg-stone-200 ${
                    i % 3 === 1 ? "aspect-[3/4] sm:mt-10" : "aspect-[4/5]"
                  }`}
                >
                  <Image
                    src={f.src}
                    alt={f.alt}
                    fill
                    sizes="(min-width: 1024px) 34vw, (min-width: 640px) 48vw, 78vw"
                    placeholder="blur"
                    className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
                    style={{ objectPosition: f.focal }}
                  />
                </div>
                <figcaption className="mt-3.5 flex items-baseline justify-between gap-4 border-b border-ink/10 pb-2.5 transition-colors duration-300 group-hover:border-accent/50">
                  <span className="font-serif text-xl italic transition-transform duration-300 group-hover:translate-x-1 group-hover:text-accent">
                    {f.caption}
                  </span>
                  <span className="text-[0.7rem] text-stone-500">Foto: {f.credit.photographer}</span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

