/** CoolStay upstream 응답 → 도메인 객체 변환 */

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
  maxGuests: number;
  image: string | null;
  images: { url: string; thumbUrl: string }[];
  price: number;
  dailyPrices: number[];
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

  return {
    itemKey: item.key,
    packageKey: sub.key,
    name: item.name,
    maxGuests: Number(extras.MAX ?? 2),
    image: item.images?.[0]?.thumb_url ?? null,
    images: (item.images ?? []).map((img: any) => ({
      url: img.url,
      thumbUrl: img.thumb_url,
    })),
    price: sub.price ?? dailyPrices.reduce((a: number, b: number) => a + b, 0),
    dailyPrices,
    checkInTime: stime,
    checkOutTime: etime,
  };
}

/** upstream item → RoomType (홈페이지용, 기본 정보만) */
export function toRoomType(item: any): {
  itemKey: string;
  name: string;
  description: string;
  maxGuests: number;
  images: { url: string; thumbUrl: string }[];
  basePrice: number;
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

  return {
    itemKey: item.key,
    name: item.name,
    description: item.description ?? "",
    maxGuests: Number(ex.MAX ?? 2),
    images: (item.images ?? []).map((img: any) => ({
      url: img.url,
      thumbUrl: img.thumb_url,
    })),
    basePrice: sub.price ?? Number(item.price ?? 0),
    checkInTime: stime,
    checkOutTime: etime,
  };
}
