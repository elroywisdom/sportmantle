"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MoveRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { allProjects } from "@/shared/data/projects";

gsap.registerPlugin(ScrollTrigger);

// Show top 3 featured projects on homepage
const projects = allProjects.slice(0, 3);

export default function LatestProjects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<(HTMLDivElement | null)[]>([]);

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
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 75%",
            }
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-32 px-6 bg-[#111111] text-pure-white border-t border-white/5">
      <div className="max-w-[85rem] mx-auto space-y-16">
        
        {/* Header */}
        <div className="flex justify-between items-end gap-6 border-b border-white/10 pb-8">
          <h2 className="text-[5rem] md:text-[9rem] font-black uppercase tracking-tighter leading-[0.75] text-white scale-y-[1.15] origin-bottom font-display">
            Projects
          </h2>
          <Link href="/projects" className="group flex items-center gap-3 font-black uppercase tracking-widest text-lg hover:text-[#E30A0A] transition-colors pb-4">
            View All
            <MoveRight className="size-8 font-light group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
          {projects.map((project, i) => (
            <div 
              key={project.id}
              ref={el => { projectsRef.current[i] = el; }}
              className={`flex flex-col gap-6 ${i === 1 ? 'md:pt-20' : ''}`}
            >
              <Link href={`/projects/${project.slug}`} className="group flex flex-col gap-6 cursor-pointer">
                {/* Image */}
                <div className={`relative w-full ${i === 1 ? 'aspect-[3/4] md:aspect-[4/5]' : 'aspect-[4/3] md:aspect-[3/4]'} bg-white/5 overflow-hidden rounded-sm`}>
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
          ))}
        </div>
      </div>
    </section>
  );
}
