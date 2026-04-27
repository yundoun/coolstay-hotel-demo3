export interface Hotel {
  id: string;
  name: string;
  nameEn: string;
  region: Region;
  address: string;
  description: string;
  rating: number;
  reviewCount: number;
  pricePerNight: number;
  discountRate?: number;
  tags: string[];
  amenities: string[];
  images: {
    hero: string;
    gallery: string[];
  };
  rooms: Room[];
  checkIn: string;
  checkOut: string;
  coordinates: { lat: number; lng: number };
  featured: boolean;
}

export interface Room {
  id: string;
  name: string;
  description: string;
  capacity: { adults: number; children: number };
  size: number;
  bedType: string;
  pricePerNight: number;
  image: string;
  amenities: string[];
}

export type Region =
  | '서울'
  | '부산'
  | '제주'
  | '강릉'
  | '경주'
  | '여수'
  | '전주'
  | '인천';

export const REGIONS: Region[] = [
  '서울',
  '부산',
  '제주',
  '강릉',
  '경주',
  '여수',
  '전주',
  '인천',
];

export interface GuestInfo {
  name: string;
  phone: string;
  email: string;
  requests: string;
}
