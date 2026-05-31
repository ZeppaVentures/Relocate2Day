"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DeleteAccountButton() {
  const [step, setStep] = useState<"idle" | "confirm" | "deleting" | "done">("idle");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleDelete = async () => {
    setStep("deleting");
    setError(null);
    try {
      const res = await fetch("/api/gdpr/delete-account", { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Deletion failed");
      setStep("done");
      setTimeout(() => router.push("/"), 3000);
    } catch (err: any) {
      setError(err.message);
      setStep("confirm");
    }
  };

  if (step === "done") {
    return (
      <div className="rounded-xl bg-green-50 border border-green-200 p-5 text-sm text-green-800">
        <p className="font-medium">Your account has been permanently deleted.</p>
        <p className="mt-1 text-green-600">All your data has been removed. Redirecting you now...</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-red-100 bg-red-50 p-5">
      <h3 className="text-sm font-semibold text-red-800 mb-1">Delete my account</h3>
      <p className="text-sm text-red-600 mb-4">
        Permanently delete your account and all associated data including your profile,
        checklist, and quiz history. This cannot be undone.
      </p>
      {error && (
        <div className="mb-3 text-sm text-red-700 bg-red-100 rounded-lg px-4 py-2">
          {error}
        </div>
      )}
      {step === "idle" && (
        <button
          onClick={() => setStep("confirm")}
          className="text-sm font-medium text-red-600 hover:text-red-800 underline transition-colors"
        >
          Request account deletion
        </button>
      )}
      {step === "confirm" && (
        <div className="space-y-3">
          <p className="text-sm font-medium text-red-800">Are you sure? This will permanently delete:</p>
          <ul className="text-sm text-red-600 list-disc pl-4 space-y-1">
            <li>Your account and login credentials</li>
            <li>Your relocation checklist</li>
            <li>Your quiz results and history</li>
            <li>Your subscription (cancels immediately)</li>
          </ul>
          <div className="flex gap-3 pt-1">
            <button
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
            >
              Yes, delete my account
            </button>
            <button
              onClick={() => setStep("idle")}
              className="bg-white hover:bg-gray-50 text-gray-700 text-sm font-medium px-4 py-2 rounded-lg border border-gray-200 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      {step === "deleting" && (
        <div className="flex items-center gap-2 text-sm text-red-600">
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
          </svg>
          Deleting your account and all data...
        </div>
      )}
    </div>
  );
}
