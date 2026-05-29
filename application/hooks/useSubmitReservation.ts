"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useReservation } from "@/adapters/zustand/reservation-store";
import { createGuestReservation } from "@/application/services/reservation-api";

export function useSubmitReservation() {
  const s = useReservation();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canSubmit = Boolean(s.apiRoom?.packageKey && s.guestName && s.guestPhone);

  const submit = async () => {
    // getState()로 최신 스토어 값을 읽는다 (렌더 스냅샷 아님)
    const latest = useReservation.getState();
    if (!latest.apiRoom || submitting) return;

    setSubmitting(true);
    setError(null);

    try {
      const { apiRoom } = latest;

      const result = await createGuestReservation({
        hotelId: apiRoom.motelKey,
        roomId: apiRoom.packageKey,
        checkIn: latest.checkIn,
        checkOut: latest.checkOut,
        guestName: latest.guestName,
        guestPhone: latest.guestPhone,
        totalPrice: apiRoom.price,
        basePrice: apiRoom.price,
        checkInTime: apiRoom.checkInTime,
        checkOutTime: apiRoom.checkOutTime,
        smsAuthKey: latest.smsAuthKey,
        smsAuthCode: latest.smsAuthCode,
      });
      latest.setReservationNumber(result.bookId);
      router.push("/reservation/complete");
    } catch (err) {
      setError(err instanceof Error ? err.message : "예약 중 오류가 발생했습니다.");
      setSubmitting(false);
    }
  };

  return { submit, submitting, error, canSubmit };
}
