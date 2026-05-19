import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_COOKIE_NAME, verifyAdminSessionToken } from "@/lib/admin-auth";
import { getSupabaseServerClient, isSupabaseConfigured } from "@/lib/supabase";

export async function GET() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(ADMIN_COOKIE_NAME)?.value;

  if (!verifyAdminSessionToken(sessionToken)) {
    return NextResponse.json({ message: "접근 권한이 없습니다." }, { status: 401 });
  }

  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { message: "Supabase 환경변수가 설정되지 않았습니다." },
      { status: 503 },
    );
  }

  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase
    .from("inquiries")
    .select(
      "id,name,phone,preferred_schedule,participant_count,message,privacy_consent,created_at",
    )
    .order("created_at", { ascending: false })
    .limit(50);

  if (error) {
    return NextResponse.json(
      { message: "문의 목록을 불러오지 못했습니다." },
      { status: 500 },
    );
  }

  return NextResponse.json({
    inquiries: data.map((item) => ({
      id: item.id,
      name: item.name,
      phone: item.phone,
      preferredSchedule: item.preferred_schedule,
      participantCount: item.participant_count,
      message: item.message,
      privacyConsent: item.privacy_consent,
      createdAt: item.created_at,
    })),
  });
}
