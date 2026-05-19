# 구현 인수인계 기준

## 문서 역할

이 문서는 구현 작업을 시작할 때 어떤 기준을 먼저 확인하고, 작업 중 무엇을 지키며, 완료 후 어떤 형식으로 인수인계할지 정합니다.

- 이 문서에 쓰는 내용: 시작 전 판단, 구현 중 유지 조건, 산출물 기준, 문서 동기화 기준, 검증과 인수인계 체크리스트, 바로 사용할 구현 요청 예시
- 이 문서에 쓰지 않는 내용: PRD 원문 전체, 사용자 흐름 상세, 디자인 토큰 전체, 운영 절차 전체, 실제 코드 구현

기준 문서:

- 지식 맵: `docs/harness-map.md`
- 제품 범위: `docs/product/mvp-scope.md`
- 사용자 흐름: `docs/product/user-flow.md`
- 랜딩 기준: `docs/design/landing-page-brief.md`
- 아키텍처: `docs/engineering/architecture.md`
- 품질 게이트: `docs/engineering/quality-gates.md`
- 운영 기준: `docs/operations/operating-guide.md`

## 시작 전 판단

작업을 시작하기 전에 먼저 작업 유형을 분리합니다.

| 작업 유형 | 먼저 확인할 기준 | 다음 확인 기준 |
| --- | --- | --- |
| 서비스 MVP 범위 작업 | `docs/product/mvp-scope.md` | `docs/product/user-flow.md`, `docs/engineering/architecture.md` |
| 랜딩 페이지 화면 작업 | 기존 Figma 파일 | `docs/design/landing-page-brief.md`, `docs/product/user-flow.md` |
| Supabase 또는 API 작업 | `docs/engineering/architecture.md` | `docs/product/mvp-scope.md`, `docs/engineering/quality-gates.md` |
| 관리자 화면 작업 | `docs/product/user-flow.md` | `docs/engineering/architecture.md`, `docs/operations/operating-guide.md` |
| 검증 또는 배포 작업 | `docs/engineering/quality-gates.md` | `docs/harness-map.md`의 검증 도구 선택 기준 |
| 운영 기준 변경 | `docs/operations/operating-guide.md` | `docs/product/mvp-scope.md`, `docs/product/user-flow.md` |

공통 시작 순서:

1. `AGENTS.md`에서 작업 규칙과 문서 목차를 확인합니다.
2. `docs/harness-map.md`에서 서비스 MVP 작업인지 랜딩 페이지 작업인지 분리합니다.
3. 3일 MVP 범위를 넘어서는 요구사항은 바로 구현하지 않고 후속 범위로 분리합니다.
4. 기존 파일, 기존 문서, 기존 디자인 파일이 같은 역할을 하고 있는지 먼저 확인합니다.
5. 새 파일을 만들기 전에 기존 문서나 코드로 해결할 수 있는지 확인합니다.

## Figma 기준 확인

랜딩 페이지 구현 또는 디자인 수정 작업은 이미 만들어진 Figma 파일을 우선 기준으로 삼습니다.

