"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Calendar, MapPin, Zap } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const timelineEvents = [
  {
    date: "Early (Year 1)",
    title: "When Athletes Pray — 1st Edition",
    description: "Held in Zuba, FCT. Attendance drawn from FCT and Nasarawa.",
    category: "Prayer Meeting"
  },
  {
    date: "July 2024",
    title: "When Athletes Pray — 2nd Edition",
    description: "Held at Bible Guest House, Zone 5, Wuse, Abuja.",
    category: "Prayer Meeting"
  },
  {
    date: "October 2024",
    title: "Aflame — Holy Ghost Meeting",
    description: "Held in the city of Abuja. Athletes gathered for a powerful spiritual meeting.",
    category: "Spiritual Meeting"
  },
  {
    date: "March 2025",
    title: "Outreach — Horvel-Prime Football Academy",
    description: "Held in Nyanya, FCT, Abuja. The gospel was preached, questions were answered, and food items were distributed.",
    category: "Outreach"
  },
  {
    date: "March 2025",
    title: "Spirituals — The Righteousness of God",
    description: "A teaching meeting held to celebrate Sportmantle's 2-year anniversary, honoring God's faithfulness.",
    category: "Anniversary / Teaching"
  },
  {
    date: "May 2025",
    title: "6-Hour Prayer Stretch",
    description: "Held at Adullam, Gudu, Abuja. A time of extended prayer and receiving instructions in righteousness through the Holy Spirit.",
    category: "Intensive Prayer"
  },
  {
    date: "June 2025",
    title: "Sportmantle 7-a-Side Youth Tournament",
    description: "First ever tournament, held in Nasarawa State in partnership with Karu Football Academy.",
    category: "Tournament"
  },
  {
    date: "September 2025",
    title: "Kaduna Outreach",
    description: "Partnership with the Beta Boys Project targeting boys aged 8–15 at the Baptist Theological Seminary. Focused on the Gospel, purpose, identity, and skill empowerment.",
    category: "Partnership / Bootcamp"
  }
];

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const eventsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the center line growing down
      gsap.fromTo(lineRef.current, 
        { height: "0%" },
        {
          height: "100%",
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
            end: "bottom 80%",
            scrub: true,
          }
        }
      );

      // Animate each event popping in
      eventsRef.current.forEach((el, index) => {
        if (!el) return;
        const isLeft = index % 2 === 0;
        
        gsap.fromTo(el, 
          { x: isLeft ? -50 : 50, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-32 px-6 bg-asphalt relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary text-sm font-black uppercase tracking-widest mx-auto">
            <Zap className="size-4 fill-current" />
            <span>The Journey</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-pure-white">
            Our <span className="text-primary italic">Impact</span> Timeline
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            A chronological look at our key events, outreaches, and milestones in our mission to uphold righteousness and justice in the sports industry.
          </p>
        </div>

        <div className="relative">
          {/* Background subtle line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-white/10 md:-translate-x-1/2" />
          
          {/* Animated active line */}
          <div 
            ref={lineRef} 
            className="absolute left-4 md:left-1/2 top-0 w-px bg-primary md:-translate-x-1/2 shadow-[0_0_15px_rgba(227,10,10,0.8)]" 
          />

          <div className="space-y-12 md:space-y-24">
            {timelineEvents.map((event, index) => {
              const isLeft = index % 2 === 0;
              return (
                <div 
                  key={event.title}
                  ref={(el) => { eventsRef.current[index] = el; }}
                  className={`relative flex flex-col md:flex-row items-start md:items-center ${isLeft ? 'md:flex-row-reverse' : ''}`}
                >
                  {/* Center Dot */}
                  <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-primary border-4 border-asphalt transform -translate-x-1/2 mt-6 md:mt-0 z-10 shadow-[0_0_10px_rgba(227,10,10,0.8)]" />

                  {/* Content Container */}
                  <div className={`ml-12 md:ml-0 w-full md:w-1/2 ${isLeft ? 'md:pr-16 md:text-right' : 'md:pl-16'}`}>
                    <div className="group bg-grit-gray border border-white/5 p-8 hover:border-primary/50 transition-all relative overflow-hidden">
                      <div className={`absolute top-0 w-1 h-full bg-primary ${isLeft ? 'right-0' : 'left-0'}`} />
                      
                      <div className={`flex items-center gap-2 mb-4 text-primary font-black uppercase tracking-widest text-sm ${isLeft ? 'md:justify-end' : ''}`}>
                        <Calendar className="size-4" />
                        <span>{event.date}</span>
                      </div>
                      
                      <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white mb-3">
                        {event.title}
                      </h3>
                      
                      <p className="text-muted-foreground leading-relaxed">
                        {event.description}
                      </p>

                      <div className={`mt-6 inline-flex items-center gap-2 px-3 py-1 bg-white/5 text-white/60 text-xs font-bold uppercase tracking-widest ${isLeft ? 'md:float-right' : ''}`}>
                        {event.category}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
