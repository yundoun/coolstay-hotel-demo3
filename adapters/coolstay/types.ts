export type RoomType = {
  itemKey: string;
  name: string;
  nameEn: string;
  description: string;
  maxGuests: number;
  size: number;
  bedType: string;
  basePrice: number;
  images: { url: string; thumbUrl: string }[];
  features: string[];
  amenities: string[];
  checkInTime: string;
  checkOutTime: string;
};

export type StoreInfo = {
  motelKey: string;
  name: string;
  nameEn: string;
  phone: string;
  email: string;
  address: string;
  latitude: string;
  longitude: string;
  parkingInfo: string;
  sitePayment: boolean;
  images: { url: string; thumbUrl: string; description: string }[];
  rooms: RoomType[];
};

export type ApiRoom = {
  itemKey: string;
  packageKey: string;
  name: string;
  nameEn: string;
  description: string;
  maxGuests: number;
  size: number;
  bedType: string;
  image: string | null;
  images: { url: string; thumbUrl: string }[];
  price: number;
  dailyPrices: number[];
  features: string[];
  amenities: string[];
  checkInTime: string;
  checkOutTime: string;
};

export type RoomsResponse = {
  motelKey: string;
  storeName: string;
  sitePayment: boolean;
  rooms: ApiRoom[];
};
