'use client';

import { useReservation } from '@/adapters/zustand/reservation-store';
import { useShallow } from 'zustand/react/shallow';
import { nightsBetween, formatKoDate } from '@/domain/shared/utils';
import { StepIndicator } from './step-indicator';
import { StepDates } from './steps/step-dates';
import { StepRoom } from './steps/step-room';
import { StepGuest } from './steps/step-guest';
import { StepReview } from './steps/step-review';
import { Container } from '@/ui/ui/container';
import { Reveal } from '@/ui/ui/reveal';

export function InlineReservation() {
  const { step, checkIn, checkOut, adults } = useReservation(
    useShallow((s) => ({
      step: s.step,
      checkIn: s.checkIn,
      checkOut: s.checkOut,
      adults: s.adults,
    }))
  );

  const nights = checkIn && checkOut ? nightsBetween(checkIn, checkOut) : 0;

  return (
    <section id="reservation" className="py-24 lg:py-32 bg-neutral-50">
      <Container>
        <Reveal>
          <p className="font-barlow text-xs tracking-[0.3em] text-neutral-400 uppercase mb-4 flex items-center gap-3">
            <span>Reservation</span>
            <span className="w-px h-3 bg-neutral-300" />
            <span className="normal-case tracking-[0.15em] text-neutral-900 font-bold">
              Powered by 꿀스테이
            </span>
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-6">
            온라인 예약
          </h2>
        </Reveal>

        {/* 스크롤 앵커 — sticky 영향 받지 않는 고정 위치 */}
        <div id="reservation-scroll-anchor" className="h-0" />

        {/* Sticky 스테퍼 + 날짜 바 */}
        <div className="sticky top-16 lg:top-[72px] z-40 -mx-4 px-4 lg:mx-0 lg:px-0">
          <div className="pt-3 pb-10">
            <div className="bg-white border border-neutral-200/80 rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.04)] overflow-hidden">
              <div className="px-5 py-3">
                <StepIndicator />
              </div>

              {step >= 2 && checkIn && checkOut && (
                <div className="bg-neutral-900 px-5 py-2 flex flex-wrap items-center justify-center gap-x-3 gap-y-0.5 text-[13px] text-neutral-300">
                  <span className="text-white font-medium">{formatKoDate(checkIn)}</span>
                  <span className="text-neutral-500">→</span>
                  <span className="text-white font-medium">{formatKoDate(checkOut)}</span>
                  <span className="text-neutral-600">·</span>
                  <span className="text-white font-semibold">{nights}박</span>
                  <span className="text-neutral-600">·</span>
                  <span>성인 {adults}명</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          {step === 1 && <StepDates />}
          {step === 2 && <StepRoom />}
          {step === 3 && <StepGuest />}
          {step === 4 && <StepReview />}
        </div>
      </Container>
    </section>
  );
}
