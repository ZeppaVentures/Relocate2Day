"use client";

import Footer from "@/components/Footer";
import Link from "next/link";
import { useState, useEffect } from "react";

const sections = [
  { id: "visas", label: "Visas & Residency" },
  { id: "taxes", label: "Taxes" },
  { id: "cost-of-living", label: "Cost of Living" },
  { id: "healthcare", label: "Healthcare" },
  { id: "banking", label: "Banking & Finance" },
  { id: "pros-cons", label: "Is Italy right for you?" },
];

export default function ItalyPage() {
  const [activeSection, setActiveSection] = useState("visas");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    sections.forEach(({ id }) => {
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
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white text-[#0B1957]">

      {/* NAVIGATION */}
      <header className="sticky top-0 z-50 border-b border-white/30 bg-white/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Link href="/" className="text-3xl font-black tracking-tight">
            <span className="bg-gradient-to-r from-violet-600 via-pink-500 to-orange-400 bg-clip-text text-transparent">
              Relocate2Day
            </span>
          </Link>
          <Link href="/" className="text-sm font-semibold hover:text-violet-600 transition">
            ← Back to all countries
          </Link>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/countries/italy-hero.jpg')",
          }}
        />
        <div className="absolute inset-0 bg-black/25" />
        <div className="relative mx-auto max-w-7xl px-6 py-28 text-white">
          <div className="inline-flex rounded-full bg-orange-400 px-4 py-1 text-xs font-bold uppercase tracking-wide mb-6">
            Italy
          </div>
          <h1 className="text-6xl font-black leading-none md:text-8xl">
            Move to Italy
          </h1>
          <p className="mt-6 max-w-2xl text-xl text-white/80">
            World-class food, art, history, and coastline — plus some of Europe's most generous tax incentives for newcomers. Here's everything you need to know about relocating to Italy.
          </p>
          <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4 max-w-3xl">
            {[
              { label: "Retiree flat tax", value: "7%" },
              { label: "Impatriati exemption", value: "Up to 90%" },
              { label: "HNWI flat tax", value: "€300,000/yr" },
              { label: "Official language", value: "Italian" },
            ].map((stat) => (
              <div key={stat.label} className="rounded-2xl bg-white/30 p-5 backdrop-blur-xl">
                <div className="text-sm text-white/80">{stat.label}</div>
                <div className="mt-1 text-lg font-black">{stat.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MAIN CONTENT WITH STICKY NAV */}
      <div className="relative mx-auto max-w-7xl px-6 py-20">
        <div className="flex gap-16">

          {/* CONTENT */}
          <div className="flex-1 min-w-0 space-y-20">

            {/* VISAS */}
            <section id="visas">
              <div className="text-sm font-bold uppercase tracking-[0.3em] text-violet-500 mb-4">
                Visas & Residency
              </div>
              <h2 className="text-4xl font-black mb-8">How to move to Italy</h2>
              <p className="text-gray-600 text-lg mb-8">
                EU/EEA citizens can move to Italy freely and register residency at their local municipality (Comune). Non-EU nationals need a visa before arriving — Italy offers several routes depending on whether you plan to work, retire, invest, or study.
              </p>

              <div className="space-y-6">
                {[
                  {
                    title: "Digital Nomad Visa",
                    badge: "Remote workers & freelancers",
                    badgeColor: "bg-violet-100 text-violet-700",
                    points: [
                      "Launched in 2024 — one of Europe's newest digital nomad visa programmes",
                      "For non-EU citizens working remotely for employers or clients outside Italy",
                      "Minimum income requirement: €32,400/year (approx. €2,700/month)",
                      "Must demonstrate savings of at least €30,000",
                      "Must have at least 6 months of proven remote work experience",
                      "Must rent or purchase property in Italy before applying",
                      "Valid for 1 year, renewable for a further 2 years",
                      "Spouse, children under 18, and parents can be included",
                      "Pathway to permanent residency after 5 years, citizenship after 10 years",
                    ],
                  },
                  {
                    title: "Elective Residency Visa",
                    badge: "Retirees & financially independent",
                    badgeColor: "bg-orange-100 text-orange-700",
                    points: [
                      "For non-EU nationals who can support themselves entirely from passive income — pensions, investments, rental income",
                      "Strictly a non-working visa — Italy enforces this condition rigorously",
                      "Minimum passive income required: approx. €31,000/year for a single applicant",
                      "Add approx. 20% for a spouse and 5% per dependent child",
                      "Must prove you have accommodation in Italy (rental or owned)",
                      "Initial 1-year visa, renewable annually",
                      "After 5 years, eligible for long-term EU residency",
                      "Popular with retirees from the US, UK, Canada, and Australia",
                    ],
                  },
                  {
                    title: "Student Visa (Type D)",
                    badge: "Students",
                    badgeColor: "bg-blue-100 text-blue-700",
                    points: [
                      "For non-EU nationals enrolling at an Italian university or language school",
                      "Valid for the duration of the enrolled course",
                      "Permits part-time work of up to 20 hours per week",
                      "Italy has world-renowned universities — Bologna (the world's oldest), La Sapienza, Bocconi",
                      "Tuition fees at Italian public universities are very affordable — typically €900–€4,000/year",
                      "Pathway to convert to a work permit after graduation",
                    ],
                  },
                  {
                    title: "Golden Visa (Investor Visa)",
                    badge: "Investors",
                    badgeColor: "bg-yellow-100 text-yellow-700",
                    points: [
                      "Italy's residency-by-investment programme for non-EU nationals",
                      "Investment routes: €250,000 in an innovative startup, €500,000 in an Italian company, €1M in a philanthropic project, or €2M in Italian government bonds",
                      "Grants a 2-year renewable residence permit",
                      "No minimum stay requirement to maintain the permit",
                      "Pathway to permanent residency after 5 years and citizenship after 10 years",
                      "Spouse, minor children, and dependent adult children can be included",
                    ],
                  },
                  {
                    title: "EU / EEA Citizens",
                    badge: "Free movement",
                    badgeColor: "bg-green-100 text-green-700",
                    points: [
                      "EU/EEA citizens have the right to live and work in Italy without a visa",
                      "Must register at the local Comune (town hall) within 3 months of arrival",
                      "Bring your passport, proof of address, and proof of income or employment",
                      "After 5 years of continuous legal residence, eligible for permanent residency",
                      "No income requirements for EU citizens",
                    ],
                  },
                ].map((visa) => (
                  <div key={visa.title} className="rounded-[24px] border border-gray-100 bg-white p-8 shadow-lg">
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <h3 className="text-xl font-black">{visa.title}</h3>
                      <span className={`rounded-full px-3 py-1 text-xs font-bold ${visa.badgeColor}`}>
                        {visa.badge}
                      </span>
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
                <p className="text-sm text-amber-800">
                  <strong>Important:</strong> Italy's immigration system is known for complexity and bureaucracy. Visa processing times can be long and requirements are enforced strictly. Always apply well in advance and consider working with a qualified Italian immigration lawyer.
                </p>
              </div>
            </section>

            {/* TAXES */}
            <section id="taxes">
              <div className="text-sm font-bold uppercase tracking-[0.3em] text-violet-500 mb-4">
                Taxes
              </div>
              <h2 className="text-4xl font-black mb-8">Understanding tax in Italy</h2>
              <p className="text-gray-600 text-lg mb-8">
                Italy's standard income tax (IRPEF) is progressive and can reach 43% for high earners. However, Italy offers several generous tax incentive regimes for newcomers — including one of Europe's lowest flat tax rates for retirees and a significant income exemption for workers.
              </p>

              {/* Tax regimes overview */}
              <div className="grid gap-4 md:grid-cols-3 mb-8">
                {[
                  {
                    icon: "🏖️",
                    title: "7% Retiree Flat Tax",
                    desc: "For foreign retirees relocating to small towns in Southern Italy. One of the lowest flat tax rates in Europe.",
                    color: "bg-green-50 border-green-200",
                  },
                  {
                    icon: "💼",
                    title: "Impatriati Regime",
                    desc: "Up to 90% income tax exemption for workers relocating to Southern Italy. 70% exemption elsewhere.",
                    color: "bg-violet-50 border-violet-200",
                  },
                  {
                    icon: "💰",
                    title: "€300,000 HNWI Flat Tax",
                    desc: "Fixed annual tax on all worldwide foreign income. For ultra-high-net-worth individuals.",
                    color: "bg-orange-50 border-orange-200",
                  },
                ].map((item) => (
                  <div key={item.title} className={`rounded-[24px] border-2 p-6 ${item.color}`}>
                    <div className="text-4xl mb-3">{item.icon}</div>
                    <h3 className="font-black text-lg mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-4 mb-8">

                {/* 7% Retiree regime */}
                <div className="rounded-[28px] bg-gradient-to-br from-violet-600 via-pink-500 to-orange-400 p-8 text-white">
                  <h3 className="text-2xl font-black mb-2">The 7% Retiree Flat Tax — Southern Italy</h3>
                  <p className="text-white/80 mb-6">
                    One of the most generous retiree tax regimes in Europe. Pay just 7% on all foreign-sourced income for up to 10 years, if you relocate to a qualifying small town in Southern Italy.
                  </p>
                  <div className="grid gap-4 md:grid-cols-2">
                    {[
                      { label: "Flat tax rate", value: "7% on all foreign-sourced income" },
                      { label: "Duration", value: "Up to 10 years" },
                      { label: "Where", value: "Municipalities under 20,000 residents in Abruzzo, Molise, Campania, Puglia, Basilicata, Calabria, Sardinia, Sicily, and qualifying Central Italian villages" },
                      { label: "Who qualifies", value: "Foreign retirees receiving a pension from outside Italy, not previously resident in Italy for 5+ years, moving from a country with a tax treaty with Italy" },
                    ].map((item) => (
                      <div key={item.label} className="rounded-2xl bg-white/15 p-4">
                        <div className="text-sm text-white/70">{item.label}</div>
                        <div className="mt-1 font-bold text-sm">{item.value}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Impatriati */}
                <div className="rounded-[20px] bg-[#f8f7ff] p-6">
                  <h4 className="font-black text-lg mb-3">Impatriati Regime — for workers relocating to Italy</h4>
                  <p className="text-gray-600 text-sm mb-4">
                    The Inbound Workers (Impatriati) regime offers a major income tax exemption for qualifying professionals who relocate to Italy to work. You must not have been a tax resident in Italy for the past 3 years.
                  </p>
                  <div className="grid gap-3 md:grid-cols-2">
                    {[
                      { label: "Standard exemption", value: "70% of Italian employment or self-employment income is tax-exempt" },
                      { label: "Southern Italy bonus", value: "90% exemption if you live in Abruzzo, Molise, Campania, Puglia, Basilicata, Calabria, Sardinia, or Sicily" },
                      { label: "Duration", value: "5 years, extendable in some cases" },
                      { label: "Who qualifies", value: "Workers employed or self-employed in Italy, not resident in Italy for 3+ years, committing to stay for at least 2 years" },
                    ].map((item) => (
                      <div key={item.label} className="rounded-xl bg-white p-4 shadow-sm">
                        <div className="text-xs font-bold text-violet-500 uppercase mb-1">{item.label}</div>
                        <div className="text-sm text-gray-700">{item.value}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* HNWI Flat Tax */}
                <div className="rounded-[20px] bg-[#f8f7ff] p-6">
                  <h4 className="font-black text-lg mb-3">€300,000 HNWI Flat Tax — for ultra-high-net-worth individuals</h4>
                  <p className="text-gray-600 text-sm mb-4">
                    Italy's headline tax incentive for the ultra-wealthy. Pay a fixed €300,000 per year on all worldwide foreign-sourced income — regardless of how much you earn. The rate was raised from €200,000 in January 2026.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    {[
                      "Must not have been an Italian tax resident for 9 of the previous 10 years",
                      "Covers all foreign-sourced income for a fixed annual payment of €300,000",
                      "Family members can be included at €50,000 per person per year",
                      "Valid for up to 15 years",
                      "Exempts offshore assets from Italian wealth, inheritance, and gift taxes",
                      "Existing beneficiaries at the old €200,000 rate are grandfathered in",
                      "Attractive for individuals with foreign income above €1 million/year",
                    ].map((point) => (
                      <li key={point} className="flex gap-3">
                        <span className="text-violet-500 mt-0.5">✓</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Standard rates */}
                <div className="rounded-[20px] bg-[#f8f7ff] p-6">
                  <h4 className="font-black text-lg mb-3">Standard income tax rates (IRPEF) — without any regime</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-gray-600">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-2 font-bold text-[#0B1957]">Income bracket</th>
                          <th className="text-left py-2 font-bold text-[#0B1957]">Tax rate</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          ["Up to €28,000", "23%"],
                          ["€28,000 – €50,000", "35%"],
                          ["Over €50,000", "43%"],
                        ].map(([bracket, rate]) => (
                          <tr key={bracket} className="border-b border-gray-100">
                            <td className="py-2">{bracket}</td>
                            <td className="py-2 font-semibold">{rate}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p className="text-xs text-gray-500 mt-3">Regional and municipal surtaxes of approx. 1–3% also apply on top of IRPEF.</p>
                </div>
              </div>

              <div className="rounded-[20px] bg-amber-50 border border-amber-200 p-6">
                <p className="text-sm text-amber-800">
                  <strong>Tax advice disclaimer:</strong> Italy's tax incentive regimes are complex and eligibility depends on your specific situation, income type, and residency history. Always consult a qualified Italian tax adviser (commercialista) before making any decisions.
                </p>
              </div>
            </section>

            {/* COST OF LIVING */}
            <section id="cost-of-living">
              <div className="text-sm font-bold uppercase tracking-[0.3em] text-violet-500 mb-4">
                Cost of Living
              </div>
              <h2 className="text-4xl font-black mb-8">What does life in Italy cost?</h2>
              <p className="text-gray-600 text-lg mb-8">
                Italy offers enormous variety in cost of living — from expensive northern cities like Milan and Rome to remarkably affordable small towns in the South. A single person can live comfortably on €1,200–€1,500/month in mid-sized cities, and under €1,000/month in rural Southern Italy. The further south and smaller the town, the more affordable it becomes.
              </p>

              <div className="grid gap-4 md:grid-cols-3 mb-8">
                {[
                  {
                    city: "Milan, Rome & Florence",
                    level: "Most expensive",
                    color: "border-red-200 bg-red-50",
                    badge: "bg-red-100 text-red-700",
                    items: [
                      "1-bed apartment (centre): €1,200–€1,800/mo",
                      "Single person budget: €2,000–€3,000/mo",
                      "Monthly transport pass: €35–€55",
                    ],
                  },
                  {
                    city: "Bologna, Turin, Naples",
                    level: "Mid-range",
                    color: "border-yellow-200 bg-yellow-50",
                    badge: "bg-yellow-100 text-yellow-700",
                    items: [
                      "1-bed apartment (centre): €700–€1,000/mo",
                      "Single person budget: €1,400–€1,800/mo",
                      "Monthly transport pass: €30–€45",
                    ],
                  },
                  {
                    city: "Southern Italy & small towns",
                    level: "Most affordable",
                    color: "border-green-200 bg-green-50",
                    badge: "bg-green-100 text-green-700",
                    items: [
                      "1-bed apartment: €300–€700/mo",
                      "Single person budget: €800–€1,200/mo",
                      "Car often needed in rural areas",
                    ],
                  },
                ].map((city) => (
                  <div key={city.city} className={`rounded-[24px] border-2 p-6 ${city.color}`}>
                    <span className={`rounded-full px-3 py-1 text-xs font-bold ${city.badge}`}>
                      {city.level}
                    </span>
                    <h3 className="mt-3 font-black text-lg">{city.city}</h3>
                    <ul className="mt-4 space-y-2">
                      {city.items.map((item) => (
                        <li key={item} className="text-sm text-gray-600 flex gap-2">
                          <span>•</span><span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="rounded-[24px] bg-[#f8f7ff] p-8 mb-6">
                <h3 className="font-black text-xl mb-6">Typical monthly expenses (mid-sized city)</h3>
                <div className="space-y-3">
                  {[
                    ["Rent (1-bed, city centre)", "€700 – €1,100"],
                    ["Utilities (electricity, gas, water)", "€100 – €200"],
                    ["Groceries", "€200 – €350"],
                    ["Dining out (mid-range)", "€150 – €300"],
                    ["Public transport pass", "€30 – €45"],
                    ["Private health insurance", "€60 – €150"],
                    ["Gym membership", "€30 – €60"],
                    ["Mobile plan", "€10 – €30"],
                  ].map(([item, cost]) => (
                    <div key={item} className="flex justify-between items-center border-b border-gray-200 pb-3">
                      <span className="text-gray-600">{item}</span>
                      <span className="font-bold">{cost}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[20px] bg-blue-50 border border-blue-200 p-6">
                <p className="text-sm text-blue-800">
                  <strong>Southern Italy incentive:</strong> Several regions in Southern Italy — including Calabria, Sardinia, and Sicily — actively offer grants of up to €30,000 to foreigners who relocate permanently to depopulating small towns. Combined with the 7% retiree flat tax, this makes Southern Italy one of the most affordable and tax-efficient places to retire in all of Europe.
                </p>
              </div>
            </section>

            {/* HEALTHCARE */}
            <section id="healthcare">
              <div className="text-sm font-bold uppercase tracking-[0.3em] text-violet-500 mb-4">
                Healthcare
              </div>
              <h2 className="text-4xl font-black mb-8">Healthcare in Italy</h2>
              <p className="text-gray-600 text-lg mb-8">
                Italy's public healthcare system, the Servizio Sanitario Nazionale (SSN), is consistently ranked among the best in the world. It is available to all legal residents and is largely free or heavily subsidised. Quality is high, though wait times for non-urgent specialist care can vary by region.
              </p>

              <div className="grid gap-6 md:grid-cols-2 mb-8">
                {[
                  {
                    icon: "🏥",
                    title: "Public Healthcare (SSN)",
                    points: [
                      "Free or heavily subsidised for all legal residents",
                      "Register at your local ASL (Azienda Sanitaria Locale) office with your codice fiscale (tax number) and residence permit",
                      "Covers GP visits, hospital care, maternity, emergency services, and subsidised prescriptions",
                      "Small co-payments (ticket) apply for some specialist visits — typically €15–€50",
                      "Dental care is mostly NOT covered — pay privately",
                      "Quality varies significantly between Northern Italy (excellent) and Southern Italy (more variable)",
                      "Emergency number: 118 (medical), 112 (general)",
                    ],
                  },
                  {
                    icon: "💊",
                    title: "Private Health Insurance",
                    points: [
                      "Required for most visa applications before arriving in Italy",
                      "Costs approx. €60–€150/month per person depending on age and coverage",
                      "Provides faster access to specialists and avoids SSN waiting times",
                      "Many private hospitals and clinics have English-speaking staff",
                      "Particularly recommended in Southern Italy where SSN capacity can be more stretched",
                      "Popular providers: Generali, Allianz, UniSalute, Previmedical",
                      "Average private insurance cost approx. €1,000/year per person",
                    ],
                  },
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

              <div className="rounded-[20px] bg-blue-50 border border-blue-200 p-6">
                <p className="text-sm text-blue-800">
                  <strong>Tip for new arrivals:</strong> Get your codice fiscale (tax code) as your first step — you need it to register with the SSN, open a bank account, sign a rental contract, and almost everything else. Apply at any Agenzia delle Entrate office or Italian consulate before you arrive.
                </p>
              </div>
            </section>

            {/* BANKING */}
            <section id="banking">
              <div className="text-sm font-bold uppercase tracking-[0.3em] text-violet-500 mb-4">
                Banking & Finance
              </div>
              <h2 className="text-4xl font-black mb-8">Banking in Italy</h2>
              <p className="text-gray-600 text-lg mb-8">
                Opening a bank account in Italy requires your codice fiscale (tax code) and proof of residency. Italian banking is traditional in style but reliable. Many expats use digital banks like Revolut or N26 initially while setting up their Italian account.
              </p>

              <div className="grid gap-6 md:grid-cols-2 mb-8">
                {[
                  {
                    title: "What you'll need to open an account",
                    points: [
                      "Codice fiscale — your Italian tax identification number (get this first)",
                      "Valid passport or national ID",
                      "Proof of Italian address (rental contract or utility bill)",
                      "Residence permit (permesso di soggiorno) for non-EU nationals",
                      "Some banks may require proof of employment or income",
                      "Opening deposit varies by bank — typically €25–€100",
                    ],
                  },
                  {
                    title: "Popular banks for expats",
                    points: [
                      "Intesa Sanpaolo — Italy's largest bank, wide branch network",
                      "UniCredit — major international bank with good English support",
                      "Banca Mediolanum — popular with expats and remote workers",
                      "Fineco Bank — excellent online/app banking, low fees",
                      "N26 / Revolut — ideal while waiting for Italian account to open",
                      "Wise — recommended for international transfers and multi-currency needs",
                    ],
                  },
                ].map((card) => (
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
                <p className="text-sm text-blue-800">
                  <strong>Tip:</strong> Your codice fiscale is the single most important document in Italy — get it before you arrive if possible, through an Italian consulate in your home country. Without it, you cannot rent an apartment, open a bank account, or register with the healthcare system.
                </p>
              </div>
            </section>

            {/* PROS & CONS */}
            <section id="pros-cons">
              <div className="text-sm font-bold uppercase tracking-[0.3em] text-violet-500 mb-4">
                Summary
              </div>
              <h2 className="text-4xl font-black mb-8">Is Italy right for you?</h2>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-[24px] bg-green-50 border-2 border-green-200 p-8">
                  <h3 className="font-black text-xl text-green-800 mb-4">✅ Reasons to move to Italy</h3>
                  <ul className="space-y-3">
                    {[
                      "7% flat tax for retirees in Southern Italy — one of Europe's best",
                      "Impatriati regime: up to 90% income tax exemption for qualifying workers",
                      "€300,000 HNWI flat tax for ultra-high-net-worth individuals",
                      "World-class food, wine, art, and culture",
                      "Beautiful coastline, mountains, lakes, and countryside",
                      "Excellent public healthcare ranked among the world's best",
                      "Very affordable in Southern Italy and rural areas",
                      "Strong expat communities in Rome, Florence, Milan, and coastal areas",
                      "Pathway to EU residency and citizenship after 5–10 years",
                      "Extraordinary quality of life and relaxed pace",
                      "Southern Italy relocation grants of up to €30,000 available",
                    ].map((point) => (
                      <li key={point} className="flex gap-3 text-green-800">
                        <span className="mt-0.5">•</span>
                        <span className="text-sm">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-[24px] bg-red-50 border-2 border-red-200 p-8">
                  <h3 className="font-black text-xl text-red-800 mb-4">⚠️ Things to consider</h3>
                  <ul className="space-y-3">
                    {[
                      "Italian bureaucracy is notoriously complex and slow",
                      "Language barrier is significant outside major cities and tourist areas",
                      "Digital Nomad Visa has relatively high income (€32,400/year) and savings (€30,000) requirements",
                      "Elective Residency Visa requires high passive income (€31,000+/year) and strictly prohibits working",
                      "HNWI flat tax raised to €300,000 in January 2026 — less attractive than before",
                      "Healthcare quality varies significantly between North and South",
                      "Major cities (Milan, Rome, Florence) are expensive",
                      "Finding long-term rental accommodation can be challenging",
                      "Italy's economy and job market can be difficult for non-Italian speakers",
                    ].map((point) => (
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
              <h2 className="text-4xl font-black">Ready to make your move?</h2>
              <p className="mt-4 text-white/80 text-lg">
                Use our free tool to compare Italy with other European countries and find the best fit for your situation.
              </p>
              <Link
                href="/"
                className="mt-8 inline-block rounded-2xl bg-white px-8 py-4 text-sm font-bold text-violet-600 shadow-2xl transition hover:scale-105"
              >
                Compare all countries →
              </Link>
            </section>

          </div>

          {/* STICKY SIDE NAV */}
          <aside className="hidden xl:block w-56 shrink-0">
            <div className="sticky top-28">
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-4">
                On this page
              </div>
              <nav className="space-y-1">
                {sections.map((section) => (
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

      {/* FOOTER */}
      <Footer />

    </div>
  );
}