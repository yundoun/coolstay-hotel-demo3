'use client';

import Link from 'next/link';
import Image from 'next/image';
import { hotels } from '@/lib/hotels';
import { formatPrice, getDiscountedPrice } from '@/lib/utils';
import { Container } from '@/components/ui/container';
import { ChevronRight } from 'lucide-react';
import { Hotel } from '@/lib/types';

interface CurationSectionProps {
  title: string;
  subtitle: string;
  items: Hotel[];
  href?: string;
}

function CurationSection({ title, subtitle, items, href = '/hotels/list' }: CurationSectionProps) {
  return (
    <section className="py-12 lg:py-16">
      <Container size="wide">
        <Link href={href} className="group flex items-start justify-between mb-6">
          <div>
            <h2 className="text-xl lg:text-2xl font-bold text-neutral-900 leading-snug">
              {title}
            </h2>
            <p className="text-sm text-neutral-500 mt-1">{subtitle}</p>
          </div>
          <ChevronRight className="w-6 h-6 text-neutral-400 group-hover:text-neutral-900 transition-colors mt-1 shrink-0" />
        </Link>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.slice(0, 3).map((hotel) => (
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
                <div className="absolute top-3 left-3 flex gap-1.5">
                  {hotel.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="bg-white/90 text-neutral-800 text-[11px] font-semibold px-2 py-0.5 rounded-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-3 space-y-1">
                <h3 className="text-base font-semibold text-neutral-900 group-hover:underline">
                  {hotel.name}
                </h3>
                <p className="text-sm text-neutral-500">{hotel.region}</p>
                <div className="flex items-baseline gap-2 pt-0.5">
                  {hotel.discountRate && (
                    <span className="text-[11px] text-red-500 font-bold">
                      {hotel.discountRate}%
                    </span>
                  )}
                  {hotel.discountRate && (
                    <span className="text-xs text-neutral-400 line-through">
                      ₩{formatPrice(hotel.pricePerNight)}
                    </span>
                  )}
                  <span className="text-base font-bold text-neutral-900">
                    ₩{formatPrice(getDiscountedPrice(hotel.pricePerNight, hotel.discountRate))}
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

export function CurationSections() {
  // 평점 높은 호텔
  const topRated = [...hotels].sort((a, b) => b.rating - a.rating);
  // 제주 호텔
  const jejuHotels = hotels.filter((h) => h.region === '제주');
  // 가성비 호텔
  const budgetHotels = [...hotels].sort((a, b) => a.pricePerNight - b.pricePerNight);
  // 할인 중인 호텔
  const discountHotels = hotels.filter((h) => h.discountRate);

  return (
    <>
      <CurationSection
        title="평점이 증명하는 실패 없는 휴식"
        subtitle="다녀온 분들의 촘촘한 후기에는 이유가 있죠."
        items={topRated}
      />

      <div className="border-t border-neutral-100" />

      <CurationSection
        title="제주에서 보내는 특별한 하루"
        subtitle="제주의 자연과 함께하는 프리미엄 호텔 컬렉션"
        items={jejuHotels}
      />

      <div className="border-t border-neutral-100" />

      <CurationSection
        title="지금 할인 중인 호텔, 놓치지 마세요"
        subtitle="최대 25% 할인된 가격으로 럭셔리 스테이를 경험하세요."
        items={discountHotels}
      />

      <div className="border-t border-neutral-100" />

      <CurationSection
        title="합리적인 가격, 프리미엄 경험"
        subtitle="부담 없이 떠나는 퀄리티 스테이를 엄선했어요."
        items={budgetHotels}
      />
    </>
  );
}
