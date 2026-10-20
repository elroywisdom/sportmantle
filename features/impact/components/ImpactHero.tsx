"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

export default function ImpactHero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".reveal",
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
      className="relative min-h-[75vh] flex flex-col justify-center items-center text-center px-6 pt-32 pb-20 bg-[#0A0A0A] overflow-hidden border-b border-white/10"
    >
      {/* Background Cinematic Photo with Multi-Stage Vignette */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/Images/athletes-impact.png"
          alt="Sportmantle Athletes Impact and Brotherhood"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_35%] scale-105"
        />
        {/* Subtle multi-directional gradients for image clarity & text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/55 to-[#0A0A0A]/40 z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/70 via-transparent to-[#0A0A0A]/70 z-10" />
        <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-[#B22222]/15 rounded-full blur-[140px] pointer-events-none z-10" />
      </div>
      
      {/* Hero Content */}
      <div className="relative z-20 space-y-6 max-w-5xl mx-auto drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)]">
        <h1 className="reveal text-[3.8rem] sm:text-[6rem] md:text-[8rem] lg:text-[10rem] font-black leading-[0.8] tracking-tighter uppercase font-display text-white">
          DIVINE <br />
          <span className="text-[#B22222] italic">FOOTPRINTS</span>
        </h1>
        <p className="reveal text-lg sm:text-2xl md:text-3xl text-white/90 max-w-3xl mx-auto font-medium leading-tight">
          Over 3 years of outreaches, meetings, and tournaments, raising a generation of athletes who uphold righteousness and justice.
        </p>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-px bg-white/10 z-20" />
    </section>
  );
}
