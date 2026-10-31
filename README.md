# Zen Bayan Kuaför — demo

Erzurum Yakutiye, İsmetpaşa Caddesi'ndeki Zen Bayan Kuaför (Google kaydı: Erzurum Zen Bayan Kuaför) için hazırlanmış, **işletme tarafından henüz onaylanmamış** çok sayfalı web sitesi demosu. Kesim, renk, gelin saçı, makyaj ve tırnak; tesettür bölümü var.

- Ana eylem WhatsApp'tan randevu ve "Fiyat al". Fiyatlar bilinmediği için uydurulmaz; fiyatı olmayan hizmette düğme WhatsApp'a yönlendirir.
- Her sayfada demo notu var; site `noindex, nofollow` (meta + `X-Robots-Tag` + `robots.txt`).
- Fotoğraflar Pexels'ten alınmış **temsilî görsellerdir**; salonun işi, müşterisi veya mekânı değildir. Renk dönüşümü (öncesi / sonrası) alanı gerçek, müşteri izinli fotoğraflar için boş bırakıldı.
- Doğrulanmamış bilgiler `[DOLDURULACAK: ...]` yer tutucusuyla işaretli; liste `docs/handoff.md` içinde. Kaynaklar: `docs/content-sources.md`.
- Otomatik deploy yoktur.

## Başka bir işletmeye 15 dakikada uyarlama

1. `content/site.ts` — `business` (ad, `tagline`, `servicesLine`, şehir/ilçe, `mall` ve `address`, `mapTitle`, harita bağlantıları, Instagram, telefonlar, `whatsapp`, `hours`, `team`, `google`), `services` (başlık, `items`, `howItWorks`, `sessions`, `notFor`, `price`), `serviceCategories`, `packages`, `tesettur` (gerekmiyorsa kaldırın), `reviews`, `faqs`, `hygiene`, `galleryCategories`, `beforeAfter`, `approach`, `bolumler`, `site.title/description`, `demo`. Bilinmeyen alana `[DOLDURULACAK: ...]` yazın, `price` için `null` bırakın.
2. `content/service-slugs.ts` — hizmet adresleri değiştiyse buradaki listeyi de güncelleyin (`proxy.ts` kullanır).
3. `content/photos.ts` ve `public/images/` — fotoğrafları değiştirin; kendi fotoğraflarınızda "Temsilî görsel" etiketini kaldırın.
4. `app/icon.svg` — favicon. `components/Logo.tsx` — yazı logosu.
5. `app/globals.css` — `@theme` bloğundaki renk tokenları (`--color-accent*`, `--color-paper*`, `--color-ink*`) ve fontlar (`app/layout.tsx`, `--font-display` / `--font-body`); kararlar `docs/design-system.md` içinde.
6. `NEXT_PUBLIC_SITE_URL` ortam değişkeni (Open Graph için) ve `package.json` içindeki `name`.
7. `npm run build` ve `npm run check` ile doğrulayın; eski işletme adı, adres ve telefonun hiçbir yerde sabit kalmadığını arayarak kontrol edin.

## Gereksinimler

- Node.js 20.9+ (Node 24 ile denendi), npm (repo `package-lock.json` kullanır)
- Kontrol ve ekran görüntüsü betikleri için yerel Google Chrome (yolu farklıysa `CHROME_PATH`)

## Kurulum ve çalıştırma

```bash
npm install
npm run dev            # geliştirme: http://localhost:3000
```

Üretim derlemesi:

```bash
npm run build
npm start              # http://localhost:3000
```

> Not: Bu makinede kullanıcı ana dizininde pnpm `devEngines` tanımlı bir `package.json` var. `npm`, proje klasöründe kendi `package.json`'unu bulduğu için sorun çıkmaz; `next.config.ts` içindeki `turbopack.root` da üst klasördeki lockfile'ın kök sanılmasını engeller.

## Kontroller

