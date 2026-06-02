'use client';

import { useReservation } from '@/adapters/zustand/reservation-store';
import { useShallow } from 'zustand/react/shallow';
import { Calendar, Users, Minus, Plus } from 'lucide-react';

export function StepDates() {
  const {
    checkIn, checkOut, adults,
    setCheckIn, setCheckOut, setAdults,
    goTo,
  } = useReservation(
    useShallow((s) => ({
      checkIn: s.checkIn,
      checkOut: s.checkOut,
      adults: s.adults,
      setCheckIn: s.setCheckIn,
      setCheckOut: s.setCheckOut,
      setAdults: s.setAdults,
      goTo: s.goTo,
    }))
  );

  const canProceed = checkIn && checkOut && checkIn < checkOut;

  const nights =
    checkIn && checkOut
      ? Math.max(
          0,
          Math.round(
            (new Date(checkOut).getTime() - new Date(checkIn).getTime()) /
              86_400_000,
          ),
        )
      : 0;

  const DAY_NAMES = ['일', '월', '화', '수', '목', '금', '토'] as const;
  const formatDate = (d: string) => {
    if (!d) return '';
    const date = new Date(d);
    return `${date.getMonth() + 1}월 ${date.getDate()}일(${DAY_NAMES[date.getDay()]})`;
  };

  return (
    <div className="max-w-lg mx-auto space-y-8">
      <div>
        <h3 className="text-xl font-bold text-neutral-900 mb-2">
          일정을 선택해 주세요
        </h3>
        <p className="text-sm text-neutral-500">
          체크인/체크아웃 날짜와 인원을 선택하세요.
        </p>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="flex items-center gap-1.5 text-sm font-medium text-neutral-700">
              <Calendar className="w-4 h-4 text-neutral-400" />
              체크인
            </label>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => {
                const newCheckIn = e.target.value;
                setCheckIn(newCheckIn);
                if (newCheckIn) {
                  const next = new Date(newCheckIn);
                  next.setDate(next.getDate() + 1);
                  setCheckOut(next.toISOString().split('T')[0]);
                }
              }}
              min={new Date().toISOString().split('T')[0]}
              className="w-full h-12 px-4 border border-neutral-200 rounded-lg text-sm bg-white focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900/10"
            />
          </div>
          <div className="space-y-2">
            <label className="flex items-center gap-1.5 text-sm font-medium text-neutral-700">
              <Calendar className="w-4 h-4 text-neutral-400" />
              체크아웃
            </label>
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              min={checkIn || new Date().toISOString().split('T')[0]}
              className="w-full h-12 px-4 border border-neutral-200 rounded-lg text-sm bg-white focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900/10"
            />
          </div>
        </div>

        <div className="space-y-3">
          <label className="flex items-center gap-1.5 text-sm font-medium text-neutral-700">
            <Users className="w-4 h-4 text-neutral-400" />
            인원
          </label>
          <CounterRow label="성인" value={adults} min={1} max={6} onChange={setAdults} />
        </div>
      </div>

      {/* Sticky bottom nav */}
      <div className="sticky bottom-0 z-30 -mx-4 mt-10 pointer-events-none px-4 py-4 sm:-mx-0 sm:px-0">
        <div className="pointer-events-auto rounded-xl border border-neutral-200/60 bg-white/90 backdrop-blur-sm shadow-lg shadow-neutral-900/5 px-5 py-4 flex items-center justify-between">
          <span className="text-sm text-neutral-500 hidden sm:block">
            {canProceed
              ? <>{formatDate(checkIn)} → {formatDate(checkOut)} · <span className="font-semibold text-neutral-800">{nights}박</span></>
              : '날짜를 선택하세요'}
          </span>
          <button
            onClick={() => goTo(2)}
            disabled={!canProceed}
            className="w-full sm:w-auto h-12 px-8 bg-neutral-900 hover:bg-neutral-800 disabled:bg-neutral-200 disabled:text-neutral-400 text-white font-semibold text-sm tracking-wide rounded-lg transition-colors"
          >
            객실 선택 →
          </button>
        </div>
      </div>
    </div>
  );
}

function CounterRow({
  label, value, min, max, onChange,
}: {
  label: string; value: number; min: number; max: number; onChange: (v: number) => void;
}) {
  return (
    <div className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg bg-white">
      <span className="text-sm text-neutral-700">{label}</span>
      <div className="flex items-center gap-4">
        <button
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
          className="w-8 h-8 rounded-full border border-neutral-300 flex items-center justify-center text-neutral-600 hover:border-neutral-400 disabled:opacity-30"
        >
          <Minus className="w-4 h-4" />
        </button>
        <span className="w-6 text-center font-semibold">{value}</span>
        <button
          onClick={() => onChange(Math.min(max, value + 1))}
          disabled={value >= max}
          className="w-8 h-8 rounded-full border border-neutral-300 flex items-center justify-center text-neutral-600 hover:border-neutral-400 disabled:opacity-30"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
