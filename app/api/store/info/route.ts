import { NextResponse } from 'next/server';
import type { StoreInfo } from '@/adapters/coolstay/types';

const STORE_INFO: StoreInfo = {
  motelKey: 'stay-onda',
  name: '스테이 온다',
  nameEn: 'STAY ONDA',
  phone: '064-799-0000',
  email: 'hello@stayonda.kr',
  address: '제주특별자치도 제주시 애월읍 애월해안로 768',
  latitude: '33.46',
  longitude: '126.3',
  parkingInfo: '전 객실 주차 가능 (무료)',
  sitePayment: true,
  images: [
    { url: '/hotels/set-01/hero.jpg', thumbUrl: '/hotels/set-01/hero.jpg', description: '외관 전경' },
    { url: '/hotels/set-01/gallery-1.jpg', thumbUrl: '/hotels/set-01/gallery-1.jpg', description: '로비' },
    { url: '/hotels/set-01/gallery-2.jpg', thumbUrl: '/hotels/set-01/gallery-2.jpg', description: '루프탑' },
    { url: '/hotels/set-01/gallery-3.jpg', thumbUrl: '/hotels/set-01/gallery-3.jpg', description: '라운지' },
    { url: '/hotels/set-01/gallery-4.jpg', thumbUrl: '/hotels/set-01/gallery-4.jpg', description: '조식' },
  ],
  rooms: [
    {
      itemKey: 'room-standard',
      name: '온다 스탠다드',
      nameEn: 'ONDA Standard',
      description:
        '제주 돌담 너머로 보이는 바다. 미니멀한 공간에 꼭 필요한 것만 채운 온다의 기본 객실입니다. 원목 가구와 리넨 패브릭이 편안한 분위기를 만들어냅니다.',
      maxGuests: 2,
      size: 28,
      bedType: '퀸',
      basePrice: 180000,
      images: [
        { url: '/hotels/set-01/rooms/standard.jpg', thumbUrl: '/hotels/set-01/rooms/standard.jpg' },
      ],
      features: ['가든뷰', '1층 테라스'],
      amenities: ['무료 WiFi', '블루투스 스피커', '레인샤워', '유기농 어메니티'],
      checkInTime: '15:00',
      checkOutTime: '11:00',
    },
    {
      itemKey: 'room-deluxe',
      name: '온다 디럭스',
      nameEn: 'ONDA Deluxe',
      description:
        '넓은 창을 통해 쏟아지는 애월 바다의 빛. 킹사이즈 침대와 독립 욕조가 있는 디럭스 객실에서 여유로운 시간을 보내세요.',
      maxGuests: 3,
      size: 38,
      bedType: '킹',
      basePrice: 260000,
      images: [
        { url: '/hotels/set-01/rooms/deluxe.jpg', thumbUrl: '/hotels/set-01/rooms/deluxe.jpg' },
      ],
      features: ['오션뷰', '프라이빗 발코니'],
      amenities: ['무료 WiFi', '네스프레소 머신', '독립 욕조', '블루투스 스피커', '유기농 어메니티'],
      checkInTime: '15:00',
      checkOutTime: '11:00',
    },
    {
      itemKey: 'room-premier',
      name: '온다 프리미어',
      nameEn: 'ONDA Premier',
      description:
        '거실과 침실이 분리된 넉넉한 공간. 가족이나 소중한 동행과 함께하기 좋은 프리미어 객실입니다. 통유리 너머 펼쳐진 바다가 하루 종일 함께합니다.',
      maxGuests: 4,
      size: 52,
      bedType: '킹 + 싱글',
      basePrice: 380000,
      images: [
        { url: '/hotels/set-01/rooms/premier.jpg', thumbUrl: '/hotels/set-01/rooms/premier.jpg' },
      ],
      features: ['파노라마 오션뷰', '프라이빗 테라스', '독립 거실'],
      amenities: ['무료 WiFi', '네스프레소 머신', '독립 욕조', '블루투스 스피커', '미니바', '유기농 어메니티', '거실'],
      checkInTime: '15:00',
      checkOutTime: '11:00',
    },
    {
      itemKey: 'room-suite',
      name: '온다 스위트',
      nameEn: 'ONDA Suite',
      description:
        '스테이 온다의 시그니처 공간. 루프탑 전용 테라스에서 바라보는 애월 바다의 석양은 이 객실만의 특권입니다. 최상층에 단 2실, 프라이빗한 제주를 온전히 누리세요.',
      maxGuests: 5,
      size: 72,
      bedType: '킹',
      basePrice: 520000,
      images: [
        { url: '/hotels/set-01/rooms/suite.jpg', thumbUrl: '/hotels/set-01/rooms/suite.jpg' },
      ],
      features: ['루프탑 전용 테라스', '360° 오션뷰', '독립 거실 & 다이닝', '선셋 포인트'],
      amenities: ['무료 WiFi', '네스프레소 머신', '독립 욕조', '레인샤워', '블루투스 스피커', '미니바', '유기농 어메니티', '거실', '다이닝'],
      checkInTime: '15:00',
      checkOutTime: '11:00',
    },
  ],
};

export async function GET() {
  return NextResponse.json(STORE_INFO);
}
