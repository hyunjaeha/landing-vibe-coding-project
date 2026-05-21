import { NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, verifyAdminToken } from "@/lib/admin-auth";
import { getSupabaseAdminClient } from "@/lib/supabase";

export async function GET(request) {
  const token = request.cookies.get(ADMIN_COOKIE_NAME)?.value;

  if (!verifyAdminToken(token)) {
    return NextResponse.json({ message: "관리자 접근 권한이 필요합니다." }, { status: 401 });
  }

  const supabase = getSupabaseAdminClient();

  if (!supabase) {
    return NextResponse.json(
      { message: "Supabase 환경변수가 설정되어 있지 않아 문의 목록을 불러올 수 없습니다." },
      { status: 503 }
    );
  }

  const { data, error } = await supabase
    .from("inquiries")
    .select("id,name,phone,preferred_schedule,participant_count,message,privacy_consent,created_at")
    .order("created_at", { ascending: false })
    .limit(50);

  if (error) {
    return NextResponse.json(
      { message: "문의 목록을 불러오지 못했습니다. 잠시 후 다시 시도해 주세요." },
      { status: 502 }
    );
  }

  return NextResponse.json({ inquiries: data ?? [] });
}
