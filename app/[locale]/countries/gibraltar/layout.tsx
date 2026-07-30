import type { Metadata } from "next";
import { getCountryMetadata } from "@/lib/countryMetadata";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const meta = getCountryMetadata("gibraltar", locale);
  return { title: meta.title, description: meta.description };
}

export default function GibraltarLayout({ children }: { children: React.ReactNode }) {
  return children;
}
