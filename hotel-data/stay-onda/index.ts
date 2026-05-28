import type { SiteConfig } from '@/domain/site-config/types';

export const siteConfig: SiteConfig = {
  id: 'stay-onda',
  name: '스테이 온다',
  nameEn: 'STAY ONDA',
  city: '제주 애월',
  address: '제주특별자치도 제주시 애월읍 애월해안로 768',
  phone: '064-799-0000',
  email: 'hello@stayonda.kr',
  checkInTime: '15:00',
  checkOutTime: '11:00',

  heroImages: [
    '/hotels/set-01/hero.jpg',
    '/hotels/set-01/gallery-1.jpg',
    '/hotels/set-01/gallery-2.jpg',
    '/hotels/set-01/gallery-3.jpg',
  ],
  shortConcept: '제주 애월, 바다 위의 고요한 쉼표',

  greeting: {
    headline: '스테이 온다에 오신 것을 환영합니다',
    body: '제주 애월, 한담해안산책로가 시작되는 그 자리에 스테이 온다가 있습니다.\n\n저희는 화려함보다 고요함을, 과잉보다 본질을 추구합니다. 바다 소리와 바람 소리가 배경음악이 되고, 현무암과 원목이 만들어내는 따뜻한 공간이 당신의 일상에 쉼표가 되기를 바랍니다.\n\n오시는 모든 분들이 이곳에서의 시간을 통해 돌아갈 힘을 얻어 가시길 진심으로 바랍니다.',
    signature: '스테이 온다 대표',
  },

  about: {
    eyebrow: 'About',
    title: '파도가 머무는 곳,\n당신도 머무르세요',
    body: '한담해안산책로가 시작되는 곳, 제주 애월 바닷가에 자리한 스테이 온다는 바다와 바람, 돌담이 만들어내는 제주의 고유한 리듬 속에서 진정한 쉼을 선사합니다. 현무암과 노출 콘크리트, 따뜻한 원목이 어우러진 공간에서 일상으로부터 한 발짝 물러선 시간을 경험하세요.',
    philosophy:
      '온다(ONDA)는 "파도"를 뜻하는 이탈리아어입니다. 끊임없이 밀려왔다 돌아가는 파도처럼, 이곳에서의 시간이 당신에게 돌아갈 힘이 되길 바랍니다. 우리는 화려함 대신 고요함을, 과잉 대신 본질을 추구합니다.',
    images: [
      '/hotels/set-01/gallery-1.jpg',
      '/hotels/set-01/gallery-2.jpg',
      '/hotels/set-01/gallery-3.jpg',
      '/hotels/set-01/gallery-4.jpg',
    ],
  },

  amenities: [
    '무료 WiFi',
    '조식 서비스',
    '루프탑 테라스',
    '전용 주차장',
    '라운지 바',
    '컨시어지',
    '세탁 서비스',
    '자전거 대여',
  ],

  tags: ['오션뷰', '부티크', '한담해안', '노출콘크리트', '루프탑'],

  directions: {
    latitude: '33.46',
    longitude: '126.3',
    parkingInfo: '전 객실 주차 가능 (무료)',
    nearbyItems: [
      { label: '제주공항', value: '차량 약 40분' },
      { label: '한담해안산책로', value: '도보 1분' },
      { label: '애월 카페거리', value: '도보 5분' },
    ],
  },
};
