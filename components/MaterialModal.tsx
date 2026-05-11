"use client";

import { useEffect } from "react";
import Link from "next/link";

export type ModalItem = {
  label: string;
  image: string;
  definition: string;
};

export type ModalContent = {
  title: string;
  emoji: string;
  definition: string;
  items: ModalItem[];
};

export const modalData: Record<string, ModalContent> = {
  "Ferrous Metals": {
    title: "Ferrous Metals",
    emoji: "🔧",
    definition:
      "We buy all kinds of ferrous metals — from old steel beams and iron pipes to cast iron cookware, stainless steel scraps, and used tin cans. Ferrous metals are iron-based, magnetic, and among the most recycled materials in the world. Turn your rust and metal junk into cash with us.",
    items: [
      {
        label: "Steel",
        image: "/steel.png",
        definition:
          "The most recycled metal globally — we buy steel bars, sheets, pipes, and structural scraps.",
      },
      {
        label: "Iron",
        image: "/iron.png",
        definition:
          "We accept wrought iron and iron scraps from gates, fences, and old hardware.",
      },
      {
        label: "Cast Iron",
        image: "/cast iron.png",
        definition:
          "Heavy and dense — we buy cast iron pans, pipes, engine blocks, and machine parts.",
      },
      {
        label: "Stainless",
        image: "/stainless.png",
        definition:
          "We purchase stainless steel from kitchen equipment, sinks, railings, and industrial parts.",
      },
      {
        label: "Cans",
        image: "/cans.png",
        definition:
          "We buy used tin and steel cans in bulk — from food cans to industrial containers.",
      },
    ],
  },
  "Non-Ferrous Metals": {
    title: "Non-Ferrous Metals",
    emoji: "🟡",
    definition:
      "We purchase all non-ferrous metals including copper wiring, brass fittings, bronze parts, aluminum scraps, tin, and zinc. These metals are free of iron, making them rust-resistant and highly valuable in the recycling market. Bring them in and get top peso for every kilo.",
    items: [
      {
        label: "Copper",
        image: "/copper.png",
        definition:
          "High-value scrap — we buy copper wiring, pipes, coils, and fittings.",
      },
      {
        label: "Brass",
        image: "/brass.png",
        definition:
          "We accept brass faucets, valves, fittings, and decorative hardware.",
      },
      {
        label: "Bronze",
        image: "/bronze.png",
        definition:
          "We buy bronze bushings, bearings, bells, and industrial castings.",
      },
      {
        label: "Aluminum",
        image: "/alu.png",
        definition:
          "We purchase aluminum cans, sheets, frames, and extrusions.",
      },
      {
        label: "Tin",
        image: "/tin cans alu.png",
        definition:
          "We buy tin-plated scraps, containers, and industrial tin materials.",
      },
      {
        label: "Zinc",
        image: "/zink.png",
        definition:
          "We accept zinc die-cast parts, galvanized scraps, and zinc alloys.",
      },
    ],
  },
  "Vehicles & Parts": {
    title: "Vehicles & Parts",
    emoji: "🚗",
    definition:
      "We buy old, damaged, or non-running vehicles and their parts — engines, transmissions, radiators, alternators, and batteries. Whether it's a whole unit or individual components, we assess and pay for it all. Don't let your old vehicle sit and rust — sell it to us.",
    items: [
      {
        label: "Engines",
        image: "/engines 1.png",
        definition:
          "We buy whole engines or engine blocks from cars, trucks, and heavy equipment.",
      },
      {
        label: "More Engines",
        image: "/engines.png",
        definition:
          "All sorts of engine types accepted — gasoline, diesel, and industrial motors.",
      },
      {
        label: "Batteries",
        image: "/batteries.png",
        definition:
          "We accept used lead-acid car batteries and industrial batteries.",
      },
      {
        label: "Radiators",
        image: "/radiators.png",
        definition:
          "We buy copper and aluminum radiators from all vehicle types.",
      },
    ],
  },
  "Machinery & Equipment": {
    title: "Machinery & Equipment",
    emoji: "⚙️",
    definition:
      "We accept and purchase all types of industrial machinery and heavy equipment — generators, pumps, compressors, motors, and more. Decommissioned or broken, we'll buy it regardless of condition. No machine is too big or too worn down for us.",
    items: [
      {
        label: "Machines",
        image: "/machines.png",
        definition:
          "We buy all types of industrial machines — operational or decommissioned, big or small.",
      },
    ],
  },
  "Home & Office Appliances": {
    title: "Home & Office Appliances",
    emoji: "📺",
    definition:
      "We buy used, broken, or outdated home and office appliances — TVs, refrigerators, aircons, computers, and more. Instead of throwing them out, sell them to us for responsible recycling and fair payment. We make it easy to clear out your space and earn from it.",
    items: [
      {
        label: "TV & Aircon",
        image: "/tv and aircon.png",
        definition:
          "We buy old or broken TVs and air conditioning units of any brand or size.",
      },
      {
        label: "Refrigerators",
        image: "/refs.png",
        definition:
          "We accept all sizes of used or non-working refrigerators and freezers.",
      },
      {
        label: "Computers",
        image: "/computers.png",
        definition:
          "We buy desktops, laptops, monitors, and computer peripherals for recycling.",
      },
    ],
  },
  "Plastics & Cartons": {
    title: "Plastics & Cartons",
    emoji: "♻️",
    definition:
      "We buy recyclable plastics and cartons — PET bottles, HDPE containers, cardboard boxes, corrugated cartons, and industrial plastic scraps. Whether from your home, office, or warehouse, we take them in bulk or small loads. Help the environment and earn from your waste at the same time.",
    items: [
      {
        label: "Plastic",
        image: "/plastic.png",
        definition:
          "We buy PET bottles, HDPE containers, and all types of industrial plastic scraps.",
      },
      {
        label: "Cartons",
        image: "/cartons.png",
        definition:
          "We accept corrugated cardboard boxes and cartons in bulk from homes and businesses.",
      },
    ],
  },
};

