"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

const COUNTRIES = ["Spain", "Portugal", "Italy", "Gibraltar", "Malta", "Bulgaria"];

const NATIONALITY_TYPES = [
  { value: "eu", label: "🇪🇺 EU / EEA citizen (free movement)" },
  { value: "uk", label: "🇬🇧 UK citizen (post-Brexit rules apply)" },
  { value: "non_eu", label: "🌍 Non-EU citizen (visa required)" },
];

const EMPLOYMENT_TYPES = [
  { value: "employed", label: "Employed (local contract)" },
  { value: "employed_abroad", label: "Employed abroad / remote worker" },
  { value: "freelance", label: "Freelance / self-employed" },
  { value: "retired", label: "Retired" },
  { value: "student", label: "Student" },
  { value: "business_owner", label: "Business owner" },
];

const FAMILY_SITUATIONS = [
  { value: "single", label: "Single, no children" },
  { value: "couple", label: "Couple, no children" },
  { value: "family_young", label: "Family with young children (under 12)" },
  { value: "family_teen", label: "Family with teenage children" },
  { value: "single_parent", label: "Single parent" },
];

interface ChecklistItem {
  id: string;
  task: string;
  details: string;
  documents: string[];
  category: string;
  completed: boolean;
}

interface ChecklistSection {
  title: string;
  emoji: string;
  items: ChecklistItem[];
}

interface Checklist {
  id: string;
  title: string;
  city: string;
  country: string;
  nationality: string;
  nationality_type: string;
  items: ChecklistSection[];
  created_at: string;
}

