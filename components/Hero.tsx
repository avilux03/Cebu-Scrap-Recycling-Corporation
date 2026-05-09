"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function HeroSection() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
   
<section
  className="relative h-screen overflow-hidden"
  style={{ width: "100vw", marginLeft: "calc(50% - 50vw)" }}
>
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/hero.png')" }}
      />

      {/* Dark green overlay */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: "rgba(26, 46, 19, 0.58)" }}
      />

      {/* Subtle mint accent bar on the left */}
      <div
        className="absolute left-0 top-0 h-full w-1"
        style={{ backgroundColor: "#A0F1BD" }}
      />

      {/* Content */}
      <div
        className="relative z-10 h-full flex flex-col justify-center px-12 md:px-24 w-full"
        style={{ maxWidth: "1280px", margin: "0 auto" }}
      >
        {/* Label */}
        <div
          className="mb-6 transition-all duration-700 ease-out"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transitionDelay: "0ms",
          }}
        >
          <span
            className="text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full border"
            style={{
              color: "#A0F1BD",
              borderColor: "#A0F1BD",
              fontFamily: "'Work Sans', sans-serif",
              letterSpacing: "0.15em",
            }}
          >
            Cebu, Philippines
          </span>
        </div>

        {/* Main Title */}
        <h1
          className="mb-6 leading-tight transition-all duration-700 ease-out"
          style={{
            color: "#F5F5F0",
            fontFamily: "'Work Sans', sans-serif",
            fontSize: "clamp(2.2rem, 5vw, 4rem)",
            fontWeight: "700",
            maxWidth: "700px",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transitionDelay: "120ms",
          }}
        >
          Cebu Scrap Recycling{" "}
          <span style={{ color: "#A0F1BD" }}>Corporation</span>
        </h1>

        {/* Tagline */}
        <p
          className="mb-10 leading-relaxed transition-all duration-700 ease-out"
          style={{
            color: "#C8E6C0",
            fontFamily: "'Work Sans', sans-serif",
            fontSize: "clamp(1rem, 2vw, 1.2rem)",
            fontWeight: "400",
            maxWidth: "520px",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transitionDelay: "240ms",
          }}
        >
          We buy and sell recyclable scrap metals, bottles, plastics and
          cartons.
        </p>

        {/* Buttons */}
        <div
          className="flex flex-wrap gap-4 transition-all duration-700 ease-out"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transitionDelay: "360ms",
          }}
        >
          {/* Primary — Sell to Us */}
          <Link href="/services">
            <button
              className="px-8 py-3 rounded-full font-medium transition-all duration-200 hover:opacity-90 hover:scale-105 active:scale-95"
              style={{
                backgroundColor: "#A0F1BD",
                color: "#2E4F21",
                fontFamily: "'Work Sans', sans-serif",
                fontSize: "16px",
                fontWeight: "600",
              }}
            >
              Sell to Us
            </button>
          </Link>

          {/* Secondary — Buy from Us */}
          <Link href="/contact">
            <button
              className="px-8 py-3 rounded-full font-medium transition-all duration-200 hover:bg-white hover:text-green-900 active:scale-95"
              style={{
                backgroundColor: "transparent",
                color: "#F5F5F0",
                fontFamily: "'Work Sans', sans-serif",
                fontSize: "16px",
                fontWeight: "500",
                border: "2px solid #F5F5F0",
              }}
            >
              Buy from Us
            </button>
          </Link>
        </div>
      </div>

      {/* Bottom fade into page */}
      <div
        className="absolute bottom-0 left-0 w-full h-24 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, transparent, rgba(26,46,19,0.18))",
        }}
      />
    </section>
  );
}