import AboutHero from "./components/AboutHero";
import StorySection from "./components/StorySection";
import ValuesGrid from "./components/ValuesGrid";
import VisionaryProfile from "./components/VisionaryProfile";
import MovementGallery from "./components/MovementGallery";
import MembershipTiers from "@/features/home/components/MembershipTiers";
import Footer from "@/features/home/components/Footer";

export default function AboutPage() {
  return (
    <main className="flex flex-col w-full bg-[#0A0A0A] text-white">
      <AboutHero />
      <StorySection />
      <ValuesGrid />
      <VisionaryProfile />
      <MovementGallery />
      <MembershipTiers />
      <Footer />
    </main>
  );
}
