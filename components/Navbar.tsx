"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about" },
  { label: "Sell to Us", href: "#sell" },
  { label: "Buy from Us", href: "#buy" },
  { label: "Our Services", href: "#services" },
  { label: "Contact Us", href: "#contact" },
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
          style={{ maxWidth: "100%", paddingLeft: "10px" }}
        >
          {/* Logo — left side with padding (tight on mobile, full on desktop) */}
          <Link
            href="/"
            className="flex items-center shrink-0 pl-3 md:pl-8.75"
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
          </div>
        </div>
      </nav>
    </>
  );
}
