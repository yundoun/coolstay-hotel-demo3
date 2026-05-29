'use client';

import Image from 'next/image';
import { Reveal } from '@/components/ui/reveal';
import { useStoreInfo } from '@/application/hooks/useStoreInfo';

export function StorySection() {
  const { data } = useStoreInfo();

  if (!data) return null;

  const images = data.images ?? [];

  return (
    <section id="about" className="py-24 lg:py-32">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
        <Reveal>
          <p className="font-barlow text-xs tracking-[0.3em] text-neutral-400 uppercase mb-12">
            About
          </p>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          <div className="space-y-8">
            <Reveal delay={0.1}>
              <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 leading-snug">
                {data.name}
              </h2>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="text-base leading-[1.9] text-neutral-500">
                {data.address}에 위치한 {data.name}에서 특별한 시간을 보내세요.
              </p>
            </Reveal>
          </div>

          {images.length >= 2 && (
            <div className="grid grid-cols-2 gap-3">
              <Reveal delay={0.2}>
                <div className="relative aspect-[3/4] rounded-sm overflow-hidden">
                  <Image
                    src={images[0].url}
                    alt={`${data.name} 공간`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 50vw, 280px"
                  />
                </div>
              </Reveal>
              <Reveal delay={0.35}>
                <div className="relative aspect-[3/4] rounded-sm overflow-hidden mt-8">
                  <Image
                    src={images[1].url}
                    alt={`${data.name} 전경`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 50vw, 280px"
                  />
                </div>
              </Reveal>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
