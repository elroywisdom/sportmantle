"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "@/shared/components/ui/button";
import gsap from "gsap";

const images = [
  "/Images/motion-images/close-image-of-founder-with-players.webp",
  "/Images/motion-images/athlete-praying.webp",
  "/Images/motion-images/founder-teaching.webp",
  "/Images/motion-images/team-members.webp",
  "/Images/motion-images/sportmantle-competition.webp",
  "/Images/motion-images/founder-addresing-players.webp",
  "/Images/motion-images/founder-awarding-playrt.webp",
  "/Images/motion-images/founder-hugging-athlete.webp",
  "/Images/motion-images/founder-praying-for-a-player.webp",
  "/Images/motion-images/founder-speaking-to-children.webp",
  "/Images/motion-images/founder-speaking-to-young-players.webp",
  "/Images/motion-images/founder-with-ballers.webp",
  "/Images/motion-images/founder-with-club.webp",
  "/Images/motion-images/founder-with-players.webp",
  "/Images/motion-images/founders-possing-for-picture.webp",
  "/Images/motion-images/happy-children.webp",
  "/Images/motion-images/inhouse-prayer.webp",
  "/Images/motion-images/player-leading-prayer.webp",
  "/Images/motion-images/player-praying.webp"
];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    tl.fromTo(
      headlineRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1.4 }
    )
    .fromTo(
      marqueeRef.current,
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0, duration: 1.4 },
      "-=1.1"
    );
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-dvh w-full flex flex-col justify-between items-center bg-black overflow-hidden select-none pt-28 pb-8 md:pt-40 md:pb-0"
    >
      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:40px_40px] z-0" />

      {/* Dynamic Glow Background */}
      <div className="absolute inset-0 pointer-events-none opacity-40 z-0">
        <div className="absolute -top-[20%] -right-[10%] w-[80vw] h-[80vw] bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute top-[40%] -left-[10%] w-[60vw] h-[60vw] bg-primary/5 rounded-full blur-[100px]" />
      </div>

      {/* Central Headline Overlay */}
      <div 
        ref={headlineRef}
        className="flex-1 flex flex-col items-center justify-center relative z-20 max-w-6xl px-6"
      >
        <h1 className="hero-title font-display font-black tracking-tight text-pure-white text-center pointer-events-none">
          Raising A People In Sports <br className="hidden sm:inline" />
          To Uphold Righteousness <br className="hidden sm:inline" />
          And Justice.
        </h1>

        {/* Mobile & Tablet CTA Button */}
        <div className="mt-8 lg:hidden pointer-events-auto relative z-30">
          <Link href="/contact">
            <Button
              className="!bg-[#E30A0A] hover:!bg-[#C20808] !text-white font-bold tracking-wide px-8 py-3 text-base rounded-xl shadow-[0_0_15px_rgba(227,10,10,0.3)] hover:shadow-[0_0_25px_rgba(227,10,10,0.6)] active:scale-95 transition-all duration-300 border-none outline-none cursor-pointer"
            >
              Join Us
            </Button>
          </Link>
        </div>
      </div>

      {/* Infinite Scrolling Marquee Carousel */}
      <div 
        ref={marqueeRef}
        className="w-full relative z-20 overflow-hidden pt-4 pb-0 mt-8"
      >
        {/* Soft edge masking gradients to fade cards nicely at the screen edges */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-r from-black to-transparent z-30 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-black to-transparent z-30 pointer-events-none" />

        <div className="animate-marquee flex gap-4 sm:gap-6 px-2 sm:px-3">
          {/* Double the list to ensure seamless looping */}
          {[...images, ...images].map((imgUrl, i) => (
            <div
              key={i}
              className="relative w-[calc((100vw-32px)/2)] sm:w-[calc((100vw-80px)/3)] lg:w-[calc((100vw-120px)/4)] aspect-[3/4] rounded-2xl overflow-hidden group flex-shrink-0 border border-white/5 shadow-[0_10px_25px_rgba(0,0,0,0.5)] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.03] hover:border-primary/30 active:scale-[0.98] active:grayscale-0 active:brightness-[102%] cursor-pointer grayscale-[25%] brightness-[85%] hover:grayscale-0 hover:brightness-[102%]"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url(${imgUrl})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-700" />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marquee 75s linear infinite;
          animation-delay: 3s;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
        .hero-title {
          font-size: clamp(36px, 9.5vw, 44px) !important;
          line-height: 1.08 !important;
        }
        @media (min-width: 640px) {
          .hero-title {
            font-size: 46px !important;
          }
        }
        @media (min-width: 768px) {
          .hero-title {
            font-size: 58px !important;
          }
        }
        @media (min-width: 1024px) {
          .hero-title {
            font-size: 4.5rem !important;
          }
        }
      `}</style>
    </section>
  );
}
