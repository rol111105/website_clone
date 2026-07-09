"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type TitlePart = { text: string; italic?: boolean };

type Project = {
  n: string;
  title: TitlePart[];
  category: string;
  description: string;
  image: string;
  href: string;
};

const PROJECTS: Project[] = [
  {
    n: "001",
    title: [
      { text: "Redefining fashion for a new " },
      { text: "generation", italic: true },
      { text: " of buyers." },
    ],
    category: "Positive Retail / Fashion",
    description:
      "A long-term collaboration with fellow B Corp and high-street disruptor, Positive Retail, to energise and scale non-traditional ecom.",
    image: "https://ext.same-assets.com/1355539792/2548860013.webp",
    href: "#work",
  },
  {
    n: "002",
    title: [
      { text: "Defining a " },
      { text: "new era", italic: true },
      { text: " of low-alc drinking." },
    ],
    category: "Clubmera / Food + Beverage",
    description:
      "A pre-seed partnership with emerging low-alc RTD brand CLUBMERA, to develop their strategic positioning and full visual identity ahead of launch.",
    image: "https://ext.same-assets.com/1355539792/1405211793.webp",
    href: "#work",
  },
  {
    n: "003",
    title: [
      { text: "Scaling waste to " },
      { text: "net-zero", italic: true },
      { text: " operations." },
    ],
    category: "Cycleo / Renewable Energy",
    description:
      "An international collaboration with Cycle0 to refine and evolve its brand identity, supporting the next phase of growth for one of Europe's few fully integrated biomethane producers.",
    image: "https://ext.same-assets.com/1355539792/1990993550.png",
    href: "#work",
  },
];

function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M4 12h15m0 0-6-6m6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokelinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TitleText({ parts }: { parts: TitlePart[] }) {
  return (
    <>
      {parts.map((p, i) => (
        <span key={i} className={p.italic ? "italic" : ""}>
          {p.text}
        </span>
      ))}
    </>
  );
}

export default function SelectedWorks() {
  const [active, setActive] = useState(0);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = Number(
              (entry.target as HTMLElement).dataset.index
            );
            setActive(idx);
          }
        }
      },
      { rootMargin: "-50% 0px -50% 0px", threshold: 0 }
    );
    for (const el of itemRefs.current) if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const current = PROJECTS[active];

  return (
    <section id="work" className="relative bg-cream">
      {/* Section header */}
      <div className="flex items-center justify-between border-t border-ink/15 px-5 py-5 md:px-10">
        <span className="label text-ink">Selected works</span>
        <a
          href="#work"
          className="label group inline-flex items-center gap-2 text-ink"
        >
          Explore all work
          <Arrow className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
        </a>
      </div>

      <div className="px-5 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-16">
          {/* Sticky text panel (desktop) */}
          <div className="relative hidden md:block">
            <div className="sticky top-0 flex h-screen items-center">
              <div className="w-full pr-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -14 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <p className="label mb-8 text-muted-foreground">
                      {current.category}
                    </p>
                    <h3 className="font-serif text-[clamp(2.4rem,3.6vw,3.7rem)] leading-[1.02] tracking-[-0.01em] text-ink">
                      <TitleText parts={current.title} />
                    </h3>
                    <p className="mt-8 max-w-[38ch] text-[1.05rem] leading-relaxed text-ink/85">
                      {current.description}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Bottom counter / link */}
            <div className="pointer-events-none absolute inset-x-0 bottom-[8vh] flex items-center justify-between pr-6">
              <AnimatePresence mode="wait">
                <motion.span
                  key={active}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className="label text-ink"
                >
                  ({current.n} / 003)
                </motion.span>
              </AnimatePresence>
              <a
                href={current.href}
                className="label group pointer-events-auto inline-flex items-center gap-2 text-ink"
              >
                Full project
                <Arrow className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>
          </div>

          {/* Image rail */}
          <div className="flex flex-col gap-[8vh] py-[6vh] md:gap-[6vh] md:py-0">
            {PROJECTS.map((p, i) => (
              <div
                key={p.n}
                data-index={i}
                ref={(el) => {
                  itemRefs.current[i] = el;
                }}
                className="flex min-h-[70vh] items-center justify-center md:min-h-screen"
              >
                <a href={p.href} className="group block w-full">
                  <div className="overflow-hidden">
                    <img
                      src={p.image}
                      alt={p.category}
                      className="max-h-[64vh] w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.03] md:max-h-[82vh]"
                    />
                  </div>
                  {/* Mobile caption */}
                  <div className="mt-4 md:hidden">
                    <p className="label mb-3 text-muted-foreground">
                      {p.category}
                    </p>
                    <h3 className="font-serif text-3xl leading-[1.05] text-ink">
                      <TitleText parts={p.title} />
                    </h3>
                    <p className="mt-3 max-w-[42ch] text-[0.95rem] leading-relaxed text-ink/85">
                      {p.description}
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="label text-ink">
                        ({p.n} / 003)
                      </span>
                      <span className="label inline-flex items-center gap-2 text-ink">
                        Full project
                        <Arrow className="h-3 w-3" />
                      </span>
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
