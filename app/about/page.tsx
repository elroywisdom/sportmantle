import AboutPage from "@/features/about";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Sportmantle",
  description: "Learn about our mandate, our mission, and the story behind the mantle of grace.",
};

export default function Page() {
  return <AboutPage />;
}
