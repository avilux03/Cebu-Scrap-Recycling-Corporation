import { NextRequest, NextResponse } from "next/server";
import { MailerSend, EmailParams, Sender, Recipient } from "mailersend"
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

const mailerSend = new MailerSend({
  apiKey: process.env.MAILERSEND_API_KEY || "",
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

  const sender = new Sender(
    process.env.MAIL_FROM_EMAIL || "",
    process.env.MAIL_FROM_NAME || ""
  );

  // Email 1: Notify admin with full inquiry details
  const adminParams = new EmailParams()
    .setFrom(sender)
    .setTo([new Recipient(process.env.MAIL_TO_EMAIL || "")])
    .setReplyTo(new Sender(data.email, data.fullName))
    .setSubject(`New ${data.inquiryType === "sell" ? "Sell" : "Buy"} Inquiry from ${data.fullName}`)
    .setHtml(buildAdminHtml({
      fullName: data.fullName,
      email: data.email,
      phoneNumber: data.phoneNumber,
      address: data.address,
      inquiryType: data.inquiryType,
      message: data.message,
      imageUrl: data.imageUrl,
    }));

  // Email 2: Confirmation to user
  const userParams = new EmailParams()
    .setFrom(sender)
    .setTo([new Recipient(data.email)])
    .setReplyTo(sender)
    .setSubject(`Cebu Scrap Recycling Corporation: We received your inquiry!`)
    .setHtml(buildUserHtml({
      fullName: data.fullName,
      email: data.email,
      phoneNumber: data.phoneNumber,
      address: data.address,
      inquiryType: data.inquiryType,
      message: data.message,
    }));

  try {
    await mailerSend.email.send(adminParams);
  } catch (err: any) {
    console.error("MailerSend admin email error:", err?.body ?? err);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }

  // Non-blocking user confirmation
  mailerSend.email.send(userParams).catch((err: any) => {
    console.warn("MailerSend user confirmation failed:", err?.body ?? err);
  });

  return NextResponse.json({ ok: true });
}
