'use client';

import Link from 'next/link';
import Image from 'next/image';
import { getFeaturedHotels } from '@/lib/hotels';
import { formatPrice, getDiscountedPrice } from '@/lib/utils';
import { Container } from '@/components/ui/container';
import { ChevronRight } from 'lucide-react';

export function FeaturedHotels() {
  const featured = getFeaturedHotels().slice(0, 3);

  return (
    <section className="py-12 lg:py-16">
      <Container size="wide">
        {/* Section header - stayfolio style: title + subtitle + arrow */}
        <Link href="/hotels/list" className="group flex items-start justify-between mb-6">
          <div>
            <h2 className="text-xl lg:text-2xl font-bold text-neutral-900 leading-snug">
              꿀스테이가 추천하는 프리미엄 호텔
            </h2>
            <p className="text-sm text-neutral-500 mt-1">
              엄선된 호텔에서 특별한 스테이를 경험하세요.
            </p>
          </div>
          <ChevronRight className="w-6 h-6 text-neutral-400 group-hover:text-neutral-900 transition-colors mt-1 shrink-0" />
        </Link>

        {/* 3-column card grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featured.map((hotel) => (
            <Link
              key={hotel.id}
              href={`/hotels/${hotel.id}`}
              className="group block"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-neutral-100">
                <Image
                  src={hotel.images.hero}
                  alt={hotel.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                {/* Tags */}
                <div className="absolute top-3 left-3 flex gap-1.5">
                  {hotel.discountRate && (
                    <span className="bg-brand-500 text-neutral-900 text-[11px] font-bold px-2 py-0.5 rounded-sm">
                      {hotel.discountRate}% OFF
                    </span>
                  )}
                  {hotel.featured && (
                    <span className="bg-brand-600 text-white text-[11px] font-bold px-2 py-0.5 rounded-sm">
                      추천
                    </span>
                  )}
                </div>
              </div>
              <div className="mt-3 space-y-1">
                <h3 className="text-base font-semibold text-neutral-900 group-hover:underline">
                  {hotel.name}
                </h3>
                <p className="text-sm text-neutral-500">{hotel.region}</p>
                <div className="flex items-baseline gap-2 pt-0.5">
                  {hotel.discountRate && (
                    <span className="text-xs text-neutral-400 line-through">
                      ₩{formatPrice(hotel.pricePerNight)}
                    </span>
                  )}
                  <span className="text-base font-bold text-neutral-900">
                    ₩
                    {formatPrice(
                      getDiscountedPrice(
                        hotel.pricePerNight,
                        hotel.discountRate
                      )
                    )}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
