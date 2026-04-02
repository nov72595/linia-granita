"use client";

import { useMemo, useRef, useState } from "react";
import { Calculator, ClipboardCheck, Download, MessageCircle, Ruler, Send } from "lucide-react";
import { toBlob } from "html-to-image";
import PlotPreview3D from "./PlotPreview3D";

type ToggleItem = {
  id: string;
  label: string;
  price: number;
  calc: "area" | "perimeter" | "perimeter_extra" | "socle" | "dem_area" | "dem_perimeter";
  unit: string;
};

type QtyItem = {
  id: string;
  label: string;
  price: number;
  unit: string;
};

const INSTALL_TOGGLES: ToggleItem[] = [
  { id: "t135", label: "Укладка тротуарной плитки", price: 135, calc: "area", unit: "м2" },
  { id: "t350", label: "Укладка керамогранита", price: 350, calc: "area", unit: "м2" },
  { id: "b45", label: "Установка бордюра", price: 45, calc: "perimeter_extra", unit: "мп" },
  { id: "b65", label: "Бордюр без облицовки", price: 65, calc: "perimeter", unit: "мп" },
  { id: "op10", label: "Опалубка", price: 10, calc: "perimeter", unit: "мп" },
  { id: "bes140", label: "Установка бессера", price: 110, calc: "perimeter", unit: "мп" },
  { id: "c220", label: "Облицовка цоколя (h=20 см)", price: 220, calc: "socle", unit: "м2" },
  { id: "og_g25", label: "Монтаж ограды ГРАНИТ", price: 25, calc: "perimeter", unit: "мп" },
  { id: "og_m12", label: "Монтаж ограды МЕТАЛЛ", price: 12, calc: "perimeter", unit: "мп" },
];

const INSTALL_QTY: QtyItem[] = [
  { id: "m140", label: "Монтаж памятника до 110x55", price: 140, unit: "шт" },
  { id: "m190", label: "Монтаж памятника от 110x55", price: 190, unit: "шт" },
  { id: "m160", label: "Монтаж памятника двойной 1цв", price: 160, unit: "шт" },
  { id: "m180", label: "Монтаж памятника двойной 2цв", price: 180, unit: "шт" },
  { id: "plt25", label: "Установка надгр. плиты", price: 25, unit: "шт" },
  { id: "roy15", label: "Монтаж рояли", price: 15, unit: "шт" },
  { id: "st_g45", label: "Установка стола/лавки ГРАНИТ", price: 45, unit: "шт" },
  { id: "st_m25", label: "Установка стола/лавки МЕТАЛЛ", price: 25, unit: "шт" },
  { id: "v10", label: "Установка вазы/лампады", price: 10, unit: "шт" },
  { id: "z35", label: "Засыпка цветного щебня", price: 35, unit: "м2" },
  { id: "z30", label: "Засыпка серого щебня", price: 30, unit: "м2" },
  { id: "z45", label: "Укладка искусств. травы", price: 45, unit: "м2" },
  { id: "z_pesok100", label: "Засыпка песка в свободное место", price: 100, unit: "шт" },
];

const DEMO_TOGGLES: ToggleItem[] = [
  { id: "dt15", label: "Демонтаж плитки", price: 15, calc: "dem_area", unit: "м2" },
  { id: "db10", label: "Демонтаж бордюра", price: 10, calc: "dem_perimeter", unit: "мп" },
  { id: "do5", label: "Демонтаж ограды", price: 5, calc: "dem_perimeter", unit: "мп" },
];

const DEMO_QTY: QtyItem[] = [
  { id: "d_m110", label: "Дем. пам. до 110x55", price: 50, unit: "шт" },
  { id: "d_m110plus", label: "Дем. пам. от 110x55", price: 80, unit: "шт" },
  { id: "d_mdv", label: "Дем. пам. двойного", price: 70, unit: "шт" },
  { id: "d_mkrosh", label: "Дем. пам. из крошки", price: 70, unit: "шт" },
  { id: "d_st", label: "Дем. стола/лавки", price: 10, unit: "шт" },
];

