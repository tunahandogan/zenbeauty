"use client";

import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { useAnimasyonSayaci, useAzHareket } from "@/lib/bolum";

export type RevealVariant = "up" | "left" | "right" | "scale" | "curtain";

const hiddenStates: Record<RevealVariant, { opacity: number; x?: number; y?: number; scale?: number }> = {
  up: { opacity: 0, y: 14 },
  left: { opacity: 0, x: -8, y: 8 },
  right: { opacity: 0, x: 8, y: 8 },
  scale: { opacity: 0, y: 12, scale: 0.98 },
  curtain: { opacity: 0, y: 14, scale: 0.99 },
};

const visibleState = { opacity: 1, x: 0, y: 0, scale: 1 };

/**
 * Kaydırınca sakin, kısa mesafeli giriş. İçerik sunucuda GÖRÜNÜR olarak gelir; yalnızca hidrasyondan sonra
 * ve henüz ekran dışındaysa gizlenip görünür alana girince açılır. JS gecikirse içerik saklı kalmaz.
 * Zorunlu animasyon modunda (`data-hareket="acik"`) OS animasyonları kapalı olsa bile çalışır.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  variant = "up",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: RevealVariant;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useAzHareket();
  const replay = useAnimasyonSayaci();
  const inView = useInView(ref, { once: true, margin: "0px 0px -8% 0px" });
  const [armed, setArmed] = useState(false);
  const [replaying, setReplaying] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || reduce) return;
    // Yalnızca ilk ekranın altında kalan öğeler kaydırma animasyonuyla açılır
    const below = el.getBoundingClientRect().top > window.innerHeight * 0.92;
    if (below) {
      const id = requestAnimationFrame(() => setArmed(true));
      return () => cancelAnimationFrame(id);
    }
  }, [reduce]);

  useEffect(() => {
    if (replay === 0 || reduce) return;
    const t1 = window.setTimeout(() => setReplaying(true), 0);
    const t2 = window.setTimeout(() => setReplaying(false), 60);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [replay, reduce]);

  const hidden = (armed && !inView) || replaying;
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={false}
      animate={hidden ? hiddenStates[variant] : visibleState}
      transition={hidden ? { duration: 0 } : { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

