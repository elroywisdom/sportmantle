"use client";

import { Shield, Zap, Target, Heart, Anchor, Waves } from "lucide-react";

const values = [
  {
    title: "Discipleship",
    description: "Discipling athletes in the gospel of Jesus Christ and their divine identity.",
    icon: Anchor,
    className: "bg-grit-gray lg:col-span-2",
    number: "01"
  },
  {
    title: "Empowerment",
    description: "Equipping athletes with knowledge of God and their purpose on earth.",
    icon: Shield,
    className: "bg-primary text-white",
    number: "02"
  },
  {
    title: "Transformation",
    description: "Building stellar educational systems for growth in every nation.",
    icon: Target,
    className: "bg-asphalt lg:row-span-2",
    number: "03"
  },
  {
    title: "Righteousness",
    description: "Establishing righteousness in the hearts of men through teachings.",
    icon: Zap,
    className: "bg-grit-gray",
    number: "04"
  },
  {
    title: "Deliverance",
    description: "Setting athletes free from addictions, bondage, and demonic holds.",
    icon: Waves,
    className: "bg-primary text-white lg:col-span-2",
    number: "05"
  },
];

export default function ValuesGrid() {
  return (
    <section className="py-32 px-6 bg-black">
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="space-y-4">
           <h4 className="text-primary text-sm font-black uppercase tracking-[0.3em]">The Core</h4>
           <h2 className="text-5xl md:text-8xl font-black uppercase leading-none tracking-tighter">
             OUR <span className="text-primary">VALUES</span>
           </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {values.map((v) => (
            <div
              key={v.title}
              className={`relative overflow-hidden p-12 flex flex-col justify-between border border-white/5 transition-all hover:border-primary/50 group ${v.className}`}
            >
              <div className="absolute top-8 right-8 text-6xl font-black opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                 {v.number}
              </div>
              
              <div className={`size-14 flex items-center justify-center mb-12 ${v.className.includes('bg-primary') ? 'bg-white text-primary' : 'bg-primary/10 text-primary'}`}>
                 <v.icon className="size-8" />
              </div>

              <div className="space-y-4">
                 <h3 className="text-3xl font-black uppercase tracking-tight">{v.title}</h3>
                 <p className={`text-lg leading-snug ${v.className.includes('bg-primary') ? 'text-white/80' : 'text-muted-foreground'}`}>
                   {v.description}
                 </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
