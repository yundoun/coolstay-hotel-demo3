import Image from 'next/image';
import { Reveal } from '@/ui/ui/reveal';
import { siteConfig } from '@/hotel-data';

export function StorySection() {
  const { about } = siteConfig;

  return (
    <section id="about" className="py-24 lg:py-32">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
        <Reveal>
          <p className="font-barlow text-xs tracking-[0.3em] text-neutral-400 uppercase mb-12">
            {about.subtitle}
          </p>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          <div className="space-y-8">
            <Reveal delay={0.1}>
              <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 leading-snug whitespace-pre-line">
                {about.title}
              </h2>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="text-base leading-[1.9] text-neutral-500">
                {about.body}
              </p>
            </Reveal>

            {about.philosophy && (
              <Reveal delay={0.25}>
                <p className="text-sm leading-[1.9] text-neutral-400 italic">
                  {about.philosophy}
                </p>
              </Reveal>
            )}
          </div>

          {about.images.length >= 2 && (
            <div className="grid grid-cols-2 gap-3">
              <Reveal delay={0.2}>
                <div className="relative aspect-[3/4] rounded-sm overflow-hidden">
                  <Image
                    src={about.images[0]}
                    alt={`${siteConfig.name} 공간`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 50vw, 280px"
                  />
                </div>
              </Reveal>
              <Reveal delay={0.35}>
                <div className="relative aspect-[3/4] rounded-sm overflow-hidden mt-8">
                  <Image
                    src={about.images[1]}
                    alt={`${siteConfig.name} 전경`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 50vw, 280px"
                  />
                </div>
              </Reveal>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
