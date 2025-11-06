import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json({ success: false, message: "No token provided" }, { status: 400 });
    }

    const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
    });

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error verifying reCAPTCHA:", error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
