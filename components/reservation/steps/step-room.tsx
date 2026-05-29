'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useReservationContext } from '../reservation-context';
import { useApiRooms } from '@/application/hooks/useApiRooms';
import { formatPrice, cn, nightsBetween } from '@/domain/shared/utils';
import type { ApiRoom } from '@/adapters/coolstay/types';
import { RoomDetailModal } from '@/components/ui/room-detail-modal';
import type { RoomDetailData } from '@/components/ui/room-detail-modal';
import { Maximize2, BedDouble, Users, Check, Eye } from 'lucide-react';

function toDetailData(room: ApiRoom, nights: number): RoomDetailData {
  return {
    name: room.name,
    nameEn: room.nameEn,
    description: room.description,
    maxGuests: room.maxGuests,
    size: room.size,
    bedType: room.bedType,
    images: room.images,
    features: room.features,
    amenities: room.amenities,
    checkInTime: room.checkInTime,
    checkOutTime: room.checkOutTime,
    price: room.price,
    priceLabel: nights > 1 ? ` / ${nights}박 합계` : '/박',
  };
}

export function StepRoom() {
  const { selectedRoom, setSelectedRoom, setStoreData, checkIn, checkOut, goTo } = useReservationContext();
  const nights = checkIn && checkOut ? nightsBetween(checkIn, checkOut) : 0;
  const { storeData, loading, error } = useApiRooms(checkIn, checkOut, nights);
  const [detailRoom, setDetailRoom] = useState<RoomDetailData | null>(null);

  const handleSelect = (room: ApiRoom) => {
    setSelectedRoom(room);
    if (storeData) setStoreData(storeData);
  };

  const handleDetailClick = (e: React.MouseEvent, room: ApiRoom) => {
    e.stopPropagation();
    setDetailRoom(toDetailData(room, nights));
  };

  return (
    <>
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
                <div className="relative w-full sm:w-[160px] aspect-[16/10] rounded-md overflow-hidden shrink-0 bg-neutral-100 group/thumb">
                  {room.image && (
                    <Image
                      src={room.image}
                      alt={room.name}
                      fill
                      className="object-cover"
                      sizes="160px"
                    />
                  )}
                  {/* 상세보기 오버레이 */}
                  {room.images.length > 0 && (
                    <div
                      onClick={(e) => handleDetailClick(e, room)}
                      className="absolute inset-0 bg-black/0 group-hover/thumb:bg-black/30 transition-colors duration-200 flex items-center justify-center cursor-pointer"
                    >
                      <span className="flex items-center gap-1 text-white text-xs font-medium opacity-0 group-hover/thumb:opacity-100 transition-opacity duration-200">
                        <Eye className="w-3 h-3" />
                        상세보기
                      </span>
                    </div>
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
                    {/* 어메니티 미리보기 */}
                    {room.amenities.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-2">
                        {room.amenities.slice(0, 4).map((a) => (
                          <span key={a} className="text-[11px] text-neutral-400 bg-neutral-50 px-1.5 py-0.5 rounded">
                            {a}
                          </span>
                        ))}
                        {room.amenities.length > 4 && (
                          <span className="text-[11px] text-neutral-400 px-1">
                            +{room.amenities.length - 4}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-bold text-neutral-900">
                      ₩{formatPrice(room.price)}
                      <span className="text-sm font-normal text-neutral-400"> /박</span>
                    </p>
                    {room.images.length > 0 && (
                      <span
                        onClick={(e) => handleDetailClick(e, room)}
                        className="text-xs text-neutral-400 hover:text-neutral-600 underline underline-offset-2 cursor-pointer transition-colors"
                      >
                        상세정보
                      </span>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Sticky bottom nav */}
        <div className="sticky bottom-0 z-30 -mx-4 mt-10 pointer-events-none px-4 py-4 sm:-mx-0 sm:px-0">
          <div className="pointer-events-auto rounded-xl border border-neutral-200/60 bg-white/90 backdrop-blur-sm shadow-lg shadow-neutral-900/5 px-5 py-4 flex items-center justify-between gap-3">
            <button
              onClick={() => goTo(1)}
              className="h-12 px-6 border border-neutral-300 text-neutral-700 font-semibold hover:bg-white rounded-lg transition-colors text-sm"
            >
              ← 이전
            </button>
            <button
              onClick={() => goTo(3)}
              disabled={!selectedRoom}
              className="h-12 px-8 bg-neutral-900 hover:bg-neutral-800 disabled:bg-neutral-200 disabled:text-neutral-400 text-white font-semibold rounded-lg transition-colors text-sm tracking-wide"
            >
              다음 단계 →
            </button>
          </div>
        </div>
      </div>

      <RoomDetailModal
        room={detailRoom}
        onClose={() => setDetailRoom(null)}
      />
    </>
  );
}
