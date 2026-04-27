'use client';

import { useRouter } from 'next/navigation';
import { useReservationStore } from '@/lib/reservation-store';
import { formatPrice, getNights } from '@/lib/utils';
import { CreditCard, Building2, Smartphone } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export function Step4Payment() {
  const router = useRouter();
  const {
    hotelName,
    checkIn,
    checkOut,
    adults,
    children,
    selectedRoom,
    guestInfo,
    prevStep,
    complete,
  } = useReservationStore();

  const [paymentMethod, setPaymentMethod] = useState('card');
  const nights =
    checkIn && checkOut
      ? getNights(new Date(checkIn), new Date(checkOut))
      : 1;
  const totalPrice = (selectedRoom?.pricePerNight || 0) * nights;

  const handleComplete = () => {
    complete();
    router.push('/reservation/complete');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-neutral-900 mb-2">
          예약 확인 및 결제
        </h2>
        <p className="text-neutral-500">예약 정보를 확인하고 결제해주세요.</p>
      </div>

      {/* Booking Summary */}
      <div className="bg-neutral-50 rounded-lg p-6 space-y-4">
        <h3 className="font-semibold text-neutral-900">예약 정보</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-neutral-400 mb-1">호텔</p>
            <p className="font-medium text-neutral-800">{hotelName}</p>
          </div>
          <div>
            <p className="text-neutral-400 mb-1">객실</p>
            <p className="font-medium text-neutral-800">
              {selectedRoom?.name}
            </p>
          </div>
          <div>
            <p className="text-neutral-400 mb-1">체크인</p>
            <p className="font-medium text-neutral-800">{checkIn}</p>
          </div>
          <div>
            <p className="text-neutral-400 mb-1">체크아웃</p>
            <p className="font-medium text-neutral-800">{checkOut}</p>
          </div>
          <div>
            <p className="text-neutral-400 mb-1">숙박</p>
            <p className="font-medium text-neutral-800">{nights}박</p>
          </div>
          <div>
            <p className="text-neutral-400 mb-1">인원</p>
            <p className="font-medium text-neutral-800">
              성인 {adults}명{children > 0 ? `, 아동 ${children}명` : ''}
            </p>
          </div>
        </div>

        <div className="border-t border-neutral-200 pt-4">
          <h4 className="text-sm text-neutral-400 mb-2">투숙객</h4>
          <div className="text-sm space-y-1">
            <p className="font-medium text-neutral-800">{guestInfo?.name}</p>
            <p className="text-neutral-500">{guestInfo?.phone}</p>
            <p className="text-neutral-500">{guestInfo?.email}</p>
          </div>
        </div>
      </div>

      {/* Payment Method */}
      <div className="space-y-4">
        <h3 className="font-semibold text-neutral-900">결제 수단</h3>
        <div className="grid grid-cols-3 gap-3">
          {[
            { id: 'card', label: '신용카드', icon: CreditCard },
            { id: 'bank', label: '계좌이체', icon: Building2 },
            { id: 'mobile', label: '간편결제', icon: Smartphone },
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setPaymentMethod(id)}
              className={cn(
                'flex flex-col items-center gap-2 p-4 border rounded-lg transition-all text-sm',
                paymentMethod === id
                  ? 'border-brand-500 bg-brand-500/5 text-neutral-900'
                  : 'border-neutral-200 text-neutral-500 hover:border-neutral-300'
              )}
            >
              <Icon className="w-6 h-6" />
              <span className="font-medium">{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Price Breakdown */}
      <div className="border border-neutral-200 rounded-lg p-6 space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-neutral-500">
            ₩{formatPrice(selectedRoom?.pricePerNight || 0)} x {nights}박
          </span>
          <span className="text-neutral-800">₩{formatPrice(totalPrice)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-neutral-500">세금 및 수수료</span>
          <span className="text-neutral-800">
            ₩{formatPrice(Math.round(totalPrice * 0.1))}
          </span>
        </div>
        <div className="border-t border-neutral-200 pt-3 flex justify-between">
          <span className="font-semibold text-neutral-900">총 결제 금액</span>
          <span className="text-xl font-bold text-neutral-900">
            ₩{formatPrice(Math.round(totalPrice * 1.1))}
          </span>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={prevStep}
          className="flex-1 h-14 border border-neutral-300 text-neutral-700 font-semibold hover:bg-neutral-50 transition-colors"
        >
          이전
        </button>
        <button
          onClick={handleComplete}
          className="flex-1 h-14 bg-brand-500 hover:bg-brand-400 text-neutral-900 font-bold text-base transition-colors"
        >
          결제하기
        </button>
      </div>
    </div>
  );
}
