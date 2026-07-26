#!/bin/bash
set -e
echo "🌍 Fixing LanguageSwitcher routing logic..."

python3 << 'EOF'
with open("components/LanguageSwitcher.tsx", "r") as f:
    content = f.read()

old = '''  const switchLanguage = (code: string) => {
    // Set cookie
    document.cookie = `NEXT_LOCALE=${code}; path=/; max-age=31536000`;
    
    // Build new path
    const path = window.location.pathname;
    const stripped = LANGUAGES.reduce((p, lang) => {
      if (p.startsWith(`/${lang.code}`)) return p.slice(lang.code.length + 1) || "/";
      return p;
    }, path);
    
    const newPath = code === "en" ? stripped : `/${code}${stripped}`;
    window.location.href = newPath;
    setOpen(false);
  };'''

new = '''  const switchLanguage = (code: string) => {
    // Always set the cookie so client-side translation hooks (homepage, etc.) pick it up
    document.cookie = `NEXT_LOCALE=${code}; path=/; max-age=31536000`;

    const path = window.location.pathname;
    const isCountryPage = path.replace(/^\\/(es|pt|zh)/, "").startsWith("/countries/");

    if (isCountryPage) {
      // Country pages have dedicated locale routes (/es/countries/spain etc.)
      const stripped = LANGUAGES.reduce((p, lang) => {
        if (p.startsWith(`/${lang.code}`)) return p.slice(lang.code.length + 1) || "/";
        return p;
      }, path);
      const newPath = code === "en" ? stripped : `/${code}${stripped}`;
      window.location.href = newPath;
    } else {
      // Other pages (homepage etc.) are translated client-side via cookie —
      // no locale route exists, so just reload the current path.
      window.location.reload();
    }
    setOpen(false);
  };'''

content = content.replace(old, new, 1)

with open("components/LanguageSwitcher.tsx", "w") as f:
    f.write(content)

print("✅ LanguageSwitcher fixed — homepage reloads in place, country pages still route to /es /pt /zh")
EOF

echo ""
echo "Next steps:"
echo "   git add components/LanguageSwitcher.tsx"
echo "   git commit -m 'fix: stop 404 when switching language on homepage'"
echo "   git push"
