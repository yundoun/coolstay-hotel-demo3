'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Room, GuestInfo } from './types';

interface ReservationState {
  step: 1 | 2 | 3 | 4;
  hotelId: string | null;
  hotelName: string | null;
  checkIn: string | null;
  checkOut: string | null;
  adults: number;
  children: number;
  selectedRoom: Room | null;
  guestInfo: GuestInfo | null;
  bookingNumber: string | null;
}

interface ReservationActions {
  setHotel: (id: string, name: string) => void;
  setDates: (checkIn: string, checkOut: string) => void;
  setGuests: (adults: number, children: number) => void;
  selectRoom: (room: Room) => void;
  setGuestInfo: (info: GuestInfo) => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: 1 | 2 | 3 | 4) => void;
  complete: () => void;
  reset: () => void;
}

function generateBookingNumber(): string {
  const prefix = 'CS';
  const date = new Date()
    .toISOString()
    .slice(2, 10)
    .replace(/-/g, '');
  const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}${date}${rand}`;
}

export const useReservationStore = create<
  ReservationState & ReservationActions
>()(
  persist(
    (set) => ({
      step: 1,
      hotelId: null,
      hotelName: null,
      checkIn: null,
      checkOut: null,
      adults: 2,
      children: 0,
      selectedRoom: null,
      guestInfo: null,
      bookingNumber: null,

      setHotel: (id, name) => set({ hotelId: id, hotelName: name }),
      setDates: (checkIn, checkOut) => set({ checkIn, checkOut }),
      setGuests: (adults, children) => set({ adults, children }),
      selectRoom: (room) => set({ selectedRoom: room }),
      setGuestInfo: (info) => set({ guestInfo: info }),
      nextStep: () =>
        set((state) => ({
          step: Math.min(state.step + 1, 4) as 1 | 2 | 3 | 4,
        })),
      prevStep: () =>
        set((state) => ({
          step: Math.max(state.step - 1, 1) as 1 | 2 | 3 | 4,
        })),
      goToStep: (step) => set({ step }),
      complete: () => set({ bookingNumber: generateBookingNumber() }),
      reset: () =>
        set({
          step: 1,
          hotelId: null,
          hotelName: null,
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
      name: 'coolstay-reservation',
      storage: createJSONStorage(() =>
        typeof window !== 'undefined'
          ? sessionStorage
          : {
              getItem: () => null,
              setItem: () => {},
              removeItem: () => {},
            }
      ),
    }
  )
);
