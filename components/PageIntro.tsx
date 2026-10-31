import type { ReactNode } from "react";

/** İç sayfaların editoryal başlık bloğu */
export function PageIntro({
  eyebrow,
  title,
  children,
  aside,
}: {
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <header className="container-x grid gap-8 border-b border-ink/10 pt-10 pb-12 md:grid-cols-12 md:pt-18 md:pb-16">
      <div className="md:col-span-8">
        <p className="eyebrow animate-rise inline-flex items-center gap-3 text-accent">
          <span className="h-px w-7 bg-accent/60" aria-hidden />
          {eyebrow}
        </p>
        <h1 className="mt-5 animate-rise text-h1 [animation-delay:80ms] [&_em]:text-accent">{title}</h1>
      </div>
      {(children || aside) && (
        <div className="animate-rise self-end border-l border-accent/35 pl-5 text-lead text-stone-600 [animation-delay:160ms] md:col-span-4">
          {children}
          {aside}
        </div>
      )}
    </header>
  );
}

/** Bölüm başlığı: küçük üst etiket + serif başlık */
export function SectionHeading({ eyebrow, title, className = "" }: { eyebrow: string; title: ReactNode; className?: string }) {
  return (
    <div className={className}>
      <p className="eyebrow inline-flex items-center gap-3 text-accent">
        <span className="h-px w-6 bg-accent/60" aria-hidden />
        {eyebrow}
      </p>
      <h2 className="mt-4 text-h2 [&_em]:text-accent">{title}</h2>
    </div>
  );
}

