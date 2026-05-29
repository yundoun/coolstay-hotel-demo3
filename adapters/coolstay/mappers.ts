/** CoolStay upstream 응답 → 도메인 객체 변환 */

import { formatPhoneNumber } from "@/domain/shared/utils";

/** 유닉스 타임스탬프(초) 또는 문자열 → YYYY-MM-DD */
function toDateStr(v: unknown): string {
  if (!v) return "";
  const n = Number(v);
  if (!isNaN(n) && n > 1_000_000_000) {
    const d = new Date(n * 1000);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  }
  return String(v);
}

/** 유닉스 타임스탬프(초) → HH:mm */
function toTimeStr(v: unknown): string {
  if (!v) return "";
  const n = Number(v);
  if (!isNaN(n) && n > 1_000_000_000) {
    const d = new Date(n * 1000);
    return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
  }
  return "";
}

/** item.extras 배열 → { code: value } 맵 */
export function parseExtras(item: any): Record<string, string> {
  const map: Record<string, string> = {};
  for (const e of item.extras ?? []) map[e.code] = e.value;
  return map;
}

/** 숙박 카테고리 코드 */
const STAY_CATEGORY = "010102";

/** upstream item → ApiRoom (예약용 객실, 날짜 기반 가격 포함) */
export function toApiRoom(item: any): {
  itemKey: string;
  packageKey: string;
  name: string;
  nameEn: string;
  description: string;
  maxGuests: number;
  size: number;
  bedType: string;
  image: string | null;
  images: { url: string; thumbUrl: string }[];
  price: number;
  dailyPrices: number[];
  features: string[];
  amenities: string[];
  checkInTime: string;
  checkOutTime: string;
} | null {
  const sub = (item.sub_items ?? []).find(
    (s: any) => s.category?.code === STAY_CATEGORY,
  );
  if (!sub) return null;

  // 판매 불가(품절) 체크
  const firstDay = sub.daily_extras?.[0];
  if (firstDay) {
    const salesYn = parseExtras(firstDay).SALES_YN;
    if (salesYn === "N") return null;
  }

  const extras = parseExtras(item);

  const dailyPrices: number[] = [];
  let stime = "";
  let etime = "";
  for (const d of sub.daily_extras ?? []) {
    const dex = parseExtras(d);
    dailyPrices.push(Number(dex.PRICE ?? 0));
    if (!stime) stime = dex.STIME ?? "";
    etime = dex.ETIME ?? "";
  }

  const amenityStr = extras.AMENITY ?? extras.FACILITY ?? "";
  const amenities = amenityStr ? amenityStr.split(",").map((s: string) => s.trim()).filter(Boolean) : [];
  const featureStr = extras.FEATURE ?? "";
  const features = featureStr ? featureStr.split(",").map((s: string) => s.trim()).filter(Boolean) : [];

  return {
    itemKey: item.key,
    packageKey: sub.key,
    name: item.name,
    nameEn: item.name_en ?? "",
    description: item.description ?? "",
    maxGuests: Number(extras.MAX ?? 2),
    size: Number(extras.SIZE ?? extras.AREA ?? 0),
    bedType: extras.BED_TYPE ?? extras.BED ?? "",
    image: item.images?.[0]?.thumb_url ?? null,
    images: (item.images ?? []).map((img: any) => ({
      url: img.url,
      thumbUrl: img.thumb_url,
    })),
    price: sub.price ?? dailyPrices.reduce((a: number, b: number) => a + b, 0),
    dailyPrices,
    features,
    amenities,
    checkInTime: stime,
    checkOutTime: etime,
  };
}

/* ── 예약 상태 코드 → 도메인 상태 ── */
const BOOK_STATUS_MAP: Record<string, import("@/domain/reservation/types").BookingStatus> = {
  BS001: "BEFORE",
  BS002: "AFTER",
  BS003: "CANCEL",
  BEFORE: "BEFORE",
  AFTER: "AFTER",
  CANCEL: "CANCEL",
};

/** upstream book → BookingItem (비회원 예약 조회 결과) */
export function toBookingItem(book: any): import("@/domain/reservation/types").BookingItem {
  const item = book.items?.[0];
  const itemImage = book.item_images?.[0]?.url ?? book.item_images?.[0]?.thumb_url ?? null;
  return {
    bookId: book.book_id ?? book.bookId ?? "",
    status: BOOK_STATUS_MAP[book.status] ?? "BEFORE",
    storeName: book.motel?.name ?? "",
    roomName: item?.name ?? "",
    roomImage: book.repr_image ?? itemImage ?? null,
    checkIn: toDateStr(book.start_dt ?? book.startDt ?? ""),
    checkOut: toDateStr(book.end_dt ?? book.endDt ?? ""),
    checkInTime: toTimeStr(book.start_dt ?? book.startDt),
    checkOutTime: toTimeStr(book.end_dt ?? book.endDt),
    guestName: book.name ?? "",
    guestPhone: formatPhoneNumber(book.phone_number ?? book.phoneNumber ?? ""),
    totalPrice: Number(book.total_price ?? book.totalPrice ?? 0),
    originPrice: Number(book.origin_price_total ?? book.originPriceTotal ?? 0),
    payment: {
      method: book.payment?.method ?? "SITE",
      status: book.payment?.status ?? "",
      charge: Number(book.payment?.charge ?? 0),
      cardNo: book.payment?.card_no ?? book.payment?.cardNo,
      refundCharge: book.payment?.refund_charge != null ? Number(book.payment.refund_charge) : undefined,
    },
    refundYn: book.refund_yn === "Y" || book.refundYn === "Y",
    vehicleYn: book.vehicle_yn === "Y" || book.vehicleYn === "Y",
    regDate: toDateStr(book.reg_dt ?? book.regDt ?? ""),
  };
}

/** upstream item → RoomType (홈페이지용) */
export function toRoomType(item: any): {
  itemKey: string;
  name: string;
  nameEn: string;
  description: string;
  maxGuests: number;
  size: number;
  bedType: string;
  images: { url: string; thumbUrl: string }[];
  basePrice: number;
  features: string[];
  amenities: string[];
  checkInTime: string;
  checkOutTime: string;
} | null {
  const sub = (item.sub_items ?? []).find(
    (s: any) => s.category?.code === STAY_CATEGORY,
  );
  if (!sub) return null;

  const ex = parseExtras(item);

  let stime = "";
  let etime = "";
  for (const d of sub.daily_extras ?? []) {
    const dex = parseExtras(d);
    if (!stime) stime = dex.STIME ?? "";
    etime = dex.ETIME ?? "";
  }

  // extras에서 편의시설/특징 추출
  const amenityStr = ex.AMENITY ?? ex.FACILITY ?? "";
  const amenities = amenityStr ? amenityStr.split(",").map((s: string) => s.trim()).filter(Boolean) : [];
  const featureStr = ex.FEATURE ?? "";
  const features = featureStr ? featureStr.split(",").map((s: string) => s.trim()).filter(Boolean) : [];

  return {
    itemKey: item.key,
    name: item.name,
    nameEn: item.name_en ?? "",
    description: item.description ?? "",
    maxGuests: Number(ex.MAX ?? 2),
    size: Number(ex.SIZE ?? ex.AREA ?? 0),
    bedType: ex.BED_TYPE ?? ex.BED ?? "",
    images: (item.images ?? []).map((img: any) => ({
      url: img.url,
      thumbUrl: img.thumb_url,
    })),
    basePrice: sub.price ?? Number(item.price ?? 0),
    features,
    amenities,
    checkInTime: stime,
    checkOutTime: etime,
  };
}
