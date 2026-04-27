'use client';

import { useReservationStore } from '@/lib/reservation-store';
import { StepIndicator } from './step-indicator';
import { Step1Dates } from './step-1-dates';
import { Step2Room } from './step-2-room';
import { Step3Guest } from './step-3-guest';
import { Step4Payment } from './step-4-payment';
import { Container } from '@/components/ui/container';

export function ReservationShell() {
  const { step } = useReservationStore();

  return (
    <div className="pt-[72px]">
      <div className="bg-white border-b border-neutral-100 py-8">
        <Container size="narrow">
          <StepIndicator currentStep={step} />
        </Container>
      </div>

      <div className="py-12 lg:py-16">
        <Container size="narrow">
          {step === 1 && <Step1Dates />}
          {step === 2 && <Step2Room />}
          {step === 3 && <Step3Guest />}
          {step === 4 && <Step4Payment />}
        </Container>
      </div>
    </div>
  );
}
