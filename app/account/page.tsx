"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DeleteAccountButton from "@/components/DeleteAccountButton";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function AccountPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const loadProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        router.push("/auth/login");
        return;
      }

      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      setProfile(data);
      setLoading(false);
    };

    loadProfile();

    // Check for success param
    const params = new URLSearchParams(window.location.search);
    if (params.get("success") === "true") {
      setSuccessMessage("🎉 You're now a Premium member! Welcome aboard.");
    }
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  const handleManageBilling = async () => {
  const response = await fetch("/api/stripe/portal", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ customerId: profile.stripe_customer_id }),
  });

  const data = await response.json();
  if (data.url) {
    window.location.href = data.url;
  }
};

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-bounce">👤</div>
          <p className="text-gray-500">Loading your account...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-[#0B1957]">

      {/* NAVIGATION */}
      <header className="border-b border-gray-100 px-6 py-5">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link href="/" className="text-3xl font-black tracking-tight">
            <span className="bg-gradient-to-r from-violet-600 via-pink-500 to-orange-400 bg-clip-text text-transparent">
              Relocate2Day
            </span>
          </Link>
          <button
            onClick={handleLogout}
            className="text-sm font-semibold text-gray-500 hover:text-red-500 transition"
          >
            Log out
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-6 py-16">

        {successMessage && (
          <div className="mb-8 rounded-[20px] bg-green-50 border border-green-200 p-6 text-green-800 font-semibold text-center">
            {successMessage}
          </div>
        )}

        <h1 className="text-4xl font-black mb-10">My Account</h1>

        {/* Profile card */}
        <div className="rounded-[28px] bg-[#f8f7ff] p-8 mb-6">
          <div className="flex items-center gap-5 mb-6">
            {profile?.avatar_url ? (
              <img
                src={profile.avatar_url}
                alt="Avatar"
                className="w-16 h-16 rounded-full object-cover"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-violet-600 via-pink-500 to-orange-400 flex items-center justify-center text-white text-2xl font-black">
                {profile?.email?.[0]?.toUpperCase()}
              </div>
            )}
            <div>
              <div className="font-black text-xl">{profile?.full_name || "Member"}</div>
              <div className="text-gray-500 text-sm">{profile?.email}</div>
            </div>
          </div>
        </div>

        {/* Subscription card */}
        <div className="rounded-[28px] bg-white border-2 border-gray-100 p-8 shadow-lg mb-6">
          <h2 className="text-xl font-black mb-6">Subscription</h2>

          {profile?.subscription_status === "active" ? (
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="rounded-full bg-green-100 px-4 py-1 text-sm font-bold text-green-700">
                  ✅ Premium — {profile.subscription_plan === "annual" ? "Annual" : "Monthly"}
                </div>
              </div>
              <p className="text-gray-500 text-sm mb-6">
                Your subscription renews on{" "}
                <strong>
                  {new Date(profile.subscription_end_date).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </strong>
              </p>
              <button
                onClick={handleManageBilling}
                className="rounded-2xl border-2 border-violet-600 px-6 py-3 text-sm font-bold text-violet-600 transition hover:bg-violet-50"
              >
                Manage billing
              </button>
            </div>
          ) : (
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="rounded-full bg-gray-100 px-4 py-1 text-sm font-bold text-gray-600">
                  Free plan
                </div>
              </div>
              <p className="text-gray-500 text-sm mb-6">
                Upgrade to Premium to unlock the full tax calculator, detailed visa guides, healthcare and banking guides, and expert community access.
              </p>
              <Link
                href="/#pricing"
                className="inline-block rounded-2xl bg-gradient-to-r from-violet-600 via-pink-500 to-orange-400 px-6 py-3 text-sm font-bold text-white shadow-lg transition hover:scale-105"
              >
                Upgrade to Premium →
              </Link>
            </div>
          )}
        </div>
        
{/* Quick links */}
        <div className="rounded-[28px] bg-white border-2 border-gray-100 p-8 shadow-lg mb-6">
          <h2 className="text-xl font-black mb-6">Quick links</h2>
          <div className="grid gap-3 md:grid-cols-2">
            <Link href="/checklist" className="flex items-center gap-3 rounded-2xl bg-[#f8f7ff] px-5 py-4 text-sm font-bold hover:bg-violet-50 transition">
              <span className="text-2xl">📋</span>
              <div>
                <div>My Relocation Checklist</div>
                <div className="text-gray-400 font-normal text-xs">Track your move step by step</div>
              </div>
            </Link>
            <Link href="/tax-calculator" className="flex items-center gap-3 rounded-2xl bg-[#f8f7ff] px-5 py-4 text-sm font-bold hover:bg-violet-50 transition">
              <span className="text-2xl">💶</span>
              <div>
                <div>Tax Calculator</div>
                <div className="text-gray-400 font-normal text-xs">Compare taxes across Europe</div>
              </div>
            </Link>
            <Link href="/#countries" className="flex items-center gap-3 rounded-2xl bg-[#f8f7ff] px-5 py-4 text-sm font-bold hover:bg-violet-50 transition">
              <span className="text-2xl">🌍</span>
              <div>
                <div>Country Guides</div>
                <div className="text-gray-400 font-normal text-xs">Explore your destination</div>
              </div>
            </Link>
            <Link href="/" className="flex items-center gap-3 rounded-2xl bg-[#f8f7ff] px-5 py-4 text-sm font-bold hover:bg-violet-50 transition">
              <span className="text-2xl">🧭</span>
              <div>
                <div>Retake the Quiz</div>
                <div className="text-gray-400 font-normal text-xs">Find your perfect country</div>
              </div>
            </Link>
          </div>
        </div>

        {/* Danger zone */}
        <div className="rounded-[28px] bg-red-50 border border-red-200 p-8">
          <h2 className="text-xl font-black text-red-800 mb-4">Account</h2>
          <button
            onClick={handleLogout}
            className="rounded-2xl border-2 border-red-300 px-6 py-3 text-sm font-bold text-red-600 transition hover:bg-red-100"
          >
            Log out
          </button>
          <div className="mt-6">
            <DeleteAccountButton />
          </div>
        </div>

      </div>

      {/* FOOTER */}
      <footer className="bg-[#0B1957] px-6 py-12 text-center text-sm text-white/50 mt-auto">
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
      </footer>

    </div>
  );
}