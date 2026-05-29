'use client';

import { useState } from 'react';
import { useReservationContext } from '../reservation-context';

const inputClass =
  'w-full h-12 px-4 border border-neutral-200 rounded-lg text-sm bg-white focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900/10';

export function StepGuest() {
  const {
    guestName, guestPhone,
    setGuestName, setGuestPhone,
    phoneVerified, setPhoneVerified,
    goTo,
  } = useReservationContext();

  const [codeSent, setCodeSent] = useState(false);
  const [verifyCode, setVerifyCode] = useState('');
  const [timer, setTimer] = useState(0);
  const [sending, setSending] = useState(false);

  const phoneValid = /^01[0-9]-?[0-9]{3,4}-?[0-9]{4}$/.test(guestPhone.replace(/-/g, '') ? guestPhone : '');

  const handleSendCode = () => {
    if (!phoneValid) return;
    setSending(true);
    // UI only - 실제 발송 로직은 추후 연동
    setTimeout(() => {
      setCodeSent(true);
      setSending(false);
      setTimer(180);
      const interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }, 500);
  };

  const handleVerify = () => {
    if (verifyCode.length < 4) return;
    // UI only - 실제 검증 로직은 추후 연동
    setPhoneVerified(true);
  };

  const formatTimer = (s: number) =>
    `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

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
                setGuestPhone(e.target.value);
                if (phoneVerified) {
                  setPhoneVerified(false);
                  setCodeSent(false);
                  setVerifyCode('');
                }
              }}
              placeholder="010-1234-5678"
              disabled={phoneVerified}
              className={`flex-1 h-12 px-4 border border-neutral-200 rounded-lg text-sm bg-white focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900/10 ${phoneVerified ? 'bg-neutral-50 text-neutral-500' : ''}`}
            />
            {!phoneVerified ? (
              <button
                type="button"
                onClick={handleSendCode}
                disabled={!phoneValid || sending || (codeSent && timer > 0)}
                className="h-12 px-5 text-sm font-medium whitespace-nowrap border border-neutral-900 text-neutral-900 rounded-lg hover:bg-neutral-900 hover:text-white disabled:border-neutral-200 disabled:text-neutral-400 disabled:hover:bg-white transition-colors"
              >
                {sending ? '발송 중...' : codeSent ? '재발송' : '인증번호 발송'}
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
                {timer > 0 && (
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-red-500 font-medium">
                    {formatTimer(timer)}
                  </span>
                )}
              </div>
              <button
                type="button"
                onClick={handleVerify}
                disabled={verifyCode.length < 4 || timer === 0}
                className="h-12 px-5 text-sm font-medium whitespace-nowrap bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 disabled:bg-neutral-200 disabled:text-neutral-400 transition-colors"
              >
                확인
              </button>
            </div>
          )}

          {codeSent && timer === 0 && !phoneVerified && (
            <p className="text-xs text-red-500">인증 시간이 만료되었습니다. 다시 발송해주세요.</p>
          )}
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={() => goTo(2)}
            className="flex-1 h-14 border border-neutral-300 text-neutral-700 font-semibold hover:bg-white transition-colors text-sm"
          >
            이전
          </button>
          <button
            type="submit"
            disabled={!canProceed}
            className="flex-1 h-14 bg-neutral-900 hover:bg-neutral-800 disabled:bg-neutral-200 disabled:text-neutral-400 text-white font-semibold transition-colors text-sm tracking-wide"
          >
            다음 단계
          </button>
        </div>
      </form>
    </div>
  );
}
