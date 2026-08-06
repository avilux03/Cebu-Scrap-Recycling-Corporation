"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { buyCatalog } from "@/lib/buyCatalog";

export default function BuyProductPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const categorySlug = params?.category as string;
  const itemSlugFromQuery = searchParams?.get("item");

  const category = buyCatalog.find((c) => c.slug === categorySlug) ?? buyCatalog[0];
  const [activeCatSlug, setActiveCatSlug] = useState(category.slug);
  const [activeItemSlug, setActiveItemSlug] = useState(
    itemSlugFromQuery ?? category.items[0].slug
  );

  const activeCategory = buyCatalog.find((c) => c.slug === activeCatSlug) ?? buyCatalog[0];
  const activeItem =
    activeCategory.items.find((it) => it.slug === activeItemSlug) ??
    activeCategory.items[0];

  const handleCategoryChange = (slug: string) => {
    const cat = buyCatalog.find((c) => c.slug === slug)!;
    setActiveCatSlug(slug);
    setActiveItemSlug(cat.items[0].slug);
    router.replace(`/buy/${slug}`, { scroll: false });
  };

  const handleItemChange = (itemSlug: string) => {
    setActiveItemSlug(itemSlug);
    router.replace(`/buy/${activeCatSlug}?item=${itemSlug}`, { scroll: false });
  };

  return (
    <>
      <Navbar />

      <main style={{ backgroundColor: "#f7fef9", minHeight: "100vh" }}>
        {/* Hero Banner */}
        <div
          style={{ backgroundColor: "#A0F1BD", borderBottom: "1px solid rgba(46,79,33,0.12)" }}
          className="px-6 md:px-12 py-10"
        >
          <div className="mx-auto" style={{ maxWidth: "1280px" }}>
            <div
              className="flex items-center gap-2 mb-4"
              style={{ fontFamily: "'Work Sans', sans-serif", fontSize: "0.8rem", color: "rgba(46,79,33,0.55)" }}
            >
              <Link href="/" style={{ color: "rgba(46,79,33,0.55)", textDecoration: "none" }}>
                Home
              </Link>
              <span>/</span>
              <span style={{ color: "#2E4F21", fontWeight: 600 }}>
                {activeCategory.emoji} {activeCategory.label}
              </span>
            </div>

            <h1
              style={{
                color: "#2E4F21",
                fontFamily: "'Work Sans', sans-serif",
                fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                fontWeight: 800,
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

            {/* ── PRODUCT DETAIL — order 1 on mobile, right column on desktop ── */}
            <div className="flex-1 min-w-0 order-1 md:order-2">
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

                {/* Product Image */}
                <div className="w-full relative" style={{ aspectRatio: "16/8", backgroundColor: "#f0fdf4", overflow: "hidden" }}>
                  <Image
                    src={activeItem.image}
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
                    style={{ backgroundColor: "rgba(46,79,33,0.85)", backdropFilter: "blur(8px)" }}
                  >
                    <span style={{ fontSize: "0.9rem" }}>{activeCategory.emoji}</span>
                    <span
                      style={{
                        color: "#A0F1BD",
                        fontFamily: "'Work Sans', sans-serif",
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        letterSpacing: "0.06em",
                      }}
                    >
                      {activeCategory.label}
                    </span>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-8 md:p-10 flex flex-col gap-6">
                  <div>
                    <h2
                      style={{
                        color: "#2E4F21",
                        fontFamily: "'Work Sans', sans-serif",
                        fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
                        fontWeight: 800,
                        letterSpacing: "-0.02em",
                        margin: 0,
                      }}
                    >
                      {activeItem.label}
                    </h2>
                    <div className="mt-2 rounded-full" style={{ width: "48px", height: "4px", backgroundColor: "#A0F1BD" }} />
                  </div>

                  {/* Tag badge */}
                  <div className="flex items-center gap-2">
                    <span
                      className="px-3 py-1.5 rounded-full"
                      style={{
                        backgroundColor: "rgba(46,79,33,0.08)",
                        color: "#2E4F21",
                        fontFamily: "'Work Sans', sans-serif",
                        fontSize: "0.78rem",
                        fontWeight: 600,
                      }}
                    >
                      {activeItem.tag}
                    </span>
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

                  {/* Other items in category — desktop only, hidden on mobile since full list is below */}
                  <div className="hidden md:block">
                    <p
                      style={{
                        color: "rgba(46,79,33,0.45)",
                        fontFamily: "'Work Sans', sans-serif",
                        fontSize: "0.7rem",
                        fontWeight: 700,
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
                              fontWeight: 500,
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

                  {/* CTA — Buy Now + Call Us */}
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
                        Buy {activeItem.label} Now
                      </button>
                    </Link>
                    <Link href="tel:0948 055 8001" className="flex-1">
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
                       Call Us 0948 055 8001
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* ── MESSAGE US — order 2 on mobile only (hidden on desktop, shown inside sidebar there) ── */}
            <div
              className="order-2 md:hidden rounded-2xl p-5 flex flex-col gap-3"
              style={{ backgroundColor: "#2E4F21", border: "1px solid rgba(160,241,189,0.2)" }}
            >
              <p style={{ color: "#A0F1BD", fontFamily: "'Work Sans', sans-serif", fontSize: "0.85rem", fontWeight: 700, margin: 0 }}>
                Ready to buy?
              </p>
              <p style={{ color: "rgba(160,241,189,0.7)", fontFamily: "'Work Sans', sans-serif", fontSize: "0.78rem", lineHeight: "1.6", margin: 0 }}>
                Get pricing and availability for your project today.
              </p>
              <Link href="/#contact-form">
                <button
                  className="w-full py-2 rounded-full transition-opacity hover:opacity-80"
                  style={{
                    backgroundColor: "#A0F1BD",
                    color: "#2E4F21",
                    fontFamily: "'Work Sans', sans-serif",
                    fontSize: "0.82rem",
                    fontWeight: 700,
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Message Us!
                </button>
              </Link>
            </div>

            {/* ── LEFT SIDEBAR — order 3 on mobile, left column on desktop ── */}
            <aside
              className="w-full md:w-64 shrink-0 flex flex-col gap-2 order-3 md:order-1"
              style={{ alignSelf: "flex-start", position: "sticky", top: "89px" }}
            >
              {buyCatalog.map((cat) => {
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
                        fontWeight: isActiveCat ? 700 : 500,
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
                                fontWeight: isActiveItem ? 600 : 400,
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

              {/* Message Us box — desktop only inside sidebar (mobile version rendered separately above) */}
              <div
                className="mt-4 rounded-2xl p-5 hidden md:flex flex-col gap-3"
                style={{ backgroundColor: "#2E4F21", border: "1px solid rgba(160,241,189,0.2)" }}
              >
                <p style={{ color: "#A0F1BD", fontFamily: "'Work Sans', sans-serif", fontSize: "0.85rem", fontWeight: 700, margin: 0 }}>
                  Ready to buy?
                </p>
                <p style={{ color: "rgba(160,241,189,0.7)", fontFamily: "'Work Sans', sans-serif", fontSize: "0.78rem", lineHeight: "1.6", margin: 0 }}>
                  Get pricing and availability for your project today.
                </p>
                <Link href="/#contact-form">
                  <button
                    className="w-full py-2 rounded-full transition-opacity hover:opacity-80"
                    style={{
                      backgroundColor: "#A0F1BD",
                      color: "#2E4F21",
                      fontFamily: "'Work Sans', sans-serif",
                      fontSize: "0.82rem",
                      fontWeight: 700,
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    Message Us!
                  </button>
                </Link>
              </div>
            </aside>

          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}