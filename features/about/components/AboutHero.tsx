"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

export default function AboutHero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-anim",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.1,
          stagger: 0.12,
          ease: "power3.out",
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[85vh] flex flex-col justify-end px-6 md:px-12 lg:px-20 pb-20 pt-36 bg-[#0A0A0A] overflow-hidden border-b border-white/10"
    >
      {/* Background Cinematic Photo with Multi-Stage Vignette */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/Images/projects/2026/Sportmantle Clinic - BIgham University/smc-final/SMC-53.jpg"
          alt="Sportmantle Athletes and Mentors"
          fill
          priority
          className="object-cover object-center scale-105"
        />
        {/* Layered gradients for text clarity & atmosphere */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/85 to-black/60 z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/70 to-transparent z-10" />
        <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-[#E30A0A]/10 rounded-full blur-[140px] pointer-events-none z-10" />
      </div>

      {/* Content Container */}
      <div className="relative z-20 max-w-[85rem] w-full mx-auto space-y-10">
        {/* Master Headline */}
        <div className="hero-anim space-y-4">
          <h1 className="text-[3.8rem] sm:text-[5.5rem] md:text-[7.5rem] lg:text-[9.5rem] font-black uppercase tracking-tighter leading-[0.8] scale-y-[1.1] origin-bottom font-display text-white">
            Raising A <br />
            <span className="text-[#E30A0A] italic">People</span> For God
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl font-bold uppercase tracking-tight text-white/90 font-display">
            In The Sports Industry Across Nations
          </p>
        </div>

        {/* The Mandate Box */}
        <div className="hero-anim max-w-3xl bg-white/[0.03] border-l-4 border-[#E30A0A] border-y border-r border-white/10 p-6 md:p-8 backdrop-blur-xl">
          <blockquote className="text-lg md:text-2xl text-white font-medium leading-relaxed italic">
            &ldquo;Raise me a people in the sports industry, who will uphold righteousness and justice, through the route of discipleship.&rdquo;
          </blockquote>
        </div>
      </div>
    </section>
  );
}
