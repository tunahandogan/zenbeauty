import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { ButtonLink } from "@/components/ButtonLink";
import { PageIntro } from "@/components/PageIntro";
import { Photo } from "@/components/Photo";
import { Reveal } from "@/components/Reveal";
import { SourceTag } from "@/components/SourceTag";
import { business, priceCta, serviceCategories, services } from "@/content/site";
import { serviceWhatsappUrl } from "@/lib/booking";

export const metadata: Metadata = {
  title: "Hizmetler",
  description: `Kesim, boya, ombre, platin, keratin, saç kaynak, gelin saçı, makyaj ve tırnak. ${business.displayName}, ${business.district} / ${business.city}.`,
};

export default function ServicesPage() {
  return (
    <>
      <PageIntro
        eyebrow="Hizmetler"
        title={
          <>
            Saçtan gelin hazırlığına, <em>yedi başlık.</em>
          </>
        }
      >
        <p>
          Fiyat saçınızın boyuna, yoğunluğuna ve önceki işlemlere göre değiştiği için her hizmetin yanındaki düğmeyle WhatsApp&apos;tan sorabilirsiniz; saçınızın fotoğrafını eklemeniz yeterli.
        </p>
      </PageIntro>

      {/* Seçilen bölüm (lib/bolum.ts) üstte gelir: CSS order ile, JS beklemeden */}
      <div className="flex flex-col">
        {serviceCategories.map((cat) => {
          const list = services.filter((s) => s.category === cat.id);
          return (
            <section
              key={cat.id}
              id={cat.id}
              aria-labelledby={`${cat.id}-baslik`}
              className={`scroll-mt-24 border-b border-ink/10 ${cat.id === "guzellik" ? "guzellik:order-first" : ""}`}
            >
              <div className="border-b border-ink/10 bg-paper-deep/65">
                <div className="container-x flex items-center justify-between py-5">
                  <h2 id={`${cat.id}-baslik`} className="eyebrow inline-flex items-center gap-3 text-accent">
                    <span className="h-px w-6 bg-accent/60" aria-hidden />
                    {cat.label}
                  </h2>
                  <span className="font-serif text-sm text-stone-500 italic">{list.length} hizmet</span>
                </div>
              </div>
              {list.map((s, i) => {
                const flip = i % 2 === 1;
                return (
                  <article
                    key={s.slug}
                    className="container-x grid gap-8 border-b border-ink/10 pt-12 pb-20 last:border-b-0 md:grid-cols-12 md:gap-12 md:pt-16 md:pb-28"
                  >
                    <Reveal
                      variant={flip ? "right" : "left"}
                      className={`md:col-span-6 ${flip ? "md:order-2 md:col-start-7" : ""}`}
                    >
                      <div className="grid grid-cols-6 gap-4">
                        <Photo
                          photo={s.photo}
                          frame="aspect-[4/5]"
                          sizes="(min-width: 768px) 40vw, 85vw"
                          className={s.secondaryPhoto ? "col-span-6 sm:col-span-5" : "col-span-6"}
                        />
                        {s.secondaryPhoto && (
                          <Photo
                            photo={s.secondaryPhoto}
                            frame="aspect-[3/4]"
                            sizes="(min-width: 768px) 14vw, 30vw"
                            caption={false}
                            className="col-span-2 col-start-5 -mt-24 hidden shadow-[0_20px_50px_rgba(25,25,24,0.18)] sm:block md:-mt-32"
                          />
                        )}
                      </div>
                    </Reveal>
                    <Reveal
                      variant={flip ? "left" : "right"}
                      className={`md:col-span-5 md:self-center ${flip ? "md:order-1 md:col-start-1" : "md:col-start-8"}`}
                      delay={0.08}
                    >
                      <div className="flex items-baseline gap-4">
                        <p className="font-serif text-6xl leading-none text-accent/90 italic md:text-7xl">{s.number}</p>
                        <span className="eyebrow text-[0.65rem] text-stone-500">
                          {cat.label} · {s.items.length} İşlem
                        </span>
                      </div>
                      <h3 className="mt-4 text-h2">{s.title}</h3>
                      <p className="measure mt-5 border-l-2 border-accent/35 pl-4 text-lead text-stone-600">{s.short}</p>
                      <ul className="mt-8 border-t border-ink/15">
                        {s.items.map((item) => (
                          <li
                            key={item.name}
                            className="group flex min-h-12 items-center justify-between gap-4 border-b border-ink/15 py-2.5 transition-colors duration-300 hover:border-accent/40"
                          >
                            <span className="flex items-center gap-3 text-base font-medium transition-transform duration-300 group-hover:translate-x-1">
                              <span className="size-1.5 rounded-full bg-accent/60" aria-hidden />
                              {item.name}
                            </span>
                            <SourceTag source={item.source} />
                          </li>
                        ))}
                      </ul>
                      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                        {(() => {
                          const wa = serviceWhatsappUrl(s);
                          return wa && s.price === null ? (
                            <ButtonLink href={wa} aria-label={`${s.title}: ${priceCta}`}>
                              {priceCta} <ArrowRight className="size-4" strokeWidth={1.5} aria-hidden />
                            </ButtonLink>
                          ) : (
                            <ButtonLink href={`/randevu?hizmet=${s.slug}`}>
                              Randevu al <ArrowRight className="size-4" strokeWidth={1.5} aria-hidden />
                            </ButtonLink>
                          );
                        })()}
                        <Link
                          href={`/hizmetler/${s.slug}`}
                          aria-label={`${s.title}: detay`}
                          className="group inline-flex min-h-11 items-center gap-2 self-start text-sm font-semibold hover:text-accent sm:ml-4 sm:self-center"
                        >
                          <span className="link-underline">Detay</span>
                          <ArrowRight className="size-3.5 text-accent transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.5} aria-hidden />
                        </Link>
                      </div>
                    </Reveal>
                  </article>
                );
              })}
            </section>
          );
        })}
      </div>
    </>
  );
}

