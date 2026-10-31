# Devir notu

Durum tarihi: **2026-10-31**. Proje yerel; **deploy edilmedi**. Dal: `demo/zen-bayan-kuafor`.

## Durum

- Next.js 16 (App Router) + TypeScript + Tailwind 4, npm.
- Sayfalar: `/`, `/hizmetler`, `/hizmetler/[slug]` (7 hizmet), `/fiyatlar`, `/galeri` (Portfolyo), `/salon`, `/iletisim`, `/randevu`, 404, `robots.txt`.
- Tek içerik kaynağı `content/site.ts`; uyarlama adımları `README.md` içinde.
- Hizmet sayfalarında "Nasıl ilerliyoruz", "Randevu sayısı ve süre", "Önce bize söyleyin" ve fiyat bloğu var; fiyat `null` ise "Fiyat al" WhatsApp düğmesi çıkar (`serviceWhatsappUrl`).
- Portfolyoda "Renk dönüşümü" kategorisi gerçek fotoğraf gelene kadar kesikli çerçeveli yer tutucu gösterir.
- `/salon` sayfasında tesettür bölümü, ekip, temizlik ve konum tarifi var.
- Demo notu ve `noindex` (meta + `X-Robots-Tag` + `robots.txt`) açık.

## Doldurulacak yer tutucular (`[DOLDURULACAK: ...]`)

| Ne | Nerede (`content/site.ts`) |
|---|---|
| Pazartesi–Cumartesi saatleri | `business.hours[0].time` |
| Pazar kapanış saati | `business.hours[1].time` |
| Sinan Sezer'in unvanı | `business.team[0].role` |
| İki uzmanın adı (gelin saçı ve makyaj; tırnak) | `business.team[1].name`, `business.team[2].name` |
| Tesettür bölümünün düzeni (ayrı oda / perdeli alan) | `tesettur.points[0]` |
| Tesettür bölümünde yalnızca kadın çalışan | `tesettur.points[1]` |
| Tesettür bölümünde hizmetlerin teyidi | `tesettur.points[2]` |
| Salonda yapılan bakım / keratin türleri | `services` → keratin-bakim → `intro` |
| Uygulanan saç kaynak yöntemi | `services` → sac-kaynak → `intro` |
| Gelin paketine dahil diğerleri | `packages[0].includes` |
| Nişan / kına paketine dahil diğerleri | `packages[1].includes` |
| Ödeme seçenekleri | `faqs` (ödeme) |
| Havlu ve örtü uygulaması | `hygiene.points[0]` |
| Alet dezenfeksiyon yöntemi | `hygiene.points[1]` |
| Kullanılan boya / bakım markaları | `hygiene.points[2]` |
| Renk dönüşümü fotoğrafları (3 yuva, müşteri izniyle) | `beforeAfter.slots[].note` |

Ayrıca fiyatlar (`services[].price`, `packages[].price`) ve süreler (`duration`) `null`; verilince arayüz otomatik gösterir.

## Doğrulanması gerekenler

- 0532 644 22 88 numarasının WhatsApp'ta açık olduğu (`business.whatsappVerified`).
- Makyaj, tırnak, keratin ve saç kaynak hizmetlerinin salonda verildiği (brief'ten geldi).
- `source: "dogrulanacak"` olan hizmet kalemleri, SSS, yaklaşım ve temizlik metinleri ("Teyit bekliyor" etiketi çıkar).
- Yorum alıntılarının Google'da hâlâ görünür olduğu (kontrol tarihi 2026-10-31).
- Ekip adlarının ve unvanlarının salonun onayıyla yazılması; tesettür bölümü ayrıntılarının salondan teyidi.

## Bilinen sınırlar

- Bölüm seçimi yalnızca tarayıcının yerel deposunda tutulur; çerez veya sunucu kaydı yoktur.
- Randevu akışı form göndermez; hazırlanan mesaj WhatsApp'a, Instagram'a veya telefona yönlendirir. Kişisel veri toplanmaz.
- Galeri filtresi URL'ye yazılmıyor.
- `mekan-koltuk.jpg` yalnızca salon sayfasında, erkek fotoğrafları (`erkek-*.jpg`) hiçbir yerde kullanılmıyor; eski cilt, kirpik ve vücut fotoğrafları koddan çıkarıldı.
- Lighthouse ölçülmedi.
- `next dev` çalışırken `AGENTS.md` içindeki Next.js kural bloğunu yeniden yazar.

## Yayına alma kararı verilirse

1. İşletme onayını alın, yer tutucuları doldurun.
2. Noindex'i kaldırın (`app/layout.tsx` `robots`, `next.config.ts` `X-Robots-Tag`, `app/robots.ts`), demo notunu ve rozetini kaldırın (`demo`, `site.demoNote`).
3. `NEXT_PUBLIC_SITE_URL` ve gerçek alan adını ekleyin; KVKK/çerez durumunu değerlendirin (şu an çerez, analitik veya form gönderimi yok).
4. Her değişiklikten sonra: `npm run lint && npm run typecheck && npm run build`, sonra `npm start` + `npm run check`.
