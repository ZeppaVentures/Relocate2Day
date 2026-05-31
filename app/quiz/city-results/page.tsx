"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

interface CityResult {
  city: string;
  country: string;
  score: number;
  summary: string;
  reasons: string[];
  considerations: string[];
  neighbourhoods?: string[];
}

interface CityResults {
  intro: string;
  results: CityResult[];
}

function CityResultsContent() {
  const searchParams = useSearchParams();
  const [results, setResults] = useState<CityResults | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isPremium, setIsPremium] = useState(false);

  const country = searchParams.get("country") || "";
  const lifestyle = searchParams.get("lifestyle") || "";
  const family = searchParams.get("family") || "";
  const budget = searchParams.get("budget") || "";
  const priorities = searchParams.get("priorities") || "";
  const lifeStage = searchParams.get("lifeStage") || "";
  const nationality = searchParams.get("nationality") || "";
  const income = searchParams.get("income") || "";
  const industry = searchParams.get("industry") || "";

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
    };

    const fetchResults = async () => {
      try {

        const gibraltarNote = country === "Gibraltar"
          ? `Important note for Gibraltar: Include "La Línea de la Concepción (Spain)" as one of the city options. This is the Spanish town directly across the border from Gibraltar, where many Gibraltar workers choose to live due to significantly lower rents (50-70% cheaper). Clearly note that residents of La Línea work in Gibraltar but live in Spain, and will need to register as Spanish residents and manage tax obligations in both jurisdictions.`
          : "";

        const nationalityContext = nationality
          ? `Nationality context: The user is from ${nationality}. Consider whether they are an EU/EEA citizen (free movement), a UK citizen (post-Brexit restrictions apply), or a non-EU citizen (visa requirements apply). This should influence which cities you recommend — for example, non-EU citizens may benefit from being near major cities with consulates and immigration offices for easier paperwork. UK citizens relocating to Gibraltar have a simpler process than to EU countries. EU citizens have freedom of movement everywhere.`
          : "";

        const prompt = `You are a European relocation expert specialising in cities and towns. Based on the following profile, recommend the best cities or towns in ${country} for this person to relocate to.

User profile:
- Nationality: ${nationality || "Not specified"}
- Country chosen: ${country}
- Annual income: ${income || "Not specified"}
- Life stage: ${lifeStage}
- Family situation: ${family}
- Monthly rent budget: ${budget}
- City lifestyle preference: ${lifestyle}
- Top priority: ${priorities}
- Industry: ${industry || "Not specified"}

${nationalityContext}

${gibraltarNote}

Recommend exactly 4 cities or towns in ${country}. Include a mix of well-known cities and lesser-known gems where appropriate. Consider cost of living relative to their budget, expat communities, lifestyle match, family friendliness, job opportunities in their industry, visa/residency practicalities based on their nationality, and quality of life.

Respond ONLY with a JSON object in this exact format, no preamble, no markdown backticks:
{
  "intro": "A warm 2-sentence personalised introduction that references their nationality and situation",
  "results": [
    {
      "city": "City name",
      "country": "${country}",
      "score": 92,
      "summary": "One sentence why this city suits them specifically",
      "reasons": ["Reason 1 tailored to their profile", "Reason 2", "Reason 3"],
      "considerations": ["Thing to watch out for based on their nationality/situation"],
      "neighbourhoods": ["Best neighbourhood 1", "Best neighbourhood 2"]
    }
  ]
}

Order results from highest to lowest score.`;

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

    checkPremium();
    fetchResults();
  }, [country, lifestyle, family, budget, priorities, lifeStage, nationality, income, industry]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center text-[#0B1957]">
        <div className="text-center max-w-md px-6">
          <div className="text-6xl mb-6 animate-bounce">🏙️</div>
          <h2 className="text-3xl font-black mb-4">Finding your perfect city...</h2>
          <p className="text-gray-500 text-lg">Analysing cities and towns across {country}</p>
          <div className="mt-8 flex justify-center gap-2">
            {[1,2,3,4].map((i) => (
              <div key={i} className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
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
  const visibleResults = isPremium ? results.results : results.results.slice(0, 1);

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
          <Link href={`/quiz/results?nationality=${nationality}&income=${income}&lifeStage=${lifeStage}&family=${family}&lifestyle=${lifestyle}&industry=${industry}`} className="text-sm font-semibold hover:text-violet-600 transition">
            ← Back to country results
          </Link>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0B1957] via-violet-900 to-pink-900">
        <div className="relative mx-auto max-w-7xl px-6 py-24 text-white text-center">
          <div className="inline-flex rounded-full bg-orange-400 px-4 py-1 text-xs font-bold uppercase tracking-wide mb-6">
            Your top city match in {country}
          </div>
          <div className="text-7xl mb-4">🏙️</div>
          <h1 className="text-6xl font-black leading-none md:text-8xl mb-6">{topResult.city}</h1>
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
          <h2 className="text-center text-sm font-bold uppercase tracking-[0.3em] text-violet-500 mb-6">Based on your preferences</h2>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
            {[
              { label: "Nationality", value: nationality },
              { label: "Country", value: country },
              { label: "Lifestyle", value: lifestyle },
              { label: "Family situation", value: family },
              { label: "Monthly budget", value: budget },
              { label: "Top priority", value: priorities },
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
            <h2 className="text-4xl font-black">Your personalised city ranking</h2>
            <p className="mt-4 text-gray-500 text-lg">
              {isPremium ? "All 4 cities ranked for your situation" : "Your top city match — upgrade to see the full ranking"}
            </p>
          </div>

          <div className="space-y-8">
            {visibleResults.map((result, index) => (
              <div key={result.city} className={`rounded-[28px] overflow-hidden shadow-lg ${index === 0 ? "ring-2 ring-violet-500" : ""}`}>
                <div className="bg-gradient-to-r from-[#0B1957] to-violet-800 p-8">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white font-black text-lg">
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="text-2xl font-black text-white">{result.city}</h3>
                        <p className="text-white/70 text-sm">{result.country}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-4xl font-black text-white">{result.score}</div>
                      <div className="text-white/70 text-sm">/ 100</div>
                    </div>
                  </div>
                  <div className="mt-4 h-2 bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-violet-400 via-pink-400 to-orange-400 rounded-full" style={{ width: `${result.score}%` }} />
                  </div>
                </div>

                <div className="bg-white p-8">
                  <p className="text-gray-600 text-lg mb-6 italic">&ldquo;{result.summary}&rdquo;</p>

                  <div className="grid gap-6 md:grid-cols-2 mb-6">
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
                        {result.considerations.map((c) => (
                          <li key={c} className="flex gap-3 text-gray-600 text-sm">
                            <span className="text-amber-500 mt-0.5">•</span>
                            <span>{c}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {result.neighbourhoods && result.neighbourhoods.length > 0 && (
                    <div className="rounded-2xl bg-[#f8f7ff] p-4 mb-6">
                      <h4 className="font-black text-sm uppercase tracking-wide text-violet-600 mb-3">🏘️ Best neighbourhoods</h4>
                      <div className="flex flex-wrap gap-2">
                        {result.neighbourhoods.map((n) => (
                          <span key={n} className="rounded-full bg-violet-100 px-3 py-1 text-xs font-bold text-violet-700">{n}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mt-6 flex flex-wrap gap-3">
  <Link
    href={`/cities/${encodeURIComponent(result.city)}?country=${encodeURIComponent(result.country)}`}
    className="inline-block rounded-2xl bg-gradient-to-r from-violet-600 via-pink-500 to-orange-400 px-6 py-3 text-sm font-bold text-white shadow-lg transition hover:scale-105"
  >
    📖 Full {result.city} relocation guide →
  </Link>
  <Link
    href={`/countries/${result.country.toLowerCase().replace(/ /g, "-")}`}
    className="inline-block rounded-2xl border-2 border-violet-600 px-6 py-3 text-sm font-bold text-violet-600 transition hover:bg-violet-50"
  >
    {result.country} country guide →
  </Link>
</div>
                </div>
              </div>
            ))}
          </div>

          {/* Premium upsell for free users */}
          {!isPremium && (
            <div className="mt-8 rounded-[28px] bg-gradient-to-br from-violet-600 via-pink-500 to-orange-400 p-10 text-center text-white">
              <div className="text-4xl mb-4">🔒</div>
              <h2 className="text-3xl font-black">See all 4 city matches</h2>
              <p className="mt-4 text-white/80 text-lg">
                Upgrade to Premium to unlock your full personalised city ranking, neighbourhood recommendations, and step-by-step relocation guides.
              </p>
              <Link
                href="/#pricing"
                className="mt-8 inline-block rounded-2xl bg-white px-8 py-4 text-sm font-bold text-violet-600 shadow-2xl transition hover:scale-105"
              >
                Start your 14-day free trial →
              </Link>
            </div>
          )}

          {/* CTA for premium users */}
          {isPremium && (
            <div className="mt-16 rounded-[32px] bg-gradient-to-br from-violet-600 via-pink-500 to-orange-400 p-10 text-center text-white">
              <h2 className="text-3xl font-black">Ready to make your move?</h2>
              <p className="mt-4 text-white/80 text-lg">
                Read the full country guide and start planning your relocation to {country}.
              </p>
              <Link
                href={`/countries/${country.toLowerCase()}`}
                className="mt-8 inline-block rounded-2xl bg-white px-8 py-4 text-sm font-bold text-violet-600 shadow-2xl transition hover:scale-105"
              >
                Read the {country} guide →
              </Link>
            </div>
          )}
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
          Results are AI-generated suggestions for informational purposes only.
        </p>
      </footer>

    </div>
  );
}

export default function CityResultsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-bounce">🏙️</div>
          <p className="text-gray-500">Loading your city results...</p>
        </div>
      </div>
    }>
      <CityResultsContent />
    </Suspense>
  );
}