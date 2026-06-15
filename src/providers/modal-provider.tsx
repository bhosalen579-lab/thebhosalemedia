"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Calendar, MessageSquare, Send, X } from "lucide-react";
import Image from "next/image";
import React, { createContext, useContext, useState } from "react";

type ModalContextType = {
  openLeadModal: () => void;
  openContactModal: () => void;
  closeAllModals: () => void;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [refId, setRefId] = useState("");
  const [submittedWhatsappUrl, setSubmittedWhatsappUrl] = useState("");

  // Form states (start completely empty, using placeholders only)
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [business, setBusiness] = useState("");
  const [industry, setIndustry] = useState("");
  const [objectives, setObjectives] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  const openLeadModal = () => {
    setIsOpen(true);
    setIsSubmitted(false);
  };

  const openContactModal = () => {
    setIsOpen(true);
    setIsSubmitted(false);
  };

  const closeAllModals = () => {
    setIsOpen(false);
    setIsSubmitted(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Generate reference ID
    const generatedId = `TBM-2026-${Math.floor(10000 + Math.random() * 90000)}`;
    setRefId(generatedId);

    // Build target WhatsApp link dynamically before resetting states
    const messageText = `Hello TBM Team,

Name: ${name}

Business: ${business}

Industry: ${industry}

Phone: ${phone}

I would like a free growth consultation.`;

    const targetWhatsappUrl = `https://wa.me/919740540724?text=${encodeURIComponent(messageText)}`;
    setSubmittedWhatsappUrl(targetWhatsappUrl);

    // Save lead locally to prepare for future CRM integration
    const leadData = {
      name,
      email,
      phone,
      business,
      industry,
      objectives,
      refId: generatedId,
      timestamp: new Date().toISOString(),
    };

    try {
      const existingLeads = JSON.parse(localStorage.getItem("tbm_leads") || "[]");
      existingLeads.push(leadData);
      localStorage.setItem("tbm_leads", JSON.stringify(existingLeads));
    } catch (err) {
      console.warn("Could not save lead to localStorage", err);
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Clear all form fields immediately
      setName("");
      setEmail("");
      setPhone("");
      setBusiness("");
      setIndustry("");
      setObjectives("");
    }, 800);
  };

  return (
    <ModalContext.Provider value={{ openLeadModal, openContactModal, closeAllModals }}>
      {children}

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Dark Backdrop Blur Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeAllModals}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />

            {/* Premium Glassmorphic Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-[500px] rounded-[2rem] border border-white/[0.12] bg-[#050505]/95 p-6 sm:p-8 shadow-[0_24px_64px_rgba(0,0,0,0.9)] backdrop-blur-xl z-10 overflow-hidden"
            >
              {/* Close Trigger Icon */}
              <button
                onClick={closeAllModals}
                className="absolute top-6 right-6 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-[#F5F5F5] hover:bg-white/[0.08] transition-colors focus:outline-none focus:ring-2 focus:ring-[#FF6B00] cursor-pointer"
                aria-label="Close dialog modal"
              >
                <X className="h-4 w-4" />
              </button>

              {isSubmitted ? (
                /* Redesigned Premium Success Screen */
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center text-center py-4"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-tr from-[#ff6a00] to-[#ff8c42] text-black font-black text-lg shadow-[0_0_15px_rgba(255,106,0,0.3)] mb-4">
                    ✓
                  </div>
                  
                  <h3 className="text-xl sm:text-2xl font-black text-[#F5F5F5] uppercase tracking-tight leading-tight">
                    Thank You! <br />
                    Your Growth Request Has Been Received.
                  </h3>
                  
                  <p className="text-xs text-[#9CA3AF] mt-3 leading-relaxed max-w-[340px]">
                    Our team will review your information and contact you shortly.
                  </p>

                  {/* Reference ID Badge */}
                  <div className="mt-4 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/10 text-[10px] font-black uppercase tracking-widest text-[#ff8c42] shadow-[0_0_15px_rgba(255,106,0,0.05)]">
                    Reference ID: {refId}
                  </div>

                  {/* Action Choices Buttons (WhatsApp, Explore) */}
                  <div className="flex flex-col gap-3 w-full mt-8">
                    {/* Chat on WhatsApp */}
                    <button
                      onClick={() => window.open(submittedWhatsappUrl, "_blank")}
                      className="h-11 rounded-xl bg-gradient-to-r from-[#ff6a00] to-[#ff8c42] text-black hover:shadow-[0_0_20px_rgba(255,106,0,0.4)] font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer focus:outline-none"
                    >
                      <MessageSquare className="h-4 w-4" />
                      Chat on WhatsApp
                    </button>

                    {/* Continue Exploring */}
                    <button
                      onClick={closeAllModals}
                      className="h-11 rounded-xl bg-white/[0.03] text-white/60 hover:text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer focus:outline-none"
                    >
                      Continue Exploring
                    </button>
                  </div>
                </motion.div>
              ) : (
                /* Form Layout */
                <>
                  <div className="mb-6 flex items-start gap-4">
                    <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-white/5 flex items-center justify-center">
                      <Image
                        src="/images/logo.png"
                        alt="TBM Logo"
                        fill
                        className="object-contain scale-110"
                      />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-[#F5F5F5] uppercase tracking-tight">
                        Growth Discovery Session
                      </h3>
                      <p className="text-xs text-[#9CA3AF] mt-1.5 leading-relaxed">
                        Provide your operational channels below to generate your personalized free performance audit.
                      </p>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    {/* Full Name field */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="name-input" className="text-[10px] font-black uppercase tracking-widest text-[#9CA3AF]">
                        Full Name
                      </label>
                      <input
                        id="name-input"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your full name"
                        className="w-full h-10 px-4 rounded-xl bg-white/[0.05] border border-white/[0.12] text-[#F5F5F5] placeholder-[#9CA3AF] focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent outline-none transition-all text-xs"
                      />
                    </div>

                    {/* Email Address field */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="email-input" className="text-[10px] font-black uppercase tracking-widest text-[#9CA3AF]">
                        Email Address
                      </label>
                      <input
                        id="email-input"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        className="w-full h-10 px-4 rounded-xl bg-white/[0.05] border border-white/[0.12] text-[#F5F5F5] placeholder-[#9CA3AF] focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent outline-none transition-all text-xs"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Phone Number field */}
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="phone-input" className="text-[10px] font-black uppercase tracking-widest text-[#9CA3AF]">
                          Phone Number
                        </label>
                        <input
                          id="phone-input"
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="Enter your phone number"
                          className="w-full h-10 px-4 rounded-xl bg-white/[0.05] border border-white/[0.12] text-[#F5F5F5] placeholder-[#9CA3AF] focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent outline-none transition-all text-xs"
                        />
                      </div>

                      {/* Business Name field */}
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="business-input" className="text-[10px] font-black uppercase tracking-widest text-[#9CA3AF]">
                          Business Name
                        </label>
                        <input
                          id="business-input"
                          type="text"
                          required
                          value={business}
                          onChange={(e) => setBusiness(e.target.value)}
                          placeholder="Your company name"
                          className="w-full h-10 px-4 rounded-xl bg-white/[0.05] border border-white/[0.12] text-[#F5F5F5] placeholder-[#9CA3AF] focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent outline-none transition-all text-xs"
                        />
                      </div>
                    </div>

                    {/* Industry field */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="industry-input" className="text-[10px] font-black uppercase tracking-widest text-[#9CA3AF]">
                        Industry
                      </label>
                      <input
                        id="industry-input"
                        type="text"
                        required
                        value={industry}
                        onChange={(e) => setIndustry(e.target.value)}
                        placeholder="Enter your industry"
                        className="w-full h-10 px-4 rounded-xl bg-white/[0.05] border border-white/[0.12] text-[#F5F5F5] placeholder-[#9CA3AF] focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent outline-none transition-all text-xs"
                      />
                    </div>

                    {/* Growth Objectives dropdown field */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="objectives-select" className="text-[10px] font-black uppercase tracking-widest text-[#9CA3AF]">
                        Growth Objectives
                      </label>
                      <div className="relative">
                        <select
                          id="objectives-select"
                          required
                          value={objectives}
                          onChange={(e) => setObjectives(e.target.value)}
                          className="w-full h-10 px-4 rounded-xl bg-white/[0.05] border border-white/[0.12] text-[#F5F5F5] focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent outline-none transition-all text-xs appearance-none cursor-pointer"
                        >
                          <option value="" disabled className="bg-[#050505] text-[#9CA3AF]">
                            Select primary objective
                          </option>
                          <option value="Paid Social Acquisition" className="bg-[#050505] text-[#F5F5F5]">
                            Scale Google Ads / Meta Ads Campaigns
                          </option>
                          <option value="Core Branding Strategy" className="bg-[#050505] text-[#F5F5F5]">
                            Refine Core Brand Messaging & Identity
                          </option>
                          <option value="Organic Traffic Engines" className="bg-[#050505] text-[#F5F5F5]">
                            Build Content Production & SEO Systems
                          </option>
                          <option value="Conversion Optimization" className="bg-[#050505] text-[#F5F5F5]">
                            Optimize Website UX & Funnel Conversion Rates
                          </option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-[#9CA3AF]">
                          <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Form Buttons */}
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <button
                        type="button"
                        onClick={closeAllModals}
                        className="h-11 rounded-xl border border-white/10 bg-white/[0.02] text-[#F5F5F5] hover:bg-white/[0.06] font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer focus:ring-2 focus:ring-[#FF6B00] focus:outline-none"
                      >
                        Close
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="h-11 rounded-xl bg-gradient-to-r from-[#ff6a00] to-[#ff8c42] text-black hover:shadow-[0_0_24px_rgba(255,106,0,0.4)] font-black text-xs uppercase tracking-widest transition-all cursor-pointer focus:ring-2 focus:ring-[#FF6B00] focus:outline-none disabled:opacity-50 flex items-center justify-center gap-2"
                      >
                        {isSubmitting ? (
                          <span className="h-4.5 w-4.5 animate-spin rounded-full border-2 border-black border-t-transparent" />
                        ) : (
                          <>
                            <Send className="h-3.5 w-3.5" />
                            Submit
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
}
