#!/bin/bash

# ============================================================
# Relocate2Day — i18n Translation Setup Script
# Creates:
#   1. next.config.mjs — i18n config
#   2. middleware.ts — auto language detection
#   3. messages/en.json — master English strings
#   4. messages/es.json — Spanish
#   5. messages/pt.json — Portuguese
#   6. messages/zh.json — Mandarin
#   7. lib/i18n.ts — translation helper
#   8. components/LanguageSwitcher.tsx — navbar switcher
#   9. components/Navbar.tsx — updated with switcher
#  10. scripts/generate-translations.ts — regenerate translations
# ============================================================

set -e
echo "🌍 Starting Relocate2Day i18n setup..."

# ─── 1. next.config.mjs ──────────────────────────────────────────────────────
echo "📝 Updating next.config.mjs..."
cat > next.config.mjs << 'NEXTEOF'
/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ["en", "es", "pt", "zh"],
    defaultLocale: "en",
    localeDetection: true,
  },
};
export default nextConfig;
NEXTEOF

# ─── 2. middleware.ts ─────────────────────────────────────────────────────────
echo "📝 Creating middleware.ts..."
cat > middleware.ts << 'MIDEOF'
import { NextRequest, NextResponse } from "next/server";

const LOCALES = ["en", "es", "pt", "zh"];

// Map of country codes to locale
const COUNTRY_LOCALE_MAP: Record<string, string> = {
  // Portuguese
  BR: "pt", PT: "pt", AO: "pt", MZ: "pt",
  // Spanish
  ES: "es", MX: "es", AR: "es", CO: "es", CL: "es", PE: "es",
  VE: "es", EC: "es", GT: "es", CU: "es", BO: "es", DO: "es",
  HN: "es", PY: "es", SV: "es", NI: "es", CR: "es", PA: "es", UY: "es",
  // Mandarin
  CN: "zh", TW: "zh", SG: "zh", HK: "zh",
};

function getLocaleFromRequest(request: NextRequest): string {
  // 1. Check if locale already in cookie (user preference)
  const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;
  if (cookieLocale && LOCALES.includes(cookieLocale)) return cookieLocale;

  // 2. Check country from Netlify/Cloudflare geo header
  const country = request.headers.get("x-country") || 
                  request.headers.get("cf-ipcountry") ||
                  request.headers.get("x-vercel-ip-country");
  if (country && COUNTRY_LOCALE_MAP[country]) return COUNTRY_LOCALE_MAP[country];

  // 3. Check Accept-Language header
  const acceptLang = request.headers.get("accept-language") || "";
  if (acceptLang.startsWith("es")) return "es";
  if (acceptLang.startsWith("pt")) return "pt";
  if (acceptLang.startsWith("zh")) return "zh";

  return "en";
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Skip for API routes, static files, etc.
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/images") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Check if locale already in path
  const pathnameHasLocale = LOCALES.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
  if (pathnameHasLocale) return NextResponse.next();

  // Redirect to detected locale
  const locale = getLocaleFromRequest(request);
  if (locale === "en") return NextResponse.next();

  const newUrl = new URL(`/${locale}${pathname}`, request.url);
  newUrl.search = request.nextUrl.search;
  return NextResponse.redirect(newUrl);
}

export const config = {
  matcher: ["/((?!_next|api|images|favicon.ico).*)"],
};
MIDEOF

