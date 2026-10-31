import Link from "next/link";
import type { ComponentProps } from "react";

type Variant = "solid" | "outline" | "paper" | "outline-paper";

const variants: Record<Variant, string> = {
  solid: "btn-slide bg-ink text-paper [--slide-bg:var(--color-accent)]",
  outline: "btn-slide border border-ink/60 text-ink hover:border-ink hover:text-paper [--slide-bg:var(--color-ink)]",
  paper: "btn-slide bg-paper text-ink [--slide-bg:var(--color-accent-tint)]",
  "outline-paper": "btn-slide border border-paper/60 text-paper hover:border-paper hover:text-ink [--slide-bg:var(--color-paper)]",
};

export const buttonClass = (variant: Variant = "solid") =>
  `group inline-flex min-h-12 items-center justify-center gap-3 px-6 text-[0.78rem] font-medium tracking-[0.12em] uppercase transition-all duration-300 [&_svg]:transition-transform [&_svg]:duration-300 hover:[&_svg]:translate-x-1 ${variants[variant]}`;

/** İç bağlantılar için next/link; dış bağlantılar (http, tel:) için düz <a> */
export function ButtonLink({
  variant = "solid",
  className = "",
  href,
  ...props
}: Omit<ComponentProps<"a">, "href"> & { href: string; variant?: Variant }) {
  const cls = `${buttonClass(variant)} ${className}`;
  if (href.startsWith("/")) return <Link href={href} className={cls} {...props} />;
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      className={cls}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...props}
    />
  );
}

