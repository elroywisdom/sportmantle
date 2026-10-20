"use client";

import { useRef, useEffect, useState } from "react";
import { Users, Calendar, Target, MapPin, Sparkles } from "lucide-react";

interface MetricItem {
  label: string;
  sublabel: string;
  value: number;
  suffix: string;
  icon: typeof Users;
  color: string;
}

const metrics: MetricItem[] = [
  { 
    label: "Boys Discipled", 
    sublabel: "Active Youth Mentorship",
    value: 200, 
    suffix: "+", 
    icon: Users,
    color: "text-primary" 
  },
  { 
    label: "Years of Impact", 
    sublabel: "Faithful Ministry Journey",
    value: 3, 
    suffix: "+", 
    icon: Calendar,
    color: "text-white" 
  },
  { 
    label: "Target Age Range", 
    sublabel: "From Grassroots to Elite",
    value: 25, 
    suffix: " YRS", 
    icon: Target,
    color: "text-white" 
  },
  { 
    label: "Core Regional Hubs", 
    sublabel: "Abuja, Nasarawa & Kaduna",
    value: 3, 
    suffix: " CITIES", 
    icon: MapPin,
    color: "text-primary" 
  },
];

function MetricCard({ metric }: { metric: MetricItem }) {
  const [count, setCount] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const animatedRef = useRef(false);
  const Icon = metric.icon;

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      setCount(metric.value);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !animatedRef.current) {
          animatedRef.current = true;
          const startTime = performance.now();
          const duration = 1600;

          const update = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(ease * metric.value));

            if (progress < 1) {
              requestAnimationFrame(update);
            } else {
              setCount(metric.value);
            }
          };

          requestAnimationFrame(update);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);

    // Fallback: never remain at 0 if observer doesn't trigger
    const timer = setTimeout(() => {
      if (!animatedRef.current) {
        animatedRef.current = true;
        setCount(metric.value);
      }
    }, 1800);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, [metric.value]);

  return (
    <div 
      ref={cardRef} 
      className="relative p-6 sm:p-8 bg-gradient-to-b from-neutral-900 to-asphalt border border-white/10 rounded-2xl flex flex-col justify-between hover:border-[#B22222]/60 hover:shadow-[0_10px_35px_rgba(178,34,34,0.15)] transition-all duration-300 group shadow-xl overflow-hidden"
    >
      {/* Subtle top indicator */}
      <div className="flex items-center justify-start w-full mb-6">
        <div className="p-2.5 rounded-xl bg-[#B22222]/10 border border-[#B22222]/25 text-[#B22222] group-hover:bg-[#B22222] group-hover:text-white group-hover:shadow-[0_0_20px_rgba(178,34,34,0.6)] transition-all duration-300">
          <Icon className="size-5" />
        </div>
      </div>

      <div className="space-y-1 my-2">
        <div className="text-4xl sm:text-5xl md:text-6xl font-black font-mono tracking-tighter text-white flex items-baseline">
          <span>{count}</span>
          <span className="text-2xl sm:text-3xl font-black text-[#B22222] ml-1">{metric.suffix}</span>
        </div>
        <h3 className="text-sm font-black uppercase tracking-wider text-white group-hover:text-[#B22222] transition-colors">
          {metric.label}
        </h3>
        <p className="text-xs text-muted-foreground font-mono">
          {metric.sublabel}
        </p>
      </div>

      <div className="w-8 h-1 bg-[#B22222]/30 group-hover:w-full group-hover:bg-[#B22222] transition-all duration-500 rounded-full mt-4" />
    </div>
  );
}

export default function DetailedMetrics() {
  return (
    <section className="py-12 md:py-16 px-4 sm:px-6 bg-asphalt border-b border-white/10 relative z-20">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Section Header Tag */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4 text-xs font-mono uppercase text-muted-foreground">
          <div className="flex items-center gap-2 text-white font-bold tracking-wider">
            <Sparkles className="size-3.5 text-primary" />
            <span>MEASURABLE KINGDOM IMPACT</span>
          </div>
          <span className="hidden sm:inline-block">2023 — 2026 BENCHMARKS</span>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {metrics.map((m) => (
            <MetricCard key={m.label} metric={m} />
          ))}
        </div>

      </div>
    </section>
  );
}
