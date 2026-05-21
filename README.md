# 작은 워크숍 랜딩

소규모 오프라인 워크숍의 안내, 문의 접수, 운영자 확인을 위한 Next.js MVP입니다.

```mermaid
flowchart LR
  V[방문자] --> L[랜딩 페이지]
  L --> S[일정 확인]
  L --> F[문의 폼]
  F --> A[/API: 문의 접수/]
  A --> DB[(Supabase inquiries)]
  O[운영자] --> M[관리자 화면]
  M --> DB
  M --> C[운영 체크리스트]
```

## 구조

```mermaid
flowchart TB
  R[repository root] --> App[docs/ Next.js app]
  App --> Pages[src/app]
  App --> UI[src/components]
  App --> Logic[src/lib]
  App --> DB[supabase/schema.sql]
  App --> Guide[docs/ 기준 문서]

  Guide --> Product[product/mvp-scope.md]
  Guide --> Flow[product/user-flow.md]
  Guide --> Design[design/landing-page-brief.md]
  Guide --> Arch[engineering/architecture.md]
  Guide --> Quality[engineering/quality-gates.md]
  Guide --> Ops[operations/operating-guide.md]
```

## 화면

```mermaid
journey
  title 사용자 흐름
  section 방문자
    워크숍 정보 확인: 5: 방문자
    일정 선택: 4: 방문자
    문의 제출: 5: 방문자
  section 시스템
    입력값 검증: 4: API
    Supabase 저장: 4: API
  section 운영자
    관리자 접근: 3: 운영자
    문의 확인: 5: 운영자
    수동 안내: 4: 운영자
```

## 데이터

```mermaid
erDiagram
  inquiries {
    uuid id PK
    text name
    text phone
    text preferred_schedule
    integer participant_count
    text message
    boolean privacy_consent
    timestamptz created_at
  }
```

## 실행

```bash
cd docs
npm install
npm run dev
```

## 품질

```bash
cd docs
npm test
npm run build
```

## 기준 문서

| 기준   | 문서                                                                                 |
| ------ | ------------------------------------------------------------------------------------ |
| 범위   | [`docs/docs/product/mvp-scope.md`](docs/docs/product/mvp-scope.md)                   |
| 흐름   | [`docs/docs/product/user-flow.md`](docs/docs/product/user-flow.md)                   |
| 디자인 | [`docs/docs/design/landing-page-brief.md`](docs/docs/design/landing-page-brief.md)   |
| 구조   | [`docs/docs/engineering/architecture.md`](docs/docs/engineering/architecture.md)     |
| 검증   | [`docs/docs/engineering/quality-gates.md`](docs/docs/engineering/quality-gates.md)   |
| 운영   | [`docs/docs/operations/operating-guide.md`](docs/docs/operations/operating-guide.md) |

## 다음 작업 체크

- [ ] `docs/.env.example` 기준으로 Supabase 환경변수 확인
- [ ] `docs/supabase/schema.sql` 적용 여부 확인
- [ ] `npm test` 통과 확인
- [ ] `npm run build` 통과 확인
