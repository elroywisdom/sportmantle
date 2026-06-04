"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function StorySection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".reveal-text", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-32 px-6 bg-asphalt">
      <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-16 items-center">
        
        {/* Visual/Image Placeholder Side */}
        <div className="md:col-span-5 relative aspect-[3/4] bg-grit-gray border border-white/5 overflow-hidden group">
           <div className="absolute inset-0 bg-primary/10 group-hover:bg-primary/20 transition-all" />
           <div className="absolute inset-0 flex items-center justify-center p-12">
              <span className="text-7xl font-black text-white/5 uppercase rotate-90 whitespace-nowrap">Est. 2024</span>
           </div>
           {/* Geometric details */}
           <div className="absolute bottom-0 left-0 w-24 h-24 border-l-8 border-b-8 border-primary m-8" />
        </div>

         {/* Text Content Side */}
        <div className="md:col-span-7 space-y-12">
           <div className="space-y-4">
              <h4 className="reveal-text text-primary text-sm font-black uppercase tracking-[0.3em]">The Mandate</h4>
              <h2 className="reveal-text text-5xl md:text-7xl font-black uppercase leading-[0.9] tracking-tighter">
                Raised For <br />
                <span className="text-primary italic">Righteousness</span>
              </h2>
           </div>

           <div className="space-y-8 text-xl text-muted-foreground font-medium leading-relaxed">
              <p className="reveal-text">
                Sportmantle was born out of a clear divine instruction: <span className="text-pure-white italic">"Raise me a people in the sports industry, who will uphold righteousness and justice, through the route of discipleship."</span>
              </p>
              <p className="reveal-text">
                We believe that athletes are not just competitors, but people with a divine identity and purpose on earth. Our mission is to disciple them in the gospel of Jesus Christ and set them free from every hold that hinders their destiny.
              </p>
              <p className="reveal-text">
                Over the last 3+ years, we have been building a stellar system for transformation and growth, establishing righteousness in the hearts of men through consistent teaching and spiritual empowerment.
              </p>
           </div>
           
           <div className="reveal-text grid grid-cols-2 gap-8 pt-8 border-t border-white/10">
              <div>
                 <div className="text-xs font-black uppercase tracking-widest text-primary mb-2">Our Reach</div>
                 <div className="text-4xl font-black">Nations</div>
              </div>
              <div>
                 <div className="text-xs font-black uppercase tracking-widest text-primary mb-2">Our Spirit</div>
                 <div className="text-4xl font-black">Unstoppable</div>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
}
