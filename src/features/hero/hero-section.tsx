"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Calendar, Sparkles } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { Navbar } from "@/components/layout/navbar";
import { Button } from "@/components/ui/button";
import { useMagnetic } from "@/hooks/use-magnetic";
import { cn } from "@/lib/utils";
import { useModal } from "@/providers/modal-provider";

// Dynamically import the heavy 3D Canvas component
const InteractiveSphere = dynamic(
  () =>
    import("@/components/three/interactive-sphere").then((mod) => ({
      default: mod.InteractiveSphere,
    })),
  {
    ssr: false,
    loading: () => (
      <div
        aria-hidden="true"
        className="absolute inset-y-0 right-0 z-0 h-screen w-full select-none opacity-50 lg:w-[50vw]"
      >
        <div className="absolute left-1/2 top-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#ff6b00]/10 bg-[#ff6b00]/3 blur-3xl" />
      </div>
    ),
  },
);

// Floating Trust Badge Component (Desktop only)
function FloatingBadge({
  children,
  delay = 0,
  duration = 5,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{
        opacity: 1,
        scale: 1,
        y: [0, -12, 0],
      }}
      transition={{
        opacity: { delay: 1, duration: 0.6 },
        scale: { delay: 1, duration: 0.6 },
        y: {
          delay,
          duration,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
      whileHover={{
        scale: 1.06,
        borderColor: "rgba(255, 106, 0, 0.4)",
        boxShadow: "0 0 24px rgba(255, 106, 0, 0.2)",
      }}
      className={cn(
        "absolute hidden lg:flex items-center gap-2 rounded-full border border-white/10 bg-black/55 px-5 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-white/80 backdrop-blur-md cursor-default transition-all duration-300",
        className
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-[#ff6a00] shadow-[0_0_8px_#ff6a00]" />
      {children}
    </motion.div>
  );
}

export function HeroSection() {
  const reduceMotion = useReducedMotion();
  const { ref: primaryCtaRef, position: primaryCtaPos } = useMagnetic(0.32);
  const { openLeadModal } = useModal();

  // Animation variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  // Staggered word-by-word headline configurations
  const headlineText = "Growing Brands Through Performance Marketing";
  const headlineWords = headlineText.split(" ");
  
  const headlineContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <main id="home" className="relative isolate min-h-screen w-full overflow-hidden bg-[#050505] text-[#ffffff] flex flex-col justify-between">
      {/* Cinematic Glowing Background Gradients */}
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_20%_20%,rgba(255,106,0,0.04),transparent_40%),radial-gradient(circle_at_80%_60%,rgba(255,106,0,0.06),transparent_50%)]" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:64px_64px] opacity-30 [mask-image:radial-gradient(circle_at_center,black,transparent_80%)]" />

      {/* Floating Glassmorphism Navbar */}
      <Navbar />

      {/* Immersive 3D Experience (Centered on mobile, right-aligned on desktop) */}
      <InteractiveSphere />

      {/* Floating Trust Badges (Positioned around 3D Scene for Depth/Parallax) */}
      <FloatingBadge delay={0} duration={5.5} className="top-[24%] left-[56%]">
        Google Ads
      </FloatingBadge>
      <FloatingBadge delay={1.2} duration={6} className="top-[45%] right-[6%]">
        Meta Ads
      </FloatingBadge>
      <FloatingBadge delay={0.6} duration={4.8} className="bottom-[24%] left-[62%]">
        Content Marketing
      </FloatingBadge>

      {/* Main Grid Content */}
      <div className="relative z-10 mx-auto flex-1 w-full max-w-[1440px] px-6 sm:px-12 flex items-center pt-24 pb-12 lg:pt-0 lg:pb-0">
        <div className="grid w-full items-center gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          
          {/* Left Content Column */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="max-w-[48rem] flex flex-col gap-6 text-left"
          >
            {/* TBM Brand Logo inside Hero Section */}
            <motion.div
              variants={itemVariants}
              className="relative w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] lg:w-[120px] lg:h-[120px] select-none mb-2"
            >
              <Image
                src="/images/logo.png"
                alt="The Bhosale Media Logo"
                fill
                priority
                sizes="(max-width: 640px) 80px, (max-width: 1024px) 100px, 120px"
                className="object-contain"
              />
            </motion.div>

            {/* Eyebrow Label */}
            <motion.div variants={itemVariants} className="flex items-center gap-2">
              <span className="flex h-5 items-center justify-center rounded-full border border-[#ff6a00]/30 bg-[#ff6a00]/10 px-3.5 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-[#ff8c42] shadow-[0_0_15px_rgba(255,106,0,0.15)]">
                <Sparkles className="mr-1.5 h-3 w-3 animate-pulse text-[#ff6a00]" />
                Performance Marketing Agency
              </span>
            </motion.div>

            {/* Staggered Word Headline */}
            <motion.h1
              id="hero-heading"
              variants={headlineContainerVariants}
              className="text-[clamp(2.5rem,7.5vw,5.5rem)] font-extrabold leading-[1.02] tracking-[-0.03em] text-[#ffffff] select-text"
            >
              {headlineWords.map((word, index) => {
                // Highlight keywords "Performance" and "Marketing"
                const isHighlighted = word === "Performance" || word === "Marketing";
                return (
                  <motion.span
                    key={index}
                    variants={wordVariants}
                    className={cn(
                      "inline-block mr-[0.24em] last:mr-0",
                      isHighlighted
                        ? "text-gradient-orange-pure text-glow-orange font-black"
                        : "text-[#ffffff]"
                    )}
                  >
                    {word}
                  </motion.span>
                );
              })}
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              variants={itemVariants}
              className="max-w-[38rem] text-base leading-relaxed text-white/70 sm:text-lg sm:leading-relaxed tracking-wide select-text font-light"
            >
              Google Ads, Meta Ads, Branding & Content Strategy That Drive Real Results.
            </motion.p>

            {/* CTA Actions */}
            <motion.div variants={itemVariants} className="mt-2 flex flex-col sm:flex-row gap-4">
              
              {/* Primary CTA (Magnetic Pull) */}
              <motion.div
                ref={primaryCtaRef as any}
                animate={reduceMotion ? {} : { x: primaryCtaPos.x, y: primaryCtaPos.y }}
                transition={{ type: "spring", stiffness: 180, damping: 15 }}
                className="w-full sm:w-auto"
              >
                <Button
                  onClick={openLeadModal}
                  className="w-full sm:w-auto h-12 rounded-full bg-gradient-to-r from-[#ff6a00] to-[#ff8c42] px-8 text-xs font-black uppercase tracking-widest text-[#050505] shadow-[0_0_24px_rgba(255,106,0,0.3)] hover:shadow-[0_0_36px_rgba(255,106,0,0.5)] transition-all duration-300 focus-visible:ring-[#ff6a00] cursor-pointer"
                >
                  <Calendar className="mr-2 h-4 w-4 shrink-0 text-[#050505]" />
                  Book Discovery Call
                </Button>
              </motion.div>

              {/* Secondary CTA (Glassmorphism + Animated Border) */}
              <div className="w-full sm:w-auto">
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  variant="outline"
                  className="animated-border glass-panel w-full sm:w-auto h-12 rounded-full border-white/10 bg-white/[0.03] px-8 text-xs font-black uppercase tracking-widest text-[#ffffff] transition-all duration-300 hover:bg-white/[0.08] hover:text-white focus-visible:ring-[#ff6a00] cursor-pointer"
                >
                  View Portfolio
                  <ArrowUpRight className="ml-1.5 h-4 w-4 shrink-0" />
                </Button>
              </div>

            </motion.div>

            {/* Trust Badges for Mobile/Tablet Screens */}
            <motion.div
              variants={itemVariants}
              className="flex lg:hidden flex-wrap items-center gap-3 mt-4"
            >
              {["Google Ads", "Meta Ads", "Content Marketing"].map((badge) => (
                <div
                  key={badge}
                  className="flex items-center gap-2 rounded-full border border-white/5 bg-white/[0.02] px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white/70"
                >
                  <span className="size-1.5 rounded-full bg-[#ff6a00]" />
                  {badge}
                </div>
              ))}
            </motion.div>

            {/* Premium Glass Founder Card */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -4, scale: 1.015 }}
              className="glass-panel border border-white/8 rounded-2xl p-4 flex items-center gap-4 max-w-sm mt-6 cursor-default transition-all duration-300 hover:border-[#ff6a00]/30 group"
            >
              <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-tr from-[#ff6a00] to-[#ff8c42] font-black text-black text-xs shadow-[0_0_15px_rgba(255,106,0,0.3)]">
                NB
                <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="flex flex-col">
                <h3 className="text-xs font-black text-white uppercase tracking-wider group-hover:text-[#ff6a00] transition-colors">
                  Nikhil Bhosale
                </h3>
                <p className="text-[10px] text-white/50 font-semibold uppercase tracking-widest mt-0.5">
                  Digital Marketing Strategist & Founder
                </p>
              </div>
            </motion.div>

          </motion.div>

          {/* Right Column (Intentionally empty space for 3D Orb visibility on desktop) */}
          <div className="pointer-events-none hidden lg:block h-1" />

        </div>
      </div>
    </main>
  );
}
