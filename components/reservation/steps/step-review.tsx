'use client';

import { useState, useCallback } from 'react';
import { useReservationContext } from '../reservation-context';
import { useReservation as useReservationStore } from '@/adapters/zustand/reservation-store';
import { useSubmitReservation } from '@/application/hooks/useSubmitReservation';
import { useTerms, type Term, type RefundPolicy } from '@/application/hooks/useTerms';
import { siteConfig } from '@/hotel-data';
import { formatPrice } from '@/domain/shared/utils';
import { Banknote, ChevronDown, Loader2 } from 'lucide-react';

const REFUND_AGREED_KEY = 'REFUND';

export function StepReview() {
  const {
    checkIn, checkOut, nights, adults,
    selectedRoom, storeData, totalPrice,
    guestName, guestPhone, goTo,
  } = useReservationContext();

  const store = useReservationStore();
  const { submit, submitting, error } = useSubmitReservation();

  const { terms, refundPolicies, loading: termsLoading } = useTerms({
    storeKey: storeData?.motelKey ?? null,
    itemKey: selectedRoom?.itemKey ?? null,
    packKey: selectedRoom?.packageKey ?? null,
    checkIn,
    checkOut,
  });

  const [agreed, setAgreed] = useState<Record<string, boolean>>({});
  const [termModalUrl, setTermModalUrl] = useState<string | null>(null);
  const [termModalTitle, setTermModalTitle] = useState('');

  const hasRefund = refundPolicies.length > 0;

  const allKeys = [
    ...terms.map((t) => t.code),
    ...(hasRefund ? [REFUND_AGREED_KEY] : []),
  ];

  const allAgreed = allKeys.length > 0 && allKeys.every((k) => agreed[k]);

  const requiredKeys = [
    ...terms.filter((t) => t.required).map((t) => t.code),
    ...(hasRefund ? [REFUND_AGREED_KEY] : []),
  ];
  const requiredAgreed = requiredKeys.every((k) => agreed[k]);

  const toggleTerm = useCallback((code: string) => {
    setAgreed((prev) => ({ ...prev, [code]: !prev[code] }));
  }, []);

  const toggleAll = useCallback(() => {
    const next = !allAgreed;
    setAgreed(Object.fromEntries(allKeys.map((k) => [k, next])));
  }, [allAgreed, allKeys]);

  const storeName = siteConfig.name;

  const handleComplete = () => {
    if (!selectedRoom || !storeData || !requiredAgreed) return;

    store.setDates(checkIn, checkOut);
    store.setAdults(adults);
    store.setRoom(selectedRoom.itemKey);
    store.setGuestInfo({ name: guestName, phone: guestPhone, email: '' });
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
        <h3 className="text-xl font-bold text-neutral-900 mb-2">예약 확인</h3>
        <p className="text-sm text-neutral-500">예약 정보를 확인해주세요.</p>
      </div>

      <div className="bg-white rounded-lg p-6 space-y-4 border border-neutral-200">
        <h4 className="font-semibold text-neutral-900">예약 정보</h4>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <InfoItem label="호텔" value={storeName} />
          <InfoItem label="객실" value={selectedRoom?.name} />
          <InfoItem label="체크인" value={checkIn} />
          <InfoItem label="체크아웃" value={checkOut} />
          <InfoItem label="숙박" value={`${nights}박`} />
          <InfoItem label="인원" value={`성인 ${adults}명`} />
        </div>
        <div className="border-t border-neutral-100 pt-4">
          <h4 className="text-sm text-neutral-400 mb-2">투숙객</h4>
          <div className="text-sm space-y-1">
            <p className="font-medium text-neutral-800">{guestName}</p>
            <p className="text-neutral-500">{guestPhone}</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="font-semibold text-neutral-900">결제 수단</h4>
        <div className="flex items-center gap-3 p-4 border border-neutral-900 rounded-lg bg-white">
          <Banknote className="w-5 h-5 text-neutral-900" />
          <div>
            <p className="text-sm font-medium text-neutral-900">현장결제</p>
            <p className="text-xs text-neutral-500">체크인 시 프론트에서 결제합니다.</p>
          </div>
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

      {/* 약관 동의 */}
      <div className="bg-white rounded-lg p-6 border border-neutral-200">
        <h4 className="font-semibold text-neutral-900 mb-4">약관 동의</h4>

        {termsLoading ? (
          <div className="flex items-center gap-2 py-4">
            <Loader2 className="w-4 h-4 animate-spin text-neutral-400" />
            <span className="text-neutral-500 text-sm">약관을 불러오는 중...</span>
          </div>
        ) : (
          <div className="space-y-3">
            <label className="flex items-center gap-3 p-3 border border-neutral-200 rounded-lg cursor-pointer hover:bg-neutral-50 transition-colors">
              <input
                type="checkbox"
                checked={allAgreed}
                onChange={toggleAll}
                className="w-5 h-5 accent-neutral-900"
              />
              <span className="text-neutral-900 font-medium text-sm">전체 동의</span>
            </label>

            <div className="h-px bg-neutral-100" />

            {terms.map((t) => (
              <label key={t.code} className="flex items-center gap-3 px-3 py-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={!!agreed[t.code]}
                  onChange={() => toggleTerm(t.code)}
                  className="w-4 h-4 accent-neutral-900"
                />
                <span className="text-neutral-700 text-sm flex-1">
                  {t.name}
                  {t.required && <span className="text-red-500 ml-1 text-xs">(필수)</span>}
                </span>
                {t.url && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setTermModalTitle(t.name);
                      setTermModalUrl(t.url);
                    }}
                    className="text-neutral-400 text-xs underline hover:text-neutral-600 transition-colors"
                  >
                    보기
                  </button>
                )}
              </label>
            ))}

            {hasRefund && (
              <RefundPolicySection
                policies={refundPolicies}
                agreed={!!agreed[REFUND_AGREED_KEY]}
                onToggle={() => toggleTerm(REFUND_AGREED_KEY)}
              />
            )}
          </div>
        )}
      </div>

      {/* 약관 보기 모달 */}
      {termModalUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setTermModalUrl(null)}>
          <div className="bg-white rounded-lg w-full max-w-lg mx-4 max-h-[80vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-4 border-b border-neutral-200">
              <h5 className="font-semibold text-neutral-900 text-sm">{termModalTitle}</h5>
              <button onClick={() => setTermModalUrl(null)} className="text-neutral-400 hover:text-neutral-600 text-lg">&times;</button>
            </div>
            <iframe src={termModalUrl} className="flex-1 min-h-[60vh]" />
          </div>
        </div>
      )}

      {error && <p className="text-sm text-red-500 text-center">{error}</p>}

      {/* Sticky bottom nav */}
      <div className="sticky bottom-0 z-30 -mx-4 mt-10 pointer-events-none px-4 py-4 sm:-mx-0 sm:px-0">
        <div className="pointer-events-auto rounded-xl border border-neutral-200/60 bg-white/90 backdrop-blur-sm shadow-lg shadow-neutral-900/5 px-5 py-4 flex items-center justify-between gap-3">
          <button
            onClick={() => goTo(3)}
            className="h-12 px-6 border border-neutral-300 text-neutral-700 font-semibold hover:bg-white rounded-lg transition-colors text-sm"
          >
            ← 이전
          </button>
          <button
            onClick={handleComplete}
            disabled={submitting || !requiredAgreed}
            className="h-12 px-8 bg-neutral-900 hover:bg-neutral-800 disabled:bg-neutral-200 disabled:text-neutral-400 text-white font-bold rounded-lg text-sm tracking-wide transition-colors"
          >
            {submitting ? '처리 중...' : '예약하기'}
          </button>
        </div>
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

