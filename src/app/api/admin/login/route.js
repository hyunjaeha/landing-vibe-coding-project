import { NextResponse } from "next/server";
import {
  ADMIN_COOKIE_NAME,
  getAdminSessionToken,
  isAdminConfigured,
  verifyAdminAccessKey,
} from "@/lib/admin-auth";

export async function POST(request) {
  let payload;

  try {
    payload = await request.json();
  } catch (error) {
    return NextResponse.json({ message: "요청 내용을 확인할 수 없습니다." }, { status: 400 });
  }

  if (!isAdminConfigured()) {
    return NextResponse.json(
      { message: "관리자 접근 키가 아직 설정되지 않았습니다." },
      { status: 503 },
    );
  }

  if (!verifyAdminAccessKey(payload?.accessKey)) {
    return NextResponse.json({ message: "접근 키가 올바르지 않습니다." }, { status: 401 });
  }

  const response = NextResponse.json({ message: "접근이 확인되었습니다." });
  response.cookies.set({
    name: ADMIN_COOKIE_NAME,
    value: getAdminSessionToken(),
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
  });

  return response;
}
