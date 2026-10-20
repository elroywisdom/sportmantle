"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { 
  User, 
  Building2, 
  Rocket, 
  Mail, 
  Phone, 
  MapPin, 
  CheckCircle2, 
  ArrowRight, 
  Loader2,
  Sparkles,
  Instagram,
  Podcast,
  Clock
} from "lucide-react";
import Footer from "@/features/home/components/Footer";
import { CONTACT_INFO } from "@/shared/utils/constants";

// Available Category Types
type Category = "athlete" | "partner" | "outreach";

function ContactForm() {
  const searchParams = useSearchParams();
  const [category, setCategory] = useState<Category>("athlete");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // Form values state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    // Athlete-specific
    age: "",
    sport: "",
    // Partner-specific
    organization: "",
    partnershipType: "financial",
    // Outreach-specific
    outreachInterest: "pray",
    // General
    message: "",
  });

  // Validation / Touched states
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Sync category from search params on mount
  useEffect(() => {
    const catParam = searchParams.get("category");
    if (catParam === "athlete" || catParam === "partner" || catParam === "outreach") {
      setCategory(catParam as Category);
    }
  }, [searchParams]);

  // Handle Input Changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Run validation on field exit
  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    validateField(name, value);
  };

  const validateField = (name: string, value: string) => {
    let errorMsg = "";
    
    if (!value && name !== "organization") {
      errorMsg = "This field is required";
    } else if (name === "email" && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        errorMsg = "Please enter a valid email address";
      }
    } else if (name === "phone" && value) {
      const phoneRegex = /^[+]?[0-9\s\-()]{8,20}$/;
      if (!phoneRegex.test(value)) {
        errorMsg = "Please enter a valid phone number";
      }
    } else if (name === "age" && value && category === "athlete") {
      const numAge = parseInt(value, 10);
      if (isNaN(numAge) || numAge < 5 || numAge > 100) {
        errorMsg = "Age must be between 5 and 100";
      }
    }

    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: Record<string, string> = {};
    const fieldsToValidate = ["name", "email", "phone", "message"];
    if (category === "athlete") {
      fieldsToValidate.push("age", "sport");
    }

    fieldsToValidate.forEach((field) => {
      const val = formData[field as keyof typeof formData] || "";
      if (!val) {
        newErrors[field] = "This field is required";
      }
    });

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (formData.phone && !/^[+]?[0-9\s\-()]{8,20}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }
    if (category === "athlete" && formData.age) {
      const numAge = parseInt(formData.age, 10);
      if (isNaN(numAge) || numAge < 5 || numAge > 100) {
        newErrors.age = "Age must be between 5 and 100";
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      const touchedAll = fieldsToValidate.reduce((acc, field) => ({ ...acc, [field]: true }), {});
      setTouched(touchedAll);
      
      const firstInvalidField = Object.keys(newErrors)[0];
      const el = document.getElementsByName(firstInvalidField)[0];
      if (el) el.focus();
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 1200);
  };

  return (
    <div className="w-full min-h-screen bg-[#0A0A0A] text-white relative pt-28 md:pt-36 pb-24 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/4 -left-48 size-[500px] bg-[#B22222]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-48 size-[500px] bg-[#B22222]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 space-y-12">
        {/* Header Section */}
        <div className="space-y-4">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-white/50 hover:text-white text-xs font-mono uppercase tracking-wider transition-colors group"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to home
          </Link>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tighter font-display leading-none">
                Pick Up Your <span className="text-[#B22222] italic">Mantle</span>
              </h1>
              <p className="text-white/60 text-base sm:text-lg mt-3 max-w-xl font-light">
                Connect with our team in Abuja for discipleship, ministry partnership, or youth outreaches.
              </p>
            </div>
            
            {/* Quick response pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-white/70 self-start md:self-auto">
              <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Responses within 24 Hours</span>
            </div>
          </div>
        </div>

        {/* Main Grid Content */}
        {!isSubmitted ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            
            {/* Left Column: Visual Photography Card & Direct Channels */}
            <div className="lg:col-span-5 space-y-8">
              
              {/* Visual Anchor: Cinematic Ministry Photo Card */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 shadow-2xl group bg-neutral-950">
                <Image
                  src="/Images/projects/website-placeholder images-section/founder-hugging-athlete.jpg"
                  alt="Sportmantle Discipleship Fellowship"
                  fill
                  priority
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 filter brightness-95"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Direct Contact Channels */}
              <div className="space-y-3.5">
                <h4 className="text-xs font-mono uppercase tracking-widest text-white/40 font-bold">
                  Direct Channels
                </h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
                  {/* Email */}
                  <a 
                    href={`mailto:${CONTACT_INFO.EMAIL}`}
                    className="p-4 rounded-xl bg-white/[0.02] border border-white/10 hover:border-[#B22222]/50 hover:bg-white/[0.04] transition-all flex items-center gap-3.5 group"
                  >
                    <div className="size-10 rounded-lg bg-[#B22222]/10 border border-[#B22222]/20 flex items-center justify-center text-[#B22222] group-hover:bg-[#B22222] group-hover:text-white transition-all shrink-0">
                      <Mail className="size-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[10px] font-mono text-white/40 uppercase">Email Directly</div>
                      <div className="text-sm font-semibold text-white/90 truncate group-hover:text-[#B22222] transition-colors">
                        {CONTACT_INFO.EMAIL}
                      </div>
                    </div>
                  </a>

                  {/* Phone / WhatsApp */}
                  <a 
                    href={`tel:${CONTACT_INFO.PHONE_TEL || CONTACT_INFO.PHONE.replace(/\s+/g, '')}`}
                    className="p-4 rounded-xl bg-white/[0.02] border border-white/10 hover:border-[#B22222]/50 hover:bg-white/[0.04] transition-all flex items-center gap-3.5 group"
                  >
                    <div className="size-10 rounded-lg bg-[#B22222]/10 border border-[#B22222]/20 flex items-center justify-center text-[#B22222] group-hover:bg-[#B22222] group-hover:text-white transition-all shrink-0">
                      <Phone className="size-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[10px] font-mono text-white/40 uppercase">Call / WhatsApp</div>
                      <div className="text-sm font-semibold text-white/90 truncate group-hover:text-[#B22222] transition-colors">
                        {CONTACT_INFO.PHONE}
                      </div>
                    </div>
                  </a>

                  {/* HQ Location */}
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 flex items-center gap-3.5 sm:col-span-2 lg:col-span-1">
                    <div className="size-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/70 shrink-0">
                      <MapPin className="size-4" />
                    </div>
                    <div>
                      <div className="text-[10px] font-mono text-white/40 uppercase">Headquarters</div>
                      <div className="text-sm font-semibold text-white/90">
                        {CONTACT_INFO.ADDRESS}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="pt-2 flex items-center gap-3">
                <span className="text-xs font-mono text-white/40 uppercase">Connect:</span>
                <a 
                  href={CONTACT_INFO.SOCIALS.INSTAGRAM} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="px-3.5 py-2 rounded-lg bg-white/5 border border-white/10 hover:border-[#B22222] hover:bg-[#B22222] text-white/80 hover:text-white transition-all text-xs font-mono flex items-center gap-2 group"
                >
                  <Instagram className="size-3.5" />
                  <span>Instagram</span>
                </a>
                <a 
                  href={CONTACT_INFO.SOCIALS.PODCAST} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="px-3.5 py-2 rounded-lg bg-white/5 border border-white/10 hover:border-[#B22222] hover:bg-[#B22222] text-white/80 hover:text-white transition-all text-xs font-mono flex items-center gap-2 group"
                >
                  <Podcast className="size-3.5" />
                  <span>Apple Podcast</span>
                </a>
              </div>

            </div>

            {/* Right Column: Clean High-Conversion Form */}
            <div className="lg:col-span-7 bg-neutral-900/40 border border-white/10 p-6 sm:p-10 rounded-2xl shadow-2xl backdrop-blur-xl relative">
              
              {/* Category Segmented Control */}
              <div className="mb-8">
                <div className="text-xs text-white/50 uppercase tracking-widest font-mono mb-3">
                  I am reaching out as:
                </div>
                <div className="grid grid-cols-3 gap-2 bg-black/40 p-1.5 rounded-xl border border-white/10">
                  <button
                    type="button"
                    onClick={() => setCategory("athlete")}
                    className={`py-3 px-3 text-xs md:text-sm font-black uppercase tracking-wider rounded-lg transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                      category === "athlete"
                        ? "bg-[#B22222] text-white shadow-[0_0_20px_rgba(178,34,34,0.5)]"
                        : "text-white/60 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <User className="size-4" />
                    <span>Athlete</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setCategory("partner")}
                    className={`py-3 px-3 text-xs md:text-sm font-black uppercase tracking-wider rounded-lg transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                      category === "partner"
                        ? "bg-[#B22222] text-white shadow-[0_0_20px_rgba(178,34,34,0.5)]"
                        : "text-white/60 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <Building2 className="size-4" />
                    <span>Partner</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setCategory("outreach")}
                    className={`py-3 px-3 text-xs md:text-sm font-black uppercase tracking-wider rounded-lg transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                      category === "outreach"
                        ? "bg-[#B22222] text-white shadow-[0_0_20px_rgba(178,34,34,0.5)]"
                        : "text-white/60 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <Rocket className="size-4" />
                    <span>Outreach</span>
                  </button>
                </div>
              </div>

              {/* Form Element */}
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                
                {/* Full Name */}
                <div className="space-y-2">
                  <label htmlFor="name" className="text-xs uppercase tracking-wider font-mono text-white/70">
                    Full Name <span className="text-[#B22222]">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="e.g. Samuel Adebayo"
                    autoComplete="name"
                    required
                    className={`w-full min-h-[50px] bg-black/40 border px-4 py-3 rounded-xl text-sm text-white placeholder-white/20 transition-all focus:outline-none ${
                      touched.name && errors.name
                        ? "border-[#B22222] focus:ring-1 focus:ring-[#B22222]"
                        : "border-white/10 focus:border-[#B22222] focus:ring-1 focus:ring-[#B22222]/50"
                    }`}
                  />
                  {touched.name && errors.name && (
                    <span className="text-xs text-[#B22222] font-mono" role="alert">{errors.name}</span>
                  )}
                </div>

                {/* Email and Phone Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-xs uppercase tracking-wider font-mono text-white/70">
                      Email Address <span className="text-[#B22222]">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="e.g. samuel@example.com"
                      autoComplete="email"
                      required
                      className={`w-full min-h-[50px] bg-black/40 border px-4 py-3 rounded-xl text-sm text-white placeholder-white/20 transition-all focus:outline-none ${
                        touched.email && errors.email
                          ? "border-[#B22222] focus:ring-1 focus:ring-[#B22222]"
                          : "border-white/10 focus:border-[#B22222] focus:ring-1 focus:ring-[#B22222]/50"
                      }`}
                    />
                    {touched.email && errors.email && (
                      <span className="text-xs text-[#B22222] font-mono" role="alert">{errors.email}</span>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-xs uppercase tracking-wider font-mono text-white/70">
                      Phone Number <span className="text-[#B22222]">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="e.g. +234 80 1234 5678"
                      autoComplete="tel"
                      required
                      className={`w-full min-h-[50px] bg-black/40 border px-4 py-3 rounded-xl text-sm text-white placeholder-white/20 transition-all focus:outline-none ${
                        touched.phone && errors.phone
                          ? "border-[#B22222] focus:ring-1 focus:ring-[#B22222]"
                          : "border-white/10 focus:border-[#B22222] focus:ring-1 focus:ring-[#B22222]/50"
                      }`}
                    />
                    {touched.phone && errors.phone && (
                      <span className="text-xs text-[#B22222] font-mono" role="alert">{errors.phone}</span>
                    )}
                  </div>
                </div>

                {/* Conditional Fields: Athlete */}
                {category === "athlete" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-1">
                    <div className="space-y-2">
                      <label htmlFor="age" className="text-xs uppercase tracking-wider font-mono text-white/70">
                        Age <span className="text-[#B22222]">*</span>
                      </label>
                      <input
                        type="number"
                        id="age"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        min="5"
                        max="100"
                        placeholder="e.g. 19"
                        required
                        className={`w-full min-h-[50px] bg-black/40 border px-4 py-3 rounded-xl text-sm text-white placeholder-white/20 transition-all focus:outline-none ${
                          touched.age && errors.age
                            ? "border-[#B22222] focus:ring-1 focus:ring-[#B22222]"
                            : "border-white/10 focus:border-[#B22222] focus:ring-1 focus:ring-[#B22222]/50"
                        }`}
                      />
                      {touched.age && errors.age && (
                        <span className="text-xs text-[#B22222] font-mono" role="alert">{errors.age}</span>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="sport" className="text-xs uppercase tracking-wider font-mono text-white/70">
                        Primary Sport <span className="text-[#B22222]">*</span>
                      </label>
                      <input
                        type="text"
                        id="sport"
                        name="sport"
                        value={formData.sport}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="e.g. Football, Basketball, Track"
                        required
                        className={`w-full min-h-[50px] bg-black/40 border px-4 py-3 rounded-xl text-sm text-white placeholder-white/20 transition-all focus:outline-none ${
                          touched.sport && errors.sport
                            ? "border-[#B22222] focus:ring-1 focus:ring-[#B22222]"
                            : "border-white/10 focus:border-[#B22222] focus:ring-1 focus:ring-[#B22222]/50"
                        }`}
                      />
                      {touched.sport && errors.sport && (
                        <span className="text-xs text-[#B22222] font-mono" role="alert">{errors.sport}</span>
                      )}
                    </div>
                  </div>
                )}

                {/* Conditional Fields: Partner */}
                {category === "partner" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-1">
                    <div className="space-y-2">
                      <label htmlFor="organization" className="text-xs uppercase tracking-wider font-mono text-white/70">
                        Organization / Ministry <span className="text-white/30">(Optional)</span>
                      </label>
                      <input
                        type="text"
                        id="organization"
                        name="organization"
                        value={formData.organization}
                        onChange={handleChange}
                        placeholder="e.g. Beta Boys Project"
                        className="w-full min-h-[50px] bg-black/40 border border-white/10 px-4 py-3 rounded-xl text-sm text-white placeholder-white/20 transition-all focus:outline-none focus:border-[#B22222] focus:ring-1 focus:ring-[#B22222]/50"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="partnershipType" className="text-xs uppercase tracking-wider font-mono text-white/70">
                        Partnership Type <span className="text-[#B22222]">*</span>
                      </label>
                      <div className="relative">
                        <select
                          id="partnershipType"
                          name="partnershipType"
                          value={formData.partnershipType}
                          onChange={handleChange}
                          className="w-full min-h-[50px] bg-black/40 border border-white/10 px-4 py-3 rounded-xl text-sm text-white transition-all focus:outline-none focus:border-[#B22222] focus:ring-1 focus:ring-[#B22222]/50 appearance-none cursor-pointer"
                        >
                          <option value="financial" className="bg-[#121212] text-white">Financial Partner (Seed)</option>
                          <option value="volunteer" className="bg-[#121212] text-white">Volunteer</option>
                          <option value="mentor" className="bg-[#121212] text-white">Mentor / Discipler</option>
                          <option value="academy" className="bg-[#121212] text-white">Sports Academy Partner</option>
                          <option value="other" className="bg-[#121212] text-white">Other</option>
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/40 text-xs">▼</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Conditional Fields: Outreach */}
                {category === "outreach" && (
                  <div className="space-y-2 pt-1">
                    <label htmlFor="outreachInterest" className="text-xs uppercase tracking-wider font-mono text-white/70">
                      Outreach Program <span className="text-[#B22222]">*</span>
                    </label>
                    <div className="relative">
                      <select
                        id="outreachInterest"
                        name="outreachInterest"
                        value={formData.outreachInterest}
                        onChange={handleChange}
                        className="w-full min-h-[50px] bg-black/40 border border-white/10 px-4 py-3 rounded-xl text-sm text-white transition-all focus:outline-none focus:border-[#B22222] focus:ring-1 focus:ring-[#B22222]/50 appearance-none cursor-pointer"
                      >
                        <option value="pray" className="bg-[#121212] text-white">WHEN ATHLETES PRAY (Prayer Meeting)</option>
                        <option value="aflame" className="bg-[#121212] text-white">AFLAME (Holy Ghost Meeting)</option>
                        <option value="tournament" className="bg-[#121212] text-white">Youth Football Tournament</option>
                        <option value="clinic" className="bg-[#121212] text-white">Sportmantle Collegiate Clinics</option>
                        <option value="kaduna" className="bg-[#121212] text-white">Kaduna Outreach / Bootcamp</option>
                        <option value="other" className="bg-[#121212] text-white">Other Programs</option>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/40 text-xs">▼</div>
                    </div>
                  </div>
                )}

                {/* Message Field */}
                <div className="space-y-2">
                  <label htmlFor="message" className="text-xs uppercase tracking-wider font-mono text-white/70">
                    Message <span className="text-[#B22222]">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder={
                      category === "athlete"
                        ? "Tell us about your sports journey and goals..."
                        : category === "partner"
                        ? "Tell us how you would like to collaborate..."
                        : "Tell us how you want to join or support..."
                    }
                    required
                    className={`w-full bg-black/40 border px-4 py-3 rounded-xl text-sm text-white placeholder-white/20 transition-all focus:outline-none resize-y ${
                      touched.message && errors.message
                        ? "border-[#B22222] focus:ring-1 focus:ring-[#B22222]"
                        : "border-white/10 focus:border-[#B22222] focus:ring-1 focus:ring-[#B22222]/50"
                    }`}
                  />
                  {touched.message && errors.message && (
                    <span className="text-xs text-[#B22222] font-mono" role="alert">{errors.message}</span>
                  )}
                </div>

                {/* Submit button with loading state */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full min-h-[54px] bg-[#B22222] hover:bg-red-700 disabled:bg-[#B22222]/50 text-white font-mono font-bold uppercase tracking-wider text-xs md:text-sm rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(178,34,34,0.3)] hover:shadow-[0_0_30px_rgba(178,34,34,0.6)] cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />
                      <span>Transmitting Details...</span>
                    </>
                  ) : (
                    <>
                      <span>
                        {category === "athlete" && "Submit Discipleship Application"}
                        {category === "partner" && "Submit Partnership Request"}
                        {category === "outreach" && "Register For Outreach"}
                      </span>
                      <ArrowRight className="size-4" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        ) : (
          /* SUCCESS SCREEN */
          <div className="max-w-xl mx-auto text-center bg-neutral-900/60 border border-white/10 p-10 md:p-14 rounded-2xl backdrop-blur-xl space-y-6 shadow-2xl">
            <div className="size-16 bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/20 flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(16,185,129,0.2)]">
              <CheckCircle2 className="size-8" />
            </div>

            <div className="space-y-3">
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight font-display text-white">
                Mantle Picked Up
              </h2>
              <p className="text-white/80 text-base">
                Thank you for reaching out, <span className="font-bold text-[#B22222]">{formData.name}</span>!
              </p>
              <p className="text-white/50 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
                Your message regarding the <span className="font-bold text-white uppercase">{category}</span> category has been received. Our leadership team in Abuja will review your details and respond via <span className="font-bold text-white">{formData.email}</span> shortly.
              </p>
            </div>

            <div className="pt-4">
              <Link href="/">
                <button className="px-7 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-mono text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer">
                  Return to Home
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <main className="flex flex-col w-full min-h-screen bg-[#0A0A0A]">
      <Suspense fallback={
        <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col items-center justify-center gap-4">
          <Loader2 className="size-10 text-[#B22222] animate-spin" />
          <p className="text-xs font-mono font-bold tracking-widest uppercase text-white/50 animate-pulse">Loading Contact Form...</p>
        </div>
      }>
        <ContactForm />
      </Suspense>
      <Footer />
    </main>
  );
}
