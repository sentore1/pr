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
  const { firstName, lastName, email, company, companySize, tool } = await req.json()

  if (!firstName || !email || !company) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
  }

  await transporter.sendMail({
    from: `"Pryro Demo" <${process.env.SMTP_USER}>`,
    to: process.env.MAIL_SALES,
    replyTo: email,
    subject: `New Demo Request from ${firstName} ${lastName}`,
    html: `
      <p><strong>Name:</strong> ${firstName} ${lastName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Company:</strong> ${company}</p>
      <p><strong>Company Size:</strong> ${companySize}</p>
      <p><strong>Tool Interested In:</strong> ${tool}</p>
    `,
  })

  return NextResponse.json({ success: true })
}
