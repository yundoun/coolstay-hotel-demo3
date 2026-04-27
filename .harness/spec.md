# Coolstay Hotel Demo — Product Specification

## 1. Overview

**서비스**: 꿀스테이(Coolstay) 호텔 업태 전용 부킹 플랫폼 데모
**레퍼런스**: 스테이폴리오(stayfolio.com)
**목적**: 호텔 제휴점 영업용 프로토타입 (링크 공유 시연)
**범위**: 홈 → 호텔 리스트 → 호텔 상세 → 예약 완료 (4-depth)

---

## 2. Information Architecture

```
/ (Home)
├── GNB: [로고] ──────────────────── [호텔] [예약]
│
├── Hero Slider (3-5 slides, 스테이폴리오 배너 로테이션 스타일)
├── Featured Hotels Section (추천 숙소 6개)
├── Promotion Section (프로모션 배너)
└── Footer

/hotels (호텔 리스트 = FIND STAY)
├── 검색바 (일정 + 인원 + 지역)
├── 필터 (스테이폴리오 형태: 지역 필터 + 정렬)
├── 호텔 카드 그리드 (30개, 가격 노출)
└── Footer

/hotels/[id] (호텔 상세)
├── 이미지 갤러리 (히어로 1 + 갤러리 4)
├── 호텔 정보 (이름, 위치, 설명, 편의시설)
├── 객실 목록 (4종 카드)
├── 위치 (지도 placeholder)
└── Footer

/reservation (예약 프로세스)
├── Step 1: 일정 선택
├── Step 2: 객실 선택
├── Step 3: 투숙객 정보
├── Step 4: 결제 정보 (UI only)
└── /reservation/complete (예약 완료)
```

---

## 3. Design Language

### 3.1 Color Tokens

```
Brand Primary:
  300: #FFDB66 (light)
  400: #FFD033 (hover)
  500: #FFC600 (main CTA)
  600: #E6B200 (active/pressed)
  700: #A37F00 (dark variant)

Neutral (Warm Gray):
  50:  #FAFAF9 (page bg)
  100: #F5F5F4 (card bg)
  200: #E7E5E4 (border)
  300: #D6D3D1 (disabled)
  400: #A8A29E (placeholder)
  500: #78716C (secondary text)
  600: #57534E (body text)
  700: #44403C (emphasis)
  800: #292524 (heading)
  900: #1C1917 (max emphasis)

Background: #FFFFFF (white base)
```

### 3.2 Typography

```
Heading (EN): Barlow, weight 800
Body/UI (KR): Pretendard Variable, weight 400-700
Price: JetBrains Mono or Pretendard Semibold

Scale:
  display-2xl: clamp(2.5rem, 5vw + 1rem, 4.5rem)
  display-xl:  clamp(2.25rem, 4vw + 1rem, 3.75rem)
  heading-xl:  30px / 700
  heading-lg:  24px / 700
  heading-md:  20px / 600
  heading-sm:  18px / 600
  body-lg:     18px / 400
  body-md:     16px / 400
  body-sm:     14px / 400
  body-xs:     12px / 400
  label-lg:    16px / 600
  label-md:    14px / 500
  label-sm:    12px / 500
```

### 3.3 Spacing & Layout

```
Container: max-width 1200px (normal), 1440px (wide)
Section padding: 48px~96px vertical
Card gap: 24px
Border radius: 8px (default), 12px (cards), 16px (modals)
Shadows: card(subtle) → cardHover(elevated)
Header: 64px height, glassmorphism (white 80% + blur 12px)
```

### 3.4 Motion

```
Hover: 150ms ease
Default transitions: 200ms ease
Modals/drawers: 300ms ease-out
Page transitions: 500ms ease-out
Card hover: translateY(-4px) + shadow elevation
Content entrance: fadeInUp 500ms
```

### 3.5 Design Principles

