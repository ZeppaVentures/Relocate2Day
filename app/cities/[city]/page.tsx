"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

interface CityGuide {
  city: string;
  country: string;
  intro: string;
  neighbourhoods: {
    name: string;
    description: string;
    bestFor: string;
    avgRent: string;
  }[];
  visaSteps: {
    step: string;
    title: string;
    description: string;
    documents: string[];
    timeframe: string;
  }[];
  taxRegistration: {
    step: string;
    title: string;
    description: string;
    documents: string[];
    timeframe: string;
  }[];
  healthcare: {
    step: string;
    title: string;
    description: string;
    documents: string[];
    timeframe: string;
  }[];
  banking: {
    step: string;
    title: string;
    description: string;
    documents: string[];
    timeframe: string;
  }[];
  schools: {
    name: string;
    type: string;
    description: string;
    language: string;
    ageRange: string;
  }[];
}

export default function CityGuidePage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const city = decodeURIComponent(params.city as string);
  const country = searchParams.get("country") || "";

  const [guide, setGuide] = useState<CityGuide | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isPremium, setIsPremium] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

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

    const fetchGuide = async () => {
      try {
        const prompt = `You are a European relocation expert. Create a detailed relocation guide for ${city}, ${country}.

Provide accurate, practical information for someone relocating to ${city}. Include specific local details, office names, addresses where relevant, and realistic timeframes.

Respond ONLY with a JSON object in this exact format, no preamble, no markdown backticks:
{
  "city": "${city}",
  "country": "${country}",
  "intro": "2-3 sentence introduction to ${city} as a place to live",
  "neighbourhoods": [
    {
      "name": "Neighbourhood name",
      "description": "2 sentence description of the neighbourhood",
      "bestFor": "Who it suits best",
      "avgRent": "Average 1-bed rent per month"
    }
  ],
  "visaSteps": [
    {
      "step": "1",
      "title": "Step title",
      "description": "Detailed description of what to do",
      "documents": ["Document 1", "Document 2"],
      "timeframe": "Expected timeframe"
    }
  ],
  "taxRegistration": [
    {
      "step": "1",
      "title": "Step title",
      "description": "Detailed description",
      "documents": ["Document 1"],
      "timeframe": "Expected timeframe"
    }
  ],
  "healthcare": [
    {
      "step": "1",
      "title": "Step title",
      "description": "Detailed description",
      "documents": ["Document 1"],
      "timeframe": "Expected timeframe"
    }
  ],
  "banking": [
    {
      "step": "1",
      "title": "Step title",
      "description": "Detailed description",
      "documents": ["Document 1"],
      "timeframe": "Expected timeframe"
    }
  ],
  "schools": [
    {
      "name": "School name",
      "type": "International / Public / Private",
      "description": "Brief description",
      "language": "Language of instruction",
      "ageRange": "Age range"
    }
  ]
}

Include 4-5 neighbourhoods, 4-5 visa steps, 3-4 tax steps, 3-4 healthcare steps, 3-4 banking steps, and 3-5 schools. Make all content specific to ${city}, ${country}.`;

        const response = await fetch("/api/quiz", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt }),
        });

        const data = await response.json();
        if (!response.ok) throw new Error(JSON.stringify(data));
        setGuide(data);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    checkPremium();
    fetchGuide();
  }, [city, country]);

  if (loading || checkingAuth) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center text-[#0B1957]">
        <div className="text-center max-w-md px-6">
          <div className="text-6xl mb-6 animate-bounce">🏙️</div>
          <h2 className="text-3xl font-black mb-4">Building your {city} guide...</h2>
          <p className="text-gray-500 text-lg">Gathering the latest relocation information</p>
          <div className="mt-8 flex justify-center gap-2">
            {[1,2,3,4].map((i) => (
              <div key={i} className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error || !guide) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center text-[#0B1957]">
        <div className="text-center max-w-md px-6">
          <div className="text-6xl mb-6">😕</div>
          <h2 className="text-3xl font-black mb-4">Something went wrong</h2>
          <p className="text-gray-500 mb-8">We couldn&apos;t load the guide. Please try again.</p>
          <Link href="/" className="rounded-2xl bg-gradient-to-r from-violet-600 via-pink-500 to-orange-400 px-8 py-4 text-sm font-bold text-white shadow-xl transition hover:scale-105">
            ← Back to homepage
          </Link>
        </div>
      </div>
    );
  }

  const PremiumLock = ({ section }: { section: string }) => (
    <div className="rounded-[24px] bg-gradient-to-br from-violet-600 via-pink-500 to-orange-400 p-8 text-center text-white mt-8">
      <div className="text-4xl mb-4">🔒</div>
      <h3 className="text-2xl font-black mb-3">Premium feature</h3>
      <p className="text-white/80 mb-6">
        Unlock the full {section} guide for {city} with a Premium subscription — including step-by-step instructions, required documents, and realistic timeframes.
      </p>
      <Link
        href="/#pricing"
        className="inline-block rounded-2xl bg-white px-8 py-4 text-sm font-bold text-violet-600 shadow-2xl transition hover:scale-105"
      >
        Start your 14-day free trial →
      </Link>
    </div>
  );

  const StepCard = ({ step }: { step: { step: string; title: string; description: string; documents: string[]; timeframe: string } }) => (
    <div className="rounded-[24px] border border-gray-100 bg-white p-6 shadow-sm">
      <div className="flex gap-4 mb-4">
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-violet-600 to-pink-500 flex items-center justify-center text-white font-black text-sm shrink-0">
          {step.step}
        </div>
        <div className="flex-1">
          <h4 className="font-black text-lg">{step.title}</h4>
          <p className="text-gray-600 text-sm mt-1">{step.description}</p>
        </div>
      </div>
      {step.documents.length > 0 && (
        <div className="ml-12 mb-3">
          <div className="text-xs font-bold uppercase tracking-wide text-violet-600 mb-2">Documents needed</div>
          <ul className="space-y-1">
            {step.documents.map((doc) => (
              <li key={doc} className="flex gap-2 text-sm text-gray-600">
                <span className="text-violet-400">•</span>
                <span>{doc}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="ml-12">
        <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
          ⏱️ {step.timeframe}
        </span>
      </div>
    </div>
  );

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
            href={`/countries/${country.toLowerCase()}`}
            className="text-sm font-semibold hover:text-violet-600 transition"
          >
            ← Back to {country}
          </Link>
        </div>
      </header>

      {/* HERO */}
      <section className="bg-gradient-to-br from-[#0B1957] via-violet-900 to-pink-900 px-6 py-24 text-white text-center">
        <div className="inline-flex rounded-full bg-orange-400 px-4 py-1 text-xs font-bold uppercase tracking-wide mb-6">
          Relocation Guide
        </div>
        <h1 className="text-6xl font-black leading-none md:text-8xl mb-6">{city}</h1>
        <p className="mx-auto max-w-2xl text-xl text-white/80 mb-8">{guide.intro}</p>
        <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-semibold backdrop-blur-xl">
          📍 {country}
        </div>
      </section>

      {/* QUICK NAV */}
      <section className="bg-[#f8f7ff] px-6 py-6 border-b border-gray-100">
        <div className="mx-auto max-w-4xl">
          <div className="flex flex-wrap gap-3 justify-center">
            {[
              { id: "neighbourhoods", label: "🏘️ Neighbourhoods", free: true },
              { id: "visa", label: "🛂 Visa & Residency", free: false },
              { id: "tax", label: "💶 Tax Registration", free: false },
              { id: "healthcare", label: "🏥 Healthcare", free: false },
              { id: "banking", label: "🏦 Banking", free: false },
              { id: "schools", label: "🎓 Schools", free: false },
            ].map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-semibold hover:border-violet-400 hover:text-violet-600 transition"
              >
                {item.label}
                {!item.free && !isPremium && <span className="text-xs text-orange-500">🔒</span>}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <div className="mx-auto max-w-4xl px-6 py-16 space-y-20">

        {/* NEIGHBOURHOODS — FREE */}
        <section id="neighbourhoods">
          <div className="text-sm font-bold uppercase tracking-[0.3em] text-violet-500 mb-4">Free preview</div>
          <h2 className="text-4xl font-black mb-8">🏘️ Best neighbourhoods in {city}</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {guide.neighbourhoods.map((n) => (
              <div key={n.name} className="rounded-[24px] bg-[#f8f7ff] p-6">
                <h3 className="font-black text-xl mb-2">{n.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{n.description}</p>
                <div className="flex flex-wrap gap-3">
                  <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-bold text-violet-700">
                    Best for: {n.bestFor}
                  </span>
                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
                    Avg rent: {n.avgRent}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* VISA — PREMIUM */}
        <section id="visa">
          <div className="text-sm font-bold uppercase tracking-[0.3em] text-violet-500 mb-4">
            {isPremium ? "Premium" : "🔒 Premium"}
          </div>
          <h2 className="text-4xl font-black mb-8">🛂 Visa & Residency in {city}</h2>
          {isPremium ? (
            <div className="space-y-4">
              {guide.visaSteps.map((step) => <StepCard key={step.step} step={step} />)}
            </div>
          ) : (
            <PremiumLock section="Visa & Residency" />
          )}
        </section>

        {/* TAX — PREMIUM */}
        <section id="tax">
          <div className="text-sm font-bold uppercase tracking-[0.3em] text-violet-500 mb-4">
            {isPremium ? "Premium" : "🔒 Premium"}
          </div>
          <h2 className="text-4xl font-black mb-8">💶 Tax Registration in {city}</h2>
          {isPremium ? (
            <div className="space-y-4">
              {guide.taxRegistration.map((step) => <StepCard key={step.step} step={step} />)}
            </div>
          ) : (
            <PremiumLock section="Tax Registration" />
          )}
        </section>

        {/* HEALTHCARE — PREMIUM */}
        <section id="healthcare">
          <div className="text-sm font-bold uppercase tracking-[0.3em] text-violet-500 mb-4">
            {isPremium ? "Premium" : "🔒 Premium"}
          </div>
          <h2 className="text-4xl font-black mb-8">🏥 Healthcare Registration in {city}</h2>
          {isPremium ? (
            <div className="space-y-4">
              {guide.healthcare.map((step) => <StepCard key={step.step} step={step} />)}
            </div>
          ) : (
            <PremiumLock section="Healthcare Registration" />
          )}
        </section>

        {/* BANKING — PREMIUM */}
        <section id="banking">
          <div className="text-sm font-bold uppercase tracking-[0.3em] text-violet-500 mb-4">
            {isPremium ? "Premium" : "🔒 Premium"}
          </div>
          <h2 className="text-4xl font-black mb-8">🏦 Banking Setup in {city}</h2>
          {isPremium ? (
            <div className="space-y-4">
              {guide.banking.map((step) => <StepCard key={step.step} step={step} />)}
            </div>
          ) : (
            <PremiumLock section="Banking Setup" />
          )}
        </section>

        {/* SCHOOLS — PREMIUM */}
        <section id="schools">
          <div className="text-sm font-bold uppercase tracking-[0.3em] text-violet-500 mb-4">
            {isPremium ? "Premium" : "🔒 Premium"}
          </div>
          <h2 className="text-4xl font-black mb-8">🎓 Schools & Education in {city}</h2>
          {isPremium ? (
            <div className="grid gap-6 md:grid-cols-2">
              {guide.schools.map((school) => (
                <div key={school.name} className="rounded-[24px] border border-gray-100 bg-white p-6 shadow-sm">
                  <h4 className="font-black text-lg mb-1">{school.name}</h4>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-bold text-violet-700">{school.type}</span>
                    <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-700">{school.language}</span>
                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">Ages {school.ageRange}</span>
                  </div>
                  <p className="text-gray-600 text-sm">{school.description}</p>
                </div>
              ))}
            </div>
          ) : (
            <PremiumLock section="Schools & Education" />
          )}
        </section>

        {/* CTA */}
        {!isPremium && (
          <div className="rounded-[32px] bg-gradient-to-br from-violet-600 via-pink-500 to-orange-400 p-10 text-center text-white">
            <h2 className="text-3xl font-black">Unlock the full {city} guide</h2>
            <p className="mt-4 text-white/80 text-lg">
              Get step-by-step instructions for visa, tax, healthcare, banking and schools — specific to {city}.
            </p>
            <Link
              href="/#pricing"
              className="mt-8 inline-block rounded-2xl bg-white px-8 py-4 text-sm font-bold text-violet-600 shadow-2xl transition hover:scale-105"
            >
              Start your 14-day free trial →
            </Link>
          </div>
        )}

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
          This guide is AI-generated for informational purposes only and does not constitute legal, tax or financial advice. Always consult a qualified professional.
        </p>
      </footer>

    </div>
  );
}