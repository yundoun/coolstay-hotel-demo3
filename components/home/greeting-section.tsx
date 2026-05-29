'use client';

import { useStoreInfo } from '@/application/hooks/useStoreInfo';
import { Reveal } from '@/components/ui/reveal';

export function GreetingSection() {
  const { data } = useStoreInfo();

  if (!data) return null;

  return (
    <section id="greeting" className="py-24 lg:py-32">
      <div className="mx-auto max-w-[800px] px-6 lg:px-10 text-center">
        <Reveal>
          <p className="font-barlow text-xs tracking-[0.3em] text-neutral-400 uppercase mb-8">
            Greeting
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="text-2xl lg:text-3xl font-bold text-neutral-900 leading-snug mb-8">
            {data.name}에 오신 것을 환영합니다
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="space-y-6 text-base leading-[2] text-neutral-500">
            <p>{data.name}에서 편안하고 특별한 시간을 보내세요.</p>
          </div>
        </Reveal>

        <Reveal delay={0.3}>
          <p className="mt-10 text-sm text-neutral-400 italic">
            {data.name} &nbsp;올림
          </p>
        </Reveal>
      </div>
    </section>
  );
}
