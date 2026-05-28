export type SiteConfig = {
  id: string;
  name: string;
  nameEn: string;
  city: string;
  address: string;
  phone: string;
  email: string;
  checkInTime: string;
  checkOutTime: string;

  heroImages: string[];
  shortConcept: string;

  greeting: {
    headline: string;
    body: string;
    signature: string;
  };

  about: {
    eyebrow: string;
    title: string;
    body: string;
    philosophy: string;
    images: string[];
  };

  amenities: string[];
  tags: string[];

  directions: {
    latitude: string;
    longitude: string;
    parkingInfo: string;
    nearbyItems: { label: string; value: string }[];
  };
};
