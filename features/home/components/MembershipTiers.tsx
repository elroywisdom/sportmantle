"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { User, Rocket, Building2 } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const tiers = [
  {
    title: "The Athlete",
    description: "For young athletes ready to be discipled and equipped with the knowledge of God and their purpose.",
    icon: User,
    cta: "Start Discipleship",
    featured: false,
    slug: "athlete",
  },
  {
    title: "The Partner",
    description: "For individuals and organizations like Beta Boys Project who want to seed into our global mission.",
    icon: Building2,
    cta: "Partner With Us",
    featured: true,
    slug: "partner",
  },
  {
    title: "The Outreach",
    description: "Join our meetings, prayer stretches, and tournaments as we establish righteousness in sports.",
    icon: Rocket,
    cta: "Join an Event",
    featured: false,
    slug: "outreach",
  },
];

export default function MembershipTiers() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const validCards = cardsRef.current.filter(Boolean);
      
      if (validCards.length > 0) {
        gsap.fromTo(validCards, 
          { scale: 0.9, opacity: 0, y: 40 },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.15,
            ease: "back.out(1.5)",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 85%",
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-32 px-6 bg-black relative overflow-hidden">
      {/* Background Red Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[50vh] bg-[#E30A0A]/5 blur-[120px] pointer-events-none" />

      <div className="max-w-[85rem] mx-auto space-y-20">
        
        {/* Header */}
        <div className="text-center space-y-6 max-w-2xl mx-auto">
          <h2 className="text-[3.2rem] md:text-[5.5rem] font-black uppercase tracking-tighter leading-[0.9] font-display scale-y-[1.1] origin-bottom">
            Pick Up Your <br />
            <span className="text-[#E30A0A] italic">Mantle</span>
          </h2>
          <p className="text-white/60 text-lg md:text-xl font-light leading-relaxed">
            Join a curated network of Kingdom-minded athletes and leaders. No generic networking—only purposeful impact.
          </p>
        </div>

        {/* Bento/Glass Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {tiers.map((tier, i) => (
            <div
              key={tier.title}
              ref={(el) => { cardsRef.current[i] = el; }}
              className={`relative flex flex-col justify-between items-start p-10 border transition-all duration-500 hover:-translate-y-2 group rounded-sm ${
                tier.featured 
                  ? "bg-gradient-to-b from-[#E30A0A]/12 to-[#E30A0A]/2 border-[#E30A0A]/40 shadow-[0_10px_35px_rgba(227,10,10,0.12)] hover:border-[#E30A0A]" 
                  : "bg-white/[0.02] border-white/10 hover:border-[#E30A0A]/45 shadow-[0_10px_30px_rgba(0,0,0,0.3)]"
              }`}
            >
              {/* Top accent glowing bar for the featured partner tier */}
              {tier.featured && (
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#E30A0A] to-transparent" />
              )}
              
              <div className="w-full space-y-8">
                {/* Icon Container */}
                <div className={`size-16 flex items-center justify-center border transition-all duration-300 ${
                  tier.featured 
                    ? "bg-[#E30A0A] text-white border-[#E30A0A] shadow-[0_0_15px_rgba(227,10,10,0.3)]" 
                    : "bg-white/5 text-white/80 border-white/10 group-hover:bg-[#E30A0A]/10 group-hover:text-[#E30A0A] group-hover:border-[#E30A0A]/35"
                }`}>
                  <tier.icon className="size-8" />
                </div>
                
                {/* Text Content */}
                <div className="space-y-4">
                  <h3 className={`text-3xl font-black uppercase tracking-tight font-display transition-colors duration-300 ${
                    tier.featured ? "text-white" : "text-white/95 group-hover:text-[#E30A0A]"
                  }`}>
                    {tier.title}
                  </h3>
                  <p className={`text-base md:text-lg leading-relaxed font-light transition-colors duration-300 ${
                    tier.featured ? "text-white/80" : "text-white/50 group-hover:text-white/80"
                  }`}>
                    {tier.description}
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <div className="w-full pt-10">
                <Link
                  href={`/contact?category=${tier.slug}`}
                  className={`w-full h-14 font-black uppercase tracking-widest text-xs transition-all duration-300 flex items-center justify-center cursor-pointer ${
                    tier.featured
                      ? "bg-[#E30A0A] text-white hover:bg-[#ff1d1d] shadow-[0_4px_20px_rgba(227,10,10,0.25)] hover:shadow-[0_4px_25px_rgba(227,10,10,0.45)]"
                      : "bg-white/5 text-white border border-white/10 hover:bg-[#E30A0A] hover:text-white hover:border-[#E30A0A]"
                  }`}
                >
                  {tier.cta}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