export default function ChecklistPage() {
  const [user, setUser] = useState<{ id: string } | null>(null);
  const [isPremium, setIsPremium] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [checklists, setChecklists] = useState<Checklist[]>([]);
  const [activeChecklist, setActiveChecklist] = useState<Checklist | null>(null);
  const [showGenerator, setShowGenerator] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [loading, setLoading] = useState(true);

  // Form state
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("Spain");
  const [nationality, setNationality] = useState("");
  const [nationalityType, setNationalityType] = useState("eu");
  const [employmentType, setEmploymentType] = useState("employed");
  const [familySituation, setFamilySituation] = useState("single");

  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
        const { data } = await supabase
          .from("profiles")
          .select("subscription_status")
          .eq("id", user.id)
          .single();
        setIsPremium(data?.subscription_status === "active");

        // Load existing checklists
        const res = await fetch(`/api/checklist?userId=${user.id}`);
        const data2 = await res.json();
        if (data2.checklists?.length > 0) {
          setChecklists(data2.checklists);
          setActiveChecklist(data2.checklists[0]);
        } else {
          setShowGenerator(true);
        }
      }
      setCheckingAuth(false);
      setLoading(false);
    };
    init();
  }, []);

  const handleGenerate = async () => {
    if (!user || !city || !nationality) return;
    setGenerating(true);

    try {
      const res = await fetch("/api/checklist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          city,
          country,
          nationality,
          nationalityType,
          employmentType,
          familySituation,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      // Reload checklists
      const res2 = await fetch(`/api/checklist?userId=${user.id}`);
      const data2 = await res2.json();
      setChecklists(data2.checklists);
      setActiveChecklist(data2.checklists[0]);
      setShowGenerator(false);
    } catch (err) {
      console.error(err);
    } finally {
      setGenerating(false);
    }
  };

  const handleToggleItem = async (sectionIndex: number, itemIndex: number) => {
    if (!activeChecklist) return;

    const updated = { ...activeChecklist };
    updated.items = updated.items.map((section, si) => ({
      ...section,
      items: section.items.map((item, ii) => {
        if (si === sectionIndex && ii === itemIndex) {
          return { ...item, completed: !item.completed };
        }
        return item;
      }),
    }));

    setActiveChecklist(updated);
    setChecklists((prev) => prev.map((c) => c.id === updated.id ? updated : c));

    await fetch("/api/checklist", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ checklistId: activeChecklist.id, items: updated.items }),
    });
  };

  const handleDelete = async (checklistId: string) => {
    await fetch(`/api/checklist?id=${checklistId}`, { method: "DELETE" });
    const remaining = checklists.filter((c) => c.id !== checklistId);
    setChecklists(remaining);
    if (remaining.length > 0) {
      setActiveChecklist(remaining[0]);
    } else {
      setActiveChecklist(null);
      setShowGenerator(true);
    }
  };

  const getProgress = (checklist: Checklist) => {
    const allItems = checklist.items.flatMap((s) => s.items);
    const completed = allItems.filter((i) => i.completed).length;
    return { completed, total: allItems.length, percent: Math.round((completed / allItems.length) * 100) };
  };

  if (checkingAuth || loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-6xl animate-bounce">📋</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center text-[#0B1957]">
        <div className="text-center max-w-md px-6">
          <div className="text-6xl mb-6">🔐</div>
          <h2 className="text-3xl font-black mb-4">Sign in to access your checklist</h2>
          <p className="text-gray-500 mb-8">Your relocation checklist is saved to your account so you can access it anywhere.</p>
          <Link href="/auth/login" className="inline-block rounded-2xl bg-gradient-to-r from-violet-600 via-pink-500 to-orange-400 px-8 py-4 text-sm font-bold text-white shadow-2xl transition hover:scale-105">
            Sign in →
          </Link>
        </div>
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
          <Link href="/account" className="text-sm font-semibold hover:text-violet-600 transition">
            ← My Account
          </Link>
        </div>
      </header>

      {/* HERO */}
      <section className="bg-gradient-to-br from-[#0B1957] via-violet-900 to-pink-900 px-6 py-16 text-white text-center">
        <div className="inline-flex rounded-full bg-orange-400 px-4 py-1 text-xs font-bold uppercase tracking-wide mb-6">
          Your Relocation Checklist
        </div>
        <h1 className="text-5xl font-black leading-none md:text-6xl mb-4">
          Stay on track 📋
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-white/80">
          Your personalised relocation checklist — tailored to your nationality, destination and situation.
        </p>
      </section>

      <div className="mx-auto max-w-5xl px-6 py-12">

        {/* EXISTING CHECKLISTS */}
        {checklists.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-black">Your checklists</h2>
              <button
                onClick={() => setShowGenerator(true)}
                className="rounded-2xl bg-gradient-to-r from-violet-600 via-pink-500 to-orange-400 px-4 py-2 text-sm font-bold text-white transition hover:scale-105"
              >
                + New checklist
              </button>
            </div>
            <div className="flex flex-wrap gap-3">
              {checklists.map((c) => {
                const prog = getProgress(c);
                return (
                  <button
                    key={c.id}
                    onClick={() => { setActiveChecklist(c); setShowGenerator(false); }}
                    className={`rounded-2xl px-4 py-3 text-sm font-bold transition text-left ${activeChecklist?.id === c.id ? "bg-violet-600 text-white" : "bg-[#f8f7ff] text-[#0B1957] hover:bg-violet-100"}`}
                  >
                    <div>{c.city}, {c.country}</div>
                    <div className={`text-xs mt-1 ${activeChecklist?.id === c.id ? "text-white/70" : "text-gray-400"}`}>
                      {prog.completed}/{prog.total} completed
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* GENERATOR FORM */}
        {showGenerator && (
          <div className="rounded-[32px] bg-[#f8f7ff] p-8 mb-12">
            <h2 className="text-2xl font-black mb-2">Create a new checklist</h2>
            <p className="text-gray-500 mb-8">Tell us about your move and we&apos;ll generate a personalised checklist.</p>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="block text-sm font-bold mb-2">Destination country</label>
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full rounded-2xl border-2 border-gray-200 px-5 py-4 text-sm font-semibold outline-none focus:border-violet-500 transition bg-white appearance-none"
                >
                  {COUNTRIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">Destination city</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="e.g. Barcelona, Lisbon, Valletta..."
                  className="w-full rounded-2xl border-2 border-gray-200 px-5 py-4 text-sm font-semibold outline-none focus:border-violet-500 transition bg-white"
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">Your nationality</label>
                <input
                  type="text"
                  value={nationality}
                  onChange={(e) => setNationality(e.target.value)}
                  placeholder="e.g. British, American, German..."
                  className="w-full rounded-2xl border-2 border-gray-200 px-5 py-4 text-sm font-semibold outline-none focus:border-violet-500 transition bg-white"
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">Employment type</label>
                <select
                  value={employmentType}
                  onChange={(e) => setEmploymentType(e.target.value)}
                  className="w-full rounded-2xl border-2 border-gray-200 px-5 py-4 text-sm font-semibold outline-none focus:border-violet-500 transition bg-white appearance-none"
                >
                  {EMPLOYMENT_TYPES.map((t) => (
                    <option key={t.value} value={t.value}>{t.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">Family situation</label>
                <select
                  value={familySituation}
                  onChange={(e) => setFamilySituation(e.target.value)}
                  className="w-full rounded-2xl border-2 border-gray-200 px-5 py-4 text-sm font-semibold outline-none focus:border-violet-500 transition bg-white appearance-none"
                >
                  {FAMILY_SITUATIONS.map((f) => (
                    <option key={f.value} value={f.value}>{f.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">Nationality type</label>
                <div className="space-y-2">
                  {NATIONALITY_TYPES.map((t) => (
                    <button
                      key={t.value}
                      onClick={() => setNationalityType(t.value)}
                      className={`w-full rounded-2xl px-4 py-3 text-sm font-bold text-left transition ${nationalityType === t.value ? "bg-violet-600 text-white" : "bg-white border-2 border-gray-200 text-gray-600 hover:border-violet-400"}`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={generating || !city || !nationality}
              className="mt-8 w-full rounded-2xl bg-gradient-to-r from-violet-600 via-pink-500 to-orange-400 px-6 py-5 text-lg font-bold text-white shadow-2xl transition hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {generating ? "Generating your checklist..." : "Generate my checklist →"}
            </button>

            {checklists.length > 0 && (
              <button
                onClick={() => setShowGenerator(false)}
                className="mt-3 w-full rounded-2xl border-2 border-gray-200 px-6 py-3 text-sm font-bold text-gray-500 transition hover:border-violet-400"
              >
                Cancel
              </button>
            )}
          </div>
        )}

        {/* GENERATING LOADING */}
        {generating && (
          <div className="text-center py-20">
            <div className="text-6xl mb-6 animate-bounce">📋</div>
            <h2 className="text-2xl font-black mb-4">Building your personalised checklist...</h2>
            <p className="text-gray-500">Tailoring every step to your nationality and situation</p>
            <div className="mt-8 flex justify-center gap-2">
              {[1,2,3,4].map((i) => (
                <div key={i} className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
              ))}
            </div>
          </div>
        )}

        {/* ACTIVE CHECKLIST */}
        {activeChecklist && !showGenerator && !generating && (
          <div>
            {/* Header */}
            <div className="flex items-start justify-between mb-8">
              <div>
                <h2 className="text-3xl font-black">{activeChecklist.title}</h2>
                <p className="text-gray-500 mt-1">
                  {activeChecklist.city}, {activeChecklist.country} • {activeChecklist.nationality}
                </p>
              </div>
              <button
                onClick={() => handleDelete(activeChecklist.id)}
                className="rounded-2xl border-2 border-red-200 px-4 py-2 text-sm font-bold text-red-500 transition hover:bg-red-50"
              >
                🗑️ Delete
              </button>
            </div>

            {/* Progress bar */}
            {(() => {
              const prog = getProgress(activeChecklist);
              return (
                <div className="rounded-[24px] bg-[#f8f7ff] p-6 mb-8">
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-black">Overall progress</span>
                    <span className="font-black text-violet-600">{prog.completed}/{prog.total} tasks completed</span>
                  </div>
                  <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-violet-600 via-pink-500 to-orange-400 rounded-full transition-all duration-500"
                      style={{ width: `${prog.percent}%` }}
                    />
                  </div>
                  <div className="text-right mt-2 text-sm text-gray-500">{prog.percent}% complete</div>
                </div>
              );
            })()}

            {/* Sections */}
            <div className="space-y-8">
              {activeChecklist.items.map((section, sectionIndex) => (
                <div key={section.title}>
                  <h3 className="text-xl font-black mb-4">
                    {section.emoji} {section.title}
                  </h3>
                  <div className="space-y-3">
                    {section.items.map((item, itemIndex) => (
                      <div
                        key={item.id}
                        className={`rounded-[20px] border-2 p-5 transition ${item.completed ? "border-green-200 bg-green-50" : "border-gray-100 bg-white"}`}
                      >
                        <div className="flex gap-4 items-start">
                          <button
                            onClick={() => handleToggleItem(sectionIndex, itemIndex)}
                            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition ${item.completed ? "bg-green-500 border-green-500 text-white" : "border-gray-300 hover:border-violet-500"}`}
                          >
                            {item.completed && <span className="text-xs">✓</span>}
                          </button>
                          <div className="flex-1">
                            <p className={`font-bold text-sm ${item.completed ? "line-through text-gray-400" : ""}`}>
                              {item.task}
                            </p>
                            {!item.completed && (
                              <>
                                <p className="text-gray-500 text-sm mt-1">{item.details}</p>
                                {item.documents.length > 0 && (
                                  <div className="mt-3">
                                    <div className="text-xs font-bold uppercase tracking-wide text-violet-600 mb-1">Documents needed</div>
                                    <div className="flex flex-wrap gap-2">
                                      {item.documents.map((doc) => (
                                        <span key={doc} className="rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-700">
                                          {doc}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Start fresh */}
            <div className="mt-12 rounded-[32px] bg-[#f8f7ff] p-8 text-center">
              <h3 className="text-xl font-black mb-2">Moving somewhere else?</h3>
              <p className="text-gray-500 mb-6">Create a new checklist for a different destination.</p>
              <button
                onClick={() => setShowGenerator(true)}
                className="inline-block rounded-2xl bg-gradient-to-r from-violet-600 via-pink-500 to-orange-400 px-8 py-4 text-sm font-bold text-white shadow-2xl transition hover:scale-105"
              >
                + Create new checklist
              </button>
            </div>
          </div>
        )}
      </div>

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