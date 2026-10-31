import type { Metadata } from "next";
import { GalleryGrid } from "@/components/GalleryGrid";
import { PageIntro } from "@/components/PageIntro";
import { business } from "@/content/site";

export const metadata: Metadata = {
  title: "Portfolyo",
  description: `Kesim, renk, gelin saçı, tırnak ve salon için temsilî görseller; renk dönüşümü alanı gerçek fotoğraflar için ayrıldı. ${business.displayName}, ${business.district} / ${business.city}.`,
};

export default function GalleryPage() {
  return (
    <>
      <PageIntro
        eyebrow="Portfolyo · Temsilî görseller"
        title={
          <>
            Renk, hacim, <em>bitiş.</em>
          </>
        }
      >
        <p>
          Buradaki fotoğraflar Pexels&apos;ten seçilmiş temsilî görsellerdir; {business.displayName}&apos;ın çalışmaları, müşterileri veya
          salonu değildir. Salonun kendi fotoğrafları ve müşteri izinli renk dönüşümü kareleri geldiğinde yerlerine geçecek.
        </p>
      </PageIntro>
      <GalleryGrid />
    </>
  );
}
