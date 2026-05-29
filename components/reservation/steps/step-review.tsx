'use client';

import { useReservationContext } from '../reservation-context';
import { useReservation as useReservationStore } from '@/adapters/zustand/reservation-store';
import { useSubmitReservation } from '@/application/hooks/useSubmitReservation';
import { useStoreInfo } from '@/application/hooks/useStoreInfo';
import { formatPrice, cn } from '@/domain/shared/utils';
import { CreditCard, Building2, Smartphone } from 'lucide-react';

const PAYMENT_METHODS = [
  { id: 'card', label: '신용카드', icon: CreditCard },
  { id: 'bank', label: '계좌이체', icon: Building2 },
  { id: 'mobile', label: '간편결제', icon: Smartphone },
] as const;

export function StepReview() {
  const {
    checkIn, checkOut, nights, adults, childrenCount,
    selectedRoom, storeData, totalPrice,
    guestName, guestPhone, guestEmail,
    paymentMethod, setPaymentMethod, goTo,
  } = useReservationContext();

  const store = useReservationStore();
  const { data: storeInfo } = useStoreInfo();
  const { submit, submitting, error } = useSubmitReservation();

  const storeName = storeInfo?.name ?? storeData?.storeName ?? '';

  const handleComplete = () => {
    if (!selectedRoom || !storeData) return;

    // Zustand 스토어에 데이터 동기화
    store.setDates(checkIn, checkOut);
    store.setAdults(adults);
    store.setRoom(selectedRoom.itemKey);
    store.setGuestInfo({ name: guestName, phone: guestPhone, email: guestEmail });
    store.setApiRoom({
      motelKey: storeData.motelKey,
      storeName: storeData.storeName,
      sitePayment: storeData.sitePayment,
      packageKey: selectedRoom.packageKey,
      roomName: selectedRoom.name,
      roomImage: selectedRoom.image,
      maxGuests: selectedRoom.maxGuests,
      price: selectedRoom.price,
      dailyPrices: selectedRoom.dailyPrices,
      checkInTime: selectedRoom.checkInTime,
      checkOutTime: selectedRoom.checkOutTime,
    });

    submit();
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-bold text-neutral-900 mb-2">예약 확인 및 결제</h3>
        <p className="text-sm text-neutral-500">예약 정보를 확인하고 결제해주세요.</p>
      </div>

      <div className="bg-white rounded-lg p-6 space-y-4 border border-neutral-200">
        <h4 className="font-semibold text-neutral-900">예약 정보</h4>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <InfoItem label="호텔" value={storeName} />
          <InfoItem label="객실" value={selectedRoom?.name} />
          <InfoItem label="체크인" value={checkIn} />
          <InfoItem label="체크아웃" value={checkOut} />
          <InfoItem label="숙박" value={`${nights}박`} />
          <InfoItem
            label="인원"
            value={`성인 ${adults}명${childrenCount > 0 ? `, 아동 ${childrenCount}명` : ''}`}
          />
        </div>
        <div className="border-t border-neutral-100 pt-4">
          <h4 className="text-sm text-neutral-400 mb-2">투숙객</h4>
          <div className="text-sm space-y-1">
            <p className="font-medium text-neutral-800">{guestName}</p>
            <p className="text-neutral-500">{guestPhone}</p>
            <p className="text-neutral-500">{guestEmail}</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="font-semibold text-neutral-900">결제 수단</h4>
        <div className="grid grid-cols-3 gap-3">
          {PAYMENT_METHODS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setPaymentMethod(id)}
              className={cn(
                'flex flex-col items-center gap-2 p-4 border rounded-lg transition-all text-sm bg-white',
                paymentMethod === id
                  ? 'border-neutral-900 text-neutral-900'
                  : 'border-neutral-200 text-neutral-500 hover:border-neutral-300'
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium text-xs">{label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="border border-neutral-200 rounded-lg p-6 space-y-3 bg-white">
        <div className="flex justify-between text-sm">
          <span className="text-neutral-500">₩{formatPrice(selectedRoom?.price || 0)} x {nights}박</span>
          <span className="text-neutral-800">₩{formatPrice(totalPrice)}</span>
        </div>
        <div className="border-t border-neutral-200 pt-3 flex justify-between">
          <span className="font-semibold text-neutral-900">총 결제 금액</span>
          <span className="text-xl font-bold text-neutral-900">₩{formatPrice(totalPrice)}</span>
        </div>
      </div>

      {error && <p className="text-sm text-red-500 text-center">{error}</p>}

      <div className="flex gap-3">
        <button onClick={() => goTo(3)} className="flex-1 h-14 border border-neutral-300 text-neutral-700 font-semibold hover:bg-white transition-colors text-sm">
          이전
        </button>
        <button
          onClick={handleComplete}
          disabled={submitting}
          className="flex-1 h-14 bg-neutral-900 hover:bg-neutral-800 disabled:bg-neutral-400 text-white font-bold text-sm tracking-wide transition-colors"
        >
          {submitting ? '처리 중...' : '결제하기'}
        </button>
      </div>
    </div>
  );
}

function InfoItem({ label, value }: { label: string; value?: string | null }) {
  return (
    <div>
      <p className="text-neutral-400 mb-1">{label}</p>
      <p className="font-medium text-neutral-800">{value || '-'}</p>
    </div>
  );
}
