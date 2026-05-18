"use client";

import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
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
        color: "rgba(255,255,255,0.6)",
        fontFamily: "'Work Sans', sans-serif",
        fontSize: "0.9rem",
        fontWeight: "400",
        textDecoration: "none",
        transition: "color 0.2s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.color = "#A0F1BD")}
      onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}
    >
      {label}
    </Link>
  );
}

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#1a3a0e" }} className="w-full">
      {/* Top divider accent */}
      <div style={{ height: "4px", backgroundColor: "#A0F1BD" }} />

      <div
        className="mx-auto px-6 md:px-12 py-12 md:py-16"
        style={{ maxWidth: "1280px" }}
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8">

          {/* Col 1 — Logo + Tagline */}
          <div className="flex flex-col gap-4 md:col-span-1">
            <Link href="/" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
              <Image
                src="/logo.png"
                alt="Cebu Scrap Recycling Corporation"
                width={90}
                height={90}
                className="object-contain"
                style={{
                  filter: "brightness(0) invert(1) sepia(1) saturate(3) hue-rotate(60deg)",
                  opacity: 0.9,
                }}
              />
            </Link>
            <p
              style={{
                color: "rgba(160,241,189,0.85)",
                fontFamily: "'Work Sans', sans-serif",
                fontSize: "0.85rem",
                fontWeight: "400",
                lineHeight: "1.7",
                maxWidth: "200px",
              }}
            >
              Turning scrap into value for a greener, cleaner Philippines.
            </p>
          </div>

          {/* Col 2 — Quick Links */}
          <div className="flex flex-col gap-4">
            <h4
              style={{
                color: "#A0F1BD",
                fontFamily: "'Work Sans', sans-serif",
                fontSize: "0.7rem",
                fontWeight: "700",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
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
                color: "#A0F1BD",
                fontFamily: "'Work Sans', sans-serif",
                fontSize: "0.7rem",
                fontWeight: "700",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              Main Branch
            </h4>
            <div className="flex flex-col gap-2">
              <p
                style={{
                  color: "rgba(255,255,255,0.6)",
                  fontFamily: "'Work Sans', sans-serif",
                  fontSize: "0.88rem",
                  lineHeight: "1.6",
                }}
              >
                Pitalo, San Fernando<br />
                Cebu, Philippines
              </p>
              <div
                style={{
                  height: "1px",
                  backgroundColor: "rgba(160,241,189,0.15)",
                  margin: "4px 0",
                }}
              />
              <div className="flex flex-col gap-1">
                <p
                  style={{
                    color: "#A0F1BD",
                    fontFamily: "'Work Sans', sans-serif",
                    fontSize: "0.75rem",
                    fontWeight: "600",
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                  }}
                >
                  Business Hours
                </p>
               <p
  style={{
    color: "rgba(255,255,255,0.6)",
    fontFamily: "'Work Sans', sans-serif",
    fontSize: "0.88rem",
    lineHeight: "1.6",
    whiteSpace: "pre-line",
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
                color: "#A0F1BD",
                fontFamily: "'Work Sans', sans-serif",
                fontSize: "0.7rem",
                fontWeight: "700",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              Get In Touch
            </h4>
            <div className="flex flex-col gap-2">
              <a
                href="tel:09629305439"
                style={{
                  color: "rgba(255,255,255,0.6)",
                  fontFamily: "'Work Sans', sans-serif",
                  fontSize: "0.88rem",
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#A0F1BD")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}
              >
               0948 055 8001
              </a>
              <a
                href="mailto:contact@cebuscrap.com"
                style={{
                  color: "rgba(255,255,255,0.6)",
                  fontFamily: "'Work Sans', sans-serif",
                  fontSize: "0.88rem",
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#A0F1BD")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}
              >
                contact@cebuscrap.com
              </a>
            </div>

            {/* Follow Us */}
            <div className="flex flex-col gap-3 mt-1">
              <p
                style={{
                  color: "#A0F1BD",
                  fontFamily: "'Work Sans', sans-serif",
                  fontSize: "0.75rem",
                  fontWeight: "600",
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
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
                  color: "rgba(255,255,255,0.6)",
                  fontFamily: "'Work Sans', sans-serif",
                  fontSize: "0.88rem",
                  textDecoration: "none",
                  transition: "color 0.2s",
                  width: "fit-content",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#A0F1BD")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
                Cebu Scrap Recycling Corporation
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: "1px solid rgba(160,241,189,0.12)",
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
            }}
          >
            © {new Date().getFullYear()} Cebu Scrap Recycling Corporation. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
