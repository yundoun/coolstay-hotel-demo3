'use client';

import { useState } from 'react';
import Image from 'next/image';
import { formatPrice } from '@/domain/shared/utils';
import { Reveal } from '@/components/ui/reveal';
import { RoomDetailModal } from '@/components/ui/room-detail-modal';
import type { RoomDetailData } from '@/components/ui/room-detail-modal';
import type { RoomType } from '@/adapters/coolstay/types';
import { Maximize2, BedDouble, Users, ChevronDown, Eye, Clock } from 'lucide-react';
import { useStoreInfo } from '@/application/hooks/useStoreInfo';

const INITIAL_VISIBLE = 4;

function toDetailData(room: RoomType): RoomDetailData {
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
    price: room.basePrice,
    priceLabel: '/박',
  };
}

export function RoomsPreview() {
  const { data, loading } = useStoreInfo();
  const rooms = data?.rooms ?? [];
  const [showAll, setShowAll] = useState(false);
  const [detailRoom, setDetailRoom] = useState<RoomDetailData | null>(null);

  const visibleRooms = showAll ? rooms : rooms.slice(0, INITIAL_VISIBLE);
  const hasMore = rooms.length > INITIAL_VISIBLE;

  const scrollToReservation = () => {
    const el = document.getElementById('reservation');
    if (el) {
      const offset = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    }
  };

  if (loading || rooms.length === 0) return null;

  return (
    <>
      <section id="rooms" className="py-24 lg:py-32 bg-neutral-50">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
          <Reveal>
            <p className="font-barlow text-xs tracking-[0.3em] text-neutral-400 uppercase mb-4">
              Rooms
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-14">
              객실 안내
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {visibleRooms.map((room, i) => (
              <Reveal key={room.itemKey} delay={0.1 + i * 0.08}>
                <div className="group">
                  <div
                    className="relative aspect-[16/10] rounded-sm overflow-hidden mb-5 bg-neutral-200 cursor-pointer"
                    onClick={() => setDetailRoom(toDetailData(room))}
                  >
                    {room.images[0]?.url && (
                      <Image
                        src={room.images[0].url}
                        alt={room.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 560px"
                      />
                    )}
                    {/* hover overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                      <span className="flex items-center gap-1.5 text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 px-4 py-2 rounded-full backdrop-blur-sm">
                        <Eye className="w-3.5 h-3.5" />
                        상세보기
                      </span>
                    </div>
                  </div>

                  <div className="mb-3">
                    <h3 className="text-lg font-semibold text-neutral-900 mb-0.5">
                      {room.name}
                    </h3>
                    {room.nameEn && (
                      <p className="font-barlow text-xs tracking-wider text-neutral-400 uppercase">
                        {room.nameEn}
                      </p>
                    )}
                  </div>

                  {room.description && (
                    <p className="text-sm text-neutral-500 leading-relaxed mb-4 line-clamp-2">
                      {room.description}
                    </p>
                  )}

                  <div className="flex flex-wrap gap-4 text-sm text-neutral-500 mb-4">
                    {room.size > 0 && (
                      <span className="flex items-center gap-1">
                        <Maximize2 className="w-3.5 h-3.5 text-neutral-400" />
                        {room.size}m²
                      </span>
                    )}
                    {room.bedType && (
                      <span className="flex items-center gap-1">
                        <BedDouble className="w-3.5 h-3.5 text-neutral-400" />
                        {room.bedType}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-neutral-400" />
                      최대 {room.maxGuests}인
                    </span>
                    {(room.checkInTime || room.checkOutTime) && (
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-neutral-400" />
                        {room.checkInTime && `IN ${room.checkInTime}`}
                        {room.checkInTime && room.checkOutTime && ' / '}
                        {room.checkOutTime && `OUT ${room.checkOutTime}`}
                      </span>
                    )}
                  </div>

                  {room.features.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {room.features.map((f) => (
                        <span
                          key={f}
                          className="text-xs text-neutral-500 bg-white px-2.5 py-1 rounded"
                        >
                          {f}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-4 border-t border-neutral-200">
                    <p>
                      <span className="text-xl font-bold text-neutral-900">
                        ₩{formatPrice(room.basePrice)}
                      </span>
                      <span className="text-xs text-neutral-400 ml-1">/박</span>
                    </p>
                    <button
                      onClick={scrollToReservation}
                      className="text-sm font-semibold text-neutral-900 hover:underline underline-offset-4 transition-all"
                    >
                      예약하기
                    </button>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* 더보기 버튼 */}
          {hasMore && !showAll && (
            <Reveal delay={0.2}>
              <div className="mt-12 text-center">
                <button
                  onClick={() => setShowAll(true)}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-700 hover:text-neutral-900 border border-neutral-300 hover:border-neutral-400 px-8 py-3 transition-colors"
                >
                  객실 전체보기
                  <ChevronDown className="w-4 h-4" />
                  <span className="text-xs text-neutral-400 font-normal ml-1">
                    +{rooms.length - INITIAL_VISIBLE}개
                  </span>
                </button>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      <RoomDetailModal
        room={detailRoom}
        onClose={() => setDetailRoom(null)}
        onBook={() => {
          setDetailRoom(null);
          scrollToReservation();
        }}
      />
    </>
  );
}
