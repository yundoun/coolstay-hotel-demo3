'use client';

import Link from 'next/link';
import { useReservation } from '@/adapters/zustand/reservation-store';
import { siteConfig } from '@/hotel-data';
import { formatPrice } from '@/domain/shared/utils';
import { Container } from '@/components/ui/container';
import { CheckCircle, Copy, ArrowRight } from 'lucide-react';
import { useState } from 'react';

export function CompleteClient() {
  const {
    reservationNumber, apiRoom, checkIn, checkOut,
    adults, guestName, reset,
  } = useReservation();

  const [copied, setCopied] = useState(false);

  const totalPrice = apiRoom?.price ?? 0;
  const storeName = siteConfig.name;

  const handleCopy = () => {
    if (reservationNumber) {
      navigator.clipboard.writeText(reservationNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="pt-[72px] pb-20">
      <Container size="narrow" className="py-16">
        <div className="text-center space-y-6">
          <div className="w-20 h-20 mx-auto bg-neutral-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-neutral-900" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-neutral-900 mb-2">예약이 완료되었습니다</h1>
            <p className="text-neutral-500">현장결제로 예약이 접수되었습니다.</p>
          </div>
          <div className="inline-flex items-center gap-3 bg-neutral-50 px-6 py-3 rounded-lg">
            <span className="text-sm text-neutral-500">예약번호</span>
            <span className="font-barlow text-lg font-bold text-neutral-900 tracking-wider">{reservationNumber}</span>
            <button onClick={handleCopy} className="text-neutral-400 hover:text-neutral-600 transition-colors">
              <Copy className="w-4 h-4" />
            </button>
            {copied && <span className="text-xs text-neutral-600">복사됨</span>}
          </div>
        </div>

        <div className="mt-12 border border-neutral-200 rounded-lg p-6 space-y-4">
          <h3 className="font-semibold text-neutral-900 text-lg">예약 상세</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div><p className="text-neutral-400 mb-1">호텔</p><p className="font-medium text-neutral-800">{storeName}</p></div>
            <div><p className="text-neutral-400 mb-1">객실</p><p className="font-medium text-neutral-800">{apiRoom?.roomName}</p></div>
            <div><p className="text-neutral-400 mb-1">체크인</p><p className="font-medium text-neutral-800">{checkIn}</p></div>
            <div><p className="text-neutral-400 mb-1">체크아웃</p><p className="font-medium text-neutral-800">{checkOut}</p></div>
            <div><p className="text-neutral-400 mb-1">인원</p><p className="font-medium text-neutral-800">성인 {adults}명</p></div>
            <div><p className="text-neutral-400 mb-1">예약자</p><p className="font-medium text-neutral-800">{guestName}</p></div>
          </div>
          <div className="border-t border-neutral-200 pt-4 flex justify-between items-center">
            <span className="font-semibold text-neutral-900">총 결제 금액</span>
            <span className="text-xl font-bold text-neutral-900">₩{formatPrice(totalPrice)}</span>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/reservation/lookup"
            className="inline-flex items-center justify-center gap-2 h-12 px-8 border border-neutral-300 text-neutral-700 font-semibold hover:bg-neutral-50 transition-colors"
          >
            예약 조회
          </Link>
          <Link
            href="/"
            onClick={() => reset()}
            className="inline-flex items-center justify-center gap-2 h-12 px-8 bg-neutral-900 hover:bg-neutral-800 text-white font-semibold transition-colors"
          >
            홈으로 돌아가기
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </Container>
    </div>
  );
}
