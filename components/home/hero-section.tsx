'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { siteConfig } from '@/hotel-data';

const AUTOPLAY_INTERVAL = 10_000;

export function HeroSection() {
  const images = siteConfig.heroImages.slice(0, 5);
  const hasMultiple = images.length >= 2;
  const [current, setCurrent] = useState(0);

  const goTo = useCallback(
    (index: number) => setCurrent(index),
    [],
  );

  const scrollToGreeting = () => {
    const el = document.getElementById('greeting');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  /* ── autoplay (10 s) ── */
  useEffect(() => {
    if (!hasMultiple) return;

    const tick = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, AUTOPLAY_INTERVAL);

    const onVisibility = () => {
      if (document.hidden) clearInterval(tick);
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      clearInterval(tick);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [hasMultiple, images.length]);

  const name = siteConfig.name;
  const nameEn = siteConfig.nameEn;

  return (
    <section id="hero" className="relative h-screen min-h-[600px] max-h-[900px]">
      {/* ── images ── */}
      <AnimatePresence initial={false}>
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          <Image
            src={images[current]}
            alt={`${name} ${current + 1}`}
            fill
            className="object-cover"
            priority={current === 0}
            sizes="100vw"
          />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/50 z-[1]" />

      {/* ── text ── */}
      <div className="relative z-10 h-full flex flex-col items-center justify-end pb-24 text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <p className="font-barlow text-sm tracking-[0.35em] text-white/60 uppercase mb-4">
            {siteConfig.city}
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
          <div className="flex gap-2.5 mt-8">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`이미지 ${i + 1}로 이동`}
                className={`w-2 h-2 rounded-full transition-all duration-500 ${
                  i === current
                    ? 'bg-white scale-125'
                    : 'bg-white/40 hover:bg-white/70'
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
