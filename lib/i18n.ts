import { useRouter } from "next/router";

export type Locale = "en" | "es" | "pt" | "zh";

export function useTranslations() {
  const router = useRouter();
  const locale = (router.locale || "en") as Locale;
  
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const messages = require(`../messages/${locale}.json`);
  
  function t(key: string, vars?: Record<string, string>): string {
    const keys = key.split(".");
    let value: unknown = messages;
    for (const k of keys) {
      if (value && typeof value === "object" && k in (value as Record<string, unknown>)) {
        value = (value as Record<string, unknown>)[k];
      } else {
        return key; // fallback to key if not found
      }
    }
    let result = typeof value === "string" ? value : key;
    if (vars) {
      Object.entries(vars).forEach(([k, v]) => {
        result = result.replace(`{{${k}}}`, v);
      });
    }
    return result;
  }

  return { t, locale };
}

export function getStaticI18nProps(locale: string) {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const messages = require(`../messages/${locale}.json`);
  return { props: { messages, locale } };
}
