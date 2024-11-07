import { NextRequest, NextResponse } from "next/server";
import { ec as EC } from "elliptic";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const k1 = searchParams.get("k1");
  const sig = searchParams.get("sig");
  const key = searchParams.get("key");

  if (!k1 || !sig || !key) {
    return NextResponse.json(
      { success: false, message: "Missing parameters" },
      { status: 400 }
    );
  }

  // Retrieve the stored k1 from your session or database
  // Example: const storedK1 = await getK1FromDatabase();

  // Verify the signature
  const isValid = verifyLnurlAuthSignature(k1, sig, key);

  if (isValid) {
    // Authenticate the user
    // Set session or token as needed
    return NextResponse.json({ success: true }, { status: 200 });
  } else {
    return NextResponse.json(
      { success: false, message: "Invalid signature" },
      { status: 400 }
    );
  }
}

function verifyLnurlAuthSignature(
  k1: string,
  sig: string,
  key: string
): boolean {
  const ec = new EC("secp256k1");
  const pubKey = ec.keyFromPublic(key, "hex");
  const msgHash = Buffer.from(k1, "hex");
  return pubKey.verify(msgHash, sig);
}