- 스테이폴리오의 큐레이션/매거진 톤 유지
- 브랜드 컬러(#FFC600)는 CTA, active state, 선택된 필터에만 사용
- 이미지 비중 높게 (풀블리드 히어로, 16:10 카드)
- 깔끔한 여백, 콘텐츠 중심 레이아웃
- 가격은 리스트부터 표시 (₩ 포맷)

---

## 4. Component Inventory

### 4.1 Layout Components
- `SiteHeader` — 투명→솔리드 전환 GNB (로고 + 호텔/예약)
- `SiteFooter` — 회사 정보 + 문의 + SNS
- `Container` — max-width wrapper

### 4.2 Home Components
- `HeroSlider` — 풀블리드 배너 슬라이더 (01/05 인디케이터, 좌우 화살표)
- `FeaturedHotels` — 추천 호텔 6개 그리드
- `PromotionBanner` — 프로모션 CTA 배너

### 4.3 Hotel List Components
- `SearchBar` — 일정(체크인/아웃) + 인원 + 지역 입력
- `HotelFilters` — 지역 필터 + 정렬 (스테이폴리오 형태)
- `HotelCard` — 이미지 + 이름 + 위치 + 가격 + 태그
- `HotelGrid` — 반응형 그리드 (1→2→3→4열)

### 4.4 Hotel Detail Components
- `ImageGallery` — 메인 이미지 + 4개 서브 그리드
- `HotelInfo` — 이름, 위치, 설명, 편의시설
- `RoomCard` — 객실 이미지 + 이름 + 설명 + 가격 + CTA
- `AmenityList` — 편의시설 아이콘 그리드
- `LocationMap` — 위치 placeholder

### 4.5 Reservation Components
- `ReservationShell` — 스텝 인디케이터 + 콘텐츠 영역
- `StepIndicator` — 4단계 프로그레스
- `Step1Dates` — 캘린더 체크인/아웃
- `Step2Room` — 객실 선택 카드
- `Step3Guest` — 투숙객 정보 폼 (RHF + Zod)
- `Step4Payment` — 결제 정보 UI (mock)
- `CompleteClient` — 예약 완료 확인

### 4.6 Shared Components
- `Reveal` — IntersectionObserver 페이드인 + 800ms 페일세이프
- `DatePicker` — 체크인/아웃 달력
- `GuestSelector` — 성인/아동 인원 선택
- `RegionSelector` — 지역 선택 드롭다운

---

## 5. Mock Data Schema

### 5.1 Hotel (30개)

```typescript
interface Hotel {
  id: string;               // "hotel-001"
  name: string;             // "그랜드 하얏트 서울"
  nameEn: string;           // "Grand Hyatt Seoul"
  region: Region;           // "서울"
  address: string;
  description: string;      // 2-3문장
  rating: number;           // 4.0-5.0
  reviewCount: number;
  pricePerNight: number;    // 150000-800000
  discountRate?: number;    // 10-30
  tags: string[];           // ["시티뷰", "루프탑바", "피트니스"]
  amenities: string[];
  images: {
    hero: string;
    gallery: string[];      // 4장
  };
  rooms: Room[];            // 4개
  checkIn: string;          // "15:00"
  checkOut: string;         // "11:00"
  coordinates: { lat: number; lng: number };
  featured: boolean;
}
```

### 5.2 Room (호텔당 4개)

```typescript
interface Room {
  id: string;
  name: string;             // "디럭스 더블", "프리미어 스위트"
  description: string;
  capacity: { adults: number; children: number };
  size: number;             // m²
  bedType: string;
  pricePerNight: number;
  images: string[];
  amenities: string[];
}
```

### 5.3 Regions (국내 8개 지역)

```
서울, 부산, 제주, 강릉, 경주, 여수, 전주, 인천
```

---

## 6. Reservation Flow (Zustand Store)

```typescript
interface ReservationStore {
  step: 1 | 2 | 3 | 4;
  hotelId: string | null;
  checkIn: Date | null;
  checkOut: Date | null;
  adults: number;
  children: number;
  selectedRoom: Room | null;
  guestInfo: {
    name: string;
    phone: string;
    email: string;
    requests: string;
  } | null;
  // Actions
  setDates: (checkIn: Date, checkOut: Date) => void;
  setGuests: (adults: number, children: number) => void;
  selectRoom: (room: Room) => void;
  setGuestInfo: (info: GuestInfo) => void;
  nextStep: () => void;
  prevStep: () => void;
  reset: () => void;
}
```

Persist: sessionStorage (페이지 리로드 시 유지)

---

## 7. Technical Stack

```
Framework:    Next.js 15 (App Router) — 불안정시 14.2 LTS 다운그레이드
React:        18.3
Language:     TypeScript 5
Styling:      Tailwind CSS v4
Animation:    Framer Motion 11
State:        Zustand 5 + sessionStorage persist
Forms:        React Hook Form + Zod 3
Dates:        date-fns 3
Icons:        lucide-react
Fonts:        Barlow (Google) + Pretendard (CDN)
Images:       next/image + 로컬 이미지 풀 (/public/hotels/)
```

---

## 8. Directory Structure

```
coolstay-hotel-demo3/
├── .harness/
│   ├── spec.md
│   ├── evaluation-round-1.md
│   └── screenshots/
├── app/
│   ├── layout.tsx
│   ├── page.tsx                    # 홈
│   ├── globals.css
│   ├── hotels/
│   │   ├── page.tsx                # 호텔 리스트
│   │   └── [id]/
│   │       └── page.tsx            # 호텔 상세
│   └── reservation/
│       ├── page.tsx                # 예약 프로세스
│       └── complete/
│           └── page.tsx            # 예약 완료
├── components/
│   ├── layout/
│   │   ├── site-header.tsx
│   │   └── site-footer.tsx
│   ├── home/
│   │   ├── hero-slider.tsx
│   │   ├── featured-hotels.tsx
│   │   └── promotion-banner.tsx
│   ├── hotels/
│   │   ├── search-bar.tsx
│   │   ├── hotel-filters.tsx
│   │   ├── hotel-card.tsx
│   │   └── hotel-grid.tsx
│   ├── hotel-detail/
│   │   ├── image-gallery.tsx
│   │   ├── hotel-info.tsx
│   │   ├── room-card.tsx
│   │   └── amenity-list.tsx
│   ├── reservation/
│   │   ├── reservation-shell.tsx
│   │   ├── step-indicator.tsx
│   │   ├── step-1-dates.tsx
│   │   ├── step-2-room.tsx
│   │   ├── step-3-guest.tsx
│   │   ├── step-4-payment.tsx
│   │   └── complete-client.tsx
│   └── ui/
│       ├── reveal.tsx
│       ├── container.tsx
│       ├── date-picker.tsx
│       ├── guest-selector.tsx
│       └── region-selector.tsx
├── lib/
│   ├── types.ts
│   ├── hotels.ts                   # Mock 데이터 30개
│   ├── reservation-store.ts
│   └── utils.ts
└── public/
    ├── coolstay_logo.png
    └── hotels/
        ├── hotel-001/
        │   ├── hero.jpg
        │   ├── gallery-1.jpg ~ gallery-4.jpg
        │   └── rooms/
        │       ├── deluxe.jpg
        │       ├── premier.jpg
        │       ├── suite.jpg
        │       └── standard.jpg
        └── ... (30개 호텔)
```

---

## 9. Evaluation Criteria

| Criterion | Weight | Target |
|-----------|--------|--------|
| Design Quality | 30% | 스테이폴리오 수준의 럭셔리 큐레이션 톤 |
| Reference Fidelity | 25% | 검색, 필터, 카드 레이아웃이 레퍼런스와 일치 |
| Functionality | 25% | 홈→리스트→상세→예약완료 전체 플로우 동작 |
| Craft & Polish | 20% | 애니메이션, 호버, 반응형, 폰트 정합성 |
