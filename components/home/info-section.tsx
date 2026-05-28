'use client';

import Image from 'next/image';
import { siteConfig } from '@/hotel-data';
import { Reveal } from '@/components/ui/reveal';
import { Clock, MapPin, Phone, Mail, Wifi, UtensilsCrossed, Car, Waves, Bike, Coffee, ConciergeBell, Shirt } from 'lucide-react';

const AMENITY_ICONS: Record<string, React.ReactNode> = {
  '무료 WiFi': <Wifi className="w-5 h-5" />,
  '조식 서비스': <UtensilsCrossed className="w-5 h-5" />,
  '루프탑 테라스': <Waves className="w-5 h-5" />,
  '전용 주차장': <Car className="w-5 h-5" />,
  '라운지 바': <Coffee className="w-5 h-5" />,
  '컨시어지': <ConciergeBell className="w-5 h-5" />,
  '세탁 서비스': <Shirt className="w-5 h-5" />,
  '자전거 대여': <Bike className="w-5 h-5" />,
};

export function InfoSection() {
  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">
          <Reveal>
            <div className="relative aspect-[4/3] rounded-sm overflow-hidden">
              <Image
                src={siteConfig.about.images[2]}
                alt={`${siteConfig.name} 시설`}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 560px"
              />
            </div>
          </Reveal>

          <div className="space-y-10">
            <Reveal delay={0.1}>
              <p className="font-barlow text-xs tracking-[0.3em] text-neutral-400 uppercase mb-4">
                Information
              </p>
              <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-8">
                이용 안내
              </h2>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="flex gap-10 pb-8 border-b border-neutral-100">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-neutral-400" />
                  <div>
                    <p className="text-xs text-neutral-400 mb-0.5">체크인</p>
                    <p className="text-base font-semibold text-neutral-800">{siteConfig.checkInTime}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-neutral-400" />
                  <div>
                    <p className="text-xs text-neutral-400 mb-0.5">체크아웃</p>
                    <p className="text-base font-semibold text-neutral-800">{siteConfig.checkOutTime}</p>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="space-y-3 pb-8 border-b border-neutral-100">
                <div className="flex items-center gap-3 text-sm text-neutral-600">
                  <MapPin className="w-4 h-4 text-neutral-400 shrink-0" />
                  <span>{siteConfig.address}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-neutral-600">
                  <Phone className="w-4 h-4 text-neutral-400 shrink-0" />
                  <span>{siteConfig.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-neutral-600">
                  <Mail className="w-4 h-4 text-neutral-400 shrink-0" />
                  <span>{siteConfig.email}</span>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.25}>
              <div>
                <h3 className="text-sm font-semibold text-neutral-900 mb-5">편의시설</h3>
                <div className="grid grid-cols-2 gap-4">
                  {siteConfig.amenities.map((amenity) => (
                    <div key={amenity} className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-neutral-50 flex items-center justify-center text-neutral-400">
                        {AMENITY_ICONS[amenity] || <ConciergeBell className="w-5 h-5" />}
                      </div>
                      <span className="text-sm text-neutral-600">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
