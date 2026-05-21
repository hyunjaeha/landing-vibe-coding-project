import { NextResponse } from "next/server";
import { getSupabaseAdminClient } from "@/lib/supabase";
import { submitInquiry } from "@/lib/inquiry-submission";

export async function POST(request) {
  let body;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { message: "입력값을 확인해 주세요.", errors: { form: "요청 형식이 올바르지 않습니다." } },
      { status: 400 }
    );
  }

  const result = await submitInquiry(body, getSupabaseAdminClient());

  return NextResponse.json(result.body, { status: result.status });
}
