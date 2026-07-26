#!/bin/bash
set -e
echo "🌍 Wiring homepage to translation hook..."

python3 << 'EOF'
with open("app/page.tsx", "r") as f:
    content = f.read()

# 1. Add the useTranslations import
old = 'import { supabase } from "@/lib/supabase";'
new = '''import { supabase } from "@/lib/supabase";
import { useTranslations } from "@/lib/useTranslations";'''
content = content.replace(old, new, 1)

# 2. Call the hook inside the component, right after `const router = useRouter();`
old = '  const router = useRouter();'
new = '''  const router = useRouter();
  const { t } = useTranslations();'''
content = content.replace(old, new, 1)

# 3. Wire up hero heading + subtitle
old = '''            <h1 className="text-5xl font-black leading-none tracking-tight text-[#0B1957] md:text-8xl">
              Move to Europe.
              <br />
              Live your{" "}
              <span className="bg-gradient-to-r from-violet-600 via-pink-500 to-yellow-400 bg-clip-text text-transparent">
                best life.
              </span>
            </h1>
            <p className="mx-auto mt-8 max-w-3xl text-xl leading-8 text-[#24346d]">
              Relocate2Day is your all-in-one guide to relocating to Spain, Portugal and beyond.
            </p>'''
new = '''            <h1 className="text-5xl font-black leading-none tracking-tight text-[#0B1957] md:text-8xl">
              {t("hero.title1") || "Move to Europe."}
              <br />
              {t("hero.title2") || "Live your"}{" "}
              <span className="bg-gradient-to-r from-violet-600 via-pink-500 to-yellow-400 bg-clip-text text-transparent">
                {t("hero.titleHighlight") || "best life."}
              </span>
            </h1>
            <p className="mx-auto mt-8 max-w-3xl text-xl leading-8 text-[#24346d]">
              {t("hero.subtitle") || "Relocate2Day is your all-in-one guide to relocating to Spain, Portugal and beyond."}
            </p>'''
content = content.replace(old, new, 1)

# 4. Wire up the 3 quick buttons
old = '''            <div className="mt-10 flex flex-wrap justify-center gap-4">
              {["Compare countries", "Understand taxes", "Plan your move"].map((item) => (
                <button key={item} className="rounded-2xl border border-white/40 bg-white/70 px-6 py-3 text-sm font-semibold shadow-lg backdrop-blur-xl transition hover:scale-105">
                  {item}
                </button>
              ))}
            </div>'''
new = '''            <div className="mt-10 flex flex-wrap justify-center gap-4">
              {[
                t("hero.cta1") || "Compare countries",
                t("hero.cta2") || "Understand taxes",
                t("hero.cta3") || "Plan your move",
              ].map((item) => (
                <button key={item} className="rounded-2xl border border-white/40 bg-white/70 px-6 py-3 text-sm font-semibold shadow-lg backdrop-blur-xl transition hover:scale-105">
                  {item}
                </button>
              ))}
            </div>'''
content = content.replace(old, new, 1)

# 5. Quiz widget heading
old = '''              <h2 className="text-4xl font-black text-white">Where should you relocate?</h2>
              <p className="mt-3 text-gray-300">Answer a few questions and get your personalised country ranking.</p>'''
new = '''              <h2 className="text-4xl font-black text-white">{t("quiz.title") || "Where should you relocate?"}</h2>
              <p className="mt-3 text-gray-300">{t("quiz.subtitle") || "Answer a few questions and get your personalised country ranking."}</p>'''
content = content.replace(old, new, 1)

# 6. Countries section heading
old = '''            <div className="text-sm font-bold uppercase tracking-[0.3em] text-violet-500">Popular destinations</div>
            <h2 className="mt-4 text-5xl font-black">Find your perfect place in Europe</h2>
            <p className="mt-4 text-xl text-gray-500">Explore the best countries for your new life abroad.</p>'''
new = '''            <div className="text-sm font-bold uppercase tracking-[0.3em] text-violet-500">{t("countries.eyebrow") || "Popular destinations"}</div>
            <h2 className="mt-4 text-5xl font-black">{t("countries.title") || "Find your perfect place in Europe"}</h2>
            <p className="mt-4 text-xl text-gray-500">{t("countries.subtitle") || "Explore the best countries for your new life abroad."}</p>'''
content = content.replace(old, new, 1)

# 7. Banner section
old = '''            <div className="text-sm font-bold uppercase tracking-[0.3em] text-violet-500 mb-4">Your adventure awaits</div>
            <h2 className="text-4xl font-black text-[#0B1957] mb-4">Ready to take off?</h2>
            <p className="text-gray-600 text-lg mb-8">Join thousands of people who have already found their perfect home in Europe. Your new life is just a few questions away.</p>
            <a href="#countries" className="inline-block rounded-2xl bg-gradient-to-r from-violet-600 via-pink-500 to-orange-400 px-8 py-4 text-sm font-bold text-white shadow-xl transition hover:scale-105">Explore countries →</a>'''
