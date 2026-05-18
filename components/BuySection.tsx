"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

type Product = {
  name: string;
  image: string;
  tag: string;
  description: string;
};

type Category = {
  label: string;
  products: Product[];
};

type FormState = {
  fullName: string;
  email: string;
  phoneNumber: string;
  address: string;
  message: string;
  consent: boolean;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

// ─── Data ─────────────────────────────────────────────────────────────────────

const categories: Category[] = [
  {
    label: "Class B Roofing Materials",
    products: [
      {
        name: "Galvanized Iron (GI) Sheets",
        image: "/galvanized.png",
        tag: "Thickness: 0.2 mm / 0.4 mm / 0.5 mm | Length: 6, 8, 10, 12 ft",
        description:
          "Galvanized iron sheets are coated for rust resistance, ideal for roofing in all weather conditions. We sell them in multiple thicknesses and lengths to fit any project size.",
      },
      {
        name: "Galvalume Sheets",
        image: "/galvalume.png",
        tag: "Thickness: 0.2 mm / 0.4 mm / 0.5 mm | Length: 6, 8, 10, 12 ft",
        description:
          "Galvalume combines steel with aluminum-zinc coating for superior corrosion resistance and longevity. Available in standard sizes perfect for residential and commercial roofing.",
      },
      {
        name: "Black Iron (BI) C-Purlins",
        image: "/purlins.png",
        tag: "Structural framing for roofing systems",
        description:
          "Black iron C-purlins are essential structural framing members used to support roofing sheets. Strong, cost-effective, and ready for your next construction project.",
      },
    ],
  },
  {
    label: "Hardware Materials",
    products: [
      {
        name: "Steel Tubes",
        image: "/steeltubes.png",
        tag: "Various sizes available",
        description:
          "Versatile steel tubes suitable for framing, fabrication, and structural applications. Available in various sizes to match your specific build requirements.",
      },
      {
        name: "Angle Bars",
        image: "/angel bars.png",
        tag: "For structural & fabrication use",
        description:
          "Angle bars provide strong corner and edge support for structural and fabrication work. We carry multiple sizes for both light and heavy-duty applications.",
      },
      {
        name: "C-Runner",
        image: "/c runner.png",
        tag: "Light gauge steel framing",
        description:
          "Light gauge steel C-runners are used for ceiling and wall framing systems. Lightweight yet strong, ideal for interior construction and partition work.",
      },
    ],
  },
  {
    label: "Others",
    products: [
      {
        name: "Plastic Containers",
        image: "/others.png",
        tag: "Various sizes & colors available",
        description:
          "Durable pre-owned plastic containers available in various sizes and colors. Great for storage, industrial use, or everyday household needs.",
      },
      {
        name: "PVC Doors",
        image: "/pvcdoors.png",
        tag: "Lightweight & durable pre-owned doors",
        description:
          "Lightweight and moisture-resistant pre-owned PVC doors perfect for bathrooms and utility areas. A budget-friendly option without compromising on quality.",
      },
    ],
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const PH_PHONE_REGEX = /^(?:\+63|0)?9\d{9}$/;

function buildMessage(userMessage: string, productName: string): string {
  return `Inquiry about: ${productName}\n\n${userMessage}`;
}

function validateForm(form: FormState, productName: string): FormErrors {
  const errors: FormErrors = {};
  if (!form.fullName.trim()) errors.fullName = "Full name is required.";
  if (!form.email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = "Invalid email address.";
  }
  if (!form.phoneNumber.trim()) {
    errors.phoneNumber = "Phone number is required.";
  } else if (!PH_PHONE_REGEX.test(form.phoneNumber.trim())) {
    errors.phoneNumber = "Enter a valid PH number (e.g. 09171234567).";
  }
  if (!form.address.trim()) errors.address = "Address is required.";
  const full = buildMessage(form.message, productName);
  if (!form.message.trim()) {
    errors.message = "Message is required.";
  } else if (full.length < 100) {
    const rem = 100 - full.length;
    errors.message = `Add ${rem} more character${rem === 1 ? "" : "s"}.`;
  }
  if (!form.consent) errors.consent = "You must accept the terms to proceed.";
  return errors;
}

// ─── useInView ────────────────────────────────────────────────────────────────

function useInView(threshold = 0.15) {
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

// ─── Shared input styles ──────────────────────────────────────────────────────

const baseInput: React.CSSProperties = {
  borderWidth: "1.5px",
  borderStyle: "solid",
  borderColor: "rgba(46,79,33,0.18)",
  backgroundColor: "#fff",
  fontFamily: "'Work Sans', sans-serif",
  fontSize: "0.9rem",
  color: "#2E4F21",
  width: "100%",
  outline: "none",
  borderRadius: "12px",
  padding: "12px 16px",
  transition: "border-color 0.2s ease",
  boxSizing: "border-box",
};

const errorInput: React.CSSProperties = { ...baseInput, borderColor: "#c0392b" };

// ─── Field wrapper ────────────────────────────────────────────────────────────

function Field({
  label,
  required,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      <label
        style={{
          color: "#2E4F21",
          fontFamily: "'Work Sans', sans-serif",
          fontSize: "0.82rem",
          fontWeight: 600,
          letterSpacing: "0.04em",
        }}
      >
        {label} {required && <span style={{ color: "#e05555" }}>*</span>}
      </label>
      {children}
      {error && (
        <p style={{ color: "#c0392b", fontFamily: "'Work Sans', sans-serif", fontSize: "0.75rem", margin: 0 }}>
          {error}
        </p>
      )}
    </div>
  );
}

// ─── Inquiry Modal ────────────────────────────────────────────────────────────

function InquiryModal({ product, onClose }: { product: Product | null; onClose: () => void }) {
  const empty: FormState = { fullName: "", email: "", phoneNumber: "", address: "", message: "", consent: false };
  const [form, setForm] = useState<FormState>(empty);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  useEffect(() => {
    setForm(empty);
    setErrors({});
    setSubmitted(false);
    setServerError("");
  }, [product]);

  useEffect(() => {
    document.body.style.overflow = product ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [product]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!product) return null;

  const set = (field: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = e.target.type === "checkbox" ? (e.target as HTMLInputElement).checked : e.target.value;
      setForm((p) => ({ ...p, [field]: value }));
      if (errors[field]) setErrors((p) => ({ ...p, [field]: undefined }));
    };

  const handleSubmit = async () => {
    const errs = validateForm(form, product.name);
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setLoading(true);
    setServerError("");
    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: form.fullName.trim(),
          email: form.email.trim(),
          phoneNumber: form.phoneNumber.trim(),
          address: form.address.trim(),
          inquiryType: "buy",
          message: buildMessage(form.message.trim(), product.name),
          imageUrl: null,
          consent: form.consent,
        }),
      });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        setServerError(d?.error || "Something went wrong. Please try again.");
        return;
      }
      setSubmitted(true);
    } catch {
      setServerError("Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  const charCount = buildMessage(form.message, product.name).length;
  const charOk = charCount >= 100;

  return (
    /* Backdrop */
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 50,
        backgroundColor: "rgba(10,25,10,0.72)",
        backdropFilter: "blur(4px)",
        display: "flex",
        alignItems: "flex-end",        /* mobile: sheet from bottom */
        justifyContent: "center",
        padding: 0,
      }}
    >
      {/* Panel */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          width: "100%",
          maxHeight: "93dvh",
          backgroundColor: "#F7FFF9",
          borderRadius: "24px 24px 0 0",
          boxShadow: "0 -8px 48px rgba(0,0,0,0.28)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* ── STICKY HEADER (always visible) ── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "16px 20px",
            backgroundColor: "#2E4F21",
            flexShrink: 0,
          }}
        >
          {/* Drag handle pill (mobile feel) */}
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <p style={{ color: "rgba(160,241,189,0.65)", fontFamily: "'Work Sans', sans-serif", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", margin: 0 }}>
              Inquire about
            </p>
            <h4 style={{ color: "#A0F1BD", fontFamily: "'Work Sans', sans-serif", fontSize: "1rem", fontWeight: 700, margin: 0, lineHeight: 1.3 }}>
              {product.name}
            </h4>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            style={{
              width: 36, height: 36, borderRadius: "50%",
              backgroundColor: "rgba(160,241,189,0.15)",
              border: "none", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#A0F1BD", flexShrink: 0,
            }}
          >
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
              <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* ── SCROLLABLE BODY ── */}
        <div style={{ overflowY: "auto", overscrollBehavior: "contain", flex: 1 }}>

          {submitted ? (
            /* Success state */
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16, padding: "56px 24px", textAlign: "center" }}>
              <div style={{ width: 64, height: 64, borderRadius: "50%", backgroundColor: "rgba(160,241,189,0.25)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.8rem" }}>✅</div>
              <h4 style={{ color: "#2E4F21", fontFamily: "'Work Sans', sans-serif", fontSize: "1.15rem", fontWeight: 700, margin: 0 }}>Inquiry Sent!</h4>
              <p style={{ color: "#5a5a5a", fontFamily: "'Work Sans', sans-serif", fontSize: "0.9rem", lineHeight: 1.7, maxWidth: 280, margin: 0 }}>
                Thank you, <strong>{form.fullName}</strong>! We'll reach out shortly about <strong>{product.name}</strong>.
              </p>
              <button
                onClick={onClose}
                style={{
                  marginTop: 8, padding: "10px 28px", borderRadius: 999,
                  backgroundColor: "#2E4F21", color: "#A0F1BD",
                  fontFamily: "'Work Sans', sans-serif", fontSize: "0.9rem", fontWeight: 600,
                  border: "none", cursor: "pointer",
                }}
              >
                Close
              </button>
            </div>
          ) : (
            <>
              {/* Product image banner */}
              <div style={{ position: "relative", width: "100%", height: 200, flexShrink: 0 }}>
                <Image src={product.image} alt={product.name} fill style={{ objectFit: "cover" }} sizes="100vw" />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(26,46,19,0.7) 0%, transparent 60%)" }} />
              </div>

              {/* Product info */}
              <div style={{ padding: "16px 20px 0", backgroundColor: "#fff", display: "flex", flexDirection: "column", gap: 8 }}>
                <span style={{
                  alignSelf: "flex-start", padding: "3px 12px", borderRadius: 999,
                  backgroundColor: "rgba(160,241,189,0.3)", color: "#2E4F21",
                  fontFamily: "'Work Sans', sans-serif", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.04em",
                }}>
                  {product.tag}
                </span>
                <h3 style={{ color: "#2E4F21", fontFamily: "'Work Sans', sans-serif", fontSize: "1.05rem", fontWeight: 700, margin: 0, lineHeight: 1.3 }}>
                  {product.name}
                </h3>
                <p style={{ color: "#4a4a4a", fontFamily: "'Work Sans', sans-serif", fontSize: "0.86rem", lineHeight: 1.75, margin: 0 }}>
                  {product.description}
                </p>
              </div>

              {/* Divider */}
              <div style={{ height: 1, backgroundColor: "rgba(46,79,33,0.10)", margin: "16px 0" }} />

              {/* Form */}
              <div style={{ padding: "0 20px 32px", display: "flex", flexDirection: "column", gap: 16 }}>
                <p style={{ color: "#5a5a5a", fontFamily: "'Work Sans', sans-serif", fontSize: "0.85rem", lineHeight: 1.7, margin: 0 }}>
                  Fill in your details and we'll reach out with pricing and availability.
                </p>

                <Field label="Full Name" required error={errors.fullName}>
                  <input
                    type="text"
                    placeholder="e.g. Juan dela Cruz"
                    value={form.fullName}
                    onChange={set("fullName")}
                    style={errors.fullName ? errorInput : baseInput}
                    onFocus={(e) => { if (!errors.fullName) e.target.style.borderColor = "#2E4F21"; }}
                    onBlur={(e) => { if (!errors.fullName) e.target.style.borderColor = "rgba(46,79,33,0.18)"; }}
                  />
                </Field>

                <Field label="Email Address" required error={errors.email}>
                  <input
                    type="email"
                    placeholder="e.g. juan@email.com"
                    value={form.email}
                    onChange={set("email")}
                    style={errors.email ? errorInput : baseInput}
                    onFocus={(e) => { if (!errors.email) e.target.style.borderColor = "#2E4F21"; }}
                    onBlur={(e) => { if (!errors.email) e.target.style.borderColor = "rgba(46,79,33,0.18)"; }}
                  />
                </Field>

                <Field label="Phone Number" required error={errors.phoneNumber}>
                  <input
                    type="tel"
                    placeholder="e.g. 09171234567"
                    value={form.phoneNumber}
                    onChange={set("phoneNumber")}
                    style={errors.phoneNumber ? errorInput : baseInput}
                    onFocus={(e) => { if (!errors.phoneNumber) e.target.style.borderColor = "#2E4F21"; }}
                    onBlur={(e) => { if (!errors.phoneNumber) e.target.style.borderColor = "rgba(46,79,33,0.18)"; }}
                  />
                </Field>

                <Field label="Address" required error={errors.address}>
                  <input
                    type="text"
                    placeholder="e.g. Mandaue City, Cebu"
                    value={form.address}
                    onChange={set("address")}
                    style={errors.address ? errorInput : baseInput}
                    onFocus={(e) => { if (!errors.address) e.target.style.borderColor = "#2E4F21"; }}
                    onBlur={(e) => { if (!errors.address) e.target.style.borderColor = "rgba(46,79,33,0.18)"; }}
                  />
                </Field>

                <Field label="Message" required error={errors.message}>
                  <textarea
                    placeholder={`Tell us what you need — quantity, size, or any questions about ${product.name}...`}
                    rows={4}
                    value={form.message}
                    onChange={set("message")}
                    style={{ ...(errors.message ? errorInput : baseInput), resize: "none" }}
                    onFocus={(e) => { if (!errors.message) e.target.style.borderColor = "#2E4F21"; }}
                    onBlur={(e) => { if (!errors.message) e.target.style.borderColor = "rgba(46,79,33,0.18)"; }}
                  />
                  <p style={{ fontFamily: "'Work Sans', sans-serif", fontSize: "0.72rem", textAlign: "right", color: charOk ? "rgba(46,79,33,0.45)" : "#c0392b", margin: "4px 0 0", transition: "color 0.2s" }}>
                    {charCount}/100 {charOk ? "✓" : "min"}
                  </p>
                </Field>

                {/* Consent */}
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <label style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer" }}>
                    <input
                      type="checkbox"
                      checked={form.consent}
                      onChange={(e) => {
                        setForm((p) => ({ ...p, consent: e.target.checked }));
                        if (errors.consent) setErrors((p) => ({ ...p, consent: undefined }));
                      }}
                      style={{ marginTop: 3, accentColor: "#2E4F21", width: 15, height: 15, flexShrink: 0 }}
                    />
                    <span style={{ color: "#4a4a4a", fontFamily: "'Work Sans', sans-serif", fontSize: "0.78rem", lineHeight: 1.6 }}>
                      I agree to be contacted by Cebu Scrap Recycling Corporation regarding my inquiry. My information will not be shared with third parties.
                    </span>
                  </label>
                  {errors.consent && (
                    <p style={{ color: "#c0392b", fontFamily: "'Work Sans', sans-serif", fontSize: "0.75rem", margin: 0 }}>{errors.consent}</p>
                  )}
                </div>

                {/* Server error */}
                {serverError && (
                  <p style={{ color: "#c0392b", fontFamily: "'Work Sans', sans-serif", fontSize: "0.82rem", lineHeight: 1.5, padding: "10px 14px", borderRadius: 10, backgroundColor: "rgba(192,57,43,0.08)", margin: 0 }}>
                    {serverError}
                  </p>
                )}

                {/* Submit button */}
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  style={{
                    width: "100%", padding: "14px", borderRadius: 999,
                    backgroundColor: loading ? "rgba(46,79,33,0.6)" : "#2E4F21",
                    color: "#A0F1BD",
                    fontFamily: "'Work Sans', sans-serif", fontSize: "1rem", fontWeight: 600,
                    border: "none", cursor: loading ? "not-allowed" : "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                    transition: "background-color 0.2s, transform 0.15s",
                    letterSpacing: "0.02em",
                  }}
                  onMouseEnter={(e) => { if (!loading) (e.currentTarget as HTMLButtonElement).style.opacity = "0.88"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = "1"; }}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin" width="17" height="17" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="31.4" strokeDashoffset="10" />
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Inquiry
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M2 8h12M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </>
                  )}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── ProductCard ──────────────────────────────────────────────────────────────

