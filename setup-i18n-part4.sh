#!/bin/bash

# ============================================================
# Relocate2Day — i18n Part 4: Wire up country pages
# Creates a shared CountryPage component and updates all 9
# country page.tsx files to load translated content
# ============================================================

set -e
echo "🌍 Starting i18n Part 4 — wiring up country pages..."

# ─── 1. Create shared CountryPageTemplate component ──────────────────────────
echo "📝 Creating components/CountryPageTemplate.tsx..."
mkdir -p components
cat > components/CountryPageTemplate.tsx << 'EOF'
"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { useState, useEffect } from "react";

interface Stat { label: string; value: string; }
interface VisaItem { title: string; badge: string; points: string[]; }
interface CostCity { city: string; level: string; items: string[]; }
interface HealthCard { title: string; points: string[]; }
interface BankCard { title: string; points: string[]; }
interface ProsCons { title: string; points: string[]; }

export interface CountryContent {
  country: string;
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    stats: Stat[];
  };
  sections: {
    visas: {
      eyebrow: string;
      title: string;
      intro: string;
      warning?: string;
      visas: VisaItem[];
      disclaimer: string;
    };
    taxes: {
      eyebrow: string;
      title: string;
      intro: string;
      disclaimer: string;
      [key: string]: unknown;
    };
    costOfLiving: {
      eyebrow: string;
      title: string;
      intro: string;
      cities: CostCity[];
      expenses: { title: string; items: [string, string][]; };
      [key: string]: unknown;
    };
    healthcare: {
      eyebrow: string;
      title: string;
      intro: string;
      public: HealthCard;
      private: HealthCard;
      tip: string;
      warning?: string;
    };
    banking: {
      eyebrow: string;
      title: string;
      intro: string;
      requirements: BankCard;
      banks: BankCard;
      tip: string;
      [key: string]: unknown;
    };
    prosCons: {
      eyebrow: string;
      title: string;
      pros: ProsCons;
      cons: ProsCons;
    };
    cta: {
      title: string;
      subtitle: string;
      button: string;
    };
    [key: string]: unknown;
  };
}

interface Props {
  content: CountryContent;
  heroImage: string;
  slug: string;
  sectionLabels: { id: string; label: string }[];
  zhDisclaimer?: boolean;
}

