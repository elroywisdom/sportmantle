"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Calendar, MapPin, Sparkles, Users, Award, X, ShieldAlert } from "lucide-react";
import { Project } from "@/shared/data/projects";
import Footer from "@/features/home/components/Footer";

interface ProjectDetailsClientProps {
  project: Project;
  nextProject: Project;
}

export default function ProjectDetailsClient({ project, nextProject }: ProjectDetailsClientProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  
  const heroRef = useRef<HTMLDivElement>(null);
  const specsRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const nextBannerRef = useRef<HTMLDivElement>(null);

  // GSAP Entrance Animations
  useEffect(() => {
    // Parallax effect on hero background scroll
    const heroBg = heroRef.current?.querySelector(".hero-bg");
    if (heroBg) {
      const handleScroll = () => {
        const scrolled = window.scrollY;
        gsap.to(heroBg, {
          y: scrolled * 0.4,
          duration: 0.1,
          overwrite: "auto",
        });
      };
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  useEffect(() => {
    // Animate content on mount
    const ctx = gsap.context(() => {
      // Fade in hero elements
      gsap.fromTo(
        ".hero-fade",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, stagger: 0.15, ease: "power3.out" }
      );

      // Stagger stats cards in bento grid
      if (specsRef.current) {
        gsap.fromTo(
          specsRef.current.children,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: specsRef.current,
              start: "top 85%",
            },
          }
        );
      }

      // Animate story sections
      if (storyRef.current) {
        gsap.fromTo(
          storyRef.current.querySelectorAll(".story-anim"),
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: storyRef.current,
              start: "top 80%",
            },
          }
        );
      }

      // Stagger gallery items
      if (galleryRef.current) {
        gsap.fromTo(
          galleryRef.current.querySelectorAll(".gallery-item"),
          { scale: 0.9, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 1,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: galleryRef.current,
              start: "top 85%",
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, [project.slug]);

  // Handle keyboard interaction for Lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowRight") {
        setLightboxIndex((prev) => (prev !== null ? (prev + 1) % project.gallery.length : null));
      }
      if (e.key === "ArrowLeft") {
        setLightboxIndex((prev) => (prev !== null ? (prev - 1 + project.gallery.length) % project.gallery.length : null));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, project.gallery.length]);

  return (
    <main className="min-h-screen bg-black text-white selection:bg-[#E30A0A] selection:text-white">
      {/* Noise Overlay */}
      <div className="noise-overlay pointer-events-none opacity-20" />

      {/* Hero Header */}
      <section 
        ref={heroRef}
        className="relative w-full h-[85vh] flex items-end justify-start overflow-hidden py-20 px-6 md:px-12 lg:px-20 border-b border-white/10"
      >
        {/* Background Parallax Image with Overlay */}
        <div className="absolute inset-0 z-0 hero-bg">
          <Image
            src={project.image}
            alt={project.title}
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/35 z-10" />
        </div>

        {/* Content Box */}
        <div className="relative z-20 max-w-[85rem] w-full mx-auto space-y-6">
          <div className="hero-fade inline-flex items-center gap-2.5 bg-[#E30A0A]/10 border border-[#E30A0A]/30 px-5 py-2 rounded-full text-sm font-bold uppercase tracking-widest text-[#E30A0A]">
            <Sparkles className="size-4 animate-pulse" />
            {project.category}
          </div>
          
          <h1 className={`hero-fade text-[3.5rem] md:text-[5.5rem] lg:text-[7.5rem] font-black uppercase tracking-tighter leading-[0.8] scale-y-[1.2] origin-bottom font-display ${project.titleColor}`}>
            {project.title}
          </h1>

          <div className="hero-fade flex flex-wrap gap-3 items-center pt-2">
            {project.tags.map((tag) => (
              <span key={tag} className="px-5 py-2 text-xs font-black uppercase tracking-widest bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-colors duration-300">
                {tag}
              </span>
            ))}
          </div>

          <div className="hero-fade pt-8 flex items-center gap-3">
            <Link 
              href="/projects" 
              className="inline-flex items-center gap-3 font-black uppercase tracking-widest text-sm text-white/60 hover:text-white transition-colors group"
            >
              <ArrowLeft className="size-5 group-hover:-translate-x-1.5 transition-transform" />
              Back to all projects
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 right-6 md:right-12 lg:right-20 z-20 flex flex-col items-center gap-2">
          <span className="text-[0.65rem] font-black uppercase tracking-widest text-white/40 writing-mode-vertical">Scroll</span>
          <div className="w-[1px] h-12 bg-white/20 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-[#E30A0A] animate-scroll-line" />
          </div>
        </div>
      </section>

      {/* Specs Bento Grid */}
      <section className="py-20 px-6 md:px-12 lg:px-20 max-w-[85rem] mx-auto space-y-12">
        <h2 className="text-xl md:text-2xl font-black uppercase tracking-widest text-white/50 border-l-2 border-[#E30A0A] pl-4">
          Project Quick Specs
        </h2>

        <div ref={specsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Grid Item 1: Location */}
          <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-8 flex flex-col justify-between group hover:border-white/20 transition-all duration-300 hover:-translate-y-1">
            <div className="flex justify-between items-start pb-6">
              <span className="text-xs font-black uppercase tracking-widest text-white/45">Location</span>
              <div className="p-3 bg-white/5 rounded-xl border border-white/10 group-hover:bg-[#E30A0A]/10 group-hover:border-[#E30A0A]/30 transition-colors duration-300">
                <MapPin className="size-5 text-[#E30A0A]" />
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-xl md:text-2xl font-black tracking-tight leading-snug font-display">
                {project.details.location}
              </p>
            </div>
          </div>

          {/* Grid Item 2: Timeline */}
          <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-8 flex flex-col justify-between group hover:border-white/20 transition-all duration-300 hover:-translate-y-1">
            <div className="flex justify-between items-start pb-6">
              <span className="text-xs font-black uppercase tracking-widest text-white/45">Date / Timeline</span>
              <div className="p-3 bg-white/5 rounded-xl border border-white/10 group-hover:bg-[#E30A0A]/10 group-hover:border-[#E30A0A]/30 transition-colors duration-300">
                <Calendar className="size-5 text-[#E30A0A]" />
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-xl md:text-2xl font-black tracking-tight leading-snug font-display">
                {project.date}
              </p>
              <p className="text-sm text-white/50 font-bold uppercase tracking-wider">
                Year: {project.year}
              </p>
            </div>
          </div>

          {/* Grid Item 3: Attendance */}
          {project.details.attendance && (
            <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-8 flex flex-col justify-between group hover:border-white/20 transition-all duration-300 hover:-translate-y-1">
              <div className="flex justify-between items-start pb-6">
                <span className="text-xs font-black uppercase tracking-widest text-white/45">Reach & Attendance</span>
                <div className="p-3 bg-white/5 rounded-xl border border-white/10 group-hover:bg-[#E30A0A]/10 group-hover:border-[#E30A0A]/30 transition-colors duration-300">
                  <Users className="size-5 text-[#E30A0A]" />
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-xl md:text-2xl font-black tracking-tight leading-snug font-display">
                  {project.details.attendance}
                </p>
              </div>
            </div>
          )}

          {/* Grid Item 4: Partners */}
          {project.details.partners && (
            <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-8 flex flex-col justify-between group hover:border-white/20 transition-all duration-300 hover:-translate-y-1 sm:col-span-2 lg:col-span-1">
              <div className="flex justify-between items-start pb-6">
                <span className="text-xs font-black uppercase tracking-widest text-white/45">Partners & Allies</span>
                <div className="p-3 bg-white/5 rounded-xl border border-white/10 group-hover:bg-[#E30A0A]/10 group-hover:border-[#E30A0A]/30 transition-colors duration-300">
                  <Award className="size-5 text-[#E30A0A]" />
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-xl md:text-2xl font-black tracking-tight leading-snug font-display">
                  {project.details.partners}
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Narrative Section (The Story) */}
      <section ref={storyRef} className="py-20 px-6 md:px-12 lg:px-20 max-w-[85rem] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start border-t border-white/5">
        {/* Left Column: Deep narrative story */}
        <div className="lg:col-span-7 space-y-8">
          <h2 className="story-anim text-2xl md:text-3xl font-black uppercase tracking-widest border-l-2 border-[#E30A0A] pl-4">
            The Mission Story
          </h2>
          <div className="story-anim text-white/70 text-lg md:text-xl leading-relaxed space-y-6 pt-2 font-light">
            {project.fullStory.split("\n\n").map((para, pIdx) => (
              <p key={pIdx}>{para}</p>
            ))}
          </div>

          {/* Impact Stats Detail */}
          {project.details.impact && (
            <div className="story-anim pt-6 space-y-3 bg-white/5 border border-white/10 p-8 rounded-2xl">
              <span className="text-xs font-black uppercase tracking-widest text-[#E30A0A]">Documented Impact & Success</span>
              <p className="text-lg md:text-xl font-medium leading-relaxed text-white">
                {project.details.impact}
              </p>
            </div>
          )}
        </div>

        {/* Right Column: Featured Callout Quote */}
        {project.featuredQuote && (
          <div className="lg:col-span-5 story-anim lg:sticky lg:top-28">
            <div className="relative overflow-hidden bg-gradient-to-br from-[#E30A0A] to-[#800505] p-10 md:p-12 rounded-2xl shadow-2xl border border-white/10 text-white space-y-8">
              {/* Giant background quotation mark */}
              <span className="absolute -top-10 -right-6 text-[15rem] font-black text-black/15 pointer-events-none scale-y-[1.2] origin-top font-display">“</span>
              
              <div className="space-y-4">
                <span className="inline-flex bg-white/10 border border-white/20 px-4 py-1.5 rounded-full text-[0.7rem] font-black uppercase tracking-widest text-white">
                  Core Motto
                </span>
              </div>
              
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight leading-snug font-display scale-y-[1.05] italic">
                &ldquo;{project.featuredQuote}&rdquo;
              </h3>

              <div className="pt-4 border-t border-white/25 flex justify-between items-center text-xs font-black uppercase tracking-widest text-white/80">
                <span>Sportmantle Alliance</span>
                <span>Est. 2023</span>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Media Showcase (Gallery) */}
      <section className="py-20 px-6 md:px-12 lg:px-20 max-w-[85rem] mx-auto border-t border-white/5 space-y-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div className="space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-[#E30A0A]">Captured Moments</span>
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-widest">
              Project Media Gallery
            </h2>
          </div>
          <span className="text-sm font-bold text-white/45">
            Click any photo to interact & expand
          </span>
        </div>

        {/* Gallery Grid */}
        <div ref={galleryRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {project.gallery.map((img, idx) => (
            <div
              key={idx}
              onClick={() => setLightboxIndex(idx)}
              className="gallery-item relative aspect-[4/3] bg-white/5 overflow-hidden group rounded-xl border border-white/10 hover:border-white/30 cursor-pointer shadow-md transition-all duration-300"
            >
              <Image
                src={img}
                alt={`${project.title} gallery item ${idx + 1}`}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              {/* Blur-up/dim overlay on hover */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="px-5 py-2.5 text-xs font-black uppercase tracking-widest bg-white text-black rounded-full scale-90 group-hover:scale-100 transition-transform duration-300">
                  View Fullscreen
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Lightbox Slider */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md transition-all duration-500">
          {/* Close button */}
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-6 right-6 z-50 p-4 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 text-white transition-all cursor-pointer"
          >
            <X className="size-6" />
          </button>

          {/* Left Navigation */}
          <button
            onClick={() => setLightboxIndex((prev) => (prev !== null ? (prev - 1 + project.gallery.length) % project.gallery.length : null))}
            className="absolute left-4 md:left-8 z-50 p-4 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 text-white transition-all cursor-pointer"
          >
            <ArrowLeft className="size-6" />
          </button>

          {/* Core Image Slide */}
          <div className="relative w-[90vw] md:w-[80vw] h-[70vh] flex items-center justify-center select-none">
            <Image
              src={project.gallery[lightboxIndex]}
              alt={`${project.title} lightbox slide`}
              fill
              className="object-contain"
            />
          </div>

          {/* Right Navigation */}
          <button
            onClick={() => setLightboxIndex((prev) => (prev !== null ? (prev + 1) % project.gallery.length : null))}
            className="absolute right-4 md:right-8 z-50 p-4 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 text-white transition-all cursor-pointer"
          >
            <ArrowRight className="size-6" />
          </button>

          {/* Bottom Counter */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-5 py-2 bg-white/5 border border-white/10 text-xs font-black uppercase tracking-widest rounded-full text-white/70">
            {lightboxIndex + 1} / {project.gallery.length}
          </div>
        </div>
      )}

      {/* Dynamic continuous next-project loop footer */}
      <section 
        ref={nextBannerRef}
        className="relative w-full h-[55vh] flex items-center justify-center overflow-hidden py-16 px-6 border-t border-white/10 group cursor-pointer"
      >
        <Link href={`/projects/${nextProject.slug}`} className="absolute inset-0 z-0">
          <Image
            src={nextProject.image}
            alt={nextProject.title}
            fill
            className="object-cover transition-transform duration-[2000ms] group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/85 group-hover:bg-black/80 transition-colors duration-500 z-10" />
        </Link>

        <div className="relative z-20 text-center space-y-6 max-w-[85rem] mx-auto px-4 pointer-events-none">
          <span className="inline-flex text-xs font-black uppercase tracking-widest text-[#E30A0A] bg-[#E30A0A]/10 border border-[#E30A0A]/30 px-5 py-2 rounded-full">
            Next Project
          </span>
          
          <h2 className="text-[2.2rem] sm:text-[3.5rem] md:text-[5rem] lg:text-[6.5rem] font-black uppercase tracking-tighter leading-[0.85] scale-y-[1.2] origin-bottom font-display text-white group-hover:text-[#E30A0A] transition-colors duration-500">
            {nextProject.title}
          </h2>

          <div className="flex items-center justify-center gap-3 text-sm font-black uppercase tracking-widest text-white/55 group-hover:text-white transition-colors duration-500 pt-4">
            <span>Explore full gallery & mission details</span>
            <ArrowRight className="size-5 group-hover:translate-x-2 transition-transform duration-500" />
          </div>
        </div>
      </section>

      {/* General Footer */}
      <Footer />
    </main>
  );
}
