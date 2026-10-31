# Tasarım sistemi

Hedef: Zen Bayan Kuaför (Erzurum, Yakutiye, İsmetpaşa Caddesi) için kontrastlı, cesur, gelin ve renk işlerini öne çıkaran bayan kuaförü demosu. Instagram logosundaki siyah zemin ve kırmızı "ZEN" dilinden türetildi. Bütün tokenlar `app/globals.css` içindeki `@theme` bloğundadır; Tailwind sınıfları (`bg-paper`, `text-accent`, `text-h2` …) buradan üretilir.

> Renkler ve fontlar **işletmenin doğrulanmış kurumsal kimliği değildir.** Gerçek logo/marka materyali gelince önce `@theme` değerleri güncellenir.

## Renkler

| Token | Değer | Kullanım |
|---|---|---|
| `paper` | `#F5EFE9` | Ana zemin (sıcak krem) |
| `paper-deep` | `#ECE4DC` | İkincil açık bölüm zemini |
| `ink` | `#1B1716` | Metin, koyu bantlar, birincil düğme |
| `ink-soft` | `#2A2422` | Koyu yüzey varyantı |
| `accent` | `#8A2F2B` | Vişne: üst etiketler, italik vurgu, odak halkası, aktif menü |
| `accent-deep` | `#6B2320` | Accent'in koyu varyantı |
| `accent-tint` | `#F1DEDB` | Koyu zeminde vurgu metni, açık hover |
| `stone-100…700` | sıcak taş tonları | Çizgiler, iskelet, ikincil metin |
| `on-ink-muted` | `#B8B0A4` | Koyu zeminde ikincil metin |

Gelin bölümünde (`html[data-bolum="guzellik"]`) `accent` → `#7A5B3C` (şampanya-kahve), `accent-deep` → `#5E4630`, `accent-tint` → `#EFE4D6`.

Kontrast (WCAG): accent/paper 7,30:1; accent/paper-deep 6,62:1; accent/accent-tint 6,43:1; gelin accent/paper 5,43:1, /paper-deep 4,93:1, /accent-tint 4,94:1; ink/paper 15,6:1; stone-500/paper 5,18:1, /paper-deep 4,70:1; accent-tint/ink 13,7:1; on-ink-muted/ink 8,3:1. Hepsi küçük metin için AA (4,5:1) üzerinde. Accent koyu (ink) zeminde yalnızca 2,1:1 verir; koyu bantta metin için `accent-tint` kullanılır. `stone-300/400` yalnızca çizgi/devre dışı durum içindir.

Kaçınılanlar: mor/mavi degrade, cam (blur) efekti, gölge yığınları, emoji ikon.

## Köşe

Her yerde 2 px: düğmeler (`--radius-ctl`), kart ve görsel çerçeveleri (`--radius-card`, `rounded-sm`). Daireler yalnızca durum noktası ve yuvarlak WhatsApp düğmesi içindir.

## Koyu bantlar

Koyu (`ink`) zemin daha sık kullanılır: hero altı şerit, tesettür bölümü, WhatsApp çağrısı, alt bilgi. `.band-ink` yardımcı sınıfı zemini, odak halkasını ve üst etiket rengini (`accent-tint`) ayarlar; ikincil metin için `.text-muted-on`.

## Tipografi

- **Başlık:** DM Serif Display (`latin-ext`, normal + italik) → `font-serif`, `--font-display` değişkeni (`app/layout.tsx`). Yalnızca 400 ağırlığı vardır; tüm başlıklar 400, `letter-spacing: -0.012em`. Sahte kalın üretilmez.
- **Gövde:** Jost (`latin-ext`) → `font-sans`, `--font-body` değişkeni.
- İki aile dışında font eklenmez. Türkçe karakterler (ğ, ş, ı, İ, ç, ö, ü) iki ailede de desteklenir.
- Vurgu: başlık içinde `<em>` → serif italik, accent renginde.
- Logo: yazı logosu "ZEN" (serif, belirgin) + aralıklı "BAYAN KUAFÖR" (Jost). Favicon: ink zemin, accent renkli serif "Z".

Akışkan ölçek (`clamp`):

| Token | Aralık | Kullanım |
|---|---|---|
| `text-display` | 40 → 108 px | Yalnızca ana sayfa hero başlığı |
| `text-h1` | 36 → 72 px | Sayfa başlıkları |
| `text-h2` | 30 → 52 px | Bölüm başlıkları |
| `text-h3` | 24 → 34 px | Alt başlıklar, hizmet dizini |
| `text-lead` | 18 → 22 px | Giriş paragrafları |
| `.eyebrow` | 12 px, büyük harf, 0.16em | Üst etiketler |

## Ölçüler ve düzen

