/**
 * Bütün fotoğraflar Pexels lisansıyla kullanılan TEMSİLÎ görsellerdir.
 * Salonun işi, müşterisi, ekibi veya mekânı değildir. Kaynak ve lisans: docs/content-sources.md
 * İşletmenin kendi fotoğrafları geldiğinde bu dosyadaki importlar değiştirilir.
 */
import type { Photo } from "./types";

import hero from "@/public/images/stok/hero.jpg";
import portreDalgali from "@/public/images/stok/portre-dalgali.jpg";
import portreHareket from "@/public/images/stok/portre-hareket.jpg";
import portreDuz from "@/public/images/stok/portre-duz.jpg";
import portreBeyaz from "@/public/images/stok/portre-beyaz.jpg";
import sacTarama from "@/public/images/stok/sac-tarama.jpg";
import sacFon from "@/public/images/stok/sac-fon.jpg";
import sacFonDetay from "@/public/images/stok/sac-fon-detay.jpg";
import sacMakas from "@/public/images/stok/sac-makas.jpg";
import sacKesim from "@/public/images/stok/sac-kesim.jpg";
import sacToka from "@/public/images/stok/sac-toka.jpg";
import sacKesimBeyaz from "@/public/images/stok/sac-kesim-beyaz.jpg";
import renk from "@/public/images/stok/renk.jpg";
import aletler from "@/public/images/stok/aletler.jpg";
import tirnakBordo from "@/public/images/stok/tirnak-bordo.jpg";
import tirnakKirmizi from "@/public/images/stok/tirnak-kirmizi.jpg";
import tirnakBakim from "@/public/images/stok/tirnak-bakim.jpg";
import tirnakKoyu from "@/public/images/stok/tirnak-koyu.jpg";
import mekanYikama from "@/public/images/stok/mekan-yikama.jpg";
import mekanKoltuk from "@/public/images/stok/mekan-koltuk.jpg";
import mekanAydinlik from "@/public/images/stok/mekan-aydinlik.jpg";
import mekanAyna from "@/public/images/stok/mekan-ayna.jpg";

const pexels = (photographer: string, path: string) => ({
  photographer,
  url: `https://www.pexels.com/photo/${path}/`,
});

