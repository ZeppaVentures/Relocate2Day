"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

// ─── Data ────────────────────────────────────────────────────────────────────

const COUNTRIES = [
  "Afghanistan","Albania","Algeria","Andorra","Angola","Antigua and Barbuda",
  "Argentina","Armenia","Australia","Austria","Azerbaijan","Bahamas","Bahrain",
  "Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bhutan",
  "Bolivia","Bosnia and Herzegovina","Botswana","Brazil","Brunei","Bulgaria",
  "Burkina Faso","Burundi","Cabo Verde","Cambodia","Cameroon","Canada",
  "Central African Republic","Chad","Chile","China","Colombia","Comoros",
  "Congo (DRC)","Congo (Republic)","Costa Rica","Croatia","Cuba","Cyprus",
  "Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic",
  "Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia",
  "Eswatini","Ethiopia","Fiji","Finland","France","Gabon","Gambia","Georgia",
  "Germany","Ghana","Greece","Grenada","Guatemala","Guinea","Guinea-Bissau",
  "Guyana","Haiti","Honduras","Hungary","Iceland","India","Indonesia","Iran",
  "Iraq","Ireland","Israel","Italy","Jamaica","Japan","Jordan","Kazakhstan",
  "Kenya","Kiribati","Kosovo","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon",
  "Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg",
  "Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands",
  "Mauritania","Mauritius","Mexico","Micronesia","Moldova","Monaco","Mongolia",
  "Montenegro","Morocco","Mozambique","Myanmar","Namibia","Nauru","Nepal",
  "Netherlands","New Zealand","Nicaragua","Niger","Nigeria","North Korea",
  "North Macedonia","Norway","Oman","Pakistan","Palau","Palestine","Panama",
  "Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal",
  "Qatar","Romania","Russia","Rwanda","Saint Kitts and Nevis","Saint Lucia",
  "Saint Vincent and the Grenadines","Samoa","San Marino","São Tomé and Príncipe",
  "Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore",
  "Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Korea",
  "South Sudan","Spain","Sri Lanka","Sudan","Suriname","Sweden","Switzerland",
  "Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor-Leste","Togo",
  "Tonga","Trinidad and Tobago","Tunisia","Turkey","Turkmenistan","Tuvalu",
  "Uganda","Ukraine","United Arab Emirates","United Kingdom","United States",
  "Uruguay","Uzbekistan","Vanuatu","Vatican City","Venezuela","Vietnam",
  "Yemen","Zambia","Zimbabwe",
];

const INCOME_BRACKETS = [
  "Under €10,000",
  "€10,000 – €20,000",
  "€20,000 – €30,000",
  "€30,000 – €40,000",
  "€40,000 – €50,000",
  "€50,000 – €60,000",
  "€60,000 – €75,000",
  "€75,000 – €90,000",
  "Over €90,000",
];

const INDUSTRIES = [
  "Accounting & Finance",
  "Agriculture & Farming",
  "Architecture & Design",
  "Arts & Creative",
  "Automotive",
  "Construction & Trades",
  "Consulting",
  "Education & Teaching",
  "Engineering",
  "Entertainment & Media",
  "Fashion & Retail",
  "Fintech",
  "Government & Public Sector",
  "Healthcare & Medicine",
  "Hospitality & Tourism",
  "Human Resources",
  "Insurance",
  "Legal",
  "Logistics & Supply Chain",
  "Manufacturing",
  "Marketing & Advertising",
  "Non-profit & NGO",
  "Oil, Gas & Energy",
  "Pharmaceuticals",
  "Property & Real Estate",
  "Recruiting & Staffing",
  "Research & Science",
  "Retail & E-commerce",
  "Social Work & Care",
  "Sports & Fitness",
  "Technology & IT",
  "Telecommunications",
  "Transport & Aviation",
  "Other",
];

