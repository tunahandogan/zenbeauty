"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight, AtSign, Check, Copy, Phone as PhoneIcon, RotateCcw } from "lucide-react";
import { useEffect, useReducer, useRef, useState, useSyncExternalStore, type Dispatch } from "react";
import { bookingNote, bolumler, business, getService, phoneSourceNote, serviceCategories, services } from "@/content/site";
import { useAzHareket, useBolum } from "@/lib/bolum";
import {
  buildRequestText,
  dayOptions,
  initialBooking,
  NOTE_MAX,
  timeOptions,
  whatsappUrl,
  type BookingState,
  type DayId,
  type TimeId,
} from "@/lib/booking";

const STORAGE_KEY = "salon-randevu-talebi";
const steps = ["Hizmet", "Zaman tercihi", "Talep özeti"] as const;

type Action =
  | { type: "service"; slug: string }
  | { type: "toggleItem"; name: string }
  | { type: "day"; id: DayId }
  | { type: "time"; id: TimeId }
  | { type: "note"; value: string }
  | { type: "tesettur"; value: boolean }
  | { type: "go"; step: BookingState["step"] }
  | { type: "reset" };

function reducer(state: BookingState, action: Action): BookingState {
  switch (action.type) {
    case "service":
      return state.service === action.slug ? state : { ...state, service: action.slug, items: [] };
    case "toggleItem":
      return {
        ...state,
        items: state.items.includes(action.name) ? state.items.filter((i) => i !== action.name) : [...state.items, action.name],
      };
    case "day":
      return { ...state, day: action.id };
    case "time":
      return { ...state, time: action.id };
    case "note":
      return { ...state, note: action.value.slice(0, NOTE_MAX) };
    case "tesettur":
      return { ...state, tesettur: action.value };
    case "go":
      return { ...state, step: action.step };
    case "reset":
      return initialBooking;
  }
}

/** Seçimler oturum boyunca saklanır: hizmet sayfasına gidip dönünce kaybolmaz. Depolama yoksa sessizce atlanır. */
function loadInitial(): BookingState {
  let saved: BookingState = initialBooking;
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (raw) saved = { ...initialBooking, ...(JSON.parse(raw) as Partial<BookingState>) };
  } catch {}
  if (saved.service && !getService(saved.service)) saved = initialBooking;
  const fromUrl = new URLSearchParams(window.location.search).get("hizmet");
  if (fromUrl && getService(fromUrl) && fromUrl !== saved.service) {
    return { ...saved, service: fromUrl, items: [], step: 0 };
  }
  return saved;
}

const subscribe = () => () => {};

export function BookingFlow() {
  // Akış yalnızca tarayıcıda kurulur (oturum deposu ve URL okunur); sunucu HTML'inde iskelet görünür
  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
  if (!mounted) return <FlowSkeleton />;
  return <Flow />;
}

function FlowSkeleton() {
  return (
    <div className="min-h-[28rem] border-t border-ink/15 pt-8" aria-hidden>
      <div className="h-4 w-40 bg-stone-200" />
      <div className="mt-8 grid gap-3">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="h-16 bg-paper-deep" />
        ))}
      </div>
    </div>
  );
}

