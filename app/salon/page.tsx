import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { ButtonLink } from "@/components/ButtonLink";
import { InstagramLink, MallAddress, PhoneList } from "@/components/Contact";
import { MarqueeStrip } from "@/components/MarqueeStrip";
import { PageIntro } from "@/components/PageIntro";
import { Photo } from "@/components/Photo";
import { Reveal } from "@/components/Reveal";
import { photos } from "@/content/photos";
import { approach, business, hygiene, tesettur } from "@/content/site";
import { SourceTag } from "@/components/SourceTag";

export const metadata: Metadata = {
  title: "Salon",
  description: `${business.displayName}: ${business.district}, ${business.mall.name}, ${business.mall.landmark}. Ekip, tesettür bölümü, temizlik ve yaklaşım.`,
};

export default function SalonPage() {
  return (
    <>
      <PageIntro
        eyebrow="Salon"
        title={
          <>
            {business.district}&apos;da, <em>{business.mall.name}.</em>
          </>
        }
      >
        <p>
          {business.displayName}: {business.mall.floor}; {business.mall.landmark}. Saç, gelin hazırlığı, makyaj ve tırnak aynı salonda.
        </p>
      </PageIntro>

      {/* Mekân ilhamı — gerçek salon fotoğrafı değildir */}
      <section className="container-x pt-12 pb-20 md:pt-16 md:pb-28" aria-labelledby="atmosfer-baslik">
        <h2 id="atmosfer-baslik" className="sr-only">
          Atmosfer ilhamı
        </h2>
        <div className="grid grid-cols-12 gap-5 md:gap-8">
          <Reveal className="col-span-12 md:col-span-8" variant="scale">
            <div className="mb-2 flex items-center justify-between text-[0.68rem] tracking-[0.2em] text-stone-500">
              <span className="font-serif text-sm text-accent italic">I</span>
              <span className="uppercase">Temsilî görsel</span>
            </div>
            <Photo
              photo={photos.mekanYikama}
              frame="aspect-[3/2]"
              sizes="(min-width: 768px) 64vw, 100vw"
              imgClassName="animate-unveil"
              preload
            />
          </Reveal>
          <Reveal className="col-span-6 md:col-span-4 md:pt-20" delay={0.08} variant="right">
            <div className="mb-2 flex items-center justify-between text-[0.68rem] tracking-[0.2em] text-stone-500">
              <span className="font-serif text-sm text-accent italic">II</span>
              <span className="uppercase">Temsilî görsel</span>
            </div>
            <Photo photo={photos.mekanAyna} frame="aspect-[3/4]" sizes="(min-width: 768px) 30vw, 50vw" />
          </Reveal>
          <Reveal className="col-span-6 md:col-span-5 md:col-start-3 md:-mt-16" delay={0.14} variant="up">
            <div className="mb-2 flex items-center justify-between text-[0.68rem] tracking-[0.2em] text-stone-500">
              <span className="font-serif text-sm text-accent italic">III</span>
              <span className="uppercase">Temsilî görsel</span>
            </div>
            <Photo photo={photos.mekanKoltuk} frame="aspect-[4/3]" sizes="(min-width: 768px) 38vw, 50vw" />
          </Reveal>
          <Reveal className="col-span-12 md:col-span-4 md:col-start-9 md:self-center" delay={0.18} variant="right">
            <p className="border-l-2 border-accent/40 pl-4 text-sm leading-relaxed text-stone-600">
              Salon fotoğrafları henüz eklenmedi. Bu kareler temsilî görsellerdir; salonun kendisi değildir.
            </p>
          </Reveal>
        </div>
      </section>

      <MarqueeStrip tone="paper" />

      {/* İki bölüm */}
      <section className="border-b border-ink/10 bg-paper-deep" aria-labelledby="bolumler-baslik">
        <div className="container-x grid gap-12 py-20 md:grid-cols-12 md:py-28">
          <Reveal className="md:col-span-4" variant="left">
            <p className="eyebrow inline-flex items-center gap-3 text-accent">
              <span className="h-px w-6 bg-accent/60" aria-hidden />
              Hizmetler
            </p>
            <h2 id="bolumler-baslik" className="mt-4 text-h2">
              Saç ve <em className="text-accent">gelin.</em>
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-stone-600">
              Aynı salonda iki ana başlık. Hangisi için geldiğinizi WhatsApp&apos;ta yazmanız yeterli.
            </p>
          </Reveal>
          <div className="grid gap-8 md:col-span-7 md:col-start-6 md:grid-cols-2">
            <Reveal variant="up">
              <div className="group relative border border-ink/15 bg-paper p-6 transition-colors duration-500 hover:border-accent/50">
                <span
                  aria-hidden
                  className="pointer-events-none absolute top-0 right-0 left-0 h-[2px] origin-left scale-x-0 bg-accent transition-transform duration-500 group-hover:scale-x-100"
                />
                <div className="mb-3 flex items-baseline justify-between">
                  <span className="eyebrow text-[0.65rem] text-accent">Saç</span>
                  <span className="font-serif text-sm text-stone-500 italic">01</span>
                </div>
                <Photo photo={photos.sacKesimBeyaz} frame="aspect-[4/3]" sizes="(min-width: 768px) 28vw, 100vw" />
                <h3 className="mt-6 text-h3">Saç</h3>
                <p className="mt-3 text-sm leading-relaxed text-stone-600">
                  Kesim, boya, açma, ombre, sombre, platin, keratin ve kaynak. Renk işlerinde önce saçınızın geçmişi konuşulur.
                </p>
                <Link
                  href="/hizmetler#sac"
                  className="group/link mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-semibold hover:text-accent"
                >
                  <span className="link-underline">Saç hizmetleri</span>
                  <ArrowRight className="size-3.5 text-accent transition-transform duration-300 group-hover/link:translate-x-1" strokeWidth={1.5} aria-hidden />
                </Link>
              </div>
            </Reveal>
            <Reveal delay={0.1} variant="up">
              <div className="group relative border border-ink/15 bg-paper p-6 transition-colors duration-500 hover:border-accent/50">
                <span
                  aria-hidden
                  className="pointer-events-none absolute top-0 right-0 left-0 h-[2px] origin-left scale-x-0 bg-accent transition-transform duration-500 group-hover:scale-x-100"
                />
                <div className="mb-3 flex items-baseline justify-between">
                  <span className="eyebrow text-[0.65rem] text-accent">Gelin, makyaj ve tırnak</span>
                  <span className="font-serif text-sm text-stone-500 italic">02</span>
                </div>
                <Photo photo={photos.tirnakBakim} frame="aspect-[4/3]" sizes="(min-width: 768px) 28vw, 100vw" />
                <h3 className="mt-6 text-h3">Gelin ve özel gün</h3>
                <p className="mt-3 text-sm leading-relaxed text-stone-600">
                  Gelin, nişan ve kına saçı; makyaj, jel tırnak, manikür ve pedikür.
                </p>
                <Link
                  href="/hizmetler#guzellik"
                  className="group/link mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-semibold hover:text-accent"
                >
                  <span className="link-underline">Gelin ve tırnak hizmetleri</span>
                  <ArrowRight className="size-3.5 text-accent transition-transform duration-300 group-hover/link:translate-x-1" strokeWidth={1.5} aria-hidden />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Yaklaşım — konsept metin */}
      <section className="on-ink bg-ink text-paper" aria-labelledby="yaklasim-baslik">
        <div className="container-x grid gap-12 py-20 md:grid-cols-12 md:py-28">
          <Reveal className="md:col-span-7" variant="left">
            <p className="eyebrow inline-flex items-center gap-3 text-accent-tint">
              <span className="h-px w-6 bg-accent-tint/60" aria-hidden />
              Yaklaşım
            </p>
            <h2 id="yaklasim-baslik" className="mt-4 text-h1">
              {approach.title}
            </h2>
            <p className="measure mt-8 border-l border-accent-tint/40 pl-5 text-lead text-on-ink-muted">{approach.lead}</p>
            <ol className="mt-12 grid gap-6 sm:grid-cols-3">
              {approach.points.map((p, i) => (
                <li key={p.title} className="border-t border-paper/15 pt-4">
                  <span className="font-serif text-xl text-accent-tint italic">0{i + 1}</span>
                  <span className="mt-2 block font-serif text-lg">{p.title}</span>
                  <span className="mt-1.5 block text-xs leading-relaxed text-on-ink-muted">{p.text}</span>
                </li>
              ))}
            </ol>
          </Reveal>
          <Reveal className="md:col-span-4 md:col-start-9 md:self-center" delay={0.08} variant="scale">
            <Photo photo={photos.aletler} frame="aspect-[3/4]" sizes="(min-width: 768px) 30vw, 100vw" tone="paper" />
          </Reveal>
        </div>
      </section>

      {/* Ekip: adlar salondan alınacak, uydurulmaz */}
      <section className="container-x py-20 md:py-28" aria-labelledby="ekip-baslik">
        <Reveal variant="left">
          <p className="eyebrow inline-flex items-center gap-3 text-accent">
            <span className="h-px w-6 bg-accent/60" aria-hidden />
            Ekip
          </p>
          <h2 id="ekip-baslik" className="mt-4 text-h2">
            Sizinle <em className="text-accent">ilgilenecek kişiler.</em>
          </h2>
          <p className="measure mt-4 text-sm leading-relaxed text-stone-600">
            Sinan Sezer salonun Instagram profilinde adıyla geçiyor. Diğer uzmanların adı ve unvanı salonun onayıyla eklenecek; fotoğraf yerine şimdilik harf kutusu var.
          </p>
        </Reveal>
        <ul className="mt-10 grid gap-6 sm:grid-cols-3">
          {business.team.map((m, i) => (
            <li key={m.role} className="border border-ink/12 bg-paper-deep/50 p-5">
              <div
                aria-hidden
                className="flex aspect-[4/3] items-center justify-center border border-dashed border-ink/35 font-serif text-4xl text-stone-500 italic"
              >
                {String.fromCharCode(65 + i)}
              </div>
              <p className="mt-4 font-serif text-lg">{m.name}</p>
              <p className="mt-1 text-sm text-stone-600">{m.role}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Tesettür bölümü: Instagram biyografisinde var; ayrıntılar salondan teyit edilecek */}
      <section className="on-ink bg-ink text-paper" aria-labelledby="tesettur-baslik">
        <div className="container-x grid gap-12 py-20 md:grid-cols-12 md:py-28">
          <Reveal className="md:col-span-5" variant="left">
            <p className="eyebrow inline-flex items-center gap-3 text-accent-tint">
              <span className="h-px w-6 bg-accent-tint/60" aria-hidden />
              Başörtülü misafirler için
            </p>
            <h2 id="tesettur-baslik" className="mt-4 text-h2">
              {tesettur.title}
            </h2>
            <p className="measure mt-6 border-l border-accent-tint/40 pl-5 text-lead text-on-ink-muted">{tesettur.lead}</p>
            <div className="mt-6">
              <SourceTag source={tesettur.source} />
            </div>
          </Reveal>
          <Reveal className="md:col-span-6 md:col-start-7" delay={0.08} variant="right">
            <ul className="grid gap-4">
              {tesettur.points.map((point) => (
                <li key={point} className="flex gap-3 border border-paper/15 p-4 text-sm leading-relaxed text-on-ink-muted">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent-tint/70" aria-hidden />
                  {point}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Temizlik */}
      <section className="border-y border-ink/10 bg-paper-deep" aria-labelledby="hijyen-baslik">
        <div className="container-x grid gap-12 py-20 md:grid-cols-12 md:py-28">
          <Reveal className="md:col-span-4" variant="left">
            <p className="eyebrow inline-flex items-center gap-3 text-accent">
              <span className="h-px w-6 bg-accent/60" aria-hidden />
              Temizlik
            </p>
            <h2 id="hijyen-baslik" className="mt-4 text-h2">
              {hygiene.title}
            </h2>
            <div className="mt-4">
              <SourceTag source={hygiene.source} />
            </div>
          </Reveal>
          <ul className="grid gap-5 md:col-span-7 md:col-start-6">
            {hygiene.points.map((p) => (
              <li key={p.title} className="border border-ink/12 bg-paper p-5">
                <h3 className="font-serif text-lg">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-600">{p.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="container-x grid gap-12 py-20 md:grid-cols-12 md:py-28" aria-labelledby="ziyaret-baslik">
        <Reveal className="md:col-span-6" variant="left">
          <p className="eyebrow inline-flex items-center gap-3 text-accent">
            <span className="h-px w-6 bg-accent/60" aria-hidden />
            Ziyaret
          </p>
          <h2 id="ziyaret-baslik" className="mt-4 text-h2">
            Gelmeden önce <em className="text-accent">haber verin.</em>
          </h2>
          <p className="measure mt-6 leading-relaxed text-stone-600">
            Çalışma saatleri ve uygun günler için WhatsApp&apos;tan yazın ya da arayın. Kapıyı bulmak için: {business.mall.landmark}. Salonun hikâyesi, işletmenin kendi
            anlatımıyla bu bölüme eklenecek.
          </p>
          <ButtonLink href="/randevu" className="mt-8">
            Randevu al <ArrowRight className="size-4" strokeWidth={1.5} aria-hidden />
          </ButtonLink>
        </Reveal>
        <Reveal className="md:col-span-5 md:col-start-8" delay={0.08} variant="right">
          <div className="grid gap-8 border border-ink/15 bg-paper-deep/65 p-7 sm:p-9">
            <MallAddress />
            <p className="text-sm text-stone-600">
              {business.mall.floor} · {business.mall.landmark}
            </p>
            <div className="border-t border-ink/10 pt-6">
              <PhoneList />
            </div>
            <InstagramLink className="font-semibold hover:text-accent" />
          </div>
        </Reveal>
      </section>
    </>
  );
}

