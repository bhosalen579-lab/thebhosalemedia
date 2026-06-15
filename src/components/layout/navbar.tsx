"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import { useModal } from "@/providers/modal-provider";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Portfolio", href: "#portfolio" },
  { name: "Contact", href: "#contact" },
];

export function Navbar() {
  const [activeLink, setActiveLink] = useState("Home");
  const [isOpen, setIsOpen] = useState(false);
  const { openContactModal } = useModal();

  // Handle active navigation highlighting based on current scroll position
  useEffect(() => {
    const sections = ["home", "about", "services", "portfolio", "contact"];
    const sectionIdMap: Record<string, string> = {
      home: "Home",
      about: "About",
      services: "Services",
      portfolio: "Portfolio",
      contact: "Contact",
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const matchedName = sectionIdMap[entry.target.id];
          if (matchedName) {
            setActiveLink(matchedName);
          }
        }
      });
    };

    const observerOptions = {
      root: null,
      rootMargin: "-45% 0px -45% 0px", // Focus on the center viewport slice
      threshold: 0,
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  // Smooth scroll handler
  const handleScrollTo = (e: React.MouseEvent, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        className="fixed left-1/2 top-6 z-50 w-[92%] -translate-x-1/2 rounded-full border border-white/10 bg-black/40 py-2.5 pl-6 pr-3 shadow-[0_8px_32px_rgba(0,0,0,0.5)] backdrop-blur-md transition-all duration-300 md:w-fit md:min-w-[680px]"
      >
        <div className="flex items-center justify-between gap-8">
          {/* Logo */}
          <Link
            href="/"
            onClick={(e) => {
              setActiveLink("Home");
              setIsOpen(false);
              handleScrollTo(e, "home");
            }}
            className="group flex items-center gap-2 focus:outline-none"
            aria-label="TBM Home"
          >
            <div className="relative h-7 w-7 overflow-hidden rounded-full border border-white/10 bg-white/5 flex items-center justify-center transition-transform group-hover:scale-105 duration-300">
              <Image
                src="/images/logo.png"
                alt="TBM Logo"
                fill
                className="object-contain scale-110"
              />
            </div>
            <span className="text-xs font-black tracking-[0.25em] text-white transition-colors group-hover:text-[#ff6a00] uppercase">
              TBM
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = activeLink === link.name;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    setActiveLink(link.name);
                    handleScrollTo(e, link.href.substring(1));
                  }}
                  className={cn(
                    "relative px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-colors duration-300 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#ff6a00]",
                    isActive ? "text-white" : "text-white/60 hover:text-white"
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="active-pill"
                      className="absolute inset-0 border border-[#ff6a00]/30 bg-[#ff6a00]/10 rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Right Action & Menu Trigger */}
          <div className="flex items-center gap-2">
            <button
              onClick={openContactModal}
              className="relative hidden md:inline-flex items-center justify-center overflow-hidden px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-[#ff6a00] to-[#ff8c42] text-black transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,106,0,0.45)] hover:scale-105 active:scale-95 cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-[#ff6a00]"
            >
              Get in Touch
            </button>

            {/* Mobile Burger Trigger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white hover:bg-white/[0.08] focus:outline-none md:hidden"
              aria-expanded={isOpen}
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-6 top-24 z-40 rounded-3xl border border-white/10 bg-black/90 p-6 shadow-2xl backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link, index) => (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  key={link.name}
                >
                  <Link
                    href={link.href}
                    onClick={(e) => {
                      setActiveLink(link.name);
                      setIsOpen(false);
                      handleScrollTo(e, link.href.substring(1));
                    }}
                    className={cn(
                      "block py-2 text-base font-medium uppercase tracking-widest transition-colors",
                      activeLink === link.name ? "text-[#ff6a00]" : "text-white/70 hover:text-white"
                    )}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.25 }}
                className="mt-2"
              >
                <button
                  onClick={() => {
                    setIsOpen(false);
                    openContactModal();
                  }}
                  className="flex w-full items-center justify-center rounded-full bg-gradient-to-r from-[#ff6a00] to-[#ff8c42] py-3 text-center text-sm font-bold uppercase tracking-wider text-black shadow-lg cursor-pointer"
                >
                  Get in Touch
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
