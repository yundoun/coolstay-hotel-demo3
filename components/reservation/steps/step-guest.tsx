'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useReservationContext } from '../reservation-context';

const guestSchema = z.object({
  name: z.string().min(2, '이름을 입력해주세요'),
  phone: z
    .string()
    .min(10, '올바른 연락처를 입력해주세요')
    .regex(/^[0-9-]+$/, '숫자와 하이픈만 입력 가능합니다'),
  email: z.string().email('올바른 이메일을 입력해주세요'),
  requests: z.string().optional(),
});

type GuestForm = z.infer<typeof guestSchema>;

const inputClass =
  'w-full h-12 px-4 border border-neutral-200 rounded-lg text-sm bg-white focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900/10';

export function StepGuest() {
  const { guestName, guestPhone, guestEmail, guestRequests, setGuestName, setGuestPhone, setGuestEmail, setGuestRequests, goTo } = useReservationContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<GuestForm>({
    resolver: zodResolver(guestSchema),
    defaultValues: {
      name: guestName || '',
      phone: guestPhone || '',
      email: guestEmail || '',
      requests: guestRequests || '',
    },
  });

  const onValid = (data: GuestForm) => {
    setGuestName(data.name);
    setGuestPhone(data.phone);
    setGuestEmail(data.email);
    setGuestRequests(data.requests || '');
    goTo(4);
  };

  return (
    <div className="max-w-lg mx-auto space-y-8">
      <div>
        <h3 className="text-xl font-bold text-neutral-900 mb-2">투숙객 정보</h3>
        <p className="text-sm text-neutral-500">예약자 정보를 입력해주세요.</p>
      </div>

      <form onSubmit={handleSubmit(onValid)} className="space-y-5">
        <div className="space-y-2">
          <label className="text-sm font-medium text-neutral-700">
            이름 <span className="text-red-500">*</span>
          </label>
          <input {...register('name')} placeholder="홍길동" className={inputClass} />
          {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-neutral-700">
            연락처 <span className="text-red-500">*</span>
          </label>
          <input {...register('phone')} placeholder="010-1234-5678" className={inputClass} />
          {errors.phone && <p className="text-xs text-red-500">{errors.phone.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-neutral-700">
            이메일 <span className="text-red-500">*</span>
          </label>
          <input {...register('email')} type="email" placeholder="hong@example.com" className={inputClass} />
          {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-neutral-700">요청사항</label>
          <textarea
            {...register('requests')}
            rows={3}
            placeholder="요청사항이 있으시면 입력해주세요"
            className="w-full px-4 py-3 border border-neutral-200 rounded-lg text-sm bg-white focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900/10 resize-none"
          />
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
            className="flex-1 h-14 bg-neutral-900 hover:bg-neutral-800 text-white font-semibold transition-colors text-sm tracking-wide"
          >
            다음 단계
          </button>
        </div>
      </form>
    </div>
  );
}
