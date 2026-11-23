import { notFound } from "next/navigation";
import { Portfolio } from "@/components/Portfolio";
import { isLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  return isLocale(locale) ? pageMetadata(locale) : {};
}

export default async function LocalePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <Portfolio locale={locale} />;
}
