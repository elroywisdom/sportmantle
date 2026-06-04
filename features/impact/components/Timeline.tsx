"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const events = [
  {
    date: "Year 1",
    title: "WHEN ATHLETES PRAY — 1st Edition",
    details: "Held in Zuba, FCT. Attendance drawn from FCT and Nasarawa.",
  },
  {
    date: "July 2024",
    title: "WHEN ATHLETES PRAY — 2nd Edition",
    details: "Held at Bible Guest House, Zone 5, Wuse, Abuja.",
  },
  {
    date: "October 2024",
    title: "AFLAME — Holy Ghost Meeting",
    details: "Held in the city of Abuja. Athletes gathered for a powerful spiritual meeting.",
  },
  {
    date: "March 2025",
    title: "Horvel-Prime Outreach",
    details: "The gospel was preached, questions were answered, and food items were distributed in Nyanya, FCT.",
  },
  {
    date: "March 2025",
    title: "SPIRITUALS — 2nd Anniversary",
    details: "A teaching meeting held to celebrate Sportmantle's anniversary, honoring God's faithfulness.",
  },
  {
    date: "May 2025",
    title: "6-Hour Prayer Stretch",
    details: "A time of extended prayer and receiving instructions in righteousness at Adullam, Gudu, Abuja.",
  },
  {
    date: "June 2025",
    title: "7-a-Side Youth Tournament",
    details: "First ever tournament, held in Nasarawa State in partnership with Karu Football Academy.",
  },
  {
    date: "September 2025",
    title: "Kaduna Outreach",
    details: "Partnered with Beta Boys Project to disciple boys aged 8–15 at Baptist Theological Seminary.",
  },
];

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".event-card", {
        x: (i) => (i % 2 === 0 ? -50 : 50),
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-32 px-6 bg-asphalt">
      <div className="max-w-7xl mx-auto space-y-24">
        <div className="text-center space-y-4">
          <h4 className="text-primary text-sm font-black uppercase tracking-[0.3em]">Our Journey</h4>
          <h2 className="text-5xl md:text-8xl font-black uppercase leading-none tracking-tighter">
            MILESTONES <span className="text-primary">OF GRACE</span>
          </h2>
        </div>

        <div className="relative border-l border-white/10 ml-4 md:ml-0 md:border-l-0 md:before:absolute md:before:left-1/2 md:before:top-0 md:before:bottom-0 md:before:w-px md:before:bg-white/10">
          {events.map((event, i) => (
            <div
              key={i}
              className={`event-card relative mb-16 md:w-1/2 ${
                i % 2 === 0 ? "md:pr-12 md:text-right md:ml-0" : "md:pl-12 md:ml-auto"
              }`}
            >
              <div className="bg-grit-gray p-8 border border-white/5 hover:border-primary/30 transition-all">
                <div className="text-primary font-black uppercase tracking-widest text-sm mb-2">{event.date}</div>
                <h3 className="text-2xl font-black uppercase mb-4">{event.title}</h3>
                <p className="text-muted-foreground text-lg leading-snug">{event.details}</p>
              </div>
              
              {/* Timeline dot */}
              <div className={`absolute top-10 size-4 bg-primary rounded-full border-4 border-asphalt ${
                i % 2 === 0 ? "-left-2 md:-right-2 md:left-auto" : "-left-2 md:-left-2"
              }`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
