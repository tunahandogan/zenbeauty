"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { business } from "@/content/site";
import { useAzHareket } from "@/lib/bolum";
import { BolumSwitch } from "./BolumSwitch";
import { NavLinks } from "./NavLinks";

/**
 * Mobil menü: Radix Dialog odak tuzağı, Escape ile kapanma, kaydırma kilidi ve
 * kapanınca odağı tetikleyiciye geri verme işlerini üstlenir; Motion yalnızca giriş/çıkış geçişi.
 */
export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const reduce = useAzHareket();
  const close = () => setOpen(false);
  const waUrl = business.whatsapp
    ? `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(business.whatsappMessage)}`
    : null;

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger className="inline-flex size-11 items-center justify-center md:hidden" aria-label="Menüyü aç">
        <Menu className="size-6" strokeWidth={1.5} aria-hidden />
      </Dialog.Trigger>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild forceMount>
              <motion.div
                className="fixed inset-0 z-50 bg-ink/50 "
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduce ? 0 : 0.3 }}
              />
            </Dialog.Overlay>
            <Dialog.Content asChild forceMount aria-describedby={undefined}>
              <motion.div
                className="on-ink fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col overflow-y-auto border-l border-paper/10 bg-ink px-6 pt-[max(0.5rem,env(safe-area-inset-top))] pb-[max(1.5rem,env(safe-area-inset-bottom))] text-paper"
                initial={reduce ? { opacity: 0 } : { x: "100%" }}
                animate={reduce ? { opacity: 1 } : { x: 0 }}
                exit={reduce ? { opacity: 0 } : { x: "100%" }}
                transition={{ duration: reduce ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="flex h-16 items-center justify-between border-b border-paper/10">
                  <Dialog.Title className="eyebrow text-on-ink-muted">Menü</Dialog.Title>
                  <Dialog.Close className="-mr-2 inline-flex size-11 items-center justify-center transition-transform duration-300 hover:rotate-90" aria-label="Menüyü kapat">
                    <X className="size-6" strokeWidth={1.5} aria-hidden />
                  </Dialog.Close>
                </div>
                <div className="mt-6">
                  <p className="eyebrow mb-3 text-on-ink-muted">Bölüm</p>
                  <BolumSwitch tone="paper" />
                </div>
                <nav aria-label="Mobil menü" className="mt-6">
                  <NavLinks variant="menu" onNavigate={close} />
                </nav>
                {waUrl ? (
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={close}
                    className="btn-slide group mt-8 inline-flex min-h-12 items-center justify-center gap-3 bg-paper px-6 text-[0.8rem] font-medium tracking-[0.12em] text-ink uppercase [--slide-bg:var(--color-accent-tint)]"
                  >
                    <span>WhatsApp ile randevu</span>
                    <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.5} aria-hidden />
                  </a>
                ) : null}
                <Link
                  href="/randevu"
                  onClick={close}
                  className="mt-2 inline-flex min-h-11 items-center justify-center text-[0.8rem] font-medium tracking-[0.12em] text-paper uppercase underline underline-offset-4 hover:text-accent-tint"
                >
                  Randevu bilgisi
                </Link>
                <div className="mt-auto border-t border-paper/10 pt-8 text-sm text-on-ink-muted">
                  <p className="eyebrow text-[0.65rem] text-accent-tint">Konum</p>
                  <p className="mt-1">
                    {business.city} · {business.district} · {business.mall.name}
                  </p>
                  <ul className="mt-2 grid">
                    {business.phones.map((p) => (
                      <li key={p.e164}>
                        <a
                          href={`tel:${p.e164}`}
                          className="inline-flex min-h-11 items-center text-paper underline underline-offset-4 hover:text-accent-tint"
                        >
                          {p.label}: {p.display}
                        </a>
                      </li>
                    ))}
                  </ul>
                  <a
                    href={business.instagram.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center text-paper underline underline-offset-4 hover:text-accent-tint"
                  >
                    Instagram {business.instagram.handle}
                  </a>
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}

