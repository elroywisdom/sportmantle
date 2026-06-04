"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const metrics = [
  { label: "Boys discipled", value: "200", suffix: "+", color: "text-primary" },
  { label: "Years Impact", value: "3", suffix: "+", color: "text-white" },
  { label: "Target Ages", value: "5-25", suffix: "", color: "text-white" },
  { label: "Core Cities", value: "3", suffix: "+", color: "text-primary" },
];

export default function DetailedMetrics() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".metric-card", {
        scale: 0.8,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-24 px-6 bg-asphalt">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {metrics.map((m) => (
          <div key={m.label} className="metric-card p-12 bg-grit-gray border border-white/5 flex flex-col justify-between items-start space-y-6 hover:border-primary/50 transition-all group">
             <div className="text-sm font-black uppercase tracking-[0.3em] text-muted-foreground group-hover:text-primary transition-colors">{m.label}</div>
             <div className={`text-6xl md:text-8xl font-black ${m.color} tracking-tighter`}>
                {m.value}<span className="text-3xl opacity-50 font-medium">{m.suffix}</span>
             </div>
             <div className="w-12 h-1 bg-primary group-hover:w-full transition-all duration-700" />
          </div>
        ))}
      </div>
    </section>
  );
}
