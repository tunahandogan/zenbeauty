/**
 * Sitenin TEK içerik kaynağı. Demoyu başka bir işletmeye uyarlarken önce bu dosya değişir;
 * bileşenler işletme adı, adres, telefon ve slogan gibi bilgileri yalnızca buradan okur.
 *
 * Kural: işletmeden doğrulanmamış bilgi uydurulmaz. Bilinmeyen alanlarda "[DOLDURULACAK: …]"
 * yer tutucusu kullanılır. Kaynaklar: docs/ilerleme-zen.md (Google Haritalar ve Instagram, 2026-10-31).
 * `source: "dogrulanacak"` olan metinler konsept önerisidir; yayına almadan önce işletmeye onaylatılmalı.
 * Sağlık iddiası yazılmaz ("kalıcı", "garanti", "%100", "acısız" yok).
 */
import { photos } from "./photos";
import type { Faq, GalleryCategory, GalleryItem, Hours, Package, Phone, Review, Service } from "./types";

export const business = {
  name: "Zen",
  /** Instagram profil adı: "ZEN BAYAN KUAFÖR ERZURUM"; Google kaydı: "Erzurum Zen Bayan Kuaför" */
  displayName: "Zen Bayan Kuaför",
  legalName: "Erzurum Zen Bayan Kuaför",
  slug: "zen-bayan-kuafor",
  /** Sitede kısa tanım ve OG görselinde kullanılan satırlar */
  tagline: "Kesim, renk ve gelin saçı · Tesettür bölümü",
  servicesLine: "Kesim · Ombre · Platin · Gelin · Makyaj",
  city: "Erzurum",
  district: "Yakutiye",
  /** Konum bloğu: AVM değil iş merkezi; alan adı geriye dönük uyum için `mall` */
  mall: {
    name: "Arif Alper İş Merkezi",
    floor: "Kat 3, No: 1/2",
    category: "Bayan kuaförü",
    /** Google Haritalar kaydındaki adres */
    address: "Muratpaşa Mh. İsmetpaşa Cd. Arif Alper İş Merkezi Kat 3 No: 1/2, 25000 Yakutiye / Erzurum",
    /** Kapıyı bulmak için tarif (Google kaydındaki ifade) */
    landmark: "Emniyet Müdürlüğü karşısı, Birleşim Pastanesi'nin üstü",
    directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=Erzurum+Zen+Bayan+Kuaf%C3%B6r",
    directionsLabel: "Yol tarifi al",
    sourceUrl: "https://www.google.com/maps/place/Erzurum+Zen+Bayan+Kuaf%C3%B6r/@39.9048904,41.2677402,17z",
  },
  /** JSON-LD için parçalı adres */
  address: {
    street: "Muratpaşa Mh. İsmetpaşa Cd. Arif Alper İş Merkezi Kat 3 No: 1/2",
    locality: "Yakutiye",
    region: "Erzurum",
    postalCode: "25000",
    country: "TR",
  },
  geo: { lat: 39.9048904, lng: 41.2677402, plusCode: "W739+X3 Yakutiye, Erzurum" },
  /** Anahtarsız Google Maps gömme adresi (iframe) */
  mapEmbedUrl: "https://www.google.com/maps?q=39.9048904,41.2677402&z=17&output=embed",
  mapTitle: "Zen Bayan Kuaför konumu, İsmetpaşa Caddesi, Yakutiye",
  instagram: {
    handle: "@erzurum_zenkuafor",
    url: "https://www.instagram.com/erzurum_zenkuafor/",
  },
  phones: [
    {
      label: "Salon",
      display: "0442 237 27 45",
      e164: "+904422372745",
      desk: "kuafor",
      source: "google",
      verifiedByOwner: false,
    },
    {
      label: "Sinan Bey",
      display: "0532 644 22 88",
      e164: "+905326442288",
      desk: "guzellik",
      source: "instagram",
      verifiedByOwner: false,
    },
  ] satisfies Phone[],
  /**
   * WhatsApp hattı: Instagram biyografisindeki Sinan Bey'in cep numarası olduğu varsayıldı.
   * Demo gösterilmeden önce numaranın WhatsApp'ta açık olduğu doğrulanmalı.
   */
  whatsapp: "905326442288" as string | null,
  whatsappVerified: false,
  whatsappMessage: "Merhaba, web sitenizden yazıyorum. Randevu ve fiyat bilgisi almak istiyorum.",
  /** Google'da yalnızca "Pazar 07:30 açılış" görüldü; tam saatler doğrulanmadı */
  hours: [
    { days: "Pazartesi – Cumartesi", time: "[DOLDURULACAK: saat]" },
    { days: "Pazar", time: "07:30 – [DOLDURULACAK: kapanış]" },
  ] satisfies Hours[],
  google: { rating: 4.4, reviewCount: 251, photoCount: 1758, checkedAt: "2026-10-31" },
  website: null as string | null,
  /** Resmî logo kullanılmadı; sitede yazı logosu var */
  logo: null as string | null,
  foundedYear: null as number | null,
  /** Sinan Sezer: Instagram biyografisi ve öne çıkanlarda adıyla geçiyor. Diğerleri onay alınmadan yazılmaz. */
  team: [
    { name: "Sinan Sezer", role: "[DOLDURULACAK: unvan]" },
    { name: "[DOLDURULACAK: uzman adı]", role: "Gelin saçı ve makyaj" },
    { name: "[DOLDURULACAK: uzman adı]", role: "Tırnak" },
  ],
} as const;

