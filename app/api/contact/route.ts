import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export async function POST(req: Request) {
  const { name, email, company, message } = await req.json()

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
  }

  await transporter.sendMail({
    from: `"Pryro Contact" <${process.env.SMTP_USER}>`,
    to: process.env.MAIL_SUPPORT,
    replyTo: email,
    subject: `New Contact Message from ${name}`,
    html: `
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      ${company ? `<p><strong>Company:</strong> ${company}</p>` : ""}
      <p><strong>Message:</strong><br/>${message}</p>
    `,
  })

  return NextResponse.json({ success: true })
}
