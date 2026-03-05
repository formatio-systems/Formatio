"use client";

import { motion, AnimatePresence, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";
import { useState, useEffect, useCallback, useRef } from "react";

const services = [
  { word: "Strategy", detail: "Intelligence, mapped to your vision" },
  { word: "Integration", detail: "Seamlessly woven into your systems" },
  { word: "Transformation", detail: "Quietly, completely redefined" },
];

const CYCLE_MS = 5000;

export default function Services() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [cycleKey, setCycleKey] = useState(0);

  // Mouse-follow reveal light
  const revealRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(-400);
  const mouseY = useMotionValue(-400);
  const smoothX = useSpring(mouseX, { damping: 20, stiffness: 250 });
  const smoothY = useSpring(mouseY, { damping: 20, stiffness: 250 });
  const [isRevealing, setIsRevealing] = useState(false);

  const handleRevealMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!revealRef.current) return;
      const rect = revealRef.current.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    },
    [mouseX, mouseY]
  );

  const revealMask = useMotionTemplate`radial-gradient(400px circle at ${smoothX}px ${smoothY}px, black 0%, rgba(0,0,0,0.25) 45%, transparent 75%)`;

  const advance = useCallback(() => {
    setActive((prev) => (prev + 1) % services.length);
    setCycleKey((k) => k + 1);
  }, []);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(advance, CYCLE_MS);
    return () => clearInterval(timer);
  }, [paused, advance]);

  const goTo = (i: number) => {
    setActive(i);
    setCycleKey((k) => k + 1);
    setPaused(true);
  };

  return (
    <section
      id="services"
      className="relative w-full py-40 md:py-52 px-8 overflow-hidden"
    >
      {/* Ambient background glow */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-stone/[0.02] blur-[150px]"
        animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 w-full max-w-3xl mx-auto text-center">
        {/* Label */}
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
          className="block text-[10px] sm:text-xs tracking-[0.4em] uppercase text-taupe/50 mb-20 md:mb-24"
        >
          What we do
        </motion.span>

        {/* Cycling word */}
        <div
          className="relative h-[180px] sm:h-[200px] md:h-[240px] flex flex-col items-center justify-center"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Counter */}
          <AnimatePresence mode="wait">
            <motion.span
              key={`num-${active}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="absolute top-0 text-[10px] tracking-[0.3em] text-taupe/30"
            >
              {String(active + 1).padStart(2, "0")} / {String(services.length).padStart(2, "0")}
            </motion.span>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
              transition={{ duration: 1, ease: [0.25, 0.1, 0, 1] }}
              className="absolute inset-0 flex flex-col items-center justify-center"
            >
              <h3 className="font-[family-name:var(--font-serif)] text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-ivory/80 tracking-tight italic">
                {services[active].word}
              </h3>

              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{
                  duration: 0.8,
                  delay: 0.4,
                  ease: [0.25, 0.1, 0, 1],
                }}
                className="mt-6 w-10 h-px bg-cashmere/30 origin-center"
              />

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="mt-5 text-xs sm:text-sm tracking-[0.15em] text-taupe/50"
              >
                {services[active].detail}
              </motion.p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progress indicators */}
        <div className="mt-16 flex items-center justify-center gap-3">
          {services.map((s, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="group relative cursor-pointer py-3 px-1"
              aria-label={s.word}
            >
              {/* Track */}
              <div className="w-16 sm:w-20 h-px bg-stone/10 relative overflow-hidden">
                {/* Fill bar — animates on active */}
                {active === i && !paused && (
                  <motion.div
                    key={`bar-${cycleKey}-${i}`}
                    className="absolute inset-y-0 left-0 bg-cashmere/50"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{
                      duration: CYCLE_MS / 1000,
                      ease: "linear",
                    }}
                  />
                )}
                {active === i && paused && (
                  <div className="absolute inset-y-0 left-0 w-full bg-cashmere/40" />
                )}
              </div>

              {/* Label beneath */}
              <motion.span
                className="block mt-3 text-[9px] tracking-[0.2em] uppercase"
                animate={{
                  color:
                    active === i
                      ? "rgba(199,191,180,0.55)"
                      : "rgba(168,159,147,0.2)",
                }}
                transition={{ duration: 0.5 }}
              >
                {s.word}
              </motion.span>
            </button>
          ))}
        </div>

        {/* Stats blurb — cursor-reveal light */}
        <div
          ref={revealRef}
          onMouseMove={handleRevealMove}
          onMouseEnter={() => setIsRevealing(true)}
          onMouseLeave={() => setIsRevealing(false)}
          className="relative mt-28 md:mt-36 border-t border-stone/5 pt-12"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.5 }}
            className="relative"
          >
            {/* Ambient cursor glow on surface */}
            <motion.div
              className="pointer-events-none absolute w-[700px] h-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                left: smoothX,
                top: smoothY,
                background:
                  "radial-gradient(circle, rgba(181,169,154,0.07) 0%, rgba(138,126,114,0.015) 40%, transparent 65%)",
              }}
              animate={{ opacity: isRevealing ? 1 : 0 }}
              transition={{ duration: 0.6 }}
            />

            {/* Dim base layer — ghostly hint */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-6 max-w-2xl mx-auto">
              <div>
                <span className="block font-[family-name:var(--font-serif)] text-2xl sm:text-3xl text-ivory/10 tracking-tight">
                  78%
                </span>
                <span className="block mt-2 text-[10px] tracking-[0.12em] text-taupe/5 leading-relaxed">
                  of organizations now integrate AI into at least one core function
                </span>
              </div>
              <div>
                <span className="block font-[family-name:var(--font-serif)] text-2xl sm:text-3xl text-ivory/10 tracking-tight">
                  3.7x
                </span>
                <span className="block mt-2 text-[10px] tracking-[0.12em] text-taupe/5 leading-relaxed">
                  average ROI from AI&#8209;powered integration across enterprises
                </span>
              </div>
              <div>
                <span className="block font-[family-name:var(--font-serif)] text-2xl sm:text-3xl text-ivory/10 tracking-tight">
                  72%
                </span>
                <span className="block mt-2 text-[10px] tracking-[0.12em] text-taupe/5 leading-relaxed">
                  of leaders report positive returns on AI investments within 24 months
                </span>
              </div>
            </div>
            <p className="mt-10 text-[9px] tracking-[0.1em] text-taupe/5">
              Sources: Deloitte State of AI 2026, McKinsey, IDC
            </p>

            {/* Bright reveal layer — masked to cursor */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{
                maskImage: revealMask,
                WebkitMaskImage: revealMask,
              }}
              animate={{ opacity: isRevealing ? 1 : 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-6 max-w-2xl mx-auto">
                <div>
                  <span className="block font-[family-name:var(--font-serif)] text-2xl sm:text-3xl text-ivory/90 tracking-tight">
                    78%
                  </span>
                  <span className="block mt-2 text-[10px] tracking-[0.12em] text-cashmere/60 leading-relaxed">
                    of organizations now integrate AI into at least one core function
                  </span>
                </div>
                <div>
                  <span className="block font-[family-name:var(--font-serif)] text-2xl sm:text-3xl text-ivory/90 tracking-tight">
                    3.7x
                  </span>
                  <span className="block mt-2 text-[10px] tracking-[0.12em] text-cashmere/60 leading-relaxed">
                    average ROI from AI&#8209;powered integration across enterprises
                  </span>
                </div>
                <div>
                  <span className="block font-[family-name:var(--font-serif)] text-2xl sm:text-3xl text-ivory/90 tracking-tight">
                    72%
                  </span>
                  <span className="block mt-2 text-[10px] tracking-[0.12em] text-cashmere/60 leading-relaxed">
                    of leaders report positive returns on AI investments within 24 months
                  </span>
                </div>
              </div>
              <p className="mt-10 text-[9px] tracking-[0.1em] text-cashmere/40">
                Sources: Deloitte State of AI 2026, McKinsey, IDC
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
