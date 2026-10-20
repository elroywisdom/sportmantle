"use client";

import Image from "next/image";

export default function FoundersMessage() {
  return (
    <section className="relative py-28 px-6 md:px-12 lg:px-20 bg-[#0A0A0A] text-white border-t border-white/10 overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 -left-40 w-96 h-96 bg-[#E30A0A]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-[30vw] h-[30vw] bg-white/[0.02] rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-[85rem] mx-auto space-y-16 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div>
            <span className="text-[#E30A0A] text-xs md:text-sm font-bold uppercase tracking-[0.25em] font-display block mb-3">
              Visionary Profile
            </span>
            <h2 className="text-[3.2rem] sm:text-[4.5rem] md:text-[6rem] font-black uppercase tracking-tighter leading-[0.85] scale-y-[1.1] origin-bottom font-display text-white">
              The Founder&apos;s <span className="text-[#E30A0A] italic">Heart</span>
            </h2>
          </div>
          <p className="text-white/60 text-base md:text-lg max-w-md font-light leading-relaxed">
            From years on the competitive pitch to a divine mandate: discipling champions for the Kingdom of God.
          </p>
        </div>

        {/* Editorial Feature Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Visual Photography Stack */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Primary Image: Founder Teaching at the Altar */}
              <div className="relative h-[480px] sm:h-[540px] md:h-[600px] w-full rounded-sm overflow-hidden border border-white/10 bg-black/60 shadow-2xl group">
                <Image
                  src="/Images/motion-images/founder-teaching.webp"
                  alt="Joshua Paul Dandaldi - SportMantle Founder"
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20" />
                
                {/* Image Overlay Label */}
                <div className="absolute bottom-6 left-6 right-6 p-4 bg-black/75 backdrop-blur-md border border-white/10 rounded-sm">
                  <p className="text-white font-bold text-lg font-display uppercase tracking-wide">
                    Joshua Paul Dandaldi
                  </p>
                  <p className="text-[#E30A0A] text-xs font-semibold uppercase tracking-wider">
                    Founder &amp; Lead Visionary, SportMantle
                  </p>
                </div>
              </div>

              {/* Secondary Floating Moment: In-Person Prayer / Ministry */}
              <div className="hidden sm:block absolute -bottom-8 -right-6 md:-right-8 w-44 md:w-52 h-56 rounded-sm overflow-hidden border-2 border-[#E30A0A]/50 bg-black shadow-2xl">
                <Image
                  src="/Images/motion-images/founder-praying-for-a-player.webp"
                  alt="Joshua Paul praying with an athlete"
                  fill
                  sizes="200px"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <span className="absolute bottom-2 left-2 right-2 text-[10px] text-white/90 font-medium tracking-tight text-center block">
                  Discipleship In Action
                </span>
              </div>

            </div>
          </div>

          {/* Right Column: Founder's Story & The Mandate */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* The Big Quote */}
            <div className="space-y-4">
              <span className="text-6xl text-[#E30A0A] font-serif leading-none block">&ldquo;</span>
              <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.6rem] font-black uppercase tracking-tight leading-[1.05] font-display text-white -mt-6">
                I want to see the <span className="text-[#E30A0A] italic">Gospel</span> spread in the sports industry across nations.
              </h3>
            </div>

            {/* Narrative Body from Magazine */}
            <div className="space-y-5 text-white/75 text-base sm:text-lg leading-relaxed font-light">
              <p>
                <strong className="text-white font-semibold">Paul Joshua</strong> is a believer in the Lord Jesus Christ, a husband, a sports consultant, and a passionate sports enthusiast.
              </p>
              <p>
                For most of his teenage and early adult years, he was an active footballer, competing for diverse football clubs and academies across <span className="text-white font-medium">Abuja, Nasarawa, Lagos, and Ekiti</span>. Living through the pressures, locker-room battles, and spiritual voids athletes encounter, his conviction grew clear.
              </p>
              <p>
                As an astute lover of God, his heart burns with the singular desire to see the power of Christ transform athletic spaces—a conviction that gave birth to <span className="text-white font-semibold">SportMantle</span>.
              </p>
            </div>

            {/* Twin Vision Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-5 bg-white/[0.03] border-l-2 border-[#E30A0A] border-y border-r border-white/5 space-y-2">
                <span className="text-xs uppercase tracking-wider text-[#E30A0A] font-bold font-display">
                  Core Mission 01
                </span>
                <p className="text-white font-medium text-sm sm:text-base leading-snug">
                  To preach the uncompromised gospel of Christ to athletes and sports professionals across the globe.
                </p>
              </div>

              <div className="p-5 bg-white/[0.03] border-l-2 border-[#E30A0A] border-y border-r border-white/5 space-y-2">
                <span className="text-xs uppercase tracking-wider text-[#E30A0A] font-bold font-display">
                  Core Mission 02
                </span>
                <p className="text-white font-medium text-sm sm:text-base leading-snug">
                  To raise transformed champions living purposeful lives through mind renewal by the Word of God.
                </p>
              </div>
            </div>

            {/* Signature Block */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <div>
                <p className="text-white font-bold font-display tracking-tight text-lg">
                  Joshua Paul Dandaldi
                </p>
                <p className="text-white/50 text-xs sm:text-sm uppercase tracking-wider font-display">
                  Visionary &amp; Lead | SportMantle Global
                </p>
              </div>
              <div className="text-right">
                <span className="text-xs text-white/40 font-mono tracking-widest uppercase">
                  Sportmantle Magazine Vol. 1
                </span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
