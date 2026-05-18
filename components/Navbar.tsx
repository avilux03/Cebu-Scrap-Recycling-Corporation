"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Sell to Us", href: "#sell" },
  { label: "Buy from Us", href: "#buy" },
  { label: "Our Services", href: "#services" },
  { label: "Our Contact", href: "#contact" },
];

function NavLink({
  href,
  label,
  pathname,
  onClick,
}: {
  href: string;
  label: string;
  pathname: string;
  onClick?: () => void;
}) {
  const isActive = pathname === href;
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push(`/${href}`);
    }
    if (onClick) onClick();
  };

  return (
    <Link
      href={href}
      onClick={handleClick}
      className="relative transition-opacity hover:opacity-60 flex items-center"
      style={{
        color: "#2E4F21",
        fontFamily: "'Work Sans', sans-serif",
        fontSize: "15px",
        letterSpacing: "0.03em",
        fontWeight: isActive ? "700" : "500",
        padding: "0 14px",
        whiteSpace: "nowrap",
      }}
    >
      {label}
      {isActive && (
        <span
          className="absolute -bottom-1 left-0 w-full h-0.5 rounded-full"
          style={{ backgroundColor: "#2E4F21" }}
        />
      )}
    </Link>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <div className="h-17.25" />

      <nav
        className="w-full fixed top-0 left-0 right-0 z-50 transition-shadow duration-300"
        style={{
          backgroundColor: "#ffffff",
          boxShadow: scrolled
            ? "0 2px 16px rgba(46,79,33,0.10)"
            : "0 1px 0 rgba(46,79,33,0.08)",
        }}
      >
        {/* Main Bar */}
        <div
          className="w-full h-17.25 flex items-center justify-between mx-auto"
          style={{ maxWidth: "100%", paddingLeft: "40px" }}
        >
          {/* Logo — left side with padding */}
<Link
  href="/"
  style={{
    display: "flex",
    alignItems: "center",
    flexShrink: 0,
    paddingLeft: "35px",
  }}
>
  <Image
    src="/logo.png"
    alt="Cebu Scrap Recycling Corporation"
    width={80}
    height={40}
    className="object-contain"
    style={{ display: "block" }}
    priority
  />
</Link>
        

          {/* Desktop Nav — right side, all on one line */}
          <div className="hidden md:flex items-center self-stretch" style={{ flexShrink: 0 }}>
            {navLinks.map((link) => (
              <NavLink
                key={link.label}
                href={link.href}
                label={link.label}
                pathname={pathname}
              />
            ))}

            <div style={{ display: "flex", alignItems: "center", paddingLeft: "12px", paddingRight: "16px" }}>
              <Link href="/#contact-form" style={{ textDecoration: "none" }}>
                <button
                  style={{
                    background: "linear-gradient(135deg, #2E4F21, #3d6b2c)",
                    color: "#ffffff",
                    fontFamily: "'Work Sans', sans-serif",
                    fontSize: "14px",
                    fontWeight: "600",
                    border: "1px solid rgba(255,255,255,0.08)",
                    cursor: "pointer",
                    padding: "10px 24px",
                    borderRadius: "999px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    letterSpacing: "0.03em",
                    whiteSpace: "nowrap",
                    transition: "all 0.25s ease",
                    boxShadow: "0 4px 14px rgba(46,79,33,0.25)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow = "0 8px 20px rgba(46,79,33,0.35)";
                    e.currentTarget.style.background = "linear-gradient(135deg, #3d6b2c, #4a7d36)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 4px 14px rgba(46,79,33,0.25)";
                    e.currentTarget.style.background = "linear-gradient(135deg, #2E4F21, #3d6b2c)";
                  }}
                >
                  <span>Message Us!</span>
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path d="M2 8h10M8 4l4 4-4 4" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </Link>
            </div>
          </div>

          {/* Hamburger — mobile only */}
          <button
            className="flex md:hidden flex-col justify-center items-center gap-1.5 w-8 h-8"
            style={{ marginRight: "16px" }}
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            {[
              menuOpen ? "translateY(7px) rotate(45deg)" : "none",
              null,
              menuOpen ? "translateY(-7px) rotate(-45deg)" : "none",
            ].map((transform, i) => (
              <span
                key={i}
                className="block w-6 h-0.5 rounded transition-all duration-300"
                style={{
                  backgroundColor: "#2E4F21",
                  transform: transform ?? "none",
                  opacity: i === 1 && menuOpen ? 0 : 1,
                }}
              />
            ))}
          </button>
        </div>

        {/* Mobile Drawer */}
        <div
          className="md:hidden overflow-hidden transition-all duration-300 ease-in-out"
          style={{
            maxHeight: menuOpen ? "600px" : "0px",
            backgroundColor: "#ffffff",
            borderTop: menuOpen ? "1px solid rgba(46,79,33,0.08)" : "none",
          }}
        >
          <div className="flex flex-col px-10 pb-6 pt-4 gap-5">
            {navLinks.map((link) => (
              <NavLink
                key={link.label}
                href={link.href}
                label={link.label}
                pathname={pathname}
                onClick={() => setMenuOpen(false)}
              />
            ))}

            <Link href="/#contact-form" style={{ textDecoration: "none" }}>
              <button
                style={{
                  background: "linear-gradient(135deg, #2E4F21, #3d6b2c)",
                  color: "#ffffff",
                  fontFamily: "'Work Sans', sans-serif",
                  fontSize: "13px",
                  fontWeight: "600",
                  border: "1px solid rgba(255,255,255,0.08)",
                  cursor: "pointer",
                  padding: "12px 22px",
                  borderRadius: "999px",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  letterSpacing: "0.04em",
                  transition: "all 0.25s ease",
                  boxShadow: "0 6px 18px rgba(46,79,33,0.25)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 10px 24px rgba(46,79,33,0.35)";
                  e.currentTarget.style.background = "linear-gradient(135deg, #3d6b2c, #4a7d36)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 6px 18px rgba(46,79,33,0.25)";
                  e.currentTarget.style.background = "linear-gradient(135deg, #2E4F21, #3d6b2c)";
                }}
              >
                <span>Message Us</span>
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M2 8h10M8 4l4 4-4 4"
                    stroke="#ffffff"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}