const PRESETS = [
  {
    id: "trotuar_18_12",
    title: "Базовое благоустройство - тротуарная плитка 1.8x1.2",
    apply: { L: "1.8", W: "1.2", checks: ["t135", "b45"], dist: "20" },
  },
  {
    id: "trotuar_21_12",
    title: "Базовое благоустройство - тротуарная плитка 2.1x1.2",
    apply: { L: "2.1", W: "1.2", checks: ["t135", "b45"], dist: "20" },
  },
  {
    id: "trotuar_21_21",
    title: "Базовое благоустройство - тротуарная плитка 2.1x2.1",
    apply: { L: "2.1", W: "2.1", checks: ["t135", "b45"], dist: "20" },
  },
  {
    id: "trotuar_24_24",
    title: "Базовое благоустройство - тротуарная плитка 2.4x2.4",
    apply: { L: "2.4", W: "2.4", checks: ["t135", "b45"], dist: "20" },
  },
  {
    id: "keramo_18_12",
    title: "Керамогранит 1.8x1.2",
    apply: { L: "1.8", W: "1.2", checks: ["t350", "b65"], dist: "25" },
  },
  {
    id: "keramo_24_12",
    title: "Керамогранит 2.4x1.2",
    apply: { L: "2.4", W: "1.2", checks: ["t350", "b65"], dist: "25" },
  },
  {
    id: "keramo_24_24",
    title: "Керамогранит 2.4x2.4",
    apply: { L: "2.4", W: "2.4", checks: ["t350", "b65"], dist: "25" },
  },
];

const toNumber = (v: string) => Number.parseFloat(v) || 0;
const perimeter = (l: number, w: number) => (l > 0 && w > 0 ? (l + w) * 2 : 0);
const area = (l: number, w: number) => (l > 0 && w > 0 ? l * w : 0);
const byn = (v: number) => `${new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 0 }).format(Math.round(v))} BYN`;