function ProductCard({ name, image, tag, description, index, onClick }: Product & { index: number; onClick: () => void }) {
  const { ref, inView } = useInView(0.05);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      className="flex flex-col rounded-2xl overflow-hidden cursor-pointer"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? (hovered ? "translateY(-6px)" : "translateY(0)") : "translateY(32px)",
        transition: `opacity 0.6s ease ${index * 80}ms, transform 0.3s ease, box-shadow 0.3s ease`,
        boxShadow: hovered ? "0 20px 48px rgba(46,79,33,0.22)" : "0 4px 20px rgba(46,79,33,0.10)",
        border: "1.5px solid rgba(46,79,33,0.10)",
        backgroundColor: "#fff",
      }}
    >
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: "4/3" }}>
        <Image
          src={image} alt={name} fill
          className="object-cover transition-transform duration-500"
          style={{ transform: hovered ? "scale(1.07)" : "scale(1)" }}
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div
          className="absolute inset-0 transition-opacity duration-300"
          style={{ background: "linear-gradient(to top, rgba(26,46,19,0.55) 0%, transparent 55%)", opacity: hovered ? 1 : 0.5 }}
        />
      </div>
      <div className="flex flex-col gap-2 p-5">
        <h4 style={{ color: "#2E4F21", fontFamily: "'Work Sans', sans-serif", fontSize: "1rem", fontWeight: 700, letterSpacing: "-0.01em" }}>
          {name}
        </h4>
        <p style={{ color: "#5a5a5a", fontFamily: "'Work Sans', sans-serif", fontSize: "0.82rem", fontWeight: 400, lineHeight: "1.6" }}>
          {tag}
        </p>
        <div
          className="flex items-center gap-1 mt-1"
          style={{ color: hovered ? "#2E4F21" : "rgba(46,79,33,0.35)", fontFamily: "'Work Sans', sans-serif", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", transition: "color 0.3s ease" }}
        >
          Inquire
          <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
            <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </div>
  );
}

