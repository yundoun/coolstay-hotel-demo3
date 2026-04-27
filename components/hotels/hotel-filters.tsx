'use client';

import { cn } from '@/lib/utils';
import { Region, REGIONS } from '@/lib/types';
import { getRegionCounts } from '@/lib/hotels';
import { ChevronDown } from 'lucide-react';

interface HotelFiltersProps {
  selectedRegion: Region | null;
  sort: string;
  onRegionChange: (region: Region | null) => void;
  onSortChange: (sort: string) => void;
  totalCount: number;
}

export function HotelFilters({
  selectedRegion,
  sort,
  onRegionChange,
  onSortChange,
  totalCount,
}: HotelFiltersProps) {
  const regionCounts = getRegionCounts();

  return (
    <div className="space-y-6">
      {/* Region tabs - Stayfolio style */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => onRegionChange(null)}
          className={cn(
            'px-4 py-2 text-sm font-medium rounded-full border transition-all duration-200',
            !selectedRegion
              ? 'bg-brand-500 text-neutral-900 border-brand-500'
              : 'bg-white text-neutral-600 border-neutral-200 hover:border-neutral-400'
          )}
        >
          전체 ({totalCount})
        </button>
        {REGIONS.map((region) => {
          const count = regionCounts[region];
          if (count === 0) return null;
          return (
            <button
              key={region}
              onClick={() => onRegionChange(region)}
              className={cn(
                'px-4 py-2 text-sm font-medium rounded-full border transition-all duration-200',
                selectedRegion === region
                  ? 'bg-brand-500 text-neutral-900 border-brand-500'
                  : 'bg-white text-neutral-600 border-neutral-200 hover:border-neutral-400'
              )}
            >
              {region} ({count})
            </button>
          );
        })}
      </div>

      {/* Sort + Count bar */}
      <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
        <p className="text-sm text-neutral-500">
          총{' '}
          <span className="font-semibold text-neutral-900">{totalCount}</span>개
          호텔
        </p>
        <div className="relative">
          <select
            value={sort}
            onChange={(e) => onSortChange(e.target.value)}
            className="appearance-none text-sm font-medium text-neutral-700 bg-transparent pr-6 cursor-pointer outline-none"
          >
            <option value="recommend">추천순</option>
            <option value="price-asc">낮은 가격순</option>
            <option value="price-desc">높은 가격순</option>
            <option value="rating">평점순</option>
          </select>
          <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
        </div>
      </div>
    </div>
  );
}
