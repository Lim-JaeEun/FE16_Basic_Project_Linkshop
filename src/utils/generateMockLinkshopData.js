export function generateMockLinkshopData() {
  const adjectivesForAnimals = [
    'adorable',
    'majestic',
    'playful',
    'wise',
    'swift',
    'gentle',
    'fierce',
    'charming',
    'curious',
    'loyal',
  ];
  const animals = [
    'lion',
    'tiger',
    'elephant',
    'bear',
    'fox',
    'wolf',
    'eagle',
    'dolphin',
    'panda',
    'squirrel',
  ];

  const adjectivesForProducts = [
    'stylish',
    'cozy',
    'delicious',
    'classic',
    'modern',
    'vibrant',
    'fragrant',
    'durable',
    'innovative',
    'unique',
  ];
  // 상품 형용사 한글 매핑 추가
  const koreanAdjectivesForProducts = {
    stylish: '세련된',
    cozy: '아늑한',
    delicious: '맛있는',
    classic: '클래식한',
    modern: '모던한',
    vibrant: '생기 넘치는',
    fragrant: '향기로운',
    durable: '튼튼한',
    innovative: '혁신적인',
    unique: '독특한',
  };

  const productCategories = {
    의류: ['T-Shirt', 'Hoodie', 'Jeans', 'Dress', 'Socks'],
    음식: [
      'Cake',
      'Coffee Beans',
      'Spices',
      'Organic Vegetables',
      'Artisan Bread',
    ],
    책: [
      'Fantasy Novel',
      'Science Fiction',
      'History Book',
      'Cookbook',
      "Children's Story",
    ],
  };
  const productCategoriesKorean = {
    의류: ['티셔츠', '후드티', '청바지', '원피스', '양말'],
    음식: ['케이크', '커피 원두', '향신료', '유기농 채소', '수제 빵'],
    책: ['판타지 소설', '공상 과학', '역사책', '요리책', '어린이 동화'],
  };
  const productCategoriesBase = ['의류', '음식', '책'];

  // 한글 상점 이름을 위한 매핑 (이전과 동일)
  const koreanAdjectives = {
    adorable: '사랑스러운',
    majestic: '웅장한',
    playful: '장난기 있는',
    wise: '현명한',
    swift: '날렵한',
    gentle: '온화한',
    fierce: '맹렬한',
    charming: '매력적인',
    curious: '호기심 많은',
    loyal: '충성스러운',
  };
  const koreanAnimals = {
    lion: '사자',
    tiger: '호랑이',
    elephant: '코끼리',
    bear: '곰',
    fox: '여우',
    wolf: '늑대',
    eagle: '독수리',
    dolphin: '돌고래',
    panda: '판다',
    squirrel: '다람쥐',
  };

  // 랜덤 배경색을 위한 매핑
  const bgColorCategories = [
    '3E45EC',
    'FB545B',
    'FE8A7A',
    'DABA97',
    'ACBACB',
    '00003F',
    '550D2F',
  ];

  // 랜덤 선택 헬퍼 함수
  const getRandomElement = arr => arr[Math.floor(Math.random() * arr.length)];
  const getRandomInt = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  // shop의 urlName 및 userId 생성
  const randomAdjAnimal = getRandomElement(adjectivesForAnimals);
  const randomAnimal = getRandomElement(animals);
  const urlName = `${randomAdjAnimal}${randomAnimal}store`; // 예: "adorablelionstore"
  const userId = urlName; // userId는 urlName과 동일

  // shopUrl 생성
  const shopUrl = `https://${urlName}.com`;

  // 상품 생성
  const products = [];
  const numProducts = getRandomInt(1, 8); // 1개에서 8개 사이의 상품 생성

  for (let i = 0; i < numProducts; i++) {
    const randomProductAdjEnglish = getRandomElement(adjectivesForProducts); // 영어 형용사 선택
    const randomProductAdjKorean =
      koreanAdjectivesForProducts[randomProductAdjEnglish]; // 선택된 형용사의 한글 매핑

    const randomCategoryBase = getRandomElement(productCategoriesBase);
    const randomProductEnglish = getRandomElement(
      productCategories[randomCategoryBase],
    );
    const randomProductKorean = getRandomElement(
      productCategoriesKorean[randomCategoryBase],
    );

    const productNameEnglish = `${randomProductAdjEnglish} ${randomProductEnglish}`;
    const productNameKorean = `${randomProductAdjKorean} ${randomProductKorean}`; // 한글 형용사 + 한글 상품명

    const productPrice = getRandomInt(50, 1000) * 100; // 5천원에서 10만원 사이의 랜덤 가격

    products.push({
      price: productPrice,
      imageUrl: `https://placehold.co/100x100?text=${encodeURIComponent(productNameEnglish)}`, // 영어 이름 기반의 이미지 URL 텍스트
      name: productNameKorean, // 한글 상품명 (형용사도 한글)
    });
  }

  // password 고정
  const password = 'bpt51234';

  // name (가게 이름) 생성
  const finalShopNameKorean = `${koreanAdjectives[randomAdjAnimal]} ${koreanAnimals[randomAnimal]} 가게`;

  return {
    shop: {
      imageUrl: `https://placehold.co/80x80/${getRandomElement(bgColorCategories)}/white?text=${userId}`, // 상점 이미지 플레이스홀더 (고정)
      urlName: urlName,
      shopUrl: shopUrl,
    },
    products: products,
    password: password,
    userId: userId,
    name: finalShopNameKorean, // 한글 가게 이름
  };
}