new = '''            <div className="text-sm font-bold uppercase tracking-[0.3em] text-violet-500 mb-4">{t("banner.eyebrow") || "Your adventure awaits"}</div>
            <h2 className="text-4xl font-black text-[#0B1957] mb-4">{t("banner.title") || "Ready to take off?"}</h2>
            <p className="text-gray-600 text-lg mb-8">{t("banner.subtitle") || "Join thousands of people who have already found their perfect home in Europe. Your new life is just a few questions away."}</p>
            <a href="#countries" className="inline-block rounded-2xl bg-gradient-to-r from-violet-600 via-pink-500 to-orange-400 px-8 py-4 text-sm font-bold text-white shadow-xl transition hover:scale-105">{t("banner.cta") || "Explore countries →"}</a>'''
content = content.replace(old, new, 1)

# 8. City quiz heading
old = '''            <div className="text-sm font-bold uppercase tracking-[0.3em] text-orange-400 mb-4">Already know your country?</div>
            <h2 className="text-5xl font-black text-white">Find your perfect city</h2>
            <p className="mt-4 text-xl text-gray-300">Tell us about yourself and we'll match you to the best cities and towns in your chosen country.</p>'''
new = '''            <div className="text-sm font-bold uppercase tracking-[0.3em] text-orange-400 mb-4">{t("cityQuiz.eyebrow") || "Already know your country?"}</div>
            <h2 className="text-5xl font-black text-white">{t("cityQuiz.title") || "Find your perfect city"}</h2>
            <p className="mt-4 text-xl text-gray-300">{t("cityQuiz.subtitle") || "Tell us about yourself and we'll match you to the best cities and towns in your chosen country."}</p>'''
content = content.replace(old, new, 1)

# 9. Features section heading
old = '''            <div className="text-sm font-bold uppercase tracking-[0.3em] text-violet-500">Everything you need</div>
            <h2 className="mt-4 text-5xl font-black">Your relocation toolkit</h2>
            <p className="mt-4 text-xl text-gray-500">All the tools and guides you need to make your move with confidence.</p>'''
new = '''            <div className="text-sm font-bold uppercase tracking-[0.3em] text-violet-500">{t("features.eyebrow") || "Everything you need"}</div>
            <h2 className="mt-4 text-5xl font-black">{t("features.title") || "Your relocation toolkit"}</h2>
            <p className="mt-4 text-xl text-gray-500">{t("features.subtitle") || "All the tools and guides you need to make your move with confidence."}</p>'''
content = content.replace(old, new, 1)

# 10. Pricing section heading
old = '''            <div className="text-sm font-bold uppercase tracking-[0.3em] text-violet-500">Pricing</div>
            <h2 className="mt-4 text-5xl font-black">Simple, transparent pricing</h2>
            <p className="mt-4 text-xl text-gray-500">Start for free. Upgrade when you need more.</p>'''
new = '''            <div className="text-sm font-bold uppercase tracking-[0.3em] text-violet-500">{t("pricing.eyebrow") || "Pricing"}</div>
            <h2 className="mt-4 text-5xl font-black">{t("pricing.title") || "Simple, transparent pricing"}</h2>
            <p className="mt-4 text-xl text-gray-500">{t("pricing.subtitle") || "Start for free. Upgrade when you need more."}</p>'''
content = content.replace(old, new, 1)

# 11. FAQ section heading
old = '''            <div className="text-sm font-bold uppercase tracking-[0.3em] text-violet-500">FAQ</div>
            <h2 className="mt-4 text-5xl font-black">Common questions</h2>'''
new = '''            <div className="text-sm font-bold uppercase tracking-[0.3em] text-violet-500">{t("faq.eyebrow") || "FAQ"}</div>
            <h2 className="mt-4 text-5xl font-black">{t("faq.title") || "Common questions"}</h2>'''
content = content.replace(old, new, 1)

with open("app/page.tsx", "w") as f:
    f.write(content)

print("✅ Homepage wired to translations (hero, countries, banner, city quiz, features, pricing, FAQ headings)")
EOF

echo ""
echo "✅ Done! Note: the quiz form fields, FAQ answers, country card text, and pricing"
echo "   plan details were intentionally left untouched to avoid breaking the quiz logic."
echo "   These can be wired in a follow-up pass if you want full coverage."
echo ""
echo "Next steps:"
echo "   git add app/page.tsx"
echo "   git commit -m 'feat: wire homepage headings to translation system'"
echo "   git push"
