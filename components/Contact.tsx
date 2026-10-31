import { AtSign, MapPin, Phone as PhoneIcon } from "lucide-react";
import { business, phoneSourceNote } from "@/content/site";
import type { Desk } from "@/content/types";

/** Salonun iki hattı: salon (sabit) ve Sinan Bey (cep). `desk` yalnızca eski çağrılarla uyum için kabul edilir, süzme yapmaz. */
export function PhoneList({ tone = "ink" }: { desk?: Desk; tone?: "ink" | "paper" }) {
  const phones = business.phones;
  const muted = tone === "paper" ? "text-on-ink-muted" : "text-stone-600";
  return (
    <div>
      <ul className="grid gap-3">
        {phones.map((p) => (
          <li key={p.e164}>
            <span className={`block text-xs font-semibold tracking-[0.14em] uppercase ${muted}`}>{p.label}</span>
            <a href={`tel:${p.e164}`} className="inline-flex min-h-11 items-center gap-2 text-lg font-medium underline-offset-4 hover:underline">
              <PhoneIcon className="size-4" strokeWidth={1.5} aria-hidden />
              {p.display}
            </a>
          </li>
        ))}
      </ul>
      <p className={`mt-2 text-xs ${muted}`}>{phoneSourceNote}</p>
    </div>
  );
}

export function InstagramLink({ className = "" }: { className?: string }) {
  return (
    <a
      href={business.instagram.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex min-h-11 items-center gap-2 underline-offset-4 hover:underline ${className}`}
    >
      <AtSign className="size-4" strokeWidth={1.5} aria-hidden />
      Instagram: {business.instagram.handle.replace("@", "")}
    </a>
  );
}

export function MallAddress({ tone = "ink" }: { tone?: "ink" | "paper" }) {
  const muted = tone === "paper" ? "text-on-ink-muted" : "text-stone-600";
  return (
    <div>
      <address className="not-italic">
        <span className="flex items-start gap-2 text-lg">
          <MapPin className="mt-1 size-4 shrink-0" strokeWidth={1.5} aria-hidden />
          <span>
            {business.mall.name}
            <span className={`block text-base ${muted}`}>{business.mall.address}</span>
            <span className={`block text-base ${muted}`}>{business.mall.landmark}</span>
          </span>
        </span>
      </address>
      <p className={`mt-2 text-xs ${muted}`}>
        Adres, Google Haritalar&apos;daki {business.legalName} kaydından alınmıştır.
      </p>
    </div>
  );
}
