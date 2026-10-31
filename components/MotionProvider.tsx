"use client";

import { MotionConfig } from "motion/react";
import { RotateCcw, Sparkles, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import { bolumler } from "@/content/site";
import {
  replayAnimations,
  setBolum,
  setHareketZorla,
  useBolum,
  useHareketZorla,
} from "@/lib/bolum";

/**
 * MotionConfig sarmalayıcısı ve zorunlu animasyon kontrol çubuğu.
 * Kullanıcı `/animasyon` veya `?animasyon=1` ile girdiğinde işletim sisteminde animasyonlar kapalı olsa bile
 * (prefers-reduced-motion: reduce) tüm animasyonları zorla çalıştırır ve sağ altta canlı kontrol çubuğu sunar.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  const zorla = useHareketZorla();
  const bolum = useBolum();
  const pathname = usePathname();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const qH = params.get("animasyon") ?? params.get("hareket") ?? params.get("motion");
    const isAnimRoute = pathname.startsWith("/animasyon");
    if (qH === "0" || qH === "kapali" || qH === "varsayilan") {
      setHareketZorla(false);
    } else if (isAnimRoute || qH !== null) {
      setHareketZorla(true);
    }
    const qB = params.get("bolum");
    if (qB === "kuafor" || qB === "guzellik") setBolum(qB);
    else if (qB === "secim") setBolum(null);
  }, [pathname]);

  return (
    <MotionConfig reducedMotion={zorla ? "never" : "user"}>
      {children}
      {zorla && (
        <aside
          aria-label="Animasyon kontrol paneli"
          className="on-ink fixed right-4 bottom-4 z-40 flex flex-wrap items-center gap-1.5 border border-paper/25 bg-ink/95 p-1.5 text-paper shadow-[0_20px_50px_rgba(25,25,24,0.45)] backdrop-blur-md"
        >
          <span className="inline-flex min-h-11 items-center gap-2 px-3 text-[0.68rem] font-semibold tracking-[0.16em] uppercase">
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-tint opacity-80" />
              <span className="relative inline-flex size-2 rounded-full bg-accent-tint" />
            </span>
            <Sparkles className="size-3.5 text-accent-tint" strokeWidth={1.5} aria-hidden />
            Animasyon Modu
          </span>

          <div className="hidden items-center border-x border-paper/15 px-1.5 sm:flex" role="group" aria-label="Bölüm önizleme">
            {(
              [
                { id: null, label: "Seçim" },
                { id: "kuafor" as const, label: bolumler.kuafor.label },
                { id: "guzellik" as const, label: bolumler.guzellik.label },
              ] as const
            ).map((item) => {
              const active = bolum === item.id;
              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => {
                    setBolum(item.id);
                    if (item.id === null) window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className={`inline-flex min-h-11 min-w-11 items-center justify-center px-2.5 text-[0.68rem] font-semibold tracking-[0.12em] uppercase transition-colors ${
                    active ? "bg-paper text-ink" : "text-on-ink-muted hover:text-paper"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => replayAnimations()}
            className="inline-flex min-h-11 items-center gap-1.5 border border-paper/25 bg-paper/10 px-3 text-[0.68rem] font-semibold tracking-[0.14em] text-paper uppercase transition-colors hover:bg-paper hover:text-ink"
          >
            <RotateCcw className="size-3.5" strokeWidth={1.5} aria-hidden />
            Tekrarla
          </button>

          <button
            type="button"
            onClick={() => setHareketZorla(false)}
            aria-label="Zorunlu animasyon modunu kapat"
            title="Sistem varsayılanına dön"
            className="inline-flex size-11 items-center justify-center text-on-ink-muted transition-colors hover:bg-paper/10 hover:text-paper"
          >
            <X className="size-4" strokeWidth={1.5} aria-hidden />
          </button>
        </aside>
      )}
    </MotionConfig>
  );
}
