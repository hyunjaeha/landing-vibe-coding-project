# 저장소 지식 맵

이 문서는 저장소의 지식 구조와 작업 라우팅을 정의하는 최상위 지도입니다. 상세 요구사항을 반복하지 않고, 어떤 문서를 원천으로 삼아야 하는지와 어떤 플러그인/스킬을 언제 사용해야 하는지만 정리합니다.

## 문서 역할

| 경로 | 담당 지식 | 이 문서에 쓰는 내용 | 이 문서에 쓰지 않는 내용 |
| --- | --- | --- | --- |
| `AGENTS.md` | 에이전트 작업 진입점 | 문서 목차, 기본 작업 규칙, 수정 우선순위 | 제품/디자인/아키텍처/운영 상세 기준 |
| `docs/harness-map.md` | 저장소 지식 맵 | 문서별 책임, 지식 라우팅, 플러그인/스킬 라우팅, 불변조건, 검증 게이트 연결 | PRD 원문, 디자인 토큰 상세, 운영 절차 상세 |
| `docs/product/mvp-scope.md` | 서비스 MVP 기준 | 서비스 정의, 사용자 문제, 운영자 목표, MVP 범위, 기능/비기능 요구사항, 통과 기준 | 랜딩 페이지 시각 디자인, 코드 구조, 운영 절차 상세 |
| `docs/product/user-flow.md` | 사용자 흐름 | 방문자 흐름, 운영자 흐름, 예외 흐름, 화면 상태 | 기능 요구사항 표, 디자인 토큰, DB 스키마 |
| `docs/design/landing-page-brief.md` | 랜딩 페이지 기준 | 섹션 구조, CTA 문구, 디자인 토큰, 이미지 기준, 접근성, 반응형, 폼 상태, Figma 디자인 참조 | 서비스 범위 결정, 관리자 구현 구조, 운영자 처리 절차 |
| `docs/engineering/architecture.md` | 구현 아키텍처 기준 | 화면 구조, 데이터 흐름, Supabase 연동, 관리자 접근 보호, 환경변수와 보안 경계 | 제품 요구사항 원문, 디자인 토큰 상세, 운영 체크리스트 전체 |
| `docs/engineering/quality-gates.md` | 검증 게이트 | 배포 전 확인 기준, 접근성, 개인정보, 반응형, 데이터 저장, 관리자 보호 검증 | 요구사항 설명문, 화면 카피 원문, 운영 절차 |
| `docs/operations/operating-guide.md` | 운영 기준 | 문의 확인, 수동 연락, 정적 운영 체크리스트, 개인정보 보관/삭제 처리, 범위 밖 요청 대응 | 제품 기능 확장 요구사항, 디자인 토큰, 코드 구조 |
| `docs/implementation-brief.md` | 구현 인수인계 | 작업 시작 순서, 산출물 기준, 문서 동기화 기준, 작업 전후 체크리스트 | PRD 원문 전체, 디자인 상세 전체, 운영 절차 전체 |

## 지식 영역 분리

### 서비스 MVP 지식

서비스 MVP는 “무엇을 만들고 무엇을 만들지 않을지”를 결정하는 영역입니다.

| 질문 | 원천 문서 | 함께 확인할 문서 |
| --- | --- | --- |
| 이 기능이 3일 MVP 범위인가요? | `docs/product/mvp-scope.md` | `docs/implementation-brief.md` |
| 방문자와 운영자가 어떤 순서로 사용하나요? | `docs/product/user-flow.md` | `docs/product/mvp-scope.md` |
| 문의 데이터는 어떻게 저장하나요? | `docs/engineering/architecture.md` | `docs/product/mvp-scope.md` |
| 운영자는 접수 후 무엇을 하나요? | `docs/operations/operating-guide.md` | `docs/product/user-flow.md` |
| 배포 전에 무엇을 통과해야 하나요? | `docs/engineering/quality-gates.md` | `docs/engineering/architecture.md` |

서비스 MVP에서 다루는 핵심 산출물:

- 공개 랜딩 페이지
- 문의 제출 폼
- Supabase 문의 저장
- 단일 관리자 접근 보호가 있는 최소 문의 목록
- 정적 운영 체크리스트
- 개인정보 안내와 삭제 요청 기준

### 랜딩 페이지 지식

랜딩 페이지는 “방문자가 정보를 이해하고 문의를 제출하는 화면”을 설계하는 영역입니다.

