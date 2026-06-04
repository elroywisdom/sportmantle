"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function ImpactHero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".reveal", {
        y: 100,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: "power4.out",
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-[80vh] flex flex-col justify-center items-center text-center px-6 bg-black overflow-hidden pt-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(178,34,34,0.1)_0,transparent_70%)] pointer-events-none" />
      
      <div className="relative z-10 space-y-8">
        <h1 className="reveal text-7xl md:text-[14rem] font-black leading-[0.75] tracking-tighter uppercase text-pure-white">
          DIVINE <br />
          <span className="text-primary italic">FOOTPRINTS</span>
        </h1>
        <p className="reveal text-xl md:text-3xl text-muted-foreground max-w-3xl mx-auto font-medium leading-tight">
          Over 3 years of outreaches, meetings, and tournaments, raising a generation of athletes who uphold righteousness and justice.
        </p>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-px bg-white/5" />
    </section>
  );
}
