"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MoveRight } from "lucide-react";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function AboutPreview() {
  const containerRef = useRef<HTMLDivElement>(null);
  const elementsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const validElements = elementsRef.current.filter(Boolean);
      
      if (validElements.length > 0) {
        gsap.fromTo(validElements, 
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 75%",
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="py-32 px-6 bg-black text-pure-white"
    >
      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-16 lg:gap-24 items-start">
        
        {/* The Mandate (Left Column) */}
        <div className="lg:col-span-7 space-y-12">
          <div ref={el => { elementsRef.current[0] = el; }} className="space-y-8">
            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-[#E30A0A]">
              The Mandate
            </h2>
            <p className="text-3xl md:text-[2.75rem] font-medium leading-[1.25] tracking-tight text-white/90">
              "Raise me a people in the sports industry, who will <span className="text-white font-black italic">uphold righteousness and justice</span>, through the route of discipleship."
            </p>
          </div>
          
          <div ref={el => { elementsRef.current[1] = el; }}>
            <Link 
              href="/about" 
              className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-white/50 hover:text-[#E30A0A] transition-colors group"
            >
              Explore Our Mission
              <MoveRight className="size-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Vision & Mission (Right Column) */}
        <div className="lg:col-span-5 lg:pl-12 grid gap-12 pt-2 md:pt-4">
          
          {/* Vision */}
          <div ref={el => { elementsRef.current[2] = el; }} className="relative border-t border-white/10 pt-8">
            <div className="absolute top-8 right-0 text-[10px] font-mono text-white/20">01</div>
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[#E30A0A] mb-4">
              Vision
            </h3>
            <p className="text-xl md:text-2xl text-white/70 leading-relaxed font-light">
              Raising a people for God in the sports industry, who would uphold righteousness and justice.
            </p>
          </div>

          {/* Mission */}
          <div ref={el => { elementsRef.current[3] = el; }} className="relative border-t border-white/10 pt-8">
            <div className="absolute top-8 right-0 text-[10px] font-mono text-white/20">02</div>
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[#E30A0A] mb-4">
              Mission
            </h3>
            <p className="text-xl md:text-2xl text-white/70 leading-relaxed font-light">
              Discipling athletes in the gospel of Jesus Christ, equipping them with knowledge of God, identity, and purpose.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
