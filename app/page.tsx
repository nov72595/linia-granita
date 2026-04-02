"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Camera,
  Check,
  ChevronLeft,
  ChevronRight,
  ImagePlus,
  Ruler,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { SiteFooter, SiteHeader } from "./components/site/SiteChrome";

type Direction = "monument" | "landscape" | "full" | "";
type MonumentType = "single" | "double" | "combo" | "complex" | "";
type SurfaceType = "none" | "trotuar" | "granit" | "keramogranit";

type FormState = {
  direction: Direction;
  monumentType: MonumentType;
  layoutSeries: string;
  layoutCode: string;
  surfaceType: SurfaceType;
  extras: string[];
  areaM2: string;
  curbLength: string;
  plotPhoto: string;
  stylePhoto: string;
  name: string;
  phone: string;
  comment: string;
};

const directions = [
  { key: "monument" as const, title: "Только памятник", subtitle: "Без благоустройства" },
  { key: "landscape" as const, title: "Только благоустройство", subtitle: "Плитка, бордюры, облицовка" },
  { key: "full" as const, title: "Комплекс под ключ", subtitle: "Памятник + благоустройство" },
];

const monumentTypes = [
  {
    key: "single" as const,
    title: "Одиночные",
    count: 60,
    descriptor: "Одинарная стела",
    series: ["Серия 1-20", "Серия 21-40", "Серия 41-60"],
    base: 1800,
    lead: 18,
  },
  {
    key: "double" as const,
    title: "Двойные",
    count: 30,
    descriptor: "",
    series: ["Серия 1-10", "Серия 11-20", "Серия 21-30"],
    base: 2650,
    lead: 24,
  },
  {
    key: "complex" as const,
    title: "Комплексы",
    count: 120,
    descriptor: "Фото реализованных работ в портфолио",
    series: ["Серия 1-40", "Серия 41-80", "Серия 81-120+"],
    base: 5100,
    lead: 35,
  },
  {
    key: "combo" as const,
    title: "Портфолио",
    count: 40,
    descriptor: "Портфолио выполненных объектов",
    series: ["Серия 1-15", "Серия 16-30", "Серия 31-40"],
    base: 3450,
    lead: 28,
  },
];

const defaultMonumentCounts = {
  single: 60,
  double: 30,
  combo: 40,
  complex: 120,
};

const surfaceOptions = [
  { key: "trotuar" as const, title: "Плитка тротуарная", pricePerM2: 130 },
  { key: "keramogranit" as const, title: "Керамогранит", pricePerM2: 260, priceNote: "без учета плитки" },
  { key: "granit" as const, title: "Плитка гранитная", pricePerM2: 300 },
];

const landscapeExtras = [
  { key: "curb", title: "Бордюры", pricePerUnit: 22, unitLabel: "за метр" },
  { key: "facing", title: "Облицовка цоколя", pricePerUnit: 380, unitLabel: "фиксировано" },
  { key: "fence", title: "Ограда", pricePerUnit: 820, unitLabel: "фиксировано" },
  { key: "bench", title: "Столик и скамья", pricePerUnit: 740, unitLabel: "комплект" },
];

const stepLabels = ["Направление", "Конфигурация", "Фото", "Контакты"];

const mainContact = {
  phoneRaw: "+375296687665",
  phoneLabel: "+375 29 668 76 65",
  telegram: "tg://resolve?phone=375296687665",
  viber: "viber://chat?number=%2B375296687665",
  address: "г. Могилев, ул Калиновского 27А (напротив хозтоваров)",
};

const trustPillars = [
  {
    title: "Гарантия и договор",
    description: "Гарантия 3 года и официальный договор: сроки и объем работ фиксируем до старта.",
    icon: ShieldCheck,
  },
  {
    title: "Прозрачная смета",
    description: "Рассрочка без переплат и смета без скрытых позиций: понятные материалы и работы.",
    icon: Ruler,
  },
  {
    title: "Реальные визуализации",
    description: "Срок изготовления памятника после одобрения ретуши портрета: 1 месяц.",
    icon: ImagePlus,
  },
  {
    title: "Фотоотчет по этапам",
    description: "Фотоотчет всех этапов работы и соблюдение сроков благоустройства по договору.",
    icon: Camera,
  },
] as const;

