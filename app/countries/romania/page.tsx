"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { useState, useEffect } from "react";

const sections = [
  { id: "visas", label: "Visas & Residency" },
  { id: "taxes", label: "Taxes" },
  { id: "cost-of-living", label: "Cost of Living" },
  { id: "healthcare", label: "Healthcare" },
  { id: "banking", label: "Banking & Finance" },
  { id: "pros-cons", label: "Is Romania right for you?" },
];

export default function RomaniaPage() {
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
      <Navbar variant="content" backHref="/" backLabel="← Back to all countries" />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/countries/romania-hero.jpg')" }}
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative mx-auto max-w-7xl px-6 py-28 text-white">
          <div className="inline-flex rounded-full bg-orange-400 px-4 py-1 text-xs font-bold uppercase tracking-wide mb-6">
            Romania
          </div>
          <h1 className="text-6xl font-black leading-none md:text-8xl">
            Move to Romania
          </h1>
          <p className="mt-6 max-w-2xl text-xl text-white/80">
            Europe's best-kept secret — a flat 10% income tax, world-class internet speeds, medieval castles, and a cost of living that lets your money go twice as far as in Western Europe.
          </p>
          <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4 max-w-3xl">
            {[
              { label: "Flat income tax", value: "10%" },
              { label: "Cost of living", value: "From €800/mo" },
              { label: "EU member since", value: "2007" },
              { label: "Schengen member", value: "Since 2025" },
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
              <h2 className="text-4xl font-black mb-8">How to move to Romania</h2>
              <p className="text-gray-600 text-lg mb-8">
                EU/EEA citizens can move to Romania freely — no visa required, just register with the local authorities if staying more than 3 months. Non-EU nationals need a long-stay Type D visa before arriving, followed by a residence permit. Romania joined Schengen in 2025, making its residence permit one of the most valuable in Eastern Europe.
              </p>

              <div className="space-y-6">
                {[
                  {
                    title: "EU / EEA Citizens",
                    badge: "Free movement",
                    badgeColor: "bg-green-100 text-green-700",
                    points: [
                      "EU/EEA citizens have the right to live and work in Romania without a visa",
                      "Register with the General Inspectorate for Immigration (IGI) if staying more than 3 months",
                      "Provide proof of purpose of stay — employment contract, student enrolment, or proof of sufficient funds",
                      "Receive a Registration Certificate, typically valid for up to 5 years",
                      "After 5 years of continuous legal residence, eligible for permanent residency",
                      "No income or insurance requirements for EU citizens",
                      "Romania's Schengen membership (since 2025) means your Romanian residence permit allows travel across the Schengen area",
                    ],
                  },
                  {
                    title: "Digital Nomad Visa",
                    badge: "Remote workers & freelancers",
                    badgeColor: "bg-violet-100 text-violet-700",
                    points: [
                      "For non-EU nationals working remotely for employers or clients based outside Romania",
                      "Minimum income requirement: approximately €4,100/month (3x Romania's national gross average salary)",
                      "Apply at a Romanian consulate or embassy in your home country for a Type D long-stay visa",
                      "Once in Romania, apply for a residence permit at the IGI",
                      "Residence permit valid for 1 year, renewable",
                      "Tax residency applies if you spend more than 183 days per year in Romania — 10% flat tax on worldwide income",
                      "Family members can be included under family reunification provisions",
                    ],
                  },
                  {
                    title: "Long-Stay Type D Visa (Passive Income / Retirees)",
                    badge: "Retirees & passive income",
                    badgeColor: "bg-orange-100 text-orange-700",
                    points: [
                      "For non-EU nationals with sufficient passive income — pensions, rental income, dividends, or savings",
                      "Must demonstrate adequate financial means to support yourself without working in Romania",
                      "Apply at a Romanian consulate — visa issued within approximately 2 months",
                      "Initial visa valid for 90 days; apply for residence permit at IGI upon arrival",
                      "Residence permit typically issued for 1 year, renewable annually",
                      "After 5 years of continuous legal residence, eligible for permanent residency",
                      "Romania's low flat 10% tax makes it attractive for retirees receiving foreign pensions",
                    ],
                  },
                  {
                    title: "Employment Visa",
                    badge: "Employees",
                    badgeColor: "bg-blue-100 text-blue-700",
                    points: [
                      "For non-EU nationals relocating to work for a Romanian employer",
                      "Employer must obtain a work permit on your behalf before you apply for the visa",
                      "Apply for a Type D long-stay visa at a Romanian consulate with the work permit",
                      "Residence permit issued for the duration of the employment contract, up to 1 year initially",
                      "Renewable annually as long as employment continues",
                      "Romania's growing tech sector in Bucharest and Cluj-Napoca is increasingly attracting international talent",
                    ],
                  },
                  {
                    title: "Investor & Business Visa",
                    badge: "Entrepreneurs & investors",
                    badgeColor: "bg-yellow-100 text-yellow-700",
                    points: [
                      "For non-EU nationals establishing or investing in a Romanian business",
                      "Must demonstrate a viable business plan and sufficient investment capital",
                      "Romania's micro-enterprise tax regime (1% corporate tax on turnover up to certain thresholds) is highly attractive for entrepreneurs",
                      "Pathway to permanent residency after 5 years",
                      "Romania's EU membership and Schengen access make it a strategic base for business across Europe",
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
                  <strong>Important:</strong> Romanian immigration procedures can be slow and documentation-heavy. Always start the visa process well in advance and consult a qualified Romanian immigration lawyer for your specific situation. Verify all current requirements with the General Inspectorate for Immigration (igi.mai.gov.ro/en/).
                </p>
              </div>
            </section>

            {/* TAXES */}
            <section id="taxes">
              <div className="text-sm font-bold uppercase tracking-[0.3em] text-violet-500 mb-4">
                Taxes
              </div>
              <h2 className="text-4xl font-black mb-8">Understanding tax in Romania</h2>
              <p className="text-gray-600 text-lg mb-8">
                Romania has one of the most attractive tax systems in the EU — a flat 10% personal income tax rate, tied with Bulgaria as the lowest in the bloc. For entrepreneurs, the micro-enterprise regime offers corporate tax as low as 1% on turnover. The main consideration for employees is the high social contributions (35% of gross salary), but for high earners the overall burden remains very competitive.
              </p>

              {/* Key tax highlights */}
              <div className="rounded-[28px] bg-gradient-to-br from-violet-600 via-pink-500 to-orange-400 p-8 text-white mb-8">
                <h3 className="text-2xl font-black mb-2">10% Flat Tax — Tied for Lowest in the EU</h3>
                <p className="text-white/80 mb-6">
                  Romania's flat 10% income tax means a €100,000 earner pays the same rate as someone earning €20,000. No brackets, no complexity. For high earners relocating from Western Europe, this is transformational.
                </p>
                <div className="grid gap-4 md:grid-cols-2">
                  {[
                    { label: "Personal income tax", value: "10% flat — on all income" },
                    { label: "Corporate tax (standard)", value: "16%" },
                    { label: "Micro-enterprise tax", value: "1% on turnover (qualifying businesses)" },
                    { label: "Dividend tax", value: "16% (increased from 10% in 2026)" },
                    { label: "Capital gains tax", value: "16% (increased from 10% in 2026)" },
                    { label: "VAT (standard)", value: "19%" },
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
                  <h4 className="font-black text-lg mb-3">Social contributions — what employees pay</h4>
                  <ul className="space-y-2 text-gray-600">
                    {[
                      "CAS (pension insurance): 25% of gross salary — paid by employee",
                      "CASS (health insurance): 10% of gross salary — paid by employee",
                      "Total employee social contributions: 35% of gross salary",
                      "Income tax of 10% is applied after deducting social contributions",
                      "Effective take-home on €40,000 gross: approximately 58.5% (€23,400)",
                      "Self-employed and freelancers must pay social contributions independently",
                      "Tax residency applies if you spend more than 183 days per year in Romania",
                      "Romania has double taxation treaties with over 80 countries",
                    ].map((point) => (
                      <li key={point} className="flex gap-3">
                        <span className="text-violet-500 mt-0.5">✓</span>
                        <span className="text-sm">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-[20px] bg-[#f8f7ff] p-6">
                  <h4 className="font-black text-lg mb-3">How Romania compares to other EU countries</h4>
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
                          ["Romania", "10% (flat)"],
                          ["Bulgaria", "10% (flat)"],
                          ["Malta", "35% (max)"],
                          ["Portugal", "48% (max)"],
                          ["Spain", "47% (max)"],
                          ["Italy", "43% (max)"],
                          ["Netherlands", "49.5% (max)"],
                        ].map(([country, rate]) => (
                          <tr key={country} className={`border-b border-gray-100 ${country === "Romania" ? "bg-violet-50 font-bold" : ""}`}>
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
                  <strong>Tax advice disclaimer:</strong> Romania's 2026 tax reform increased dividend and capital gains tax from 10% to 16%. Tax laws change frequently — always consult a qualified Romanian tax adviser before making decisions. File through Romania's ANAF portal (anaf.ro) for digital submission.
                </p>
              </div>
            </section>

            {/* COST OF LIVING */}
            <section id="cost-of-living">
              <div className="text-sm font-bold uppercase tracking-[0.3em] text-violet-500 mb-4">
                Cost of Living
              </div>
              <h2 className="text-4xl font-black mb-8">What does life in Romania cost?</h2>
              <p className="text-gray-600 text-lg mb-8">
                Romania offers exceptional value for expats earning Western salaries. A comfortable lifestyle in Bucharest costs around €1,000–€1,500/month, while smaller cities like Cluj-Napoca, Timișoara, and Iași are even more affordable. Internet speeds average 200+ Mbps for under €15/month — making Romania a top choice for remote workers.
              </p>

              <div className="grid gap-4 md:grid-cols-3 mb-8">
                {[
                  {
                    city: "Bucharest",
                    level: "Most expensive",
                    color: "border-red-200 bg-red-50",
                    badge: "bg-red-100 text-red-700",
                    items: [
                      "1-bed apartment (centre): €450–€700/mo",
                      "Single person budget: €1,000–€1,500/mo",
                      "Best for careers, nightlife & city life",
                    ],
                  },
                  {
                    city: "Cluj-Napoca & Timișoara",
                    level: "Mid-range",
                    color: "border-yellow-200 bg-yellow-50",
                    badge: "bg-yellow-100 text-yellow-700",
                    items: [
                      "1-bed apartment (centre): €350–€550/mo",
                      "Single person budget: €800–€1,200/mo",
                      "Vibrant tech & student scenes",
                    ],
                  },
                  {
                    city: "Iași, Brașov & smaller cities",
                    level: "Most affordable",
                    color: "border-green-200 bg-green-50",
                    badge: "bg-green-100 text-green-700",
                    items: [
                      "1-bed apartment: €250–€400/mo",
                      "Single person budget: €600–€900/mo",
                      "Beautiful scenery, lower costs",
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
                <h3 className="font-black text-xl mb-6">Typical monthly expenses in Bucharest</h3>
                <div className="space-y-3">
                  {[
                    ["Rent (1-bed, city centre)", "€450 – €700"],
                    ["Utilities (electricity, heating, water)", "€80 – €150"],
                    ["Internet (fibre, 1Gbps)", "€10 – €15"],
                    ["Groceries", "€200 – €350"],
                    ["Dining out (mid-range)", "€100 – €200"],
                    ["Public transport pass", "€10 – €20"],
                    ["Private health insurance", "€30 – €100"],
                    ["Gym membership", "€20 – €40"],
                    ["Mobile plan", "€5 – €15"],
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
                  <strong>Internet tip:</strong> Romania consistently ranks among the top 5 countries in the world for internet speed — with average home connections of 200+ Mbps available for under €15/month. For remote workers, this is a major advantage over many Western European countries.
                </p>
              </div>
            </section>

            {/* HEALTHCARE */}
            <section id="healthcare">
              <div className="text-sm font-bold uppercase tracking-[0.3em] text-violet-500 mb-4">
                Healthcare
              </div>
              <h2 className="text-4xl font-black mb-8">Healthcare in Romania</h2>
              <p className="text-gray-600 text-lg mb-8">
                Romania has a public healthcare system funded through mandatory CASS contributions (10% of salary). While public healthcare is available to all legal residents, most expats opt for private health insurance for better access, English-speaking doctors, and shorter waiting times. Private healthcare in Romania is very affordable by Western standards.
              </p>

              <div className="grid gap-6 md:grid-cols-2 mb-8">
                {[
                  {
                    icon: "🏥",
                    title: "Public Healthcare",
                    points: [
                      "Available to all legal residents who contribute to the national health system (CASS)",
                      "Free at point of use for registered contributors",
                      "Quality varies significantly — Bucharest and Cluj-Napoca have the best facilities",
                      "Long waiting times for specialist appointments are common",
                      "Emergency care is available to all — dial 112",
                      "EU citizens can use their EHIC for emergency treatment",
                      "Dental care is mostly private",
                      "English-speaking doctors more readily available in major cities",
                    ],
                  },
                  {
                    icon: "💊",
                    title: "Private Health Insurance",
                    points: [
                      "Very affordable — typically €30–€100/month per person",
                      "Provides faster access, English-speaking doctors, and better facilities",
                      "Required for Digital Nomad Visa and most long-stay visa applications",
                      "A private GP visit costs approximately €20–€50 without insurance",
                      "Specialist consultations typically €30–€80 privately",
                      "Popular international providers: Allianz, Bupa, Cigna, AXA",
                      "Local Romanian providers are also available at lower cost",
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
                  <strong>Tip:</strong> Private healthcare in Romania is genuinely affordable. Many expats skip insurance entirely for routine care and pay out of pocket — a GP visit for €20–€50 and a specialist for €30–€80 makes this a realistic option, reserving insurance for major incidents only.
                </p>
              </div>
            </section>

            {/* BANKING */}
            <section id="banking">
              <div className="text-sm font-bold uppercase tracking-[0.3em] text-violet-500 mb-4">
                Banking & Finance
              </div>
              <h2 className="text-4xl font-black mb-8">Banking in Romania</h2>
              <p className="text-gray-600 text-lg mb-8">
                Romania uses the Romanian Leu (RON) — it has not adopted the Euro, though Euro adoption is planned for the future. Banking is straightforward for residents, with several major international banks operating alongside local institutions. Revolut and Wise are widely used by expats for day-to-day spending while setting up a local account.
              </p>

              <div className="rounded-[20px] bg-amber-50 border border-amber-200 p-5 mb-8">
                <p className="text-sm text-amber-800">
                  <strong>Currency note:</strong> Romania still uses the Romanian Leu (RON). The Leu is a relatively closed currency — it's generally easier and more cost-effective to exchange money after arriving in Romania, or to use a card with low foreign transaction fees such as Revolut or Wise.
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-2 mb-8">
                {[
                  {
                    title: "What you'll need to open an account",
                    points: [
                      "Valid passport or national ID",
                      "Proof of Romanian address (rental contract or utility bill)",
                      "Residence permit or registration certificate",
                      "Romanian tax identification number (CIF/CNP) — obtain from ANAF",
                      "Proof of income may be required by some banks",
                      "Opening deposit typically €50–€200",
                      "Some banks offer English-language service in major cities",
                    ],
                  },
                  {
                    title: "Banks operating in Romania",
                    points: [
                      "Banca Transilvania — largest Romanian bank, wide branch network",
                      "BCR (Erste Group) — popular with expats, strong digital banking",
                      "BRD (Société Générale) — reliable retail banking",
                      "ING Romania — excellent app and English-language service",
                      "Raiffeisen Bank — strong international support",
                      "Revolut / Wise — widely used by expats and digital nomads for day-to-day spending",
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
                  <strong>Tip:</strong> Get a Revolut or Wise account before you move — it lets you spend in RON immediately at the real exchange rate while you set up your Romanian bank account. ING Romania is particularly popular with expats for its English-language app and straightforward account opening process.
                </p>
              </div>
            </section>

            {/* PROS & CONS */}
            <section id="pros-cons">
              <div className="text-sm font-bold uppercase tracking-[0.3em] text-violet-500 mb-4">
                Summary
              </div>
              <h2 className="text-4xl font-black mb-8">Is Romania right for you?</h2>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-[24px] bg-green-50 border-2 border-green-200 p-8">
                  <h3 className="font-black text-xl text-green-800 mb-4">✅ Reasons to move to Romania</h3>
                  <ul className="space-y-3">
                    {[
                      "Flat 10% income tax — tied for the lowest in the EU with Bulgaria",
                      "Micro-enterprise corporate tax as low as 1% on turnover",
                      "World-class internet speeds (200+ Mbps) for under €15/month",
                      "Extremely affordable cost of living — comfortable life from €800/mo",
                      "EU member since 2007 — full freedom of movement and rights",
                      "Schengen member since 2025 — visa-free travel across Europe",
                      "Growing tech and startup scene — Bucharest and Cluj-Napoca are major hubs",
                      "Beautiful medieval cities, castles, mountains, and Black Sea coast",
                      "Very affordable private healthcare (€30–€100/month)",
                      "English widely spoken among younger generations and in major cities",
                      "Digital Nomad Visa available for qualifying remote workers",
                      "Low crime rates in major cities — generally safe for expats",
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
                      "High social contributions (35% of gross salary) reduce take-home pay",
                      "Dividend and capital gains tax increased from 10% to 16% in 2026",
                      "Bureaucracy is slow and complex — immigration paperwork can be challenging",
                      "Romanian language is essential for full integration",
                      "Public healthcare quality is variable — private insurance strongly recommended",
                      "Infrastructure outside major cities can be poor — road quality is mixed",
                      "Romania still uses the Leu (RON) — not yet on the Euro",
                      "Corruption remains a concern in some areas of public life",
                      "Limited local job opportunities for non-Romanian speakers",
                      "Winters in Bucharest can be cold — temperatures regularly below freezing",
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
                Use our free tool to compare Romania with other European countries and find the best fit for your situation.
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
