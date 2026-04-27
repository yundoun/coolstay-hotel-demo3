'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '/hotels', label: 'FIND STAY', isActive: pathname.startsWith('/hotels') },
    { href: '/hotels/list?sort=discount', label: 'PROMOTION', isActive: false },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 bg-white transition-shadow duration-300',
        scrolled && 'shadow-[0_1px_3px_rgba(0,0,0,0.08)]'
      )}
    >
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
        <nav className="flex items-center justify-between h-16 lg:h-[72px]">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/coolstay_logo.png"
              alt="꿀스테이"
              width={120}
              height={36}
              className="h-7 lg:h-8 w-auto"
              priority
            />
          </Link>

          <div className="flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  'font-barlow text-sm font-bold tracking-wider uppercase transition-colors duration-200',
                  item.isActive
                    ? 'text-neutral-900 underline underline-offset-[6px] decoration-2 decoration-brand-500'
                    : 'text-neutral-600 hover:text-neutral-900'
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}
