"use client";

import { useEffect, useRef, useState } from "react";
import { MoveRight } from "lucide-react";
import Link from "next/link";

const stats = [
  { 
    value: 200, 
    suffix: "+", 
    label: "Boys Discipled"
  },
  { 
    value: 3, 
    suffix: "+", 
    label: "Years of Ministry"
  },
  { 
    value: 25, 
    suffix: "", 
    label: "Target Age Range"
  },
  { 
    value: 100, 
    suffix: "%", 
    label: "Mission Driven"
  },
];

const rawImpactImages = [
  {
    src: "/Images/projects/2026/Sportmantle Clinic - BIgham University/smc-final/SMC-53.jpg",
    tag: "Bingham Clinic 2026",
    title: "On-Court Mentorship"
  },
  {
    src: "/Images/projects/2026/Sportmantle Clinic - BIgham University/smc-final/SMC-71.jpg",
    tag: "Youth Empowerment",
    title: "Kingdom Discipline"
  },
  {
    src: "/Images/projects/2026/Sportmantle Clinic - BIgham University/smc-white-pictures/OGB-101.jpg",
    tag: "Next-Gen Athletes",
    title: "Spiritual Foundations"
  },
  {
    src: "/Images/projects/2026/Sportmantle Clinic - BIgham University/smc-final/SMC-89.jpg",
    tag: "Leadership",
    title: "Training with Purpose"
  },
  {
    src: "/Images/projects/2026/Sportmantle Clinic - BIgham University/smc-white-pictures/OGB-14.jpg",
    tag: "Culture & Unity",
    title: "Brotherhood & Character"
  },
  {
    src: "/Images/projects/2026/Sportmantle Clinic - BIgham University/smc-final/SMC-44.jpg",
    tag: "Coaching Sessions",
    title: "Sharpening Skills"
  },
  {
    src: "/Images/projects/2026/Sportmantle Clinic - BIgham University/smc-white-pictures/OGB-37.jpg",
    tag: "Fellowship",
    title: "Prayer on the Court"
  },
  {
    src: "/Images/projects/2026/Sportmantle Clinic - BIgham University/smc-final/SMC-99.jpg",
    tag: "Excellence",
    title: "Divine Identity"
  },
  {
    src: "/Images/projects/2026/Sportmantle Clinic - BIgham University/smc-day-2/OGB-106.jpg",
    tag: "Discipleship",
    title: "Transforming Lives"
  },
  {
    src: "/Images/projects/2026/Sportmantle Clinic - BIgham University/smc-final/SMC-104.jpg",
    tag: "Community",
    title: "The Next Generation"
  }
];

const impactImages = rawImpactImages.map(item => ({
  ...item,
  src: encodeURI(item.src)
}));

function StatCard({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const [count, setCount] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const animatedRef = useRef(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    // Check if IntersectionObserver is supported
    if (typeof IntersectionObserver === "undefined") {
      setCount(value);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !animatedRef.current) {
          animatedRef.current = true;
          const startTime = performance.now();
          const duration = 1800; // 1.8 seconds smooth count up

          const update = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const ease = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(ease * value));

            if (progress < 1) {
              requestAnimationFrame(update);
            } else {
              setCount(value);
            }
          };

          requestAnimationFrame(update);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -20px 0px" }
    );

    observer.observe(el);

    // Fallback timer: ensures numbers are never stuck at 0 if observer is bypassed
    const fallbackTimer = setTimeout(() => {
      if (!animatedRef.current) {
        animatedRef.current = true;
        setCount(value);
      }
    }, 2500);

    return () => {
      observer.disconnect();
      clearTimeout(fallbackTimer);
    };
  }, [value]);

  return (
    <div 
      ref={cardRef}
      className="p-6 rounded-2xl bg-black/[0.03] border border-black/5 hover:border-[#E30A0A]/30 transition-all duration-300 space-y-2"
    >
      <div className="text-5xl sm:text-6xl md:text-7xl font-black leading-none tracking-tighter flex items-baseline font-display text-black">
        <span>{count}</span>
        <span className="text-3xl sm:text-4xl md:text-5xl text-[#E30A0A]">{suffix}</span>
      </div>
      <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-black/70">
        {label}
      </h3>
    </div>
  );
}

export default function ImpactStats() {
  return (
    <section className="py-24 bg-white text-black overflow-hidden relative select-none">
      <div className="max-w-[85rem] mx-auto px-6 space-y-12">
        
        {/* Top Header: Giant Display Title & Link */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pt-4 border-b border-black/10 pb-10">
          <div className="space-y-2">
            <span className="text-xs font-black uppercase tracking-[0.25em] text-[#E30A0A]">
              Real Transformation
            </span>
            <h2 className="text-[4.5rem] sm:text-[6.5rem] md:text-[8rem] lg:text-[9.5rem] font-black uppercase tracking-tighter leading-[0.78] text-[#E30A0A] scale-y-[1.15] origin-bottom font-display">
              Our Impact
            </h2>
          </div>
          <Link 
            href="/impact" 
            className="group flex items-center gap-3 font-black uppercase tracking-tight text-xl md:text-2xl hover:text-[#E30A0A] transition-colors pb-2"
          >
            Explore Stories
            <MoveRight className="size-6 md:size-8 group-hover:translate-x-2 transition-transform duration-300" />
          </Link>
        </div>

        {/* Impact Numbers Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 pt-2">
          {stats.map((stat) => (
            <StatCard 
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
            />
          ))}
        </div>
      </div>

      {/* Continuous Marquee Carousel of Images */}
      <div className="w-full relative mt-16 overflow-hidden">
        {/* Soft Edge Fade Mask */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-white via-white/80 to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-white via-white/80 to-transparent z-20 pointer-events-none" />

        <div className="impact-marquee flex gap-5 sm:gap-6 px-4">
          {/* Double list for seamless infinite loop */}
          {[...impactImages, ...impactImages].map((item, i) => (
            <div
              key={i}
              className="relative w-[280px] sm:w-[340px] md:w-[380px] aspect-[4/5] rounded-2xl overflow-hidden group flex-shrink-0 shadow-[0_12px_30px_rgba(0,0,0,0.12)] border border-black/5 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.03] hover:shadow-[0_20px_45px_rgba(0,0,0,0.2)] cursor-pointer"
            >
              {/* Image with smooth hover scale */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-108"
                style={{ backgroundImage: `url(${item.src})` }}
              />

              {/* Gradient Scrim for Text Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-85 group-hover:opacity-95 transition-opacity duration-500" />

              {/* Badge Tag Top Left */}
              <div className="absolute top-4 left-4 z-10">
                <span className="inline-block px-3 py-1 text-[11px] font-bold uppercase tracking-wider bg-black/60 backdrop-blur-md text-white border border-white/10 rounded-full">
                  {item.tag}
                </span>
              </div>

              {/* Content Bottom */}
              <div className="absolute bottom-5 left-5 right-5 z-10 text-white space-y-1">
                <h4 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white group-hover:text-[#E30A0A] transition-colors duration-300">
                  {item.title}
                </h4>
                <p className="text-xs text-white/70 uppercase tracking-widest font-mono">
                  Bingham University Clinic
                </p>
              </div>

              {/* Red Bottom Accent Line */}
              <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#E30A0A] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left z-20" />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes impactMarquee {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        .impact-marquee {
          display: flex;
          width: max-content;
          animation: impactMarquee 60s linear infinite;
        }
        .impact-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
