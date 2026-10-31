import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/PageIntro";
import { packages, priceCta } from "@/content/site";
import { packageWhatsappUrl } from "@/lib/booking";

/** Gelin ve özel gün paketleri. Fiyat yoksa "Fiyat al" düğmesi WhatsApp'ı paket adıyla açar. */
export function PackageList({ className = "" }: { className?: string }) {
  return (
    <section className={className} aria-labelledby="paketler-baslik">
      <Reveal>
        <SectionHeading
          eyebrow="Gelin ve özel gün"
          title={
            <span id="paketler-baslik">
              Büyük gün için <em>paketler.</em>
            </span>
          }
        />
        <p className="mt-4 max-w-xl text-stone-600">
          Düğün tarihinizi ve saatinizi yazın; paketin içeriğini ve net fiyatı birlikte netleştirelim.
        </p>
      </Reveal>
      <ul className="mt-10 grid gap-5 md:grid-cols-3">
        {packages.map((pkg, i) => {
          const wa = packageWhatsappUrl(pkg.name);
          return (
            <li key={pkg.name}>
              <Reveal delay={i * 0.06} className="h-full">
                <div className="flex h-full flex-col border border-ink/15 bg-paper-deep/55 p-6">
                  <h3 className="font-serif text-2xl">{pkg.name}</h3>
                  <ul className="mt-4 flex-1 grid gap-2 text-sm leading-relaxed text-stone-700">
                    {pkg.includes.map((inc) => (
                      <li key={inc} className="border-t border-ink/10 pt-2">
                        {inc}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6">
                    {pkg.price ? (
                      <p className="text-lg font-medium">{pkg.price}</p>
                    ) : wa ? (
                      <a
                        href={wa}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${pkg.name} için fiyat al, WhatsApp`}
                        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-sm border border-ink/70 px-5 text-[0.78rem] font-semibold tracking-[0.12em] uppercase transition-colors hover:bg-ink hover:text-paper"
                      >
                        {priceCta}
                        <ArrowUpRight className="size-4" strokeWidth={1.5} aria-hidden />
                      </a>
                    ) : null}
                  </div>
                </div>
              </Reveal>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
