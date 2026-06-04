import ImpactPage from "@/features/impact";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impact | Sportmantle",
  description: "Explore the global impact of our sports missions and the lives transformed through the Gospel.",
};

export default function Page() {
  return <ImpactPage />;
}
