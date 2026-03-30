import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    // ─── Parse body safely ─────────────────────────────────────────────────────
    let body: any;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
    }

    const {
      firstName,
      workEmail,
      phoneNumber,
      jobTitle,
      companyName,
      message,
      interests,
      otherInterest,
      cfToken,
    } = body;

    // ─── Basic validation ──────────────────────────────────────────────────────

    if (!workEmail) {
      return NextResponse.json({ error: "Email is required." }, { status: 400 });
    }

    if (!cfToken) {
      return NextResponse.json({ error: "Turnstile token missing." }, { status: 400 });
    }

    if (!process.env.CF_SECRET_KEY) {
      console.error("CF_SECRET_KEY is not set in environment variables.");
      return NextResponse.json({ error: "Server configuration error." }, { status: 500 });
    }

    // ─── Verify Cloudflare Turnstile ───────────────────────────────────────────

    let turnstileData: any;
    try {
      const turnstileRes = await fetch(
        "https://challenges.cloudflare.com/turnstile/v0/siteverify",
        {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({
            secret: process.env.CF_SECRET_KEY,
            response: cfToken,
          }),
        }
      );
      turnstileData = await turnstileRes.json();
    } catch (err) {
      console.error("Turnstile fetch error:", err);
      return NextResponse.json(
        { error: "Could not verify bot check. Please try again." },
        { status: 500 }
      );
    }

    if (!turnstileData.success) {
      console.error("Turnstile verification failed:", turnstileData);
      return NextResponse.json(
        { error: "Bot verification failed. Please try again." },
        { status: 400 }
      );
    }

    // ─── Forward to Formspree ──────────────────────────────────────────────────

    try {
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
    } catch (err) {
      console.error("Formspree error (non-fatal):", err);
    }

    // ─── Send auto-reply via Resend ────────────────────────────────────────────

    try {
      await resend.emails.send({
        from: "Fidas <contact@fidas.in>",
        to: workEmail,
        subject: "We've received your enquiry – Fidas",
        html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Enquiry Confirmation</title>
</head>
<body style="margin:0;padding:0;background-color:#f4f6f9;font-family:Arial,Helvetica,sans-serif;">
 
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f6f9;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
 
          <!-- Header -->
          <tr>
            <td style="padding:0; text-align:center;">
              <img 
                src="https://fidas.in/banner.png" 
                alt="FIDAS Banner"
                style="width:100%; max-width:600px; height:auto; display:block; border:0;"
              >
            </td>
          </tr>
 
          <!-- Body -->
          <tr>
            <td style="padding:40px 40px 24px;">
              <p style="margin:0 0 16px;font-size:15px;color:#374151;">Dear ${firstName || "there"},</p>
              <p style="margin:0 0 20px;font-size:15px;color:#374151;line-height:1.7;">
                Thank you for contacting us. We have successfully received your message and we will reach out to you as soon as posible.
              </p>
              <p style="margin:0 0 20px;font-size:15px;color:#374151;line-height:1.7;">
                You can expect to hear back from us within <strong>1-2 business days</strong>. In the meantime, feel free to explore our products and solutions that could be of interest to you. 
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:0 40px 36px;text-align:center;">
              <a href="https://fidas.in/products" style="display:inline-block;background:linear-gradient(135deg,#1d4ed8,#0ea5e9);color:#ffffff;text-decoration:none;font-size:14px;font-weight:600;padding:12px 28px;border-radius:6px;letter-spacing:0.3px;">
                Check Out Our Products
              </a>
            </td>
          </tr>
 
          <!-- Enquiry Summary Box -->
          <tr>
            <td style="padding:0 40px 32px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f8fafc;border:1px solid #e2e8f0;border-radius:6px;">
                <tr>
                  <td style="padding:16px 20px;border-bottom:1px solid #e2e8f0;">
                    <p style="margin:0;font-size:12px;color:#6b7280;text-transform:uppercase;letter-spacing:0.8px;font-weight:600;">Enquiry Summary</p>
                  </td>
                </tr>
                ${interests ? `
                <tr>
                  <td style="padding:12px 20px;border-bottom:1px solid #e2e8f0;">
                    <p style="margin:0;font-size:12px;color:#6b7280;">Topic of Interest</p>
                    <p style="margin:4px 0 0;font-size:14px;color:#111827;font-weight:500;text-transform:capitalize;">${interests}</p>
                  </td>
                </tr>` : ""}
                ${companyName ? `
                <tr>
                  <td style="padding:12px 20px;border-bottom:1px solid #e2e8f0;">
                    <p style="margin:0;font-size:12px;color:#6b7280;">Company</p>
                    <p style="margin:4px 0 0;font-size:14px;color:#111827;font-weight:500;">${companyName}</p>
                  </td>
                </tr>` : ""}
                <tr>
                  <td style="padding:12px 20px;">
                    <p style="margin:0;font-size:12px;color:#6b7280;">Your Message</p>
                    <p style="margin:4px 0 0;font-size:14px;color:#374151;line-height:1.6;">${message || "No message provided."}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
 
        <!-- CTA -->
            <tr>
              <td style="padding:0 40px 20px;text-align:center;">
                <p style="margin:0 0 20px;font-size:14px;color:#6b7280;">
                  Need immediate assistance? Reach us directly at
                  <a href="mailto:contact@fidas.in" style="color:#1d4ed8;text-decoration:none;font-weight:500;">contact@fidas.in</a>
                </p>

              </td>
            </tr>
 
          <!-- Divider -->
          <tr>
            <td style="padding:0 40px;">
              <hr style="border:none;border-top:1px solid #e5e7eb;margin:0;" />
            </td>
          </tr>
 
          <!-- Footer -->
          <tr>
            <td style="padding:24px 40px;text-align:center;">
              <p style="margin:0 0 4px;font-size:13px;color:#9ca3af;">
                © ${new Date().getFullYear()} Fidas. All rights reserved.
              </p>
              <p style="margin:0;font-size:12px;color:#d1d5db;">
                This is an automated confirmation. Please do not reply to this email.
              </p>
            </td>
          </tr>
 
        </table>
      </td>
    </tr>
  </table>
 
</body>
</html> 
`,
      });
    } catch (err) {
      console.error("Resend error (non-fatal):", err);
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}




