import { HeroSlider } from '@/components/home/hero-slider';
import { FeaturedHotels } from '@/components/home/featured-hotels';
import { CurationSections } from '@/components/home/curation-sections';

export default function HomePage() {
  return (
    <>
      <HeroSlider />
      <FeaturedHotels />
      <div className="border-t border-neutral-100" />
      <CurationSections />
    </>
  );
}
