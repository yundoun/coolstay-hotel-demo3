'use client';

import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface StepIndicatorProps {
  currentStep: number;
}

const STEPS = [
  { num: 1, label: '일정 선택' },
  { num: 2, label: '객실 선택' },
  { num: 3, label: '투숙객 정보' },
  { num: 4, label: '결제' },
];

export function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center gap-0">
      {STEPS.map((step, i) => (
        <div key={step.num} className="flex items-center">
          <div className="flex items-center gap-2">
            <div
              className={cn(
                'w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors',
                currentStep > step.num
                  ? 'bg-brand-500 text-neutral-900'
                  : currentStep === step.num
                  ? 'bg-brand-500 text-neutral-900'
                  : 'bg-neutral-200 text-neutral-400'
              )}
            >
              {currentStep > step.num ? (
                <Check className="w-4 h-4" />
              ) : (
                step.num
              )}
            </div>
            <span
              className={cn(
                'text-sm font-medium hidden sm:block',
                currentStep >= step.num
                  ? 'text-neutral-900'
                  : 'text-neutral-400'
              )}
            >
              {step.label}
            </span>
          </div>
          {i < STEPS.length - 1 && (
            <div
              className={cn(
                'w-8 lg:w-16 h-px mx-3',
                currentStep > step.num ? 'bg-brand-500' : 'bg-neutral-200'
              )}
            />
          )}
        </div>
      ))}
    </div>
  );
}
