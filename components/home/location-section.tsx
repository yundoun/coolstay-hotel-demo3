import { siteConfig } from '@/hotel-data';
import { Reveal } from '@/components/ui/reveal';
import { Container } from '@/components/ui/container';
import { MapPin, Phone, Mail, Clock, Car } from 'lucide-react';

export function LocationSection() {
  const { directions } = siteConfig;

  return (
    <section id="location" className="py-24 lg:py-32">
      <Container>
        <Reveal>
          <p className="font-barlow text-xs tracking-[0.3em] text-neutral-400 uppercase mb-4">
            Location
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-12">
            찾아오시는 길
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          <Reveal delay={0.1}>
            <div className="lg:col-span-3 relative aspect-[16/10] lg:aspect-auto lg:min-h-[400px] rounded-lg overflow-hidden bg-neutral-100">
              <iframe
                src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3322.8!2d${directions.longitude}!3d${directions.latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z!5e0!3m2!1sko!2skr!4v1`}
                className="absolute inset-0 w-full h-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`${siteConfig.name} 위치`}
              />
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="lg:col-span-2 space-y-8">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-neutral-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-neutral-900 mb-1">주소</p>
                  <p className="text-sm text-neutral-500 leading-relaxed">{siteConfig.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-neutral-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-neutral-900 mb-1">연락처</p>
                  <p className="text-sm text-neutral-500">{siteConfig.phone}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-neutral-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-neutral-900 mb-1">이메일</p>
                  <p className="text-sm text-neutral-500">{siteConfig.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-neutral-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-neutral-900 mb-1">이용 시간</p>
                  <p className="text-sm text-neutral-500">
                    체크인 {siteConfig.checkInTime} &middot; 체크아웃 {siteConfig.checkOutTime}
                  </p>
                </div>
              </div>

              {directions.parkingInfo && (
                <div className="flex items-start gap-3">
                  <Car className="w-5 h-5 text-neutral-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-neutral-900 mb-1">주차</p>
                    <p className="text-sm text-neutral-500">{directions.parkingInfo}</p>
                  </div>
                </div>
              )}

              {directions.nearbyItems.length > 0 && (
                <div className="space-y-2 pt-4 border-t border-neutral-100">
                  <p className="text-sm font-medium text-neutral-900 mb-2">주변 정보</p>
                  {directions.nearbyItems.map((item) => (
                    <div key={item.label} className="flex justify-between text-sm">
                      <span className="text-neutral-500">{item.label}</span>
                      <span className="text-neutral-400">{item.value}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
