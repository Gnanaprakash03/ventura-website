import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      firstName,
      workEmail,
      phoneNumber,
      jobTitle,
      companyName,
      message,
      interests,
      otherInterest,
      recaptchaToken,
    } = body;

    if (!workEmail) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    if (!recaptchaToken) {
      return NextResponse.json({ error: "reCAPTCHA token missing" }, { status: 400 });
    }

    // ✅ Verify reCAPTCHA (server-side)
    const recaptchaResponse = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`,
    });

    const recaptchaData = await recaptchaResponse.json();

    if (!recaptchaData.success) {
      console.error("reCAPTCHA verification failed:", recaptchaData);
      return NextResponse.json(
        { error: "reCAPTCHA failed. Please try again." },
        { status: 400 }
      );
    }

    // ✅ Send to Formspree (optional)
    await fetch("https://formspree.io/f/xwppwzlq", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        email: workEmail,
        phoneNumber,
        jobTitle,
        companyName,
        message,
        interests,
        otherInterest,
      }),
    });

    // ✅ Send auto-reply email via Resend
    await resend.emails.send({
      from: "Fidas Contact <contact@fidas.in>",
      to: workEmail,
      subject: "Thank you for contacting Fidas!",
      html: `
        <div style="font-family: Arial; color: #333;">
          <h2>Hi ${firstName || "there"},</h2>
          <p>Thank you for contacting Fidas! We’ve received your message:</p>
          <blockquote style="border-left: 3px solid #ddd; padding-left: 10px;">
            ${message || "(No message provided)"}
          </blockquote>
          <p>Our team will get back to you shortly.</p>
          <p style="margin-top: 20px;">– Fidas Team</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