export const phoneSourceNote = "Numaralar Zen Bayan Kuaför'ün Google Haritalar kaydında ve Instagram profilinde yayımlanmıştır.";

export const nav = [
  { href: "/hizmetler", label: "Hizmetler" },
  { href: "/fiyatlar", label: "Fiyatlar" },
  { href: "/galeri", label: "Portfolyo" },
  { href: "/salon", label: "Salon" },
  { href: "/iletisim", label: "İletişim" },
] as const;

export const bookingNote = "Randevu, salonun WhatsApp'tan teyidiyle kesinleşir.";
export const inspirationLabel = "Temsilî görsel";
export const priceCta = "Fiyat al";
export const demo = {
  label: "Demo",
  note: "Bu sayfa Zen Bayan Kuaför için hazırlanmış bir tasarım önizlemesidir; henüz işletme tarafından onaylanmamıştır.",
};

/** Instagram biyografisi: "TESETTÜR BÖLÜMÜMÜZ MEVCUTTUR". Ayrıntılar salondan teyit edilecek. */
export const tesettur = {
  source: "instagram" as const,
  title: "Tesettür bölümü",
  lead: "Başörtülü misafirlerimiz için salonda ayrı bir bölüm var. Randevu alırken belirtmeniz yeterli.",
  points: [
    "[DOLDURULACAK: bölümün ayrı oda mı, perdeli alan mı olduğu]",
    "[DOLDURULACAK: bu bölümde yalnızca kadın çalışan hizmet verip vermediği]",
    "Kesim, renk, bakım ve gelin hazırlığı bu bölümde de yapılabilir. [DOLDURULACAK: teyit]",
  ],
};

