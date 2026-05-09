import { NextRequest, NextResponse } from "next/server";
import { MailerSend, EmailParams, Sender, Recipient } from "mailersend"
import { contactSchema } from "@/components/Contact/schema"

interface htmlParams {
  fullName: string;
}

const buildHtml = ({ fullName }: htmlParams) => `
  <h1>Hi ${fullName},</h1> <br />
  <p>We are thrilled to have received your inquiry. Our team will look into your message and get back to you shortly.</p><br/><br/>
  <p>Best regards,</p>
  <p><b>The Cebu Junkshop Team</b></p>
`;

const mailerSend = new MailerSend({
  apiKey: process.env.MAILERSEND_API_KEY || "",
})

export async function POST(req: NextRequest) {
  const body = await req.json();

  let data;
  try {
    data = await contactSchema.validate(body, { abortEarly: false});
  } catch (err) {
    console.log(JSON.stringify(err, null, 2))
    return NextResponse.json({ error: "Validation failed" }, { status: 400 });
  }

  const params = new EmailParams()
    .setFrom(new Sender(
      process.env.MAIL_FROM_EMAIL || "",
      process.env.MAIL_FROM_NAME || ""
    ))
    .setTo([new Recipient(data.email)])
    .setReplyTo(new Sender(data.email, data.fullName))
    .setSubject(`Cebu Junkshop: New Inquiry from ${data.fullName}`)
    .setHtml(buildHtml({ fullName: data.fullName }))
  
  await mailerSend.email.send(params);

  return NextResponse.json({ ok: true})
}