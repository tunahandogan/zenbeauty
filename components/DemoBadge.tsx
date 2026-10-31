import { demo } from "@/content/site";

export function DemoBadge() {
  return (
    <>
      <span
        title={demo.note}
        aria-describedby="demo-note"
        className="fixed left-2 bottom-[calc(76px+env(safe-area-inset-bottom))] md:bottom-3 md:left-3 z-40 rounded-sm border border-accent/30 bg-paper/90 px-1.5 py-0.5 text-[10px] leading-none font-medium tracking-[0.14em] text-accent-deep uppercase backdrop-blur-sm select-none"
      >
        {demo.label}
      </span>
      <span id="demo-note" className="sr-only">
        {demo.note}
      </span>
    </>
  );
}
