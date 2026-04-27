'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Hotel } from '@/lib/types';
import { formatPrice, getDiscountedPrice } from '@/lib/utils';
import { Star, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

interface HotelCardProps {
  hotel: Hotel;
  index: number;
}

export function HotelCard({ hotel, index }: HotelCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Link href={`/hotels/${hotel.id}`} className="group block">
        {/* Image */}
        <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-neutral-100">
          <Image
            src={hotel.images.hero}
            alt={hotel.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
          />
          {hotel.discountRate && (
            <span className="absolute top-3 left-3 bg-brand-500 text-neutral-900 text-xs font-bold px-2.5 py-1 rounded-sm">
              {hotel.discountRate}% OFF
            </span>
          )}
        </div>

        {/* Info */}
        <div className="mt-3.5 space-y-1.5">
          {/* Rating */}
          <div className="flex items-center gap-1.5">
            <Star className="w-3.5 h-3.5 fill-brand-500 text-brand-500" />
            <span className="text-sm font-semibold text-neutral-800">
              {hotel.rating}
            </span>
            <span className="text-xs text-neutral-400">
              ({hotel.reviewCount.toLocaleString()})
            </span>
          </div>

          {/* Name */}
          <h3 className="text-base font-semibold text-neutral-900 group-hover:text-brand-700 transition-colors leading-snug">
            {hotel.name}
          </h3>

          {/* Location */}
          <div className="flex items-center gap-1 text-neutral-500">
            <MapPin className="w-3.5 h-3.5" />
            <span className="text-sm">{hotel.region}</span>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {hotel.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-[11px] text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded-sm"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2 pt-2">
            {hotel.discountRate && (
              <span className="text-sm text-neutral-400 line-through">
                ₩{formatPrice(hotel.pricePerNight)}
              </span>
            )}
            <span className="text-lg font-bold text-neutral-900">
              ₩
              {formatPrice(
                getDiscountedPrice(hotel.pricePerNight, hotel.discountRate)
              )}
            </span>
            <span className="text-xs text-neutral-400">/박</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
