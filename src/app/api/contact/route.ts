import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  secure: Number(process.env.EMAIL_PORT) === 465
,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, message, phoneNumber, jobTitle, companyName, interests} = body;

    // 1️⃣ Send email to yourself
    await transporter.sendMail({
      from: `"Fidas.in" <${process.env.EMAIL_FROM}>`,
      to: process.env.EMAIL_FROM,
      subject: `New Contact Form Submission from ${firstName} ${lastName}`,
      html: `
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone No:</strong> ${phoneNumber}</p>
        <p><strong>Company Name:</strong> ${companyName}</p>
        ${jobTitle ? `<p><strong>Job Title:</strong> ${jobTitle}</p>` : ''}
        <p><strong>Interests:</strong> ${interests}</p>
        ${message ? `<p><strong>Message:</strong> ${message}</p>` : ''}
      `,

    });

    // 2️⃣ Send thank-you email to user
    await transporter.sendMail({
      from: `"FIDAS" <${process.env.EMAIL_FROM}>`,
      to: email,
      subject: "Thank you for contacting us!",
      html: `<p>Hi ${firstName},</p>
             <p>Thank you for reaching out. We have received your message and will get back to you shortly.</p>
             <p>Best regards,<br/>Your Company</p>`,
    });

    return NextResponse.json({ message: "Emails sent successfully!" });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { message: "Email sending failed", error: error.message },
      { status: 500 }
    );
  }
}
