"use client";

import { useState, useEffect } from "react";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) setVisible(true);
  }, []);

  const accept = (analytics: boolean) => {
    localStorage.setItem(
      "cookie_consent",
      JSON.stringify({ essential: true, analytics, timestamp: new Date().toISOString() })
    );
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6">
      <div className="max-w-4xl mx-auto bg-gray-900 text-white rounded-2xl shadow-2xl p-5 md:p-6">
        <div className="flex flex-col md:flex-row md:items-start gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">🍪</span>
              <h3 className="font-semibold text-white text-sm">We use cookies</h3>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              We use essential cookies to keep the site working. We&apos;d also like to use
              optional analytics cookies to understand how you use Relocate2Day so we can
              improve it.{" "}
              <a href="/privacy" className="text-blue-400 hover:underline">
                Privacy Policy
              </a>
            </p>
            {showDetails && (
              <div className="mt-3 space-y-2 text-xs text-gray-400 border-t border-gray-700 pt-3">
                <div>
                  <p className="font-medium text-gray-200">Essential cookies (always on)</p>
                  <p>Authentication, session management, security. Required for the site to function.</p>
                </div>
                <div>
                  <p className="font-medium text-gray-200">Analytics cookies (optional)</p>
                  <p>Help us understand which pages are most useful. No personal data is sold.</p>
                </div>
              </div>
            )}
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="mt-2 text-xs text-gray-400 hover:text-gray-200 underline"
            >
              {showDetails ? "Hide details" : "Show cookie details"}
            </button>
          </div>
          <div className="flex flex-col sm:flex-row md:flex-col gap-2 md:min-w-[160px]">
            <button
              onClick={() => accept(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors"
            >
              Accept all
            </button>
            <button
              onClick={() => accept(false)}
              className="bg-gray-700 hover:bg-gray-600 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors"
            >
              Essential only
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
