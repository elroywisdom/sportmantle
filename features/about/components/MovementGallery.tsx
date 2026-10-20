"use client";

import Image from "next/image";
import Link from "next/link";
import { MoveRight, Camera } from "lucide-react";

const galleryMoments = [
  {
    image: "/Images/projects/2026/Sportmantle Clinic - BIgham University/smc-final/SMC-71.jpg",
    title: "Bingham University Clinic",
    year: "2026",
    tag: "Athletic Excellence",
  },
  {
    image: "/Images/projects/sportmantle-2024/WHEN ATHLETES PRAY 2.0/IMG_0461.webp",
    title: "When Athletes Pray 2.0",
    year: "2024",
    tag: "Corporate Worship",
  },
  {
    image: "/Images/projects/sportmantle-2025/SPORTMANTLE JUNIOR TOURNAMENT /IMG_6763.webp",
    title: "Junior Tournament New Karu",
    year: "2025",
    tag: "Youth Competition",
  },
  {
    image: "/Images/projects/sportmantle-2024/AFLAME/IMG_1739.webp",
    title: "AFLAME Holy Ghost Meeting",
    year: "2024",
    tag: "Spiritual Fire",
  },
  {
    image: "/Images/projects/sportmantle-2025/2nd Anniversary- Spiritual - the righteousness of God/IMG_0154.webp",
    title: "2-Year Anniversary: Spirituals",
    year: "2025",
    tag: "Celebration",
  },
  {
    image: "/Images/projects/2026/Sportmantle Clinic - BIgham University/smc-white-pictures/OGB-101.jpg",
    title: "Collegiate Discipleship",
    year: "2026",
    tag: "Mentorship",
  },
];

export default function MovementGallery() {
  return (
    <section className="py-28 px-6 md:px-12 lg:px-20 bg-[#0A0A0A] text-white border-t border-white/5">
      <div className="max-w-[85rem] mx-auto space-y-16">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div className="space-y-3">
            <span className="text-xs font-black uppercase tracking-[0.3em] text-[#E30A0A] flex items-center gap-2">
              <Camera className="size-3.5" /> 3 Years Of Captured Encounters
            </span>
            <h2 className="text-[3rem] sm:text-[4.5rem] md:text-[6rem] font-black uppercase tracking-tighter leading-[0.85] scale-y-[1.1] origin-bottom font-display">
              The Movement <span className="text-[#E30A0A] italic">In Frames</span>
            </h2>
          </div>
          <Link
            href="/projects"
            className="group inline-flex items-center gap-3 text-xs font-black uppercase tracking-widest text-white/70 hover:text-white transition-colors pb-2"
          >
            Explore All Projects
            <MoveRight className="size-4 group-hover:translate-x-1.5 transition-transform text-[#E30A0A]" />
          </Link>
        </div>

        {/* 6-Photo Masonry Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryMoments.map((moment, idx) => (
            <div
              key={idx}
              className="group relative aspect-[4/3] rounded-sm overflow-hidden border border-white/10 bg-white/5 cursor-pointer shadow-lg hover:border-[#E30A0A]/50 transition-all duration-500"
            >
              <Image
                src={moment.image}
                alt={moment.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-85 group-hover:opacity-90 transition-opacity" />

              {/* Top Tag Pill */}
              <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
                <span className="px-2.5 py-1 bg-black/60 backdrop-blur-md border border-white/10 rounded-full text-[0.65rem] font-black uppercase tracking-widest text-[#E30A0A]">
                  {moment.tag}
                </span>
                <span className="text-xs font-bold text-white/60">
                  {moment.year}
                </span>
              </div>

              {/* Bottom Caption */}
              <div className="absolute bottom-4 left-4 right-4 z-10">
                <p className="text-lg font-black uppercase tracking-tight font-display text-white group-hover:text-[#E30A0A] transition-colors">
                  {moment.title}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
