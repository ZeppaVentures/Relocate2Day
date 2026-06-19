import { NextRequest, NextResponse } from "next/server";

const LOCALES = ["en", "es", "pt", "zh"];

// Map of country codes to locale
const COUNTRY_LOCALE_MAP: Record<string, string> = {
  // Portuguese
  BR: "pt", PT: "pt", AO: "pt", MZ: "pt",
  // Spanish
  ES: "es", MX: "es", AR: "es", CO: "es", CL: "es", PE: "es",
  VE: "es", EC: "es", GT: "es", CU: "es", BO: "es", DO: "es",
  HN: "es", PY: "es", SV: "es", NI: "es", CR: "es", PA: "es", UY: "es",
  // Mandarin
  CN: "zh", TW: "zh", SG: "zh", HK: "zh",
};

function getLocaleFromRequest(request: NextRequest): string {
  // 1. Check if locale already in cookie (user preference)
  const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;
  if (cookieLocale && LOCALES.includes(cookieLocale)) return cookieLocale;

  // 2. Check country from Netlify/Cloudflare geo header
  const country = request.headers.get("x-country") || 
                  request.headers.get("cf-ipcountry") ||
                  request.headers.get("x-vercel-ip-country");
  if (country && COUNTRY_LOCALE_MAP[country]) return COUNTRY_LOCALE_MAP[country];

  // 3. Check Accept-Language header
  const acceptLang = request.headers.get("accept-language") || "";
  if (acceptLang.startsWith("es")) return "es";
  if (acceptLang.startsWith("pt")) return "pt";
  if (acceptLang.startsWith("zh")) return "zh";

  return "en";
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Skip for API routes, static files, etc.
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/images") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Check if locale already in path
  const pathnameHasLocale = LOCALES.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
  if (pathnameHasLocale) return NextResponse.next();

  // Only auto-redirect for country pages, which have locale-aware content.
  // The homepage and other pages are translated client-side and don't have
  // dedicated locale routes, so redirecting them would 404.
  const isCountryPage = pathname.startsWith("/countries/");
  if (!isCountryPage) return NextResponse.next();

  const locale = getLocaleFromRequest(request);
  if (locale === "en") return NextResponse.next();

  const newUrl = new URL(`/${locale}${pathname}`, request.url);
  newUrl.search = request.nextUrl.search;
  return NextResponse.redirect(newUrl);
}

export const config = {
  matcher: ["/((?!_next|api|images|favicon.ico).*)"],
};
