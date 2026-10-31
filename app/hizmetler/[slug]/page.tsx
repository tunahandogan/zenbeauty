import type { Metadata } from "next";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ButtonLink } from "@/components/ButtonLink";
import { InstagramLink, PhoneList } from "@/components/Contact";
import { Photo } from "@/components/Photo";
import { Reveal } from "@/components/Reveal";
import { SourceTag } from "@/components/SourceTag";
import { bookingNote, business, getService, priceCta, serviceCategories, services } from "@/content/site";
import { serviceWhatsappUrl } from "@/lib/booking";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/hizmetler/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title: service.title,
    description: `${service.short} ${business.displayName}, ${business.district} / ${business.city}.`,
  };
}

export default async function ServicePage({ params }: PageProps<"/hizmetler/[slug]">) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const index = services.indexOf(service);
  const prev = services[(index - 1 + services.length) % services.length];
  const next = services[(index + 1) % services.length];
  const waUrl = serviceWhatsappUrl(service);

  return (
    <>
      <nav aria-label="Konum" className="container-x pt-6 text-sm">
        <Link href="/hizmetler" className="group inline-flex min-h-11 items-center gap-2 text-stone-600 transition-colors hover:text-accent">
          <ArrowLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-1" strokeWidth={1.5} aria-hidden />
          <span>Tüm hizmetler</span>
        </Link>
      </nav>

      <article>
        <header className="container-x grid gap-10 pt-6 pb-16 md:grid-cols-12 md:pb-24">
          <div className="md:col-span-6 md:self-end">
            <p className="eyebrow animate-rise inline-flex items-center gap-3 text-accent">
              <span className="h-px w-7 bg-accent/60" aria-hidden />
              {service.number} · {serviceCategories.find((c) => c.id === service.category)?.label}
            </p>
            <h1 className="mt-5 animate-rise text-h1 [animation-delay:80ms]">{service.title}</h1>
            <p className="measure mt-6 animate-rise border-l-2 border-accent/40 pl-5 text-lead text-stone-600 [animation-delay:160ms]">
              {service.intro}
            </p>
            <div className="mt-8 flex animate-rise flex-col gap-3 [animation-delay:200ms] sm:flex-row">
              <ButtonLink href={`/randevu?hizmet=${service.slug}`}>
                Randevu al <ArrowRight className="size-4" strokeWidth={1.5} aria-hidden />
              </ButtonLink>
              {service.price === null && waUrl && (
                <ButtonLink href={waUrl} variant="outline">
                  {priceCta}
                </ButtonLink>
              )}
            </div>
          </div>
          <div className="md:col-span-5 md:col-start-8">
            <Photo
              photo={service.photo}
              frame="aspect-[4/5]"
              sizes="(min-width: 768px) 40vw, 100vw"
              imgClassName="animate-unveil"
              preload
            />
          </div>
        </header>

        <div className="border-y border-ink/10 bg-paper-deep">
          <div className="container-x grid gap-14 py-16 md:grid-cols-12 md:py-24">
            <Reveal className="md:col-span-5" variant="left">
              <p className="eyebrow text-accent">Kapsam</p>
              <h2 className="mt-2 text-h3">İşlemler</h2>
              <ul className="mt-6 border-t border-ink/15">
                {service.items.map((item) => (
                  <li
                    key={item.name}
                    className="group flex min-h-12 items-center justify-between gap-4 border-b border-ink/15 py-3 transition-colors hover:border-accent/40"
                  >
                    <span className="flex items-center gap-3 font-medium transition-transform duration-300 group-hover:translate-x-1">
                      <span className="size-1.5 rounded-full bg-accent/70" aria-hidden />
                      {item.name}
                    </span>
                    <SourceTag source={item.source} />
                  </li>
                ))}
              </ul>
              <div className="mt-8 border border-ink/12 bg-paper p-5 text-sm">
                <p className="eyebrow text-[0.68rem] text-accent">Fiyat</p>
                {service.price ? (
                  <p className="mt-2 font-medium text-stone-700">{service.price}</p>
                ) : (
                  <>
                    <p className="mt-2 leading-relaxed text-stone-700">
                      Fiyat saçınıza ve istediğiniz sonuca göre netleşir; bu yüzden sitede tahmini rakam yazmıyoruz. WhatsApp&apos;tan fotoğraf gönderin, randevudan önce net rakamı öğrenin.
                    </p>
                    {waUrl && (
                      <ButtonLink href={waUrl} className="mt-4 w-full sm:w-auto">
                        {priceCta}
                      </ButtonLink>
                    )}
                  </>
                )}
                {service.duration && (
                  <p className="mt-4 border-t border-ink/10 pt-3 text-stone-700">
                    <span className="eyebrow mr-2 text-[0.68rem] text-accent">Süre</span>
                    {service.duration}
                  </p>
                )}
              </div>
            </Reveal>

            <Reveal className="md:col-span-6 md:col-start-7" delay={0.08} variant="right">
              <p className="eyebrow text-accent">Hazırlık</p>
              <h2 className="mt-2 text-h3">Danışmada konuşabilecekleriniz</h2>
              <ol className="mt-6 grid gap-4">
                {service.consultation.map((point, i) => (
                  <li
                    key={point}
                    className="grid grid-cols-[2.5rem_1fr] border border-ink/10 bg-paper p-4 leading-relaxed transition-colors duration-300 hover:border-accent/40"
                  >
                    <span className="font-serif text-xl text-accent italic">0{i + 1}</span>
                    <span className="text-stone-700">{point}</span>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </div>

        <section className="container-x grid gap-10 py-16 md:grid-cols-12 md:py-24" aria-labelledby="nasil-baslik">
          <Reveal className="md:col-span-6" variant="left">
            <p className="eyebrow text-accent">Nasıl yapılır</p>
            <h2 id="nasil-baslik" className="mt-2 text-h3">
              Nasıl ilerliyoruz
            </h2>
            <p className="measure mt-5 leading-relaxed text-stone-700">{service.howItWorks}</p>
            <h3 className="eyebrow mt-10 text-accent">Randevu sayısı ve süre</h3>
            <p className="measure mt-3 leading-relaxed text-stone-700">{service.sessions}</p>
          </Reveal>
          <Reveal className="md:col-span-5 md:col-start-8" delay={0.08} variant="right">
            <p className="eyebrow text-accent">Önce bize söyleyin</p>
            <h2 className="mt-2 text-h3">Randevudan önce bilmemiz gerekenler</h2>
            <ul className="mt-6 grid gap-3">
              {service.notFor.map((point) => (
                <li key={point} className="flex gap-3 border border-ink/10 bg-paper-deep/60 p-4 text-sm leading-relaxed text-stone-700">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent/70" aria-hidden />
                  {point}
                </li>
              ))}
            </ul>
            {service.note && (
              <p className="mt-6 border-l-2 border-accent bg-paper/70 p-4 text-sm leading-relaxed text-stone-700">
                {service.note}
              </p>
            )}
          </Reveal>
        </section>

        <section className="container-x grid gap-10 py-16 md:grid-cols-12 md:py-24" aria-labelledby="talep-baslik">
          <Reveal className="md:col-span-6" variant="left">
            <p className="eyebrow inline-flex items-center gap-3 text-accent">
              <span className="h-px w-6 bg-accent/60" aria-hidden />
              Adım {service.number}
            </p>
            <h2 id="talep-baslik" className="mt-3 text-h2">
              Randevu <em className="text-accent">ve fiyat</em>
            </h2>
            <p className="measure mt-5 leading-relaxed text-stone-600">
              Gün ve saat tercihinizi yazın, fiyatı WhatsApp&apos;tan sorun. Hizmet seçili gelir; hazırlanan mesajı bize siz iletirsiniz.{" "}
              {bookingNote}
            </p>
            <ButtonLink href={`/randevu?hizmet=${service.slug}`} className="mt-8">
              Randevu al <ArrowRight className="size-4" strokeWidth={1.5} aria-hidden />
            </ButtonLink>
          </Reveal>
          <Reveal className="md:col-span-5 md:col-start-8" delay={0.08} variant="right">
            <div className="border border-ink/15 bg-paper-deep/65 p-7">
              <h3 className="eyebrow text-accent">Doğrudan iletişim</h3>
              <div className="mt-4">
                <PhoneList desk={service.desk} />
              </div>
              <InstagramLink className="mt-4 font-semibold hover:text-accent" />
              <p className="mt-4 text-xs text-stone-600">
                {business.mall.name}, {business.mall.landmark}
              </p>
            </div>
          </Reveal>
        </section>
      </article>

      <nav aria-label="Diğer hizmetler" className="border-t border-ink/10 bg-paper-deep/50">
        <div className="container-x grid sm:grid-cols-2">
          <Link
            href={`/hizmetler/${prev.slug}`}
            className="group flex min-h-28 flex-col justify-center gap-1.5 border-b border-ink/10 py-7 transition-colors sm:border-r sm:border-b-0 sm:pr-8"
          >
            <span className="eyebrow inline-flex items-center gap-2 text-stone-500">
              <ArrowLeft className="size-3.5 text-accent transition-transform duration-300 group-hover:-translate-x-1" strokeWidth={1.5} aria-hidden />
              Önceki · {prev.number}
            </span>
            <span className="font-serif text-2xl transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent">
              {prev.title}
            </span>
          </Link>
          <Link
            href={`/hizmetler/${next.slug}`}
            className="group flex min-h-28 flex-col justify-center gap-1.5 py-7 transition-colors sm:items-end sm:pl-8 sm:text-right"
          >
            <span className="eyebrow inline-flex items-center gap-2 text-stone-500">
              Sonraki · {next.number}
              <ArrowRight className="size-3.5 text-accent transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.5} aria-hidden />
            </span>
            <span className="font-serif text-2xl transition-all duration-300 group-hover:-translate-x-1 group-hover:text-accent">
              {next.title}
            </span>
          </Link>
        </div>
      </nav>
    </>
  );
}