const ASPIRATIONS = [
  "Not applicable",
  "Start my own business",
  "Retire early",
  "Work fully remotely",
  "Build a property portfolio",
  "Break into fintech or crypto",
  "Launch a restaurant or hospitality business",
  "Grow a freelance or consulting career",
  "Pursue creative work full-time",
  "Transition into tech or digital industries",
  "Work for an international organisation or NGO",
  "Expand an existing business into Europe",
  "Achieve a better work-life balance",
  "Gain EU residency or citizenship",
  "Give my children a multilingual education",
  "Other",
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function Home() {
  const router = useRouter();

  // Quiz state
  const [nationality, setNationality] = useState("");
  const [countrySearch, setCountrySearch] = useState("");
  const [showCountryList, setShowCountryList] = useState(false);
  const [income, setIncome] = useState("");
  const [lifeStage, setLifeStage] = useState("");
  const [family, setFamily] = useState("");
  const [lifestyle, setLifestyle] = useState("");
  const [industry, setIndustry] = useState("");
  const [aspirations, setAspirations] = useState("Not applicable");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const filteredCountries = COUNTRIES.filter((c) =>
    c.toLowerCase().includes(countrySearch.toLowerCase())
  );

  const selectCountry = (country: string) => {
    setNationality(country);
    setCountrySearch(country);
    setShowCountryList(false);
    setErrors((prev) => ({ ...prev, nationality: "" }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!nationality) newErrors.nationality = "Please select your country of origin.";
    if (!income) newErrors.income = "Please select an income bracket.";
    if (!lifeStage) newErrors.lifeStage = "Please select your life stage.";
    if (!family) newErrors.family = "Please select your family situation.";
    if (!lifestyle) newErrors.lifestyle = "Please select a lifestyle preference.";
    if (!industry) newErrors.industry = "Please select your industry.";
    return newErrors;
  };

  const handleQuiz = () => {
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      // Scroll to first error
      const firstErrorId = Object.keys(newErrors)[0];
      document.getElementById(firstErrorId)?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    const params = new URLSearchParams({
      nationality,
      income,
      lifeStage,
      family,
      lifestyle,
      industry,
      aspirations,
    });

    router.push(`/quiz/results?${params.toString()}`);
  };

  // ─── Static data ────────────────────────────────────────────────────────────

  const destinations = [
    { name: "Spain", slug: "spain", image: "/images/countries/spain-card.jpg", description: "Great weather, vibrant cities and the Digital Nomad Visa." },
    { name: "Gibraltar", slug: "gibraltar", image: "/images/countries/gibraltar-card.jpg", description: "British culture, tax advantages and a gateway between Europe and Africa." },
    { name: "Portugal", slug: "portugal", image: "/images/countries/portugal-card.jpg", description: "Affordable living, friendly locals and simple tax regimes." },
    { name: "Italy", slug: "italy", image: "/images/countries/italy-card.jpg", description: "Beautiful coastline, amazing food and relaxed lifestyle." },
    { name: "Malta", slug: "malta", image: "/images/countries/malta-card.jpg", description: "English-speaking, sunny and one of Europe's most welcoming residency programmes." },
  ];

  const features = [
    { title: "Visa & Residency", description: "Up-to-date visa guides and residency requirements.", icon: "🌍" },
    { title: "Taxes Made Simple", description: "Compare taxes, social contributions and savings.", icon: "💶" },
    { title: "Cost of Living", description: "Real living expenses for Europe's top cities.", icon: "🏠" },
    { title: "Healthcare", description: "Find the best healthcare systems and options.", icon: "❤️" },
    { title: "Banking & Finance", description: "Open accounts, transfer money and manage finances.", icon: "🏦" },
    { title: "Community Support", description: "Connect with experts and expats abroad.", icon: "🤝" },
  ];

  const faqs = [
    { question: "Which countries does Relocate2Day cover?", answer: "We currently cover Spain, Gibraltar, Portugal, Italy and Malta, with more countries coming soon." },
    { question: "Is Relocate2Day free to use?", answer: "Yes — our core tools are free. We also offer a premium plan with deeper guides, tax calculators and expert support." },
    { question: "Can Relocate2Day help me with visa applications?", answer: "We provide up-to-date guides on visa requirements and processes, but we are not a legal service. We recommend consulting a local immigration lawyer for your specific situation." },
    { question: "How accurate is the tax information?", answer: "Our tax guides are regularly updated, but tax laws change frequently. Always verify with a local tax advisor before making financial decisions." },
  ];

  // ─── Shared select style helper ─────────────────────────────────────────────

  const fieldClass = (id: string) =>
    `rounded-2xl p-5 text-white backdrop-blur-xl transition-all ${
      errors[id] ? "bg-red-500/20 ring-2 ring-red-400" : "bg-white/10"
    }`;

  const errorMsg = (id: string) =>
    errors[id] ? (
      <p className="mt-1 text-xs text-red-400 font-semibold">{errors[id]}</p>
    ) : null;

  // ─── Render ──────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-[#0B1957]">

      {/* NAVIGATION */}
      <header className="sticky top-0 z-50 border-b border-white/30 bg-white/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div className="text-3xl font-black tracking-tight">
            <span className="bg-gradient-to-r from-violet-600 via-pink-500 to-orange-400 bg-clip-text text-transparent">
              Relocate2Day
            </span>
          </div>
          <nav className="hidden items-center gap-8 text-sm font-semibold md:flex">
            <a href="#countries" className="hover:text-violet-600 transition">Countries</a>
            <a href="#features" className="hover:text-violet-600 transition">Features</a>
            <a href="#pricing" className="hover:text-violet-600 transition">Pricing</a>
            <a href="#faq" className="hover:text-violet-600 transition">FAQ</a>
          </nav>
          <div className="flex items-center gap-4">
            <button className="hidden md:block text-sm font-semibold">Log in</button>
            <button className="rounded-2xl bg-gradient-to-r from-violet-600 via-pink-500 to-orange-400 px-6 py-3 text-sm font-bold text-white shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              Get started
            </button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/countries/home-hero.jpg')" }} />
        <div className="absolute inset-0 bg-white/40 backdrop-blur-[1px]" />

        <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-20">
          <div className="mx-auto max-w-5xl text-center">
            <h1 className="text-5xl font-black leading-none tracking-tight text-[#0B1957] md:text-8xl">
              Move to Europe.
              <br />
              Live your{" "}
              <span className="bg-gradient-to-r from-violet-600 via-pink-500 to-yellow-400 bg-clip-text text-transparent">
                best life.
              </span>
            </h1>
            <p className="mx-auto mt-8 max-w-3xl text-xl leading-8 text-[#24346d]">
              Relocate2Day is your all-in-one guide to relocating to Spain, Portugal and beyond.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              {["Compare countries", "Understand taxes", "Plan your move"].map((item) => (
                <button key={item} className="rounded-2xl border border-white/40 bg-white/70 px-6 py-3 text-sm font-semibold shadow-lg backdrop-blur-xl transition hover:scale-105">
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* ── QUIZ WIDGET ── */}
          <div className="mx-auto mt-16 max-w-5xl rounded-[36px] bg-[#081B57]/95 p-8 shadow-[0_20px_80px_rgba(8,27,87,0.35)] backdrop-blur-xl">
            <div className="text-center">
              <h2 className="text-4xl font-black text-white">Where should you relocate?</h2>
              <p className="mt-3 text-gray-300">Answer a few questions and get your personalised country ranking.</p>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2">

              {/* Country of origin — searchable dropdown */}
              <div id="nationality" className={fieldClass("nationality")}>
                <div className="text-sm text-gray-300 mb-2">I'm from</div>
                <div className="relative">
                  <input
                    type="text"
                    value={countrySearch}
                    onChange={(e) => {
                      setCountrySearch(e.target.value);
                      setNationality("");
                      setShowCountryList(true);
                    }}
                    onFocus={() => setShowCountryList(true)}
                    onBlur={() => setTimeout(() => setShowCountryList(false), 150)}
                    placeholder="Search country..."
                    className="w-full bg-transparent font-semibold placeholder-white/30 outline-none text-white"
                  />
                  {showCountryList && filteredCountries.length > 0 && (
                    <ul className="absolute left-0 top-8 z-50 max-h-52 w-full overflow-y-auto rounded-2xl bg-[#0f2470] shadow-2xl ring-1 ring-white/10">
                      {filteredCountries.map((c) => (
                        <li
                          key={c}
                          onMouseDown={() => selectCountry(c)}
                          className="cursor-pointer px-4 py-2 text-sm text-white hover:bg-white/10"
                        >
                          {c}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                {errorMsg("nationality")}
              </div>

              {/* Income bracket */}
              <div id="income" className={fieldClass("income")}>
                <div className="text-sm text-gray-300 mb-2">Annual income</div>
                <select
                  value={income}
                  onChange={(e) => { setIncome(e.target.value); setErrors((p) => ({ ...p, income: "" })); }}
                  className="w-full bg-transparent font-semibold outline-none text-white"
                >
                  <option value="" className="text-black">Select bracket...</option>
                  {INCOME_BRACKETS.map((b) => (
                    <option key={b} value={b} className="text-black">{b}</option>
                  ))}
                </select>
                {errorMsg("income")}
              </div>

              {/* Life stage */}
              <div id="lifeStage" className={fieldClass("lifeStage")}>
                <div className="text-sm text-gray-300 mb-2">Life stage</div>
                <select
                  value={lifeStage}
                  onChange={(e) => { setLifeStage(e.target.value); setErrors((p) => ({ ...p, lifeStage: "" })); }}
                  className="w-full bg-transparent font-semibold outline-none text-white"
                >
                  <option value="" className="text-black">Select...</option>
                  <option value="Employee relocating with a company" className="text-black">Employee relocating with a company</option>
                  <option value="Remote worker / freelancer" className="text-black">Remote worker / freelancer</option>
                  <option value="Self-employed / entrepreneur" className="text-black">Self-employed / entrepreneur</option>
                  <option value="Retiree" className="text-black">Retiree</option>
                  <option value="Student" className="text-black">Student</option>
                  <option value="Looking for work" className="text-black">Looking for work</option>
                </select>
                {errorMsg("lifeStage")}
              </div>

              {/* Family situation */}
              <div id="family" className={fieldClass("family")}>
                <div className="text-sm text-gray-300 mb-2">Family situation</div>
                <select
                  value={family}
                  onChange={(e) => { setFamily(e.target.value); setErrors((p) => ({ ...p, family: "" })); }}
                  className="w-full bg-transparent font-semibold outline-none text-white"
                >
                  <option value="" className="text-black">Select...</option>
                  <option value="Single" className="text-black">Single</option>
                  <option value="Couple (no children)" className="text-black">Couple (no children)</option>
                  <option value="Family with young children" className="text-black">Family with young children</option>
                  <option value="Family with teenagers" className="text-black">Family with teenagers</option>
                  <option value="Single parent" className="text-black">Single parent</option>
                </select>
                {errorMsg("family")}
              </div>

              {/* Lifestyle preference */}
              <div id="lifestyle" className={fieldClass("lifestyle")}>
                <div className="text-sm text-gray-300 mb-2">Lifestyle preference</div>
                <select
                  value={lifestyle}
                  onChange={(e) => { setLifestyle(e.target.value); setErrors((p) => ({ ...p, lifestyle: "" })); }}
                  className="w-full bg-transparent font-semibold outline-none text-white"
                >
                  <option value="" className="text-black">Select...</option>
                  <option value="Bustling city life" className="text-black">Bustling city life</option>
                  <option value="Coastal / beach lifestyle" className="text-black">Coastal / beach lifestyle</option>
                  <option value="Quiet rural or village life" className="text-black">Quiet rural or village life</option>
                  <option value="Mix of city and nature" className="text-black">Mix of city and nature</option>
                </select>
                {errorMsg("lifestyle")}
              </div>

              {/* Industry — dropdown */}
              <div id="industry" className={fieldClass("industry")}>
                <div className="text-sm text-gray-300 mb-2">Industry</div>
                <select
                  value={industry}
                  onChange={(e) => { setIndustry(e.target.value); setErrors((p) => ({ ...p, industry: "" })); }}
                  className="w-full bg-transparent font-semibold outline-none text-white"
                >
                  <option value="" className="text-black">Select...</option>
                  {INDUSTRIES.map((ind) => (
                    <option key={ind} value={ind} className="text-black">{ind}</option>
                  ))}
                </select>
                {errorMsg("industry")}
              </div>
            </div>

            {/* Career aspirations — dropdown, optional, full width */}
            <div className="mt-4 rounded-2xl bg-white/10 p-5 text-white backdrop-blur-xl">
              <div className="text-sm text-gray-300 mb-2">
                Career aspirations <span className="text-white/40">(optional)</span>
              </div>
              <select
                value={aspirations}
                onChange={(e) => setAspirations(e.target.value)}
                className="w-full bg-transparent font-semibold outline-none text-white"
              >
                {ASPIRATIONS.map((a) => (
                  <option key={a} value={a} className="text-black">{a}</option>
                ))}
              </select>
            </div>

            <button
              onClick={handleQuiz}
              className="mt-6 w-full rounded-2xl bg-gradient-to-r from-violet-600 via-pink-500 to-orange-400 px-6 py-5 text-lg font-bold text-white shadow-2xl transition hover:scale-[1.02]"
            >
              Find my best options →
            </button>

            <div className="mt-8 flex flex-wrap justify-center gap-8 text-sm text-gray-300">
              <div>✅ 100% Free</div>
              <div>✅ No credit card required</div>
              <div>✅ Personalised results in 30 seconds</div>
            </div>
          </div>
        </div>
      </section>

      {/* COUNTRIES */}
      <section id="countries" className="bg-white px-6 py-28">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <div className="text-sm font-bold uppercase tracking-[0.3em] text-violet-500">Popular destinations</div>
            <h2 className="mt-4 text-5xl font-black">Find your perfect place in Europe</h2>
            <p className="mt-4 text-xl text-gray-500">Explore the best countries for your new life abroad.</p>
          </div>
          <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {destinations.map((country) => (
              <div key={country.name} className="group relative overflow-hidden rounded-[32px] shadow-2xl">
                <img src={country.image} alt={country.name} className="h-[420px] w-full object-cover transition duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                <div className="absolute bottom-0 p-8 text-white">
                  <div className="mb-4 inline-flex rounded-full bg-orange-400 px-3 py-1 text-xs font-bold uppercase tracking-wide">{country.name}</div>
                  <h3 className="text-4xl font-black">{country.name}</h3>
                  <p className="mt-4 text-white/90">{country.description}</p>
                  <Link href={`/countries/${country.slug}`} className="mt-6 inline-block rounded-2xl bg-white/20 px-5 py-3 text-sm font-semibold backdrop-blur-xl transition hover:bg-white/30">
                    Explore {country.name} →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="bg-[#f8f7ff] px-6 py-28">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <div className="text-sm font-bold uppercase tracking-[0.3em] text-violet-500">Everything you need</div>
            <h2 className="mt-4 text-5xl font-black">Your relocation toolkit</h2>
            <p className="mt-4 text-xl text-gray-500">All the tools and guides you need to make your move with confidence.</p>
          </div>
          <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.title} className="rounded-[28px] bg-white p-8 shadow-lg transition hover:shadow-xl">
                <div className="text-4xl">{feature.icon}</div>
                <h3 className="mt-4 text-xl font-black">{feature.title}</h3>
                <p className="mt-2 text-gray-500">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="bg-white px-6 py-28">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <div className="text-sm font-bold uppercase tracking-[0.3em] text-violet-500">Pricing</div>
            <h2 className="mt-4 text-5xl font-black">Simple, transparent pricing</h2>
            <p className="mt-4 text-xl text-gray-500">Start for free. Upgrade when you need more.</p>
          </div>
          <div className="mt-16 grid gap-8 md:grid-cols-2 max-w-3xl mx-auto">
            <div className="rounded-[28px] border-2 border-gray-100 bg-white p-8 shadow-lg">
              <h3 className="text-2xl font-black">Free</h3>
              <div className="mt-4 text-5xl font-black">€0</div>
              <p className="mt-2 text-gray-500">Forever free</p>
              <ul className="mt-8 space-y-3 text-sm text-gray-600">
                <li>✅ Country comparisons</li>
                <li>✅ Basic visa guides</li>
                <li>✅ Cost of living data</li>
                <li>✅ Relocation quiz</li>
              </ul>
              <button className="mt-8 w-full rounded-2xl border-2 border-violet-600 px-6 py-3 text-sm font-bold text-violet-600 transition hover:bg-violet-50">
                Get started free
              </button>
            </div>
            <div className="rounded-[28px] bg-gradient-to-br from-violet-600 via-pink-500 to-orange-400 p-8 shadow-2xl text-white">
              <h3 className="text-2xl font-black">Premium</h3>
              <div className="mt-4 text-5xl font-black">€9</div>
              <p className="mt-2 text-white/80">per month</p>
              <ul className="mt-8 space-y-3 text-sm text-white/90">
                <li>✅ Everything in Free</li>
                <li>✅ Full tax calculator</li>
                <li>✅ Detailed visa guides</li>
                <li>✅ Healthcare & banking guides</li>
                <li>✅ Expert community access</li>
              </ul>
              <button className="mt-8 w-full rounded-2xl bg-white px-6 py-3 text-sm font-bold text-violet-600 transition hover:scale-105">
                Get started
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="bg-[#f8f7ff] px-6 py-28">
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <div className="text-sm font-bold uppercase tracking-[0.3em] text-violet-500">FAQ</div>
            <h2 className="mt-4 text-5xl font-black">Common questions</h2>
          </div>
          <div className="mt-16 space-y-6">
            {faqs.map((faq) => (
              <div key={faq.question} className="rounded-[24px] bg-white p-8 shadow-lg">
                <h3 className="text-lg font-black">{faq.question}</h3>
                <p className="mt-3 text-gray-500">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0B1957] px-6 py-12 text-center text-sm text-white/50">
        <div className="text-2xl font-black">
          <span className="bg-gradient-to-r from-violet-400 via-pink-400 to-orange-300 bg-clip-text text-transparent">
            Relocate2Day
          </span>
        </div>
        <p className="mt-4">© {new Date().getFullYear()} Relocate2Day. All rights reserved.</p>
      </footer>

    </div>
  );
}
