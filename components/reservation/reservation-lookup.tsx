'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useReservationLookup } from '@/application/hooks/useReservationLookup';
import { Container } from '@/components/ui/container';
import { formatPrice, cn } from '@/domain/shared/utils';
import type { BookingItem, BookingStatus } from '@/domain/reservation/types';
import { Search, ArrowLeft, X, Loader2, CalendarDays, User, Phone, CreditCard } from 'lucide-react';
import { formatPhoneNumber } from '@/domain/shared/utils';

const STATUS_MAP: Record<BookingStatus, { label: string; color: string }> = {
  BEFORE: { label: '예약확정', color: 'bg-neutral-900 text-white' },
  AFTER: { label: '이용완료', color: 'bg-neutral-200 text-neutral-600' },
  CANCEL: { label: '취소됨', color: 'bg-red-50 text-red-600' },
};

const inputClass =
  'w-full h-12 px-4 border border-neutral-200 rounded-lg text-sm bg-white focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900/10 transition-colors';

export function ReservationLookup() {
  const { state, cancelState, lookup, cancel, reset } = useReservationLookup();

  const [bookId, setBookId] = useState('');
  const [phone, setPhone] = useState('');
  const [cancelTarget, setCancelTarget] = useState<string | null>(null);

  const canSearch = bookId.trim().length > 0 && phone.replace(/[^0-9]/g, '').length >= 10;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSearch) return;
    lookup(bookId.trim(), phone.replace(/[^0-9]/g, ''));
  };

  const handleCancel = async (id: string) => {
    const success = await cancel(id);
    if (success) setCancelTarget(null);
  };

  const handleReset = () => {
    reset();
    setBookId('');
    setPhone('');
  };

  return (
    <div className="pt-[72px] pb-20 min-h-screen bg-neutral-50">
      <Container size="narrow" className="py-12 md:py-16">
        {/* Header */}
        <div className="mb-10">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-neutral-400 hover:text-neutral-700 transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            홈으로
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold text-neutral-900 tracking-tight">
            예약 조회
          </h1>
          <p className="text-neutral-500 text-sm mt-2">
            예약번호와 연락처를 입력하면 예약 내역을 확인할 수 있습니다.
          </p>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-neutral-200 p-6 md:p-8 mb-8">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-700">예약번호</label>
              <input
                value={bookId}
                onChange={(e) => setBookId(e.target.value)}
                placeholder="예약번호를 입력해주세요"
                className={inputClass}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-700">연락처</label>
              <input
                value={phone}
                onChange={(e) => setPhone(formatPhoneNumber(e.target.value))}
                placeholder="010-1234-5678"
                className={inputClass}
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={!canSearch || state.phase === 'loading'}
            className="w-full mt-6 h-12 bg-neutral-900 hover:bg-neutral-800 disabled:bg-neutral-200 disabled:text-neutral-400 text-white font-semibold text-sm rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            {state.phase === 'loading' ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                조회 중...
              </>
            ) : (
              <>
                <Search className="w-4 h-4" />
                예약 조회
              </>
            )}
          </button>
        </form>

        {/* Error */}
        {state.phase === 'error' && (
          <div className="bg-red-50 border border-red-100 rounded-xl p-6 text-center mb-8">
            <p className="text-red-600 text-sm font-medium">{state.message}</p>
            <button
              onClick={handleReset}
              className="mt-3 text-xs text-red-400 hover:text-red-600 underline transition-colors"
            >
              다시 검색
            </button>
          </div>
        )}

        {/* Results */}
        {state.phase === 'success' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-neutral-500">
                조회 결과 <span className="font-semibold text-neutral-900">{state.books.length}</span>건
              </p>
              <button
                onClick={handleReset}
                className="text-xs text-neutral-400 hover:text-neutral-600 underline transition-colors"
              >
                새로 검색
              </button>
            </div>

            {state.books.length === 0 ? (
              <div className="bg-white border border-neutral-200 rounded-xl p-12 text-center">
                <div className="w-14 h-14 mx-auto mb-4 bg-neutral-100 rounded-full flex items-center justify-center">
                  <Search className="w-6 h-6 text-neutral-400" />
                </div>
                <p className="text-neutral-500 text-sm">일치하는 예약 내역이 없습니다.</p>
                <p className="text-neutral-400 text-xs mt-1">예약번호와 연락처를 다시 확인해주세요.</p>
              </div>
            ) : (
              state.books.map((book) => (
                <BookingCard
                  key={book.bookId}
                  book={book}
                  cancelling={cancelState.phase === 'loading' && cancelState.bookId === book.bookId}
                  cancelError={cancelState.phase === 'error' && cancelState.bookId === book.bookId ? cancelState.message : null}
                  showCancelConfirm={cancelTarget === book.bookId}
                  onCancelRequest={() => setCancelTarget(book.bookId)}
                  onCancelConfirm={() => handleCancel(book.bookId)}
                  onCancelDismiss={() => setCancelTarget(null)}
                />
              ))
            )}
          </div>
        )}
      </Container>

      {/* Cancel confirm overlay */}
      {cancelTarget && (
        <div
          className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4"
          onClick={() => setCancelTarget(null)}
        >
          <div
            className="bg-white rounded-xl max-w-sm w-full p-6 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-3 bg-red-50 rounded-full flex items-center justify-center">
                <X className="w-5 h-5 text-red-500" />
              </div>
              <h3 className="font-semibold text-neutral-900">예약을 취소하시겠습니까?</h3>
              <p className="text-sm text-neutral-500 mt-1">취소 후에는 복구할 수 없습니다.</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setCancelTarget(null)}
                className="flex-1 h-11 border border-neutral-300 text-neutral-700 font-medium text-sm rounded-lg hover:bg-neutral-50 transition-colors"
              >
                돌아가기
              </button>
              <button
                onClick={() => handleCancel(cancelTarget)}
                disabled={cancelState.phase === 'loading'}
                className="flex-1 h-11 bg-red-600 hover:bg-red-700 disabled:bg-red-300 text-white font-medium text-sm rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                {cancelState.phase === 'loading' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    취소 중...
                  </>
                ) : (
                  '예약 취소'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function BookingCard({
  book,
  cancelling,
  cancelError,
  showCancelConfirm,
  onCancelRequest,
  onCancelConfirm,
  onCancelDismiss,
}: {
  book: BookingItem;
  cancelling: boolean;
  cancelError: string | null;
  showCancelConfirm: boolean;
  onCancelRequest: () => void;
  onCancelConfirm: () => void;
  onCancelDismiss: () => void;
}) {
  const statusInfo = STATUS_MAP[book.status] ?? STATUS_MAP.BEFORE;
  const canCancel = book.status === 'BEFORE';
  const isCancelled = book.status === 'CANCEL';

  return (
    <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100">
        <div className="flex items-center gap-3">
          <span className={cn('text-xs font-semibold px-2.5 py-1 rounded-full', statusInfo.color)}>
            {statusInfo.label}
          </span>
          <span className="font-barlow text-sm font-semibold text-neutral-900 tracking-wide">
            {book.bookId}
          </span>
        </div>
        <span className="text-xs text-neutral-400">{book.regDate}</span>
      </div>

      {/* Body */}
      <div className="px-6 py-5 space-y-4">
        <div>
          <p className="font-semibold text-neutral-900">{book.storeName}</p>
          <p className="text-sm text-neutral-500 mt-0.5">{book.roomName}</p>
        </div>

        {/* 체크인/체크아웃 */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-neutral-50 rounded-lg px-4 py-3">
            <p className="text-xs text-neutral-400 mb-1">체크인</p>
            <p className="text-sm font-medium text-neutral-900">{book.checkIn}</p>
            {book.checkInTime && <p className="text-xs text-neutral-400 mt-0.5">{book.checkInTime} 이후</p>}
          </div>
          <div className="bg-neutral-50 rounded-lg px-4 py-3">
            <p className="text-xs text-neutral-400 mb-1">체크아웃</p>
            <p className="text-sm font-medium text-neutral-900">{book.checkOut}</p>
            {book.checkOutTime && <p className="text-xs text-neutral-400 mt-0.5">{book.checkOutTime} 까지</p>}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2 text-neutral-600">
            <User className="w-4 h-4 text-neutral-400 shrink-0" />
            <span>{book.guestName}</span>
          </div>
          <div className="flex items-center gap-2 text-neutral-600">
            <Phone className="w-4 h-4 text-neutral-400 shrink-0" />
            <span>{book.guestPhone}</span>
          </div>
          <div className="flex items-center gap-2 text-neutral-600">
            <CreditCard className="w-4 h-4 text-neutral-400 shrink-0" />
            <span>{book.payment.method === 'SITE' ? '현장결제' : book.payment.method}</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      {isCancelled ? (
        <div className="px-6 py-4 bg-red-50/60 border-t border-red-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-red-400">결제 취소</p>
              <p className="text-lg font-bold text-red-600 line-through">₩{formatPrice(book.totalPrice)}</p>
            </div>
            <span className="text-sm font-semibold text-red-500 bg-red-100 px-3 py-1.5 rounded-lg">
              결제 취소 완료
            </span>
          </div>
        </div>
      ) : (
        <div className="px-6 py-4 bg-neutral-50 flex items-center justify-between">
          <div>
            <p className="text-xs text-neutral-400">결제 금액</p>
            <p className="text-lg font-bold text-neutral-900">₩{formatPrice(book.totalPrice)}</p>
          </div>
          {canCancel && (
            <button
              onClick={onCancelRequest}
              className="h-9 px-5 text-sm font-medium border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
            >
              예약 취소
            </button>
          )}
        </div>
      )}

      {cancelError && (
        <div className="px-6 py-3 bg-red-50 border-t border-red-100">
          <p className="text-xs text-red-600">{cancelError}</p>
        </div>
      )}
    </div>
  );
}
