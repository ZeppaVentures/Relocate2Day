"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const sections = [
  { id: "visas", label: "Visas & Residency" },
  { id: "taxes", label: "Taxes" },
  { id: "cost-of-living", label: "Cost of Living" },
  { id: "healthcare", label: "Healthcare" },
  { id: "banking", label: "Banking & Finance" },
  { id: "pros-cons", label: "Is Portugal right for you?" },
];

export default function PortugalPage() {
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
            backgroundImage:
              "url('https://images.unsplash.com/photo-1513735492246-483525079686?q=80&w=2000&auto=format&fit=crop')",
          }}
        />
        <div className="absolute inset-0 bg-black/25" />
        <div className="relative mx-auto max-w-7xl px-6 py-28 text-white">
          <div className="inline-flex rounded-full bg-orange-400 px-4 py-1 text-xs font-bold uppercase tracking-wide mb-6">
            Portugal
          </div>
          <h1 className="text-6xl font-black leading-none md:text-8xl">
            Move to Portugal
          </h1>
          <p className="mt-6 max-w-2xl text-xl text-white/80">
            Affordable living, friendly locals, world-class food and wine, and one of the most welcoming countries in Europe for newcomers. Here's everything you need to know.
          </p>
          <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4 max-w-3xl">
            {[
              { label: "Cost of living", value: "From €900/mo" },
              { label: "IFICI flat tax", value: "20%" },
              { label: "Climate", value: "300+ sunny days" },
              { label: "Official language", value: "Portuguese" },
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
              <h2 className="text-4xl font-black mb-8">How to move to Portugal</h2>
              <p className="text-gray-600 text-lg mb-8">
                EU/EEA citizens can move to Portugal freely and simply need to register their residency. Non-EU nationals have several excellent visa routes depending on their situation — whether they have passive income, work remotely, want to invest, or are students.
              </p>

              <div className="space-y-6">
                {[
                  {
                    title: "D7 Passive Income Visa",
                    badge: "Retirees & passive income",
                    badgeColor: "bg-orange-100 text-orange-700",
                    points: [
                      "For non-EU nationals with stable passive income — pensions, rental income, dividends, or investments",
                      "Minimum income requirement: approx. €760/month (the Portuguese minimum wage) for the main applicant",
                      "Add 50% for a spouse/partner and 30% per dependent child",
                      "Must show proof of savings of approx. €10,440 per applicant",
                      "Requires private health insurance valid in Portugal",
                      "Initial 2-year residence permit, renewable for 3-year periods",
                      "Pathway to permanent residency after 5 years and citizenship after 5 years",
                      "Does not permit employment in Portugal — passive income only",
                    ],
                  },
                  {
                    title: "D8 Digital Nomad Visa",
                    badge: "Remote workers & freelancers",
                    badgeColor: "bg-violet-100 text-violet-700",
                    points: [
                      "For non-EU nationals working remotely for employers or clients based outside Portugal",
                      "Minimum income requirement: €3,680/month (4x Portugal's minimum wage)",
                      "Add 50% for a spouse/partner and 30% per dependent child",
                      "Valid for up to 1 year initially, renewable as a residence permit",
                      "Pathway to permanent residency after 5 years",
                      "Family members can join after 2 years of legal residence",
                      "Requires a NIF number and a Portuguese bank account as part of the application",
                      "One of the most popular digital nomad visas in Europe",
                    ],
                  },
                  {
                    title: "Golden Visa",
                    badge: "Investors",
                    badgeColor: "bg-yellow-100 text-yellow-700",
                    points: [
                      "Portugal's investment residency programme — available via investment funds, cultural donations, or research activities",
                      "Note: the real estate route was eliminated in 2023 and is no longer available",
                      "Minimum investment: approx. €500,000 in qualifying investment funds",
                      "Only 7 days per year in Portugal required to maintain the permit",
                      "Pathway to permanent residency after 5 years and citizenship after 5 years",
                      "Popular with investors who want EU residency without full relocation",
                    ],
                  },
                  {
                    title: "Student Visa (D4)",
                    badge: "Students",
                    badgeColor: "bg-blue-100 text-blue-700",
                    points: [
                      "For non-EU nationals enrolled at a recognised Portuguese educational institution",
                      "Valid for the duration of the course",
                      "Permits part-time work alongside studies",
                      "Portugal has excellent universities and an affordable cost of living for students",
                      "Pathway to convert to a work permit after graduation",
                      "EU students can study freely without a visa",
                    ],
                  },
                  {
                    title: "EU / EEA Citizens",
                    badge: "Free movement",
                    badgeColor: "bg-green-100 text-green-700",
                    points: [
                      "EU/EEA citizens have the right to live and work in Portugal without a visa",
                      "Must register at the local Câmara Municipal (town hall) within 3 months of arrival",
                      "Will receive a registration certificate confirming EU residency rights",
                      "After 5 years of continuous legal residence, eligible for permanent residency",
                      "No income or insurance requirements for EU citizens",
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
                  <strong>Important:</strong> Portugal's immigration agency (AIMA) is known for long processing times — sometimes 6–12 months for residency appointments. Apply as early as possible and consider using an immigration lawyer to avoid delays. Always verify current requirements before applying.
                </p>
              </div>
            </section>

            {/* TAXES */}
            <section id="taxes">
              <div className="text-sm font-bold uppercase tracking-[0.3em] text-violet-500 mb-4">
                Taxes
              </div>
              <h2 className="text-4xl font-black mb-8">Understanding tax in Portugal</h2>
              <p className="text-gray-600 text-lg mb-8">
                Portugal's standard income tax is progressive, ranging from 14.5% to 48%. However, qualifying newcomers may benefit from the IFICI regime (also known as NHR 2.0), which offers a significant flat tax rate for up to 10 years.
              </p>

              {/* NHR / IFICI */}
              <div className="rounded-[28px] bg-gradient-to-br from-violet-600 via-pink-500 to-orange-400 p-8 text-white mb-8">
                <h3 className="text-2xl font-black mb-2">IFICI — Portugal's New Tax Incentive (NHR 2.0)</h3>
                <p className="text-white/80 mb-6">
                  The original Non-Habitual Resident (NHR) regime ended in 2024. It has been replaced by the IFICI (Incentivo Fiscal à Investigação Científica e Inovação), which offers a flat 20% tax rate on qualifying Portuguese income for up to 10 years.
                </p>
                <div className="grid gap-4 md:grid-cols-2">
                  {[
                    { label: "Flat tax rate", value: "20% on qualifying Portuguese income" },
                    { label: "Duration", value: "Up to 10 years" },
                    { label: "Who qualifies", value: "Highly qualified professionals in tech, R&D, healthcare, higher education, and manufacturing" },
                    { label: "Foreign income", value: "May be exempt or taxed at reduced rates depending on type and origin" },
                  ].map((item) => (
                    <div key={item.label} className="rounded-2xl bg-white/15 p-4">
                      <div className="text-sm text-white/70">{item.label}</div>
                      <div className="mt-1 font-bold text-sm">{item.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="rounded-[20px] bg-amber-50 border border-amber-200 p-6">
                  <h4 className="font-black text-lg mb-2">⚠️ Important change from the old NHR</h4>
                  <p className="text-sm text-amber-800 mb-3">
                    The original NHR regime was available to almost any newcomer and ended in 2024 (final transitional deadline: March 31, 2025). The new IFICI is significantly more restrictive — it is limited to highly qualified professionals in specific sectors. Most retirees, general remote workers, and passive income earners will NOT qualify for IFICI.
                  </p>
                  <ul className="space-y-1 text-sm text-amber-800">
                    {[
                      "If you already registered under the old NHR, your benefits continue for the full 10-year period",
                      "Retirees and D7 visa holders should seek specific tax advice on their situation",
                      "Digital nomads may qualify for IFICI if working in qualifying tech or innovation sectors",
                    ].map((point) => (
                      <li key={point} className="flex gap-2">
                        <span>•</span><span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-[20px] bg-[#f8f7ff] p-6">
                  <h4 className="font-black text-lg mb-3">Standard income tax rates (without IFICI)</h4>
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
                          ["Up to €7,703", "14.5%"],
                          ["€7,703 – €11,623", "21%"],
                          ["€11,623 – €16,472", "26.5%"],
                          ["€16,472 – €21,321", "28.5%"],
                          ["€21,321 – €27,146", "35%"],
                          ["€27,146 – €39,791", "37%"],
                          ["€39,791 – €51,997", "43.5%"],
                          ["€51,997 – €81,199", "45%"],
                          ["Over €81,199", "48%"],
                        ].map(([bracket, rate]) => (
                          <tr key={bracket} className="border-b border-gray-100">
                            <td className="py-2">{bracket}</td>
                            <td className="py-2 font-semibold">{rate}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="rounded-[20px] bg-[#f8f7ff] p-6">
                  <h4 className="font-black text-lg mb-3">Simplified tax regime for freelancers</h4>
                  <p className="text-gray-600 text-sm">
                    If you are self-employed or a freelancer with annual foreign-source income under €200,000, Portugal offers a simplified tax regime where only 75% of gross income is taxed — the remaining 25% is treated as a business expense deduction. This can be beneficial for D8 visa holders who don't qualify for IFICI.
                  </p>
                </div>
              </div>

              <div className="rounded-[20px] bg-amber-50 border border-amber-200 p-6">
                <p className="text-sm text-amber-800">
                  <strong>Tax advice disclaimer:</strong> Portugal's tax landscape has changed significantly in recent years. Always consult a qualified Portuguese tax adviser before making any decisions — especially regarding IFICI eligibility, pension taxation, and foreign income treatment.
                </p>
              </div>
            </section>

            {/* COST OF LIVING */}
            <section id="cost-of-living">
              <div className="text-sm font-bold uppercase tracking-[0.3em] text-violet-500 mb-4">
                Cost of Living
              </div>
              <h2 className="text-4xl font-black mb-8">What does life in Portugal cost?</h2>
              <p className="text-gray-600 text-lg mb-8">
                Portugal is one of the most affordable countries in Western Europe. A single person can live comfortably on €1,200–€1,800/month in major cities, and as little as €900–€1,300/month in smaller towns and rural areas. Housing has risen in Lisbon and Porto in recent years but remains far cheaper than comparable cities in Northern Europe or the US.
              </p>

              <div className="grid gap-4 md:grid-cols-3 mb-8">
                {[
                  {
                    city: "Lisbon & Cascais",
                    level: "Most expensive",
                    color: "border-red-200 bg-red-50",
                    badge: "bg-red-100 text-red-700",
                    items: [
                      "1-bed apartment (centre): €1,200–€1,500/mo",
                      "Single person budget: €1,750–€2,350/mo",
                      "Monthly transport pass: €40",
                    ],
                  },
                  {
                    city: "Porto, Algarve, Setúbal",
                    level: "Mid-range",
                    color: "border-yellow-200 bg-yellow-50",
                    badge: "bg-yellow-100 text-yellow-700",
                    items: [
                      "1-bed apartment (centre): €700–€1,000/mo",
                      "Single person budget: €1,200–€1,800/mo",
                      "Monthly transport pass: €30–€40",
                    ],
                  },
                  {
                    city: "Smaller cities & rural areas",
                    level: "Most affordable",
                    color: "border-green-200 bg-green-50",
                    badge: "bg-green-100 text-green-700",
                    items: [
                      "1-bed apartment: €400–€700/mo",
                      "Single person budget: €900–€1,300/mo",
                      "Car often needed outside cities",
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

              <div className="rounded-[24px] bg-[#f8f7ff] p-8">
                <h3 className="font-black text-xl mb-6">Typical monthly expenses (outside Lisbon)</h3>
                <div className="space-y-3">
                  {[
                    ["Rent (1-bed, city centre)", "€600 – €900"],
                    ["Utilities (electricity, water, internet)", "€80 – €130"],
                    ["Groceries", "€200 – €300"],
                    ["Dining out (mid-range)", "€100 – €200"],
                    ["Public transport pass", "€30 – €40"],
                    ["Private health insurance", "€50 – €150"],
                    ["Gym membership", "€25 – €50"],
                    ["Mobile plan", "€10 – €25"],
                  ].map(([item, cost]) => (
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
              <div className="text-sm font-bold uppercase tracking-[0.3em] text-violet-500 mb-4">
                Healthcare
              </div>
              <h2 className="text-4xl font-black mb-8">Healthcare in Portugal</h2>
              <p className="text-gray-600 text-lg mb-8">
                Portugal's public healthcare system, the Serviço Nacional de Saúde (SNS), is ranked among the best in the world and is available to all legal residents. Access is free or heavily subsidised at the point of use. The main trade-off is waiting times for non-urgent specialist care.
              </p>

              <div className="grid gap-6 md:grid-cols-2 mb-8">
                {[
                  {
                    icon: "🏥",
                    title: "Public Healthcare (SNS)",
                    points: [
                      "Free or heavily subsidised for all legal residents",
                      "Register at your local Centro de Saúde with your NIF, NISS, and residence permit",
                      "You will be assigned a family doctor (médico de família)",
                      "Covers GP visits, hospital care, maternity, emergency services, and subsidised prescriptions",
                      "Dental care is NOT covered — pay privately",
                      "Small co-payments (taxas moderadoras) apply for some services — typically €5 for a GP visit",
                      "Long waiting times for non-urgent specialist appointments can be 6–18 months",
                      "Emergency number: 112",
                    ],
                  },
                  {
                    icon: "💊",
                    title: "Private Health Insurance",
                    points: [
                      "Required for most visa applications (D7, D8, Golden Visa)",
                      "Costs approx. €50–€150/month per person depending on age and coverage",
                      "Provides faster access to specialists and avoids SNS waiting lists",
                      "Many private clinics have English-speaking doctors, especially in Lisbon, Porto, and the Algarve",
                      "Covers dental, optical, and faster diagnostics not available via SNS",
                      "Popular providers: Médis, Multicare, Fidelidade, AXA Portugal",
                      "Much more affordable than comparable private insurance in the US or UK",
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
                  <strong>Tip for new arrivals:</strong> Get your NIF and NISS as soon as possible after arriving — you can actually apply for both at the same time at a Finanças office. Then register at your local Centro de Saúde to activate your SNS access. Many expats use private insurance initially while SNS registration is processed.
                </p>
              </div>
            </section>

            {/* BANKING */}
            <section id="banking">
              <div className="text-sm font-bold uppercase tracking-[0.3em] text-violet-500 mb-4">
                Banking & Finance
              </div>
              <h2 className="text-4xl font-black mb-8">Banking in Portugal</h2>
              <p className="text-gray-600 text-lg mb-8">
                A Portuguese bank account is essential — it's required for most visa applications, paying rent, receiving salary or pension income, and accessing Portugal's Multibanco payment network. The key first step is getting your NIF (tax number), as almost no bank will open an account without it.
              </p>

              <div className="rounded-[20px] bg-blue-50 border border-blue-200 p-5 mb-8">
                <p className="text-sm text-blue-800">
                  <strong>The correct order:</strong> Get your NIF first → then open a Portuguese bank account → then apply for your visa. Most visa applications require both.
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-2 mb-8">
                {[
                  {
                    title: "Getting your NIF",
                    points: [
                      "The NIF (Número de Identificação Fiscal) is your Portuguese tax number — required for almost everything",
                      "Apply in person at any Finanças (tax office) with your passport and proof of address",
                      "Non-EU citizens need a Portuguese fiscal representative until they have residency",
                      "Can also be obtained remotely through an immigration lawyer or online service",
                      "Issued immediately at the tax office — free of charge",
                      "Your NIF is permanent and never expires",
                    ],
                  },
                  {
                    title: "Opening a bank account",
                    points: [
                      "Requires: NIF, passport, proof of address, and proof of income",
                      "A €250 opening deposit is typically required",
                      "Non-EU residents often find it easier to use an online service or immigration lawyer to open an account remotely",
                      "Most accounts open in 2–4 weeks via an online service",
                      "Popular banks for expats: Millennium BCP, Novo Banco, Caixa Geral, Bankinter",
                      "Use Revolut or Wise while waiting — good for day-to-day spending before your account is active",
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
                  <strong>Tip:</strong> Portugal's Multibanco network is one of the most advanced payment systems in Europe — ATMs allow you to pay bills, top up phones, buy tickets, and more. Once you have a Portuguese account, day-to-day life becomes very straightforward.
                </p>
              </div>
            </section>

            {/* PROS & CONS */}
            <section id="pros-cons">
              <div className="text-sm font-bold uppercase tracking-[0.3em] text-violet-500 mb-4">
                Summary
              </div>
              <h2 className="text-4xl font-black mb-8">Is Portugal right for you?</h2>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-[24px] bg-green-50 border-2 border-green-200 p-8">
                  <h3 className="font-black text-xl text-green-800 mb-4">✅ Reasons to move to Portugal</h3>
                  <ul className="space-y-3">
                    {[
                      "One of the most affordable countries in Western Europe",
                      "Warm climate with 300+ days of sunshine per year",
                      "Friendly, welcoming locals — consistently ranked one of the safest countries in the world",
                      "Excellent public healthcare system",
                      "Wide range of visa options for all types of newcomers",
                      "IFICI tax regime for qualifying professionals (20% flat rate for 10 years)",
                      "Simplified tax regime for freelancers and self-employed",
                      "English widely spoken, especially in cities and tourist areas",
                      "Excellent food, wine, and quality of life",
                      "Pathway to EU residency and citizenship after 5 years",
                      "Strong expat community — one of the most popular destinations in Europe",
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
                      "The original NHR tax regime is gone — IFICI is much more restrictive",
                      "AIMA (immigration agency) is known for very long processing times — plan 6–12 months ahead",
                      "Housing costs in Lisbon and Porto have risen significantly",
                      "Portuguese bureaucracy can be slow and complex",
                      "SNS waiting times for specialist care can be very long",
                      "Portuguese language is important for daily life outside tourist areas",
                      "D8 visa requires relatively high income (€3,680/month)",
                      "Real estate Golden Visa route was eliminated in 2023",
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
                Use our free tool to compare Portugal with other European countries and find the best fit for your situation.
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
        <p className="mt-2 text-white/30 text-xs">
          This guide is for informational purposes only and does not constitute legal, tax or financial advice. Always consult a qualified professional.
        </p>
      </footer>

    </div>
  );
}