export const workshop = {
  brand: "작은 워크숍",
  badge: "소규모 오프라인 워크숍",
  title: "하루에 완성하는 나만의 작은 워크숍",
  description:
    "노트와 대화를 바탕으로 내 관심사를 작은 오프라인 워크숍 형태로 정리해 보는 3시간 프로그램입니다.",
  facts: ["초보자도 참여 가능", "소규모 오프라인 진행", "문의 접수 후 운영자가 개별 안내"],
  target:
    "작게 시작해 보고 싶은 아이디어가 있지만 어디서부터 정리해야 할지 막막한 분에게 맞습니다.",
  location: {
    name: "서울 성수동 공유 작업실",
    address: "서울 성동구 연무장길 00, 3층",
    mapText: "상세 위치는 접수 확인 후 개별 안내합니다.",
    notice: "시작 10분 전 도착을 권장합니다. 노트북 또는 필기구를 준비해 주세요."
  }
};

export const schedules = [
  {
    id: "2026-06-10-14",
    label: "6월 10일 수요일",
    time: "오후 2:00 - 5:00",
    capacity: "최대 8명",
    location: "성수동 공유 작업실",
    price: "1인 60,000원",
    status: "available",
    statusText: "문의 가능"
  },
  {
    id: "2026-06-14-10",
    label: "6월 14일 일요일",
    time: "오전 10:00 - 오후 1:00",
    capacity: "최대 8명",
    location: "성수동 공유 작업실",
    price: "1인 60,000원",
    status: "limited",
    statusText: "마감 임박"
  },
  {
    id: "2026-06-18-19",
    label: "6월 18일 목요일",
    time: "오후 7:00 - 10:00",
    capacity: "최대 8명",
    location: "성수동 공유 작업실",
    price: "1인 60,000원",
    status: "closed",
    statusText: "마감"
  }
];

export const introItems = [
  "워크숍 주제를 구체화하고 참여자에게 설명할 핵심 문장을 정리합니다.",
  "진행 순서와 준비물을 짧은 체크리스트로 만듭니다.",
  "운영자가 확인할 수 있는 문의 접수 흐름을 만듭니다."
];

export const operatingChecklist = [
  {
    group: "장소",
    items: ["장소 예약 여부 확인", "주소 안내 문구 확인", "입장 방법 확인"]
  },
  {
    group: "일정",
    items: ["날짜와 시작 시간 확인", "모집 인원 확인", "마감 일정 표시 확인"]
  },
  {
    group: "준비물",
    items: ["운영자 준비물 확인", "참여자 준비물 안내", "현장 비치 물품 확인"]
  },
  {
    group: "연락",
    items: ["참여 가능 여부 수동 안내", "사전 안내 메시지 준비", "개인정보 삭제 요청 경로 안내"]
  }
];
