"use client";

import { Fragment, useEffect, useRef, useState } from "react";

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

const contactColumns = [
  {
    emoji: "📞",
    title: "Phone & Email",
    lines: [
      { text: "0962 930 5439", href: "tel:09629305439" },
      { text: "contact@cebuscrap.com", href: "mailto:contact@cebuscrap.com" },
    ],
  },
  {
    emoji: "📍",
    title: "Address",
    lines: [
      { text: "San Fernando Pitalo (Main)", href: null },
      { text: "Mag-abo Amlan Negros Oriental", href: null },
    ],
  },
  {
    emoji: "📘",
    title: "Social Media Pages",
    lines: [
      {
        text: "Facebook: Cebu Scrap Recycling Corporation",
        href: "https://facebook.com/CebuScrapRecyclingCorporation",
      },
    ],
  },
];

const locations = [
  {
    label: "San Fernando Pitalo (Main)",
    src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125374.38876354!2d123.7!3d10.3!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33a999b6f4a0e7db%3A0x4b1c60c5e6b7f8a0!2sSan%20Fernando%2C%20Cebu!5e0!3m2!1sen!2sph!4v1620000000000",
  },
  {
    label: "Mag-abo Amlan Negros Oriental",
    src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d500000!2d123.0!3d10.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33aed1a4a4a4a4a4%3A0x4b1c60c5e6b7f8a0!2sNegros%20Occidental!5e0!3m2!1sen!2sph!4v1620000000000",
  },
];

export default function ContactSection() {
  const { ref: headingRef, inView: headingVisible } = useInView(0.3);
  const { ref: columnsRef, inView: columnsVisible } = useInView(0.1);
  const { ref: locationRef, inView: locationVisible } = useInView(0.1);

  return (
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
              margin: 0,
            }}
          >
            Contact Us
          </h2>

          <div
            className="rounded-full"
            style={{
              width: "60px",
              height: "4px",
              backgroundColor: "#2E4F21",
            }}
          />
        </div>

        {/* Contact Columns */}
        <div
          ref={columnsRef}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1px 1fr 1px 1fr",
            opacity: columnsVisible ? 1 : 0,
            transform: columnsVisible
              ? "translateY(0)"
              : "translateY(28px)",
            transition: "opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s",
          }}
        >
          {contactColumns.map((col, i) => (
            <Fragment key={col.title}>
              <div
                style={{
                  padding:
                    i === 0
                      ? "0 2rem 0 0"
                      : i === contactColumns.length - 1
                      ? "0 0 0 2rem"
                      : "0 2rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                }}
              >
                {/* Emoji */}
                <span
                  style={{
                    fontSize: "1.8rem",
                    lineHeight: 1,
                    marginBottom: "0.25rem",
                  }}
                >
                  {col.emoji}
                </span>

                {/* Title */}
                <h3
                  style={{
                    color: "#2E4F21",
                    fontFamily: "'Work Sans', sans-serif",
                    fontSize: "clamp(0.95rem, 2.5vw, 1.05rem)",
                    fontWeight: "700",
                    letterSpacing: "-0.01em",
                    margin: 0,
                  }}
                >
                  {col.title}
                </h3>

                {/* Lines */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.25rem",
                  }}
                >
                  {col.lines.map((line) =>
                    line.href ? (
                      <a
                        key={line.text}
                        href={line.href}
                        target={
                          line.href.startsWith("http")
                            ? "_blank"
                            : undefined
                        }
                        rel="noreferrer"
                        style={{
                          color: "rgba(46,79,33,0.7)",
                          fontFamily: "'Work Sans', sans-serif",
                          fontSize: "clamp(0.78rem, 2vw, 0.9rem)",
                          fontWeight: "400",
                          lineHeight: "1.7",
                          textDecoration: "underline",
                          textUnderlineOffset: "3px",
                        }}
                      >
                        {line.text}
                      </a>
                    ) : (
                      <span
                        key={line.text}
                        style={{
                          color: "rgba(46,79,33,0.7)",
                          fontFamily: "'Work Sans', sans-serif",
                          fontSize: "clamp(0.78rem, 2vw, 0.9rem)",
                          fontWeight: "400",
                          lineHeight: "1.7",
                        }}
                      >
                        {line.text}
                      </span>
                    )
                  )}
                </div>
              </div>

              {/* Separator */}
              {i < contactColumns.length - 1 && (
                <div
                  style={{
                    width: "1px",
                    backgroundColor: "rgba(46,79,33,0.25)",
                  }}
                />
              )}
            </Fragment>
          ))}
        </div>

        {/* Locations */}
        <div
          ref={locationRef}
          className="flex flex-col gap-6 md:gap-8"
          style={{
            opacity: locationVisible ? 1 : 0,
            transform: locationVisible
              ? "translateY(0)"
              : "translateY(32px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          <h3
            className="text-center"
            style={{
              color: "#2E4F21",
              fontFamily: "'Work Sans', sans-serif",
              fontSize: "clamp(1.4rem, 5vw, 2.2rem)",
              fontWeight: "700",
              letterSpacing: "-0.02em",
              margin: 0,
            }}
          >
            Locations
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8">
            {locations.map((loc) => (
              <div key={loc.label} className="flex flex-col gap-3">
                <p
                  className="text-center"
                  style={{
                    color: "#2E4F21",
                    fontFamily: "'Work Sans', sans-serif",
                    fontSize: "clamp(0.82rem, 2.5vw, 0.92rem)",
                    fontWeight: "700",
                    margin: 0,
                  }}
                >
                  {loc.label}
                </p>

                <div
                  className="w-full overflow-hidden"
                  style={{
                    borderRadius: "16px",
                    border: "1.5px solid rgba(46,79,33,0.15)",
                    boxShadow: "0 4px 24px rgba(46,79,33,0.15)",
                    aspectRatio: "16/10",
                  }}
                >
                  <iframe
                    src={loc.src}
                    width="100%"
                    height="100%"
                    style={{ border: 0, display: "block" }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={loc.label}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}