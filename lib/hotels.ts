import { Hotel, Region, REGIONS } from './types';
import { getImageSet } from './utils';

const HOTEL_DATA: Array<{
  name: string;
  nameEn: string;
  region: Region;
  address: string;
  description: string;
  pricePerNight: number;
  discountRate?: number;
  tags: string[];
  rating: number;
  reviewCount: number;
  featured: boolean;
  lat: number;
  lng: number;
}> = [
  // 서울 (5개)
  {
    name: '그랜드 하얏트 서울',
    nameEn: 'Grand Hyatt Seoul',
    region: '서울',
    address: '서울특별시 용산구 소월로 322',
    description:
      '남산의 품 안에 자리한 그랜드 하얏트 서울은 도심 속 자연을 만끽할 수 있는 럭셔리 호텔입니다. 탁 트인 서울 시내 전망과 함께 세계 정상급 다이닝, 스파, 피트니스를 경험하세요.',
    pricePerNight: 350000,
    tags: ['시티뷰', '루프탑바', '피트니스', '스파'],
    rating: 4.7,
    reviewCount: 2341,
    featured: true,
    lat: 37.5374,
    lng: 126.998,
  },
  {
    name: '포시즌스 호텔 서울',
    nameEn: 'Four Seasons Hotel Seoul',
    region: '서울',
    address: '서울특별시 종로구 새문안로 97',
    description:
      '광화문의 중심에서 전통과 현대가 어우러진 최상의 서비스를 제공합니다. 미슐랭 다이닝과 함께하는 특별한 스테이를 경험하세요.',
    pricePerNight: 520000,
    discountRate: 15,
    tags: ['미슐랭', '시티뷰', '인피니티풀', '발레파킹'],
    rating: 4.9,
    reviewCount: 1856,
    featured: true,
    lat: 37.5725,
    lng: 126.975,
  },
  {
    name: '시그니엘 서울',
    nameEn: 'Signiel Seoul',
    region: '서울',
    address: '서울특별시 송파구 올림픽로 300',
    description:
      '롯데월드타워 76~101층에 위치한 시그니엘 서울. 서울의 스카이라인을 발 아래 두고, 구름 위의 휴식을 선사합니다.',
    pricePerNight: 680000,
    tags: ['스카이라운지', '시티뷰', '미슐랭', '스파'],
    rating: 4.8,
    reviewCount: 1523,
    featured: true,
    lat: 37.5126,
    lng: 127.1026,
  },
  {
    name: '조선 팰리스 서울',
    nameEn: 'Josun Palace Seoul',
    region: '서울',
    address: '서울특별시 강남구 테헤란로 231',
    description:
      '강남의 중심에서 만나는 현대적 럭셔리. 조선 팰리스는 세련된 디자인과 품격 있는 서비스로 비즈니스와 레저 모두를 충족합니다.',
    pricePerNight: 420000,
    discountRate: 10,
    tags: ['비즈니스', '피트니스', '다이닝', '발레파킹'],
    rating: 4.6,
    reviewCount: 987,
    featured: false,
    lat: 37.5045,
    lng: 127.0398,
  },
  {
    name: '반얀트리 클럽 앤 스파 서울',
    nameEn: 'Banyan Tree Club & Spa Seoul',
    region: '서울',
    address: '서울특별시 중구 장충동2가 60-3',
    description:
      '남산 자락에 위치한 도심 속 오아시스. 자연과 함께하는 프라이빗한 휴식, 시그니처 스파로 일상을 잊으세요.',
    pricePerNight: 380000,
    tags: ['스파', '남산뷰', '프라이빗', '야외풀'],
    rating: 4.5,
    reviewCount: 1234,
    featured: false,
    lat: 37.5563,
    lng: 127.0055,
  },
  // 부산 (4개)
  {
    name: '파크 하얏트 부산',
    nameEn: 'Park Hyatt Busan',
    region: '부산',
    address: '부산광역시 해운대구 마린시티1로 51',
    description:
      '해운대 마린시티의 랜드마크. 바다와 도시가 만나는 곳에서 파크 하얏트만의 정제된 럭셔리를 경험하세요.',
    pricePerNight: 450000,
    discountRate: 20,
    tags: ['오션뷰', '인피니티풀', '스파', '다이닝'],
    rating: 4.8,
    reviewCount: 1678,
    featured: true,
    lat: 35.1581,
    lng: 129.1367,
  },
  {
    name: '시그니엘 부산',
    nameEn: 'Signiel Busan',
    region: '부산',
    address: '부산광역시 해운대구 달맞이길 30',
    description:
      '해운대의 절경을 한눈에 담는 시그니엘 부산. 바다 위의 궁전에서 잊지 못할 순간을 만드세요.',
    pricePerNight: 550000,
    tags: ['오션뷰', '프라이빗비치', '루프탑', '스파'],
    rating: 4.7,
    reviewCount: 945,
    featured: true,
    lat: 35.1589,
    lng: 129.1505,
  },
  {
    name: '아난티 코브 힐튼',
    nameEn: 'Ananti Cove Hilton',
    region: '부산',
    address: '부산광역시 기장군 기장읍 기장해안로 268-32',
    description:
      '기장 바닷가 위에 펼쳐진 복합 리조트. 자연과 건축이 하나 된 공간에서 느리게 흐르는 시간을 즐기세요.',
    pricePerNight: 320000,
    tags: ['오션뷰', '북카페', '산책로', '다이닝'],
    rating: 4.6,
    reviewCount: 2105,
    featured: false,
    lat: 35.1878,
    lng: 129.2234,
  },
  {
    name: '호텔 농심',
    nameEn: 'Hotel Nongshim',
    region: '부산',
    address: '부산광역시 동래구 금강공원로 20',
    description:
      '허심청 온천과 함께하는 전통의 명품 호텔. 천연 온천수로 몸과 마음을 치유하는 특별한 경험.',
    pricePerNight: 180000,
    tags: ['온천', '한식당', '피트니스', '사우나'],
    rating: 4.3,
    reviewCount: 3456,
    featured: false,
    lat: 35.2178,
    lng: 129.0822,
  },
  // 제주 (6개)
  {
    name: '제주신라호텔',
    nameEn: 'The Shilla Jeju',
    region: '제주',
    address: '제주특별자치도 서귀포시 중문관광로72번길 75',
    description:
      '중문의 푸른 바다를 품은 제주신라호텔. 한라산과 태평양이 어우러진 절경 속에서 최고급 리조트 경험을 선사합니다.',
    pricePerNight: 480000,
    discountRate: 25,
    tags: ['오션뷰', '워터파크', '골프', '스파'],
    rating: 4.7,
    reviewCount: 4521,
    featured: true,
    lat: 33.2474,
    lng: 126.4105,
  },
  {
    name: '롯데호텔 제주',
    nameEn: 'Lotte Hotel Jeju',
    region: '제주',
    address: '제주특별자치도 서귀포시 중문관광로72번길 35',
    description:
      '500개의 객실에서 바라보는 태평양의 일출. 제주의 자연을 가장 가까이에서 느끼는 리조트 스테이.',
    pricePerNight: 350000,
    tags: ['오션뷰', '키즈', '골프', '면세점'],
    rating: 4.5,
    reviewCount: 3214,
    featured: false,
    lat: 33.2487,
    lng: 126.4088,
  },
  {
    name: '해비치 호텔앤드리조트',
    nameEn: 'Haevichi Hotel & Resort',
    region: '제주',
    address: '제주특별자치도 서귀포시 표선면 민속해안로 537',
    description:
      '표선 해비치 해변에 자리한 프리미엄 리조트. 에메랄드빛 바다와 제주 돌담의 운치가 어우러집니다.',
    pricePerNight: 280000,
    discountRate: 15,
    tags: ['프라이빗비치', '키즈', '야외풀', '조식'],
    rating: 4.4,
    reviewCount: 2876,
    featured: false,
    lat: 33.3267,
    lng: 126.8325,
  },
  {
    name: '그랜드 하얏트 제주',
    nameEn: 'Grand Hyatt Jeju',
    region: '제주',
    address: '제주특별자치도 제주시 노연로 12',
    description:
      '제주 드림타워 내 위치한 그랜드 하얏트 제주. 38층 인피니티풀에서 바라보는 한라산과 제주 시내의 파노라마.',
    pricePerNight: 400000,
    tags: ['인피니티풀', '카지노', '스파', '시티뷰'],
    rating: 4.6,
    reviewCount: 1567,
    featured: true,
    lat: 33.4882,
    lng: 126.4988,
  },
  {
    name: '플레이스캠프 제주',
    nameEn: 'Playce Camp Jeju',
    region: '제주',
    address: '제주특별자치도 제주시 탑동해안로 36',
    description:
      '제주 구도심의 감성을 담은 부티크 호텔. 로컬 문화와 현대적 디자인이 만나는 새로운 스테이 경험.',
    pricePerNight: 150000,
    tags: ['부티크', '로컬맛집', '바', '루프탑'],
    rating: 4.3,
    reviewCount: 876,
    featured: false,
    lat: 33.5178,
    lng: 126.5269,
  },
  {
    name: '위 호텔 제주',
    nameEn: 'WE Hotel Jeju',
    region: '제주',
    address: '제주특별자치도 서귀포시 성산읍 섭지코지로 114',
    description:
      '안도 타다오가 설계한 건축 명작. 성산일출봉과 바다를 조망하며 예술과 자연이 하나 되는 공간.',
    pricePerNight: 320000,
    tags: ['건축명소', '오션뷰', '아트', '명상'],
    rating: 4.5,
    reviewCount: 654,
    featured: false,
    lat: 33.4312,
    lng: 126.9291,
  },
  // 강릉 (4개)
  {
    name: '세인트존스 호텔',
    nameEn: "St. John's Hotel",
    region: '강릉',
    address: '강원특별자치도 강릉시 해안로 307',
    description:
      '강릉 경포 해변의 대표 럭셔리 호텔. 동해의 일출을 객실에서 맞이하는 특별한 아침을 선물합니다.',
    pricePerNight: 250000,
    discountRate: 10,
    tags: ['오션뷰', '조식', '피트니스', '사우나'],
    rating: 4.4,
    reviewCount: 1876,
    featured: false,
    lat: 37.8012,
    lng: 128.9123,
  },
  {
    name: '스카이베이 호텔 경포',
    nameEn: 'Skybay Hotel Gyeongpo',
    region: '강릉',
    address: '강원특별자치도 강릉시 해안로 406',
    description:
      '경포대 앞바다를 한 눈에 조망하는 프리미엄 리조트. 인피니티풀과 프라이빗 비치에서 완벽한 휴식.',
    pricePerNight: 300000,
    tags: ['인피니티풀', '오션뷰', '프라이빗비치', '바베큐'],
    rating: 4.5,
    reviewCount: 1234,
    featured: true,
    lat: 37.8056,
    lng: 128.9087,
  },
  {
    name: '강릉 씨마크 호텔',
    nameEn: 'Seamarq Hotel Gangneung',
    region: '강릉',
    address: '강원특별자치도 강릉시 해안로 406번길 2',
    description:
      '동해 바다 위에 떠 있는 듯한 독보적인 건축미. 리처드 마이어의 디자인 철학이 담긴 아트 호텔.',
    pricePerNight: 380000,
    tags: ['건축명소', '오션뷰', '아트', '스파'],
    rating: 4.6,
    reviewCount: 987,
    featured: false,
    lat: 37.8034,
    lng: 128.9145,
  },
  {
    name: '호텔 탑스텐 강릉',
    nameEn: 'Hotel Tops 10 Gangneung',
    region: '강릉',
    address: '강원특별자치도 강릉시 창해로 307',
    description:
      '강릉 도심과 바다를 동시에 즐기는 모던 호텔. 가성비와 퀄리티를 모두 갖춘 강릉의 새로운 랜드마크.',
    pricePerNight: 170000,
    tags: ['시티뷰', '카페', '비즈니스', '조식'],
    rating: 4.2,
    reviewCount: 2345,
    featured: false,
    lat: 37.7556,
    lng: 128.8962,
  },
  // 경주 (3개)
  {
    name: '힐튼 경주',
    nameEn: 'Hilton Gyeongju',
    region: '경주',
    address: '경상북도 경주시 보문로 484-7',
    description:
      '보문관광단지 내 위치한 클래식 럭셔리 호텔. 신라 천년의 역사와 현대의 편안함이 조화를 이루는 공간.',
    pricePerNight: 220000,
    tags: ['보문호수', '골프', '사우나', '한식당'],
    rating: 4.3,
    reviewCount: 2654,
    featured: false,
    lat: 35.8387,
    lng: 129.3346,
  },
  {
    name: '라한호텔 경주',
    nameEn: 'Lahan Hotel Gyeongju',
    region: '경주',
    address: '경상북도 경주시 보문로 338',
    description:
      '보문호수가 한눈에 내려다보이는 전망. 경주의 고즈넉한 분위기 속에서 온 가족이 함께하는 리조트.',
    pricePerNight: 190000,
    discountRate: 20,
    tags: ['레이크뷰', '키즈', '워터파크', '조식'],
    rating: 4.4,
    reviewCount: 1876,
    featured: false,
    lat: 35.8356,
    lng: 129.3289,
  },
  {
    name: '코오롱 호텔 경주',
    nameEn: 'Kolon Hotel Gyeongju',
    region: '경주',
    address: '경상북도 경주시 불국로 지구 415-7',
    description:
      '불국사와 토함산 자락에 위치한 전통 명문 호텔. 유네스코 세계유산과 함께하는 문화 스테이.',
    pricePerNight: 200000,
    tags: ['문화유산', '가든', '한식당', '피트니스'],
    rating: 4.2,
    reviewCount: 3210,
    featured: false,
    lat: 35.7901,
    lng: 129.3312,
  },
  // 여수 (3개)
  {
    name: '히든베이 호텔',
    nameEn: 'Hidden Bay Hotel',
    region: '여수',
    address: '전라남도 여수시 오동도로 61-7',
    description:
      '여수 앞바다의 숨겨진 보석. 오동도와 돌산대교를 조망하는 프라이빗한 부티크 호텔.',
    pricePerNight: 260000,
    tags: ['오션뷰', '부티크', '루프탑', '조식'],
    rating: 4.5,
    reviewCount: 876,
    featured: false,
    lat: 34.7432,
    lng: 127.7512,
  },
  {
    name: '소노캄 여수',
    nameEn: 'Sono Calm Yeosu',
    region: '여수',
    address: '전라남도 여수시 소호로 660',
    description:
      '다도해의 아름다운 섬들을 조망하는 리조트. 자연 속에서 캄(calm)한 휴식을 선사합니다.',
    pricePerNight: 230000,
    discountRate: 15,
    tags: ['오션뷰', '야외풀', '키즈', '바베큐'],
    rating: 4.4,
    reviewCount: 1543,
    featured: false,
    lat: 34.7123,
    lng: 127.6789,
  },
  {
    name: '디오션 리조트 여수',
    nameEn: 'The Ocean Resort Yeosu',
    region: '여수',
    address: '전라남도 여수시 돌산읍 무술목길 142',
    description:
      '돌산 해안절벽 위의 프리미엄 리조트. 180도 파노라마 오션뷰와 프라이빗 테라스에서 여수 밤바다를 감상하세요.',
    pricePerNight: 340000,
    tags: ['오션뷰', '테라스', '프라이빗', '스파'],
    rating: 4.6,
    reviewCount: 765,
    featured: true,
    lat: 34.7289,
    lng: 127.7834,
  },
  // 전주 (2개)
  {
    name: '라마다 전주 호텔',
    nameEn: 'Ramada Jeonju Hotel',
    region: '전주',
    address: '전라북도 전주시 완산구 기린대로 65',
    description:
      '전주 한옥마을과 가까운 모던 호텔. 전통의 맛과 멋을 즐기기 위한 최적의 베이스캠프.',
    pricePerNight: 140000,
    tags: ['한옥마을', '비즈니스', '조식', '피트니스'],
    rating: 4.1,
    reviewCount: 1432,
    featured: false,
    lat: 35.8148,
    lng: 127.1089,
  },
  {
    name: '르윈 전주',
    nameEn: 'Le Win Jeonju',
    region: '전주',
    address: '전라북도 전주시 완산구 태조로 69',
    description:
      '전주의 정취를 현대적으로 재해석한 부티크 호텔. 한옥마을 도보 3분, 전주의 밤을 가장 가까이서.',
    pricePerNight: 160000,
    discountRate: 10,
    tags: ['부티크', '한옥마을', '바', '테라스'],
    rating: 4.3,
    reviewCount: 654,
    featured: false,
    lat: 35.8156,
    lng: 127.1101,
  },
  // 인천 (3개)
  {
    name: '파라다이스시티',
    nameEn: 'Paradise City',
    region: '인천',
    address: '인천광역시 중구 영종해안남로321번길 186',
    description:
      '아트와 엔터테인먼트가 결합된 복합 리조트. 세계적인 아트 컬렉션과 함께하는 감각적인 스테이.',
    pricePerNight: 380000,
    tags: ['아트', '카지노', '스파', '인피니티풀'],
    rating: 4.6,
    reviewCount: 2345,
    featured: true,
    lat: 37.4445,
    lng: 126.6277,
  },
  {
    name: '네스트호텔 인천',
    nameEn: 'Nest Hotel Incheon',
    region: '인천',
    address: '인천광역시 중구 영종해안남로 16',
    description:
      '영종도 을왕리 해변의 선셋 부티크 호텔. 서해의 석양을 객실에서 독차지하는 로맨틱 스테이.',
    pricePerNight: 200000,
    tags: ['선셋뷰', '부티크', '테라스', '카페'],
    rating: 4.3,
    reviewCount: 1098,
    featured: false,
    lat: 37.4467,
    lng: 126.3812,
  },
  {
    name: '그랜드 하얏트 인천',
    nameEn: 'Grand Hyatt Incheon',
    region: '인천',
    address: '인천광역시 중구 제물량로 208',
    description:
      '인천 송도의 국제적인 분위기 속 럭셔리 호텔. 비즈니스와 레저를 동시에 즐기는 글로벌 스탠다드.',
    pricePerNight: 290000,
    discountRate: 10,
    tags: ['비즈니스', '인피니티풀', '스파', '다이닝'],
    rating: 4.5,
    reviewCount: 1876,
    featured: false,
    lat: 37.3901,
    lng: 126.6567,
  },
];

