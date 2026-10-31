import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";
import { Reveal } from "@/components/Reveal";
import { tesettur } from "@/content/site";

/** Tesettür bölümü: koyu bant, sade ve saygılı dil. [DOLDURULACAK] satırları bilerek görünür bırakılır. */
export function TesetturBlock({ className = "" }: { className?: string }) {
  return (
    <section className={`on-ink band-ink ${className}`} aria-labelledby="tesettur-baslik">
      <div className="container-x grid gap-10 py-16 md:grid-cols-12 md:py-24">
        <Reveal className="md:col-span-5" variant="left">
          <p className="eyebrow inline-flex items-center gap-3 text-accent-tint">
            <span className="h-px w-6 bg-accent-tint/60" aria-hidden />
            Başörtülü misafirlerimiz için
          </p>
          <h2 id="tesettur-baslik" className="mt-4 text-h2">
            {tesettur.title}
          </h2>
          <p className="measure mt-6 text-lead text-on-ink-muted">{tesettur.lead}</p>
          <ButtonLink href="/randevu" variant="paper" className="mt-8">
            Randevu mesajı hazırla <ArrowRight className="size-4" strokeWidth={1.5} aria-hidden />
          </ButtonLink>
        </Reveal>
        <Reveal className="md:col-span-6 md:col-start-7 md:self-center" delay={0.1} variant="right">
          <ul className="grid gap-4">
            {tesettur.points.map((p) => (
              <li key={p} className="border-t border-paper/15 pt-4 leading-relaxed text-on-ink-muted">
                {p}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
