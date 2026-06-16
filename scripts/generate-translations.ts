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
