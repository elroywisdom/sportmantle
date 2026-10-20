"use client";

import Image from "next/image";
import { Quote, Sparkles, HeartHandshake, ShieldCheck } from "lucide-react";

export default function VisionaryProfile() {
  return (
    <section className="py-28 px-6 md:px-12 lg:px-20 bg-[#0A0A0A] text-white border-t border-white/5">
      <div className="max-w-[85rem] mx-auto space-y-16">
        
        {/* Header Label */}
        <div className="flex items-center gap-3">
          <span className="size-2 rounded-full bg-[#E30A0A] animate-ping" />
          <span className="text-xs font-black uppercase tracking-[0.3em] text-[#E30A0A]">
            The Visionary Behind The Mantle
          </span>
        </div>

        {/* 2-Column Split: Visual Gallery on Left, Punchy Profile on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Dual Photo Collage */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="relative aspect-[3/4] rounded-sm overflow-hidden border border-white/10 group">
              <Image
                src="/Images/projects/website-placeholder images-section/founder-teaching.jpeg"
                alt="Joshua Paul Dandaldi teaching athletes"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 text-left">
                <span className="text-[0.65rem] font-black uppercase tracking-wider text-[#E30A0A]">Mentorship</span>
                <p className="text-sm font-bold uppercase font-display text-white">Discipling On The Turf</p>
              </div>
            </div>

            <div className="relative aspect-[3/4] rounded-sm overflow-hidden border border-white/10 group mt-8">
              <Image
                src="/Images/projects/website-placeholder images-section/founder-speaking-to-young-players.jpeg"
                alt="Joshua Paul Dandaldi addressing youth team"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 text-left">
                <span className="text-[0.65rem] font-black uppercase tracking-wider text-[#E30A0A]">Leadership</span>
                <p className="text-sm font-bold uppercase font-display text-white">Shaping The Next Generation</p>
              </div>
            </div>
          </div>

          {/* Profile Narrative & Quote */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#E30A0A]/10 border border-[#E30A0A]/20 text-[#E30A0A] text-xs font-bold uppercase tracking-widest rounded-full">
                <Sparkles className="size-3" />
                Founder & Movement Lead
              </div>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tighter leading-none font-display">
                Joshua Paul <br />
                <span className="text-[#E30A0A] italic">Dandaldi</span>
              </h2>
            </div>

            {/* Core Quote */}
            <div className="relative pl-6 border-l-2 border-[#E30A0A] space-y-2">
              <Quote className="size-8 text-[#E30A0A]/30 absolute -top-4 -left-4" />
              <p className="text-2xl md:text-3xl font-black tracking-tight font-display text-white italic">
                &ldquo;I want to see the Gospel spread in the sports industry.&rdquo;
              </p>
            </div>

            {/* Short Punchy Story */}
            <p className="text-white/70 text-base md:text-lg leading-relaxed font-light">
              An active football player for various clubs and academies across <span className="text-white font-medium">Abuja, Nasarawa, Lagos, and Ekiti</span> throughout his youth, Joshua understood firsthand the identity crises and moral compromises athletes face in secular locker rooms.
            </p>

            <p className="text-white/70 text-base md:text-lg leading-relaxed font-light">
              His heart burned with a singular conviction: to see competitors transformed through the renewal of their minds and to raise ambassadors for Christ in professional sports. That conviction birthed <span className="text-white font-semibold">SportMantle</span>.
            </p>

            {/* 2 Key Commitments */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/10">
              <div className="p-4 bg-white/5 border border-white/5 rounded-sm space-y-1">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#E30A0A]">
                  <HeartHandshake className="size-4" />
                  Preach The Gospel
                </div>
                <p className="text-xs text-white/60 leading-relaxed">
                  Reaching competitors across nations with eternal salvation in Jesus Christ.
                </p>
              </div>

              <div className="p-4 bg-white/5 border border-white/5 rounded-sm space-y-1">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#E30A0A]">
                  <ShieldCheck className="size-4" />
                  Transform Mindsets
                </div>
                <p className="text-xs text-white/60 leading-relaxed">
                  Anchoring players in righteousness so they stand unshakeable on and off the field.
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
