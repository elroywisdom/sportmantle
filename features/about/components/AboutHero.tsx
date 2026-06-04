"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Zap } from "lucide-react";

export default function AboutHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".char",
        { y: "100%", skewY: 7 },
        { y: 0, skewY: 0, duration: 1.2, stagger: 0.05, ease: "expo.out" }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const title = "BEYOND THE FIELD";

  return (
    <section ref={containerRef} className="relative min-h-[80vh] flex flex-col justify-center items-center text-center px-6 bg-black overflow-hidden pt-20">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vw] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="relative z-10 space-y-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 border border-primary/30 text-primary text-xs font-black uppercase tracking-[0.4em]">
           <Zap className="size-4 fill-current" />
           <span>Our Story</span>
        </div>

        <h1 ref={headlineRef} className="text-7xl sm:text-8xl md:text-[12rem] font-black leading-[0.8] tracking-tighter uppercase text-pure-white overflow-hidden">
          {title.split(" ").map((word, i) => (
            <span key={i} className="inline-block mr-[0.2em] whitespace-nowrap overflow-hidden py-4">
               {word.split("").map((char, j) => (
                 <span key={j} className="char inline-block">{char}</span>
               ))}
            </span>
          ))}
        </h1>

        <p className="text-xl md:text-3xl text-muted-foreground max-w-4xl mx-auto font-medium leading-tight">
          We are more than an NGO; we are a <span className="text-pure-white font-black italic">movement</span> of athletes picking up the mantle of grace to transform nations through sports.
        </p>
      </div>

      {/* Grid line indicator */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
}
