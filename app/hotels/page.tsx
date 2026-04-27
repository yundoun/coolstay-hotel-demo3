'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X, Minus, Plus } from 'lucide-react';
import { REGIONS, Region } from '@/lib/types';
import { cn } from '@/lib/utils';

type Tab = 'date' | 'guests';

export default function HotelSearchPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>('date');
  const [region, setRegion] = useState<Region | ''>('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [adults, setAdults] = useState(0);
  const [childCount, setChildCount] = useState(0);
  const [infants, setInfants] = useState(0);

  const months = generateMonths(6);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (region) params.set('region', region);
    if (checkIn) params.set('checkIn', checkIn);
    if (checkOut) params.set('checkOut', checkOut);
    if (adults) params.set('adults', String(adults));
    router.push(`/hotels/list?${params.toString()}`);
  };

  const handleReset = () => {
    setRegion('');
    setCheckIn('');
    setCheckOut('');
    setAdults(0);
    setChildCount(0);
    setInfants(0);
  };

  const handleDateClick = (dateStr: string) => {
    if (!checkIn || (checkIn && checkOut)) {
      setCheckIn(dateStr);
      setCheckOut('');
    } else {
      if (dateStr > checkIn) {
        setCheckOut(dateStr);
      } else {
        setCheckIn(dateStr);
        setCheckOut('');
      }
    }
  };

  const isPast = (dateStr: string) =>
    dateStr < new Date().toISOString().split('T')[0];
  const isSelected = (dateStr: string) =>
    dateStr === checkIn || dateStr === checkOut;
  const isInRange = (dateStr: string) => {
    if (!checkIn || !checkOut) return false;
    return dateStr > checkIn && dateStr < checkOut;
  };

  return (
    <div className="fixed inset-0 z-[90] bg-white flex flex-col pt-[72px]">
      {/* Header */}
      <div className="flex items-center justify-center px-6 py-5 border-b border-neutral-100 relative">
        <h1 className="text-lg font-bold text-neutral-900">어디로 떠날까요?</h1>
        <button
          onClick={() => router.back()}
          className="absolute right-6 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-900 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Search input + region chips */}
      <div className="max-w-[700px] mx-auto w-full px-6 lg:px-0">
        <div className="flex items-center gap-3 px-4 py-4 border-b border-neutral-100">
          <Search className="w-5 h-5 text-neutral-400 shrink-0" />
          <input
            type="text"
            placeholder="떠나고 싶은 지역, 호텔을 찾아보세요"
            value={region}
            onChange={(e) => setRegion(e.target.value as Region | '')}
            className="flex-1 text-base text-neutral-900 placeholder-neutral-400 bg-transparent outline-none"
          />
        </div>

        <div className="flex flex-wrap gap-2 px-4 py-3 border-b border-neutral-100">
          {REGIONS.map((r) => (
            <button
              key={r}
              onClick={() => setRegion(region === r ? '' : r)}
              className={cn(
                'px-3 py-1.5 text-sm rounded-full border transition-colors',
                region === r
                  ? 'bg-brand-500 text-neutral-900 border-brand-500'
                  : 'bg-white text-neutral-600 border-neutral-200 hover:border-neutral-400'
              )}
            >
              {r}
            </button>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex border-b border-neutral-100">
          <button
            onClick={() => setActiveTab('date')}
            className={cn(
              'flex-1 flex items-center justify-center gap-2 py-4 text-sm font-medium transition-colors border-b-2',
              activeTab === 'date'
                ? 'text-brand-700 border-brand-500'
                : 'text-neutral-400 border-transparent hover:text-neutral-600'
            )}
          >
            <Calendar className="w-4 h-4" /> 일정
            {checkIn && (
              <span className="text-xs text-neutral-500 ml-1">
                {checkIn}
                {checkOut ? ` ~ ${checkOut}` : ''}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('guests')}
            className={cn(
              'flex-1 flex items-center justify-center gap-2 py-4 text-sm font-medium transition-colors border-b-2',
              activeTab === 'guests'
                ? 'text-brand-700 border-brand-500'
                : 'text-neutral-400 border-transparent hover:text-neutral-600'
            )}
          >
            <Users className="w-4 h-4" /> 인원
            {adults > 0 && (
              <span className="text-xs text-neutral-500 ml-1">
                성인 {adults}명
                {childCount > 0 ? `, 아동 ${childCount}명` : ''}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Tab content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-[700px] mx-auto w-full px-6 lg:px-0">
          {activeTab === 'date' ? (
            <div className="py-6 space-y-10">
              {months.map((month) => (
                <div key={month.key}>
                  <h3 className="text-lg font-bold text-neutral-900 mb-4">
                    {month.year}년 {month.month}월
                  </h3>
                  <div className="grid grid-cols-7 mb-2">
                    {['일', '월', '화', '수', '목', '금', '토'].map((d, i) => (
                      <div
                        key={d}
                        className={cn(
                          'text-center text-sm font-medium py-2',
                          i === 0
                            ? 'text-red-400'
                            : i === 6
                            ? 'text-blue-400'
                            : 'text-neutral-400'
                        )}
                      >
                        {d}
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7">
                    {month.days.map((day, i) => {
                      if (!day)
                        return <div key={`empty-${i}`} className="h-11" />;
                      const dateStr = `${month.year}-${String(month.month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                      const past = isPast(dateStr);
                      const selected = isSelected(dateStr);
                      const inRange = isInRange(dateStr);
                      const dow = new Date(dateStr).getDay();
                      return (
                        <button
                          key={dateStr}
                          onClick={() => !past && handleDateClick(dateStr)}
                          disabled={past}
                          className={cn(
                            'h-11 text-sm font-medium transition-all duration-200 relative',
                            past && 'text-neutral-200 cursor-not-allowed',
                            !past && !selected && !inRange && 'hover:bg-neutral-100',
                            !past && dow === 0 && !selected && 'text-red-400',
                            !past && dow === 6 && !selected && 'text-blue-400',
                            !past && !selected && !inRange && dow !== 0 && dow !== 6 && 'text-neutral-700',
                            selected && 'bg-brand-500 text-neutral-900 rounded-full font-bold',
                            inRange && 'bg-brand-500/10'
                          )}
                        >
                          {day}
                          {dateStr === checkIn && (
                            <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[10px] text-neutral-500">
                              체크인
                            </span>
                          )}
                          {dateStr === checkOut && (
                            <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[10px] text-neutral-500">
                              체크아웃
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-6">
              <CounterRow label="성인" value={adults} onChange={setAdults} min={0} max={10} />
              <CounterRow label="아동" subtitle="24개월 ~ 12세" value={childCount} onChange={setChildCount} min={0} max={6} />
              <CounterRow label="영아" subtitle="24개월 미만" value={infants} onChange={setInfants} min={0} max={4} />
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-neutral-100 px-6 py-4">
        <div className="max-w-[700px] mx-auto w-full flex items-center justify-between">
          <button
            onClick={handleReset}
            className="text-sm font-medium text-neutral-500 hover:text-neutral-900 underline underline-offset-4 transition-colors"
          >
            초기화
          </button>
          <button
            onClick={handleSearch}
            className="bg-brand-500 hover:bg-brand-400 text-neutral-900 px-12 py-3 text-sm font-bold transition-colors"
          >
            검색
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Sub-components ─── */

function Calendar({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
    </svg>
  );
}

function Users({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
    </svg>
  );
}

function CounterRow({
  label,
  subtitle,
  value,
  onChange,
  min,
  max,
}: {
  label: string;
  subtitle?: string;
  value: number;
  onChange: (n: number) => void;
  min: number;
  max: number;
}) {
  return (
    <div className="flex items-center justify-between py-5 border-b border-neutral-100 last:border-b-0">
      <div>
        <p className="text-base font-semibold text-neutral-900">{label}</p>
        {subtitle && <p className="text-sm text-neutral-400 mt-0.5">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-5">
        <button
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
          className="w-9 h-9 rounded-full border border-neutral-300 flex items-center justify-center text-neutral-600 hover:border-neutral-400 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <Minus className="w-4 h-4" />
        </button>
        <span className="w-6 text-center text-base font-semibold text-neutral-900">{value}</span>
        <button
          onClick={() => onChange(Math.min(max, value + 1))}
          disabled={value >= max}
          className="w-9 h-9 rounded-full border border-neutral-300 flex items-center justify-center text-neutral-600 hover:border-neutral-400 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

/* ─── Calendar Helpers ─── */

interface MonthData {
  key: string;
  year: number;
  month: number;
  days: (number | null)[];
}

function generateMonths(count: number): MonthData[] {
  const result: MonthData[] = [];
  const now = new Date();
  for (let i = 0; i < count; i++) {
    const date = new Date(now.getFullYear(), now.getMonth() + i, 1);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const firstDayOfWeek = date.getDay();
    const daysInMonth = new Date(year, month, 0).getDate();
    const days: (number | null)[] = [];
    for (let j = 0; j < firstDayOfWeek; j++) days.push(null);
    for (let j = 1; j <= daysInMonth; j++) days.push(j);
    result.push({ key: `${year}-${month}`, year, month, days });
  }
  return result;
}
