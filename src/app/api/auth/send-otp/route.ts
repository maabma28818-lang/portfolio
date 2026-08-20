import { NextResponse } from "next/server";
import twilio from "twilio";

// Ensure these exist, or mock them during local dev if missing
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const verifyServiceSid = process.env.TWILIO_VERIFY_SERVICE_SID;
const rawAdminPhone = process.env.NEXT_PUBLIC_ADMIN_PHONE || "8793606280";

export async function POST(request: Request) {
  try {
    const { phone } = await request.json();

    if (!phone) {
      return NextResponse.json({ error: "Phone number is required." }, { status: 400 });
    }

    // Sanitize input
    const cleanInput = phone.replace(/\D/g, "").slice(-10);
    const authorizedClean = rawAdminPhone.replace(/\D/g, "").slice(-10);

    // Validate against authorized number
    if (cleanInput !== authorizedClean) {
      return NextResponse.json({ error: "Unauthorized phone number." }, { status: 403 });
    }

    // Format for Twilio (ensure it has country code, e.g., +91)
    let formattedPhone = phone.startsWith("+") ? phone : `+91${cleanInput}`;
    
    // In developer test mode without API keys, we can just return success
    if (!accountSid || !authToken || !verifyServiceSid) {
      console.warn("Missing Twilio credentials. Proceeding in DEV MOCK MODE.");
      return NextResponse.json({ success: true, mockMode: true });
    }

    const client = twilio(accountSid, authToken);

    // Send the OTP via Twilio Verify
    const verification = await client.verify.v2.services(verifyServiceSid)
      .verifications
      .create({ to: formattedPhone, channel: "sms" });

    if (verification.status === "pending") {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ error: "Failed to send OTP." }, { status: 500 });
    }
  } catch (error: any) {
    console.error("Twilio Send Error:", error);
    return NextResponse.json({ error: error.message || "Internal server error." }, { status: 500 });
  }
}
