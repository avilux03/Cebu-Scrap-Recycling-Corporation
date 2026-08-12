"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { buyCatalog } from "@/lib/buyCatalog";

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

// ─── ProductCard ──────────────────────────────────────────────────────────────

function ProductCard({
  categorySlug,
  itemSlug,
  name,
  image,
  tag,
  index,
}: {
  categorySlug: string;
  itemSlug: string;
  name: string;
  image: string;
  tag: string;
  index: number;
}) {
  const { ref, inView } = useInView(0.05);
  const [hovered, setHovered] = useState(false);

  return (
    <Link href={`/buy/${categorySlug}?item=${itemSlug}`} className="block">
      <div
        ref={ref}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="flex flex-col rounded-2xl overflow-hidden cursor-pointer"
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? (hovered ? "translateY(-6px)" : "translateY(0)") : "translateY(32px)",
          transition: `opacity 0.6s ease ${index * 80}ms, transform 0.3s ease, box-shadow 0.3s ease`,
          boxShadow: hovered ? "0 20px 48px rgba(46,79,33,0.22)" : "0 4px 20px rgba(46,79,33,0.10)",
          border: "1.5px solid rgba(46,79,33,0.10)",
          backgroundColor: "#fff",
        }}
      >
        <div className="relative w-full overflow-hidden" style={{ aspectRatio: "4/3" }}>
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover transition-transform duration-500"
            style={{ transform: hovered ? "scale(1.07)" : "scale(1)" }}
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <div
            className="absolute inset-0 transition-opacity duration-300"
            style={{ background: "linear-gradient(to top, rgba(26,46,19,0.55) 0%, transparent 55%)", opacity: hovered ? 1 : 0.5 }}
          />
        </div>
        <div className="flex flex-col gap-2 p-5">
          <h4 style={{ color: "#2E4F21", fontFamily: "'Work Sans', sans-serif", fontSize: "1rem", fontWeight: 700, letterSpacing: "-0.01em" }}>
            {name}
          </h4>
          <p style={{ color: "#5a5a5a", fontFamily: "'Work Sans', sans-serif", fontSize: "0.82rem", fontWeight: 400, lineHeight: "1.6" }}>
            {tag}
          </p>
          <div
            className="flex items-center gap-1 mt-1"
            style={{
              color: hovered ? "#2E4F21" : "rgba(46,79,33,0.35)",
              fontFamily: "'Work Sans', sans-serif",
              fontSize: "0.75rem",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              transition: "color 0.3s ease",
            }}
          >
            View details
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
              <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}

// ─── BuySection ───────────────────────────────────────────────────────────────

export default function BuySection() {
  const [activeTab, setActiveTab] = useState(0);
  const { ref: headingRef, inView: headingVisible } = useInView(0.1);
  const { ref: tabRef, inView: tabVisible } = useInView(0.1);

  const activeCategory = buyCatalog[activeTab];

  return (
    <section className="w-full py-24 px-6 md:px-12" style={{ backgroundColor: "#F7FEF9" }}>
      <div className="mx-auto flex flex-col gap-12" style={{ maxWidth: "1280px" }}>

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
          <h2 style={{ color: "#2E4F21", fontFamily: "'Work Sans', sans-serif", fontSize: "clamp(2rem, 5vw, 3.2rem)", fontWeight: 700, letterSpacing: "-0.02em" }}>
            Buy From Us
          </h2>
          <div className="rounded-full" style={{ width: 60, height: 4, backgroundColor: "#2E4F21" }} />
          <p style={{ color: "#3a3a3a", fontFamily: "'Work Sans', sans-serif", fontSize: "clamp(0.95rem, 1.8vw, 1.1rem)", fontWeight: 400, maxWidth: 520, lineHeight: "1.7" }}>
            Quality, affordable recycled materials ready for reuse — perfect for construction, repairs, and everyday needs.
          </p>
        </div>

        {/* Tabs */}
        <div
          ref={tabRef}
          className="flex flex-wrap justify-center gap-3"
          style={{
            opacity: tabVisible ? 1 : 0,
            transform: tabVisible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s",
          }}
        >
          {buyCatalog.map((cat, i) => (
            <button
              key={cat.slug}
              onClick={() => setActiveTab(i)}
              className="px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-200"
              style={{
                fontFamily: "'Work Sans', sans-serif",
                backgroundColor: activeTab === i ? "#2E4F21" : "transparent",
                color: activeTab === i ? "#F5F5F0" : "#2E4F21",
                border: "2px solid #2E4F21",
                letterSpacing: "0.01em",
                boxShadow: activeTab === i ? "0 4px 16px rgba(46,79,33,0.25)" : "none",
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Category label */}
        <div className="flex flex-col gap-2">
          <h3 style={{ color: "#2E4F21", fontFamily: "'Work Sans', sans-serif", fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)", fontWeight: 700, letterSpacing: "-0.01em" }}>
            {activeCategory.label}
          </h3>
          <div style={{ width: 40, height: 3, borderRadius: 99, backgroundColor: "#2E4F21" }} />
        </div>

        {/* Product Grid */}
        <div key={activeTab} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeCategory.items.map((item, i) => (
            <ProductCard
              key={item.slug}
              categorySlug={activeCategory.slug}
              itemSlug={item.slug}
              name={item.label}
              image={item.image}
              tag={item.tag}
              index={i}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="flex justify-center">
          <a href="/#contact-form">
            <button
              className="px-10 py-3 rounded-full font-semibold transition-all duration-200 hover:opacity-90 hover:scale-105 active:scale-95"
              style={{ backgroundColor: "#2E4F21", color: "#F5F5F0", fontFamily: "'Work Sans', sans-serif", fontSize: "16px" }}
            >
              Buy Materials Now
            </button>
          </a>
        </div>
      </div>
    </section>
  );
}
