"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { bolumler, neutralPreview, selectedFrames, services } from "@/content/site";
import { useAzHareket, useBolum } from "@/lib/bolum";
import { Photo } from "./Photo";
import { Reveal } from "./Reveal";
import { SelectedCarousel } from "./SelectedCarousel";
import { ServiceIndex } from "./ServiceIndex";

/**
 * Ana sayfanın ekran altındaki, seçilen bölüme göre değişen kısımları.
 * Bölüm değişince içerik kısa bir geçişle yer değiştirir.
 */
function useSwap() {
  const reduce = useAzHareket();
  return {
    initial: reduce ? { opacity: 0 } : { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    exit: reduce ? { opacity: 0 } : { opacity: 0, y: -12 },
    transition: { duration: reduce ? 0 : 0.5, ease: [0.22, 1, 0.36, 1] as const },
  };
}

export function HomeServices() {
  const bolum = useBolum();
  const swap = useSwap();
  const list = bolum ? services.filter((s) => s.category === bolumler[bolum].category) : services;
  const other = bolum ? bolumler[bolumler[bolum].other] : null;

  return (
    <section className="container-x py-20 md:py-28" aria-labelledby="hizmetler-baslik">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div key={bolum ?? "hepsi"} {...swap}>
          <Reveal className="mb-12 flex flex-wrap items-end justify-between gap-6 md:mb-16">
            <div>
              <p className="eyebrow inline-flex items-center gap-3 text-accent">
                <span className="h-px w-6 bg-accent/60" aria-hidden />
                {bolum ? `${bolumler[bolum].label} · Hizmetler` : "Hizmetler"}
              </p>
              <h2 id="hizmetler-baslik" className="mt-4 text-h2 [&_em]:text-accent">
                {bolum ? bolumler[bolum].servicesTitle : <>Kesimden gelin saçına, <em>yedi başlık.</em></>}
              </h2>
            </div>
            <Link
              href={bolum ? `/hizmetler#${bolumler[bolum].category}` : "/hizmetler"}
              className="group inline-flex min-h-11 items-center gap-2 text-sm font-semibold hover:text-accent"
            >
              <span className="link-underline">Tüm hizmetler</span>
              <ArrowRight className="size-4 text-accent transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.5} aria-hidden />
            </Link>
          </Reveal>
          <ServiceIndex items={list} />
          {other && (
            <p className="mt-8 text-sm text-stone-600">
              {other.label} bölümünün hizmetleri için{" "}
              <Link href={`/hizmetler#${other.category}`} className="link-underline inline-flex min-h-11 items-center font-semibold hover:text-accent">
                {other.label} hizmetleri
              </Link>
            </p>
          )}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}

export function HomeCarousel() {
  const bolum = useBolum();
  const swap = useSwap();
  const frames = bolum ? bolumler[bolum].frames : selectedFrames;
  return (
    <AnimatePresence mode="wait" initial={false}>
      {/* key: bölüm değişince Embla yeni karelerle sıfırdan kurulur */}
      <motion.div key={bolum ?? "hepsi"} {...swap}>
        <SelectedCarousel frames={frames} />
      </motion.div>
    </AnimatePresence>
  );
}

export function HomeGalleryPreview() {
  const bolum = useBolum();
  const swap = useSwap();
  const [a, b, c] = bolum ? bolumler[bolum].preview : neutralPreview;
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div key={bolum ?? "hepsi"} {...swap} className="grid gap-6 md:col-span-8 md:grid-cols-8 md:gap-8">
        <Reveal className="md:col-span-5" delay={0.05} variant="scale">
          <div className="mb-2 flex items-center justify-between text-[0.68rem] tracking-[0.2em] text-stone-500">
            <span className="font-serif text-sm text-accent italic">I</span>
            <span className="uppercase">Seçki</span>
          </div>
          <Photo photo={a} frame="aspect-[4/5]" sizes="(min-width: 768px) 40vw, 100vw" />
        </Reveal>
        <div className="grid grid-cols-2 gap-6 md:col-span-3 md:grid-cols-1 md:gap-8 md:pt-32">
          <Reveal delay={0.12} variant="right">
            <div className="mb-2 flex items-center justify-between text-[0.68rem] tracking-[0.2em] text-stone-500">
              <span className="font-serif text-sm text-accent italic">II</span>
              <span className="uppercase">Detay</span>
            </div>
            <Photo photo={b} frame="aspect-[3/4]" sizes="(min-width: 768px) 22vw, 50vw" />
          </Reveal>
          <Reveal delay={0.18} variant="right">
            <div className="mb-2 flex items-center justify-between text-[0.68rem] tracking-[0.2em] text-stone-500">
              <span className="font-serif text-sm text-accent italic">III</span>
              <span className="uppercase">Doku</span>
            </div>
            <Photo photo={c} frame="aspect-[4/3]" sizes="(min-width: 768px) 22vw, 50vw" />
          </Reveal>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

