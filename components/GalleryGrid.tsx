"use client";

import { motion } from "motion/react";
import { Expand } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Counter from "yet-another-react-lightbox/plugins/counter";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/plugins/counter.css";
import { beforeAfter, bolumler, gallery, galleryCategories, inspirationLabel } from "@/content/site";
import { useAzHareket, useBolum } from "@/lib/bolum";
import type { GalleryCategory } from "@/content/types";

type Filter = GalleryCategory | "tumu";

const labels = {
  Previous: "Önceki",
  Next: "Sonraki",
  Close: "Kapat",
  Lightbox: "Büyük görüntü",
  Carousel: "Fotoğraf dizisi",
  Slide: "Fotoğraf",
  "Photo gallery": "Galeri",
  "{index} of {total}": "{index} / {total}",
};

/** Filtrelenebilir galeri + klavye/dokunma destekli lightbox (yet-another-react-lightbox) */
export function GalleryGrid() {
  const [filter, setFilter] = useState<Filter>("tumu");
  const [index, setIndex] = useState(-1);
  const reduce = useAzHareket();

  const bolum = useBolum();

  // Seçilen bölümün kategorileri önce gelir (filtre düğmeleri ve "Tümü" sırası)
  const rank = useMemo(() => {
    const first: readonly string[] = bolum ? bolumler[bolum].galleryCategories : [];
    return (c: string) => (first.includes(c) ? 0 : c === "mekan" ? 1 : bolum ? 2 : 1);
  }, [bolum]);
  const categories = useMemo(
    () => [galleryCategories[0], ...[...galleryCategories.slice(1)].sort((a, b) => rank(a.id) - rank(b.id))],
    [rank],
  );
  const items = useMemo(
    () => (filter === "tumu" ? [...gallery].sort((a, b) => rank(a.category) - rank(b.category)) : gallery.filter((g) => g.category === filter)),
    [filter, rank],
  );
  const slides = useMemo(
    () =>
      items.map((g) => ({
        src: g.src.src,
        width: g.src.width,
        height: g.src.height,
        alt: g.alt,
        title: g.caption,
        description: `${inspirationLabel} · Foto: ${g.credit.photographer} / Pexels`,
      })),
    [items],
  );

  return (
    <section className="container-x pb-24" aria-label="Fotoğraflar">
      <div className="sticky top-16 z-10 -mx-[clamp(1rem,0.4rem+2.6vw,3rem)] border-b border-ink/10 bg-paper/95 px-[clamp(1rem,0.4rem+2.6vw,3rem)] backdrop-blur-md md:top-20">
        <div role="group" aria-label="Kategoriye göre süz" className="-mx-1 flex flex-wrap gap-1.5 py-3">
          {categories.map((c) => {
            const count =
              c.id === "tumu"
                ? gallery.length
                : c.id === "oncesi-sonrasi"
                  ? beforeAfter.slots.length
                  : gallery.filter((g) => g.category === c.id).length;
            const active = filter === c.id;
            return (
              <button
                key={c.id}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(c.id)}
                className={`relative inline-flex min-h-11 shrink-0 items-center gap-2 border px-4 text-[0.78rem] font-semibold tracking-[0.12em] uppercase whitespace-nowrap transition-colors duration-300 ${
                  active ? "border-ink text-paper" : "border-ink/15 bg-paper-deep/50 text-ink/75 hover:border-accent/50 hover:text-accent"
                }`}
              >
                {active && (
                  <motion.div
                    layoutId="galeri-filtre-zemin"
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-ink"
                    transition={reduce ? { duration: 0 } : { type: "spring", bounce: 0.16, duration: 0.5 }}
                  />
                )}
                <em className="relative not-italic">{c.label}</em>
                <span className={`relative text-[0.7rem] font-medium ${active ? "text-accent-tint" : "text-stone-500"}`}>{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        {items.length} fotoğraf gösteriliyor
      </p>

      {filter === "oncesi-sonrasi" ? (
        <ul className="mt-10 grid gap-6 md:grid-cols-3">
          {beforeAfter.slots.map((slot) => (
            <li key={slot.label}>
              <figure>
                <div className="grid grid-cols-2 gap-3">
                  {["Öncesi", "Sonrası"].map((side) => (
                    <div
                      key={side}
                      role="img"
                      aria-label={`${slot.label}: ${side.toLowerCase()} fotoğrafı henüz eklenmedi`}
                      className="flex aspect-[3/4] items-end border border-dashed border-ink/35 bg-paper-deep/60 p-3"
                    >
                      <span className="eyebrow text-[0.65rem] text-stone-600">{side}</span>
                    </div>
                  ))}
                </div>
                <figcaption className="mt-3 border-b border-ink/10 pb-3 text-sm">
                  <span className="font-serif text-base italic">{slot.label}</span>
                  <span className="mt-1 block text-xs leading-relaxed text-stone-600">{slot.note}</span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      ) : (
      <motion.ul
        key={`${filter}-${bolum ?? "hepsi"}`}
        initial={reduce ? false : { opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="mt-10 columns-2 gap-4 sm:gap-6 md:columns-3 lg:columns-4"
      >
        {items.map((g, i) => (
          <motion.li
            key={g.alt}
            initial={reduce ? false : { opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: reduce ? 0 : 0.55,
              delay: reduce ? 0 : Math.min(i * 0.035, 0.35),
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mb-5 break-inside-avoid sm:mb-7"
          >
            <figure className="group">
              <button
                type="button"
                onClick={() => setIndex(i)}
                className="editorial-frame relative block w-full overflow-hidden border border-ink/10 bg-stone-200 text-left"
                aria-label={`Büyüt: ${g.caption}`}
              >
                <Image
                  src={g.src}
                  alt={g.alt}
                  sizes="(min-width: 1024px) 24vw, (min-width: 768px) 32vw, 50vw"
                  placeholder="blur"
                  className="h-auto w-full transition-transform duration-[1.1s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />
                <span className="absolute top-2.5 left-2.5 bg-paper/90 px-2 py-0.5 font-serif text-[0.68rem] text-accent italic backdrop-blur-sm">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="absolute right-2.5 bottom-2.5 inline-flex size-9 items-center justify-center border border-ink/15 bg-paper/95 text-ink opacity-90 transition-all duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-paper md:translate-y-2 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 md:group-focus-visible:translate-y-0 md:group-focus-visible:opacity-100">
                  <Expand className="size-4" strokeWidth={1.5} aria-hidden />
                </span>
              </button>
              <figcaption className="mt-2.5 flex flex-wrap items-baseline justify-between gap-x-3 border-b border-ink/10 pb-2 text-sm transition-colors duration-300 group-hover:border-accent/40">
                <span className="font-serif text-base italic transition-colors duration-300 group-hover:text-accent">{g.caption}</span>
                <span className="text-[0.68rem] text-stone-500">
                  {inspirationLabel} · {g.credit.photographer}
                </span>
              </figcaption>
            </figure>
          </motion.li>
        ))}
      </motion.ul>
      )}

      <p className="mt-12 max-w-xl border-l-2 border-accent/40 pl-4 text-sm leading-relaxed text-stone-600">
        Temsilî görseller salonun işi değildir. Gerçek çalışmalar ve müşteri izinli renk dönüşümü fotoğrafları
        geldiğinde bu bölüm onlarla değiştirilecek.
      </p>

      <Lightbox
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        slides={slides}
        plugins={[Captions, Counter]}
        labels={labels}
        captions={{ descriptionTextAlign: "start" }}
        animation={reduce ? { fade: 0, swipe: 0 } : undefined}
        controller={{ closeOnBackdropClick: true }}
      />
    </section>
  );
}

