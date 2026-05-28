'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { ApiRoom } from '@/adapters/coolstay/types';
import type { GuestInfo } from '@/domain/reservation/types';

interface ReservationState {
  checkIn: string | null;
  checkOut: string | null;
  adults: number;
  children: number;
  selectedRoom: ApiRoom | null;
  guestInfo: GuestInfo | null;
  bookingNumber: string | null;
}

interface ReservationActions {
  setDates: (checkIn: string, checkOut: string) => void;
  setGuests: (adults: number, children: number) => void;
  selectRoom: (room: ApiRoom) => void;
  setGuestInfo: (info: GuestInfo) => void;
  complete: () => void;
  reset: () => void;
}

function generateBookingNumber(): string {
  const prefix = 'OD';
  const date = new Date().toISOString().slice(2, 10).replace(/-/g, '');
  const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}${date}${rand}`;
}

export const useReservationStore = create<
  ReservationState & ReservationActions
>()(
  persist(
    (set) => ({
      checkIn: null,
      checkOut: null,
      adults: 2,
      children: 0,
      selectedRoom: null,
      guestInfo: null,
      bookingNumber: null,

      setDates: (checkIn, checkOut) => set({ checkIn, checkOut }),
      setGuests: (adults, children) => set({ adults, children }),
      selectRoom: (room) => set({ selectedRoom: room }),
      setGuestInfo: (info) => set({ guestInfo: info }),
      complete: () => set({ bookingNumber: generateBookingNumber() }),
      reset: () =>
        set({
          checkIn: null,
          checkOut: null,
          adults: 2,
          children: 0,
          selectedRoom: null,
          guestInfo: null,
          bookingNumber: null,
        }),
    }),
    {
      name: 'onda-reservation',
      storage: createJSONStorage(() =>
        typeof window !== 'undefined'
          ? sessionStorage
          : { getItem: () => null, setItem: () => {}, removeItem: () => {} }
      ),
    }
  )
);
