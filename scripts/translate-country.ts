/**
 * translate-country.ts
 * Translates a country's content.json to ES, PT, ZH.
 * Run: ANTHROPIC_API_KEY=xxx npx tsx scripts/translate-country.ts --country=spain
 */

import * as fs from "fs";
import * as path from "path";

const LANGUAGES = [
  {
    code: "es",
    name: "Spanish",
    notes: "Use neutral Latin American Spanish. Natural, warm, and professional tone."
  },
  {
    code: "pt",
    name: "Portuguese",
    notes: "Use Brazilian Portuguese (pt-BR). Natural, warm, and professional tone."
  },
  {
    code: "zh",
    name: "Simplified Mandarin Chinese",
    notes: "Use Simplified Chinese characters for a mainland Chinese audience. Add this disclaimer as the very first item in the hero.subtitle field, before the existing text: '注意：本页内容由AI翻译，仅供参考。重要决定请向专业顾问核实。'"
  },
];

const countryArg = process.argv.find(a => a.startsWith("--country="))?.split("=")[1];
if (!countryArg) {
  console.error("Usage: npx tsx scripts/translate-country.ts --country=spain");
  process.exit(1);
}

const contentPath = path.join(process.cwd(), `app/countries/${countryArg}/content.json`);
if (!fs.existsSync(contentPath)) {
  console.error(`❌ No content.json found at ${contentPath}`);
  process.exit(1);
}

const content = JSON.parse(fs.readFileSync(contentPath, "utf-8"));
const countryName = content.country || countryArg;

async function translateWithRetry(langCode: string, langName: string, langNotes: string, retries = 3): Promise<void> {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      await translate(langCode, langName, langNotes);
      return;
    } catch (err) {
      if (attempt < retries) {
        console.log(`  ⚠️  Attempt ${attempt} failed — retrying in 5s...`);
        await new Promise(r => setTimeout(r, 5000));
      } else {
        console.error(`  ❌ All ${retries} attempts failed for ${langCode}`);
        throw err;
      }
    }
  }
}

async function translate(langCode: string, langName: string, langNotes: string) {
  console.log(`  🌍 Translating to ${langName}...`);

  const prompt = `You are a professional translator specialising in ${langName}, with expertise in immigration, tax, and relocation content for European countries.

Translate the following JSON object (a relocation guide for ${countryName}) from English to ${langName}.

STRICT RULES — never break any of these:
- Translate ONLY string values. Never translate JSON keys.
- Keep "Relocate2Day" exactly as-is — never translate it.
- Keep ALL URLs exactly as-is.
- Keep ALL numbers, percentages, currency amounts exactly as-is: 10%, €500, £2M, BGN 1 million, etc.
- Keep ALL emoji exactly as-is.
- Keep country names in their standard ${langName} equivalent ONLY when they appear as standalone place names. Example: "España" in Spanish, "Espanha" in Portuguese. Exception: when a country name is part of an official programme or law name, keep it as-is.
- OFFICIAL PROGRAMME AND LAW NAMES must ALWAYS stay in their original language. Examples that must NEVER be translated:
  * "Beckham Law" → keep as "Beckham Law" in all languages
  * "Non-Lucrative Visa (NLV)" → keep as-is
  * "Digital Nomad Visa" → keep as-is
  * "Telework Visa" → keep as-is
  * "Golden Visa" → keep as-is
  * "Nomad Residence Permit" → keep as-is
  * "Malta Retirement Programme (MRP)" → keep as-is
  * "Global Residence Programme (GRP)" → keep as-is
  * "Malta Permanent Residence Programme (MPRP)" → keep as-is
  * "Highly Qualified Persons (HQP) Rules" → keep as-is
  * "Non-Habitual Resident (NHR)" → keep as-is
  * "IFICI" → keep as-is
  * "D7", "D8", "D4", "Type D" visa names → keep as-is
  * "Kennismigrant" → keep as-is
  * "DAFT Visa" → keep as-is
  * "HEPSS" → keep as-is
  * "Category 2" residency → keep as-is
  * "Digital Nomad Residence Permit" → keep as-is
  * "Elective Residency Visa" → keep as-is
  * "Impatriati" regime → keep as-is
  * "E33A" visa → keep as-is
  * "Financially Independent Person (FIP)" → keep as-is
  * Any visa, permit, or programme name that includes a country's official designation
- Keep ALL institution and bank names as-is: Santander, BBVA, CaixaBank, Revolut, Wise, Bupa, Allianz, AXA, UniCredit, etc.
- Keep ALL official government bodies and acronyms as-is: NIE, NIF, AFM, AMKA, BSN, CIF, AIMA, IND, IGI, AADE, ANAF, MFSA, GFSC, GHA, SNS, SSN, ESY, NHIF, EFKA, etc.
- ${langNotes}
- Return ONLY valid JSON — no preamble, no markdown backticks, no explanation.

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

  const text = data.content
    .map((i: { type: string; text?: string }) => i.text || "")
    .join("");
  const clean = text.replace(/```json|```/g, "").trim();

  let parsed;
  try {
    parsed = JSON.parse(clean);
  } catch {
    console.error(`  ❌ JSON parse error for ${langCode}. Raw response saved to /tmp/${countryArg}-${langCode}-raw.txt`);
    fs.writeFileSync(`/tmp/${countryArg}-${langCode}-raw.txt`, clean);
    throw new Error("JSON parse failed");
  }

  const outPath = path.join(process.cwd(), `app/countries/${countryArg}/content.${langCode}.json`);
  fs.writeFileSync(outPath, JSON.stringify(parsed, null, 2));
  console.log(`  ✅ Saved content.${langCode}.json`);
}

async function main() {
  if (!process.env.ANTHROPIC_API_KEY) {
    console.error("❌ ANTHROPIC_API_KEY not set");
    process.exit(1);
  }

  console.log(`\n🌍 Translating ${countryName}...`);
  for (const lang of LANGUAGES) {
    const outPath = path.join(process.cwd(), `app/countries/${countryArg}/content.${lang.code}.json`);
    if (fs.existsSync(outPath)) {
      console.log(`  ⏭️  Skipping ${lang.code} — already exists`);
      continue;
    }
    await translateWithRetry(lang.code, lang.name, lang.notes);
    await new Promise(r => setTimeout(r, 1500));
  }
  console.log(`\n✅ ${countryName} translations complete!`);
  console.log(`   Created: content.es.json, content.pt.json, content.zh.json`);
}

main().catch(console.error);
