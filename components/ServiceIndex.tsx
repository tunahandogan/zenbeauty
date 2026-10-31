"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { bolumler, inspirationLabel, services } from "@/content/site";
import type { Service } from "@/content/types";
import { useAzHareket } from "@/lib/bolum";

/**
 * Numaralı, tipografik hizmet dizini.
 * Masaüstünde satırın üstüne gelince/odaklanınca seçili satır zemini kayar ve yandaki fotoğraf
 * slide+scale geçişiyle değişir (yalnızca süs); mobilde her satır kendi küçük fotoğrafını gösterir.
 */
export function ServiceIndex({ items = services }: { items?: Service[] }) {
  const [active, setActive] = useState(0);
  const reduce = useAzHareket();
  const safeActive = active < items.length ? active : 0;
  const current = items[safeActive] ?? items[0];

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
      <ol className="lg:col-span-7">
        {items.map((s, i) => {
          const isCurrent = i === safeActive;
          return (
            <li key={s.slug} className="relative border-t border-ink/15 last:border-b">
              {isCurrent && (
                <motion.span
                  layoutId="hizmet-aktif-satir"
                  aria-hidden
                  className="pointer-events-none absolute inset-0 hidden border-l-2 border-accent bg-paper-deep/65 lg:block"
                  transition={reduce ? { duration: 0 } : { type: "spring", bounce: 0.15, duration: 0.55 }}
                />
              )}
              <Link
                href={`/hizmetler/${s.slug}`}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                className="group relative grid grid-cols-[auto_1fr_auto] items-center gap-x-4 gap-y-1 py-5 transition-all duration-300 sm:gap-x-7 md:py-7 lg:px-5"
              >
                <span
                  className={`self-start pt-1.5 font-serif text-lg italic transition-colors duration-300 ${
                    isCurrent ? "text-accent" : "text-stone-500 group-hover:text-accent"
                  }`}
                >
                  {s.number}
                </span>
                <span>
                  <span className="block font-serif text-h3 transition-all duration-300 group-hover:translate-x-1.5 group-hover:text-accent group-focus-visible:text-accent">
                    {s.title}
                  </span>
                  <span className="mt-1.5 block max-w-md text-sm leading-relaxed text-stone-600">{s.short}</span>
                  <span className="mt-3 flex flex-wrap gap-1.5">
                    {s.items.map((item) => (
                      <span
                        key={item.name}
                        className="border border-ink/12 bg-paper/80 px-2 py-0.5 text-[0.68rem] font-medium tracking-wide text-stone-600 transition-colors duration-300 group-hover:border-accent/30 group-hover:text-ink"
                      >
                        {item.name}
                      </span>
                    ))}
                  </span>
                </span>
                <span className="relative size-16 shrink-0 overflow-hidden rounded-sm border border-ink/10 bg-stone-200 sm:size-20 lg:hidden">
                  <Image
                    src={s.photo.src}
                    alt=""
                    fill
                    sizes="80px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    style={{ objectPosition: s.photo.focal }}
                  />
                </span>
                <span
                  aria-hidden
                  className={`hidden size-11 items-center justify-center border transition-all duration-300 lg:inline-flex ${
                    isCurrent
                      ? "border-accent bg-accent text-paper"
                      : "border-ink/15 text-ink/50 group-hover:border-accent group-hover:bg-accent group-hover:text-paper"
                  }`}
                >
                  <ArrowUpRight
                    strokeWidth={1.5}
                    className="size-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </span>
              </Link>
            </li>
          );
        })}
      </ol>
      <div className="hidden lg:col-span-5 lg:block" aria-hidden>
        <div className="sticky top-28">
          <div className="editorial-frame relative aspect-[4/5] overflow-hidden rounded-sm border border-ink/15 bg-stone-200">
            <AnimatePresence initial={false}>
              <motion.div
                key={current.slug}
                className="absolute inset-0"
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24, scale: 1.05 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, y: -16, scale: 0.98 }}
                transition={{ duration: reduce ? 0 : 0.65, ease: [0.22, 1, 0.36, 1] }}
              >
                <Image
                  src={current.photo.src}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 36vw, 1px"
                  className="object-cover"
                  style={{ objectPosition: current.photo.focal }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent" />
              </motion.div>
            </AnimatePresence>

            {/* Sağ önizleme altında kayan bilgi kartı */}
            <div className="absolute right-4 bottom-4 left-4 rounded-sm border border-ink/10 bg-paper/95 p-4">
              <div className="flex items-baseline justify-between gap-3">
                <span className="eyebrow text-[0.65rem] text-accent">
                  {current.number} · {`${current.category === "sac" ? bolumler.kuafor.label : bolumler.guzellik.label} bölümü`}
                </span>
                <span className="font-serif text-xs text-stone-500 italic">
                  0{safeActive + 1} / 0{items.length}
                </span>
              </div>
              <p className="mt-1 font-serif text-xl text-ink italic">{current.title}</p>
              <div className="mt-3 h-[2px] w-full overflow-hidden bg-ink/10">
                <div
                  className="h-full bg-accent transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                  style={{ width: `${((safeActive + 1) / items.length) * 100}%` }}
                />
              </div>
            </div>
          </div>
          <p className="mt-2.5 flex items-center gap-2 text-[0.7rem] tracking-wide text-stone-500">
            <span className="h-px w-4 bg-ink/25" />
            {inspirationLabel} · Foto: {current.photo.credit.photographer} / Pexels
          </p>
        </div>
      </div>
    </div>
  );
}

