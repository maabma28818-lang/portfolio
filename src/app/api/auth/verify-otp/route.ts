import { NextResponse } from "next/server";
import twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const verifyServiceSid = process.env.TWILIO_VERIFY_SERVICE_SID;
const rawAdminPhone = process.env.NEXT_PUBLIC_ADMIN_PHONE || "8793606280";

export async function POST(request: Request) {
  try {
    const { phone, code } = await request.json();

    if (!phone || !code) {
      return NextResponse.json({ error: "Phone and code are required." }, { status: 400 });
    }

    const cleanInput = phone.replace(/\D/g, "").slice(-10);
    const authorizedClean = rawAdminPhone.replace(/\D/g, "").slice(-10);

    if (cleanInput !== authorizedClean) {
      return NextResponse.json({ error: "Unauthorized phone number." }, { status: 403 });
    }

    let formattedPhone = phone.startsWith("+") ? phone : `+91${cleanInput}`;

    // Developer Test Mode (Bypass)
    if (!accountSid || !authToken || !verifyServiceSid) {
      console.warn("Missing Twilio credentials. Proceeding in DEV MOCK MODE.");
      if (code === "123456") {
        return NextResponse.json({ success: true, token: "authenticated_token_xyz" });
      }
      return NextResponse.json({ error: "Invalid Mock OTP." }, { status: 401 });
    }

    const client = twilio(accountSid, authToken);

    // Verify the OTP via Twilio
    const verificationCheck = await client.verify.v2.services(verifyServiceSid)
      .verificationChecks
      .create({ to: formattedPhone, code });

    if (verificationCheck.status === "approved") {
      // In a real app, generate a JWT here
      return NextResponse.json({ success: true, token: "authenticated_token_xyz" });
    } else {
      return NextResponse.json({ error: "Invalid or expired OTP." }, { status: 401 });
    }
  } catch (error: any) {
    console.error("Twilio Verify Error:", error);
    return NextResponse.json({ error: error.message || "Internal server error." }, { status: 500 });
  }
}
