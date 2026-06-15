'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { motion } from 'framer-motion';
import { siteConfig } from '@/hotel-data';
import 'swiper/css';
import 'swiper/css/effect-fade';

/* Swiper fade: 비활성 슬라이드 완전히 숨김 */
const fadeFixStyle = `
  .swiper-slide:not(.swiper-slide-active) {
    opacity: 0 !important;
    pointer-events: none;
  }
`;

export function HeroSection() {
  const images = siteConfig.heroImages.slice(0, 5);
  const hasMultiple = images.length >= 2;
  const [activeIndex, setActiveIndex] = useState(0);
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

  const name = siteConfig.name;
  const nameEn = siteConfig.nameEn;

  const scrollToGreeting = () => {
    document.getElementById('greeting')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative h-screen min-h-[600px] max-h-[900px]"
    >
      <style>{fadeFixStyle}</style>
      {/* ── images (Swiper) ── */}
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        autoplay={{ delay: 10_000, disableOnInteraction: false }}
        onSwiper={setSwiperInstance}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        loop
        className="h-full w-full"
      >
        {images.map((src, i) => (
          <SwiperSlide key={i}>
            <div className="relative h-full w-full">
              <Image
                src={src}
                alt={`${name} ${i + 1}`}
                fill
                sizes="100vw"
                priority={i === 0}
                className="object-cover scale-105 transition-transform duration-[8000ms] ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/50" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* ── text ── */}
      <div className="absolute inset-0 z-10 h-full flex flex-col items-center justify-end pb-24 text-center px-6 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="pointer-events-auto"
        >
          <p className="font-barlow text-sm tracking-[0.35em] text-white/60 uppercase mb-4">
            {siteConfig.shortConcept}
          </p>
          <h1 className="font-barlow text-4xl md:text-6xl lg:text-7xl font-bold tracking-wider text-white mb-4">
            {nameEn || name}
          </h1>
          <p className="text-base md:text-lg text-white/70 max-w-md mx-auto mb-10 leading-relaxed">
            {name}
          </p>
          <button
            onClick={scrollToGreeting}
            className="inline-block border border-white/40 hover:border-white hover:bg-white hover:text-neutral-900 text-white px-10 py-3.5 font-barlow text-sm font-semibold tracking-wider uppercase transition-all duration-300"
          >
            Scroll
          </button>
        </motion.div>

        {/* ── indicator dots ── */}
        {hasMultiple && (
          <div className="flex gap-2.5 mt-8 pointer-events-auto">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => swiperInstance?.slideTo(i + 1)}
                aria-label={`이미지 ${i + 1}로 이동`}
                className={`h-2 rounded-full transition-all duration-500 ${
                  i === activeIndex
                    ? 'w-6 bg-white'
                    : 'w-2 bg-white/40 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 cursor-pointer"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        onClick={scrollToGreeting}
      >
        <div className="w-px h-10 bg-gradient-to-b from-transparent to-white/40" />
      </motion.div>
    </section>
  );
}
