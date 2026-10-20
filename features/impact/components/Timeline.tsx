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
  Timer, 
  MapPin, 
  Sparkles, 
  Calendar, 
  Activity, 
  RotateCcw,
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

  // Automatically derive timeline events from initialProjects or default projects repository
  const events: TimelineEvent[] = useMemo(() => {
    if (initialProjects && initialProjects.length > 0) {
      return getTimelineEventsFromProjects(initialProjects);
    }
    return TIMELINE_EVENTS;
  }, [initialProjects]);

  const [activeEventIndex, setActiveEventIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [millis, setMillis] = useState("00");

  const activeEvent: TimelineEvent = events[activeEventIndex] || events[0];

  // Dynamic millisecond flicker for athletic stopwatch realism
  useEffect(() => {
    const msInterval = setInterval(() => {
      setMillis(Math.floor(Math.random() * 90 + 10).toString());
    }, 120);
    return () => clearInterval(msInterval);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Central vertical progress line tied to scroll
      if (trackRef.current && progressLineRef.current && containerRef.current) {
        gsap.to(progressLineRef.current, {
          height: "100%",
          ease: "none",
          scrollTrigger: {
            trigger: trackRef.current,
            start: "top 60%",
            end: "bottom 70%",
            scrub: 0.3,
            onUpdate: (self) => {
              const progress = self.progress;
              setScrollProgress(Math.round(progress * 100));

              // Calculate active milestone index based on scroll progress
              const total = events.length;
              const index = Math.min(
                Math.floor(progress * total),
                total - 1
              );
              setActiveEventIndex(index);
            },
          },
        });
      }

      // 2. Animate cards into view alternating from left/right
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
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [events]);

  const scrollToMilestone = (index: number) => {
    const element = document.getElementById(`milestone-node-${index}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const scrollToTop = () => {
    if (containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const totalLaps = events.length < 10 ? `0${events.length}` : `${events.length}`;
  const currentLap = activeEvent.index + 1 < 10 ? `0${activeEvent.index + 1}` : `${activeEvent.index + 1}`;

  return (
    <section 
      ref={containerRef} 
      id="impact-timeline" 
      className="relative py-24 md:py-32 px-4 sm:px-6 bg-asphalt text-white overflow-hidden"
    >
      {/* Background Ambience */}
      <div className="absolute top-1/4 -left-48 size-[500px] bg-primary/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-48 size-[500px] bg-primary/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-mono font-bold tracking-[0.25em] uppercase">
            <Sparkles className="size-3.5" />
            CHRONOLOGICAL IMPACT ARCHIVE
          </div>
          <h2 className="text-4xl sm:text-6xl md:text-8xl font-black uppercase leading-none tracking-tighter">
            MILESTONES <span className="text-primary">OF GRACE</span>
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto">
            Travel through Sportmantle&apos;s journey of faith, youth outreaches, and Kingdom sports events charted dynamically across time.
          </p>
        </div>

        {/* Sticky Stopwatch HUD / Chrono Deck */}
        <div className="sticky top-20 z-40 max-w-4xl mx-auto">
          <div className="bg-neutral-950/90 backdrop-blur-xl border border-white/15 rounded-2xl p-4 sm:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              
              {/* Digital Readout */}
              <div className="flex items-center gap-3.5">
                <div className="p-2.5 rounded-xl bg-primary/20 border border-primary/30 text-primary shrink-0">
                  <Timer className="size-6 animate-pulse" />
                </div>
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                    <Activity className="size-3 text-primary" />
                    <span>TIMECODE SCRUBBER • LAP {currentLap} OF {totalLaps}</span>
                  </div>
                  <div className="flex items-baseline gap-1 font-mono text-2xl sm:text-4xl font-black text-white tracking-wider">
                    <span>{activeEvent.timestamp}</span>
                    <span className="text-primary text-base sm:text-xl">.{millis}</span>
                  </div>
                </div>
              </div>

              {/* Split Stats */}
              <div className="flex items-center gap-4 sm:gap-6 font-mono text-xs border-t sm:border-t-0 sm:border-l border-white/10 pt-3 sm:pt-0 sm:pl-6 w-full sm:w-auto justify-between sm:justify-start">
                <div>
                  <div className="text-muted-foreground uppercase text-[9px] tracking-wider">CURRENT TIME</div>
                  <div className="text-primary font-bold text-sm sm:text-base">{activeEvent.timeLabel}</div>
                </div>
                <div>
                  <div className="text-muted-foreground uppercase text-[9px] tracking-wider">ACTIVE DATE</div>
                  <div className="text-white font-bold text-sm sm:text-base">{activeEvent.date}</div>
                </div>
                <div>
                  <div className="text-muted-foreground uppercase text-[9px] tracking-wider">PROGRESS</div>
                  <div className="text-white font-bold text-sm sm:text-base">{scrollProgress}%</div>
                </div>
                <button
                  onClick={scrollToTop}
                  title="Reset to Genesis"
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-muted-foreground hover:text-white transition-all ml-1"
                >
                  <RotateCcw className="size-3.5" />
                </button>
              </div>

            </div>

            {/* Micro HUD Progress Rail */}
            <div className="mt-3.5 h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/10">
              <div 
                className="h-full bg-gradient-to-r from-red-800 via-primary to-red-400 rounded-full transition-all duration-200"
                style={{ width: `${Math.max(scrollProgress, 5)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Vertical Stopwatch Ruler Timeline Stream */}
        <div 
          ref={trackRef} 
          className="relative max-w-6xl mx-auto pt-8 pb-16"
        >
          {/* Central Vertical Stopwatch Ruler */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 -translate-x-1/2 w-8 pointer-events-none z-10 flex flex-col items-center">
            
            {/* Background Ruler Track */}
            <div className="relative w-2 h-full bg-grit-gray/80 rounded-full overflow-hidden border border-white/10 shadow-inner">
              {/* Dynamic Filling Red Progress Line */}
              <div 
                ref={progressLineRef}
                className="absolute top-0 left-0 w-full bg-gradient-to-b from-primary via-red-600 to-white shadow-[0_0_15px_rgba(178,34,34,0.9)] rounded-full"
                style={{ height: "0%" }}
              />
            </div>

            {/* Calibrated Vertical Ruler Tick Marks */}
            <div className="absolute inset-y-0 w-full flex flex-col justify-between items-center py-6">
              {Array.from({ length: Math.max(events.length * 6, 48) }).map((_, i) => {
                const isMajor = i % 6 === 0;
                return (
                  <div
                    key={i}
                    className={`rounded-full transition-colors ${
                      isMajor 
                        ? "w-4 h-[2px] bg-white/40" 
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
              const isActive = i === activeEventIndex;

              return (
                <div
                  key={event.id}
                  id={`milestone-node-${i}`}
                  className="relative flex flex-col md:flex-row items-center"
                >
                  {/* Central Stopwatch Pin / Node */}
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 top-8 md:top-12 z-20">
                    <button
                      onClick={() => scrollToMilestone(i)}
                      title={`Jump to ${event.title}`}
                      className={`group size-10 md:size-12 rounded-full flex items-center justify-center font-mono text-xs md:text-sm font-black transition-all duration-300 shadow-2xl ${
                        isActive
                          ? "bg-white text-black scale-125 ring-4 ring-primary shadow-[0_0_25px_rgba(178,34,34,0.9)]"
                          : i < activeEventIndex
                          ? "bg-primary text-white border-2 border-white/30"
                          : "bg-neutral-900 text-white/50 border border-white/20 hover:border-primary hover:text-white"
                      }`}
                    >
                      {i + 1}
                      {/* Timestamp tooltip on hover */}
                      <span className="absolute top-full mt-2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity bg-black/95 text-white text-[10px] uppercase font-sans tracking-wider px-2 py-1 rounded border border-white/20 whitespace-nowrap z-30 shadow-xl">
                        {event.timeLabel} • {event.date}
                      </span>
                    </button>
                  </div>

                  {/* Left Column Content Slot (Desktop) */}
                  <div className="w-full md:w-1/2 pl-16 md:pl-0 md:pr-16 text-left">
                    {isEven && (
                      <div className="milestone-card">
                        <MilestoneCard event={event} isActive={isActive} />
                      </div>
                    )}
                  </div>

                  {/* Right Column Content Slot (Desktop) */}
                  <div className="w-full md:w-1/2 pl-16 md:pl-16 text-left">
                    {!isEven && (
                      <div className="milestone-card">
                        <MilestoneCard event={event} isActive={isActive} />
                      </div>
                    )}
                  </div>

                </div>
              );
            })}
          </div>

        </div>

        {/* Footer Scroll Prompt */}
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
  isActive 
}: { 
  event: TimelineEvent; 
  isActive: boolean;
}) {
  return (
    <div 
      className={`group relative bg-gradient-to-b from-neutral-900 via-asphalt to-neutral-950 border rounded-2xl overflow-hidden p-6 sm:p-8 transition-all duration-500 shadow-xl ${
        isActive 
          ? "border-primary/60 shadow-[0_10px_40px_rgba(178,34,34,0.2)] ring-1 ring-primary/40" 
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
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        {/* Photo footer tag */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-white/90 bg-black/75 backdrop-blur-md px-3 py-1.5 rounded border border-white/10">
          <span className="flex items-center gap-1.5 text-primary">
            <Sparkles className="size-3" /> HIGH-RES ARCHIVE EVIDENCE
          </span>
          <span className="text-white/60">TIMECODE: {event.timestamp}</span>
        </div>
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
