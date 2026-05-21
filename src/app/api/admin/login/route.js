import { NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, createAdminToken, verifyAdminKey } from "@/lib/admin-auth";

export async function POST(request) {
  let body;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "접근 값을 입력해 주세요." }, { status: 400 });
  }

  if (!verifyAdminKey(body?.accessKey)) {
    return NextResponse.json({ message: "관리자 접근 값이 올바르지 않습니다." }, { status: 401 });
  }

  const response = NextResponse.json({ message: "관리자 접근이 확인되었습니다." });
  response.cookies.set({
    name: ADMIN_COOKIE_NAME,
    value: createAdminToken(),
    httpOnly: true,
    sameSite: "lax",
    secure: isHttpsRequest(request),
    path: "/",
    maxAge: 60 * 60 * 8
  });

  return response;
}

function isHttpsRequest(request) {
  return request.headers.get("x-forwarded-proto") === "https" || request.nextUrl?.protocol === "https:";
}
