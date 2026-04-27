'use client';

import Image from 'next/image';
import { useReservationStore } from '@/lib/reservation-store';
import { getHotelById } from '@/lib/hotels';
import { formatPrice } from '@/lib/utils';
import { cn } from '@/lib/utils';
import { Users, Maximize2, BedDouble, Check } from 'lucide-react';

export function Step2Room() {
  const { hotelId, selectedRoom, selectRoom, nextStep, prevStep } =
    useReservationStore();

  const hotel = hotelId ? getHotelById(hotelId) : null;

  if (!hotel) {
    return (
      <div className="text-center py-12">
        <p className="text-neutral-500">호텔 정보를 찾을 수 없습니다.</p>
        <p className="text-sm text-neutral-400 mt-2">
          호텔 상세 페이지에서 예약을 시작해주세요.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-neutral-900 mb-2">
          객실을 선택하세요
        </h2>
        <p className="text-neutral-500">{hotel.name}</p>
      </div>

      <div className="space-y-4">
        {hotel.rooms.map((room) => {
          const isSelected = selectedRoom?.id === room.id;
          return (
            <button
              key={room.id}
              onClick={() => selectRoom(room)}
              className={cn(
                'w-full text-left flex flex-col sm:flex-row gap-4 p-4 border rounded-lg transition-all',
                isSelected
                  ? 'border-brand-500 ring-2 ring-brand-500/20'
                  : 'border-neutral-200 hover:border-neutral-300'
              )}
            >
              <div className="relative w-full sm:w-[180px] aspect-[16/10] rounded-md overflow-hidden shrink-0 bg-neutral-100">
                <Image
                  src={room.image}
                  alt={room.name}
                  fill
                  className="object-cover"
                  sizes="180px"
                />
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-neutral-900">
                      {room.name}
                    </h3>
                    {isSelected && (
                      <Check className="w-4 h-4 text-brand-600" />
                    )}
                  </div>
                  <div className="flex gap-3 text-xs text-neutral-500 mb-2">
                    <span className="flex items-center gap-1">
                      <Maximize2 className="w-3 h-3" />
                      {room.size}m²
                    </span>
                    <span className="flex items-center gap-1">
                      <BedDouble className="w-3 h-3" />
                      {room.bedType}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      최대 {room.capacity.adults + room.capacity.children}인
                    </span>
                  </div>
                </div>
                <p className="text-lg font-bold text-neutral-900">
                  ₩{formatPrice(room.pricePerNight)}
                  <span className="text-sm font-normal text-neutral-400">
                    {' '}
                    /박
                  </span>
                </p>
              </div>
            </button>
          );
        })}
      </div>

      <div className="flex gap-3">
        <button
          onClick={prevStep}
          className="flex-1 h-14 border border-neutral-300 text-neutral-700 font-semibold hover:bg-neutral-50 transition-colors"
        >
          이전
        </button>
        <button
          onClick={nextStep}
          disabled={!selectedRoom}
          className="flex-1 h-14 bg-brand-500 hover:bg-brand-400 disabled:bg-neutral-200 disabled:text-neutral-400 text-neutral-900 font-semibold transition-colors"
        >
          다음 단계
        </button>
      </div>
    </div>
  );
}
