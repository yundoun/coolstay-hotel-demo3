import type { ReservationReadyParams } from "@/domain/reservation/types";

function toApiDateTime(isoDate: string, time: string): string {
  const d = isoDate.replace(/-/g, "");
  const clean = time.replace(":", "");
  const hhmm = clean.length <= 2 ? clean.padStart(2, "0") + "00" : clean;
  return d + hhmm + "00";
}

export async function createGuestReservation(
  params: ReservationReadyParams,
): Promise<{ bookId: string; status: string }> {
  const body = {
    motel_key: params.hotelId,
    item_key: params.roomId,
    item_type: "010102",
    book_start_dt: toApiDateTime(params.checkIn, params.checkInTime),
    book_end_dt: toApiDateTime(params.checkOut, params.checkOutTime),
    book_user_name: params.guestName,
    book_user_number: params.guestPhone.replace(/[^0-9]/g, ""),
    sms_auth_key: params.smsAuthKey,
    sms_auth_code: params.smsAuthCode,
    vehicle_yn: "N",
    price: params.basePrice,
    discount_price: params.totalPrice,
    total_price: params.totalPrice,
    coupons: [],
    benefit_mileage_rate: 0,
    mileage: 0,
    payment_pg: "",
    payment_method: "SITE",
  };

  const res = await fetch("/api/reservation/ready", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message ?? `예약 요청 실패 (${res.status})`);
  }

  const data = await res.json();
  return { bookId: data.book_id, status: data.status };
}