# ─── 3. messages/en.json ─────────────────────────────────────────────────────
echo "📝 Creating messages/en.json..."
mkdir -p messages
cat > messages/en.json << 'ENEOF'
{
  "nav": {
    "countries": "Countries",
    "features": "Features",
    "pricing": "Pricing",
    "faq": "FAQ",
    "checklist": "My Checklist",
    "blog": "Blog",
    "login": "Log in",
    "getStarted": "Get started",
    "myAccount": "My Account"
  },
  "hero": {
    "title1": "Move to Europe.",
    "title2": "Live your",
    "titleHighlight": "best life.",
    "subtitle": "Relocate2Day is your all-in-one guide to relocating to Spain, Portugal and beyond.",
    "cta1": "Compare countries",
    "cta2": "Understand taxes",
    "cta3": "Plan your move"
  },
  "quiz": {
    "title": "Where should you relocate?",
    "subtitle": "Answer a few questions and get your personalised country ranking.",
    "fromLabel": "I'm from",
    "searchCountry": "Search country...",
    "incomeLabel": "Annual income",
    "selectBracket": "Select bracket...",
    "lifeStageLabel": "Life stage",
    "familyLabel": "Family situation",
    "lifestyleLabel": "Lifestyle preference",
    "industryLabel": "Industry",
    "aspirationsLabel": "Career aspirations",
    "aspirationsOptional": "(optional)",
    "currentCountryLabel": "I currently live in",
    "searchCurrentCountry": "Search country...",
    "submitButton": "Find my best options →",
    "free": "100% Free",
    "noCard": "No credit card required",
    "personalised": "Personalised results in 30 seconds",
    "errorMessage": "Please fill in all highlighted fields before continuing.",
    "lifeStages": {
      "employee": "Employee relocating with a company",
      "remote": "Remote worker / freelancer",
      "selfEmployed": "Self-employed / entrepreneur",
      "retiree": "Retiree",
      "student": "Student",
      "lookingForWork": "Looking for work"
    },
    "familySituations": {
      "single": "Single",
      "couple": "Couple (no children)",
      "youngChildren": "Family with young children",
      "teenagers": "Family with teenagers",
      "singleParent": "Single parent"
    },
    "lifestyles": {
      "city": "Bustling city life",
      "coastal": "Coastal / beach lifestyle",
      "rural": "Quiet rural or village life",
      "mix": "Mix of city and nature"
    }
  },
  "cityQuiz": {
    "eyebrow": "Already know your country?",
    "title": "Find your perfect city",
    "subtitle": "Tell us about yourself and we'll match you to the best cities and towns in your chosen country.",
    "countryLabel": "I want to move to",
    "selectCountry": "Select country...",
    "budgetLabel": "Monthly rent budget",
    "selectBudget": "Select budget...",
    "priorityLabel": "Top priority",
    "submitButton": "Find my perfect city →",
    "match1": "4 city matches",
    "match2": "Neighbourhood recommendations",
    "match3": "100% personalised"
  },
  "countries": {
    "eyebrow": "Popular destinations",
    "title": "Find your perfect place in Europe",
    "subtitle": "Explore the best countries for your new life abroad.",
    "exploreButton": "Explore {{country}} →"
  },
  "banner": {
    "eyebrow": "Your adventure awaits",
    "title": "Ready to take off?",
    "subtitle": "Join thousands of people who have already found their perfect home in Europe. Your new life is just a few questions away.",
    "cta": "Explore countries →"
  },
  "features": {
    "eyebrow": "Everything you need",
    "title": "Your relocation toolkit",
    "subtitle": "All the tools and guides you need to make your move with confidence.",
    "items": {
      "visa": { "title": "Visa & Residency", "description": "Up-to-date visa guides and residency requirements." },
      "taxes": { "title": "Taxes Made Simple", "description": "Compare taxes, social contributions and savings." },
      "cost": { "title": "Cost of Living", "description": "Real living expenses for Europe's top cities." },
      "healthcare": { "title": "Healthcare", "description": "Find the best healthcare systems and options." },
      "banking": { "title": "Banking & Finance", "description": "Open accounts, transfer money and manage finances." },
      "community": { "title": "Community Support", "description": "Connect with experts and expats abroad." }
    }
  },
  "pricing": {
    "eyebrow": "Pricing",
    "title": "Simple, transparent pricing",
    "subtitle": "Start for free. Upgrade when you need more.",
    "free": {
      "name": "Free",
      "price": "€0",
      "period": "Forever free",
      "features": ["Country comparisons", "Basic visa guides", "Cost of living data", "Relocation quiz"],
      "cta": "Get started free"
    },
    "monthly": {
      "name": "Premium",
      "price": "€12",
      "period": "per month · 14-day free trial",
      "cta": "Start 14-day free trial"
    },
    "annual": {
      "name": "Premium Annual",
      "price": "€99",
      "period": "per year",
      "badge": "Best value — save €45",
      "saving": "31% cheaper than monthly",
      "cta": "Start 14-day free trial"
    },
    "premiumFeatures": ["Everything in Free", "Full tax calculator", "Detailed visa guides", "Healthcare & banking guides", "Expert community access"]
  },
  "faq": {
    "eyebrow": "FAQ",
    "title": "Common questions",
    "items": [
      {
        "question": "Which countries does Relocate2Day cover?",
        "answer": "We currently cover Spain, Gibraltar, Portugal, Italy, Malta, Bulgaria, Greece, Netherlands and Romania, with more countries coming soon."
      },
      {
        "question": "Is Relocate2Day free to use?",
        "answer": "Yes — our core tools are free. We also offer a premium plan with deeper guides, tax calculators and expert support."
      },
      {
        "question": "Can Relocate2Day help me with visa applications?",
        "answer": "We provide up-to-date guides on visa requirements and processes, but we are not a legal service. We recommend consulting a local immigration lawyer for your specific situation."
      },
      {
        "question": "How accurate is the tax information?",
        "answer": "Our tax guides are regularly updated, but tax laws change frequently. Always verify with a local tax advisor before making financial decisions."
      }
    ]
  },
  "language": {
    "switcher": "Language",
    "en": "English",
    "es": "Español",
    "pt": "Português",
    "zh": "中文"
  }
}
ENEOF

