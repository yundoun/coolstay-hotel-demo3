'use client';

import Image from 'next/image';
import { useStoreInfo } from '@/application/hooks/useStoreInfo';
import { Reveal } from '@/components/ui/reveal';
import { Clock, MapPin, Phone, Mail } from 'lucide-react';

export function InfoSection() {
  const { data } = useStoreInfo();

  if (!data) return null;

  const firstRoom = data.rooms?.[0];

  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">
          {data.images?.[2] && (
            <Reveal>
              <div className="relative aspect-[4/3] rounded-sm overflow-hidden">
                <Image
                  src={data.images[2].url}
                  alt={`${data.name} 시설`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 560px"
                />
              </div>
            </Reveal>
          )}

          <div className="space-y-10">
            <Reveal delay={0.1}>
              <p className="font-barlow text-xs tracking-[0.3em] text-neutral-400 uppercase mb-4">
                Information
              </p>
              <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-8">
                이용 안내
              </h2>
            </Reveal>

            {firstRoom && (
              <Reveal delay={0.15}>
                <div className="flex gap-10 pb-8 border-b border-neutral-100">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-neutral-400" />
                    <div>
                      <p className="text-xs text-neutral-400 mb-0.5">체크인</p>
                      <p className="text-base font-semibold text-neutral-800">{firstRoom.checkInTime || '-'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-neutral-400" />
                    <div>
                      <p className="text-xs text-neutral-400 mb-0.5">체크아웃</p>
                      <p className="text-base font-semibold text-neutral-800">{firstRoom.checkOutTime || '-'}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            )}

            <Reveal delay={0.2}>
              <div className="space-y-3 pb-8 border-b border-neutral-100">
                <div className="flex items-center gap-3 text-sm text-neutral-600">
                  <MapPin className="w-4 h-4 text-neutral-400 shrink-0" />
                  <span>{data.address}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-neutral-600">
                  <Phone className="w-4 h-4 text-neutral-400 shrink-0" />
                  <span>{data.phone}</span>
                </div>
                {data.email && (
                  <div className="flex items-center gap-3 text-sm text-neutral-600">
                    <Mail className="w-4 h-4 text-neutral-400 shrink-0" />
                    <span>{data.email}</span>
                  </div>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
