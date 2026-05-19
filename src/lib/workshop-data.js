export const workshop = {
  brand: "작은 워크숍",
  title: "하루에 완성하는 나만의 작은 워크숍",
  badge: "소규모 오프라인 워크숍",
  description:
    "처음 참여하는 분도 부담 없이 따라올 수 있는 오프라인 실습형 워크숍입니다.",
  target: "처음 시작하는 분, 실습 중심으로 배우고 싶은 분",
  format: "오프라인 실습 2시간",
  location: "서울 성수동",
  address: "서울 성동구 성수이로 00, 3층 워크룸",
  price: "45,000원",
  mapUrl: "https://map.naver.com/",
};

export const schedules = [
  {
    id: "2026-06-10-14",
    label: "6월 10일 수요일 오후 2시",
    date: "6월 10일 수요일",
    time: "오후 2:00 - 4:00",
    capacity: "모집 8명",
    location: "서울 성수동",
    price: "45,000원",
    statusText: "문의 가능",
    status: "available",
  },
  {
    id: "2026-06-14-10",
    label: "6월 14일 일요일 오전 10시",
    date: "6월 14일 일요일",
    time: "오전 10:00 - 12:00",
    capacity: "모집 8명",
    location: "서울 성수동",
    price: "45,000원",
    statusText: "마감 임박",
    status: "limited",
  },
  {
    id: "2026-06-18-19",
    label: "6월 18일 목요일 오후 7시",
    date: "6월 18일 목요일",
    time: "오후 7:00 - 9:00",
    capacity: "모집 8명",
    location: "서울 성수동",
    price: "45,000원",
    statusText: "마감",
    status: "closed",
  },
];

export const introItems = [
  "처음 시작하지만 혼자 막막한 분",
  "설명보다 실습 중심으로 배우고 싶은 분",
  "개인 노트북으로 바로 따라 해보고 싶은 분",
];

export const preparationItems = [
  "개인 노트북과 충전기를 준비해 주세요.",
  "시작 10분 전 도착을 권장합니다.",
  "문의 접수 후 운영자가 참여 가능 여부를 별도로 안내합니다.",
];

export const operationsChecklist = [
  {
    group: "장소",
    items: ["장소 예약 여부 확인", "주소 안내 정확성 확인", "입장 방법 확인"],
  },
  {
    group: "일정",
    items: ["날짜와 시작 시간 확인", "소요 시간 확인", "모집 인원 확인"],
  },
  {
    group: "준비물",
    items: ["운영자 준비물 확인", "참여자 준비물 안내", "현장 비치 물품 확인"],
  },
  {
    group: "연락",
    items: ["참여 가능 여부 수동 안내", "사전 안내 메시지 발송", "당일 안내 준비"],
  },
  {
    group: "진행",
    items: ["시작 전 세팅", "출석 확인", "종료 후 후속 안내"],
  },
];
