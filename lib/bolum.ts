"use client";

import { useReducedMotion } from "motion/react";
import { useSyncExternalStore } from "react";
import { BOLUM_KEY as KEY, HAREKET_KEY } from "./bolum-script";

/**
 * Ziyaretçinin girişte seçtiği bölüm: "kuafor" | "guzellik" | null (seçilmedi).
 *
 * Seçim <html data-bolum="…"> özniteliğinde tutulur. `bolumScript` (bolum-script.ts) bunu ilk boyamadan ÖNCE
 * yerel depodan geri yükler; böylece CSS varyantları (kuafor:, guzellik:, secili:)
 * sunucu HTML'i üzerinde titreme olmadan doğru içeriği gösterir. JS gerektiren bileşenler
 * aynı değeri `useBolum()` ile okur.
 */
export type Bolum = "kuafor" | "guzellik";

const EVENT = "salon-bolum-degisti";
const HAREKET_EVENT = "salon-hareket-degisti";
const REPLAY_EVENT = "salon-animasyon-tekrarla";

let replayCounter = 0;

function read(): Bolum | null {
  const b = document.documentElement.dataset.bolum;
  return b === "kuafor" || b === "guzellik" ? b : null;
}

function apply(b: Bolum | null) {
  if (b) document.documentElement.dataset.bolum = b;
  else delete document.documentElement.dataset.bolum;
}

function subscribe(onChange: () => void) {
  // Başka sekmede yapılan seçim bu sekmeye de yansır
  const onStorage = (e: StorageEvent) => {
    if (e.key !== KEY) return;
    apply(e.newValue === "kuafor" || e.newValue === "guzellik" ? e.newValue : null);
    onChange();
  };
  window.addEventListener(EVENT, onChange);
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener(EVENT, onChange);
    window.removeEventListener("storage", onStorage);
  };
}

export function setBolum(b: Bolum | null) {
  apply(b);
  try {
    if (b) localStorage.setItem(KEY, b);
    else localStorage.removeItem(KEY);
  } catch {}
  window.dispatchEvent(new Event(EVENT));
}

export function useBolum() {
  return useSyncExternalStore(subscribe, read, () => null);
}

/**
 * Zorunlu animasyon modu (<html data-hareket="acik">).
 * Kullanıcının işletim sisteminde animasyonlar kapalı olsa bile (prefers-reduced-motion: reduce),
 * `/animasyon` veya `?animasyon=1` adresinden girildiğinde tüm CSS ve Motion animasyonlarını zorla açar.
 */
function readHareket(): boolean {
  return document.documentElement.dataset.hareket === "acik";
}

function applyHareket(force: boolean) {
  if (force) document.documentElement.dataset.hareket = "acik";
  else delete document.documentElement.dataset.hareket;
}

function subscribeHareket(onChange: () => void) {
  const onStorage = (e: StorageEvent) => {
    if (e.key !== HAREKET_KEY) return;
    applyHareket(e.newValue === "acik");
    onChange();
  };
  window.addEventListener(HAREKET_EVENT, onChange);
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener(HAREKET_EVENT, onChange);
    window.removeEventListener("storage", onStorage);
  };
}

export function setHareketZorla(force: boolean) {
  applyHareket(force);
  try {
    if (force) localStorage.setItem(HAREKET_KEY, "acik");
    else localStorage.removeItem(HAREKET_KEY);
  } catch {}
  window.dispatchEvent(new Event(HAREKET_EVENT));
}

export function useHareketZorla(): boolean {
  return useSyncExternalStore(subscribeHareket, readHareket, () => false);
}

/**
 * İşletim sistemi "hareketi azalt" tercihini okur; ancak zorunlu animasyon modu (`data-hareket="acik"`)
 * etkinse her zaman `false` döner (böylece bütün animasyonlar çalışır).
 */
export function useAzHareket(): boolean {
  const osReduce = useReducedMotion();
  const force = useHareketZorla();
  if (force) return false;
  return Boolean(osReduce);
}

function subscribeReplay(onChange: () => void) {
  window.addEventListener(REPLAY_EVENT, onChange);
  return () => window.removeEventListener(REPLAY_EVENT, onChange);
}

export function useAnimasyonSayaci(): number {
  return useSyncExternalStore(
    subscribeReplay,
    () => replayCounter,
    () => 0,
  );
}

export function replayAnimations() {
  replayCounter += 1;
  // CSS giriş animasyonlarını da yeniden tetikle
  const els = document.querySelectorAll<HTMLElement>(".animate-rise, .animate-unveil, .animate-curtain");
  els.forEach((el) => {
    el.style.animation = "none";
    void el.offsetHeight;
    el.style.animation = "";
  });
  window.dispatchEvent(new Event(REPLAY_EVENT));
}

