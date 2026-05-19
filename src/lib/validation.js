export function normalizeText(value) {
  return typeof value === "string" ? value.trim() : "";
}

export function normalizeParticipantCount(value) {
  if (value === undefined || value === null || value === "") {
    return null;
  }

  const count = Number(value);
  if (!Number.isInteger(count) || count < 1 || count > 20) {
    return null;
  }

  return count;
}

export function isValidPhone(value) {
  const phone = normalizeText(value);
  return /^[0-9-+\s()]{8,20}$/.test(phone);
}

export function validateInquiry(input) {
  const values = {
    name: normalizeText(input.name),
    phone: normalizeText(input.phone),
    preferredSchedule: normalizeText(input.preferredSchedule),
    participantCount: normalizeParticipantCount(input.participantCount),
    message: normalizeText(input.message),
    privacyConsent: input.privacyConsent === true,
  };

  const errors = {};

  if (!values.name) {
    errors.name = "이름을 입력해 주세요.";
  }

  if (!values.phone) {
    errors.phone = "전화번호를 입력해 주세요.";
  } else if (!isValidPhone(values.phone)) {
    errors.phone = "연락 가능한 전화번호를 입력해 주세요.";
  }

  if (!values.preferredSchedule) {
    errors.preferredSchedule = "희망 일정을 선택해 주세요.";
  }

  if (input.participantCount && values.participantCount === null) {
    errors.participantCount = "참여 인원은 1명 이상 20명 이하로 입력해 주세요.";
  }

  if (!values.privacyConsent) {
    errors.privacyConsent = "개인정보 수집 동의가 필요합니다.";
  }

  return {
    values,
    errors,
    valid: Object.keys(errors).length === 0,
  };
}
