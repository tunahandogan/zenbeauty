import { Phone as PhoneIcon } from "lucide-react";
import { business, getPhone } from "@/content/site";
import { whatsappUrl } from "@/lib/booking";

function WhatsAppIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M12.04 2a9.9 9.9 0 0 0-8.5 14.96L2 22l5.2-1.51A9.95 9.95 0 1 0 12.04 2Zm0 18.1a8.1 8.1 0 0 1-4.13-1.13l-.3-.18-3.08.9.92-3-.2-.31a8.1 8.1 0 1 1 6.79 3.72Zm4.44-6.06c-.24-.12-1.44-.71-1.66-.79-.22-.08-.39-.12-.55.12-.16.24-.63.79-.77.95-.14.16-.28.18-.52.06a6.6 6.6 0 0 1-1.95-1.2 7.3 7.3 0 0 1-1.35-1.68c-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.55-1.32-.75-1.8-.2-.47-.4-.41-.55-.42h-.47c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.69 2.58 4.1 3.62.57.25 1.02.4 1.37.51.58.18 1.1.16 1.51.1.46-.07 1.44-.59 1.64-1.16.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.46-.28Z" />
    </svg>
  );
}

/**
 * Mobilde altta sabit tam genişlik çubuk, md ve üstünde sağ altta kapsül düğme.
 * Layout'ta bir kez bağlanır.
 */
export function WhatsAppBar() {
  const wa = whatsappUrl();
  // Ara düğmesi salonun sabit hattını arar (WhatsApp cep hattındadır)
  const phone = getPhone("kuafor");
  if (!wa) return null;
  const label = `WhatsApp'tan randevu al: ${business.displayName}`;

  return (
    <>
      {/* Mobil */}
      <div className="fixed inset-x-0 bottom-0 z-40 flex border-t border-paper/15 bg-ink pb-[env(safe-area-inset-bottom)] text-paper md:hidden">
        <a
          href={wa}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="flex h-16 min-w-0 flex-1 items-center justify-center gap-2.5 px-4 text-[0.82rem] font-semibold tracking-[0.1em] uppercase"
        >
          <WhatsAppIcon />
          WhatsApp&apos;tan randevu al
        </a>
        {phone && (
          <a
            href={`tel:${phone.e164}`}
            aria-label={`Ara: ${phone.display}`}
            className="flex h-16 w-20 shrink-0 items-center justify-center gap-1.5 border-l border-paper/15 bg-accent text-xs font-semibold text-paper tracking-[0.1em] uppercase"
          >
            <PhoneIcon className="size-4" strokeWidth={1.75} aria-hidden />
            Ara
          </a>
        )}
      </div>

      {/* Masaüstü */}
      <a
        href={wa}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        className="fixed right-6 bottom-6 z-40 hidden min-h-14 items-center gap-2.5 rounded-full bg-ink px-6 text-[0.8rem] font-semibold tracking-[0.1em] text-paper uppercase shadow-lg shadow-ink/25 transition-colors hover:bg-accent md:inline-flex"
      >
        <WhatsAppIcon />
        WhatsApp&apos;tan yazın
      </a>
    </>
  );
}
