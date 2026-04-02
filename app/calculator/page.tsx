import { SiteFooter, SiteHeader } from "../components/site/SiteChrome";
import PremiumCalculator from "../components/site/PremiumCalculator";

export default function CalculatorPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#0a0a0a] text-white">
      <SiteHeader />

      <section className="mx-auto max-w-7xl overflow-x-hidden px-4 py-12 md:px-10 md:py-16">
        <div className="mb-8">
          <p className="[font-family:var(--font-display)] text-xs uppercase tracking-[0.2em] text-[#8f8f8f]">
            Калькулятор
          </p>
          <h1 className="[font-family:var(--font-display)] mt-4 text-4xl font-light uppercase tracking-[0.12em] md:text-6xl">
            Быстрый расчет
          </h1>
          <p className="mt-4 max-w-2xl text-sm font-light leading-relaxed text-[#888]">
            Подберите конфигурацию и получите ориентировочную стоимость.
          </p>
        </div>

        <PremiumCalculator />
      </section>

      <SiteFooter />
    </main>
  );
}

