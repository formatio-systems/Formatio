"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

function PulsingRing({ size, delay }: { size: number; delay: number }) {
  return (
    <motion.div
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-stone/[0.04]"
      style={{ width: size, height: size }}
      animate={{
        scale: [1, 1.1, 1],
        opacity: [0.3, 0.6, 0.3],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    />
  );
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative w-full py-32 md:py-48 px-8 overflow-hidden"
    >
      {/* Pulsing concentric rings */}
      <PulsingRing size={300} delay={0} />
      <PulsingRing size={500} delay={1.5} />
      <PulsingRing size={700} delay={3} />

      {/* Ambient glow */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-[0.03] blur-[120px] bg-cashmere"
        animate={{
          scale: [1, 1.4, 1],
          rotate: [0, 180, 360],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 w-full max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
        >
          <span className="text-[10px] sm:text-xs tracking-[0.4em] uppercase text-taupe">
            About
          </span>
        </motion.div>

        <motion.p
          style={{ y: textY, opacity: textOpacity }}
          className="mt-12 font-[family-name:var(--font-serif)] text-xl sm:text-2xl md:text-3xl text-ivory/60 leading-relaxed tracking-tight"
        >
          We believe the most powerful technology
          is the kind you never notice.
        </motion.p>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.8, ease: [0.25, 0.1, 0, 1] }}
          className="mx-auto mt-12 w-12 h-px bg-taupe/30 origin-center"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-10 text-sm text-stone-dark leading-relaxed max-w-md mx-auto"
        >
          Formatio Systems integrates artificial intelligence into the fabric
          of your business — discreetly, precisely, and with lasting impact.
        </motion.p>
      </div>
    </section>
  );
}
