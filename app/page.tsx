import { HeroSection } from '@/ui/home/hero-section';
import { GreetingSection } from '@/ui/home/greeting-section';
import { StorySection } from '@/ui/home/story-section';
import { RoomsPreview } from '@/ui/home/rooms-preview';
import { OnepageReservation } from '@/ui/reservation/onepage-reservation';
import { LocationSection } from '@/ui/home/location-section';

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
