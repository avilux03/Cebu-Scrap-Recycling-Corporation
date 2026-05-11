"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

const materialsMenu = [
  {
    emoji: "🔧",
    label: "Ferrous Metals",
    slug: "ferrous-metals",
    sub: ["Steel", "Iron", "Cast Iron", "Stainless", "Cans"],
    subSlugs: ["steel", "iron", "cast-iron", "stainless", "cans"],
  },
  {
    emoji: "🟡",
    label: "Non-Ferrous Metals",
    slug: "non-ferrous-metals",
    sub: ["Copper", "Brass", "Bronze", "Aluminum", "Tin", "Zinc"],
    subSlugs: ["copper", "brass", "bronze", "aluminum", "tin", "zinc"],
  },
  {
    emoji: "🚗",
    label: "Vehicles & Parts",
    slug: "vehicles-parts",
    sub: ["Engine", "Transmission", "Radiator", "Alternator", "Battery"],
    subSlugs: ["engine", "transmission", "radiator", "alternator", "battery"],
  },
  {
    emoji: "⚙️",
    label: "Machinery & Equipment",
    slug: "machinery-equipment",
    sub: ["Generators", "Pumps", "Compressors", "Motors", "Heavy Equipment"],
    subSlugs: ["generators", "pumps", "compressors", "motors", "heavy-equipment"],
  },
  {
    emoji: "📺",
    label: "Home & Office Appliances",
    slug: "home-office-appliances",
    sub: ["TV", "Refrigerator", "Aircon", "Computer", "Other Appliances"],
    subSlugs: ["tv", "refrigerator", "aircon", "computer", "other-appliances"],
  },
  {
    emoji: "♻️",
    label: "Plastics & Cartons",
    slug: "plastics-cartons",
    sub: ["PET Bottles", "HDPE Containers", "Cardboard", "Cartons", "Industrial Plastic"],
    subSlugs: ["pet-bottles", "hdpe-containers", "cardboard", "cartons", "industrial-plastic"],
  },
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

// Desktop mega-dropdown
function MaterialsDropdown() {
  const [open, setOpen] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative" style={{ zIndex: 100 }}>
      <button
        onClick={() => setOpen((p) => !p)}
        className="flex items-center gap-1.5 transition-opacity hover:opacity-60"
        style={{
          color: "#2E4F21",
          fontFamily: "'Work Sans', sans-serif",
          fontSize: "16px",
          letterSpacing: "0.045em",
          fontWeight: "400",
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: 0,
        }}
      >
        Materials
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          style={{
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s ease",
          }}
        >
          <path d="M2 4l4 4 4-4" stroke="#2E4F21" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div
          className="absolute top-full mt-3 rounded-2xl overflow-hidden flex"
          style={{
            backgroundColor: "#fff",
            boxShadow: "0 20px 60px rgba(46,79,33,0.18)",
            border: "1.5px solid rgba(46,79,33,0.10)",
            minWidth: "560px",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          {/* Left: category list */}
          <div
            className="flex flex-col py-3"
            style={{ minWidth: "220px", borderRight: "1px solid rgba(46,79,33,0.08)" }}
          >
            {materialsMenu.map((cat, i) => (
              <button
                key={cat.slug}
                onMouseEnter={() => setHoveredIdx(i)}
                onClick={() => {
                  router.push(`/products/${cat.slug}`);
                  setOpen(false);
                }}
                className="flex items-center gap-3 px-5 py-3 text-left w-full transition-all duration-150"
                style={{
                  backgroundColor: hoveredIdx === i ? "#f0fdf4" : "transparent",
                  color: hoveredIdx === i ? "#2E4F21" : "rgba(46,79,33,0.7)",
                  fontFamily: "'Work Sans', sans-serif",
                  fontSize: "0.9rem",
                  fontWeight: hoveredIdx === i ? "600" : "400",
                  borderLeft: hoveredIdx === i ? "3px solid #2E4F21" : "3px solid transparent",
                  cursor: "pointer",
                  border: "none",
                }}
              >
                <span style={{ fontSize: "1.1rem" }}>{cat.emoji}</span>
                {cat.label}
              </button>
            ))}
          </div>

          {/* Right: sub-items */}
          <div className="flex flex-col py-4 px-4 gap-1" style={{ minWidth: "240px" }}>
            <p
              style={{
                color: "rgba(46,79,33,0.45)",
                fontFamily: "'Work Sans', sans-serif",
                fontSize: "0.68rem",
                fontWeight: "700",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                marginBottom: "6px",
                paddingLeft: "8px",
              }}
            >
              {materialsMenu[hoveredIdx].label}
            </p>
            {materialsMenu[hoveredIdx].sub.map((item, j) => (
              <Link
                key={item}
                href={`/products/${materialsMenu[hoveredIdx].slug}?item=${materialsMenu[hoveredIdx].subSlugs[j]}`}
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-150"
                style={{
                  color: "rgba(46,79,33,0.75)",
                  fontFamily: "'Work Sans', sans-serif",
                  fontSize: "0.88rem",
                  fontWeight: "400",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#f0fdf4";
                  e.currentTarget.style.color = "#2E4F21";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "rgba(46,79,33,0.75)";
                }}
              >
                <span
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    backgroundColor: "#A0F1BD",
                    flexShrink: 0,
                  }}
                />
                {item}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Mobile accordion for materials
function MobileMaterialsAccordion({ onClose }: { onClose: () => void }) {
  const [open, setOpen] = useState(false);
  const [expandedCat, setExpandedCat] = useState<number | null>(null);
  const router = useRouter();

  return (
    <div>
      <button
        onClick={() => setOpen((p) => !p)}
        className="flex items-center gap-2 w-full"
        style={{
          color: "#2E4F21",
          fontFamily: "'Work Sans', sans-serif",
          fontSize: "16px",
          letterSpacing: "0.045em",
          fontWeight: "400",
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: 0,
        }}
      >
        Materials
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}
        >
          <path d="M2 4l4 4 4-4" stroke="#2E4F21" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div className="flex flex-col gap-1 mt-3 ml-2">
          {materialsMenu.map((cat, i) => (
            <div key={cat.slug}>
              <button
                onClick={() => setExpandedCat(expandedCat === i ? null : i)}
                className="flex items-center gap-2 w-full py-2"
                style={{
                  color: "#2E4F21",
                  fontFamily: "'Work Sans', sans-serif",
                  fontSize: "0.92rem",
                  fontWeight: "500",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "6px 0",
                }}
              >
                <span>{cat.emoji}</span>
                {cat.label}
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 12 12"
                  fill="none"
                  style={{
                    marginLeft: "auto",
                    transform: expandedCat === i ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.2s",
                  }}
                >
                  <path d="M2 4l4 4 4-4" stroke="#2E4F21" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {expandedCat === i && (
                <div className="flex flex-col ml-6 gap-1 mb-2">
                  {cat.sub.map((item, j) => (
                    <button
                      key={item}
                      onClick={() => {
                        router.push(`/products/${cat.slug}?item=${cat.subSlugs[j]}`);
                        onClose();
                      }}
                      className="text-left py-1.5"
                      style={{
                        color: "rgba(46,79,33,0.7)",
                        fontFamily: "'Work Sans', sans-serif",
                        fontSize: "0.85rem",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        padding: "4px 0",
                      }}
                    >
                      → {item}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
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
          backgroundColor: "#A0F1BD",
          boxShadow: scrolled ? "0 2px 12px rgba(0,0,0,0.10)" : "none",
        }}
      >
        {/* Main Bar */}
        <div
          className="w-full h-17.25 flex items-center justify-between pl-2 pr-6 mx-auto"
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

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.label}
                href={link.href}
                label={link.label}
                pathname={pathname}
              />
            ))}

            {/* Materials Dropdown */}
            <MaterialsDropdown />

            <Link href="/#contact-form">
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
            className="flex md:hidden flex-col justify-center items-center gap-1.5 w-8 h-8"
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

            {/* Mobile Materials Accordion */}
            <MobileMaterialsAccordion onClose={() => setMenuOpen(false)} />

            <Link href="/#contact-form" className="w-fit">
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
    </>
  );
}
