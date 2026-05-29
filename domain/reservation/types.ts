/** 예약 도메인 타입 */

export type GuestInfo = {
  name: string;
  phone: string;
  email: string;
  requests: string;
};

export type ApiRoomSelection = {
  motelKey: string;
  storeName: string;
  sitePayment: boolean;
  packageKey: string;
  roomName: string;
  roomImage: string | null;
  maxGuests: number;
  price: number;
  dailyPrices: number[];
  checkInTime: string;
  checkOutTime: string;
};

export type ReservationReadyParams = {
  hotelId: string;
  roomId: string;
  checkIn: string;
  checkOut: string;
  guestName: string;
  guestPhone: string;
  totalPrice: number;
  basePrice: number;
  checkInTime: string;
  checkOutTime: string;
};

export type ReservationResult = {
  bookId: string;
  status: string;
};

export type BookingStatus = "BEFORE" | "AFTER" | "CANCEL";

export type BookingPayment = {
  method: string;
  status: string;
  charge: number;
  cardNo?: string;
  refundCharge?: number;
};

export type BookingItem = {
  bookId: string;
  status: BookingStatus;
  storeName: string;
  roomName: string;
  roomImage: string | null;
  checkIn: string;
  checkOut: string;
  guestName: string;
  guestPhone: string;
  totalPrice: number;
  originPrice: number;
  payment: BookingPayment;
  refundYn: boolean;
  vehicleYn: boolean;
  regDate: string;
};
