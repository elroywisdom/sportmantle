"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
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
  Calendar,
  Sparkles,
  Trophy,
  Instagram,
  Podcast
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
    
    // Clear errors when active typing starts
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

  // Validate individual field
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

  // Submit Handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all active fields before submit
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

    // Check specific validation formats
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
      // Touch all validation fields to trigger visual error states
      const touchedAll = fieldsToValidate.reduce((acc, field) => ({ ...acc, [field]: true }), {});
      setTouched(touchedAll);
      
      // Auto-focus the first invalid element
      const firstInvalidField = Object.keys(newErrors)[0];
      const el = document.getElementsByName(firstInvalidField)[0];
      if (el) el.focus();
      return;
    }

    setIsSubmitting(true);

    // Simulate Server API Call (1.2s delay for premium user feedback)
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 1200);
  };

  return (
    <div className="w-full min-h-screen bg-black text-white relative pt-32 pb-24 overflow-hidden select-none">
      {/* Background Glow Accents */}
      <div className="absolute inset-0 pointer-events-none opacity-40 z-0">
        <div className="absolute -top-[20%] -right-[10%] w-[80vw] h-[80vw] bg-[#E30A0A]/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-[20%] -left-[10%] w-[70vw] h-[70vw] bg-[#E30A0A]/5 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header Section */}
        <div className="text-center md:text-left space-y-4 mb-16">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm font-medium transition-colors mb-4 group"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to home
          </Link>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter font-display scale-y-[1.05] leading-none">
            Pick Up Your <span className="text-[#E30A0A] italic">Mantle</span>
          </h1>
          <p className="text-white/60 text-lg md:text-xl font-light max-w-2xl leading-relaxed">
            Choose your connection category and fill out the details below. Our team in Abuja will reach out to you directly.
          </p>
        </div>

        {/* Main Grid Content */}
        {!isSubmitted ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: Branded Content & Contact Info */}
            <div className="lg:col-span-5 space-y-10">
              
              {/* Category Info Cards */}
              <div className="bg-white/[0.01] border border-white/5 p-8 rounded-xl backdrop-blur-xl space-y-6">
                <h3 className="text-xl font-bold font-display uppercase tracking-tight text-[#E30A0A] flex items-center gap-2">
                  <Sparkles className="size-5" /> The Mandate
                </h3>
                <blockquote className="border-l-2 border-[#E30A0A] pl-4 italic text-white/80 font-light text-base md:text-lg leading-relaxed">
                  "Raise me a people in the sports industry, who will uphold righteousness and justice, through the route of discipleship."
                </blockquote>
              </div>

              {/* Abuja Reach Details */}
              <div className="space-y-6">
                <h4 className="text-lg font-black uppercase tracking-wider text-white/90">Contact Details</h4>
                <div className="space-y-5">
                  <div className="flex items-center gap-4 text-white/70">
                    <div className="size-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 text-white">
                      <Mail className="size-5" />
                    </div>
                    <div>
                      <p className="text-xs text-white/40 uppercase tracking-widest font-bold">Email Us</p>
                      <a href={`mailto:${CONTACT_INFO.EMAIL}`} className="hover:text-[#E30A0A] font-medium transition-colors">
                        {CONTACT_INFO.EMAIL}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-white/70">
                    <div className="size-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 text-white">
                      <Phone className="size-5" />
                    </div>
                    <div>
                      <p className="text-xs text-white/40 uppercase tracking-widest font-bold">Call / WhatsApp</p>
                      <a href={`tel:${CONTACT_INFO.PHONE.replace(/\s+/g, '')}`} className="hover:text-[#E30A0A] font-medium transition-colors">
                        {CONTACT_INFO.PHONE}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-white/70">
                    <div className="size-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 text-white">
                      <MapPin className="size-5" />
                    </div>
                    <div>
                      <p className="text-xs text-white/40 uppercase tracking-widest font-bold">HQ Location</p>
                      <p className="font-medium text-white/90">{CONTACT_INFO.ADDRESS}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Channels Row */}
              <div className="space-y-4">
                <h4 className="text-lg font-black uppercase tracking-wider text-white/90">Active Socials</h4>
                <div className="flex gap-4">
                  <a 
                    href={CONTACT_INFO.SOCIALS.INSTAGRAM} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="size-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#E30A0A] hover:border-[#E30A0A] hover:text-white transition-all text-white/80 group"
                    aria-label="Instagram"
                  >
                    <Instagram className="size-5 group-hover:scale-110 transition-transform" />
                  </a>
                  <a 
                    href={CONTACT_INFO.SOCIALS.PODCAST} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="size-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#E30A0A] hover:border-[#E30A0A] hover:text-white transition-all text-white/80 group"
                    aria-label="Apple Podcast"
                  >
                    <Podcast className="size-5 group-hover:scale-110 transition-transform" />
                  </a>
                </div>
              </div>

              {/* Outreach Highlight */}
              <div className="bg-gradient-to-br from-[#E30A0A]/10 via-transparent to-transparent border border-[#E30A0A]/20 p-8 rounded-xl space-y-4">
                <div className="flex items-center gap-3 text-white">
                  <Trophy className="size-6 text-[#E30A0A]" />
                  <span className="font-bold text-sm uppercase tracking-wider">Discipleship & Outreach</span>
                </div>
                <p className="text-sm text-white/60 leading-relaxed font-light">
                  Over the last 3+ years, Sportmantle has discipled 200+ boys aged 5 to 25. We sponsor tournaments, outreaches, and bootcamps (like the Kaduna outreach in partnership with Beta Boys Project) to transform the sports industry.
                </p>
              </div>
            </div>

            {/* Right Column: Premium Interactive Form */}
            <div className="lg:col-span-7 bg-white/[0.02] border border-white/10 p-8 md:p-10 rounded-2xl shadow-2xl backdrop-blur-xl relative">
              
              {/* Category Segmented Tabs */}
              <div className="space-y-3 mb-8">
                <label className="text-xs text-white/40 uppercase tracking-widest font-black block">
                  Select Your Connection Category
                </label>
                <div className="grid grid-cols-3 gap-2 bg-white/5 p-1.5 rounded-xl border border-white/5">
                  <button
                    type="button"
                    onClick={() => setCategory("athlete")}
                    className={`py-3 px-2 text-xs md:text-sm font-black uppercase tracking-wider rounded-lg transition-all duration-300 flex flex-col md:flex-row items-center justify-center gap-1.5 cursor-pointer ${
                      category === "athlete"
                        ? "bg-[#E30A0A] text-white shadow-[0_4px_15px_rgba(227,10,10,0.3)]"
                        : "text-white/60 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <User className="size-4" />
                    <span>Athlete</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setCategory("partner")}
                    className={`py-3 px-2 text-xs md:text-sm font-black uppercase tracking-wider rounded-lg transition-all duration-300 flex flex-col md:flex-row items-center justify-center gap-1.5 cursor-pointer ${
                      category === "partner"
                        ? "bg-[#E30A0A] text-white shadow-[0_4px_15px_rgba(227,10,10,0.3)]"
                        : "text-white/60 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <Building2 className="size-4" />
                    <span>Partner</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setCategory("outreach")}
                    className={`py-3 px-2 text-xs md:text-sm font-black uppercase tracking-wider rounded-lg transition-all duration-300 flex flex-col md:flex-row items-center justify-center gap-1.5 cursor-pointer ${
                      category === "outreach"
                        ? "bg-[#E30A0A] text-white shadow-[0_4px_15px_rgba(227,10,10,0.3)]"
                        : "text-white/60 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <Rocket className="size-4" />
                    <span>Outreach</span>
                  </button>
                </div>
              </div>

              {/* Info Text about Selected Category */}
              <div className="mb-8 p-4 bg-white/5 rounded-lg border-l-2 border-[#E30A0A] text-xs text-white/70 leading-relaxed font-light">
                {category === "athlete" && (
                  "discipleship form: Fill out this details to apply for discipleship programs, tournaments, mentorship, and resources to grow in God and sports."
                )}
                {category === "partner" && (
                  "partnership form: Let us know how you or your organization would like to seed, volunteer, or partner with us in Abuja or other states."
                )}
                {category === "outreach" && (
                  "outreach registration: Select which meeting or outreach you want to attend or serve. We will notify you with details and locations."
                )}
              </div>

              {/* Form Element */}
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                
                {/* Name Field */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-xs uppercase tracking-wider font-bold text-white/70">
                    Full Name <span className="text-[#E30A0A]">*</span>
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
                    className={`w-full min-h-[48px] bg-white/5 border px-4 py-3 rounded-lg text-sm text-white placeholder-white/20 transition-all focus:outline-none ${
                      touched.name && errors.name
                        ? "border-[#E30A0A] focus:ring-1 focus:ring-[#E30A0A]/50"
                        : "border-white/10 focus:border-[#E30A0A]/50 focus:ring-1 focus:ring-[#E30A0A]/50"
                    }`}
                  />
                  {touched.name && errors.name && (
                    <span className="text-xs text-[#E30A0A] font-medium" role="alert">{errors.name}</span>
                  )}
                </div>

                {/* Email and Phone Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Email Field */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-xs uppercase tracking-wider font-bold text-white/70">
                      Email Address <span className="text-[#E30A0A]">*</span>
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
                      className={`w-full min-h-[48px] bg-white/5 border px-4 py-3 rounded-lg text-sm text-white placeholder-white/20 transition-all focus:outline-none ${
                        touched.email && errors.email
                          ? "border-[#E30A0A] focus:ring-1 focus:ring-[#E30A0A]/50"
                          : "border-white/10 focus:border-[#E30A0A]/50 focus:ring-1 focus:ring-[#E30A0A]/50"
                      }`}
                    />
                    {touched.email && errors.email && (
                      <span className="text-xs text-[#E30A0A] font-medium" role="alert">{errors.email}</span>
                    )}
                  </div>

                  {/* Phone Field */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="phone" className="text-xs uppercase tracking-wider font-bold text-white/70">
                      Phone Number <span className="text-[#E30A0A]">*</span>
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
                      className={`w-full min-h-[48px] bg-white/5 border px-4 py-3 rounded-lg text-sm text-white placeholder-white/20 transition-all focus:outline-none ${
                        touched.phone && errors.phone
                          ? "border-[#E30A0A] focus:ring-1 focus:ring-[#E30A0A]/50"
                          : "border-white/10 focus:border-[#E30A0A]/50 focus:ring-1 focus:ring-[#E30A0A]/50"
                      }`}
                    />
                    {touched.phone && errors.phone && (
                      <span className="text-xs text-[#E30A0A] font-medium" role="alert">{errors.phone}</span>
                    )}
                  </div>
                </div>

                {/* Conditional Fields: Athlete (Discipleship) */}
                {category === "athlete" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white/[0.01] border border-white/5 p-5 rounded-xl">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="age" className="text-xs uppercase tracking-wider font-bold text-white/70">
                        Age <span className="text-[#E30A0A]">*</span>
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
                        placeholder="e.g. 18"
                        required
                        className={`w-full min-h-[48px] bg-white/5 border px-4 py-3 rounded-lg text-sm text-white placeholder-white/20 transition-all focus:outline-none ${
                          touched.age && errors.age
                            ? "border-[#E30A0A] focus:ring-1 focus:ring-[#E30A0A]/50"
                            : "border-white/10 focus:border-[#E30A0A]/50 focus:ring-1 focus:ring-[#E30A0A]/50"
                        }`}
                      />
                      {touched.age && errors.age && (
                        <span className="text-xs text-[#E30A0A] font-medium" role="alert">{errors.age}</span>
                      )}
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="sport" className="text-xs uppercase tracking-wider font-bold text-white/70">
                        Primary Sport <span className="text-[#E30A0A]">*</span>
                      </label>
                      <input
                        type="text"
                        id="sport"
                        name="sport"
                        value={formData.sport}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="e.g. Football, Basketball"
                        required
                        className={`w-full min-h-[48px] bg-white/5 border px-4 py-3 rounded-lg text-sm text-white placeholder-white/20 transition-all focus:outline-none ${
                          touched.sport && errors.sport
                            ? "border-[#E30A0A] focus:ring-1 focus:ring-[#E30A0A]/50"
                            : "border-white/10 focus:border-[#E30A0A]/50 focus:ring-1 focus:ring-[#E30A0A]/50"
                        }`}
                      />
                      {touched.sport && errors.sport && (
                        <span className="text-xs text-[#E30A0A] font-medium" role="alert">{errors.sport}</span>
                      )}
                    </div>
                  </div>
                )}

                {/* Conditional Fields: Partner (Seed) */}
                {category === "partner" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white/[0.01] border border-white/5 p-5 rounded-xl">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="organization" className="text-xs uppercase tracking-wider font-bold text-white/70">
                        Organization / Church <span className="text-white/30">(Optional)</span>
                      </label>
                      <input
                        type="text"
                        id="organization"
                        name="organization"
                        value={formData.organization}
                        onChange={handleChange}
                        placeholder="e.g. Beta Boys Project"
                        className="w-full min-h-[48px] bg-white/5 border border-white/10 px-4 py-3 rounded-lg text-sm text-white placeholder-white/20 transition-all focus:outline-none focus:border-[#E30A0A]/50 focus:ring-1 focus:ring-[#E30A0A]/50"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="partnershipType" className="text-xs uppercase tracking-wider font-bold text-white/70">
                        Partnership Type <span className="text-[#E30A0A]">*</span>
                      </label>
                      <div className="relative">
                        <select
                          id="partnershipType"
                          name="partnershipType"
                          value={formData.partnershipType}
                          onChange={handleChange}
                          className="w-full min-h-[48px] bg-white/5 border border-white/10 px-4 py-3 rounded-lg text-sm text-white transition-all focus:outline-none focus:border-[#E30A0A]/50 focus:ring-1 focus:ring-[#E30A0A]/50 appearance-none cursor-pointer"
                        >
                          <option value="financial" className="bg-[#121212] text-white">Financial Partner (Seed)</option>
                          <option value="volunteer" className="bg-[#121212] text-white">Volunteer</option>
                          <option value="mentor" className="bg-[#121212] text-white">Mentor / Discipler</option>
                          <option value="academy" className="bg-[#121212] text-white">Sports Academy / Ministry Partner</option>
                          <option value="other" className="bg-[#121212] text-white">Other</option>
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/40 text-xs">▼</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Conditional Fields: Outreach (Events) */}
                {category === "outreach" && (
                  <div className="bg-white/[0.01] border border-white/5 p-5 rounded-xl flex flex-col gap-2">
                    <label htmlFor="outreachInterest" className="text-xs uppercase tracking-wider font-bold text-white/70">
                      Outreach / Event of Interest <span className="text-[#E30A0A]">*</span>
                    </label>
                    <div className="relative">
                      <select
                        id="outreachInterest"
                        name="outreachInterest"
                        value={formData.outreachInterest}
                        onChange={handleChange}
                        className="w-full min-h-[48px] bg-white/5 border border-white/10 px-4 py-3 rounded-lg text-sm text-white transition-all focus:outline-none focus:border-[#E30A0A]/50 focus:ring-1 focus:ring-[#E30A0A]/50 appearance-none cursor-pointer"
                      >
                        <option value="pray" className="bg-[#121212] text-white">WHEN ATHLETES PRAY (Prayer Meeting)</option>
                        <option value="aflame" className="bg-[#121212] text-white">AFLAME (Holy Ghost Meeting)</option>
                        <option value="tournament" className="bg-[#121212] text-white">Youth Football Tournament</option>
                        <option value="kaduna" className="bg-[#121212] text-white">Kaduna Outreach / Bootcamp</option>
                        <option value="teaching" className="bg-[#121212] text-white">Weekly Discipleship Classes (Abuja)</option>
                        <option value="other" className="bg-[#121212] text-white">Other Outreach Programs</option>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/40 text-xs">▼</div>
                    </div>
                  </div>
                )}

                {/* Message Field */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="text-xs uppercase tracking-wider font-bold text-white/70">
                    Message <span className="text-[#E30A0A]">*</span>
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
                        ? "Tell us about your sports career and why you want to grow in Christ..."
                        : category === "partner"
                        ? "Tell us how you would like to support or collaborate with Sportmantle..."
                        : "Tell us if you want to join as a participant, volunteer, or sponsor..."
                    }
                    required
                    className={`w-full bg-white/5 border px-4 py-3 rounded-lg text-sm text-white placeholder-white/20 transition-all focus:outline-none resize-y ${
                      touched.message && errors.message
                        ? "border-[#E30A0A] focus:ring-1 focus:ring-[#E30A0A]/50"
                        : "border-white/10 focus:border-[#E30A0A]/50 focus:ring-1 focus:ring-[#E30A0A]/50"
                    }`}
                  />
                  {touched.message && errors.message && (
                    <span className="text-xs text-[#E30A0A] font-medium" role="alert">{errors.message}</span>
                  )}
                </div>

                {/* Submit button with loading state */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full min-h-[52px] bg-[#E30A0A] hover:bg-[#C20808] disabled:bg-[#E30A0A]/50 text-white font-black uppercase tracking-wider text-xs md:text-sm rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(227,10,10,0.2)] hover:shadow-[0_0_30px_rgba(227,10,10,0.55)] cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />
                      <span>Sending details...</span>
                    </>
                  ) : (
                    <>
                      <span>
                        {category === "athlete" && "Start Discipleship Journey"}
                        {category === "partner" && "Partner With Sportmantle"}
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
          <div className="max-w-2xl mx-auto text-center bg-white/[0.02] border border-white/10 p-10 md:p-16 rounded-2xl backdrop-blur-xl space-y-8 animate-fade-in">
            <div className="size-20 bg-green-500/10 text-green-500 rounded-full border border-green-500/20 flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(34,197,94,0.15)]">
              <CheckCircle2 className="size-10" />
            </div>

            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight font-display">
                Mantle Picked Up
              </h2>
              <p className="text-white/80 text-lg">
                Thank you for reaching out, <span className="font-bold text-[#E30A0A]">{formData.name}</span>!
              </p>
              <p className="text-white/50 text-sm max-w-md mx-auto leading-relaxed">
                Your request for <span className="font-bold text-white uppercase">{category}</span> category has been received. Our team in Abuja will verify details and reach out to you via <span className="font-bold text-white">{formData.email}</span> or <span className="font-bold text-white">{formData.phone}</span> shortly.
              </p>
            </div>

            <div className="pt-6">
              <Link href="/">
                <button className="px-8 py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold tracking-wider text-xs uppercase rounded-xl transition-all duration-300 cursor-pointer">
                  Go Back Home
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Footer is rendered at page root */}
    </div>
  );
}

export default function ContactPage() {
  return (
    <main className="flex flex-col w-full min-h-screen bg-black">
      <Suspense fallback={
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-4">
          <Loader2 className="size-10 text-[#E30A0A] animate-spin" />
          <p className="text-sm font-semibold tracking-wider uppercase text-white/50 animate-pulse">Loading Contact Form...</p>
        </div>
      }>
        <ContactForm />
      </Suspense>
      <Footer />
    </main>
  );
}
