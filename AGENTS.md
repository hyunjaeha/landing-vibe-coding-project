# Codex 작업 안내

이 파일은 에이전트가 작업을 시작할 때 확인할 목차와 작업 규칙만 담습니다. 제품 범위, 디자인 기준, 아키텍처 기준, 품질 게이트, 운영 기준의 상세 내용은 `docs/` 아래 문서를 기준으로 합니다.

## 문서 목차

| 문서 | 역할 |
| --- | --- |
| `docs/harness-map.md` | 저장소 지식 구조와 문서별 책임을 설명하는 최상위 지도 |
| `docs/product/mvp-scope.md` | 서비스 정의, MVP 범위, PRD, 기능/비기능 요구사항의 단일 기준 |
| `docs/product/user-flow.md` | PRD를 기준으로 한 방문자/운영자 흐름과 예외 흐름 |
| `docs/design/landing-page-brief.md` | 랜딩 페이지 섹션, 디자인 토큰, 접근성, 반응형, 폼 상태 기준 |
| `docs/engineering/architecture.md` | 구현 아키텍처, Supabase 연동, 관리자 접근 보호, 환경변수 기준 |
| `docs/engineering/quality-gates.md` | 배포 전 검증, 접근성, 개인정보, 반응형, 데이터 저장 품질 기준 |
| `docs/operations/operating-guide.md` | 운영자가 실제 워크숍 전후로 확인할 운영 기준 |
| `docs/implementation-brief.md` | 구현 작업을 시작할 때 참조할 문서 순서와 인수인계 기준 |

## 작업 규칙

- 항상 한국어 존댓말로 답변합니다.
- 설명이나 수정 전에 관련 파일의 현재 내용을 먼저 확인합니다.
- 같은 내용을 여러 문서에 복사하지 않고, 한 문서를 원천으로 정한 뒤 다른 문서에서는 링크와 역할만 남깁니다.
- 제품 범위 변경은 `docs/product/mvp-scope.md`를 먼저 수정합니다.
- 사용자 흐름 변경은 `docs/product/user-flow.md`를 수정하되, 기능 범위를 바꾸는 경우 `mvp-scope.md`와 충돌하지 않게 확인합니다.
- 화면, 카피, 디자인 토큰, 접근성 기준 변경은 `docs/design/landing-page-brief.md`를 수정합니다.
- 구현 구조, API, DB, 환경변수, 보안 경계 변경은 `docs/engineering/architecture.md`를 수정합니다.
- 테스트, 배포 전 확인, 접근성/개인정보 검증 기준 변경은 `docs/engineering/quality-gates.md`를 수정합니다.
- 운영 방식, 수동 응대, 체크리스트, 개인정보 보관/삭제 처리 기준 변경은 `docs/operations/operating-guide.md`를 수정합니다.
- 중복 파일을 새로 만들지 않습니다. 기존 문서가 같은 역할을 하고 있으면 그 문서를 갱신합니다.
- 작업 후 변경 전후 차이와 확인 결과를 간단히 보고합니다.
