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
            backgroundImage: "url('/images/countries/malta-hero.jpg')",
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
            English-speaking, sunny, and strategically positioned in the heart of the Mediterranean — Malta offers a unique blend of European lifestyle, generous tax programmes, and one of the warmest welcomes for newcomers in Europe.
          </p>
          <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4 max-w-3xl">
            {[
              { label: "Nomad permit tax", value: "0% foreign income" },
              { label: "Retirement flat tax", value: "15%" },
              { label: "Inheritance tax", value: "None" },
              { label: "Official languages", value: "Maltese & English" },
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
              <h2 className="text-4xl font-black mb-8">How to move to Malta</h2>
              <p className="text-gray-600 text-lg mb-8">
                EU/EEA citizens can move to Malta freely and register residency at the local council. Non-EU nationals have several strong routes depending on whether they work remotely, are retiring, investing, or studying. Malta is notably English-speaking throughout, making the administrative process more accessible than in most European countries.
              </p>

              <div className="space-y-6">
                {[
                  {
                    title: "Nomad Residence Permit",
                    badge: "Remote workers & freelancers",
                    badgeColor: "bg-violet-100 text-violet-700",
                    points: [
                      "Malta's official digital nomad visa — one of the most established in Europe, launched in 2021",
                      "For non-EU nationals working remotely for employers or clients based outside Malta",
                      "Minimum income requirement: €42,000/year gross (approx. €3,500/month) — increased from €32,400 in April 2024",
                      "Must be employed, self-employed, or freelance with proven remote work",
                      "Valid for 1 year, renewable up to 3 times — total of 4 years",
                      "Spouse, partner, and dependent children can be included",
                      "Includes a Schengen visa — giving visa-free travel across 27 European countries",
                      "Malta has 5G nationwide and the widest fibre broadband coverage in the EU",
                      "Foreign income not remitted to Malta is generally not subject to Maltese tax",
                    ],
                  },
                  {
                    title: "Malta Retirement Programme (MRP)",
                    badge: "Retirees",
                    badgeColor: "bg-orange-100 text-orange-700",
                    points: [
                      "For non-EU/EEA retirees wishing to live in Malta on pension income",
                      "At least 75% of income remitted to Malta must come from a recognised pension",
                      "Must own property worth at least €275,000 or rent at a minimum of €9,600/year",
                      "Must hold worldwide health insurance covering both Malta and the EU",
                      "Flat 15% tax on foreign pension income remitted to Malta",
                      "Minimum annual tax: €7,500 plus €500 per dependent",
                      "Must spend at least 90 days per year in Malta",
                      "Application fee: €2,500",
                      "Non-executive roles in Malta are permitted",
                    ],
                  },
                  {
                    title: "Global Residence Programme (GRP)",
                    badge: "Non-EU nationals",
                    badgeColor: "bg-blue-100 text-blue-700",
                    points: [
                      "For non-EU nationals who wish to reside in Malta without the retirement-specific requirements of the MRP",
                      "Must own property worth at least €275,000 (or €220,000 in Gozo/South Malta) or rent at €9,600+/year",
                      "Must have worldwide health insurance and stable regular income",
                      "Flat 15% tax on foreign-source income remitted to Malta",
                      "Minimum annual tax: €15,000",
                      "No minimum stay requirement — more flexible than the MRP",
                      "Can work or be self-employed in Malta",
                    ],
                  },
                  {
                    title: "Malta Permanent Residence Programme (MPRP)",
                    badge: "Investors",
                    badgeColor: "bg-yellow-100 text-yellow-700",
                    points: [
                      "Malta's golden visa equivalent — grants permanent EU residency through investment",
                      "Requires a government contribution of €28,000 (if renting) or €58,000 (if buying property)",
                      "Plus a €2,000 donation to a registered NGO",
                      "Must rent property at €10,000/year+ or purchase at €300,000+ (€270,000 in Gozo/South Malta)",
                      "No minimum stay requirement",
                      "Grants permanent residency — not citizenship",
                      "Spouse, children, parents, and grandparents can be included",
                      "Licensed agent required for applications",
                    ],
                  },
                  {
                    title: "EU / EEA Citizens",
                    badge: "Free movement",
                    badgeColor: "bg-green-100 text-green-700",
                    points: [
                      "EU/EEA citizens have the right to live and work in Malta without a visa",
                      "Must register with the local council (Kunsill Lokali) within 3 months of arrival",
                      "Apply for an eResidence card at Identity Malta",
                      "After 5 years of continuous legal residence, eligible for permanent residency",
                      "No income or insurance requirements for EU citizens",
                    ],
                  },
                  {
                    title: "Student Visa",
                    badge: "Students",
                    badgeColor: "bg-pink-100 text-pink-700",
                    points: [
                      "For non-EU nationals enrolled at a Maltese educational institution",
                      "Malta is very popular for English language courses — one of the top English-learning destinations in Europe",
                      "Valid for the duration of the enrolled programme",
                      "Part-time work permitted alongside studies",
                      "Malta's University (University of Malta) offers degree programmes entirely in English",
                      "Pathway to convert to a work permit after graduation",
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
                  <strong>Important:</strong> Malta's residency programmes are managed by the Residency Malta Agency. Decisions are final — there is no formal right of appeal for refused applications. Always verify current requirements and consider using a licensed Maltese immigration adviser for investment and retirement programmes.
                </p>
              </div>
            </section>

            {/* TAXES */}
            <section id="taxes">
              <div className="text-sm font-bold uppercase tracking-[0.3em] text-violet-500 mb-4">
                Taxes
              </div>
              <h2 className="text-4xl font-black mb-8">Understanding tax in Malta</h2>
              <p className="text-gray-600 text-lg mb-8">
                Malta's tax system is one of the most favourable in Europe for newcomers. The key concept is the remittance basis — non-domiciled residents only pay tax on income arising in Malta or foreign income that is remitted (brought) into Malta. Foreign income that stays outside Malta is generally not taxed. There is no wealth tax, no inheritance tax, and no gift tax.
              </p>

              {/* Key tax highlights */}
              <div className="grid gap-4 md:grid-cols-3 mb-8">
                {[
                  { icon: "🚫", title: "No Inheritance Tax", desc: "Estates pass to heirs without any inheritance, estate, or gift tax" },
                  { icon: "🌍", title: "Remittance Basis", desc: "Non-domiciled residents only taxed on income brought into Malta — foreign income kept offshore is not taxed" },
                  { icon: "📜", title: "70+ Tax Treaties", desc: "Malta has double taxation treaties with over 70 countries — preventing you from being taxed twice" },
                ].map((item) => (
                  <div key={item.title} className="rounded-[24px] bg-[#f8f7ff] p-6 text-center">
                    <div className="text-4xl mb-3">{item.icon}</div>
                    <h3 className="font-black text-lg mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-4 mb-8">

                {/* Nomad permit tax */}
                <div className="rounded-[28px] bg-gradient-to-br from-violet-600 via-pink-500 to-orange-400 p-8 text-white">
                  <h3 className="text-2xl font-black mb-2">Nomad Residence Permit — Tax Treatment</h3>
                  <p className="text-white/80 mb-6">
                    Holders of the Nomad Residence Permit enjoy highly favourable tax treatment. Because their income is earned outside Malta and may not be remitted to Malta, it generally falls outside the Maltese tax net entirely.
                  </p>
                  <div className="grid gap-4 md:grid-cols-2">
                    {[
                      { label: "Foreign income (not remitted)", value: "Generally 0% — outside Maltese tax net" },
                      { label: "Foreign income (remitted to Malta)", value: "Subject to Maltese tax at progressive rates or flat regime" },
                      { label: "Social security", value: "Nomad permit holders are NOT required to pay Maltese social security contributions" },
                      { label: "Home country tax", value: "You may still owe tax in your home country — always verify with a tax adviser" },
                    ].map((item) => (
                      <div key={item.label} className="rounded-2xl bg-white/15 p-4">
                        <div className="text-sm text-white/70">{item.label}</div>
                        <div className="mt-1 font-bold text-sm">{item.value}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Special programmes */}
                <div className="rounded-[20px] bg-[#f8f7ff] p-6">
                  <h4 className="font-black text-lg mb-4">Special tax programmes for residents</h4>
                  <div className="space-y-4">
                    {[
                      {
                        title: "Malta Retirement Programme (MRP)",
                        detail: "Flat 15% tax on foreign pension income remitted to Malta. Minimum annual tax: €7,500 + €500 per dependent. Covers retirees receiving at least 75% of income from a foreign pension.",
                        badge: "bg-orange-100 text-orange-700",
                        label: "Retirees",
                      },
                      {
                        title: "Global Residence Programme (GRP)",
                        detail: "Flat 15% tax on all foreign-source income remitted to Malta. Minimum annual tax: €15,000. Available to non-EU nationals who own or rent qualifying property.",
                        badge: "bg-blue-100 text-blue-700",
                        label: "Non-EU residents",
                      },
                      {
                        title: "Highly Qualified Persons (HQP) Rules",
                        detail: "Flat 15% tax on employment income up to €5 million for senior professionals in regulated sectors including financial services, aviation, and iGaming. Very attractive for executives.",
                        badge: "bg-violet-100 text-violet-700",
                        label: "Senior professionals",
                      },
                    ].map((item) => (
                      <div key={item.title} className="rounded-xl bg-white p-5 shadow-sm">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <h5 className="font-black">{item.title}</h5>
                          <span className={`rounded-full px-2 py-0.5 text-xs font-bold ${item.badge}`}>{item.label}</span>
                        </div>
                        <p className="text-sm text-gray-600">{item.detail}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Standard rates */}
                <div className="rounded-[20px] bg-[#f8f7ff] p-6">
                  <h4 className="font-black text-lg mb-3">Standard income tax rates (progressive)</h4>
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
                          ["Up to €9,100", "0%"],
                          ["€9,100 – €14,500", "15%"],
                          ["€14,500 – €19,500", "25%"],
                          ["€19,500 – €60,000", "25%"],
                          ["Over €60,000", "35%"],
                        ].map(([bracket, rate]) => (
                          <tr key={bracket} className="border-b border-gray-100">
                            <td className="py-2">{bracket}</td>
                            <td className="py-2 font-semibold">{rate}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p className="text-xs text-gray-500 mt-3">Rates shown are for single individuals. Married and parent rates differ slightly. Maximum rate is 35% on income above €60,000.</p>
                </div>
              </div>

              <div className="rounded-[20px] bg-amber-50 border border-amber-200 p-6">
                <p className="text-sm text-amber-800">
                  <strong>Tax advice disclaimer:</strong> Malta's tax rules are complex and depend heavily on your residency status, domicile, and whether income is remitted to Malta. Always consult a qualified Maltese tax adviser before making any decisions.
                </p>
              </div>
            </section>

            {/* COST OF LIVING */}
            <section id="cost-of-living">
              <div className="text-sm font-bold uppercase tracking-[0.3em] text-violet-500 mb-4">
                Cost of Living
              </div>
              <h2 className="text-4xl font-black mb-8">What does life in Malta cost?</h2>
              <p className="text-gray-600 text-lg mb-8">
                Malta's cost of living is moderate — roughly 30% cheaper than the UK and around 41% cheaper than the US. A single person needs approximately €1,300–€2,200 per month including rent, depending on location and lifestyle. Sliema and St. Julian's are the most expensive areas; Gozo and central Malta are significantly more affordable.
              </p>

              <div className="grid gap-4 md:grid-cols-3 mb-8">
                {[
                  {
                    city: "Valletta, Sliema & St. Julian's",
                    level: "Most expensive",
                    color: "border-red-200 bg-red-50",
                    badge: "bg-red-100 text-red-700",
                    items: [
                      "1-bed apartment: €900–€1,600/mo",
                      "Single person budget: €1,700–€2,200/mo",
                      "Best for expat community & nightlife",
                    ],
                  },
                  {
                    city: "Gzira, Msida & Birkirkara",
                    level: "Best value",
                    color: "border-green-200 bg-green-50",
                    badge: "bg-green-100 text-green-700",
                    items: [
                      "1-bed apartment: €750–€1,100/mo",
                      "Single person budget: €1,300–€1,700/mo",
                      "10-min walk to Sliema — sweet spot for expats",
                    ],
                  },
                  {
                    city: "Gozo & Southern Malta",
                    level: "Most affordable",
                    color: "border-blue-200 bg-blue-50",
                    badge: "bg-blue-100 text-blue-700",
                    items: [
                      "1-bed apartment: €500–€800/mo",
                      "Single person budget: €1,000–€1,400/mo",
                      "Quieter lifestyle, car recommended",
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
                <h3 className="font-black text-xl mb-6">Typical monthly expenses in Malta</h3>
                <div className="space-y-3">
                  {[
                    ["Rent (1-bed, mid-range area)", "€750 – €1,100"],
                    ["Utilities (electricity & water)", "€60 – €150"],
                    ["Internet (fibre)", "€25 – €40"],
                    ["Groceries", "€200 – €350"],
                    ["Dining out (mid-range)", "€100 – €250"],
                    ["Public transport pass", "~€26/mo (free for residents under 21)"],
                    ["Private health insurance", "€50 – €150"],
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
                  <strong>Insider tip:</strong> Gzira and Msida are where most savvy expats end up — you get a 20–30% discount on Sliema prices while being a 10-minute walk from the waterfront and everything the island has to offer. It's widely considered the sweet spot for value and lifestyle.
                </p>
              </div>
            </section>

            {/* HEALTHCARE */}
            <section id="healthcare">
              <div className="text-sm font-bold uppercase tracking-[0.3em] text-violet-500 mb-4">
                Healthcare
              </div>
              <h2 className="text-4xl font-black mb-8">Healthcare in Malta</h2>
              <p className="text-gray-600 text-lg mb-8">
                Malta has a dual healthcare system — a public National Health Service (NHS equivalent) and a growing private sector. The WHO ranks Malta's healthcare system among the top five in the world. All services are conducted in English, and Malta allocates around 10% of GDP to healthcare — well above the international average.
              </p>

              <div className="grid gap-6 md:grid-cols-2 mb-8">
                {[
                  {
                    icon: "🏥",
                    title: "Public Healthcare",
                    points: [
                      "Free at point of use for all legal residents registered with the public system",
                      "Register at Mater Dei Hospital (the main public hospital) or your local health centre",
                      "Covers GP visits, specialist care, hospital treatment, maternity, and emergency services",
                      "EU nationals can use the European Health Insurance Card (EHIC) at public facilities",
                      "Entirely English-speaking — one of Malta's biggest healthcare advantages",
                      "Mater Dei Hospital is a modern, well-equipped facility opened in 2007",
                      "Dental care is mostly private",
                      "Emergency number: 112",
                    ],
                  },
                  {
                    icon: "💊",
                    title: "Private Health Insurance",
                    points: [
                      "Required for the Malta Retirement Programme and Global Residence Programme",
                      "Monthly premiums typically €50–€150 depending on age and coverage",
                      "Provides faster access to specialists and private clinics",
                      "Many private clinics in Sliema, St. Julian's, and Valletta offer same-day appointments",
                      "Generally more affordable than comparable private insurance in the UK or US",
                      "Popular providers: Bupa International, AXA, GasanMamo, Atlas Insurance",
                      "Particularly recommended while residency registration is being processed",
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
                  <strong>Key advantage:</strong> Malta's healthcare system is entirely English-speaking — unlike most other European countries. This is a significant practical benefit for expats, removing the language barrier that can make navigating healthcare systems difficult elsewhere.
                </p>
              </div>
            </section>

            {/* BANKING */}
            <section id="banking">
              <div className="text-sm font-bold uppercase tracking-[0.3em] text-violet-500 mb-4">
                Banking & Finance
              </div>
              <h2 className="text-4xl font-black mb-8">Banking in Malta</h2>
              <p className="text-gray-600 text-lg mb-8">
                Malta has a well-regulated banking sector supervised by the Malta Financial Services Authority (MFSA). Banking is conducted entirely in English. Opening an account requires proof of residency and identity. Many expats use digital banks like Revolut or Wise while setting up their Maltese account.
              </p>

              <div className="grid gap-6 md:grid-cols-2 mb-8">
                {[
                  {
                    title: "What you'll need to open an account",
                    points: [
                      "Valid passport or national ID",
                      "Proof of Maltese address (rental contract or utility bill)",
                      "Proof of residency status (eResidence card, residence permit, or Nomad Residence Permit)",
                      "Proof of income or employment",
                      "Some banks may require a reference or source of funds declaration",
                      "All communication and documentation is in English",
                    ],
                  },
                  {
                    title: "Banks and services in Malta",
                    points: [
                      "Bank of Valletta (BOV) — Malta's largest bank, full-service branches across the island",
                      "HSBC Malta — strong international banking with good English support",
                      "APS Bank — popular with residents for personal banking",
                      "Medirect — online-focused bank popular with expats and investors",
                      "Revolut / Wise — widely used by expats for day-to-day spending and international transfers",
                      "Lombard Bank — smaller bank popular with business clients",
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
                  <strong>Tip:</strong> Malta uses the Euro (€) and is part of the Eurozone. Banking is fully English-speaking and straightforward compared to many other European countries. The MFSA is a well-respected regulator — Malta's financial sector is internationally recognised and trusted.
                </p>
              </div>
            </section>

            {/* PROS & CONS */}
            <section id="pros-cons">
              <div className="text-sm font-bold uppercase tracking-[0.3em] text-violet-500 mb-4">
                Summary
              </div>
              <h2 className="text-4xl font-black mb-8">Is Malta right for you?</h2>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-[24px] bg-green-50 border-2 border-green-200 p-8">
                  <h3 className="font-black text-xl text-green-800 mb-4">✅ Reasons to move to Malta</h3>
                  <ul className="space-y-3">
                    {[
                      "English is an official language — no language barrier anywhere",
                      "Foreign income not remitted to Malta is generally tax-free for nomad permit holders",
                      "No inheritance tax, no wealth tax, no gift tax",
                      "15% flat tax for retirees and Global Residence Programme holders",
                      "HQP 15% flat rate for senior professionals in finance, gaming, and aviation",
                      "WHO top-5 ranked healthcare system — entirely English-speaking",
                      "Mediterranean climate — mild winters, warm summers",
                      "Nomad Residence Permit includes Schengen visa — travel freely across Europe",
                      "Very large, welcoming expat community — 30% of the population is foreign-born",
                      "EU member state — pathway to EU residency and citizenship",
                      "Strong iGaming, fintech, and financial services job market",
                      "Excellent internet infrastructure — widest fibre broadband coverage in the EU",
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
                      "Very small island (316 km²) — can feel cramped, especially in summer",
                      "Nomad permit income requirement raised to €42,000/year in 2024 — higher than many other countries",
                      "Housing prices have risen significantly due to expat and gaming company demand",
                      "Traffic congestion is a significant issue — Malta has one of the highest car ownership rates in Europe",
                      "Limited natural landscapes compared to other Mediterranean destinations",
                      "Summers can be very hot and dry (35°C+), and the island is crowded with tourists",
                      "Nomad Residence Permit refusals have no right of appeal",
                      "Home country tax obligations may still apply even if Malta doesn't tax you",
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
                Use our free tool to compare Malta with other European countries and find the best fit for your situation.
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
        <div className="mt-4 flex justify-center gap-6">
          <a href="https://www.facebook.com/profile.php?id=61590536665706" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
          </a>
          <a href="https://www.instagram.com/relocate2day" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
          </a>
          <a href="https://x.com/Relocate2Day" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
          </a>
        </div>
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