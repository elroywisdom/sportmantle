import { Metadata } from "next";
import { allProjects, Project } from "@/shared/data/projects";
import { notFound } from "next/navigation";
import ProjectDetailsClient from "@/features/projects/components/ProjectDetailsClient";
import { getProjectBySlug, getAllProjects } from "@/sanity/lib/queries";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const sanityProjects = await getAllProjects();
  if (sanityProjects && sanityProjects.length > 0) {
    return sanityProjects.map((project: any) => ({
      slug: project.slug,
    }));
  }

  return allProjects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const sanityProject = await getProjectBySlug(slug);
  const fallbackProject = allProjects.find((p) => p.slug === slug);
  const project = sanityProject || fallbackProject;
  if (!project) return {};

  const coverUrl =
    project.image || project.coverImage || "/Images/athletes-impact.png";

  return {
    title: `${project.title} | Sportmantle`,
    description: project.description,
    openGraph: {
      title: `${project.title} | Sportmantle`,
      description: project.description,
      images: [{ url: coverUrl }],
    },
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const sanityProject = await getProjectBySlug(slug);
  const fallbackProject = allProjects.find((p) => p.slug === slug);
  const rawProject = sanityProject || fallbackProject;

  if (!rawProject) {
    notFound();
  }

  // Normalize project structure for resilient rendering
  const normalizedGallery = Array.isArray(rawProject.gallery)
    ? rawProject.gallery
        .map((item: any) => (typeof item === "string" ? item : item?.src))
        .filter(Boolean)
    : [];

  const project: Project = {
    id: rawProject.id || rawProject._id || 1,
    slug: rawProject.slug,
    title: rawProject.title,
    date: rawProject.date || "",
    year: rawProject.year || "2026",
    category: (rawProject.category as any) || "Prayer",
    tags: rawProject.tags || [],
    image: rawProject.image || rawProject.coverImage || "",
    gallery: normalizedGallery.length > 0 ? normalizedGallery : [rawProject.image || rawProject.coverImage].filter(Boolean),
    description: rawProject.description || "",
    fullStory: rawProject.fullStory || "",
    featuredQuote: rawProject.featuredQuote,
    details: rawProject.details || {
      location: "",
      attendance: "",
      impact: "",
      partners: "",
    },
    titleColor: rawProject.titleColor || "text-white",
    contentSections: rawProject.contentSections || [],
  };

  // Find next project for continuous loop
  const currentIndex = allProjects.findIndex((p) => p.slug === project.slug);
  const nextProject =
    currentIndex >= 0
      ? allProjects[(currentIndex + 1) % allProjects.length]
      : allProjects[0];

  return <ProjectDetailsClient project={project} nextProject={nextProject} />;
}
