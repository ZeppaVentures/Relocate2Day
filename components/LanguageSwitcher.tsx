"use client";

import { useState, useEffect } from "react";

const LANGUAGES = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "es", label: "Español", flag: "🇪🇸" },
  { code: "pt", label: "Português", flag: "🇵🇹" },
  { code: "zh", label: "中文", flag: "🇨🇳" },
];

export default function LanguageSwitcher() {
  const [open, setOpen] = useState(false);
  const [currentLocale, setCurrentLocale] = useState("en");

  useEffect(() => {
    const path = window.location.pathname;
    if (path.startsWith("/es")) setCurrentLocale("es");
    else if (path.startsWith("/pt")) setCurrentLocale("pt");
    else if (path.startsWith("/zh")) setCurrentLocale("zh");
    else {
      const cookieMatch = document.cookie.match(/NEXT_LOCALE=([^;]+)/);
      if (cookieMatch) setCurrentLocale(cookieMatch[1]);
    }
  }, []);

  const current = LANGUAGES.find((l) => l.code === currentLocale) || LANGUAGES[0];

  const switchLanguage = (code: string) => {
    // Set cookie
    document.cookie = `NEXT_LOCALE=${code}; path=/; max-age=31536000`;
    
    // Build new path
    const path = window.location.pathname;
    const stripped = LANGUAGES.reduce((p, lang) => {
      if (p.startsWith(`/${lang.code}`)) return p.slice(lang.code.length + 1) || "/";
      return p;
    }, path);
    
    const newPath = code === "en" ? stripped : `/${code}${stripped}`;
    window.location.href = newPath;
    setOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-xl border border-gray-200 px-3 py-2 text-sm font-semibold hover:border-violet-400 transition"
      >
        <span>{current.flag}</span>
        <span className="hidden md:inline">{current.label}</span>
        <span className="text-gray-400 text-xs">▾</span>
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full mt-2 z-50 w-36 rounded-2xl bg-white border border-gray-100 shadow-xl overflow-hidden">
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => switchLanguage(lang.code)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold hover:bg-violet-50 transition text-left ${
                  lang.code === currentLocale ? "bg-violet-50 text-violet-600" : "text-gray-700"
                }`}
              >
                <span>{lang.flag}</span>
                <span>{lang.label}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
