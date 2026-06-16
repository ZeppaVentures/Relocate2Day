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
