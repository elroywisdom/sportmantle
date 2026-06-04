import ProjectsHero from "./components/ProjectsHero";
import ProjectsGrid from "./components/ProjectsGrid";
import MembershipTiers from "@/features/home/components/MembershipTiers";
import Footer from "@/features/home/components/Footer";

export default function ProjectsPage() {
  return (
    <main className="flex flex-col w-full">
      <ProjectsHero />
      <ProjectsGrid />
      <MembershipTiers />
      <Footer />
    </main>
  );
}
