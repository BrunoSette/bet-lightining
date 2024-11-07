import { NextResponse } from "next/server";
import crypto from "crypto";

export async function GET() {
  // Generate a unique k1 (32-byte hex string)
  const k1 = crypto.randomBytes(32).toString("hex");

  // Construct the LNURL-auth URL
  const lnurlAuthUrl = `https://localhost:3000/api/v1/lnurl/auth?tag=login&k1=${k1}`;

  console.log("Generated LNURL-auth URL:", lnurlAuthUrl);

  return NextResponse.json({ lnurlAuthUrl });
}
