import { schedules } from "./workshop-data.js";

const scheduleIds = new Set(schedules.map((schedule) => schedule.id));

export function normalizeInquiry(input) {
  return {
    name: String(input?.name ?? "").trim(),
    phone: String(input?.phone ?? "").trim(),
    preferredSchedule: String(input?.preferredSchedule ?? "").trim(),
    participantCount:
      input?.participantCount === "" || input?.participantCount == null
        ? null
        : Number(input.participantCount),
    message: String(input?.message ?? "").trim(),
    privacyConsent: input?.privacyConsent === true || input?.privacyConsent === "on"
  };
}

export function validateInquiry(input) {
  const values = normalizeInquiry(input);
  const errors = {};

  if (!values.name) {
    errors.name = "이름을 입력해 주세요.";
  }

  if (!values.phone) {
    errors.phone = "전화번호를 입력해 주세요.";
  } else if (!/^[0-9+\-\s()]{8,20}$/.test(values.phone)) {
    errors.phone = "연락 가능한 전화번호를 입력해 주세요.";
  }

  if (!values.preferredSchedule) {
    errors.preferredSchedule = "희망 일정을 선택해 주세요.";
  } else if (!scheduleIds.has(values.preferredSchedule)) {
    errors.preferredSchedule = "선택 가능한 일정으로 다시 선택해 주세요.";
  }

  if (
    values.participantCount !== null &&
    (!Number.isInteger(values.participantCount) ||
      values.participantCount < 1 ||
      values.participantCount > 8)
  ) {
    errors.participantCount = "참여 인원은 1명부터 8명까지 입력해 주세요.";
  }

  if (!values.privacyConsent) {
    errors.privacyConsent = "개인정보 수집 동의가 필요합니다.";
  }

  return {
    values,
    errors,
    isValid: Object.keys(errors).length === 0
  };
}

export function toSupabaseInsert(values) {
  return {
    name: values.name,
    phone: values.phone,
    preferred_schedule: values.preferredSchedule,
    participant_count: values.participantCount,
    message: values.message || null,
    privacy_consent: values.privacyConsent
  };
}