type Props = {
  materialKey: string | null;
  onClose: () => void;
};

export default function MaterialModal({ materialKey, onClose }: Props) {
  const content = materialKey ? modalData[materialKey] : null;

  // Lock body scroll when modal is open
  useEffect(() => {
    if (content) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [content]);

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  if (!content) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-end md:items-center justify-center"
        style={{ backgroundColor: "rgba(10, 25, 10, 0.72)", backdropFilter: "blur(4px)" }}
      >
        {/* Modal Panel — stop propagation so clicking inside doesn't close */}
        <div
          onClick={(e) => e.stopPropagation()}
          className="relative w-full md:w-auto md:max-w-2xl flex flex-col rounded-t-3xl md:rounded-3xl overflow-hidden"
          style={{
            backgroundColor: "#F7FFF9",
            maxHeight: "92dvh",
            boxShadow: "0 32px 80px rgba(0,0,0,0.35)",
          }}
        >
          {/* ── Header ── */}
          <div
            className="flex items-center justify-between px-6 py-5 shrink-0"
            style={{ backgroundColor: "#2E4F21" }}
          >
            <div className="flex items-center gap-3">
              <span style={{ fontSize: "1.8rem", lineHeight: 1 }}>{content.emoji}</span>
              <h2
                style={{
                  color: "#A0F1BD",
                  fontFamily: "'Work Sans', sans-serif",
                  fontSize: "clamp(1.1rem, 4vw, 1.4rem)",
                  fontWeight: "700",
                  letterSpacing: "-0.01em",
                }}
              >
                {content.title}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="flex items-center justify-center w-9 h-9 rounded-full transition-all duration-200 hover:scale-110 active:scale-95"
              style={{ backgroundColor: "rgba(160,241,189,0.15)", color: "#A0F1BD" }}
              aria-label="Close modal"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M2 2l12 12M14 2L2 14"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          {/* ── Scrollable Body ── */}
          <div className="overflow-y-auto flex flex-col gap-6 px-6 py-6" style={{ overscrollBehavior: "contain" }}>

            {/* Definition */}
            <p
              style={{
                color: "#3a3a3a",
                fontFamily: "'Work Sans', sans-serif",
                fontSize: "0.95rem",
                lineHeight: "1.75",
                fontWeight: "400",
              }}
            >
              {content.definition}
            </p>

            {/* Divider */}
            <div style={{ height: "1px", backgroundColor: "rgba(46,79,33,0.12)" }} />

            {/* Items Grid */}
            <div
              className="grid gap-4"
              style={{
                gridTemplateColumns: content.items.length === 1
                  ? "1fr"
                  : "repeat(auto-fill, minmax(140px, 1fr))",
              }}
            >
              {content.items.map((item) => (
                <div
                  key={item.label}
                  className="flex flex-col rounded-2xl overflow-hidden"
                  style={{
                    border: "1.5px solid rgba(46,79,33,0.10)",
                    backgroundColor: "#fff",
                    boxShadow: "0 2px 12px rgba(46,79,33,0.07)",
                  }}
                >
                  {/* Image */}
                  <div
                    className="w-full"
                    style={{
                      height: "120px",
                      backgroundColor: "rgba(160,241,189,0.15)",
                      overflow: "hidden",
                      position: "relative",
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.label}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                      onError={(e) => {
                        // Fallback if image not found
                        (e.currentTarget as HTMLImageElement).style.display = "none";
                      }}
                    />
                  </div>

                  {/* Label + Definition */}
                  <div className="flex flex-col gap-1.5 p-3">
                    <span
                      style={{
                        color: "#2E4F21",
                        fontFamily: "'Work Sans', sans-serif",
                        fontSize: "0.88rem",
                        fontWeight: "700",
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {item.label}
                    </span>
                    <p
                      style={{
                        color: "#5a5a5a",
                        fontFamily: "'Work Sans', sans-serif",
                        fontSize: "0.78rem",
                        lineHeight: "1.6",
                        fontWeight: "400",
                      }}
                    >
                      {item.definition}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Sell Yours Button ── */}
          <div
            className="px-6 py-5 shrink-0"
            style={{
              borderTop: "1px solid rgba(46,79,33,0.10)",
              backgroundColor: "#F7FFF9",
            }}
          >
            <Link href="/#contact-form" onClick={onClose} className="block">
              <button
                className="w-full py-3.5 rounded-full font-semibold flex items-center justify-center gap-2 transition-all duration-200 hover:opacity-90 hover:scale-[1.02] active:scale-95"
                style={{
                  backgroundColor: "#2E4F21",
                  color: "#A0F1BD",
                  fontFamily: "'Work Sans', sans-serif",
                  fontSize: "16px",
                  letterSpacing: "0.02em",
                }}
              >
                Sell Yours to Us
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M2 8h12M9 4l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
