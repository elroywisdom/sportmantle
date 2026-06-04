"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "@/shared/components/ui/button";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  Zap, 
  Flame, 
  Fingerprint, 
  BookOpen, 
  GraduationCap, 
  Sparkles,
  MoveRight 
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const pillars = [
  {
    number: "01",
    title: "Gospel Discipleship",
    description: "Discipling athletes in the gospel of Jesus Christ, establishing an unshakeable spiritual foundation anchored in grace.",
    icon: Flame,
    className: "lg:col-span-7 bg-[#0a0a0a]",
    accent: "from-red-500/10 to-transparent"
  },
  {
    number: "02",
    title: "Divine Identity",
    description: "Equipping athletes with the precise knowledge of God, helping them discover their identity, call, and purpose on earth.",
    icon: Fingerprint,
    className: "lg:col-span-5 bg-[#0e0e0e]",
    accent: "from-amber-500/10 to-transparent"
  },
  {
    number: "03",
    title: "Scriptural Teachings",
    description: "Establishing righteousness in the hearts of men through deep scriptural teachings, spiritual alignment, and ethical growth.",
    icon: BookOpen,
    className: "lg:col-span-4 bg-[#0e0e0e]",
    accent: "from-blue-500/10 to-transparent"
  },
  {
    number: "04",
    title: "Stellar Training",
    description: "Building a stellar educational and physical training system for global transformation, mentorship, and excellence in sports.",
    icon: GraduationCap,
    className: "lg:col-span-4 bg-[#0a0a0a]",
    accent: "from-emerald-500/10 to-transparent"
  },
  {
    number: "05",
    title: "Supernatural Freedom",
    description: "Setting athletes free from addictions, emotional bondage, and spiritual holds through the power of deliverance.",
    icon: Sparkles,
    className: "lg:col-span-4 bg-[#0e0e0e]",
    accent: "from-purple-500/10 to-transparent"
  }
];

export default function MissionPillars() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade in the header using fromTo for absolute React 18 Strict Mode safety
      if (headerRef.current) {
        gsap.fromTo(headerRef.current, 
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 85%",
            }
          }
        );
      }

      // Filter out any null refs just in case
      const validCards = cardsRef.current.filter(Boolean);
      
      if (validCards.length > 0) {
        // Staggered entry for the bento grid cards using fromTo
        gsap.fromTo(validCards, 
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 65%",
            }
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative py-28 px-6 bg-black text-pure-white overflow-hidden border-t border-white/5"
    >
      {/* Decorative Glows */}
      <div className="absolute inset-0 pointer-events-none opacity-20 z-0">
        <div className="absolute top-[20%] left-[80%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-[20%] right-[80%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        {/* Section Header */}
        <div 
          ref={headerRef}
          className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/5 pb-10"
        >
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 border-l-4 border-[#E30A0A] text-[#E30A0A] text-xs font-black uppercase tracking-widest rounded-r">
              <Zap className="size-3.5 fill-current" />
              <span>Operational Blueprint</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tighter leading-none">
              Pillars of <br />
              <span className="text-[#E30A0A] italic font-serif">Discipleship</span>
            </h2>
          </div>
          <p className="text-gray-400 max-w-sm text-sm sm:text-base leading-relaxed">
            The five spiritual and physical pillars through which we mentor, empower, and equip young athletes to lead with righteousness and justice.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="pillar-grid grid grid-cols-1 lg:grid-cols-12 gap-6">
          {pillars.map((pillar, i) => (
            <div
              key={pillar.number}
              ref={(el) => { cardsRef.current[i] = el; }}
              className={`pillar-card relative p-8 md:p-10 border border-white/5 rounded-2xl overflow-hidden group hover:border-[#E30A0A]/40 hover:-translate-y-2 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col justify-between min-h-[300px] sm:min-h-[320px] ${pillar.className}`}
            >
              {/* Subtle ambient accent background glow on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${pillar.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`} />

              {/* Card Top */}
              <div className="flex justify-between items-start relative z-10">
                <div className="size-14 bg-white/5 border border-white/5 flex items-center justify-center text-white group-hover:!bg-[#E30A0A] group-hover:border-transparent group-hover:text-white transition-all duration-500 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
                  <pillar.icon className="size-6 transition-transform duration-500 group-hover:scale-110" />
                </div>
                <span className="text-4xl md:text-5xl font-black text-white/[0.04] group-hover:text-[#E30A0A]/10 transition-colors duration-500 font-display select-none">
                  {pillar.number}
                </span>
              </div>

              {/* Card Bottom */}
              <div className="space-y-3 relative z-10 pt-8">
                <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-tight text-white group-hover:text-white transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors text-[14px] sm:text-base leading-relaxed font-medium max-w-xl">
                  {pillar.description}
                </p>
              </div>

              {/* Bottom Glowing Accent Line */}
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#E30A0A]/0 to-transparent group-hover:via-[#E30A0A]/60 transition-all duration-700" />
            </div>
          ))}
        </div>

        {/* CTA link to about page */}
        <div className="flex justify-center pt-6">
          <Link href="/about">
            <Button
              className="!bg-transparent hover:!bg-white/5 !text-white border border-white/10 hover:border-white/20 font-bold tracking-wide px-8 py-3 text-base rounded-xl transition-all duration-300 flex items-center gap-3 cursor-pointer group"
            >
              <span>Explore Our Full Mission</span>
              <MoveRight className="size-5 text-[#E30A0A] group-hover:translate-x-1.5 transition-transform duration-300" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
