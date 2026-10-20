export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { inquirySchema } from "@/lib/validation";
import { checkRateLimit } from "@/lib/rate-limit";
import { sendInquiryToSheet } from "@/lib/sheets";
import { sendInquiryEmailToOwner } from "@/lib/resend";

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "unknown";
    if (!checkRateLimit(ip, 5, 60000)) {
      return NextResponse.json({ success: false, message: "Too many requests" }, { status: 429 });
    }

    const body = await req.json();

    if (body.website) {
      return NextResponse.json({ success: true });
    }

    const parseResult = inquirySchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json({ success: false, message: "Validation failed", errors: parseResult.error.flatten() }, { status: 400 });
    }

    const payload = parseResult.data;

    await Promise.allSettled([
      sendInquiryToSheet(payload),
      sendInquiryEmailToOwner(payload)
    ]);

    return NextResponse.json({ success: true });

  } catch (error) {
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}