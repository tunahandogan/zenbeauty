import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { BolumSwitch } from "./BolumSwitch";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";
import { NavLinks } from "./NavLinks";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-paper pt-[env(safe-area-inset-top)]">
      <div className="container-x flex h-16 items-center justify-between gap-4 md:h-20 md:gap-5">
        <Logo />
        <nav aria-label="Ana menü" className="hidden md:block">
          <NavLinks />
        </nav>
        <div className="flex items-center gap-1.5">
          <div className="mr-3 hidden lg:block">
            <BolumSwitch />
          </div>
          <Link
            href="/randevu"
            className="btn-slide group hidden min-h-11 items-center gap-2 bg-ink px-5 text-[0.74rem] font-semibold tracking-[0.12em] text-paper uppercase transition-colors duration-300 [--slide-bg:var(--color-accent)] xl:inline-flex"
          >
            <span>Randevu talebi</span>
            <ArrowUpRight
              className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              strokeWidth={1.5}
              aria-hidden
            />
          </Link>
          <Link
            href="/randevu"
            className="inline-flex min-h-11 items-center px-3 text-[0.75rem] font-semibold tracking-[0.14em] uppercase underline decoration-1 underline-offset-[6px] xl:hidden"
          >
            Randevu
          </Link>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}

