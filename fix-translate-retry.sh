#!/bin/bash
# Adds retry logic to translate-country.ts

python3 - << 'PYEOF'
with open("scripts/translate-country.ts", "r") as f:
    content = f.read()

# Replace the translate function with one that has retry logic
old = '''async function translate(langCode: string, langName: string, langNotes: string) {
  console.log(`  🌍 Translating to ${langName}...`);

  const prompt ='''

new = '''async function translateWithRetry(langCode: string, langName: string, langNotes: string, retries = 3): Promise<void> {
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

  const prompt ='''

content = content.replace(old, new, 1)

# Replace the main loop to use retry wrapper and skip existing files
old = '''  for (const lang of LANGUAGES) {
    await translate(lang.code, lang.name, lang.notes);
    await new Promise(r => setTimeout(r, 1500));
  }'''

new = '''  for (const lang of LANGUAGES) {
    const outPath = path.join(process.cwd(), `app/countries/${countryArg}/content.${lang.code}.json`);
    if (fs.existsSync(outPath)) {
      console.log(`  ⏭️  Skipping ${lang.code} — already exists`);
      continue;
    }
    await translateWithRetry(lang.code, lang.name, lang.notes);
    await new Promise(r => setTimeout(r, 1500));
  }'''

content = content.replace(old, new, 1)

with open("scripts/translate-country.ts", "w") as f:
    f.write(content)

print("✅ translate-country.ts updated with retry logic and skip-existing")
PYEOF
