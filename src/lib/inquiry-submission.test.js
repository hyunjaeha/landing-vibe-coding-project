import test from "node:test";
import assert from "node:assert/strict";
import { submitInquiry } from "./inquiry-submission.js";

const validInquiry = {
  name: "저장테스트",
  phone: "010-1234-5678",
  preferredSchedule: "2026-06-10-14",
  participantCount: "2",
  message: "저장 성공 확인용 문의입니다.",
  privacyConsent: true
};

function createSupabaseMock(error = null) {
  const calls = [];

  return {
    calls,
    from(table) {
      calls.push({ method: "from", table });
      return {
        async insert(payload) {
          calls.push({ method: "insert", payload });
          return { error };
        }
      };
    }
  };
}

test("저장 성공: Supabase 단일 문의 테이블에 필요한 필드를 저장한다", async () => {
  const supabase = createSupabaseMock();
  const result = await submitInquiry(validInquiry, supabase);

  assert.equal(result.status, 200);
  assert.equal(result.body.message, "문의가 접수되었습니다. 운영자가 확인 후 개별 연락드립니다.");
  assert.deepEqual(supabase.calls[0], { method: "from", table: "inquiries" });
  assert.deepEqual(supabase.calls[1].payload, {
    name: "저장테스트",
    phone: "010-1234-5678",
    preferred_schedule: "2026-06-10-14",
    participant_count: 2,
    message: "저장 성공 확인용 문의입니다.",
    privacy_consent: true
  });
});

test("필수값 누락: 전화번호가 없으면 Supabase 저장 전에 400을 반환한다", async () => {
  const supabase = createSupabaseMock();
  const result = await submitInquiry({ ...validInquiry, phone: "" }, supabase);

  assert.equal(result.status, 400);
  assert.equal(result.body.errors.phone, "전화번호를 입력해 주세요.");
  assert.equal(supabase.calls.length, 0);
});

test("개인정보 동의 누락: 동의가 없으면 Supabase 저장 전에 400을 반환한다", async () => {
  const supabase = createSupabaseMock();
  const result = await submitInquiry({ ...validInquiry, privacyConsent: false }, supabase);

  assert.equal(result.status, 400);
  assert.equal(result.body.errors.privacyConsent, "개인정보 수집 동의가 필요합니다.");
  assert.equal(supabase.calls.length, 0);
});

test("제출 실패: Supabase 저장 오류가 나면 입력값 유지 안내와 502를 반환한다", async () => {
  const supabase = createSupabaseMock(new Error("insert failed"));
  const result = await submitInquiry(validInquiry, supabase);

  assert.equal(result.status, 502);
  assert.equal(
    result.body.message,
    "문의 접수에 실패했습니다. 입력값은 유지되니 잠시 후 다시 시도해 주세요."
  );
  assert.equal(supabase.calls.length, 2);
});
