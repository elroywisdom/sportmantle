import Hero from "./components/Hero";
import AboutPreview from "./components/AboutPreview";
import MissionPillars from "./components/MissionPillars";
import ImpactStats from "./components/ImpactStats";
import Timeline from "./components/Timeline";
import LatestProjects from "./components/LatestProjects";
import MembershipTiers from "./components/MembershipTiers";
import Footer from "./components/Footer";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black">
      <div className="relative">
        <Hero />
        <AboutPreview />
        <MissionPillars />
        <ImpactStats />
        <LatestProjects />
        <MembershipTiers />
      </div>
      <Footer />
    </main>
  );
}