# ─── 4. lib/i18n.ts ──────────────────────────────────────────────────────────
echo "📝 Creating lib/i18n.ts..."
mkdir -p lib
cat > lib/i18n.ts << 'I18NEOF'
import { useRouter } from "next/router";

export type Locale = "en" | "es" | "pt" | "zh";

export function useTranslations() {
  const router = useRouter();
  const locale = (router.locale || "en") as Locale;
  
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const messages = require(`../messages/${locale}.json`);
  
  function t(key: string, vars?: Record<string, string>): string {
    const keys = key.split(".");
    let value: unknown = messages;
    for (const k of keys) {
      if (value && typeof value === "object" && k in (value as Record<string, unknown>)) {
        value = (value as Record<string, unknown>)[k];
      } else {
        return key; // fallback to key if not found
      }
    }
    let result = typeof value === "string" ? value : key;
    if (vars) {
      Object.entries(vars).forEach(([k, v]) => {
        result = result.replace(`{{${k}}}`, v);
      });
    }
    return result;
  }

  return { t, locale };
}

export function getStaticI18nProps(locale: string) {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const messages = require(`../messages/${locale}.json`);
  return { props: { messages, locale } };
}
I18NEOF

# ─── 5. components/LanguageSwitcher.tsx ──────────────────────────────────────
echo "📝 Creating components/LanguageSwitcher.tsx..."
cat > components/LanguageSwitcher.tsx << 'LSEOF'
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
LSEOF

# ─── 6. components/Navbar.tsx — add language switcher ────────────────────────
echo "📝 Updating components/Navbar.tsx..."
cat > components/Navbar.tsx << 'NAVEOF'
import Link from "next/link";
import LanguageSwitcher from "./LanguageSwitcher";

type NavbarProps =
  | { variant: "simple" }
  | { variant: "account"; onLogout: () => void }
  | { variant: "content"; backHref: string; backLabel: string };

