'use client';

import { Hotel } from '@/lib/types';
import { HotelCard } from './hotel-card';

interface HotelGridProps {
  hotels: Hotel[];
}

export function HotelGrid({ hotels }: HotelGridProps) {
  if (hotels.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="text-lg text-neutral-500">
          해당 조건에 맞는 호텔이 없습니다.
        </p>
        <p className="text-sm text-neutral-400 mt-2">
          다른 검색 조건을 시도해 보세요.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
      {hotels.map((hotel, index) => (
        <HotelCard key={hotel.id} hotel={hotel} index={index} />
      ))}
    </div>
  );
}