export const services: Service[] = [
  {
    slug: "kesim-fon",
    number: "01",
    title: "Kesim ve fön",
    category: "sac",
    desk: "kuafor",
    short: "Yüz hattınıza ve saçınızın yapısına göre kesim; günlük ya da özel gün fönü.",
    intro: "Kesim, saçın yoğunluğu ve nasıl taranacağı konuşularak yapılır. Beğendiğiniz bir fotoğraf getirmeniz işi kolaylaştırır.",
    items: [
      { name: "Kesim", source: "instagram" },
      { name: "Fön", source: "dogrulanacak" },
      { name: "Maşa / dalga", source: "dogrulanacak" },
    ],
    consultation: [
      "Saçınızı genelde nasıl taradığınız ve fönlemeye ayırdığınız zaman",
      "Beğendiğiniz ya da kaçınmak istediğiniz kesim örnekleri",
    ],
    howItWorks: "Saç yıkanır, kesim kuru ya da ıslak yapılır, ardından fönle şekil verilir.",
    sessions: "Tek randevu.",
    notFor: ["Kafa derisinde aktif tahriş veya yara olanlar (önce bilgi verin)"],
    photo: photos.sacKesim,
    secondaryPhoto: photos.sacFonDetay,
    source: "instagram",
    price: null,
    duration: null,
  },
  {
    slug: "renk-ombre",
    number: "02",
    title: "Renk, ombre ve platin",
    category: "sac",
    desk: "kuafor",
    short: "Boya, açma, ombre, sombre ve platin; saçın kaldırabileceği tona göre planlanır.",
    intro:
      "Açma ve boyama, ombre, sombre ve platin salonun Instagram'da en çok paylaştığı işler. Saçın geçmişi konuşulmadan açma kararı verilmez.",
    items: [
      { name: "Boya", source: "instagram" },
      { name: "Açma", source: "instagram" },
      { name: "Ombre", source: "instagram" },
      { name: "Sombre", source: "instagram" },
      { name: "Platin", source: "instagram" },
    ],
    consultation: [
      "Son aylarda saçınıza yapılan boya, açma veya düzleştirme işlemleri",
      "Ulaşmak istediğiniz tonun fotoğrafı",
      "Kına veya bitkisel boya kullanıp kullanmadığınız",
    ],
    howItWorks:
      "Önce saçın durumu ve önceki boyalar incelenir, gerekirse tutam testi yapılır. Açma, saçın kaldırabileceği seviyeye kadar yapılır; çok koyu saçta istenen ton birden fazla randevuya bölünebilir.",
    sessions: "Çoğunlukla tek uzun randevu; koyu saçtan platine geçişte birkaç randevu gerekebilir.",
    notFor: [
      "Saç boyasına karşı bilinen alerjisi olanlar (uygulama öncesi test önerilir)",
      "Kafa derisinde aktif tahriş veya yara olanlar",
      "Yakın zamanda kına yaktıranlar (önce mutlaka söyleyin)",
    ],
    photo: photos.renk,
    secondaryPhoto: photos.portreHareket,
    source: "instagram",
    price: null,
    duration: null,
  },
  {
    slug: "keratin-bakim",
    number: "03",
    title: "Keratin ve saç bakımı",
    category: "sac",
    desk: "kuafor",
    short: "Kabaran, kolay kırılan ya da işlem görmüş saçlar için bakım uygulamaları.",
    intro: "Hangi bakımın uygun olduğu saçın durumuna göre seçilir. [DOLDURULACAK: salonda yapılan bakım/keratin türleri]",
    items: [
      { name: "Keratin", source: "dogrulanacak" },
      { name: "Saç bakımı", source: "dogrulanacak" },
    ],
    consultation: [
      "Saçınızın son aylarda gördüğü işlemler",
      "Daha düz mü, yalnızca daha yumuşak mı görünmesini istediğiniz",
    ],
    howItWorks: "Saç yıkanır, bakım ürünü uygulanır ve ürüne göre ısıyla sabitlenir.",
    sessions: "Tek randevu; tekrar aralığı ürüne ve saça göre önerilir.",
    notFor: [
      "Gebelik ve emzirme döneminde (ürün içeriği için önce danışın)",
      "Kafa derisinde aktif tahriş olanlar",
    ],
    photo: photos.portreDuz,
    source: "dogrulanacak",
    price: null,
    duration: null,
  },
  {
    slug: "sac-kaynak",
    number: "04",
    title: "Saç kaynak",
    category: "sac",
    desk: "kuafor",
    short: "Uzunluk ve hacim için kaynak; renk ve doku saçınıza göre seçilir.",
    intro: "Kaynak öncesinde saçın yoğunluğu, istenen uzunluk ve günlük taranış konuşulur. [DOLDURULACAK: uygulanan kaynak yöntemi]",
    items: [{ name: "Saç kaynak", source: "dogrulanacak" }],
    consultation: [
      "İstediğiniz uzunluk ve hacim",
      "Kendi saçınızın yoğunluğu ve dökülme durumu",
      "Bakım ve tazeleme için ayırabileceğiniz zaman",
    ],
    howItWorks: "Kaynak saç, renk ve doku olarak eşleştirilir ve seçilen yöntemle kendi saçınıza tutturulur.",
    sessions: "Tek uzun randevu; tazeleme aralığı yönteme göre değişir.",
    notFor: [
      "Yoğun dökülme veya kafa derisi rahatsızlığı olanlar (önce hekime danışılmalı)",
      "Çok ince ve seyrek saçlarda yöntem ön görüşmede birlikte seçilir",
    ],
    photo: photos.portreBeyaz,
    source: "dogrulanacak",
    price: null,
    duration: null,
  },
  {
    slug: "gelin-ozel-gun",
    number: "05",
    title: "Gelin ve özel gün",
    category: "guzellik",
    desk: "guzellik",
    short: "Gelin, nişan, kına ve mezuniyet için saç; prova ve erken saat randevusu.",
    intro: "Gelin saçı, Instagram'da öne çıkan başlıklardan biri. Tarih, saat ve prova önceden planlanır; düğün sabahları için erken randevu konuşulabilir.",
    items: [
      { name: "Gelin saçı", source: "instagram" },
      { name: "Nişan ve kına saçı", source: "dogrulanacak" },
      { name: "Prova", source: "dogrulanacak" },
    ],
    consultation: [
      "Düğün tarihi, saati ve gelinlik / duvak modeli",
      "Beğendiğiniz gelin saçı örnekleri",
      "Tesettür bölümünde hazırlanmak isteyip istemediğiniz",
    ],
    howItWorks: "Prova randevusunda model belirlenir, düğün günü saç ve varsa makyaj aynı oturumda tamamlanır.",
    sessions: "Prova + düğün günü olmak üzere genellikle iki randevu.",
    notFor: ["Kafa derisinde aktif tahriş olanlar (önce bilgi verin)"],
    photo: photos.portreDalgali,
    secondaryPhoto: photos.sacToka,
    source: "instagram",
    price: null,
    duration: null,
  },
  {
    slug: "makyaj",
    number: "06",
    title: "Makyaj",
    category: "guzellik",
    desk: "guzellik",
    short: "Gelin, nişan ve davetler için yüzünüze göre makyaj.",
    intro: "Makyaj, saçla birlikte aynı randevuda yapılabilir. Ürün hassasiyetlerinizi önceden söyleyin.",
    items: [
      { name: "Gelin makyajı", source: "dogrulanacak" },
      { name: "Özel gün makyajı", source: "google" },
    ],
    consultation: ["Etkinliğin türü, saati ve kıyafetiniz", "Cilt hassasiyetleriniz ve kullandığınız ürünler"],
    howItWorks: "Cilt hazırlığıyla başlar; renkler kıyafet ve ışığa göre seçilir.",
    sessions: "Tek randevu; gelin için prova ayrıca planlanabilir.",
    notFor: ["Yüzde aktif cilt iltihabı olanlar (ürün seçimi için önce bilgi verin)"],
    photo: photos.portreHareket,
    source: "google",
    price: null,
    duration: null,
  },
  {
    slug: "tirnak",
    number: "07",
    title: "Tırnak",
    category: "guzellik",
    desk: "guzellik",
    short: "Jel tırnak, manikür ve pedikür.",
    intro: "Uygulama seçeneklerini ve renkleri salonla birlikte belirleyin.",
    items: [
      { name: "Jel tırnak", source: "dogrulanacak" },
      { name: "Manikür", source: "dogrulanacak" },
      { name: "Pedikür", source: "dogrulanacak" },
    ],
    consultation: ["Tırnaklarınızın şu anki durumu ve önceki uygulamalar", "Tercih ettiğiniz uzunluk, form ve renk"],
    howItWorks: "Tırnaklar şekillendirilir, kütiküller bakılır, ardından seçilen renk veya jel uygulanır.",
    sessions: "Tek randevu; jel için tazeleme aralığı salonla planlanır.",
    notFor: ["Tırnakta veya çevresinde mantar, enfeksiyon ya da açık yara olanlar"],
    photo: photos.tirnakBordo,
    secondaryPhoto: photos.tirnakBakim,
    source: "dogrulanacak",
    price: null,
    duration: null,
  },
];

