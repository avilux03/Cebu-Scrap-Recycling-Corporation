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
    embedSrc:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3925.8!2d123.7172561!3d10.1751761!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33a979040a44e1d1%3A0x4ffbe150b6baa434!2sCebu%20Scrap%20Recycling%20Corporation!5e0!3m2!1sen!2sph!4v1715000000000",
    mapsLink:
      "https://www.google.com/maps/place/Cebu+Scrap+Recycling+Corporation/@10.1751761,123.7172561,17z",
  },
  {
    label: "Mag-abo Amlan Negros Oriental",
    embedSrc:
      "https://www.google.com/maps/embed?pb=!4v1715000000001!6m8!1m7!1sXTGAnCrXVngdjLLJR9_u9A!2m2!1d9.4662391!2d123.2170532!3f105.33!4f-1.74!5f0.7820865974627469",
    mapsLink:
      "https://www.google.com/maps/@9.4662391,123.2170532,3a,75y,105.33h,91.74t/data=!3m7!1e1!3m5!1sXTGAnCrXVngdjLLJR9_u9A!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D-1.7382077888765508%26panoid%3DXTGAnCrXVngdjLLJR9_u9A%26yaw%3D105.3275944068205!7i16384!8i8192",
  },
];

export default function ContactSection() {
  const { ref: headingRef, inView: headingVisible } = useInView(0.3);
  const { ref: columnsRef, inView: columnsVisible } = useInView(0.1);
  const { ref: locationRef, inView: locationVisible } = useInView(0.1);

  return (
    <>
      <style>{`
        .contact-columns-grid {
          display: grid;
          grid-template-columns: 1fr 1px 1fr 1px 1fr;
        }

        .contact-col-separator {
          display: block;
          width: 1px;
          background-color: rgba(46, 79, 33, 0.25);
        }

        .contact-col-pad-first  { padding: 0 2rem 0 0; }
        .contact-col-pad-middle { padding: 0 2rem; }
        .contact-col-pad-last   { padding: 0 0 0 2rem; }

        @media (max-width: 640px) {
          .contact-columns-grid {
            grid-template-columns: 1fr;
          }

          .contact-col-separator {
            display: block;
            width: 100%;
            height: 1px;
          }

          .contact-col-pad-first,
          .contact-col-pad-middle,
          .contact-col-pad-last {
            padding: 0;
          }
        }

        .map-card {
          position: relative;
          width: 100%;
          overflow: hidden;
          border-radius: 16px;
          border: 1.5px solid rgba(46,79,33,0.15);
          box-shadow: 0 4px 24px rgba(46,79,33,0.15);
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
          background: rgba(46,79,33,0.85);
          color: #A0F1BD;
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
      `}</style>

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
            className="contact-columns-grid"
            style={{
              opacity: columnsVisible ? 1 : 0,
              transform: columnsVisible ? "translateY(0)" : "translateY(28px)",
              transition: "opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s",
              gap: "0",
            }}
          >
            {contactColumns.map((col, i) => (
              <Fragment key={col.title}>
                <div
                  className={
                    i === 0
                      ? "contact-col-pad-first"
                      : i === contactColumns.length - 1
                      ? "contact-col-pad-last"
                      : "contact-col-pad-middle"
                  }
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                    paddingTop: "1rem",
                    paddingBottom: "1rem",
                  }}
                >
                  <span style={{ fontSize: "1.8rem", lineHeight: 1, marginBottom: "0.25rem" }}>
                    {col.emoji}
                  </span>

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

                {i < contactColumns.length - 1 && (
                  <div className="contact-col-separator" />
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
              transform: locationVisible ? "translateY(0)" : "translateY(32px)",
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

                  <a
                    href={loc.mapsLink}
                    target="_blank"
                    rel="noreferrer"
                    className="map-card"
                  >
                    <iframe
                      src={loc.embedSrc}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title={loc.label}
                    />
                    <div className="map-card-overlay">
                      <span className="map-card-overlay-label">Open in Google Maps ↗</span>
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
