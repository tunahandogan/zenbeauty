"use client";

import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { bolumler } from "@/content/site";
import {
  replayAnimations,
  setBolum,
  setHareketZorla,
  useAzHareket,
  useBolum,
  useHareketZorla,
  type Bolum,
} from "@/lib/bolum";

const ids: Bolum[] = ["kuafor", "guzellik"];

/** Üst menüdeki "Saç | Gelin" anahtarı; seçili bölümün zemini Motion ile kayar. */
export function BolumSwitch({ tone = "ink", className = "" }: { tone?: "ink" | "paper"; className?: string }) {
  const bolum = useBolum();
  const reduce = useAzHareket();
  const pill = tone === "paper" ? "bg-paper" : "bg-ink";
  const on = tone === "paper" ? "text-ink" : "text-paper";
  const off = tone === "paper" ? "text-paper/80 hover:text-paper" : "text-ink/70 hover:text-accent";

  return (
    <div
      role="group"
      aria-label="Bölüm seçimi"
      className={`inline-flex border ${tone === "paper" ? "border-paper/30 bg-paper/5" : "border-ink/20 bg-paper-deep/50"} ${className}`}
    >
      {ids.map((id) => {
        const active = bolum === id;
        return (
          <button
            key={id}
            type="button"
            aria-pressed={active}
            onClick={() => setBolum(id)}
            className={`relative inline-flex min-h-11 min-w-11 items-center px-4 text-[0.72rem] font-semibold tracking-[0.14em] uppercase transition-colors duration-300 ${
              active ? on : off
            }`}
          >
            {active && (
              <motion.span
                layoutId={`bolum-zemin-${tone}`}
                className={`absolute inset-0 ${pill}`}
                transition={reduce ? { duration: 0 } : { type: "spring", bounce: 0.18, duration: 0.5 }}
              />
            )}
            <span className="relative">{bolumler[id].label}</span>
          </button>
        );
      })}
    </div>
  );
}

/** Seçimi temizleyip giriş ekranına dönmek için (demo sunumunda iki akışı göstermeye yarar) */
export function BolumReset({ className = "" }: { className?: string }) {
  const bolum = useBolum();
  if (!bolum) return null;
  return (
    <button
      type="button"
      onClick={() => {
        setBolum(null);
        window.scrollTo({ top: 0 });
      }}
      className={`inline-flex min-h-11 items-center underline underline-offset-4 ${className}`}
    >
      Bölüm seçimini sıfırla
    </button>
  );
}

/** Alt bilgide zorunlu animasyon modunu açıp kapatma düğmesi */
export function HareketToggle({ className = "" }: { className?: string }) {
  const zorla = useHareketZorla();
  return (
    <button
      type="button"
      onClick={() => {
        const next = !zorla;
        setHareketZorla(next);
        if (next) requestAnimationFrame(() => replayAnimations());
      }}
      className={`inline-flex min-h-11 items-center underline underline-offset-4 ${className}`}
    >
      {zorla ? "Animasyon zorlamasını kapat" : "Animasyonları zorla aç"}
    </button>
  );
}

/** Hero altında "diğer bölüme geç" bağlantısı */
export function BolumOtherLink({ to }: { to: Bolum }) {
  return (
    <button
      type="button"
      onClick={() => {
        setBolum(to);
        requestAnimationFrame(() => document.querySelector<HTMLElement>(`[data-hero="${to}"] h1`)?.focus({ preventScroll: true }));
      }}
      className="group inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-ink/85 transition-colors hover:text-accent"
    >
      <span className="link-underline">{bolumler[to].label} bölümüne geç</span>
      <ArrowRight className="size-3.5 text-accent transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.5} aria-hidden />
    </button>
  );
}

