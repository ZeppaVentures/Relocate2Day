import { MetadataRoute } from "next";

const LOCALES = ["en", "es", "pt", "zh"] as const;
const BASE_URL = "https://relocate2day.com";

const COUNTRIES = [
  "spain", "gibraltar", "portugal", "italy", "malta",
  "bulgaria", "greece", "netherlands", "romania",
];

const STATIC_ROUTES: { path: string; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]; priority: number }[] = [
  { path: "",              changeFrequency: "weekly",  priority: 1   },
  { path: "/blog",         changeFrequency: "daily",   priority: 0.9 },
  { path: "/checklist",    changeFrequency: "monthly", priority: 0.6 },
  { path: "/tax-calculator", changeFrequency: "monthly", priority: 0.6 },
  { path: "/image-credits", changeFrequency: "yearly",  priority: 0.3 },
];

function languageAlternates(path: string): Record<string, string> {
  const alternates: Record<string, string> = {};
  for (const locale of LOCALES) alternates[locale] = `${BASE_URL}/${locale}${path}`;
  alternates["x-default"] = `${BASE_URL}/en${path}`;
  return alternates;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const route of STATIC_ROUTES) {
    for (const locale of LOCALES) {
      entries.push({
        url: `${BASE_URL}/${locale}${route.path}`,
        lastModified: new Date(),
        changeFrequency: route.changeFrequency,
        priority: route.priority,
        alternates: { languages: languageAlternates(route.path) },
      });
    }
  }

  for (const country of COUNTRIES) {
    for (const locale of LOCALES) {
      entries.push({
        url: `${BASE_URL}/${locale}/countries/${country}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
        alternates: { languages: languageAlternates(`/countries/${country}`) },
      });
    }
  }

  return entries;
}
