"use client";

import { useState, useEffect } from "react";

export type Locale = "en" | "es" | "pt" | "zh";

type Messages = Record<string, unknown>;

function getNestedValue(obj: Messages, key: string, vars?: Record<string, string>): string {
  const keys = key.split(".");
  let value: unknown = obj;
  for (const k of keys) {
    if (value && typeof value === "object" && k in (value as Record<string, unknown>)) {
      value = (value as Record<string, unknown>)[k];
    } else return key;
  }
  let result = typeof value === "string" ? value : key;
  if (vars) Object.entries(vars).forEach(([k, v]) => { result = result.replace(`{{${k}}}`, v); });
  return result;
}

const messageCache: Record<string, Messages> = {};

async function loadMessages(locale: Locale): Promise<Messages> {
  if (messageCache[locale]) return messageCache[locale];
  try {
    const messages = await import(`../messages/${locale}.json`);
    messageCache[locale] = messages.default || messages;
    return messageCache[locale];
  } catch {
    const messages = await import(`../messages/en.json`);
    messageCache["en"] = messages.default || messages;
    return messageCache["en"];
  }
}

export function useTranslations(locale: Locale = "en") {
  const [messages, setMessages] = useState<Messages>({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoaded(false);
    loadMessages(locale).then((msgs) => {
      if (cancelled) return;
      setMessages(msgs);
      setLoaded(true);
    });
    return () => { cancelled = true; };
  }, [locale]);

  function t(key: string, vars?: Record<string, string>): string {
    if (!loaded) return "";
    return getNestedValue(messages, key, vars);
  }

  function tArray(key: string): string[] {
    if (!loaded) return [];
    const keys = key.split(".");
    let value: unknown = messages;
    for (const k of keys) {
      if (value && typeof value === "object" && k in (value as Record<string, unknown>)) {
        value = (value as Record<string, unknown>)[k];
      } else return [];
    }
    return Array.isArray(value) ? value.map(String) : [];
  }

  function tObject(key: string): Record<string, string> {
    if (!loaded) return {};
    const keys = key.split(".");
    let value: unknown = messages;
    for (const k of keys) {
      if (value && typeof value === "object" && k in (value as Record<string, unknown>)) {
        value = (value as Record<string, unknown>)[k];
      } else return {};
    }
    return typeof value === "object" && value !== null ? value as Record<string, string> : {};
  }

  return { t, tArray, tObject, locale, loaded };
}
