import AboutHero from "./components/AboutHero";
import ValuesGrid from "./components/ValuesGrid";
import MembershipTiers from "@/features/home/components/MembershipTiers";
import Footer from "@/features/home/components/Footer";

export default function AboutPage() {
  return (
    <main className="flex flex-col w-full bg-[#0A0A0A] text-white">
      <AboutHero />
      <ValuesGrid />
      <MembershipTiers />
      <Footer />
    </main>
  );
}
