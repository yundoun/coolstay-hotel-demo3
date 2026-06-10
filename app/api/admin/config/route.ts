import { NextRequest, NextResponse } from 'next/server';
import { readFileSync, writeFileSync, copyFileSync } from 'fs';
import { join } from 'path';
import type { SiteConfig } from '@/domain/site-config/types';

export const dynamic = 'force-dynamic';

const HOTEL_DIR = join(process.cwd(), 'hotel-data', 'gyeongju-cl');
const CONFIG_PATH = join(HOTEL_DIR, 'index.ts');
const ORIGINAL_PATH = join(HOTEL_DIR, '_original.ts');
const KEY_PATH = join(HOTEL_DIR, 'api-key.json');
const ORIGINAL_KEY_PATH = join(HOTEL_DIR, '_original-api-key.json');

export async function GET() {
  const raw = readFileSync(CONFIG_PATH, 'utf-8');
  const match = raw.match(/export const siteConfig:\s*SiteConfig\s*=\s*(\{[\s\S]*\});/);
  if (!match) {
    return NextResponse.json({ error: 'Failed to parse config' }, { status: 500 });
  }

  try {
    const fn = new Function(`return ${match[1]}`);
    const config = fn();
    return NextResponse.json(config);
  } catch {
    return NextResponse.json({ error: 'Failed to evaluate config' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const config: SiteConfig = await req.json();
  const content = generateConfigFile(config);
  writeFileSync(CONFIG_PATH, content, 'utf-8');
  return NextResponse.json({ success: true });
}

export async function DELETE() {
  // Reset: restore original config + api key
  copyFileSync(ORIGINAL_PATH, CONFIG_PATH);
  copyFileSync(ORIGINAL_KEY_PATH, KEY_PATH);
  return NextResponse.json({ success: true });
}

function generateConfigFile(c: SiteConfig): string {
  const s = JSON.stringify;
  const nearbyItems = c.directions.nearbyItems
    .map((item) => `      { label: ${s(item.label)}, value: ${s(item.value)} },`)
    .join('\n');

  const heroImages = c.heroImages
    .map((url) => `    ${s(url)},`)
    .join('\n');

  const aboutImages = c.about.images
    .map((url) => `    ${s(url)},`)
    .join('\n');

  return `import type { SiteConfig } from '@/domain/site-config/types';

/**
 * ┌─────────────────────────────────────────────┐
 * │  ${c.name} — 웹사이트 설정${' '.repeat(Math.max(0, 23 - c.name.length))}│
 * │                                             │
 * │  새 호텔 세팅 시                              │
 * │  아래 값들만 교체하면 됩니다.                  │
 * └─────────────────────────────────────────────┘
 */

export const siteConfig: SiteConfig = {

  /* ── 기본 정보 ─────────────────────────────── */
  /** 호텔 고유 ID (폴더명과 동일하게) */
  id: ${s(c.id)},
  /** 호텔 정식 명칭 */
  name: ${s(c.name)},
  /** 호텔 영문 명칭 — 히어로·헤더에 표시 */
  nameEn: ${s(c.nameEn)},
  /** 소재 도시 */
  city: ${s(c.city)},
  /** 주소 — 지도 검색에도 사용됨 */
  address: ${s(c.address)},
  /** 대표 연락처 */
  phone: ${s(c.phone)},
  /** 이메일 — 없으면 빈 문자열 (화면에 표시되지 않음) */
  email: ${s(c.email)},

  /* ── Hero 섹션 (배너 슬라이드 이미지, 최대 5장) ── */
  heroImages: [
${heroImages}
  ],
  /** 한 줄 컨셉 문구 — 브라우저 탭 제목에 표시 */
  shortConcept: ${s(c.shortConcept)},

  /* ── 인사말 섹션 ────────────────────────────── */
  greeting: {
    /** 인사말 제목 (줄바꿈: \\n) */
    headline: ${s(c.greeting.headline)},
    /** 인사말 본문 — 문단 구분은 \\n\\n */
    body: ${s(c.greeting.body)},
    /** 서명 — 뒤에 "올림"이 자동으로 붙음 */
    signature: ${s(c.greeting.signature)},
  },

  /* ── 호텔 소개(About) 섹션 ──────────────────── */
  about: {
    /** 섹션 소제목 — 제목 위에 작게 표시 */
    subtitle: ${s(c.about.subtitle)},
    /** 제목 (줄바꿈: \\n) */
    title: ${s(c.about.title)},
    /** 본문 설명 */
    body: ${s(c.about.body)},
    /** 한 줄 철학/모토 — 본문 아래 이탤릭으로 표시, 없으면 빈 문자열 */
    philosophy: ${s(c.about.philosophy || '')},
    /** 갤러리 이미지 URL (최소 2장 권장, 2열 그리드로 표시) */
    images: [
${aboutImages}
    ],
  },

  /* ── 찾아오는 길 섹션 ───────────────────────── */
  directions: {
    /** 주차 안내 — 없으면 빈 문자열 (화면에 표시되지 않음) */
    parkingInfo: ${s(c.directions.parkingInfo)},
    /** 주변 관광지·교통 안내 */
    nearbyItems: [
${nearbyItems}
    ],
  },
};
`;
}
