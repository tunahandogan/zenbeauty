"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useState, type MouseEvent } from "react";
import { bolumler, business, inspirationLabel, services } from "@/content/site";
import { setBolum, useAzHareket, type Bolum } from "@/lib/bolum";

const order: Bolum[] = ["kuafor", "guzellik"];
const EXPAND_MS = 750;

/**
 * Giriş: ziyaretçi "Saç" ya da "Gelin" bölümünü seçer.
 * Bekleten bir açılış ekranı değildir: sayfanın geri kalanı altında okunabilir durumdadır.
 * Seçilen panel genişleyip o bölümün hero'suna dönüşür (fotoğraf aynı kalır), seçim cihazda hatırlanır.
 * JS yoksa paneller ilgili hizmet bölümüne giden düz bağlantılardır.
 */
export function BolumChooser() {
  const [chosen, setChosen] = useState<Bolum | null>(null);
  const reduce = useAzHareket();

  function choose(id: Bolum, e: MouseEvent) {
    e.preventDefault();
    if (chosen) return;
    const finish = () => {
      setBolum(id);
      setChosen(null);
      window.scrollTo({ top: 0 });
      // Odağı yeni hero başlığına taşı (ekran okuyucu bağlamı kaybetmesin)
      requestAnimationFrame(() => document.querySelector<HTMLElement>(`[data-hero="${id}"] h1`)?.focus({ preventScroll: true }));
    };
    if (reduce) return finish();
    setChosen(id);
    window.setTimeout(finish, EXPAND_MS);
  }

  return (
    <section className="container-x pt-6 pb-12 secili:hidden md:pt-10 md:pb-20" aria-labelledby="secim-baslik">
      <div className={`grid gap-4 transition-opacity duration-500 lg:grid-cols-12 lg:items-end ${chosen ? "opacity-0" : ""}`}>
        <div className="lg:col-span-8">
          <p className="eyebrow animate-rise inline-flex items-center gap-3 text-accent">
            <span className="h-px w-7 bg-accent/60" aria-hidden />
            {business.city} · {business.district} · {business.mall.name}
          </p>
          <h1 id="secim-baslik" className="mt-4 animate-rise text-h1 [animation-delay:80ms]">
            Günlük saç da, <em className="text-accent">büyük gün de.</em>
          </h1>
        </div>
        <p className="animate-rise border-l border-accent/35 pl-4 text-lead text-stone-600 [animation-delay:160ms] lg:col-span-4 lg:mb-1">
          Hangi bölümü keşfetmek istersiniz?
        </p>
      </div>

      <div className="group/secim mt-6 flex flex-col gap-4 md:mt-10 md:h-[min(66svh,45rem)] md:flex-row md:gap-6">
        {order.map((id, i) => {
          const b = bolumler[id];
          const state = chosen === id ? "acik" : chosen ? "kapali" : "bos";
          const deptServices = services.filter((s) => s.category === b.category);
          return (
            <a
              key={id}
              href={`/hizmetler#${b.category}`}
              onClick={(e) => choose(id, e)}
              aria-label={`${b.label} bölümünü seç: ${b.chooserText}`}
              className={[
                "editorial-frame group relative block animate-rise overflow-hidden rounded-sm border border-ink/15 bg-stone-200 md:h-auto md:min-h-0 md:basis-0",
                "transition-[flex-grow,opacity,height] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
                // Masaüstünde üzerine gelinen panel genişler (yalnızca süs; bilgi hover'a bağlı değil)
                state === "bos" && "h-[33svh] min-h-56 md:grow md:hover:grow-[1.5] md:focus-visible:grow-[1.5]",
                state === "acik" && "h-[64svh] min-h-56 md:grow-[30]",
                state === "kapali" && "h-0 opacity-0 md:grow-0",
                i === 1 ? "[animation-delay:140ms]" : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <Image
                src={b.photo.src}
                alt=""
                fill
                preload
                placeholder="blur"
                sizes="(min-width: 768px) 60vw, 100vw"
                className="animate-unveil object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.055]"
                style={{ objectPosition: b.photo.focal }}
              />
              {/* Sinematik alt vinyet */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/45 via-ink/5 to-transparent transition-opacity duration-500 group-hover:opacity-80"
              />

              {/* Sol üst bölüm rozeti */}
              <span className="absolute top-3 left-3 border border-ink/10 bg-paper/90 px-2.5 py-1 text-[0.65rem] font-semibold tracking-[0.2em] text-ink uppercase backdrop-blur-sm">
                0{i + 1} · Bölüm {b.letter}
              </span>

              <span className="absolute top-3 right-3 bg-paper/90 px-2.5 py-1 text-[0.65rem] tracking-wide text-stone-600 backdrop-blur-sm">
                {inspirationLabel}
              </span>

              <span
                className={`absolute bottom-0 left-0 flex max-w-[90%] animate-rise items-end justify-between gap-4 border-t border-r border-ink/15 bg-paper/95 px-5 py-4 text-ink backdrop-blur-md transition-all duration-500 md:max-w-[calc(100%-2.5rem)] md:gap-6 md:px-8 md:py-6 ${
                  i === 0 ? "[animation-delay:300ms]" : "[animation-delay:420ms]"
                } ${state === "acik" ? "opacity-0" : ""}`}
              >
                {/* Üstte kayarak açılan vurgu çizgisi */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute top-0 right-0 left-0 h-[2px] origin-left scale-x-0 bg-accent transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100"
                />
                <span>
                  <span className="hidden text-[0.68rem] font-semibold tracking-[0.22em] text-accent uppercase md:block">
                    Bölüm {b.letter} · {deptServices.length} Başlık
                  </span>
                  <span className="block font-serif text-[2rem] leading-none transition-transform duration-500 group-hover:translate-x-1 md:mt-1.5 md:text-h2">
                    {b.label}
                  </span>
                  <span className="mt-1.5 block text-xs text-stone-600 md:mt-2 md:text-sm">{b.chooserText}</span>
                </span>
                <span
                  aria-hidden
                  className="mb-0.5 inline-flex size-10 shrink-0 items-center justify-center border border-ink/20 text-accent transition-all duration-500 group-hover:border-accent group-hover:bg-accent group-hover:text-paper md:size-12"
                >
                  <ArrowRight
                    strokeWidth={1.5}
                    className="size-5 transition-transform duration-500 group-hover:translate-x-1"
                  />
                </span>
              </span>
            </a>
          );
        })}
      </div>

      <p className={`mt-4 flex items-center gap-2 text-xs text-stone-500 transition-opacity duration-500 ${chosen ? "opacity-0" : ""}`}>
        <span className="text-accent" aria-hidden>
          ✦
        </span>
        <span>
          Seçiminize göre hizmetler, görseller ve randevu hattı öne çıkar. Seçim yalnızca bu cihazda hatırlanır; üst menüden
          istediğiniz an değiştirebilirsiniz.
        </span>
      </p>
    </section>
  );
}

