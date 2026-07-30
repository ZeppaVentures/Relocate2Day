import type { Metadata } from "next";
import { getCountryMetadata } from "@/lib/countryMetadata";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const meta = getCountryMetadata("italy", locale);
  return { title: meta.title, description: meta.description };
}

export default function ItalyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
