"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { allProjects } from "@/shared/data/projects";

gsap.registerPlugin(ScrollTrigger);

const filters = ["All", "2024", "2025", "Prayer", "Outreach", "Camps", "Conference", "Tournament"];

export default function ProjectsGrid() {
  const [activeFilter, setActiveFilter] = useState("All");
  const containerRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<(HTMLDivElement | null)[]>([]);

  const filteredProjects = allProjects.filter(p => {
    if (activeFilter === "All") return true;
    if (activeFilter === p.year) return true;
    if (activeFilter === p.category) return true;
    return false;
  });

  // Re-trigger GSAP animation when filter changes
  useEffect(() => {
    const ctx = gsap.context(() => {
      const validProjects = projectsRef.current.filter(Boolean);
      
      if (validProjects.length > 0) {
        gsap.fromTo(validProjects,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            stagger: 0.1,
            ease: "power3.out",
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [activeFilter, filteredProjects.length]);

  return (
    <section ref={containerRef} className="py-24 px-6 bg-[#111111] text-pure-white min-h-screen">
      <div className="max-w-[85rem] mx-auto space-y-16">
        
        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 border-b border-white/10 pb-8">
          {filters.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-2 rounded-full text-sm font-bold uppercase tracking-widest transition-all duration-300 ${
                activeFilter === filter 
                  ? "bg-[#E30A0A] text-white" 
                  : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Projects Grid matching LatestProjects layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 items-start">
          {(() => {
            projectsRef.current = [];
            return filteredProjects.map((project, i) => {
              // Need to calculate the offset independently of the index if we want the middle column to drop down
              // In a 3-col grid, items 1, 4, 7... are in the middle column
              const isMiddleCol = i % 3 === 1;
              
              return (
                <div 
                  key={project.id}
                  ref={el => { projectsRef.current[i] = el; }}
                  className={`flex flex-col gap-6 ${isMiddleCol ? 'lg:pt-20' : ''}`}
                >
                  <Link href={`/projects/${project.slug}`} className="group flex flex-col gap-6 cursor-pointer">
                    {/* Image */}
                    <div className={`relative w-full ${isMiddleCol ? 'aspect-[3/4] lg:aspect-[4/5]' : 'aspect-[4/3] lg:aspect-[3/4]'} bg-white/5 overflow-hidden rounded-sm`}>
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-1000 group-hover:scale-105"
                      />
                    </div>

                    {/* Content */}
                    <div className="space-y-4">
                      <div className="flex gap-2">
                        {project.tags.map((tag, tIndex) => (
                          <span key={tag} className={`px-4 py-1.5 text-xs font-bold rounded-full ${tIndex === 0 ? 'bg-[#ffc107] text-black' : 'bg-white text-black'}`}>
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <div className="text-xl md:text-2xl font-medium text-white pb-2">
                        {project.date}
                      </div>

                      <h3 className={`text-[2.6rem] md:text-[3.2rem] lg:text-[4rem] font-black uppercase tracking-tighter leading-[0.85] scale-y-[1.2] origin-bottom font-display group-hover:text-[#E30A0A] transition-colors duration-300 ${project.titleColor}`}>
                        {project.title}
                      </h3>

                      <p className="text-white/70 text-base md:text-lg leading-relaxed pt-6">
                        {project.description}
                      </p>
                    </div>
                  </Link>
                </div>
              );
            });
          })()}
        </div>
        
        {filteredProjects.length === 0 && (
           <div className="text-center py-20 text-white/50 font-medium">
             No projects found for this category.
           </div>
        )}
      </div>
    </section>
  );
}
