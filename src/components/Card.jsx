import { useRef, useEffect, useState } from 'react';

import throttle from 'lodash.throttle';
import Slider from 'react-slick';
import styled, { keyframes } from 'styled-components';
import 'slick-carousel/slick/slick.css';

import LinkshopProductImage from './LinkshopProductImage';
import LinkshopProfileInfo from './LinkshopProfileInfo';
import btn_back from '../assets/icon/btn_back.png';
import { useCardData } from '../hooks/useCardsData';
import { applyFontStyles } from '../styles/mixins';
import { FontTypes } from '../styles/theme';

const fadeInShadow = keyframes`
  from {
    transform: scale(1);
    box-shadow: 0px 0px 0px rgba(0, 0, 0, 0); 
  }
  to {
    transform: scale(1.01);
    box-shadow: 0px 0px 5px 5px #eee;
  }
`;

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.secWhite100};
  border-radius: 25px;
  padding: 24px;
  &:hover {
    animation: ${fadeInShadow} 0.6s forwards;
  }
`;

const ProductImgWrapper = styled.div`
  width: 100%;
`;

const CustomSliderWrapper = styled(Slider)`
  .slick-prev,
  .slick-next {
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
      display: block;
      background-image: url(${btn_back});
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
      display: none !important;
    }
  }
`;

const TotalProducts = styled.div`
  ${({ $fontType = FontTypes.REGULAR16 }) => applyFontStyles($fontType)};
`;
function Card({ cardData }) {
  const [showAmount, setShowAmount] = useState(1);
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  const {
    card: {
      id,
      userId,
      name,
      shop: { imageUrl },
      likes,
      isLiked,
      productsCount,
      productImageSrcs,
    },
    handleToggleLike,
  } = useCardData(cardData);

  const sliderRef = useRef(null);
  const wrapperRef = useRef(null);

  const sliderSettings = {
    dots: false, // 하단에 점(dot) 내비게이션 표시
    infinite: false, // 마지막 슬라이드에서 멈춤 (false: 루프 안 함, true: 루프 함)
    speed: 500, // 슬라이드 전환 속도
    slidesToShow: showAmount, // 한 번에 보여줄 슬라이드 개수
    slidesToScroll: 1, // 한 번 스크롤/슬라이드 시 넘어갈 슬라이드 개수
    arrows: true, // 좌우 화살표 내비게이션 표시
    draggable: true,
    cssEase: 'linear',
    autoplay: false, // 초기 자동 재생은 false로 설정합니다.
    autoplaySpeed: 1000,
    pauseOnHover: true,
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

  const calcHowManySlides = (layoutWidth, itemWidth, gap) => {
    if (
      layoutWidth === null ||
      layoutWidth === undefined ||
      layoutWidth <= 0 ||
      isNaN(layoutWidth)
    ) {
      return 1; // 유효하지 않은 값일 경우 최소 1개 반환
    }
    if (itemWidth + gap <= 0) {
      return 1; // 0으로 나누기 방지
    }
    const calculatedSlides = Math.floor(
      (layoutWidth + gap) / (itemWidth + gap),
    );

    return Math.max(1, calculatedSlides); // 최소 1개 보장
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

  useEffect(() => {
    const updateListWidthAndShowAmount = () => {
      if (wrapperRef.current) {
        setShowAmount(calcHowManySlides(wrapperRef.current.offsetWidth, 95, 8));
      }
    };

    const throttleEvent = throttle(updateListWidthAndShowAmount, 200, {
      leading: true,
      trailing: true,
    });

    updateListWidthAndShowAmount();

    window.addEventListener('resize', throttleEvent);

    return () => {
      window.removeEventListener('resize', throttleEvent);
    };
  }, []);

  return (
    <CardWrapper
      {...(isLargeScreen && {
        // 1024이상 사이즈 에서만 호버시 오토플레이 & 벗어낫을지 오토플레이 해제 이벤트 적용
        onMouseEnter: handleAutoPlay,
        onMouseLeave: handleRemoveAutoPlay,
      })}
    >
      <LinkshopProfileInfo
        onToggleLike={handleToggleLike}
        id={id}
        userId={userId}
        name={name}
        imageUrl={imageUrl}
        likes={likes}
        isLiked={isLiked}
      />
      <TotalProducts>대표상품 {productsCount}</TotalProducts>
      <ProductImgWrapper
        ref={wrapperRef}
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
            <LinkshopProductImage key={index} src={src} name={name} />
          ))}
        </CustomSliderWrapper>
      </ProductImgWrapper>
    </CardWrapper>
  );
}
export default Card;
