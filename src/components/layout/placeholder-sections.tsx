"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  Award,
  BarChart,
  Calendar,
  ChevronDown,
  Mail,
  MessageSquare,
  Phone,
  Play,
  RotateCcw,
  Scale,
  Sparkles,
  Target,
  X,
  Zap,
} from "lucide-react";
import React, { useState } from "react";
import Image from "next/image";

import { useModal } from "@/providers/modal-provider";

// Categories & Services list
const servicesData = [
  {
    category: "Performance Marketing",
    title: "Google Ads & Search PPC",
    outcome: "Capture high-intent queries to scale sales volume while stabilizing ad spend efficiency.",
    metrics: "+145% Average Return on Ad Spend",
    image: "/images/services/google-ads.jpg",
  },
  {
    category: "Performance Marketing",
    title: "Meta Ads & Social Scaling",
    outcome: "Algorithmic creative testing and audience modeling built to drive volume social acquisition.",
    metrics: "2.8x Scale in Conversion Volume",
    image: "/images/services/meta-ads.png",
  },
  {
    category: "Performance Marketing",
    title: "YouTube Ads & LinkedIn Campaigns",
    outcome: "Video funnel systems and B2B intent-data campaigns targeting enterprise stakeholders.",
    metrics: "-35% Cost per Acquisition Reduction",
    image: "/images/services/youtube-linkedin.png",
  },
  {
    category: "Organic Growth",
    title: "Domain Authority & SEO Systems",
    outcome: "Structured technical SEO content engines built to capture high-value organic query share.",
    metrics: "+300% Organic High-Intent Traffic",
    image: "/images/services/seo.png",
  },
  {
    category: "Organic Growth",
    title: "Local Search Domination",
    outcome: "Local listing indexing and visibility capture for high-intent nearby conversions.",
    metrics: "+82% Store Call-To-Action Growth",
    image: "/images/services/seo.png",
  },
  {
    category: "Branding",
    title: "Market Positioning & Strategy",
    outcome: "Formulate market narrative and value hooks that command industry-leading pricing power.",
    metrics: "Command Premium Brand Authority",
    image: "/images/services/branding.png",
  },
  {
    category: "Branding",
    title: "Brand Identity & Visual Guidelines",
    outcome: "Bespoke color theory, assets systems, and visual guidelines that align with premium markets.",
    metrics: "100% Brand Consistency Standards",
    image: "/images/services/branding.png",
  },
  {
    category: "Web Experiences",
    title: "High-Converting Website Development",
    outcome: "Next-gen frameworks engineered for load velocity, accessibility compliance, and UX conversion.",
    metrics: "Sub-Second Page Load Velocity",
    image: "/images/services/web-dev.png",
  },
  {
    category: "Web Experiences",
    title: "Landing Page Systems & CRO",
    outcome: "A/B creative testing, user experience audit flows, and checkout optimizations.",
    metrics: "+68% Conversion Rate Optimization Lift",
    image: "/images/services/web-dev.png",
  },
  {
    category: "Automation",
    title: "CRM Pipelines & Lead Routing",
    outcome: "Synchronize client pipelines with instant routing metrics to reduce sales response lag.",
    metrics: "Automate 90% of Admin Routing Work",
    image: "/images/services/content-marketing.png",
  },
  {
    category: "Automation",
    title: "WhatsApp & Chat Funnels",
    outcome: "High-open campaign flows and AI assistance setup targeting messaging channel prospects.",
    metrics: "98% Open Rates & Direct Engagement",
    image: "/images/services/content-marketing.png",
  },
];

// Portfolio items
const portfolioProjects = [
  {
    title: "Scale Engine",
    category: "Performance Marketing",
    metric: "+182% ROAS Growth",
    description: "Re-engineered a stagnating Direct-to-Consumer ad strategy. By deploying structured product feed segmentation and dynamic social creative refreshes, we achieved rapid growth scaling.",
    problem: "Rising customer acquisition costs and failing creative assets.",
    solution: "Segmented Google Shopping campaigns by margin profiles and created high-frequency video hooks.",
    image: "/images/portfolio/performance.png",
  },
  {
    title: "Linear Systems",
    category: "Web Experiences",
    metric: "+64% Conversion Rate",
    description: "Designed a blazing-fast, custom headless website for an enterprise B2B SaaS platform. Integrated visual data representations and optimized landing funnel checkouts.",
    problem: "Heavy page speeds driving 45% of visitors to bounce off layouts.",
    solution: "Built static pages with responsive lazy loadings, cleaner UI elements, and lightweight SVGs.",
    image: "/images/portfolio/web.png",
  },
  {
    title: "Vertex Automation",
    category: "Automation & CRM",
    metric: "12s Response Velocity",
    description: "Integrated custom lead routing systems and auto-trigger WhatsApp notification templates for a high-growth service agency, removing manual sales assignments.",
    problem: "Sales reps delayed booking callbacks by an average of 4 hours.",
    solution: "Configured API triggers feeding directly from forms to active messaging channels.",
    image: "/images/portfolio/automation.png",
  },
];

// FAQs list
const faqs = [
  {
    q: "How quickly can we launch new campaigns?",
    a: "Standard onboarding takes exactly 14 business days. This timeframe covers deep performance audits, pixel tracking fixes, dashboard set ups, and visual copy creation.",
  },
  {
    q: "Do we sign long-term contract lock-ins?",
    a: "No, we work on a rolling 30-day agreement model based on milestone objectives. We believe client relationships should be based on active results rather than restrictive contracts.",
  },
  {
    q: "Who directly handles our strategic campaigns?",
    a: "Nikhil Bhosale leads strategy development directly alongside our dedicated implementation specialists, maintaining high-level oversight for every account.",
  },
];

