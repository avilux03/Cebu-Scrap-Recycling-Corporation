"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];

function NavLink({ href, label, pathname, onClick }: {
  href: string;
  label: string;
  pathname: string;
  onClick?: () => void;
}) {
  const isActive = pathname === href;
  return (
    <Link
      href={href}
      onClick={onClick}
      className="relative transition-opacity hover:opacity-60"
      style={{
        color: "#2E4F21",
        fontFamily: "'Work Sans', sans-serif",
        fontSize: "16px",
        letterSpacing: "0.045em",
        fontWeight: isActive ? "600" : "400",
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
    <nav
      className="w-full sticky top-0 z-50 transition-shadow duration-300"
      style={{
        backgroundColor: "#A0F1BD",
        boxShadow: scrolled ? "0 2px 12px rgba(0,0,0,0.10)" : "none",
      }}
    >
      {/* Main Bar */}
      <div
        className="w-full h-17.25 flex items-center justify-between pl-2  mx-auto"
        style={{ maxWidth: "1280px" }}
      >
        {/* Logo */}
        <Link href="/">
          <Image
            src="/logo.png"
            alt="Cebu Scrap Recycling Corporation"
            width={80}
            height={40}
            className="object-contain"
            priority
          />
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.label}
              href={link.href}
              label={link.label}
              pathname={pathname}
            />
          ))}
          <Link href="/contact">
            <button
              className="px-5 py-2 rounded-full text-white transition-opacity hover:opacity-80"
              style={{
                backgroundColor: "#2E4F21",
                fontFamily: "'Work Sans', sans-serif",
                fontSize: "16px",
              }}
            >
              Message Us!
            </button>
          </Link>
        </div>

        {/* Hamburger */}
        <button
          className="flex md:hidden flex-col justify-center items-center gap-1.25 w-8 h-8"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          {[
            menuOpen ? "translateY(7px) rotate(45deg)" : "none",
            null, // middle bar (opacity handled separately)
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
          maxHeight: menuOpen ? "300px" : "0px",
          backgroundColor: "#A0F1BD",
        }}
      >
        <div className="flex flex-col px-10 pb-6 gap-5">
          {navLinks.map((link) => (
            <NavLink
              key={link.label}
              href={link.href}
              label={link.label}
              pathname={pathname}
              onClick={() => setMenuOpen(false)}
            />
          ))}
          <Link href="/contact" className="w-fit">
            <button
              className="px-5 py-2 rounded-full text-white transition-opacity hover:opacity-80"
              style={{
                backgroundColor: "#2E4F21",
                fontFamily: "'Work Sans', sans-serif",
                fontSize: "16px",
              }}
            >
              Message Us!
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}