import type { SiteConfig } from '@/domain/site-config/types';

/**
 * ┌─────────────────────────────────────────────┐
 * │  경주 씨엘 미니호텔 — 웹사이트 설정             │
 * │                                             │
 * │  새 호텔 세팅 시                              │
 * │  아래 값들만 교체하면 됩니다.                  │
 * └─────────────────────────────────────────────┘
 */

export const siteConfig: SiteConfig = {

  /* ── 기본 정보 ─────────────────────────────── */
  /** 호텔 고유 ID (폴더명과 동일하게) */
  id: "gyeongju-cl",
  /** 호텔 정식 명칭 */
  name: "경주 씨엘 미니호텔",
  /** 호텔 영문 명칭 — 히어로·헤더에 표시 */
  nameEn: "GYEONGJU CL MINI HOTEL",
  /** 소재 도시 */
  city: "경북 경주",
  /** 주소 — 지도 검색에도 사용됨 */
  address: "경북 경주시 북정로 68",
  /** 대표 연락처 */
  phone: "010-2881-4995",
  /** 이메일 — 없으면 빈 문자열 (화면에 표시되지 않음) */
  email: "",

  /* ── Hero 섹션 (배너 슬라이드 이미지, 최대 5장) ── */
  heroImages: [
    "https://cdn.coolstay.co.kr/upload/etc/tnwjdtnwjd99/2024/04/15/11/d70c83c6dac24441953ada2185e93119.jpg",
    "https://storage.googleapis.com/coolstay-dev/v2/owner/shark1230/2024/05/28/10/85d9ae002f184020b52ca5ff9593ad5f.jpg",
    "https://storage.googleapis.com/coolstay-dev/v2/owner/shark1230/2024/05/28/10/1e3f4110ca264bb4865c4e45831f1b30.jpg",
    "https://storage.googleapis.com/coolstay-dev/v2/owner/shark1230/2024/05/28/10/e83e1d63b4b746b9affc5962bda43b57.jpg",
  ],
  /** 한 줄 컨셉 문구 — 브라우저 탭 제목에 표시 */
  shortConcept: "경주 도심 속 편안한 휴식",

  /* ── 인사말 섹션 ────────────────────────────── */
  greeting: {
    /** 인사말 제목 (줄바꿈: \n) */
    headline: "경주 씨엘 미니호텔에 오신 것을 환영합니다",
    /** 인사말 본문 — 문단 구분은 \n\n */
    body: "천년 고도 경주의 중심에 자리한 씨엘 미니호텔입니다.\n\n깨끗하고 편안한 객실에서 경주 여행의 피로를 풀고, 주변 관광지와 맛집을 도보로 즐겨보세요. 가성비 좋은 숙박과 정성 어린 서비스로 여행의 즐거움을 더해드리겠습니다.",
    /** 서명 — 뒤에 "올림"이 자동으로 붙음 */
    signature: "씨엘 미니호텔 일동",
  },

  /* ── 호텔 소개(About) 섹션 ──────────────────── */
  about: {
    /** 섹션 소제목 — 제목 위에 작게 표시 */
    subtitle: "About",
    /** 제목 (줄바꿈: \n) */
    title: "경주의 중심에서\n편안한 하루를",
    /** 본문 설명 */
    body: "경주 시내 중심부에 위치한 씨엘 미니호텔은 대릉원, 첨성대, 동궁과 월지 등 주요 관광지를 도보로 이동할 수 있는 최적의 위치에 있습니다. 깔끔한 시설과 따뜻한 서비스로 경주 여행의 완벽한 베이스캠프가 되어드리겠습니다.",
    /** 한 줄 철학/모토 — 본문 아래 이탤릭으로 표시, 없으면 빈 문자열 */
    philosophy: "",
    /** 갤러리 이미지 URL (2장, 2열 그리드로 표시) */
    images: [
    "https://storage.googleapis.com/coolstay-dev/v2/owner/shark1230/2024/05/28/10/95512107b7444b85a7b59d60b947d18f.jpg",
    "https://storage.googleapis.com/coolstay-dev/v2/owner/shark1230/2024/05/28/10/54767c8d2cef4fc39a493f2079fb5663.jpg",
    ],
  },

  /* ── 찾아오는 길 섹션 ───────────────────────── */
  directions: {
    /** 주차 안내 — 없으면 빈 문자열 (화면에 표시되지 않음) */
    parkingInfo: "자체 주차 6대 가능. 만차 시 인근 공영 주차장 이용 (유료 주차 시 프론트에 말씀해주시면 주차비 지원)",
    /** 주변 관광지·교통 안내 */
    nearbyItems: [
      { label: "대릉원", value: "도보 약 10분" },
      { label: "첨성대", value: "도보 약 15분" },
      { label: "성동시장", value: "도보 1분" },
    ],
  },
};
