import { useRef, useEffect, useState } from 'react';

import Slider from 'react-slick';
import styled from 'styled-components';

import 'slick-carousel/slick/slick.css';

import LinkshopProductImage from './LinkshopProductImage';
import LinkshopProfileInfo from './LinkshopProfileInfo';
import btn_back from '../assets/icon/btn_back.png';
import { applyFontStyles } from '../styles/mixins';
import { FontTypes } from '../styles/theme';

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  background-color: ${({ theme }) => theme.colors.secWhite100};
  border-radius: 25px;
  padding: 24px;
  width: 100%;
  min-width: 344px;
  @media (min-width: 768px) {
    width: calc(100% - 8px);
    min-width: 342px;
  }
  @media (min-width: 1024px) {
    width: calc((100% - 24px) / 2);
    max-width: 589px;
  }
  &:hover {
    box-shadow: 0px 0px 5px 3px #eee;
  }
`;
const ProductImgWrapper = styled.div`
  width: 100%;
`;

const CustomSliderWrapper = styled(Slider)`
  padding-right: 30px;
  .slick-prev, .slick-next {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    font-size: 0;
  }
  .slick-next.slick-disabled {
    background-color: red;

  }
  /* 이전 버튼 */
  .slick-prev {
    display: none important;
  }
  /* 다음 버튼 */
  .slick-next {
    right: -5px;
    background-color: #eee;
    width: 30px;
    height: 30px;
    border-radius: 50%;

    &:before {
      content: '';
      display:block;
      background-image:url(${btn_back});
      width: 20px;
      height: 20px;
      background-repeat: no-repeat;
      background-position: -3px center;
      transform: rotate(180deg);
    }
  }
  .slick-track {
    margin-left: inherit;
  }
   @media (min-width: 1024px) {
    padding-right: 0;
    .slick-next {
      display:none !important;
    }
  }
}
`;
const TotalProducts = styled.div`
  ${({ $fontType = FontTypes.REGULAR16 }) => applyFontStyles($fontType)};
`;
function Card({
  onClick: handleClick,
  name,
  userId,
  imageUrl,
  likes,
  isLiked,
  productsCount,
  productImageSrcs,
}) {
  const sliderRef = useRef(null);
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  const sliderSettings = {
    dots: false, // 하단에 점(dot) 내비게이션 표시
    infinite: false, // 마지막 슬라이드에서 멈춤 (false: 루프 안 함, true: 루프 함)
    speed: 500, // 슬라이드 전환 속도
    slidesToShow: 5, // 한 번에 보여줄 슬라이드 개수
    slidesToScroll: 1, // 한 번 스크롤/슬라이드 시 넘어갈 슬라이드 개수
    arrows: true, // 좌우 화살표 내비게이션 표시
    draggable: true,
    cssEase: 'linear',
    autoplay: false, // 초기 자동 재생은 false로 설정합니다.
    autoplaySpeed: 1000,
    centerPadding: '12px',
    pauseOnHover: true,
    //반응형 설정 (예시)
    responsive: [
      {
        breakpoint: 480, // 화면 너비가 768px 이하일 때
        settings: {
          slidesToShow: 3,
          infinite: false,
        },
      },
      {
        breakpoint: 768, // 화면 너비가 768px 이하일 때
        settings: {
          slidesToShow: 4,
          infinite: false,
        },
      },
      {
        breakpoint: 1024, // 화면 너비가 480px 이하일 때
        settings: {
          slidesToShow: 5,
          infinite: false,
        },
      },
    ],
  };

  const handleAutoPlay = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPlay(); // slickPlay() 메서드 호출
    }
  };

  // 마우스 이탈 시 자동 재생 정지
  const handleRemoveAutoPlay = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPause(); // slickPause() 메서드 호출
    }
  };
  useEffect(() => {
    const checkScreenSizeAndResetSlider = () => {
      setIsLargeScreen(window.innerWidth >= 768);
      // 슬라이더가 마운트되어 있으면 첫 번째 요소로 돌아가기
      if (sliderRef.current) {
        sliderRef.current.slickGoTo(0, true); // 0번째 슬라이드로 이동, true는 즉시 전환
      }
    };
    checkScreenSizeAndResetSlider();
    window.addEventListener('resize', checkScreenSizeAndResetSlider);
  }, []); // ⭐️ 의존성 배열은 빈 배열: 컴포넌트 마운트 시 한 번만 실행되도록 합니다.

  return (
    <CardWrapper
      {...(isLargeScreen && {
        // 1024이상 사이즈 에서만 호버시 오토플레이 & 벗어낫을지 오토플레이 해제 이벤트 적용
        onMouseEnter: handleAutoPlay,
        onMouseLeave: handleRemoveAutoPlay,
      })}
    >
      <LinkshopProfileInfo
        onClick={handleClick}
        userId={userId}
        name={name}
        imageUrl={imageUrl}
        likes={likes}
        isLiked={isLiked}
      />
      <TotalProducts>대표상품 {productsCount}</TotalProducts>
      <ProductImgWrapper
        {...(isLargeScreen && {
          // 슬라이드로 돌아가는 상품이미지에 마우스가 hover됐을 시 오토플레이 멈추고 벗어나면 재실행
          onMouseMove: handleRemoveAutoPlay,
          onMouseLeave: handleAutoPlay,
        })}
      >
        <CustomSliderWrapper ref={sliderRef} {...sliderSettings}>
          {productImageSrcs.map((src, index) => (
            // 각 LinkshopProductImage는 Slider의 자식으로 들어갑니다.
            // Slider는 각 자식을 감싸는 div를 자동으로 생성합니다.
            <div key={index}>
              {/* Slider의 자식은 반드시 div로 감싸져야 합니다. */}
              <LinkshopProductImage src={src} name={name} />
            </div>
          ))}
        </CustomSliderWrapper>
      </ProductImgWrapper>
    </CardWrapper>
  );
}
export default Card;
