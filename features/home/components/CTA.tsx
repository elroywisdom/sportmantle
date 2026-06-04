import { Button } from "@/shared/components/ui/button";
import { MoveRight } from "lucide-react";

export default function CTA() {
  return (
    <section className="relative py-40 px-6 bg-black text-center overflow-hidden">
      {/* Intense Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl max-h-4xl bg-primary/20 rounded-full blur-[180px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto space-y-12">
        <div className="uppercase font-black tracking-[0.5em] text-primary text-sm">
          Join the Movement
        </div>
        
        <h2 className="text-6xl md:text-[8rem] lg:text-[10rem] font-black uppercase leading-[0.75] tracking-[-0.05em] text-pure-white">
          PLAY FOR THE <br />
          <span className="text-primary italic">HIGHEST</span> <br />
          KINGDOM
        </h2>

        <p className="text-xl md:text-2xl max-w-2xl mx-auto text-muted-foreground font-medium">
          Whether you're an athlete, a fan, or a partner—there's a mantle waiting for you to pick up.
        </p>

        <div className="flex justify-center pt-8">
          <Button
            size="lg"
            className="h-20 px-16 text-2xl font-black uppercase tracking-widest rounded-none bg-primary hover:bg-red-700 transition-all hover:px-20 flex items-center gap-4 group"
          >
            Get Started
            <MoveRight className="size-8 transition-transform group-hover:translate-x-4" />
          </Button>
        </div>
      </div>

      {/* Background Graphic Hint */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
    </section>
  );
}