// 함수 사용 예시:
// const mockData = generateMockLinkshopData();
// console.log(JSON.stringify(mockData, null, 2));

// 100개의 예시 데이터 생성
// let requestCount = 0;
// const totalRequests = 100;

// function sendPostRequestSequentially() {
//   if (requestCount < totalRequests) {
//     const mockData = generateMockLinkshopData();
//     console.log(
//       `요청 ${requestCount + 1} 준비 중:`,
//       JSON.stringify(mockData, null, 2),
//     );

//     fetch('https://linkshop-api.vercel.app/16-5/linkshops', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(mockData),
//     })
//       .then(response => {
//         if (!response.ok) {
//           return response.json().then(errorData => {
//             console.error(`요청 ${requestCount + 1} API 오류 응답:`, errorData);
//             throw new Error(
//               `요청 ${requestCount + 1} HTTP 오류! 상태: ${response.status}, 메시지: ${JSON.stringify(errorData)}`,
//             );
//           });
//         }
//         return response.json();
//       })
//       .then(data => {
//         console.log(`요청 ${requestCount + 1} 성공:`, data);
//       })
//       .catch(error => {
//         console.error(`요청 ${requestCount + 1} 처리 중 오류 발생:`, error);
//       })
//       .finally(() => {
//         requestCount++;
//         if (requestCount < totalRequests) {
//           setTimeout(sendPostRequestSequentially, 1000);
//         } else {
//           console.log('모든 POST 요청을 완료했습니다.');
//         }
//       });
//   }
// }
// sendPostRequestSequentially(); // 첫 번째 요청 시작

//100개의 예시 데이터 삭제
// const startId = 709; // ID 직접 입력
// let i = startId - 99;

// function sendDeleteRequest() {
//   const password = 'bpt51234';

//   if (i <= startId) {
//     fetch(`https://linkshop-api.vercel.app/16-5/linkshops/${i}`, {
//       method: 'DELETE',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         currentPassword: password,
//       }),
//     })
//       .then(response => {
//         if (!response.ok) {
//           return response.json().then(errorData => {
//             console.error(`Request ${i} API 오류 응답:`, errorData);
//             throw new Error(
//               `Request ${i} HTTP 오류! 상태: ${response.status}, 메시지: ${JSON.stringify(errorData)}`,
//             );
//           });
//         }
//         return response.json();
//       })
//       .then(data => {
//         console.log(`Request ${i} 성공:`, data);
//       })
//       .catch(error => {
//         console.error(`Request ${i} 처리 중 오류 발생:`, error);
//       })
//       .finally(() => {
//         i++;
//         if (i <= startId) {
//           setTimeout(sendDeleteRequest, 1000); // 1초 후 다음 요청 스케줄
//         } else {
//           console.log('모든 삭제 요청을 완료했습니다.');
//         }
//       });
//   }
// }
// sendDeleteRequest(); // Start the first request

// 함수 사용 예시:
// const mockData = generateMockLinkshopData();
// console.log(JSON.stringify(mockData, null, 2));

// 100개의 예시 데이터 생성
// let requestCount = 0;
// const totalRequests = 5000;

// function sendPostRequestSequentially() {
//   if (requestCount < totalRequests) {
//     console.log(`좋아요 생성 요청 ${requestCount + 1} 준비 중:`);
//     const startLinkshopId = 729;
//     const lastLinkshopId = 793;

//     const linkShopId = Math.floor(
//       Math.random() * (lastLinkshopId - startLinkshopId + 1) + startLinkshopId,
//     );

//     fetch(`https://linkshop-api.vercel.app/16-5/linkshops/${linkShopId}/like`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({}),
//     })
//       .then(response => {
//         if (!response.ok) {
//           return response.json().then(errorData => {
//             console.error(`요청 ${requestCount + 1} API 오류 응답:`, errorData);
//             throw new Error(
//               `요청 ${requestCount + 1} HTTP 오류! 상태: ${response.status}, 메시지: ${JSON.stringify(errorData)}`,
//             );
//           });
//         }
//         return response.json();
//       })
//       .then(data => {
//         console.log(
//           `요청 ${requestCount + 1} 성공: 좋아요 생성된 링크샵 Id = ${linkShopId}`,
//         );
//       })
//       .catch(error => {
//         console.error(`요청 ${requestCount + 1} 처리 중 오류 발생:`, error);
//       })
//       .finally(() => {
//         requestCount++;
//         if (requestCount < totalRequests) {
//           setTimeout(sendPostRequestSequentially, 50);
//         } else {
//           console.log('모든 POST 요청을 완료했습니다.');
//         }
//       });
//   }
// }
// sendPostRequestSequentially(); // 첫 번째 요청 시작
