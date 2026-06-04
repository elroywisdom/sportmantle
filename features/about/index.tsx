import AboutHero from "./components/AboutHero";
import StorySection from "./components/StorySection";
import ValuesGrid from "./components/ValuesGrid";
import MembershipTiers from "@/features/home/components/MembershipTiers";
import Footer from "@/features/home/components/Footer";

export default function AboutPage() {
  return (
    <main className="flex flex-col w-full">
      <AboutHero />
      <StorySection />
      <ValuesGrid />
      <MembershipTiers />
      <Footer />
    </main>
  );
}
