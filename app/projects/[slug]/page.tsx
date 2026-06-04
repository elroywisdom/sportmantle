import { Metadata } from "next";
import { allProjects } from "@/shared/data/projects";
import { notFound } from "next/navigation";
import ProjectDetailsClient from "@/features/projects/components/ProjectDetailsClient";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return allProjects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = allProjects.find((p) => p.slug === slug);
  if (!project) return {};

  return {
    title: `${project.title} | Sportmantle`,
    description: project.description,
    openGraph: {
      title: `${project.title} | Sportmantle`,
      description: project.description,
      images: [{ url: project.image }],
    },
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = allProjects.find((p) => p.slug === slug);
  if (!project) {
    notFound();
  }

  // Find next project for the continuous loop
  const currentIndex = allProjects.findIndex((p) => p.id === project.id);
  const nextProject = allProjects[(currentIndex + 1) % allProjects.length];

  return <ProjectDetailsClient project={project} nextProject={nextProject} />;
}
