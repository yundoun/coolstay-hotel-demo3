'use client';

import { useState } from 'react';
import { useReservationStore } from '@/lib/reservation-store';
import { Calendar, Users, Minus, Plus } from 'lucide-react';

export function Step1Dates() {
  const { checkIn, checkOut, adults, children, setDates, setGuests, nextStep } =
    useReservationStore();

  const [localCheckIn, setLocalCheckIn] = useState(checkIn || '');
  const [localCheckOut, setLocalCheckOut] = useState(checkOut || '');
  const [localAdults, setLocalAdults] = useState(adults);
  const [localChildren, setLocalChildren] = useState(children);

  const canProceed = localCheckIn && localCheckOut && localCheckIn < localCheckOut;

  const handleNext = () => {
    if (!canProceed) return;
    setDates(localCheckIn, localCheckOut);
    setGuests(localAdults, localChildren);
    nextStep();
  };

  return (
    <div className="max-w-lg mx-auto space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-neutral-900 mb-2">
          일정을 선택하세요
        </h2>
        <p className="text-neutral-500">체크인/체크아웃 날짜와 인원을 선택해주세요.</p>
      </div>

      {/* Dates */}
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-neutral-700">
            <Calendar className="w-4 h-4" />
            체크인
          </label>
          <input
            type="date"
            value={localCheckIn}
            onChange={(e) => setLocalCheckIn(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            className="w-full h-12 px-4 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
          />
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-neutral-700">
            <Calendar className="w-4 h-4" />
            체크아웃
          </label>
          <input
            type="date"
            value={localCheckOut}
            onChange={(e) => setLocalCheckOut(e.target.value)}
            min={localCheckIn || new Date().toISOString().split('T')[0]}
            className="w-full h-12 px-4 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
          />
        </div>
      </div>

      {/* Guests */}
      <div className="space-y-4">
        <label className="flex items-center gap-2 text-sm font-medium text-neutral-700">
          <Users className="w-4 h-4" />
          인원
        </label>

        <div className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg">
          <span className="text-sm text-neutral-700">성인</span>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setLocalAdults(Math.max(1, localAdults - 1))}
              className="w-8 h-8 rounded-full border border-neutral-300 flex items-center justify-center text-neutral-600 hover:border-neutral-400 disabled:opacity-30"
              disabled={localAdults <= 1}
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-6 text-center font-semibold">{localAdults}</span>
            <button
              onClick={() => setLocalAdults(Math.min(6, localAdults + 1))}
              className="w-8 h-8 rounded-full border border-neutral-300 flex items-center justify-center text-neutral-600 hover:border-neutral-400 disabled:opacity-30"
              disabled={localAdults >= 6}
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg">
          <span className="text-sm text-neutral-700">아동</span>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setLocalChildren(Math.max(0, localChildren - 1))}
              className="w-8 h-8 rounded-full border border-neutral-300 flex items-center justify-center text-neutral-600 hover:border-neutral-400 disabled:opacity-30"
              disabled={localChildren <= 0}
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-6 text-center font-semibold">
              {localChildren}
            </span>
            <button
              onClick={() => setLocalChildren(Math.min(4, localChildren + 1))}
              className="w-8 h-8 rounded-full border border-neutral-300 flex items-center justify-center text-neutral-600 hover:border-neutral-400 disabled:opacity-30"
              disabled={localChildren >= 4}
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <button
        onClick={handleNext}
        disabled={!canProceed}
        className="w-full h-14 bg-brand-500 hover:bg-brand-400 disabled:bg-neutral-200 disabled:text-neutral-400 text-neutral-900 font-semibold text-base transition-colors"
      >
        다음 단계
      </button>
    </div>
  );
}
