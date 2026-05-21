import { toSupabaseInsert, validateInquiry } from "./validation.js";

export async function submitInquiry(input, supabase) {
  const validation = validateInquiry(input);

  if (!validation.isValid) {
    return {
      status: 400,
      body: {
        message: "필수 입력값을 확인해 주세요.",
        errors: validation.errors
      }
    };
  }

  if (!supabase) {
    return {
      status: 503,
      body: {
        message: "문의 접수 설정이 아직 완료되지 않았습니다. 잠시 후 다시 시도해 주세요.",
        errors: { form: "Supabase 환경변수가 설정되어 있지 않습니다." }
      }
    };
  }

  const { error } = await supabase.from("inquiries").insert(toSupabaseInsert(validation.values));

  if (error) {
    return {
      status: 502,
      body: {
        message: "문의 접수에 실패했습니다. 입력값은 유지되니 잠시 후 다시 시도해 주세요.",
        errors: { form: "Supabase 저장 중 오류가 발생했습니다." }
      }
    };
  }

  return {
    status: 200,
    body: {
      message: "문의가 접수되었습니다. 운영자가 확인 후 개별 연락드립니다."
    }
  };
}
