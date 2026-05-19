import { NextResponse } from "next/server";
import { getSupabaseServerClient, isSupabaseConfigured } from "@/lib/supabase";
import { validateInquiry } from "@/lib/validation";

export async function POST(request) {
  let payload;

  try {
    payload = await request.json();
  } catch (error) {
    return NextResponse.json(
      { message: "요청 내용을 확인할 수 없습니다." },
      { status: 400 },
    );
  }

  const result = validateInquiry(payload || {});

  if (!result.valid) {
    return NextResponse.json(
      {
        message: "입력 내용을 다시 확인해 주세요.",
        errors: result.errors,
      },
      { status: 400 },
    );
  }

  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      {
        message: "문의 저장 환경이 아직 설정되지 않았습니다.",
        errors: {
          form: "Supabase 환경변수를 설정한 뒤 다시 시도해 주세요.",
        },
      },
      { status: 503 },
    );
  }

  const supabase = getSupabaseServerClient();
  const { values } = result;
  const { error } = await supabase.from("inquiries").insert({
    name: values.name,
    phone: values.phone,
    preferred_schedule: values.preferredSchedule,
    participant_count: values.participantCount,
    message: values.message || null,
    privacy_consent: values.privacyConsent,
  });

  if (error) {
    return NextResponse.json(
      {
        message: "문의 접수에 실패했습니다. 잠시 후 다시 시도해 주세요.",
      },
      { status: 500 },
    );
  }

  return NextResponse.json({
    message: "문의가 접수되었습니다. 운영자가 확인 후 연락드립니다.",
  });
}
