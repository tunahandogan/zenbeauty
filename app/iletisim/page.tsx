import type { Metadata } from "next";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";
import { InstagramLink, MallAddress, PhoneList } from "@/components/Contact";
import { HoursList } from "@/components/HoursList";
import { MapEmbed } from "@/components/MapEmbed";
import { PageIntro } from "@/components/PageIntro";
import { Reveal } from "@/components/Reveal";
import { bookingNote, business } from "@/content/site";
import { whatsappUrl } from "@/lib/booking";

export const metadata: Metadata = {
  title: "İletişim",
  description: `${business.displayName}: ${business.city} ${business.district}, ${business.mall.landmark}. Adres, harita, çalışma saatleri, telefon, WhatsApp ve Instagram.`,
};

export default function ContactPage() {
  const wa = whatsappUrl();
  return (
    <>
      <PageIntro
        eyebrow="İletişim"
        title={
          <>
            Bize <em>ulaşın.</em>
          </>
        }
      >
        <p>En hızlı yol WhatsApp. Hizmeti yazın, fiyatı ve uygun günü size iletelim. Salonu ya da Sinan Bey&apos;i arayabilir, Instagram&apos;dan da yazabilirsiniz.</p>
      </PageIntro>

      <section className="container-x grid gap-12 pt-12 pb-20 md:grid-cols-12 md:pt-16 md:pb-28">
        <div className="grid content-start gap-8 md:col-span-6">
          <Reveal variant="left">
            <div className="rounded-md border border-ink/15 bg-paper-deep/55 p-6 sm:p-8">
              <h2 className="eyebrow text-accent">Konum</h2>
              <div className="mt-4">
                <MallAddress />
              </div>
              <ButtonLink href={business.mall.directionsUrl} variant="outline" className="mt-6">
                {business.mall.directionsLabel} <ArrowUpRight className="size-4" strokeWidth={1.5} aria-hidden />
              </ButtonLink>
            </div>
          </Reveal>

          <Reveal delay={0.06} variant="left">
            <div className="rounded-md border border-ink/15 bg-paper p-6 sm:p-8">
              <h2 className="eyebrow text-accent">Çalışma saatleri</h2>
              <HoursList className="mt-4" />
            </div>
          </Reveal>

          <Reveal delay={0.12} variant="left">
            <div className="rounded-md border border-ink/15 bg-paper-deep/55 p-6 sm:p-8">
              <h2 className="eyebrow text-accent">Yazın ya da arayın</h2>
              <div className="mt-4 grid gap-1">
                <PhoneList />
                {wa && (
                  <a
                    href={wa}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center gap-2 text-lg font-medium underline underline-offset-4 hover:text-accent"
                  >
                    WhatsApp&apos;tan yazın
                    <ArrowUpRight className="size-4 text-accent" strokeWidth={1.5} aria-hidden />
                  </a>
                )}
                <InstagramLink className="text-lg font-medium hover:text-accent" />
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal className="md:col-span-6" delay={0.08} variant="right">
          <MapEmbed />
          <div className="relative mt-10 rounded-md border border-ink/15 bg-paper-deep/75 p-7 sm:p-9">
            <span aria-hidden className="pointer-events-none absolute top-0 right-0 left-0 h-[2px] rounded-t-md bg-accent" />
            <h2 className="text-h3">Randevu mesajı</h2>
            <p className="mt-3 leading-relaxed text-stone-700">
              Hizmeti ve size uyan zamanı seçin, WhatsApp mesajını biz hazırlayalım. {bookingNote}
            </p>
            <ButtonLink href="/randevu" className="mt-6">
              Mesaj hazırla <ArrowRight className="size-4" strokeWidth={1.5} aria-hidden />
            </ButtonLink>
          </div>
        </Reveal>
      </section>
    </>
  );
}