export const serviceCategories = [
  { id: "sac", label: "Saç", desk: "kuafor" },
  { id: "guzellik", label: "Gelin, makyaj ve tırnak", desk: "guzellik" },
] as const;

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}

export function getPhone(desk?: Service["desk"]) {
  return business.phones.find((p) => p.desk === desk) ?? business.phones[0] ?? null;
}

/** Gelin ve özel gün paketleri: içerik ve fiyatlar salondan alınacak */
export const packages: Package[] = [
  {
    name: "Gelin paketi",
    includes: ["Prova", "Düğün günü gelin saçı", "Gelin makyajı", "[DOLDURULACAK: pakete dahil diğerleri]"],
    price: null,
    source: "dogrulanacak",
  },
  {
    name: "Nişan / kına paketi",
    includes: ["Saç", "Makyaj", "[DOLDURULACAK: pakete dahil diğerleri]"],
    price: null,
    source: "dogrulanacak",
  },
  {
    name: "Özel gün",
    includes: ["Fön veya topuz", "İsteğe bağlı makyaj"],
    price: null,
    source: "dogrulanacak",
  },
];

/** Google yorumlarından kısa alıntılar (2026-10-31'de görüldü). Uydurma yorum eklenmez. */
export const reviews: Review[] = [
  {
    initials: "E. Ş.",
    text: "Instagram'dan fiyat almıştım. Çıkışta da aynı fiyatı ödedim.",
    topic: "Saç ve makyaj",
    when: "Temmuz 2026",
    source: "google",
  },
  {
    initials: "D. Y.",
    text: "Hem işlerini çok güzel yapıyorlar hem de tüm çalışanlar son derece ilgili, güler yüzlü ve samimi.",
    topic: "Saç",
    when: "Ekim 2026",
    source: "google",
  },
  {
    initials: "Y. T.",
    text: "Ombre işlemi yaptırdım… çok memnun kaldım, bayıldım.",
    topic: "Ombre",
    when: "Mayıs 2026",
    source: "google",
  },
];

