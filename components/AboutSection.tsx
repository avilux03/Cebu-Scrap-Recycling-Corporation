"use client";

import { useEffect, useRef, useState } from "react";

const sections = [
  {
    number: "01",
    title: "Purpose",
    accent: "Transforming Waste\nInto Value",
    text: "Cebu Scrap Recycling Corporation exists to promote responsible waste management by transforming scrap materials into valuable resources. The company is committed to reducing environmental impact while supporting industries and communities through efficient recycling solutions.",
  },
  {
    number: "02",
    title: "Mission",
    accent: "Reliable.\nResponsible.\nSustainable.",
    text: "Our mission is to provide reliable, safe, and environmentally responsible scrap collection and recycling services. We aim to build long-term partnerships with clients by ensuring fair transactions, efficient processes, and sustainable practices that contribute to a cleaner and greener future.",
  },
  {
    number: "03",
    title: "Values & Culture",
    accent: "Integrity\nFirst, Always.",
    text: "We are driven by integrity, accountability, and respect in every transaction we make. Cebu Scrap Recycling Corporation fosters a culture of teamwork, safety, and continuous improvement. We value environmental stewardship and are dedicated to operating in a way that benefits both our customers and the community.",
  },
];

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

function AboutCard({
  number,
  title,
  accent,
  text,
  index,
}: {
  number: string;
  title: string;
  accent: string;
  text: string;
  index: number;
}) {
  const { ref, inView } = useInView(0.08);

  return (
    <div
      ref={ref}
      className="relative w-full"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(48px)",
        transition: `opacity 0.8s ease ${index * 0.1}s, transform 0.8s ease ${index * 0.1}s`,
      }}
    >
      {/* Card */}
      <div
        className="relative overflow-hidden rounded-2xl md:rounded-3xl p-8 md:p-14 flex flex-col md:flex-row gap-8 md:gap-16 items-start"
        style={{
          backgroundColor: "#2E4F21",
          border: "1px solid rgba(160,241,189,0.15)",
        }}
      >
        {/* Large background number */}
        <div
          className="absolute pointer-events-none select-none"
          style={{
            fontSize: "clamp(8rem, 20vw, 18rem)",
            fontWeight: "900",
            lineHeight: "1",
            color: "rgba(160,241,189,0.06)",
            fontFamily: "'Work Sans', sans-serif",
            right: "-1rem",
            bottom: "-2rem",
            letterSpacing: "-0.05em",
          }}
        >
          {number}
        </div>

        {/* Left col — number + title */}
        <div className="flex flex-row md:flex-col items-center md:items-start gap-4 md:gap-6 md:w-32 shrink-0">
          <span
            style={{
              fontFamily: "'Work Sans', sans-serif",
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              fontWeight: "800",
              color: "#A0F1BD",
              lineHeight: "1",
              letterSpacing: "-0.03em",
            }}
          >
            {number}
          </span>
          <span
            className="px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase"
            style={{
              backgroundColor: "rgba(160,241,189,0.12)",
              color: "#A0F1BD",
              fontFamily: "'Work Sans', sans-serif",
              letterSpacing: "0.12em",
            }}
          >
            {title}
          </span>
        </div>

        {/* Divider */}
        <div
          className="hidden md:block shrink-0"
          style={{
            width: "1px",
            alignSelf: "stretch",
            backgroundColor: "rgba(160,241,189,0.15)",
          }}
        />

        {/* Right col — accent text + body */}
        <div className="flex flex-col gap-5 flex-1 relative z-10">
          {/* Label */}
          <p
            style={{
              fontFamily: "'Work Sans', sans-serif",
              fontSize: "clamp(0.7rem, 1.5vw, 0.8rem)",
              fontWeight: "600",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "rgba(160,241,189,0.5)",
            }}
          >
            {title}
          </p>

          {/* Big accent text */}
          <h3
            style={{
              fontFamily: "'Work Sans', sans-serif",
              fontSize: "clamp(1.6rem, 4vw, 2.8rem)",
              fontWeight: "800",
              lineHeight: "1.15",
              letterSpacing: "-0.02em",
              color: "#F7FEF9",
              whiteSpace: "pre-line",
            }}
          >
            {accent}
          </h3>

          {/* Divider line */}
          <div
            style={{
              width: "48px",
              height: "3px",
              borderRadius: "99px",
              backgroundColor: "#A0F1BD",
            }}
          />

          {/* Body text */}
          <p
            style={{
              fontFamily: "'Work Sans', sans-serif",
              fontSize: "clamp(0.9rem, 2vw, 1.05rem)",
              fontWeight: "400",
              lineHeight: "1.9",
              color: "rgba(247,254,249,0.65)",
              maxWidth: "580px",
            }}
          >
            {text}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function AboutSection() {
  const { ref: headingRef, inView: headingVisible } = useInView(0.2);

  return (
    <section
      className="w-full py-20 md:py-32 px-4 sm:px-6 md:px-12"
      style={{ backgroundColor: "#F7FEF9" }}
    >
      <div
        className="mx-auto flex flex-col gap-6 md:gap-8"
        style={{ maxWidth: "1280px" }}
      >
        {/* Heading */}
        <div
          ref={headingRef}
          className="flex flex-col items-start gap-4 mb-8 md:mb-12"
          style={{
            opacity: headingVisible ? 1 : 0,
            transform: headingVisible ? "translateY(0)" : "translateY(28px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          <h2
            style={{
              color: "#2E4F21",
              fontFamily: "'Work Sans', sans-serif",
              fontSize: "clamp(2.2rem, 7vw, 4.5rem)",
              fontWeight: "800",
              letterSpacing: "-0.03em",
              lineHeight: "1.1",
            }}
          >
            About{" "}
            <span style={{ color: "#A0F1BD", WebkitTextStroke: "2px #2E4F21" }}>
              Us
            </span>
          </h2>
          <p
            style={{
              color: "rgba(46,79,33,0.6)",
              fontFamily: "'Work Sans', sans-serif",
              fontSize: "clamp(0.95rem, 2vw, 1.1rem)",
              maxWidth: "480px",
              lineHeight: "1.7",
            }}
          >
            A Cebu-based scrap recycling company built on trust, sustainability, and community.
          </p>
        </div>

        {/* Cards */}
        <div className="flex flex-col gap-5 md:gap-6">
          {sections.map((section, i) => (
            <AboutCard key={section.title} {...section} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}