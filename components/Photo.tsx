import Image from "next/image";
import type { Photo as PhotoType } from "@/content/types";
import { inspirationLabel } from "@/content/site";

type Props = {
  photo: PhotoType;
  sizes: string;
  className?: string;
  /** Görsel kutusunun oranı (ör. "aspect-[4/5]"); verilmezse kapsayıcıyı doldurur */
  frame?: string;
  preload?: boolean;
  caption?: boolean;
  imgClassName?: string;
  tone?: "ink" | "paper";
};

/**
 * Stok fotoğraf + künye. Künye her zaman "Temsilî görsel" (inspirationLabel) olarak etiketlenir;
 * bu kareler salonun işi değildir.
 */
export function Photo({ photo, sizes, className = "", frame, preload, caption = true, imgClassName = "", tone = "ink" }: Props) {
  const frameBorder = tone === "paper" ? "after:border-paper/15" : "after:border-ink/10";
  return (
    <figure className={`group/photo ${className}`}>
      <div
        className={`editorial-frame relative overflow-hidden bg-stone-200 after:pointer-events-none after:absolute after:inset-0 after:border ${frameBorder} ${
          frame ?? "h-full"
        }`}
      >
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes={sizes}
          preload={preload}
          placeholder="blur"
          className={`object-cover transition-transform duration-[1.35s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/photo:scale-[1.045] ${imgClassName}`}
          style={{ objectPosition: photo.focal }}
        />
      </div>
      {caption && (
        <figcaption
          className={`mt-2.5 flex items-center gap-2 text-[0.7rem] tracking-wide ${
            tone === "paper" ? "text-on-ink-muted" : "text-stone-500"
          }`}
        >
          <span className={`h-px w-4 shrink-0 ${tone === "paper" ? "bg-paper/25" : "bg-ink/25"}`} aria-hidden />
          <span>
            {inspirationLabel} · Foto: {photo.credit.photographer} / Pexels
          </span>
        </figcaption>
      )}
    </figure>
  );
}

