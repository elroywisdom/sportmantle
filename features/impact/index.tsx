import ImpactHero from "./components/ImpactHero";
import DetailedMetrics from "./components/DetailedMetrics";
import SuccessStories from "./components/SuccessStories";
import Timeline from "./components/Timeline";
import MembershipTiers from "@/features/home/components/MembershipTiers";
import Footer from "@/features/home/components/Footer";

export default function ImpactPage() {
  return (
    <main className="flex flex-col w-full">
      <ImpactHero />
      <DetailedMetrics />
      <Timeline />
      <SuccessStories />
      <MembershipTiers />
      <Footer />
    </main>
  );
}