export default function CountryPageTemplate({ content, heroImage, slug, sectionLabels, zhDisclaimer }: Props) {
  const [activeSection, setActiveSection] = useState(sectionLabels[0]?.id || "visas");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    sectionLabels.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { rootMargin: "-30% 0px -60% 0px" }
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [sectionLabels]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const { hero, sections } = content;
  const visas = sections.visas;
  const taxes = sections.taxes;
  const col = sections.costOfLiving;
  const health = sections.healthcare;
  const bank = sections.banking;
  const pc = sections.prosCons;
  const cta = sections.cta;

  return (
    <div className="min-h-screen bg-white text-[#0B1957]">
      <Navbar variant="content" backHref="/" backLabel="← Back to all countries" />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${heroImage}')` }} />
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative mx-auto max-w-7xl px-6 py-28 text-white">
          <div className="inline-flex rounded-full bg-orange-400 px-4 py-1 text-xs font-bold uppercase tracking-wide mb-6">
            {hero.badge}
          </div>
          <h1 className="text-6xl font-black leading-none md:text-8xl">{hero.title}</h1>
          {zhDisclaimer && (
            <div className="mt-4 inline-block rounded-xl bg-amber-400/20 border border-amber-400/40 px-4 py-2 text-sm text-amber-200">
              注意：本页内容由AI翻译，仅供参考。重要决定请向专业顾问核实。
            </div>
          )}
          <p className="mt-6 max-w-2xl text-xl text-white/80">{hero.subtitle}</p>
          <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4 max-w-3xl">
            {hero.stats.map((stat) => (
              <div key={stat.label} className="rounded-2xl bg-white/30 p-5 backdrop-blur-xl">
                <div className="text-sm text-white/80">{stat.label}</div>
                <div className="mt-1 text-lg font-black">{stat.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <div className="relative mx-auto max-w-7xl px-6 py-20">
        <div className="flex gap-16">
          <div className="flex-1 min-w-0 space-y-20">

            {/* VISAS */}
            <section id="visas">
              <div className="text-sm font-bold uppercase tracking-[0.3em] text-violet-500 mb-4">{visas.eyebrow}</div>
              <h2 className="text-4xl font-black mb-8">{visas.title}</h2>
              {visas.warning && (
                <div className="mb-8 rounded-[20px] bg-red-50 border-2 border-red-300 p-6">
                  <div className="flex gap-3 items-start">
                    <span className="text-2xl">⚠️</span>
                    <p className="text-sm text-red-700">{visas.warning}</p>
                  </div>
                </div>
              )}
              <p className="text-gray-600 text-lg mb-8">{visas.intro}</p>
              <div className="space-y-6">
                {visas.visas.map((visa) => (
                  <div key={visa.title} className="rounded-[24px] border border-gray-100 bg-white p-8 shadow-lg">
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <h3 className="text-xl font-black">{visa.title}</h3>
                      <span className="rounded-full px-3 py-1 text-xs font-bold bg-violet-100 text-violet-700">{visa.badge}</span>
                    </div>
                    <ul className="space-y-2">
                      {visa.points.map((point) => (
                        <li key={point} className="flex gap-3 text-gray-600">
                          <span className="text-violet-500 mt-0.5">✓</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-[20px] bg-amber-50 border border-amber-200 p-6">
                <p className="text-sm text-amber-800"><strong>Important:</strong> {visas.disclaimer}</p>
              </div>
            </section>

            {/* TAXES — render raw content from JSON since structure varies by country */}
            <section id="taxes">
              <div className="text-sm font-bold uppercase tracking-[0.3em] text-violet-500 mb-4">{taxes.eyebrow}</div>
              <h2 className="text-4xl font-black mb-8">{taxes.title}</h2>
              <p className="text-gray-600 text-lg mb-8">{taxes.intro}</p>
              {/* Highlight box if present */}
              {taxes.highlight && (() => {
                const h = taxes.highlight as { title: string; subtitle: string; items: { label: string; value: string }[] };
                return (
                  <div className="rounded-[28px] bg-gradient-to-br from-violet-600 via-pink-500 to-orange-400 p-8 text-white mb-8">
                    <h3 className="text-2xl font-black mb-2">{h.title}</h3>
                    <p className="text-white/80 mb-6">{h.subtitle}</p>
                    <div className="grid gap-4 md:grid-cols-2">
                      {h.items.map((item) => (
                        <div key={item.label} className="rounded-2xl bg-white/15 p-4">
                          <div className="text-sm text-white/70">{item.label}</div>
                          <div className="mt-1 font-bold text-sm">{item.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })()}
              {/* Standard rates table if present */}
              {taxes.standardRates && (() => {
                const sr = taxes.standardRates as { title: string; brackets: [string, string][]; note?: string };
                return (
                  <div className="rounded-[20px] bg-[#f8f7ff] p-6 mb-6">
                    <h4 className="font-black text-lg mb-3">{sr.title}</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm text-gray-600">
                        <tbody>
                          {sr.brackets.map(([bracket, rate]) => (
                            <tr key={bracket} className="border-b border-gray-100">
                              <td className="py-2">{bracket}</td>
                              <td className="py-2 font-semibold">{rate}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    {sr.note && <p className="text-xs text-gray-500 mt-3">{sr.note}</p>}
                  </div>
                );
              })()}
              <div className="rounded-[20px] bg-amber-50 border border-amber-200 p-6">
                <p className="text-sm text-amber-800"><strong>Tax advice disclaimer:</strong> {taxes.disclaimer}</p>
              </div>
            </section>

            {/* COST OF LIVING */}
            <section id="cost-of-living">
              <div className="text-sm font-bold uppercase tracking-[0.3em] text-violet-500 mb-4">{col.eyebrow}</div>
              <h2 className="text-4xl font-black mb-8">{col.title}</h2>
              <p className="text-gray-600 text-lg mb-8">{col.intro}</p>
              <div className="grid gap-4 md:grid-cols-3 mb-8">
                {col.cities.map((city, i) => {
                  const colors = [
                    "border-red-200 bg-red-50",
                    "border-yellow-200 bg-yellow-50",
                    "border-green-200 bg-green-50",
                  ];
                  const badges = [
                    "bg-red-100 text-red-700",
                    "bg-yellow-100 text-yellow-700",
                    "bg-green-100 text-green-700",
                  ];
                  return (
                    <div key={city.city} className={`rounded-[24px] border-2 p-6 ${colors[i] || colors[0]}`}>
                      <span className={`rounded-full px-3 py-1 text-xs font-bold ${badges[i] || badges[0]}`}>{city.level}</span>
                      <h3 className="mt-3 font-black text-lg">{city.city}</h3>
                      <ul className="mt-4 space-y-2">
                        {city.items.map((item) => (
                          <li key={item} className="text-sm text-gray-600 flex gap-2"><span>•</span><span>{item}</span></li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
              <div className="rounded-[24px] bg-[#f8f7ff] p-8 mb-6">
                <h3 className="font-black text-xl mb-6">{col.expenses.title}</h3>
                <div className="space-y-3">
                  {col.expenses.items.map(([item, cost]) => (
                    <div key={item} className="flex justify-between items-center border-b border-gray-200 pb-3">
                      <span className="text-gray-600">{item}</span>
                      <span className="font-bold">{cost}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* HEALTHCARE */}
            <section id="healthcare">
              <div className="text-sm font-bold uppercase tracking-[0.3em] text-violet-500 mb-4">{health.eyebrow}</div>
              <h2 className="text-4xl font-black mb-8">{health.title}</h2>
              <p className="text-gray-600 text-lg mb-8">{health.intro}</p>
              <div className="grid gap-6 md:grid-cols-2 mb-8">
                {[
                  { icon: "🏥", ...health.public },
                  { icon: "💊", ...health.private },
                ].map((card) => (
                  <div key={card.title} className="rounded-[24px] bg-[#f8f7ff] p-8">
                    <div className="text-3xl mb-4">{card.icon}</div>
                    <h3 className="font-black text-xl mb-3">{card.title}</h3>
                    <ul className="space-y-2 text-gray-600">
                      {card.points.map((point) => (
                        <li key={point} className="flex gap-3">
                          <span className="text-violet-500 mt-0.5">✓</span>
                          <span className="text-sm">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              {health.warning ? (
                <div className="rounded-[20px] bg-amber-50 border border-amber-200 p-6">
                  <p className="text-sm text-amber-800"><strong>Important:</strong> {health.warning}</p>
                </div>
              ) : (
                <div className="rounded-[20px] bg-blue-50 border border-blue-200 p-6">
                  <p className="text-sm text-blue-800"><strong>Tip:</strong> {health.tip}</p>
                </div>
              )}
            </section>

            {/* BANKING */}
            <section id="banking">
              <div className="text-sm font-bold uppercase tracking-[0.3em] text-violet-500 mb-4">{bank.eyebrow}</div>
              <h2 className="text-4xl font-black mb-8">{bank.title}</h2>
              <p className="text-gray-600 text-lg mb-8">{bank.intro}</p>
              <div className="grid gap-6 md:grid-cols-2 mb-8">
                {[bank.requirements, bank.banks].map((card) => (
                  <div key={card.title} className="rounded-[24px] bg-[#f8f7ff] p-8">
                    <h3 className="font-black text-xl mb-4">{card.title}</h3>
                    <ul className="space-y-2 text-gray-600">
                      {card.points.map((point) => (
                        <li key={point} className="flex gap-3">
                          <span className="text-violet-500 mt-0.5">✓</span>
                          <span className="text-sm">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <div className="rounded-[20px] bg-blue-50 border border-blue-200 p-6">
                <p className="text-sm text-blue-800"><strong>Tip:</strong> {String(bank.tip)}</p>
              </div>
            </section>

            {/* PROS & CONS */}
            <section id="pros-cons">
              <div className="text-sm font-bold uppercase tracking-[0.3em] text-violet-500 mb-4">{pc.eyebrow}</div>
              <h2 className="text-4xl font-black mb-8">{pc.title}</h2>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-[24px] bg-green-50 border-2 border-green-200 p-8">
                  <h3 className="font-black text-xl text-green-800 mb-4">✅ {pc.pros.title}</h3>
                  <ul className="space-y-3">
                    {pc.pros.points.map((point) => (
                      <li key={point} className="flex gap-3 text-green-800">
                        <span className="mt-0.5">•</span>
                        <span className="text-sm">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-[24px] bg-red-50 border-2 border-red-200 p-8">
                  <h3 className="font-black text-xl text-red-800 mb-4">⚠️ {pc.cons.title}</h3>
                  <ul className="space-y-3">
                    {pc.cons.points.map((point) => (
                      <li key={point} className="flex gap-3 text-red-800">
                        <span className="mt-0.5">•</span>
                        <span className="text-sm">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* CTA */}
            <section className="rounded-[32px] bg-gradient-to-br from-violet-600 via-pink-500 to-orange-400 p-10 text-center text-white">
              <h2 className="text-4xl font-black">{cta.title}</h2>
              <p className="mt-4 text-white/80 text-lg">{cta.subtitle}</p>
              <Link href="/" className="mt-8 inline-block rounded-2xl bg-white px-8 py-4 text-sm font-bold text-violet-600 shadow-2xl transition hover:scale-105">
                {cta.button}
              </Link>
            </section>

          </div>

          {/* STICKY SIDE NAV */}
          <aside className="hidden xl:block w-56 shrink-0">
            <div className="sticky top-28">
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-4">On this page</div>
              <nav className="space-y-1">
                {sectionLabels.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollTo(section.id)}
                    className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                      activeSection === section.id
                        ? "bg-violet-50 text-violet-600 border-l-2 border-violet-600"
                        : "text-gray-500 hover:text-[#0B1957] hover:bg-gray-50"
                    }`}
                  >
                    {section.label}
                  </button>
                ))}
              </nav>
            </div>
          </aside>
        </div>
      </div>
      <Footer />
    </div>
  );
}
EOF

# ─── 2. Create updated page.tsx for all 9 countries ──────────────────────────
echo "📝 Updating country page.tsx files..."

python3 - << 'PYEOF'
import os

countries = [
  {
    "slug": "spain",
    "name": "Spain",
    "heroImage": "/images/countries/spain-hero.jpg",
    "sections": [
      {"id": "visas", "en": "Visas & Residency", "es": "Visas y Residencia", "pt": "Vistos e Residência", "zh": "签证与居留"},
      {"id": "taxes", "en": "Taxes", "es": "Impuestos", "pt": "Impostos", "zh": "税务"},
      {"id": "cost-of-living", "en": "Cost of Living", "es": "Coste de Vida", "pt": "Custo de Vida", "zh": "生活成本"},
      {"id": "healthcare", "en": "Healthcare", "es": "Sanidad", "pt": "Saúde", "zh": "医疗"},
      {"id": "banking", "en": "Banking & Finance", "es": "Banca y Finanzas", "pt": "Bancos e Finanças", "zh": "银行与金融"},
      {"id": "pros-cons", "en": "Is Spain right for you?", "es": "¿Es España para ti?", "pt": "A Espanha é para si?", "zh": "西班牙适合你吗？"},
    ]
  },
  {
    "slug": "gibraltar",
    "name": "Gibraltar",
    "heroImage": "/images/countries/gibraltar-hero.jpg",
    "sections": [
      {"id": "visas", "en": "Visas & Residency", "es": "Visas y Residencia", "pt": "Vistos e Residência", "zh": "签证与居留"},
      {"id": "taxes", "en": "Taxes", "es": "Impuestos", "pt": "Impostos", "zh": "税务"},
      {"id": "cost-of-living", "en": "Cost of Living", "es": "Coste de Vida", "pt": "Custo de Vida", "zh": "生活成本"},
      {"id": "healthcare", "en": "Healthcare", "es": "Sanidad", "pt": "Saúde", "zh": "医疗"},
      {"id": "banking", "en": "Banking & Finance", "es": "Banca y Finanzas", "pt": "Bancos e Finanças", "zh": "银行与金融"},
      {"id": "pros-cons", "en": "Is Gibraltar right for you?", "es": "¿Es Gibraltar para ti?", "pt": "Gibraltar é para si?", "zh": "直布罗陀适合你吗？"},
      {"id": "la-linea", "en": "The Cross-Border Option", "es": "La Opción Transfronteriza", "pt": "A Opção Transfronteiriça", "zh": "跨境居住选择"},
    ]
  },
  {
    "slug": "portugal",
    "name": "Portugal",
    "heroImage": "/images/countries/portugal-hero.jpg",
    "sections": [
      {"id": "visas", "en": "Visas & Residency", "es": "Visas y Residencia", "pt": "Vistos e Residência", "zh": "签证与居留"},
      {"id": "taxes", "en": "Taxes", "es": "Impuestos", "pt": "Impostos", "zh": "税务"},
      {"id": "cost-of-living", "en": "Cost of Living", "es": "Coste de Vida", "pt": "Custo de Vida", "zh": "生活成本"},
      {"id": "healthcare", "en": "Healthcare", "es": "Sanidad", "pt": "Saúde", "zh": "医疗"},
      {"id": "banking", "en": "Banking & Finance", "es": "Banca y Finanzas", "pt": "Bancos e Finanças", "zh": "银行与金融"},
      {"id": "pros-cons", "en": "Is Portugal right for you?", "es": "¿Es Portugal para ti?", "pt": "Portugal é para si?", "zh": "葡萄牙适合你吗？"},
    ]
  },
  {
    "slug": "italy",
    "name": "Italy",
    "heroImage": "/images/countries/italy-hero.jpg",
    "sections": [
      {"id": "visas", "en": "Visas & Residency", "es": "Visas y Residencia", "pt": "Vistos e Residência", "zh": "签证与居留"},
      {"id": "taxes", "en": "Taxes", "es": "Impuestos", "pt": "Impostos", "zh": "税务"},
      {"id": "cost-of-living", "en": "Cost of Living", "es": "Coste de Vida", "pt": "Custo de Vida", "zh": "生活成本"},
      {"id": "healthcare", "en": "Healthcare", "es": "Sanidad", "pt": "Saúde", "zh": "医疗"},
      {"id": "banking", "en": "Banking & Finance", "es": "Banca y Finanzas", "pt": "Bancos e Finanças", "zh": "银行与金融"},
      {"id": "pros-cons", "en": "Is Italy right for you?", "es": "¿Es Italia para ti?", "pt": "Itália é para si?", "zh": "意大利适合你吗？"},
    ]
  },
  {
    "slug": "malta",
    "name": "Malta",
    "heroImage": "/images/countries/malta-hero.jpg",
    "sections": [
      {"id": "visas", "en": "Visas & Residency", "es": "Visas y Residencia", "pt": "Vistos e Residência", "zh": "签证与居留"},
      {"id": "taxes", "en": "Taxes", "es": "Impuestos", "pt": "Impostos", "zh": "税务"},
      {"id": "cost-of-living", "en": "Cost of Living", "es": "Coste de Vida", "pt": "Custo de Vida", "zh": "生活成本"},
      {"id": "healthcare", "en": "Healthcare", "es": "Sanidad", "pt": "Saúde", "zh": "医疗"},
      {"id": "banking", "en": "Banking & Finance", "es": "Banca y Finanzas", "pt": "Bancos e Finanças", "zh": "银行与金融"},
      {"id": "pros-cons", "en": "Is Malta right for you?", "es": "¿Es Malta para ti?", "pt": "Malta é para si?", "zh": "马耳他适合你吗？"},
    ]
  },
  {
    "slug": "bulgaria",
    "name": "Bulgaria",
    "heroImage": "/images/countries/bulgaria-hero.jpg",
    "sections": [
      {"id": "visas", "en": "Visas & Residency", "es": "Visas y Residencia", "pt": "Vistos e Residência", "zh": "签证与居留"},
      {"id": "taxes", "en": "Taxes", "es": "Impuestos", "pt": "Impostos", "zh": "税务"},
      {"id": "cost-of-living", "en": "Cost of Living", "es": "Coste de Vida", "pt": "Custo de Vida", "zh": "生活成本"},
      {"id": "healthcare", "en": "Healthcare", "es": "Sanidad", "pt": "Saúde", "zh": "医疗"},
      {"id": "banking", "en": "Banking & Finance", "es": "Banca y Finanzas", "pt": "Bancos e Finanças", "zh": "银行与金融"},
      {"id": "pros-cons", "en": "Is Bulgaria right for you?", "es": "¿Es Bulgaria para ti?", "pt": "A Bulgária é para si?", "zh": "保加利亚适合你吗？"},
    ]
  },
  {
    "slug": "greece",
    "name": "Greece",
    "heroImage": "/images/countries/greece-hero.jpg",
    "sections": [
      {"id": "visas", "en": "Visas & Residency", "es": "Visas y Residencia", "pt": "Vistos e Residência", "zh": "签证与居留"},
      {"id": "taxes", "en": "Taxes", "es": "Impuestos", "pt": "Impostos", "zh": "税务"},
      {"id": "cost-of-living", "en": "Cost of Living", "es": "Coste de Vida", "pt": "Custo de Vida", "zh": "生活成本"},
      {"id": "healthcare", "en": "Healthcare", "es": "Sanidad", "pt": "Saúde", "zh": "医疗"},
      {"id": "banking", "en": "Banking & Finance", "es": "Banca y Finanzas", "pt": "Bancos e Finanças", "zh": "银行与金融"},
      {"id": "pros-cons", "en": "Is Greece right for you?", "es": "¿Es Grecia para ti?", "pt": "A Grécia é para si?", "zh": "希腊适合你吗？"},
    ]
  },
  {
    "slug": "netherlands",
    "name": "Netherlands",
    "heroImage": "/images/countries/netherlands-hero.jpg",
    "sections": [
      {"id": "visas", "en": "Visas & Residency", "es": "Visas y Residencia", "pt": "Vistos e Residência", "zh": "签证与居留"},
      {"id": "taxes", "en": "Taxes", "es": "Impuestos", "pt": "Impostos", "zh": "税务"},
      {"id": "cost-of-living", "en": "Cost of Living", "es": "Coste de Vida", "pt": "Custo de Vida", "zh": "生活成本"},
      {"id": "healthcare", "en": "Healthcare", "es": "Sanidad", "pt": "Saúde", "zh": "医疗"},
      {"id": "banking", "en": "Banking & Finance", "es": "Banca y Finanzas", "pt": "Bancos e Finanças", "zh": "银行与金融"},
      {"id": "pros-cons", "en": "Is the Netherlands right for you?", "es": "¿Son los Países Bajos para ti?", "pt": "Os Países Baixos são para si?", "zh": "荷兰适合你吗？"},
    ]
  },
  {
    "slug": "romania",
    "name": "Romania",
    "heroImage": "/images/countries/romania-hero.jpg",
    "sections": [
      {"id": "visas", "en": "Visas & Residency", "es": "Visas y Residencia", "pt": "Vistos e Residência", "zh": "签证与居留"},
      {"id": "taxes", "en": "Taxes", "es": "Impuestos", "pt": "Impostos", "zh": "税务"},
      {"id": "cost-of-living", "en": "Cost of Living", "es": "Coste de Vida", "pt": "Custo de Vida", "zh": "生活成本"},
      {"id": "healthcare", "en": "Healthcare", "es": "Sanidad", "pt": "Saúde", "zh": "医疗"},
      {"id": "banking", "en": "Banking & Finance", "es": "Banca y Finanzas", "pt": "Bancos e Finanças", "zh": "银行与金融"},
      {"id": "pros-cons", "en": "Is Romania right for you?", "es": "¿Es Rumanía para ti?", "pt": "A Roménia é para si?", "zh": "罗马尼亚适合你吗？"},
    ]
  },
]

template = '''"use client";

import {{ useEffect, useState }} from "react";
import CountryPageTemplate, {{ CountryContent }} from "@/components/CountryPageTemplate";

import contentEn from "./content.json";
import contentEs from "./content.es.json";
import contentPt from "./content.pt.json";
import contentZh from "./content.zh.json";

const sectionLabels = (locale: string) => [
{sections}
];

export default function {name}Page() {{
  const [locale, setLocale] = useState("en");
  const [content, setContent] = useState<CountryContent>(contentEn as CountryContent);

  useEffect(() => {{
    const path = window.location.pathname;
    let detected = "en";
    if (path.startsWith("/es")) detected = "es";
    else if (path.startsWith("/pt")) detected = "pt";
    else if (path.startsWith("/zh")) detected = "zh";
    else {{
      const cookie = document.cookie.match(/NEXT_LOCALE=([^;]+)/);
      if (cookie) detected = cookie[1];
    }}
    setLocale(detected);
    if (detected === "es") setContent(contentEs as CountryContent);
    else if (detected === "pt") setContent(contentPt as CountryContent);
    else if (detected === "zh") setContent(contentZh as CountryContent);
    else setContent(contentEn as CountryContent);
  }}, []);

  return (
    <CountryPageTemplate
      content={{content}}
      heroImage="{heroImage}"
      slug="{slug}"
      sectionLabels={{sectionLabels(locale)}}
      zhDisclaimer={{locale === "zh"}}
    />
  );
}}
'''

for country in countries:
    slug = country["slug"]
    name = country["name"].replace(" ", "")
    sections_str = ""
    for s in country["sections"]:
        sections_str += f'  {{ id: "{s["id"]}", label: locale === "es" ? "{s["es"]}" : locale === "pt" ? "{s["pt"]}" : locale === "zh" ? "{s["zh"]}" : "{s["en"]}" }},\n'
    
    page_content = template.format(
        name=name,
        slug=slug,
        heroImage=country["heroImage"],
        sections=sections_str
    )
    
    path = f"app/countries/{slug}/page.tsx"
    with open(path, "w") as f:
        f.write(page_content)
    print(f"✅ Updated {path}")

print("\n🎉 All 9 country pages updated!")
PYEOF

echo ""
echo "✅ Part 4 complete!"
echo ""
echo "Files created/updated:"
echo "   📄 components/CountryPageTemplate.tsx — shared translated country page component"
echo "   📄 app/countries/*/page.tsx — all 9 country pages updated (×9)"
echo ""
echo "Next steps:"
echo "   git add components/CountryPageTemplate.tsx app/countries/"
echo "   git commit -m 'feat: i18n part 4 — wire up translated country pages'"
echo "   git push"
