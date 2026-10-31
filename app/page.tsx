import { ArrowRight } from "lucide-react";
import { BolumChooser } from "@/components/BolumChooser";
import { BolumHero } from "@/components/BolumHero";
import { ButtonLink } from "@/components/ButtonLink";
import { InstagramLink, MallAddress, PhoneList } from "@/components/Contact";
import { Faq } from "@/components/Faq";
import { HoursList } from "@/components/HoursList";
import { HomeServices } from "@/components/HomeBolum";
import { MapEmbed } from "@/components/MapEmbed";
import { MarqueeStrip } from "@/components/MarqueeStrip";
import { SectionHeading } from "@/components/PageIntro";
import { Photo } from "@/components/Photo";
import { Reveal } from "@/components/Reveal";
import { Reviews } from "@/components/Reviews";
import { PackageList } from "@/components/PackageList";
import { TesetturBlock } from "@/components/TesetturBlock";
import { approach, bolumler, bookingNote, business, reviews } from "@/content/site";
import { whatsappUrl } from "@/lib/booking";

export default function Home() {
  const wa = whatsappUrl();
  const priceReview = reviews[0];
  return (
    <>
      {/*
        GİRİŞ — seçim yapılmadıysa iki panelli bölüm seçimi; seçildiyse o bölümün hero'su.
        Hangisinin görüneceğini <html data-bolum> belirler (bkz. lib/bolum.ts).
      */}
      <BolumChooser />
      <BolumHero id="kuafor" />
      <BolumHero id="guzellik" />

      {/* KAYAN EDİTORYAL ŞERİT */}
      <MarqueeStrip tone="ink" />

      {/* FİYAT GÜVENİ — gerçek yorum + fotoğrafla net fiyat */}
      <section className="border-b border-ink/10 bg-paper-deep" aria-labelledby="fiyat-guven-baslik">
        <div className="container-x grid gap-8 py-14 md:grid-cols-12 md:items-center md:py-20">
          <Reveal className="md:col-span-6" variant="left">
            <figure>
              <blockquote className="font-serif text-2xl leading-snug md:text-3xl">&ldquo;{priceReview.text}&rdquo;</blockquote>
              <figcaption className="mt-4 text-sm text-stone-600">
                {priceReview.initials} · Google yorumu, {priceReview.when}
              </figcaption>
            </figure>
          </Reveal>
          <Reveal className="md:col-span-6 md:pl-8" delay={0.1} variant="right">
            <h2 id="fiyat-guven-baslik" className="text-h3">
              Saçınızın fotoğrafını gönderin, net fiyatı randevudan önce öğrenin.
            </h2>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              {wa && (
                <ButtonLink href={wa}>
                  WhatsApp&apos;tan fotoğraf gönderin <ArrowRight className="size-4" strokeWidth={1.5} aria-hidden />
                </ButtonLink>
              )}
              <ButtonLink href="/fiyatlar" variant="outline">
                Fiyatlar
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>

      {/* HİZMET DİZİNİ — seçilen bölüme göre süzülür */}
      <HomeServices />

      {/* TESETTÜR BÖLÜMÜ */}
      <TesetturBlock />

      {/* GELİN PAKETLERİ */}
      <PackageList className="container-x py-20 md:py-28" />

      {/* YORUMLAR — Google puanı ve üç kısa alıntı */}
      <Reviews />

      {/* YAKLAŞIM — ölçülü koyu bölüm; fotoğraf bölüme göre */}
      <section className="on-ink band-ink relative overflow-hidden">
        <div className="container-x grid gap-12 py-20 md:grid-cols-12 md:py-28">
          <Reveal className="md:col-span-5 md:col-start-1" variant="scale">
            <Photo
              photo={bolumler.kuafor.approachPhoto}
              frame="aspect-[4/5]"
              sizes="(min-width: 768px) 40vw, 100vw"
              tone="paper"
              className="guzellik:hidden"
            />
            <Photo
              photo={bolumler.guzellik.approachPhoto}
              frame="aspect-[4/5]"
              sizes="(min-width: 768px) 40vw, 100vw"
              tone="paper"
              className="hidden guzellik:block"
            />
          </Reveal>
          <div className="md:col-span-6 md:col-start-7 md:self-center">
            <Reveal variant="right">
              <p className="eyebrow inline-flex items-center gap-3 text-accent-tint">
                <span className="h-px w-6 bg-accent-tint/60" aria-hidden />
                Yaklaşım
              </p>
              <h2 className="mt-4 text-h2">{approach.title}</h2>
              <p className="measure mt-6 border-l border-accent-tint/40 pl-5 text-lead text-on-ink-muted">{approach.lead}</p>
            </Reveal>
            <Reveal delay={0.12} variant="up">
              <ol className="mt-12 grid gap-6">
                {approach.points.map((p, i) => (
                  <li
                    key={p.title}
                    className="group relative grid grid-cols-[3.2rem_1fr] border-t border-paper/15 pt-5 transition-colors duration-300 hover:border-accent-tint/50"
                  >
                    <span className="font-serif text-2xl text-accent-tint italic">0{i + 1}</span>
                    <span>
                      <span className="block font-serif text-xl transition-transform duration-300 group-hover:translate-x-1">
                        {p.title}
                      </span>
                      <span className="mt-1.5 block text-sm leading-relaxed text-on-ink-muted">{p.text}</span>
                    </span>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </div>
      </section>

      {/* SSS — ilk beş soru */}
      <section className="container-x grid gap-10 py-20 md:grid-cols-12 md:py-28" aria-labelledby="sss-baslik">
        <Reveal className="md:col-span-4" variant="left">
          <SectionHeading
            eyebrow="Sık sorulanlar"
            title={
              <span id="sss-baslik">
                Aklınıza <em>takılanlar.</em>
              </span>
            }
          />
          <ButtonLink href="/fiyatlar" variant="outline" className="mt-8">
            Fiyatlar <ArrowRight className="size-4" strokeWidth={1.5} aria-hidden />
          </ButtonLink>
        </Reveal>
        <Reveal className="md:col-span-8" delay={0.08} variant="right">
          <Faq limit={5} />
        </Reveal>
      </section>

      {/* KONUM — harita, saatler, Instagram, telefon */}
      <section className="border-t border-ink/10 bg-paper-deep" aria-labelledby="konum-baslik">
        <div className="container-x grid gap-12 py-20 md:grid-cols-12 md:py-28">
          <Reveal className="md:col-span-6" variant="left">
            <SectionHeading
              eyebrow="Konum"
              title={
                <span id="konum-baslik">
                  {business.mall.name}, <em>{business.district}.</em>
                </span>
              }
            />
            <div className="mt-8 max-w-md border-l-2 border-accent/40 pl-5">
              <MallAddress />
            </div>
            <div className="mt-8 grid max-w-md gap-2">
              <h3 className="eyebrow text-accent">Çalışma saatleri</h3>
              <HoursList />
            </div>
            <div className="mt-6 grid gap-1">
              <PhoneList />
              <InstagramLink className="font-semibold hover:text-accent" />
            </div>
          </Reveal>
          <Reveal className="md:col-span-6" delay={0.1} variant="right">
            <MapEmbed />
          </Reveal>
        </div>
      </section>

      {/* WHATSAPP CTA BANDI */}
      <section className="on-ink band-ink" aria-labelledby="cta-baslik">
        <div className="container-x flex flex-col gap-8 py-16 md:flex-row md:items-center md:justify-between md:py-20">
          <div className="max-w-xl">
            <h2 id="cta-baslik" className="text-h2">
              Hizmeti yazın, <em className="text-accent-tint">gerisini konuşalım.</em>
            </h2>
            <p className="mt-4 text-lead text-on-ink-muted">
              Fiyat ve uygun gün WhatsApp&apos;tan iletilir. {bookingNote}
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            {wa && (
              <ButtonLink href={wa} variant="paper">
                WhatsApp&apos;tan yazın <ArrowRight className="size-4" strokeWidth={1.5} aria-hidden />
              </ButtonLink>
            )}
            <ButtonLink href="/randevu" variant="outline-paper">
              Mesajı hazırlayın
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
