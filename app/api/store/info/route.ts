import { NextResponse } from "next/server";
import { fetchStoreDetail } from "@/adapters/coolstay/client";
import { toRoomType } from "@/adapters/coolstay/mappers";
import type { StoreInfo } from "@/adapters/coolstay/types";

/** 홈 페이지용 — 숙소 기본 정보 + 객실 유형 (날짜 불필요) */
export async function GET() {
  try {
    const motel = await fetchStoreDetail({});
    if (!motel) {
      return NextResponse.json(
        { message: "숙소 정보를 찾을 수 없습니다. CMS에서 앱노출이 활성화되어 있는지 확인해주세요." },
        { status: 502 },
      );
    }
    const rooms = (motel.items ?? [])
      .map(toRoomType)
      .filter(Boolean) as NonNullable<ReturnType<typeof toRoomType>>[];

    const storeImages = (motel.images ?? []).map(
      (img: { url: string; thumb_url: string; description?: string }) => ({
        url: img.url,
        thumbUrl: img.thumb_url,
        description: img.description ?? "",
      }),
    );

    const info: StoreInfo = {
      motelKey: motel.key,
      name: motel.name,
      nameEn: motel.name_en ?? motel.name ?? "",
      phone: motel.phone_number ?? motel.safe_number ?? "",
      email: motel.email ?? "",
      address: motel.location?.address ?? "",
      latitude: motel.location?.latitude ?? "",
      longitude: motel.location?.longitude ?? "",
      parkingInfo: motel.parking_info ?? "",
      sitePayment: motel.site_payment_yn === "Y",
      images: storeImages,
      rooms,
    };

    return NextResponse.json(info);
  } catch (err) {
    const msg = err instanceof Error ? err.message : "숙소 정보 조회 실패";
    return NextResponse.json({ message: msg }, { status: 502 });
  }
}
