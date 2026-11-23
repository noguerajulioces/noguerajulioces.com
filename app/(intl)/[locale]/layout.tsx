import { notFound } from "next/navigation";
import { Document } from "@/components/Document";
import { isLocale, locales } from "@/lib/i18n";

// Every language but English, prerendered at build time; any other first segment is a 404.
export const dynamicParams = false;
export function generateStaticParams() {
  return locales.filter(l => l !== "en").map(locale => ({ locale }));
}

export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <Document locale={locale}>{children}</Document>;
}
