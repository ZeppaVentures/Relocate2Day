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
  { id: "pros-cons", label: "Is Greece right for you?" },
];

export default function GreecePage() {
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
          style={{ backgroundImage: "url('/images/countries/greece-hero.jpg')" }}
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative mx-auto max-w-7xl px-6 py-28 text-white">
          <div className="inline-flex rounded-full bg-orange-400 px-4 py-1 text-xs font-bold uppercase tracking-wide mb-6">
            Greece
          </div>
          <h1 className="text-6xl font-black leading-none md:text-8xl">
            Move to Greece
          </h1>
          <p className="mt-6 max-w-2xl text-xl text-white/80">
            Mediterranean sunshine, ancient culture, and one of Europe's most affordable lifestyles — Greece has become a top destination for retirees, remote workers, and investors seeking EU residency.
          </p>
          <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4 max-w-3xl">
            {[
              { label: "Income tax (from)", value: "9%" },
              { label: "Cost of living", value: "From €1,150/mo" },
              { label: "EU member since", value: "1981" },
              { label: "Official language", value: "Greek" },
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
              <h2 className="text-4xl font-black mb-8">How to move to Greece</h2>
              <p className="text-gray-600 text-lg mb-8">
                EU/EEA citizens can move to Greece freely with no visa required. Non-EU nationals have several strong pathways, including the Golden Visa, the Digital Nomad Visa, and the Financially Independent Person (FIP) permit. In 2026, Greece unified its visa and residence permit process under one application, simplifying the journey significantly.
              </p>

              <div className="space-y-6">
                {[
                  {
                    title: "EU / EEA Citizens",
                    badge: "Free movement",
                    badgeColor: "bg-green-100 text-green-700",
                    points: [
                      "EU/EEA citizens have the right to live and work in Greece without a visa",
                      "Register at the local municipality (KEP) upon arrival",
                      "Obtain a Greek tax number (AFM) and social security number (AMKA) early — essential for banking, healthcare, and employment",
                      "After 5 years of continuous legal residence, eligible for permanent residency",
                      "No income or insurance requirements for EU citizens",
                    ],
                  },
                  {
                    title: "Digital Nomad Visa (E33A)",
                    badge: "Remote workers & freelancers",
                    badgeColor: "bg-violet-100 text-violet-700",
                    points: [
                      "For non-EU nationals working remotely for employers or clients based outside Greece",
                      "Minimum income requirement: €3,500/month net (after tax)",
                      "As of February 2026 (Law 5275/2026), applications must be made from outside Greece — no longer possible to apply as a tourist",
                      "Apply at a Greek consulate in your home country before travelling",
                      "Initial permit valid for 2 years, renewable",
                      "50% income tax exemption for up to 7 years — a major financial benefit",
                      "Family members can be included in the application",
                      "Does not require minimum days spent in Greece",
                    ],
                  },
                  {
                    title: "Financially Independent Person (FIP) Visa",
                    badge: "Retirees & passive income",
                    badgeColor: "bg-orange-100 text-orange-700",
                    points: [
                      "For non-EU nationals with sufficient passive income — pensions, dividends, rental income, or savings",
                      "Minimum income requirement: €2,000/month (plus 20% per dependent)",
                      "Must not work or operate a business in Greece",
                      "Apply at a Greek consulate before travelling to Greece",
                      "Residence permit valid for 3 years, renewable",
                      "After 5 years of continuous legal residence, eligible for permanent residency",
                      "Greece ranked number one in the 2026 Global Retirement Index — a top choice for retirees",
                      "Special 7% flat tax on foreign pension income for qualifying retirees",
                    ],
                  },
                  {
                    title: "Golden Visa",
                    badge: "Investors",
                    badgeColor: "bg-yellow-100 text-yellow-700",
                    points: [
                      "Residency through property or other qualifying investment",
                      "Investment thresholds under Law 5100/2024: €800,000 in Zone A (Athens, Thessaloniki, Mykonos, Santorini), €400,000 in Zone B, €250,000 for commercial-to-residential conversions",
                      "Minimum property size rule: 120m² applies in certain zones",
                      "No minimum residency requirement — you do not need to live in Greece",
                      "5-year renewable residence permit, extendable indefinitely",
                      "No income tax on foreign-source income (unless you choose to become a Greek tax resident)",
                      "Family members included",
                      "Pathway to Greek citizenship after 7 years of residency",
                    ],
                  },
                  {
                    title: "Startup & Tech Visa (2026)",
                    badge: "Founders & tech professionals",
                    badgeColor: "bg-blue-100 text-blue-700",
                    points: [
                      "New in 2026 — Greece launched targeted visa categories for skilled tech professionals and startup founders",
                      "Aimed at attracting talent to Greece's growing tech and startup ecosystem",
                      "Consult the Greek Ministry of Migration for current requirements as the programme is newly established",
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
                  <strong>Important:</strong> Greece's immigration rules have changed significantly in 2026, including the new law abolishing tourist-based Digital Nomad Visa applications. Always verify current requirements with the Greek Ministry of Migration or a qualified Greek immigration lawyer before applying.
                </p>
              </div>
            </section>

            {/* TAXES */}
            <section id="taxes">
              <div className="text-sm font-bold uppercase tracking-[0.3em] text-violet-500 mb-4">
                Taxes
              </div>
              <h2 className="text-4xl font-black mb-8">Understanding tax in Greece</h2>
              <p className="text-gray-600 text-lg mb-8">
                Greece uses a progressive income tax system with rates from 9% to 44%. However, the country offers some of the most generous expat tax incentives in Europe — including a 50% tax exemption for Digital Nomad Visa holders, a 7% flat tax for qualifying retirees, and a €100,000 non-dom flat tax for high-net-worth individuals. The 2026 tax reform (Law 5246/2025) cut several middle-bracket rates.
              </p>

              {/* Key tax highlights */}
              <div className="rounded-[28px] bg-gradient-to-br from-violet-600 via-pink-500 to-orange-400 p-8 text-white mb-8">
                <h3 className="text-2xl font-black mb-2">2026 Income Tax Brackets</h3>
                <p className="text-white/80 mb-6">
                  Greece reformed its tax rates in 2026 under Law 5246/2025, cutting middle-bracket rates and raising the threshold for the top 44% rate from €40,000 to €60,000.
                </p>
                <div className="grid gap-4 md:grid-cols-2">
                  {[
                    { label: "Up to €10,000", value: "9%" },
                    { label: "€10,001 – €20,000", value: "20%" },
                    { label: "€20,001 – €30,000", value: "26%" },
                    { label: "€30,001 – €40,000", value: "34%" },
                    { label: "€40,001 – €60,000", value: "39%" },
                    { label: "Above €60,000", value: "44%" },
                  ].map((item) => (
                    <div key={item.label} className="rounded-2xl bg-white/15 p-4">
                      <div className="text-sm text-white/70">{item.label}</div>
                      <div className="mt-1 font-black text-lg">{item.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="rounded-[20px] bg-[#f8f7ff] p-6">
                  <h4 className="font-black text-lg mb-3">Special expat tax regimes</h4>
                  <ul className="space-y-2 text-gray-600">
                    {[
                      "Digital Nomad Visa holders: 50% income tax exemption for up to 7 years — one of the most generous in Europe",
                      "Retirees transferring tax residency to Greece: 7% flat tax on all foreign pension income for up to 15 years",
                      "High-net-worth non-doms: €100,000 annual flat tax on all worldwide foreign income for 15 years (requires €500,000 investment in Greece)",
                      "Dividend tax: just 5% — the lowest in the EU",
                      "Young professionals under 25: 0% tax on income up to €20,000",
                      "Solidarity surcharge: suspended since 2023 and remains suspended in 2026",
                    ].map((point) => (
                      <li key={point} className="flex gap-3">
                        <span className="text-violet-500 mt-0.5">✓</span>
                        <span className="text-sm">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-[20px] bg-[#f8f7ff] p-6">
                  <h4 className="font-black text-lg mb-3">Other key taxes</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-gray-600">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-2 font-bold text-[#0B1957]">Tax</th>
                          <th className="text-left py-2 font-bold text-[#0B1957]">Rate</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          ["Corporate income tax", "22%"],
                          ["Dividend tax", "5% (lowest in EU)"],
                          ["VAT (standard)", "24%"],
                          ["Capital gains tax", "15% on most assets"],
                          ["Social security (employee)", "14% of gross salary"],
                          ["Social security cap", "€93,143/year"],
                        ].map(([tax, rate]) => (
                          <tr key={tax} className="border-b border-gray-100">
                            <td className="py-2">{tax}</td>
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
                  <strong>Tax advice disclaimer:</strong> Greek tax law changed significantly in 2026. Tax residency applies if you spend more than 183 days per year in Greece. Always consult a qualified Greek tax adviser before making any decisions. Greece has double taxation treaties with over 50 countries.
                </p>
              </div>
            </section>

            {/* COST OF LIVING */}
            <section id="cost-of-living">
              <div className="text-sm font-bold uppercase tracking-[0.3em] text-violet-500 mb-4">
                Cost of Living
              </div>
              <h2 className="text-4xl font-black mb-8">What does life in Greece cost?</h2>
              <p className="text-gray-600 text-lg mb-8">
                Greece offers one of the most affordable lifestyles in Western Europe — roughly 51% cheaper than the USA. A single person can live comfortably on €1,150–€1,400/month including rent. Athens rents have risen in recent years due to popularity, but smaller cities and islands remain very affordable.
              </p>

              <div className="grid gap-4 md:grid-cols-3 mb-8">
                {[
                  {
                    city: "Athens",
                    level: "Most expensive",
                    color: "border-red-200 bg-red-50",
                    badge: "bg-red-100 text-red-700",
                    items: [
                      "1-bed apartment (centre): €700–€1,200/mo",
                      "Single person budget: €1,400–€2,000/mo",
                      "Best for careers, culture & city life",
                    ],
                  },
                  {
                    city: "Thessaloniki & Heraklion",
                    level: "Mid-range",
                    color: "border-yellow-200 bg-yellow-50",
                    badge: "bg-yellow-100 text-yellow-700",
                    items: [
                      "1-bed apartment (centre): €400–€700/mo",
                      "Single person budget: €1,100–€1,500/mo",
                      "Great lifestyle at lower cost",
                    ],
                  },
                  {
                    city: "Islands & smaller cities",
                    level: "Most affordable",
                    color: "border-green-200 bg-green-50",
                    badge: "bg-green-100 text-green-700",
                    items: [
                      "1-bed apartment: €300–€600/mo",
                      "Single person budget: €800–€1,200/mo",
                      "Ideal for retirees & remote workers",
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
                <h3 className="font-black text-xl mb-6">Typical monthly expenses in Athens</h3>
                <div className="space-y-3">
                  {[
                    ["Rent (1-bed, city centre)", "€700 – €1,200"],
                    ["Utilities (electricity, heating, water)", "€80 – €150"],
                    ["Internet (fibre)", "€20 – €35"],
                    ["Groceries", "€200 – €350"],
                    ["Dining out (mid-range)", "€150 – €250"],
                    ["Public transport pass", "€30"],
                    ["Private health insurance", "€60 – €250"],
                    ["Gym membership", "€25 – €50"],
                    ["Mobile plan", "€15 – €30"],
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
                  <strong>Island tip:</strong> Greek islands like Crete, Rhodes, and Corfu offer a stunning quality of life at significantly lower costs than Athens — especially outside tourist season. Many expats live on islands and fly or ferry to Athens for appointments.
                </p>
              </div>
            </section>

            {/* HEALTHCARE */}
            <section id="healthcare">
              <div className="text-sm font-bold uppercase tracking-[0.3em] text-violet-500 mb-4">
                Healthcare
              </div>
              <h2 className="text-4xl font-black mb-8">Healthcare in Greece</h2>
              <p className="text-gray-600 text-lg mb-8">
                Greece has a public healthcare system (ESY) accessible to registered residents. While emergency care is excellent, most expats opt for private health insurance for routine care due to waiting times and variable quality outside major cities. Private healthcare in Greece is very affordable by Western standards.
              </p>

              <div className="grid gap-6 md:grid-cols-2 mb-8">
                {[
                  {
                    icon: "🏥",
                    title: "Public Healthcare (ESY)",
                    points: [
                      "Accessible to all residents registered with the social security system (EFKA/AMKA)",
                      "Emergency care is free for all — dial 112",
                      "EU citizens can use their EHIC for emergency treatment",
                      "Quality varies significantly — Athens and Thessaloniki have the best hospitals",
                      "Long waiting times for specialist appointments are common",
                      "Prescription medications are subsidised — significantly cheaper than UK or US prices",
                      "Dental care is mostly private",
                      "Greece ranks 32nd globally for life expectancy",
                    ],
                  },
                  {
                    icon: "💊",
                    title: "Private Health Insurance",
                    points: [
                      "Required for Digital Nomad Visa and most long-stay visa applications",
                      "Affordable — typically €60–€250/month per person depending on age and coverage",
                      "A private GP consultation costs just €60–€150 without insurance",
                      "Specialist consultations range from €60–€120 privately",
                      "English-speaking doctors widely available in cities and tourist areas",
                      "Popular providers: Allianz, Bupa International, AXA, local provider Interamerican",
                      "Most expats and nomad visa holders use private insurance exclusively",
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
                  <strong>Tip:</strong> Get your AMKA (social security number) as early as possible after arriving — it's required to access public healthcare, open a bank account, and complete most bureaucratic processes in Greece.
                </p>
              </div>
            </section>

            {/* BANKING */}
            <section id="banking">
              <div className="text-sm font-bold uppercase tracking-[0.3em] text-violet-500 mb-4">
                Banking & Finance
              </div>
              <h2 className="text-4xl font-black mb-8">Banking in Greece</h2>
              <p className="text-gray-600 text-lg mb-8">
                Greece uses the Euro and has a well-established banking sector regulated under EU standards. Opening a local bank account requires your AFM (tax number) and AMKA (social security number), so get these sorted first. Many expats use Revolut or Wise while their local account is being set up.
              </p>

              <div className="grid gap-6 md:grid-cols-2 mb-8">
                {[
                  {
                    title: "What you'll need to open an account",
                    points: [
                      "Valid passport or national ID",
                      "AFM (Greek tax identification number) — essential",
                      "AMKA (social security number) — usually required",
                      "Proof of Greek address (rental contract or utility bill)",
                      "Residence permit or registration certificate for non-EU nationals",
                      "Proof of income may be required by some banks",
                      "Some banks require an initial deposit of €50–€300",
                    ],
                  },
                  {
                    title: "Banks operating in Greece",
                    points: [
                      "National Bank of Greece — largest bank, wide branch and ATM network",
                      "Piraeus Bank — popular with expats, good online banking",
                      "Alpha Bank — strong international support",
                      "Eurobank — reliable retail banking with English service",
                      "Revolut / Wise — widely used by expats and digital nomads for day-to-day banking",
                      "Use Revolut or Wise while setting up your Greek account — especially useful before you have your AFM",
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
                  <strong>Tip:</strong> Get your AFM (tax number) from the local tax office (AADE) as your very first step after arriving — you'll need it for almost everything, including opening a bank account and signing a rental contract.
                </p>
              </div>
            </section>

            {/* PROS & CONS */}
            <section id="pros-cons">
              <div className="text-sm font-bold uppercase tracking-[0.3em] text-violet-500 mb-4">
                Summary
              </div>
              <h2 className="text-4xl font-black mb-8">Is Greece right for you?</h2>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-[24px] bg-green-50 border-2 border-green-200 p-8">
                  <h3 className="font-black text-xl text-green-800 mb-4">✅ Reasons to move to Greece</h3>
                  <ul className="space-y-3">
                    {[
                      "Ranked #1 in the 2026 Global Retirement Index",
                      "50% income tax exemption for Digital Nomad Visa holders for 7 years",
                      "7% flat tax on foreign pension income for qualifying retirees",
                      "5% dividend tax — the lowest in the EU",
                      "Cost of living roughly 51% lower than the USA",
                      "EU member state — full freedom of movement and rights",
                      "Stunning climate — 300+ days of sunshine per year in many areas",
                      "Rich culture, history, food, and island lifestyle",
                      "English widely spoken in cities and tourist areas",
                      "Affordable private healthcare",
                      "Golden Visa offers residency with no minimum stay requirement",
                      "Growing expat and digital nomad communities in Athens and Crete",
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
                      "Bureaucracy is notoriously slow and complex — patience required",
                      "Digital Nomad Visa rules changed in February 2026 — must apply before arriving",
                      "Athens rents have risen sharply — less affordable than 5 years ago",
                      "Public healthcare quality is variable outside major cities",
                      "Greek language uses a different alphabet — a learning curve",
                      "Limited job opportunities for non-Greek speakers in local employment",
                      "Summers in Athens can be extremely hot (40°C+)",
                      "Island living can feel isolated in winter months",
                      "Standard progressive tax rates (up to 44%) apply without special regime",
                      "Economic stability concerns — monitor developments",
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
                Use our free tool to compare Greece with other European countries and find the best fit for your situation.
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
