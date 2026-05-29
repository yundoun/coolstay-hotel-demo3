import { HeroSection } from '@/components/home/hero-section';
import { GreetingSection } from '@/components/home/greeting-section';
import { StorySection } from '@/components/home/story-section';
import { RoomsPreview } from '@/components/home/rooms-preview';
import { OnepageReservation } from '@/components/reservation/onepage-reservation';
import { LocationSection } from '@/components/home/location-section';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <GreetingSection />
      <StorySection />
      <RoomsPreview />
      <OnepageReservation />
      <LocationSection />
    </>
  );
}