function RefundPolicySection({
  policies,
  agreed,
  onToggle,
}: {
  policies: RefundPolicy[];
  agreed: boolean;
  onToggle: () => void;
}) {
  const [open, setOpen] = useState(false);

  const freeCancel = policies.find((p) => p.percent === 100);
  const summary = freeCancel
    ? `${freeCancel.until.replace(/:\d{2}$/, '')}까지 무료 취소 가능`
    : '취소 시 수수료가 발생합니다';

  return (
    <div className="px-3 py-2">
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={agreed}
          onChange={onToggle}
          className="w-4 h-4 accent-neutral-900"
        />
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex-1 flex items-center justify-between gap-2 text-left"
        >
          <span className="text-neutral-700 text-sm">
            취소·환불 규정 동의
            <span className="text-red-500 ml-1 text-xs">(필수)</span>
          </span>
          <ChevronDown className={`w-4 h-4 text-neutral-400 transition-transform ${open ? 'rotate-180' : ''}`} />
        </button>
      </div>

      <p className="text-neutral-400 text-xs mt-1 ml-7">{summary}</p>

      {open && (
        <div className="mt-3 ml-7 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-neutral-200">
                <th className="pb-2 pr-4 font-medium text-neutral-500">취소 기한</th>
                <th className="pb-2 pr-4 font-medium text-neutral-500 text-right">환불률</th>
                <th className="pb-2 font-medium text-neutral-500 text-right">환불 금액</th>
              </tr>
            </thead>
            <tbody>
              {policies.map((p, i) => (
                <tr key={i} className="border-b border-neutral-100 last:border-b-0">
                  <td className="py-2 pr-4 text-neutral-600">{p.until.replace(/:\d{2}$/, '')} 까지</td>
                  <td className="py-2 pr-4 text-right text-neutral-700">{p.percent}%</td>
                  <td className="py-2 text-right text-neutral-700">{p.amount.toLocaleString()}원</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
