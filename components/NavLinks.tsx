"use client";

import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav } from "@/content/site";
import { useAzHareket } from "@/lib/bolum";

export function NavLinks({ variant = "bar", onNavigate }: { variant?: "bar" | "menu"; onNavigate?: () => void }) {
  const pathname = usePathname();
  const reduce = useAzHareket();
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  if (variant === "menu") {
    return (
      <ul className="flex flex-col">
        {nav.map((item, i) => (
          <motion.li
            key={item.href}
            initial={reduce ? false : { opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: reduce ? 0 : 0.3, delay: reduce ? 0 : 0.04 + i * 0.03, ease: [0.22, 1, 0.36, 1] }}
            className="border-b border-paper/15"
          >
            <Link
              href={item.href}
              onClick={onNavigate}
              aria-current={isActive(item.href) ? "page" : undefined}
              className="group flex min-h-14 items-baseline justify-between gap-4 py-3 font-serif text-[2rem] leading-none transition-colors hover:text-accent-tint aria-[current=page]:text-accent-tint aria-[current=page]:italic"
            >
              <span className="flex items-baseline gap-4">
                <span className="font-sans text-xs tracking-[0.2em] text-on-ink-muted">0{i + 1}</span>
                <span className="transition-transform duration-300 group-hover:translate-x-2">{item.label}</span>
              </span>
              <ArrowUpRight
                className="size-5 self-center text-on-ink-muted transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-accent-tint"
                strokeWidth={1.5}
                aria-hidden
              />
            </Link>
          </motion.li>
        ))}
      </ul>
    );
  }

  return (
    <ul className="flex items-center gap-4 lg:gap-6 xl:gap-9">
      {nav.map((item) => {
        const active = isActive(item.href);
        return (
          <li key={item.href} className="relative">
            <Link
              href={item.href}
              aria-current={active ? "page" : undefined}
              className="group relative inline-flex min-h-11 items-center text-[0.74rem] font-medium tracking-[0.12em] text-ink/80 xl:text-[0.78rem] uppercase transition-colors duration-300 hover:text-accent aria-[current=page]:text-accent"
            >
              <span>{item.label}</span>
              <span
                aria-hidden
                className="pointer-events-none absolute right-0 bottom-2 left-0 h-px origin-right scale-x-0 bg-accent/60 transition-transform duration-300 ease-out group-hover:origin-left group-hover:scale-x-100"
              />
              {active && (
                <motion.span
                  layoutId="nav-aktif-cizgi"
                  className="pointer-events-none absolute right-0 bottom-2 left-0 h-[1.5px] bg-accent"
                  transition={reduce ? { duration: 0 } : { type: "spring", bounce: 0.15, duration: 0.5 }}
                />
              )}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

