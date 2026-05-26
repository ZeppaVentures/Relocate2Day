"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const countryFlags: Record<string, string> = {
  Spain: "🇪🇸",
  Portugal: "🇵🇹",
  Italy: "🇮🇹",
  Gibraltar: "🇬🇮",
  Malta: "🇲🇹",
  Bulgaria: "🇧🇬",
};

const countryImages: Record<string, string> = {
  Spain: "/images/countries/spain-card.jpg",
  Portugal: "/images/countries/portugal-card.jpg",
  Italy: "/images/countries/italy-card.jpg",
  Gibraltar: "/images/countries/gibraltar-card.jpg",
  Malta: "/images/countries/malta-card.jpg",
  Bulgaria: "/images/countries/bulgaria-card.jpg",
};

interface CountryResult {
  country: string;
  score: number;
  summary: string;
  reasons: string[];
  considerations: string[];
}

interface QuizResults {
  intro: string;
  results: CountryResult[];
}

function ResultsContent() {
  const searchParams = useSearchParams();
  const [results, setResults] = useState<QuizResults | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const nationality = searchParams.get("nationality") || "";
  const income = searchParams.get("income") || "";
  const lifeStage = searchParams.get("lifeStage") || "";
  const family = searchParams.get("family") || "";
  const lifestyle = searchParams.get("lifestyle") || "";
  const industry = searchParams.get("industry") || "";
  const aspirations = searchParams.get("aspirations") || "";

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const prompt = `You are a European relocation expert. Based on the following user profile, rank exactly 5 countries for relocation from this list: Spain, Portugal, Italy, Gibraltar, Malta, and Bulgaria.

Important rules:
- If the user's nationality matches any of these countries (e.g. if they are Spanish, exclude Spain; if Bulgarian, exclude Bulgaria etc.), exclude that country from the results entirely
- Always return exactly 5 countries in the ranked results
- The user's nationality is: ${nationality}

User profile:
- Nationality: ${nationality}
- Annual income: ${income}
- Life stage: ${lifeStage}
- Family situation: ${family}
- Lifestyle preference: ${lifestyle}
- Industry: ${industry}
- Career aspirations: ${aspirations || "Not specified"}

For each country provide:
1. A match score out of 100
2. A one-sentence summary of why this country suits this person
3. 3-4 specific reasons why this country is a good fit based on their profile
4. 1-2 things they should consider or watch out for

Consider visa eligibility based on nationality, tax regimes, cost of living relative to income, lifestyle match, career opportunities in their industry, and family friendliness.

Respond ONLY with a JSON object in this exact format, no preamble, no markdown backticks:
{
  "intro": "A warm 2-sentence personalised introduction based on their profile",
  "results": [
    {
      "country": "Country name",
      "score": 85,
      "summary": "One sentence why this country suits them",
      "reasons": ["Reason 1", "Reason 2", "Reason 3"],
      "considerations": ["Thing to watch out for"]
    }
  ]
}

Order the results array from highest to lowest score.`;

        const response = await fetch("/api/quiz", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt }),
        });

        const data = await response.json();

        if (!response.ok) {
          console.error("Quiz error detail:", JSON.stringify(data));
          throw new Error(JSON.stringify(data));
        }

        setResults(data);

        // Send to HubSpot
        fetch("/api/hubspot/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nationality,
            income,
            lifeStage,
            industry,
            topCountry: data.results?.[0]?.country,
            source: "Quiz completion",
          }),
        }).catch(console.error);

      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [nationality, income, lifeStage, family, lifestyle, industry, aspirations]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center text-[#0B1957]">
        <div className="text-center max-w-md px-6">
          <div className="text-6xl mb-6 animate-bounce">🌍</div>
          <h2 className="text-3xl font-black mb-4">Finding your perfect match...</h2>
          <p className="text-gray-500 text-lg">Analysing your profile across 6 European countries</p>
          <div className="mt-8 flex justify-center gap-2">
            {["Spain", "Portugal", "Italy", "Gibraltar", "Malta", "Bulgaria"].map((country, i) => (
              <div key={country} className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error || !results) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center text-[#0B1957]">
        <div className="text-center max-w-md px-6">
          <div className="text-6xl mb-6">😕</div>
          <h2 className="text-3xl font-black mb-4">Something went wrong</h2>
          <p className="text-gray-500 mb-8">We couldn&apos;t generate your results. Please try again.</p>
          <Link href="/" className="rounded-2xl bg-gradient-to-r from-violet-600 via-pink-500 to-orange-400 px-8 py-4 text-sm font-bold text-white shadow-xl transition hover:scale-105">
            ← Try again
          </Link>
        </div>
      </div>
    );
  }

  const topResult = results.results[0];

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
            ← Start over
          </Link>
        </div>
      </header>

      {/* HERO RESULT */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${countryImages[topResult.country]}')` }} />
        <div className="absolute inset-0 bg-[#0B1957]/70" />
        <div className="relative mx-auto max-w-7xl px-6 py-24 text-white text-center">
          <div className="inline-flex rounded-full bg-orange-400 px-4 py-1 text-xs font-bold uppercase tracking-wide mb-6">
            Your top match
          </div>
          <div className="text-7xl mb-4">{countryFlags[topResult.country]}</div>
          <h1 className="text-6xl font-black leading-none md:text-8xl mb-6">{topResult.country}</h1>
          <p className="mx-auto max-w-2xl text-xl text-white/80 mb-8">{results.intro}</p>
          <div className="inline-flex items-center gap-3 rounded-2xl bg-white/20 px-8 py-4 backdrop-blur-xl">
            <div className="text-4xl font-black">{topResult.score}</div>
            <div className="text-left">
              <div className="text-sm text-white/70">Match score</div>
              <div className="font-bold">out of 100</div>
            </div>
          </div>
        </div>
      </section>

      {/* PROFILE SUMMARY */}
      <section className="bg-[#f8f7ff] px-6 py-12">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center text-sm font-bold uppercase tracking-[0.3em] text-violet-500 mb-6">Based on your profile</h2>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {[
              { label: "Nationality", value: nationality },
              { label: "Annual income", value: income },
              { label: "Life stage", value: lifeStage },
              { label: "Family situation", value: family },
              { label: "Lifestyle", value: lifestyle },
              { label: "Industry", value: industry },
              ...(aspirations && aspirations !== "Not applicable" ? [{ label: "Aspirations", value: aspirations }] : []),
            ].map((item) => (
              <div key={item.label} className="rounded-2xl bg-white p-4 shadow-sm">
                <div className="text-xs text-gray-400 font-semibold uppercase tracking-wide">{item.label}</div>
                <div className="mt-1 font-black text-sm">{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RESULTS */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black">Your personalised ranking</h2>
            <p className="mt-4 text-gray-500 text-lg">5 countries ranked for your specific situation</p>
          </div>

          <div className="space-y-8">
            {results.results.map((result, index) => (
              <div key={result.country} className={`rounded-[28px] overflow-hidden shadow-lg ${index === 0 ? "ring-2 ring-violet-500" : ""}`}>
                <div className="relative h-32 overflow-hidden">
                  <img src={countryImages[result.country]} alt={result.country} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-[#0B1957]/60" />
                  <div className="absolute inset-0 flex items-center justify-between px-8">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white font-black text-lg backdrop-blur-xl">
                        {index + 1}
                      </div>
                      <div>
                        <div className="text-2xl">{countryFlags[result.country]}</div>
                        <h3 className="text-2xl font-black text-white">{result.country}</h3>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-4xl font-black text-white">{result.score}</div>
                      <div className="text-white/70 text-sm">/ 100</div>
                    </div>
                  </div>
                  {index === 0 && (
                    <div className="absolute top-4 right-4 rounded-full bg-orange-400 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
                      Top match
                    </div>
                  )}
                </div>

                <div className="bg-white p-8">
                  <p className="text-gray-600 text-lg mb-6 italic">&ldquo;{result.summary}&rdquo;</p>
                  <div className="mb-6">
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-violet-600 via-pink-500 to-orange-400 rounded-full transition-all duration-1000" style={{ width: `${result.score}%` }} />
                    </div>
                  </div>
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <h4 className="font-black text-sm uppercase tracking-wide text-green-600 mb-3">✅ Why it suits you</h4>
                      <ul className="space-y-2">
                        {result.reasons.map((reason) => (
                          <li key={reason} className="flex gap-3 text-gray-600 text-sm">
                            <span className="text-violet-500 mt-0.5">✓</span>
                            <span>{reason}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-black text-sm uppercase tracking-wide text-amber-600 mb-3">⚠️ Things to consider</h4>
                      <ul className="space-y-2">
                        {result.considerations.map((consideration) => (
                          <li key={consideration} className="flex gap-3 text-gray-600 text-sm">
                            <span className="text-amber-500 mt-0.5">•</span>
                            <span>{consideration}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link
                      href={`/countries/${result.country.toLowerCase()}`}
                      className="inline-block rounded-2xl bg-gradient-to-r from-violet-600 via-pink-500 to-orange-400 px-6 py-3 text-sm font-bold text-white shadow-lg transition hover:scale-105"
                    >
                      Read the full {result.country} guide →
                    </Link>
                    {index === 0 && (
                      <a
                        href="#city-quiz"
                        className="inline-block rounded-2xl border-2 border-violet-600 px-6 py-3 text-sm font-bold text-violet-600 transition hover:bg-violet-50"
                      >
                        🏙️ Find your perfect city →
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CITY QUIZ */}
          <div id="city-quiz" className="mt-16 rounded-[32px] bg-[#f8f7ff] border-2 border-violet-100 p-10">
            <div className="text-center mb-8">
              <div className="text-4xl mb-4">🏙️</div>
              <h2 className="text-3xl font-black">Now find your perfect city</h2>
              <p className="mt-3 text-gray-500 text-lg">
                You&apos;ve found your country — now let&apos;s find the perfect city or town within it.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl bg-white p-5 shadow-sm">
                <div className="text-sm text-gray-500 font-semibold mb-2">Country</div>
                <select
                  id="cityCountry"
                  defaultValue={results?.results[0]?.country || ""}
                  className="w-full bg-transparent font-bold text-[#0B1957] outline-none cursor-pointer"
                >
                  {["Spain", "Portugal", "Italy", "Gibraltar", "Malta", "Bulgaria"].map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div className="rounded-2xl bg-white p-5 shadow-sm">
                <div className="text-sm text-gray-500 font-semibold mb-2">Monthly rent budget</div>
                <select id="cityBudget" className="w-full bg-transparent font-bold text-[#0B1957] outline-none cursor-pointer">
                  <option value="Under €500">Under €500</option>
                  <option value="€500 – €800">€500 – €800</option>
                  <option value="€800 – €1,200">€800 – €1,200</option>
                  <option value="€1,200 – €1,800">€1,200 – €1,800</option>
                  <option value="Over €1,800">Over €1,800</option>
                </select>
              </div>

              <div className="rounded-2xl bg-white p-5 shadow-sm">
                <div className="text-sm text-gray-500 font-semibold mb-2">City lifestyle preference</div>
                <select id="cityLifestyle" className="w-full bg-transparent font-bold text-[#0B1957] outline-none cursor-pointer">
                  <option value="Bustling city life">Bustling city life</option>
                  <option value="Coastal / beach town">Coastal / beach town</option>
                  <option value="Quiet town or village">Quiet town or village</option>
                  <option value="University or student city">University or student city</option>
                  <option value="Mix of city and nature">Mix of city and nature</option>
                </select>
              </div>

              <div className="rounded-2xl bg-white p-5 shadow-sm">
                <div className="text-sm text-gray-500 font-semibold mb-2">Top priority</div>
                <select id="cityPriorities" className="w-full bg-transparent font-bold text-[#0B1957] outline-none cursor-pointer">
                  <option value="Affordability">Affordability</option>
                  <option value="Career opportunities">Career opportunities</option>
                  <option value="Expat community">Expat community</option>
                  <option value="Quality of life">Quality of life</option>
                  <option value="Safety and family friendliness">Safety and family friendliness</option>
                  <option value="Warm climate and beaches">Warm climate and beaches</option>
                  <option value="Culture and nightlife">Culture and nightlife</option>
                  <option value="Nature and outdoor activities">Nature and outdoor activities</option>
                </select>
              </div>
            </div>

            <button
              onClick={() => {
                const country = (document.getElementById("cityCountry") as HTMLSelectElement)?.value;
                const budget = (document.getElementById("cityBudget") as HTMLSelectElement)?.value;
                const cityLifestyle = (document.getElementById("cityLifestyle") as HTMLSelectElement)?.value;
                const priorities = (document.getElementById("cityPriorities") as HTMLSelectElement)?.value;
                const params = new URLSearchParams({
                  country,
                  budget,
                  lifestyle: cityLifestyle,
                  priorities,
                  family,
                  lifeStage,
                  nationality,
                  income,
                  industry,
                });
                window.location.href = `/quiz/city-results?${params.toString()}`;
              }}
              className="mt-6 w-full rounded-2xl bg-gradient-to-r from-violet-600 via-pink-500 to-orange-400 px-6 py-5 text-lg font-bold text-white shadow-2xl transition hover:scale-[1.02]"
            >
              Find my perfect city →
            </button>
          </div>

          {/* CTA */}
          <div className="mt-16 rounded-[32px] bg-gradient-to-br from-violet-600 via-pink-500 to-orange-400 p-10 text-center text-white">
            <h2 className="text-3xl font-black">Want to go deeper?</h2>
            <p className="mt-4 text-white/80 text-lg">
              Get access to our full tax calculator, detailed visa guides and expert community.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href="/#pricing" className="rounded-2xl bg-white px-8 py-4 text-sm font-bold text-violet-600 shadow-2xl transition hover:scale-105">
                See pricing →
              </Link>
              <Link href="/" className="rounded-2xl bg-white/20 px-8 py-4 text-sm font-bold text-white backdrop-blur-xl transition hover:bg-white/30">
                ← Start over
              </Link>
            </div>
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
        <p className="mt-2 text-white/30 text-xs">
          Results are AI-generated suggestions for informational purposes only and do not constitute legal, tax or financial advice.
        </p>
      </footer>

    </div>
  );
}

export default function ResultsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-bounce">🌍</div>
          <p className="text-gray-500">Loading your results...</p>
        </div>
      </div>
    }>
      <ResultsContent />
    </Suspense>
  );
}"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

const COUNTRIES = ["Spain", "Portugal", "Italy", "Gibraltar", "Malta", "Bulgaria"];

const INCOME_TYPES = [
  { value: "employment", label: "Employment income" },
  { value: "freelance", label: "Freelance / self-employed" },
  { value: "rental", label: "Rental income" },
  { value: "pension", label: "Pension / retirement" },
  { value: "dividend", label: "Dividend income" },
  { value: "mixed", label: "Mixed income" },
];

const FAMILY_SITUATIONS = [
  { value: "single", label: "Single, no children" },
  { value: "married", label: "Married / civil partnership, no children" },
  { value: "single_parent_1", label: "Single parent, 1 child" },
  { value: "single_parent_2", label: "Single parent, 2+ children" },
  { value: "married_1", label: "Married / civil partnership, 1 child" },
  { value: "married_2", label: "Married / civil partnership, 2+ children" },
];

interface CountryTaxResult {
  country: string;
  incomeTax: number;
  socialContributions: number;
  totalDeductions: number;
  netIncome: number;
  effectiveRate: number;
  keyNotes: string[];
  specialRegimes?: string;
}

interface TaxResults {
  grossIncome: number;
  currency: string;
  results: CountryTaxResult[];
  disclaimer: string;
}

export default function TaxCalculatorPage() {
  const [isPremium, setIsPremium] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [grossIncome, setGrossIncome] = useState("");
  const [incomeType, setIncomeType] = useState("employment");
  const [familySituation, setFamilySituation] = useState("single");
  const [nationality, setNationality] = useState("");
  const [selectedCountries, setSelectedCountries] = useState<string[]>(COUNTRIES);
  const [results, setResults] = useState<TaxResults | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const checkPremium = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase
          .from("profiles")
          .select("subscription_status")
          .eq("id", user.id)
          .single();
        setIsPremium(data?.subscription_status === "active");
      }
      setCheckingAuth(false);
    };
    checkPremium();
  }, []);

  const toggleCountry = (country: string) => {
    setSelectedCountries((prev) =>
      prev.includes(country)
        ? prev.filter((c) => c !== country)
        : [...prev, country]
    );
  };

  const handleCalculate = async () => {
    if (!grossIncome || selectedCountries.length === 0) return;
    setLoading(true);
    setError(false);
    setResults(null);

    try {
      const prompt = `You are a European tax expert. Calculate the income tax liability for the following profile across the specified countries.

User profile:
- Gross annual income: €${grossIncome}
- Income type: ${incomeType}
- Family situation: ${familySituation}
- Nationality: ${nationality || "Not specified"}
- Countries to calculate: ${selectedCountries.join(", ")}

For each country, calculate:
1. Income tax (applying correct tax brackets, rates, and personal allowances for 2025)
2. Social security / social contributions (employee portion)
3. Total deductions
4. Net take-home income
5. Effective tax rate (total deductions / gross income as percentage)
6. 2-3 key notes about the tax system relevant to this person
7. Any special tax regimes available (e.g. Portugal NHR/IFICI, Spain Beckham Law, Italy flat tax, Malta flat rate, Bulgaria flat 10%, Gibraltar ACSP)

Consider family situation allowances and deductions carefully:
- Married couples may file jointly in some countries
- Children provide additional allowances in most countries
- Single parents often get enhanced allowances

Respond ONLY with a JSON object in this exact format, no preamble, no markdown backticks:
{
  "grossIncome": ${grossIncome},
  "currency": "EUR",
  "results": [
    {
      "country": "Country name",
      "incomeTax": 12000,
      "socialContributions": 3000,
      "totalDeductions": 15000,
      "netIncome": 45000,
      "effectiveRate": 25.0,
      "keyNotes": ["Note 1", "Note 2", "Note 3"],
      "specialRegimes": "Description of any special tax regime available"
    }
  ],
  "disclaimer": "Tax calculations are estimates based on known 2025 rates and rules. Actual liability may vary based on individual circumstances, deductions, and local regulations. Always consult a qualified tax advisor before making financial decisions."
}

Order results from lowest effective tax rate to highest.`;

      const response = await fetch("/api/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(JSON.stringify(data));
      setResults(data);
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-6xl animate-bounce">💶</div>
      </div>
    );
  }

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
            ← Back to homepage
          </Link>
        </div>
      </header>

      {/* HERO */}
      <section className="bg-gradient-to-br from-[#0B1957] via-violet-900 to-pink-900 px-6 py-20 text-white text-center">
        <div className="inline-flex rounded-full bg-orange-400 px-4 py-1 text-xs font-bold uppercase tracking-wide mb-6">
          Premium Feature
        </div>
        <h1 className="text-5xl font-black leading-none md:text-7xl mb-6">
          European Tax Calculator
        </h1>
        <p className="mx-auto max-w-2xl text-xl text-white/80">
          See exactly how much tax you'd pay across all 6 countries — and find out which special tax regimes you qualify for.
        </p>
      </section>

      {!isPremium ? (
        /* PREMIUM GATE */
        <div className="mx-auto max-w-2xl px-6 py-20 text-center">
          <div className="text-6xl mb-6">🔒</div>
          <h2 className="text-3xl font-black mb-4">Premium feature</h2>
          <p className="text-gray-500 text-lg mb-8">
            The tax calculator is available to Premium subscribers. Upgrade to see exactly how much tax you'd pay in each country and discover special tax regimes you qualify for.
          </p>
          <Link
            href="/#pricing"
            className="inline-block rounded-2xl bg-gradient-to-r from-violet-600 via-pink-500 to-orange-400 px-8 py-4 text-sm font-bold text-white shadow-2xl transition hover:scale-105"
          >
            Start your 14-day free trial →
          </Link>
        </div>
      ) : (
        <div className="mx-auto max-w-5xl px-6 py-16">

          {/* CALCULATOR FORM */}
          <div className="rounded-[32px] bg-[#f8f7ff] p-8 mb-12">
            <h2 className="text-2xl font-black mb-8">Your details</h2>

            <div className="grid gap-6 md:grid-cols-2">
              {/* Gross Income */}
              <div>
                <label className="block text-sm font-bold mb-2">Gross annual income (€)</label>
                <input
                  type="number"
                  value={grossIncome}
                  onChange={(e) => setGrossIncome(e.target.value)}
                  placeholder="e.g. 60000"
                  className="w-full rounded-2xl border-2 border-gray-200 px-5 py-4 text-sm font-semibold outline-none focus:border-violet-500 transition bg-white"
                />
              </div>

              {/* Nationality */}
              <div>
                <label className="block text-sm font-bold mb-2">Nationality <span className="text-gray-400 font-normal">(optional — affects special regimes)</span></label>
                <input
                  type="text"
                  value={nationality}
                  onChange={(e) => setNationality(e.target.value)}
                  placeholder="e.g. United Kingdom, United States..."
                  className="w-full rounded-2xl border-2 border-gray-200 px-5 py-4 text-sm font-semibold outline-none focus:border-violet-500 transition bg-white"
                />
              </div>

              {/* Income Type */}
              <div>
                <label className="block text-sm font-bold mb-2">Income type</label>
                <select
                  value={incomeType}
                  onChange={(e) => setIncomeType(e.target.value)}
                  className="w-full rounded-2xl border-2 border-gray-200 px-5 py-4 text-sm font-semibold outline-none focus:border-violet-500 transition bg-white"
                >
                  {INCOME_TYPES.map((t) => (
                    <option key={t.value} value={t.value}>{t.label}</option>
                  ))}
                </select>
              </div>

              {/* Family Situation */}
              <div>
                <label className="block text-sm font-bold mb-2">Family situation</label>
                <select
                  value={familySituation}
                  onChange={(e) => setFamilySituation(e.target.value)}
                  className="w-full rounded-2xl border-2 border-gray-200 px-5 py-4 text-sm font-semibold outline-none focus:border-violet-500 transition bg-white"
                >
                  {FAMILY_SITUATIONS.map((f) => (
                    <option key={f.value} value={f.value}>{f.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Country Selection */}
            <div className="mt-6">
              <label className="block text-sm font-bold mb-3">Countries to compare</label>
              <div className="flex flex-wrap gap-3">
                {COUNTRIES.map((country) => (
                  <button
                    key={country}
                    onClick={() => toggleCountry(country)}
                    className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                      selectedCountries.includes(country)
                        ? "bg-violet-600 text-white"
                        : "bg-white border-2 border-gray-200 text-gray-500 hover:border-violet-400"
                    }`}
                  >
                    {country}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleCalculate}
              disabled={loading || !grossIncome || selectedCountries.length === 0}
              className="mt-8 w-full rounded-2xl bg-gradient-to-r from-violet-600 via-pink-500 to-orange-400 px-6 py-5 text-lg font-bold text-white shadow-2xl transition hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Calculating..." : "Calculate my tax →"}
            </button>
          </div>

          {/* LOADING */}
          {loading && (
            <div className="text-center py-20">
              <div className="text-6xl mb-6 animate-bounce">💶</div>
              <h2 className="text-2xl font-black mb-4">Calculating your tax across Europe...</h2>
              <p className="text-gray-500">Applying current tax rates, brackets and allowances</p>
              <div className="mt-8 flex justify-center gap-2">
                {selectedCountries.map((_, i) => (
                  <div key={i} className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
                ))}
              </div>
            </div>
          )}

          {/* ERROR */}
          {error && (
            <div className="text-center py-12">
              <div className="text-4xl mb-4">😕</div>
              <p className="text-gray-500">Something went wrong. Please try again.</p>
            </div>
          )}

          {/* RESULTS */}
          {results && !loading && (
            <div>
              <div className="text-center mb-12">
                <h2 className="text-4xl font-black">Your tax comparison</h2>
                <p className="mt-4 text-gray-500 text-lg">
                  Based on €{Number(results.grossIncome).toLocaleString()} gross annual income — ordered from lowest to highest tax
                </p>
              </div>

              {/* Summary bar chart */}
              <div className="rounded-[28px] bg-[#f8f7ff] p-8 mb-10">
                <h3 className="font-black text-xl mb-6">Net take-home comparison</h3>
                <div className="space-y-4">
                  {results.results.map((r) => (
                    <div key={r.country}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-bold text-sm">{r.country}</span>
                        <span className="font-black text-sm">
                          €{r.netIncome.toLocaleString()} <span className="text-gray-400 font-normal">({r.effectiveRate}% effective rate)</span>
                        </span>
                      </div>
                      <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-violet-600 via-pink-500 to-orange-400 rounded-full"
                          style={{ width: `${(r.netIncome / Number(results.grossIncome)) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Detailed cards */}
              <div className="space-y-6">
                {results.results.map((result, index) => (
                  <div key={result.country} className={`rounded-[28px] overflow-hidden shadow-lg ${index === 0 ? "ring-2 ring-violet-500" : ""}`}>
                    <div className="bg-gradient-to-r from-[#0B1957] to-violet-800 p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white font-black text-sm">
                            {index + 1}
                          </div>
                          <h3 className="text-2xl font-black text-white">{result.country}</h3>
                          {index === 0 && (
                            <span className="rounded-full bg-orange-400 px-3 py-1 text-xs font-bold text-white">
                              Lowest tax
                            </span>
                          )}
                        </div>
                        <div className="text-right">
                          <div className="text-3xl font-black text-white">{result.effectiveRate}%</div>
                          <div className="text-white/70 text-xs">effective rate</div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white p-8">
                      {/* Numbers breakdown */}
                      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 mb-6">
                        {[
                          { label: "Gross income", value: `€${Number(results.grossIncome).toLocaleString()}`, color: "bg-gray-50" },
                          { label: "Income tax", value: `-€${result.incomeTax.toLocaleString()}`, color: "bg-red-50" },
                          { label: "Social contributions", value: `-€${result.socialContributions.toLocaleString()}`, color: "bg-orange-50" },
                          { label: "Net take-home", value: `€${result.netIncome.toLocaleString()}`, color: "bg-green-50" },
                        ].map((item) => (
                          <div key={item.label} className={`rounded-2xl ${item.color} p-4 text-center`}>
                            <div className="text-xs text-gray-500 font-semibold uppercase tracking-wide mb-1">{item.label}</div>
                            <div className="font-black text-lg">{item.value}</div>
                          </div>
                        ))}
                      </div>

                      {/* Key notes */}
                      <div className="mb-4">
                        <h4 className="font-black text-sm uppercase tracking-wide text-violet-600 mb-3">Key tax notes</h4>
                        <ul className="space-y-2">
                          {result.keyNotes.map((note) => (
                            <li key={note} className="flex gap-3 text-gray-600 text-sm">
                              <span className="text-violet-500 mt-0.5">✓</span>
                              <span>{note}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Special regimes */}
                      {result.specialRegimes && (
                        <div className="rounded-2xl bg-violet-50 border border-violet-200 p-4">
                          <h4 className="font-black text-sm uppercase tracking-wide text-violet-600 mb-2">⭐ Special tax regime available</h4>
                          <p className="text-sm text-violet-800">{result.specialRegimes}</p>
                        </div>
                      )}

                      <Link
                        href={`/countries/${result.country.toLowerCase()}`}
                        className="mt-6 inline-block rounded-2xl border-2 border-violet-600 px-6 py-3 text-sm font-bold text-violet-600 transition hover:bg-violet-50"
                      >
                        Read the full {result.country} guide →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              {/* DISCLAIMER */}
              <div className="mt-10 rounded-[24px] bg-amber-50 border border-amber-200 p-6">
                <h4 className="font-black text-sm uppercase tracking-wide text-amber-700 mb-2">⚠️ Important disclaimer</h4>
                <p className="text-sm text-amber-800">{results.disclaimer}</p>
                <p className="text-sm text-amber-800 mt-2">
                  Tax rates and rules change frequently. This calculator uses known rates as of 2025 and is intended for estimation and comparison purposes only. It does not account for all personal circumstances, deductions, or local variations. <strong>Always consult a qualified tax advisor in your target country before making any financial or relocation decisions.</strong>
                </p>
              </div>

            </div>
          )}
        </div>
      )}

      {/* FOOTER */}
      <footer className="bg-[#0B1957] px-6 py-12 text-center text-sm text-white/50 mt-20">
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