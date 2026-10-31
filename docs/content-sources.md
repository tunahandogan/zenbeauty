# İçerik kaynakları

Son kontrol: **2026-10-31**. Bütün değerler `content/site.ts` içindedir. Araştırma notları ve ilerleme: `docs/ilerleme-zen.md`, dönüşüm planı: `docs/plan-zen.md`.

## Kaynak URL'leri

| Kaynak | URL | Erişim |
|---|---|---|
| Google Haritalar kaydı (Erzurum Zen Bayan Kuaför) | https://www.google.com/maps/place/Erzurum+Zen+Bayan+Kuaf%C3%B6r/@39.9048904,41.2677402,17z | Okundu: ad, adres, telefon, puan (4,4), yorum sayısı (251), fotoğraf sayısı (1.758), Pazar 07:30 açılış, "Web sitesi ekleyin" boşluğu |
| Instagram profili (@erzurum_zenkuafor) | https://www.instagram.com/erzurum_zenkuafor/ | Herkese açık profil okundu: 9.046 takipçi, biyografi ("TESETTÜR BÖLÜMÜMÜZ MEVCUTTUR", iki telefon, Sinan bey), öne çıkanlar. Gönderi fotoğrafları kullanılmadı. |

Google kaydında web sitesi alanı boş; Instagram biyografisinde site bağlantısı yok.

## Doğrulanan bilgiler

| Bilgi | Değer | Kaynak |
|---|---|---|
| Ad | Zen Bayan Kuaför (Google: Erzurum Zen Bayan Kuaför) | Instagram + Google |
| Adres | Muratpaşa Mh. İsmetpaşa Cd. Arif Alper İş Merkezi Kat 3 No: 1/2, 25000 Yakutiye / Erzurum | Google |
| Tarif | Emniyet Müdürlüğü karşısı, Birleşim Pastanesi'nin üstü | Google |
| Konum | 39.9048904, 41.2677402 (W739+X3) | Google |
| Telefon (salon) | 0442 237 27 45 | Google + Instagram |
| Telefon (Sinan Bey) | 0532 644 22 88 | Instagram biyografisi |
| Puan ve yorum | 4,4 · 251 yorum · 1.758 fotoğraf (kontrol: 2026-10-31) | Google |
| Hizmetler | Kesim, açma ve boyama, ombre, sombre, platin, gelin | Instagram öne çıkanları |
| Tesettür bölümü | "Tesettür bölümümüz mevcuttur" | Instagram biyografisi |
| Ekip | Sinan Sezer (adıyla öne çıkanlarda geçiyor) | Instagram |
| Yorum alıntıları | Üç kısa alıntı, ad baş harfiyle (E. Ş., D. Y., Y. T.) | Google yorumları |
| Pazar açılış saati | 07:30 | Google |

## Varsayım ve belirsiz alanlar

| Alan | Durum |
|---|---|
| WhatsApp | 0532 numarasının Sinan Bey'in cep hattı olduğu ve WhatsApp'ta açık olduğu varsayıldı (`business.whatsappVerified = false`); gösterimden önce doğrulayın |
| Çalışma saatleri | Yalnızca Pazar 07:30 açılış görüldü; kalanı yer tutucu |
| Makyaj, tırnak, keratin, saç kaynak | Brief'ten; Instagram veya Google'da doğrulanmadı (`source: "dogrulanacak"` ya da `google`) |
| Fiyatlar, süreler, paket içerikleri | Bilinmiyor; `price = null`, "Fiyat al" WhatsApp düğmesi |
| Tesettür bölümünün düzeni | Yer tutucu; ayrı oda mı, perdeli alan mı bilinmiyor |
| Ekip | Sinan Sezer dışında ad ve unvan yok; yer tutucu |
| Temizlik uygulamaları | Yer tutucu |
| Hizmet metinleri, SSS, yaklaşım | Konsept metin (`source: "dogrulanacak"`); işletmeye onaylatılmalı |
| Renk dönüşümü (öncesi / sonrası) | Fotoğraf yok; portfolyoda kesikli çerçeveli yer tutucu |
| Logo | Resmî logo kullanılmadı; yazı logosu |
| Aynı adlı hesaplar | Başka şehirlerde aynı adlı hesaplar var (ör. Kayseri); karışmaması için Erzurum hesabı kaynak alındı |

## Görsel kaynakları ve lisans

