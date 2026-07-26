#!/bin/bash

# ============================================================
# Relocate2Day — i18n Part 3: Extract & translate country pages
# ============================================================

set -e
echo "🌍 Starting i18n Part 3 — country content extraction & translation..."

# ─── Create content.json files for all 9 countries ───────────────────────────

mkdir -p app/countries/spain
mkdir -p app/countries/gibraltar
mkdir -p app/countries/portugal
mkdir -p app/countries/italy
mkdir -p app/countries/malta
mkdir -p app/countries/bulgaria
mkdir -p app/countries/greece
mkdir -p app/countries/netherlands
mkdir -p app/countries/romania

# ─── SPAIN ───────────────────────────────────────────────────────────────────
echo "📝 Creating Spain content.json..."
cat > app/countries/spain/content.json << 'EOF'
{
  "country": "Spain",
  "hero": {
    "badge": "Spain",
    "title": "Move to Spain",
    "subtitle": "Sunshine, culture, world-class food and one of Europe's most attractive tax regimes for newcomers. Here's everything you need to know.",
    "stats": [
      { "label": "Cost of living", "value": "From €1,200/mo" },
      { "label": "Flat tax (Beckham Law)", "value": "24%" },
      { "label": "Climate", "value": "300+ sunny days" },
      { "label": "Official language", "value": "Spanish" }
    ]
  },
  "sections": {
    "visas": {
      "eyebrow": "Visas & Residency",
      "title": "How to move to Spain",
      "intro": "Spain offers several visa routes depending on your situation — whether you're employed, self-employed, retired, or a student. EU/EEA citizens can move freely and simply need to register their residency. Non-EU nationals will need one of the following visas.",
      "visas": [
        {
          "title": "Digital Nomad Visa (Telework Visa)",
          "badge": "Remote workers & freelancers",
          "points": [
            "For non-EU nationals working remotely for companies or clients outside Spain",
            "Requires a minimum income of approx. €2,850/month (200% of Spain's minimum wage)",
            "Valid for 1 year via consulate, or up to 3 years if applied from within Spain",
            "Renewable up to 5 years total, with a pathway to permanent residency after 5 years",
            "Can bring spouse, partner, and dependent children",
            "Application fee: approx. €80"
          ]
        },
        {
          "title": "Non-Lucrative Visa (NLV)",
          "badge": "Retirees & passive income",
          "points": [
            "For those who do not intend to work in Spain — ideal for retirees",
            "Must demonstrate approx. €2,400/month in passive income or savings",
            "Requires private health insurance valid in Spain",
            "Initial 1-year visa, renewable in 2-year periods up to 5 years",
            "Does not permit local employment",
            "After 5 years, eligible to apply for permanent residency"
          ]
        },
        {
          "title": "Student Visa",
          "badge": "Students",
          "points": [
            "For non-EU nationals enrolled in a recognised Spanish educational institution",
            "Valid for the full duration of the approved course",
            "Permits part-time work of up to 30 hours per week",
            "Upon completing studies, can convert to a work permit without leaving Spain (except language course students)",
            "Language course students are not eligible to convert to a work permit"
          ]
        },
        {
          "title": "Work Visa (Employee Relocation)",
          "badge": "Employees relocating with a company",
          "points": [
            "For non-EU employees transferred to a Spanish branch or subsidiary",
            "The employer sponsors the application and handles much of the paperwork",
            "Intra-Company Transfer (ICT) permit available for multinational employees",
            "May be eligible for the Beckham Law tax regime (see Tax section below)"
          ]
        }
      ],
      "disclaimer": "Spain's Golden Visa (real estate investment route) was officially ended in April 2025. Immigration rules change regularly — always verify requirements with a qualified Spanish immigration lawyer before applying."
    },
    "taxes": {
      "eyebrow": "Taxes",
      "title": "Understanding tax in Spain",
      "intro": "Spain's standard income tax rates are progressive and can reach up to 47% for high earners. However, newcomers may qualify for a significant tax break known as the Beckham Law.",
      "highlight": {
        "title": "The Beckham Law",
        "subtitle": "Spain's special tax regime for newcomers — named after David Beckham, who was among the first to use it when joining Real Madrid in 2003.",
        "items": [
          { "label": "Flat tax rate", "value": "24% on Spanish income up to €600,000" },
          { "label": "Duration", "value": "Up to 6 years" },
          { "label": "Foreign income", "value": "Generally exempt from Spanish tax" },
          { "label": "Application deadline", "value": "Within 6 months of starting work" }
        ]
      },
      "beckhameEligibility": {
        "title": "Who qualifies for the Beckham Law?",
        "points": [
          "You must not have been a Spanish tax resident in the 10 years prior to moving",
          "You must be moving to Spain for work reasons (employment, entrepreneurship, or as a highly qualified professional)",
          "Applies to Digital Nomad Visa holders, employees relocated by a company, and entrepreneurs",
          "Your spouse and children under 25 can also benefit from the preferential rates"
        ]
      },
      "standardRates": {
        "title": "Standard income tax rates (without Beckham Law)",
        "brackets": [
          ["Up to €12,450", "19%"],
          ["€12,450 – €20,200", "24%"],
          ["€20,200 – €35,200", "30%"],
          ["€35,200 – €60,000", "37%"],
          ["€60,000 – €300,000", "45%"],
          ["Over €300,000", "47%"]
        ]
      },
      "disclaimer": "Tax laws change frequently and depend on your personal situation, income type, and country of origin. Always consult a qualified Spanish tax advisor before making any decisions."
    },
    "costOfLiving": {
      "eyebrow": "Cost of Living",
      "title": "What does life in Spain cost?",
      "intro": "Spain is generally 25–34% cheaper than the US or Northern Europe. A single person can live comfortably on €1,200–€2,000/month, while families typically need €3,000–€3,500/month. Costs vary significantly by city.",
      "cities": [
        {
          "city": "Madrid & Barcelona",
          "level": "Most expensive",
          "items": ["1-bed apartment (centre): €1,400–€1,800/mo", "Single person budget: €2,000+/mo", "Monthly transport pass: €55"]
        },
        {
          "city": "Valencia, Málaga, Seville",
          "level": "Mid-range",
          "items": ["1-bed apartment (centre): €750–€900/mo", "Single person budget: €1,500–€1,750/mo", "Monthly transport pass: €40–€50"]
        },
        {
          "city": "Smaller cities & rural areas",
          "level": "Most affordable",
          "items": ["1-bed apartment: €350–€700/mo", "Single person budget: €950–€1,200/mo", "Car often needed"]
        }
      ],
      "expenses": {
        "title": "Typical monthly expenses (outside Madrid/Barcelona)",
        "items": [
          ["Rent (1-bed, city centre)", "€700 – €1,000"],
          ["Utilities (electricity, water, gas)", "€100 – €150"],
          ["Groceries", "€200 – €350"],
          ["Dining out (mid-range)", "€150 – €300"],
          ["Public transport pass", "€40 – €55"],
          ["Private health insurance", "€50 – €120"],
          ["Gym membership", "€20 – €50"],
          ["Mobile plan", "€10 – €30"]
        ]
      }
    },
    "healthcare": {
      "eyebrow": "Healthcare",
      "title": "Healthcare in Spain",
      "intro": "Spain's healthcare system, the Sistema Nacional de Salud (SNS), is ranked among the best in the world — covering over 99% of residents. As an expat, your access depends on your residency status and how you contribute to social security.",
      "public": {
        "title": "Public Healthcare (SNS)",
        "points": [
          "Free at point of use for legal residents contributing to social security",
          "Covers GP visits, specialist consultations, hospital care, emergency services, maternity care, and vaccinations",
          "Dental and optical care are NOT covered — you pay privately",
          "Some prescription co-payments apply",
          "Waiting times for non-urgent specialist care can be long",
          "Convenio Especial available for those not contributing to social security: approx. €60/month (under 65)"
        ]
      },
      "private": {
        "title": "Private Health Insurance",
        "points": [
          "Required for most visa applications (Digital Nomad Visa, Non-Lucrative Visa)",
          "Costs approx. €50–€120/month per person for a solid plan",
          "Provides faster access to specialists and shorter waiting times",
          "Many providers offer English-speaking doctors, especially in major cities",
          "Covers dental, optical, and services not included in the public system",
          "Popular providers: Sanitas, Adeslas, Asisa, Caser"
        ]
      },
      "tip": "Most expats start with private insurance to meet visa requirements and for faster access, then register for public healthcare once eligible. To access the SNS, you'll need your NIE (foreigner ID number) and to register at your local town hall (empadronamiento)."
    },
    "banking": {
      "eyebrow": "Banking & Finance",
      "title": "Banking in Spain",
      "intro": "Opening a bank account in Spain is straightforward once you have your NIE (Número de Identificación de Extranjero). You'll need a Spanish bank account for paying rent, utilities, and receiving your salary.",
      "requirements": {
        "title": "What you'll need to open an account",
        "points": [
          "NIE (Número de Identificación de Extranjero) — your foreigner ID",
          "Valid passport",
          "Proof of address in Spain (empadronamiento certificate)",
          "Proof of employment or income (for some banks)"
        ]
      },
      "banks": {
        "title": "Popular banks for expats",
        "points": [
          "Santander — largest Spanish bank, good English support",
          "BBVA — excellent app and online banking",
          "CaixaBank — wide branch network across Spain",
          "N26 / Revolut — online-only, great for new arrivals before getting a NIE",
          "Sabadell — popular with expats in coastal areas"
        ]
      },
      "tip": "Get a Revolut or N26 account before you move — it lets you spend in euros fee-free while you're setting up your NIE and Spanish bank account, which can take several weeks."
    },
    "prosCons": {
      "eyebrow": "Summary",
      "title": "Is Spain right for you?",
      "pros": {
        "title": "Reasons to move to Spain",
        "points": [
          "Beckham Law — one of Europe's most attractive tax regimes for newcomers",
          "300+ days of sunshine per year",
          "World-class food, culture and quality of life",
          "Excellent public healthcare system",
          "Lower cost of living than most of Western Europe",
          "Great transport links within Europe",
          "Welcoming expat communities in most major cities",
          "Pathway to EU residency and citizenship"
        ]
      },
      "cons": {
        "title": "Things to consider",
        "points": [
          "Spanish bureaucracy can be slow and complex",
          "NIE applications can take weeks — plan ahead",
          "Housing market is tight in Madrid and Barcelona",
          "Spanish language is essential outside major cities",
          "Standard tax rates can be high (up to 47%) if you don't qualify for Beckham Law",
          "Long waiting times for non-urgent public healthcare",
          "Golden Visa (real estate route) was eliminated in 2025"
        ]
      }
    },
    "cta": {
      "title": "Ready to make your move?",
      "subtitle": "Use our free tool to compare Spain with other European countries and find the best fit for your situation.",
      "button": "Compare all countries →"
    }
  }
}
EOF

