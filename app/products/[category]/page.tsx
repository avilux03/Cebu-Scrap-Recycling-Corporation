"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// ─── Data ─────────────────────────────────────────────────────────────────────

const catalog = [
  {
    emoji: "🔧",
    label: "Ferrous Metals",
    slug: "ferrous-metals",
    description:
      "Ferrous metals contain iron and are among the most recycled materials in the world. We accept all grades of ferrous scrap and offer competitive pricing based on current market rates.",
    items: [
      {
        slug: "steel",
        label: "Steel",
        image: "/steel.png",
        description:
          "Steel is the most recycled metal on the planet. We accept structural steel, sheet steel, rebar, and miscellaneous steel scrap. Recycling steel saves up to 74% of the energy needed to make steel from raw ore. We accept both light and heavy grades.",
      },
      {
        slug: "iron",
        label: "Iron",
        image: "/iron.png",
        description:
          "Wrought iron and pig iron are valuable recyclable materials. We accept iron pipes, fittings, gates, frames, and other iron goods. Iron recycling reduces mining waste significantly and conserves natural resources.",
      },
      {
        slug: "cast-iron",
        label: "Cast Iron",
        image: "/cast iron.png",
        description:
          "Cast iron is a dense, high-carbon iron alloy found in engine blocks, pipes, cookware, and industrial machinery parts. Its high density means even small quantities carry good weight and value.",
      },
      {
        slug: "stainless",
        label: "Stainless",
        image: "/stainless.png",
        description:
          "Stainless steel contains chromium and nickel, making it highly valuable in scrap recycling. We accept all grades — 304, 316, and others — from kitchen equipment, medical devices, industrial tanks, and more.",
      },
      {
        slug: "cans",
        label: "Cans",
        image: "/cans.png",
        description:
          "Steel cans from food and beverage packaging are 100% recyclable. We accept baled or loose steel cans in large quantities. Tin-coated steel cans are separated and processed to recover both steel and tin.",
      },
    ],
  },
  {
    emoji: "🟡",
    label: "Non-Ferrous Metals",
    slug: "non-ferrous-metals",
    description:
      "Non-ferrous metals do not contain iron and are generally more valuable by weight. They are highly sought after for their conductivity, corrosion resistance, and recyclability.",
    items: [
      {
        slug: "copper",
        label: "Copper",
        image: "/copper.png",
        description:
          "Copper is one of the most valuable non-ferrous metals we buy. We accept bare bright copper wire, #1 and #2 copper, copper tubing, bus bars, and copper-bearing alloys. Copper retains nearly all its properties after recycling.",
      },
      {
        slug: "brass",
        label: "Brass",
        image: "/brass.png",
        description:
          "Brass is an alloy of copper and zinc, commonly found in plumbing fixtures, valves, keys, and musical instruments. We accept yellow brass, red brass, and leaded brass in all forms.",
      },
      {
        slug: "bronze",
        label: "Bronze",
        image: "/bronze.png",
        description:
          "Bronze is a copper-tin alloy prized for its strength and corrosion resistance. Found in bearings, bushings, propellers, and statues. We buy clean bronze and mixed bronze-copper alloys.",
      },
      {
        slug: "aluminum",
        label: "Aluminum",
        image: "/alu.png",
        description:
          "Aluminum recycling uses only 5% of the energy needed to produce primary aluminum. We accept aluminum cans, extrusions, cast aluminum, wheels, wire, and sheet. Aluminum is one of our highest-volume materials.",
      },
      {
        slug: "tin",
        label: "Tin",
        image: "/tin cans alu.png",
        description:
          "Tin is used as a coating on steel cans and in soldering applications. We accept tin-coated items and tin alloys. Tin recovery from scrap reduces the need for mining this relatively rare metal.",
      },
      {
        slug: "zinc",
        label: "Zinc",
        image: "/zink.png",
        description:
          "Zinc is commonly found in die-cast parts, galvanized steel, and old carburetor components. We accept clean zinc die-cast, zinc dross, and mixed zinc alloys for recycling.",
      },
    ],
  },
  {
    emoji: "🚗",
    label: "Vehicles & Parts",
    slug: "vehicles-parts",
    description:
      "We accept a wide range of vehicle components and automotive scrap. From entire end-of-life vehicles to individual parts, we ensure responsible and environmentally sound recycling.",
    items: [
      {
        slug: "engine",
        label: "Engine",
        image: "/engines.png",
        description:
          "Complete engines and engine blocks contain a mix of cast iron, aluminum, steel, and copper — making them highly valuable scrap. We accept gasoline and diesel engines from cars, trucks, boats, and industrial equipment.",
      },
      {
        slug: "transmission",
        label: "Transmission",
        image: "/engines 1.png",
        description:
          "Transmission units are a mix of aluminum housings, steel gears, and cast iron components. Whether manual or automatic, we accept transmissions from all vehicle types and sizes.",
      },
      {
        slug: "radiator",
        label: "Radiator",
        image: "/radiators.png",
        description:
          "Copper-brass and aluminum radiators are among the most recyclable auto parts. We buy clean radiators (drained of fluid), copper-brass units, and aluminum radiators. We offer competitive rates based on type and condition.",
      },
      {
        slug: "alternator",
        label: "Alternator",
        image: null,
        description:
          "Alternators contain copper windings, aluminum housings, and steel components. We accept alternators and starters from all vehicle types. These are processed to recover copper, aluminum, and iron separately.",
      },
      {
        slug: "battery",
        label: "Battery",
        image: "/batteries.png",
        description:
          "Lead-acid batteries from cars, trucks, motorcycles, and UPS systems are accepted. Lead recovery from old batteries is one of the most efficient recycling processes. We handle all battery types responsibly and safely.",
      },
    ],
  },
  {
    emoji: "⚙️",
    label: "Machinery & Equipment",
    slug: "machinery-equipment",
    description:
      "Industrial machinery and heavy equipment contain large quantities of ferrous and non-ferrous metals. We buy entire machines or individual parts — generators, pumps, compressors, motors, and more.",
    items: [
      {
        slug: "generators",
        label: "Generators",
        image: null,
        description:
          "Generators contain valuable copper windings, steel frames, and aluminum components. We accept diesel and gasoline generators of all sizes — from portable units to large industrial standby generators.",
      },
      {
        slug: "pumps",
        label: "Pumps",
        image: "/machines.png",
        description:
          "Industrial pumps are made from cast iron, stainless steel, bronze, and aluminum depending on their application. We accept centrifugal pumps, submersible pumps, and hydraulic pumps for recycling.",
      },
      {
        slug: "compressors",
        label: "Compressors",
        image: null,
        description:
          "Air compressors and refrigeration compressors contain copper motors, cast iron cylinders, and steel tanks. We accept compressors from air conditioning units, industrial systems, and automotive shops.",
      },
      {
        slug: "motors",
        label: "Motors",
        image: "/machines.png",
        description:
          "Electric motors are packed with copper windings and steel laminations, making them excellent scrap value. We accept motors of all sizes — from small household appliance motors to large three-phase industrial motors.",
      },
      {
        slug: "heavy-equipment",
        label: "Heavy Equipment",
        image: null,
        description:
          "Excavators, bulldozers, cranes, and other heavy equipment contain massive amounts of structural steel, cast iron, and hydraulic components. We coordinate pickup and processing for large-scale equipment decommissioning.",
      },
    ],
  },
  {
    emoji: "📺",
    label: "Home & Office Appliances",
    slug: "home-office-appliances",
    description:
      "E-waste and home appliances contain recoverable metals, plastics, and components. We accept a wide variety of household and office equipment for responsible recycling.",
    items: [
      {
        slug: "tv",
        label: "TV",
        image: "/tv and aircon.png",
        description:
          "Old televisions — CRT, LCD, and LED — contain valuable metals and must be disposed of responsibly. We accept all TV types. CRTs are processed with care due to lead content in the glass, while flat panels yield aluminum, copper, and circuit boards.",
      },
      {
        slug: "refrigerator",
        label: "Refrigerator",
        image: "/refs.png",
        description:
          "Refrigerators contain steel shells, copper tubing in coils, aluminum evaporators, and compressors. We accept residential and commercial refrigerators and freezers. Refrigerants are handled in compliance with environmental regulations.",
      },
      {
        slug: "aircon",
        label: "Aircon",
        image: "/tv and aircon.png",
        description:
          "Air conditioning units are rich in copper (tubing and motors), aluminum (fins and housing), and steel. We accept window-type, split-type, and industrial air conditioners. Refrigerant is recovered before processing.",
      },
      {
        slug: "computer",
        label: "Computer",
        image: "/computers.png",
        description:
          "Computers, laptops, servers, and peripherals are accepted for e-waste recycling. Circuit boards contain trace amounts of gold, silver, and palladium in addition to copper. Hard drives are shredded for data security before processing.",
      },
      {
        slug: "other-appliances",
        label: "Other Appliances",
        image: null,
        description:
          "Washing machines, ovens, microwave ovens, electric fans, rice cookers, and other household electronics are all accepted. Most contain recoverable steel, copper motors, and aluminum or plastic components.",
      },
    ],
  },
  {
    emoji: "♻️",
    label: "Plastics & Cartons",
    slug: "plastics-cartons",
    description:
      "We accept a range of recyclable plastics and paper-based packaging materials. Keeping plastics and cartons out of landfills is part of our commitment to a cleaner Philippines.",
    items: [
      {
        slug: "pet-bottles",
        label: "PET Bottles",
        image: null,
        description:
          "PET (Polyethylene Terephthalate) bottles from beverages are among the most recycled plastics globally. We accept clean, baled PET bottles. Recycled PET is used to make new bottles, polyester fiber, and packaging materials.",
      },
      {
        slug: "hdpe-containers",
        label: "HDPE Containers",
        image: null,
        description:
          "HDPE plastic is found in milk jugs, shampoo bottles, detergent containers, and industrial drums. It is one of the most durable and recyclable plastics. We accept clean HDPE in baled or loose form.",
      },
      {
        slug: "cardboard",
        label: "Cardboard",
        image: null,
        description:
          "Corrugated cardboard from shipping boxes is highly recyclable and in constant demand. We accept large quantities of clean, dry cardboard — baled or flat. Cardboard is recycled into new paper products and packaging.",
      },
      {
        slug: "cartons",
        label: "Cartons",
        image: "/cartons.png",
        description:
          "Beverage cartons and food-grade cartons are accepted in bulk. These multi-layer packaging materials contain paper, plastic, and aluminum layers that are separated and recycled individually.",
      },
      {
        slug: "industrial-plastic",
        label: "Industrial Plastic",
        image: "/plastic.png",
        description:
          "Industrial plastic scrap from manufacturing, construction, and packaging operations is accepted in large volumes. We buy PP, ABS, PS, and mixed plastic scrap depending on grade and cleanliness.",
      },
    ],
  },
];

