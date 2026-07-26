#!/bin/bash

# ============================================================
# Relocate2Day — Quiz Update Script
# Changes:
#   1. Adds "I currently live in" field to country quiz (page.tsx)
#   2. Adds "I currently live in" field to city quiz (page.tsx)
#   3. Updates country quiz prompt to exclude current country
#   4. Updates city quiz prompt to exclude current country
#   5. Adds Greece, Netherlands, Romania to country quiz (results/page.tsx)
# ============================================================

set -e
echo "🚀 Starting Relocate2Day quiz update..."

# ─── 1. app/page.tsx ─────────────────────────────────────────────────────────

PAGE="app/page.tsx"
echo "📝 Updating $PAGE..."

# 1a. Add new state variables for country quiz current country
# Insert after: const [aspirations, setAspirations] = useState("Not applicable");
python3 - <<'PYEOF'
import re

with open("app/page.tsx", "r") as f:
    content = f.read()

# 1a. Add currentCountry states after aspirations state
old = '  const [aspirations, setAspirations] = useState("Not applicable");'
new = '''  const [aspirations, setAspirations] = useState("Not applicable");
  const [currentCountry, setCurrentCountry] = useState("");
  const [currentCountrySearch, setCurrentCountrySearch] = useState("");
  const [showCurrentCountryList, setShowCurrentCountryList] = useState(false);'''
content = content.replace(old, new, 1)

# 1b. Add cityCurrentCountry state after cityIndustry state
old = '  const [cityIndustry, setCityIndustry] = useState("");'
new = '''  const [cityIndustry, setCityIndustry] = useState("");
  const [cityCurrentCountry, setCityCurrentCountry] = useState("");'''
content = content.replace(old, new, 1)

# 1c. Add currentCountry validation in validate()
old = '    if (!industry) newErrors.industry = true;'
new = '''    if (!industry) newErrors.industry = true;
    if (!currentCountry) newErrors.currentCountry = true;'''
content = content.replace(old, new, 1)

# 1d. Add currentCountry to handleQuiz params
old = '''    const params = new URLSearchParams({
      nationality,
      income,
      lifeStage,
      family,
      lifestyle,
      industry,
      aspirations,
    });'''
new = '''    const params = new URLSearchParams({
      nationality,
      income,
      lifeStage,
      family,
      lifestyle,
      industry,
      aspirations,
      currentCountry,
    });'''
content = content.replace(old, new, 1)

# 1e. Add cityCurrentCountry validation in handleCityQuiz
old = '    if (!cityIndustry) newErrors.cityIndustry = true;'
new = '''    if (!cityIndustry) newErrors.cityIndustry = true;
    if (!cityCurrentCountry) newErrors.cityCurrentCountry = true;'''
content = content.replace(old, new, 1)

# 1f. Add cityCurrentCountry to handleCityQuiz params
old = '''    const params = new URLSearchParams({
      country: cityCountry,
      lifestyle: cityLifestyle,
      family: cityFamily,
      budget: cityBudget,
      priorities: cityPriorities,
      lifeStage: cityLifeStage,
      nationality: cityNationality,
      income: cityIncome,
      industry: cityIndustry,
    });'''
new = '''    const params = new URLSearchParams({
      country: cityCountry,
      lifestyle: cityLifestyle,
      family: cityFamily,
      budget: cityBudget,
      priorities: cityPriorities,
      lifeStage: cityLifeStage,
      nationality: cityNationality,
      income: cityIncome,
      industry: cityIndustry,
      currentCountry: cityCurrentCountry,
    });'''
content = content.replace(old, new, 1)

# 1g. Add currentCountry field to country quiz form (after nationality field closing div)
old = '''              {showCountryList && filteredCountries.length > 0 && (
                  <ul className="absolute left-0 right-0 top-full mt-1 z-[200] max-h-52 overflow-y-auto rounded-2xl bg-[#0d1f6e] border border-white/20 shadow-2xl">
                    {filteredCountries.map((country) => (
                      <li key={country} onMouseDown={() => { setNationality(country); setCountrySearch(country); setShowCountryList(false); setErrors((e) => ({ ...e, nationality: false })); }} className="px-4 py-2 text-sm text-white cursor-pointer hover:bg-white/10">
                        {country}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* INCOME */}'''
