"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const sections = [
  { id: "visas", label: "Visas & Residency" },
  { id: "taxes", label: "Taxes" },
  { id: "cost-of-living", label: "Cost of Living" },
  { id: "healthcare", label: "Healthcare" },
  { id: "banking", label: "Banking & Finance" },
  { id: "pros-cons", label: "Is Bulgaria right for you?" },
];

export default function BulgariaPage() {
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
            backgroundImage: "url('/images/countries/bulgaria-hero.jpg')",
          }}
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative mx-auto max-w-7xl px-6 py-28 text-white">
          <div className="inline-flex rounded-full bg-orange-400 px-4 py-1 text-xs font-bold uppercase tracking-wide mb-6">
            Bulgaria
          </div>
          <h1 className="text-6xl font-black leading-none md:text-8xl">
            Move to Bulgaria
          </h1>
          <p className="mt-6 max-w-2xl text-xl text-white/80">
            Europe's most tax-efficient destination — a flat 10% income tax, rapidly growing expat communities, stunning nature, and a cost of living that goes further than almost anywhere else in the EU.
          </p>
          <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4 max-w-3xl">
            {[
              { label: "Flat income tax", value: "10%" },
              { label: "Cost of living", value: "From €700/mo" },
              { label: "EU member since", value: "2007" },
              { label: "Official language", value: "Bulgarian" },
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
              <h2 className="text-4xl font-black mb-8">How to move to Bulgaria</h2>
              <p className="text-gray-600 text-lg mb-8">
                EU/EEA citizens can move to Bulgaria freely and register their residency at the local municipality. Non-EU nationals have several routes available — Bulgaria launched its first official Digital Nomad Residence Permit in December 2025, and also offers long-stay visas for retirees, investors, and those with passive income.
              </p>

              <div className="space-y-6">
                {[
                  {
                    title: "Digital Nomad Residence Permit",
                    badge: "Remote workers & freelancers",
                    badgeColor: "bg-violet-100 text-violet-700",
                    points: [
                      "Bulgaria's brand new digital nomad programme — applications opened December 20, 2025",
                      "For non-EU nationals working remotely for employers or clients based outside the EU, EEA, and Switzerland",
                      "Minimum income requirement: €31,000/year (50x Bulgaria's minimum monthly wage)",
                      "Three eligible categories: employed remote workers, freelancers/contractors, and company owners working remotely",
                      "Process: apply for a Type D long-stay visa at a Bulgarian consulate, then apply for the residence permit after arriving in Bulgaria",
                      "Residence permit valid for 1 year, renewable once for a further year (maximum 2 years total)",
                      "Does not currently provide a direct pathway to permanent residency — must transition to another residency status",
                      "Processing time after arrival: 2–4 weeks for the residence permit, plus additional time for the identity card",
                      "Family members can be included under Bulgarian immigration regulations",
                    ],
                  },
                  {
                    title: "Long-Stay Type D Visa (Passive Income / Retirees)",
                    badge: "Retirees & passive income",
                    badgeColor: "bg-orange-100 text-orange-700",
                    points: [
                      "For non-EU nationals with sufficient passive income — pensions, rental income, dividends, or savings",
                      "Must demonstrate adequate financial means to support yourself without working in Bulgaria",
                      "Requires proof of accommodation, health insurance, and a clean criminal record",
                      "Initial visa valid for up to 1 year, extendable as a long-term residence permit",
                      "After 5 years of continuous legal residence, eligible for permanent residency",
                      "Bulgaria is increasingly popular with British retirees post-Brexit due to low costs and warm climate",
                    ],
                  },
                  {
                    title: "Investor Visa",
                    badge: "Investors",
                    badgeColor: "bg-yellow-100 text-yellow-700",
                    points: [
                      "For non-EU nationals making a qualifying investment in Bulgaria",
                      "Investment of BGN 1 million (~€510,000) in business projects or investment funds qualifies",
                      "Grants permanent residency upon approval — one of the fastest permanent residency routes in the EU",
                      "Eligible for Bulgarian citizenship after approximately 5 years",
                      "Bulgaria's investor programme is well-regarded and straightforward compared to many EU equivalents",
                    ],
                  },
                  {
                    title: "EU / EEA Citizens",
                    badge: "Free movement",
                    badgeColor: "bg-green-100 text-green-700",
                    points: [
                      "EU/EEA citizens have the right to live and work in Bulgaria without a visa",
                      "Must register at the local municipality within 3 months of arrival",
                      "Will receive a registration certificate confirming EU residency rights",
                      "After 5 years of continuous legal residence, eligible for permanent residency",
                      "No income or insurance requirements for EU citizens",
                    ],
                  },
                  {
                    title: "Student Visa",
                    badge: "Students",
                    badgeColor: "bg-blue-100 text-blue-700",
                    points: [
                      "For non-EU nationals enrolled at a recognised Bulgarian educational institution",
                      "Bulgaria has several well-regarded universities with English-taught programmes",
                      "Tuition fees are very affordable — typically €1,000–€5,000/year",
                      "Valid for the duration of the enrolled course",
                      "Part-time work permitted alongside studies",
                      "Pathway to convert to a work or residency permit after graduation",
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
                  <strong>Important:</strong> Bulgaria's Digital Nomad Residence Permit is brand new (launched December 2025) and procedures are still being established. Always verify current requirements with the Bulgarian Ministry of Interior or a qualified Bulgarian immigration lawyer before applying.
                </p>
              </div>
            </section>

            {/* TAXES */}
            <section id="taxes">
              <div className="text-sm font-bold uppercase tracking-[0.3em] text-violet-500 mb-4">
                Taxes
              </div>
              <h2 className="text-4xl font-black mb-8">Understanding tax in Bulgaria</h2>
              <p className="text-gray-600 text-lg mb-8">
                Bulgaria has the lowest flat income tax rate in the EU at just 10% — applied to all income regardless of how much you earn. There is also a flat 10% corporate tax rate, making Bulgaria extremely attractive for entrepreneurs and company owners. Bulgaria joined the Eurozone in January 2026, adopting the Euro as its currency.
              </p>

              {/* Key tax highlights */}
              <div className="rounded-[28px] bg-gradient-to-br from-violet-600 via-pink-500 to-orange-400 p-8 text-white mb-8">
                <h3 className="text-2xl font-black mb-2">10% Flat Tax — The Lowest in the EU</h3>
                <p className="text-white/80 mb-6">
                  Bulgaria's flat 10% income tax is unique in the EU — there are no brackets, no progressive rates, no complicated calculations. Whether you earn €20,000 or €200,000, you pay 10%. For high earners relocating from Western Europe, this is transformational.
                </p>
                <div className="grid gap-4 md:grid-cols-2">
                  {[
                    { label: "Personal income tax", value: "10% flat — on all income regardless of amount" },
                    { label: "Corporate tax", value: "10% flat — one of the lowest corporate rates in the EU" },
                    { label: "Dividend tax", value: "5% — very competitive for company owners" },
                    { label: "Capital gains tax", value: "10% on most gains — some exemptions apply" },
                  ].map((item) => (
                    <div key={item.label} className="rounded-2xl bg-white/15 p-4">
                      <div className="text-sm text-white/70">{item.label}</div>
                      <div className="mt-1 font-bold text-sm">{item.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="rounded-[20px] bg-[#f8f7ff] p-6">
                  <h4 className="font-black text-lg mb-3">Tax treatment for Digital Nomad Permit holders</h4>
                  <ul className="space-y-2 text-gray-600">
                    {[
                      "If you spend more than 183 days per year in Bulgaria, you become a Bulgarian tax resident",
                      "As a Bulgarian tax resident, your worldwide income is subject to the 10% flat tax",
                      "Income earned from foreign sources and already taxed abroad may be subject to double taxation treaty relief",
                      "Bulgaria has double taxation treaties with over 70 countries",
                      "Digital Nomad Permit holders who spend less than 183 days per year in Bulgaria may not be considered tax residents",
                      "Tax residency rules are complex — always consult a qualified Bulgarian tax adviser",
                    ].map((point) => (
                      <li key={point} className="flex gap-3">
                        <span className="text-violet-500 mt-0.5">✓</span>
                        <span className="text-sm">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-[20px] bg-[#f8f7ff] p-6">
                  <h4 className="font-black text-lg mb-3">How Bulgaria compares to other EU countries</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-gray-600">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-2 font-bold text-[#0B1957]">Country</th>
                          <th className="text-left py-2 font-bold text-[#0B1957]">Top income tax rate</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          ["Bulgaria", "10% (flat)"],
                          ["Malta", "35% (max)"],
                          ["Portugal", "48% (max)"],
                          ["Spain", "47% (max)"],
                          ["Italy", "43% (max)"],
                          ["Germany", "45% (max)"],
                          ["France", "45% (max)"],
                        ].map(([country, rate]) => (
                          <tr key={country} className={`border-b border-gray-100 ${country === "Bulgaria" ? "bg-violet-50 font-bold" : ""}`}>
                            <td className="py-2">{country}</td>
                            <td className="py-2 font-semibold">{rate}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div className="rounded-[20px] bg-amber-50 border border-amber-200 p-6">
                <p className="text-sm text-amber-800">
                  <strong>Tax advice disclaimer:</strong> Bulgaria adopted the Euro in January 2026 and its tax landscape is evolving. Always consult a qualified Bulgarian tax adviser before making any decisions. The IMF has recommended Bulgaria consider progressive taxation in future, so monitor any legislative changes.
                </p>
              </div>
            </section>

            {/* COST OF LIVING */}
            <section id="cost-of-living">
              <div className="text-sm font-bold uppercase tracking-[0.3em] text-violet-500 mb-4">
                Cost of Living
              </div>
              <h2 className="text-4xl font-black mb-8">What does life in Bulgaria cost?</h2>
              <p className="text-gray-600 text-lg mb-8">
                Bulgaria remains one of the most affordable countries in the EU — though prices in Sofia have risen significantly since Euro adoption in January 2026. A single person can live comfortably on €700–€1,200/month depending on the city. For expats earning Western salaries, Bulgaria offers an exceptional quality-to-cost ratio.
              </p>

              <div className="rounded-[20px] bg-amber-50 border border-amber-200 p-5 mb-8">
                <p className="text-sm text-amber-800">
                  <strong>Euro adoption note:</strong> Bulgaria adopted the Euro in January 2026. Early reports suggest prices rose 20–50% in some categories following adoption — particularly in Sofia. Verify current prices locally as the market adjusts.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-3 mb-8">
                {[
                  {
                    city: "Sofia",
                    level: "Most expensive",
                    color: "border-red-200 bg-red-50",
                    badge: "bg-red-100 text-red-700",
                    items: [
                      "1-bed apartment (centre): €500–€900/mo",
                      "Single person budget: €1,000–€1,500/mo",
                      "Best for careers & city life",
                    ],
                  },
                  {
                    city: "Plovdiv & Varna",
                    level: "Mid-range",
                    color: "border-yellow-200 bg-yellow-50",
                    badge: "bg-yellow-100 text-yellow-700",
                    items: [
                      "1-bed apartment (centre): €350–€600/mo",
                      "Single person budget: €800–€1,200/mo",
                      "Great lifestyle at lower cost",
                    ],
                  },
                  {
                    city: "Bansko & smaller towns",
                    level: "Most affordable",
                    color: "border-green-200 bg-green-50",
                    badge: "bg-green-100 text-green-700",
                    items: [
                      "1-bed apartment: €200–€400/mo",
                      "Single person budget: €600–€900/mo",
                      "Popular with digital nomads",
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
                <h3 className="font-black text-xl mb-6">Typical monthly expenses in Sofia</h3>
                <div className="space-y-3">
                  {[
                    ["Rent (1-bed, city centre)", "€500 – €900"],
                    ["Utilities (electricity, heating, water)", "€60 – €150"],
                    ["Internet (fibre)", "€10 – €20"],
                    ["Groceries", "€150 – €300"],
                    ["Dining out (mid-range)", "€100 – €200"],
                    ["Public transport pass", "€25 – €35"],
                    ["Private health insurance", "€50 – €150"],
                    ["Gym membership", "€20 – €40"],
                    ["Mobile plan", "€10 – €20"],
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
                  <strong>Bansko tip:</strong> Bansko has become one of Europe's most popular digital nomad destinations — a mountain ski resort town with fast fibre internet, a thriving international community, very affordable rents, and stunning scenery. If you work remotely and love the outdoors, it's worth serious consideration.
                </p>
              </div>
            </section>

            {/* HEALTHCARE */}
            <section id="healthcare">
              <div className="text-sm font-bold uppercase tracking-[0.3em] text-violet-500 mb-4">
                Healthcare
              </div>
              <h2 className="text-4xl font-black mb-8">Healthcare in Bulgaria</h2>
              <p className="text-gray-600 text-lg mb-8">
                Bulgaria has a public healthcare system funded by mandatory health insurance contributions. While the system covers essential care, most expats opt for private health insurance for better access, shorter waiting times, and English-speaking doctors. Private healthcare in Bulgaria is very affordable by Western standards.
              </p>

              <div className="grid gap-6 md:grid-cols-2 mb-8">
                {[
                  {
                    icon: "🏥",
                    title: "Public Healthcare",
                    points: [
                      "Available to all legal residents who contribute to the National Health Insurance Fund (NHIF)",
                      "Contributions are approx. 8% of salary, shared between employer and employee",
                      "Self-employed and nomad permit holders must pay contributions independently",
                      "Covers GP visits, hospital care, maternity, and emergency services",
                      "Dental care is mostly private",
                      "Quality varies significantly — Sofia and larger cities have better facilities",
                      "Long waiting times for specialist care are common",
                      "EU citizens can use their EHIC for emergency treatment",
                      "Emergency number: 112",
                    ],
                  },
                  {
                    icon: "💊",
                    title: "Private Health Insurance",
                    points: [
                      "Required for Digital Nomad Permit and most long-stay visa applications",
                      "Very affordable — typically €50–€150/month per person",
                      "A private GP visit costs just €29–€57 out of pocket — even without insurance",
                      "Provides faster access, English-speaking doctors, and better facilities",
                      "Many international insurers offer comprehensive Bulgaria coverage",
                      "Popular providers: Allianz, Bupa International, AXA, local provider DZI",
                      "Most expats and digital nomads use private insurance exclusively",
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
                  <strong>Tip:</strong> Private healthcare in Bulgaria is genuinely affordable. A specialist consultation typically costs €30–€80 privately — far less than in Western Europe. Many expats skip insurance entirely for routine care and pay out of pocket, reserving insurance for major incidents.
                </p>
              </div>
            </section>

            {/* BANKING */}
            <section id="banking">
              <div className="text-sm font-bold uppercase tracking-[0.3em] text-violet-500 mb-4">
                Banking & Finance
              </div>
              <h2 className="text-4xl font-black mb-8">Banking in Bulgaria</h2>
              <p className="text-gray-600 text-lg mb-8">
                Bulgaria adopted the Euro in January 2026, replacing the Bulgarian Lev (BGN). Banking is straightforward for residents, with several major international banks operating alongside local institutions. As an EU member, Bulgaria's banking system is regulated under EU financial standards.
              </p>

              <div className="rounded-[20px] bg-blue-50 border border-blue-200 p-5 mb-8">
                <p className="text-sm text-blue-800">
                  <strong>Euro adoption (January 2026):</strong> Bulgaria now uses the Euro. All prices, salaries, and bank accounts are denominated in EUR. This simplifies banking for expats from the Eurozone significantly.
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-2 mb-8">
                {[
                  {
                    title: "What you'll need to open an account",
                    points: [
                      "Valid passport or national ID",
                      "Proof of Bulgarian address (rental contract)",
                      "Residence permit or registration certificate",
                      "Bulgarian personal identification number (EGN or LNC for foreigners)",
                      "Proof of income or employment may be required by some banks",
                      "Opening deposit typically €50–€200",
                    ],
                  },
                  {
                    title: "Banks operating in Bulgaria",
                    points: [
                      "UniCredit Bulbank — largest bank in Bulgaria, good international support",
                      "DSK Bank — very popular with residents, wide branch network",
                      "Fibank (First Investment Bank) — popular with expats",
                      "OTP Bank Bulgaria — strong retail banking",
                      "Revolut / Wise — widely used by expats and digital nomads for day-to-day banking",
                      "Use Revolut or Wise while setting up your Bulgarian account",
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
                  <strong>Tip:</strong> Get a Revolut or Wise account before you move — it lets you spend in euros immediately while you set up your Bulgarian bank account, which can take a few weeks for non-EU residents.
                </p>
              </div>
            </section>

            {/* PROS & CONS */}
            <section id="pros-cons">
              <div className="text-sm font-bold uppercase tracking-[0.3em] text-violet-500 mb-4">
                Summary
              </div>
              <h2 className="text-4xl font-black mb-8">Is Bulgaria right for you?</h2>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-[24px] bg-green-50 border-2 border-green-200 p-8">
                  <h3 className="font-black text-xl text-green-800 mb-4">✅ Reasons to move to Bulgaria</h3>
                  <ul className="space-y-3">
                    {[
                      "Lowest flat income tax in the EU — just 10% on all income",
                      "10% corporate tax — very attractive for entrepreneurs and company owners",
                      "One of the most affordable countries in the EU",
                      "Brand new Digital Nomad Residence Permit (December 2025)",
                      "EU member state — pathway to EU residency and citizenship",
                      "Full Schengen member since March 2024 — visa-free travel across Europe",
                      "Now uses the Euro — no currency risk for Eurozone earners",
                      "Bansko is one of Europe's top digital nomad hubs",
                      "Beautiful nature — mountains, Black Sea coast, national parks",
                      "Growing and welcoming expat communities in Sofia, Plovdiv and Bansko",
                      "Very affordable private healthcare",
                      "Fast and affordable internet infrastructure",
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
                      "Euro adoption (January 2026) has caused significant price rises — especially in Sofia",
                      "Digital Nomad Permit is brand new — procedures still being established",
                      "Permit only valid for 2 years maximum with no direct permanent residency pathway",
                      "Bulgarian language uses Cyrillic script — a significant learning curve",
                      "English is not widely spoken outside major cities and tourist areas",
                      "Public healthcare quality is variable — private insurance strongly recommended",
                      "Bureaucracy can be slow and complex",
                      "Infrastructure outside major cities can be poor",
                      "Corruption remains a concern in some areas of public life",
                      "Winters in Sofia can be cold and grey",
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
                Use our free tool to compare Bulgaria with other European countries and find the best fit for your situation.
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
      <footer className="bg-[#0B1957] px-6 py-12 text-center text-sm text-white/50">
        <div className="text-2xl font-black">
          <span className="bg-gradient-to-r from-violet-400 via-pink-400 to-orange-300 bg-clip-text text-transparent">
            Relocate2Day
          </span>
        </div>
        <p className="mt-4">© {new Date().getFullYear()} Relocate2Day. All rights reserved.</p>
        <div className="mt-3 flex justify-center gap-6">
          <a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="/terms" className="hover:text-white transition-colors">Terms of Service</a>
        </div>
        <p className="mt-2 text-white/30 text-xs">
          This guide is for informational purposes only and does not constitute legal, tax or financial advice. Always consult a qualified professional.
        </p>
      </footer>

    </div>
  );
}