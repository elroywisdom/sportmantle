import Link from "next/link";
import { ASSETS, CONTACT_INFO } from "@/shared/utils/constants";
import { Instagram, Podcast, MoveRight } from "lucide-react";

const footerLinks = [
  {
    title: "Organization",
    links: [
      { name: "About Us", href: "/about" },
      { name: "Our Mandate", href: "/about#mandate" },
      { name: "Impact Reports", href: "/impact" },
      { name: "Global Outreach", href: "/projects" },
    ],
  },
  {
    title: "Support",
    links: [
      { name: "Partner With Us", href: "/contact" },
      { name: "Donate", href: "/donate" },
      { name: "Volunteer", href: "/get-involved" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-asphalt text-pure-white pt-32 pb-12 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-24">
          
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-8">
            <Link href="/" className="flex items-center gap-3 group">
              <img
                src="/brand/sportmantle logo 2 [Vectorized].svg"
                alt="Sportmantle Logo"
                className="h-20 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </Link>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-sm">
              Raising a people for God in the sports industry who will uphold righteousness and justice.
            </p>
            <div className="flex gap-4">
              <a
                href={CONTACT_INFO.SOCIALS.INSTAGRAM}
                target="_blank"
                rel="noopener noreferrer"
                className="size-12 rounded-none border border-white/10 flex items-center justify-center hover:bg-[#E30A0A] hover:border-[#E30A0A] hover:text-white transition-all text-white/80"
                aria-label="Instagram"
              >
                <Instagram className="size-5" />
              </a>
              <a
                href={CONTACT_INFO.SOCIALS.PODCAST}
                target="_blank"
                rel="noopener noreferrer"
                className="size-12 rounded-none border border-white/10 flex items-center justify-center hover:bg-[#E30A0A] hover:border-[#E30A0A] hover:text-white transition-all text-white/80"
                aria-label="Apple Podcast"
              >
                <Podcast className="size-5" />
              </a>
            </div>
          </div>

          {/* Links Columns */}
          <div className="md:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-12">
            {footerLinks.map((section) => (
              <div key={section.title} className="space-y-6">
                <h4 className="text-xs font-black uppercase tracking-[0.3em] text-primary">{section.title}</h4>
                <ul className="space-y-4">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link href={link.href} className="text-muted-foreground hover:text-pure-white transition-colors text-lg font-medium">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            
            {/* Newsletter/CTA Column */}
            <div className="col-span-2 md:col-span-1 space-y-6">
               <h4 className="text-xs font-black uppercase tracking-[0.3em] text-primary">Newsletter</h4>
               <p className="text-sm text-muted-foreground">Stay updated with our latest missions.</p>
               <div className="relative group">
                  <input 
                    type="email" 
                    placeholder="Email Address" 
                    className="w-full bg-grit-gray border-b border-white/20 py-4 outline-none focus:border-primary transition-colors pr-10"
                  />
                  <button className="absolute right-0 top-1/2 -translate-y-1/2 text-primary">
                     <MoveRight className="size-5" />
                  </button>
               </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
          <div>© {new Date().getFullYear()} SPORTMANTLE NGO. ALL RIGHTS RESERVED.</div>
          <div className="flex gap-8">
             <Link href="#" className="hover:text-primary">Privacy Policy</Link>
             <Link href="#" className="hover:text-primary">Terms of Service</Link>
             <Link href="#" className="hover:text-primary">Cookies</Link>
          </div>
          <div>BORN IN ABUJA, SERVING THE NATIONS.</div>
        </div>
      </div>
    </footer>
  );
}
