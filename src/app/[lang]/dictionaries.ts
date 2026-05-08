import "server-only";

const dictionaries = {
  tr: () => import("./dictionaries/tr.json").then((m) => m.default),
  en: () => import("./dictionaries/en.json").then((m) => m.default),
  ar: () => import("./dictionaries/ar.json").then((m) => m.default),
};

export type Locale = keyof typeof dictionaries;
export const LOCALES: Locale[] = ["tr", "en", "ar"];
export const DEFAULT_LOCALE: Locale = "tr";

export const hasLocale = (lang: string): lang is Locale => lang in dictionaries;

export const getDictionary = async (lang: Locale) => dictionaries[lang]();
export type Dictionary = Awaited<ReturnType<typeof getDictionary>>;
