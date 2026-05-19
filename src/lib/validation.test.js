import test from "node:test";
import assert from "node:assert/strict";
import { validateInquiry } from "./validation.js";

test("validates a complete inquiry", () => {
  const result = validateInquiry({
    name: "김민지",
    phone: "010-1234-5678",
    preferredSchedule: "6월 10일 수요일 오후 2시",
    participantCount: "2",
    message: "초보자도 참여 가능한가요?",
    privacyConsent: true,
  });

  assert.equal(result.valid, true);
  assert.deepEqual(result.errors, {});
  assert.equal(result.values.participantCount, 2);
});

test("blocks missing required phone", () => {
  const result = validateInquiry({
    name: "김민지",
    phone: "",
    preferredSchedule: "6월 10일 수요일 오후 2시",
    privacyConsent: true,
  });

  assert.equal(result.valid, false);
  assert.equal(result.errors.phone, "전화번호를 입력해 주세요.");
});

test("blocks missing privacy consent", () => {
  const result = validateInquiry({
    name: "김민지",
    phone: "010-1234-5678",
    preferredSchedule: "6월 10일 수요일 오후 2시",
    privacyConsent: false,
  });

  assert.equal(result.valid, false);
  assert.equal(result.errors.privacyConsent, "개인정보 수집 동의가 필요합니다.");
});

test("blocks invalid participant count", () => {
  const result = validateInquiry({
    name: "김민지",
    phone: "010-1234-5678",
    preferredSchedule: "6월 10일 수요일 오후 2시",
    participantCount: "30",
    privacyConsent: true,
  });

  assert.equal(result.valid, false);
  assert.equal(result.errors.participantCount, "참여 인원은 1명 이상 20명 이하로 입력해 주세요.");
});
