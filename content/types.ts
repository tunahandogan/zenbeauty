import type { StaticImageData } from "next/image";
import type { ServiceSlug } from "./service-slugs";

/**
 * Bir bilginin nereden geldiği.
 * - "instagram": işletmenin kendi Instagram profilinde yayımlanmış (sahibi tarafından ayrıca onaylanmadı)
 * - "google": işletmenin Google Haritalar kaydında görünüyor
 * - "dogrulanacak": örnek/konsept içerik; işletmeyle teyit edilmeden yayına alınmamalı
 */
export type Source = "instagram" | "google" | "dogrulanacak";

export type Photo = {
  src: StaticImageData;
  alt: string;
  /** CSS object-position; mobil ve masaüstü kırpması için odak noktası */
  focal?: string;
  credit: { photographer: string; url: string };
};

export type Phone = {
  /** Instagram biyografisindeki etiket */
  label: string;
  display: string;
  /** E.164, tel: bağlantısı için */
  e164: string;
  desk: Desk;
  source: Source;
  verifiedByOwner: boolean;
};

/** Salonun iki bölümü: saç (kuaför) ve güzellik/bakım */
export type Desk = "kuafor" | "guzellik";

export type ServiceItem = {
  name: string;
  source: Source;
};

export type Service = {
  slug: ServiceSlug;
  number: string;
  title: string;
  category: "sac" | "guzellik";
  desk: Desk;
  /** Kısa tanıtım; konsept metin */
  short: string;
  /** Detay sayfasındaki giriş paragrafı; konsept metin */
  intro: string;
  items: ServiceItem[];
  consultation: string[];
  /** Hizmete özel dikkat notu (ör. sağlıkla ilgili uyarı) */
  note?: string;
  /** Uygulama nasıl yapılır; genel bilgi, sonuç vaadi yok */
  howItWorks: string;
  /** Seans / süre bilgisi; kesin sayı yoksa yer tutucu */
  sessions: string;
  /** Kimlere uygun değildir / önce hekime danışılmalı durumlar */
  notFor: string[];
  photo: Photo;
  secondaryPhoto?: Photo;
  source: Source;
  /** Fiyat aralığı; uydurulmaz. null iken arayüz "Fiyat al" (WhatsApp) düğmesi gösterir */
  price: string | null;
  duration: string | null;
};

export type Review = {
  /** Yalnızca ad-soyad baş harfi */
  initials: string;
  text: string;
  /** Yorumun konusu, ör. "Ombre" */
  topic: string;
  /** Google'da görüldüğü yaklaşık tarih (kontrol tarihi: business.google.checkedAt) */
  when: string;
  source: "google";
};

export type Faq = { q: string; a: string; source: Source };

export type Hours = { days: string; time: string };

export type GalleryCategory = "sac" | "gelin" | "tirnak" | "mekan" | "oncesi-sonrasi";

export type GalleryItem = Photo & {
  category: GalleryCategory;
  caption: string;
};

/** Gelin / özel gün paketi; içerik ve fiyat salondan alınır */
export type Package = { name: string; includes: string[]; price: string | null; source: Source };
