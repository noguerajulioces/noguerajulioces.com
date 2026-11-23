import { Portfolio } from "@/components/Portfolio";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("en");

export default function Home() {
  return <Portfolio locale="en" />;
}
