'use client';

import { useState, useEffect } from 'react';
import { useReservation } from '@/adapters/zustand/reservation-store';
import { useShallow } from 'zustand/react/shallow';
import { usePhoneVerification } from '@/application/hooks/usePhoneVerification';
import { formatPhoneNumber } from '@/domain/shared/utils';

const inputClass =
  'w-full h-12 px-4 border border-neutral-200 rounded-lg text-sm bg-white focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900/10';

export function StepGuest() {
  const {
    guestName, guestPhone,
    setGuestName, setGuestPhone,
    phoneVerified, setPhoneVerified,
    setSmsAuth, goTo,
  } = useReservation(
    useShallow((s) => ({
      guestName: s.guestName,
      guestPhone: s.guestPhone,
      setGuestName: s.setGuestName,
      setGuestPhone: s.setGuestPhone,
      phoneVerified: s.phoneVerified,
      setPhoneVerified: s.setPhoneVerified,
      setSmsAuth: s.setSmsAuth,
      goTo: s.goTo,
    }))
  );

  const {
    status, remaining, formatRemaining,
    error: smsError, send, verify, resetVerification, authKey,
  } = usePhoneVerification();

  const [verifyCode, setVerifyCode] = useState('');

  const phoneValid = /^01[0-9]-?[0-9]{3,4}-?[0-9]{4}$/.test(guestPhone.replace(/-/g, '') ? guestPhone : '');
  const codeSent = status === 'sent' || status === 'verifying';
  const isSending = status === 'sending';
  const isVerifying = status === 'verifying';
  const isExpired = status === 'expired';
  const phoneLocked = codeSent || isSending || isVerifying;

  const handleSendCode = () => {
    if (!phoneValid) return;
    if (isExpired) resetVerification();
    setVerifyCode('');
    send(guestPhone);
  };

  const handleVerify = async () => {
    if (verifyCode.length < 6) return;
    await verify(verifyCode, guestPhone);
  };

  useEffect(() => {
    if (status === 'verified' && !phoneVerified) {
      setPhoneVerified(true);
      setSmsAuth(authKey ?? '', verifyCode);
    }
  }, [status, phoneVerified, setPhoneVerified, setSmsAuth, authKey, verifyCode]);

  const canProceed = guestName.trim().length >= 2 && phoneVerified;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (canProceed) goTo(4);
  };

  return (
    <div className="max-w-lg mx-auto space-y-8">
      <div>
        <h3 className="text-xl font-bold text-neutral-900 mb-2">투숙객 정보</h3>
        <p className="text-sm text-neutral-500">예약자 정보를 입력해주세요.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <label className="text-sm font-medium text-neutral-700">
            이름 <span className="text-red-500">*</span>
          </label>
          <input
            value={guestName}
            onChange={(e) => setGuestName(e.target.value)}
            placeholder="홍길동"
            className={inputClass}
          />
          {guestName.length > 0 && guestName.trim().length < 2 && (
            <p className="text-xs text-red-500">이름을 2자 이상 입력해주세요.</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-neutral-700">
            연락처 <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-2">
            <input
              value={guestPhone}
              onChange={(e) => {
                setGuestPhone(formatPhoneNumber(e.target.value));
                if (phoneVerified) {
                  setPhoneVerified(false);
                  resetVerification();
                  setVerifyCode('');
                  setSmsAuth('', '');
                }
              }}
              placeholder="010-1234-5678"
              disabled={phoneLocked || phoneVerified}
              className={`flex-1 h-12 px-4 border border-neutral-200 rounded-lg text-sm bg-white focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900/10 ${phoneLocked || phoneVerified ? 'bg-neutral-50 text-neutral-500' : ''}`}
            />
            {!phoneVerified ? (
              <button
                type="button"
                onClick={handleSendCode}
                disabled={!phoneValid || isSending || (codeSent && remaining > 0)}
                className="h-12 px-5 text-sm font-medium whitespace-nowrap border border-neutral-900 text-neutral-900 rounded-lg hover:bg-neutral-900 hover:text-white disabled:border-neutral-200 disabled:text-neutral-400 disabled:hover:bg-white transition-colors"
              >
                {isSending ? '발송 중...' : codeSent ? '재발송' : '인증번호 발송'}
              </button>
            ) : (
              <div className="h-12 px-4 flex items-center text-sm font-medium text-green-600 border border-green-200 rounded-lg bg-green-50">
                인증완료
              </div>
            )}
          </div>

          {codeSent && !phoneVerified && (
            <div className="flex gap-2 mt-2">
              <div className="relative flex-1">
                <input
                  value={verifyCode}
                  onChange={(e) => setVerifyCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="인증번호 6자리"
                  maxLength={6}
                  className={inputClass}
                />
                {remaining > 0 && (
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-red-500 font-medium">
                    {formatRemaining}
                  </span>
                )}
              </div>
              <button
                type="button"
                onClick={handleVerify}
                disabled={verifyCode.length < 6 || isExpired || isVerifying}
                className="h-12 px-5 text-sm font-medium whitespace-nowrap bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 disabled:bg-neutral-200 disabled:text-neutral-400 transition-colors"
              >
                {isVerifying ? '확인 중...' : '확인'}
              </button>
            </div>
          )}

          {smsError && (
            <p className="text-xs text-red-500">{smsError}</p>
          )}
        </div>

      </form>

      {/* Sticky bottom nav */}
      <div className="sticky bottom-0 z-30 -mx-4 mt-10 pointer-events-none px-4 py-4 sm:-mx-0 sm:px-0">
        <div className="pointer-events-auto rounded-xl border border-neutral-200/60 bg-white/90 backdrop-blur-sm shadow-lg shadow-neutral-900/5 px-5 py-4 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => goTo(2)}
            className="h-12 px-6 border border-neutral-300 text-neutral-700 font-semibold hover:bg-white rounded-lg transition-colors text-sm"
          >
            ← 이전
          </button>
          <button
            type="button"
            onClick={() => { if (canProceed) goTo(4); }}
            disabled={!canProceed}
            className="h-12 px-8 bg-neutral-900 hover:bg-neutral-800 disabled:bg-neutral-200 disabled:text-neutral-400 text-white font-semibold rounded-lg transition-colors text-sm tracking-wide"
          >
            다음 단계 →
          </button>
        </div>
      </div>
    </div>
  );
}
