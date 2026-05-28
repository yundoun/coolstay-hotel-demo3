'use client';

import { ReservationProvider } from './reservation-context';
import { InlineReservation } from './inline-reservation';

export function OnepageReservation() {
  return (
    <ReservationProvider>
      <InlineReservation />
    </ReservationProvider>
  );
}