# ─── SCRIPTS: extract-country-content.ts & translate-all.sh ──────────────────
echo "📝 Creating scripts/translate-all-countries.sh..."
cat > scripts/translate-all-countries.sh << 'EOF'
#!/bin/bash
# Translates all 9 country content.json files to ES, PT, ZH
# Run: ANTHROPIC_API_KEY=xxx bash scripts/translate-all-countries.sh

set -e

if [ -z "$ANTHROPIC_API_KEY" ]; then
  echo "❌ ANTHROPIC_API_KEY not set"
  exit 1
fi

COUNTRIES=("spain" "gibraltar" "portugal" "italy" "malta" "bulgaria" "greece" "netherlands" "romania")

for country in "${COUNTRIES[@]}"; do
  CONTENT_FILE="app/countries/${country}/content.json"
  if [ ! -f "$CONTENT_FILE" ]; then
    echo "⚠️  Skipping $country — no content.json found"
    continue
  fi
  echo ""
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo "🌍 Translating: $country"
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  ANTHROPIC_API_KEY=$ANTHROPIC_API_KEY npx tsx scripts/translate-country.ts --country=$country
  sleep 2
done

echo ""
echo "🎉 All available countries translated!"
EOF
chmod +x scripts/translate-all-countries.sh

# ─── Update translate-country.ts with better prompt ──────────────────────────
echo "📝 Updating scripts/translate-country.ts..."
cat > scripts/translate-country.ts << 'EOF'
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
    await translate(lang.code, lang.name, lang.notes);
    await new Promise(r => setTimeout(r, 1500));
  }
  console.log(`\n✅ ${countryName} translations complete!`);
  console.log(`   Created: content.es.json, content.pt.json, content.zh.json`);
}

