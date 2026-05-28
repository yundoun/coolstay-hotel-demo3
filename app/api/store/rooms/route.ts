import { NextRequest, NextResponse } from 'next/server';
import type { RoomsResponse, ApiRoom } from '@/adapters/coolstay/types';

const BASE_ROOMS: Omit<ApiRoom, 'price' | 'dailyPrices'>[] = [
  {
    itemKey: 'room-standard',
    name: '온다 스탠다드',
    nameEn: 'ONDA Standard',
    description:
      '제주 돌담 너머로 보이는 바다. 미니멀한 공간에 꼭 필요한 것만 채운 온다의 기본 객실입니다.',
    maxGuests: 2,
    size: 28,
    bedType: '퀸',
    image: '/hotels/set-01/rooms/standard.jpg',
    images: [{ url: '/hotels/set-01/rooms/standard.jpg', thumbUrl: '/hotels/set-01/rooms/standard.jpg' }],
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
      '넓은 창을 통해 쏟아지는 애월 바다의 빛. 킹사이즈 침대와 독립 욕조가 있는 디럭스 객실.',
    maxGuests: 3,
    size: 38,
    bedType: '킹',
    image: '/hotels/set-01/rooms/deluxe.jpg',
    images: [{ url: '/hotels/set-01/rooms/deluxe.jpg', thumbUrl: '/hotels/set-01/rooms/deluxe.jpg' }],
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
      '거실과 침실이 분리된 넉넉한 공간. 통유리 너머 펼쳐진 바다가 하루 종일 함께합니다.',
    maxGuests: 4,
    size: 52,
    bedType: '킹 + 싱글',
    image: '/hotels/set-01/rooms/premier.jpg',
    images: [{ url: '/hotels/set-01/rooms/premier.jpg', thumbUrl: '/hotels/set-01/rooms/premier.jpg' }],
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
      '스테이 온다의 시그니처 공간. 루프탑 전용 테라스에서 바라보는 애월 바다의 석양.',
    maxGuests: 5,
    size: 72,
    bedType: '킹',
    image: '/hotels/set-01/rooms/suite.jpg',
    images: [{ url: '/hotels/set-01/rooms/suite.jpg', thumbUrl: '/hotels/set-01/rooms/suite.jpg' }],
    features: ['루프탑 전용 테라스', '360° 오션뷰', '독립 거실 & 다이닝', '선셋 포인트'],
    amenities: ['무료 WiFi', '네스프레소 머신', '독립 욕조', '레인샤워', '블루투스 스피커', '미니바', '유기농 어메니티', '거실', '다이닝'],
    checkInTime: '15:00',
    checkOutTime: '11:00',
  },
];

const BASE_PRICES: Record<string, number> = {
  'room-standard': 180000,
  'room-deluxe': 260000,
  'room-premier': 380000,
  'room-suite': 520000,
};

function getDailyPrices(itemKey: string, nights: number): number[] {
  const base = BASE_PRICES[itemKey] || 180000;
  return Array.from({ length: nights }, () => base);
}

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const checkIn = searchParams.get('checkIn') || '';
  const checkOut = searchParams.get('checkOut') || '';

  let nights = 1;
  if (checkIn && checkOut) {
    const diff = new Date(checkOut).getTime() - new Date(checkIn).getTime();
    nights = Math.max(1, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  }

  const rooms: ApiRoom[] = BASE_ROOMS.map((room) => ({
    ...room,
    price: BASE_PRICES[room.itemKey] || 180000,
    dailyPrices: getDailyPrices(room.itemKey, nights),
  }));

  const response: RoomsResponse = {
    motelKey: 'stay-onda',
    storeName: '스테이 온다',
    sitePayment: true,
    rooms,
  };

  return NextResponse.json(response);
}
