"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, delay: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-espresso/60 backdrop-blur-xl border-b border-stone/5"
    >
      <div className="max-w-7xl mx-auto px-8 py-5 flex items-center justify-between">
        <a
          href="#"
          className="font-[family-name:var(--font-serif)] text-base tracking-[0.12em] uppercase text-stone-light/90 hover:text-ivory transition-colors duration-500"
        >
          Formatio Systems
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-xs tracking-[0.2em] uppercase text-stone-dark hover:text-stone-light transition-colors duration-500"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <div className="w-5 flex flex-col gap-1.5">
            <span
              className={`block h-px bg-stone-light transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-[4px]" : ""}`}
            />
            <span
              className={`block h-px bg-stone-light transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-[3px]" : ""}`}
            />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4 }}
            className="md:hidden overflow-hidden bg-espresso/95 backdrop-blur-xl"
          >
            <div className="px-8 py-8 flex flex-col gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-xs tracking-[0.2em] uppercase text-stone-dark hover:text-stone-light transition-colors duration-500"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