// ─── ProductPage ──────────────────────────────────────────────────────────────

export default function ProductPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const categorySlug = params?.category as string;
  const itemSlugFromQuery = searchParams?.get("item");

  const category = catalog.find((c) => c.slug === categorySlug) ?? catalog[0];
  const [activeCatSlug, setActiveCatSlug] = useState(category.slug);
  const [activeItemSlug, setActiveItemSlug] = useState(
    itemSlugFromQuery ?? category.items[0].slug
  );

  const activeCategory = catalog.find((c) => c.slug === activeCatSlug) ?? catalog[0];
  const activeItem =
    activeCategory.items.find((it) => it.slug === activeItemSlug) ??
    activeCategory.items[0];

  const handleCategoryChange = (slug: string) => {
    const cat = catalog.find((c) => c.slug === slug)!;
    setActiveCatSlug(slug);
    setActiveItemSlug(cat.items[0].slug);
    router.replace(`/products/${slug}`, { scroll: false });
  };

  const handleItemChange = (itemSlug: string) => {
    setActiveItemSlug(itemSlug);
    router.replace(`/products/${activeCatSlug}?item=${itemSlug}`, { scroll: false });
  };

  const hasImage = !!activeItem.image;

  return (
    <>
      <Navbar />

      <main style={{ backgroundColor: "#f7fef9", minHeight: "100vh" }}>
        {/* Hero Banner */}
        <div
          style={{
            backgroundColor: "#A0F1BD",
            borderBottom: "1px solid rgba(46,79,33,0.12)",
          }}
          className="px-6 md:px-12 py-10"
        >
          <div className="mx-auto" style={{ maxWidth: "1280px" }}>
            <div
              className="flex items-center gap-2 mb-4"
              style={{
                fontFamily: "'Work Sans', sans-serif",
                fontSize: "0.8rem",
                color: "rgba(46,79,33,0.55)",
              }}
            >
              <Link href="/" style={{ color: "rgba(46,79,33,0.55)", textDecoration: "none" }}>
                Home
              </Link>
              <span>/</span>
              <span style={{ color: "#2E4F21", fontWeight: "600" }}>
                {activeCategory.emoji} {activeCategory.label}
              </span>
            </div>

            <h1
              style={{
                color: "#2E4F21",
                fontFamily: "'Work Sans', sans-serif",
                fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                fontWeight: "800",
                letterSpacing: "-0.03em",
                margin: 0,
              }}
            >
              {activeCategory.emoji} {activeCategory.label}
            </h1>
            <p
              style={{
                color: "rgba(46,79,33,0.7)",
                fontFamily: "'Work Sans', sans-serif",
                fontSize: "clamp(0.9rem, 1.8vw, 1rem)",
                lineHeight: "1.7",
                maxWidth: "600px",
                marginTop: "10px",
              }}
            >
              {activeCategory.description}
            </p>
          </div>
        </div>

        {/* Body: Sidebar + Content */}
        <div className="mx-auto px-6 md:px-12 py-10" style={{ maxWidth: "1280px" }}>
          <div className="flex flex-col md:flex-row gap-8">

            {/* ── LEFT SIDEBAR ── */}
            <aside
              className="w-full md:w-64 shrink-0 flex flex-col gap-2"
              style={{ alignSelf: "flex-start", position: "sticky", top: "89px" }}
            >
              {catalog.map((cat) => {
                const isActiveCat = cat.slug === activeCatSlug;
                return (
                  <div key={cat.slug}>
                    <button
                      onClick={() => handleCategoryChange(cat.slug)}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-150"
                      style={{
                        backgroundColor: isActiveCat ? "#2E4F21" : "transparent",
                        color: isActiveCat ? "#A0F1BD" : "rgba(46,79,33,0.75)",
                        fontFamily: "'Work Sans', sans-serif",
                        fontSize: "0.9rem",
                        fontWeight: isActiveCat ? "700" : "500",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      <span style={{ fontSize: "1.1rem" }}>{cat.emoji}</span>
                      {cat.label}
                    </button>

                    {isActiveCat && (
                      <div className="flex flex-col ml-4 mt-1 mb-2 gap-0.5">
                        {cat.items.map((item) => {
                          const isActiveItem = item.slug === activeItemSlug;
                          return (
                            <button
                              key={item.slug}
                              onClick={() => handleItemChange(item.slug)}
                              className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left transition-all duration-150"
                              style={{
                                backgroundColor: isActiveItem ? "rgba(160,241,189,0.35)" : "transparent",
                                color: isActiveItem ? "#2E4F21" : "rgba(46,79,33,0.55)",
                                fontFamily: "'Work Sans', sans-serif",
                                fontSize: "0.83rem",
                                fontWeight: isActiveItem ? "600" : "400",
                                borderTop: "none",
                                borderRight: "none",
                                borderBottom: "none",
                                borderLeft: isActiveItem ? "3px solid #2E4F21" : "3px solid transparent",
                                cursor: "pointer",
                              }}
                            >
                              {item.label}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Sell CTA in sidebar */}
              <div
                className="mt-4 rounded-2xl p-5 flex flex-col gap-3"
                style={{
                  backgroundColor: "#2E4F21",
                  border: "1px solid rgba(160,241,189,0.2)",
                }}
              >
                <p
                  style={{
                    color: "#A0F1BD",
                    fontFamily: "'Work Sans', sans-serif",
                    fontSize: "0.85rem",
                    fontWeight: "700",
                    margin: 0,
                  }}
                >
                  Ready to sell?
                </p>
                <p
                  style={{
                    color: "rgba(160,241,189,0.7)",
                    fontFamily: "'Work Sans', sans-serif",
                    fontSize: "0.78rem",
                    lineHeight: "1.6",
                    margin: 0,
                  }}
                >
                  Get the best price for your scrap materials today.
                </p>
                <Link href="/#contact-form">
                  <button
                    className="w-full py-2 rounded-full transition-opacity hover:opacity-80"
                    style={{
                      backgroundColor: "#A0F1BD",
                      color: "#2E4F21",
                      fontFamily: "'Work Sans', sans-serif",
                      fontSize: "0.82rem",
                      fontWeight: "700",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    Message Us!
                  </button>
                </Link>
              </div>
            </aside>

            {/* ── MAIN CONTENT ── */}
            <div className="flex-1 min-w-0">
              <div
                key={activeItem.slug}
                className="rounded-3xl overflow-hidden"
                style={{
                  backgroundColor: "#ffffff",
                  border: "1.5px solid rgba(46,79,33,0.10)",
                  boxShadow: "0 8px 40px rgba(46,79,33,0.08)",
                  animation: "fadeSlideIn 0.35s ease",
                }}
              >
                <style>{`
                  @keyframes fadeSlideIn {
                    from { opacity: 0; transform: translateY(16px); }
                    to   { opacity: 1; transform: translateY(0); }
                  }
                `}</style>

                {/* Product Image — only shown when image exists */}
                {hasImage && (
                  <div
                    className="w-full relative"
                    style={{
                      aspectRatio: "16/8",
                      backgroundColor: "#f0fdf4",
                      overflow: "hidden",
                    }}
                  >
                    <Image
                      src={activeItem.image!}
                      alt={activeItem.label}
                      fill
                      sizes="(max-width: 768px) 100vw, calc(100vw - 320px)"
                      className="object-cover"
                      priority
                    />
                    <div
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: "40%",
                        background: "linear-gradient(to top, rgba(255,255,255,0.9), transparent)",
                      }}
                    />
                    <div
                      className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full"
                      style={{
                        backgroundColor: "rgba(46,79,33,0.85)",
                        backdropFilter: "blur(8px)",
                      }}
                    >
                      <span style={{ fontSize: "0.9rem" }}>{activeCategory.emoji}</span>
                      <span
                        style={{
                          color: "#A0F1BD",
                          fontFamily: "'Work Sans', sans-serif",
                          fontSize: "0.75rem",
                          fontWeight: "600",
                          letterSpacing: "0.06em",
                        }}
                      >
                        {activeCategory.label}
                      </span>
                    </div>
                  </div>
                )}

                {/* Product Info */}
                <div className="p-8 md:p-10 flex flex-col gap-6">

                  {/* Category badge — only shown when no image */}
                  {!hasImage && (
                    <div className="flex items-center gap-2">
                      <span
                        className="flex items-center gap-2 px-3 py-1.5 rounded-full"
                        style={{
                          backgroundColor: "rgba(46,79,33,0.08)",
                          color: "#2E4F21",
                          fontFamily: "'Work Sans', sans-serif",
                          fontSize: "0.78rem",
                          fontWeight: "600",
                          letterSpacing: "0.05em",
                        }}
                      >
                        <span>{activeCategory.emoji}</span>
                        {activeCategory.label}
                      </span>
                    </div>
                  )}

                  <div>
                    <h2
                      style={{
                        color: "#2E4F21",
                        fontFamily: "'Work Sans', sans-serif",
                        fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
                        fontWeight: "800",
                        letterSpacing: "-0.02em",
                        margin: 0,
                      }}
                    >
                      {activeItem.label}
                    </h2>
                    <div
                      className="mt-2 rounded-full"
                      style={{ width: "48px", height: "4px", backgroundColor: "#A0F1BD" }}
                    />
                  </div>

                  <p
                    style={{
                      color: "rgba(46,79,33,0.75)",
                      fontFamily: "'Work Sans', sans-serif",
                      fontSize: "clamp(0.95rem, 1.6vw, 1.05rem)",
                      lineHeight: "1.85",
                      margin: 0,
                    }}
                  >
                    {activeItem.description}
                  </p>

                  {/* Why Recycle callout */}
                  <div
                    className="rounded-2xl p-5 flex gap-4"
                    style={{
                      backgroundColor: "#f0fdf4",
                      border: "1px solid rgba(160,241,189,0.5)",
                    }}
                  >
                    <span style={{ fontSize: "1.5rem", flexShrink: 0 }}>♻️</span>
                    <div>
                      <p
                        style={{
                          color: "#2E4F21",
                          fontFamily: "'Work Sans', sans-serif",
                          fontSize: "0.85rem",
                          fontWeight: "700",
                          margin: "0 0 4px 0",
                        }}
                      >
                        Why recycle with us?
                      </p>
                      <p
                        style={{
                          color: "rgba(46,79,33,0.7)",
                          fontFamily: "'Work Sans', sans-serif",
                          fontSize: "0.85rem",
                          lineHeight: "1.6",
                          margin: 0,
                        }}
                      >
                        We offer competitive market-based pricing, fast transactions, and
                        responsible processing. Whether you have a small load or a bulk
                        shipment, we're ready to serve you.
                      </p>
                    </div>
                  </div>

                  {/* Other items in category */}
                  <div>
                    <p
                      style={{
                        color: "rgba(46,79,33,0.45)",
                        fontFamily: "'Work Sans', sans-serif",
                        fontSize: "0.7rem",
                        fontWeight: "700",
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        marginBottom: "12px",
                      }}
                    >
                      Also in {activeCategory.label}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {activeCategory.items
                        .filter((it) => it.slug !== activeItem.slug)
                        .map((it) => (
                          <button
                            key={it.slug}
                            onClick={() => handleItemChange(it.slug)}
                            className="px-4 py-2 rounded-full transition-all duration-150"
                            style={{
                              backgroundColor: "rgba(46,79,33,0.06)",
                              color: "#2E4F21",
                              fontFamily: "'Work Sans', sans-serif",
                              fontSize: "0.82rem",
                              fontWeight: "500",
                              border: "1px solid rgba(46,79,33,0.12)",
                              cursor: "pointer",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = "#2E4F21";
                              e.currentTarget.style.color = "#A0F1BD";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = "rgba(46,79,33,0.06)";
                              e.currentTarget.style.color = "#2E4F21";
                            }}
                          >
                            {it.label}
                          </button>
                        ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <Link href="/#contact-form" className="flex-1">
                      <button
                        className="w-full py-3 rounded-full font-semibold transition-all duration-200 hover:opacity-90 hover:scale-[1.02] active:scale-95"
                        style={{
                          backgroundColor: "#2E4F21",
                          color: "#F5F5F0",
                          fontFamily: "'Work Sans', sans-serif",
                          fontSize: "16px",
                          border: "none",
                          cursor: "pointer",
                        }}
                      >
                        Sell Your {activeItem.label} Now
                      </button>
                    </Link>
                    <Link href="tel:09629305439" className="flex-1">
                      <button
                        className="w-full py-3 rounded-full font-semibold transition-all duration-200 hover:scale-[1.02] active:scale-95"
                        style={{
                          backgroundColor: "transparent",
                          color: "#2E4F21",
                          fontFamily: "'Work Sans', sans-serif",
                          fontSize: "16px",
                          border: "2px solid #2E4F21",
                          cursor: "pointer",
                        }}
                      >
                        📞 Call Us
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