Bütün fotoğraflar [Pexels](https://www.pexels.com) üzerinden indirildi, `public/images/stok/` altında yerel olarak tutuluyor. Pexels'in kendi boyutlandırmasıyla 1800 px genişlikte JPEG; başka düzenleme yapılmadı. Sitede `next/image` ile yeniden boyutlandırılıp modern formatlarda sunuluyor.

**Lisans:** [Pexels License](https://www.pexels.com/license/): ücretsiz, ticari kullanıma açık, atıf zorunlu değil (yine de sitede ve aşağıda veriliyor), düzenlenebilir. Lisans, fotoğraftaki tanınabilir kişilerin bir işletmeyi onaylıyormuş gibi gösterilmesine izin vermez. Bu yüzden her karede "Temsilî görsel" künyesi var; kişiler salon çalışanı veya müşterisi olarak sunulmuyor.

Fotoğrafçı adları Pexels sayfalarından alındı; bir kısmı Pexels'in listeleme verisinden (kullanıcı adı) geldiği için profil adıyla küçük farklar olabilir. `content/photos.ts` artık yalnızca saç, gelin, tırnak ve mekân karelerini içeriyor; kullanılmayan eski dosyalar `public/images/stok/` altında durabilir, silinebilir.

| Dosya | Kullanıldığı yer | Fotoğrafçı | Kaynak |
|---|---|---|---|
| `hero.jpg` | Ana sayfa hero | cottonbro studio | https://www.pexels.com/photo/a-woman-in-beige-shirt-10210765/ |
| `portre-dalgali.jpg` | Ana sayfa "Yaklaşım", galeri | Jonatan Galvis | https://www.pexels.com/photo/young-woman-with-wavy-hair-17779645/ |
| `portre-hareket.jpg` | Saç tasarımı, ana sayfa galeri önizleme, galeri | Hannah Bickmore | https://www.pexels.com/photo/woman-in-a-beige-suit-lifting-her-brown-hair-9514662/ |
| `portre-duz.jpg` | Şerit, galeri | Arash KH | https://www.pexels.com/photo/moody-contemporary-fashion-portrait-of-woman-38020514/ |
| `portre-beyaz.jpg` | Şerit, galeri | Andrea Musto | https://www.pexels.com/photo/elegant-portrait-of-woman-in-stylish-white-shirt-32213600/ |
| `sac-tarama.jpg` | Saç tasarımı | Oleskandra Biliak | https://www.pexels.com/photo/a-hairdresser-combing-clients-hair-23349912/ |
| `sac-fon.jpg` | Ana sayfa galeri önizleme | Deni Priyo | https://www.pexels.com/photo/close-up-of-women-hairdressing-10028673/ |
| `sac-fon-detay.jpg` | Şerit, galeri, randevu | cottonbro studio | https://www.pexels.com/photo/woman-in-black-and-gold-round-watch-3993467/ |
| `sac-makas.jpg` | Galeri | mths | https://www.pexels.com/photo/close-up-of-the-hands-of-a-hairdresser-at-work-6487888/ |
| `sac-kesim.jpg` | Şerit | cottonbro studio | https://www.pexels.com/photo/woman-getting-a-haircut-3993462/ |
| `sac-toka.jpg` | Şerit, galeri | jibarofoto | https://www.pexels.com/photo/clips-on-woman-hair-at-hairdresser-20092122/ |
| `sac-kesim-beyaz.jpg` | Salon: kuaför bölümü | Engin Akyurt | https://www.pexels.com/photo/person-cutting-hair-3356170/ |
| `erkek-kesim.jpg` | Kullanılmıyor (erkek hizmeti kapsam dışı) | Jari Lobo | https://www.pexels.com/photo/close-up-of-person-with-short-hair-getting-a-haircut-15659494/ |
| `erkek-studyo.jpg` | Kullanılmıyor (erkek hizmeti kapsam dışı) | Kawe Rodrigues | https://www.pexels.com/photo/barber-cutting-client-hair-19664876/ |
| `renk.jpg` | Galeri | cottonbro studio | https://www.pexels.com/photo/woman-getting-a-haircut-3993320/ |
| `aletler.jpg` | Salon: yaklaşım, galeri | N. Voitkevich | https://www.pexels.com/photo/black-and-white-hair-brush-8468143/ |
| `tirnak-bordo.jpg` | Tırnak, şerit, galeri | Polina Tankilevitch | https://www.pexels.com/photo/person-with-black-and-white-manicure-3738369/ |
| `tirnak-kirmizi.jpg` | Galeri | cottonbro studio | https://www.pexels.com/photo/person-with-red-nail-polish-3997384/ |
| `tirnak-bakim.jpg` | Tırnak, salon: güzellik bölümü | Polina Tankilevitch | https://www.pexels.com/photo/photo-of-person-s-hand-soak-in-water-3738378/ |
| `tirnak-koyu.jpg` | Galeri | svliiim | https://www.pexels.com/photo/elegant-hand-with-french-manicure-and-jewelry-34997574/ |
| `mekan-yikama.jpg` | Salon (mekân ilhamı), galeri | Max Vakhtbovych | https://www.pexels.com/photo/backwash-chair-in-contemporary-beauty-studio-7195812/ |
| `mekan-koltuk.jpg` | Şu an kullanılmıyor (yedek) | Max Vakhtbovych | https://www.pexels.com/photo/backwash-chairs-in-modern-beauty-salon-7195805/ |
| `mekan-aydinlik.jpg` | İletişim, galeri | Emirhan Sayar | https://www.pexels.com/photo/modern-hair-salon-interior-with-stylish-lighting-35844833/ |
| `mekan-ayna.jpg` | Salon (mekân ilhamı), galeri | Max Vakhtbovych | https://www.pexels.com/photo/photo-of-a-black-chair-and-a-mirror-with-a-ring-light-7750144/ |

Seçimde rakip salon portföyü, sosyal medya görseli ve belirgin marka logosu içeren kareler kullanılmadı.

Tipografi `app/layout.tsx` içinde tanımlı; Google Fonts üzerinden SIL Open Font License ile (`next/font` derleme sırasında indirip yerel sunar). Seçilen fontlar için `docs/design-system.md`.