const ROOM_TEMPLATES = [
  {
    suffix: 'deluxe',
    name: '디럭스 더블',
    description:
      '넓은 창을 통해 들어오는 자연광이 가득한 디럭스 객실. 킹사이즈 침대와 고급 어메니티로 편안한 휴식을 선사합니다.',
    capacity: { adults: 2, children: 1 },
    size: 35,
    bedType: '킹',
    priceMultiplier: 1,
    amenities: ['미니바', '커피머신', '금고', '욕조', '무료 WiFi'],
  },
  {
    suffix: 'premier',
    name: '프리미어 트윈',
    description:
      '트윈 베드 구성으로 가족이나 동료와 함께하기 좋은 프리미어 객실. 넓은 라운지 공간이 매력적입니다.',
    capacity: { adults: 2, children: 2 },
    size: 42,
    bedType: '트윈',
    priceMultiplier: 1.3,
    amenities: [
      '미니바',
      '커피머신',
      '금고',
      '샤워부스',
      '무료 WiFi',
      '라운지',
    ],
  },
  {
    suffix: 'suite',
    name: '이그제큐티브 스위트',
    description:
      '독립된 거실과 침실로 구성된 이그제큐티브 스위트. 비즈니스 미팅부터 프라이빗 파티까지 다목적으로 활용 가능합니다.',
    capacity: { adults: 3, children: 2 },
    size: 65,
    bedType: '킹',
    priceMultiplier: 2,
    amenities: [
      '미니바',
      '커피머신',
      '금고',
      '욕조',
      '무료 WiFi',
      '거실',
      '다이닝룸',
      '발레파킹',
    ],
  },
  {
    suffix: 'standard',
    name: '스탠다드 더블',
    description:
      '알찬 구성의 스탠다드 객실. 편안한 침구와 깔끔한 인테리어로 가성비 높은 투숙을 원하는 분께 추천합니다.',
    capacity: { adults: 2, children: 0 },
    size: 28,
    bedType: '더블',
    priceMultiplier: 0.8,
    amenities: ['미니바', '금고', '샤워부스', '무료 WiFi'],
  },
];

