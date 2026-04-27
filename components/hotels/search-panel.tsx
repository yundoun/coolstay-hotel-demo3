'use client';

import { useState } from 'react';
import { Search, X, Minus, Plus } from 'lucide-react';
import { REGIONS, Region } from '@/lib/types';
import { cn } from '@/lib/utils';

interface SearchPanelProps {
  region: Region | '';
  checkIn: string;
  checkOut: string;
  guests: number;
  onRegionChange: (region: Region | '') => void;
  onCheckInChange: (date: string) => void;
  onCheckOutChange: (date: string) => void;
  onGuestsChange: (count: number) => void;
  onSearch: () => void;
  onReset: () => void;
  onClose: () => void;
}

type Tab = 'date' | 'guests';

export function SearchPanel({
  region,
  checkIn,
  checkOut,
  guests,
  onRegionChange,
  onCheckInChange,
  onCheckOutChange,
  onGuestsChange,
  onSearch,
  onReset,
  onClose,
}: SearchPanelProps) {
  const [activeTab, setActiveTab] = useState<Tab>('date');
  const [childCount, setChildCount] = useState(0);
  const [infants, setInfants] = useState(0);

  // Generate calendar months (current + next 5 months)
  const months = generateMonths(6);

  return (
    <div className="fixed inset-0 z-[100] bg-white flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-center px-6 py-5 border-b border-neutral-100 relative">
        <h2 className="text-lg font-bold text-neutral-900">어디로 떠날까요?</h2>
        <button
          onClick={onClose}
          className="absolute right-6 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-900 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Search input + tabs */}
      <div className="px-6 lg:px-0 max-w-[700px] mx-auto w-full">
        {/* Search input */}
        <div className="flex items-center gap-3 px-4 py-4 border-b border-neutral-100">
          <Search className="w-5 h-5 text-neutral-400 shrink-0" />
          <input
            type="text"
            placeholder="떠나고 싶은 지역, 호텔을 찾아보세요"
            value={region}
            onChange={(e) => onRegionChange(e.target.value as Region | '')}
            className="flex-1 text-base text-neutral-900 placeholder-neutral-400 bg-transparent outline-none"
          />
        </div>

        {/* Region quick chips */}
        <div className="flex flex-wrap gap-2 px-4 py-3 border-b border-neutral-100">
          {REGIONS.map((r) => (
            <button
              key={r}
              onClick={() => onRegionChange(region === r ? '' : r)}
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

        {/* Tabs: 일정 / 인원 */}
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
            <span>📅</span> 일정
            {checkIn && (
              <span className="text-xs text-neutral-500 ml-1">
                {checkIn}{checkOut ? ` ~ ${checkOut}` : ''}
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
            <span>👤</span> 인원
            {guests > 0 && (
              <span className="text-xs text-neutral-500 ml-1">
                성인 {guests}명{childCount > 0 ? `, 아동 ${childCount}명` : ''}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Tab content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-[700px] mx-auto w-full px-6 lg:px-0">
          {activeTab === 'date' ? (
            <CalendarView
              checkIn={checkIn}
              checkOut={checkOut}
              onCheckInChange={onCheckInChange}
              onCheckOutChange={onCheckOutChange}
              months={months}
            />
          ) : (
            <GuestsView
              adults={guests}
              childCount={childCount}
              infants={infants}
              onAdultsChange={onGuestsChange}
              onChildCountChange={setChildCount}
              onInfantsChange={setInfants}
            />
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-neutral-100 px-6 py-4">
        <div className="max-w-[700px] mx-auto w-full flex items-center justify-between">
          <button
            onClick={onReset}
            className="text-sm font-medium text-neutral-500 hover:text-neutral-900 underline underline-offset-4 transition-colors"
          >
            초기화
          </button>
          <button
            onClick={onSearch}
            className="bg-brand-500 hover:bg-brand-400 text-neutral-900 px-12 py-3 text-sm font-bold transition-colors"
          >
            검색
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Calendar View ─── */

interface CalendarViewProps {
  checkIn: string;
  checkOut: string;
  onCheckInChange: (d: string) => void;
  onCheckOutChange: (d: string) => void;
  months: MonthData[];
}

function CalendarView({
  checkIn,
  checkOut,
  onCheckInChange,
  onCheckOutChange,
  months,
}: CalendarViewProps) {
  const handleDateClick = (dateStr: string) => {
    if (!checkIn || (checkIn && checkOut)) {
      // Start new selection
      onCheckInChange(dateStr);
      onCheckOutChange('');
    } else {
      // Complete selection
      if (dateStr > checkIn) {
        onCheckOutChange(dateStr);
      } else {
        onCheckInChange(dateStr);
        onCheckOutChange('');
      }
    }
  };

  const isSelected = (dateStr: string) => dateStr === checkIn || dateStr === checkOut;
  const isInRange = (dateStr: string) => {
    if (!checkIn || !checkOut) return false;
    return dateStr > checkIn && dateStr < checkOut;
  };
  const isPast = (dateStr: string) => dateStr < new Date().toISOString().split('T')[0];

  return (
    <div className="py-6 space-y-10">
      {months.map((month) => (
        <div key={month.key}>
          <h3 className="text-lg font-bold text-neutral-900 mb-4">
            {month.year}년 {month.month}월
          </h3>
          {/* Day headers */}
          <div className="grid grid-cols-7 mb-2">
            {['일', '월', '화', '수', '목', '금', '토'].map((d, i) => (
              <div
                key={d}
                className={cn(
                  'text-center text-sm font-medium py-2',
                  i === 0 ? 'text-red-400' : i === 6 ? 'text-blue-400' : 'text-neutral-400'
                )}
              >
                {d}
              </div>
            ))}
          </div>
          {/* Days grid */}
          <div className="grid grid-cols-7">
            {month.days.map((day, i) => {
              if (!day) {
                return <div key={`empty-${i}`} className="h-11" />;
              }
              const dateStr = `${month.year}-${String(month.month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
              const past = isPast(dateStr);
              const selected = isSelected(dateStr);
              const inRange = isInRange(dateStr);
              const dayOfWeek = new Date(dateStr).getDay();

              return (
                <button
                  key={dateStr}
                  onClick={() => !past && handleDateClick(dateStr)}
                  disabled={past}
                  className={cn(
                    'h-11 text-sm font-medium transition-colors relative',
                    past && 'text-neutral-200 cursor-not-allowed',
                    !past && !selected && !inRange && 'hover:bg-neutral-100',
                    !past && dayOfWeek === 0 && !selected && 'text-red-400',
                    !past && dayOfWeek === 6 && !selected && 'text-blue-400',
                    !past && !selected && !inRange && dayOfWeek !== 0 && dayOfWeek !== 6 && 'text-neutral-700',
                    selected && 'bg-brand-500 text-neutral-900 rounded-full font-bold',
                    inRange && 'bg-neutral-100'
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
  );
}

/* ─── Guests View ─── */

interface GuestsViewProps {
  adults: number;
  childCount: number;
  infants: number;
  onAdultsChange: (n: number) => void;
  onChildCountChange: (n: number) => void;
  onInfantsChange: (n: number) => void;
}

function GuestsView({
  adults,
  childCount,
  infants,
  onAdultsChange,
  onChildCountChange,
  onInfantsChange,
}: GuestsViewProps) {
  return (
    <div className="py-6 space-y-0">
      <CounterRow
        label="성인"
        value={adults}
        onChange={onAdultsChange}
        min={0}
        max={10}
      />
      <CounterRow
        label="아동"
        subtitle="24개월 ~ 12세"
        value={childCount}
        onChange={onChildCountChange}
        min={0}
        max={6}
      />
      <CounterRow
        label="영아"
        subtitle="24개월 미만"
        value={infants}
        onChange={onInfantsChange}
        min={0}
        max={4}
      />
    </div>
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
        {subtitle && (
          <p className="text-sm text-neutral-400 mt-0.5">{subtitle}</p>
        )}
      </div>
      <div className="flex items-center gap-5">
        <button
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
          className="w-9 h-9 rounded-full border border-neutral-300 flex items-center justify-center text-neutral-600 hover:border-neutral-400 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <Minus className="w-4 h-4" />
        </button>
        <span className="w-6 text-center text-base font-semibold text-neutral-900">
          {value}
        </span>
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
    // Add empty slots for days before the first day
    for (let j = 0; j < firstDayOfWeek; j++) {
      days.push(null);
    }
    // Add actual days
    for (let j = 1; j <= daysInMonth; j++) {
      days.push(j);
    }

    result.push({
      key: `${year}-${month}`,
      year,
      month,
      days,
    });
  }

  return result;
}
