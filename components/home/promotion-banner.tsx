'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Container } from '@/components/ui/container';
import { Reveal } from '@/components/ui/reveal';
import { ArrowRight } from 'lucide-react';

export function PromotionBanner() {
  return (
    <section className="py-20 lg:py-28 bg-neutral-50">
      <Container>
        <Reveal>
          <Link href="/hotels" className="group block">
            <div className="relative overflow-hidden rounded-lg aspect-[21/9] lg:aspect-[3/1]">
              <Image
                src="/hotels/set-05/hero.jpg"
                alt="여름 프로모션"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
              <div className="absolute inset-0 flex items-center p-8 lg:p-16">
                <div className="max-w-lg">
                  <p className="font-barlow text-xs font-bold tracking-[0.2em] uppercase text-brand-400 mb-3">
                    SPECIAL PROMOTION
                  </p>
                  <h2 className="text-2xl lg:text-4xl font-bold text-white leading-tight mb-3">
                    이번 시즌,
                    <br />
                    놓치지 말아야 할 호텔
                  </h2>
                  <p className="text-sm lg:text-base text-white/70 mb-6">
                    꿀스테이가 엄선한 호텔에서 최대 25% 할인된 가격으로
                    <br className="hidden lg:block" />
                    특별한 스테이를 경험하세요.
                  </p>
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-brand-400 group-hover:text-brand-300 transition-colors">
                    프로모션 호텔 보기
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}
