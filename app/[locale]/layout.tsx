import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getHomeMetadata } from "@/lib/countryMetadata";

const LOCALES = ["en", "es", "pt", "zh"];

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const meta = getHomeMetadata(locale);
  return { title: meta.title, description: meta.description };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!LOCALES.includes(locale)) notFound();
  return children;
}
