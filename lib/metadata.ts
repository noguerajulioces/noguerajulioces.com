import type { Metadata } from "next";
import { site } from "@/data/site";
import { localeInfo, locales, type Locale } from "@/lib/i18n";
import { messages } from "@/messages";

// <title>, description, OpenGraph and hreflang alternates for one language of the page.
export function pageMetadata(locale: Locale): Metadata {
  const { title, description } = messages[locale].meta;
  const url = localeInfo[locale].path;
  return {
    metadataBase: new URL(site.url),
    title,
    description,
    alternates: {
      canonical: url,
      languages: { ...Object.fromEntries(locales.map(l => [l, localeInfo[l].path])), "x-default": localeInfo.en.path },
    },
    openGraph: {
      type: "website",
      url,
      siteName: site.name,
      title,
      description,
      locale: localeInfo[locale].og,
      alternateLocale: locales.filter(l => l !== locale).map(l => localeInfo[l].og),
    },
  };
}
