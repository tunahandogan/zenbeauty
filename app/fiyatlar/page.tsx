import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";
import { PackageList } from "@/components/PackageList";
import { PageIntro } from "@/components/PageIntro";
import { PriceTable } from "@/components/PriceTable";
import { business } from "@/content/site";
import { whatsappUrl } from "@/lib/booking";

export const metadata: Metadata = {
  title: "Fiyatlar",
  description:
    `${business.displayName} hizmetleri için fiyat bilgisi: saçınızın fotoğrafını WhatsApp'tan gönderin, net fiyatı randevudan önce yazalım.`,
};

export default function PricesPage() {
  const wa = whatsappUrl();
  return (
    <>
      <PageIntro
        eyebrow="Fiyatlar"
        title={
          <>
            Net fiyat, <em>fotoğrafa bakarak.</em>
          </>
        }
      >
        <p>Renk işlerinde fiyat saçın boyuna ve önceki boyalara göre değişir; fotoğraf gönderin, net fiyatı yazalım.</p>
      </PageIntro>

      <div className="container-x pt-12 pb-20 md:pt-16 md:pb-28">
        <PriceTable />
        <PackageList className="mt-20" />
        {wa && (
          <div className="mt-14 flex flex-col gap-4 border-t border-ink/15 pt-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-md text-stone-700">Birden fazla işlem mi düşünüyorsunuz? Hepsini ve saçınızın fotoğrafını tek mesajda gönderebilirsiniz.</p>
            <ButtonLink href={wa}>
              WhatsApp&apos;tan sor <ArrowRight className="size-4" strokeWidth={1.5} aria-hidden />
            </ButtonLink>
          </div>
        )}
      </div>
    </>
  );
}
