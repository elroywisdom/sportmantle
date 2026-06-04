"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { MoveDown } from "lucide-react";

export default function ProjectsHero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".reveal", {
        y: 100,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power4.out",
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-[70vh] flex flex-col justify-center items-start px-6 md:px-12 bg-black overflow-hidden pt-20">
      {/* Red Ambient Glow */}
      <div className="absolute top-[20%] left-[60%] w-[60vw] h-[60vw] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="relative z-10 max-w-5xl space-y-6">
        <h4 className="reveal text-primary text-sm font-black uppercase tracking-[0.5em]">The Arena</h4>
        <h1 className="reveal text-6xl md:text-[10rem] font-black leading-[0.85] tracking-tighter uppercase text-pure-white">
          THE MANTLE <br />
          <span className="text-primary italic">IN ACTION</span>
        </h1>
        <p className="reveal text-xl md:text-2xl text-muted-foreground max-w-2xl font-medium leading-tight">
          From local tournaments to global mission hubs, see how we are equipping the sports world for Christ.
        </p>
      </div>

      <div className="absolute bottom-12 right-12 animate-bounce hidden md:block">
         <MoveDown className="text-primary size-10" />
      </div>
    </section>
  );
}