- 기준 Figma: [소규모 워크숍 문의 랜딩페이지 모바일 우선](https://www.figma.com/design/BmEnBwIBT7GfabO85UGaTx/%EC%86%8C%EA%B7%9C%EB%AA%A8-%EC%9B%8C%ED%81%AC%EC%88%8D-%EB%AC%B8%EC%9D%98-%EB%9E%9C%EB%94%A9%ED%8E%98%EC%9D%B4%EC%A7%80---%EB%AA%A8%EB%B0%94%EC%9D%BC-%EC%9A%B0%EC%84%A0?node-id=0-1&t=OL8lhxow4DBMnCJi-1)
- 새 Figma 파일 생성보다 기존 파일 수정과 재사용을 우선합니다.
- Figma와 `landing-page-brief.md`가 충돌하면 어느 기준이 최신인지 먼저 확인합니다.
- 구현 후에는 실제 브라우저 화면이 Figma의 모바일 우선 구조와 크게 어긋나지 않는지 확인합니다.

## 기술 스택 선정

구현 기술은 사전 검토 없이 Next.js로 고정하지 않습니다.

| 순서 | 확인 항목 | 판단 기준 |
| --- | --- | --- |
| 1 | 기존 앱 구조 | 저장소에 이미 프레임워크, 패키지 매니저, 배포 설정이 있으면 먼저 재사용합니다. |
| 2 | 서버 측 처리 가능 여부 | 문의 저장, 필수값 검증, 관리자 접근 보호, 비밀값 보호가 가능한지 확인합니다. |
| 3 | Supabase 연동 난이도 | 문의 저장과 관리자 목록 조회를 3일 안에 안정적으로 구현할 수 있는지 봅니다. |
| 4 | 배포 난이도 | 외부 URL 배포와 환경변수 설정이 단순한지 확인합니다. |
| 5 | 최종 선택 | 더 적합한 기존 스택이나 단순한 대안이 없을 때 Next.js를 사용합니다. |

선택 근거에는 다음을 남깁니다.

- 검토한 후보
- 선택한 스택
- 선택 이유
- 포기한 대안과 이유
- 비밀값을 브라우저에 노출하지 않는 방식

## 구현 중 유지 조건

아래 조건은 구현 방식과 관계없이 유지합니다.

| 영역 | 유지 조건 |
| --- | --- |
| 제품 범위 | 결제, 자동 예약 확정, 자동 문자/이메일 발송, 고급 대시보드, 다중 권한 관리는 만들지 않습니다. |
| 문의 제출 | 문의 제출은 예약 확정이 아니라 운영자 확인 전 접수 상태로 표현합니다. |
| 데이터 저장 | 문의 데이터는 Supabase 단일 문의 테이블에 저장합니다. |
| 서버 검증 | 이름, 전화번호, 희망 일정, 개인정보 동의는 서버 측에서도 다시 검증합니다. |
| 비밀값 보호 | Supabase 서비스 역할 키와 관리자 비밀 값은 브라우저 번들에 포함하지 않습니다. |
| 관리자 접근 | 문의 목록은 관리자 접근 보호를 통과한 경로에서만 조회합니다. |
| 운영 체크리스트 | 정적으로 표시하고 체크 상태 저장은 만들지 않습니다. |
| 접근성 | 오류, 마감, 성공 상태는 색상만으로 전달하지 않고 텍스트를 함께 표시합니다. |

## 구현 산출물 기준

| 영역 | 산출물 기준 |
| --- | --- |
| 방문자 랜딩 | 워크숍 정보, 일정 안내, 장소 안내, 문의 폼, 개인정보 동의, 제출 결과 상태를 포함합니다. |
| 관리자 화면 | 단일 관리자 접근 보호, 문의 목록, 빈 상태, 로딩 실패 상태, 정적 운영 체크리스트를 포함합니다. |
| 데이터 저장 | Supabase에 문의를 한 가지 방식으로 저장하고, 접수 시간이 포함됩니다. |
| 개인정보 | 수집 목적, 보관 기준, 삭제 요청 안내, 민감정보 입력 방지 문구를 화면에 표시합니다. |
| Figma 정합성 | 기존 Figma 파일의 모바일 우선 구조와 실제 구현 화면의 주요 차이를 확인합니다. |
| 기술 스택 | 선택한 스택과 선택 근거, 포기한 대안, 비밀값 보호 방식을 남깁니다. |
| 검증 결과 | 사용한 검증 도구, 확인한 뷰포트, 콘솔 오류 여부, 실행하지 못한 검증과 이유를 남깁니다. |

## 변경 유형별 문서 업데이트 순서

| 변경 유형 | 1차 기준 | 함께 확인할 기준 |
| --- | --- | --- |
| 기능 범위 변경 | `docs/product/mvp-scope.md` | `docs/product/user-flow.md`, `docs/engineering/quality-gates.md` |
| 화면 흐름 변경 | `docs/product/user-flow.md` | `docs/design/landing-page-brief.md`, `docs/product/mvp-scope.md` |
| 랜딩 UI 변경 | 기존 Figma 파일, `docs/design/landing-page-brief.md` | `docs/product/user-flow.md`, `docs/engineering/quality-gates.md` |
| Figma 디자인 파일 변경 | 기존 Figma 파일 | `docs/design/landing-page-brief.md`, `docs/engineering/quality-gates.md` |
| DB/API/보안 변경 | `docs/engineering/architecture.md` | `docs/product/mvp-scope.md`, `docs/engineering/quality-gates.md` |
| 기술 스택 또는 배포 방식 결정 | `docs/engineering/architecture.md` | `docs/harness-map.md`, `docs/engineering/quality-gates.md` |
| 검증 기준 변경 | `docs/engineering/quality-gates.md` | `docs/product/mvp-scope.md`, `docs/design/landing-page-brief.md` |
| 운영 처리 변경 | `docs/operations/operating-guide.md` | `docs/product/mvp-scope.md`, `docs/product/user-flow.md` |
| 구현 인수인계 방식 변경 | `docs/implementation-brief.md` | `AGENTS.md`, `docs/harness-map.md` |

## 구현 전 체크리스트

- 기존 파일과 문서가 같은 역할을 이미 담당하고 있는지 확인합니다.
- 새 문서나 새 코드를 만들기 전에 재사용 가능한 기존 자산을 확인합니다.
- 작업이 서비스 MVP 작업인지 랜딩 페이지 작업인지 분리합니다.
- 랜딩 페이지 작업이면 기존 Figma 파일을 확인합니다.
- 기술 스택을 바로 확정하지 않고 기존 스택과 후보를 비교합니다.
- 3일 MVP 범위를 넘어서는 요구사항은 후속 범위로 분리합니다.
- Supabase 서비스 역할 키가 브라우저 번들에 포함될 위험이 없는지 확인합니다.
- 관리자 비밀 값이 클라이언트 코드나 공개 저장소에 노출될 위험이 없는지 확인합니다.
- 문의 제출 검증을 서버 측에서도 수행할 수 있는지 확인합니다.
- 관리자 문의 목록이 접근 보호 뒤에서만 조회되는지 확인합니다.

## 구현 후 인수인계 체크리스트

- 변경 전후 차이를 기록합니다.
- 수정한 파일 목록을 남깁니다.
- 선택한 기술 스택과 선택 근거를 남깁니다.
- Figma 기준과 실제 구현의 주요 차이를 남깁니다.
- 실행한 검증 명령과 결과를 기록합니다.
- 사용한 검증 도구를 기록합니다.
- `chrome-devtools` MCP 사용 가능 여부와 대체 도구 사용 사유를 남깁니다.
- 확인한 뷰포트 크기를 남깁니다.
- 콘솔 오류, 네트워크 실패, 반응형 깨짐 여부를 남깁니다.
- 실행하지 못한 검증이 있으면 이유를 기록합니다.
- 함께 갱신해야 할 제품, 흐름, 디자인, 아키텍처, 품질, 운영 문서가 남아 있는지 확인합니다.

## 바로 사용할 구현 요청 예시

아래 예시는 다음 구현 작업을 시작할 때 그대로 복사해 사용할 수 있습니다. 실제 요청 전에는 현재 작업 범위에 맞지 않는 줄을 제거합니다.

### 전체 MVP 구현 요청

```text
AGENTS.md와 docs/harness-map.md를 먼저 확인하고, docs/product/mvp-scope.md, docs/product/user-flow.md, docs/design/landing-page-brief.md, docs/engineering/architecture.md, docs/engineering/quality-gates.md, docs/operations/operating-guide.md 기준으로 3일 MVP 범위의 소규모 오프라인 워크숍 문의 랜딩 서비스를 구현해 주세요.

기술 스택은 바로 Next.js로 고정하지 말고 기존 저장소 상태와 후보를 검토한 뒤 선택 근거를 남겨 주세요. 더 적합한 기존 스택이나 단순한 대안이 없을 때 Next.js를 사용해 주세요.

랜딩 페이지는 기존 Figma 파일 "소규모 워크숍 문의 랜딩페이지 모바일 우선"을 우선 기준으로 하고, 새 Figma 파일은 만들지 마세요. 문의 제출은 예약 확정이 아니라 접수 상태로 표현해 주세요.

Supabase에 문의 데이터를 저장하되, 서비스 역할 키와 관리자 비밀 값은 브라우저에 노출하지 마세요. 관리자 화면은 단일 관리자 접근 보호 뒤에서 문의 목록과 정적 운영 체크리스트만 보여 주세요.

완료 후 변경 전후 차이, 선택한 기술 스택과 이유, 실행한 검증, 확인한 뷰포트, 콘솔 오류 여부, 실행하지 못한 검증 사유를 보고해 주세요.
```

### 랜딩 페이지 구현 요청

```text
기존 Figma 파일 "소규모 워크숍 문의 랜딩페이지 모바일 우선"과 docs/design/landing-page-brief.md를 기준으로 방문자 랜딩 페이지를 구현해 주세요.

모바일 우선으로 작업하고, 워크숍 첫 화면, 소개, 일정 안내, 장소 안내, 문의 폼, 제출 결과 메시지, 개인정보 안내를 포함해 주세요. CTA는 문의 제출로만 연결하고 예약 확정, 결제, 할인, 마감 압박 문구는 사용하지 마세요.

구현 후 Figma 기준과 달라진 부분, 360px/430px/768px/1024px 뷰포트 확인 결과, 콘솔 오류 여부를 보고해 주세요. chrome-devtools MCP가 사용 가능하면 우선 사용하고, 없으면 대체 검증 도구와 이유를 남겨 주세요.
```

### Supabase 문의 저장 구현 요청

```text
docs/engineering/architecture.md와 docs/product/mvp-scope.md 기준으로 문의 제출 저장 기능을 구현해 주세요.

문의 데이터는 Supabase 단일 문의 테이블에 저장하고, 이름, 전화번호, 희망 일정, 참여 인원, 문의 내용, 개인정보 동의 여부, 접수 시간을 다뤄 주세요. 이름, 전화번호, 희망 일정, 개인정보 동의는 서버 측에서도 검증해 주세요.

Supabase 서비스 역할 키와 관리자 비밀 값은 브라우저 코드에 포함하지 마세요. 제출 성공은 예약 확정이 아니라 접수 완료로 표현하고, 실패 시 입력값을 유지할 수 있게 해 주세요.

완료 후 저장 성공/필수값 누락/개인정보 동의 누락/제출 실패 케이스별 확인 결과를 보고해 주세요.
```

### 관리자 화면 구현 요청

```text
docs/product/user-flow.md, docs/engineering/architecture.md, docs/operations/operating-guide.md 기준으로 최소 관리자 화면을 구현해 주세요.

단일 관리자 접근 보호를 통과한 뒤에만 Supabase 문의 목록을 최신순으로 볼 수 있게 해 주세요. 문의가 없을 때 빈 상태, 로딩 실패 상태, 접근 실패 상태를 처리해 주세요.

운영 체크리스트는 정적으로 표시하고 체크 상태 저장, 담당자 배정, 자동 알림, 통계, 검색, 다중 권한 관리는 만들지 마세요.

완료 후 접근 보호 전/후, 문의 있음/없음, 로딩 실패, 체크리스트 표시 케이스를 확인해 보고해 주세요.
```

### 배포 전 검증 요청

```text
docs/engineering/quality-gates.md 기준으로 배포 전 검증을 수행해 주세요.

가능하면 chrome-devtools MCP로 화면 렌더링, 콘솔 오류, 네트워크 실패, 모바일/태블릿/데스크톱 반응형을 확인해 주세요. 사용할 수 없으면 Vercel 브라우저 검증 도구, Playwright, Chrome headless 중 현재 환경에서 실행 가능한 도구를 사용하고 대체 사유를 남겨 주세요.

최소 확인 뷰포트는 360px, 430px, 768px, 1024px입니다. 문의 제출 성공, 필수값 오류, 개인정보 동의 누락, 관리자 접근 실패, 관리자 목록 표시를 함께 확인해 주세요.
```

## 반복 스킬 후보

아래 항목은 같은 유형의 작업이 반복되면 실제 Codex 스킬 또는 별도 체크리스트 문서로 분리할 후보입니다. 아직은 이 문서의 재사용 섹션으로 유지합니다.

| 스킬 후보 | 사용할 때 | 입력 | 출력 |
| --- | --- | --- | --- |
| `mvp-scope-review` | 새 기능이 3일 MVP 범위인지 판단할 때 | `mvp-scope.md`, 요청 내용 | 포함/제외 판단, 위험, 추천 수정안 |
| `figma-landing-implementation` | 기존 Figma 랜딩을 코드로 구현하거나 수정할 때 | Figma 파일, `landing-page-brief.md` | 구현 범위, Figma 대비 차이, 반응형 확인 |
| `supabase-inquiry-security-review` | Supabase 저장, 관리자 조회, 환경변수 작업을 할 때 | `architecture.md`, 코드 변경 | 키 노출 위험, 서버 검증, 접근 보호 점검 |
| `quality-gate-runner` | 배포 전 검증을 반복할 때 | `quality-gates.md`, 실행 URL | 게이트별 통과/실패, 콘솔/반응형/데이터 결과 |
| `implementation-handoff` | 구현 완료 후 다음 작업자가 이어받아야 할 때 | 변경 파일, 검증 결과 | 변경 전후, 남은 위험, 다음 작업 체크리스트 |