export default function Navbar(props: NavbarProps) {
  const isContent = props.variant === "content";
  return (
    <header
      className={
        isContent
          ? "sticky top-0 z-50 border-b border-white/30 bg-white/70 backdrop-blur-xl"
          : "border-b border-gray-100 px-6 py-5"
      }
    >
      <div className={`mx-auto flex max-w-7xl items-center justify-between ${isContent ? "px-6 py-5" : ""}`}>
        <div className="flex items-center gap-8">
          <Link href="/" className="text-3xl font-black tracking-tight">
            <span className="bg-gradient-to-r from-violet-600 via-pink-500 to-orange-400 bg-clip-text text-transparent">
              Relocate2Day
            </span>
          </Link>
          <Link href="/blog" className="text-sm font-semibold text-gray-500 hover:text-violet-600 transition">
            Blog
          </Link>
        </div>
        <div className="flex items-center gap-4">
          {props.variant === "content" && (
            <Link href={props.backHref} className="text-sm font-semibold hover:text-violet-600 transition">
              {props.backLabel}
            </Link>
          )}
          {props.variant === "account" && (
            <button
              onClick={props.onLogout}
              className="text-sm font-semibold text-gray-500 hover:text-red-500 transition"
            >
              Log out
            </button>
          )}
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
NAVEOF

# ─── 7. scripts/generate-translations.ts ─────────────────────────────────────
echo "📝 Creating scripts/generate-translations.ts..."
mkdir -p scripts
cat > scripts/generate-translations.ts << 'GENEOF'
/**
 * generate-translations.ts
 * 
 * Reads messages/en.json and generates es.json, pt.json, zh.json
 * via the Claude API.
 * 
 * Run with: npx ts-node scripts/generate-translations.ts
 * Or: npx tsx scripts/generate-translations.ts
 */

import * as fs from "fs";
import * as path from "path";

const LANGUAGES = [
  { code: "es", name: "Spanish (Latin American friendly)" },
  { code: "pt", name: "Brazilian Portuguese (pt-BR friendly)" },
  { code: "zh", name: "Simplified Mandarin Chinese" },
];

const englishMessages = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), "messages/en.json"), "utf-8")
);

async function translateToLanguage(langCode: string, langName: string) {
  console.log(`🌍 Translating to ${langName}...`);

  const prompt = `You are a professional translator specialising in ${langName}. 

Translate the following JSON object from English to ${langName}. 

Rules:
- Translate ONLY the string values, never the keys
- Keep all template variables like {{country}} exactly as-is
- Keep all emoji exactly as-is  
- Keep URLs, brand names (Relocate2Day), and country names as-is
- For Chinese, use Simplified Chinese characters
- For Portuguese, use Brazilian Portuguese conventions
- For Spanish, use neutral Latin American Spanish
- Return ONLY valid JSON, no preamble, no markdown backticks

English JSON to translate:
${JSON.stringify(englishMessages, null, 2)}`;

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.ANTHROPIC_API_KEY!,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-6",
      max_tokens: 8000,
      messages: [{ role: "user", content: prompt }],
    }),
  });

  const data = await response.json();
  if (!response.ok) throw new Error(`API error: ${JSON.stringify(data)}`);

  const text = data.content
    .map((item: { type: string; text?: string }) => item.text || "")
    .join("");

  const clean = text.replace(/```json|```/g, "").trim();
  const parsed = JSON.parse(clean);

  const outputPath = path.join(process.cwd(), `messages/${langCode}.json`);
  fs.writeFileSync(outputPath, JSON.stringify(parsed, null, 2));
  console.log(`✅ Saved messages/${langCode}.json`);
}

async function main() {
  if (!process.env.ANTHROPIC_API_KEY) {
    console.error("❌ ANTHROPIC_API_KEY not set in environment");
    process.exit(1);
  }

  for (const lang of LANGUAGES) {
    await translateToLanguage(lang.code, lang.name);
    // Small delay between API calls
    await new Promise((r) => setTimeout(r, 1000));
  }

  console.log("\n🎉 All translations generated!");
  console.log("Files created: messages/es.json, messages/pt.json, messages/zh.json");
}

main().catch(console.error);
GENEOF

echo ""
echo "✅ i18n setup complete! Here's what was created:"
echo ""
echo "   📄 next.config.mjs — i18n locales configured"
echo "   📄 middleware.ts — auto language detection"
echo "   📄 messages/en.json — master English strings"
echo "   📄 lib/i18n.ts — translation helper"
echo "   📄 components/LanguageSwitcher.tsx — navbar switcher"
echo "   📄 components/Navbar.tsx — updated with language switcher"
echo "   📄 scripts/generate-translations.ts — translation generator"
echo ""
echo "⚡ Next step — generate translations:"
echo "   ANTHROPIC_API_KEY=your_key_here npx tsx scripts/generate-translations.ts"
echo ""
echo "📌 Note: The homepage (app/page.tsx) and country pages still need to be"
echo "   wired up to use translation strings — that's the next script."
