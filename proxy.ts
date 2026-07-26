import { NextRequest, NextResponse } from "next/server";

const LOCALES = ["en", "es", "pt", "zh"];
const DEFAULT_LOCALE = "en";

const COUNTRY_LOCALE_MAP: Record<string, string> = {
  BR: "pt", PT: "pt", AO: "pt", MZ: "pt",
  ES: "es", MX: "es", AR: "es", CO: "es", CL: "es", PE: "es",
  VE: "es", EC: "es", GT: "es", CU: "es", BO: "es", DO: "es",
  HN: "es", PY: "es", SV: "es", NI: "es", CR: "es", PA: "es", UY: "es",
  CN: "zh", TW: "zh", SG: "zh", HK: "zh",
};

function detectLocale(request: NextRequest): string {
  const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;
  if (cookieLocale && LOCALES.includes(cookieLocale)) return cookieLocale;

  const country = request.headers.get("x-country") ||
                  request.headers.get("cf-ipcountry") ||
                  request.headers.get("x-vercel-ip-country");
  if (country && COUNTRY_LOCALE_MAP[country]) return COUNTRY_LOCALE_MAP[country];

  const acceptLang = request.headers.get("accept-language") || "";
  if (acceptLang.startsWith("es")) return "es";
  if (acceptLang.startsWith("pt")) return "pt";
  if (acceptLang.startsWith("zh")) return "zh";

  return DEFAULT_LOCALE;
}

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/images") ||
    pathname.startsWith("/auth/callback") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const segments = pathname.split("/");
  const firstSegment = segments[1];

  if (LOCALES.includes(firstSegment)) {
    const response = NextResponse.next();
    if (request.cookies.get("NEXT_LOCALE")?.value !== firstSegment) {
      response.cookies.set("NEXT_LOCALE", firstSegment, { path: "/", maxAge: 31536000 });
    }
    response.headers.set("x-locale", firstSegment);
    return response;
  }

  const locale = detectLocale(request);
  const newUrl = request.nextUrl.clone();
  newUrl.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  const response = NextResponse.redirect(newUrl);
  response.cookies.set("NEXT_LOCALE", locale, { path: "/", maxAge: 31536000 });
  return response;
}

export const config = {
  matcher: ["/((?!_next|api|images|favicon.ico).*)"],
};
