import type { Metadata } from "next";
import { BookingFlow } from "@/components/BookingFlow";
import { InstagramLink, PhoneList } from "@/components/Contact";
import { PageIntro } from "@/components/PageIntro";
import { Photo } from "@/components/Photo";
import { Reveal } from "@/components/Reveal";
import { photos } from "@/content/photos";
import { bookingNote, business } from "@/content/site";
import { whatsappUrl } from "@/lib/booking";

export const metadata: Metadata = {
  title: "Randevu talebi",
  description: `Hizmet ve zaman tercihinizi seçin, hazırlanan mesajı ${business.displayName}'e WhatsApp'tan iletin.`,
};

export default function BookingPage() {
  const wa = whatsappUrl();
  return (
    <>
      <PageIntro
        eyebrow="Randevu talebi"
        title={
          <>
            Üç adımda <em>WhatsApp mesajı.</em>
          </>
        }
      >
        <p>
          Hizmeti ve size uyan zaman aralığını seçin; WhatsApp&apos;ta açılacak kısa bir mesaj hazırlayalım. {bookingNote}
        </p>
      </PageIntro>

      <div className="container-x grid gap-16 pt-12 pb-24 lg:grid-cols-12 lg:pt-16">
        <section className="lg:col-span-7" aria-label="Randevu talebi adımları">
          <BookingFlow />
          <noscript>
            <p className="mt-6 text-stone-700">
              Talep akışı için JavaScript gerekiyor. Randevu için WhatsApp&apos;tan yazabilir, arayabilir ya da
              Instagram&apos;dan ulaşabilirsiniz.
            </p>
          </noscript>
        </section>

        <aside className="grid content-start gap-8 lg:col-span-4 lg:col-start-9" aria-label="Bilgi">
          <Reveal variant="scale" className="hidden lg:block">
            <Photo photo={photos.sacFonDetay} frame="aspect-[4/5]" sizes="(min-width: 1024px) 30vw, 100vw" />
          </Reveal>
          <Reveal delay={0.08} variant="right">
            <div className="border border-ink/15 bg-paper-deep/65 p-6 sm:p-7">
              <h2 className="eyebrow text-accent">Nasıl çalışır?</h2>
              <ol className="mt-4 grid gap-3.5 text-sm leading-relaxed text-stone-700">
                <li className="grid grid-cols-[1.75rem_1fr]">
                  <span className="font-serif text-base text-accent italic">01</span>
                  <span>Hizmeti ve genel zaman tercihinizi seçersiniz.</span>
                </li>
                <li className="grid grid-cols-[1.75rem_1fr] border-t border-ink/10 pt-3">
                  <span className="font-serif text-base text-accent italic">02</span>
                  <span>Seçimlerinizden bir mesaj hazırlanır; siz göndermeden hiçbir yere iletilmez.</span>
                </li>
                <li className="grid grid-cols-[1.75rem_1fr] border-t border-ink/10 pt-3">
                  <span className="font-serif text-base text-accent italic">03</span>
                  <span>Mesajı WhatsApp&apos;tan gönderirsiniz. {bookingNote}</span>
                </li>
              </ol>
            </div>
          </Reveal>
          <Reveal delay={0.14} variant="right">
            <div className="border border-ink/15 bg-paper p-6 sm:p-7">
              <h2 className="eyebrow text-accent">Doğrudan iletişim</h2>
              {wa && (
                <a
                  href={wa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex min-h-11 items-center font-semibold underline underline-offset-4 hover:text-accent"
                >
                  WhatsApp&apos;tan yazın
                </a>
              )}
              <div className="mt-2">
                <PhoneList />
              </div>
              <InstagramLink className="mt-3 font-semibold hover:text-accent" />
            </div>
          </Reveal>
        </aside>
      </div>
    </>
  );
}

