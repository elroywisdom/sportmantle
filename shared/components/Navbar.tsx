"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn } from "@/shared/utils/cn";
import { Button } from "@/shared/components/ui/button";

const navLinks = [
  { name: "About", href: "/about" },
  { name: "Projects", href: "/projects" },
  { name: "Impact", href: "/impact" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-[100] transition-all duration-500 px-6 py-5",
        isScrolled
          ? "bg-asphalt/95 backdrop-blur-xl border-b border-white/5 py-4 shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
          : "bg-asphalt border-b border-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Desktop Navigation Layout */}
        <div className="hidden md:grid grid-cols-3 items-center w-full">
          {/* Logo (Column 1) - Left Aligned */}
          <div className="flex justify-start">
            <Link href="/" className="flex items-center gap-3 group">
              <img
                src="/brand/sportmantle logo 2 [Vectorized].svg"
                alt="Sportmantle Logo"
                className="h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </Link>
          </div>

          {/* Navigation Links (Column 2) - Centered */}
          <div className="flex justify-center">
            <ul className="flex items-center gap-10 text-sm font-medium text-pure-white/90">
              {navLinks.map((link) => (
                <li key={link.name} className="relative group py-2">
                  <Link
                    href={link.href}
                    className="hover:text-primary transition-colors duration-300 relative text-[15px] tracking-wide"
                  >
                    {link.name}
                    {/* Sliding underline indicator */}
                    <span className="absolute bottom-[-4px] left-0 w-full h-[2px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center rounded-full" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Call to Action Button (Column 3) - Right Aligned */}
          <div className="flex justify-end">
            <Link href="/contact">
              <Button
                className="!bg-[#E30A0A] hover:!bg-[#C20808] !text-white font-bold tracking-wide px-8 py-2.5 rounded-xl shadow-[0_0_15px_rgba(227,10,10,0.3)] hover:shadow-[0_0_25px_rgba(227,10,10,0.6)] hover:scale-105 active:scale-95 transition-all duration-300 border-none outline-none cursor-pointer"
              >
                Join Us
              </Button>
            </Link>
          </div>
        </div>

        {/* Mobile Navigation Layout */}
        <div className="flex md:hidden items-center justify-between w-full">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <img
              src="/brand/sportmantle logo 2 [Vectorized].svg"
              alt="Sportmantle Logo"
              className="h-10 w-auto object-contain"
            />
          </Link>

          {/* Mobile Menu Toggle Button */}
          <button
            className="p-2 text-pure-white hover:text-primary transition-colors focus:outline-none cursor-pointer"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-asphalt/98 backdrop-blur-2xl z-[90] flex flex-col items-center justify-center space-y-10 transition-all duration-500 md:hidden",
          isMobileMenuOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-full pointer-events-none"
        )}
      >
        {/* Close Button on Mobile Drawer */}
        <button
          className="absolute top-6 right-6 p-2 text-pure-white hover:text-primary transition-colors focus:outline-none cursor-pointer"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-label="Close menu"
        >
          <X size={32} />
        </button>

        {/* Navigation Links */}
        <ul className="text-center space-y-8 text-2xl font-semibold text-pure-white">
          {navLinks.map((link, idx) => (
            <li
              key={link.name}
              style={{
                transitionDelay: `${idx * 75}ms`,
                transform: isMobileMenuOpen ? "translateY(0)" : "translateY(20px)",
                opacity: isMobileMenuOpen ? 1 : 0,
              }}
              className="transition-all duration-500"
            >
              <Link
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:text-primary transition-colors block py-2"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Join Us button in Mobile Menu */}
        <div
          style={{
            transitionDelay: `${navLinks.length * 75}ms`,
            transform: isMobileMenuOpen ? "translateY(0)" : "translateY(20px)",
            opacity: isMobileMenuOpen ? 1 : 0,
          }}
          className="transition-all duration-500 pt-4"
        >
          <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
            <Button
              className="!bg-[#E30A0A] hover:!bg-[#C20808] !text-white font-bold tracking-wide px-12 py-4 text-lg rounded-xl shadow-[0_0_15px_rgba(227,10,10,0.3)] hover:shadow-[0_0_25px_rgba(227,10,10,0.6)] w-64 transition-all duration-300"
            >
              Join Us
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}

