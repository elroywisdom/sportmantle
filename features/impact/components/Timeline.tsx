"use client";

import { useRef, useEffect, useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Project } from "@/shared/data/projects";
import { 
  TIMELINE_EVENTS, 
  TimelineEvent, 
  getTimelineEventsFromProjects 
} from "../data/timelineEvents";
import { 
  MapPin, 
  Sparkles, 
  Calendar, 
  ChevronDown,
  ArrowUpRight,
  Users
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface TimelineProps {
  initialProjects?: Project[];
}

export default function Timeline({ initialProjects }: TimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);
  const [activeIndices, setActiveIndices] = useState<number[]>([]);

  // Automatically derive timeline events from initialProjects or default projects repository
  const events: TimelineEvent[] = useMemo(() => {
    if (initialProjects && initialProjects.length > 0) {
      return getTimelineEventsFromProjects(initialProjects);
    }
    return TIMELINE_EVENTS;
  }, [initialProjects]);

  useEffect(() => {
    const track = trackRef.current;
    const progressLine = progressLineRef.current;
    if (!track || !progressLine) return;

    // Direct, highly reliable scroll listener for the vertical progress bar
    const updateProgress = () => {
      const rect = track.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate progress starting when the top reaches 60% of viewport, ending when bottom reaches 40%
      const startOffset = windowHeight * 0.6;
      const totalDist = rect.height;
      const scrolled = startOffset - rect.top;
      
      const rawProgress = Math.max(0, Math.min(1, scrolled / totalDist));
      const percentage = rawProgress * 100;
      
      progressLine.style.height = `${percentage}%`;

      // Determine which pins are active based on vertical position
      const passedIndices: number[] = [];
      events.forEach((_, idx) => {
        const pinEl = document.getElementById(`milestone-node-${idx}`);
        if (pinEl) {
          const pinRect = pinEl.getBoundingClientRect();
          if (pinRect.top <= windowHeight * 0.55) {
            passedIndices.push(idx);
          }
        }
      });
      setActiveIndices(passedIndices);
    };

    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    updateProgress();

    // GSAP ScrollTrigger for smooth card entry animations
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".milestone-card");
      cards.forEach((card, i) => {
        const isEven = i % 2 === 0;
        gsap.from(card, {
          x: isEven ? -40 : 40,
          opacity: 0,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      });
    }, containerRef);

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
      ctx.revert();
    };
  }, [events]);

  const scrollToMilestone = (index: number) => {
    const element = document.getElementById(`milestone-node-${index}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <section 
      ref={containerRef} 
      id="impact-timeline" 
      className="relative py-16 md:py-24 px-4 sm:px-6 bg-asphalt text-white overflow-hidden"
    >
      {/* Background Ambience */}
      <div className="absolute top-1/4 -left-48 size-[500px] bg-primary/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-48 size-[500px] bg-primary/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="text-center">
          <h2 className="text-4xl sm:text-6xl md:text-8xl font-black uppercase leading-none tracking-tighter">
            MILESTONES <span className="text-primary">OF GRACE</span>
          </h2>
        </div>

        {/* Vertical Stopwatch Ruler Timeline Stream */}
        <div 
          ref={trackRef} 
          className="relative max-w-6xl mx-auto pt-6 pb-20"
        >
          {/* Central Vertical Stopwatch Ruler Gauge */}
          <div className="absolute left-6 md:left-1/2 top-4 bottom-4 -translate-x-1/2 w-8 pointer-events-none z-10 flex flex-col items-center">
            
            {/* Background Ruler Tube */}
            <div className="relative w-2.5 h-full bg-neutral-900 rounded-full overflow-hidden border border-white/10 shadow-inner">
              {/* Dynamic Filling Red Progress Bar */}
              <div 
                ref={progressLineRef}
                className="absolute top-0 left-0 w-full bg-gradient-to-b from-primary via-red-600 to-white shadow-[0_0_20px_rgba(178,34,34,1)] rounded-full transition-all duration-75 ease-out"
                style={{ height: "0%" }}
              />
            </div>

            {/* Calibrated Vertical Ruler Tick Marks */}
            <div className="absolute inset-y-0 w-full flex flex-col justify-between items-center py-4">
              {Array.from({ length: Math.max(events.length * 8, 64) }).map((_, i) => {
                const isMajor = i % 4 === 0;
                return (
                  <div
                    key={i}
                    className={`rounded-full transition-colors ${
                      isMajor 
                        ? "w-4 h-[2px] bg-white/35" 
                        : "w-2 h-[1px] bg-white/15"
                    }`}
                  />
                );
              })}
            </div>
          </div>

          {/* Alternating Milestone Cards Stream */}
          <div className="space-y-20 md:space-y-28">
            {events.map((event, i) => {
              const isEven = i % 2 === 0;
              const isPassed = activeIndices.includes(i);
              const isCurrent = activeIndices[activeIndices.length - 1] === i;

              return (
                <div
                  key={event.id}
                  id={`milestone-node-${i}`}
                  className="relative flex flex-col md:flex-row items-center"
                >
                  {/* Central Stopwatch Pin / Node */}
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 top-8 md:top-12 z-20 flex flex-col items-center">
                    <button
                      onClick={() => scrollToMilestone(i)}
                      title={`Jump to ${event.title}`}
                      className={`group size-10 md:size-12 rounded-full flex items-center justify-center font-mono text-xs md:text-sm font-black transition-all duration-300 shadow-2xl ${
                        isCurrent
                          ? "bg-white text-black scale-125 ring-4 ring-primary shadow-[0_0_25px_rgba(178,34,34,0.9)]"
                          : isPassed
                          ? "bg-primary text-white border-2 border-white/40 shadow-[0_0_15px_rgba(178,34,34,0.6)]"
                          : "bg-neutral-900 text-white/50 border border-white/20 hover:border-primary hover:text-white"
                      }`}
                    >
                      {i + 1}
                      {/* Timestamp tooltip on hover */}
                      <span className="absolute top-full mt-2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity bg-black/95 text-white text-[10px] uppercase font-sans tracking-wider px-2 py-1 rounded border border-white/20 whitespace-nowrap z-30 shadow-xl">
                        {event.timeLabel} • {event.date}
                      </span>
                    </button>

                    {/* Integrated Timecode Pill */}
                    <div className="mt-2 hidden sm:flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/80 border border-white/10 text-[9px] font-mono text-white/70">
                      <span>{event.timeLabel}</span>
                    </div>
                  </div>

                  {/* Left Column Content Slot (Desktop) */}
                  <div className="w-full md:w-1/2 pl-16 md:pl-0 md:pr-16 text-left">
                    {isEven && (
                      <div className="milestone-card">
                        <MilestoneCard event={event} isActive={isCurrent} isPassed={isPassed} />
                      </div>
                    )}
                  </div>

                  {/* Right Column Content Slot (Desktop) */}
                  <div className="w-full md:w-1/2 pl-16 md:pl-16 text-left">
                    {!isEven && (
                      <div className="milestone-card">
                        <MilestoneCard event={event} isActive={isCurrent} isPassed={isPassed} />
                      </div>
                    )}
                  </div>

                </div>
              );
            })}
          </div>

        </div>

        {/* Footer Prompt */}
        <div className="text-center pt-8 border-t border-white/10 flex flex-col items-center gap-2 text-xs font-mono text-muted-foreground uppercase tracking-wider">
          <div className="flex items-center gap-2 text-primary font-bold">
            <Sparkles className="size-4" />
            <span>COMMITTED TO CONTINUED TRANSFORMATION</span>
          </div>
          <span>Sportmantle Missions • 2023 — Present</span>
          <ChevronDown className="size-4 text-white/30 animate-bounce mt-2" />
        </div>

      </div>
    </section>
  );
}

// Reusable Athletic Milestone Card Component
function MilestoneCard({ 
  event, 
  isActive,
  isPassed 
}: { 
  event: TimelineEvent; 
  isActive: boolean;
  isPassed: boolean;
}) {
  return (
    <div 
      className={`group relative bg-gradient-to-b from-neutral-900 via-asphalt to-neutral-950 border rounded-2xl overflow-hidden p-6 sm:p-8 transition-all duration-500 shadow-xl ${
        isActive 
          ? "border-primary/80 shadow-[0_10px_40px_rgba(178,34,34,0.3)] ring-1 ring-primary/50" 
          : isPassed
          ? "border-white/20"
          : "border-white/10 hover:border-white/25"
      }`}
    >
      {/* Top red accent glow */}
      <div 
        className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent transition-opacity duration-500 ${
          isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        }`} 
      />

      {/* Meta Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-primary/20 text-primary border border-primary/30 rounded font-mono text-xs font-bold uppercase tracking-widest flex items-center gap-1.5">
            <Calendar className="size-3" />
            {event.date}
          </span>
          <span className="px-2.5 py-1 bg-white/5 text-white/70 border border-white/10 rounded font-mono text-xs uppercase">
            {event.tag}
          </span>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs text-white/60">
          <span className="text-primary font-bold">LAP {event.index + 1 < 10 ? `0${event.index + 1}` : event.index + 1}</span>
          <span>•</span>
          <span>{event.timeLabel}</span>
        </div>
      </div>

      {/* Title */}
      <h3 className="text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-tight text-white mb-3 leading-snug group-hover:text-primary transition-colors">
        {event.title}
      </h3>

      {/* Location & Attendance */}
      <div className="flex flex-wrap items-center gap-4 text-xs font-mono mb-5">
        <div className="flex items-center gap-1.5 text-primary font-bold uppercase tracking-wider">
          <MapPin className="size-3.5 shrink-0" />
          <span>{event.location}</span>
        </div>
        {event.attendance && (
          <div className="flex items-center gap-1.5 text-white/60">
            <Users className="size-3.5 shrink-0 text-white/40" />
            <span>{event.attendance}</span>
          </div>
        )}
      </div>

      {/* Details Description */}
      <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6">
        {event.details}
      </p>

      {/* Archive Image Frame */}
      <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden border border-white/10 bg-neutral-950 group-hover:border-primary/30 transition-all mb-4">
        <Image
          src={event.image}
          alt={event.title}
          fill
          className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
          sizes="(max-width: 768px) 100vw, 45vw"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Link to Full Project Details */}
      {event.slug && (
        <div className="pt-2 flex justify-end">
          <Link
            href={`/projects/${event.slug}`}
            className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-white/70 hover:text-primary transition-colors group/link"
          >
            <span>View Full Project Case & Gallery</span>
            <ArrowUpRight className="size-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      )}

    </div>
  );
}
