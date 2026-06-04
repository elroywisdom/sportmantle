"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MoveRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { 
    value: 200, 
    suffix: "+", 
    label: "Boys Discipled in Abuja & Environs"
  },
  { 
    value: 3, 
    suffix: "+", 
    label: "Years of Consistent Ministry & Impact"
  },
  { 
    value: 25, 
    suffix: "", 
    label: "Target Age Range for Discipleship"
  },
  { 
    value: 100, 
    suffix: "%", 
    label: "Mission Driven for Righteousness & Justice"
  },
];

export default function ImpactStats() {
  const containerRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const validStats = statsRef.current.filter(Boolean);
      
      validStats.forEach((el, i) => {
        if (!el) return;
        const target = stats[i].value;
        const obj = { val: 0 };

        // Number counter animation
        gsap.to(obj, {
          val: target,
          duration: 2.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
          },
          onUpdate: () => {
            const numEl = el.querySelector(".stat-number");
            if (numEl) numEl.textContent = Math.floor(obj.val).toString();
          },
        });

        // Fade in animation
        gsap.fromTo(el,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            delay: i * 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
            },
          }
        );
      });
      
      // Animate the image sliding in
      gsap.fromTo(".impact-image",
        { x: 100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-24 px-6 bg-white text-black overflow-hidden relative">
      <div className="max-w-[85rem] mx-auto space-y-20">
        
        {/* Top Header matching screenshot layout */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pt-10">
          <h2 className="text-[5rem] md:text-[7.5rem] lg:text-[9rem] font-black uppercase tracking-tighter leading-[0.75] text-[#E30A0A] scale-y-[1.15] origin-bottom font-display">
            Our Impact
          </h2>
          <Link href="/impact" className="group flex items-center gap-3 font-black uppercase tracking-tighter text-xl md:text-3xl hover:text-[#E30A0A] transition-colors pb-4 md:pb-8">
            Read More
            <MoveRight className="size-8 md:size-10 font-light group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          
          {/* Left Stats Grid */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-x-8 gap-y-20">
            {stats.map((stat, i) => (
              <div 
                key={stat.label} 
                ref={(el) => { statsRef.current[i] = el; }}
                className="space-y-6"
              >
                <div className="text-7xl md:text-[7rem] font-black leading-none tracking-tighter flex items-baseline scale-y-[1.15] origin-bottom font-display">
                  <span className="stat-number">0</span>
                  <span className="text-5xl md:text-[5.5rem]">{stat.suffix}</span>
                </div>
                <h3 className="text-sm md:text-lg font-black uppercase tracking-tight leading-tight max-w-[220px]">
                  {stat.label}
                </h3>
              </div>
            ))}
          </div>

          {/* Right Image */}
          <div className="lg:col-span-6 impact-image relative h-[500px] md:h-[700px] lg:h-[850px] w-full bg-black/5 overflow-hidden shadow-2xl">
            <Image 
              src="/Images/motion-images/sportmantle-competition.webp"
              alt="Sportmantle Competition"
              fill
              className="object-cover"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
