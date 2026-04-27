'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageGalleryProps {
  hero: string;
  gallery: string[];
  name: string;
}

export function ImageGallery({ hero, gallery, name }: ImageGalleryProps) {
  const allImages = [hero, ...gallery];
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % allImages.length);
  const prev = () =>
    setCurrent((prev) => (prev - 1 + allImages.length) % allImages.length);

  return (
    <div className="relative w-full aspect-[16/6] md:aspect-[16/5] bg-neutral-100 overflow-hidden">
      {/* Current image */}
      <Image
        src={allImages[current]}
        alt={`${name} ${current + 1}`}
        fill
        className="object-cover transition-opacity duration-300"
        priority
        sizes="100vw"
      />

      {/* Left arrow */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/20 hover:bg-black/40 text-white flex items-center justify-center transition-colors"
        aria-label="이전 이미지"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* Right arrow */}
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/20 hover:bg-black/40 text-white flex items-center justify-center transition-colors"
        aria-label="다음 이미지"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Counter - bottom right like stayfolio */}
      <div className="absolute bottom-4 right-6 z-10 text-sm text-white/80 font-barlow">
        {current + 1} / {allImages.length}
        <span className="ml-2 text-white/60">|</span>
        <button
          onClick={() => {/* could open full gallery */}}
          className="ml-2 text-white/60 hover:text-white transition-colors"
        >
          더 보기
        </button>
      </div>
    </div>
  );
}
