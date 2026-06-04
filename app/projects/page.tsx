import ProjectsPage from "@/features/projects";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects | Sportmantle",
  description: "Explore our global missions, tournaments, and community outreach projects.",
};

export default function Page() {
  return <ProjectsPage />;
}
