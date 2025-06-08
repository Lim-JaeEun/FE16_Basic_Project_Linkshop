import { useRef, useEffect, useState } from 'react';

import Slider from 'react-slick';
import styled, { keyframes } from 'styled-components';

import 'slick-carousel/slick/slick.css';

import LinkshopProductImage from './LinkshopProductImage';
import LinkshopProfileInfo from './LinkshopProfileInfo';
import btn_back from '../assets/icon/btn_back.png';
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
  background-color: ${({ theme }) => theme.colors.secWhite100};
  border-radius: 25px;
  padding: 24px;
  width: 100%;
  min-width: 344px;

  &.on {
    animation: ${fadeInShadow} 0.1s forwards;
    .slick-prev:before,
    .slick-next:before {
      opacity: 1;
    }
  }
  @media (min-width: 768px) {
    width: calc(100% - 8px);
    min-width: 342px;
  }
  @media (min-width: 1024px) {
    width: calc((100% - 24px) / 2);
    max-width: 589px;
  }
  // 터치 인터페이스에 hover 효과를 없애주는 분기처리
  @media (hover: hover) and (pointer: fine) {
    &:hover {
      animation: ${fadeInShadow} 0.6s forwards;
      cursor: pointer;
    }
  }
`;

const ProductImgWrapper = styled.div`
  width: 100%;
`;

const CustomSliderWrapper = styled(Slider)`
  .slick-prev, .slick-next {
    position: absolute;
    top: 50%;
    font-size: 0;
    background-color: #eee;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    z-index: 10;
    transition: .5s opacity;
    opacity: 1;
    &:before {
      content: '';
      display:block;
      background-image:url(${btn_back});
      width: 20px;
      height: 20px;
      background-repeat: no-repeat;
      background-position: -3px center;
      opacity: .2;
    }
    &:active {
      &:before {
      opacity: 1;
      }
    }
  }
  .slick-disabled {
    opacity:0;
  }
  /* 이전 버튼 */
  .slick-prev {
    left:0;
    transform: translate(-50%, -50%);
    &:before {
        background-position: 7px center;
    }
  }
  /* 다음 버튼 */
  .slick-next {
    right: 0;
    transform:translate(50%, -50%) rotate(180deg);
    &:before {
        background-position: 7px center;
    }
  }
  .slick-track {
    margin-left: inherit;
  }
  
}
`;

const TotalProducts = styled.div`
  ${({ $fontType = FontTypes.REGULAR16 }) => applyFontStyles($fontType)};
`;
function Card({
  id,
  name,
  userId,
  imageUrl,
  likes,
  isLiked,
  productsCount,
  productImageSrcs,
  onToggleLike: handleToggleLike,
}) {
  const sliderRef = useRef(null);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  const sliderSettings = {
    dots: false, // 하단에 점(dot) 내비게이션 표시
    infinite: false, // 마지막 슬라이드에서 멈춤 (false: 루프 안 함, true: 루프 함)
    speed: 500, // 슬라이드 전환 속도
    slidesToShow: 5, // 한 번에 보여줄 슬라이드 개수
    slidesToScroll: 1, // 한 번 스크롤/슬라이드 시 넘어갈 슬라이드 개수
    arrows: false, // 좌우 화살표 내비게이션 표시
    draggable: true,
    cssEase: 'linear',
    autoplay: false, // 초기 자동 재생은 false로 설정합니다.
    autoplaySpeed: 1000,
    centerPadding: '12px',
    pauseOnHover: true,
    lazyLoad: 'ondemand',
    //반응형 설정 (예시)
    responsive: [
      {
        breakpoint: 480, // 화면 너비가 480px 이하일 때
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3, // 한 번 스크롤/슬라이드 시 넘어갈 슬라이드 개수
          infinite: false,
          arrows: true,
        },
      },
      {
        breakpoint: 768, // 화면 너비가 768px 이하일 때
        settings: {
          slidesToShow: 4,
          infinite: false,
          arrows: true,
        },
      },
      {
        breakpoint: 1024, // 화면 너비가 1024px 이하일 때, (아이패드프로기준)
        settings: {
          slidesToShow: 4,
          arrows: true,
        },
      },
      {
        breakpoint: 1280, // 화면 너비가 1280px 이하일 때
        settings: {
          slidesToShow: 5,
          arrows: false,
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
  const handlerTouchStart = () => {
    setIsTouched(true);
  };
  const handlerTouchEnd = () => {
    setIsTouched(false);
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
    return () => {
      window.removeEventListener('resize', checkScreenSizeAndResetSlider); //클린업함수로 메모리 누수 방지
    };
  }, []);

  return (
    <CardWrapper
      className={isTouched ? 'on' : ''}
      {...(isLargeScreen && {
        // 1024이상 사이즈 에서만 호버시 오토플레이 & 벗어낫을지 오토플레이 해제 이벤트 적용
        onMouseEnter: handleAutoPlay,
        onMouseLeave: handleRemoveAutoPlay,
      })}
      onTouchMove={handlerTouchStart}
      onTouchEnd={handlerTouchEnd}
      onTouchCancel={handlerTouchEnd}
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
