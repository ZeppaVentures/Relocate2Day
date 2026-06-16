#!/bin/bash
# Translates all 9 country pages
# Run: ANTHROPIC_API_KEY=xxx bash scripts/translate-all-countries.sh

set -e
COUNTRIES=("spain" "portugal" "italy" "gibraltar" "malta" "bulgaria" "greece" "netherlands" "romania")

for country in "${COUNTRIES[@]}"; do
  echo ""
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo "🌍 Processing: $country"
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  ANTHROPIC_API_KEY=$ANTHROPIC_API_KEY npx tsx scripts/translate-country.ts --country=$country
  sleep 2
done

echo ""
echo "🎉 All 9 countries translated!"
