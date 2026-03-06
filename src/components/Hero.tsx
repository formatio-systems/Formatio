"use client";

import { motion } from "framer-motion";

function FloatingParticle({
  size,
  x,
  y,
  duration,
  delay,
}: {
  size: number;
  x: string;
  y: string;
  duration: number;
  delay: number;
}) {
  return (
    <motion.div
      className="absolute rounded-full bg-stone/[0.03]"
      style={{ width: size, height: size, left: x, top: y }}
      animate={{
        y: [0, -30, 10, -20, 0],
        x: [0, 15, -10, 20, 0],
        scale: [1, 1.1, 0.95, 1.05, 1],
        opacity: [0.3, 0.6, 0.4, 0.7, 0.3],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    />
  );
}

function DriftingLine({
  rotate,
  x,
  y,
  delay,
}: {
  rotate: number;
  x: string;
  y: string;
  delay: number;
}) {
  return (
    <motion.div
      className="absolute h-px bg-gradient-to-r from-transparent via-stone/[0.06] to-transparent"
      style={{
        width: "200px",
        left: x,
        top: y,
        rotate,
      }}
      animate={{
        opacity: [0, 0.5, 0],
        x: [0, 40, 0],
        scaleX: [0.5, 1, 0.5],
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

export default function Hero() {
  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-espresso">
      {/* Animated gradient that slowly shifts */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "radial-gradient(ellipse at 30% 50%, rgba(138,126,114,0.04) 0%, transparent 70%)",
            "radial-gradient(ellipse at 70% 40%, rgba(181,169,154,0.05) 0%, transparent 70%)",
            "radial-gradient(ellipse at 40% 60%, rgba(138,126,114,0.04) 0%, transparent 70%)",
          ],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Floating particles */}
      <FloatingParticle size={120} x="15%" y="20%" duration={12} delay={0} />
      <FloatingParticle size={80} x="75%" y="30%" duration={10} delay={2} />
      <FloatingParticle size={60} x="60%" y="70%" duration={14} delay={4} />
      <FloatingParticle size={100} x="25%" y="75%" duration={11} delay={1} />
      <FloatingParticle size={40} x="85%" y="60%" duration={9} delay={3} />

      {/* Drifting lines */}
      <DriftingLine rotate={-15} x="10%" y="35%" delay={0} />
      <DriftingLine rotate={8} x="65%" y="25%" delay={3} />
      <DriftingLine rotate={-5} x="40%" y="75%" delay={6} />

      {/* Large slow-moving ambient glow */}
      <motion.div
        className="absolute w-[800px] h-[800px] rounded-full opacity-[0.02] blur-[150px] bg-cashmere"
        animate={{
          x: [0, 100, -60, 0],
          y: [0, -80, 50, 0],
          scale: [1, 1.3, 0.8, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto text-center px-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2, delay: 0.3 }}
          className="mb-8"
        >
          <span className="text-[10px] sm:text-xs tracking-[0.4em] uppercase text-taupe">
            Artificial Intelligence Integration
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.8, ease: [0.25, 0.1, 0, 1] }}
          className="font-[family-name:var(--font-serif)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-ivory/90 leading-[1.1] tracking-tight"
        >
          The future of your
          <br />
          business, quietly
          <br />
          <motion.span
            initial={{ opacity: 0, filter: "blur(8px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 2, delay: 1.4 }}
            className="italic text-cashmere/70"
          >
            transformed
          </motion.span>
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.5, delay: 2, ease: [0.25, 0.1, 0, 1] }}
          className="mx-auto mt-12 w-16 h-px bg-taupe/40 origin-left"
        />

        <motion.a
          href="#services"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.4 }}
          whileHover={{ letterSpacing: "0.4em" }}
          className="inline-block mt-10 text-[10px] sm:text-xs tracking-[0.3em] uppercase text-stone-dark hover:text-stone-light transition-all duration-700 border-b border-stone-dark/30 hover:border-stone-light/30 pb-1"
        >
          Discover
        </motion.a>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-espresso to-transparent" />
    </section>
  );
}
