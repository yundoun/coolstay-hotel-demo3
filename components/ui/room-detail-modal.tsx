'use client';

import { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Maximize2, BedDouble, Users, Clock } from 'lucide-react';
import { formatPrice } from '@/domain/shared/utils';

function formatTime(time: string): string {
  const cleaned = time.replace(/[^0-9]/g, '');
  if (cleaned.length >= 4) {
    return `${cleaned.slice(0, 2)}:${cleaned.slice(2, 4)}`;
  }
  if (cleaned.length >= 2) {
    return `${cleaned.slice(0, 2)}:00`;
  }
  return time;
}

export interface RoomDetailData {
  name: string;
  nameEn?: string;
  description?: string;
  maxGuests: number;
  size: number;
  bedType: string;
  images: { url: string; thumbUrl: string }[];
  features: string[];
  amenities: string[];
  checkInTime?: string;
  checkOutTime?: string;
  price?: number;
  priceLabel?: string;
}

interface RoomDetailModalProps {
  room: RoomDetailData | null;
  onClose: () => void;
  onBook?: () => void;
}

export function RoomDetailModal({ room, onClose, onBook }: RoomDetailModalProps) {
  useEffect(() => {
    if (room) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [room]);

  return (
    <AnimatePresence>
      {room && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* backdrop */}
          <div className="absolute inset-0 bg-black/60" onClick={onClose} />

          {/* modal panel */}
          <motion.div
            className="relative z-10 w-full sm:max-w-[680px] max-h-[90vh] bg-white sm:rounded-xl overflow-hidden flex flex-col"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
          >
            {/* key forces remount & state reset when room changes */}
            <RoomDetailContent key={room.name} room={room} onClose={onClose} onBook={onBook} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function RoomDetailContent({
  room,
  onClose,
  onBook,
}: {
  room: RoomDetailData;
  onClose: () => void;
  onBook?: () => void;
}) {
  const [currentImage, setCurrentImage] = useState(0);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') setCurrentImage((p) => (p > 0 ? p - 1 : p));
      if (e.key === 'ArrowRight')
        setCurrentImage((p) => (p < room.images.length - 1 ? p + 1 : p));
    },
    [room.images.length, onClose]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <>
      {/* close button */}
      <button
        onClick={onClose}
        className="absolute top-3 right-3 z-20 w-9 h-9 flex items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors"
        aria-label="닫기"
      >
        <X className="w-4 h-4" />
      </button>

      {/* scrollable content */}
      <div className="overflow-y-auto flex-1 overscroll-contain">
        {/* image gallery */}
        {room.images.length > 0 && (
          <div className="relative">
            <div className="relative aspect-[16/10] bg-neutral-100">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImage}
                  className="absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Image
                    src={room.images[currentImage].url}
                    alt={`${room.name} ${currentImage + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 680px"
                    priority
                  />
                </motion.div>
              </AnimatePresence>

              {/* nav arrows */}
              {room.images.length > 1 && (
                <>
                  <button
                    onClick={() => setCurrentImage((p) => Math.max(0, p - 1))}
                    disabled={currentImage === 0}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full bg-black/30 text-white disabled:opacity-30 hover:bg-black/50 transition-all"
                    aria-label="이전 이미지"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() =>
                      setCurrentImage((p) => Math.min(room.images.length - 1, p + 1))
                    }
                    disabled={currentImage === room.images.length - 1}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full bg-black/30 text-white disabled:opacity-30 hover:bg-black/50 transition-all"
                    aria-label="다음 이미지"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  {/* dot indicators */}
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                    {room.images.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentImage(idx)}
                        className={`w-1.5 h-1.5 rounded-full transition-all ${
                          idx === currentImage
                            ? 'bg-white w-4'
                            : 'bg-white/50 hover:bg-white/70'
                        }`}
                        aria-label={`이미지 ${idx + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* thumbnail strip */}
            {room.images.length > 1 && (
              <div className="flex gap-1 p-2 bg-neutral-50 overflow-x-auto">
                {room.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImage(idx)}
                    className={`relative w-16 h-11 rounded overflow-hidden shrink-0 transition-all ${
                      idx === currentImage
                        ? 'ring-2 ring-neutral-900 ring-offset-1'
                        : 'opacity-60 hover:opacity-100'
                    }`}
                  >
                    <Image
                      src={img.thumbUrl || img.url}
                      alt={`${room.name} 썸네일 ${idx + 1}`}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* room info */}
        <div className="px-6 py-6 space-y-5">
          {/* header */}
          <div>
            <h3 className="text-xl font-bold text-neutral-900">{room.name}</h3>
            {room.nameEn && (
              <p className="font-barlow text-xs tracking-wider text-neutral-400 uppercase mt-0.5">
                {room.nameEn}
              </p>
            )}
          </div>

          {/* specs */}
          <div className="flex flex-wrap gap-4 text-sm text-neutral-600">
            {room.size > 0 && (
              <span className="flex items-center gap-1.5">
                <Maximize2 className="w-4 h-4 text-neutral-400" />
                {room.size}m²
              </span>
            )}
            {room.bedType && (
              <span className="flex items-center gap-1.5">
                <BedDouble className="w-4 h-4 text-neutral-400" />
                {room.bedType}
              </span>
            )}
            <span className="flex items-center gap-1.5">
              <Users className="w-4 h-4 text-neutral-400" />
              최대 {room.maxGuests}인
            </span>
          </div>

          {/* check-in / check-out */}
          {(room.checkInTime || room.checkOutTime) && (
            <div className="flex gap-4 text-sm text-neutral-600">
              {room.checkInTime && (
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-neutral-400" />
                  체크인 {formatTime(room.checkInTime)}
                </span>
              )}
              {room.checkOutTime && (
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-neutral-400" />
                  체크아웃 {formatTime(room.checkOutTime)}
                </span>
              )}
            </div>
          )}

          {/* description */}
          {room.description && (
            <p className="text-sm text-neutral-500 leading-relaxed">
              {room.description}
            </p>
          )}

          {/* features */}
          {room.features.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-neutral-700 uppercase tracking-wide mb-2">
                객실 특징
              </p>
              <div className="flex flex-wrap gap-1.5">
                {room.features.map((f) => (
                  <span
                    key={f}
                    className="text-xs text-neutral-600 bg-neutral-100 px-2.5 py-1 rounded"
                  >
                    {f}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* amenities */}
          {room.amenities.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-neutral-700 uppercase tracking-wide mb-2">
                어메니티
              </p>
              <div className="flex flex-wrap gap-1.5">
                {room.amenities.map((a) => (
                  <span
                    key={a}
                    className="text-xs text-neutral-600 bg-neutral-100 px-2.5 py-1 rounded"
                  >
                    {a}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* sticky footer with price & action */}
      {room.price != null && (
        <div className="border-t border-neutral-200 px-6 py-4 flex items-center justify-between bg-white shrink-0">
          <div>
            <span className="text-xl font-bold text-neutral-900">
              ₩{formatPrice(room.price)}
            </span>
            <span className="text-xs text-neutral-400 ml-1">
              {room.priceLabel || '/박'}
            </span>
          </div>
          {onBook && (
            <button
              onClick={onBook}
              className="h-11 px-8 bg-neutral-900 hover:bg-neutral-800 text-white text-sm font-semibold tracking-wide transition-colors"
            >
              예약하기
            </button>
          )}
        </div>
      )}
    </>
  );
}
