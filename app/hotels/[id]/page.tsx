import { notFound } from 'next/navigation';
import { hotels, getHotelById } from '@/lib/hotels';
import { Container } from '@/components/ui/container';
import { ImageGallery } from '@/components/hotel-detail/image-gallery';
import { HotelInfo } from '@/components/hotel-detail/hotel-info';
import { HotelRoomsAndBooking } from '@/components/hotel-detail/hotel-rooms-and-booking';

export function generateStaticParams() {
  return hotels.map((hotel) => ({ id: hotel.id }));
}

export default async function HotelDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const hotel = getHotelById(id);

  if (!hotel) {
    notFound();
  }

  return (
    <div className="pt-[72px]">
      {/* Gallery - full width slider */}
      <ImageGallery
        hero={hotel.images.hero}
        gallery={hotel.images.gallery}
        name={hotel.name}
      />

      {/* Content */}
      <Container className="py-10 lg:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Info - server rendered */}
          <div className="lg:col-span-2">
            <HotelInfo hotel={hotel} />
          </div>

          {/* Rooms + Booking Widget - client rendered together */}
          <HotelRoomsAndBooking hotel={hotel} />
        </div>
      </Container>
    </div>
  );
}
