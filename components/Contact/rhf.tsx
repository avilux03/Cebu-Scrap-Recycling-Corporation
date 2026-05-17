"use client"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { contactSchema } from "./schema"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
)

type ContactFormData = {
  fullName: string
  email: string
  phoneNumber: string
  address: string
  inquiryType: "sell" | "buy"
  message: string
  imageUrl?: string | null
  consent: boolean
}

type SubmitStatus = "idle" | "success" | "error"

export default function ContactFormRHF() {
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle")
  const [errorMessage, setErrorMessage] = useState<string>("")

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: yupResolver(contactSchema) as any,
  })

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 5 * 1024 * 1024) {
      setUploadError("Image must be under 5MB")
      return
    }
    setUploadError(null)
    setImageFile(file)
    setImagePreview(URL.createObjectURL(file))
  }

  const uploadImage = async (file: File): Promise<string | null> => {
    const ext = file.name.split(".").pop()
    const fileName = `inquiries/${Date.now()}.${ext}`
    const { error } = await supabase.storage
      .from("contact-images")
      .upload(fileName, file, { contentType: file.type })
    if (error) {
      console.error("Supabase upload error:", error)
      return null
    }
    const { data } = supabase.storage.from("contact-images").getPublicUrl(fileName)
    return data.publicUrl
  }

  const onSubmit = async (data: ContactFormData) => {
    // Clear any previous status
    setSubmitStatus("idle")
    setErrorMessage("")

    try {
      let imageUrl: string | null = null
      if (imageFile) {
        imageUrl = await uploadImage(imageFile)
        if (!imageUrl) throw new Error("Image upload failed. Please try again.")
      }

      const res = await fetch("/api/contact/saveContactInformation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, imageUrl }),
      })

      if (!res.ok) throw new Error("Our server couldn't process your message. Please try again shortly.")

      setSubmitStatus("success")
      reset()
      setImageFile(null)
      setImagePreview(null)

      // Auto-dismiss success after 8 seconds
      setTimeout(() => setSubmitStatus("idle"), 8000)
    } catch (err: any) {
      setSubmitStatus("error")
      setErrorMessage(err?.message || "Something went wrong. Please try again.")
    }
  }

  return (
    <section
      className="w-full py-16 md:py-24 px-4 sm:px-6 md:px-12"
      style={{ backgroundColor: "#F0FAF4" }}
    >
      <div className="mx-auto flex flex-col items-center gap-10" style={{ maxWidth: "680px" }}>

        {/* Heading */}
        <div className="flex flex-col items-center gap-3 text-center">
          <h2
            style={{
              color: "#2E4F21",
              fontFamily: "'Work Sans', sans-serif",
              fontSize: "clamp(1.8rem, 6vw, 3rem)",
              fontWeight: "800",
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
            }}
          >
            Get In Touch With Us!
          </h2>
          <div
            className="rounded-full"
            style={{ width: "50px", height: "4px", backgroundColor: "#2E4F21" }}
          />
        </div>

        {/* ── MODAL OVERLAY ── */}
        {submitStatus !== "idle" && (
          <>
            <style>{`
              @keyframes backdropIn {
                from { opacity: 0; }
                to   { opacity: 1; }
              }
              @keyframes modalPop {
                from { opacity: 0; transform: scale(0.92) translateY(16px); }
                to   { opacity: 1; transform: scale(1) translateY(0); }
              }
            `}</style>
            <div
              role="dialog"
              aria-modal="true"
              onClick={() => setSubmitStatus("idle")}
              style={{
                position: "fixed",
                inset: 0,
                zIndex: 9999,
                backgroundColor: "rgba(0,0,0,0.55)",
                backdropFilter: "blur(4px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "24px",
                animation: "backdropIn 0.25s ease",
              }}
            >
              <div
                onClick={e => e.stopPropagation()}
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: "24px",
                  padding: "40px 36px",
                  maxWidth: "420px",
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  gap: "16px",
                  boxShadow: "0 24px 64px rgba(0,0,0,0.2)",
                  animation: "modalPop 0.3s cubic-bezier(0.34,1.56,0.64,1)",
                }}
              >
                {submitStatus === "success" ? (
                  <>
                    {/* Success icon */}
                    <div style={{
                      width: "72px",
                      height: "72px",
                      borderRadius: "50%",
                      backgroundColor: "#A0F1BD",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}>
                      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#2E4F21" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <h3 style={{
                      fontFamily: "'Work Sans', sans-serif",
                      fontWeight: "800",
                      fontSize: "1.4rem",
                      color: "#2E4F21",
                      margin: 0,
                      letterSpacing: "-0.02em",
                    }}>
                      Message Sent!
                    </h3>
                    <p style={{
                      fontFamily: "'Work Sans', sans-serif",
                      fontSize: "0.95rem",
                      color: "#4b5563",
                      lineHeight: "1.6",
                      margin: 0,
                    }}>
                      Thanks for reaching out! We've received your inquiry and will get back to you shortly.
                    </p>
                    <button
                      type="button"
                      onClick={() => setSubmitStatus("idle")}
                      style={{
                        marginTop: "8px",
                        backgroundColor: "#2E4F21",
                        color: "#A0F1BD",
                        fontFamily: "'Work Sans', sans-serif",
                        fontWeight: "700",
                        fontSize: "0.95rem",
                        padding: "12px 32px",
                        borderRadius: "999px",
                        border: "none",
                        cursor: "pointer",
                        letterSpacing: "-0.01em",
                      }}
                    >
                      Done
                    </button>
                  </>
                ) : (
                  <>
                    {/* Error icon */}
                    <div style={{
                      width: "72px",
                      height: "72px",
                      borderRadius: "50%",
                      backgroundColor: "#fee2e2",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}>
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </div>
                    <h3 style={{
                      fontFamily: "'Work Sans', sans-serif",
                      fontWeight: "800",
                      fontSize: "1.4rem",
                      color: "#7f1d1d",
                      margin: 0,
                      letterSpacing: "-0.02em",
                    }}>
                      Submission Failed
                    </h3>
                    <p style={{
                      fontFamily: "'Work Sans', sans-serif",
                      fontSize: "0.95rem",
                      color: "#4b5563",
                      lineHeight: "1.6",
                      margin: 0,
                    }}>
                      {errorMessage}
                    </p>
                    <button
                      type="button"
                      onClick={() => setSubmitStatus("idle")}
                      style={{
                        marginTop: "8px",
                        backgroundColor: "#ef4444",
                        color: "#ffffff",
                        fontFamily: "'Work Sans', sans-serif",
                        fontWeight: "700",
                        fontSize: "0.95rem",
                        padding: "12px 32px",
                        borderRadius: "999px",
                        border: "none",
                        cursor: "pointer",
                        letterSpacing: "-0.01em",
                      }}
                    >
                      Try Again
                    </button>
                  </>
                )}
              </div>
            </div>
          </>
        )}

        {/* Form Card */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-5 rounded-3xl p-8 md:p-10"
          style={{
            backgroundColor: "#2E4F21",
            boxShadow: "0 8px 40px rgba(46,79,33,0.25)",
          }}
        >
          {/* Inquiry Type */}
          <div className="flex flex-col gap-1.5">
            <label style={labelStyle}>I want to</label>
            <select
              {...register("inquiryType")}
              style={{
                ...inputStyle,
                cursor: "pointer",
                appearance: "none",
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='rgba(255,255,255,0.6)' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 16px center",
                paddingRight: "40px",
              }}
            >
              <option value="" style={{ backgroundColor: "#2E4F21" }}>Select an option...</option>
              <option value="sell" style={{ backgroundColor: "#2E4F21" }}>Sell to you (I have scrap)</option>
              <option value="buy" style={{ backgroundColor: "#2E4F21" }}>Buy from you (I need materials)</option>
            </select>
            {errors.inquiryType && <p style={errorStyle}>{errors.inquiryType.message}</p>}
          </div>

          {/* Full Name */}
          <div className="flex flex-col gap-1.5">
            <label style={labelStyle}>Full Name</label>
            <input
              {...register("fullName")}
              type="text"
              placeholder="Full Name"
              style={inputStyle}
              onFocus={e => Object.assign(e.target.style, inputFocusStyle)}
              onBlur={e => Object.assign(e.target.style, inputStyle)}
            />
            {errors.fullName && <p style={errorStyle}>{errors.fullName.message}</p>}
          </div>

          {/* Phone + Email row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label style={labelStyle}>Phone Number</label>
              <input
                {...register("phoneNumber")}
                type="tel"
                placeholder="e.g. 09171234567"
                style={inputStyle}
                onFocus={e => Object.assign(e.target.style, inputFocusStyle)}
                onBlur={e => Object.assign(e.target.style, inputStyle)}
              />
              {errors.phoneNumber && <p style={errorStyle}>{errors.phoneNumber.message}</p>}
            </div>

            <div className="flex flex-col gap-1.5">
              <label style={labelStyle}>Email</label>
              <input
                {...register("email")}
                type="email"
                placeholder="you@example.com"
                style={inputStyle}
                onFocus={e => Object.assign(e.target.style, inputFocusStyle)}
                onBlur={e => Object.assign(e.target.style, inputStyle)}
              />
              {errors.email && <p style={errorStyle}>{errors.email.message}</p>}
            </div>
          </div>

          {/* Address */}
          <div className="flex flex-col gap-1.5">
            <label style={labelStyle}>Pickup / Home Address</label>
            <input
              {...register("address")}
              type="text"
              placeholder="e.g. 123 Mango Ave, Cebu City"
              style={inputStyle}
              onFocus={e => Object.assign(e.target.style, inputFocusStyle)}
              onBlur={e => Object.assign(e.target.style, inputStyle)}
            />
            {errors.address && <p style={errorStyle}>{errors.address.message}</p>}
          </div>

          {/* Message */}
          <div className="flex flex-col gap-1.5">
            <label style={labelStyle}>Message</label>
            <textarea
              {...register("message")}
              rows={5}
              placeholder="Your message..."
              style={{
                ...inputStyle,
                resize: "none",
                lineHeight: "1.6",
              }}
              onFocus={e => Object.assign(e.target.style, inputFocusStyle)}
              onBlur={e => Object.assign(e.target.style, { ...inputStyle, resize: "none" })}
            />
            {errors.message && <p style={errorStyle}>{errors.message.message}</p>}
          </div>

          {/* Image Upload */}
          <div className="flex flex-col gap-1.5">
            <label style={labelStyle}>
              Photo of Scrap Material{" "}
              <span style={{ fontWeight: 400, opacity: 0.6 }}>(optional)</span>
            </label>
            <label
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                padding: "20px",
                borderRadius: "12px",
                border: "1.5px dashed rgba(160,241,189,0.4)",
                backgroundColor: "rgba(255,255,255,0.05)",
                cursor: "pointer",
                transition: "border-color 0.2s",
              }}
            >
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  style={{ maxHeight: "160px", borderRadius: "8px", objectFit: "cover" }}
                />
              ) : (
                <>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="rgba(160,241,189,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                  <span style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'Work Sans', sans-serif", fontSize: "0.85rem" }}>
                    Click to upload image (max 5MB)
                  </span>
                </>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: "none" }}
              />
            </label>
            {uploadError && <p style={errorStyle}>{uploadError}</p>}
            {imagePreview && (
              <button
                type="button"
                onClick={() => { setImageFile(null); setImagePreview(null) }}
                style={{
                  background: "none",
                  border: "none",
                  color: "rgba(255,255,255,0.4)",
                  fontFamily: "'Work Sans', sans-serif",
                  fontSize: "0.8rem",
                  cursor: "pointer",
                  alignSelf: "flex-start",
                  padding: 0,
                }}
              >
                Remove image
              </button>
            )}
          </div>

          {/* Consent */}
          <div className="flex flex-col gap-1">
            <div className="flex items-start gap-3">
              <input
                {...register("consent")}
                type="checkbox"
                id="consent"
                style={{
                  width: "18px",
                  height: "18px",
                  marginTop: "2px",
                  accentColor: "#A0F1BD",
                  cursor: "pointer",
                  flexShrink: 0,
                }}
              />
              <label
                htmlFor="consent"
                style={{
                  color: "rgba(255,255,255,0.75)",
                  fontFamily: "'Work Sans', sans-serif",
                  fontSize: "0.875rem",
                  cursor: "pointer",
                  lineHeight: "1.5",
                }}
              >
                I agree to the terms and conditions and consent to being contacted regarding my inquiry.
              </label>
            </div>
            {errors.consent && <p style={errorStyle}>{errors.consent.message}</p>}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              backgroundColor: "#A0F1BD",
              color: "#2E4F21",
              fontFamily: "'Work Sans', sans-serif",
              fontSize: "1rem",
              fontWeight: "700",
              padding: "14px 32px",
              borderRadius: "999px",
              border: "none",
              cursor: isSubmitting ? "not-allowed" : "pointer",
              opacity: isSubmitting ? 0.7 : 1,
              transition: "opacity 0.2s, transform 0.2s",
              alignSelf: "center",
              minWidth: "180px",
              letterSpacing: "-0.01em",
            }}
            onMouseEnter={e => !isSubmitting && ((e.target as HTMLElement).style.transform = "scale(1.04)")}
            onMouseLeave={e => ((e.target as HTMLElement).style.transform = "scale(1)")}
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </section>
  )
}

const labelStyle: React.CSSProperties = {
  color: "rgba(255,255,255,0.85)",
  fontFamily: "'Work Sans', sans-serif",
  fontSize: "0.875rem",
  fontWeight: "600",
  letterSpacing: "0.01em",
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 16px",
  borderRadius: "12px",
  border: "1.5px solid rgba(160,241,189,0.25)",
  backgroundColor: "rgba(255,255,255,0.08)",
  color: "#ffffff",
  fontFamily: "'Work Sans', sans-serif",
  fontSize: "0.95rem",
  outline: "none",
  transition: "border-color 0.2s, background-color 0.2s",
  boxSizing: "border-box",
}

const inputFocusStyle: React.CSSProperties = {
  ...inputStyle,
  border: "1.5px solid #A0F1BD",
  backgroundColor: "rgba(160,241,189,0.08)",
}

const errorStyle: React.CSSProperties = {
  color: "#fca5a5",
  fontFamily: "'Work Sans', sans-serif",
  fontSize: "0.8rem",
  marginTop: "2px",
}
