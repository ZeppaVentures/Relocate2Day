"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import type { ComponentProps } from "react";

const LOCALES = ["en", "es", "pt", "zh"];

function localize(href: string, locale: string): string {
  if (!href.startsWith("/")) return href;
  const alreadyPrefixed = LOCALES.some(
    (l) => href === `/${l}` || href.startsWith(`/${l}/`) || href.startsWith(`/${l}#`) || href.startsWith(`/${l}?`)
  );
  if (alreadyPrefixed) return href;
  if (href === "/") return `/${locale}`;
  return `/${locale}${href}`;
}

type LocaleLinkProps = ComponentProps<typeof Link>;

export default function LocaleLink({ href, ...props }: LocaleLinkProps) {
  const params = useParams();
  const locale = (params?.locale as string) || "en";
  const finalHref = typeof href === "string" ? localize(href, locale) : href;
  return <Link href={finalHref} {...props} />;
}