export const faqs: Faq[] = [
  {
    q: "Tesettür bölümü var mı?",
    a: "Evet, başörtülü misafirlerimiz için ayrı bir bölüm var. Randevu alırken belirtmeniz yeterli.",
    source: "instagram",
  },
  {
    q: "Fiyat almak için Instagram'dan mı yazmalıyım?",
    a: "Gerek yok. Sayfadaki \"Fiyat al\" düğmesi WhatsApp'ı ilgilendiğiniz hizmetin adıyla açar; saçınızın fotoğrafını da ekleyebilirsiniz.",
    source: "dogrulanacak",
  },
  {
    q: "Ombre veya platin kaç saat sürer?",
    a: "Saçın boyuna, yoğunluğuna ve önceki boyalara göre değişir. Fotoğraf gönderirseniz yaklaşık süreyi önceden söyleyebiliriz.",
    source: "dogrulanacak",
  },
  {
    q: "Gelin saçı için prova yapılıyor mu?",
    a: "Prova randevusu planlanabilir. Düğün tarihinizi ve saatinizi erken bildirmeniz, sabah randevusu için yer ayırmamızı kolaylaştırır.",
    source: "dogrulanacak",
  },
  {
    q: "Salonu nasıl bulurum?",
    a: "İsmetpaşa Caddesi'nde, Emniyet Müdürlüğü'nün karşısındaki Arif Alper İş Merkezi'nin 3. katındayız; Birleşim Pastanesi'nin üstü.",
    source: "google",
  },
  {
    q: "Ödeme seçenekleri neler?",
    a: "[DOLDURULACAK: nakit / kart / taksit bilgisi]",
    source: "dogrulanacak",
  },
];

