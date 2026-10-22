"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Newspaper,
  Sparkles,
  ArrowRight,
  BookOpen,
  Mic,
  Crosshair,
  Trophy,
  CheckCircle2,
} from "lucide-react";

const UPCOMING_TOPICS = [
  {
    icon: BookOpen,
    category: "Magazine Feature",
    title: "The Altar Behind the Goalposts",
    description: "In-depth investigative editorial exploring athlete discipleship within competitive academy environments.",
  },
  {
    icon: Mic,
    category: "Exclusive Interview",
    title: "Walking With God at Full Speed",
    description: "Candid dialogue with national collegiate athletes navigating fame, pressure, and unwavering Christian faith.",
  },
  {
    icon: Crosshair,
    category: "Faith & Purpose",
    title: "Righteousness in the Arena",
    description: "Biblical reflections on sportsmanship, biblical ethics, and maintaining Kingdom integrity under secular spotlights.",
  },
  {
    icon: Trophy,
    category: "Tournament Recap",
    title: "Sportmantle Youth Cup Chronicles",
    description: "High-resolution photo essays and life-changing testimonials from our signature 7-a-side championships.",
  },
];

export default function NewsComingSoon() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubscribed(true);
    }
  };

  return (
    <div className="relative min-h-screen bg-black text-pure-white overflow-hidden pt-28 pb-24">
      {/* Background Gradients & Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#E30A0A]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-[#1470AD]/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Grid Pattern Texture Overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        {/* Top Breadcrumb / Tag */}
        <div className="flex items-center gap-3 mb-6">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E30A0A] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E30A0A]"></span>
            </span>
            <span className="text-xs uppercase font-bold tracking-[0.25em] text-white/90">
              News & Insights
            </span>
          </div>
          <span className="text-xs uppercase font-semibold tracking-widest text-[#E30A0A]">
            Editorial Desk — Inaugural Issue Coming Soon
          </span>
        </div>

        {/* Hero Section */}
        <div className="max-w-4xl space-y-6 mb-16">
          <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9] text-pure-white">
            STORIES OF FAITH, <br />
            <span className="text-[#E30A0A] italic font-serif">HONOR & POWER</span> <br />
            IN THE ARENA.
          </h1>
          <p className="text-lg md:text-2xl text-muted-foreground font-normal leading-relaxed max-w-2xl">
            Our editorial desk is currently polishing long-form features, athlete testimonies, ministry dispatches, and Kingdom perspectives across global athletics.
          </p>
        </div>

        {/* Coming Soon Notice Card with Interactive Email Capture */}
        <div className="relative p-8 md:p-12 bg-asphalt/80 border border-white/10 backdrop-blur-xl mb-20 overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#E30A0A]/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#1470AD]">
                <Sparkles className="size-4 text-[#E30A0A]" />
                First Edition in Preparation
              </div>
              <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tight text-white">
                Be the First to Read Our Inaugural Stories
              </h2>
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                Publishing directly from the Sportmantle Content Studio. Get notified the moment our writers and leaders release the first publication.
              </p>
            </div>

            <div className="lg:col-span-5">
              {isSubscribed ? (
                <div className="flex items-center gap-3 p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                  <CheckCircle2 className="size-6 shrink-0" />
                  <div className="text-sm">
                    <p className="font-bold">You're on the list!</p>
                    <p className="text-emerald-400/80 text-xs">We'll alert you as soon as the first article is live.</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="flex-1 px-4 py-3.5 bg-black/60 border border-white/15 text-white placeholder-white/40 text-sm focus:outline-none focus:border-[#E30A0A] transition-colors"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3.5 bg-[#E30A0A] hover:bg-[#b80808] text-white font-bold text-xs uppercase tracking-wider transition-all duration-200 shrink-0 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    Notify Me <ArrowRight className="size-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Forthcoming Columns / Topics Grid */}
        <div className="space-y-8 mb-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#E30A0A] mb-2">
                Editorial Preview
              </p>
              <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-white">
                Upcoming Column Topics
              </h3>
            </div>
            <p className="text-xs text-muted-foreground max-w-sm">
              Articles will automatically display here the moment they are published from the Sportmantle CMS.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {UPCOMING_TOPICS.map((topic, idx) => {
              const Icon = topic.icon;
              return (
                <div
                  key={idx}
                  className="p-6 bg-asphalt/50 border border-white/5 hover:border-white/20 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    <div className="size-11 rounded-none bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-[#E30A0A] group-hover:border-[#E30A0A] transition-colors duration-300">
                      <Icon className="size-5 text-white" />
                    </div>
                    <span className="inline-block text-[11px] font-bold uppercase tracking-widest text-[#1470AD]">
                      {topic.category}
                    </span>
                    <h4 className="text-lg font-bold text-white group-hover:text-primary transition-colors">
                      {topic.title}
                    </h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {topic.description}
                    </p>
                  </div>
                  <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between text-[11px] text-white/40 uppercase tracking-wider">
                    <span>In Production</span>
                    <span className="size-1.5 rounded-full bg-amber-400" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Navigation Suggestions */}
        <div className="p-8 bg-black/60 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-white font-bold text-lg">In the meantime, witness God at work</h4>
            <p className="text-muted-foreground text-sm">
              Explore our completed camps, campus clinics, and youth tournaments across Nigeria.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/projects"
              className="px-6 py-3 bg-white text-black font-bold text-xs uppercase tracking-wider hover:bg-[#E30A0A] hover:text-white transition-colors duration-200"
            >
              Explore Projects
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 border border-white/20 text-white font-bold text-xs uppercase tracking-wider hover:border-white transition-colors duration-200"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
