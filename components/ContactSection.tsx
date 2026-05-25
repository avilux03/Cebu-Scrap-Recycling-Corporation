"use client";

import { useEffect, useRef, useState } from "react";

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
    title: "Address",
    lines: [
      { text: "Pitalo, San Fernando, Cebu, Philippines", href: null, icon: null },
    ],
  },
  {
    title: "Phone & Email",
    lines: [
      { text: "0948 055 8001", href: "tel:09480558001", icon: null },
      { text: "contact@cebuscrap.com", href: "mailto:contact@cebuscrap.com", icon: null },
    ],
  },
  {
    title: "Social Media Pages",
    lines: [
      {
        text: "Cebu Scrap Recycling Corporation",
        href: "https://web.facebook.com/profile.php?id=61576023680563",
        icon: "facebook",
      },
    ],
  },
];

const location = {
  label: "Pitalo, San Fernando, Cebu, Philippines",
  embedSrc:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3925.8!2d123.7172561!3d10.1751761!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33a979040a44e1d1%3A0x4ffbe150b6baa434!2sCebu%20Scrap%20Recycling%20Corporation!5e0!3m2!1sen!2sph!4v1715000000000",
  mapsLink:
    "https://www.google.com/maps/place/Cebu+Scrap+Recycling+Corporation/@10.1751761,123.7172561,17z",
};

function FacebookIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="currentColor"
      style={{ flexShrink: 0 }}
    >
      <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.884v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
    </svg>
  );
}

export default function ContactSection() {
  const { ref: headingRef, inView: headingVisible } = useInView(0.3);
  const { ref: columnsRef, inView: columnsVisible } = useInView(0.1);
  const { ref: locationRef, inView: locationVisible } = useInView(0.1);

  return (
    <>
      <style>{`
        .map-card {
          position: relative;
          width: 100%;
          overflow: hidden;
          border-radius: 16px;
          border: 1.5px solid rgba(46,79,33,0.15);
          box-shadow: 0 4px 24px rgba(46,79,33,0.10);
          aspect-ratio: 16/10;
          display: block;
          text-decoration: none;
          cursor: pointer;
        }

        .map-card iframe {
          width: 100%;
          height: 100%;
          border: 0;
          display: block;
          pointer-events: none;
        }

        .map-card-overlay {
          position: absolute;
          inset: 0;
          background: rgba(46,79,33,0);
          transition: background 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .map-card:hover .map-card-overlay {
          background: rgba(46,79,33,0.12);
        }

        .map-card-overlay-label {
          opacity: 0;
          transition: opacity 0.2s ease;
          background: #2E4F21;
          color: #ffffff;
          padding: 8px 18px;
          border-radius: 999px;
          font-family: 'Work Sans', sans-serif;
          font-size: 0.85rem;
          font-weight: 600;
          letter-spacing: 0.02em;
        }

        .map-card:hover .map-card-overlay-label {
          opacity: 1;
        }

        /* Two-column layout on desktop */
        .contact-main-grid {
          display: grid;
          grid-template-columns: 1fr 1px 1fr;
          gap: 0;
          align-items: start;
        }

        .contact-left { padding: 0 2rem 0 0; }
        .contact-right { padding: 0 0 0 2rem; }

        .contact-separator {
          display: block;
          width: 1px;
          align-self: stretch;
          background-color: rgba(46, 79, 33, 0.25);
        }

        /* Single-column stacked on mobile */
        @media (max-width: 640px) {
          .contact-main-grid {
            grid-template-columns: 1fr;
          }

          .contact-separator {
            width: 100%;
            height: 1px;
            align-self: auto;
          }

          .contact-left,
          .contact-right {
            padding: 0;
          }
        }

        .contact-link {
          color: rgba(46,79,33,0.65);
          font-family: 'Work Sans', sans-serif;
          font-weight: 400;
          line-height: 1.7;
          text-decoration: underline;
          text-underline-offset: 3px;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: color 0.2s ease;
          cursor: pointer;
        }

        .contact-link:hover {
          color: #2E4F21;
        }
      `}</style>

      <section
        className="w-full py-24 px-6 md:px-12"
        style={{ backgroundColor: "#ffffff" }}
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
              style={{ width: "60px", height: "4px", backgroundColor: "#2E4F21" }}
            />
          </div>

          {/* Main grid */}
          <div
            ref={columnsRef}
            className="contact-main-grid"
            style={{
              opacity: columnsVisible ? 1 : 0,
              transform: columnsVisible ? "translateY(0)" : "translateY(28px)",
              transition: "opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s",
            }}
          >
            {/* LEFT: Address + Map */}
            <div
              className="contact-left"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                paddingTop: "1rem",
                paddingBottom: "1rem",
              }}
            >
              {/* Address block */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
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
                  {contactColumns[0].title}
                </h3>
                {contactColumns[0].lines.map((line) => (
                  <span
                    key={line.text}
                    style={{
                      color: "rgba(46,79,33,0.65)",
                      fontFamily: "'Work Sans', sans-serif",
                      fontSize: "clamp(0.78rem, 2vw, 0.9rem)",
                      fontWeight: "400",
                      lineHeight: "1.7",
                    }}
                  >
                    {line.text}
                  </span>
                ))}
              </div>

              {/* Map below address */}
              <div
                ref={locationRef}
                style={{
                  opacity: locationVisible ? 1 : 0,
                  transform: locationVisible ? "translateY(0)" : "translateY(32px)",
                  transition: "opacity 0.7s ease, transform 0.7s ease",
                }}
              >
                <a
                  href={location.mapsLink}
                  target="_blank"
                  rel="noreferrer"
                  className="map-card"
                >
                  <iframe
                    src={location.embedSrc}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={location.label}
                  />
                  <div className="map-card-overlay">
                    <span className="map-card-overlay-label">Open in Google Maps ↗</span>
                  </div>
                </a>
              </div>
            </div>

            {/* Separator */}
            <div className="contact-separator" />

            {/* RIGHT: Phone & Email + Social Media */}
            <div
              className="contact-right"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "2rem",
                paddingTop: "1rem",
                paddingBottom: "1rem",
              }}
            >
              {[contactColumns[1], contactColumns[2]].map((col) => (
                <div key={col.title} style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
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
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                    {col.lines.map((line) =>
                      line.href ? (
                        <a
                          key={line.text}
                          href={line.href}
                          target={line.href.startsWith("http") ? "_blank" : undefined}
                          rel="noreferrer"
                          className="contact-link"
                          style={{
                            fontSize: "clamp(0.78rem, 2vw, 0.9rem)",
                          }}
                        >
                          {line.icon === "facebook" && <FacebookIcon />}
                          {line.text}
                        </a>
                      ) : (
                        <span
                          key={line.text}
                          style={{
                            color: "rgba(46,79,33,0.65)",
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
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
