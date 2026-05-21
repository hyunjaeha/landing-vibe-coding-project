import { createHash, timingSafeEqual } from "node:crypto";

export const ADMIN_COOKIE_NAME = "workshop_admin";

function digest(value) {
  return createHash("sha256").update(value).digest("hex");
}

function safeCompare(a, b) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  return left.length === right.length && timingSafeEqual(left, right);
}

export function hasAdminSecret() {
  return Boolean(process.env.ADMIN_ACCESS_KEY);
}

export function createAdminToken() {
  const secret = process.env.ADMIN_ACCESS_KEY;
  if (!secret) {
    return null;
  }

  return digest(secret);
}

export function verifyAdminKey(candidate) {
  const expected = process.env.ADMIN_ACCESS_KEY;
  if (!expected || typeof candidate !== "string" || !candidate) {
    return false;
  }

  return safeCompare(digest(candidate), digest(expected));
}

export function verifyAdminToken(candidate) {
  const expected = createAdminToken();
  if (!expected || typeof candidate !== "string" || !candidate) {
    return false;
  }

  return safeCompare(candidate, expected);
}
