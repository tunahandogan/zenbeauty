import Link from "next/link";
import { business } from "@/content/site";

/**
 * GEÇİCİ yazı logosu. İşletmenin resmî logosu değildir; onaylı logo gelince bu bileşen değiştirilir.
 */
export function Logo({ tone = "ink" }: { tone?: "ink" | "paper" }) {
  return (
    <Link
      href="/"
      aria-label={`${business.displayName}, ana sayfa`}
      className={`inline-flex min-h-11 flex-col justify-center leading-none ${tone === "paper" ? "text-paper" : "text-ink"}`}
    >
      <span className="font-serif text-[1.85rem] font-normal tracking-[0.12em] md:text-[2rem]">ZEN</span>
      <span className="mt-1 text-[0.56rem] font-medium tracking-[0.34em] opacity-80">BAYAN KUAFÖR</span>
    </Link>
  );
}
