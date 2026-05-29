'use client';

import { useReservationContext, STEPS, Step } from './reservation-context';
import { cn } from '@/domain/shared/utils';
import { Check } from 'lucide-react';

export function StepIndicator() {
  const { step, goTo } = useReservationContext();

  return (
    <div className="flex items-center justify-center gap-0 mb-12">
      {STEPS.map((s, i) => (
        <div key={s.num} className="flex items-center">
          <button
            onClick={() => {
              if (s.num < step) goTo(s.num as Step);
            }}
            disabled={s.num > step}
            className="flex items-center gap-2"
          >
            <div
              className={cn(
                'w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors',
                step > s.num
                  ? 'bg-neutral-900 text-white cursor-pointer'
                  : step === s.num
                  ? 'bg-neutral-900 text-white'
                  : 'bg-neutral-200 text-neutral-400'
              )}
            >
              {step > s.num ? <Check className="w-4 h-4" /> : s.num}
            </div>
            <span
              className={cn(
                'text-sm font-medium hidden sm:block',
                step >= s.num ? 'text-neutral-900' : 'text-neutral-400'
              )}
            >
              {s.label}
            </span>
          </button>
          {i < STEPS.length - 1 && (
            <div
              className={cn(
                'w-8 lg:w-16 h-px mx-3',
                step > s.num ? 'bg-neutral-900' : 'bg-neutral-200'
              )}
            />
          )}
        </div>
      ))}
    </div>
  );
}
