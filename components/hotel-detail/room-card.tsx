'use client';

import Image from 'next/image';
import { Room } from '@/lib/types';
import { formatPrice, cn } from '@/lib/utils';
import { Users, Maximize2, BedDouble, Check } from 'lucide-react';

interface RoomCardProps {
  room: Room;
  isSelected: boolean;
  onSelect: (room: Room) => void;
}

export function RoomCard({ room, isSelected, onSelect }: RoomCardProps) {
  return (
    <button
      onClick={() => onSelect(room)}
      className={cn(
        'w-full text-left flex flex-col md:flex-row gap-6 p-6 border rounded-lg transition-all',
        isSelected
          ? 'border-brand-500 ring-2 ring-brand-500/20'
          : 'border-neutral-200 hover:border-neutral-300'
      )}
    >
      {/* Image */}
      <div className="relative w-full md:w-[280px] aspect-[16/10] rounded-lg overflow-hidden shrink-0 bg-neutral-100">
        <Image
          src={room.image}
          alt={room.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 280px"
        />
      </div>

      {/* Info */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-xl font-semibold text-neutral-900">
              {room.name}
            </h3>
            {isSelected && (
              <span className="flex items-center gap-1 text-xs font-semibold text-brand-700 bg-brand-500/10 px-2 py-0.5 rounded-full">
                <Check className="w-3 h-3" />
                선택됨
              </span>
            )}
          </div>
          <p className="text-sm text-neutral-500 leading-relaxed mb-4">
            {room.description}
          </p>

          {/* Specs */}
          <div className="flex flex-wrap gap-4 text-sm text-neutral-600">
            <div className="flex items-center gap-1.5">
              <Maximize2 className="w-4 h-4 text-neutral-400" />
              <span>{room.size}m²</span>
            </div>
            <div className="flex items-center gap-1.5">
              <BedDouble className="w-4 h-4 text-neutral-400" />
              <span>{room.bedType}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Users className="w-4 h-4 text-neutral-400" />
              <span>
                최대 {room.capacity.adults + room.capacity.children}인
              </span>
            </div>
          </div>
        </div>

        {/* Price */}
        <div className="flex items-end justify-between mt-6">
          <div>
            <span className="text-2xl font-bold text-neutral-900">
              ₩{formatPrice(room.pricePerNight)}
            </span>
            <span className="text-sm text-neutral-400 ml-1">/박</span>
          </div>
          <span
            className={cn(
              'px-6 py-3 text-sm font-semibold transition-colors',
              isSelected
                ? 'bg-brand-600 text-neutral-900'
                : 'bg-brand-500 hover:bg-brand-400 text-neutral-900'
            )}
          >
            {isSelected ? '선택됨' : '객실 선택'}
          </span>
        </div>
      </div>
    </button>
  );
}
