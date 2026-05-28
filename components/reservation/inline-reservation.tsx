'use client';

import { useReservation } from './reservation-context';
import { StepIndicator } from './step-indicator';
import { StepDates } from './steps/step-dates';
import { StepRoom } from './steps/step-room';
import { StepGuest } from './steps/step-guest';
import { StepReview } from './steps/step-review';
import { Container } from '@/components/ui/container';
import { Reveal } from '@/components/ui/reveal';

export function InlineReservation() {
  const { step } = useReservation();

  return (
    <section id="reservation" className="py-24 lg:py-32 bg-neutral-50">
      <Container>
        <Reveal>
          <p className="font-barlow text-xs tracking-[0.3em] text-neutral-400 uppercase mb-4">
            Reservation
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-12">
            온라인 예약
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <StepIndicator />
        </Reveal>

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
