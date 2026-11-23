import type { ReactNode } from "react";
import { Document } from "@/components/Document";

// English lives at the root ("/"); other languages are under app/(intl)/[locale].
export default function EnglishLayout({ children }: { children: ReactNode }) {
  return <Document locale="en">{children}</Document>;
}
