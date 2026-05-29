'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '@/domain/shared/utils';
import { Menu, X } from 'lucide-react';
import { useStoreInfo } from '@/application/hooks/useStoreInfo';

const NAV_ITEMS = [
  { href: '#greeting', label: '인사말' },
  { href: '#about', label: '호텔 소개' },
  { href: '#rooms', label: '객실' },
  { href: '#reservation', label: '예약' },
  { href: '#location', label: '오시는 길' },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { data } = useStoreInfo();

  const nameEn = data?.nameEn || data?.name || '';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (pathname !== '/') {
      return;
    }
    e.preventDefault();
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileOpen(false);
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled
          ? 'bg-white/95 backdrop-blur-sm shadow-[0_1px_0_rgba(0,0,0,0.06)]'
          : 'bg-transparent'
      )}
    >
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
        <nav className="flex items-center justify-between h-16 lg:h-[72px]">
          <a
            href={pathname === '/' ? '#' : '/'}
            onClick={(e) => {
              if (pathname === '/') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="flex items-center gap-2"
          >
            <span
              className={cn(
                'font-barlow text-xl font-bold tracking-wider transition-colors duration-500',
                scrolled ? 'text-neutral-900' : 'text-white'
              )}
            >
              {nameEn}
            </span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={pathname === '/' ? item.href : `/${item.href}`}
                onClick={(e) => handleNavClick(e, item.href)}
                className={cn(
                  'font-barlow text-[13px] font-semibold tracking-wider uppercase transition-colors duration-300',
                  scrolled
                    ? 'text-neutral-500 hover:text-neutral-900'
                    : 'text-white/60 hover:text-white'
                )}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={cn(
              'md:hidden w-10 h-10 flex items-center justify-center transition-colors',
              scrolled ? 'text-neutral-900' : 'text-white'
            )}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </nav>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-neutral-100">
          <div className="px-6 py-4 space-y-1">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={pathname === '/' ? item.href : `/${item.href}`}
                onClick={(e) => handleNavClick(e, item.href)}
                className="block py-3 text-sm font-medium text-neutral-700 hover:text-neutral-900 border-b border-neutral-50 last:border-0"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
