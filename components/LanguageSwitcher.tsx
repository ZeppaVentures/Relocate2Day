"use client";

import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";

const LANGUAGES = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "es", label: "Español", flag: "🇪🇸" },
  { code: "pt", label: "Português", flag: "🇵🇹" },
  { code: "zh", label: "中文", flag: "🇨🇳" },
];

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Detect current locale from pathname
  const currentLocale = LANGUAGES.find((l) => pathname.startsWith(`/${l.code}`))?.code || "en";
  const current = LANGUAGES.find((l) => l.code === currentLocale) || LANGUAGES[0];

  const switchLanguage = (code: string) => {
    // Remove existing locale prefix if present
    const strippedPath = LANGUAGES.reduce((path, lang) => {
      if (path.startsWith(`/${lang.code}`)) return path.slice(lang.code.length + 1) || "/";
      return path;
    }, pathname);

    const newPath = code === "en" ? strippedPath : `/${code}${strippedPath}`;

    // Set cookie so middleware remembers preference
    document.cookie = `NEXT_LOCALE=${code}; path=/; max-age=31536000`;
    router.push(newPath);
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