function generateRooms(
  hotelId: string,
  basePrice: number,
  imageSet: string
): Hotel['rooms'] {
  return ROOM_TEMPLATES.map((template) => ({
    id: `${hotelId}-${template.suffix}`,
    name: template.name,
    description: template.description,
    capacity: template.capacity,
    size: template.size,
    bedType: template.bedType,
    pricePerNight: Math.round(basePrice * template.priceMultiplier),
    image: `/hotels/${imageSet}/rooms/${template.suffix}.jpg`,
    amenities: template.amenities,
  }));
}

export const hotels: Hotel[] = HOTEL_DATA.map((data, index) => {
  const id = `hotel-${String(index + 1).padStart(3, '0')}`;
  const imageSet = getImageSet(index);
  return {
    id,
    name: data.name,
    nameEn: data.nameEn,
    region: data.region,
    address: data.address,
    description: data.description,
    rating: data.rating,
    reviewCount: data.reviewCount,
    pricePerNight: data.pricePerNight,
    discountRate: data.discountRate,
    tags: data.tags,
    amenities: [
      '무료 WiFi',
      '피트니스 센터',
      '레스토랑',
      '룸서비스',
      '컨시어지',
      '세탁 서비스',
    ],
    images: {
      hero: `/hotels/${imageSet}/hero.jpg`,
      gallery: [1, 2, 3, 4].map(
        (n) => `/hotels/${imageSet}/gallery-${n}.jpg`
      ),
    },
    rooms: generateRooms(id, data.pricePerNight, imageSet),
    checkIn: '15:00',
    checkOut: '11:00',
    coordinates: { lat: data.lat, lng: data.lng },
    featured: data.featured,
  };
});

