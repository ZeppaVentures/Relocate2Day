"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const sections = [
  { id: "visas", label: "Visas & Residency" },
  { id: "taxes", label: "Taxes" },
  { id: "cost-of-living", label: "Cost of Living" },
  { id: "healthcare", label: "Healthcare" },
  { id: "banking", label: "Banking & Finance" },
  { id: "pros-cons", label: "Is Spain right for you?" },
];

export default function SpainPage() {
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
            backgroundImage: "url('/images/countries/spain-hero.jpg')",
          }}
        />
        <div className="absolute inset-0 bg-black/20" />

        <div className="relative mx-auto max-w-7xl px-6 py-28 text-white">
          <div className="inline-flex rounded-full bg-orange-400 px-4 py-1 text-xs font-bold uppercase tracking-wide mb-6">
            Spain
          </div>
          <h1 className="text-6xl font-black leading-none md:text-8xl">
            Move to Spain
          </h1>
          <p className="mt-6 max-w-2xl text-xl text-white/80">
            Sunshine, culture, world-class food and one of Europe's most attractive tax regimes for newcomers. Here's everything you need to know.
          </p>

          <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4 max-w-3xl">
            {[
              { label: "Cost of living", value: "From €1,200/mo" },
              { label: "Flat tax (Beckham Law)", value: "24%" },
              { label: "Climate", value: "300+ sunny days" },
              { label: "Official language", value: "Spanish" },
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
              <h2 className="text-4xl font-black mb-8">How to move to Spain</h2>
              <p className="text-gray-600 text-lg mb-8">
                Spain offers several visa routes depending on your situation — whether you're employed, self-employed, retired, or a student. EU/EEA citizens can move freely and simply need to register their residency. Non-EU nationals will need one of the following visas.
              </p>

              <div className="space-y-6">
                {[
                  {
                    title: "Digital Nomad Visa (Telework Visa)",
                    badge: "Remote workers & freelancers",
                    badgeColor: "bg-violet-100 text-violet-700",
                    points: [
                      "For non-EU nationals working remotely for companies or clients outside Spain",
                      "Requires a minimum income of approx. €2,850/month (200% of Spain's minimum wage)",
                      "Valid for 1 year via consulate, or up to 3 years if applied from within Spain",
                      "Renewable up to 5 years total, with a pathway to permanent residency after 5 years",
                      "Can bring spouse, partner, and dependent children",
                      "Application fee: approx. €80",
                    ],
                  },
                  {
                    title: "Non-Lucrative Visa (NLV)",
                    badge: "Retirees & passive income",
                    badgeColor: "bg-orange-100 text-orange-700",
                    points: [
                      "For those who do not intend to work in Spain — ideal for retirees",
                      "Must demonstrate approx. €2,400/month in passive income or savings",
                      "Requires private health insurance valid in Spain",
                      "Initial 1-year visa, renewable in 2-year periods up to 5 years",
                      "Does not permit local employment",
                      "After 5 years, eligible to apply for permanent residency",
                    ],
                  },
                  {
                    title: "Student Visa",
                    badge: "Students",
                    badgeColor: "bg-blue-100 text-blue-700",
                    points: [
                      "For non-EU nationals enrolled in a recognised Spanish educational institution",
                      "Valid for the full duration of the approved course",
                      "Permits part-time work of up to 30 hours per week",
                      "Upon completing studies, can convert to a work permit without leaving Spain (except language course students)",
                      "Language course students are not eligible to convert to a work permit",
                    ],
                  },
                  {
                    title: "Work Visa (Employee Relocation)",
                    badge: "Employees relocating with a company",
                    badgeColor: "bg-green-100 text-green-700",
                    points: [
                      "For non-EU employees transferred to a Spanish branch or subsidiary",
                      "The employer sponsors the application and handles much of the paperwork",
                      "Intra-Company Transfer (ICT) permit available for multinational employees",
                      "May be eligible for the Beckham Law tax regime (see Tax section below)",
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
                  <strong>Important:</strong> Spain's Golden Visa (real estate investment route) was officially ended in April 2025. Immigration rules change regularly — always verify requirements with a qualified Spanish immigration lawyer before applying.
                </p>
              </div>
            </section>

            {/* TAXES */}
            <section id="taxes">
              <div className="text-sm font-bold uppercase tracking-[0.3em] text-violet-500 mb-4">
                Taxes
              </div>
              <h2 className="text-4xl font-black mb-8">Understanding tax in Spain</h2>
              <p className="text-gray-600 text-lg mb-8">
                Spain's standard income tax rates are progressive and can reach up to 47% for high earners. However, newcomers may qualify for a significant tax break known as the Beckham Law.
              </p>

              <div className="rounded-[28px] bg-gradient-to-br from-violet-600 via-pink-500 to-orange-400 p-8 text-white mb-8">
                <h3 className="text-2xl font-black mb-2">The Beckham Law</h3>
                <p className="text-white/80 mb-6">Spain's special tax regime for newcomers — named after David Beckham, who was among the first to use it when joining Real Madrid in 2003.</p>
                <div className="grid gap-4 md:grid-cols-2">
                  {[
                    { label: "Flat tax rate", value: "24% on Spanish income up to €600,000" },
                    { label: "Duration", value: "Up to 6 years" },
                    { label: "Foreign income", value: "Generally exempt from Spanish tax" },
                    { label: "Application deadline", value: "Within 6 months of starting work" },
                  ].map((item) => (
                    <div key={item.label} className="rounded-2xl bg-white/15 p-4">
                      <div className="text-sm text-white/70">{item.label}</div>
                      <div className="mt-1 font-bold">{item.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div className="rounded-[20px] bg-[#f8f7ff] p-6">
                  <h4 className="font-black text-lg mb-2">Who qualifies for the Beckham Law?</h4>
                  <ul className="space-y-2 text-gray-600">
                    {[
                      "You must not have been a Spanish tax resident in the 10 years prior to moving",
                      "You must be moving to Spain for work reasons (employment, entrepreneurship, or as a highly qualified professional)",
                      "Applies to Digital Nomad Visa holders, employees relocated by a company, and entrepreneurs",
                      "Your spouse and children under 25 can also benefit from the preferential rates",
                    ].map((point) => (
                      <li key={point} className="flex gap-3">
                        <span className="text-violet-500 mt-0.5">✓</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-[20px] bg-[#f8f7ff] p-6">
                  <h4 className="font-black text-lg mb-2">Standard income tax rates (without Beckham Law)</h4>
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
                          ["Up to €12,450", "19%"],
                          ["€12,450 – €20,200", "24%"],
                          ["€20,200 – €35,200", "30%"],
                          ["€35,200 – €60,000", "37%"],
                          ["€60,000 – €300,000", "45%"],
                          ["Over €300,000", "47%"],
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
              </div>

              <div className="mt-6 rounded-[20px] bg-amber-50 border border-amber-200 p-6">
                <p className="text-sm text-amber-800">
                  <strong>Tax advice disclaimer:</strong> Tax laws change frequently and depend on your personal situation, income type, and country of origin. Always consult a qualified Spanish tax advisor before making any decisions.
                </p>
              </div>
            </section>

            {/* COST OF LIVING */}
            <section id="cost-of-living">
              <div className="text-sm font-bold uppercase tracking-[0.3em] text-violet-500 mb-4">
                Cost of Living
              </div>
              <h2 className="text-4xl font-black mb-8">What does life in Spain cost?</h2>
              <p className="text-gray-600 text-lg mb-8">
                Spain is generally 25–34% cheaper than the US or Northern Europe. A single person can live comfortably on €1,200–€2,000/month, while families typically need €3,000–€3,500/month. Costs vary significantly by city.
              </p>

              <div className="grid gap-4 md:grid-cols-3 mb-8">
                {[
                  {
                    city: "Madrid & Barcelona",
                    level: "Most expensive",
                    color: "border-red-200 bg-red-50",
                    badge: "bg-red-100 text-red-700",
                    items: [
                      "1-bed apartment (centre): €1,400–€1,800/mo",
                      "Single person budget: €2,000+/mo",
                      "Monthly transport pass: €55",
                    ],
                  },
                  {
                    city: "Valencia, Málaga, Seville",
                    level: "Mid-range",
                    color: "border-yellow-200 bg-yellow-50",
                    badge: "bg-yellow-100 text-yellow-700",
                    items: [
                      "1-bed apartment (centre): €750–€900/mo",
                      "Single person budget: €1,500–€1,750/mo",
                      "Monthly transport pass: €40–€50",
                    ],
                  },
                  {
                    city: "Smaller cities & rural areas",
                    level: "Most affordable",
                    color: "border-green-200 bg-green-50",
                    badge: "bg-green-100 text-green-700",
                    items: [
                      "1-bed apartment: €350–€700/mo",
                      "Single person budget: €950–€1,200/mo",
                      "Car often needed",
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
                <h3 className="font-black text-xl mb-6">Typical monthly expenses (outside Madrid/Barcelona)</h3>
                <div className="space-y-3">
                  {[
                    ["Rent (1-bed, city centre)", "€700 – €1,000"],
                    ["Utilities (electricity, water, gas)", "€100 – €150"],
                    ["Groceries", "€200 – €350"],
                    ["Dining out (mid-range)", "€150 – €300"],
                    ["Public transport pass", "€40 – €55"],
                    ["Private health insurance", "€50 – €120"],
                    ["Gym membership", "€20 – €50"],
                    ["Mobile plan", "€10 – €30"],
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
              <h2 className="text-4xl font-black mb-8">Healthcare in Spain</h2>
              <p className="text-gray-600 text-lg mb-8">
                Spain's healthcare system, the Sistema Nacional de Salud (SNS), is ranked among the best in the world — covering over 99% of residents. As an expat, your access depends on your residency status and how you contribute to social security.
              </p>

              <div className="grid gap-6 md:grid-cols-2 mb-8">
                {[
                  {
                    icon: "🏥",
                    title: "Public Healthcare (SNS)",
                    points: [
                      "Free at point of use for legal residents contributing to social security",
                      "Covers GP visits, specialist consultations, hospital care, emergency services, maternity care, and vaccinations",
                      "Dental and optical care are NOT covered — you pay privately",
                      "Some prescription co-payments apply",
                      "Waiting times for non-urgent specialist care can be long",
                      "Convenio Especial available for those not contributing to social security: approx. €60/month (under 65)",
                    ],
                  },
                  {
                    icon: "💊",
                    title: "Private Health Insurance",
                    points: [
                      "Required for most visa applications (Digital Nomad Visa, Non-Lucrative Visa)",
                      "Costs approx. €50–€120/month per person for a solid plan",
                      "Provides faster access to specialists and shorter waiting times",
                      "Many providers offer English-speaking doctors, especially in major cities",
                      "Covers dental, optical, and services not included in the public system",
                      "Popular providers: Sanitas, Adeslas, Asisa, Caser",
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
                  <strong>Tip for new arrivals:</strong> Most expats start with private insurance to meet visa requirements and for faster access, then register for public healthcare once eligible. To access the SNS, you'll need your NIE (foreigner ID number) and to register at your local town hall (empadronamiento).
                </p>
              </div>
            </section>

            {/* BANKING */}
            <section id="banking">
              <div className="text-sm font-bold uppercase tracking-[0.3em] text-violet-500 mb-4">
                Banking & Finance
              </div>
              <h2 className="text-4xl font-black mb-8">Banking in Spain</h2>
              <p className="text-gray-600 text-lg mb-8">
                Opening a bank account in Spain is straightforward once you have your NIE (Número de Identificación de Extranjero). You'll need a Spanish bank account for paying rent, utilities, and receiving your salary.
              </p>

              <div className="grid gap-6 md:grid-cols-2 mb-8">
                {[
                  {
                    title: "What you'll need to open an account",
                    points: [
                      "NIE (Número de Identificación de Extranjero) — your foreigner ID",
                      "Valid passport",
                      "Proof of address in Spain (empadronamiento certificate)",
                      "Proof of employment or income (for some banks)",
                    ],
                  },
                  {
                    title: "Popular banks for expats",
                    points: [
                      "Santander — largest Spanish bank, good English support",
                      "BBVA — excellent app and online banking",
                      "CaixaBank — wide branch network across Spain",
                      "N26 / Revolut — online-only, great for new arrivals before getting a NIE",
                      "Sabadell — popular with expats in coastal areas",
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
                  <strong>Tip:</strong> Get a Revolut or N26 account before you move — it lets you spend in euros fee-free while you're setting up your NIE and Spanish bank account, which can take several weeks.
                </p>
              </div>
            </section>

            {/* PROS & CONS */}
            <section id="pros-cons">
              <div className="text-sm font-bold uppercase tracking-[0.3em] text-violet-500 mb-4">
                Summary
              </div>
              <h2 className="text-4xl font-black mb-8">Is Spain right for you?</h2>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-[24px] bg-green-50 border-2 border-green-200 p-8">
                  <h3 className="font-black text-xl text-green-800 mb-4">✅ Reasons to move to Spain</h3>
                  <ul className="space-y-3">
                    {[
                      "Beckham Law — one of Europe's most attractive tax regimes for newcomers",
                      "300+ days of sunshine per year",
                      "World-class food, culture and quality of life",
                      "Excellent public healthcare system",
                      "Lower cost of living than most of Western Europe",
                      "Great transport links within Europe",
                      "Welcoming expat communities in most major cities",
                      "Pathway to EU residency and citizenship",
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
                      "Spanish bureaucracy can be slow and complex",
                      "NIE applications can take weeks — plan ahead",
                      "Housing market is tight in Madrid and Barcelona",
                      "Spanish language is essential outside major cities",
                      "Standard tax rates can be high (up to 47%) if you don't qualify for Beckham Law",
                      "Long waiting times for non-urgent public healthcare",
                      "Golden Visa (real estate route) was eliminated in 2025",
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
                Use our free tool to compare Spain with other European countries and find the best fit for your situation.
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