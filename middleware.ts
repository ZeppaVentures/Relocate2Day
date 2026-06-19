import { NextRequest, NextResponse } from "next/server";

const LOCALES = ["en", "es", "pt", "zh"];

// Map of country codes to locale, used only to SET the initial cookie
// on first visit — never used to redirect or rewrite URLs.
const COUNTRY_LOCALE_MAP: Record<string, string> = {
  BR: "pt", PT: "pt", AO: "pt", MZ: "pt",
  ES: "es", MX: "es", AR: "es", CO: "es", CL: "es", PE: "es",
  VE: "es", EC: "es", GT: "es", CU: "es", BO: "es", DO: "es",
  HN: "es", PY: "es", SV: "es", NI: "es", CR: "es", PA: "es", UY: "es",
  CN: "zh", TW: "zh", SG: "zh", HK: "zh",
};

function detectLocale(request: NextRequest): string | null {
  const country = request.headers.get("x-country") ||
                  request.headers.get("cf-ipcountry") ||
                  request.headers.get("x-vercel-ip-country");
  if (country && COUNTRY_LOCALE_MAP[country]) return COUNTRY_LOCALE_MAP[country];

  const acceptLang = request.headers.get("accept-language") || "";
  if (acceptLang.startsWith("es")) return "es";
  if (acceptLang.startsWith("pt")) return "pt";
  if (acceptLang.startsWith("zh")) return "zh";

  return null;
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/images") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // No redirects — every route lives at its real path (/countries/spain, not /es/countries/spain).
  // We only set a NEXT_LOCALE cookie on first visit if the user doesn't have one yet,
  // so client-side translation hooks can pick the right language automatically.
  const response = NextResponse.next();

  const hasLocaleCookie = request.cookies.get("NEXT_LOCALE")?.value;
  if (!hasLocaleCookie) {
    const detected = detectLocale(request);
    if (detected && LOCALES.includes(detected)) {
      response.cookies.set("NEXT_LOCALE", detected, { path: "/", maxAge: 31536000 });
    }
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next|api|images|favicon.ico).*)"],
};