const workflowSteps = [
  {
    title: "Бриф и консультация",
    description: "Уточняем задачу, стиль, бюджет и сроки. Формируем техническое задание.",
  },
  {
    title: "Проект и смета",
    description: "Подготавливаем 3D-визуализацию, согласуем материалы и финальную стоимость.",
  },
  {
    title: "Производство",
    description: "Изготавливаем комплект в цеху с поэтапным контролем качества камня и геометрии.",
  },
  {
    title: "Монтаж и сдача",
    description: "Устанавливаем на участке, проверяем уровень, швы и сдаем объект по акту.",
  },
] as const;

const featuredCases = [
  {
    title: "Одиночный памятник",
    meta: "Изготовление: 1 месяц",
    result: "После утверждения ретуши и макета запускаем в производство и выдерживаем согласованный срок.",
  },
  {
    title: "Семейный комплекс",
    meta: "Гарантия: 3 года",
    result: "Комплекс с облицовкой и оградой, с поэтапным контролем и передачей объекта по договору.",
  },
  {
    title: "Благоустройство участка",
    meta: "Сроки: по договору",
    result: "Плитка, бордюр, облицовка и фотоотчет всех этапов — от подготовки до финальной сдачи.",
  },
] as const;

const faqItems = [
  {
    q: "Можно ли зафиксировать стоимость до начала работ?",
    a: "Да. После согласования проекта и сметы фиксируем стоимость в договоре. Изменения возможны только при новых работах по вашему запросу.",
  },
  {
    q: "Какие сроки изготовления и благоустройства?",
    a: "Изготовление памятника после одобрения ретуши портрета — 1 месяц. Сроки по благоустройству соблюдаем согласно договору.",
  },
  {
    q: "Есть ли рассрочка и какие гарантии?",
    a: "Да, предоставляем рассрочку без переплат. На выполненные работы действует гарантия 3 года.",
  },
  {
    q: "Можно ли контролировать процесс работ?",
    a: "Да. Отправляем фотоотчет всех этапов работы, чтобы вы видели фактический прогресс и качество исполнения.",
  },
] as const;

const defaultState: FormState = {
  direction: "",
  monumentType: "",
  layoutSeries: "",
  layoutCode: "",
  surfaceType: "none",
  extras: [],
  areaM2: "",
  curbLength: "",
  plotPhoto: "",
  stylePhoto: "",
  name: "",
  phone: "",
  comment: "",
};

const DEFAULT_FORM_STATE_SERIALIZED = JSON.stringify(defaultState);

function sanitizeFormState(raw: Partial<FormState>): FormState {
  const direction: Direction = directions.some((item) => item.key === raw.direction)
    ? (raw.direction as Direction)
    : "";
  const monumentType: MonumentType = monumentTypes.some((item) => item.key === raw.monumentType)
    ? (raw.monumentType as MonumentType)
    : "";
  const surfaceType =
    raw.surfaceType === "none" || surfaceOptions.some((item) => item.key === raw.surfaceType)
      ? raw.surfaceType ?? "none"
      : "none";
  const extras = Array.isArray(raw.extras)
    ? raw.extras.filter((key) => landscapeExtras.some((item) => item.key === key))
    : [];

  return {
    ...defaultState,
    direction,
    monumentType,
    surfaceType,
    extras,
    layoutSeries: typeof raw.layoutSeries === "string" ? raw.layoutSeries : "",
    layoutCode: typeof raw.layoutCode === "string" ? raw.layoutCode : "",
    areaM2: typeof raw.areaM2 === "string" ? raw.areaM2 : "",
    curbLength: typeof raw.curbLength === "string" ? raw.curbLength : "",
    plotPhoto: typeof raw.plotPhoto === "string" ? raw.plotPhoto : "",
    stylePhoto: typeof raw.stylePhoto === "string" ? raw.stylePhoto : "",
    name: typeof raw.name === "string" ? raw.name : "",
    phone: typeof raw.phone === "string" ? raw.phone : "",
    comment: typeof raw.comment === "string" ? raw.comment : "",
  };
}

function formatPrice(value: number) {
  return new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 0 }).format(Math.max(0, Math.round(value)));
}

