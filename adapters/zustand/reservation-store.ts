"use client";

import { create } from "zustand";
import type { ApiRoomSelection } from "@/domain/reservation/types";
import type { ApiRoom, RoomsResponse } from "@/adapters/coolstay/types";
import { addDaysISO, nightsBetween } from "@/domain/shared/utils";
import { MAX_NIGHTS } from "@/domain/shared/constants";

export type { ApiRoomSelection } from "@/domain/reservation/types";

export type Step = 1 | 2 | 3 | 4;

export const STEPS = [
  { num: 1, label: "일정 선택" },
  { num: 2, label: "객실 선택" },
  { num: 3, label: "예약자 정보" },
  { num: 4, label: "예약 확인" },
] as const;

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

export type ReservationState = {
  // UI navigation
  step: Step;
  // Step 1
  checkIn: string;
  checkOut: string;
  adults: number;
  // Step 2
  hotelId: string | null;
  roomId: string | null;
  apiRoom: ApiRoomSelection | null;
  selectedRoom: ApiRoom | null;
  storeData: RoomsResponse | null;
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
  goTo: (s: Step) => void;
  setDates: (checkIn: string, checkOut: string) => void;
  setCheckIn: (checkIn: string) => void;
  setCheckOut: (checkOut: string) => void;
  setAdults: (adults: number) => void;
  setHotel: (hotelId: string | null) => void;
  setRoom: (roomId: string | null) => void;
  setApiRoom: (room: ApiRoomSelection) => void;
  clearApiRoom: () => void;
  setSelectedRoom: (room: ApiRoom | null) => void;
  setStoreData: (data: RoomsResponse | null) => void;
  setPhoneVerified: (v: boolean) => void;
  setSmsAuth: (key: string, code: string) => void;
  setGuestInfo: (info: { name: string; phone: string; email: string }) => void;
  setGuestName: (name: string) => void;
  setGuestPhone: (phone: string) => void;
  setReservationNumber: (n: string) => void;
  reset: () => void;
};

const defaultCheckIn = todayISO();
const defaultCheckOut = addDaysISO(defaultCheckIn, 1);

const INITIAL_STATE = {
  step: 1 as Step,
  checkIn: defaultCheckIn,
  checkOut: defaultCheckOut,
  adults: 2,
  hotelId: null as string | null,
  roomId: null as string | null,
  apiRoom: null as ApiRoomSelection | null,
  selectedRoom: null as ApiRoom | null,
  storeData: null as RoomsResponse | null,
  guestName: "",
  guestPhone: "",
  guestEmail: "",
  phoneVerified: false,
  smsAuthKey: "",
  smsAuthCode: "",
  reservationNumber: null as string | null,
};

function scrollToReservation() {
  const anchor = document.getElementById("reservation-scroll-anchor");
  const fallback = document.getElementById("reservation");
  const el = anchor || fallback;
  if (el) {
    const headerH = window.innerWidth >= 1024 ? 72 : 64;
    const offset = el.getBoundingClientRect().top + window.scrollY - headerH;
    window.scrollTo({ top: offset, behavior: "smooth" });
  }
}

export const useReservation = create<ReservationState>()(
    (set) => ({
      ...INITIAL_STATE,
      goTo: (s) => {
        set({ step: s });
        scrollToReservation();
      },
      setDates: (checkIn, checkOut) => {
        const maxOut = addDaysISO(checkIn, MAX_NIGHTS);
        set({ checkIn, checkOut: checkOut > maxOut ? maxOut : checkOut });
      },
      setCheckIn: (checkIn) =>
        set((prev) => {
          const minOut = addDaysISO(checkIn, 1);
          const maxOut = addDaysISO(checkIn, MAX_NIGHTS);
          let co = prev.checkOut;
          if (co <= checkIn) co = minOut;
          if (nightsBetween(checkIn, co) > MAX_NIGHTS) co = maxOut;
          return { checkIn, checkOut: co };
        }),
      setCheckOut: (checkOut) =>
        set((prev) => {
          const maxOut = addDaysISO(prev.checkIn, MAX_NIGHTS);
          return { checkOut: checkOut > maxOut ? maxOut : checkOut };
        }),
      setAdults: (adults) => set({ adults }),
      setHotel: (hotelId) => set({ hotelId, roomId: null, apiRoom: null }),
      setRoom: (roomId) => set({ roomId }),
      setApiRoom: (room) => set({ apiRoom: room }),
      clearApiRoom: () => set({ apiRoom: null }),
      setSelectedRoom: (room) => set({ selectedRoom: room }),
      setStoreData: (data) => set({ storeData: data }),
      setPhoneVerified: (v) => set({ phoneVerified: v }),
      setSmsAuth: (key, code) => set({ smsAuthKey: key, smsAuthCode: code }),
      setGuestInfo: (info) =>
        set({ guestName: info.name, guestPhone: info.phone, guestEmail: info.email }),
      setGuestName: (name) => set({ guestName: name }),
      setGuestPhone: (phone) => set({ guestPhone: phone }),
      setReservationNumber: (n) => set({ reservationNumber: n }),
      reset: () => set({ ...INITIAL_STATE }),
    }),
);
