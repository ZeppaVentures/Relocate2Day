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
