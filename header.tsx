"use client";

import { useEffect, useState } from "react";

const NAV = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "News", href: "#news" },
];

export default function Header() {
  const [dark, setDark] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // switch to ink text once we've scrolled past most of the hero
      setDark(window.scrollY > window.innerHeight - 90);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  const color = dark && !open ? "text-ink" : "text-cream";

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${color}`}
      >
        <div className="flex items-center justify-between px-5 py-6 md:px-10 md:py-7">
          {/* Wordmark */}
          <a
            href="#top"
            className="relative z-50 text-[22px] font-bold leading-none tracking-[-0.02em] md:text-[26px]"
          >
            Geist<span className="text-green">*</span>Studio
          </a>

          {/* Center nav */}
          <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-6 text-[17px] leading-none md:flex">
            {NAV.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="opacity-90 transition-opacity hover:opacity-60"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right CTA */}
          <a
            href="#contact"
            className="hidden text-[17px] leading-none transition-opacity hover:opacity-60 md:block"
          >
            Let&apos;s chat
          </a>

          {/* Mobile toggle */}
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="relative z-50 flex h-6 w-7 flex-col justify-center gap-[6px] md:hidden"
          >
            <span
              className={`h-[1.5px] w-full bg-current transition-transform duration-300 ${
                open ? "translate-y-[7.5px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-[1.5px] w-full bg-current transition-transform duration-300 ${
                open ? "-translate-y-[7.5px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-40 bg-ink text-cream transition-[opacity,visibility] duration-500 md:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <nav className="flex h-full flex-col justify-center gap-2 px-6">
          {[...NAV, { label: "Let's chat", href: "#contact" }].map(
            (item, i) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="font-serif text-6xl leading-tight tracking-tight transition-colors hover:text-green"
                style={{
                  transitionDelay: open ? `${120 + i * 60}ms` : "0ms",
                  transform: open ? "translateY(0)" : "translateY(20px)",
                  opacity: open ? 1 : 0,
                  transitionProperty: "transform, opacity, color",
                  transitionDuration: "600ms",
                }}
              >
                {item.label}
              </a>
            )
          )}
        </nav>
      </div>
    </>
  );
}
