"use client";

import { MessageSquareQuote } from "lucide-react";

const stories = [
  {
    quote: "Sportmantle changed my perspective on competition. I now play for a higher purpose.",
    author: "Samuel O.",
    role: "Professional Footballer",
  },
  {
    quote: "The leadership retreat equipped me to lead my academy with integrity and faith.",
    author: "David K.",
    role: "Academy Director",
  },
];

export default function SuccessStories() {
  return (
    <section className="py-24 px-6 bg-black">
      <div className="max-w-4xl mx-auto space-y-16">
        <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-center">
          Field <span className="text-primary italic">Reports</span>
        </h2>
        
        <div className="space-y-12">
          {stories.map((s, i) => (
            <div key={i} className="relative p-12 bg-grit-gray border border-white/5 space-y-6">
              <MessageSquareQuote className="size-12 text-primary opacity-20 absolute top-8 right-8" />
              <p className="text-2xl md:text-3xl font-medium leading-normal text-pure-white italic">
                 "{s.quote}"
              </p>
              <div className="pt-6 border-t border-white/10">
                 <div className="font-black uppercase tracking-widest text-primary">{s.author}</div>
                 <div className="text-xs font-bold text-muted-foreground uppercase">{s.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
