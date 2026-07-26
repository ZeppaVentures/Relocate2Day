#!/bin/bash

# ============================================================
# Relocate2Day — i18n Part 2: Wire up homepage & results pages
# ============================================================

set -e
echo "🌍 Starting i18n Part 2 — wiring up pages..."

# ─── 1. lib/useTranslations.ts ────────────────────────────────────────────────
echo "📝 Creating lib/useTranslations.ts..."
cat > lib/useTranslations.ts << 'EOF'
"use client";

import { useState, useEffect } from "react";

export type Locale = "en" | "es" | "pt" | "zh";

type Messages = Record<string, unknown>;

function getNestedValue(obj: Messages, key: string, vars?: Record<string, string>): string {
  const keys = key.split(".");
  let value: unknown = obj;
  for (const k of keys) {
    if (value && typeof value === "object" && k in (value as Record<string, unknown>)) {
      value = (value as Record<string, unknown>)[k];
    } else {
      return key;
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

function detectLocale(): Locale {
  if (typeof window === "undefined") return "en";
  
  // Check cookie first (user preference)
  const cookieMatch = document.cookie.match(/NEXT_LOCALE=([^;]+)/);
  if (cookieMatch && ["en","es","pt","zh"].includes(cookieMatch[1])) {
    return cookieMatch[1] as Locale;
  }
  
  // Check URL path
  const path = window.location.pathname;
  if (path.startsWith("/es")) return "es";
  if (path.startsWith("/pt")) return "pt";
  if (path.startsWith("/zh")) return "zh";
  
  // Check browser language
  const lang = navigator.language.toLowerCase();
  if (lang.startsWith("es")) return "es";
  if (lang.startsWith("pt")) return "pt";
  if (lang.startsWith("zh")) return "zh";
  
  return "en";
}

const messageCache: Record<string, Messages> = {};

async function loadMessages(locale: Locale): Promise<Messages> {
  if (messageCache[locale]) return messageCache[locale];
  try {
    const messages = await import(`../messages/${locale}.json`);
    messageCache[locale] = messages.default || messages;
    return messageCache[locale];
  } catch {
    // Fallback to English
    const messages = await import(`../messages/en.json`);
    messageCache["en"] = messages.default || messages;
    return messageCache["en"];
  }
}

export function useTranslations() {
  const [locale, setLocale] = useState<Locale>("en");
  const [messages, setMessages] = useState<Messages>({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const detected = detectLocale();
    setLocale(detected);
    loadMessages(detected).then((msgs) => {
      setMessages(msgs);
      setLoaded(true);
    });
  }, []);

  function t(key: string, vars?: Record<string, string>): string {
    if (!loaded) return "";
    return getNestedValue(messages, key, vars);
  }

  function tArray(key: string): string[] {
    if (!loaded) return [];
    const keys = key.split(".");
    let value: unknown = messages;
    for (const k of keys) {
      if (value && typeof value === "object" && k in (value as Record<string, unknown>)) {
        value = (value as Record<string, unknown>)[k];
      } else return [];
    }
    return Array.isArray(value) ? value.map(String) : [];
  }

  function tObject(key: string): Record<string, string> {
    if (!loaded) return {};
    const keys = key.split(".");
    let value: unknown = messages;
    for (const k of keys) {
      if (value && typeof value === "object" && k in (value as Record<string, unknown>)) {
        value = (value as Record<string, unknown>)[k];
      } else return {};
    }
    return typeof value === "object" && value !== null ? value as Record<string, string> : {};
  }

  return { t, tArray, tObject, locale, loaded };
}
EOF

# ─── 2. Update components/LanguageSwitcher.tsx to also set path correctly ────
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
EOF

# ─── 3. scripts/translate-homepage.ts ────────────────────────────────────────
echo "📝 Creating scripts/translate-homepage.ts..."
cat > scripts/translate-homepage.ts << 'EOF'
/**
 * translate-homepage.ts
 * 
 * Regenerates es.json, pt.json, zh.json from en.json
 * with strict rules for country-specific terms.
 * 
 * Run: ANTHROPIC_API_KEY=xxx npx tsx scripts/translate-homepage.ts
 */

import * as fs from "fs";
import * as path from "path";

const LANGUAGES = [
  { code: "es", name: "Spanish", notes: "Use neutral Latin American Spanish. Natural and friendly tone." },
  { code: "pt", name: "Portuguese", notes: "Use Brazilian Portuguese (pt-BR). Natural and friendly tone." },
  { code: "zh", name: "Simplified Mandarin Chinese", notes: "Use Simplified Chinese characters. Natural tone for a mainland Chinese audience." },
];

const en = JSON.parse(fs.readFileSync(path.join(process.cwd(), "messages/en.json"), "utf-8"));

async function translate(langCode: string, langName: string, langNotes: string) {
  console.log(`🌍 Translating UI strings to ${langName}...`);

  const prompt = `You are a professional translator specialising in ${langName}.

Translate the following JSON from English to ${langName}.

STRICT RULES — never break these:
- Translate ONLY the string values, never the JSON keys
- Keep ALL template variables exactly as-is: {{country}}, {{name}} etc.
- Keep ALL emoji exactly as-is
- Keep "Relocate2Day" exactly as-is — never translate it
- Keep all URLs exactly as-is
- Keep currency symbols and numbers exactly as-is: €12, €99, €0 etc.
- Keep country names in their standard ${langName} form (España, Portugal etc.) EXCEPT when they appear as part of an official programme name
- Official visa/permit/programme names must stay in their ORIGINAL language — for example: "Non-Habitual Resident", "Digital Nomad Visa", "Beckham Law", "NHR", "Golden Visa" — do not translate these
- ${langNotes}
- Return ONLY valid JSON — no preamble, no markdown, no backticks

JSON to translate:
${JSON.stringify(en, null, 2)}`;

  const res = await fetch("https://api.anthropic.com/v1/messages", {
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

  const data = await res.json();
  if (!res.ok) throw new Error(`API error: ${JSON.stringify(data)}`);

  const text = data.content.map((i: {type: string; text?: string}) => i.text || "").join("");
  const clean = text.replace(/```json|```/g, "").trim();
  const parsed = JSON.parse(clean);
  fs.writeFileSync(path.join(process.cwd(), `messages/${langCode}.json`), JSON.stringify(parsed, null, 2));
  console.log(`✅ Saved messages/${langCode}.json`);
}

async function main() {
  if (!process.env.ANTHROPIC_API_KEY) { console.error("❌ ANTHROPIC_API_KEY not set"); process.exit(1); }
  for (const lang of LANGUAGES) {
    await translate(lang.code, lang.name, lang.notes);
    await new Promise(r => setTimeout(r, 1000));
  }
  console.log("\n🎉 All UI translations done!");
}

main().catch(console.error);
EOF

# ─── 4. scripts/translate-country.ts ─────────────────────────────────────────
echo "📝 Creating scripts/translate-country.ts..."
cat > scripts/translate-country.ts << 'EOF'
/**
 * translate-country.ts
 * 
 * Translates a full country page content to ES, PT, and ZH.
 * Reads from app/countries/[country]/content.json (we'll generate these)
 * and writes to app/countries/[country]/content.[locale].json
 * 
 * Run: ANTHROPIC_API_KEY=xxx npx tsx scripts/translate-country.ts --country=bulgaria
 */

import * as fs from "fs";
import * as path from "path";

const LANGUAGES = [
  { code: "es", name: "Spanish", notes: "Neutral Latin American Spanish." },
  { code: "pt", name: "Portuguese", notes: "Brazilian Portuguese (pt-BR)." },
  { code: "zh", name: "Simplified Mandarin Chinese", notes: "Simplified Chinese for mainland Chinese audience. Add a note at the top of the intro field: '注意：以下内容由AI翻译。重要事项请向专业顾问核实。'" },
];

const countryArg = process.argv.find(a => a.startsWith("--country="))?.split("=")[1];
if (!countryArg) { console.error("Usage: npx tsx scripts/translate-country.ts --country=bulgaria"); process.exit(1); }

const contentPath = path.join(process.cwd(), `app/countries/${countryArg}/content.json`);
if (!fs.existsSync(contentPath)) {
  console.error(`❌ No content.json found at ${contentPath}`);
  console.log("Run scripts/extract-country-content.ts first to extract content from the page.");
  process.exit(1);
}

const content = JSON.parse(fs.readFileSync(contentPath, "utf-8"));

async function translate(langCode: string, langName: string, langNotes: string) {
  console.log(`🌍 Translating ${countryArg} content to ${langName}...`);

  const prompt = `You are a professional translator specialising in ${langName} with expertise in immigration, tax and relocation content.

Translate the following JSON object containing relocation guide content for ${countryArg} from English to ${langName}.

STRICT RULES — never break these:
- Translate ONLY string values, never JSON keys
- Keep "Relocate2Day" exactly as-is
- Keep ALL URLs exactly as-is
- Keep ALL numbers, percentages, currency amounts exactly as-is: 10%, €500, BGN 1 million etc.
- Keep ALL official visa/permit/programme names in their ORIGINAL language — examples:
  * "Digital Nomad Residence Permit" → keep as-is (it's an official Bulgarian programme name)
  * "Non-Habitual Resident" / "NHR" → keep as-is (official Portuguese programme)
  * "Beckham Law" / "Régimen Especial de Trabajadores Desplazados" → keep as-is
  * "Golden Visa" → keep as-is
  * "Type D Visa" → keep as-is
  * Any official government programme name → keep in original language
- Keep ALL proper nouns for institutions, banks, insurance companies as-is: UniCredit, Revolut, Wise, Allianz, Bupa, AXA, NHIF etc.
- Keep ALL place names in their standard ${langName} equivalent (Sofia, Plovdiv etc.)
- Keep ALL emoji exactly as-is
- ${langNotes}
- Return ONLY valid JSON — no preamble, no markdown backticks

JSON to translate:
${JSON.stringify(content, null, 2)}`;

  const res = await fetch("https://api.anthropic.com/v1/messages", {
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

  const data = await res.json();
  if (!res.ok) throw new Error(`API error: ${JSON.stringify(data)}`);

  const text = data.content.map((i: {type: string; text?: string}) => i.text || "").join("");
  const clean = text.replace(/```json|```/g, "").trim();
  const parsed = JSON.parse(clean);
  const outPath = path.join(process.cwd(), `app/countries/${countryArg}/content.${langCode}.json`);
  fs.writeFileSync(outPath, JSON.stringify(parsed, null, 2));
  console.log(`✅ Saved content.${langCode}.json`);
}

async function main() {
  if (!process.env.ANTHROPIC_API_KEY) { console.error("❌ ANTHROPIC_API_KEY not set"); process.exit(1); }
  for (const lang of LANGUAGES) {
    await translate(lang.code, lang.name, lang.notes);
    await new Promise(r => setTimeout(r, 1500));
  }
  console.log(`\n🎉 ${countryArg} translations complete!`);
}

main().catch(console.error);
EOF

# ─── 5. scripts/translate-all-countries.sh ───────────────────────────────────
echo "📝 Creating scripts/translate-all-countries.sh..."
cat > scripts/translate-all-countries.sh << 'EOF'
#!/bin/bash
# Translates all 9 country pages
# Run: ANTHROPIC_API_KEY=xxx bash scripts/translate-all-countries.sh

set -e
COUNTRIES=("spain" "portugal" "italy" "gibraltar" "malta" "bulgaria" "greece" "netherlands" "romania")

for country in "${COUNTRIES[@]}"; do
  echo ""
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo "🌍 Processing: $country"
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  ANTHROPIC_API_KEY=$ANTHROPIC_API_KEY npx tsx scripts/translate-country.ts --country=$country
  sleep 2
done

echo ""
echo "🎉 All 9 countries translated!"
EOF
chmod +x scripts/translate-all-countries.sh

echo ""
echo "✅ Part 2 scaffolding complete!"
echo ""
echo "Files created:"
echo "   📄 lib/useTranslations.ts — client-side translation hook"
echo "   📄 components/LanguageSwitcher.tsx — updated switcher"
echo "   📄 scripts/translate-homepage.ts — regenerate UI translations"
echo "   📄 scripts/translate-country.ts — translate one country page"
echo "   📄 scripts/translate-all-countries.sh — translate all 9 countries"
echo ""
echo "⚡ Next step — share your app/countries/[country]/page.tsx template"
echo "   so we can extract content.json files for each country."
