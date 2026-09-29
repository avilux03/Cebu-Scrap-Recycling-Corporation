"use client";

import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about" },
  { label: "Sell to Us", href: "#sell" },
  { label: "Buy from Us", href: "#buy" },
  { label: "Our Services", href: "#services" },
  { label: "Contact Us", href: "#contact" },
];

function FooterNavLink({ href, label }: { href: string; label: string }) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Link
      href={href}
      onClick={handleClick}
      style={{
        color: "rgba(255,255,255,0.7)",
        fontFamily: "'Work Sans', sans-serif",
        fontSize: "0.9rem",
        fontWeight: "400",
        textDecoration: "none",
        transition: "color 0.2s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
      onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}
    >
      {label}
    </Link>
  );
}

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#1a3a0e" }} className="w-full">
      {/* Top divider accent */}
      <div style={{ height: "4px", backgroundColor: "#ffffff" }} />

      <div
        className="mx-auto px-6 md:px-12 py-12 md:py-16"
        style={{ maxWidth: "1280px" }}
      >
        <div className="flex flex-col md:flex-row gap-10 md:gap-12" style={{ alignItems: "flex-start" }}>

          {/* Col 1 — Logo + Tagline — centered */}
          <div
            className="flex flex-col gap-4 shrink-0"
            style={{ width: "100%", maxWidth: "240px", alignItems: "center", textAlign: "center" }}
          >
            <Link
              href="/"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <Image
                src="/white logo.png"
                alt="Cebu Scrap Recycling Corporation"
                width={400}
                height={260}
                className="object-contain"
                style={{ opacity: 0.95, width: "100%", height: "auto" }}
              />
            </Link>
            <p
              style={{
                color: "#ffffff",
                fontFamily: "'Work Sans', sans-serif",
                fontSize: "0.85rem",
                fontWeight: "400",
                lineHeight: "1.7",
                margin: 0,
              }}
            >
              Turning scrap into value for a greener, cleaner Philippines.
            </p>
          </div>

          {/* Right side — 3 cols */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 md:gap-8 flex-1" style={{ width: "100%" }}>

            {/* Col 2 — Quick Links */}
            <div className="flex flex-col gap-4">
              <h4
                style={{
                  color: "#ffffff",
                  fontFamily: "'Work Sans', sans-serif",
                  fontSize: "0.7rem",
                  fontWeight: "700",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  margin: 0,
                }}
              >
                Explore
              </h4>
              <div className="flex flex-col gap-3">
                {navLinks.map((link) => (
                  <FooterNavLink key={link.href} href={link.href} label={link.label} />
                ))}
              </div>
            </div>

            {/* Col 3 — Address + Hours */}
            <div className="flex flex-col gap-4">
              <h4
                style={{
                  color: "#ffffff",
                  fontFamily: "'Work Sans', sans-serif",
                  fontSize: "0.7rem",
                  fontWeight: "700",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  margin: 0,
                }}
              >
                Main Branch
              </h4>
              <div className="flex flex-col gap-2">
                <p
                  style={{
                    color: "rgba(255,255,255,0.7)",
                    fontFamily: "'Work Sans', sans-serif",
                    fontSize: "0.88rem",
                    lineHeight: "1.6",
                    margin: 0,
                  }}
                >
                  Pitalo, San Fernando
                  <br />
                  Cebu, Philippines
                </p>
                <div
                  style={{
                    height: "1px",
                    backgroundColor: "rgba(255,255,255,0.12)",
                    margin: "6px 0",
                  }}
                />
                <div className="flex flex-col gap-1">
                  <p
                    style={{
                      color: "#ffffff",
                      fontFamily: "'Work Sans', sans-serif",
                      fontSize: "0.75rem",
                      fontWeight: "600",
                      letterSpacing: "0.05em",
                      textTransform: "uppercase",
                      margin: 0,
                    }}
                  >
                    Business Hours
                  </p>
                  <p
                    style={{
                      color: "rgba(255,255,255,0.7)",
                      fontFamily: "'Work Sans', sans-serif",
                      fontSize: "0.88rem",
                      lineHeight: "1.6",
                      whiteSpace: "pre-line",
                      margin: 0,
                    }}
                  >
                    {"Monday – Saturday\n8:00 AM – 5:00 PM"}
                  </p>
                </div>
              </div>
            </div>

            {/* Col 4 — Contact + Socials */}
            <div className="flex flex-col gap-4">
              <h4
                style={{
                  color: "#ffffff",
                  fontFamily: "'Work Sans', sans-serif",
                  fontSize: "0.7rem",
                  fontWeight: "700",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  margin: 0,
                }}
              >
                Get In Touch
              </h4>
              <div className="flex flex-col gap-2">
                <a
                  href="tel:0994 970 6760"
                  style={{
                    color: "rgba(255,255,255,0.7)",
                    fontFamily: "'Work Sans', sans-serif",
                    fontSize: "0.88rem",
                    textDecoration: "none",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}
                >
                  0994 970 6760
                </a>
                <a
                  href="mailto:contact@cebuscrap.com"
                  style={{
                    color: "rgba(255,255,255,0.7)",
                    fontFamily: "'Work Sans', sans-serif",
                    fontSize: "0.88rem",
                    textDecoration: "none",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}
                >
                  contact@cebuscrap.com
                </a>
              </div>

              {/* Follow Us */}
              <div className="flex flex-col gap-3 mt-1">
                <p
                  style={{
                    color: "#ffffff",
                    fontFamily: "'Work Sans', sans-serif",
                    fontSize: "0.75rem",
                    fontWeight: "600",
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                    margin: 0,
                  }}
                >
                  Follow Us
                </p>
                <a
                  href="https://web.facebook.com/profile.php?id=61576023680563"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2"
                  style={{
                    color: "rgba(255,255,255,0.7)",
                    fontFamily: "'Work Sans', sans-serif",
                    fontSize: "0.88rem",
                    textDecoration: "none",
                    transition: "color 0.2s",
                    width: "fit-content",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                  Cebu Scrap Recycling Corporation
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.1)",
            marginTop: "3rem",
            paddingTop: "1.5rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.25rem",
          }}
        >
          <p
            style={{
              color: "rgba(255,255,255,0.3)",
              fontFamily: "'Work Sans', sans-serif",
              fontSize: "0.78rem",
              textAlign: "center",
              margin: 0,
            }}
          >
            © {new Date().getFullYear()} Cebu Scrap Recycling Corporation. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
