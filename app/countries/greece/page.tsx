"use client";

import { useEffect, useState } from "react";
import CountryPageTemplate, { CountryContent } from "@/components/CountryPageTemplate";

import contentEn from "./content.json";
import contentEs from "./content.es.json";
import contentPt from "./content.pt.json";
import contentZh from "./content.zh.json";

const sectionLabels = (locale: string) => [
  { id: "visas", label: locale === "es" ? "Visas y Residencia" : locale === "pt" ? "Vistos e Residência" : locale === "zh" ? "签证与居留" : "Visas & Residency" },
  { id: "taxes", label: locale === "es" ? "Impuestos" : locale === "pt" ? "Impostos" : locale === "zh" ? "税务" : "Taxes" },
  { id: "cost-of-living", label: locale === "es" ? "Coste de Vida" : locale === "pt" ? "Custo de Vida" : locale === "zh" ? "生活成本" : "Cost of Living" },
  { id: "healthcare", label: locale === "es" ? "Sanidad" : locale === "pt" ? "Saúde" : locale === "zh" ? "医疗" : "Healthcare" },
  { id: "banking", label: locale === "es" ? "Banca y Finanzas" : locale === "pt" ? "Bancos e Finanças" : locale === "zh" ? "银行与金融" : "Banking & Finance" },
  { id: "pros-cons", label: locale === "es" ? "¿Es Grecia para ti?" : locale === "pt" ? "A Grécia é para si?" : locale === "zh" ? "希腊适合你吗？" : "Is Greece right for you?" },

];

export default function GreecePage() {
  const [locale, setLocale] = useState("en");
  const [content, setContent] = useState<CountryContent>(contentEn as CountryContent);

  useEffect(() => {
    const path = window.location.pathname;
    let detected = "en";
    if (path.startsWith("/es")) detected = "es";
    else if (path.startsWith("/pt")) detected = "pt";
    else if (path.startsWith("/zh")) detected = "zh";
    else {
      const cookie = document.cookie.match(/NEXT_LOCALE=([^;]+)/);
      if (cookie) detected = cookie[1];
    }
    setLocale(detected);
    if (detected === "es") setContent(contentEs as CountryContent);
    else if (detected === "pt") setContent(contentPt as CountryContent);
    else if (detected === "zh") setContent(contentZh as CountryContent);
    else setContent(contentEn as CountryContent);
  }, []);

  return (
    <CountryPageTemplate
      content={content}
      heroImage="/images/countries/greece-hero.jpg"
      slug="greece"
      sectionLabels={sectionLabels(locale)}
      zhDisclaimer={locale === "zh"}
    />
  );
}
