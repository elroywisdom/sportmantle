"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const expressions = [
  {
    id: "tournaments",
    title: (
      <>
        <span className="md:hidden">TOURNAMENTS</span>
        <span className="hidden md:inline">TOURNA<br />MENTS</span>
      </>
    ),
    description:
      "Since 2023, we've travelled across Abuja and Nasarawa hosting high-energy youth tournaments and football clinics. Each camp is led by experienced coaches and mentors conducting skill training alongside biblical character lessons.",
    image: "/Images/projects/2026/Sportmantle Clinic - BIgham University/smc-white-pictures/OGB-43.jpg",
    bgColor: "bg-[#E5A823]", // Warm Golden Mustard from GOA
    link: "/projects",
    staggerClass: "md:mt-0"
  },
  {
    id: "prayer",
    title: (
      <>
        WHEN ATHLETES<br />PRAY
      </>
    ),
    description:
      "We believe that sport is more than just a game. It can ignite purpose, transform hearts, and unite young athletes. When Athletes Pray is our corporate gathering where players seek God in worship and intercession.",
    image: "/Images/motion-images/athlete-praying.webp",
    bgColor: "bg-[#C31230]", // Crimson / Cardinal Red from GOA
    link: "/projects",
    staggerClass: "md:mt-24 lg:mt-32" // Deep step-down cascade
  },
  {
    id: "outreach",
    title: (
      <>
        COMMUNITY<br />ENGAGEMENT
      </>
    ),
    description:
      "We're committed to making a difference, not only on the football pitch, but also in local academies and communities—providing boots, mentorship, and equipment to uplift the next generation of leaders.",
    image: "/Images/motion-images/happy-children.webp",
    bgColor: "bg-[#00843D]", // Forest Green from GOA
    link: "/about",
    staggerClass: "md:mt-48 lg:mt-64" // Deepest step-down cascade
  }
];

export default function CoreExpressions() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const validCards = cardsRef.current.filter(Boolean);
      if (validCards.length > 0) {
        gsap.fromTo(
          validCards,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.1,
            stagger: 0.18,
            ease: "power3.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 80%",
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
      className="pt-12 md:pt-16 pb-24 md:pb-52 px-4 sm:px-6 lg:px-8 bg-white text-black overflow-hidden relative select-none"
    >
      <div className="max-w-[88rem] mx-auto">
        {/* 3-Column Tight Staggered Step-Down Cards (Monolithic Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4 lg:gap-5 items-start">
          {expressions.map((exp, i) => (
            <Link
              key={exp.id}
              href={exp.link}
              ref={(el) => { cardsRef.current[i] = el; }}
              className={`group flex flex-col rounded-none overflow-hidden transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2 cursor-pointer shadow-lg hover:shadow-2xl ${exp.staggerClass}`}
            >
              {/* Top Photo Canvas - Razor Sharp Rectangular Edge */}
              <div className="relative w-full aspect-[4/5] sm:aspect-[3/4] overflow-hidden bg-black/10 rounded-none">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-106"
                  style={{ backgroundImage: `url(${encodeURI(exp.image)})` }}
                />
              </div>

              {/* Bottom Solid Color Block - Razor Sharp Rectangular Slab */}
              <div className={`${exp.bgColor} text-white p-6 sm:p-8 lg:p-10 flex flex-col justify-between min-h-[160px] sm:min-h-[190px] md:min-h-[380px] lg:min-h-[460px] rounded-none`}>
                <div className="space-y-4 md:space-y-6">
                  {/* Ultra-Tall Condensed Headline */}
                  <h3 className="text-4xl sm:text-5xl md:text-5xl lg:text-[4.2rem] xl:text-[4.8rem] font-black uppercase tracking-tighter leading-[0.82] font-display scale-y-[1.2] origin-top-left">
                    {exp.title}
                  </h3>
                  {/* Clean 3-Line Body Copy - Hidden on Mobile */}
                  <p className="hidden md:block text-sm sm:text-base leading-relaxed font-normal text-white/95 max-w-sm pt-3">
                    {exp.description}
                  </p>
                </div>

                {/* Minimalist Bare Wireframe Arrow Icon */}
                <div className="pt-4 md:pt-10">
                  <svg 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="1.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white transition-transform duration-300 ease-out group-hover:translate-x-3"
                  >
                    <line x1="4" y1="12" x2="20" y2="12"></line>
                    <polyline points="14 6 20 12 14 18"></polyline>
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