main().catch(console.error);
EOF

# ─── Create content.json files for remaining 8 countries ─────────────────────
# (Gibraltar, Portugal, Italy, Malta, Bulgaria, Greece, Netherlands, Romania)
# Using Python to extract from the TSX files

echo "📝 Extracting content from remaining country pages..."

python3 - << 'PYEOF'
import json, os

countries = {
  "gibraltar": {
    "country": "Gibraltar",
    "hero": {
      "badge": "Gibraltar",
      "title": "Move to Gibraltar",
      "subtitle": "A unique British Overseas Territory at the tip of Europe — English-speaking, tax-efficient, Mediterranean, and unlike anywhere else in the world.",
      "stats": [
        {"label": "Max income tax", "value": "25%"},
        {"label": "Capital gains tax", "value": "None"},
        {"label": "Inheritance tax", "value": "None"},
        {"label": "Official language", "value": "English"}
      ]
    },
    "sections": {
      "visas": {
        "eyebrow": "Visas & Residency",
        "title": "How to move to Gibraltar",
        "intro": "Gibraltar is a British Overseas Territory with its own immigration system, entirely separate from both the UK and the EU. The residency rules vary significantly by nationality.",
        "warning": "In October 2025, the Government of Gibraltar temporarily suspended new long-term residency applications from UK and EEA nationals following an unprecedented surge in demand. Applications submitted before 6 October 2025 continue to be processed. New applications may only be approved on a discretionary basis, requiring personal authorisation by the Chief Minister. New residency criteria with a 'very high financial standard' are expected to be announced. Always verify the current status with the Gibraltar Immigration Authority (DIHA) or a qualified adviser before making any plans.",
        "visas": [
          {"title": "UK Nationals", "badge": "No visa required", "points": ["UK citizens do not need a visa to enter or work in Gibraltar", "However, long-term residency is not automatic — you must apply for and be approved under a Gibraltar residency category", "You will need a Gibraltar work permit if employed locally (the employer handles this)", "Residency requires proof of accommodation, income or employment, and compliance with local rules", "Note: new residency applications are currently subject to the October 2025 suspension — verify current status before applying"]},
          {"title": "EU / EEA Nationals", "badge": "Residence permit required", "points": ["Since Brexit, EU/EEA nationals no longer have automatic freedom of movement in Gibraltar", "EU nationals need a residence permit to live long-term in Gibraltar", "Must demonstrate employment, self-sufficiency, or meet another approved residency criterion", "Also subject to the October 2025 residency suspension for new applications"]},
          {"title": "Category 2 Residency (High Net Worth Individuals)", "badge": "HNWIs", "points": ["Designed for individuals with net assets of at least £2 million", "Must rent or purchase a qualifying property in Gibraltar", "Tax is capped — only the first £118,000 of worldwide income is taxed, with a minimum tax of £37,000 and maximum of £42,380 per year", "Application fee: £1,000 plus a £15,000 due diligence and processing fee", "Family members including spouse, children, siblings, and parents can be included", "Particularly attractive for wealthy individuals seeking a tax-capped Mediterranean lifestyle"]},
          {"title": "HEPSS (High Executive Possessing Specialist Skills)", "badge": "Senior professionals", "points": ["For highly qualified professionals employed in Gibraltar in specialist roles", "Common in financial services, fintech, online gaming, and legal sectors", "Tax is charged only on the first £160,000 of income", "Must be employed by a Gibraltar company and meet salary thresholds", "Popular with executives relocating to Gibraltar's growing tech and finance sectors"]},
          {"title": "Non-EU / Non-EEA Nationals (e.g. US, Canada)", "badge": "Visa & work permit required", "points": ["Typically need a visa and a work permit to relocate", "Usually requires a job offer from a Gibraltar employer, who applies for the work permit", "Entry clearance visa must be obtained before moving", "Self-sufficiency route available for those with sufficient financial means", "Always verify requirements with DIHA — Gibraltar's Department for Immigration and Home Affairs"]}
        ],
        "disclaimer": "Gibraltar's residency rules are changing rapidly. A new residency framework with stricter financial requirements is expected in 2026. Always consult a qualified Gibraltar immigration adviser and verify current rules with DIHA before making any decisions."
      },
      "taxes": {
        "eyebrow": "Taxes",
        "title": "Understanding tax in Gibraltar",
        "intro": "Gibraltar's tax system is one of the most attractive in Europe. There is no VAT, no capital gains tax, no inheritance tax, and no wealth tax. Income tax rates are low and capped at 25% for most residents. Only income earned in or derived from Gibraltar is generally taxed.",
        "noTaxItems": [
          {"title": "No Capital Gains Tax", "desc": "Profits from selling assets, shares, or property (primary residence) are not taxed"},
          {"title": "No Inheritance Tax", "desc": "Estates pass to heirs without any inheritance, estate duty, or wealth tax"},
          {"title": "No VAT", "desc": "Gibraltar has no Value Added Tax — making many goods notably cheaper than in the UK or EU"}
        ],
        "twoSystems": {
          "title": "Two ways to be taxed — you choose the lower one",
          "intro": "Gibraltar gives residents a choice between two tax systems. You are automatically assessed under whichever results in a lower tax bill:",
          "gibs": {"title": "Gross Income Based System (GIBS)", "desc": "Tax calculated on gross income in bands — no allowances. Rates range from 6% to 28% on income up to £25,000, and 16% to 28% on income above £25,000. Maximum effective rate is capped at 25% on incomes up to £100,000."},
          "abs": {"title": "Allowances Based System (ABS)", "desc": "Tax calculated on income after personal allowances and deductions. Progressive rates up to 39%, but with allowances for mortgage interest, pension contributions, medical insurance, and more — effective rates are usually much lower."}
        },
        "specialRegimes": {
          "title": "Special Tax Regimes",
          "subtitle": "Gibraltar offers two powerful capped tax regimes for high earners and specialists.",
          "items": [
            {"label": "Category 2 (HNWIs)", "value": "Tax capped at £37,000–£42,380/year on first £118,000 of worldwide income. Requires £2M+ in net assets."},
            {"label": "HEPSS (Specialists)", "value": "Tax charged only on first £160,000 of income. For senior professionals in key sectors like finance, gaming, and fintech."}
          ]
        },
        "disclaimer": "Gibraltar's tax rules are complex and depend on your residency status, income type, and personal circumstances. Always consult a qualified Gibraltar tax adviser before making any decisions."
      },
      "costOfLiving": {
        "eyebrow": "Cost of Living",
        "title": "What does life in Gibraltar cost?",
        "intro": "Gibraltar is one of the more expensive places in Southern Europe, primarily due to its tiny landmass and high demand for housing. However, the absence of VAT makes everyday goods and electronics noticeably cheaper than in the UK, and many residents shop across the border in Spain for groceries at 20–40% lower prices.",
        "tip": "Many Gibraltar residents live across the border in La Línea de la Concepción, Spain, where rents are 50–70% lower. The border crossing on foot typically takes 5–15 minutes.",
        "expenses": {
          "title": "Typical monthly expenses in Gibraltar",
          "items": [
            ["Rent (1-bed apartment, centre)", "£1,250 – £1,850"],
            ["Rent (room in shared flat)", "£650 – £950"],
            ["Utilities (electricity & water combined)", "£120 – £180"],
            ["Groceries (shopping in Gibraltar)", "£250 – £400"],
            ["Groceries (shopping in Spain)", "£150 – £250"],
            ["Dining out (mid-range, per person)", "£15 – £25"],
            ["Monthly bus pass", "~£30"],
            ["Private health insurance", "£50 – £150"],
            ["Mobile plan", "£15 – £40"]
          ]
        },
        "vatNote": "Electronics, alcohol, tobacco, and luxury goods are often significantly cheaper in Gibraltar than in the UK or Spain due to the absence of VAT. A new Transaction Tax is expected from April 2026, replacing import duties — verify current rates before making major purchases."
      },
      "healthcare": {
        "eyebrow": "Healthcare",
        "title": "Healthcare in Gibraltar",
        "intro": "Gibraltar has a high-quality public healthcare system run by the Gibraltar Health Authority (GHA), modelled closely on the UK's NHS. All services are conducted in English. Registered residents are entitled to free healthcare at the point of use.",
        "public": {"title": "Public Healthcare (GHA)", "points": ["Free at point of use for registered Gibraltar residents", "Closely modelled on the UK NHS — entirely English-speaking", "Covers GP visits, specialist care, hospital treatment, maternity, and emergency services", "St Bernard's Hospital is the main facility — modern and well-equipped", "Dental care is mostly private", "Register with GHA using your Gibraltar ID card once residency is established"]},
        "private": {"title": "Private Health Insurance", "points": ["Recommended for faster access to specialists and broader coverage", "Monthly premiums typically £50–£150 depending on age and plan", "Covers dental, optical, and additional specialist services", "Many residents use private insurance for non-urgent care to avoid waiting times", "Popular providers include Bupa International and AXA", "Useful while setting up residency before GHA access is established"]},
        "tip": "Gibraltar's healthcare is widely regarded as more accessible and efficient than the NHS, with shorter waiting times and a more compact, community-focused system. English is spoken throughout."
      },
      "banking": {
        "eyebrow": "Banking & Finance",
        "title": "Banking in Gibraltar",
        "intro": "Gibraltar has a well-developed banking sector, regulated by the Gibraltar Financial Services Commission (GFSC). Opening a local account is straightforward for residents, and Gibraltar banks are very experienced in working with expats.",
        "requirements": {"title": "What you'll need to open an account", "points": ["Valid passport or national ID", "Proof of Gibraltar residency (Gibraltar ID card or residency permit)", "Proof of address in Gibraltar", "Evidence of income or employment", "Some banks may request references or financial background information"]},
        "banks": {"title": "Banks operating in Gibraltar", "points": ["Barclays — major UK bank with a full Gibraltar presence", "NatWest International — via its Gibraltar branch", "Jyske Bank — popular with international residents", "EFG Private Bank — for high-net-worth clients", "Revolut / Wise — useful for new arrivals before opening a local account"]},
        "tip": "Gibraltar's financial sector is regulated under British common law and is a well-respected international finance centre. The currency is the Gibraltar Pound (GIP), which is pegged 1:1 to the British Pound (GBP) and interchangeable in Gibraltar."
      },
      "prosCons": {
        "eyebrow": "Summary",
        "title": "Is Gibraltar right for you?",
        "pros": {"title": "Reasons to move to Gibraltar", "points": ["No capital gains tax, no inheritance tax, no VAT", "Income tax capped at 25% — well below most European countries", "Special regimes (Category 2, HEPSS) for HNWIs and senior professionals", "English-speaking — official language and used everywhere", "British legal system and governance — familiar to UK nationals", "Mediterranean climate with 300+ sunny days per year", "One of the safest places to live in Europe", "New Schengen agreement gives residents free movement across Europe", "Strong expat community, especially British", "World-class financial services sector with career opportunities"]},
        "cons": {"title": "Things to consider", "points": ["New residency applications suspended since October 2025 — situation evolving", "New residency criteria expected to set a 'very high financial standard'", "Extremely limited housing supply — rents are high and availability is tight", "Very small territory (6.7 km²) — can feel restrictive long-term", "Higher cost of living than neighbouring Spain", "Limited schooling and entertainment options compared to larger cities", "No longer part of the EU — some implications for EU travel and business", "Property market is supply-constrained with high prices"]}
      },
      "laLinea": {
        "eyebrow": "The Cross-Border Option",
        "title": "Live in La Línea, Work in Gibraltar",
        "intro": "Every working day, around 15,000 people cross the Gibraltar–Spain border. Many Gibraltar workers choose to live in La Línea de la Concepción — the Spanish town directly across the border — where rents are 50–70% cheaper. It's one of the most popular living arrangements in the region, but it comes with important administrative and tax obligations on both sides of the border.",
        "disclaimer": "The cross-border living arrangement is popular and manageable, but the tax and administrative requirements are complex. We strongly recommend consulting a qualified Spanish tax adviser (gestor) and a Gibraltar tax adviser before making the move."
      },
      "cta": {"title": "Ready to make your move?", "subtitle": "Use our free tool to compare Gibraltar with other European countries and find the best fit for your situation.", "button": "Compare all countries →"}
    }
  },
  "malta": {
    "country": "Malta",
    "hero": {
      "badge": "Malta",
      "title": "Move to Malta",
      "subtitle": "English-speaking, sunny, and strategically positioned in the heart of the Mediterranean — Malta offers a unique blend of European lifestyle, generous tax programmes, and one of the warmest welcomes for newcomers in Europe.",
      "stats": [
        {"label": "Nomad permit tax", "value": "0% foreign income"},
        {"label": "Retirement flat tax", "value": "15%"},
        {"label": "Inheritance tax", "value": "None"},
        {"label": "Official languages", "value": "Maltese & English"}
      ]
    },
    "sections": {
      "visas": {
        "eyebrow": "Visas & Residency",
        "title": "How to move to Malta",
        "intro": "EU/EEA citizens can move to Malta freely and register residency at the local council. Non-EU nationals have several strong routes depending on whether they work remotely, are retiring, investing, or studying. Malta is notably English-speaking throughout, making the administrative process more accessible than in most European countries.",
        "visas": [
          {"title": "Nomad Residence Permit", "badge": "Remote workers & freelancers", "points": ["Malta's official digital nomad visa — one of the most established in Europe, launched in 2021", "For non-EU nationals working remotely for employers or clients based outside Malta", "Minimum income requirement: €42,000/year gross (approx. €3,500/month) — increased from €32,400 in April 2024", "Must be employed, self-employed, or freelance with proven remote work", "Valid for 1 year, renewable up to 3 times — total of 4 years", "Spouse, partner, and dependent children can be included", "Includes a Schengen visa — giving visa-free travel across 27 European countries", "Malta has 5G nationwide and the widest fibre broadband coverage in the EU", "Foreign income not remitted to Malta is generally not subject to Maltese tax"]},
          {"title": "Malta Retirement Programme (MRP)", "badge": "Retirees", "points": ["For non-EU/EEA retirees wishing to live in Malta on pension income", "At least 75% of income remitted to Malta must come from a recognised pension", "Must own property worth at least €275,000 or rent at a minimum of €9,600/year", "Must hold worldwide health insurance covering both Malta and the EU", "Flat 15% tax on foreign pension income remitted to Malta", "Minimum annual tax: €7,500 plus €500 per dependent", "Must spend at least 90 days per year in Malta", "Application fee: €2,500", "Non-executive roles in Malta are permitted"]},
          {"title": "Global Residence Programme (GRP)", "badge": "Non-EU nationals", "points": ["For non-EU nationals who wish to reside in Malta without the retirement-specific requirements of the MRP", "Must own property worth at least €275,000 (or €220,000 in Gozo/South Malta) or rent at €9,600+/year", "Must have worldwide health insurance and stable regular income", "Flat 15% tax on foreign-source income remitted to Malta", "Minimum annual tax: €15,000", "No minimum stay requirement — more flexible than the MRP", "Can work or be self-employed in Malta"]},
          {"title": "Malta Permanent Residence Programme (MPRP)", "badge": "Investors", "points": ["Malta's golden visa equivalent — grants permanent EU residency through investment", "Requires a government contribution of €28,000 (if renting) or €58,000 (if buying property)", "Plus a €2,000 donation to a registered NGO", "Must rent property at €10,000/year+ or purchase at €300,000+ (€270,000 in Gozo/South Malta)", "No minimum stay requirement", "Grants permanent residency — not citizenship", "Spouse, children, parents, and grandparents can be included", "Licensed agent required for applications"]},
          {"title": "EU / EEA Citizens", "badge": "Free movement", "points": ["EU/EEA citizens have the right to live and work in Malta without a visa", "Must register with the local council (Kunsill Lokali) within 3 months of arrival", "Apply for an eResidence card at Identity Malta", "After 5 years of continuous legal residence, eligible for permanent residency", "No income or insurance requirements for EU citizens"]},
          {"title": "Student Visa", "badge": "Students", "points": ["For non-EU nationals enrolled at a Maltese educational institution", "Malta is very popular for English language courses — one of the top English-learning destinations in Europe", "Valid for the duration of the enrolled programme", "Part-time work permitted alongside studies", "Malta's University (University of Malta) offers degree programmes entirely in English", "Pathway to convert to a work permit after graduation"]}
        ],
        "disclaimer": "Malta's residency programmes are managed by the Residency Malta Agency. Decisions are final — there is no formal right of appeal for refused applications. Always verify current requirements and consider using a licensed Maltese immigration adviser for investment and retirement programmes."
      },
      "taxes": {
        "eyebrow": "Taxes",
        "title": "Understanding tax in Malta",
        "intro": "Malta's tax system is one of the most favourable in Europe for newcomers. The key concept is the remittance basis — non-domiciled residents only pay tax on income arising in Malta or foreign income that is remitted (brought) into Malta. Foreign income that stays outside Malta is generally not taxed. There is no wealth tax, no inheritance tax, and no gift tax.",
        "highlights": [
          {"title": "No Inheritance Tax", "desc": "Estates pass to heirs without any inheritance, estate, or gift tax"},
          {"title": "Remittance Basis", "desc": "Non-domiciled residents only taxed on income brought into Malta — foreign income kept offshore is not taxed"},
          {"title": "70+ Tax Treaties", "desc": "Malta has double taxation treaties with over 70 countries — preventing you from being taxed twice"}
        ],
        "nomadTax": {
          "title": "Nomad Residence Permit — Tax Treatment",
          "subtitle": "Holders of the Nomad Residence Permit enjoy highly favourable tax treatment. Because their income is earned outside Malta and may not be remitted to Malta, it generally falls outside the Maltese tax net entirely.",
          "items": [
            {"label": "Foreign income (not remitted)", "value": "Generally 0% — outside Maltese tax net"},
            {"label": "Foreign income (remitted to Malta)", "value": "Subject to Maltese tax at progressive rates or flat regime"},
            {"label": "Social security", "value": "Nomad permit holders are NOT required to pay Maltese social security contributions"},
            {"label": "Home country tax", "value": "You may still owe tax in your home country — always verify with a tax adviser"}
          ]
        },
        "specialProgrammes": [
          {"title": "Malta Retirement Programme (MRP)", "detail": "Flat 15% tax on foreign pension income remitted to Malta. Minimum annual tax: €7,500 + €500 per dependent. Covers retirees receiving at least 75% of income from a foreign pension.", "label": "Retirees"},
          {"title": "Global Residence Programme (GRP)", "detail": "Flat 15% tax on all foreign-source income remitted to Malta. Minimum annual tax: €15,000. Available to non-EU nationals who own or rent qualifying property.", "label": "Non-EU residents"},
          {"title": "Highly Qualified Persons (HQP) Rules", "detail": "Flat 15% tax on employment income up to €5 million for senior professionals in regulated sectors including financial services, aviation, and iGaming. Very attractive for executives.", "label": "Senior professionals"}
        ],
        "standardRates": {
          "title": "Standard income tax rates (progressive)",
          "brackets": [
            ["Up to €9,100", "0%"],
            ["€9,100 – €14,500", "15%"],
            ["€14,500 – €19,500", "25%"],
            ["€19,500 – €60,000", "25%"],
            ["Over €60,000", "35%"]
          ],
          "note": "Rates shown are for single individuals. Married and parent rates differ slightly. Maximum rate is 35% on income above €60,000."
        },
        "disclaimer": "Malta's tax rules are complex and depend heavily on your residency status, domicile, and whether income is remitted to Malta. Always consult a qualified Maltese tax adviser before making any decisions."
      },
      "costOfLiving": {
        "eyebrow": "Cost of Living",
        "title": "What does life in Malta cost?",
        "intro": "Malta's cost of living is moderate — roughly 30% cheaper than the UK and around 41% cheaper than the US. A single person needs approximately €1,300–€2,200 per month including rent, depending on location and lifestyle.",
        "cities": [
          {"city": "Valletta, Sliema & St. Julian's", "level": "Most expensive", "items": ["1-bed apartment: €900–€1,600/mo", "Single person budget: €1,700–€2,200/mo", "Best for expat community & nightlife"]},
          {"city": "Gzira, Msida & Birkirkara", "level": "Best value", "items": ["1-bed apartment: €750–€1,100/mo", "Single person budget: €1,300–€1,700/mo", "10-min walk to Sliema — sweet spot for expats"]},
          {"city": "Gozo & Southern Malta", "level": "Most affordable", "items": ["1-bed apartment: €500–€800/mo", "Single person budget: €1,000–€1,400/mo", "Quieter lifestyle, car recommended"]}
        ],
        "expenses": {
          "title": "Typical monthly expenses in Malta",
          "items": [
            ["Rent (1-bed, mid-range area)", "€750 – €1,100"],
            ["Utilities (electricity & water)", "€60 – €150"],
            ["Internet (fibre)", "€25 – €40"],
            ["Groceries", "€200 – €350"],
            ["Dining out (mid-range)", "€100 – €250"],
            ["Public transport pass", "~€26/mo (free for residents under 21)"],
            ["Private health insurance", "€50 – €150"],
            ["Gym membership", "€30 – €60"],
            ["Mobile plan", "€10 – €30"]
          ]
        },
        "tip": "Gzira and Msida are where most savvy expats end up — you get a 20–30% discount on Sliema prices while being a 10-minute walk from the waterfront and everything the island has to offer. It's widely considered the sweet spot for value and lifestyle."
      },
      "healthcare": {
        "eyebrow": "Healthcare",
        "title": "Healthcare in Malta",
        "intro": "Malta has a dual healthcare system — a public National Health Service (NHS equivalent) and a growing private sector. The WHO ranks Malta's healthcare system among the top five in the world. All services are conducted in English.",
        "public": {"title": "Public Healthcare", "points": ["Free at point of use for all legal residents registered with the public system", "Register at Mater Dei Hospital (the main public hospital) or your local health centre", "Covers GP visits, specialist care, hospital treatment, maternity, and emergency services", "EU nationals can use the European Health Insurance Card (EHIC) at public facilities", "Entirely English-speaking — one of Malta's biggest healthcare advantages", "Mater Dei Hospital is a modern, well-equipped facility opened in 2007", "Dental care is mostly private", "Emergency number: 112"]},
        "private": {"title": "Private Health Insurance", "points": ["Required for the Malta Retirement Programme and Global Residence Programme", "Monthly premiums typically €50–€150 depending on age and coverage", "Provides faster access to specialists and private clinics", "Many private clinics in Sliema, St. Julian's, and Valletta offer same-day appointments", "Generally more affordable than comparable private insurance in the UK or US", "Popular providers: Bupa International, AXA, GasanMamo, Atlas Insurance", "Particularly recommended while residency registration is being processed"]},
        "tip": "Malta's healthcare system is entirely English-speaking — unlike most other European countries. This is a significant practical benefit for expats, removing the language barrier that can make navigating healthcare systems difficult elsewhere."
      },
      "banking": {
        "eyebrow": "Banking & Finance",
        "title": "Banking in Malta",
        "intro": "Malta has a well-regulated banking sector supervised by the Malta Financial Services Authority (MFSA). Banking is conducted entirely in English. Opening an account requires proof of residency and identity.",
        "requirements": {"title": "What you'll need to open an account", "points": ["Valid passport or national ID", "Proof of Maltese address (rental contract or utility bill)", "Proof of residency status (eResidence card, residence permit, or Nomad Residence Permit)", "Proof of income or employment", "Some banks may require a reference or source of funds declaration", "All communication and documentation is in English"]},
        "banks": {"title": "Banks and services in Malta", "points": ["Bank of Valletta (BOV) — Malta's largest bank, full-service branches across the island", "HSBC Malta — strong international banking with good English support", "APS Bank — popular with residents for personal banking", "Medirect — online-focused bank popular with expats and investors", "Revolut / Wise — widely used by expats for day-to-day spending and international transfers", "Lombard Bank — smaller bank popular with business clients"]},
        "tip": "Malta uses the Euro (€) and is part of the Eurozone. Banking is fully English-speaking and straightforward compared to many other European countries. The MFSA is a well-respected regulator — Malta's financial sector is internationally recognised and trusted."
      },
      "prosCons": {
        "eyebrow": "Summary",
        "title": "Is Malta right for you?",
        "pros": {"title": "Reasons to move to Malta", "points": ["English is an official language — no language barrier anywhere", "Foreign income not remitted to Malta is generally tax-free for nomad permit holders", "No inheritance tax, no wealth tax, no gift tax", "15% flat tax for retirees and Global Residence Programme holders", "HQP 15% flat rate for senior professionals in finance, gaming, and aviation", "WHO top-5 ranked healthcare system — entirely English-speaking", "Mediterranean climate — mild winters, warm summers", "Nomad Residence Permit includes Schengen visa — travel freely across Europe", "Very large, welcoming expat community — 30% of the population is foreign-born", "EU member state — pathway to EU residency and citizenship", "Strong iGaming, fintech, and financial services job market", "Excellent internet infrastructure — widest fibre broadband coverage in the EU"]},
        "cons": {"title": "Things to consider", "points": ["Very small island (316 km²) — can feel cramped, especially in summer", "Nomad permit income requirement raised to €42,000/year in 2024 — higher than many other countries", "Housing prices have risen significantly due to expat and gaming company demand", "Traffic congestion is a significant issue — Malta has one of the highest car ownership rates in Europe", "Limited natural landscapes compared to other Mediterranean destinations", "Summers can be very hot and dry (35°C+), and the island is crowded with tourists", "Nomad Residence Permit refusals have no right of appeal", "Home country tax obligations may still apply even if Malta doesn't tax you"]}
      },
      "cta": {"title": "Ready to make your move?", "subtitle": "Use our free tool to compare Malta with other European countries and find the best fit for your situation.", "button": "Compare all countries →"}
    }
  }
}

for country_slug, data in countries.items():
    os.makedirs(f"app/countries/{country_slug}", exist_ok=True)
    with open(f"app/countries/{country_slug}/content.json", "w") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    print(f"✅ Created app/countries/{country_slug}/content.json")

print("\n📝 Note: portugal, italy, bulgaria, greece, netherlands, romania content.json files")
print("   will be created by the extract script — run setup-i18n-part3b.sh next")
PYEOF

echo ""
echo "✅ Part 3 complete!"
echo ""
echo "Files created/updated:"
echo "   📄 app/countries/spain/content.json"
echo "   📄 app/countries/gibraltar/content.json"
echo "   📄 app/countries/malta/content.json"
echo "   📄 scripts/translate-country.ts (updated with full rules)"
echo "   📄 scripts/translate-all-countries.sh (updated)"
echo ""
echo "⚡ Next: Run Part 3b to create the remaining 6 country content.json files"
echo "   Then run: ANTHROPIC_API_KEY=xxx bash scripts/translate-all-countries.sh"
