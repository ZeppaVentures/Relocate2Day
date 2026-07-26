#!/bin/bash
set -e
echo "🌍 Adding LanguageSwitcher to homepage header..."

python3 << 'EOF'
with open("app/page.tsx", "r") as f:
    content = f.read()

# 1. Add the import
old = 'import { useTranslations } from "@/lib/useTranslations";'
new = '''import { useTranslations } from "@/lib/useTranslations";
import LanguageSwitcher from "@/components/LanguageSwitcher";'''
content = content.replace(old, new, 1)

# 2. Add it to the desktop header, right before the Log in / Get started buttons
old = '''          <div className="hidden md:flex items-center gap-4">
            {user ? ('''
new = '''          <div className="hidden md:flex items-center gap-4">
            <LanguageSwitcher />
            {user ? ('''
content = content.replace(old, new, 1)

# 3. Add it to the mobile menu too, right before the Log in / Get started buttons
old = '''            <div className="px-6 py-8 border-t border-gray-100 flex flex-col gap-4">
              {user ? ('''
new = '''            <div className="px-6 py-8 border-t border-gray-100 flex flex-col gap-4">
              <LanguageSwitcher />
              {user ? ('''
content = content.replace(old, new, 1)

with open("app/page.tsx", "w") as f:
    f.write(content)

print("✅ LanguageSwitcher added to homepage header (desktop + mobile)")
EOF

echo ""
echo "Next steps:"
echo "   git add app/page.tsx"
echo "   git commit -m 'feat: add language switcher to homepage navbar'"
echo "   git push"
