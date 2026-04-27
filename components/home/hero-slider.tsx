'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Container } from '@/components/ui/container';

const SLIDES = [
  {
    image: '/hotels/set-01/hero.jpg',
    title: '도심 속 럭셔리 에스케이프',
    subtitle: '서울 최고급 호텔에서 만나는 특별한 순간',
    cta: '호텔 둘러보기',
    href: '/hotels/list',
  },
  {
    image: '/hotels/set-04/hero.jpg',
    title: '바다가 선물하는 휴식',
    subtitle: '부산·제주·여수, 오션뷰 호텔 컬렉션',
    cta: '오션뷰 호텔 보기',
    href: '/hotels/list',
  },
  {
    image: '/hotels/set-07/hero.jpg',
    title: '올 여름, 특별 프로모션',
    subtitle: '엄선된 호텔 최대 25% 할인',
    cta: '프로모션 확인',
    href: '/hotels/list?sort=discount',
  },
  {
    image: '/hotels/set-10/hero.jpg',
    title: '꿀스테이가 큐레이션한',
    subtitle: '대한민국 프리미엄 호텔 100선',
    cta: '지금 예약하기',
    href: '/hotels',
  },
];

export function HeroSlider() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % SLIDES.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  const slide = SLIDES[current];

  return (
    <section className="pt-[72px] lg:pt-20">
      <Container size="wide">
        {/* Banner container - stayfolio style */}
        <div className="relative overflow-hidden rounded-sm aspect-[16/7] md:aspect-[16/6]">
          {/* Background Images */}
          <AnimatePresence initial={false}>
            <motion.div
              key={current}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0"
            >
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="object-cover"
                priority={current === 0}
                sizes="(max-width: 1440px) 100vw, 1440px"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/40" />
            </motion.div>
          </AnimatePresence>

          {/* Content - center aligned like stayfolio */}
          <div className="relative z-10 h-full flex items-center justify-center text-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="max-w-xl px-6"
              >
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-3">
                  {slide.title}
                </h2>
                <p className="text-base md:text-lg text-white/80 mb-6">
                  {slide.subtitle}
                </p>
                <Link
                  href={slide.href}
                  className="inline-flex items-center gap-2 bg-white/90 hover:bg-white text-neutral-900 px-6 py-2.5 text-sm font-semibold tracking-wide transition-colors duration-200"
                >
                  {slide.cta}
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Left/Right arrows - inside banner */}
          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/20 hover:bg-black/40 text-white flex items-center justify-center transition-colors"
            aria-label="이전 슬라이드"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/20 hover:bg-black/40 text-white flex items-center justify-center transition-colors"
            aria-label="다음 슬라이드"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Slide counter - bottom right inside banner */}
          <div className="absolute bottom-4 right-6 z-10 font-barlow text-sm text-white/70">
            {String(current + 1).padStart(2, '0')} / {String(SLIDES.length).padStart(2, '0')}
          </div>

          {/* Progress dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-1.5">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-[2px] transition-all duration-300 ${
                  i === current ? 'w-8 bg-white' : 'w-4 bg-white/40'
                }`}
                aria-label={`슬라이드 ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