export default function HomePage() {
  const [step, setStep] = useState(1);
  const [dragField, setDragField] = useState<"plot" | "style" | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<FormState>(defaultState);
  const [catalogCounts, setCatalogCounts] = useState(defaultMonumentCounts);
  const [copiedLink, setCopiedLink] = useState(false);
  const hydratedFromQueryRef = useRef(false);

  useEffect(() => {
    let active = true;

    fetch("/api/catalog-counts")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!active || !data) return;
        setCatalogCounts({
          single: Number(data.single) || defaultMonumentCounts.single,
          double: Number(data.double) || defaultMonumentCounts.double,
          combo: Number(data.combo) || defaultMonumentCounts.combo,
          complex: Number(data.complex) || defaultMonumentCounts.complex,
        });
      })
      .catch(() => {
        // Keep fallback counts when API is unavailable.
      });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const encoded = params.get("cfg");
    if (!encoded) {
      hydratedFromQueryRef.current = true;
      return;
    }

    try {
      const parsed = JSON.parse(encoded) as Partial<FormState>;
      setForm(sanitizeFormState(parsed));
    } catch {
      // Ignore invalid shared links and keep defaults.
    } finally {
      hydratedFromQueryRef.current = true;
    }
  }, []);

  useEffect(() => {
    if (!hydratedFromQueryRef.current) return;

    const params = new URLSearchParams(window.location.search);
    const serialized = JSON.stringify(form);

    if (serialized === DEFAULT_FORM_STATE_SERIALIZED) params.delete("cfg");
    else params.set("cfg", serialized);

    const query = params.toString();
    const nextUrl = query ? `${window.location.pathname}?${query}${window.location.hash}` : `${window.location.pathname}${window.location.hash}`;
    window.history.replaceState(null, "", nextUrl);
  }, [form]);

  const progress = useMemo(() => (step / stepLabels.length) * 100, [step]);

  const showMonument = form.direction === "monument" || form.direction === "full";
  const showLandscape = form.direction === "landscape" || form.direction === "full";

  const estimate = useMemo(() => {
    let total = 0;
    let leadDays = 0;
    let accuracy = 25;

    if (showMonument && form.monumentType) {
      const type = monumentTypes.find((m) => m.key === form.monumentType);
      if (type) {
        total += type.base;
        leadDays = Math.max(leadDays, type.lead);
        accuracy += 18;
      }
    }

    if (showLandscape && form.surfaceType !== "none") {
      const area = Number(form.areaM2) || 0;
      const surface = surfaceOptions.find((s) => s.key === form.surfaceType);
      if (surface) {
        total += area * surface.pricePerM2;
        leadDays = Math.max(leadDays, 10);
        accuracy += area > 0 ? 16 : 6;
      }
    }

    if (showLandscape) {
      const curbLength = Number(form.curbLength) || 0;
      for (const extra of form.extras) {
        if (extra === "curb") total += curbLength * 22;
        if (extra === "facing") total += 380;
        if (extra === "fence") total += 820;
        if (extra === "bench") total += 740;
      }
      if (form.extras.length > 0) {
        leadDays = Math.max(leadDays, 14);
        accuracy += 12;
      }
    }

    if (form.layoutSeries) accuracy += 10;
    if (form.plotPhoto) accuracy += 14;
    if (form.stylePhoto) accuracy += 6;
    if (form.name && form.phone) accuracy += 6;
    accuracy = Math.min(96, accuracy);

    const min = total > 0 ? total * 0.9 : 0;
    const max = total > 0 ? total * 1.15 : 0;

    return {
      min,
      max,
      lead: leadDays > 0 ? `${leadDays}-${leadDays + 7} дней` : "Заполните конфигурацию",
      accuracy,
    };
  }, [form, showLandscape, showMonument]);

  const setField = <T extends keyof FormState>(field: T, value: FormState[T]) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const toggleExtra = (key: string) => {
    setForm((prev) => ({
      ...prev,
      extras: prev.extras.includes(key) ? prev.extras.filter((item) => item !== key) : [...prev.extras, key],
    }));
  };

  const onPhotoSelect = (field: "plotPhoto" | "stylePhoto", file?: File | null) => {
    if (!file) return;
    setField(field, file.name);
  };

  const nextStep = () => setStep((prev) => Math.min(prev + 1, stepLabels.length));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const submit = () => setSubmitted(true);
  const reset = () => {
    setSubmitted(false);
    setStep(1);
    setForm(defaultState);
  };

  const copyEstimateLink = async () => {
    const params = new URLSearchParams(window.location.search);
    const serialized = JSON.stringify(form);

    if (serialized === DEFAULT_FORM_STATE_SERIALIZED) params.delete("cfg");
    else params.set("cfg", serialized);

    const query = params.toString();
    const shareUrl = `${window.location.origin}${window.location.pathname}${query ? `?${query}` : ""}`;

    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopiedLink(true);
      window.setTimeout(() => setCopiedLink(false), 1800);
    } catch {
      // Clipboard can fail in insecure contexts.
    }
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <SiteHeader />

      <section className="relative overflow-hidden border-b border-white/10">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-10 top-10 h-80 w-80 rounded-full bg-white/[0.04] blur-[130px]" />
          <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-[#d4af37]/[0.08] blur-[150px]" />
          <div className="absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-white/[0.05] blur-[120px]" />
        </div>
        <div className="relative mx-auto grid max-w-7xl gap-12 px-6 pb-20 pt-16 md:px-10 md:pb-28 md:pt-24 xl:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 backdrop-blur-xl">
              <Sparkles className="h-4 w-4 text-white" />
              <span className="text-xs uppercase tracking-[0.22em] text-[#a2a2a2]">Мастерская памяти</span>
            </div>
            <h1 className="[font-family:var(--font-display)] text-5xl font-light uppercase leading-[0.95] tracking-[0.14em] text-white md:text-7xl xl:text-[92px]">
              Тепло
              <br />
              вечной памяти
            </h1>
            <p className="max-w-2xl text-base font-light leading-relaxed tracking-[0.02em] text-[#888]">
              Создаем памятники и мемориальные комплексы с уважением к истории семьи: от идеи и
              визуализации до бережной установки на участке.
            </p>
          </div>

          <div className="grid gap-4 self-end md:grid-cols-2 xl:grid-cols-1">
            <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-2xl">
              <p className="[font-family:var(--font-display)] text-xs uppercase tracking-[0.24em] text-[#949494]">
                Выполненные проекты
              </p>
              <p className="[font-family:var(--font-display)] mt-3 text-3xl uppercase tracking-[0.08em] text-white">
                250+
              </p>
              <p className="mt-2 text-sm font-light leading-relaxed text-[#b5b5b5]">
                Реализованных работ по памятникам и благоустройству в портфолио студии.
              </p>
            </div>
            <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-2xl">
              <p className="[font-family:var(--font-display)] text-xs uppercase tracking-[0.24em] text-[#949494]">
                Опыт и процесс
              </p>
              <p className="[font-family:var(--font-display)] mt-3 text-3xl uppercase tracking-[0.08em] text-white">
                8 лет
              </p>
              <p className="mt-2 text-sm font-light leading-relaxed text-[#b5b5b5]">
                На рынке. Проект, смета и сроки фиксируем до старта работ.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 md:px-10">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="[font-family:var(--font-display)] text-xs uppercase tracking-[0.24em] text-[#8f8f8f]">
              Каталог
            </p>
            <h2 className="[font-family:var(--font-display)] mt-4 text-4xl font-light uppercase tracking-[0.12em] md:text-6xl">
              Макеты памятников
            </h2>
          </div>
          <Link
            href="/catalog"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2 text-xs uppercase tracking-[0.16em] transition hover:bg-white hover:text-black"
          >
            Смотреть весь каталог
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {monumentTypes.map((item) => (
            <Link
              key={item.key}
              href={`/catalog/${item.key}`}
              className={`group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03] p-6 text-left backdrop-blur-2xl transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.06] ${
                item.key === "single"
                    ? "pr-[126px] min-[420px]:pr-[138px] md:pr-[196px]"
                  : item.key === "double"
                      ? "pr-[132px] min-[420px]:pr-[146px] md:pr-[214px]"
                    : item.key === "combo"
                      ? "md:pr-[188px]"
                      : item.key === "complex"
                        ? "pr-[124px] min-[420px]:pr-[136px]"
                        : ""
              }`}
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#111] px-3 py-1">
                <span className="h-1.5 w-1.5 rounded-full bg-[#d4af37]" />
                <span className="text-[10px] uppercase tracking-[0.16em] text-[#b0b0b0]">
                  {item.key === "combo" ? "Портфолио" : "Тип памятника"}
                </span>
              </div>
              <p className="[font-family:var(--font-display)] mt-4 text-base uppercase tracking-[0.14em] text-white">
                {item.title}
              </p>
              <p className="mt-2 text-sm text-[#8f8f8f]">Макетов: {catalogCounts[item.key]}</p>
              {item.descriptor && <p className="mt-1 text-xs text-[#6f6f6f]">{item.descriptor}</p>}
              <span className="mt-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-white/90">
                {item.key === "combo" ? "Открыть портфолио" : "Открыть каталог"}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </span>

              {item.key === "combo" && (
                <div className="pointer-events-none absolute right-4 top-4 bottom-4 hidden w-[176px] rounded-2xl border border-white/15 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] md:flex md:flex-col md:items-center md:justify-center">
                  <ImagePlus className="h-7 w-7 text-[#9bb4cd]" />
                  <p className="mt-3 text-center text-[10px] uppercase tracking-[0.16em] text-[#9db2c6]">
                    Место для фото
                  </p>
                  <p className="mt-1 text-center text-[10px] uppercase tracking-[0.16em] text-[#7f8d9a]">
                    реализованных работ
                  </p>
                </div>
              )}

              {item.key === "single" && (
                <div className="pointer-events-none absolute right-2 top-5 bottom-4 block w-[112px] min-[420px]:w-[128px] md:right-1 md:top-4 md:w-[186px]">
                  <div className="absolute bottom-2 left-7 h-6 w-[126px] -rotate-[7deg] rounded-[999px] bg-black/52 blur-[11px]" />
                  <div className="absolute bottom-3 left-11 h-4 w-[95px] -rotate-[8deg] rounded-[999px] bg-white/12 blur-[9px]" />
                  <Image
                    src="/monuments/single-reference-cutout.png"
                    alt="Одиночный памятник"
                    fill
                    className="object-contain object-center [filter:contrast(1.08)_brightness(0.93)_saturate(0.86)_drop-shadow(0_0_1.2px_rgba(244,244,244,0.34))_drop-shadow(0_0_2px_rgba(212,175,55,0.15))_drop-shadow(0_14px_28px_rgba(0,0,0,0.56))]"
                    sizes="186px"
                  />
                </div>
              )}

              {item.key === "double" && (
                <div className="pointer-events-none absolute right-1 top-5 bottom-4 block w-[120px] min-[420px]:w-[134px] md:right-0 md:top-4 md:w-[204px]">
                  <div className="absolute bottom-2 left-8 h-6 w-[142px] -rotate-[6deg] rounded-[999px] bg-black/55 blur-[11px]" />
                  <div className="absolute bottom-3 left-12 h-4 w-[110px] -rotate-[7deg] rounded-[999px] bg-white/10 blur-[9px]" />
                  <Image
                    src="/monuments/double-reference-cutout.png"
                    alt="Двойной памятник"
                    fill
                    className="object-contain object-center [filter:contrast(1.07)_brightness(0.92)_saturate(0.82)_drop-shadow(0_0_1.2px_rgba(244,244,244,0.34))_drop-shadow(0_0_2px_rgba(212,175,55,0.14))_drop-shadow(0_14px_28px_rgba(0,0,0,0.56))]"
                    sizes="204px"
                  />
                </div>
              )}

              {item.key === "complex" && (
                <div className="pointer-events-none absolute right-2 top-5 bottom-4 block w-[108px] min-[420px]:w-[124px] md:right-1 md:top-4 md:w-[178px]">
                  <Image
                    src="/monuments/combo-reference-cutout.png"
                    alt="Комплекс"
                    fill
                    className="object-contain object-center [filter:contrast(1.08)_brightness(0.92)_saturate(0.84)_drop-shadow(0_0_1.2px_rgba(244,244,244,0.34))_drop-shadow(0_0_2px_rgba(212,175,55,0.14))_drop-shadow(0_14px_24px_rgba(0,0,0,0.52))]"
                    sizes="178px"
                  />
                </div>
              )}
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 md:px-10">
        <div className="mb-10">
          <p className="[font-family:var(--font-display)] text-xs uppercase tracking-[0.24em] text-[#8f8f8f]">
            Преимущества
          </p>
          <h2 className="[font-family:var(--font-display)] mt-4 text-4xl font-light uppercase tracking-[0.12em] md:text-6xl">
            Почему нам доверяют
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {trustPillars.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="rounded-[28px] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-2xl"
              >
                <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-[#111] px-3 py-1.5">
                  <Icon className="h-4 w-4 text-[#d4af37]" />
                  <span className="text-[10px] uppercase tracking-[0.16em] text-[#b7b7b7]">Стандарт</span>
                </div>
                <p className="[font-family:var(--font-display)] mt-4 text-base uppercase tracking-[0.12em] text-white">
                  {item.title}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-[#8f8f8f]">{item.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="border-y border-white/10 py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="mb-10">
            <p className="[font-family:var(--font-display)] text-xs uppercase tracking-[0.24em] text-[#8f8f8f]">
              Процесс
            </p>
            <h2 className="[font-family:var(--font-display)] mt-4 text-4xl font-light uppercase tracking-[0.12em] md:text-6xl">
              Как проходит работа
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {workflowSteps.map((item, index) => (
              <div
                key={item.title}
                className="rounded-[28px] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-2xl"
              >
                <div className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1.5">
                  <span className="text-[10px] uppercase tracking-[0.16em] text-[#a8a8a8]">
                    Этап {index + 1}
                  </span>
                  {index < workflowSteps.length - 1 ? (
                    <ArrowRight className="h-3.5 w-3.5 text-[#6f8dad]" />
                  ) : (
                    <Check className="h-3.5 w-3.5 text-[#d4af37]" />
                  )}
                </div>
                <p className="[font-family:var(--font-display)] mt-4 text-sm uppercase tracking-[0.12em] text-white">
                  {item.title}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-[#8f8f8f]">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 md:px-10">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="[font-family:var(--font-display)] text-xs uppercase tracking-[0.24em] text-[#8f8f8f]">
              Кейсы
            </p>
            <h2 className="[font-family:var(--font-display)] mt-4 text-4xl font-light uppercase tracking-[0.12em] md:text-6xl">
              Реальные проекты
            </h2>
          </div>
          <Link
            href="/catalog"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2 text-xs uppercase tracking-[0.16em] transition hover:bg-white hover:text-black"
          >
            Смотреть каталог
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          {featuredCases.map((item) => (
            <div
              key={item.title}
              className="rounded-[28px] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-2xl"
            >
              <p className="text-xs uppercase tracking-[0.16em] text-[#a8a8a8]">{item.meta}</p>
              <p className="[font-family:var(--font-display)] mt-3 text-base uppercase tracking-[0.12em] text-white">
                {item.title}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-[#8f8f8f]">{item.result}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-white/10 py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="mb-10">
            <p className="[font-family:var(--font-display)] text-xs uppercase tracking-[0.24em] text-[#8f8f8f]">
              FAQ
            </p>
            <h2 className="[font-family:var(--font-display)] mt-4 text-4xl font-light uppercase tracking-[0.12em] md:text-6xl">
              Частые вопросы
            </h2>
          </div>
          <div className="space-y-3">
            {faqItems.map((item) => (
              <details
                key={item.q}
                className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-2xl"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                  <span className="[font-family:var(--font-display)] text-sm uppercase tracking-[0.1em] text-white">
                    {item.q}
                  </span>
                  <ChevronRight className="h-4 w-4 shrink-0 text-[#9bb4cd] transition-transform group-open:rotate-90" />
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-[#8f8f8f]">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 md:px-10">
        <div className="rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(111,141,173,0.18),rgba(255,255,255,0.04))] p-8 shadow-[0_22px_56px_rgba(0,0,0,0.28)] backdrop-blur-2xl md:p-12">
          <p className="[font-family:var(--font-display)] text-xs uppercase tracking-[0.22em] text-[#b7c9dc]">
            Финальный шаг
          </p>
          <h2 className="[font-family:var(--font-display)] mt-4 text-4xl font-light uppercase tracking-[0.12em] text-white md:text-6xl">
            Начнем расчет сегодня
          </h2>
          <p className="mt-5 max-w-3xl text-sm leading-relaxed text-[#d6e2ee]">
            Зафиксируем задачу, подберем стиль и подготовим смету под ваш участок. Для старта достаточно короткой
            консультации в удобном канале связи.
          </p>
          <p className="mt-3 text-sm text-[#d6e2ee]">
            Адрес: {mainContact.address}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={`tel:${mainContact.phoneRaw}`}
              className="inline-flex items-center gap-2 rounded-full border border-[#d4af37]/55 bg-[#d4af37]/[0.2] px-5 py-2.5 text-xs uppercase tracking-[0.16em] text-[#f4e6bf] transition hover:border-[#d4af37]/80 hover:bg-[#d4af37]/[0.3]"
            >
              Позвонить {mainContact.phoneLabel}
            </a>
            <a
              href={mainContact.viber}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-xs uppercase tracking-[0.16em] text-[#dce7f1] transition hover:border-[#6f8dad]/55 hover:bg-[#6f8dad]/[0.16] hover:text-white"
            >
              Написать в Viber
            </a>
            <a
              href={mainContact.telegram}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-xs uppercase tracking-[0.16em] text-[#dce7f1] transition hover:border-[#6f8dad]/55 hover:bg-[#6f8dad]/[0.16] hover:text-white"
            >
              Написать в Telegram
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
