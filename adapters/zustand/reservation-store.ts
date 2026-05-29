"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { ApiRoomSelection } from "@/domain/reservation/types";

export type { ApiRoomSelection } from "@/domain/reservation/types";

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

function addDaysISO(iso: string, days: number) {
  const d = new Date(iso);
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

export type ReservationState = {
  // Step 1
  checkIn: string;
  checkOut: string;
  adults: number;
  // Step 2
  hotelId: string | null;
  roomId: string | null;
  apiRoom: ApiRoomSelection | null;
  // Step 3
  guestName: string;
  guestPhone: string;
  guestEmail: string;
  phoneVerified: boolean;
  smsAuthKey: string;
  smsAuthCode: string;
  // Step 4 outcome
  reservationNumber: string | null;
  // Actions
  setDates: (checkIn: string, checkOut: string) => void;
  setAdults: (adults: number) => void;
  setHotel: (hotelId: string | null) => void;
  setRoom: (roomId: string | null) => void;
  setApiRoom: (room: ApiRoomSelection) => void;
  clearApiRoom: () => void;
  setPhoneVerified: (v: boolean) => void;
  setSmsAuth: (key: string, code: string) => void;
  setGuestInfo: (info: { name: string; phone: string; email: string }) => void;
  setReservationNumber: (n: string) => void;
  reset: () => void;
};

const defaultCheckIn = todayISO();
const defaultCheckOut = addDaysISO(defaultCheckIn, 1);

const INITIAL_STATE = {
  checkIn: defaultCheckIn,
  checkOut: defaultCheckOut,
  adults: 2,
  hotelId: null as string | null,
  roomId: null as string | null,
  apiRoom: null as ApiRoomSelection | null,
  guestName: "",
  guestPhone: "",
  guestEmail: "",
  phoneVerified: false,
  smsAuthKey: "",
  smsAuthCode: "",
  reservationNumber: null as string | null,
} as const;

export const useReservation = create<ReservationState>()(
  persist(
    (set) => ({
      ...INITIAL_STATE,
      setDates: (checkIn, checkOut) => set({ checkIn, checkOut }),
      setAdults: (adults) => set({ adults }),
      setHotel: (hotelId) => set({ hotelId, roomId: null, apiRoom: null }),
      setRoom: (roomId) => set({ roomId }),
      setApiRoom: (room) => set({ apiRoom: room }),
      clearApiRoom: () => set({ apiRoom: null }),
      setPhoneVerified: (v) => set({ phoneVerified: v }),
      setSmsAuth: (key, code) => set({ smsAuthKey: key, smsAuthCode: code }),
      setGuestInfo: (info) =>
        set({ guestName: info.name, guestPhone: info.phone, guestEmail: info.email }),
      setReservationNumber: (n) => set({ reservationNumber: n }),
      reset: () => set({ ...INITIAL_STATE }),
    }),
    {
      name: "coolstay-reservation",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
