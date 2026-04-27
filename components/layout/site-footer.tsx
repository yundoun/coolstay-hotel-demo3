import Link from 'next/link';
import Image from 'next/image';

export function SiteFooter() {
  return (
    <footer className="bg-neutral-900 text-neutral-400">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Image
              src="/coolstay_logo.png"
              alt="꿀스테이"
              width={100}
              height={30}
              className="h-6 w-auto brightness-0 invert opacity-80"
            />
            <p className="text-sm leading-relaxed text-neutral-500">
              대한민국 프리미엄 호텔 큐레이션 플랫폼.
              <br />
              엄선된 호텔에서 특별한 스테이를 경험하세요.
            </p>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h4 className="font-barlow text-xs font-bold tracking-widest uppercase text-neutral-300">
              EXPLORE
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/hotels"
                  className="text-sm text-neutral-500 hover:text-white transition-colors"
                >
                  호텔 찾기
                </Link>
              </li>
              <li>
                <Link
                  href="/hotels/list"
                  className="text-sm text-neutral-500 hover:text-white transition-colors"
                >
                  전체 호텔
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-barlow text-xs font-bold tracking-widest uppercase text-neutral-300">
              CONTACT
            </h4>
            <ul className="space-y-2.5 text-sm text-neutral-500">
              <li>고객센터 1670-0000</li>
              <li>평일 10:00 ~ 19:00</li>
              <li>help@coolstay.co.kr</li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-neutral-800">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="text-xs text-neutral-600 space-y-1">
              <p>(주)꿀스테이 | 대표이사 홍길동 | 사업자등록번호 000-00-00000</p>
              <p>서울특별시 강남구 테헤란로 123, 10층</p>
            </div>
            <p className="text-xs text-neutral-600">
              &copy; {new Date().getFullYear()} Coolstay. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
