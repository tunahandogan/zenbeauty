import { ButtonLink } from "@/components/ButtonLink";

export const metadata = { title: "Sayfa bulunamadı" };

export default function NotFound() {
  return (
    <section className="container-x py-24 md:py-36">
      <p className="eyebrow text-accent">404</p>
      <h1 className="mt-5 text-h1">
        Bu sayfa <em>bulunamadı.</em>
      </h1>
      <p className="measure mt-6 text-lead text-stone-600">Aradığınız sayfa taşınmış ya da adresi yanlış yazılmış olabilir. Ana sayfadan ya da hizmetlerden devam edebilirsiniz.</p>
      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <ButtonLink href="/">Ana sayfa</ButtonLink>
        <ButtonLink href="/hizmetler" variant="outline">
          Hizmetler
        </ButtonLink>
      </div>
    </section>
  );
}