export const photos = {
  hero: {
    src: hero,
    alt: "Uzun, dalgalı kızıl saçlı bir kadının bej tonlarda stüdyo portresi",
    focal: "50% 30%",
    credit: pexels("cottonbro studio", "a-woman-in-beige-shirt-10210765"),
  },
  portreDalgali: {
    src: portreDalgali,
    alt: "Hacimli, dalgalı kahverengi saçlı bir kadının loş ışıkta portresi",
    focal: "50% 35%",
    credit: pexels("Jonatan Galvis", "young-woman-with-wavy-hair-17779645"),
  },
  portreHareket: {
    src: portreHareket,
    alt: "Bej takım elbiseli bir kadın iki eliyle saçlarını havaya kaldırıyor",
    focal: "50% 25%",
    credit: pexels("Hannah Bickmore", "woman-in-a-beige-suit-lifting-her-brown-hair-9514662"),
  },
  portreDuz: {
    src: portreDuz,
    alt: "Uzun, düz koyu saçlı bir kadının gri fon önünde portresi",
    focal: "50% 30%",
    credit: pexels("Arash KH", "moody-contemporary-fashion-portrait-of-woman-38020514"),
  },
  portreBeyaz: {
    src: portreBeyaz,
    alt: "Beyaz gömlekli, uzun siyah saçlı bir kadın kollarını başının üstüne kaldırmış",
    focal: "50% 30%",
    credit: pexels("Andrea Musto", "elegant-portrait-of-woman-in-stylish-white-shirt-32213600"),
  },
  sacTarama: {
    src: sacTarama,
    alt: "Islak, uzun kahverengi saç geniş dişli tarakla taranıyor",
    focal: "50% 40%",
    credit: pexels("Oleskandra Biliak", "a-hairdresser-combing-clients-hair-23349912"),
  },
  sacFon: {
    src: sacFon,
    alt: "Saç fırça ve fön makinesiyle şekillendiriliyor",
    focal: "40% 50%",
    credit: pexels("Deni Priyo", "close-up-of-women-hairdressing-10028673"),
  },
  sacFonDetay: {
    src: sacFonDetay,
    alt: "Yuvarlak fırça ve fön makinesiyle koyu saça yakın plan şekil veriliyor",
    focal: "50% 45%",
    credit: pexels("cottonbro studio", "woman-in-black-and-gold-round-watch-3993467"),
  },
  sacMakas: {
    src: sacMakas,
    alt: "Kuaförün elleri tarak ve makasla saç uçlarını alıyor",
    focal: "50% 50%",
    credit: pexels("mths", "close-up-of-the-hands-of-a-hairdresser-at-work-6487888"),
  },
  sacKesim: {
    src: sacKesim,
    alt: "Islak, uzun koyu saç makasla kesiliyor",
    focal: "50% 40%",
    credit: pexels("cottonbro studio", "woman-getting-a-haircut-3993462"),
  },
  sacToka: {
    src: sacToka,
    alt: "Arkadan görünüm: kahverengi saç kırmızı kuaför tokalarıyla bölümlere ayrılmış",
    focal: "55% 50%",
    credit: pexels("jibarofoto", "clips-on-woman-hair-at-hairdresser-20092122"),
  },
  sacKesimBeyaz: {
    src: sacKesimBeyaz,
    alt: "Beyaz fon önünde tarak ve makasla koyu saç kesimi",
    focal: "50% 50%",
    credit: pexels("Engin Akyurt", "person-cutting-hair-3356170"),
  },
  renk: {
    src: renk,
    alt: "Ayna karşısında saça renk uygulaması yapılıyor",
    focal: "45% 50%",
    credit: pexels("cottonbro studio", "woman-getting-a-haircut-3993320"),
  },
  aletler: {
    src: aletler,
    alt: "Beyaz zemin üzerinde taraklar, tokalar ve fırçalar",
    focal: "50% 50%",
    credit: pexels("N. Voitkevich", "black-and-white-hair-brush-8468143"),
  },
  tirnakBordo: {
    src: tirnakBordo,
    alt: "Bordo ojeli tırnaklar, açık renk masa üzerinde",
    focal: "50% 55%",
    credit: pexels("Polina Tankilevitch", "person-with-black-and-white-manicure-3738369"),
  },
  tirnakKirmizi: {
    src: tirnakKirmizi,
    alt: "Kırmızı ojeli eller manikür masasında",
    focal: "50% 50%",
    credit: pexels("cottonbro studio", "person-with-red-nail-polish-3997384"),
  },
  tirnakBakim: {
    src: tirnakBakim,
    alt: "Manikür öncesi eller beyaz kâsede suda bekletiliyor",
    focal: "50% 50%",
    credit: pexels("Polina Tankilevitch", "photo-of-person-s-hand-soak-in-water-3738378"),
  },
  tirnakKoyu: {
    src: tirnakKoyu,
    alt: "Fransız manikürlü, yüzüklü bir el koyu lacivert fon önünde",
    focal: "50% 50%",
    credit: pexels("svliiim", "elegant-hand-with-french-manicure-and-jewelry-34997574"),
  },
  mekanYikama: {
    src: mekanYikama,
    alt: "Aydınlık bir güzellik salonunda saç yıkama koltukları ve raflar",
    focal: "50% 55%",
    credit: pexels("Max Vakhtbovych", "backwash-chair-in-contemporary-beauty-studio-7195812"),
  },
  mekanKoltuk: {
    src: mekanKoltuk,
    alt: "Modern bir salonda yan yana yıkama koltukları ve bitki",
    focal: "50% 55%",
    credit: pexels("Max Vakhtbovych", "backwash-chairs-in-modern-beauty-salon-7195805"),
  },
  mekanAydinlik: {
    src: mekanAydinlik,
    alt: "Sıcak ışıklı, koyu tonlu modern bir kuaför salonu iç mekânı",
    focal: "50% 50%",
    credit: pexels("Emirhan Sayar", "modern-hair-salon-interior-with-stylish-lighting-35844833"),
  },
  mekanAyna: {
    src: mekanAyna,
    alt: "Halka ışıklı yuvarlak ayna ve siyah kuaför koltuğu",
    focal: "50% 45%",
    credit: pexels("Max Vakhtbovych", "photo-of-a-black-chair-and-a-mirror-with-a-ring-light-7750144"),
  },
} satisfies Record<string, Photo>;
