const fs = require("fs");
const path = require("path");

const slug = process.argv[2];
if (!slug) { console.error("❌ Provide a slug"); process.exit(1); }

const targetLocales = process.argv[3] ? [process.argv[3]] : ["es", "pt", "zh"];

const key = fs.readFileSync(".env.local", "utf8").match(/ANTHROPIC_API_KEY=(.+)/)?.[1]?.trim();
if (!key) { console.error("❌ No API key found in .env.local"); process.exit(1); }

const LANGUAGE_NAMES = {
  es: "Spanish (Latin American, warm and natural tone)",
  pt: "Brazilian Portuguese (warm, natural tone)",
  zh: "Simplified Mandarin Chinese",
};

async function translatePost(slug, locale) {
  const sourcePath = path.join(process.cwd(), "posts", "en", `${slug}.md`);
  if (!fs.existsSync(sourcePath)) { console.error(`❌ Not found: ${sourcePath}`); return; }

  const sourceContent = fs.readFileSync(sourcePath, "utf-8");
  const targetDir = path.join(process.cwd(), "posts", locale);
  if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

  console.log(`🌍 Translating to ${locale}...`);

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": key,
      "anthropic-version": "2023-06-01"
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-6",
      max_tokens: 16000,
      messages: [{
        role: "user",
        content: `Translate this blog post to ${LANGUAGE_NAMES[locale]}. Keep all markdown formatting and frontmatter keys in English. Keep slug and date values unchanged. Return ONLY the translated markdown, no preamble.\n\n${sourceContent}`
      }],
    }),
  });

  const data = await response.json();
  const translated = data.content.filter(b => b.type === "text").map(b => b.text).join("").trim();
  fs.writeFileSync(path.join(targetDir, `${slug}.md`), translated, "utf-8");
  console.log(`  ✅ posts/${locale}/${slug}.md`);
}

async function main() {
  for (const locale of targetLocales) {
    try { await translatePost(slug, locale); }
    catch (err) { console.error(`  ❌ ${locale}:`, err); }
  }
  console.log("\n✅ Done!");
}

main();
