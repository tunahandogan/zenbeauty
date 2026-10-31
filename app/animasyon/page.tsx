import type { Metadata } from "next";
import Home from "@/app/page";
import { AnimasyonBanner } from "@/components/AnimasyonBanner";

export const metadata: Metadata = {
  title: "Animasyon Önizleme",
  description: "İşletim sistemi animasyonları kapalı olsa dahi tüm geçiş ve slide efektlerini zorla çalıştıran önizleme modu.",
};

export default function AnimasyonPage() {
  return (
    <>
      <AnimasyonBanner />
      <Home />
    </>
  );
}
