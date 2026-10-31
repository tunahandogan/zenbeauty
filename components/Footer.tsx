import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { business, nav, site } from "@/content/site";
import { BolumReset, HareketToggle } from "./BolumSwitch";
import { Logo } from "./Logo";

const extLink =
  "group inline-flex min-h-11 items-center gap-1.5 underline underline-offset-4 transition-colors hover:text-accent-tint";
const arrow = "size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5";

export function Footer() {
  return (
    <footer className="on-ink relative overflow-hidden bg-ink text-paper">
      <div className="container-x grid gap-12 py-16 md:grid-cols-12 md:py-20">
        <div className="md:col-span-4">
          <Logo tone="paper" />
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-on-ink-muted">
            {business.tagline}. {business.mall.name}, {business.district} / {business.city}.
          </p>
          <ul className="mt-6 grid gap-3 text-xs text-on-ink-muted">
            {business.phones.map((p) => (
              <li key={p.e164}>
                <span className="block font-semibold tracking-[0.14em] uppercase">{p.label}</span>
                <a
                  href={`tel:${p.e164}`}
                  className="mt-1 inline-flex min-h-11 items-center font-serif text-lg text-paper italic transition-colors hover:text-accent-tint"
                >
                  {p.display}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <nav aria-label="Alt menü" className="md:col-span-2 md:border-l md:border-paper/10 md:pl-8">
          <h2 className="eyebrow text-accent-tint">Sayfalar</h2>
          <ul className="mt-4 grid gap-1">
            {[...nav, { href: "/randevu", label: "Randevu" }].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="group inline-flex min-h-11 min-w-11 items-center gap-2 transition-colors hover:text-accent-tint"
                >
                  <span className="transition-transform duration-300 group-hover:translate-x-1">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-3 md:border-l md:border-paper/10 md:pl-8">
          <h2 className="eyebrow text-accent-tint">Çalışma saatleri</h2>
          <dl className="mt-4 grid gap-3 text-sm">
            {business.hours.map((h) => (
              <div key={h.days}>
                <dt className="text-on-ink-muted">{h.days}</dt>
                <dd className="mt-0.5 text-paper">{h.time}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="md:col-span-3 md:border-l md:border-paper/10 md:pl-8">
          <h2 className="eyebrow text-accent-tint">Konum</h2>
          <address className="mt-4 text-sm leading-relaxed not-italic">
            <span className="font-serif text-lg text-paper italic">{business.mall.name}</span>
            <span className="mt-1 block text-on-ink-muted">{business.mall.address}</span>
            <span className="mt-1 block text-on-ink-muted">{business.mall.landmark}</span>
          </address>
          <ul className="mt-3 grid gap-1 text-sm">
            <li>
              <a href={business.mall.directionsUrl} target="_blank" rel="noopener noreferrer" className={extLink}>
                {business.mall.directionsLabel}
                <ArrowUpRight className={arrow} strokeWidth={1.5} aria-hidden />
              </a>
            </li>
            <li>
              <a href={business.instagram.url} target="_blank" rel="noopener noreferrer" className={extLink}>
                Instagram {business.instagram.handle}
                <ArrowUpRight className={arrow} strokeWidth={1.5} aria-hidden />
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-paper/10">
        <p className="container-x py-5 pb-[calc(1.25rem+72px+env(safe-area-inset-bottom))] text-[0.72rem] leading-relaxed text-on-ink-muted md:pb-5">
          <span className="mr-2 inline-block rounded-sm border border-paper/30 px-1.5 py-0.5 tracking-[0.14em] uppercase">
            Demo
          </span>
          {site.demoNote} <BolumReset className="ml-2 text-paper" />{" "}
          <HareketToggle className="ml-2 text-accent-tint" />
        </p>
      </div>
    </footer>
  );
}
