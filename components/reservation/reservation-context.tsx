'use client';

import { createContext, useContext, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { GuestInfo } from '@/domain/reservation/types';
import type { ApiRoom } from '@/adapters/coolstay/types';
import { nightsBetween } from '@/domain/shared/utils';
import { useReservationStore } from '@/lib/reservation-store';

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
  childrenCount: number;
  setAdults: (v: number) => void;
  setChildrenCount: (v: number) => void;

  selectedRoom: ApiRoom | null;
  setSelectedRoom: (room: ApiRoom) => void;

  guestInfo: GuestInfo | null;
  setGuestInfo: (info: GuestInfo) => void;

  paymentMethod: string;
  setPaymentMethod: (v: string) => void;

  nights: number;
  totalPrice: number;

  handleComplete: () => void;
}

const ReservationContext = createContext<ReservationContextValue | null>(null);

export function useReservation() {
  const ctx = useContext(ReservationContext);
  if (!ctx) throw new Error('useReservation must be used within ReservationProvider');
  return ctx;
}

export function ReservationProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const store = useReservationStore();

  const [step, setStep] = useState<Step>(1);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [adults, setAdults] = useState(2);
  const [childrenCount, setChildrenCount] = useState(0);
  const [selectedRoom, setSelectedRoom] = useState<ApiRoom | null>(null);
  const [guestInfo, setGuestInfo] = useState<GuestInfo | null>(null);
  const [paymentMethod, setPaymentMethod] = useState('card');

  const nights =
    checkIn && checkOut ? nightsBetween(checkIn, checkOut) : 1;
  const totalPrice = (selectedRoom?.price || 0) * nights;

  const goTo = useCallback((s: Step) => {
    setStep(s);
    const el = document.getElementById('reservation');
    if (el) {
      const offset = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    }
  }, []);

  const handleComplete = useCallback(() => {
    if (!selectedRoom || !guestInfo) return;
    store.setDates(checkIn, checkOut);
    store.setGuests(adults, childrenCount);
    store.selectRoom(selectedRoom);
    store.setGuestInfo(guestInfo);
    store.complete();
    router.push('/reservation/complete');
  }, [store, router, checkIn, checkOut, adults, childrenCount, selectedRoom, guestInfo]);

  return (
    <ReservationContext.Provider
      value={{
        step, goTo,
        checkIn, checkOut, setCheckIn, setCheckOut,
        adults, childrenCount, setAdults, setChildrenCount,
        selectedRoom, setSelectedRoom,
        guestInfo, setGuestInfo,
        paymentMethod, setPaymentMethod,
        nights, totalPrice,
        handleComplete,
      }}
    >
      {children}
    </ReservationContext.Provider>
  );
}
