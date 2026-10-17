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
    subtitle: "Rooted in Grace",
    description: "Discipling athletes in the gospel of Jesus Christ, establishing an unshakeable spiritual foundation anchored in grace.",
    icon: Flame,
    image: "/Images/projects/2026/Sportmantle Clinic - BIgham University/smc-white-pictures/OGB-37.jpg",
    className: "lg:col-span-7",
  },
  {
    number: "02",
    title: "Divine Identity",
    subtitle: "Called for Purpose",
    description: "Equipping athletes with the precise knowledge of God, helping them discover their identity, call, and purpose on earth.",
    icon: Fingerprint,
    image: "/Images/projects/2026/Sportmantle Clinic - BIgham University/smc-final/SMC-32.jpg",
    className: "lg:col-span-5",
  },
  {
    number: "03",
    title: "Scriptural Teachings",
    subtitle: "Spiritual Alignment",
    description: "Establishing righteousness in the hearts of men through deep scriptural teachings, spiritual alignment, and ethical growth.",
    icon: BookOpen,
    image: "/Images/motion-images/founder-teaching.webp",
    className: "lg:col-span-4",
  },
  {
    number: "04",
    title: "Stellar Training",
    subtitle: "Athletic Excellence",
    description: "Building a stellar educational and physical training system for global transformation, mentorship, and excellence in sports.",
    icon: GraduationCap,
    image: "/Images/projects/2026/Sportmantle Clinic - BIgham University/smc-final/SMC-61.jpg",
    className: "lg:col-span-4",
  },
  {
    number: "05",
    title: "Supernatural Freedom",
    subtitle: "Power of Deliverance",
    description: "Setting athletes free from addictions, emotional bondage, and spiritual holds through the power of deliverance.",
    icon: Sparkles,
    image: "/Images/projects/2026/Sportmantle Clinic - BIgham University/smc-final/SMC-97.jpg",
    className: "lg:col-span-4",
  }
];

export default function MissionPillars() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
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

      const validCards = cardsRef.current.filter(Boolean);
      if (validCards.length > 0) {
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
              start: "top 70%",
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
      {/* Decorative Ambient Glows */}
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
          <p className="text-gray-400 max-w-md text-sm sm:text-base leading-relaxed">
            Our five-fold blueprint for empowering and equipping athletes on and off the court through gospel mentorship and physical discipline.
          </p>
        </div>

        {/* Image-Driven Bento Grid */}
        <div className="pillar-grid grid grid-cols-1 lg:grid-cols-12 gap-6">
          {pillars.map((pillar, i) => (
            <div
              key={pillar.number}
              ref={(el) => { cardsRef.current[i] = el; }}
              className={`pillar-card relative rounded-2xl overflow-hidden group border border-white/10 hover:border-[#E30A0A]/50 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col justify-between min-h-[380px] sm:min-h-[420px] shadow-[0_20px_40px_rgba(0,0,0,0.6)] ${pillar.className}`}
            >
              {/* Background Photography with Zoom Effect */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                style={{ backgroundImage: `url(${encodeURI(pillar.image)})` }}
              />

              {/* Rich Multi-stop Cinematic Overlay for Maximum Readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30 group-hover:via-black/60 transition-colors duration-700" />

              {/* Subtle Red Brand Sheen on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#E30A0A]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

              {/* Card Top: Pillar Tag & Number */}
              <div className="flex justify-between items-start relative z-10 p-7 sm:p-8">
                <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white group-hover:border-[#E30A0A]/40 transition-colors">
                  <pillar.icon className="size-4 text-[#E30A0A]" />
                  <span className="text-[11px] font-bold uppercase tracking-wider text-white/90">
                    {pillar.subtitle}
                  </span>
                </div>
                <span className="text-4xl sm:text-5xl font-black text-white/20 group-hover:text-[#E30A0A]/40 transition-colors duration-500 font-display select-none">
                  {pillar.number}
                </span>
              </div>

              {/* Card Bottom: Typography Content */}
              <div className="relative z-10 p-7 sm:p-8 space-y-2.5 mt-auto">
                <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white group-hover:text-white transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-gray-300 group-hover:text-white/90 transition-colors text-sm sm:text-base leading-relaxed font-normal max-w-md">
                  {pillar.description}
                </p>
              </div>

              {/* Bottom Glowing Accent Line */}
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#E30A0A]/0 to-transparent group-hover:via-[#E30A0A] transition-all duration-700 z-10" />
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
