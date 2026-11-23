// The site's languages. The URL is the source of truth: "/" is English, every other locale lives under "/<locale>".
export const locales = ["en", "es", "pt"] as const;
export type Locale = (typeof locales)[number];

export const localeInfo: Record<Locale, { path: string; name: string; flag: string; intl: string; og: string }> = {
  en: { path: "/", name: "English", flag: "us", intl: "en-US", og: "en_US" },
  es: { path: "/es", name: "Español", flag: "es", intl: "es-PY", og: "es_PY" },
  pt: { path: "/pt", name: "Português", flag: "br", intl: "pt-BR", og: "pt_BR" },
};

export const isLocale = (value: string): value is Locale => (locales as readonly string[]).includes(value);