/** Salon temizliği; uygulamalar salondan alınacak */
export const hygiene = {
  source: "dogrulanacak" as const,
  title: "Temizlik",
  points: [
    { title: "Havlu ve örtü", text: "[DOLDURULACAK: tek kullanımlık ya da her müşteriye temiz havlu / örtü]" },
    { title: "Tarak ve aletler", text: "[DOLDURULACAK: tarak, fırça ve tırnak aletlerinin dezenfeksiyon yöntemi]" },
    { title: "Ürünler", text: "[DOLDURULACAK: kullanılan boya / bakım markaları]" },
  ],
};

export const galleryCategories: { id: GalleryCategory | "tumu"; label: string }[] = [
  { id: "tumu", label: "Tümü" },
  { id: "sac", label: "Kesim ve renk" },
  { id: "gelin", label: "Gelin ve özel gün" },
  { id: "tirnak", label: "Tırnak" },
  { id: "oncesi-sonrasi", label: "Renk dönüşümü" },
  { id: "mekan", label: "Salon" },
];

export const gallery: GalleryItem[] = [
  { ...photos.portreHareket, category: "sac", caption: "Hacim ve hareket" },
  { ...photos.renk, category: "sac", caption: "Renk uygulaması" },
  { ...photos.portreDalgali, category: "gelin", caption: "Dalgalı özel gün saçı" },
  { ...photos.sacFonDetay, category: "sac", caption: "Fırçayla fön" },
  { ...photos.portreBeyaz, category: "gelin", caption: "Uzun ve sade" },
  { ...photos.sacToka, category: "gelin", caption: "Topuz hazırlığı" },
  { ...photos.portreDuz, category: "sac", caption: "Düz ve parlak" },
  { ...photos.tirnakBordo, category: "tirnak", caption: "Koyu tonlar" },
  { ...photos.sacMakas, category: "sac", caption: "Uç alımı" },
  { ...photos.mekanAyna, category: "mekan", caption: "Ayna başı" },
  { ...photos.sacKesim, category: "sac", caption: "Islak kesim" },
  { ...photos.tirnakKirmizi, category: "tirnak", caption: "Kırmızı" },
  { ...photos.mekanYikama, category: "mekan", caption: "Yıkama alanı" },
  { ...photos.sacTarama, category: "sac", caption: "Tarama" },
  { ...photos.tirnakKoyu, category: "tirnak", caption: "Klasik bitiş" },
  { ...photos.mekanAydinlik, category: "mekan", caption: "Akşam ışığı" },
  { ...photos.aletler, category: "sac", caption: "Tezgâh" },
];

/** Renk dönüşümü (öncesi / sonrası): salonun izinli gerçek fotoğrafları gelene kadar yer tutucu */
export const beforeAfter = {
  source: "dogrulanacak" as const,
  slots: [
    { label: "Ombre", note: "[DOLDURULACAK: öncesi / sonrası fotoğraf, müşteri izniyle]" },
    { label: "Platin", note: "[DOLDURULACAK: öncesi / sonrası fotoğraf, müşteri izniyle]" },
    { label: "Gelin saçı", note: "[DOLDURULACAK: fotoğraf, gelinin izniyle]" },
  ],
};

/** Ana sayfadaki dokunmatik şerit */
export const selectedFrames = [
  { ...photos.renk, caption: "Renk uygulaması" },
  { ...photos.portreDalgali, caption: "Dalgalı özel gün saçı" },
  { ...photos.sacKesim, caption: "Islak kesim" },
  { ...photos.portreBeyaz, caption: "Uzun ve sade" },
  { ...photos.sacToka, caption: "Topuz hazırlığı" },
  { ...photos.portreDuz, caption: "Düz ve parlak" },
];

/**
 * Girişte seçilen bölüme göre değişen içerik (lib/bolum.ts).
 * Zen'de iki bölüm: günlük saç işleri ve gelin / özel gün hazırlığı.
 */
