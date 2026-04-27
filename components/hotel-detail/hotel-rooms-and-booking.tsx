'use client';

import { useState } from 'react';
import { Hotel, Room } from '@/lib/types';
import { RoomCard } from './room-card';
import { BookingWidget } from './booking-widget';

interface HotelRoomsAndBookingProps {
  hotel: Hotel;
}

export function HotelRoomsAndBooking({ hotel }: HotelRoomsAndBookingProps) {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  const handleSelectRoom = (room: Room) => {
    setSelectedRoom(selectedRoom?.id === room.id ? null : room);
  };

  return (
    <>
      {/* Main content - rooms */}
      <div className="lg:col-span-2">
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-neutral-900 mb-6">
            객실 선택
          </h2>
          <div className="space-y-4">
            {hotel.rooms.map((room) => (
              <RoomCard
                key={room.id}
                room={room}
                isSelected={selectedRoom?.id === room.id}
                onSelect={handleSelectRoom}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Sidebar - booking widget */}
      <div className="lg:col-span-1">
        <BookingWidget hotel={hotel} externalSelectedRoom={selectedRoom} />
      </div>
    </>
  );
}