```bash
npm run lint
npm run typecheck
npm run build

# sunucu açıkken (ayrı terminalde npm start):
npm run check -- --base http://localhost:3000        # uçtan uca kontroller
npm run screenshots -- --base http://localhost:3000  # screenshots/ altına ana sayfa + randevu, 390 ve 1440 px
```

`npm run check` şunları dener: girişteki bölüm seçimi (seçim ekranı, panel tıklaması, odak, yeniden yüklemede hatırlanma, üst menü ve mobil menü anahtarı, seçime göre sayfa sıralamaları, sıfırlama); 360/390/768/1440 px'de bütün rotalarda yatay taşma, konsol/hidrasyon hatası, noindex ve tek `h1`; 390 px'de 44 px altı dokunma hedefi; iç bağlantıların durumu; bilinmeyen hizmet adresinin 404 dönmesi; mobil menü (odak, Escape, kaydırma kilidi); galeri filtresi ve lightbox klavye kullanımı; Embla şeridi; randevu akışında geri/ileri seçim korunumu, `?hizmet=` ön seçimi ve panoya kopyalama.

## Yapı

```
app/                     Rotalar (App Router)
  page.tsx               /
  hizmetler/             /hizmetler ve /hizmetler/[slug]
  galeri/ salon/ iletisim/ randevu/
  robots.ts, not-found.tsx, icon.svg, globals.css (tasarım tokenları)
components/              Arayüz bileşenleri
content/
  site.ts                TEK içerik kaynağı (işletme bilgisi, hizmetler, galeri, metinler)
  photos.ts              Görsel importları + künyeler
  service-slugs.ts       Hizmet adresleri (proxy.ts de kullanır)
  types.ts
lib/booking.ts           Randevu talebi metni ve WhatsApp bağlantıları (saf fonksiyonlar)
lib/bolum.ts             Girişte seçilen bölüm (Saç / Gelin): kanca + ayarlayıcı
lib/bolum-script.ts      Seçimi ilk boyamadan önce geri yükleyen satır içi betik
proxy.ts                 Bilinmeyen hizmet adreslerine gerçek 404
public/images/stok/      Yerel stok fotoğraflar
scripts/                 check.ts, screenshots.ts
docs/                    design-system, content-sources, handoff
```

## Kütüphaneler ve görevleri

| Paket | Görevi |
|---|---|
| `next` 16.4, `react` 19.3 | App Router, statik üretim, `next/image`, `next/font` |
| `tailwindcss` 4 | Stil; tokenlar `app/globals.css` içindeki `@theme` bloğunda |
| `motion` | Bölüm anahtarında kayan seçim zemini ve bölüm değişince içerik geçişleri, kaydırınca hafif girişler (`Reveal`), mobil menü paneli, hizmet dizini görsel geçişi, randevu adım geçişi, galeri filtre geçişi |
| `@radix-ui/react-dialog` | Mobil menü: odak tuzağı, Escape, kaydırma kilidi, odağın geri verilmesi |
| `embla-carousel-react` | Ana sayfadaki dokunmatik "Seçili kareler" şeridi |
| `yet-another-react-lightbox` | Galeri lightbox'ı (klavye, kaydırma/swipe, başlık ve sayaç eklentileri) |
| `lucide-react` | Ölçülü çizgi ikonlar (Lucide v1'de marka ikonu olmadığı için Instagram için `AtSign` kullanılır) |
| `playwright-core`, `tsx` (dev) | Kontrol ve ekran görüntüsü betikleri |

## İçerik güncelleme

Bütün metin ve işletme bilgileri `content/site.ts` içinde. Bilinmeyen metin alanları `[DOLDURULACAK: ...]` yer tutucusuyla görünür kalır; fiyat bilinmiyorsa `service.price = null` ve arayüz "Fiyat al" WhatsApp düğmesi gösterir. Bir değer doğrulandığında yalnızca bu dosyayı değiştirmek yeterlidir; ayrıntı için `docs/handoff.md`.
