'use client';

import { Suspense, useState, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Container } from '@/components/ui/container';
import { HotelFilters } from '@/components/hotels/hotel-filters';
import { HotelGrid } from '@/components/hotels/hotel-grid';
import { searchHotels } from '@/lib/hotels';
import { Region, REGIONS } from '@/lib/types';
import { Search, Calendar, Users, SlidersHorizontal } from 'lucide-react';

export default function HotelListPage() {
  return (
    <Suspense
      fallback={
        <div className="pt-[72px] flex items-center justify-center min-h-[50vh]">
          <p className="text-neutral-400">로딩 중...</p>
        </div>
      }
    >
      <HotelListContent />
    </Suspense>
  );
}

function HotelListContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialRegion = searchParams.get('region') as Region | null;
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(
    initialRegion && REGIONS.includes(initialRegion) ? initialRegion : null
  );
  const [sort, setSort] = useState('recommend');

  const filteredHotels = useMemo(() => {
    return searchHotels({
      region: selectedRegion || undefined,
      sort: sort as 'recommend' | 'price-asc' | 'price-desc' | 'rating',
    });
  }, [selectedRegion, sort]);

  return (
    <div className="pt-[72px]">
      {/* Pill trigger bar — click to go back to search panel */}
      <div className="py-8 lg:py-10 border-b border-neutral-100">
        <Container>
          <div className="relative max-w-3xl mx-auto flex items-center gap-3">
            <div
              onClick={() => router.push('/hotels')}
              className="flex-1 flex items-center border border-neutral-200 rounded-full bg-white shadow-sm divide-x divide-neutral-200 cursor-pointer hover:shadow-md transition-shadow"
            >
              <div className="flex-1 flex items-center gap-3 px-6 py-4">
                <Search className="w-4 h-4 text-neutral-400 shrink-0" />
                <span
                  className={
                    selectedRegion
                      ? 'text-sm font-medium text-neutral-900'
                      : 'text-sm text-neutral-400'
                  }
                >
                  {selectedRegion || '어디로 떠날까요?'}
                </span>
              </div>
              <div className="flex items-center gap-2 px-6 py-4">
                <Calendar className="w-4 h-4 text-neutral-400 shrink-0" />
                <span className="text-sm text-neutral-400">일정</span>
              </div>
              <div className="flex items-center gap-2 px-6 py-4">
                <Users className="w-4 h-4 text-neutral-400 shrink-0" />
                <span className="text-sm text-neutral-400">인원</span>
              </div>
            </div>
            <button className="w-10 h-10 flex items-center justify-center text-neutral-500 hover:text-neutral-900 transition-colors shrink-0">
              <SlidersHorizontal className="w-5 h-5" />
            </button>
          </div>
        </Container>
      </div>

      {/* Filters + Grid */}
      <div className="py-8 lg:py-10">
        <Container>
          <HotelFilters
            selectedRegion={selectedRegion}
            sort={sort}
            onRegionChange={setSelectedRegion}
            onSortChange={setSort}
            totalCount={filteredHotels.length}
          />
          <div className="mt-8">
            <HotelGrid hotels={filteredHotels} />
          </div>
        </Container>
      </div>
    </div>
  );
}
