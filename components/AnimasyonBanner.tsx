"use client";

import { ArrowRight, Play, RotateCcw, Sparkles } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { bolumler } from "@/content/site";
import {
  replayAnimations,
  setBolum,
  setHareketZorla,
  useBolum,
  useHareketZorla,
} from "@/lib/bolum";

const quickLinks = [
  { href: "/?animasyon=1", label: "Ana Sayfa" },
  { href: "/hizmetler?animasyon=1", label: "Hizmetler" },
  { href: "/galeri?animasyon=1", label: "Galeri" },
  { href: "/salon?animasyon=1", label: "Salon" },
  { href: "/randevu?animasyon=1", label: "Randevu" },
  { href: "/iletisim?animasyon=1", label: "İletişim" },
] as const;

export function AnimasyonBanner() {
  const bolum = useBolum();
  const zorla = useHareketZorla();

  useEffect(() => {
    if (!zorla) setHareketZorla(true);
  }, [zorla]);

  return (
    <section
      aria-label="Zorunlu animasyon stüdyosu"
      className="on-ink border-b border-paper/15 bg-ink text-paper"
    >
      <div className="container-x py-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 border border-accent-tint/40 bg-accent/40 px-3 py-1.5 text-[0.7rem] font-semibold tracking-[0.18em] text-accent-tint uppercase">
              <Sparkles className="size-3.5" strokeWidth={1.5} aria-hidden />
              Zorunlu Animasyon URL&apos;si Aktif
            </span>
            <p className="text-xs text-on-ink-muted sm:text-sm">
              Bilgisayarınızda animasyonlar kapalı olsa bile (<em>prefers-reduced-motion</em>) tüm geçiş, slide ve perde efektleri zorla açıldı.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setBolum(null);
                requestAnimationFrame(() => replayAnimations());
              }}
              className={`inline-flex min-h-11 items-center gap-2 border px-3.5 text-[0.72rem] font-semibold tracking-[0.14em] uppercase transition-colors ${
                bolum === null
                  ? "border-paper bg-paper text-ink"
                  : "border-paper/25 text-paper/80 hover:border-paper hover:text-paper"
              }`}
            >
              <Play className="size-3.5" strokeWidth={1.5} aria-hidden />
              Giriş Seçimi
            </button>
            <button
              type="button"
              onClick={() => {
                setBolum("kuafor");
                requestAnimationFrame(() => replayAnimations());
              }}
              className={`inline-flex min-h-11 items-center gap-2 border px-3.5 text-[0.72rem] font-semibold tracking-[0.14em] uppercase transition-colors ${
                bolum === "kuafor"
                  ? "border-paper bg-paper text-ink"
                  : "border-paper/25 text-paper/80 hover:border-paper hover:text-paper"
              }`}
            >
              {bolumler.kuafor.label} Hero
            </button>
            <button
              type="button"
              onClick={() => {
                setBolum("guzellik");
                requestAnimationFrame(() => replayAnimations());
              }}
              className={`inline-flex min-h-11 items-center gap-2 border px-3.5 text-[0.72rem] font-semibold tracking-[0.14em] uppercase transition-colors ${
                bolum === "guzellik"
                  ? "border-paper bg-paper text-ink"
                  : "border-paper/25 text-paper/80 hover:border-paper hover:text-paper"
              }`}
            >
              {bolumler.guzellik.label} Hero
            </button>
            <button
              type="button"
              onClick={() => replayAnimations()}
              className="inline-flex min-h-11 items-center gap-2 bg-accent px-4 text-[0.72rem] font-semibold tracking-[0.14em] text-paper uppercase transition-colors hover:bg-accent-deep"
            >
              <RotateCcw className="size-3.5" strokeWidth={1.5} aria-hidden />
              Animasyonları Tekrarla
            </button>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-paper/10 pt-3 text-xs">
          <span className="eyebrow mr-2 text-on-ink-muted">Sayfaları animasyonlu gez:</span>
          {quickLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="inline-flex min-h-11 items-center gap-1.5 border border-paper/15 px-3 text-[0.72rem] font-semibold tracking-[0.12em] text-paper/90 uppercase transition-colors hover:border-accent-tint hover:bg-paper/10 hover:text-paper"
            >
              {item.label}
              <ArrowRight className="size-3 text-accent-tint" strokeWidth={1.5} aria-hidden />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
