'use client';

import Image from 'next/image';
import { formatPrice } from '@/domain/shared/utils';
import { Reveal } from '@/components/ui/reveal';
import { Maximize2, BedDouble, Users } from 'lucide-react';
import type { StoreInfo } from '@/adapters/coolstay/types';
import { useEffect, useState } from 'react';

export function RoomsPreview() {
  const [rooms, setRooms] = useState<StoreInfo['rooms']>([]);

  useEffect(() => {
    fetch('/api/store/info')
      .then((r) => r.json())
      .then((data: StoreInfo) => setRooms(data.rooms));
  }, []);

  const scrollToReservation = () => {
    const el = document.getElementById('reservation');
    if (el) {
      const offset = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    }
  };

  return (
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
          {rooms.map((room, i) => (
            <Reveal key={room.itemKey} delay={0.1 + i * 0.08}>
              <div className="group">
                <div className="relative aspect-[16/10] rounded-sm overflow-hidden mb-5 bg-neutral-200">
                  <Image
                    src={room.images[0]?.url || ''}
                    alt={room.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 560px"
                  />
                </div>

                <div className="mb-3">
                  <h3 className="text-lg font-semibold text-neutral-900 mb-0.5">
                    {room.name}
                  </h3>
                  <p className="font-barlow text-xs tracking-wider text-neutral-400 uppercase">
                    {room.nameEn}
                  </p>
                </div>

                <p className="text-sm text-neutral-500 leading-relaxed mb-4 line-clamp-2">
                  {room.description}
                </p>

                <div className="flex flex-wrap gap-4 text-sm text-neutral-500 mb-4">
                  <span className="flex items-center gap-1">
                    <Maximize2 className="w-3.5 h-3.5 text-neutral-400" />
                    {room.size}m²
                  </span>
                  <span className="flex items-center gap-1">
                    <BedDouble className="w-3.5 h-3.5 text-neutral-400" />
                    {room.bedType}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-neutral-400" />
                    최대 {room.maxGuests}인
                  </span>
                </div>

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
      </div>
    </section>
  );
}
