'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useReservation } from '@/adapters/zustand/reservation-store';
import { useShallow } from 'zustand/react/shallow';
import { useApiRooms } from '@/application/hooks/useApiRooms';
import { formatPrice, formatTime, cn, nightsBetween } from '@/domain/shared/utils';
import type { ApiRoom } from '@/adapters/coolstay/types';
import { RoomDetailModal } from '@/ui/ui/room-detail-modal';
import type { RoomDetailData } from '@/ui/ui/room-detail-modal';
import { Maximize2, BedDouble, Users, Check, Eye, AlertCircle, CalendarX, Clock } from 'lucide-react';

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

/* ── 객실 카드 (선택 가능) ── */
function RoomCard({
  room,
  nights,
  isSelected,
  onSelect,
  onDetail,
}: {
  room: ApiRoom;
  nights: number;
  isSelected: boolean;
  onSelect: () => void;
  onDetail: (e: React.MouseEvent) => void;
}) {
  return (
    <button
      onClick={onSelect}
      className={cn(
        'w-full text-left flex flex-col sm:flex-row gap-4 p-4 border rounded-lg transition-all bg-white',
        isSelected
          ? 'border-neutral-900 ring-1 ring-neutral-900/10'
          : 'border-neutral-200 hover:border-neutral-300',
      )}
    >
      <div className="relative w-full sm:w-[160px] aspect-[16/10] rounded-md overflow-hidden shrink-0 bg-neutral-100 group/thumb">
        {room.image && (
          <Image src={room.image} alt={room.name} fill className="object-cover" sizes="160px" />
        )}
        {room.images.length > 0 && (
          <div
            onClick={onDetail}
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
                <Maximize2 className="w-3 h-3" />
                {room.size}m²
              </span>
            )}
            {room.bedType && (
              <span className="flex items-center gap-1">
                <BedDouble className="w-3 h-3" />
                {room.bedType}
              </span>
            )}
            <span className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              최대 {room.maxGuests}인
            </span>
          </div>
          {(room.checkInTime || room.checkOutTime) && (
            <div className="flex gap-3 text-xs text-neutral-500 mb-2">
              {room.checkInTime && (
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-neutral-400" />
                  체크인 {formatTime(room.checkInTime)}
                </span>
              )}
              {room.checkOutTime && (
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-neutral-400" />
                  체크아웃 {formatTime(room.checkOutTime)}
                </span>
              )}
            </div>
          )}
          {room.amenities.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-2">
              {room.amenities.slice(0, 4).map((a) => (
                <span
                  key={a}
                  className="text-[11px] text-neutral-400 bg-neutral-50 px-1.5 py-0.5 rounded"
                >
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
            <span className="text-sm font-normal text-neutral-400">
              {nights > 1 ? ` / ${nights}박 합계` : ' /박'}
            </span>
          </p>
          {room.images.length > 0 && (
            <span
              onClick={onDetail}
              className="text-xs text-neutral-400 hover:text-neutral-600 underline underline-offset-2 cursor-pointer transition-colors"
            >
              상세정보
            </span>
          )}
        </div>
      </div>
    </button>
  );
}

/* ── 인원 초과 객실 카드 (선택 불가) ── */
function DisabledRoomCard({
  room,
  nights,
  onDetail,
}: {
  room: ApiRoom;
  nights: number;
  onDetail: (e: React.MouseEvent) => void;
}) {
  return (
    <div className="w-full text-left flex flex-col sm:flex-row gap-4 p-4 border border-neutral-100 rounded-lg bg-neutral-50/60">
      <div className="relative w-full sm:w-[160px] aspect-[16/10] rounded-md overflow-hidden shrink-0 bg-neutral-100 group/thumb">
        {room.image && (
          <Image
            src={room.image}
            alt={room.name}
            fill
            className="object-cover grayscale-[40%] opacity-70"
            sizes="160px"
          />
        )}
        {room.images.length > 0 && (
          <div
            onClick={onDetail}
            className="absolute inset-0 bg-black/0 group-hover/thumb:bg-black/20 transition-colors duration-200 flex items-center justify-center cursor-pointer"
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
            <h4 className="font-semibold text-neutral-400">{room.name}</h4>
            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-red-500/80 bg-red-50 border border-red-100 px-1.5 py-0.5 rounded">
              인원 초과
            </span>
          </div>
          <div className="flex gap-3 text-xs text-neutral-400 mb-2">
            {room.size > 0 && (
              <span className="flex items-center gap-1">
                <Maximize2 className="w-3 h-3" />
                {room.size}m²
              </span>
            )}
            {room.bedType && (
              <span className="flex items-center gap-1">
                <BedDouble className="w-3 h-3" />
                {room.bedType}
              </span>
            )}
            <span className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              최대 {room.maxGuests}인
            </span>
          </div>
          {(room.checkInTime || room.checkOutTime) && (
            <div className="flex gap-3 text-xs text-neutral-400 mb-2">
              {room.checkInTime && (
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  체크인 {formatTime(room.checkInTime)}
                </span>
              )}
              {room.checkOutTime && (
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  체크아웃 {formatTime(room.checkOutTime)}
                </span>
              )}
            </div>
          )}
        </div>
        <p className="text-base font-bold text-neutral-300">
          ₩{formatPrice(room.price)}
          <span className="text-sm font-normal">
            {nights > 1 ? ` / ${nights}박 합계` : ' /박'}
          </span>
        </p>
      </div>
    </div>
  );
}

export function StepRoom() {
  const { selectedRoom, setSelectedRoom, setStoreData, checkIn, checkOut, adults, goTo } =
    useReservation(
      useShallow((s) => ({
        selectedRoom: s.selectedRoom,
        setSelectedRoom: s.setSelectedRoom,
        setStoreData: s.setStoreData,
        checkIn: s.checkIn,
        checkOut: s.checkOut,
        adults: s.adults,
        goTo: s.goTo,
      }))
    );
  const nights = checkIn && checkOut ? nightsBetween(checkIn, checkOut) : 0;
  const { storeData, loading, error } = useApiRooms(checkIn, checkOut, nights);
  const [detailRoom, setDetailRoom] = useState<RoomDetailData | null>(null);

  /* ── 인원 기준 필터링 ── */
  const allRooms = storeData?.rooms ?? [];
  const filteredRooms = allRooms.filter((r) => r.maxGuests >= adults);
  const otherRooms = allRooms.filter((r) => r.maxGuests < adults);
  const hasRooms = filteredRooms.length > 0;

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
          <p className="text-sm text-neutral-500">
            {storeData
              ? `${storeData.storeName} · ${nights}박 일정에 맞는 객실을 확인하세요.`
              : '날짜에 맞는 객실과 요금을 확인하세요.'}
          </p>
        </div>

        {/* 로딩 */}
        {loading && (
          <div className="py-12 text-center text-neutral-400">객실 정보를 불러오는 중...</div>
        )}

        {/* 에러 */}
        {error && <div className="py-12 text-center text-red-500">{error}</div>}

        {/* 빈 상태 — API 응답에 객실이 하나도 없을 때 */}
        {!loading && !error && storeData && allRooms.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-neutral-100 text-neutral-400 mb-5">
              <CalendarX className="w-6 h-6" />
            </div>
            <p className="text-lg font-semibold text-neutral-800">
              선택하신 일정에 예약 가능한 객실이 없습니다
            </p>
            <p className="text-sm text-neutral-400 mt-2">
              날짜를 변경하시면 더 많은 객실을 확인하실 수 있습니다.
            </p>
            <button
              onClick={() => goTo(1)}
              className="mt-6 h-10 px-5 border border-neutral-300 text-neutral-700 font-medium hover:bg-neutral-50 rounded-lg transition-colors text-sm"
            >
              ← 날짜 다시 선택
            </button>
          </div>
        )}

        {/* 인원 기준 안내 — 수용 가능 객실 0개, 인원 초과 객실만 있을 때 */}
        {!loading && !error && storeData && !hasRooms && otherRooms.length > 0 && (
          <div className="flex items-center gap-3 border border-amber-200 bg-amber-50/60 rounded-lg px-4 py-3 text-sm text-amber-800">
            <AlertCircle className="w-4 h-4 shrink-0 text-amber-500" />
            성인 {adults}인 기준에 맞는 객실이 없습니다. 아래 다른 객실을 확인해 보세요.
          </div>
        )}

        {/* ── 선택 가능 객실 목록 ── */}
        {!loading && hasRooms && (
          <div className="space-y-4">
            {filteredRooms.map((room) => (
              <RoomCard
                key={room.itemKey}
                room={room}
                nights={nights}
                isSelected={selectedRoom?.itemKey === room.itemKey}
                onSelect={() => handleSelect(room)}
                onDetail={(e) => handleDetailClick(e, room)}
              />
            ))}
          </div>
        )}

        {/* ── 인원 초과 객실 목록 ── */}
        {!loading && otherRooms.length > 0 && (
          <div className="space-y-3">
            <p className="text-xs font-medium text-neutral-400 tracking-wide uppercase">
              다른 객실 · 최대 인원 초과 ({otherRooms.length})
            </p>
            <div className="space-y-3">
              {otherRooms.map((room) => (
                <DisabledRoomCard
                  key={room.itemKey}
                  room={room}
                  nights={nights}
                  onDetail={(e) => handleDetailClick(e, room)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Sticky bottom nav */}
        {(hasRooms || otherRooms.length > 0) && (
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
        )}
      </div>

      <RoomDetailModal room={detailRoom} onClose={() => setDetailRoom(null)} />
    </>
  );
}
