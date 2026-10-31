import { bookingNote, business, getService } from "@/content/site";
import type { Service } from "@/content/types";

/**
 * Randevu TALEBİ modeli. Müsaitlik takvimi veya kesin rezervasyon değildir:
 * kullanıcı genel bir zaman tercihi seçer, salon uygunluğu kendisi teyit eder.
 * Ad, telefon gibi kişisel veri istenmez ve hiçbir yere gönderilmez.
 */
export const dayOptions = [
  { id: "hafta-ici", label: "Hafta içi" },
  { id: "hafta-sonu", label: "Hafta sonu" },
  { id: "fark-etmez", label: "Fark etmez" },
] as const;

export const timeOptions = [
  { id: "sabah", label: "Sabah", hint: "Günün ilk saatleri" },
  { id: "ogle", label: "Öğleden sonra", hint: "Gün ortası" },
  { id: "aksam", label: "Akşamüstü", hint: "Günün son saatleri" },
  { id: "esnek", label: "Esnek", hint: "Salonun önerisine açığım" },
] as const;

export type DayId = (typeof dayOptions)[number]["id"];
export type TimeId = (typeof timeOptions)[number]["id"];

export type BookingState = {
  step: 0 | 1 | 2;
  service: string | null;
  items: string[];
  day: DayId | null;
  time: TimeId | null;
  note: string;
  /** Tesettür bölümünü tercih ediyorum */
  tesettur: boolean;
};

export const initialBooking: BookingState = { step: 0, service: null, items: [], day: null, time: null, note: "", tesettur: false };

export const NOTE_MAX = 280;

export function buildRequestText(state: BookingState) {
  const service = state.service ? getService(state.service) : undefined;
  const day = dayOptions.find((d) => d.id === state.day)?.label;
  const time = timeOptions.find((t) => t.id === state.time)?.label;
  const lines = [
    `Merhaba, ${business.displayName} için randevu talebinde bulunmak istiyorum.`,
    "",
    `Hizmet: ${service?.title ?? "-"}`,
  ];
  if (state.items.length) lines.push(`İlgilendiğim işlemler: ${state.items.join(", ")}`);
  lines.push(`Tercih ettiğim gün: ${day ?? "-"}`, `Tercih ettiğim zaman: ${time ?? "-"}`);
  if (state.tesettur) lines.push("Tesettür bölümünü tercih ediyorum.");
  const note = state.note.trim();
  if (note) lines.push(`Not: ${note}`);
  lines.push("", "Uygun bir zaman önerebilir misiniz? Teyidinizi bekliyorum.");
  return lines.join("\n");
}

export function whatsappUrl(text?: string): string | null {
  if (!business.whatsapp) return null;
  return `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(text ?? business.whatsappMessage)}`;
}

/** Saçla ilgisi olmayan hizmetlerde fotoğraf cümlesi eklenmez */
const NO_HAIR_PHOTO: readonly string[] = ["makyaj", "tirnak"];

export function serviceWhatsappUrl(service: Service): string | null {
  const photoLine = NO_HAIR_PHOTO.includes(service.slug) ? "" : " Saçımın fotoğrafını ekliyorum.";
  return whatsappUrl(
    `Merhaba, web sitenizden yazıyorum. ${service.title} için fiyat ve randevu bilgisi almak istiyorum.${photoLine}`,
  );
}

export function packageWhatsappUrl(name: string): string | null {
  return whatsappUrl(
    `Merhaba, web sitenizden yazıyorum. ${name} için fiyat ve randevu bilgisi almak istiyorum. Düğün veya etkinlik tarihini yazıyorum.`,
  );
}

export { bookingNote };
