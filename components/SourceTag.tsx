import type { Source } from "@/content/types";

/**
 * Demo sürecinde işletme sahibine hangi bilginin teyit beklediğini gösterir.
 * Yayına almadan önce bütün "dogrulanacak" kayıtlar netleşince bu etiket kaldırılabilir.
 */
export function SourceTag({ source }: { source: Source }) {
  if (source !== "dogrulanacak") return null;
  return (
    <span className="shrink-0 border border-stone-400 px-2 py-0.5 text-[0.65rem] font-semibold tracking-[0.12em] text-stone-600 uppercase">
      Teyit bekliyor
    </span>
  );
}