// ─── BuySection ───────────────────────────────────────────────────────────────

export default function BuySection() {
  const [activeTab, setActiveTab] = useState(0);
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const { ref: headingRef, inView: headingVisible } = useInView(0.1);
  const { ref: tabRef, inView: tabVisible } = useInView(0.1);

  return (
    <>
      <section className="w-full py-24 px-6 md:px-12" style={{ backgroundColor: "#F7FEF9" }}>
        <div className="mx-auto flex flex-col gap-12" style={{ maxWidth: "1280px" }}>

          {/* Heading */}
          <div
            ref={headingRef}
            className="flex flex-col items-center gap-3 text-center"
            style={{ opacity: headingVisible ? 1 : 0, transform: headingVisible ? "translateY(0)" : "translateY(32px)", transition: "opacity 0.7s ease, transform 0.7s ease" }}
          >
            <h2 style={{ color: "#2E4F21", fontFamily: "'Work Sans', sans-serif", fontSize: "clamp(2rem, 5vw, 3.2rem)", fontWeight: 700, letterSpacing: "-0.02em" }}>
              Buy From Us
            </h2>
            <div className="rounded-full" style={{ width: 60, height: 4, backgroundColor: "#A0F1BD" }} />
            <p style={{ color: "#3a3a3a", fontFamily: "'Work Sans', sans-serif", fontSize: "clamp(0.95rem, 1.8vw, 1.1rem)", fontWeight: 400, maxWidth: 520, lineHeight: "1.7" }}>
              Quality, affordable recycled materials ready for reuse — perfect for construction, repairs, and everyday needs.
            </p>
          </div>

          {/* Tabs */}
          <div
            ref={tabRef}
            className="flex flex-wrap justify-center gap-3"
            style={{ opacity: tabVisible ? 1 : 0, transform: tabVisible ? "translateY(0)" : "translateY(20px)", transition: "opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s" }}
          >
            {categories.map((cat, i) => (
              <button
                key={cat.label}
                onClick={() => setActiveTab(i)}
                className="px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-200"
                style={{
                  fontFamily: "'Work Sans', sans-serif",
                  backgroundColor: activeTab === i ? "#2E4F21" : "transparent",
                  color: activeTab === i ? "#F5F5F0" : "#2E4F21",
                  border: "2px solid #2E4F21",
                  letterSpacing: "0.01em",
                  boxShadow: activeTab === i ? "0 4px 16px rgba(46,79,33,0.25)" : "none",
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Category label */}
          <div className="flex flex-col gap-2">
            <h3 style={{ color: "#2E4F21", fontFamily: "'Work Sans', sans-serif", fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)", fontWeight: 700, letterSpacing: "-0.01em" }}>
              {categories[activeTab].label}
            </h3>
            <div style={{ width: 40, height: 3, borderRadius: 99, backgroundColor: "#A0F1BD" }} />
          </div>

          {/* Product Grid */}
          <div key={activeTab} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories[activeTab].products.map((product, i) => (
              <ProductCard key={product.name} {...product} index={i} onClick={() => setActiveProduct(product)} />
            ))}
          </div>

          {/* CTA */}
          <div className="flex justify-center">
            <a href="/#contact-form">
              <button
                className="px-10 py-3 rounded-full font-semibold transition-all duration-200 hover:opacity-90 hover:scale-105 active:scale-95"
                style={{ backgroundColor: "#2E4F21", color: "#F5F5F0", fontFamily: "'Work Sans', sans-serif", fontSize: "16px" }}
              >
                Buy Materials Now
              </button>
            </a>
          </div>
        </div>
      </section>

      <InquiryModal product={activeProduct} onClose={() => setActiveProduct(null)} />
    </>
  );
}