new = '''              {showCountryList && filteredCountries.length > 0 && (
                  <ul className="absolute left-0 right-0 top-full mt-1 z-[200] max-h-52 overflow-y-auto rounded-2xl bg-[#0d1f6e] border border-white/20 shadow-2xl">
                    {filteredCountries.map((country) => (
                      <li key={country} onMouseDown={() => { setNationality(country); setCountrySearch(country); setShowCountryList(false); setErrors((e) => ({ ...e, nationality: false })); }} className="px-4 py-2 text-sm text-white cursor-pointer hover:bg-white/10">
                        {country}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* CURRENT COUNTRY */}
              <div className={`relative z-[90] ${fieldClass("currentCountry")}`}>
                <div className="text-sm text-gray-300 mb-2">I currently live in</div>
                <input
                  type="text"
                  placeholder="Search country..."
                  value={currentCountrySearch || currentCountry}
                  onChange={(e) => { setCurrentCountrySearch(e.target.value); setCurrentCountry(""); setShowCurrentCountryList(true); }}
                  onFocus={() => setShowCurrentCountryList(true)}
                  onBlur={() => setTimeout(() => setShowCurrentCountryList(false), 150)}
                  className="w-full bg-transparent font-semibold placeholder-white/40 outline-none text-white"
                />
                {showCurrentCountryList && COUNTRIES.filter(c => c.toLowerCase().includes(currentCountrySearch.toLowerCase())).length > 0 && (
                  <ul className="absolute left-0 right-0 top-full mt-1 z-[200] max-h-52 overflow-y-auto rounded-2xl bg-[#0d1f6e] border border-white/20 shadow-2xl">
                    {COUNTRIES.filter(c => c.toLowerCase().includes(currentCountrySearch.toLowerCase())).map((c) => (
                      <li key={c} onMouseDown={() => { setCurrentCountry(c); setCurrentCountrySearch(c); setShowCurrentCountryList(false); setErrors((e) => ({ ...e, currentCountry: false })); }} className="px-4 py-2 text-sm text-white cursor-pointer hover:bg-white/10">
                        {c}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* INCOME */}'''
content = content.replace(old, new, 1)

# 1h. Add cityCurrentCountry field to city quiz form (after cityIndustry field closing div, before the errors paragraph)
old = '''              <div className={`md:col-span-2 ${cityFieldClass("cityIndustry")}`}>
                <div className="text-sm text-gray-300 mb-2">Industry</div>
                <select value={cityIndustry} onChange={(e) => { setCityIndustry(e.target.value); setCityErrors((er) => ({ ...er, cityIndustry: false })); }} className="w-full bg-transparent font-semibold outline-none text-white cursor-pointer">
                  <option value="" className="text-black bg-white">Select industry...</option>
                  {INDUSTRIES.map((ind) => <option key={ind} value={ind} className="text-black bg-white">{ind}</option>)}
                </select>
              </div>
            </div>

            {Object.keys(cityErrors).length > 0 && ('''
new = '''              <div className={`md:col-span-2 ${cityFieldClass("cityIndustry")}`}>
                <div className="text-sm text-gray-300 mb-2">Industry</div>
                <select value={cityIndustry} onChange={(e) => { setCityIndustry(e.target.value); setCityErrors((er) => ({ ...er, cityIndustry: false })); }} className="w-full bg-transparent font-semibold outline-none text-white cursor-pointer">
                  <option value="" className="text-black bg-white">Select industry...</option>
                  {INDUSTRIES.map((ind) => <option key={ind} value={ind} className="text-black bg-white">{ind}</option>)}
                </select>
              </div>
              <div className={`md:col-span-2 ${cityFieldClass("cityCurrentCountry")}`}>
                <div className="text-sm text-gray-300 mb-2">I currently live in</div>
                <select value={cityCurrentCountry} onChange={(e) => { setCityCurrentCountry(e.target.value); setCityErrors((er) => ({ ...er, cityCurrentCountry: false })); }} className="w-full bg-transparent font-semibold outline-none text-white cursor-pointer">
                  <option value="" className="text-black bg-white">Select country...</option>
                  {COUNTRIES.map((c) => <option key={c} value={c} className="text-black bg-white">{c}</option>)}
                </select>
              </div>
            </div>

            {Object.keys(cityErrors).length > 0 && ('''
