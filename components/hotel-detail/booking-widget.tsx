'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Hotel, Room } from '@/lib/types';
import { formatPrice } from '@/lib/utils';
import { useReservationStore } from '@/lib/reservation-store';
import { Calendar, Users, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BookingWidgetProps {
  hotel: Hotel;
  externalSelectedRoom?: Room | null;
}

export function BookingWidget({ hotel, externalSelectedRoom }: BookingWidgetProps) {
  const router = useRouter();
  const { setHotel, setDates, setGuests, selectRoom, goToStep } =
    useReservationStore();

  const [checkIn, setCheckIn] = useState('');
  const [adults, setAdults] = useState(2);
  const [internalRoom, setInternalRoom] = useState<Room | null>(null);
  const [roomOpen, setRoomOpen] = useState(false);

  const currentRoom = externalSelectedRoom ?? internalRoom;

  const handleBook = () => {
    if (!currentRoom) return;
    setHotel(hotel.id, hotel.name);
    if (checkIn) setDates(checkIn, checkIn);
    setGuests(adults, 0);
    selectRoom(currentRoom);
    goToStep(3);
    router.push('/reservation');
  };

  return (
    <div className="sticky top-24 border border-neutral-200 rounded-lg overflow-hidden">
      {/* Date & Guest selectors */}
      <div className="border-b border-neutral-200">
        <div className="grid grid-cols-2 divide-x divide-neutral-200">
          <div className="p-4">
            <label className="flex items-center gap-1.5 text-xs text-neutral-500 mb-1.5">
              <Calendar className="w-3.5 h-3.5" />
              일정
            </label>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="w-full text-sm font-medium text-neutral-800 bg-transparent outline-none"
              placeholder="체크인"
            />
          </div>
          <div className="p-4">
            <label className="flex items-center gap-1.5 text-xs text-neutral-500 mb-1.5">
              <Users className="w-3.5 h-3.5" />
              인원
            </label>
            <select
              value={adults}
              onChange={(e) => setAdults(Number(e.target.value))}
              className="w-full text-sm font-medium text-neutral-800 bg-transparent outline-none appearance-none cursor-pointer"
            >
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <option key={n} value={n}>
                  성인 {n}명
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Room selector */}
      <div className="border-b border-neutral-200">
        <button
          onClick={() => setRoomOpen(!roomOpen)}
          className="w-full p-4 flex items-center justify-between text-left"
        >
          <div className="flex items-center gap-3">
            {currentRoom ? (
              <>
                <div className="relative w-10 h-10 rounded overflow-hidden shrink-0 bg-neutral-100">
                  <Image
                    src={currentRoom.image}
                    alt={currentRoom.name}
                    fill
                    className="object-cover"
                    sizes="40px"
                  />
                </div>
                <div>
                  <p className="text-sm font-semibold text-neutral-900">
                    {currentRoom.name}
                  </p>
                  <p className="text-xs text-neutral-500">
                    ₩{formatPrice(currentRoom.pricePerNight)}/박
                  </p>
                </div>
              </>
            ) : (
              <span className="text-sm text-neutral-500">객실을 선택하세요</span>
            )}
          </div>
          <ChevronDown
            className={cn(
              'w-4 h-4 text-neutral-400 transition-transform',
              roomOpen && 'rotate-180'
            )}
          />
        </button>

        {roomOpen && (
          <div className="border-t border-neutral-100 max-h-[240px] overflow-y-auto">
            {hotel.rooms.map((room) => (
              <button
                key={room.id}
                onClick={() => {
                  setInternalRoom(room);
                  setRoomOpen(false);
                }}
                className={cn(
                  'w-full p-3 flex items-center gap-3 text-left hover:bg-neutral-50 transition-colors',
                  currentRoom?.id === room.id && 'bg-brand-500/5'
                )}
              >
                <div className="relative w-12 h-9 rounded overflow-hidden shrink-0 bg-neutral-100">
                  <Image
                    src={room.image}
                    alt={room.name}
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-neutral-900 truncate">
                    {room.name}
                  </p>
                  <p className="text-xs text-neutral-500">
                    {room.size}m² · 최대{' '}
                    {room.capacity.adults + room.capacity.children}인
                  </p>
                </div>
                <span className="text-sm font-semibold text-neutral-900 shrink-0">
                  ₩{formatPrice(room.pricePerNight)}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Book button */}
      <div className="p-4">
        <button
          onClick={handleBook}
          disabled={!currentRoom}
          className="w-full h-12 bg-brand-500 hover:bg-brand-400 disabled:bg-neutral-200 disabled:text-neutral-400 text-neutral-900 font-bold text-sm transition-colors rounded"
        >
          예약하기
        </button>
      </div>
    </div>
  );
}
