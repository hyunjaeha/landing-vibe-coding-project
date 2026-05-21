import test from "node:test";
import assert from "node:assert/strict";
import { validateInquiry, toSupabaseInsert } from "./validation.js";

const validInquiry = {
  name: "김민지",
  phone: "010-1234-5678",
  preferredSchedule: "2026-06-10-14",
  participantCount: "2",
  message: "초보자도 참여 가능한가요?",
  privacyConsent: true
};

test("필수값과 동의가 있으면 문의 입력값이 통과한다", () => {
  const result = validateInquiry(validInquiry);

  assert.equal(result.isValid, true);
  assert.deepEqual(result.errors, {});
  assert.equal(toSupabaseInsert(result.values).preferred_schedule, "2026-06-10-14");
});

test("전화번호가 없으면 제출을 막는다", () => {
  const result = validateInquiry({ ...validInquiry, phone: "" });

  assert.equal(result.isValid, false);
  assert.equal(result.errors.phone, "전화번호를 입력해 주세요.");
});

test("개인정보 수집 동의가 없으면 제출을 막는다", () => {
  const result = validateInquiry({ ...validInquiry, privacyConsent: false });

  assert.equal(result.isValid, false);
  assert.equal(result.errors.privacyConsent, "개인정보 수집 동의가 필요합니다.");
});

test("참여 인원은 1명부터 8명까지만 허용한다", () => {
  const result = validateInquiry({ ...validInquiry, participantCount: "12" });

  assert.equal(result.isValid, false);
  assert.equal(result.errors.participantCount, "참여 인원은 1명부터 8명까지 입력해 주세요.");
});
