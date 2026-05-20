"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const sections = [
  { id: "visas", label: "Visas & Residency" },
  { id: "taxes", label: "Taxes" },
  { id: "cost-of-living", label: "Cost of Living" },
  { id: "healthcare", label: "Healthcare" },
  { id: "banking", label: "Banking & Finance" },
  { id: "pros-cons", label: "Is Gibraltar right for you?" },
  { id: "la-linea", label: "The Cross-Border Option" },
];

export default function GibraltarPage() {
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
              "url('https://images.unsplash.com/photo-1667391272465-6e250d3f762f?q=80&w=2000&auto=format&fit=crop')",
          }}
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative mx-auto max-w-7xl px-6 py-28 text-white">
          <div className="inline-flex rounded-full bg-orange-400 px-4 py-1 text-xs font-bold uppercase tracking-wide mb-6">
            Gibraltar
          </div>
          <h1 className="text-6xl font-black leading-none md:text-8xl">
            Move to Gibraltar
          </h1>
          <p className="mt-6 max-w-2xl text-xl text-white/80">
            A unique British Overseas Territory at the tip of Europe — English-speaking, tax-efficient, Mediterranean, and unlike anywhere else in the world.
          </p>
          <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4 max-w-3xl">
            {[
              { label: "Max income tax", value: "25%" },
              { label: "Capital gains tax", value: "None" },
              { label: "Inheritance tax", value: "None" },
              { label: "Official language", value: "English" },
            ].map((stat) => (
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

          {/* CONTENT */}
          <div className="flex-1 min-w-0 space-y-20">


            {/* VISAS */}
            <section id="visas">
              <div className="text-sm font-bold uppercase tracking-[0.3em] text-violet-500 mb-4">
                Visas & Residency
              </div>
              <h2 className="text-4xl font-black mb-8">How to move to Gibraltar</h2>

              {/* CRITICAL WARNING */}
              <div className="mb-8 rounded-[20px] bg-red-50 border-2 border-red-300 p-6">
                <div className="flex gap-3 items-start">
                  <span className="text-2xl">⚠️</span>
                  <div>
                    <h3 className="font-black text-red-800 text-lg mb-2">Important: Residency applications suspended (October 2025)</h3>
                    <p className="text-sm text-red-700">
                      In October 2025, the Government of Gibraltar temporarily suspended new long-term residency applications from UK and EEA nationals following an unprecedented surge in demand — driven largely by Gibraltar's new Schengen travel agreement. Applications submitted before 6 October 2025 continue to be processed. New applications may only be approved on a discretionary basis, requiring personal authorisation by the Chief Minister. The government has confirmed that new residency criteria with a "very high financial standard" are expected to be announced. Always verify the current status with the Gibraltar Immigration Authority (DIHA) or a qualified adviser before making any plans.
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-gray-600 text-lg mb-8">
                Gibraltar is a British Overseas Territory with its own immigration system, entirely separate from both the UK and the EU. The residency rules vary significantly by nationality. Here is an overview of the main routes.
              </p>

              <div className="space-y-6">
                {[
                  {
                    title: "UK Nationals",
                    badge: "No visa required",
                    badgeColor: "bg-blue-100 text-blue-700",
                    points: [
                      "UK citizens do not need a visa to enter or work in Gibraltar",
                      "However, long-term residency is not automatic — you must apply for and be approved under a Gibraltar residency category",
                      "You will need a Gibraltar work permit if employed locally (the employer handles this)",
                      "Residency requires proof of accommodation, income or employment, and compliance with local rules",
                      "Note: new residency applications are currently subject to the October 2025 suspension — verify current status before applying",
                    ],
                  },
                  {
                    title: "EU / EEA Nationals",
                    badge: "Residence permit required",
                    badgeColor: "bg-violet-100 text-violet-700",
                    points: [
                      "Since Brexit, EU/EEA nationals no longer have automatic freedom of movement in Gibraltar",
                      "EU nationals need a residence permit to live long-term in Gibraltar",
                      "Must demonstrate employment, self-sufficiency, or meet another approved residency criterion",
                      "Also subject to the October 2025 residency suspension for new applications",
                    ],
                  },
                  {
                    title: "Category 2 Residency (High Net Worth Individuals)",
                    badge: "HNWIs",
                    badgeColor: "bg-orange-100 text-orange-700",
                    points: [
                      "Designed for individuals with net assets of at least £2 million",
                      "Must rent or purchase a qualifying property in Gibraltar",
                      "Tax is capped — only the first £118,000 of worldwide income is taxed, with a minimum tax of £37,000 and maximum of £42,380 per year",
                      "Application fee: £1,000 plus a £15,000 due diligence and processing fee",
                      "Family members including spouse, children, siblings, and parents can be included",
                      "Particularly attractive for wealthy individuals seeking a tax-capped Mediterranean lifestyle",
                    ],
                  },
                  {
                    title: "HEPSS (High Executive Possessing Specialist Skills)",
                    badge: "Senior professionals",
                    badgeColor: "bg-green-100 text-green-700",
                    points: [
                      "For highly qualified professionals employed in Gibraltar in specialist roles",
                      "Common in financial services, fintech, online gaming, and legal sectors",
                      "Tax is charged only on the first £160,000 of income",
                      "Must be employed by a Gibraltar company and meet salary thresholds",
                      "Popular with executives relocating to Gibraltar's growing tech and finance sectors",
                    ],
                  },
                  {
                    title: "Non-EU / Non-EEA Nationals (e.g. US, Canada)",
                    badge: "Visa & work permit required",
                    badgeColor: "bg-gray-100 text-gray-700",
                    points: [
                      "Typically need a visa and a work permit to relocate",
                      "Usually requires a job offer from a Gibraltar employer, who applies for the work permit",
                      "Entry clearance visa must be obtained before moving",
                      "Self-sufficiency route available for those with sufficient financial means",
                      "Always verify requirements with DIHA — Gibraltar's Department for Immigration and Home Affairs",
                    ],
                  },
                ].map((route) => (
                  <div key={route.title} className="rounded-[24px] border border-gray-100 bg-white p-8 shadow-lg">
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <h3 className="text-xl font-black">{route.title}</h3>
                      <span className={`rounded-full px-3 py-1 text-xs font-bold ${route.badgeColor}`}>
                        {route.badge}
                      </span>
                    </div>
                    <ul className="space-y-2">
                      {route.points.map((point) => (
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
                  <strong>Important:</strong> Gibraltar's residency rules are changing rapidly. A new residency framework with stricter financial requirements is expected in 2026. Always consult a qualified Gibraltar immigration adviser and verify current rules with DIHA before making any decisions.
                </p>
              </div>
            </section>

            {/* TAXES */}
            <section id="taxes">
              <div className="text-sm font-bold uppercase tracking-[0.3em] text-violet-500 mb-4">
                Taxes
              </div>
              <h2 className="text-4xl font-black mb-8">Understanding tax in Gibraltar</h2>
              <p className="text-gray-600 text-lg mb-8">
                Gibraltar's tax system is one of the most attractive in Europe. There is no VAT, no capital gains tax, no inheritance tax, and no wealth tax. Income tax rates are low and capped at 25% for most residents. Only income earned in or derived from Gibraltar is generally taxed.
              </p>

              {/* Key tax highlights */}
              <div className="grid gap-4 md:grid-cols-3 mb-8">
                {[
                  { icon: "🚫", title: "No Capital Gains Tax", desc: "Profits from selling assets, shares, or property (primary residence) are not taxed" },
                  { icon: "🚫", title: "No Inheritance Tax", desc: "Estates pass to heirs without any inheritance, estate duty, or wealth tax" },
                  { icon: "🚫", title: "No VAT", desc: "Gibraltar has no Value Added Tax — making many goods notably cheaper than in the UK or EU" },
                ].map((item) => (
                  <div key={item.title} className="rounded-[24px] bg-[#f8f7ff] p-6 text-center">
                    <div className="text-4xl mb-3">{item.icon}</div>
                    <h3 className="font-black text-lg mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                  </div>
                ))}
              </div>

              {/* Two tax systems */}
              <div className="space-y-4 mb-8">
                <div className="rounded-[20px] bg-[#f8f7ff] p-6">
                  <h4 className="font-black text-lg mb-3">Two ways to be taxed — you choose the lower one</h4>
                  <p className="text-gray-600 mb-4">Gibraltar gives residents a choice between two tax systems. You are automatically assessed under whichever results in a lower tax bill:</p>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-xl bg-white p-5 shadow-sm">
                      <h5 className="font-black mb-2">Gross Income Based System (GIBS)</h5>
                      <p className="text-sm text-gray-600">Tax calculated on gross income in bands — no allowances. Rates range from 6% to 28% on income up to £25,000, and 16% to 28% on income above £25,000. Maximum effective rate is capped at 25% on incomes up to £100,000.</p>
                    </div>
                    <div className="rounded-xl bg-white p-5 shadow-sm">
                      <h5 className="font-black mb-2">Allowances Based System (ABS)</h5>
                      <p className="text-sm text-gray-600">Tax calculated on income after personal allowances and deductions. Progressive rates up to 39%, but with allowances for mortgage interest, pension contributions, medical insurance, and more — effective rates are usually much lower.</p>
                    </div>
                  </div>
                </div>

                {/* Special regimes */}
                <div className="rounded-[28px] bg-gradient-to-br from-violet-600 via-pink-500 to-orange-400 p-8 text-white">
                  <h3 className="text-2xl font-black mb-2">Special Tax Regimes</h3>
                  <p className="text-white/80 mb-6">Gibraltar offers two powerful capped tax regimes for high earners and specialists.</p>
                  <div className="grid gap-4 md:grid-cols-2">
                    {[
                      {
                        label: "Category 2 (HNWIs)",
                        value: "Tax capped at £37,000–£42,380/year on first £118,000 of worldwide income. Requires £2M+ in net assets.",
                      },
                      {
                        label: "HEPSS (Specialists)",
                        value: "Tax charged only on first £160,000 of income. For senior professionals in key sectors like finance, gaming, and fintech.",
                      },
                    ].map((item) => (
                      <div key={item.label} className="rounded-2xl bg-white/15 p-4">
                        <div className="text-sm text-white/70 mb-1">{item.label}</div>
                        <div className="font-bold text-sm">{item.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="rounded-[20px] bg-amber-50 border border-amber-200 p-6">
                <p className="text-sm text-amber-800">
                  <strong>Tax advice disclaimer:</strong> Gibraltar's tax rules are complex and depend on your residency status, income type, and personal circumstances. Always consult a qualified Gibraltar tax adviser before making any decisions.
                </p>
              </div>
            </section>

            {/* COST OF LIVING */}
            <section id="cost-of-living">
              <div className="text-sm font-bold uppercase tracking-[0.3em] text-violet-500 mb-4">
                Cost of Living
              </div>
              <h2 className="text-4xl font-black mb-8">What does life in Gibraltar cost?</h2>
              <p className="text-gray-600 text-lg mb-8">
                Gibraltar is one of the more expensive places in Southern Europe, primarily due to its tiny landmass and high demand for housing. However, the absence of VAT makes everyday goods and electronics noticeably cheaper than in the UK, and many residents shop across the border in Spain for groceries at 20–40% lower prices.
              </p>

              <div className="rounded-[20px] bg-amber-50 border border-amber-200 p-5 mb-8">
                <p className="text-sm text-amber-800">
                  <strong>Money-saving tip:</strong> Many Gibraltar residents live across the border in La Línea de la Concepción, Spain, where rents are 50–70% lower. The border crossing on foot typically takes 5–15 minutes.
                </p>
              </div>

              <div className="rounded-[24px] bg-[#f8f7ff] p-8 mb-8">
                <h3 className="font-black text-xl mb-6">Typical monthly expenses in Gibraltar</h3>
                <div className="space-y-3">
                  {[
                    ["Rent (1-bed apartment, centre)", "£1,250 – £1,850"],
                    ["Rent (room in shared flat)", "£650 – £950"],
                    ["Utilities (electricity & water combined)", "£120 – £180"],
                    ["Groceries (shopping in Gibraltar)", "£250 – £400"],
                    ["Groceries (shopping in Spain)", "£150 – £250"],
                    ["Dining out (mid-range, per person)", "£15 – £25"],
                    ["Monthly bus pass", "~£30"],
                    ["Private health insurance", "£50 – £150"],
                    ["Mobile plan", "£15 – £40"],
                  ].map(([item, cost]) => (
                    <div key={item} className="flex justify-between items-center border-b border-gray-200 pb-3">
                      <span className="text-gray-600">{item}</span>
                      <span className="font-bold">{cost}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[24px] bg-blue-50 border border-blue-200 p-6">
                <p className="text-sm text-blue-800">
                  <strong>No VAT advantage:</strong> Electronics, alcohol, tobacco, and luxury goods are often significantly cheaper in Gibraltar than in the UK or Spain due to the absence of VAT. A new Transaction Tax is expected from April 2026, replacing import duties — verify current rates before making major purchases.
                </p>
              </div>
            </section>

            {/* HEALTHCARE */}
            <section id="healthcare">
              <div className="text-sm font-bold uppercase tracking-[0.3em] text-violet-500 mb-4">
                Healthcare
              </div>
              <h2 className="text-4xl font-black mb-8">Healthcare in Gibraltar</h2>
              <p className="text-gray-600 text-lg mb-8">
                Gibraltar has a high-quality public healthcare system run by the Gibraltar Health Authority (GHA), modelled closely on the UK's NHS. All services are conducted in English. Registered residents are entitled to free healthcare at the point of use.
              </p>

              <div className="grid gap-6 md:grid-cols-2 mb-8">
                {[
                  {
                    icon: "🏥",
                    title: "Public Healthcare (GHA)",
                    points: [
                      "Free at point of use for registered Gibraltar residents",
                      "Closely modelled on the UK NHS — entirely English-speaking",
                      "Covers GP visits, specialist care, hospital treatment, maternity, and emergency services",
                      "St Bernard's Hospital is the main facility — modern and well-equipped",
                      "Dental care is mostly private",
                      "Register with GHA using your Gibraltar ID card once residency is established",
                    ],
                  },
                  {
                    icon: "💊",
                    title: "Private Health Insurance",
                    points: [
                      "Recommended for faster access to specialists and broader coverage",
                      "Monthly premiums typically £50–£150 depending on age and plan",
                      "Covers dental, optical, and additional specialist services",
                      "Many residents use private insurance for non-urgent care to avoid waiting times",
                      "Popular providers include Bupa International and AXA",
                      "Useful while setting up residency before GHA access is established",
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
                  <strong>Tip:</strong> Gibraltar's healthcare is widely regarded as more accessible and efficient than the NHS, with shorter waiting times and a more compact, community-focused system. English is spoken throughout.
                </p>
              </div>
            </section>

            {/* BANKING */}
            <section id="banking">
              <div className="text-sm font-bold uppercase tracking-[0.3em] text-violet-500 mb-4">
                Banking & Finance
              </div>
              <h2 className="text-4xl font-black mb-8">Banking in Gibraltar</h2>
              <p className="text-gray-600 text-lg mb-8">
                Gibraltar has a well-developed banking sector, regulated by the Gibraltar Financial Services Commission (GFSC). Opening a local account is straightforward for residents, and Gibraltar banks are very experienced in working with expats.
              </p>

              <div className="grid gap-6 md:grid-cols-2 mb-8">
                {[
                  {
                    title: "What you'll need to open an account",
                    points: [
                      "Valid passport or national ID",
                      "Proof of Gibraltar residency (Gibraltar ID card or residency permit)",
                      "Proof of address in Gibraltar",
                      "Evidence of income or employment",
                      "Some banks may request references or financial background information",
                    ],
                  },
                  {
                    title: "Banks operating in Gibraltar",
                    points: [
                      "Barclays — major UK bank with a full Gibraltar presence",
                      "NatWest International — via its Gibraltar branch",
                      "Jyske Bank — popular with international residents",
                      "EFG Private Bank — for high-net-worth clients",
                      "Revolut / Wise — useful for new arrivals before opening a local account",
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
                  <strong>Tip:</strong> Gibraltar's financial sector is regulated under British common law and is a well-respected international finance centre. The currency is the Gibraltar Pound (GIP), which is pegged 1:1 to the British Pound (GBP) and interchangeable in Gibraltar.
                </p>
              </div>
            </section>

            {/* PROS & CONS */}
            <section id="pros-cons">
              <div className="text-sm font-bold uppercase tracking-[0.3em] text-violet-500 mb-4">
                Summary
              </div>
              <h2 className="text-4xl font-black mb-8">Is Gibraltar right for you?</h2>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-[24px] bg-green-50 border-2 border-green-200 p-8">
                  <h3 className="font-black text-xl text-green-800 mb-4">✅ Reasons to move to Gibraltar</h3>
                  <ul className="space-y-3">
                    {[
                      "No capital gains tax, no inheritance tax, no VAT",
                      "Income tax capped at 25% — well below most European countries",
                      "Special regimes (Category 2, HEPSS) for HNWIs and senior professionals",
                      "English-speaking — official language and used everywhere",
                      "British legal system and governance — familiar to UK nationals",
                      "Mediterranean climate with 300+ sunny days per year",
                      "One of the safest places to live in Europe",
                      "New Schengen agreement gives residents free movement across Europe",
                      "Strong expat community, especially British",
                      "World-class financial services sector with career opportunities",
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
                      "New residency applications suspended since October 2025 — situation evolving",
                      "New residency criteria expected to set a 'very high financial standard'",
                      "Extremely limited housing supply — rents are high and availability is tight",
                      "Very small territory (6.7 km²) — can feel restrictive long-term",
                      "Higher cost of living than neighbouring Spain",
                      "Limited schooling and entertainment options compared to larger cities",
                      "No longer part of the EU — some implications for EU travel and business",
                      "Property market is supply-constrained with high prices",
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
{/* LA LINEA SECTION */}
<section id="la-linea">
  <div className="text-sm font-bold uppercase tracking-[0.3em] text-violet-500 mb-4">
    The Cross-Border Option
  </div>
  <h2 className="text-4xl font-black mb-4">Live in La Línea, Work in Gibraltar</h2>
  <p className="text-gray-600 text-lg mb-8">
    Every working day, around 15,000 people cross the Gibraltar–Spain border. Many Gibraltar workers choose to live in La Línea de la Concepción — the Spanish town directly across the border — where rents are 50–70% cheaper. It's one of the most popular living arrangements in the region, but it comes with important administrative and tax obligations on both sides of the border that you must get right from the start.
  </p>

  {/* Cost comparison */}
  <div className="grid gap-4 md:grid-cols-2 mb-8">
    <div className="rounded-[24px] bg-[#f8f7ff] p-6">
      <h3 className="font-black text-lg mb-4">🇬🇮 Living in Gibraltar</h3>
      <div className="space-y-2">
        {[
          ["1-bed apartment", "£1,250 – £1,850/mo"],
          ["2-bed apartment", "£1,900 – £3,000/mo"],
          ["Commute", "Zero — walk to work"],
          ["Tax", "Gibraltar tax only"],
          ["Admin", "Simple — one jurisdiction"],
        ].map(([label, value]) => (
          <div key={label} className="flex justify-between text-sm border-b border-gray-200 pb-2">
            <span className="text-gray-600">{label}</span>
            <span className="font-semibold">{value}</span>
          </div>
        ))}
      </div>
    </div>

    <div className="rounded-[24px] bg-green-50 border-2 border-green-200 p-6">
      <h3 className="font-black text-lg mb-4">🇪🇸 Living in La Línea</h3>
      <div className="space-y-2">
        {[
          ["1-bed apartment", "~€776/mo"],
          ["2-bed apartment", "€900 – €1,200/mo"],
          ["Commute", "10–30 min border crossing"],
          ["Tax", "Spain + Gibraltar"],
          ["Admin", "Two jurisdictions to manage"],
        ].map(([label, value]) => (
          <div key={label} className="flex justify-between text-sm border-b border-green-200 pb-2">
            <span className="text-gray-600">{label}</span>
            <span className="font-semibold">{value}</span>
          </div>
        ))}
      </div>
    </div>
  </div>

  {/* Spanish residency requirements */}
  <div className="space-y-6 mb-8">
    <h3 className="text-2xl font-black">Step 1 — Registering as a resident in Spain</h3>
    <p className="text-gray-600">
      If you live in La Línea, you are legally living in Spain and must register as a Spanish resident. This involves three key steps:
    </p>

    {[
      {
        step: "1",
        title: "Empadronamiento (Municipal Registration)",
        color: "bg-violet-50 border-violet-200",
        badge: "bg-violet-100 text-violet-700",
        points: [
          "Mandatory for anyone living in Spain — including cross-border workers",
          "Register at the La Línea Ayuntamiento (Town Hall) as soon as you have a permanent address",
          "Bring your passport and rental contract or property deed",
          "You will receive a Certificado de Empadronamiento — your official proof of address",
          "This certificate expires every 90 days for administrative use — keep it updated",
          "Non-EU citizens must renew registration every 2 years",
          "Free of charge — done in person at the Ayuntamiento",
          "Required before applying for your NIE and almost every other Spanish procedure",
        ],
      },
      {
        step: "2",
        title: "NIE — Número de Identificación de Extranjero",
        color: "bg-pink-50 border-pink-200",
        badge: "bg-pink-100 text-pink-700",
        points: [
          "Your permanent Spanish identification number — required to work, pay tax, open a bank account, and sign contracts in Spain",
          "EU citizens apply using Form EX-18 at the local Oficina de Extranjería or National Police station",
          "Non-EU citizens receive their NIE as part of their TIE (residency card) application",
          "Book a cita previa (appointment) at: sede.agenciatributaria.gob.es",
          "Application fee: approx. €12",
          "Your NIE is permanent and never expires",
          "In La Línea, appointments can be quicker than larger cities — book early regardless",
        ],
      },
      {
        step: "3",
        title: "TIE — Residency Card (Non-EU nationals only)",
        color: "bg-orange-50 border-orange-200",
        badge: "bg-orange-100 text-orange-700",
        points: [
          "Non-EU nationals (including UK citizens post-Brexit) must obtain a TIE card",
          "You must apply for your TIE within 30 days of arriving in Spain",
          "Requires your empadronamiento certificate, valid visa, passport, and proof of income (your Gibraltar work contract)",
          "Apply at the Oficina de Extranjería in Algeciras (the nearest major immigration office to La Línea)",
          "EU citizens receive a Green Registration Certificate instead of a TIE",
          "Your TIE must be renewed when your residency permit expires",
          "You must enter Spain on the correct visa before applying — you cannot switch from a tourist stay",
        ],
      },
      {
        step: "4",
        title: "Cross-Border Worker Registration",
        color: "bg-blue-50 border-blue-200",
        badge: "bg-blue-100 text-blue-700",
        points: [
          "Register as a frontier worker at the Customs Office at La Línea de la Concepción",
          "Required documents: identity document, employment contract, and proof of residence",
          "Registration allows you to use the red circuit lanes at the border, significantly reducing crossing times",
          "Can also be managed online via the Spanish Tax Agency (AEAT) website",
          "Free of charge",
        ],
      },
    ].map((item) => (
      <div key={item.title} className={`rounded-[24px] border-2 p-8 ${item.color}`}>
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-sm font-black shadow-sm">
            {item.step}
          </div>
          <h4 className="text-xl font-black">{item.title}</h4>
          <span className={`rounded-full px-3 py-1 text-xs font-bold ${item.badge}`}>
            Required
          </span>
        </div>
        <ul className="space-y-2">
          {item.points.map((point) => (
            <li key={point} className="flex gap-3 text-gray-700">
              <span className="text-violet-500 mt-0.5">✓</span>
              <span className="text-sm">{point}</span>
            </li>
          ))}
        </ul>
      </div>
    ))}
  </div>

  {/* Tax section */}
  <div className="space-y-6 mb-8">
    <h3 className="text-2xl font-black">Step 2 — Understanding your tax obligations</h3>
    <p className="text-gray-600">
      This is the most complex part of cross-border life and the area where professional advice is most important. As a Spanish tax resident working in Gibraltar, you have obligations in both countries.
    </p>

    <div className="rounded-[28px] bg-gradient-to-br from-violet-600 via-pink-500 to-orange-400 p-8 text-white">
      <h4 className="text-xl font-black mb-4">The key rule: where you live determines where you pay tax</h4>
      <p className="text-white/80 mb-6">
        If you spend more than 183 days per year in Spain (or have your main home or family there), Spain considers you a Spanish tax resident. This means Spain will tax your worldwide income — including your Gibraltar salary.
      </p>
      <div className="grid gap-4 md:grid-cols-2">
        {[
          {
            label: "Gibraltar tax",
            value: "Deducted at source via PAYE on your Gibraltar salary. You must also file a Gibraltar tax return.",
          },
          {
            label: "Spanish tax",
            value: "You must declare your Gibraltar salary on a Spanish tax return. A credit is generally given for Gibraltar tax already paid.",
          },
        ].map((item) => (
          <div key={item.label} className="rounded-2xl bg-white/15 p-4">
            <div className="text-sm text-white/70 mb-1">{item.label}</div>
            <div className="text-sm font-semibold">{item.value}</div>
          </div>
        ))}
      </div>
    </div>

    <div className="rounded-[20px] bg-[#f8f7ff] p-6">
      <h4 className="font-black text-lg mb-3">Important tax notes for cross-border workers</h4>
      <ul className="space-y-3">
        {[
          "You will need to file tax returns in both Gibraltar and Spain — these are two separate filings",
          "Gibraltar deducts tax at source (PAYE) — your employer handles this automatically",
          "Spain's tax is filed annually — the declaración de la renta — typically April to June for the previous year",
          "A tax credit is generally allowed in Spain for Gibraltar PAYE tax already paid, reducing the risk of double taxation",
          "The Spain–Gibraltar Double Tax Treaty provides rules to resolve conflicts about where you are tax resident",
          "Gibraltar is on Spain's list of non-cooperative tax territories — this means the €60,100 foreign income exemption available to Spanish residents working abroad does NOT apply to Gibraltar workers",
          "Spanish income tax rates are progressive up to 47% — but the credit for Gibraltar tax paid reduces your effective liability",
          "A qualified cross-border tax adviser typically costs €500–€1,500/year — always worthwhile",
        ].map((point) => (
          <li key={point} className="flex gap-3 text-gray-700">
            <span className="text-violet-500 mt-0.5">✓</span>
            <span className="text-sm">{point}</span>
          </li>
        ))}
      </ul>
    </div>

    <div className="rounded-[20px] bg-red-50 border border-red-200 p-6">
      <p className="text-sm text-red-800">
        <strong>⚠️ Important:</strong> Gibraltar is currently on Spain's list of non-cooperative tax territories. This affects which tax exemptions are available to you. The tax interaction between Gibraltar and Spain is complex — always consult a qualified cross-border tax adviser before finalising your arrangements. Do not rely solely on your employer's payroll team for your Spanish obligations.
      </p>
    </div>
  </div>

  {/* Daily life */}
  <div className="rounded-[24px] bg-[#f8f7ff] p-8">
    <h3 className="font-black text-xl mb-6">Daily life as a cross-border commuter</h3>
    <div className="grid gap-4 md:grid-cols-2">
      {[
        {
          icon: "🚶",
          title: "The border crossing",
          desc: "On foot, the crossing typically takes 10–30 minutes on a normal day. Peak hours (morning and evening) can be longer. Many residents walk or cycle — the town is compact and the border is central.",
        },
        {
          icon: "🛒",
          title: "Shopping strategy",
          desc: "Most residents shop for groceries in Spain (Mercadona and Carrefour in La Línea are popular) where prices are 20–40% lower. They cross to Gibraltar for electronics, alcohol, and tobacco where the absence of VAT makes prices cheaper.",
        },
        {
          icon: "🏥",
          title: "Healthcare",
          desc: "Once registered in Spain (empadronamiento + NIE), you can access Spain's public healthcare system (SNS) via your local health centre (centro de salud). You may also retain access to Gibraltar's GHA if your employer provides it.",
        },
        {
          icon: "🌞",
          title: "Lifestyle",
          desc: "La Línea offers an authentic Andalusian lifestyle — local tapas bars, fresh markets, beaches, and a warm community. It's quieter and more spacious than Gibraltar itself, with easy access to the wider Costa del Sol.",
        },
      ].map((item) => (
        <div key={item.title} className="rounded-xl bg-white p-5 shadow-sm">
          <div className="text-2xl mb-2">{item.icon}</div>
          <h4 className="font-black mb-2">{item.title}</h4>
          <p className="text-sm text-gray-600">{item.desc}</p>
        </div>
      ))}
    </div>
  </div>

  <div className="mt-6 rounded-[20px] bg-amber-50 border border-amber-200 p-6">
    <p className="text-sm text-amber-800">
      <strong>Professional advice is essential:</strong> The cross-border living arrangement is popular and manageable, but the tax and administrative requirements are complex. We strongly recommend consulting a qualified Spanish tax adviser (gestor) and a Gibraltar tax adviser before making the move. The cost of good advice is far less than the cost of getting it wrong.
    </p>
  </div>

</section>

            {/* CTA */}
            <section className="rounded-[32px] bg-gradient-to-br from-violet-600 via-pink-500 to-orange-400 p-10 text-center text-white">
              <h2 className="text-4xl font-black">Ready to make your move?</h2>
              <p className="mt-4 text-white/80 text-lg">
                Use our free tool to compare Gibraltar with other European countries and find the best fit for your situation.
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