export function PlaceholderSections() {
  const { openLeadModal, openContactModal } = useModal();

  // Services State
  const [activeCategory, setActiveCategory] = useState("Performance Marketing");

  // Portfolio Detail State
  const [selectedProject, setSelectedProject] = useState<(typeof portfolioProjects)[0] | null>(null);

  // FAQ Accordion State
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Interactive Audit Quiz States (INR, target Indian businesses)
  const [quizStep, setQuizStep] = useState(0);
  const [q1Discovery, setQ1Discovery] = useState("");
  const [q2Enquiries, setQ2Enquiries] = useState("");
  const [q3RunDigital, setQ3RunDigital] = useState("");
  const [q4Challenge, setQ4Challenge] = useState("");
  const [q5Budget, setQ5Budget] = useState("");
  const [calculatedScore, setCalculatedScore] = useState<number | null>(null);

  // Audit Lead Form States
  const [auditName, setAuditName] = useState("");
  const [auditPhone, setAuditPhone] = useState("");
  const [auditBusiness, setAuditBusiness] = useState("");
  const [auditRefId, setAuditRefId] = useState("");
  const [submittedAuditWhatsappUrl, setSubmittedAuditWhatsappUrl] = useState("");

  const handleAuditReset = () => {
    setQuizStep(0);
    setQ1Discovery("");
    setQ2Enquiries("");
    setQ3RunDigital("");
    setQ4Challenge("");
    setQ5Budget("");
    setAuditName("");
    setAuditPhone("");
    setAuditBusiness("");
    setAuditRefId("");
    setSubmittedAuditWhatsappUrl("");
    setCalculatedScore(null);
  };

  const handleAuditCalculate = () => {
    // Generate simple growth score based on selections
    let score = 42;
    
    // Q1 Discovery
    if (q1Discovery === "word-of-mouth") score += 8;
    if (q1Discovery === "google-search") score += 18;
    if (q1Discovery === "social-media") score += 14;
    if (q1Discovery === "pamphlets") score += 4;
    
    // Q2 Enquiries
    if (q2Enquiries === "less-10") score += 5;
    if (q2Enquiries === "10-50") score += 12;
    if (q2Enquiries === "more-50") score += 20;

    // Q3 Run Digital Marketing
    if (q3RunDigital === "never") score += 4;
    if (q3RunDigital === "self") score += 12;
    if (q3RunDigital === "agency") score += 18;

    // Q5 Budget
    if (q5Budget === "under5") score += 2;
    if (q5Budget === "5to15") score += 6;
    if (q5Budget === "15to30") score += 12;
    if (q5Budget === "30to50") score += 16;
    if (q5Budget === "over50") score += 20;

    setCalculatedScore(Math.min(score, 100));
    setQuizStep(5); // Go to results screen
  };

  const handleAuditLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Generate reference ID
    const generatedId = `TBM-2026-${Math.floor(10000 + Math.random() * 90000)}`;
    setAuditRefId(generatedId);

    // Map challenge to industry dynamically
    let inferredIndustry = "Local Business";
    if (q4Challenge === "walkins") {
      inferredIndustry = "Local Retail / Salon / Clinic / Restaurant";
    } else if (q4Challenge === "bookings") {
      inferredIndustry = "Coaching Institute / College / Clinic";
    } else if (q4Challenge === "trust") {
      inferredIndustry = "Startup / E-commerce";
    } else if (q4Challenge === "budget") {
      inferredIndustry = "Growth Startup";
    }

    // Build WhatsApp URL immediately with current form state values
    const messageText = `Hello TBM Team,

Name: ${auditName}

Business: ${auditBusiness}

Industry: ${inferredIndustry}

Phone: ${auditPhone}

I completed the Growth Audit and scored ${calculatedScore}/100. Let's schedule my growth consultation.`;
    
    const targetWhatsappUrl = `https://wa.me/919740540724?text=${encodeURIComponent(messageText)}`;
    setSubmittedAuditWhatsappUrl(targetWhatsappUrl);

    // Save lead details locally
    const leadData = {
      name: auditName,
      phone: auditPhone,
      businessName: auditBusiness,
      industry: inferredIndustry,
      growthScore: calculatedScore,
      refId: generatedId,
      timestamp: new Date().toISOString(),
    };

    try {
      const existingAuditLeads = JSON.parse(localStorage.getItem("tbm_audit_leads") || "[]");
      existingAuditLeads.push(leadData);
      localStorage.setItem("tbm_audit_leads", JSON.stringify(existingAuditLeads));
    } catch (err) {
      console.warn("Could not save audit lead locally", err);
    }

    setQuizStep(7); // Transition to Success view

    // Clear all form fields immediately
    setAuditName("");
    setAuditPhone("");
    setAuditBusiness("");
  };

  const filteredServices = servicesData.filter((s) => s.category === activeCategory);

  return (
    <div className="bg-[#050505] text-[#ffffff] font-sans relative z-10 select-text">
      
      {/* 3. Upgraded Services Ecosystem Section */}
      <section id="services" className="relative border-t border-white/5 py-24 px-6 sm:px-12 min-h-screen flex items-center justify-center">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_80%_20%,rgba(255,106,0,0.03),transparent_40%)]" />
        
        <div className="max-w-[1200px] w-full flex flex-col gap-12">
          <div className="flex flex-col gap-4 max-w-[650px]">
            <span className="flex h-5 w-fit items-center justify-center rounded-full border border-[#ff6a00]/30 bg-[#ff6a00]/10 px-3.5 py-1 text-[9px] font-black uppercase tracking-[0.2em] text-[#ff8c42] shadow-[0_0_10px_rgba(255,106,0,0.1)]">
              Services Ecosystem
            </span>
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight uppercase leading-tight">
              Strategic Systems Built <br />
              <span className="text-gradient-orange-pure">For Business Outcomes</span>
            </h2>
            <p className="text-xs sm:text-sm text-white/50 leading-relaxed font-light">
              We construct performance campaigns, digital products, and automated pipelines engineered to command market share and maximize margins.
            </p>
          </div>

          {/* Category Tabs Selector */}
          <div className="flex flex-wrap gap-2 border-b border-white/5 pb-4">
            {["Performance Marketing", "Organic Growth", "Branding", "Web Experiences", "Automation"].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`relative px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-colors focus:outline-none focus:ring-1 focus:ring-[#ff6a00] cursor-pointer ${
                  activeCategory === cat ? "text-white" : "text-white/40 hover:text-white"
                }`}
              >
                {activeCategory === cat && (
                  <motion.span
                    layoutId="services-pill"
                    className="absolute inset-0 bg-[#ff6a00]/10 border border-[#ff6a00]/25 rounded-full"
                    transition={{ type: "spring", stiffness: 350, damping: 25 }}
                  />
                )}
                <span className="relative z-10">{cat}</span>
              </button>
            ))}
          </div>

          {/* Services Ecosystem Cards Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 min-h-[300px]">
            {filteredServices.map((service, index) => (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                key={service.title}
                className="glass-panel border border-white/8 rounded-[2rem] overflow-hidden flex flex-col justify-between hover:border-[#ff6a00]/30 transition-all duration-300 group"
              >
                {/* Visual Header card */}
                <div className="relative aspect-video w-full overflow-hidden border-b border-white/5 bg-gradient-to-br from-white/[0.02] to-white/[0.00] flex items-center justify-center">
                  {service.image ? (
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      loading="lazy"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  ) : (
                    /* Elegant fallback placeholder: gradient, icon, and mock dashboard feel */
                    <div className="absolute inset-0 bg-gradient-to-br from-[#0c0c0c] to-[#050505] flex items-center justify-center p-6 overflow-hidden">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,106,0,0.03),transparent_60%)]" />
                      <div className="relative z-10 flex flex-col items-center gap-2 text-center">
                        <div className="h-10 w-10 rounded-full bg-white/[0.02] border border-white/10 flex items-center justify-center text-[#ff6a00]/80 group-hover:text-[#ff6a00] group-hover:scale-110 transition-all duration-300">
                          {activeCategory === "Performance Marketing" && <BarChart className="h-5 w-5" />}
                          {activeCategory === "Organic Growth" && <Target className="h-5 w-5" />}
                          {activeCategory === "Branding" && <Sparkles className="h-5 w-5" />}
                          {activeCategory === "Web Experiences" && <ArrowUpRight className="h-5 w-5" />}
                          {activeCategory === "Automation" && <Zap className="h-5 w-5" />}
                        </div>
                        <span className="text-[9px] font-black uppercase tracking-widest text-white/30">
                          {activeCategory}
                        </span>
                      </div>
                    </div>
                  )}
                  {/* Category overlay label */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3 py-1 rounded-full border border-white/10 bg-black/60 backdrop-blur-md text-[8px] font-black uppercase tracking-widest text-[#ff8c42]">
                      {activeCategory}
                    </span>
                  </div>
                </div>

                {/* Details Container */}
                <div className="p-6 flex flex-col justify-between flex-grow">
                  <div>
                    <h3 className="text-base sm:text-lg font-black text-white uppercase tracking-wide group-hover:text-[#ff8c42] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs text-[#9CA3AF] mt-2 leading-relaxed font-light">
                      {service.outcome}
                    </p>
                  </div>
                  <div className="border-t border-white/5 mt-5 pt-4 flex items-center justify-between">
                    <span className="text-[10px] font-bold text-white/50 tracking-wider">EXPECTED FOCUS:</span>
                    <span className="text-xs font-bold text-white tracking-wide">{service.metrics}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Upgraded Portfolio Section (Images Fallbacks & Detail Modals) */}
      <section id="portfolio" className="relative border-t border-white/5 py-24 px-6 sm:px-12 min-h-screen flex items-center justify-center">
        <div className="max-w-[1200px] w-full flex flex-col gap-12">
          <div className="flex flex-col gap-4 max-w-[650px]">
            <span className="flex h-5 w-fit items-center justify-center rounded-full border border-[#ff6a00]/30 bg-[#ff6a00]/10 px-3.5 py-1 text-[9px] font-black uppercase tracking-[0.2em] text-[#ff8c42] shadow-[0_0_10px_rgba(255,106,0,0.1)]">
              Case Studies
            </span>
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight uppercase leading-tight">
              Selected Work <br />
              <span className="text-gradient-orange-pure">With Scalable Growth</span>
            </h2>
          </div>

          {/* Project List (Clean gradients, no broken placeholders) */}
          <div className="grid md:grid-cols-3 gap-8">
            {portfolioProjects.map((project, i) => (
              <div
                key={project.title}
                onClick={() => setSelectedProject(project)}
                className="glass-panel border border-white/8 rounded-[2.2rem] overflow-hidden hover:border-[#ff6a00]/25 transition-all duration-300 flex flex-col cursor-pointer group"
              >
                {/* Visual Header card */}
                <div className="relative aspect-video w-full overflow-hidden border-b border-white/5 bg-gradient-to-br from-white/[0.02] to-white/[0.00] flex items-center justify-center">
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      loading="lazy"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  ) : (
                    /* Fallback placeholder card */
                    <div className="absolute inset-0 bg-gradient-to-br from-[#0c0c0c] to-[#050505] flex items-center justify-center p-6">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,106,0,0.02),transparent_60%)]" />
                      <span className="text-xs font-black uppercase tracking-widest text-white/30">
                        {project.title}
                      </span>
                    </div>
                  )}

                  {/* Dark Glassmorphic Info Banner Overlay */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/45 to-transparent p-5 pt-12 flex items-end justify-between">
                    <div>
                      <span className="px-2.5 py-0.5 rounded-full border border-white/10 bg-black/60 backdrop-blur-md text-[8px] font-black uppercase tracking-widest text-[#ff8c42]">
                        {project.category}
                      </span>
                      <h4 className="text-sm font-black text-white uppercase tracking-wider mt-2 group-hover:text-[#ff8c42] transition-all">
                        {project.title}
                      </h4>
                    </div>
                    
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/[0.05] border border-white/10 text-white backdrop-blur-md transition-transform duration-300 group-hover:scale-110">
                      <ArrowUpRight className="h-4.5 w-4.5 text-white group-hover:text-[#ff6a00] transition-colors" />
                    </span>
                  </div>
                </div>

                {/* Details Container */}
                <div className="p-6 flex flex-col justify-between flex-grow">
                  <p className="text-xs text-[#9CA3AF] leading-relaxed font-light line-clamp-2">
                    {project.description}
                  </p>
                  <div className="border-t border-white/5 mt-5 pt-4 flex items-center justify-between">
                    <span className="text-[10px] font-bold text-white/50 tracking-wider">PROJECT METRIC:</span>
                    <span className="text-xs font-black text-[#ff8c42] tracking-wide">{project.metric}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Portfolio Case Study Detail Modal Overlay */}
        <AnimatePresence>
          {selectedProject && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProject(null)}
                className="absolute inset-0 bg-black/85 backdrop-blur-md"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                className="relative w-full max-w-[550px] rounded-[2rem] border border-white/[0.12] bg-[#050505]/95 p-6 sm:p-8 shadow-[0_24px_64px_rgba(0,0,0,0.9)] backdrop-blur-xl z-10"
              >
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-6 right-6 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-[#F5F5F5] hover:bg-white/[0.08] transition-colors cursor-pointer"
                  aria-label="Close project modal"
                >
                  <X className="h-4.5 w-4.5" />
                </button>
                <span className="text-[9px] font-black uppercase tracking-widest text-[#ff6a00] block mb-2">
                  CASE STUDY DETAILS
                </span>
                <h3 className="text-2xl font-black text-white uppercase tracking-tight">
                  {selectedProject.title}
                </h3>
                <p className="text-xs font-black text-[#ff8c42] tracking-wider uppercase mt-1">
                  Key Metrics: {selectedProject.metric}
                </p>

                <div className="mt-6 flex flex-col gap-4">
                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-white/50">PROJECT SUMMARY</h4>
                    <p className="text-xs text-[#F5F5F5] leading-relaxed mt-1 font-light">{selectedProject.description}</p>
                  </div>
                  <div className="border-t border-white/5 pt-4">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-white/50">THE CHALLENGE</h4>
                    <p className="text-xs text-[#F5F5F5]/80 leading-relaxed mt-1 font-light">{selectedProject.problem}</p>
                  </div>
                  <div className="border-t border-white/5 pt-4">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-white/50">THE SOLUTION</h4>
                    <p className="text-xs text-[#F5F5F5]/80 leading-relaxed mt-1 font-light">{selectedProject.solution}</p>
                  </div>
                </div>

                <div className="mt-8 flex justify-end">
                  <button
                    onClick={() => {
                      setSelectedProject(null);
                      openLeadModal();
                    }}
                    className="h-10 rounded-xl bg-gradient-to-r from-[#ff6a00] to-[#ff8c42] text-black font-black text-xs uppercase tracking-widest px-6 hover:shadow-[0_0_20px_rgba(255,106,0,0.3)] transition-all cursor-pointer"
                  >
                    Request Similar Audit
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </section>

      {/* 6. Authority-Building Trust Sections (Why choose, Process, Framework) */}
      <section id="about" className="relative border-t border-white/5 py-24 px-6 sm:px-12 flex items-center justify-center">
        <div className="max-w-[1200px] w-full flex flex-col gap-20">
          
          {/* Why Choose TBM Grid */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col gap-6">
              <span className="flex h-5 w-fit items-center justify-center rounded-full border border-[#ff6a00]/30 bg-[#ff6a00]/10 px-3.5 py-1 text-[9px] font-black uppercase tracking-[0.2em] text-[#ff8c42] shadow-[0_0_10px_rgba(255,106,0,0.1)]">
                Why Choose TBM
              </span>
              <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight uppercase leading-tight">
                Senior Expertise <br />
                <span className="text-gradient-orange-pure">Without Agency Fluff</span>
              </h2>
              <p className="text-xs sm:text-sm text-white/60 leading-relaxed font-light">
                We replace bloated account managers and generic spreadsheets with senior strategists, proprietary growth modeling tools, and custom performance architecture.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: "Senior-Led Execution", desc: "No junior associates. Strategy and operations handled directly by industry veterans." },
                { title: "Proprietary Models", desc: "Performance mapping models built to forecast conversion volumes before execution." },
                { title: "100% Transparent", desc: "Clean data integrations. Client dashboard views updating in real-time." },
                { title: "Margin-Optimized", desc: "Every dollar mapped back to customer lifetime value metrics." },
              ].map((item, index) => (
                <div key={index} className="glass-panel border border-white/8 rounded-2xl p-5 hover:border-[#ff6a00]/20 transition-all duration-300">
                  <h4 className="font-black text-white text-xs uppercase tracking-wider">{item.title}</h4>
                  <p className="text-[11px] text-[#9CA3AF] leading-relaxed mt-1.5 font-light">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Client Process / Growth Framework timeline */}
          <div className="border-t border-white/5 pt-16">
            <div className="text-center flex flex-col items-center gap-4 mb-12">
              <span className="flex h-5 w-fit items-center justify-center rounded-full border border-[#ff6a00]/30 bg-[#ff6a00]/10 px-3.5 py-1 text-[9px] font-black uppercase tracking-[0.2em] text-[#ff8c42] shadow-[0_0_10px_rgba(255,106,0,0.1)]">
                Client Growth Framework
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight">
                Our Acquisition Pipeline
              </h2>
            </div>
            <div className="grid sm:grid-cols-4 gap-6 relative">
              {[
                { step: "01", title: "Auditing & Analysis", desc: "Identify conversion leaks and ad target inefficiencies in your current channels." },
                { step: "02", title: "Funnel Modeling", desc: "Map exact ROAS and CPA forecasts based on quantitative market demand statistics." },
                { step: "03", title: "Execution & Flow", desc: "Launch customized search/social ads and performance page layouts." },
                { step: "04", title: "Scale Operations", desc: "Deploy creative variations, increase budgets safely, and integrate automated flows." },
              ].map((step, i) => (
                <div key={i} className="glass-panel border border-white/8 rounded-2xl p-6 relative hover:border-[#ff6a00]/25 transition-all duration-300">
                  <span className="text-2xl font-black text-[#ff6a00]/40 group-hover:text-[#ff6a00] transition-colors">
                    {step.step}
                  </span>
                  <h4 className="font-black text-white text-xs uppercase tracking-wider mt-3">{step.title}</h4>
                  <p className="text-[11px] text-[#9CA3AF] leading-relaxed mt-2 font-light">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7. Redesigned Interactive Marketing Audit (Target Audience: Indian Businesses) */}
      <section className="relative border-t border-white/5 py-24 px-6 sm:px-12 flex items-center justify-center bg-gradient-to-b from-[#050505] to-[#070707]">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_50%,rgba(255,106,0,0.02),transparent_40%)]" />
        
        <div className="max-w-[720px] w-full glass-panel border border-white/10 rounded-[2.5rem] p-6 sm:p-10 flex flex-col items-center gap-6 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
          
          <div className="text-center flex flex-col items-center gap-3">
            <span className="flex h-5 w-fit items-center justify-center rounded-full border border-[#ff6a00]/30 bg-[#ff6a00]/10 px-3.5 py-1 text-[9px] font-black uppercase tracking-[0.2em] text-[#ff8c42] shadow-[0_0_10px_rgba(255,106,0,0.1)]">
              Interactive Marketing Audit
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight">
              Check Your Business Growth Score
            </h2>
            <p className="text-xs text-white/50 max-w-[460px] leading-relaxed font-light">
              Answer 5 simple questions in plain language to see growth opportunities and recommended services.
            </p>
          </div>

          <div className="w-full mt-4 min-h-[220px]">
            
            {/* Q1: How do customers currently find you? */}
            {quizStep === 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-4">
                <h4 className="text-sm font-bold text-center text-white/80">
                  Question 1: How do customers currently find your business?
                </h4>
                <div className="grid gap-3">
                  {[
                    { label: "Word of mouth / references from existing clients", value: "word-of-mouth" },
                    { label: "Google Search or Google Maps", value: "google-search" },
                    { label: "Social Media (Instagram / Facebook / YouTube)", value: "social-media" },
                    { label: "Offline ads (Pamphlets / Banners / Newspapers)", value: "pamphlets" },
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => {
                        setQ1Discovery(opt.value);
                        setQuizStep(1);
                      }}
                      className="w-full h-11 text-xs font-bold text-left px-5 rounded-xl border border-white/10 bg-white/[0.03] text-white hover:border-[#ff6a00]/30 hover:bg-white/[0.06] transition-all cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#ff6a00]"
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Q2: Enquiries monthly */}
            {quizStep === 1 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-4">
                <h4 className="text-sm font-bold text-center text-white/80">
                  Question 2: How many enquiries or leads do you get per month?
                </h4>
                <div className="grid gap-3">
                  {[
                    { label: "Less than 10 enquiries", value: "less-10" },
                    { label: "10 to 50 enquiries", value: "10-50" },
                    { label: "More than 50 enquiries", value: "more-50" },
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => {
                        setQ2Enquiries(opt.value);
                        setQuizStep(2);
                      }}
                      className="w-full h-11 text-xs font-bold text-left px-5 rounded-xl border border-white/10 bg-white/[0.03] text-white hover:border-[#ff6a00]/30 hover:bg-white/[0.06] transition-all cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#ff6a00]"
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Q3: Digital marketing running */}
            {quizStep === 2 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-4">
                <h4 className="text-sm font-bold text-center text-white/80">
                  Question 3: Do you currently run digital marketing?
                </h4>
                <div className="grid gap-3">
                  {[
                    { label: "No, never tried before", value: "never" },
                    { label: "Yes, I am doing it myself or with my internal team", value: "self" },
                    { label: "Yes, we are working with an agency or freelancer", value: "agency" },
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => {
                        setQ3RunDigital(opt.value);
                        setQuizStep(3);
                      }}
                      className="w-full h-11 text-xs font-bold text-left px-5 rounded-xl border border-white/10 bg-white/[0.03] text-white hover:border-[#ff6a00]/30 hover:bg-white/[0.06] transition-all cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#ff6a00]"
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Q4: Biggest challenge */}
            {quizStep === 3 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-4">
                <h4 className="text-sm font-bold text-center text-white/80">
                  Question 4: What is your biggest business challenge?
                </h4>
                <div className="grid gap-3">
                  {[
                    { label: "Getting more walk-ins or local store visits", value: "walkins" },
                    { label: "Getting qualified leads, student admissions, or client bookings", value: "bookings" },
                    { label: "Lack of active online presence & visual trust", value: "trust" },
                    { label: "Wasting budget and getting poor results from current ad campaigns", value: "budget" },
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => {
                        setQ4Challenge(opt.value);
                        setQuizStep(4);
                      }}
                      className="w-full h-11 text-xs font-bold text-left px-5 rounded-xl border border-white/10 bg-white/[0.03] text-white hover:border-[#ff6a00]/30 hover:bg-white/[0.06] transition-all cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#ff6a00]"
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Q5: Marketing budget */}
            {quizStep === 4 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-4">
                <h4 className="text-sm font-bold text-center text-white/80">
                  Question 5: What is your monthly marketing budget?
                </h4>
                <div className="grid gap-3">
                  {[
                    { label: "Under ₹5,000", value: "under5" },
                    { label: "₹5,000 – ₹15,000", value: "5to15" },
                    { label: "₹15,000 – ₹30,000", value: "15to30" },
                    { label: "₹30,000 – ₹50,000", value: "30to50" },
                    { label: "₹50,000+", value: "over50" },
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => {
                        setQ5Budget(opt.value);
                        // Trigger calculation on click of final answer
                        setTimeout(() => handleAuditCalculate(), 100);
                      }}
                      className="w-full h-11 text-xs font-bold text-left px-5 rounded-xl border border-white/10 bg-white/[0.03] text-white hover:border-[#ff6a00]/30 hover:bg-white/[0.06] transition-all cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#ff6a00]"
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 5: Score & Dynamic Outcomes Reveal */}
            {quizStep === 5 && calculatedScore !== null && (
              <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex flex-col items-center gap-6 text-center">
                
                {/* Score Dial */}
                <div className="relative flex items-center justify-center h-28 w-28 rounded-full border border-white/5 bg-white/[0.01]">
                  <div className="absolute inset-1 rounded-full border border-dashed border-[#ff6a00]/25 animate-spin" style={{ animationDuration: "14s" }} />
                  <div className="flex flex-col items-center justify-center">
                    <span className="text-3xl font-black text-white">{calculatedScore}</span>
                    <span className="text-[9px] font-black text-white/40 uppercase tracking-wider">/ 100</span>
                  </div>
                </div>

                <div className="flex flex-col gap-4 text-left w-full border border-white/5 bg-white/[0.01] rounded-2xl p-5 sm:p-6">
                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-[#ff6a00]">Growth Opportunities</h4>
                    <p className="text-xs text-white/80 mt-1 leading-relaxed font-light">
                      {q4Challenge === "walkins"
                        ? "• Set up and verify Google Local Search profiles to show up on Google Maps.\n• Run localized ad campaigns targeting customer pin codes within 5km."
                        : q4Challenge === "bookings"
                        ? "• Build a direct WhatsApp-friendly single-page query landing page.\n• Hook up automated welcome replies to avoid losing enquiries."
                        : q4Challenge === "trust"
                        ? "• Design high-contrast visual portfolio guides and client review sheets.\n• Refresh social assets into professional, cohesive grids."
                        : "• Review search terms lists weekly to block wasted keyword ad spend.\n• Deploy meta analytics pixels to monitor specific conversions."}
                    </p>
                  </div>

                  <div className="border-t border-white/5 pt-3">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-[#ff6a00]">Recommended Services</h4>
                    <p className="text-xs text-white/80 mt-1 font-bold">
                      {q4Challenge === "walkins"
                        ? "Google Local Business Maps Listing & Hyper-Local Meta Ad Funnels"
                        : q4Challenge === "bookings"
                        ? "WhatsApp Query Automation & Mobile Landing Page Funnels"
                        : q4Challenge === "trust"
                        ? "Core Visual Branding Guidelines & Premium Website Restructuring"
                        : "Paid Campaigns Performance Auditing & E-com Conversion Re-Modeling"}
                    </p>
                  </div>

                  <div className="border-t border-white/5 pt-3">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-[#ff6a00]">Expected Outcomes</h4>
                    <p className="text-xs text-white/80 mt-1 leading-relaxed font-light">
                      {q4Challenge === "walkins"
                        ? "Consistently drive local client store walk-ins and direct calls every week."
                        : q4Challenge === "bookings"
                        ? "Capture 15 to 30 qualified enquiries directly on your phone month-over-month."
                        : q4Challenge === "trust"
                        ? "Double the trust conversion rates of cold page visitors into paid bookings."
                        : "Lower overall enquiry costs by 30% while eliminating wasted ad budgets."}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 w-full max-w-[380px]">
                  <button
                    onClick={handleAuditReset}
                    className="h-11 flex-1 rounded-xl border border-white/10 bg-white/[0.02] text-white hover:bg-white/[0.06] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer focus:outline-none"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    Reset
                  </button>
                  <button
                    onClick={() => setQuizStep(6)}
                    className="h-11 flex-1 rounded-xl bg-gradient-to-r from-[#ff6a00] to-[#ff8c42] text-black font-black text-xs uppercase tracking-widest hover:shadow-[0_0_15px_rgba(255,106,0,0.3)] transition-all cursor-pointer focus:outline-none"
                  >
                    Get My Free Growth Plan
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 6: Simple WhatsApp Lead Form */}
            {quizStep === 6 && (
              <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="w-full flex flex-col gap-4">
                <div className="text-center mb-2">
                  <h4 className="text-sm font-bold text-white/80 uppercase tracking-wide">
                    Claim Your Growth Plan
                  </h4>
                  <p className="text-[11px] text-[#9CA3AF] mt-1 font-light">
                    Submit your basic business contacts below to schedule your WhatsApp growth consultation.
                  </p>
                </div>

                <form onSubmit={handleAuditLeadSubmit} className="flex flex-col gap-3.5 max-w-[420px] mx-auto w-full">
                  {/* Name field */}
                  <div className="flex flex-col gap-1">
                    <label htmlFor="audit-name" className="text-[9px] font-black uppercase tracking-widest text-[#9CA3AF]">
                      Full Name
                    </label>
                    <input
                      id="audit-name"
                      type="text"
                      required
                      value={auditName}
                      onChange={(e) => setAuditName(e.target.value)}
                      placeholder="Enter your full name"
                      className="w-full h-10 px-4 rounded-xl bg-white/[0.05] border border-white/[0.12] text-[#F5F5F5] placeholder-[#9CA3AF] focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent outline-none transition-all text-xs"
                    />
                  </div>

                  {/* Phone field */}
                  <div className="flex flex-col gap-1">
                    <label htmlFor="audit-phone" className="text-[9px] font-black uppercase tracking-widest text-[#9CA3AF]">
                      Phone Number
                    </label>
                    <input
                      id="audit-phone"
                      type="tel"
                      required
                      value={auditPhone}
                      onChange={(e) => setAuditPhone(e.target.value)}
                      placeholder="Enter your phone number"
                      className="w-full h-10 px-4 rounded-xl bg-white/[0.05] border border-white/[0.12] text-[#F5F5F5] placeholder-[#9CA3AF] focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent outline-none transition-all text-xs"
                    />
                  </div>

                  {/* Business Name field */}
                  <div className="flex flex-col gap-1">
                    <label htmlFor="audit-business" className="text-[9px] font-black uppercase tracking-widest text-[#9CA3AF]">
                      Business Name
                    </label>
                    <input
                      id="audit-business"
                      type="text"
                      required
                      value={auditBusiness}
                      onChange={(e) => setAuditBusiness(e.target.value)}
                      placeholder="Your company name"
                      className="w-full h-10 px-4 rounded-xl bg-white/[0.05] border border-white/[0.12] text-[#F5F5F5] placeholder-[#9CA3AF] focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent outline-none transition-all text-xs"
                    />
                  </div>

                  {/* Buttons */}
                  <div className="grid grid-cols-2 gap-4 mt-3">
                    <button
                      type="button"
                      onClick={() => setQuizStep(5)}
                      className="h-10 rounded-xl border border-white/10 bg-white/[0.02] text-[#F5F5F5] hover:bg-white/[0.06] text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer focus:outline-none"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="h-10 rounded-xl bg-gradient-to-r from-[#ff6a00] to-[#ff8c42] text-black font-black text-xs uppercase tracking-widest hover:shadow-[0_0_15px_rgba(255,106,0,0.3)] transition-all cursor-pointer focus:outline-none flex items-center justify-center gap-1.5"
                    >
                      Get Free Strategy
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {/* Step 7: Premium Success Screen */}
            {quizStep === 7 && (
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
                  Reference ID: {auditRefId}
                </div>

                {/* Action choices buttons (WhatsApp, Explore) */}
                <div className="flex flex-col gap-3 w-full max-w-[380px] mt-8">
                  {/* Chat on WhatsApp */}
                  <button
                    onClick={() => {
                      window.open(submittedAuditWhatsappUrl, "_blank");
                    }}
                    className="h-11 rounded-xl bg-gradient-to-r from-[#ff6a00] to-[#ff8c42] text-black hover:shadow-[0_0_20px_rgba(255,106,0,0.4)] font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer focus:outline-none"
                  >
                    <MessageSquare className="h-4 w-4" />
                    Chat on WhatsApp
                  </button>

                  {/* Continue Browsing (Reset Quiz) */}
                  <button
                    onClick={handleAuditReset}
                    className="h-11 rounded-xl bg-white/[0.03] text-white/60 hover:text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer focus:outline-none"
                  >
                    Continue Browsing
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Accordion FAQ Component */}
      <section className="relative border-t border-white/5 py-24 px-6 sm:px-12 flex items-center justify-center">
        <div className="max-w-[760px] w-full flex flex-col gap-10">
          <div className="text-center flex flex-col items-center gap-4">
            <span className="flex h-5 w-fit items-center justify-center rounded-full border border-[#ff6a00]/30 bg-[#ff6a00]/10 px-3.5 py-1 text-[9px] font-black uppercase tracking-[0.2em] text-[#ff8c42] shadow-[0_0_10px_rgba(255,106,0,0.1)]">
              Frequently Asked Questions
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight">
              Operational Queries
            </h2>
          </div>

          <div className="flex flex-col gap-4">
            {faqs.map((faq, index) => {
              const isOpen = activeFaq === index;
              return (
                <div key={index} className="glass-panel border border-white/8 rounded-2xl overflow-hidden transition-all duration-300">
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : index)}
                    className="w-full flex items-center justify-between p-5 text-left text-sm font-bold uppercase tracking-wider text-white focus:outline-none cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`h-4.5 w-4.5 text-[#ff6a00] transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <p className="px-5 pb-5 text-xs text-[#9CA3AF] leading-relaxed font-light border-t border-white/5 pt-3">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Upgraded Contact Section (Direct Call, Direct WhatsApp, Direct Email) */}
      <section
        id="contact"
        className="min-h-screen flex items-center justify-center relative border-t border-white/5 py-24 px-6 sm:px-12 bg-gradient-to-b from-[#050505] to-[#010101]"
      >
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_100%,rgba(255,106,0,0.04),transparent_50%)]" />
        
        <div className="max-w-[1200px] w-full grid md:grid-cols-2 gap-12 items-center">
          
          {/* Left copy column */}
          <div className="flex flex-col gap-6">
            <span className="flex h-5 w-fit items-center justify-center rounded-full border border-[#ff6a00]/30 bg-[#ff6a00]/10 px-3.5 py-1 text-[9px] font-black uppercase tracking-[0.2em] text-[#ff8c42] shadow-[0_0_10px_rgba(255,106,0,0.1)]">
              Contact Strategy
            </span>
            <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-[1.05] uppercase">
              Start The <br />
              <span className="text-gradient-orange-pure">Conversation</span>
            </h2>
            <p className="text-xs sm:text-sm text-white/50 leading-relaxed font-light">
              Connect directly with our lead strategist. Pick a channel below to bypass sales representatives and review real conversion strategy.
            </p>

            {/* Quick Strategy Consultation CTA */}
            <button
              onClick={openLeadModal}
              className="w-fit h-12 rounded-full bg-gradient-to-r from-[#ff6a00] to-[#ff8c42] px-8 text-xs font-black uppercase tracking-widest text-[#050505] shadow-[0_0_24px_rgba(255,106,0,0.3)] hover:shadow-[0_0_36px_rgba(255,106,0,0.5)] transition-all duration-300 cursor-pointer flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#ff6a00]"
            >
              <Award className="h-4 w-4 text-[#050505]" />
              Book Discovery Session
            </button>
          </div>

          {/* Right Direct CTA Cards Column */}
          <div className="flex flex-col gap-4">
            
            {/* Phone Number Click-To-Call */}
            <a
              href="tel:+919740540724"
              className="glass-panel border border-white/8 rounded-2xl p-5 flex items-center justify-between hover:border-[#ff6a00]/30 hover:bg-white/[0.04] transition-all duration-300 group focus:outline-none focus:ring-1 focus:ring-[#ff6a00]"
            >
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center text-[#ff6a00] group-hover:bg-[#ff6a00] group-hover:text-black transition-all">
                  <Phone className="h-4.5 w-4.5" />
                </div>
                <div>
                  <h4 className="font-black text-white text-[10px] uppercase tracking-widest">Call Strategist Directly</h4>
                  <p className="text-xs text-[#9CA3AF] mt-0.5 group-hover:text-white transition-colors">+91 9740540724</p>
                </div>
              </div>
              <ArrowUpRight className="h-4.5 w-4.5 text-white/40 group-hover:text-[#ff6a00] transition-colors" />
            </a>

            {/* Direct WhatsApp Click-To-Chat */}
            <a
              href="https://wa.me/919740540724?text=Hello%20TBM%20Team%2C%20I%20would%20like%20to%20schedule%20a%20free%20growth%20consultation."
              target="_blank"
              rel="noopener noreferrer"
              className="glass-panel border border-white/8 rounded-2xl p-5 flex items-center justify-between hover:border-[#ff6a00]/30 hover:bg-white/[0.04] transition-all duration-300 group focus:outline-none focus:ring-1 focus:ring-[#ff6a00]"
            >
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center text-[#ff6a00] group-hover:bg-[#ff6a00] group-hover:text-black transition-all">
                  <MessageSquare className="h-4.5 w-4.5" />
                </div>
                <div>
                  <h4 className="font-black text-white text-[10px] uppercase tracking-widest">Chat on WhatsApp</h4>
                  <p className="text-xs text-[#9CA3AF] mt-0.5 group-hover:text-white transition-colors">Instant Consultation Channel</p>
                </div>
              </div>
              <ArrowUpRight className="h-4.5 w-4.5 text-white/40 group-hover:text-[#ff6a00] transition-colors" />
            </a>

            {/* Direct Email Link */}
            <a
              href="mailto:hello@thebhosalemedia.com?subject=Project%20Inquiry%20Strategy%20Request"
              className="glass-panel border border-white/8 rounded-2xl p-5 flex items-center justify-between hover:border-[#ff6a00]/30 hover:bg-white/[0.04] transition-all duration-300 group focus:outline-none focus:ring-1 focus:ring-[#ff6a00]"
            >
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center text-[#ff6a00] group-hover:bg-[#ff6a00] group-hover:text-black transition-all">
                  <Mail className="h-4.5 w-4.5" />
                </div>
                <div>
                  <h4 className="font-black text-white text-[10px] uppercase tracking-widest">Email Agency</h4>
                  <p className="text-xs text-[#9CA3AF] mt-0.5 group-hover:text-white transition-colors">hello@thebhosalemedia.com</p>
                </div>
              </div>
              <ArrowUpRight className="h-4.5 w-4.5 text-white/40 group-hover:text-[#ff6a00] transition-colors" />
            </a>

          </div>

        </div>
      </section>

    </div>
  );
}