function Flow() {
  const [state, dispatch] = useReducer(reducer, undefined, loadInitial);
  const reduce = useAzHareket();
  const headingRef = useRef<HTMLHeadingElement>(null);
  const shownStep = useRef(state.step);

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {}
  }, [state]);

  // Adım değişince odağı yeni adımın başlığına taşı (ilk açılışta değil)
  useEffect(() => {
    if (shownStep.current === state.step) return;
    shownStep.current = state.step;
    headingRef.current?.focus({ preventScroll: true });
    headingRef.current?.scrollIntoView({ block: "start", behavior: reduce ? "auto" : "smooth" });
  }, [state.step, reduce]);

  const service = state.service ? getService(state.service) : undefined;
  const canContinue = state.step === 0 ? Boolean(service) : state.step === 1 ? Boolean(state.day && state.time) : true;

  return (
    <div>
      <ol className="grid grid-cols-3 border-t border-ink/15" aria-label="Adımlar">
        {steps.map((label, i) => {
          const current = state.step === i;
          const done = state.step > i;
          return (
            <li
              key={label}
              aria-current={current ? "step" : undefined}
              className={`relative pt-4 pr-2 text-[0.7rem] font-semibold tracking-[0.12em] uppercase transition-colors sm:text-xs ${
                current ? "text-accent" : done ? "text-ink" : "text-stone-500"
              }`}
            >
              {current && (
                <motion.span
                  layoutId="randevu-adim-cizgi"
                  aria-hidden
                  className="pointer-events-none absolute top-0 right-0 left-0 -mt-px h-[2px] bg-accent"
                  transition={reduce ? { duration: 0 } : { type: "spring", bounce: 0.15, duration: 0.5 }}
                />
              )}
              {done && (
                <span aria-hidden className="pointer-events-none absolute top-0 right-0 left-0 -mt-px h-[2px] bg-ink" />
              )}
              <span className="mr-1.5 font-serif text-base tracking-normal normal-case italic">0{i + 1}</span>
              {label}
              {done && <span className="sr-only"> (tamamlandı)</span>}
            </li>
          );
        })}
      </ol>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={state.step}
          initial={reduce ? { opacity: 0 } : { opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, x: -24 }}
          transition={{ duration: reduce ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="pt-10"
        >
          <h2 ref={headingRef} tabIndex={-1} className="scroll-mt-28 text-h3 outline-none">
            {state.step === 0 && "Hangi hizmet için?"}
            {state.step === 1 && "Size uyan zaman aralığı"}
            {state.step === 2 && "Talep özetiniz"}
          </h2>

          {state.step === 0 && <ServiceStep state={state} dispatch={dispatch} />}
          {state.step === 1 && <TimeStep state={state} dispatch={dispatch} />}
          {state.step === 2 && <SummaryStep state={state} dispatch={dispatch} />}
        </motion.div>
      </AnimatePresence>

      {state.step < 2 && (
        <div className="mt-10 flex flex-col-reverse gap-3 border-t border-ink/15 pt-6 sm:flex-row sm:items-center sm:justify-between">
          {state.step > 0 ? (
            <button
              type="button"
              onClick={() => dispatch({ type: "go", step: (state.step - 1) as BookingState["step"] })}
              className="group inline-flex min-h-12 items-center justify-center gap-2 px-2 text-sm font-semibold hover:text-accent sm:justify-start"
            >
              <ArrowLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-1" strokeWidth={1.5} aria-hidden /> Geri
            </button>
          ) : (
            <span />
          )}
          <div className="flex flex-col items-stretch gap-2 sm:items-end">
            <button
              type="button"
              disabled={!canContinue}
              aria-describedby={!canContinue ? "devam-ipucu" : undefined}
              onClick={() => dispatch({ type: "go", step: (state.step + 1) as BookingState["step"] })}
              className="btn-slide group inline-flex min-h-12 items-center justify-center gap-3 bg-ink px-7 text-[0.8rem] font-semibold tracking-[0.14em] text-paper uppercase transition-colors [--slide-bg:var(--color-accent)] disabled:cursor-not-allowed disabled:bg-stone-300 disabled:text-stone-600"
            >
              {state.step === 0 ? "Zaman tercihine geç" : "Özeti gör"}
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.5} aria-hidden />
            </button>
            {!canContinue && (
              <p id="devam-ipucu" className="text-xs text-stone-600">
                {state.step === 0 ? "Devam etmek için bir hizmet seçin." : "Devam etmek için gün ve zaman tercihi seçin."}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

type StepProps = { state: BookingState; dispatch: Dispatch<Action> };

const optionClass =
  "group flex cursor-pointer items-center gap-4 border border-ink/15 bg-paper px-4 py-3.5 transition-all duration-300 hover:border-accent/60 has-checked:border-ink has-checked:bg-ink has-checked:text-paper has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-accent";


function ServiceStep({ state, dispatch }: StepProps) {
  const service = state.service ? getService(state.service) : undefined;
  const bolum = useBolum();
  // Girişte seçilen bölümün hizmetleri önce
  const cats = bolum ? [...serviceCategories].sort((a, b) => Number(b.id === bolumler[bolum].category) - Number(a.id === bolumler[bolum].category)) : serviceCategories;
  return (
    <div className="mt-6 grid gap-10">
      {cats.map((cat) => (
        <fieldset key={cat.id}>
          <legend className="eyebrow mb-3 text-stone-500">{cat.label}</legend>
          <div className="grid gap-2 sm:grid-cols-2">
            {services
              .filter((s) => s.category === cat.id)
              .map((s) => (
                <label key={s.slug} className={`${optionClass} min-h-16`}>
                  <input
                    type="radio"
                    name="hizmet"
                    value={s.slug}
                    checked={state.service === s.slug}
                    onChange={() => dispatch({ type: "service", slug: s.slug })}
                    className="sr-only"
                  />
                  <span className="text-xs font-semibold tracking-[0.18em] opacity-60">{s.number}</span>
                  <span className="font-serif text-xl">{s.title}</span>
                  {state.service === s.slug && <Check className="ml-auto size-5 shrink-0" strokeWidth={1.5} aria-hidden />}
                </label>
              ))}
          </div>
        </fieldset>
      ))}

      {service && service.items.length > 1 && (
        <fieldset>
          <legend className="eyebrow mb-1 text-stone-500">İlgilendiğiniz işlemler</legend>
          <p className="mb-3 text-sm text-stone-600">İsteğe bağlı; birden fazla seçebilirsiniz.</p>
          <div className="flex flex-wrap gap-2">
            {service.items.map((item) => (
              <label key={item.name} className={`${optionClass} min-h-11 py-2 text-sm font-medium`}>
                <input
                  type="checkbox"
                  checked={state.items.includes(item.name)}
                  onChange={() => dispatch({ type: "toggleItem", name: item.name })}
                  className="sr-only"
                />
                {item.name}
              </label>
            ))}
          </div>
        </fieldset>
      )}
    </div>
  );
}

function TimeStep({ state, dispatch }: StepProps) {
  return (
    <div className="mt-6 grid gap-10">
      <p className="max-w-xl border-l-2 border-accent pl-4 text-sm leading-relaxed text-stone-700">
        Bu bir müsaitlik takvimi değildir. Genel tercihinizi belirtin; salon size uygun zamanı teyit eder.
      </p>
      <fieldset>
        <legend className="eyebrow mb-3 text-stone-500">Gün</legend>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          {dayOptions.map((d) => (
            <label key={d.id} className={`${optionClass} min-h-12 justify-center font-medium`}>
              <input
                type="radio"
                name="gun"
                value={d.id}
                checked={state.day === d.id}
                onChange={() => dispatch({ type: "day", id: d.id })}
                className="sr-only"
              />
              {d.label}
            </label>
          ))}
        </div>
      </fieldset>
      <fieldset>
        <legend className="eyebrow mb-3 text-stone-500">Zaman aralığı</legend>
        <div className="grid gap-2 sm:grid-cols-2">
          {timeOptions.map((t) => (
            <label key={t.id} className={`${optionClass} min-h-16`}>
              <input
                type="radio"
                name="zaman"
                value={t.id}
                checked={state.time === t.id}
                onChange={() => dispatch({ type: "time", id: t.id })}
                className="sr-only"
              />
              <span>
                <span className="block font-medium">{t.label}</span>
                <span className="block text-xs opacity-70">{t.hint}</span>
              </span>
            </label>
          ))}
        </div>
      </fieldset>
      <div>
        <label className={`${optionClass} min-h-12 text-sm font-medium`}>
          <input
            type="checkbox"
            checked={state.tesettur}
            onChange={(e) => dispatch({ type: "tesettur", value: e.target.checked })}
            className="sr-only"
          />
          <span>
            Tesettür bölümünü tercih ediyorum
            <span className="block text-xs font-normal opacity-70">İsteğe bağlı; mesaja eklenir.</span>
          </span>
          {state.tesettur && <Check className="ml-auto size-5 shrink-0" strokeWidth={1.5} aria-hidden />}
        </label>
      </div>
      <div>
        <label htmlFor="not" className="eyebrow mb-1 block text-stone-500">
          Not <span className="tracking-normal normal-case">(isteğe bağlı)</span>
        </label>
        <p id="not-ipucu" className="mb-3 text-sm text-stone-600">
          Ad, telefon gibi kişisel bilgi yazmanız gerekmez.
        </p>
        <textarea
          id="not"
          rows={3}
          maxLength={NOTE_MAX}
          value={state.note}
          aria-describedby="not-ipucu not-sayac"
          onChange={(e) => dispatch({ type: "note", value: e.target.value })}
          placeholder="Örneğin: Uzunluğu korumak istiyorum."
          className="w-full resize-y border border-ink/25 bg-paper p-3 text-base placeholder:text-stone-500 focus:border-ink focus:outline-none focus-visible:outline-2 focus-visible:outline-accent"
        />
        <p id="not-sayac" className="mt-1 text-right text-xs text-stone-500">
          {state.note.length} / {NOTE_MAX}
        </p>
      </div>
    </div>
  );
}

function SummaryStep({ state, dispatch }: StepProps) {
  const service = state.service ? getService(state.service) : undefined;
  const text = buildRequestText(state);
  const wa = whatsappUrl(text);
  const [copy, setCopy] = useState<"idle" | "ok" | "fail">("idle");
  const textRef = useRef<HTMLTextAreaElement>(null);

  async function copyText() {
    try {
      await navigator.clipboard.writeText(text);
      setCopy("ok");
    } catch {
      // Pano izni yoksa metni seçili bırak; kullanıcı elle kopyalayabilir
      textRef.current?.select();
      setCopy("fail");
    }
  }

  const rows: [string, string, BookingState["step"]][] = [
    ["Hizmet", service ? `${service.title}${state.items.length ? ` (${state.items.join(", ")})` : ""}` : "-", 0],
    ["Gün", dayOptions.find((d) => d.id === state.day)?.label ?? "-", 1],
    ["Zaman", timeOptions.find((t) => t.id === state.time)?.label ?? "-", 1],
    ...(state.tesettur ? ([["Bölüm", "Tesettür bölümü", 1]] as [string, string, BookingState["step"]][]) : []),
    ...(state.note.trim() ? ([["Not", state.note.trim(), 1]] as [string, string, BookingState["step"]][]) : []),
  ];

  return (
    <div className="mt-6 grid gap-10">
      <p className="bg-accent px-5 py-4 text-sm leading-relaxed font-medium text-paper">
        Talebiniz henüz salona iletilmedi. WhatsApp düğmesi bu metni hazır hâlde açar; göndermeden önce düzenleyebilirsiniz.{" "}
        {bookingNote}
      </p>

      <dl className="border-t border-ink/15">
        {rows.map(([label, value, step]) => (
          <div key={label} className="grid grid-cols-[5.5rem_1fr_auto] items-center gap-3 border-b border-ink/15 py-2">
            <dt className="eyebrow text-stone-500">{label}</dt>
            <dd className="font-medium break-words">{value}</dd>
            <dd>
              <button
                type="button"
                onClick={() => dispatch({ type: "go", step })}
                className="inline-flex min-h-11 items-center px-2 text-sm text-stone-600 underline underline-offset-4 hover:text-accent"
              >
                Düzenle<span className="sr-only">: {label}</span>
              </button>
            </dd>
          </div>
        ))}
      </dl>

      <div>
        <label htmlFor="talep-metni" className="eyebrow mb-3 block text-stone-500">
          Talep metni
        </label>
        <textarea
          id="talep-metni"
          ref={textRef}
          readOnly
          value={text}
          rows={text.split("\n").length + 3}
          className="field-sizing-content w-full resize-none border border-ink/25 bg-paper-deep p-4 font-sans text-sm leading-relaxed"
        />
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          {wa && (
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-3 bg-ink px-6 text-[0.8rem] font-semibold tracking-[0.12em] text-paper uppercase transition-colors hover:bg-accent"
            >
              WhatsApp&apos;tan gönder
              <ArrowRight className="size-4" strokeWidth={1.5} aria-hidden />
            </a>
          )}
          <button
            type="button"
            onClick={copyText}
            className="inline-flex min-h-12 items-center justify-center gap-3 border border-ink/70 px-6 text-[0.8rem] font-semibold tracking-[0.12em] uppercase transition-colors hover:bg-ink hover:text-paper"
          >
            {copy === "ok" ? <Check className="size-4" aria-hidden /> : <Copy className="size-4" strokeWidth={1.5} aria-hidden />}
            Talep metnini kopyala
          </button>
          <a
            href={business.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 items-center justify-center gap-3 border border-ink/30 px-6 text-[0.8rem] font-semibold tracking-[0.12em] uppercase transition-colors hover:bg-ink hover:text-paper"
          >
            <AtSign className="size-4" strokeWidth={1.5} aria-hidden />
            Instagram
          </a>
        </div>
        <p role="status" className="mt-3 min-h-5 text-sm text-stone-700">
          {copy === "ok" && "Metin panoya kopyalandı. İstediğiniz uygulamaya yapıştırabilirsiniz."}
          {copy === "fail" && "Otomatik kopyalanamadı; metin seçildi, elle kopyalayabilirsiniz."}
        </p>
      </div>

      <div className="border-t border-ink/15 pt-6">
        <p className="eyebrow text-stone-500">Telefonla aramak isterseniz</p>
        <ul className="mt-2 grid gap-2">
          {business.phones.map((p) => (
            <li key={p.e164}>
              <span className="block text-sm text-stone-600">{p.label}</span>
              <a href={`tel:${p.e164}`} className="inline-flex min-h-11 items-center gap-2 text-xl font-medium hover:text-accent">
                <PhoneIcon className="size-4" strokeWidth={1.5} aria-hidden />
                {p.display}
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-1 text-xs text-stone-600">{phoneSourceNote}</p>
      </div>

      <div className="flex flex-col-reverse gap-3 border-t border-ink/15 pt-6 sm:flex-row sm:justify-between">
        <button
          type="button"
          onClick={() => dispatch({ type: "go", step: 1 })}
          className="inline-flex min-h-12 items-center justify-center gap-2 px-2 text-sm font-semibold sm:justify-start"
        >
          <ArrowLeft className="size-4" strokeWidth={1.5} aria-hidden /> Geri
        </button>
        <button
          type="button"
          onClick={() => dispatch({ type: "reset" })}
          className="inline-flex min-h-12 items-center justify-center gap-2 px-2 text-sm text-stone-600 hover:text-accent"
        >
          <RotateCcw className="size-4" strokeWidth={1.5} aria-hidden /> Baştan başla
        </button>
      </div>
    </div>
  );
}
