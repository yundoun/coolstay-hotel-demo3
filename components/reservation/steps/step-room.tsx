'use client';

import Image from 'next/image';
import { useReservationContext } from '../reservation-context';
import { useApiRooms } from '@/application/hooks/useApiRooms';
import { formatPrice, cn, nightsBetween } from '@/domain/shared/utils';
import type { ApiRoom } from '@/adapters/coolstay/types';
import { Maximize2, BedDouble, Users, Check } from 'lucide-react';

export function StepRoom() {
  const { selectedRoom, setSelectedRoom, setStoreData, checkIn, checkOut, goTo } = useReservationContext();
  const nights = checkIn && checkOut ? nightsBetween(checkIn, checkOut) : 0;
  const { storeData, loading, error } = useApiRooms(checkIn, checkOut, nights);

  const handleSelect = (room: ApiRoom) => {
    setSelectedRoom(room);
    if (storeData) setStoreData(storeData);
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-bold text-neutral-900 mb-2">객실을 선택하세요</h3>
        <p className="text-sm text-neutral-500">날짜에 맞는 객실과 요금을 확인하세요.</p>
      </div>

      {loading && (
        <div className="py-12 text-center text-neutral-400">객실 정보를 불러오는 중...</div>
      )}
      {error && (
        <div className="py-12 text-center text-red-500">{error}</div>
      )}

      <div className="space-y-4">
        {(storeData?.rooms ?? []).map((room) => {
          const isSelected = selectedRoom?.itemKey === room.itemKey;
          return (
            <button
              key={room.itemKey}
              onClick={() => handleSelect(room)}
              className={cn(
                'w-full text-left flex flex-col sm:flex-row gap-4 p-4 border rounded-lg transition-all bg-white',
                isSelected
                  ? 'border-neutral-900 ring-1 ring-neutral-900/10'
                  : 'border-neutral-200 hover:border-neutral-300'
              )}
            >
              <div className="relative w-full sm:w-[160px] aspect-[16/10] rounded-md overflow-hidden shrink-0 bg-neutral-100">
                {room.image && (
                  <Image
                    src={room.image}
                    alt={room.name}
                    fill
                    className="object-cover"
                    sizes="160px"
                  />
                )}
              </div>
              <div className="flex-1 flex flex-col justify-between min-w-0">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-neutral-900">{room.name}</h4>
                    {isSelected && <Check className="w-4 h-4 text-neutral-900" />}
                  </div>
                  <div className="flex gap-3 text-xs text-neutral-500 mb-2">
                    {room.size > 0 && (
                      <span className="flex items-center gap-1">
                        <Maximize2 className="w-3 h-3" />{room.size}m²
                      </span>
                    )}
                    {room.bedType && (
                      <span className="flex items-center gap-1">
                        <BedDouble className="w-3 h-3" />{room.bedType}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3" />최대 {room.maxGuests}인
                    </span>
                  </div>
                </div>
                <p className="text-lg font-bold text-neutral-900">
                  ₩{formatPrice(room.price)}
                  <span className="text-sm font-normal text-neutral-400"> /박</span>
                </p>
              </div>
            </button>
          );
        })}
      </div>

      <div className="flex gap-3">
        <button onClick={() => goTo(1)} className="flex-1 h-14 border border-neutral-300 text-neutral-700 font-semibold hover:bg-white transition-colors text-sm">
          이전
        </button>
        <button
          onClick={() => goTo(3)}
          disabled={!selectedRoom}
          className="flex-1 h-14 bg-neutral-900 hover:bg-neutral-800 disabled:bg-neutral-200 disabled:text-neutral-400 text-white font-semibold transition-colors text-sm tracking-wide"
        >
          다음 단계
        </button>
      </div>
    </div>
  );
}
