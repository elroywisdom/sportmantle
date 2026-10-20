"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MoveRight, MapPin, Quote } from "lucide-react";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const storyChapters = [
  {
    id: "pitch",
    tag: "Field Excellence",
    title: "The Pitch as an Arena of Purpose",
    subtitle: "Junior Tournament • Bingham Clinic",
    description:
      "Skill without character is a short-lived victory. Through high-octane tournaments and clinics, young footballers master tactical awareness, teamwork, and resilience under pressure.",
    image: "/Images/projects/sportmantle-2025/SPORTMANTLE JUNIOR TOURNAMENT /IMG_6721.webp",
    location: "New Karu & Bingham University",
    stat: "12+ Teams Competed",
  },
  {
    id: "altar",
    tag: "Spiritual Depth",
    title: "True Strength Begins On Our Knees",
    subtitle: "When Athletes Pray • AFLAME",
    description:
      "Where competitors step off the turf and into corporate intercession. We guide players to consecrate their careers to God and discover their true identity beyond trophies.",
    image: "/Images/projects/sportmantle-2024/WHEN ATHLETES PRAY 2.0/IMG_0463.webp",
    location: "Abuja, Zuba & FCT",
    stat: "150+ In Intercession",
  },
  {
    id: "outreach",
    tag: "Community Impact",
    title: "Equipping Champions For Life",
    subtitle: "Horvel Prime • Kaduna Beta Boys",
    description:
      "Discipleship that meets physical needs: distributing professional boots, training kits, and scriptures while raising leaders who stand against addiction and compromise.",
    image: "/Images/projects/website-placeholder images-section/founder-speaking-to-young-players.jpeg",
    location: "Nyanya, Karu & Kaduna",
    stat: "200+ Lives Transformed",
  },
];

export default function StorySection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".story-card", {
        y: 60,
        opacity: 0,
        duration: 1.1,
        stagger: 0.18,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-28 px-6 md:px-12 lg:px-20 bg-[#0A0A0A] text-white">
      <div className="max-w-[85rem] mx-auto space-y-20">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/10 pb-10">
          <div className="space-y-3">
            <span className="text-xs font-black uppercase tracking-[0.3em] text-[#E30A0A]">
              The Story In Action
            </span>
            <h2 className="text-[3rem] sm:text-[4.5rem] md:text-[6rem] font-black uppercase tracking-tighter leading-[0.85] scale-y-[1.1] origin-bottom font-display">
              Faith • Skill • <span className="text-[#E30A0A] italic">Discipleship</span>
            </h2>
          </div>
          <p className="text-white/60 text-base md:text-lg max-w-md font-light leading-relaxed">
            We don’t just teach the game—we show athletes new pictures of possibilities and give them the spiritual tools to become.
          </p>
        </div>

        {/* 3-Column Visual Story Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {storyChapters.map((chapter) => (
            <div
              key={chapter.id}
              className="story-card group relative flex flex-col justify-between bg-white/[0.02] border border-white/10 overflow-hidden rounded-sm hover:border-[#E30A0A]/50 transition-all duration-500 hover:-translate-y-2"
            >
              {/* Photo Area with Tag Overlay */}
              <div className="relative w-full aspect-[4/3] overflow-hidden bg-white/5">
                <Image
                  src={chapter.image}
                  alt={chapter.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                
                {/* Floating Category Pill */}
                <span className="absolute top-4 left-4 px-3 py-1 bg-black/70 backdrop-blur-md border border-white/15 text-[0.65rem] font-black uppercase tracking-widest text-[#E30A0A] rounded-full">
                  {chapter.tag}
                </span>

                {/* Location at bottom of photo */}
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-white/80 font-medium">
                  <span className="flex items-center gap-1.5 truncate">
                    <MapPin className="size-3.5 text-[#E30A0A] flex-shrink-0" />
                    {chapter.location}
                  </span>
                  <span className="font-bold text-[#ffc107] flex-shrink-0">
                    {chapter.stat}
                  </span>
                </div>
              </div>

              {/* Text & Content Area */}
              <div className="p-8 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <p className="text-xs font-bold uppercase tracking-widest text-white/40">
                    {chapter.subtitle}
                  </p>
                  <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight font-display text-white group-hover:text-[#E30A0A] transition-colors leading-tight">
                    {chapter.title}
                  </h3>
                  <p className="text-white/60 text-sm md:text-base leading-relaxed pt-2 font-light">
                    {chapter.description}
                  </p>
                </div>

                <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                  <span className="text-xs uppercase tracking-widest font-black text-white/40 group-hover:text-white transition-colors">
                    Explore Expression
                  </span>
                  <span className="text-[#E30A0A] group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Athlete Spotlight Vignette from Magazine (Victor Gidado) */}
        <div className="relative overflow-hidden bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/10 rounded-sm p-8 md:p-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Athlete Photo Column */}
            <div className="lg:col-span-5 relative aspect-[4/5] rounded-sm overflow-hidden border border-white/10 group">
              <Image
                src="/Images/projects/sportmantle-2025/SPORTMANTLE JUNIOR TOURNAMENT /IMG_6794.webp"
                alt="Victor Gidado in match action"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="px-3 py-1 bg-[#E30A0A] text-white text-[0.65rem] font-black uppercase tracking-widest rounded-full">
                  Athlete Spotlight
                </span>
                <p className="text-2xl font-black uppercase font-display text-white mt-2">
                  Victor Gidado
                </p>
                <p className="text-xs font-bold text-white/70 uppercase tracking-widest">
                  Midfield Maestro • Discipleship Pioneer
                </p>
              </div>
            </div>

            {/* Quote & Story Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="size-12 rounded-xl bg-[#E30A0A]/10 border border-[#E30A0A]/30 flex items-center justify-center text-[#E30A0A]">
                <Quote className="size-6" />
              </div>

              <blockquote className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight leading-snug font-display text-white/95 italic">
                &ldquo;SportMantle has been nothing but a blessing. The Discipleship Programme helped me in my walk with God—my prayer life and study of the Word were deeply influenced. I’ve had the privilege of sharing my faith with teammates, planting seeds of the Gospel even in professional spaces.&rdquo;
              </blockquote>

              <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-black uppercase tracking-wider text-white">
                    Victor Gidado
                  </p>
                  <p className="text-xs text-white/50 uppercase tracking-widest font-bold">
                    Sportmantle Magazine Vol. 1 Feature
                  </p>
                </div>

                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#E30A0A] hover:text-white transition-colors"
                >
                  View Tournament Highlights
                  <MoveRight className="size-4" />
                </Link>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