- Kapsayıcı: `.container-x` → en fazla 1440 px, yan boşluk `clamp(16px … 48px)` (375 px'de 16 px).
- 12 kolonlu ızgara; masaüstünde hafif asimetrik yerleşim (ör. hero 5 + 6 kolon).
- Dikey ritim: bölümler `py-20` (mobil) / `py-28` (masaüstü).
- Dokunma hedefleri en az 44×44 px (`min-h-11`, düğmelerde `min-h-12`).
- Üst çubuk yapışkan ve opak; `safe-area-inset` hesaba katılır. Menü: 768–1279 px'te "Randevu" metin bağlantısı, 1280 px üstünde düğme.
- Mobilde altta sabit WhatsApp çubuğu (~64 px) vardır; içeriği örtmesin diye `Footer` alt şeridine mobilde `72px + safe-area` boşluk verilir.
- Alt bilgi ve mobil menüde iki telefon hattı (`business.phones`) etiketleriyle listelenir.

## Fotoğraf

- `components/Photo.tsx`: `next/image` + `fill`, oran kutusu (`frame="aspect-[4/5]"`), `objectPosition` ile odak noktası (`content/photos.ts` → `focal`).
- Her stok karenin altında "İlham görseli · Foto: … / Pexels" künyesi.
- İlk ekrandaki görsel `preload`; diğerleri tembel yüklenir. Statik importlar sayesinde boyut ve bulanık yer tutucu otomatiktir.

## Hareket dili

- Sakin ve kısa: giriş mesafeleri 8–14 px, süreler 0,35–0,6 sn, kolaylaştırma `cubic-bezier(0.22, 1, 0.36, 1)`. Marquee şeridi yavaş (70 sn).
- **Hero ve sayfa başlıkları CSS animasyonuyla** (`animate-rise`, `animate-unveil`) açılır: JavaScript gecikse de içerik ~0,6 sn içinde görünür.
- **`Reveal` (Motion):** içerik sunucuda görünür gelir; yalnızca hidrasyondan sonra ekranın altında kalan öğeler gizlenip görünür alana girince açılır. JS yoksa hiçbir şey saklı kalmaz.
- Mobil menü paneli sağdan kayar (0,35 sn).
- `prefers-reduced-motion`: CSS animasyonları sıfırlanır, Motion geçişleri anında olur, lightbox animasyonları kapanır.
- Yok: açılış ekranı, scroll hijacking, özel imleç, zorunlu smooth scroll, ekranı dolduran animasyon, cam (blur) efekti. Mobilde hover'a bağlı bilgi yoktur.

## Bölüm seçimi (Saç / Gelin)

- İlk ziyarette ana sayfa iki büyük fotoğraf paneliyle hangi bölümün keşfedileceğini sorar (`components/BolumChooser.tsx`). Başlık hemen okunur, sayfanın geri kalanı altında durur; JS yoksa paneller hizmet bölümüne giden bağlantılardır. Etiketler `bolumler.*.label` ("Saç" / "Gelin") alanından gelir.
- Animasyon: masaüstünde üzerine gelinen panel genişler; tıklanan panel yaklaşık 0,75 saniyede tüm genişliğe yayılır, ardından aynı fotoğrafla o bölümün hero'su (`BolumHero`) açılır. `prefers-reduced-motion` açıkken geçiş anında olur.
- Seçim `<html data-bolum="kuafor|guzellik">` özniteliğinde ve tarayıcının yerel deposunda tutulur (`kuafor` = Saç, `guzellik` = Gelin); ilk boyamadan önce geri yüklenir (`lib/bolum-script.ts`).
- Tailwind varyantları (`app/globals.css`): `kuafor:`, `guzellik:`, `secili:`.
- Bölümü değiştirme yolları: masaüstünde üst menüdeki "Saç | Gelin" anahtarı, mobilde menünün içindeki aynı anahtar, hero altındaki bağlantı. Alt bilgideki "Bölüm seçimini sıfırla" giriş ekranına döndürür.
- Gelin seçiliyken vurgu şampanya-kahveye (`#7A5B3C`) kayar.
- Konum satırları veriden kurulur: `business.city`, `business.district`, `business.mall.name`.

## Logo

`components/Logo.tsx` geçici bir yazı logosudur ("ZEN / BAYAN KUAFÖR"). Resmî logo değildir. Favicon `app/icon.svg` de geçicidir.

## Reddedilenler

- **Adaçayı yeşili + Fraunces (yumuşak bakım stüdyosu)** — önceki işletmeye aitti, gelin/renk odaklı kuaföre fazla sakin.
- **Bordo + Bodoni moda-dergisi dili** — ilk işletmeye aitti.
- **Cam (backdrop-blur) yüzeyler ve süs yıldızları (✦)** — şablon görünümü; opak yüzey ve sade ayraç tercih edildi.
- **Yumuşak 3–6 px köşeler** — keskin, kontrastlı salon diline 2 px uyuyor.
- **Uzun, geniş hareket (32 px kayma, 1,2 sn perde, 38 sn şerit)** — mesafe ve süreler kısa tutuldu.
