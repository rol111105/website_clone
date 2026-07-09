"use client";

import { motion } from "framer-motion";

const lineVariant = {
  hidden: { y: "110%" },
  show: (i: number) => ({
    y: "0%",
    transition: {
      duration: 1,
      delay: 0.25 + i * 0.12,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
};

function Line({ i, children }: { i: number; children: React.ReactNode }) {
  return (
    <span className="block overflow-hidden pb-[0.06em]">
      <motion.span
        custom={i}
        variants={lineVariant}
        initial="hidden"
        animate="show"
        className="block"
      >
        {children}
      </motion.span>
    </span>
  );
}

export default function Hero() {
  return (
    <section id="top" className="relative h-[100svh] w-full overflow-hidden bg-ink">
      {/* Background video */}
      <video
        className="absolute inset-0 h-full w-full object-cover grayscale"
        autoPlay
        muted
        loop
        playsInline
        poster="https://ext.same-assets.com/1355539792/2548860013.webp"
      >
        <source
          src="https://ext.same-assets.com/1355539792/963169979.mp4"
          type="video/mp4"
        />
      </video>
      {/* Overlays for legibility */}
      <div className="absolute inset-0 bg-ink/25" />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-transparent to-ink/30" />

      {/* Headline */}
      <div className="absolute inset-x-0 bottom-[10%] px-5 md:px-10">
        <h1 className="font-serif text-cream text-[13.5vw] leading-[0.94] tracking-[-0.01em] md:text-[8.2vw]">
          <Line i={0}>The London</Line>
          <Line i={1}>
            <em className="italic">branding</em> agency
          </Line>
          <Line i={2}>
            for bold <em className="italic">brands.</em>
          </Line>
        </h1>
      </div>

      {/* B Corp badge */}
      <motion.img
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        src="https://ext.same-assets.com/1355539792/2246719519.svg"
        alt="Certified B Corporation"
        className="absolute right-5 top-1/2 hidden w-[64px] -translate-y-1/2 invert md:block md:right-10"
      />
    </section>
  );
}
