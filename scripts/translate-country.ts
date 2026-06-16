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