export function getHotelById(id: string): Hotel | undefined {
  return hotels.find((h) => h.id === id);
}

export function getHotelsByRegion(region: Region): Hotel[] {
  return hotels.filter((h) => h.region === region);
}

export function getFeaturedHotels(): Hotel[] {
  return hotels.filter((h) => h.featured);
}

export function getRegionCounts(): Record<Region, number> {
  const counts = {} as Record<Region, number>;
  for (const region of REGIONS) {
    counts[region] = hotels.filter((h) => h.region === region).length;
  }
  return counts;
}

export function searchHotels(params: {
  region?: Region;
  sort?: 'recommend' | 'price-asc' | 'price-desc' | 'rating';
  query?: string;
}): Hotel[] {
  let result = [...hotels];

  if (params.region) {
    result = result.filter((h) => h.region === params.region);
  }

  if (params.query) {
    const q = params.query.toLowerCase();
    result = result.filter(
      (h) =>
        h.name.toLowerCase().includes(q) ||
        h.nameEn.toLowerCase().includes(q) ||
        h.tags.some((t) => t.includes(q))
    );
  }

  switch (params.sort) {
    case 'price-asc':
      result.sort((a, b) => a.pricePerNight - b.pricePerNight);
      break;
    case 'price-desc':
      result.sort((a, b) => b.pricePerNight - a.pricePerNight);
      break;
    case 'rating':
      result.sort((a, b) => b.rating - a.rating);
      break;
    default:
      result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
  }

  return result;
}
