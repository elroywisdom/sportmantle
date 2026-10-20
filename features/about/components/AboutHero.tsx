"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { Sparkles, Trophy, Flame, Users } from "lucide-react";

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
      className="relative min-h-[92vh] flex flex-col justify-end px-6 md:px-12 lg:px-20 pb-16 pt-36 bg-[#0A0A0A] overflow-hidden border-b border-white/10"
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
        {/* Tag Pill */}
        <div className="hero-anim inline-flex items-center gap-2.5 px-4 py-2 bg-[#E30A0A]/15 border border-[#E30A0A]/40 text-[#E30A0A] text-xs font-black uppercase tracking-[0.3em] rounded-full">
          <Sparkles className="size-3.5 animate-pulse" />
          <span>The SportMantle Movement • Est. 2023</span>
        </div>

        {/* Master Headline */}
        <div className="hero-anim space-y-4">
          <h1 className="text-[3.5rem] sm:text-[5.5rem] md:text-[7.5rem] lg:text-[9.5rem] font-black uppercase tracking-tighter leading-[0.8] scale-y-[1.1] origin-bottom font-display text-white">
            Raising A <br />
            <span className="text-[#E30A0A] italic">People</span> For God
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl font-bold uppercase tracking-tight text-white/90 font-display">
            In The Sports Industry Across Nations
          </p>
        </div>

        {/* The Mandate Box */}
        <div className="hero-anim max-w-3xl bg-white/[0.03] border-l-4 border-[#E30A0A] border-y border-r border-white/10 p-6 md:p-8 backdrop-blur-xl">
          <p className="text-xs font-black uppercase tracking-widest text-[#E30A0A] mb-2">
            The Received Mandate
          </p>
          <blockquote className="text-lg md:text-2xl text-white font-medium leading-relaxed italic">
            &ldquo;Raise me a people in the sports industry, who will uphold righteousness and justice, through the route of discipleship.&rdquo;
          </blockquote>
        </div>

        {/* Quick Highlights Bar */}
        <div className="hero-anim grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 pt-4 border-t border-white/10">
          <div className="flex items-center gap-4 p-4 bg-white/5 border border-white/5 rounded-sm">
            <Trophy className="size-8 text-[#E30A0A] flex-shrink-0" />
            <div>
              <p className="text-2xl md:text-3xl font-black text-white font-display">3+ Years</p>
              <p className="text-xs uppercase tracking-wider text-white/50 font-bold">Of Field Impact</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 bg-white/5 border border-white/5 rounded-sm">
            <Users className="size-8 text-[#E30A0A] flex-shrink-0" />
            <div>
              <p className="text-2xl md:text-3xl font-black text-white font-display">200+ Boys</p>
              <p className="text-xs uppercase tracking-wider text-white/50 font-bold">Discipled In Faith</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 bg-white/5 border border-white/5 rounded-sm">
            <Flame className="size-8 text-[#E30A0A] flex-shrink-0" />
            <div>
              <p className="text-2xl md:text-3xl font-black text-white font-display">12+ Academies</p>
              <p className="text-xs uppercase tracking-wider text-white/50 font-bold">Reached & Equipped</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 bg-white/5 border border-white/5 rounded-sm">
            <Sparkles className="size-8 text-[#E30A0A] flex-shrink-0" />
            <div>
              <p className="text-2xl md:text-3xl font-black text-white font-display">1 Mandate</p>
              <p className="text-xs uppercase tracking-wider text-white/50 font-bold">Righteousness & Grace</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
