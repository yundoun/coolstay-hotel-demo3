'use client';

import { createContext, useContext, useState, useCallback } from 'react';
import { useReservation as useReservationStore } from '@/adapters/zustand/reservation-store';
import type { ApiRoom, RoomsResponse } from '@/adapters/coolstay/types';
import { nightsBetween } from '@/domain/shared/utils';

export type Step = 1 | 2 | 3 | 4;

export const STEPS = [
  { num: 1, label: '일정 선택' },
  { num: 2, label: '객실 선택' },
  { num: 3, label: '예약자 정보' },
  { num: 4, label: '예약 확인' },
] as const;

interface ReservationContextValue {
  step: Step;
  goTo: (s: Step) => void;

  checkIn: string;
  checkOut: string;
  setCheckIn: (v: string) => void;
  setCheckOut: (v: string) => void;

  adults: number;
  setAdults: (v: number) => void;

  selectedRoom: ApiRoom | null;
  setSelectedRoom: (room: ApiRoom) => void;
  storeData: RoomsResponse | null;
  setStoreData: (data: RoomsResponse | null) => void;

  guestName: string;
  guestPhone: string;
  phoneVerified: boolean;
  setGuestName: (v: string) => void;
  setGuestPhone: (v: string) => void;
  setPhoneVerified: (v: boolean) => void;

  nights: number;
  totalPrice: number;
}

const ReservationContext = createContext<ReservationContextValue | null>(null);

export function useReservationContext() {
  const ctx = useContext(ReservationContext);
  if (!ctx) throw new Error('useReservationContext must be used within ReservationProvider');
  return ctx;
}

export function ReservationProvider({ children }: { children: React.ReactNode }) {
  const store = useReservationStore();

  const [step, setStep] = useState<Step>(1);
  const [checkIn, setCheckIn] = useState(store.checkIn);
  const [checkOut, setCheckOut] = useState(store.checkOut);
  const [adults, setAdults] = useState(store.adults);
  const [selectedRoom, setSelectedRoom] = useState<ApiRoom | null>(null);
  const [storeData, setStoreData] = useState<RoomsResponse | null>(null);

  const [guestName, setGuestName] = useState(store.guestName);
  const [guestPhone, setGuestPhone] = useState(store.guestPhone);
  const [phoneVerified, setPhoneVerified] = useState(false);

  const nights = checkIn && checkOut ? nightsBetween(checkIn, checkOut) : 1;
  const totalPrice = selectedRoom?.price ?? 0;

  const goTo = useCallback((s: Step) => {
    setStep(s);
    const el = document.getElementById('reservation');
    if (el) {
      const offset = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    }
  }, []);

  return (
    <ReservationContext.Provider
      value={{
        step, goTo,
        checkIn, checkOut, setCheckIn, setCheckOut,
        adults, setAdults,
        selectedRoom, setSelectedRoom,
        storeData, setStoreData,
        guestName, guestPhone, phoneVerified,
        setGuestName, setGuestPhone, setPhoneVerified,
        nights, totalPrice,
      }}
    >
      {children}
    </ReservationContext.Provider>
  );
}
