#!/bin/bash
set -e
echo "🌍 Applying cookie-only language fix..."

# ─── 1. Simplify middleware.ts — never redirect, just let pages self-detect ──
echo "📝 Updating middleware.ts..."
cat > middleware.ts << 'EOF'
import { NextRequest, NextResponse } from "next/server";

const LOCALES = ["en", "es", "pt", "zh"];

// Map of country codes to locale, used only to SET the initial cookie
// on first visit — never used to redirect or rewrite URLs.
const COUNTRY_LOCALE_MAP: Record<string, string> = {
  BR: "pt", PT: "pt", AO: "pt", MZ: "pt",
  ES: "es", MX: "es", AR: "es", CO: "es", CL: "es", PE: "es",
  VE: "es", EC: "es", GT: "es", CU: "es", BO: "es", DO: "es",
  HN: "es", PY: "es", SV: "es", NI: "es", CR: "es", PA: "es", UY: "es",
  CN: "zh", TW: "zh", SG: "zh", HK: "zh",
};

function detectLocale(request: NextRequest): string | null {
  const country = request.headers.get("x-country") ||
                  request.headers.get("cf-ipcountry") ||
                  request.headers.get("x-vercel-ip-country");
  if (country && COUNTRY_LOCALE_MAP[country]) return COUNTRY_LOCALE_MAP[country];

  const acceptLang = request.headers.get("accept-language") || "";
  if (acceptLang.startsWith("es")) return "es";
  if (acceptLang.startsWith("pt")) return "pt";
  if (acceptLang.startsWith("zh")) return "zh";

  return null;
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/images") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // No redirects — every route lives at its real path (/countries/spain, not /es/countries/spain).
  // We only set a NEXT_LOCALE cookie on first visit if the user doesn't have one yet,
  // so client-side translation hooks can pick the right language automatically.
  const response = NextResponse.next();

  const hasLocaleCookie = request.cookies.get("NEXT_LOCALE")?.value;
  if (!hasLocaleCookie) {
    const detected = detectLocale(request);
    if (detected && LOCALES.includes(detected)) {
      response.cookies.set("NEXT_LOCALE", detected, { path: "/", maxAge: 31536000 });
    }
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next|api|images|favicon.ico).*)"],
};
EOF

# ─── 2. Simplify LanguageSwitcher.tsx — always cookie + reload in place ──────
echo "📝 Updating components/LanguageSwitcher.tsx..."
cat > components/LanguageSwitcher.tsx << 'EOF'
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
    const cookieMatch = document.cookie.match(/NEXT_LOCALE=([^;]+)/);
    if (cookieMatch) setCurrentLocale(cookieMatch[1]);
  }, []);

  const current = LANGUAGES.find((l) => l.code === currentLocale) || LANGUAGES[0];

  const switchLanguage = (code: string) => {
    document.cookie = `NEXT_LOCALE=${code}; path=/; max-age=31536000`;
    setOpen(false);
    window.location.reload();
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
EOF

# ─── 3. Update all 9 country page.tsx files to read from cookie, not URL ────
echo "📝 Updating country pages to detect locale from cookie only..."

for country in spain gibraltar portugal italy malta bulgaria greece netherlands romania; do
  FILE="app/countries/${country}/page.tsx"
  if [ -f "$FILE" ]; then
    python3 << PYEOF
with open("$FILE", "r") as f:
    content = f.read()

old = '''  useEffect(() => {
    const path = window.location.pathname;
    let detected = "en";
    if (path.startsWith("/es")) detected = "es";
    else if (path.startsWith("/pt")) detected = "pt";
    else if (path.startsWith("/zh")) detected = "zh";
    else {
      const cookie = document.cookie.match(/NEXT_LOCALE=([^;]+)/);
      if (cookie) detected = cookie[1];
    }
    setLocale(detected);'''

new = '''  useEffect(() => {
    const cookie = document.cookie.match(/NEXT_LOCALE=([^;]+)/);
    const detected = cookie ? cookie[1] : "en";
    setLocale(detected);'''

content = content.replace(old, new, 1)

with open("$FILE", "w") as f:
    f.write(content)
PYEOF
    echo "  ✅ $country"
  fi
done

echo ""
echo "✅ Cookie-only fix applied across middleware, switcher, and all 9 country pages"
echo ""
echo "What changed:"
echo "   • No more redirects to /es /pt /zh URLs — everything stays on the real route"
echo "   • Language preference is stored in a cookie and read client-side everywhere"
echo "   • Switching language now just reloads the current page in the new language"
echo ""
echo "Next steps:"
echo "   git add middleware.ts components/LanguageSwitcher.tsx app/countries/"
echo "   git commit -m 'fix: cookie-only language detection, remove broken locale URL redirects'"
echo "   git push"
