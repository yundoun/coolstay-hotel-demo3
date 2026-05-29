'use client';

import { useStoreInfo } from '@/application/hooks/useStoreInfo';
import { Phone } from 'lucide-react';

export function SiteFooter() {
  const { data } = useStoreInfo();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const name = data?.name ?? '';
  const nameEn = data?.nameEn ?? '';
  const address = data?.address ?? '';
  const phone = data?.phone ?? '';
  const firstRoom = data?.rooms?.[0];

  return (
    <footer className="bg-neutral-900 text-neutral-400">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <p className="font-barlow text-lg font-bold tracking-wider text-white/80">
              {nameEn || name}
            </p>
            <p className="text-sm leading-relaxed text-neutral-500">
              {name}
              <br />
              {address}
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="font-barlow text-xs font-bold tracking-widest uppercase text-neutral-300">
              바로가기
            </h4>
            <div className="space-y-2.5">
              {[
                { id: 'greeting', label: '인사말' },
                { id: 'about', label: '호텔 소개' },
                { id: 'rooms', label: '객실 안내' },
                { id: 'reservation', label: '온라인 예약' },
                { id: 'location', label: '오시는 길' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className="block text-sm text-neutral-500 hover:text-white transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-barlow text-xs font-bold tracking-widest uppercase text-neutral-300">
              연락처
            </h4>
            <div className="space-y-2.5">
              {phone && (
                <div className="flex items-center gap-2 text-sm text-neutral-500">
                  <Phone className="w-4 h-4" />
                  {phone}
                </div>
              )}
              {firstRoom && (
                <p className="text-sm text-neutral-600">
                  체크인 {firstRoom.checkInTime || '-'} &middot; 체크아웃 {firstRoom.checkOutTime || '-'}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-neutral-800">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="text-xs text-neutral-600">이용약관 &middot; 개인정보처리방침</div>
            <p className="text-xs text-neutral-600">
              &copy; {new Date().getFullYear()} {name}. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