export default function PremiumCalculator() {
  const exportRef = useRef<HTMLDivElement | null>(null);
  const [L, setL] = useState("2");
  const [W, setW] = useState("2");
  const [LFree, setLFree] = useState("0");
  const [WFree, setWFree] = useState("0");
  const [Ld, setLd] = useState("0");
  const [Wd, setWd] = useState("0");
  const [dist, setDist] = useState("0");
  const [checks, setChecks] = useState<Record<string, boolean>>({});
  const [qty, setQty] = useState<Record<string, number>>({});
  const [exportBusy, setExportBusy] = useState(false);
  const [exportError, setExportError] = useState<string | null>(null);
  const [paverPattern, setPaverPattern] = useState<"circle" | "square" | "california">("circle");
  const [porcelainVariant, setPorcelainVariant] = useState<"barrone" | "g640" | "g610">("barrone");

  const calc = useMemo(() => {
    const l = toNumber(L);
    const w = toNumber(W);
    const lf = toNumber(LFree);
    const wf = toNumber(WFree);
    const ld = toNumber(Ld);
    const wd = toNumber(Wd);
    const p = perimeter(l, w);
    const pd = perimeter(ld, wd);
    const sNetto = Math.max(0, area(l, w) - area(lf, wf));
    const socleArea = p * 0.2;
    const curbExtra = 0.32;

    const lines: Array<{ name: string; qty: number; unit: string; price: number; sum: number }> = [];
    let total = 0;

    const addLine = (name: string, q: number, unit: string, price: number) => {
      if (q <= 0) return;
      const sum = q * price;
      total += sum;
      lines.push({ name, qty: q, unit, price, sum });
    };

    for (const item of INSTALL_TOGGLES) {
      if (!checks[item.id]) continue;
      if (item.calc === "area") addLine(item.label, sNetto, item.unit, item.price);
      if (item.calc === "perimeter") addLine(item.label, p, item.unit, item.price);
      if (item.calc === "perimeter_extra") addLine(item.label, p + curbExtra, item.unit, item.price);
      if (item.calc === "socle") addLine(item.label, socleArea, item.unit, item.price);
    }

    for (const item of INSTALL_QTY) {
      const q = qty[item.id] || 0;
      addLine(item.label, q, item.unit, item.price);
    }

    for (const item of DEMO_TOGGLES) {
      if (!checks[item.id]) continue;
      if (item.calc === "dem_area") addLine(item.label, area(ld, wd), item.unit, item.price);
      if (item.calc === "dem_perimeter") addLine(item.label, pd, item.unit, item.price);
    }

    for (const item of DEMO_QTY) {
      const q = qty[item.id] || 0;
      addLine(item.label, q, item.unit, item.price);
    }

    const deliveryDistance = toNumber(dist);
    const paidDeliveryKm = Math.max(0, deliveryDistance - 20);
    addLine("Доставка (в одну сторону, свыше 20 км)", paidDeliveryKm, "км", 1);

    return { total: Math.round(total), lines, sNetto, p };
  }, [L, W, LFree, WFree, Ld, Wd, dist, checks, qty]);

  const preview = useMemo(() => {
    const l = Math.max(0, toNumber(L));
    const w = Math.max(0, toNumber(W));
    const lf = Math.max(0, Math.min(toNumber(LFree), l));
    const wf = Math.max(0, Math.min(toNumber(WFree), w));
    const tileSize = checks.t350 ? 0.6 : 0.3;
    const paverLabel =
      paverPattern === "circle" ? "кружок" : paverPattern === "square" ? "квадрат" : "калифорния";
    const porcelainLabel = porcelainVariant === "g640" ? "G-640" : porcelainVariant === "g610" ? "G-610" : "BARRONE";
    const tileLabel = checks.t350
      ? `Керамогранит 60x60 (${porcelainLabel})`
      : `Тротуарная плитка 30x30 (${paverLabel})`;
    return { l, w, lf, wf, tileSize, tileLabel };
  }, [L, W, LFree, WFree, checks.t350, paverPattern, porcelainVariant]);

  const toggleCheck = (id: string) =>
    setChecks((prev) => {
      const nextValue = !prev[id];
      const next = { ...prev, [id]: nextValue };
      // Material modes are mutually exclusive: keep porcelain and pavers isolated.
      if (id === "t135" && nextValue) next.t350 = false;
      if (id === "t350" && nextValue) next.t135 = false;
      return next;
    });
  const setQtyValue = (id: string, value: string) => setQty((prev) => ({ ...prev, [id]: Number.parseInt(value || "0", 10) || 0 }));

  const buildShareText = () => {
    const linesPreview = calc.lines.slice(0, 12).map((line) => `- ${line.name}: ${byn(line.sum)}`).join("\n");
    return `Смета по благоустройству
Итог: ${byn(calc.total)}
Чистая площадь: ${calc.sNetto.toFixed(2)} м2
Периметр: ${calc.p.toFixed(2)} мп

${linesPreview || "- Нет выбранных позиций"}`;
  };

  const buildShareShortText = () => {
    return `Смета по благоустройству: ${byn(calc.total)}. Подробности в прикрепленном PNG.`;
  };

  const buildEstimatePng = async () => {
    if (!exportRef.current) return null;
    const blob = await toBlob(exportRef.current, {
      cacheBust: true,
      pixelRatio: 2,
      backgroundColor: "#f3f6fa",
    });
    if (!blob) return null;
    const datePart = new Date().toISOString().slice(0, 10);
    return { blob, filename: `smeta-${datePart}.png` };
  };

  const handleDownloadPng = async () => {
    try {
      setExportBusy(true);
      setExportError(null);
      const image = await buildEstimatePng();
      if (!image) {
        setExportError("Не удалось сформировать PNG.");
        return;
      }

      const url = URL.createObjectURL(image.blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = image.filename;
      link.click();
      URL.revokeObjectURL(url);
    } catch {
      setExportError("Не удалось подготовить PNG.");
    } finally {
      setExportBusy(false);
    }
  };

  const handleSharePng = async () => {
    try {
      setExportBusy(true);
      setExportError(null);
      const image = await buildEstimatePng();
      if (!image) {
        setExportError("Не удалось сформировать PNG.");
        return;
      }

      const file = new File([image.blob], image.filename, { type: "image/png" });
      const canShareFiles =
        typeof navigator !== "undefined" &&
        typeof navigator.share === "function" &&
        typeof navigator.canShare === "function" &&
        navigator.canShare({ files: [file] });

      if (canShareFiles) {
        await navigator.share({
          title: "Смета по благоустройству",
          text: `Итог: ${byn(calc.total)}`,
          files: [file],
        });
        return;
      }

      await handleDownloadPng();
      setExportError("На этом устройстве прямой share файла недоступен. PNG сохранен.");
    } catch {
      setExportError("Не удалось отправить смету.");
    } finally {
      setExportBusy(false);
    }
  };

  const handleShareTo = async (channel: "telegram" | "whatsapp" | "viber") => {
    try {
      setExportBusy(true);
      setExportError(null);

      const text = buildShareText();
      const shortText = buildShareShortText();
      try {
        await navigator.clipboard.writeText(text);
      } catch {
        // Clipboard can fail in insecure contexts.
      }

      const encoded = encodeURIComponent(shortText);
      const shareUrl =
        channel === "telegram"
          ? `https://t.me/share/url?text=${encoded}`
          : channel === "whatsapp"
            ? `https://api.whatsapp.com/send?text=${encoded}`
            : `viber://forward?text=${encoded}`;

      if (channel === "viber") {
        window.location.href = shareUrl;
        window.setTimeout(() => {
          setExportError("Если Viber не открылся, вероятно приложение не установлено. Скачайте PNG и отправьте вручную.");
        }, 1200);
      } else {
        const opened = window.open(shareUrl, "_blank", "noopener,noreferrer");
        if (!opened) {
          setExportError("Браузер заблокировал всплывающее окно. Разрешите pop-up для сайта.");
          return;
        }
      }

      const channelLabel = channel === "telegram" ? "Telegram" : channel === "whatsapp" ? "WhatsApp" : "Viber";
      setExportError(`${channelLabel} открыт. Текст сметы скопирован в буфер. Теперь нажмите "Скачать PNG" и прикрепите файл.`);
    } catch {
      setExportError("Не удалось отправить смету в выбранный мессенджер.");
    } finally {
      setExportBusy(false);
    }
  };

  const applyPreset = (presetId: string) => {
    const preset = PRESETS.find((x) => x.id === presetId);
    if (!preset) return;
    setL(preset.apply.L);
    setW(preset.apply.W);
    setLd(preset.apply.Ld ?? "0");
    setWd(preset.apply.Wd ?? "0");
    setDist(preset.apply.dist);
    const nextChecks: Record<string, boolean> = {};
    for (const id of preset.apply.checks) nextChecks[id] = true;
    setChecks(nextChecks);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] xl:gap-8">
      <div className="space-y-6 rounded-[28px] border border-white/12 bg-white/[0.04] p-6 shadow-[0_24px_60px_rgba(0,0,0,0.25)] backdrop-blur-2xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="[font-family:var(--font-display)] text-xs uppercase tracking-[0.24em] text-[#95a9bc]">Профессиональный калькулятор</p>
            <h3 className="[font-family:var(--font-display)] mt-2 text-3xl uppercase tracking-[0.08em]">Цены из вашего прайса</h3>
          </div>
          <div className="grid h-10 w-10 place-items-center rounded-2xl border border-[#6f8dad]/45 bg-[#6f8dad]/[0.12]">
            <Calculator className="h-5 w-5 text-[#9bb4cd]" />
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <label className="space-y-1">
            <span className="text-xs uppercase tracking-[0.16em] text-[#9a9a9a]">Длина участка, м</span>
            <input value={L} onChange={(e) => setL(e.target.value)} className="w-full rounded-2xl border border-white/15 bg-[#121212] px-4 py-2.5 text-sm text-white outline-none transition placeholder:text-[#70859a] focus:border-[#6f8dad]/55 focus:shadow-[0_0_0_3px_rgba(111,141,173,0.16)]" />
          </label>
          <label className="space-y-1">
            <span className="text-xs uppercase tracking-[0.16em] text-[#9a9a9a]">Ширина участка, м</span>
            <input value={W} onChange={(e) => setW(e.target.value)} className="w-full rounded-2xl border border-white/15 bg-[#121212] px-4 py-2.5 text-sm text-white outline-none transition placeholder:text-[#70859a] focus:border-[#6f8dad]/55 focus:shadow-[0_0_0_3px_rgba(111,141,173,0.16)]" />
          </label>
          <label className="space-y-1">
            <span className="text-xs uppercase tracking-[0.16em] text-[#9a9a9a]">Свободное место (длина), м</span>
            <input value={LFree} onChange={(e) => setLFree(e.target.value)} className="w-full rounded-2xl border border-white/15 bg-[#121212] px-4 py-2.5 text-sm text-white outline-none transition placeholder:text-[#70859a] focus:border-[#6f8dad]/55 focus:shadow-[0_0_0_3px_rgba(111,141,173,0.16)]" />
          </label>
          <label className="space-y-1">
            <span className="text-xs uppercase tracking-[0.16em] text-[#9a9a9a]">Свободное место (ширина), м</span>
            <input value={WFree} onChange={(e) => setWFree(e.target.value)} className="w-full rounded-2xl border border-white/15 bg-[#121212] px-4 py-2.5 text-sm text-white outline-none transition placeholder:text-[#70859a] focus:border-[#6f8dad]/55 focus:shadow-[0_0_0_3px_rgba(111,141,173,0.16)]" />
          </label>
        </div>

        {checks.t135 && !checks.t350 ? (
          <div className="space-y-3 rounded-3xl border border-[#6f8dad]/35 bg-[#6f8dad]/[0.1] p-4">
            <p className="text-[11px] uppercase tracking-[0.14em] text-[#b7c9dc]">Вид тротуарной плитки 30x30</p>
            <div className="grid gap-2 sm:grid-cols-3">
              <button
                type="button"
                onClick={() => setPaverPattern("circle")}
                className={`rounded-xl border px-3 py-2 text-left text-sm transition ${
                  paverPattern === "circle"
                    ? "border-[#89a7c5] bg-[#6f8dad]/[0.22] text-[#1f3a54]"
                    : "border-white/12 bg-white/[0.06] text-[#355572] hover:border-[#6f8dad]/45 hover:bg-[#6f8dad]/[0.12]"
                }`}
              >
                Кружок
              </button>
              <button
                type="button"
                onClick={() => setPaverPattern("square")}
                className={`rounded-xl border px-3 py-2 text-left text-sm transition ${
                  paverPattern === "square"
                    ? "border-[#89a7c5] bg-[#6f8dad]/[0.22] text-[#1f3a54]"
                    : "border-white/12 bg-white/[0.06] text-[#355572] hover:border-[#6f8dad]/45 hover:bg-[#6f8dad]/[0.12]"
                }`}
              >
                Квадрат
              </button>
              <button
                type="button"
                onClick={() => setPaverPattern("california")}
                className={`rounded-xl border px-3 py-2 text-left text-sm transition ${
                  paverPattern === "california"
                    ? "border-[#89a7c5] bg-[#6f8dad]/[0.22] text-[#1f3a54]"
                    : "border-white/12 bg-white/[0.06] text-[#355572] hover:border-[#6f8dad]/45 hover:bg-[#6f8dad]/[0.12]"
                }`}
              >
                Калифорния
              </button>
            </div>
          </div>
        ) : null}

        {checks.t350 && !checks.t135 ? (
          <div className="space-y-3 rounded-3xl border border-[#6f8dad]/35 bg-[#6f8dad]/[0.1] p-4">
            <p className="text-[11px] uppercase tracking-[0.14em] text-[#b7c9dc]">Вид керамогранита 60x60</p>
            <div className="grid gap-2 sm:grid-cols-3">
              <button
                type="button"
                onClick={() => setPorcelainVariant("barrone")}
                className={`rounded-xl border px-3 py-2 text-left text-sm transition ${
                  porcelainVariant === "barrone"
                    ? "border-[#89a7c5] bg-[#6f8dad]/[0.22] text-[#1f3a54]"
                    : "border-white/12 bg-white/[0.06] text-[#355572] hover:border-[#6f8dad]/45 hover:bg-[#6f8dad]/[0.12]"
                }`}
              >
                BARRONE
              </button>
              <button
                type="button"
                onClick={() => setPorcelainVariant("g640")}
                className={`rounded-xl border px-3 py-2 text-left text-sm transition ${
                  porcelainVariant === "g640"
                    ? "border-[#89a7c5] bg-[#6f8dad]/[0.22] text-[#1f3a54]"
                    : "border-white/12 bg-white/[0.06] text-[#355572] hover:border-[#6f8dad]/45 hover:bg-[#6f8dad]/[0.12]"
                }`}
              >
                G-640
              </button>
              <button
                type="button"
                onClick={() => setPorcelainVariant("g610")}
                className={`rounded-xl border px-3 py-2 text-left text-sm transition ${
                  porcelainVariant === "g610"
                    ? "border-[#89a7c5] bg-[#6f8dad]/[0.22] text-[#1f3a54]"
                    : "border-white/12 bg-white/[0.06] text-[#355572] hover:border-[#6f8dad]/45 hover:bg-[#6f8dad]/[0.12]"
                }`}
              >
                G-610
              </button>
            </div>
          </div>
        ) : null}

        <div className="space-y-3 rounded-3xl border border-white/12 bg-[#111111] p-4">
          <p className="[font-family:var(--font-display)] text-xs uppercase tracking-[0.18em] text-[#bdbdbd]">Предпросмотр участка</p>
          {preview.l > 0 && preview.w > 0 ? (
            <div className="space-y-2">
              <p className="text-xs text-[#8f8f8f]">
                Размер: {preview.l.toFixed(2)} x {preview.w.toFixed(2)} м • {preview.tileLabel}
              </p>
              <PlotPreview3D
                key={`${checks.t350 ? `porcelain-${porcelainVariant}` : "paver"}-${paverPattern}`}
                lengthM={preview.l}
                widthM={preview.w}
                freeLengthM={preview.lf}
                freeWidthM={preview.wf}
                isPorcelain={Boolean(checks.t350)}
                isCurbWithoutCladding={Boolean(checks.b65)}
                porcelainVariant={porcelainVariant}
                paverPattern={paverPattern}
              />
              <p className="text-[11px] text-[#7f8d9a]">
                Схема для понимания раскладки. Если заполните "Свободное место", оно будет показано зеленым прямоугольником.
              </p>
            </div>
          ) : (
            <p className="text-sm text-[#8f8f8f]">Введите длину и ширину участка, чтобы увидеть схему.</p>
          )}
        </div>

        <div className="space-y-3 rounded-3xl border border-white/12 bg-[#111111] p-4">
          <p className="[font-family:var(--font-display)] text-xs uppercase tracking-[0.18em] text-[#bdbdbd]">Монтажные работы</p>
          <div className="grid gap-2 sm:grid-cols-2">
            {INSTALL_TOGGLES.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => toggleCheck(item.id)}
                className={`rounded-2xl border px-4 py-3 text-left text-sm transition ${
                  checks[item.id]
                    ? "border-[#6f8dad]/65 bg-[#6f8dad]/[0.16]"
                    : "border-white/10 bg-[#151515] hover:border-[#6f8dad]/45 hover:bg-white/[0.06]"
                }`}
              >
                <p className="text-[#d6d6d6]">{item.label}</p>
                <p className="mt-1 text-xs text-[#8f8f8f]">{item.price} BYN / {item.unit}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3 rounded-3xl border border-white/12 bg-[#111111] p-4">
          <p className="[font-family:var(--font-display)] text-xs uppercase tracking-[0.18em] text-[#bdbdbd]">Штучные позиции</p>
          <div className="grid gap-2 sm:grid-cols-2">
            {INSTALL_QTY.slice(0, 8).map((item) => (
              <label key={item.id} className="space-y-1 rounded-2xl border border-white/10 bg-[#151515] px-4 py-3">
                <span className="block text-xs text-[#bcbcbc]">{item.label}</span>
                <input
                  type="number"
                  value={qty[item.id] ?? 0}
                  min={0}
                  onChange={(e) => setQtyValue(item.id, e.target.value)}
                  className="w-full rounded-xl border border-white/15 bg-[#101010] px-3 py-2 text-sm text-white outline-none transition focus:border-[#6f8dad]/55 focus:shadow-[0_0_0_3px_rgba(111,141,173,0.16)]"
                />
              </label>
            ))}
          </div>
        </div>

        <div className="space-y-3 rounded-3xl border border-white/12 bg-[#111111] p-4">
          <p className="[font-family:var(--font-display)] text-xs uppercase tracking-[0.18em] text-[#bdbdbd]">Демонтаж и доп. расходы</p>
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="space-y-1">
              <span className="text-xs uppercase tracking-[0.16em] text-[#9a9a9a]">Длина демонтажа, м</span>
              <input value={Ld} onChange={(e) => setLd(e.target.value)} className="w-full rounded-2xl border border-white/15 bg-[#121212] px-4 py-2.5 text-sm text-white outline-none transition focus:border-[#6f8dad]/55 focus:shadow-[0_0_0_3px_rgba(111,141,173,0.16)]" />
            </label>
            <label className="space-y-1">
              <span className="text-xs uppercase tracking-[0.16em] text-[#9a9a9a]">Ширина демонтажа, м</span>
              <input value={Wd} onChange={(e) => setWd(e.target.value)} className="w-full rounded-2xl border border-white/15 bg-[#121212] px-4 py-2.5 text-sm text-white outline-none transition focus:border-[#6f8dad]/55 focus:shadow-[0_0_0_3px_rgba(111,141,173,0.16)]" />
            </label>
          </div>
          <div className="grid gap-2 sm:grid-cols-3">
            {DEMO_TOGGLES.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => toggleCheck(item.id)}
                className={`rounded-2xl border px-4 py-3 text-left text-sm transition ${
                  checks[item.id]
                    ? "border-[#6f8dad]/65 bg-[#6f8dad]/[0.16]"
                    : "border-white/10 bg-[#151515] hover:border-[#6f8dad]/45 hover:bg-white/[0.06]"
                }`}
              >
                <p className="text-[#d6d6d6]">{item.label}</p>
                <p className="mt-1 text-xs text-[#8f8f8f]">{item.price} BYN / {item.unit}</p>
              </button>
            ))}
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="space-y-1">
              <span className="text-xs uppercase tracking-[0.16em] text-[#9a9a9a]">Доставка (в одну сторону), км</span>
              <input value={dist} onChange={(e) => setDist(e.target.value)} className="w-full rounded-2xl border border-white/15 bg-[#121212] px-4 py-2.5 text-sm text-white outline-none transition focus:border-[#6f8dad]/55 focus:shadow-[0_0_0_3px_rgba(111,141,173,0.16)]" />
              <p className="text-[11px] text-[#8f8f8f]">До 20 км бесплатно, далее 1 BYN/км</p>
            </label>
          </div>
        </div>
      </div>

      <aside className="space-y-6">
        <div className="rounded-[28px] border border-white/12 bg-white/[0.04] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.22)] backdrop-blur-2xl">
          <p className="[font-family:var(--font-display)] text-xs uppercase tracking-[0.2em] text-[#9a9a9a]">Итог по смете</p>
          <p className="[font-family:var(--font-display)] mt-3 text-4xl uppercase tracking-[0.08em] text-white">{byn(calc.total)}</p>
          <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-2xl border border-white/10 bg-[#101010] px-3 py-2">
              <p className="text-[#888]">Чистая площадь</p>
              <p className="mt-1 font-medium">{calc.sNetto.toFixed(2)} м2</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-[#101010] px-3 py-2">
              <p className="text-[#888]">Периметр</p>
              <p className="mt-1 font-medium">{calc.p.toFixed(2)} мп</p>
            </div>
          </div>
        </div>

        <div className="rounded-[28px] border border-white/12 bg-white/[0.04] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.22)] backdrop-blur-2xl">
          <div className="flex items-center gap-2">
            <ClipboardCheck className="h-4 w-4 text-[#9bb4cd]" />
            <p className="[font-family:var(--font-display)] text-xs uppercase tracking-[0.2em] text-[#9a9a9a]">Примеры расчетов</p>
          </div>
          <div className="mt-4 space-y-2">
            {PRESETS.map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => applyPreset(preset.id)}
                className="w-full rounded-2xl border border-white/12 bg-[#111] px-4 py-3 text-left text-sm text-[#d6d6d6] transition hover:-translate-y-0.5 hover:border-[#6f8dad]/45 hover:bg-white/[0.06]"
              >
                {preset.title}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-[28px] border border-white/12 bg-white/[0.04] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.22)] backdrop-blur-2xl">
          <div className="flex items-center gap-2">
            <Ruler className="h-4 w-4 text-[#9bb4cd]" />
            <p className="[font-family:var(--font-display)] text-xs uppercase tracking-[0.2em] text-[#9a9a9a]">Что включено</p>
          </div>
          <div className="mt-4 max-h-[360px] space-y-2 overflow-auto pr-1">
            {calc.lines.length === 0 ? (
              <p className="text-sm text-[#8f8f8f]">Выберите работы слева, чтобы увидеть детализацию.</p>
            ) : (
              calc.lines.map((line, idx) => (
                <div key={`${line.name}-${idx}`} className="rounded-2xl border border-white/10 bg-[#101010] px-3 py-2.5 text-sm">
                  <p className="text-[#dce7f1]">{line.name}</p>
                  <p className="mt-1 text-xs text-[#8f8f8f]">
                    {line.qty.toFixed(line.unit === "шт" ? 0 : 2)} {line.unit} x {line.price} BYN = {byn(line.sum)}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="rounded-[24px] border border-white/12 bg-white/[0.04] p-4 backdrop-blur-2xl">
          <div className="grid gap-2 sm:grid-cols-2">
            <button
              type="button"
              onClick={handleDownloadPng}
              disabled={exportBusy}
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-[#101010] px-4 py-3 text-sm text-[#d6d6d6] transition hover:border-[#6f8dad]/45 hover:bg-white/[0.06] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Download className="h-4 w-4" />
              Скачать PNG
            </button>
            <button
              type="button"
              onClick={handleSharePng}
              disabled={exportBusy}
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-[#101010] px-4 py-3 text-sm text-[#d6d6d6] transition hover:border-[#6f8dad]/45 hover:bg-white/[0.06] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Send className="h-4 w-4" />
              Отправить
            </button>
          </div>
          <div className="mt-2 grid gap-2 sm:grid-cols-3">
            <button
              type="button"
              onClick={() => handleShareTo("telegram")}
              disabled={exportBusy}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-[#101010] px-3 py-2 text-xs text-[#d6d6d6] transition hover:border-[#6f8dad]/45 hover:bg-white/[0.06] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Send className="h-3.5 w-3.5" />
              Telegram
            </button>
            <button
              type="button"
              onClick={() => handleShareTo("whatsapp")}
              disabled={exportBusy}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-[#101010] px-3 py-2 text-xs text-[#d6d6d6] transition hover:border-[#6f8dad]/45 hover:bg-white/[0.06] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <MessageCircle className="h-3.5 w-3.5" />
              WhatsApp
            </button>
            <button
              type="button"
              onClick={() => handleShareTo("viber")}
              disabled={exportBusy}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-[#101010] px-3 py-2 text-xs text-[#d6d6d6] transition hover:border-[#6f8dad]/45 hover:bg-white/[0.06] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Send className="h-3.5 w-3.5" />
              Viber
            </button>
          </div>
          {exportError ? <p className="mt-2 text-xs text-[#8f8f8f]">{exportError}</p> : null}
        </div>

        <div style={{ position: "fixed", left: "-9999px", top: "0", zIndex: -1 }}>
          <div
            ref={exportRef}
            style={{
              width: "1080px",
              background: "#f3f6fa",
              color: "#243445",
              fontFamily: "Segoe UI, Arial, sans-serif",
              padding: "40px",
            }}
          >
            <div
              style={{
                background: "#ffffff",
                border: "1px solid #d8e1ea",
                borderRadius: "18px",
                padding: "26px 28px",
                boxShadow: "0 10px 30px rgba(31,53,74,0.08)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "20px" }}>
                <div>
                  <div style={{ fontSize: "34px", fontWeight: 800, color: "#22384f", textTransform: "uppercase", lineHeight: 1 }}>
                    Смета
                  </div>
                  <div style={{ fontSize: "15px", color: "#4e6174", marginTop: "4px" }}>по благоустройству участка</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: "28px", fontWeight: 800, color: "#22384f", lineHeight: 1 }}>ЛИНИЯ</div>
                  <div style={{ height: "2px", background: "#5f7890", margin: "5px 0 4px" }} />
                  <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "3px", color: "#425a6f" }}>ГРАНИТА</div>
                </div>
              </div>

              <div
                style={{
                  marginTop: "16px",
                  display: "grid",
                  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                  gap: "8px 14px",
                  fontSize: "14px",
                  color: "#415468",
                }}
              >
                <div>Дата: {new Date().toLocaleDateString("ru-RU")}</div>
                <div style={{ textAlign: "right" }}>Итог: {byn(calc.total)}</div>
                <div>Размер участка: {toNumber(L).toFixed(2)} x {toNumber(W).toFixed(2)} м</div>
                <div style={{ textAlign: "right" }}>Чистая площадь: {calc.sNetto.toFixed(2)} м2</div>
                <div>Свободное место: {toNumber(LFree).toFixed(2)} x {toNumber(WFree).toFixed(2)} м</div>
                <div style={{ textAlign: "right" }}>Периметр: {calc.p.toFixed(2)} мп</div>
              </div>

              <div style={{ marginTop: "18px", borderRadius: "10px", overflow: "hidden", border: "1px solid #d8e1ea" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
                  <thead>
                    <tr style={{ background: "#edf2f7", color: "#2d4359" }}>
                      <th style={{ textAlign: "left", padding: "10px", borderBottom: "1px solid #d8e1ea" }}>Наименование</th>
                      <th style={{ textAlign: "center", padding: "10px", borderBottom: "1px solid #d8e1ea", width: "120px" }}>Кол-во</th>
                      <th style={{ textAlign: "center", padding: "10px", borderBottom: "1px solid #d8e1ea", width: "90px" }}>Ед.</th>
                      <th style={{ textAlign: "center", padding: "10px", borderBottom: "1px solid #d8e1ea", width: "130px" }}>Цена</th>
                      <th style={{ textAlign: "center", padding: "10px", borderBottom: "1px solid #d8e1ea", width: "140px" }}>Сумма</th>
                    </tr>
                  </thead>
                  <tbody>
                    {calc.lines.length === 0 ? (
                      <tr>
                        <td colSpan={5} style={{ padding: "12px", textAlign: "center", color: "#5d7388" }}>
                          Нет выбранных позиций
                        </td>
                      </tr>
                    ) : (
                      calc.lines.map((line, idx) => (
                        <tr key={`${line.name}-${idx}`} style={{ background: idx % 2 === 0 ? "#ffffff" : "#f8fbff" }}>
                          <td style={{ padding: "9px 10px", borderTop: "1px solid #e4ebf3" }}>{line.name}</td>
                          <td style={{ padding: "9px 10px", borderTop: "1px solid #e4ebf3", textAlign: "center" }}>
                            {line.qty.toFixed(line.unit === "шт" ? 0 : 2)}
                          </td>
                          <td style={{ padding: "9px 10px", borderTop: "1px solid #e4ebf3", textAlign: "center" }}>{line.unit}</td>
                          <td style={{ padding: "9px 10px", borderTop: "1px solid #e4ebf3", textAlign: "center" }}>{line.price} BYN</td>
                          <td style={{ padding: "9px 10px", borderTop: "1px solid #e4ebf3", textAlign: "center", fontWeight: 600 }}>
                            {byn(line.sum)}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
