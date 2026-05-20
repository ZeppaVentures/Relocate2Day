"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const sections = [
  { id: "visas", label: "Visas & Residency" },
  { id: "taxes", label: "Taxes" },
  { id: "cost-of-living", label: "Cost of Living" },
  { id: "healthcare", label: "Healthcare" },
  { id: "banking", label: "Banking & Finance" },
  { id: "pros-cons", label: "Is Malta right for you?" },
];

export default function MaltaPage() {
  const [activeSection, setActiveSection] = useState("visas");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
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

          <Link
            href="/"
            className="text-sm font-semibold hover:text-violet-600 transition"
          >
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
             "url('https://images.unsplash.com/photo-1668868944145-4d8f5f5c39b7?q=80&w=2000&auto=format&fit=crop')",
          }}
        />

        <div className="absolute inset-0 bg-black/30" />

        <div className="relative mx-auto max-w-7xl px-6 py-28 text-white">
          <div className="inline-flex rounded-full bg-orange-400 px-4 py-1 text-xs font-bold uppercase tracking-wide mb-6">
            Malta
          </div>

          <h1 className="text-6xl font-black leading-none md:text-8xl">
            Move to Malta
          </h1>

          <p className="mt-6 max-w-2xl text-xl text-white/80">
            Mediterranean weather, English-speaking life, low taxes, and a
            thriving international community — here’s everything you need to
            know about relocating to Malta.
          </p>

          <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4 max-w-3xl">
            {[
              { label: "Official language", value: "English" },
              { label: "Climate", value: "300+ sunny days" },
              { label: "Corporate tax refunds", value: "As low as 5%" },
              { label: "EU member", value: "Since 2004" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl bg-white/30 p-5 backdrop-blur-xl"
              >
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

          {/* CONTENT */}
          <div className="flex-1 min-w-0 space-y-20">

            {/* VISAS */}
            <section id="visas">
              <div className="text-sm font-bold uppercase tracking-[0.3em] text-violet-500 mb-4">
                Visas & Residency
              </div>

              <h2 className="text-4xl font-black mb-8">
                How to move to Malta
              </h2>

              <p className="text-gray-600 text-lg mb-8">
                Malta is one of Europe’s most popular destinations for expats,
                retirees, entrepreneurs, and remote workers. EU citizens can
                relocate freely, while non-EU nationals can access several
                residency programmes depending on work, investment, or lifestyle.
              </p>

              <div className="space-y-6">
                {[
                  {
                    title: "Nomad Residence Permit",
                    badge: "Remote workers",
                    badgeColor: "bg-violet-100 text-violet-700",
                    points: [
                      "For non-EU nationals working remotely for employers or clients outside Malta",
                      "Minimum gross income requirement: approx. €42,000/year",
                      "Valid for 1 year and renewable",
                      "Must prove remote employment, freelance contracts, or company ownership abroad",
                      "Popular with digital nomads due to English-speaking environment",
                      "Allows travel throughout the Schengen Area",
                    ],
                  },
                  {
                    title: "Permanent Residence Programme",
                    badge: "Investors & retirees",
                    badgeColor: "bg-orange-100 text-orange-700",
                    points: [
                      "Long-term residency route for non-EU nationals",
                      "Requires property purchase or rental plus government contributions",
                      "Offers permanent residency rights in Malta",
                      "Can include spouse, children, parents, and grandparents",
                      "No minimum stay requirement after approval",
                    ],
                  },
                  {
                    title: "Global Residence Programme",
                    badge: "Tax residents",
                    badgeColor: "bg-blue-100 text-blue-700",
                    points: [
                      "Popular tax residency programme for non-EU nationals",
                      "Minimum 15% tax on foreign income remitted to Malta",
                      "Requires qualifying property rental or purchase",
                      "Ideal for retirees and internationally mobile individuals",
                    ],
                  },
                  {
                    title: "EU / EEA Citizens",
                    badge: "Free movement",
                    badgeColor: "bg-green-100 text-green-700",
                    points: [
                      "EU citizens can live and work in Malta freely",
                      "Must register residence after 3 months",
                      "Straightforward process compared to many EU countries",
                      "Permanent residency available after 5 years",
                    ],
                  },
                ].map((visa) => (
                  <div
                    key={visa.title}
                    className="rounded-[24px] border border-gray-100 bg-white p-8 shadow-lg"
                  >
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <h3 className="text-xl font-black">{visa.title}</h3>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-bold ${visa.badgeColor}`}
                      >
                        {visa.badge}
                      </span>
                    </div>

                    <ul className="space-y-2">
                      {visa.points.map((point) => (
                        <li
                          key={point}
                          className="flex gap-3 text-gray-600"
                        >
                          <span className="text-violet-500 mt-0.5">✓</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* TAXES */}
            <section id="taxes">
              <div className="text-sm font-bold uppercase tracking-[0.3em] text-violet-500 mb-4">
                Taxes
              </div>

              <h2 className="text-4xl font-black mb-8">
                Understanding tax in Malta
              </h2>

              <p className="text-gray-600 text-lg mb-8">
                Malta is internationally known for its tax-friendly system,
                especially for foreign residents, entrepreneurs, and holding
                companies. Foreign income is generally only taxed if remitted to
                Malta.
              </p>

              <div className="grid gap-4 md:grid-cols-3 mb-8">
                {[
                  {
                    icon: "🌍",
                    title: "Remittance Basis",
                    desc: "Foreign income is usually only taxed if brought into Malta.",
                    color: "bg-violet-50 border-violet-200",
                  },
                  {
                    icon: "🏢",
                    title: "Corporate Tax Refunds",
                    desc: "Effective corporate tax rates can fall to around 5% after refunds.",
                    color: "bg-orange-50 border-orange-200",
                  },
                  {
                    icon: "☀️",
                    title: "Retirement Friendly",
                    desc: "Popular with retirees due to low tax exposure and warm climate.",
                    color: "bg-green-50 border-green-200",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className={`rounded-[24px] border-2 p-6 ${item.color}`}
                  >
                    <div className="text-4xl mb-3">{item.icon}</div>

                    <h3 className="font-black text-lg mb-2">
                      {item.title}
                    </h3>

                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                ))}
              </div>

              <div className="rounded-[20px] bg-[#f8f7ff] p-6">
                <h4 className="font-black text-lg mb-3">
                  Standard personal income tax rates
                </h4>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-gray-600">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-2 font-bold text-[#0B1957]">
                          Income bracket
                        </th>

                        <th className="text-left py-2 font-bold text-[#0B1957]">
                          Tax rate
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {[
                        ["Up to €9,100", "0%"],
                        ["€9,101 – €14,500", "15%"],
                        ["€14,501 – €19,500", "25%"],
                        ["€19,501 – €60,000", "25%–35%"],
                        ["Over €60,000", "35%"],
                      ].map(([bracket, rate]) => (
                        <tr
                          key={bracket}
                          className="border-b border-gray-100"
                        >
                          <td className="py-2">{bracket}</td>
                          <td className="py-2 font-semibold">{rate}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* COST OF LIVING */}
            <section id="cost-of-living">
              <div className="text-sm font-bold uppercase tracking-[0.3em] text-violet-500 mb-4">
                Cost of Living
              </div>

              <h2 className="text-4xl font-black mb-8">
                What does life in Malta cost?
              </h2>

              <p className="text-gray-600 text-lg mb-8">
                Malta is more affordable than London or Dublin, but prices have
                risen significantly due to expat demand. The most expensive
                areas are Sliema, St. Julian’s, and Valletta.
              </p>

              <div className="grid gap-4 md:grid-cols-3 mb-8">
                {[
                  {
                    city: "Sliema & St. Julian's",
                    level: "Most expensive",
                    color: "border-red-200 bg-red-50",
                    badge: "bg-red-100 text-red-700",
                    items: [
                      "1-bed apartment: €1,200–€1,800/mo",
                      "Popular with expats and remote workers",
                      "Walking distance to nightlife and coworking",
                    ],
                  },
                  {
                    city: "Valletta & central areas",
                    level: "Mid-range",
                    color: "border-yellow-200 bg-yellow-50",
                    badge: "bg-yellow-100 text-yellow-700",
                    items: [
                      "1-bed apartment: €900–€1,400/mo",
                      "Historic and cultural atmosphere",
                      "Great transport access",
                    ],
                  },
                  {
                    city: "Gozo & southern Malta",
                    level: "Most affordable",
                    color: "border-green-200 bg-green-50",
                    badge: "bg-green-100 text-green-700",
                    items: [
                      "1-bed apartment: €600–€900/mo",
                      "Quieter lifestyle",
                      "Popular with retirees",
                    ],
                  },
                ].map((city) => (
                  <div
                    key={city.city}
                    className={`rounded-[24px] border-2 p-6 ${city.color}`}
                  >
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold ${city.badge}`}
                    >
                      {city.level}
                    </span>

                    <h3 className="mt-3 font-black text-lg">
                      {city.city}
                    </h3>

                    <ul className="mt-4 space-y-2">
                      {city.items.map((item) => (
                        <li
                          key={item}
                          className="text-sm text-gray-600 flex gap-2"
                        >
                          <span>•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* HEALTHCARE */}
            <section id="healthcare">
              <div className="text-sm font-bold uppercase tracking-[0.3em] text-violet-500 mb-4">
                Healthcare
              </div>

              <h2 className="text-4xl font-black mb-8">
                Healthcare in Malta
              </h2>

              <p className="text-gray-600 text-lg mb-8">
                Malta has one of the best healthcare systems in Europe, with a
                mix of public and private healthcare providers. English is
                widely spoken by doctors and medical staff.
              </p>

              <div className="grid gap-6 md:grid-cols-2">
                {[
                  {
                    icon: "🏥",
                    title: "Public Healthcare",
                    points: [
                      "Available to residents contributing to social security",
                      "High-quality hospitals and emergency care",
                      "EU citizens can use EHIC/GHIC cards temporarily",
                      "English widely spoken throughout the system",
                    ],
                  },
                  {
                    icon: "💊",
                    title: "Private Healthcare",
                    points: [
                      "Affordable compared to much of Western Europe",
                      "Fast specialist appointments",
                      "Popular providers include Atlas and Bupa",
                      "Recommended for expats and retirees",
                    ],
                  },
                ].map((card) => (
                  <div
                    key={card.title}
                    className="rounded-[24px] bg-[#f8f7ff] p-8"
                  >
                    <div className="text-3xl mb-4">{card.icon}</div>

                    <h3 className="font-black text-xl mb-3">
                      {card.title}
                    </h3>

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
            </section>

            {/* BANKING */}
            <section id="banking">
              <div className="text-sm font-bold uppercase tracking-[0.3em] text-violet-500 mb-4">
                Banking & Finance
              </div>

              <h2 className="text-4xl font-black mb-8">
                Banking in Malta
              </h2>

              <p className="text-gray-600 text-lg mb-8">
                Malta has a strong international banking sector. Opening a bank
                account can take time due to compliance checks, but digital
                banking options are widely used.
              </p>

              <div className="grid gap-6 md:grid-cols-2">
                {[
                  {
                    title: "What you'll need",
                    points: [
                      "Passport or EU ID card",
                      "Proof of address",
                      "Residency documents or visa",
                      "Source of funds documentation",
                    ],
                  },
                  {
                    title: "Popular banks",
                    points: [
                      "Bank of Valletta",
                      "HSBC Malta",
                      "Revolut",
                      "Wise",
                      "APS Bank",
                    ],
                  },
                ].map((card) => (
                  <div
                    key={card.title}
                    className="rounded-[24px] bg-[#f8f7ff] p-8"
                  >
                    <h3 className="font-black text-xl mb-4">
                      {card.title}
                    </h3>

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
            </section>

            {/* PROS & CONS */}
            <section id="pros-cons">
              <div className="text-sm font-bold uppercase tracking-[0.3em] text-violet-500 mb-4">
                Summary
              </div>

              <h2 className="text-4xl font-black mb-8">
                Is Malta right for you?
              </h2>

              <div className="grid gap-6 md:grid-cols-2">

                {/* PROS */}
                <div className="rounded-[24px] bg-green-50 border-2 border-green-200 p-8">
                  <h3 className="font-black text-xl text-green-800 mb-4">
                    ✅ Reasons to move to Malta
                  </h3>

                  <ul className="space-y-3">
                    {[
                      "English-speaking country",
                      "Warm Mediterranean climate",
                      "Tax-friendly system for expats",
                      "EU membership and Schengen access",
                      "Large international community",
                      "Excellent healthcare system",
                      "Strong remote work and iGaming economy",
                      "Safe and politically stable",
                    ].map((point) => (
                      <li
                        key={point}
                        className="flex gap-3 text-green-800"
                      >
                        <span>•</span>
                        <span className="text-sm">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CONS */}
                <div className="rounded-[24px] bg-red-50 border-2 border-red-200 p-8">
                  <h3 className="font-black text-xl text-red-800 mb-4">
                    ⚠️ Things to consider
                  </h3>

                  <ul className="space-y-3">
                    {[
                      "Property prices have increased rapidly",
                      "Traffic congestion can be significant",
                      "Very hot summers",
                      "Limited green space compared to larger countries",
                      "Small island can feel crowded",
                      "Bank compliance checks can be slow",
                    ].map((point) => (
                      <li
                        key={point}
                        className="flex gap-3 text-red-800"
                      >
                        <span>•</span>
                        <span className="text-sm">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            </section>

            {/* CTA */}
            <section className="rounded-[32px] bg-gradient-to-br from-violet-600 via-pink-500 to-orange-400 p-10 text-center text-white">
              <h2 className="text-4xl font-black">
                Ready to make your move?
              </h2>

              <p className="mt-4 text-white/80 text-lg">
                Compare Malta with other expat-friendly countries and find the
                best fit for your lifestyle, taxes, and residency goals.
              </p>

              <Link
                href="/"
                className="mt-8 inline-block rounded-2xl bg-white px-8 py-4 text-sm font-bold text-violet-600 shadow-2xl transition hover:scale-105"
              >
                Compare all countries →
              </Link>
            </section>

          </div>

          {/* STICKY NAV */}
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

        <p className="mt-4">
          © {new Date().getFullYear()} Relocate2Day. All rights reserved.
        </p>

        <p className="mt-2 text-white/30 text-xs">
          This guide is for informational purposes only and does not constitute
          legal, tax or financial advice. Always consult a qualified
          professional.
        </p>
      </footer>

    </div>
  );
}