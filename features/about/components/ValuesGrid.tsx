"use client";

import Image from "next/image";

const pillars = [
  {
    number: "01",
    title: "Gospel Discipleship",
    description:
      "Discipling athletes in the gospel of Jesus Christ, establishing an unshakeable spiritual foundation anchored in grace.",
    image: "/Images/motion-images/close-image-of-founder-with-players.webp",
    className: "md:col-span-2 lg:col-span-2",
  },
  {
    number: "02",
    title: "Divine Identity",
    description:
      "Equipping athletes with the precise knowledge of God, helping them discover their identity, call, and purpose on earth.",
    image: "/Images/projects/2026/Sportmantle Clinic - BIgham University/smc-final/SMC-89.jpg",
    className: "md:col-span-1 lg:col-span-1",
  },
  {
    number: "03",
    title: "Scriptural Teachings",
    description:
      "Establishing righteousness in the hearts of men through deep scriptural teachings, spiritual alignment, and ethical growth.",
    image: "/Images/projects/sportmantle-2025/2nd Anniversary- Spiritual - the righteousness of God/IMG_0138.webp",
    className: "md:col-span-1 lg:col-span-1",
  },
  {
    number: "04",
    title: "Stellar Training",
    description:
      "Building a stellar educational and physical training system for global transformation, mentorship, and excellence in sports.",
    image: "/Images/projects/2026/Sportmantle Clinic - BIgham University/smc-final/SMC-61.jpg",
    className: "md:col-span-1 lg:col-span-1",
  },
  {
    number: "05",
    title: "Supernatural Freedom",
    description:
      "Setting athletes free from addictions, emotional bondage, and spiritual holds through the power of deliverance.",
    image: "/Images/projects/sportmantle-2024/WHEN ATHLETES PRAY 2.0/IMG_0461.webp",
    className: "md:col-span-2 lg:col-span-1",
  },
];

export default function ValuesGrid() {
  return (
    <section className="py-24 px-6 md:px-12 lg:px-20 bg-[#0A0A0A] text-white border-t border-white/5">
      <div className="max-w-[85rem] mx-auto space-y-14">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div>
            <h2 className="text-[3.2rem] sm:text-[4.5rem] md:text-[6rem] font-black uppercase tracking-tighter leading-[0.85] scale-y-[1.1] origin-bottom font-display text-white">
              The Five <span className="text-[#E30A0A] italic">Pillars</span>
            </h2>
          </div>
          <p className="text-white/60 text-base md:text-lg max-w-md font-light leading-relaxed">
            Every clinic, tournament, and corporate gathering is anchored in these five transformational commitments.
          </p>
        </div>

        {/* Bento Grid with Image Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className={`group relative overflow-hidden rounded-sm border border-white/10 min-h-[360px] p-8 flex flex-col justify-between transition-all duration-500 hover:border-[#E30A0A]/60 hover:-translate-y-1.5 ${pillar.className}`}
            >
              {/* Background Photography with Heavy Dark Gradient Overlay */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={pillar.image}
                  alt={pillar.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  loading="lazy"
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/55 to-black/25 z-10" />
                <div className="absolute inset-0 bg-[#E30A0A]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
              </div>

              {/* Card Top: Number */}
              <div className="relative z-20 flex items-center justify-end">
                <span className="text-5xl md:text-6xl font-black font-display text-white/20 group-hover:text-[#E30A0A]/50 transition-colors">
                  {pillar.number}
                </span>
              </div>

              {/* Card Bottom: Title & Exact Description */}
              <div className="relative z-20 space-y-3 pt-12">
                <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight font-display text-white group-hover:text-[#E30A0A] transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-white/70 text-sm md:text-base leading-relaxed font-light">
                  {pillar.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
