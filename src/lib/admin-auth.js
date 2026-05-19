import { createHash, timingSafeEqual } from "node:crypto";

export const ADMIN_COOKIE_NAME = "workshop_admin_session";

function getAdminSecret() {
  return process.env.ADMIN_ACCESS_KEY || "";
}

export function isAdminConfigured() {
  return getAdminSecret().length >= 8;
}

export function getAdminSessionToken() {
  const secret = getAdminSecret();
  if (!secret) {
    return "";
  }

  return createHash("sha256").update(`workshop-admin:${secret}`).digest("hex");
}

export function verifyAdminAccessKey(value) {
  const secret = getAdminSecret();
  const input = typeof value === "string" ? value : "";

  if (!secret || !input) {
    return false;
  }

  const secretBuffer = Buffer.from(secret);
  const inputBuffer = Buffer.from(input);

  if (secretBuffer.length !== inputBuffer.length) {
    return false;
  }

  return timingSafeEqual(secretBuffer, inputBuffer);
}

export function verifyAdminSessionToken(value) {
  const expected = getAdminSessionToken();
  const input = typeof value === "string" ? value : "";

  if (!expected || !input || expected.length !== input.length) {
    return false;
  }

  return timingSafeEqual(Buffer.from(expected), Buffer.from(input));
}
