#!/bin/bash
set -e
echo "🌍 Creating remaining 6 country content.json files..."

python3 - << 'PYEOF'
import json, os

countries = {
  "portugal": {
    "country": "Portugal",
    "hero": {
      "badge": "Portugal", "title": "Move to Portugal",
      "subtitle": "Affordable living, friendly locals, world-class food and wine, and one of the most welcoming countries in Europe for newcomers. Here's everything you need to know.",
      "stats": [{"label": "Cost of living", "value": "From €900/mo"}, {"label": "IFICI flat tax", "value": "20%"}, {"label": "Climate", "value": "300+ sunny days"}, {"label": "Official language", "value": "Portuguese"}]
    },
    "sections": {
      "visas": {
        "eyebrow": "Visas & Residency", "title": "How to move to Portugal",
        "intro": "EU/EEA citizens can move to Portugal freely and simply need to register their residency. Non-EU nationals have several excellent visa routes depending on their situation.",
        "visas": [
          {"title": "D7 Passive Income Visa", "badge": "Retirees & passive income", "points": ["For non-EU nationals with stable passive income — pensions, rental income, dividends, or investments", "Minimum income requirement: approx. €760/month (the Portuguese minimum wage) for the main applicant", "Add 50% for a spouse/partner and 30% per dependent child", "Must show proof of savings of approx. €10,440 per applicant", "Requires private health insurance valid in Portugal", "Initial 2-year residence permit, renewable for 3-year periods", "Pathway to permanent residency after 5 years and citizenship after 5 years", "Does not permit employment in Portugal — passive income only"]},
          {"title": "D8 Digital Nomad Visa", "badge": "Remote workers & freelancers", "points": ["For non-EU nationals working remotely for employers or clients based outside Portugal", "Minimum income requirement: €3,680/month (4x Portugal's minimum wage)", "Add 50% for a spouse/partner and 30% per dependent child", "Valid for up to 1 year initially, renewable as a residence permit", "Pathway to permanent residency after 5 years", "Requires a NIF number and a Portuguese bank account as part of the application", "One of the most popular digital nomad visas in Europe"]},
          {"title": "Golden Visa", "badge": "Investors", "points": ["Portugal's investment residency programme — available via investment funds, cultural donations, or research activities", "Note: the real estate route was eliminated in 2023 and is no longer available", "Minimum investment: approx. €500,000 in qualifying investment funds", "Only 7 days per year in Portugal required to maintain the permit", "Pathway to permanent residency after 5 years and citizenship after 5 years"]},
          {"title": "Student Visa (D4)", "badge": "Students", "points": ["For non-EU nationals enrolled at a recognised Portuguese educational institution", "Valid for the duration of the course", "Permits part-time work alongside studies", "Portugal has excellent universities and an affordable cost of living for students", "Pathway to convert to a work permit after graduation"]},
          {"title": "EU / EEA Citizens", "badge": "Free movement", "points": ["EU/EEA citizens have the right to live and work in Portugal without a visa", "Must register at the local Câmara Municipal (town hall) within 3 months of arrival", "Will receive a registration certificate confirming EU residency rights", "After 5 years of continuous legal residence, eligible for permanent residency"]}
        ],
        "disclaimer": "Portugal's immigration agency (AIMA) is known for long processing times — sometimes 6–12 months for residency appointments. Apply as early as possible and consider using an immigration lawyer to avoid delays."
      },
      "taxes": {
        "eyebrow": "Taxes", "title": "Understanding tax in Portugal",
        "intro": "Portugal's standard income tax is progressive, ranging from 14.5% to 48%. However, qualifying newcomers may benefit from the IFICI regime (also known as NHR 2.0), which offers a significant flat tax rate for up to 10 years.",
        "highlight": {
          "title": "IFICI — Portugal's New Tax Incentive (NHR 2.0)",
          "subtitle": "The original Non-Habitual Resident (NHR) regime ended in 2024. It has been replaced by the IFICI (Incentivo Fiscal à Investigação Científica e Inovação), which offers a flat 20% tax rate on qualifying Portuguese income for up to 10 years.",
          "items": [
            {"label": "Flat tax rate", "value": "20% on qualifying Portuguese income"},
            {"label": "Duration", "value": "Up to 10 years"},
            {"label": "Who qualifies", "value": "Highly qualified professionals in tech, R&D, healthcare, higher education, and manufacturing"},
            {"label": "Foreign income", "value": "May be exempt or taxed at reduced rates depending on type and origin"}
          ]
        },
        "nhrWarning": "The original NHR regime was available to almost any newcomer and ended in 2024 (final transitional deadline: March 31, 2025). The new IFICI is significantly more restrictive — it is limited to highly qualified professionals in specific sectors. Most retirees, general remote workers, and passive income earners will NOT qualify for IFICI.",
        "standardRates": {"title": "Standard income tax rates (without IFICI)", "brackets": [["Up to €7,703", "14.5%"], ["€7,703 – €11,623", "21%"], ["€11,623 – €16,472", "26.5%"], ["€16,472 – €21,321", "28.5%"], ["€21,321 – €27,146", "35%"], ["€27,146 – €39,791", "37%"], ["€39,791 – €51,997", "43.5%"], ["€51,997 – €81,199", "45%"], ["Over €81,199", "48%"]]},
        "freelancerRegime": "If you are self-employed or a freelancer with annual foreign-source income under €200,000, Portugal offers a simplified tax regime where only 75% of gross income is taxed — the remaining 25% is treated as a business expense deduction.",
        "disclaimer": "Portugal's tax landscape has changed significantly in recent years. Always consult a qualified Portuguese tax adviser before making any decisions — especially regarding IFICI eligibility, pension taxation, and foreign income treatment."
      },
      "costOfLiving": {
        "eyebrow": "Cost of Living", "title": "What does life in Portugal cost?",
        "intro": "Portugal is one of the most affordable countries in Western Europe. A single person can live comfortably on €1,200–€1,800/month in major cities, and as little as €900–€1,300/month in smaller towns and rural areas.",
        "cities": [
          {"city": "Lisbon & Cascais", "level": "Most expensive", "items": ["1-bed apartment (centre): €1,200–€1,500/mo", "Single person budget: €1,750–€2,350/mo", "Monthly transport pass: €40"]},
          {"city": "Porto, Algarve, Setúbal", "level": "Mid-range", "items": ["1-bed apartment (centre): €700–€1,000/mo", "Single person budget: €1,200–€1,800/mo", "Monthly transport pass: €30–€40"]},
          {"city": "Smaller cities & rural areas", "level": "Most affordable", "items": ["1-bed apartment: €400–€700/mo", "Single person budget: €900–€1,300/mo", "Car often needed outside cities"]}
        ],
        "expenses": {"title": "Typical monthly expenses (outside Lisbon)", "items": [["Rent (1-bed, city centre)", "€600 – €900"], ["Utilities (electricity, water, internet)", "€80 – €130"], ["Groceries", "€200 – €300"], ["Dining out (mid-range)", "€100 – €200"], ["Public transport pass", "€30 – €40"], ["Private health insurance", "€50 – €150"], ["Gym membership", "€25 – €50"], ["Mobile plan", "€10 – €25"]]}
      },
      "healthcare": {
        "eyebrow": "Healthcare", "title": "Healthcare in Portugal",
        "intro": "Portugal's public healthcare system, the Serviço Nacional de Saúde (SNS), is ranked among the best in the world and is available to all legal residents.",
        "public": {"title": "Public Healthcare (SNS)", "points": ["Free or heavily subsidised for all legal residents", "Register at your local Centro de Saúde with your NIF, NISS, and residence permit", "You will be assigned a family doctor (médico de família)", "Covers GP visits, hospital care, maternity, emergency services, and subsidised prescriptions", "Dental care is NOT covered — pay privately", "Small co-payments (taxas moderadoras) apply for some services — typically €5 for a GP visit", "Long waiting times for non-urgent specialist appointments can be 6–18 months", "Emergency number: 112"]},
        "private": {"title": "Private Health Insurance", "points": ["Required for most visa applications (D7, D8, Golden Visa)", "Costs approx. €50–€150/month per person depending on age and coverage", "Provides faster access to specialists and avoids SNS waiting lists", "Many private clinics have English-speaking doctors, especially in Lisbon, Porto, and the Algarve", "Popular providers: Médis, Multicare, Fidelidade, AXA Portugal"]},
        "tip": "Get your NIF and NISS as soon as possible after arriving — you can actually apply for both at the same time at a Finanças office. Then register at your local Centro de Saúde to activate your SNS access."
      },
      "banking": {
        "eyebrow": "Banking & Finance", "title": "Banking in Portugal",
        "intro": "A Portuguese bank account is essential — it's required for most visa applications, paying rent, receiving salary or pension income, and accessing Portugal's Multibanco payment network.",
        "requirements": {"title": "Getting your NIF", "points": ["The NIF (Número de Identificação Fiscal) is your Portuguese tax number — required for almost everything", "Apply in person at any Finanças (tax office) with your passport and proof of address", "Non-EU citizens need a Portuguese fiscal representative until they have residency", "Can also be obtained remotely through an immigration lawyer or online service", "Issued immediately at the tax office — free of charge", "Your NIF is permanent and never expires"]},
        "banks": {"title": "Opening a bank account", "points": ["Requires: NIF, passport, proof of address, and proof of income", "A €250 opening deposit is typically required", "Popular banks for expats: Millennium BCP, Novo Banco, Caixa Geral, Bankinter", "Use Revolut or Wise while waiting — good for day-to-day spending before your account is active"]},
        "tip": "Portugal's Multibanco network is one of the most advanced payment systems in Europe — ATMs allow you to pay bills, top up phones, buy tickets, and more."
      },
      "prosCons": {
        "eyebrow": "Summary", "title": "Is Portugal right for you?",
        "pros": {"title": "Reasons to move to Portugal", "points": ["One of the most affordable countries in Western Europe", "Warm climate with 300+ days of sunshine per year", "Friendly, welcoming locals — consistently ranked one of the safest countries in the world", "Excellent public healthcare system", "Wide range of visa options for all types of newcomers", "IFICI tax regime for qualifying professionals (20% flat rate for 10 years)", "Simplified tax regime for freelancers and self-employed", "English widely spoken, especially in cities and tourist areas", "Excellent food, wine, and quality of life", "Pathway to EU residency and citizenship after 5 years", "Strong expat community — one of the most popular destinations in Europe"]},
        "cons": {"title": "Things to consider", "points": ["The original NHR tax regime is gone — IFICI is much more restrictive", "AIMA (immigration agency) is known for very long processing times — plan 6–12 months ahead", "Housing costs in Lisbon and Porto have risen significantly", "Portuguese bureaucracy can be slow and complex", "SNS waiting times for specialist care can be very long", "Portuguese language is important for daily life outside tourist areas", "D8 visa requires relatively high income (€3,680/month)", "Real estate Golden Visa route was eliminated in 2023"]}
      },
      "cta": {"title": "Ready to make your move?", "subtitle": "Use our free tool to compare Portugal with other European countries and find the best fit for your situation.", "button": "Compare all countries →"}
    }
  },
  "italy": {
    "country": "Italy",
    "hero": {
      "badge": "Italy", "title": "Move to Italy",
      "subtitle": "World-class food, art, history, and coastline — plus some of Europe's most generous tax incentives for newcomers. Here's everything you need to know about relocating to Italy.",
      "stats": [{"label": "Retiree flat tax", "value": "7%"}, {"label": "Impatriati exemption", "value": "Up to 90%"}, {"label": "HNWI flat tax", "value": "€300,000/yr"}, {"label": "Official language", "value": "Italian"}]
    },
    "sections": {
      "visas": {
        "eyebrow": "Visas & Residency", "title": "How to move to Italy",
        "intro": "EU/EEA citizens can move to Italy freely and register residency at their local municipality (Comune). Non-EU nationals need a visa before arriving — Italy offers several routes depending on whether you plan to work, retire, invest, or study.",
        "visas": [
          {"title": "Digital Nomad Visa", "badge": "Remote workers & freelancers", "points": ["Launched in 2024 — one of Europe's newest digital nomad visa programmes", "For non-EU citizens working remotely for employers or clients outside Italy", "Minimum income requirement: €32,400/year (approx. €2,700/month)", "Must demonstrate savings of at least €30,000", "Must have at least 6 months of proven remote work experience", "Must rent or purchase property in Italy before applying", "Valid for 1 year, renewable for a further 2 years", "Spouse, children under 18, and parents can be included", "Pathway to permanent residency after 5 years, citizenship after 10 years"]},
          {"title": "Elective Residency Visa", "badge": "Retirees & financially independent", "points": ["For non-EU nationals who can support themselves entirely from passive income — pensions, investments, rental income", "Strictly a non-working visa — Italy enforces this condition rigorously", "Minimum passive income required: approx. €31,000/year for a single applicant", "Add approx. 20% for a spouse and 5% per dependent child", "Must prove you have accommodation in Italy (rental or owned)", "Initial 1-year visa, renewable annually", "After 5 years, eligible for long-term EU residency"]},
          {"title": "Student Visa (Type D)", "badge": "Students", "points": ["For non-EU nationals enrolling at an Italian university or language school", "Valid for the duration of the enrolled course", "Permits part-time work of up to 20 hours per week", "Italy has world-renowned universities — Bologna (the world's oldest), La Sapienza, Bocconi", "Tuition fees at Italian public universities are very affordable — typically €900–€4,000/year", "Pathway to convert to a work permit after graduation"]},
          {"title": "Golden Visa (Investor Visa)", "badge": "Investors", "points": ["Italy's residency-by-investment programme for non-EU nationals", "Investment routes: €250,000 in an innovative startup, €500,000 in an Italian company, €1M in a philanthropic project, or €2M in Italian government bonds", "Grants a 2-year renewable residence permit", "No minimum stay requirement to maintain the permit", "Pathway to permanent residency after 5 years and citizenship after 10 years"]},
          {"title": "EU / EEA Citizens", "badge": "Free movement", "points": ["EU/EEA citizens have the right to live and work in Italy without a visa", "Must register at the local Comune (town hall) within 3 months of arrival", "After 5 years of continuous legal residence, eligible for permanent residency"]}
        ],
        "disclaimer": "Italy's immigration system is known for complexity and bureaucracy. Visa processing times can be long and requirements are enforced strictly. Always apply well in advance and consider working with a qualified Italian immigration lawyer."
      },
      "taxes": {
        "eyebrow": "Taxes", "title": "Understanding tax in Italy",
        "intro": "Italy's standard income tax (IRPEF) is progressive and can reach 43% for high earners. However, Italy offers several generous tax incentive regimes for newcomers.",
        "regimes": [
          {"title": "7% Retiree Flat Tax", "desc": "For foreign retirees relocating to small towns in Southern Italy. One of the lowest flat tax rates in Europe."},
          {"title": "Impatriati Regime", "desc": "Up to 90% income tax exemption for workers relocating to Southern Italy. 70% exemption elsewhere."},
          {"title": "€300,000 HNWI Flat Tax", "desc": "Fixed annual tax on all worldwide foreign income. For ultra-high-net-worth individuals."}
        ],
        "retireeFlat": {
          "title": "The 7% Retiree Flat Tax — Southern Italy",
          "subtitle": "One of the most generous retiree tax regimes in Europe. Pay just 7% on all foreign-sourced income for up to 10 years.",
          "items": [
            {"label": "Flat tax rate", "value": "7% on all foreign-sourced income"},
            {"label": "Duration", "value": "Up to 10 years"},
            {"label": "Where", "value": "Municipalities under 20,000 residents in Abruzzo, Molise, Campania, Puglia, Basilicata, Calabria, Sardinia, Sicily, and qualifying Central Italian villages"},
            {"label": "Who qualifies", "value": "Foreign retirees receiving a pension from outside Italy, not previously resident in Italy for 5+ years, moving from a country with a tax treaty with Italy"}
          ]
        },
        "impatriati": {
          "title": "Impatriati Regime — for workers relocating to Italy",
          "intro": "The Inbound Workers (Impatriati) regime offers a major income tax exemption for qualifying professionals who relocate to Italy to work. You must not have been a tax resident in Italy for the past 3 years.",
          "items": [
            {"label": "Standard exemption", "value": "70% of Italian employment or self-employment income is tax-exempt"},
            {"label": "Southern Italy bonus", "value": "90% exemption if you live in Abruzzo, Molise, Campania, Puglia, Basilicata, Calabria, Sardinia, or Sicily"},
            {"label": "Duration", "value": "5 years, extendable in some cases"},
            {"label": "Who qualifies", "value": "Workers employed or self-employed in Italy, not resident in Italy for 3+ years, committing to stay for at least 2 years"}
          ]
        },
        "hnwi": {
          "title": "€300,000 HNWI Flat Tax",
          "intro": "Italy's headline tax incentive for the ultra-wealthy. Pay a fixed €300,000 per year on all worldwide foreign-sourced income — regardless of how much you earn. The rate was raised from €200,000 in January 2026.",
          "points": ["Must not have been an Italian tax resident for 9 of the previous 10 years", "Covers all foreign-sourced income for a fixed annual payment of €300,000", "Family members can be included at €50,000 per person per year", "Valid for up to 15 years", "Exempts offshore assets from Italian wealth, inheritance, and gift taxes", "Existing beneficiaries at the old €200,000 rate are grandfathered in"]
        },
        "standardRates": {"title": "Standard income tax rates (IRPEF) — without any regime", "brackets": [["Up to €28,000", "23%"], ["€28,000 – €50,000", "35%"], ["Over €50,000", "43%"]], "note": "Regional and municipal surtaxes of approx. 1–3% also apply on top of IRPEF."},
        "disclaimer": "Italy's tax incentive regimes are complex and eligibility depends on your specific situation, income type, and residency history. Always consult a qualified Italian tax adviser (commercialista) before making any decisions."
      },
      "costOfLiving": {
        "eyebrow": "Cost of Living", "title": "What does life in Italy cost?",
        "intro": "Italy offers enormous variety in cost of living — from expensive northern cities like Milan and Rome to remarkably affordable small towns in the South. A single person can live comfortably on €1,200–€1,500/month in mid-sized cities, and under €1,000/month in rural Southern Italy.",
        "cities": [
          {"city": "Milan, Rome & Florence", "level": "Most expensive", "items": ["1-bed apartment (centre): €1,200–€1,800/mo", "Single person budget: €2,000–€3,000/mo", "Monthly transport pass: €35–€55"]},
          {"city": "Bologna, Turin, Naples", "level": "Mid-range", "items": ["1-bed apartment (centre): €700–€1,000/mo", "Single person budget: €1,400–€1,800/mo", "Monthly transport pass: €30–€45"]},
          {"city": "Southern Italy & small towns", "level": "Most affordable", "items": ["1-bed apartment: €300–€700/mo", "Single person budget: €800–€1,200/mo", "Car often needed in rural areas"]}
        ],
        "expenses": {"title": "Typical monthly expenses (mid-sized city)", "items": [["Rent (1-bed, city centre)", "€700 – €1,100"], ["Utilities (electricity, gas, water)", "€100 – €200"], ["Groceries", "€200 – €350"], ["Dining out (mid-range)", "€150 – €300"], ["Public transport pass", "€30 – €45"], ["Private health insurance", "€60 – €150"], ["Gym membership", "€30 – €60"], ["Mobile plan", "€10 – €30"]]},
        "southernNote": "Several regions in Southern Italy — including Calabria, Sardinia, and Sicily — actively offer grants of up to €30,000 to foreigners who relocate permanently to depopulating small towns."
      },
      "healthcare": {
        "eyebrow": "Healthcare", "title": "Healthcare in Italy",
        "intro": "Italy's public healthcare system, the Servizio Sanitario Nazionale (SSN), is consistently ranked among the best in the world. It is available to all legal residents and is largely free or heavily subsidised.",
        "public": {"title": "Public Healthcare (SSN)", "points": ["Free or heavily subsidised for all legal residents", "Register at your local ASL (Azienda Sanitaria Locale) office with your codice fiscale (tax number) and residence permit", "Covers GP visits, hospital care, maternity, emergency services, and subsidised prescriptions", "Small co-payments (ticket) apply for some specialist visits — typically €15–€50", "Dental care is mostly NOT covered — pay privately", "Quality varies significantly between Northern Italy (excellent) and Southern Italy (more variable)", "Emergency number: 118 (medical), 112 (general)"]},
        "private": {"title": "Private Health Insurance", "points": ["Required for most visa applications before arriving in Italy", "Costs approx. €60–€150/month per person depending on age and coverage", "Provides faster access to specialists and avoids SSN waiting times", "Particularly recommended in Southern Italy where SSN capacity can be more stretched", "Popular providers: Generali, Allianz, UniSalute, Previmedical"]},
        "tip": "Get your codice fiscale (tax code) as your first step — you need it to register with the SSN, open a bank account, sign a rental contract, and almost everything else."
      },
      "banking": {
        "eyebrow": "Banking & Finance", "title": "Banking in Italy",
        "intro": "Opening a bank account in Italy requires your codice fiscale (tax code) and proof of residency. Many expats use digital banks like Revolut or N26 initially while setting up their Italian account.",
        "requirements": {"title": "What you'll need to open an account", "points": ["Codice fiscale — your Italian tax identification number (get this first)", "Valid passport or national ID", "Proof of Italian address (rental contract or utility bill)", "Residence permit (permesso di soggiorno) for non-EU nationals"]},
        "banks": {"title": "Popular banks for expats", "points": ["Intesa Sanpaolo — Italy's largest bank, wide branch network", "UniCredit — major international bank with good English support", "Banca Mediolanum — popular with expats and remote workers", "Fineco Bank — excellent online/app banking, low fees", "N26 / Revolut — ideal while waiting for Italian account to open", "Wise — recommended for international transfers and multi-currency needs"]},
        "tip": "Your codice fiscale is the single most important document in Italy — get it before you arrive if possible, through an Italian consulate in your home country."
      },
      "prosCons": {
        "eyebrow": "Summary", "title": "Is Italy right for you?",
        "pros": {"title": "Reasons to move to Italy", "points": ["7% flat tax for retirees in Southern Italy — one of Europe's best", "Impatriati regime: up to 90% income tax exemption for qualifying workers", "€300,000 HNWI flat tax for ultra-high-net-worth individuals", "World-class food, wine, art, and culture", "Beautiful coastline, mountains, lakes, and countryside", "Excellent public healthcare ranked among the world's best", "Very affordable in Southern Italy and rural areas", "Strong expat communities in Rome, Florence, Milan, and coastal areas", "Pathway to EU residency and citizenship after 5–10 years", "Southern Italy relocation grants of up to €30,000 available"]},
        "cons": {"title": "Things to consider", "points": ["Italian bureaucracy is notoriously complex and slow", "Language barrier is significant outside major cities and tourist areas", "Digital Nomad Visa has relatively high income (€32,400/year) and savings (€30,000) requirements", "Elective Residency Visa requires high passive income (€31,000+/year) and strictly prohibits working", "HNWI flat tax raised to €300,000 in January 2026 — less attractive than before", "Healthcare quality varies significantly between North and South", "Major cities (Milan, Rome, Florence) are expensive"]}
      },
      "cta": {"title": "Ready to make your move?", "subtitle": "Use our free tool to compare Italy with other European countries and find the best fit for your situation.", "button": "Compare all countries →"}
    }
  },
  "bulgaria": {
    "country": "Bulgaria",
    "hero": {
      "badge": "Bulgaria", "title": "Move to Bulgaria",
      "subtitle": "Europe's most tax-efficient destination — a flat 10% income tax, rapidly growing expat communities, stunning nature, and a cost of living that goes further than almost anywhere else in the EU.",
      "stats": [{"label": "Flat income tax", "value": "10%"}, {"label": "Cost of living", "value": "From €700/mo"}, {"label": "EU member since", "value": "2007"}, {"label": "Official language", "value": "Bulgarian"}]
    },
    "sections": {
      "visas": {
        "eyebrow": "Visas & Residency", "title": "How to move to Bulgaria",
        "intro": "EU/EEA citizens can move to Bulgaria freely and register their residency at the local municipality. Non-EU nationals have several routes available — Bulgaria launched its first official Digital Nomad Residence Permit in December 2025.",
        "visas": [
          {"title": "Digital Nomad Residence Permit", "badge": "Remote workers & freelancers", "points": ["Bulgaria's brand new digital nomad programme — applications opened December 20, 2025", "For non-EU nationals working remotely for employers or clients based outside the EU, EEA, and Switzerland", "Minimum income requirement: €31,000/year (50x Bulgaria's minimum monthly wage)", "Three eligible categories: employed remote workers, freelancers/contractors, and company owners working remotely", "Process: apply for a Type D long-stay visa at a Bulgarian consulate, then apply for the residence permit after arriving in Bulgaria", "Residence permit valid for 1 year, renewable once for a further year (maximum 2 years total)", "Does not currently provide a direct pathway to permanent residency", "Family members can be included under Bulgarian immigration regulations"]},
          {"title": "Long-Stay Type D Visa (Passive Income / Retirees)", "badge": "Retirees & passive income", "points": ["For non-EU nationals with sufficient passive income — pensions, rental income, dividends, or savings", "Must demonstrate adequate financial means to support yourself without working in Bulgaria", "Requires proof of accommodation, health insurance, and a clean criminal record", "Initial visa valid for up to 1 year, extendable as a long-term residence permit", "After 5 years of continuous legal residence, eligible for permanent residency"]},
          {"title": "Investor Visa", "badge": "Investors", "points": ["For non-EU nationals making a qualifying investment in Bulgaria", "Investment of BGN 1 million (~€510,000) in business projects or investment funds qualifies", "Grants permanent residency upon approval — one of the fastest permanent residency routes in the EU", "Eligible for Bulgarian citizenship after approximately 5 years"]},
          {"title": "EU / EEA Citizens", "badge": "Free movement", "points": ["EU/EEA citizens have the right to live and work in Bulgaria without a visa", "Must register at the local municipality within 3 months of arrival", "Will receive a registration certificate confirming EU residency rights", "After 5 years of continuous legal residence, eligible for permanent residency"]}
        ],
        "disclaimer": "Bulgaria's Digital Nomad Residence Permit is brand new (launched December 2025) and procedures are still being established. Always verify current requirements with the Bulgarian Ministry of Interior or a qualified Bulgarian immigration lawyer before applying."
      },
      "taxes": {
        "eyebrow": "Taxes", "title": "Understanding tax in Bulgaria",
        "intro": "Bulgaria has the lowest flat income tax rate in the EU at just 10% — applied to all income regardless of how much you earn. There is also a flat 10% corporate tax rate. Bulgaria joined the Eurozone in January 2026, adopting the Euro as its currency.",
        "highlight": {
          "title": "10% Flat Tax — The Lowest in the EU",
          "subtitle": "Bulgaria's flat 10% income tax is unique in the EU — there are no brackets, no progressive rates. Whether you earn €20,000 or €200,000, you pay 10%.",
          "items": [
            {"label": "Personal income tax", "value": "10% flat — on all income regardless of amount"},
            {"label": "Corporate tax", "value": "10% flat — one of the lowest corporate rates in the EU"},
            {"label": "Dividend tax", "value": "5% — very competitive for company owners"},
            {"label": "Capital gains tax", "value": "10% on most gains — some exemptions apply"}
          ]
        },
        "nomadTax": {"title": "Tax treatment for Digital Nomad Permit holders", "points": ["If you spend more than 183 days per year in Bulgaria, you become a Bulgarian tax resident", "As a Bulgarian tax resident, your worldwide income is subject to the 10% flat tax", "Bulgaria has double taxation treaties with over 70 countries", "Digital Nomad Permit holders who spend less than 183 days per year in Bulgaria may not be considered tax residents", "Tax residency rules are complex — always consult a qualified Bulgarian tax adviser"]},
        "comparison": {"title": "How Bulgaria compares to other EU countries", "brackets": [["Bulgaria", "10% (flat)"], ["Malta", "35% (max)"], ["Portugal", "48% (max)"], ["Spain", "47% (max)"], ["Italy", "43% (max)"], ["Germany", "45% (max)"], ["France", "45% (max)"]]},
        "disclaimer": "Bulgaria adopted the Euro in January 2026 and its tax landscape is evolving. Always consult a qualified Bulgarian tax adviser before making any decisions."
      },
      "costOfLiving": {
        "eyebrow": "Cost of Living", "title": "What does life in Bulgaria cost?",
        "intro": "Bulgaria remains one of the most affordable countries in the EU — though prices in Sofia have risen significantly since Euro adoption in January 2026. A single person can live comfortably on €700–€1,200/month depending on the city.",
        "euroNote": "Bulgaria adopted the Euro in January 2026. Early reports suggest prices rose 20–50% in some categories following adoption — particularly in Sofia. Verify current prices locally as the market adjusts.",
        "cities": [
          {"city": "Sofia", "level": "Most expensive", "items": ["1-bed apartment (centre): €500–€900/mo", "Single person budget: €1,000–€1,500/mo", "Best for careers & city life"]},
          {"city": "Plovdiv & Varna", "level": "Mid-range", "items": ["1-bed apartment (centre): €350–€600/mo", "Single person budget: €800–€1,200/mo", "Great lifestyle at lower cost"]},
          {"city": "Bansko & smaller towns", "level": "Most affordable", "items": ["1-bed apartment: €200–€400/mo", "Single person budget: €600–€900/mo", "Popular with digital nomads"]}
        ],
        "expenses": {"title": "Typical monthly expenses in Sofia", "items": [["Rent (1-bed, city centre)", "€500 – €900"], ["Utilities (electricity, heating, water)", "€60 – €150"], ["Internet (fibre)", "€10 – €20"], ["Groceries", "€150 – €300"], ["Dining out (mid-range)", "€100 – €200"], ["Public transport pass", "€25 – €35"], ["Private health insurance", "€50 – €150"], ["Gym membership", "€20 – €40"], ["Mobile plan", "€10 – €20"]]},
        "banskoTip": "Bansko has become one of Europe's most popular digital nomad destinations — a mountain ski resort town with fast fibre internet, a thriving international community, very affordable rents, and stunning scenery."
      },
      "healthcare": {
        "eyebrow": "Healthcare", "title": "Healthcare in Bulgaria",
        "intro": "Bulgaria has a public healthcare system funded by mandatory health insurance contributions. Most expats opt for private health insurance for better access, shorter waiting times, and English-speaking doctors. Private healthcare in Bulgaria is very affordable by Western standards.",
        "public": {"title": "Public Healthcare", "points": ["Available to all legal residents who contribute to the National Health Insurance Fund (NHIF)", "Contributions are approx. 8% of salary, shared between employer and employee", "Covers GP visits, hospital care, maternity, and emergency services", "Dental care is mostly private", "Quality varies significantly — Sofia and larger cities have better facilities", "Long waiting times for specialist care are common", "EU citizens can use their EHIC for emergency treatment", "Emergency number: 112"]},
        "private": {"title": "Private Health Insurance", "points": ["Required for Digital Nomad Permit and most long-stay visa applications", "Very affordable — typically €50–€150/month per person", "A private GP visit costs just €29–€57 out of pocket — even without insurance", "Provides faster access, English-speaking doctors, and better facilities", "Popular providers: Allianz, Bupa International, AXA, local provider DZI"]},
        "tip": "Private healthcare in Bulgaria is genuinely affordable. A specialist consultation typically costs €30–€80 privately — far less than in Western Europe."
      },
      "banking": {
        "eyebrow": "Banking & Finance", "title": "Banking in Bulgaria",
        "intro": "Bulgaria adopted the Euro in January 2026, replacing the Bulgarian Lev (BGN). Banking is straightforward for residents, with several major international banks operating alongside local institutions.",
        "requirements": {"title": "What you'll need to open an account", "points": ["Valid passport or national ID", "Proof of Bulgarian address (rental contract)", "Residence permit or registration certificate", "Bulgarian personal identification number (EGN or LNC for foreigners)", "Opening deposit typically €50–€200"]},
        "banks": {"title": "Banks operating in Bulgaria", "points": ["UniCredit Bulbank — largest bank in Bulgaria, good international support", "DSK Bank — very popular with residents, wide branch network", "Fibank (First Investment Bank) — popular with expats", "OTP Bank Bulgaria — strong retail banking", "Revolut / Wise — widely used by expats and digital nomads for day-to-day banking"]},
        "tip": "Get a Revolut or Wise account before you move — it lets you spend in euros immediately while you set up your Bulgarian bank account, which can take a few weeks for non-EU residents."
      },
      "prosCons": {
        "eyebrow": "Summary", "title": "Is Bulgaria right for you?",
        "pros": {"title": "Reasons to move to Bulgaria", "points": ["Lowest flat income tax in the EU — just 10% on all income", "10% corporate tax — very attractive for entrepreneurs and company owners", "One of the most affordable countries in the EU", "Brand new Digital Nomad Residence Permit (December 2025)", "EU member state — pathway to EU residency and citizenship", "Full Schengen member since March 2024", "Now uses the Euro — no currency risk for Eurozone earners", "Bansko is one of Europe's top digital nomad hubs", "Beautiful nature — mountains, Black Sea coast, national parks", "Growing and welcoming expat communities in Sofia, Plovdiv and Bansko", "Very affordable private healthcare", "Fast and affordable internet infrastructure"]},
        "cons": {"title": "Things to consider", "points": ["Euro adoption (January 2026) has caused significant price rises — especially in Sofia", "Digital Nomad Permit is brand new — procedures still being established", "Permit only valid for 2 years maximum with no direct permanent residency pathway", "Bulgarian language uses Cyrillic script — a significant learning curve", "English is not widely spoken outside major cities and tourist areas", "Public healthcare quality is variable — private insurance strongly recommended", "Bureaucracy can be slow and complex", "Infrastructure outside major cities can be poor", "Winters in Sofia can be cold and grey"]}
      },
      "cta": {"title": "Ready to make your move?", "subtitle": "Use our free tool to compare Bulgaria with other European countries and find the best fit for your situation.", "button": "Compare all countries →"}
    }
  },
  "greece": {
    "country": "Greece",
    "hero": {
      "badge": "Greece", "title": "Move to Greece",
      "subtitle": "Mediterranean sunshine, ancient culture, and one of Europe's most affordable lifestyles — Greece has become a top destination for retirees, remote workers, and investors seeking EU residency.",
      "stats": [{"label": "Income tax (from)", "value": "9%"}, {"label": "Cost of living", "value": "From €1,150/mo"}, {"label": "EU member since", "value": "1981"}, {"label": "Official language", "value": "Greek"}]
    },
    "sections": {
      "visas": {
        "eyebrow": "Visas & Residency", "title": "How to move to Greece",
        "intro": "EU/EEA citizens can move to Greece freely with no visa required. Non-EU nationals have several strong pathways, including the Golden Visa, the Digital Nomad Visa, and the Financially Independent Person (FIP) permit. In 2026, Greece unified its visa and residence permit process under one application.",
        "visas": [
          {"title": "EU / EEA Citizens", "badge": "Free movement", "points": ["EU/EEA citizens have the right to live and work in Greece without a visa", "Register at the local municipality (KEP) upon arrival", "Obtain a Greek tax number (AFM) and social security number (AMKA) early — essential for banking, healthcare, and employment", "After 5 years of continuous legal residence, eligible for permanent residency"]},
          {"title": "Digital Nomad Visa (E33A)", "badge": "Remote workers & freelancers", "points": ["For non-EU nationals working remotely for employers or clients based outside Greece", "Minimum income requirement: €3,500/month net (after tax)", "As of February 2026 (Law 5275/2026), applications must be made from outside Greece", "Apply at a Greek consulate in your home country before travelling", "Initial permit valid for 2 years, renewable", "50% income tax exemption for up to 7 years — a major financial benefit", "Family members can be included in the application"]},
          {"title": "Financially Independent Person (FIP) Visa", "badge": "Retirees & passive income", "points": ["For non-EU nationals with sufficient passive income — pensions, dividends, rental income, or savings", "Minimum income requirement: €2,000/month (plus 20% per dependent)", "Must not work or operate a business in Greece", "Apply at a Greek consulate before travelling to Greece", "Residence permit valid for 3 years, renewable", "Greece ranked number one in the 2026 Global Retirement Index", "Special 7% flat tax on foreign pension income for qualifying retirees"]},
          {"title": "Golden Visa", "badge": "Investors", "points": ["Residency through property or other qualifying investment", "Investment thresholds under Law 5100/2024: €800,000 in Zone A (Athens, Thessaloniki, Mykonos, Santorini), €400,000 in Zone B, €250,000 for commercial-to-residential conversions", "No minimum residency requirement", "5-year renewable residence permit", "Pathway to Greek citizenship after 7 years of residency"]},
          {"title": "Startup & Tech Visa (2026)", "badge": "Founders & tech professionals", "points": ["New in 2026 — Greece launched targeted visa categories for skilled tech professionals and startup founders", "Aimed at attracting talent to Greece's growing tech and startup ecosystem", "Consult the Greek Ministry of Migration for current requirements"]}
        ],
        "disclaimer": "Greece's immigration rules have changed significantly in 2026, including the new law abolishing tourist-based Digital Nomad Visa applications. Always verify current requirements with the Greek Ministry of Migration or a qualified Greek immigration lawyer before applying."
      },
      "taxes": {
        "eyebrow": "Taxes", "title": "Understanding tax in Greece",
        "intro": "Greece uses a progressive income tax system with rates from 9% to 44%. However, the country offers some of the most generous expat tax incentives in Europe — including a 50% tax exemption for Digital Nomad Visa holders, a 7% flat tax for qualifying retirees, and a €100,000 non-dom flat tax for high-net-worth individuals.",
        "highlight": {
          "title": "2026 Income Tax Brackets",
          "subtitle": "Greece reformed its tax rates in 2026 under Law 5246/2025, cutting middle-bracket rates and raising the threshold for the top 44% rate from €40,000 to €60,000.",
          "items": [{"label": "Up to €10,000", "value": "9%"}, {"label": "€10,001 – €20,000", "value": "20%"}, {"label": "€20,001 – €30,000", "value": "26%"}, {"label": "€30,001 – €40,000", "value": "34%"}, {"label": "€40,001 – €60,000", "value": "39%"}, {"label": "Above €60,000", "value": "44%"}]
        },
        "specialRegimes": {"title": "Special expat tax regimes", "points": ["Digital Nomad Visa holders: 50% income tax exemption for up to 7 years", "Retirees transferring tax residency to Greece: 7% flat tax on all foreign pension income for up to 15 years", "High-net-worth non-doms: €100,000 annual flat tax on all worldwide foreign income for 15 years (requires €500,000 investment in Greece)", "Dividend tax: just 5% — the lowest in the EU", "Young professionals under 25: 0% tax on income up to €20,000", "Solidarity surcharge: suspended since 2023 and remains suspended in 2026"]},
        "otherTaxes": {"title": "Other key taxes", "brackets": [["Corporate income tax", "22%"], ["Dividend tax", "5% (lowest in EU)"], ["VAT (standard)", "24%"], ["Capital gains tax", "15% on most assets"], ["Social security (employee)", "14% of gross salary"], ["Social security cap", "€93,143/year"]]},
        "disclaimer": "Greek tax law changed significantly in 2026. Tax residency applies if you spend more than 183 days per year in Greece. Always consult a qualified Greek tax adviser before making any decisions."
      },
      "costOfLiving": {
        "eyebrow": "Cost of Living", "title": "What does life in Greece cost?",
        "intro": "Greece offers one of the most affordable lifestyles in Western Europe — roughly 51% cheaper than the USA. A single person can live comfortably on €1,150–€1,400/month including rent.",
        "cities": [
          {"city": "Athens", "level": "Most expensive", "items": ["1-bed apartment (centre): €700–€1,200/mo", "Single person budget: €1,400–€2,000/mo", "Best for careers, culture & city life"]},
          {"city": "Thessaloniki & Heraklion", "level": "Mid-range", "items": ["1-bed apartment (centre): €400–€700/mo", "Single person budget: €1,100–€1,500/mo", "Great lifestyle at lower cost"]},
          {"city": "Islands & smaller cities", "level": "Most affordable", "items": ["1-bed apartment: €300–€600/mo", "Single person budget: €800–€1,200/mo", "Ideal for retirees & remote workers"]}
        ],
        "expenses": {"title": "Typical monthly expenses in Athens", "items": [["Rent (1-bed, city centre)", "€700 – €1,200"], ["Utilities (electricity, heating, water)", "€80 – €150"], ["Internet (fibre)", "€20 – €35"], ["Groceries", "€200 – €350"], ["Dining out (mid-range)", "€150 – €250"], ["Public transport pass", "€30"], ["Private health insurance", "€60 – €250"], ["Gym membership", "€25 – €50"], ["Mobile plan", "€15 – €30"]]},
        "islandTip": "Greek islands like Crete, Rhodes, and Corfu offer a stunning quality of life at significantly lower costs than Athens — especially outside tourist season."
      },
      "healthcare": {
        "eyebrow": "Healthcare", "title": "Healthcare in Greece",
        "intro": "Greece has a public healthcare system (ESY) accessible to registered residents. Most expats opt for private health insurance for routine care due to waiting times and variable quality outside major cities.",
        "public": {"title": "Public Healthcare (ESY)", "points": ["Accessible to all residents registered with the social security system (EFKA/AMKA)", "Emergency care is free for all — dial 112", "EU citizens can use their EHIC for emergency treatment", "Quality varies significantly — Athens and Thessaloniki have the best hospitals", "Long waiting times for specialist appointments are common", "Prescription medications are subsidised", "Dental care is mostly private"]},
        "private": {"title": "Private Health Insurance", "points": ["Required for Digital Nomad Visa and most long-stay visa applications", "Affordable — typically €60–€250/month per person depending on age and coverage", "A private GP consultation costs just €60–€150 without insurance", "English-speaking doctors widely available in cities and tourist areas", "Popular providers: Allianz, Bupa International, AXA, local provider Interamerican"]},
        "tip": "Get your AMKA (social security number) as early as possible after arriving — it's required to access public healthcare, open a bank account, and complete most bureaucratic processes in Greece."
      },
      "banking": {
        "eyebrow": "Banking & Finance", "title": "Banking in Greece",
        "intro": "Greece uses the Euro and has a well-established banking sector regulated under EU standards. Opening a local bank account requires your AFM (tax number) and AMKA (social security number), so get these sorted first.",
        "requirements": {"title": "What you'll need to open an account", "points": ["Valid passport or national ID", "AFM (Greek tax identification number) — essential", "AMKA (social security number) — usually required", "Proof of Greek address (rental contract or utility bill)", "Residence permit or registration certificate for non-EU nationals", "Some banks require an initial deposit of €50–€300"]},
        "banks": {"title": "Banks operating in Greece", "points": ["National Bank of Greece — largest bank, wide branch and ATM network", "Piraeus Bank — popular with expats, good online banking", "Alpha Bank — strong international support", "Eurobank — reliable retail banking with English service", "Revolut / Wise — widely used by expats and digital nomads for day-to-day banking"]},
        "tip": "Get your AFM (tax number) from the local tax office (AADE) as your very first step after arriving — you'll need it for almost everything, including opening a bank account and signing a rental contract."
      },
      "prosCons": {
        "eyebrow": "Summary", "title": "Is Greece right for you?",
        "pros": {"title": "Reasons to move to Greece", "points": ["Ranked #1 in the 2026 Global Retirement Index", "50% income tax exemption for Digital Nomad Visa holders for 7 years", "7% flat tax on foreign pension income for qualifying retirees", "5% dividend tax — the lowest in the EU", "Cost of living roughly 51% lower than the USA", "EU member state — full freedom of movement and rights", "Stunning climate — 300+ days of sunshine per year", "Rich culture, history, food, and island lifestyle", "English widely spoken in cities and tourist areas", "Affordable private healthcare", "Golden Visa offers residency with no minimum stay requirement", "Growing expat and digital nomad communities in Athens and Crete"]},
        "cons": {"title": "Things to consider", "points": ["Bureaucracy is notoriously slow and complex — patience required", "Digital Nomad Visa rules changed in February 2026 — must apply before arriving", "Athens rents have risen sharply — less affordable than 5 years ago", "Public healthcare quality is variable outside major cities", "Greek language uses a different alphabet — a learning curve", "Limited job opportunities for non-Greek speakers in local employment", "Summers in Athens can be extremely hot (40°C+)", "Standard progressive tax rates (up to 44%) apply without special regime"]}
      },
      "cta": {"title": "Ready to make your move?", "subtitle": "Use our free tool to compare Greece with other European countries and find the best fit for your situation.", "button": "Compare all countries →"}
    }
  },
  "netherlands": {
    "country": "Netherlands",
    "hero": {
      "badge": "Netherlands", "title": "Move to the Netherlands",
      "subtitle": "Europe's most international nation — 95% English proficiency, world-class cycling infrastructure, and the famous 30% tax ruling that makes it one of the most financially attractive destinations for skilled professionals.",
      "stats": [{"label": "Income tax (from)", "value": "36.93%"}, {"label": "Cost of living", "value": "From €2,000/mo"}, {"label": "EU member since", "value": "1957"}, {"label": "English proficiency", "value": "95%+"}]
    },
    "sections": {
      "visas": {
        "eyebrow": "Visas & Residency", "title": "How to move to the Netherlands",
        "intro": "EU/EEA citizens move to the Netherlands freely — no visa, no permit, just register at your local municipality within 4 months. Non-EU nationals have several strong pathways, with the Highly Skilled Migrant (Kennismigrant) permit being the most common route for professionals.",
        "visas": [
          {"title": "EU / EEA Citizens", "badge": "Free movement", "points": ["EU/EEA citizens have the right to live and work in the Netherlands without a visa or permit", "Register at your local municipality (gemeente) within 4 months of arrival", "You'll receive a BSN (Burgerservicenummer) — your essential ID number for tax, healthcare, banking, and employment", "After 5 years of continuous legal residence, eligible for permanent residency", "Health insurance is mandatory for all residents"]},
          {"title": "Highly Skilled Migrant (Kennismigrant) Permit", "badge": "Skilled professionals", "points": ["The main pathway for non-EU professionals — employer-sponsored", "Requires a recognised sponsor employer (most multinationals and tech companies qualify)", "Minimum salary threshold: €4,840/month gross for applicants aged 30+ (2026)", "Lower threshold: €3,549/month for applicants under 30", "Processing time: typically 2–4 weeks — one of the fastest in Europe", "Spouse or partner receives a residence permit with unrestricted work authorisation", "Pathway to permanent residency after 5 years", "Qualifies for the 30% ruling — see tax section below"]},
          {"title": "DAFT Visa (Dutch-American Friendship Treaty)", "badge": "US citizens", "points": ["Exclusively for US citizens — allows self-employment and business ownership in the Netherlands", "Minimum investment of €4,500 in a Dutch business", "Does not require employer sponsorship", "Valid for 2 years initially, renewable", "Popular with American freelancers, consultants, and entrepreneurs", "Pathway to permanent residency after 5 years"]},
          {"title": "Orientation Year Permit", "badge": "Recent graduates", "points": ["For recent graduates from top universities worldwide", "Allows 1 year to find work or set up a business in the Netherlands", "Must have graduated within 3 years of applying", "From a university ranked in the top 200 globally", "Can transition to Highly Skilled Migrant or self-employment permit after finding work"]},
          {"title": "Family Reunification", "badge": "Partners & families", "points": ["Partners and dependent children of residents can apply for family reunification", "Partners of Highly Skilled Migrants receive unrestricted work rights", "Apply through the IND — processing typically takes 3 months"]}
        ],
        "disclaimer": "Getting your BSN number is your most critical first step — without it you cannot open a bank account, access healthcare, or be added to payroll. Register at your gemeente within 4 months of arrival. Always verify current salary thresholds with the IND (ind.nl/en) before applying."
      },
      "taxes": {
        "eyebrow": "Taxes", "title": "Understanding tax in the Netherlands",
        "intro": "The Netherlands has a two-bracket income tax system, with rates of 36.93% up to approximately €73,000 and 49.50% above that. However, the famous 30% ruling allows qualifying skilled expats to receive 30% of their gross salary tax-free for up to 5 years.",
        "highlight": {
          "title": "The 30% Ruling — Europe's Best Expat Tax Break",
          "subtitle": "Qualifying skilled migrants recruited from abroad can receive 30% of their gross salary completely tax-free for up to 5 years. For an €80,000 salary, this saves approximately €7,000–€10,000 per year in tax.",
          "items": [
            {"label": "Tax-free allowance", "value": "30% of gross salary"},
            {"label": "Maximum salary cap", "value": "€262,000 (WNT limit)"},
            {"label": "Minimum salary (30+)", "value": "€48,013/year"},
            {"label": "Minimum salary (under 30, Master's)", "value": "€36,497/year"},
            {"label": "Duration", "value": "5 years maximum"},
            {"label": "2027 onwards", "value": "Drops to 27% permanently"}
          ]
        },
        "eligibility": {"title": "30% Ruling — eligibility requirements", "points": ["Must have been recruited from abroad — lived at least 150km from the Dutch border for 16 of the 24 months before employment", "Must earn above the minimum salary threshold (€48,013/year for 30+)", "Must be employed by a recognised sponsor employer", "Apply within 4 months of starting your Dutch employment", "The ruling is still 30% in 2026 — drops permanently to 27% from 2027"]},
        "taxRates": {"title": "Key Dutch tax rates (2026)", "brackets": [["Income tax (Box 1, up to ~€73,000)", "36.93%"], ["Income tax (Box 1, above ~€73,000)", "49.50%"], ["Savings & investments (Box 3)", "Wealth-based (approx. 31–34%)"], ["Dividend / substantial interest (Box 2)", "24.5% (first €67k) / 31% above"], ["Corporate tax (up to €200,000)", "19%"], ["Corporate tax (above €200,000)", "25.8%"], ["VAT (standard)", "21%"], ["Healthcare levy (employer)", "~6.57% on gross salary"]]},
        "disclaimer": "Dutch tax residency is not determined by a simple day count — it depends on your specific circumstances. Always consult a qualified Dutch tax adviser before making decisions."
      },
      "costOfLiving": {
        "eyebrow": "Cost of Living", "title": "What does life in the Netherlands cost?",
        "intro": "The Netherlands is more expensive than Southern Europe but offers an exceptional quality of life. Amsterdam is the priciest city — but Rotterdam and Utrecht run 20–30% cheaper with comparable quality.",
        "cities": [
          {"city": "Amsterdam", "level": "Most expensive", "items": ["1-bed apartment: €1,400–€2,200/mo", "Single person budget: €2,800–€3,800/mo", "Best for finance, tech & culture"]},
          {"city": "Rotterdam & The Hague", "level": "Mid-range", "items": ["1-bed apartment: €1,000–€1,600/mo", "Single person budget: €2,000–€2,800/mo", "Modern, international, 20% cheaper"]},
          {"city": "Utrecht & Eindhoven", "level": "Best value", "items": ["1-bed apartment: €900–€1,400/mo", "Single person budget: €1,800–€2,500/mo", "Strong tech scene, great lifestyle"]}
        ],
        "expenses": {"title": "Typical monthly expenses in Amsterdam", "items": [["Rent (1-bed, city centre)", "€1,400 – €2,200"], ["Utilities (electricity, heating, water)", "€150 – €250"], ["Internet (fibre)", "€30 – €50"], ["Groceries", "€300 – €450"], ["Dining out (mid-range)", "€200 – €350"], ["Public transport pass", "€100 – €150"], ["Mandatory health insurance", "€150 – €200"], ["Gym membership", "€30 – €60"], ["Mobile plan", "€20 – €40"]]},
        "housingTip": "The Dutch housing market is among Europe's tightest — average availability is limited at around 35%. Start your housing search early, have all documents ready, and act fast when you find something. Rotterdam and Utrecht offer a much better chance of finding accommodation than Amsterdam."
      },
      "healthcare": {
        "eyebrow": "Healthcare", "title": "Healthcare in the Netherlands",
        "intro": "The Netherlands has one of the best healthcare systems in Europe — but it is not free. Health insurance is mandatory for all residents and must be arranged privately within 4 months of registering.",
        "public": {"title": "How Dutch Healthcare Works", "points": ["Health insurance (basisverzekering) is mandatory for all residents — must be arranged within 4 months of registering", "Average basic insurance cost: €150–€200/month in 2026", "Annual deductible (eigen risico): €385 — you pay the first €385 of non-GP care each year", "GP (huisarts) visits are covered — your GP is your gateway to specialist care", "Emergency number: 112", "English widely spoken by all Dutch healthcare professionals", "Ranked consistently among the top 5 healthcare systems in Europe"]},
        "private": {"title": "Practical Steps for Expats", "points": ["Get your BSN number first — required to register for health insurance", "Register with a local GP (huisarts) within your area — they manage your care", "Choose a health insurer — popular options include Zilveren Kruis, VGZ, CZ, and Menzis", "Consider supplementary insurance (aanvullende verzekering) for dental, physio, and specialist care", "If you miss the 4-month registration window, you may face backdated premiums and penalties"]},
        "warning": "Do not delay arranging your health insurance. Failing to register within 4 months of arriving can result in backdated premiums and financial penalties. Set this up immediately after getting your BSN."
      },
      "banking": {
        "eyebrow": "Banking & Finance", "title": "Banking in the Netherlands",
        "intro": "The Netherlands has a modern, efficient banking system and is one of the easiest countries in Europe for expats to open a bank account. You'll need your BSN number first — without it, most Dutch banks cannot open an account.",
        "requirements": {"title": "What you'll need to open an account", "points": ["Valid passport or national ID", "BSN (Burgerservicenummer) — essential, get this first", "Proof of Dutch address (rental contract)", "For non-EU nationals: valid residence permit", "Most major Dutch banks offer English-language service", "Online account opening available at several banks — ING and Bunq are fully digital"]},
        "banks": {"title": "Banks operating in the Netherlands", "points": ["ING — largest bank, excellent app and English service", "ABN AMRO — popular with expats and professionals", "Rabobank — strong retail banking, particularly outside cities", "SNS Bank — affordable and straightforward", "Bunq — fully digital, expat-friendly, fast to open", "Revolut / Wise — ideal while you wait for your BSN and local account"]},
        "tip": "The Netherlands is one of the most cashless societies in Europe — many shops and restaurants don't accept cash at all. Set up a contactless card (Revolut or Wise works immediately) before you arrive."
      },
      "prosCons": {
        "eyebrow": "Summary", "title": "Is the Netherlands right for you?",
        "pros": {"title": "Reasons to move to the Netherlands", "points": ["30% tax ruling — 30% of salary tax-free for 5 years for qualifying expats", "95%+ English proficiency — easiest non-English-speaking country in Europe for expats", "World-class cycling infrastructure — bikes replace cars entirely in most cities", "One of Europe's top healthcare systems", "EU member — full freedom of movement and rights", "Strong job market — finance, tech, logistics, and pharma hubs", "85% of companies accept remote work", "Highly international cities with vibrant expat communities", "Fast and efficient public transport", "Gateway to the rest of Europe — Amsterdam Schiphol is one of Europe's busiest hubs", "Partners of Highly Skilled Migrants receive full work rights"]},
        "cons": {"title": "Things to consider", "points": ["High income tax rates (36.93–49.50%) without the 30% ruling", "30% ruling drops to 27% from 2027 — factor this into long-term planning", "Housing market is extremely tight — especially in Amsterdam", "Cost of living is significantly higher than Southern Europe", "Mandatory health insurance adds €150–200/month to your expenses", "Weather is grey and rainy for much of the year", "Box 3 wealth tax can impact those with significant savings or investments", "Dutch language required for public sector jobs and full integration", "High property purchase prices — average €5,200/m²"]}
      },
      "cta": {"title": "Ready to make your move?", "subtitle": "Use our free tool to compare the Netherlands with other European countries and find the best fit for your situation.", "button": "Compare all countries →"}
    }
  },
  "romania": {
    "country": "Romania",
    "hero": {
      "badge": "Romania", "title": "Move to Romania",
      "subtitle": "Europe's best-kept secret — a flat 10% income tax, world-class internet speeds, medieval castles, and a cost of living that lets your money go twice as far as in Western Europe.",
      "stats": [{"label": "Flat income tax", "value": "10%"}, {"label": "Cost of living", "value": "From €800/mo"}, {"label": "EU member since", "value": "2007"}, {"label": "Schengen member", "value": "Since 2025"}]
    },
    "sections": {
      "visas": {
        "eyebrow": "Visas & Residency", "title": "How to move to Romania",
        "intro": "EU/EEA citizens can move to Romania freely — no visa required, just register with the local authorities if staying more than 3 months. Non-EU nationals need a long-stay Type D visa before arriving, followed by a residence permit. Romania joined Schengen in 2025.",
        "visas": [
          {"title": "EU / EEA Citizens", "badge": "Free movement", "points": ["EU/EEA citizens have the right to live and work in Romania without a visa", "Register with the General Inspectorate for Immigration (IGI) if staying more than 3 months", "Receive a Registration Certificate, typically valid for up to 5 years", "After 5 years of continuous legal residence, eligible for permanent residency", "Romania's Schengen membership (since 2025) means your Romanian residence permit allows travel across the Schengen area"]},
          {"title": "Digital Nomad Visa", "badge": "Remote workers & freelancers", "points": ["For non-EU nationals working remotely for employers or clients based outside Romania", "Minimum income requirement: approximately €4,100/month (3x Romania's national gross average salary)", "Apply at a Romanian consulate or embassy in your home country for a Type D long-stay visa", "Residence permit valid for 1 year, renewable", "Tax residency applies if you spend more than 183 days per year in Romania — 10% flat tax on worldwide income", "Family members can be included under family reunification provisions"]},
          {"title": "Long-Stay Type D Visa (Passive Income / Retirees)", "badge": "Retirees & passive income", "points": ["For non-EU nationals with sufficient passive income — pensions, rental income, dividends, or savings", "Must demonstrate adequate financial means to support yourself without working in Romania", "Initial visa valid for 90 days; apply for residence permit at IGI upon arrival", "Residence permit typically issued for 1 year, renewable annually", "After 5 years of continuous legal residence, eligible for permanent residency"]},
          {"title": "Employment Visa", "badge": "Employees", "points": ["For non-EU nationals relocating to work for a Romanian employer", "Employer must obtain a work permit on your behalf before you apply for the visa", "Residence permit issued for the duration of the employment contract, up to 1 year initially", "Romania's growing tech sector in Bucharest and Cluj-Napoca is increasingly attracting international talent"]},
          {"title": "Investor & Business Visa", "badge": "Entrepreneurs & investors", "points": ["For non-EU nationals establishing or investing in a Romanian business", "Romania's micro-enterprise tax regime (1% corporate tax on turnover up to certain thresholds) is highly attractive for entrepreneurs", "Pathway to permanent residency after 5 years", "Romania's EU membership and Schengen access make it a strategic base for business across Europe"]}
        ],
        "disclaimer": "Romanian immigration procedures can be slow and documentation-heavy. Always start the visa process well in advance and consult a qualified Romanian immigration lawyer for your specific situation. Verify all current requirements with the General Inspectorate for Immigration (igi.mai.gov.ro/en/)."
      },
      "taxes": {
        "eyebrow": "Taxes", "title": "Understanding tax in Romania",
        "intro": "Romania has one of the most attractive tax systems in the EU — a flat 10% personal income tax rate, tied with Bulgaria as the lowest in the bloc. For entrepreneurs, the micro-enterprise regime offers corporate tax as low as 1% on turnover.",
        "highlight": {
          "title": "10% Flat Tax — Tied for Lowest in the EU",
          "subtitle": "Romania's flat 10% income tax means a €100,000 earner pays the same rate as someone earning €20,000. No brackets, no complexity.",
          "items": [
            {"label": "Personal income tax", "value": "10% flat — on all income"},
            {"label": "Corporate tax (standard)", "value": "16%"},
            {"label": "Micro-enterprise tax", "value": "1% on turnover (qualifying businesses)"},
            {"label": "Dividend tax", "value": "16% (increased from 10% in 2026)"},
            {"label": "Capital gains tax", "value": "16% (increased from 10% in 2026)"},
            {"label": "VAT (standard)", "value": "19%"}
          ]
        },
        "socialContributions": {"title": "Social contributions — what employees pay", "points": ["CAS (pension insurance): 25% of gross salary — paid by employee", "CASS (health insurance): 10% of gross salary — paid by employee", "Total employee social contributions: 35% of gross salary", "Income tax of 10% is applied after deducting social contributions", "Effective take-home on €40,000 gross: approximately 58.5% (€23,400)", "Romania has double taxation treaties with over 80 countries"]},
        "comparison": {"title": "How Romania compares to other EU countries", "brackets": [["Romania", "10% (flat)"], ["Bulgaria", "10% (flat)"], ["Malta", "35% (max)"], ["Portugal", "48% (max)"], ["Spain", "47% (max)"], ["Italy", "43% (max)"], ["Netherlands", "49.5% (max)"]]},
        "disclaimer": "Romania's 2026 tax reform increased dividend and capital gains tax from 10% to 16%. Tax laws change frequently — always consult a qualified Romanian tax adviser before making decisions."
      },
      "costOfLiving": {
        "eyebrow": "Cost of Living", "title": "What does life in Romania cost?",
        "intro": "Romania offers exceptional value for expats earning Western salaries. A comfortable lifestyle in Bucharest costs around €1,000–€1,500/month, while smaller cities like Cluj-Napoca, Timișoara, and Iași are even more affordable.",
        "cities": [
          {"city": "Bucharest", "level": "Most expensive", "items": ["1-bed apartment (centre): €450–€700/mo", "Single person budget: €1,000–€1,500/mo", "Best for careers, nightlife & city life"]},
          {"city": "Cluj-Napoca & Timișoara", "level": "Mid-range", "items": ["1-bed apartment (centre): €350–€550/mo", "Single person budget: €800–€1,200/mo", "Vibrant tech & student scenes"]},
          {"city": "Iași, Brașov & smaller cities", "level": "Most affordable", "items": ["1-bed apartment: €250–€400/mo", "Single person budget: €600–€900/mo", "Beautiful scenery, lower costs"]}
        ],
        "expenses": {"title": "Typical monthly expenses in Bucharest", "items": [["Rent (1-bed, city centre)", "€450 – €700"], ["Utilities (electricity, heating, water)", "€80 – €150"], ["Internet (fibre, 1Gbps)", "€10 – €15"], ["Groceries", "€200 – €350"], ["Dining out (mid-range)", "€100 – €200"], ["Public transport pass", "€10 – €20"], ["Private health insurance", "€30 – €100"], ["Gym membership", "€20 – €40"], ["Mobile plan", "€5 – €15"]]},
        "internetTip": "Romania consistently ranks among the top 5 countries in the world for internet speed — with average home connections of 200+ Mbps available for under €15/month. For remote workers, this is a major advantage."
      },
      "healthcare": {
        "eyebrow": "Healthcare", "title": "Healthcare in Romania",
        "intro": "Romania has a public healthcare system funded through mandatory CASS contributions (10% of salary). Most expats opt for private health insurance for better access, English-speaking doctors, and shorter waiting times.",
        "public": {"title": "Public Healthcare", "points": ["Available to all legal residents who contribute to the national health system (CASS)", "Free at point of use for registered contributors", "Quality varies significantly — Bucharest and Cluj-Napoca have the best facilities", "Long waiting times for specialist appointments are common", "Emergency care is available to all — dial 112", "EU citizens can use their EHIC for emergency treatment", "Dental care is mostly private"]},
        "private": {"title": "Private Health Insurance", "points": ["Very affordable — typically €30–€100/month per person", "Provides faster access, English-speaking doctors, and better facilities", "Required for Digital Nomad Visa and most long-stay visa applications", "A private GP visit costs approximately €20–€50 without insurance", "Popular international providers: Allianz, Bupa, Cigna, AXA", "Most expats and digital nomads use private insurance exclusively"]},
        "tip": "Private healthcare in Romania is genuinely affordable. Many expats skip insurance entirely for routine care and pay out of pocket — a GP visit for €20–€50 and a specialist for €30–€80 makes this a realistic option."
      },
      "banking": {
        "eyebrow": "Banking & Finance", "title": "Banking in Romania",
        "intro": "Romania uses the Romanian Leu (RON) — it has not adopted the Euro, though Euro adoption is planned for the future. Banking is straightforward for residents, with several major international banks operating alongside local institutions.",
        "currencyNote": "Romania still uses the Romanian Leu (RON). The Leu is a relatively closed currency — it's generally easier and more cost-effective to exchange money after arriving in Romania, or to use a card with low foreign transaction fees such as Revolut or Wise.",
        "requirements": {"title": "What you'll need to open an account", "points": ["Valid passport or national ID", "Proof of Romanian address (rental contract or utility bill)", "Residence permit or registration certificate", "Romanian tax identification number (CIF/CNP) — obtain from ANAF", "Opening deposit typically €50–€200"]},
        "banks": {"title": "Banks operating in Romania", "points": ["Banca Transilvania — largest Romanian bank, wide branch network", "BCR (Erste Group) — popular with expats, strong digital banking", "BRD (Société Générale) — reliable retail banking", "ING Romania — excellent app and English-language service", "Raiffeisen Bank — strong international support", "Revolut / Wise — widely used by expats and digital nomads for day-to-day spending"]},
        "tip": "Get a Revolut or Wise account before you move — it lets you spend in RON immediately at the real exchange rate while you set up your Romanian bank account. ING Romania is particularly popular with expats for its English-language app."
      },
      "prosCons": {
        "eyebrow": "Summary", "title": "Is Romania right for you?",
        "pros": {"title": "Reasons to move to Romania", "points": ["Flat 10% income tax — tied for the lowest in the EU with Bulgaria", "Micro-enterprise corporate tax as low as 1% on turnover", "World-class internet speeds (200+ Mbps) for under €15/month", "Extremely affordable cost of living — comfortable life from €800/mo", "EU member since 2007 — full freedom of movement and rights", "Schengen member since 2025 — visa-free travel across Europe", "Growing tech and startup scene — Bucharest and Cluj-Napoca are major hubs", "Beautiful medieval cities, castles, mountains, and Black Sea coast", "Very affordable private healthcare (€30–€100/month)", "English widely spoken among younger generations and in major cities", "Digital Nomad Visa available for qualifying remote workers"]},
        "cons": {"title": "Things to consider", "points": ["High social contributions (35% of gross salary) reduce take-home pay", "Dividend and capital gains tax increased from 10% to 16% in 2026", "Bureaucracy is slow and complex — immigration paperwork can be challenging", "Romanian language is essential for full integration", "Public healthcare quality is variable — private insurance strongly recommended", "Infrastructure outside major cities can be poor — road quality is mixed", "Romania still uses the Leu (RON) — not yet on the Euro", "Corruption remains a concern in some areas of public life", "Winters in Bucharest can be cold — temperatures regularly below freezing"]}
      },
      "cta": {"title": "Ready to make your move?", "subtitle": "Use our free tool to compare Romania with other European countries and find the best fit for your situation.", "button": "Compare all countries →"}
    }
  }
}

for country_slug, data in countries.items():
    os.makedirs(f"app/countries/{country_slug}", exist_ok=True)
    with open(f"app/countries/{country_slug}/content.json", "w") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    print(f"✅ Created app/countries/{country_slug}/content.json")

print("\n🎉 All 6 remaining country content.json files created!")
print("Now run: ANTHROPIC_API_KEY=xxx bash scripts/translate-all-countries.sh")
PYEOF

echo ""
echo "✅ Part 3b complete! All 9 country content.json files are ready."
echo ""
echo "Next step — translate all countries:"
echo "   ANTHROPIC_API_KEY=your_key bash scripts/translate-all-countries.sh"
