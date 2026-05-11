"use client";

import { useEffect, useRef, useState } from "react";
import MaterialModal from "@/components/MaterialModal";

// ─── Materials List ───────────────────────────────────────────────────────────

const materials = [
  {
    emoji: "🔧",
    title: "Ferrous Metals",
    description: "Steel, Iron, Cast Iron, Stainless, and Cans",
  },
  {
    emoji: "🟡",
    title: "Non-Ferrous Metals",
    description: "Copper, Brass, Bronze, Aluminum, Tin, and Zinc",
  },
  {
    emoji: "🚗",
    title: "Vehicles & Parts",
    description: "Engine, Transmission, Radiator, Alternator, Battery, etc.",
  },
  {
    emoji: "⚙️",
    title: "Machinery & Equipment",
    description: "Industrial machines, generators, pumps, compressors, motors, and heavy equipment parts.",
  },
  {
    emoji: "📺",
    title: "Home & Office Appliances",
    description: "TV, Refrigerator, Aircon, Computer, etc.",
  },
  {
    emoji: "♻️",
    title: "Plastics & Cartons",
    description: "PET bottles, HDPE containers, cardboard boxes, corrugated cartons, and industrial plastic scraps.",
  },
];

// ─── useInView ────────────────────────────────────────────────────────────────

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

// ─── MaterialCard ─────────────────────────────────────────────────────────────

function MaterialCard({
  emoji,
  title,
  description,
  index,
  onClick,
}: {
  emoji: string;
  title: string;
  description: string;
  index: number;
  onClick: () => void;
}) {
  const { ref, inView } = useInView(0.1);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="rounded-2xl p-6 flex flex-col gap-4 cursor-pointer select-none"
      style={{
        backgroundColor: hovered ? "#2E4F21" : "#ffffff",
        border: hovered
          ? "1.5px solid rgba(160,241,189,0.4)"
          : "1.5px solid rgba(46,79,33,0.12)",
        opacity: inView ? 1 : 0,
        transform: inView
          ? hovered
            ? "translateY(-6px) scale(1.02)"
            : "translateY(0) scale(1)"
          : "translateY(36px) scale(0.97)",
        transition: `opacity 0.6s ease ${index * 80}ms, transform 0.3s ease, background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease`,
        boxShadow: hovered
          ? "0 16px 40px rgba(46,79,33,0.25)"
          : "0 4px 20px rgba(46,79,33,0.08)",
      }}
    >
      {/* Emoji Icon */}
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
        style={{
          backgroundColor: hovered
            ? "rgba(160,241,189,0.12)"
            : "rgba(46,79,33,0.06)",
          boxShadow: hovered
            ? "0 4px 16px rgba(160,241,189,0.15)"
            : "0 2px 8px rgba(46,79,33,0.10)",
          transition: "all 0.3s ease",
          fontSize: "1.8rem",
          lineHeight: 1,
        }}
      >
        {emoji}
      </div>

      {/* Text */}
      <div className="flex flex-col gap-2 flex-1">
        <h3
          style={{
            color: hovered ? "#A0F1BD" : "#2E4F21",
            fontFamily: "'Work Sans', sans-serif",
            fontSize: "1.05rem",
            fontWeight: "700",
            letterSpacing: "-0.01em",
            transition: "color 0.3s ease",
          }}
        >
          {title}
        </h3>
        <p
          style={{
            color: hovered ? "rgba(247,254,249,0.65)" : "#5a5a5a",
            fontFamily: "'Work Sans', sans-serif",
            fontSize: "0.9rem",
            fontWeight: "400",
            lineHeight: "1.7",
            transition: "color 0.3s ease",
          }}
        >
          {description}
        </p>
      </div>

      {/* Arrow CTA */}
      <div
        className="flex items-center mt-1"
        style={{
          color: hovered ? "#A0F1BD" : "rgba(46,79,33,0.4)",
          fontFamily: "'Work Sans', sans-serif",
          fontSize: "0.8rem",
          fontWeight: "600",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          gap: hovered ? "8px" : "4px",
          transition: "color 0.3s ease, gap 0.3s ease",
        }}
      >
        Learn more
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path
            d="M2 7h10M8 3l4 4-4 4"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}

// ─── SellSection ──────────────────────────────────────────────────────────────

export default function SellSection() {
  const { ref: headingRef, inView: headingVisible } = useInView(0.3);
  const [activeModal, setActiveModal] = useState<string | null>(null);

  return (
    <>
      <section
        className="w-full py-24 px-6 md:px-12"
        style={{ backgroundColor: "#A0F1BD" }}
      >
        <div
          className="mx-auto flex flex-col gap-14"
          style={{ maxWidth: "1280px" }}
        >
          {/* Heading */}
          <div
            ref={headingRef}
            className="flex flex-col items-center gap-3 text-center"
            style={{
              opacity: headingVisible ? 1 : 0,
              transform: headingVisible ? "translateY(0)" : "translateY(32px)",
              transition: "opacity 0.7s ease, transform 0.7s ease",
            }}
          >
            <h2
              style={{
                color: "#2E4F21",
                fontFamily: "'Work Sans', sans-serif",
                fontSize: "clamp(2rem, 5vw, 3.2rem)",
                fontWeight: "700",
                letterSpacing: "-0.02em",
              }}
            >
              Sell To Us
            </h2>
            <div
              className="rounded-full"
              style={{
                width: "60px",
                height: "4px",
                backgroundColor: "#2E4F21",
              }}
            />
            <p
              style={{
                color: "rgba(46,79,33,0.7)",
                fontFamily: "'Work Sans', sans-serif",
                fontSize: "clamp(0.95rem, 1.8vw, 1.1rem)",
                fontWeight: "400",
                maxWidth: "520px",
                lineHeight: "1.7",
              }}
            >
              We accept a wide range of recyclable materials. Get the best value
              for your scrap.
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {materials.map((material, i) => (
              <MaterialCard
                key={material.title}
                {...material}
                index={i}
                onClick={() => setActiveModal(material.title)}
              />
            ))}
          </div>

          {/* CTA */}
          <div className="flex justify-center">
            <a href="/#contact-form">
              <button
                className="px-10 py-3 rounded-full font-semibold transition-all duration-200 hover:opacity-90 hover:scale-105 active:scale-95"
                style={{
                  backgroundColor: "#2E4F21",
                  color: "#F5F5F0",
                  fontFamily: "'Work Sans', sans-serif",
                  fontSize: "16px",
                }}
              >
                Sell Your Scrap Now
              </button>
            </a>
          </div>
        </div>
      </section>

      {/* Modal */}
      <MaterialModal
        materialKey={activeModal}
        onClose={() => setActiveModal(null)}
      />
    </>
  );
}