content = content.replace(old, new, 1)

with open("app/page.tsx", "w") as f:
    f.write(content)

print("✅ app/page.tsx updated")
PYEOF

# ─── 2. app/quiz/results/page.tsx ────────────────────────────────────────────

echo "📝 Updating app/quiz/results/page.tsx..."

python3 - <<'PYEOF'
with open("app/quiz/results/page.tsx", "r") as f:
    content = f.read()

# 2a. Add countryFlags and countryImages for the 3 new countries
old = '''const countryFlags: Record<string, string> = {
  Spain: "🇪🇸",
  Portugal: "🇵🇹",
  Italy: "🇮🇹",
  Gibraltar: "🇬🇮",
  Malta: "🇲🇹",
  Bulgaria: "🇧🇬",
};

const countryImages: Record<string, string> = {
  Spain: "/images/countries/spain-card.jpg",
  Portugal: "/images/countries/portugal-card.jpg",
  Italy: "/images/countries/italy-card.jpg",
  Gibraltar: "/images/countries/gibraltar-card.jpg",
  Malta: "/images/countries/malta-card.jpg",
  Bulgaria: "/images/countries/bulgaria-card.jpg",
};'''
new = '''const countryFlags: Record<string, string> = {
  Spain: "🇪🇸",
  Portugal: "🇵🇹",
  Italy: "🇮🇹",
  Gibraltar: "🇬🇮",
  Malta: "🇲🇹",
  Bulgaria: "🇧🇬",
  Greece: "🇬🇷",
  Netherlands: "🇳🇱",
  Romania: "🇷🇴",
};

const countryImages: Record<string, string> = {
  Spain: "/images/countries/spain-card.jpg",
  Portugal: "/images/countries/portugal-card.jpg",
  Italy: "/images/countries/italy-card.jpg",
  Gibraltar: "/images/countries/gibraltar-card.jpg",
  Malta: "/images/countries/malta-card.jpg",
  Bulgaria: "/images/countries/bulgaria-card.jpg",
  Greece: "/images/countries/greece-card.jpg",
  Netherlands: "/images/countries/netherlands-card.jpg",
  Romania: "/images/countries/romania-card.jpg",
};'''
content = content.replace(old, new, 1)

# 2b. Read currentCountry from searchParams
old = '  const aspirations = searchParams.get("aspirations") || "";'
new = '''  const aspirations = searchParams.get("aspirations") || "";
  const currentCountry = searchParams.get("currentCountry") || "";'''
content = content.replace(old, new, 1)

# 2c. Update the prompt — country list and exclusion rules
old = '''        const prompt = `You are a European relocation expert. Based on the following user profile, rank exactly 5 countries for relocation from this list: Spain, Portugal, Italy, Gibraltar, Malta, and Bulgaria.

Important rules:
- If the user's nationality matches any of these countries (e.g. if they are Spanish, exclude Spain; if Bulgarian, exclude Bulgaria etc.), exclude that country from the results entirely
- Always return exactly 5 countries in the ranked results
- The user's nationality is: ${nationality}'''
new = '''        const prompt = `You are a European relocation expert. Based on the following user profile, rank exactly 5 countries for relocation from this list: Spain, Portugal, Italy, Gibraltar, Malta, Bulgaria, Greece, Netherlands, and Romania.

Important rules:
- Always return exactly 5 countries in the ranked results
- The user's nationality is: ${nationality}
- The user currently lives in: ${currentCountry}
- If the user's nationality matches any country on the list (e.g. Spanish → exclude Spain, Bulgarian → exclude Bulgaria, Greek → exclude Greece, Dutch → exclude Netherlands, Romanian → exclude Romania), exclude that country
- If the user currently lives in any country on the list, exclude that country too
- Apply both exclusions — if both apply, exclude both and still return exactly 5 results from the remaining countries'''
content = content.replace(old, new, 1)

# 2d. Add currentCountry to useEffect dependency array
old = '  }, [nationality, income, lifeStage, family, lifestyle, industry, aspirations]);'
new = '  }, [nationality, currentCountry, income, lifeStage, family, lifestyle, industry, aspirations]);'
content = content.replace(old, new, 1)

