"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [marketingOptIn, setMarketingOptIn] = useState(false);
  const [firstName, setFirstName] = useState("");

  const handleSignUp = async () => {
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }
// Send to HubSpot
await fetch("/api/hubspot/contact", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    email,
    source: "Sign up",
    firstName,
    marketingOptIn,
  }),
});

// Send welcome email via Resend
await fetch("/api/email", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ type: "welcome_free", email, firstName }),
});

    setSuccess(true);
    setLoading(false);
  };

  const handleGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };

  if (success) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center text-[#0B1957] px-6">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-6">📧</div>
          <h1 className="text-3xl font-black mb-4">Check your email!</h1>
          <p className="text-gray-500 text-lg mb-8">
            We've sent a confirmation link to <strong>{email}</strong>. Click it to activate your account.
          </p>
          <Link
            href="/"
            className="rounded-2xl bg-gradient-to-r from-violet-600 via-pink-500 to-orange-400 px-8 py-4 text-sm font-bold text-white shadow-xl transition hover:scale-105"
          >
            Back to homepage
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-[#0B1957] flex flex-col">

      {/* NAVIGATION */}
      <Navbar variant="simple" />

      {/* FORM */}
      <div className="flex-1 flex items-center justify-center px-6 py-20">
        <div className="w-full max-w-md">

          <div className="text-center mb-10">
            <h1 className="text-4xl font-black">Create your account</h1>
            <p className="mt-3 text-gray-500">Free forever. No credit card required.</p>
          </div>

          {/* Google */}
          <button
            onClick={handleGoogle}
            className="w-full flex items-center justify-center gap-3 rounded-2xl border-2 border-gray-200 px-6 py-4 text-sm font-bold text-[#0B1957] transition hover:bg-gray-50 mb-6"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-4 text-gray-400">or continue with email</span>
            </div>
          </div>

          {/* Email & Password */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2">First name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Your first name"
                className="w-full rounded-2xl border-2 border-gray-200 px-5 py-4 text-sm font-semibold outline-none focus:border-violet-500 transition"
              />
            </div>
                        <div>
              <label className="block text-sm font-semibold mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-2xl border-2 border-gray-200 px-5 py-4 text-sm font-semibold outline-none focus:border-violet-500 transition"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-2xl border-2 border-gray-200 px-5 py-4 text-sm font-semibold outline-none focus:border-violet-500 transition"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Confirm password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-2xl border-2 border-gray-200 px-5 py-4 text-sm font-semibold outline-none focus:border-violet-500 transition"
              />
            </div>
          </div>

          {error && (
            <div className="mt-4 rounded-2xl bg-red-50 border border-red-200 p-4 text-sm text-red-700">
              {error}
            </div>
          )}

          <label className="flex items-start gap-3 cursor-pointer mt-4">
            <input
              type="checkbox"
              checked={marketingOptIn}
              onChange={(e) => setMarketingOptIn(e.target.checked)}
              className="mt-0.5 h-4 w-4 rounded border-gray-300 text-violet-600"
            />
            <span className="text-sm text-gray-500 leading-snug">
              Yes, keep me updated with relocation tips, country guides, and exclusive offers from Relocate2Day. You can unsubscribe at any time.
            </span>
          </label>

                    <button
            onClick={handleSignUp}
            disabled={loading}
            className="mt-6 w-full rounded-2xl bg-gradient-to-r from-violet-600 via-pink-500 to-orange-400 px-6 py-4 text-sm font-bold text-white shadow-xl transition hover:scale-[1.02] disabled:opacity-50"
          >
            {loading ? "Creating account..." : "Create free account"}
          </button>

          <p className="mt-6 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link href="/auth/login" className="font-bold text-violet-600 hover:underline">
              Log in
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}