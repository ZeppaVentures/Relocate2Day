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
  { id: "pros-cons", label: "Is the Netherlands right for you?" },
];

export default function NetherlandsPage() {
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
          style={{ backgroundImage: "url('/images/countries/netherlands-hero.jpg')" }}
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative mx-auto max-w-7xl px-6 py-28 text-white">
          <div className="inline-flex rounded-full bg-orange-400 px-4 py-1 text-xs font-bold uppercase tracking-wide mb-6">
            Netherlands
          </div>
          <h1 className="text-6xl font-black leading-none md:text-8xl">
            Move to the Netherlands
          </h1>
          <p className="mt-6 max-w-2xl text-xl text-white/80">
            Europe's most international nation — 95% English proficiency, world-class cycling infrastructure, and the famous 30% tax ruling that makes it one of the most financially attractive destinations for skilled professionals.
          </p>
          <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4 max-w-3xl">
            {[
              { label: "Income tax (from)", value: "36.93%" },
              { label: "Cost of living", value: "From €2,000/mo" },
              { label: "EU member since", value: "1957" },
              { label: "English proficiency", value: "95%+" },
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
              <h2 className="text-4xl font-black mb-8">How to move to the Netherlands</h2>
              <p className="text-gray-600 text-lg mb-8">
                EU/EEA citizens move to the Netherlands freely — no visa, no permit, just register at your local municipality within 4 months. Non-EU nationals have several strong pathways, with the Highly Skilled Migrant (Kennismigrant) permit being the most common route for professionals. Processing times are fast by European standards — typically 2–4 weeks.
              </p>

              <div className="space-y-6">
                {[
                  {
                    title: "EU / EEA Citizens",
                    badge: "Free movement",
                    badgeColor: "bg-green-100 text-green-700",
                    points: [
                      "EU/EEA citizens have the right to live and work in the Netherlands without a visa or permit",
                      "Register at your local municipality (gemeente) within 4 months of arrival",
                      "Bring your passport and proof of address to the gemeente registration",
                      "You'll receive a BSN (Burgerservicenummer) — your essential ID number for tax, healthcare, banking, and employment",
                      "You can also register at the IND (Immigration and Naturalisation Service) for an optional residence document after 3 months",
                      "After 5 years of continuous legal residence, eligible for permanent residency",
                      "No income or insurance requirements for EU citizens — but health insurance is mandatory for all residents",
                    ],
                  },
                  {
                    title: "Highly Skilled Migrant (Kennismigrant) Permit",
                    badge: "Skilled professionals",
                    badgeColor: "bg-violet-100 text-violet-700",
                    points: [
                      "The main pathway for non-EU professionals — employer-sponsored",
                      "Requires a recognised sponsor employer (most multinationals and tech companies qualify)",
                      "Minimum salary threshold: €4,840/month gross for applicants aged 30+ (2026)",
                      "Lower threshold: €3,549/month for applicants under 30",
                      "Processing time: typically 2–4 weeks — one of the fastest in Europe",
                      "Permit issued for the duration of the employment contract, up to 5 years",
                      "Spouse or partner receives a residence permit with unrestricted work authorisation",
                      "Pathway to permanent residency after 5 years",
                      "Qualifies for the 30% ruling — see tax section below",
                    ],
                  },
                  {
                    title: "DAFT Visa (Dutch-American Friendship Treaty)",
                    badge: "US citizens",
                    badgeColor: "bg-blue-100 text-blue-700",
                    points: [
                      "Exclusively for US citizens — allows self-employment and business ownership in the Netherlands",
                      "Minimum investment of €4,500 in a Dutch business",
                      "Does not require employer sponsorship",
                      "Valid for 2 years initially, renewable",
                      "Popular with American freelancers, consultants, and entrepreneurs",
                      "Pathway to permanent residency after 5 years",
                    ],
                  },
                  {
                    title: "Orientation Year Permit",
                    badge: "Recent graduates",
                    badgeColor: "bg-orange-100 text-orange-700",
                    points: [
                      "For recent graduates from top universities worldwide",
                      "Allows 1 year to find work or set up a business in the Netherlands",
                      "Must have graduated within 3 years of applying",
                      "From a university ranked in the top 200 globally",
                      "Can transition to Highly Skilled Migrant or self-employment permit after finding work",
                    ],
                  },
                  {
                    title: "Family Reunification",
                    badge: "Partners & families",
                    badgeColor: "bg-pink-100 text-pink-700",
                    points: [
                      "Partners and dependent children of residents can apply for family reunification",
                      "Sponsor must meet minimum income requirements",
                      "Partners of Highly Skilled Migrants receive unrestricted work rights",
                      "Apply through the IND — processing typically takes 3 months",
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
                  <strong>Important:</strong> Getting your BSN number is your most critical first step — without it you cannot open a bank account, access healthcare, or be added to payroll. Register at your gemeente within 4 months of arrival. Always verify current salary thresholds and requirements with the IND (ind.nl/en) before applying.
                </p>
              </div>
            </section>

            {/* TAXES */}
            <section id="taxes">
              <div className="text-sm font-bold uppercase tracking-[0.3em] text-violet-500 mb-4">
                Taxes
              </div>
              <h2 className="text-4xl font-black mb-8">Understanding tax in the Netherlands</h2>
              <p className="text-gray-600 text-lg mb-8">
                The Netherlands has a two-bracket income tax system, with rates of 36.93% up to approximately €73,000 and 49.50% above that. However, the famous 30% ruling allows qualifying skilled expats to receive 30% of their gross salary tax-free for up to 5 years — making the effective tax burden significantly lower and one of the most generous expat incentives in Europe.
              </p>

              {/* Key tax highlights */}
              <div className="rounded-[28px] bg-gradient-to-br from-violet-600 via-pink-500 to-orange-400 p-8 text-white mb-8">
                <h3 className="text-2xl font-black mb-2">The 30% Ruling — Europe's Best Expat Tax Break</h3>
                <p className="text-white/80 mb-6">
                  Qualifying skilled migrants recruited from abroad can receive 30% of their gross salary completely tax-free for up to 5 years. For an €80,000 salary, this saves approximately €7,000–€10,000 per year in tax.
                </p>
                <div className="grid gap-4 md:grid-cols-2">
                  {[
                    { label: "Tax-free allowance", value: "30% of gross salary" },
                    { label: "Maximum salary cap", value: "€262,000 (WNT limit)" },
                    { label: "Minimum salary (30+)", value: "€48,013/year" },
                    { label: "Minimum salary (under 30, Master's)", value: "€36,497/year" },
                    { label: "Duration", value: "5 years maximum" },
                    { label: "2027 onwards", value: "Drops to 27% permanently" },
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
                  <h4 className="font-black text-lg mb-3">30% Ruling — eligibility requirements</h4>
                  <ul className="space-y-2 text-gray-600">
                    {[
                      "Must have been recruited from abroad — lived at least 150km from the Dutch border for 16 of the 24 months before employment",
                      "Must earn above the minimum salary threshold (€48,013/year for 30+)",
                      "Must be employed by a recognised sponsor employer",
                      "Apply within 4 months of starting your Dutch employment",
                      "The ruling is still 30% in 2026 — drops permanently to 27% from 2027",
                      "Does not affect your partner's separate tax obligations",
                    ].map((point) => (
                      <li key={point} className="flex gap-3">
                        <span className="text-violet-500 mt-0.5">✓</span>
                        <span className="text-sm">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-[20px] bg-[#f8f7ff] p-6">
                  <h4 className="font-black text-lg mb-3">Key Dutch tax rates (2026)</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-gray-600">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-2 font-bold text-[#0B1957]">Tax / Bracket</th>
                          <th className="text-left py-2 font-bold text-[#0B1957]">Rate</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          ["Income tax (Box 1, up to ~€73,000)", "36.93%"],
                          ["Income tax (Box 1, above ~€73,000)", "49.50%"],
                          ["Savings & investments (Box 3)", "Wealth-based (approx. 31–34%)"],
                          ["Dividend / substantial interest (Box 2)", "24.5% (first €67k) / 31% above"],
                          ["Corporate tax (up to €200,000)", "19%"],
                          ["Corporate tax (above €200,000)", "25.8%"],
                          ["VAT (standard)", "21%"],
                          ["Healthcare levy (employer)", "~6.57% on gross salary"],
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
                  <strong>Tax advice disclaimer:</strong> Dutch tax residency is not determined by a simple day count — it depends on your specific circumstances. UK expats and those with income from multiple countries should take specialist advice on Box 3 wealth taxation and pension treatment. Always consult a qualified Dutch tax adviser before making decisions.
                </p>
              </div>
            </section>

            {/* COST OF LIVING */}
            <section id="cost-of-living">
              <div className="text-sm font-bold uppercase tracking-[0.3em] text-violet-500 mb-4">
                Cost of Living
              </div>
              <h2 className="text-4xl font-black mb-8">What does life in the Netherlands cost?</h2>
              <p className="text-gray-600 text-lg mb-8">
                The Netherlands is more expensive than Southern Europe but offers an exceptional quality of life. Amsterdam is the priciest city — but Rotterdam and Utrecht run 20–30% cheaper with comparable quality. The Netherlands has more bicycles than people, and a 35,000km cycling network means transport costs are minimal for most residents.
              </p>

              <div className="grid gap-4 md:grid-cols-3 mb-8">
                {[
                  {
                    city: "Amsterdam",
                    level: "Most expensive",
                    color: "border-red-200 bg-red-50",
                    badge: "bg-red-100 text-red-700",
                    items: [
                      "1-bed apartment: €1,400–€2,200/mo",
                      "Single person budget: €2,800–€3,800/mo",
                      "Best for finance, tech & culture",
                    ],
                  },
                  {
                    city: "Rotterdam & The Hague",
                    level: "Mid-range",
                    color: "border-yellow-200 bg-yellow-50",
                    badge: "bg-yellow-100 text-yellow-700",
                    items: [
                      "1-bed apartment: €1,000–€1,600/mo",
                      "Single person budget: €2,000–€2,800/mo",
                      "Modern, international, 20% cheaper",
                    ],
                  },
                  {
                    city: "Utrecht & Eindhoven",
                    level: "Best value",
                    color: "border-green-200 bg-green-50",
                    badge: "bg-green-100 text-green-700",
                    items: [
                      "1-bed apartment: €900–€1,400/mo",
                      "Single person budget: €1,800–€2,500/mo",
                      "Strong tech scene, great lifestyle",
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
                <h3 className="font-black text-xl mb-6">Typical monthly expenses in Amsterdam</h3>
                <div className="space-y-3">
                  {[
                    ["Rent (1-bed, city centre)", "€1,400 – €2,200"],
                    ["Utilities (electricity, heating, water)", "€150 – €250"],
                    ["Internet (fibre)", "€30 – €50"],
                    ["Groceries", "€300 – €450"],
                    ["Dining out (mid-range)", "€200 – €350"],
                    ["Public transport pass", "€100 – €150"],
                    ["Mandatory health insurance", "€150 – €200"],
                    ["Gym membership", "€30 – €60"],
                    ["Mobile plan", "€20 – €40"],
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
                  <strong>Housing tip:</strong> The Dutch housing market is among Europe's tightest — average availability is limited at around 35%. Start your housing search early, have all documents ready, and act fast when you find something. Rotterdam and Utrecht offer a much better chance of finding accommodation than Amsterdam.
                </p>
              </div>
            </section>

            {/* HEALTHCARE */}
            <section id="healthcare">
              <div className="text-sm font-bold uppercase tracking-[0.3em] text-violet-500 mb-4">
                Healthcare
              </div>
              <h2 className="text-4xl font-black mb-8">Healthcare in the Netherlands</h2>
              <p className="text-gray-600 text-lg mb-8">
                The Netherlands has one of the best healthcare systems in Europe — but it is not free. Health insurance is mandatory for all residents and must be arranged privately within 4 months of registering. The system is a managed competition model with high quality, excellent English-language service, and a universal baseline of care.
              </p>

              <div className="grid gap-6 md:grid-cols-2 mb-8">
                {[
                  {
                    icon: "🏥",
                    title: "How Dutch Healthcare Works",
                    points: [
                      "Health insurance (basisverzekering) is mandatory for all residents — must be arranged within 4 months of registering",
                      "Average basic insurance cost: €150–€200/month in 2026",
                      "Annual deductible (eigen risico): €385 — you pay the first €385 of non-GP care each year",
                      "GP (huisarts) visits are covered — your GP is your gateway to specialist care",
                      "Employers pay a separate healthcare levy (~6.57%) on top of your salary",
                      "Emergency number: 112 (EU standard)",
                      "English widely spoken by all Dutch healthcare professionals",
                      "Ranked consistently among the top 5 healthcare systems in Europe",
                    ],
                  },
                  {
                    icon: "💊",
                    title: "Practical Steps for Expats",
                    points: [
                      "Get your BSN number first — required to register for health insurance",
                      "Register with a local GP (huisarts) within your area — they manage your care",
                      "Choose a health insurer — popular options include Zilveren Kruis, VGZ, CZ, and Menzis",
                      "Consider supplementary insurance (aanvullende verzekering) for dental, physio, and specialist care",
                      "If you miss the 4-month registration window, you may face backdated premiums and penalties",
                      "Expats with international employer plans should check if these satisfy Dutch requirements",
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

              <div className="rounded-[20px] bg-amber-50 border border-amber-200 p-6">
                <p className="text-sm text-amber-800">
                  <strong>Important:</strong> Do not delay arranging your health insurance. Failing to register within 4 months of arriving can result in backdated premiums and financial penalties. Set this up immediately after getting your BSN.
                </p>
              </div>
            </section>

            {/* BANKING */}
            <section id="banking">
              <div className="text-sm font-bold uppercase tracking-[0.3em] text-violet-500 mb-4">
                Banking & Finance
              </div>
              <h2 className="text-4xl font-black mb-8">Banking in the Netherlands</h2>
              <p className="text-gray-600 text-lg mb-8">
                The Netherlands has a modern, efficient banking system and is one of the easiest countries in Europe for expats to open a bank account. You'll need your BSN number first — without it, most Dutch banks cannot open an account. Fortunately, Revolut and Wise work seamlessly in the Netherlands while you get set up.
              </p>

              <div className="grid gap-6 md:grid-cols-2 mb-8">
                {[
                  {
                    title: "What you'll need to open an account",
                    points: [
                      "Valid passport or national ID",
                      "BSN (Burgerservicenummer) — essential, get this first",
                      "Proof of Dutch address (rental contract)",
                      "For non-EU nationals: valid residence permit",
                      "Most major Dutch banks offer English-language service",
                      "Online account opening available at several banks — ING and Bunq are fully digital",
                    ],
                  },
                  {
                    title: "Banks operating in the Netherlands",
                    points: [
                      "ING — largest bank, excellent app and English service",
                      "ABN AMRO — popular with expats and professionals",
                      "Rabobank — strong retail banking, particularly outside cities",
                      "SNS Bank — affordable and straightforward",
                      "Bunq — fully digital, expat-friendly, fast to open",
                      "Revolut / Wise — ideal while you wait for your BSN and local account",
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
                  <strong>Tip:</strong> The Netherlands is one of the most cashless societies in Europe — many shops and restaurants don't accept cash at all. Set up a contactless card (Revolut or Wise works immediately) before you arrive, and get your local bank account sorted within your first two weeks.
                </p>
              </div>
            </section>

            {/* PROS & CONS */}
            <section id="pros-cons">
              <div className="text-sm font-bold uppercase tracking-[0.3em] text-violet-500 mb-4">
                Summary
              </div>
              <h2 className="text-4xl font-black mb-8">Is the Netherlands right for you?</h2>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-[24px] bg-green-50 border-2 border-green-200 p-8">
                  <h3 className="font-black text-xl text-green-800 mb-4">✅ Reasons to move to the Netherlands</h3>
                  <ul className="space-y-3">
                    {[
                      "30% tax ruling — 30% of salary tax-free for 5 years for qualifying expats",
                      "95%+ English proficiency — easiest non-English-speaking country in Europe for expats",
                      "World-class cycling infrastructure — bikes replace cars entirely in most cities",
                      "One of Europe's top healthcare systems",
                      "EU member — full freedom of movement and rights",
                      "Strong job market — finance, tech, logistics, and pharma hubs",
                      "85% of companies accept remote work",
                      "Highly international cities with vibrant expat communities",
                      "Fast and efficient public transport",
                      "Gateway to the rest of Europe — Amsterdam Schiphol is one of Europe's busiest hubs",
                      "Excellent education system — including many English-taught programmes",
                      "Partners of Highly Skilled Migrants receive full work rights",
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
                      "High income tax rates (36.93–49.50%) without the 30% ruling",
                      "30% ruling drops to 27% from 2027 — factor this into long-term planning",
                      "Housing market is extremely tight — especially in Amsterdam",
                      "Cost of living is significantly higher than Southern Europe",
                      "Mandatory health insurance adds €150–200/month to your expenses",
                      "Weather is grey and rainy for much of the year",
                      "Dutch bureaucracy (though less severe than Southern Europe) requires patience",
                      "Box 3 wealth tax can impact those with significant savings or investments",
                      "Dutch language required for public sector jobs and full integration",
                      "High property purchase prices — average €5,200/m²",
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
                Use our free tool to compare the Netherlands with other European countries and find the best fit for your situation.
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