# 2e. Add currentCountry to city quiz params at bottom of results page
old = '''                const params = new URLSearchParams({
                  country,
                  budget,
                  lifestyle: cityLifestyle,
                  priorities,
                  family,
                  lifeStage,
                  nationality,
                  income,
                  industry,
                });'''
new = '''                const params = new URLSearchParams({
                  country,
                  budget,
                  lifestyle: cityLifestyle,
                  priorities,
                  family,
                  lifeStage,
                  nationality,
                  income,
                  industry,
                  currentCountry,
                });'''
content = content.replace(old, new, 1)

# 2f. Update the city quiz country dropdown at bottom to include all 9 countries
old = '''                  {["Spain", "Portugal", "Italy", "Gibraltar", "Malta", "Bulgaria"].map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}'''
new = '''                  {["Spain", "Portugal", "Italy", "Gibraltar", "Malta", "Bulgaria", "Greece", "Netherlands", "Romania"].map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}'''
content = content.replace(old, new, 1)

# 2g. Update the loading animation dots to show all 9 countries
old = '''          {["Spain", "Portugal", "Italy", "Gibraltar", "Malta", "Bulgaria"].map((country, i) => (
              <div key={country} className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
            ))}'''
new = '''          {["Spain", "Portugal", "Italy", "Gibraltar", "Malta", "Bulgaria", "Greece", "Netherlands", "Romania"].map((country, i) => (
              <div key={country} className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
            ))}'''
content = content.replace(old, new, 1)

# 2h. Update loading text
old = '          <p className="text-gray-500 text-lg">Analysing your profile across 6 European countries</p>'
new = '          <p className="text-gray-500 text-lg">Analysing your profile across 9 European countries</p>'
content = content.replace(old, new, 1)

with open("app/quiz/results/page.tsx", "w") as f:
    f.write(content)

print("✅ app/quiz/results/page.tsx updated")
PYEOF

# ─── 3. app/quiz/city-results/page.tsx ───────────────────────────────────────

echo "📝 Updating app/quiz/city-results/page.tsx..."

python3 - <<'PYEOF'
with open("app/quiz/city-results/page.tsx", "r") as f:
    content = f.read()

# 3a. Read currentCountry from searchParams
old = '  const industry = searchParams.get("industry") || "";'
new = '''  const industry = searchParams.get("industry") || "";
  const currentCountry = searchParams.get("currentCountry") || "";'''
content = content.replace(old, new, 1)

# 3b. Add currentCountry exclusion to the prompt
old = '        const nationalityContext = nationality'
new = '''        const currentCountryNote = currentCountry
          ? `Current residence exclusion: The user currently lives in ${currentCountry}. Do NOT recommend any cities or towns in ${currentCountry} under any circumstances — the whole purpose of this quiz is to help them leave. Only recommend places in ${country}.`
          : "";

        const nationalityContext = nationality'''
content = content.replace(old, new, 1)

# 3c. Insert currentCountryNote into the prompt string
old = '${nationalityContext}\n\n${gibraltarNote}'
new = '${currentCountryNote}\n\n${nationalityContext}\n\n${gibraltarNote}'
content = content.replace(old, new, 1)

# 3d. Add currentCountry to useEffect dependency array
old = '  }, [country, lifestyle, family, budget, priorities, lifeStage, nationality, income, industry]);'
new = '  }, [country, currentCountry, lifestyle, family, budget, priorities, lifeStage, nationality, income, industry]);'
content = content.replace(old, new, 1)

with open("app/quiz/city-results/page.tsx", "w") as f:
    f.write(content)

print("✅ app/quiz/city-results/page.tsx updated")
PYEOF

echo ""
echo "✅ All done! Here's what was updated:"
echo "   • app/page.tsx — 'I currently live in' added to both quizzes"
echo "   • app/quiz/results/page.tsx — 9 countries, current country exclusion, updated prompts"
echo "   • app/quiz/city-results/page.tsx — current country exclusion in city prompt"
echo ""
echo "Next steps:"
echo "   git add app/page.tsx app/quiz/results/page.tsx app/quiz/city-results/page.tsx"
echo "   git commit -m 'feat: exclude current country from quiz results, add Greece/Netherlands/Romania to country quiz'"
echo "   git push"
