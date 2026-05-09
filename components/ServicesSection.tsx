"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const services = [
  {
    number: "1",
    title: "Building Demolition",
    type: "icon",
    icon: "🏗️",
    text: "Professional building demolition carried out with precision, safety, and efficiency, ensuring every structure is carefully dismantled and cleared to make way for new modern development. We manage the entire process responsibly from planning and site assessment to debris removal and cleanup, leaving the area safe, organized, and fully prepared for its next purpose.",
    tags: ["Site Assessment", "Safe Dismantling", "Debris Removal", "Full Cleanup"],
  },
  {
    number: "2",
    title: "Scrap Clean-up",
    type: "icon",
    icon: "♻️",
    text: "Fast, safe, and efficient scrap removal services designed to clear out unwanted materials quickly and responsibly, helping you maintain a clean, organized, and hazard-free space that's always ready for your next project or improvement.",
    tags: ["Residential", "Commercial", "Industrial", "Same-Day Service"],
  },
  {
    number: "3",
    title: "Troubleshoot, Repair & Overhaul Vehicles",
    type: "image",
    image: "/repair.png",
    imageAlt: "Mechanic repairing vehicle engine",
    text: "Delivering expert troubleshooting, repair, and full vehicle overhaul services. From powertrain and underchassis systems to advanced electronics, turbocharger performance, and precise freon & aircon servicing, we ensure your vehicle runs stronger, smoother, and more efficiently on every drive.",
    tags: ["Powertrain", "Underchassis", "Electronics", "Turbocharger", "Freon & Aircon"],
  },
];

function useInView(threshold = 0.08) {
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

function ServiceCard({
  number,
  title,
  type,
  icon,
  image,
  imageAlt,
  text,
  tags,
  index,
}: {
  number: string;
  title: string;
  type: string;
  icon?: string;
  image?: string;
  imageAlt?: string;
  text: string;
  tags: string[];
  index: number;
}) {
  const { ref, inView } = useInView(0.08);
  const isReversed = index % 2 !== 0;

  return (
    <div
      ref={ref}
      className="flex flex-col md:flex-row md:items-center gap-8 md:gap-14"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(40px)",
        transition: "opacity 0.7s ease, transform 0.7s ease",
        flexDirection: isReversed ? undefined : undefined,
      }}
    >
      {/* Text content */}
      <div
        className={`flex flex-col gap-4 w-full md:w-1/2 ${isReversed ? "md:order-2" : ""}`}
      >
        {/* Number + Title */}
        <div className="flex items-start gap-4">
          <span
            style={{
              color: "#A0F1BD",
              fontFamily: "'Work Sans', sans-serif",
              fontSize: "clamp(2.8rem, 6vw, 4.5rem)",
              fontWeight: "800",
              lineHeight: "1",
              letterSpacing: "-0.04em",
              flexShrink: 0,
            }}
          >
            {number}
          </span>
          <h3
            className="pt-2"
            style={{
              color: "#2E4F21",
              fontFamily: "'Work Sans', sans-serif",
              fontSize: "clamp(1.1rem, 3vw, 1.6rem)",
              fontWeight: "700",
              letterSpacing: "-0.01em",
              lineHeight: "1.25",
            }}
          >
            {title}
          </h3>
        </div>

        <p
          style={{
            color: "#3a3a3a",
            fontFamily: "'Work Sans', sans-serif",
            fontSize: "clamp(0.85rem, 2.5vw, 1rem)",
            fontWeight: "400",
            lineHeight: "1.85",
          }}
        >
          {text}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-1">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full text-xs font-semibold"
              style={{
                backgroundColor: "rgba(160,241,189,0.25)",
                color: "#2E4F21",
                fontFamily: "'Work Sans', sans-serif",
                letterSpacing: "0.04em",
                border: "1px solid rgba(160,241,189,0.5)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Visual — image or icon card */}
      <div
        className={`w-full md:w-5/12 shrink-0 ${isReversed ? "md:order-1" : ""}`}
      >
        {type === "image" && image ? (
          <div
            className="rounded-2xl overflow-hidden"
            style={{
              boxShadow: "0 8px 32px rgba(46,79,33,0.18)",
              border: "2px solid rgba(160,241,189,0.3)",
            }}
          >
            <div className="relative w-full" style={{ aspectRatio: "16/10" }}>
              <Image
                src={image}
                alt={imageAlt ?? title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(26,46,19,0.35) 0%, transparent 60%)",
                }}
              />
            </div>
          </div>
        ) : (
          <div
            className="rounded-2xl flex flex-col items-center justify-center gap-6 p-10"
            style={{
              aspectRatio: "16/10",
              backgroundColor: "#0f1f0b",
              border: "1.5px solid rgba(160,241,189,0.15)",
              boxShadow: "0 8px 32px rgba(46,79,33,0.18)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Ghost number bg */}
            <div
              className="absolute pointer-events-none select-none"
              style={{
                fontSize: "10rem",
                fontWeight: "900",
                color: "rgba(160,241,189,0.04)",
                fontFamily: "'Work Sans', sans-serif",
                right: "-1.5rem",
                bottom: "-2rem",
                lineHeight: 1,
              }}
            >
              {number}
            </div>

            <div style={{ fontSize: "4rem", lineHeight: 1 }}>{icon}</div>

            <p
              style={{
                color: "rgba(247,254,249,0.7)",
                fontFamily: "'Work Sans', sans-serif",
                fontSize: "0.9rem",
                fontWeight: "500",
                textAlign: "center",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                maxWidth: "200px",
                lineHeight: "1.6",
              }}
            >
              {title}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ServicesSection() {
  const { ref: headingRef, inView: headingVisible } = useInView(0.2);

  return (
    <section
      className="w-full py-16 md:py-24 px-4 sm:px-6 md:px-12"
      style={{ backgroundColor: "#ffffff" }}
    >
      <div
        className="mx-auto flex flex-col gap-12 md:gap-20"
        style={{ maxWidth: "1280px" }}
      >
        {/* Heading */}
        <div
          ref={headingRef}
          className="flex flex-col items-center gap-3 text-center"
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
              fontSize: "clamp(1.7rem, 6vw, 3.2rem)",
              fontWeight: "700",
              letterSpacing: "-0.02em",
            }}
          >
            Our Services
          </h2>
          <div
            className="rounded-full"
            style={{ width: "50px", height: "4px", backgroundColor: "#A0F1BD" }}
          />
          <p
            style={{
              color: "#3a3a3a",
              fontFamily: "'Work Sans', sans-serif",
              fontSize: "clamp(0.88rem, 3vw, 1.05rem)",
              fontWeight: "400",
              maxWidth: "520px",
              lineHeight: "1.7",
            }}
          >
            Providing expert demolition, efficient scrap clean-up, and reliable
            vehicle repair and overhaul services.
          </p>
        </div>

        {/* Divider */}
        <div
          className="w-full"
          style={{
            height: "1px",
            backgroundColor: "rgba(160,241,189,0.5)",
            marginTop: "-24px",
          }}
        />

        {/* Service Cards */}
        <div className="flex flex-col gap-12 md:gap-16">
          {services.map((service, i) => (
            <div key={service.number}>
              <ServiceCard {...service} index={i} />
              {i < services.length - 1 && (
                <div
                  className="w-full mt-12 md:mt-16"
                  style={{
                    height: "1px",
                    backgroundColor: "rgba(160,241,189,0.4)",
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}