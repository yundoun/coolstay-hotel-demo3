import { Hotel } from '@/lib/types';
import {
  Star,
  MapPin,
  Clock,
  Wifi,
  Dumbbell,
  Utensils,
  ConciergeBell,
  Car,
  Waves,
} from 'lucide-react';

interface HotelInfoProps {
  hotel: Hotel;
}

const AMENITY_ICONS: Record<string, React.ReactNode> = {
  '무료 WiFi': <Wifi className="w-5 h-5" />,
  '피트니스 센터': <Dumbbell className="w-5 h-5" />,
  레스토랑: <Utensils className="w-5 h-5" />,
  룸서비스: <ConciergeBell className="w-5 h-5" />,
  컨시어지: <ConciergeBell className="w-5 h-5" />,
  발레파킹: <Car className="w-5 h-5" />,
  '세탁 서비스': <Waves className="w-5 h-5" />,
};

export function HotelInfo({ hotel }: HotelInfoProps) {
  return (
    <div className="space-y-8">
      {/* Name & Rating */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Star className="w-4 h-4 fill-brand-500 text-brand-500" />
          <span className="text-sm font-semibold">{hotel.rating}</span>
          <span className="text-sm text-neutral-400">
            리뷰 {hotel.reviewCount.toLocaleString()}개
          </span>
        </div>
        <h1 className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-1">
          {hotel.name}
        </h1>
        <p className="font-barlow text-sm text-neutral-400 font-medium">
          {hotel.nameEn}
        </p>
      </div>

      {/* Location */}
      <div className="flex items-start gap-2 text-neutral-600">
        <MapPin className="w-5 h-5 shrink-0 mt-0.5" />
        <span className="text-sm">{hotel.address}</span>
      </div>

      {/* Description */}
      <p className="text-base leading-relaxed text-neutral-600">
        {hotel.description}
      </p>

      {/* Check-in/out */}
      <div className="flex gap-8 p-5 bg-neutral-50 rounded-lg">
        <div className="flex items-center gap-3">
          <Clock className="w-5 h-5 text-neutral-400" />
          <div>
            <p className="text-xs text-neutral-400 font-medium">체크인</p>
            <p className="text-sm font-semibold text-neutral-800">
              {hotel.checkIn}
            </p>
          </div>
        </div>
        <div className="w-px bg-neutral-200" />
        <div className="flex items-center gap-3">
          <Clock className="w-5 h-5 text-neutral-400" />
          <div>
            <p className="text-xs text-neutral-400 font-medium">체크아웃</p>
            <p className="text-sm font-semibold text-neutral-800">
              {hotel.checkOut}
            </p>
          </div>
        </div>
      </div>

      {/* Amenities */}
      <div>
        <h3 className="text-lg font-semibold text-neutral-900 mb-4">
          편의시설
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {hotel.amenities.map((amenity) => (
            <div key={amenity} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-500">
                {AMENITY_ICONS[amenity] || (
                  <ConciergeBell className="w-5 h-5" />
                )}
              </div>
              <span className="text-sm text-neutral-700">{amenity}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {hotel.tags.map((tag) => (
          <span
            key={tag}
            className="text-sm text-neutral-600 bg-neutral-100 px-3 py-1.5 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
