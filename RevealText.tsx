"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";

export type Segment =
  | { text: string; italic?: boolean }
  | { icon: string; alt?: string };

type Token =
  | { kind: "word"; value: string; italic?: boolean }
  | { kind: "icon"; src: string; alt?: string };

function tokenize(segments: Segment[]): Token[] {
  const tokens: Token[] = [];
  for (const seg of segments) {
    if ("icon" in seg) {
      tokens.push({ kind: "icon", src: seg.icon, alt: seg.alt });
    } else {
      for (const w of seg.text.split(/\s+/).filter(Boolean)) {
        tokens.push({ kind: "word", value: w, italic: seg.italic });
      }
    }
  }
  return tokens;
}

function Word({
  progress,
  start,
  end,
  italic,
  children,
}: {
  progress: MotionValue<number>;
  start: number;
  end: number;
  italic?: boolean;
  children: React.ReactNode;
}) {
  const opacity = useTransform(progress, [start, end], [0.16, 1]);
  return (
    <motion.span
      style={{ opacity }}
      className={`${italic ? "italic" : ""} mr-[0.25em] inline-block`}
    >
      {children}
    </motion.span>
  );
}

function Icon({
  progress,
  start,
  end,
  src,
  alt,
}: {
  progress: MotionValue<number>;
  start: number;
  end: number;
  src: string;
  alt?: string;
}) {
  const opacity = useTransform(progress, [start, end], [0.16, 1]);
  return (
    <motion.span
      style={{ opacity }}
      className="mr-[0.25em] inline-block align-middle"
    >
      <img
        src={src}
        alt={alt ?? ""}
        className="inline-block h-[0.62em] w-auto translate-y-[-0.05em]"
      />
    </motion.span>
  );
}

export default function RevealText({
  segments,
  className = "",
}: {
  segments: Segment[];
  className?: string;
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.55"],
  });

  const tokens = tokenize(segments);
  const total = tokens.length;

  return (
    <h2
      ref={ref}
      className={`font-serif text-ink ${className}`}
    >
      {tokens.map((t, i) => {
        const start = i / total;
        const end = (i + 1) / total;
        if (t.kind === "icon") {
          return (
            <Icon
              key={i}
              progress={scrollYProgress}
              start={start}
              end={end}
              src={t.src}
              alt={t.alt}
            />
          );
        }
        return (
          <Word
            key={i}
            progress={scrollYProgress}
            start={start}
            end={end}
            italic={t.italic}
          >
            {t.value}
          </Word>
        );
      })}
    </h2>
  );
}