export const bolumler = {
  kuafor: {
    id: "kuafor",
    label: "Saç",
    letter: "A",
    desk: "kuafor",
    category: "sac",
    galleryCategories: ["sac"],
    other: "guzellik",
    heroTitle: "Ombreden platine,",
    heroAccent: "rengini konuşalım.",
    lead: "Kesim, boya, açma, ombre, sombre, platin, keratin ve kaynak.",
    chooserText: "Kesim · ombre · platin · kaynak",
    cta: "Saç randevusu",
    photo: photos.hero,
    approachPhoto: photos.renk,
    servicesTitle: "Saç için.",
    frames: [
      { ...photos.renk, caption: "Renk uygulaması" },
      { ...photos.sacKesim, caption: "Islak kesim" },
      { ...photos.portreHareket, caption: "Hacim ve hareket" },
      { ...photos.sacFonDetay, caption: "Fırçayla fön" },
      { ...photos.portreDuz, caption: "Düz ve parlak" },
      { ...photos.sacMakas, caption: "Uç alımı" },
    ],
    preview: [photos.portreHareket, photos.renk, photos.sacFon],
  },
  guzellik: {
    id: "guzellik",
    label: "Gelin",
    letter: "B",
    desk: "guzellik",
    category: "guzellik",
    galleryCategories: ["gelin", "tirnak"],
    other: "kuafor",
    heroTitle: "Büyük gün için",
    heroAccent: "erkenden hazırız.",
    lead: "Gelin, nişan ve kına saçı; makyaj ve tırnak. Tesettür bölümünde de hazırlanabilirsiniz.",
    chooserText: "Gelin saçı · makyaj · tırnak",
    cta: "Gelin randevusu",
    photo: photos.portreDalgali,
    approachPhoto: photos.sacToka,
    servicesTitle: "Gelin ve özel gün için.",
    frames: [
      { ...photos.portreBeyaz, caption: "Uzun ve sade" },
      { ...photos.sacToka, caption: "Topuz hazırlığı" },
      { ...photos.tirnakKirmizi, caption: "Kırmızı" },
      { ...photos.portreDalgali, caption: "Dalgalı özel gün saçı" },
      { ...photos.tirnakKoyu, caption: "Klasik bitiş" },
    ],
    preview: [photos.portreBeyaz, photos.sacToka, photos.tirnakBordo],
  },
} as const;

/** Seçim yapılmadığında (karma) kullanılan ana sayfa önizlemesi */
export const neutralPreview = [photos.portreHareket, photos.portreDalgali, photos.renk] as const;

/**
 * Yaklaşım metinleri. source: "dogrulanacak": salonun kendi ifadeleriyle değiştirilmeli.
 */
export const approach = {
  source: "dogrulanacak" as const,
  title: "Önce fotoğrafa bakalım, sonra fiyatı söyleyelim.",
  lead: "Renk işlerinde fiyat ve süre saçın boyuna, yoğunluğuna ve önceki boyalara göre değişir. Saçınızın bugünkü hâlini görmek, size net bir rakam söylememizi sağlar.",
  points: [
    { title: "Fotoğraf", text: "Saçınızın ve ulaşmak istediğiniz tonun fotoğrafını WhatsApp'tan gönderin." },
    { title: "Net fiyat", text: "Yaklaşık süre ve fiyatı randevudan önce öğrenirsiniz." },
    { title: "Randevu", text: "Size uyan günü birlikte ayarlarız; gelin hazırlığında sabah saatleri de konuşulabilir." },
  ],
};

export const site = {
  title: "Zen Bayan Kuaför · İsmetpaşa Caddesi, Yakutiye / Erzurum",
  description:
    "Erzurum Yakutiye'de bayan kuaförü: kesim, boya, ombre, sombre, platin, keratin, kaynak, gelin saçı ve makyaj. Tesettür bölümü. WhatsApp'tan randevu ve fiyat.",
  demoNote: demo.note,
};
