'use client';

import { useState } from 'react';
import { Search, Calendar, Users, SlidersHorizontal } from 'lucide-react';
import { Region } from '@/lib/types';
import { SearchPanel } from './search-panel';

interface SearchBarProps {
  onSearch: (params: {
    region?: Region;
    checkIn?: string;
    checkOut?: string;
    guests?: number;
  }) => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [panelOpen, setPanelOpen] = useState(false);
  const [region, setRegion] = useState<Region | ''>('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(0);

  const handleSearch = () => {
    setPanelOpen(false);
    onSearch({
      region: region || undefined,
      checkIn: checkIn || undefined,
      checkOut: checkOut || undefined,
      guests: guests || undefined,
    });
  };

  const handleReset = () => {
    setRegion('');
    setCheckIn('');
    setCheckOut('');
    setGuests(0);
  };

  return (
    <>
      {/* Trigger bar - stayfolio pill style */}
      <div className="relative max-w-3xl mx-auto flex items-center gap-3">
        <div
          onClick={() => setPanelOpen(true)}
          className="flex-1 flex items-center border border-neutral-200 rounded-full bg-white shadow-sm divide-x divide-neutral-200 cursor-pointer hover:shadow-md transition-shadow"
        >
          {/* Destination */}
          <div className="flex-1 flex items-center gap-3 px-6 py-4">
            <Search className="w-4 h-4 text-neutral-400 shrink-0" />
            <span className={region ? 'text-sm font-medium text-neutral-900' : 'text-sm text-neutral-400'}>
              {region || '어디로 떠날까요?'}
            </span>
          </div>

          {/* Date */}
          <div className="flex items-center gap-2 px-6 py-4">
            <Calendar className="w-4 h-4 text-neutral-400 shrink-0" />
            <span className={checkIn ? 'text-sm font-medium text-neutral-900' : 'text-sm text-neutral-400'}>
              {checkIn && checkOut ? `${checkIn} ~ ${checkOut}` : '일정'}
            </span>
          </div>

          {/* Guests */}
          <div className="flex items-center gap-2 px-6 py-4">
            <Users className="w-4 h-4 text-neutral-400 shrink-0" />
            <span className={guests > 0 ? 'text-sm font-medium text-neutral-900' : 'text-sm text-neutral-400'}>
              {guests > 0 ? `성인 ${guests}명` : '인원'}
            </span>
          </div>
        </div>

        {/* Filter icon */}
        <button className="w-10 h-10 flex items-center justify-center text-neutral-500 hover:text-neutral-900 transition-colors shrink-0">
          <SlidersHorizontal className="w-5 h-5" />
        </button>
      </div>

      {/* Full-screen search panel */}
      {panelOpen && (
        <SearchPanel
          region={region}
          checkIn={checkIn}
          checkOut={checkOut}
          guests={guests}
          onRegionChange={setRegion}
          onCheckInChange={setCheckIn}
          onCheckOutChange={setCheckOut}
          onGuestsChange={setGuests}
          onSearch={handleSearch}
          onReset={handleReset}
          onClose={() => setPanelOpen(false)}
        />
      )}
    </>
  );
}
