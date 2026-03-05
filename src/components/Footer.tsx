"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="w-full border-t border-stone/5 py-16 md:py-20 px-8">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <span className="font-[family-name:var(--font-serif)] text-sm tracking-[0.12em] uppercase text-stone-light/70">
              Formatio Systems
            </span>
            <p className="mt-3 text-xs text-taupe/50 leading-relaxed">
              AI integration, quietly perfected.
            </p>
          </motion.div>

          {/* Location */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.1 }}
          >
            <span className="text-[10px] tracking-[0.2em] uppercase text-taupe/40">
              Location
            </span>
            <p className="mt-3 text-xs text-stone-dark leading-relaxed">
              Toronto, Ontario
            </p>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <span className="text-[10px] tracking-[0.2em] uppercase text-taupe/40">
              Contact
            </span>
            <p className="mt-3 text-xs text-stone-dark leading-relaxed">
              alex@formatiosystems.com
            </p>
          </motion.div>
        </div>

        <div className="mt-16 pt-8 border-t border-stone/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-[10px] tracking-[0.15em] text-taupe/30">
            &copy; {new Date().getFullYear()} Formatio Systems
          </span>
          <div className="flex gap-8">
            <a
              href="#services"
              className="text-[10px] tracking-[0.15em] uppercase text-taupe/30 hover:text-taupe/60 transition-colors duration-500"
            >
              Services
            </a>
            <a
              href="#about"
              className="text-[10px] tracking-[0.15em] uppercase text-taupe/30 hover:text-taupe/60 transition-colors duration-500"
            >
              About
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
