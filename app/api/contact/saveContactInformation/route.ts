import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { contactSchema } from "@/components/Contact/schema";

interface HtmlParams {
  fullName: string;
  email: string;
  phoneNumber: string;
  address: string;
  inquiryType: string;
  message: string;
  imageUrl?: string | null;
}

const buildAdminHtml = ({ fullName, email, phoneNumber, address, inquiryType, message, imageUrl }: HtmlParams) => `
  <h2>New Inquiry from ${fullName}</h2>
  <p><b>Type:</b> ${inquiryType === "sell" ? "🟢 Sell to us" : "🔵 Buy from us"}</p>
  <p><b>Name:</b> ${fullName}</p>
  <p><b>Email:</b> ${email}</p>
  <p><b>Phone:</b> ${phoneNumber}</p>
  <p><b>Address:</b> ${address}</p>
  <p><b>Message:</b></p>
  <p>${message}</p>
  ${imageUrl ? `<p><b>Attached Photo:</b> <a href="${imageUrl}" target="_blank">View Image</a></p>` : ""}
`;

const buildUserHtml = ({ fullName }: HtmlParams) => `
  <h1>Hi ${fullName},</h1>
  <p>We are thrilled to have received your inquiry. Our team will look into your message and get back to you shortly.</p>
  <p>Best regards,</p>
  <p><b>Cebu Scrap Recycling Corporation</b></p>
`;

// Gmail SMTP transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export async function POST(req: NextRequest) {
  const body = await req.json();

  let data;
  try {
    data = await contactSchema.validate(body, { abortEarly: false });
  } catch (err) {
    console.error("Validation error:", JSON.stringify(err, null, 2));
    return NextResponse.json({ error: "Validation failed" }, { status: 400 });
  }

  // Email 1: Notify admin with full inquiry details
  try {
    await transporter.sendMail({
      from: `"${process.env.MAIL_FROM_NAME}" <${process.env.GMAIL_USER}>`,
      to: process.env.MAIL_TO_EMAIL,
      replyTo: data.email,
      subject: `New ${data.inquiryType === "sell" ? "Sell" : "Buy"} Inquiry from ${data.fullName}`,
      html: buildAdminHtml({
        fullName: data.fullName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        address: data.address,
        inquiryType: data.inquiryType,
        message: data.message,
        imageUrl: data.imageUrl,
      }),
    });
  } catch (err: any) {
    console.error("Gmail admin email error:", err?.message ?? err);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }

  // Email 2: Confirmation to user (non-blocking)
  transporter
    .sendMail({
      from: `"${process.env.MAIL_FROM_NAME}" <${process.env.GMAIL_USER}>`,
      to: data.email,
      replyTo: process.env.GMAIL_USER,
      subject: `Cebu Scrap Recycling Corporation: We received your inquiry!`,
      html: buildUserHtml({
        fullName: data.fullName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        address: data.address,
        inquiryType: data.inquiryType,
        message: data.message,
      }),
    })
    .catch((err: any) => {
      console.warn("Gmail user confirmation failed:", err?.message ?? err);
    });

  return NextResponse.json({ ok: true });
}