시각 기준은 이미 만들어진 Figma 파일인 [소규모 워크숍 문의 랜딩페이지 모바일 우선](https://www.figma.com/design/BmEnBwIBT7GfabO85UGaTx/%EC%86%8C%EA%B7%9C%EB%AA%A8-%EC%9B%8C%ED%81%AC%EC%88%8D-%EB%AC%B8%EC%9D%98-%EB%9E%9C%EB%94%A9%ED%8E%98%EC%9D%B4%EC%A7%80---%EB%AA%A8%EB%B0%94%EC%9D%BC-%EC%9A%B0%EC%84%A0?node-id=0-1&t=OL8lhxow4DBMnCJi-1)를 우선 참고합니다. 디자인 수정이 필요하면 새 Figma 파일을 만들기보다 이 파일을 수정해 사용합니다.

| 질문 | 원천 문서 | 함께 확인할 문서 |
| --- | --- | --- |
| 어떤 섹션을 어떤 순서로 배치하나요? | `docs/design/landing-page-brief.md` | `docs/product/user-flow.md` |
| CTA 문구는 무엇을 사용할 수 있나요? | `docs/design/landing-page-brief.md` | `docs/product/mvp-scope.md` |
| 모바일에서 어떤 제약을 지켜야 하나요? | `docs/design/landing-page-brief.md` | `docs/engineering/quality-gates.md` |
| 폼 오류, 제출 중, 성공, 실패 상태는 어떻게 보이나요? | `docs/design/landing-page-brief.md` | `docs/product/user-flow.md` |
| 접근성 기준은 무엇인가요? | `docs/design/landing-page-brief.md` | `docs/engineering/quality-gates.md` |
| 실제 화면 구현이 Figma와 맞나요? | Figma 디자인 파일 | `docs/design/landing-page-brief.md`, `docs/engineering/quality-gates.md` |

랜딩 페이지에서 다루는 핵심 산출물:

- 워크숍 첫 화면
- 워크숍 소개와 대상자 안내
- 일정 안내
- 장소와 참여 안내
- 문의 폼
- 제출 결과 메시지
- 개인정보와 범위 안내

랜딩 페이지 기준 우선순위:

1. Figma 파일의 실제 화면 구조와 시각 기준을 확인합니다.
2. `landing-page-brief.md`에서 섹션 목적, 문구, 상태, 접근성, 반응형 기준을 확인합니다.
3. `user-flow.md`에서 방문자 흐름과 예외 상태가 누락되지 않았는지 확인합니다.
4. Figma와 문서가 충돌하면 먼저 어느 기준이 최신인지 확인하고, 최신 기준을 한 곳에 반영한 뒤 다른 문서에는 참조만 남깁니다.

## 플러그인/스킬 라우팅

작업이 특정 도구와 연결될 때는 아래 기준으로 라우팅합니다. 도구 사용 전에는 항상 관련 원천 문서를 먼저 확인합니다.

| 작업 유형 | 우선 확인 문서 | 권장 플러그인/스킬 | 산출물 |
| --- | --- | --- | --- |
| 제품 범위 정리 또는 PRD 수정 | `docs/product/mvp-scope.md` | 필요 시 `superpowers:brainstorming` | 범위 결정, 요구사항 정리 |
| 사용자 흐름 정리 | `docs/product/user-flow.md` | 필요 시 `superpowers:brainstorming` | 방문자/운영자/예외 흐름 |
| 랜딩 페이지 디자인 또는 Figma 작업 | Figma 디자인 파일, `docs/design/landing-page-brief.md` | `figma:figma-use`, `figma:figma-generate-design` | 기존 Figma 파일 수정, 모바일/태블릿/데스크톱 디자인 |
| 디자인 시스템 또는 토큰 정리 | `docs/design/landing-page-brief.md` | `figma:figma-generate-library` | 컬러, 타이포, 컴포넌트 기준 |
| Supabase DB/API 작업 | `docs/engineering/architecture.md` | `supabase:supabase`, 필요 시 `supabase:supabase-postgres-best-practices` | 문의 테이블, 저장/조회 기준 |
| 기술 스택 선정 및 배포 구현 | `docs/engineering/architecture.md` | 후보 스택 검토 후 필요 시 `vercel:nextjs`, `vercel:deployments-cicd` | 선택 근거, 구현 구조, 배포 기준 |
| 브라우저 기반 화면 검증 | `docs/engineering/quality-gates.md` | 사용 가능하면 `chrome-devtools` MCP 우선 검토, 없으면 `vercel:agent-browser-verify`, `vercel:verification` | 화면/콘솔/반응형 검증 결과 |
| PR 또는 이슈 작업 | `AGENTS.md` | `github:github`, `github:yeet`, `github:gh-fix-ci` | PR 확인, CI 수정, 배포 전 리뷰 |

도구 라우팅 원칙:

- Figma 작업은 새 파일 생성보다 기존 Figma 파일 수정과 재사용을 우선합니다. 기준 변경이 필요하면 Figma 파일과 `landing-page-brief.md`의 충돌 여부를 함께 정리합니다.
- Supabase 작업은 `architecture.md`의 보안 경계를 따릅니다. 서비스 역할 키와 관리자 비밀 값은 브라우저에 노출하지 않습니다.
- 기술 스택은 Next.js로 바로 고정하지 않습니다. 기존 저장소 상태, 배포 대상, 서버 측 비밀값 처리, Supabase 연동, 폼 검증, 관리자 접근 보호를 기준으로 가장 단순하고 적합한 스택을 먼저 검토합니다.
- 적합한 기존 스택이나 더 단순한 대안이 없을 때 Next.js를 사용합니다.
- 화면/콘솔/반응형 검증은 `chrome-devtools` MCP 사용 가능 여부를 먼저 확인합니다. 사용할 수 있으면 실제 브라우저 상태, 콘솔 오류, 네트워크, 뷰포트 검증에 우선 적용합니다.
- `chrome-devtools` MCP가 없거나 현재 환경에서 쓸 수 없으면 `quality-gates.md` 기준에 맞춰 Vercel 브라우저 검증 도구, Playwright, Chrome headless 같은 대체 검증 수단을 사용합니다.
- GitHub 작업은 현재 폴더가 Git 저장소인지 먼저 확인한 뒤 진행합니다.

## 기술 스택 선정 기준

구현 기술은 특정 프레임워크를 기본값으로 확정하지 않습니다. 다음 순서로 판단합니다.

1. 저장소에 이미 앱 구조, 패키지 매니저, 프레임워크, 배포 설정이 있는지 확인합니다.
2. 기존 스택이 공개 랜딩, 서버 측 문의 저장, 관리자 접근 보호, 환경변수 보호를 충족하면 기존 스택을 유지합니다.
3. 기존 스택이 없으면 정적 페이지와 서버 측 제출 처리, Supabase 연동, 배포 난이도를 기준으로 후보를 비교합니다.
4. 3일 MVP에서 가장 단순하게 배포 가능하고 비밀값을 안전하게 다룰 수 있는 스택을 선택합니다.
5. 후보 간 장점이 뚜렷하지 않거나 서버 측 폼 처리와 배포 편의성이 중요하면 Next.js를 사용합니다.

스택 선택 시 반드시 확인할 조건:

- Supabase 서비스 역할 키 또는 관리자 비밀 값이 브라우저 번들에 포함되지 않아야 합니다.
- 문의 제출 검증은 서버 측에서 다시 수행할 수 있어야 합니다.
- 관리자 문의 목록은 접근 보호 뒤에서만 조회할 수 있어야 합니다.
- 모바일 우선 랜딩 페이지를 빠르게 구현하고 배포할 수 있어야 합니다.
- 선택 근거와 포기한 대안은 작업 결과에 간단히 남깁니다.

## 아키텍처 불변조건

아래 조건은 구현 방식이 달라져도 유지해야 하는 기준입니다. 상세 설명은 `docs/engineering/architecture.md`를 원천으로 합니다.

| ID | 불변조건 | 기준 문서 |
| --- | --- | --- |
| INV-001 | 문의 제출은 예약 확정이 아니라 운영자 확인 전 접수 상태입니다. | `docs/product/mvp-scope.md` |
| INV-002 | 문의 데이터 저장 방식은 Supabase 단일 문의 테이블을 기준으로 합니다. | `docs/engineering/architecture.md` |
| INV-003 | 이름, 전화번호, 희망 일정, 개인정보 동의는 서버 측에서도 검증합니다. | `docs/engineering/architecture.md` |
| INV-004 | Supabase 서비스 역할 키와 관리자 비밀 값은 브라우저 코드에 포함하지 않습니다. | `docs/engineering/architecture.md` |
| INV-005 | 문의 목록은 관리자 접근 보호를 통과한 경로에서만 조회합니다. | `docs/engineering/architecture.md` |
| INV-006 | 운영 체크리스트는 정적 표시로 제한하고 체크 상태를 저장하지 않습니다. | `docs/operations/operating-guide.md` |
| INV-007 | 결제, 자동 예약 확정, 자동 문자/이메일 발송, 다중 권한 관리는 MVP 범위에서 제외합니다. | `docs/product/mvp-scope.md` |
| INV-008 | 상태와 오류는 색상만으로 전달하지 않고 텍스트를 함께 표시합니다. | `docs/design/landing-page-brief.md` |
| INV-009 | 랜딩 페이지 시각 구현은 기존 Figma 파일을 기준으로 맞추고, 새 디자인 파일 생성을 기본값으로 삼지 않습니다. | `docs/design/landing-page-brief.md` |
| INV-010 | 구현 스택은 사전 검토 없이 Next.js로 고정하지 않습니다. 더 적합한 기존 스택이 없을 때 Next.js를 사용합니다. | `docs/engineering/architecture.md` |

## 검증 게이트 라우팅

모든 구현 완료 판단은 `docs/engineering/quality-gates.md`를 기준으로 합니다. 이 문서에서는 게이트를 어떤 영역에 연결할지만 정의합니다.

| 게이트 영역 | 대표 확인 항목 | 원천 문서 |
| --- | --- | --- |
| 제품 범위 | 제외 범위가 구현되지 않았는지 확인합니다. | `docs/product/mvp-scope.md` |
| 방문자 흐름 | 랜딩 확인, 일정 확인, 문의 입력, 제출 결과 확인이 가능한지 확인합니다. | `docs/product/user-flow.md` |
| 데이터 저장 | 필수값과 개인정보 동의가 있는 문의가 Supabase에 저장되는지 확인합니다. | `docs/engineering/architecture.md` |
| 관리자 보호 | 접근 키 또는 단일 관리자 비밀번호 없이는 문의 목록을 볼 수 없는지 확인합니다. | `docs/engineering/architecture.md` |
| 랜딩 UI | 모바일 360px 이상에서 가로 스크롤 없이 핵심 정보와 폼을 사용할 수 있는지 확인합니다. | `docs/design/landing-page-brief.md` |
| 접근성 | 대비, 포커스, 라벨, 색상 외 상태 전달 기준을 확인합니다. | `docs/design/landing-page-brief.md` |
| 개인정보 | 수집 목적, 보관 기간, 삭제 요청, 민감정보 입력 금지 안내를 확인합니다. | `docs/operations/operating-guide.md` |
| 배포 | 외부 URL에서 랜딩 페이지와 주요 경로가 접근 가능한지 확인합니다. | `docs/engineering/quality-gates.md` |

검증 도구 선택 기준:

- 화면 렌더링, 콘솔 오류, 네트워크 실패, 반응형 뷰포트 확인은 `chrome-devtools` MCP가 사용 가능하면 우선 검토합니다.
- Figma 대비 시각 확인은 Figma 파일과 실제 브라우저 화면을 함께 비교합니다.
- `chrome-devtools` MCP가 없으면 Vercel 브라우저 검증 도구, Playwright, Chrome headless 중 현재 저장소에서 가장 실행 가능한 도구를 사용합니다.
- 어떤 도구를 사용했는지와 확인한 뷰포트 크기는 작업 결과에 남깁니다.

## 반복 스킬 후보

아래 항목은 같은 작업이 반복될 경우 별도 스킬 또는 체크리스트로 분리할 후보입니다. 아직 스킬 파일을 만들지는 않고, 반복성이 확인될 때만 추가합니다.

| 후보 | 트리거 | 입력 문서 | 기대 산출물 |
| --- | --- | --- | --- |
| MVP 범위 리뷰 | 새 기능 추가 요청 또는 범위 확장 요청 | `docs/product/mvp-scope.md` | 3일 MVP 포함/제외 판단, 위험 목록 |
| 랜딩 브리프 리뷰 | 디자인 개선, 접근성 개선, 반응형 개선 요청 | `docs/design/landing-page-brief.md` | 섹션/토큰/상태 개선안 |
| 사용자 흐름 정합성 점검 | 폼, 관리자 화면, 예외 상태 변경 | `docs/product/user-flow.md` | 흐름 누락, 상태 충돌, 예외 흐름 보완안 |
| Supabase 보안 점검 | DB/API/환경변수 변경 | `docs/engineering/architecture.md` | 키 노출 위험, RLS/서버 경계 점검 |
| 배포 전 품질 점검 | 구현 완료 또는 배포 전 | `docs/engineering/quality-gates.md` | 게이트별 통과/실패 결과 |
| Figma-구현 정합성 점검 | 랜딩 페이지 구현 또는 디자인 수정 | Figma 디자인 파일, `docs/design/landing-page-brief.md` | 시각 차이, 반응형 차이, 접근성 차이 |
| 기술 스택 선정 리뷰 | 새 앱 구현 시작 또는 배포 방식 결정 | `docs/engineering/architecture.md` | 후보 비교, 선택 근거, Next.js 사용 여부 판단 |
| 운영 기준 점검 | 운영 체크리스트 또는 개인정보 처리 변경 | `docs/operations/operating-guide.md` | 운영 범위 초과 여부, 개인정보 위험 목록 |
| 구현 인수인계 점검 | 작업 완료 후 다음 작업 연결 | `docs/implementation-brief.md` | 변경 전후, 검증 결과, 남은 작업 |

## 변경 우선순위

| 변경 유형 | 먼저 수정할 문서 | 함께 확인할 문서 |
| --- | --- | --- |
| 서비스 기능 범위 추가 또는 제외 | `docs/product/mvp-scope.md` | `docs/product/user-flow.md`, `docs/engineering/quality-gates.md` |
| 방문자 또는 운영자 흐름 변경 | `docs/product/user-flow.md` | `docs/product/mvp-scope.md`, `docs/design/landing-page-brief.md` |
| 랜딩 페이지 섹션, 문구, 디자인 변경 | `docs/design/landing-page-brief.md` | `docs/product/user-flow.md`, `docs/engineering/quality-gates.md` |
| Figma 디자인 파일 변경 | Figma 디자인 파일 | `docs/design/landing-page-brief.md`, `docs/engineering/quality-gates.md` |
| Supabase, 관리자 보호, API 구조 변경 | `docs/engineering/architecture.md` | `docs/product/mvp-scope.md`, `docs/engineering/quality-gates.md` |
| 기술 스택 또는 배포 방식 결정 | `docs/engineering/architecture.md` | `docs/implementation-brief.md`, `docs/engineering/quality-gates.md` |
| 테스트 또는 배포 전 확인 기준 변경 | `docs/engineering/quality-gates.md` | `docs/product/mvp-scope.md`, `docs/design/landing-page-brief.md` |
| 실제 운영 처리 방식 변경 | `docs/operations/operating-guide.md` | `docs/product/mvp-scope.md`, `docs/product/user-flow.md` |
| 작업 절차 또는 인수인계 방식 변경 | `docs/implementation-brief.md` | `AGENTS.md`, `docs/harness-map.md` |

## 중복 방지 원칙

- 제품 요구사항의 원문은 `mvp-scope.md`에만 둡니다.
- 사용자 흐름은 `user-flow.md`에만 둡니다.
- 랜딩 페이지 섹션, 디자인 토큰, 폼 상태는 `landing-page-brief.md`에만 두고, 실제 시각 구현 기준은 기존 Figma 파일을 함께 참조합니다.
- 구현 구조와 보안 경계는 `architecture.md`에만 둡니다.
- 검증 기준은 `quality-gates.md`에만 둡니다.
- 운영 절차는 `operating-guide.md`에만 둡니다.
- 작업 순서와 인수인계 체크리스트는 `implementation-brief.md`에만 둡니다.
- 다른 문서에서 같은 내용이 필요하면 원문을 복사하지 않고 해당 문서 경로를 참조합니다.

## 현재 작업 흐름

1. `AGENTS.md`에서 기본 작업 규칙을 확인합니다.
2. `docs/harness-map.md`에서 서비스 MVP 작업인지 랜딩 페이지 작업인지 분리합니다.
3. 서비스 MVP 작업이면 `mvp-scope.md`, `user-flow.md`, `architecture.md`, `operations/operating-guide.md` 순서로 확인합니다.
4. 랜딩 페이지 작업이면 기존 Figma 파일, `landing-page-brief.md`, `user-flow.md`, `quality-gates.md` 순서로 확인합니다.
5. 구현 작업이면 `implementation-brief.md`의 작업 시작 순서를 따르고, 기술 스택을 먼저 검토합니다.
6. 완료 전 `quality-gates.md`로 검증하고, 가능하면 `chrome-devtools` MCP로 화면/콘솔/반응형을 확인합니다.
7. 사용한 검증 도구, 확인한 뷰포트, 변경 전후 차이를 작업 결과에 남깁니다.
