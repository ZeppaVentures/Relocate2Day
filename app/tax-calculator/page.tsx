"use client";

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