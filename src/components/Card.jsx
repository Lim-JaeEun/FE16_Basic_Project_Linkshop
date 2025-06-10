import { useState } from 'react';

import Slider from 'react-slick';
import styled, { keyframes } from 'styled-components';

import 'slick-carousel/slick/slick.css';
import LinkshopProductImage from './LinkshopProductImage';
import LinkshopProfileInfo from './LinkshopProfileInfo';
import btn_back from '../assets/icon/btn_back.png';
import { useCardData } from '../hooks/useCardsData';
import { useIsLargeScreen } from '../hooks/useIsLargeScreen';
import { useSlider } from '../hooks/useProductSlider';
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

  &.on {
    animation: ${fadeInShadow} 0.1s forwards;
    .slick-prev:before,
    .slick-next:before {
      opacity: 1;
    }
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
  .slick-prev,
  .slick-next {
    position: absolute;
    top: 50%;
    font-size: 0;
    background-color: #eee;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    z-index: 10;
    transition: 0.5s opacity;
    opacity: 1;
    &:before {
      content: '';
      display: block;
      background-image: url(${btn_back});
      width: 20px;
      height: 20px;
      background-repeat: no-repeat;
      background-position: -3px center;
    }
    &:active {
      &:before {
        opacity: 1;
      }
    }
  }

  .slick-disabled {
    opacity: 0;
  }
  /* 이전 버튼 */
  .slick-prev {
    left: 0;
    transform: translate(-50%, -50%);
    &:before {
      background-position: 7px center;
    }
  }
  /* 다음 버튼 */
  .slick-next {
    right: 0;
    transform: translate(50%, -50%) rotate(180deg);
    &:before {
      background-position: 7px center;
    }
  }
  .slick-track {
    margin: 0;
  }
`;

const TotalProducts = styled.div`
  ${({ $fontType = FontTypes.REGULAR16 }) => applyFontStyles($fontType)};
`;
function Card({ cardData }) {
  const isLargeScreen = useIsLargeScreen(768);
  const [isTouched, setIsTouched] = useState(false); //모바일, 태블릿모드 감지
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
  const {
    sliderRef,
    wrapperRef,
    sliderSettings,
    handleAutoPlay,
    handleRemoveAutoPlay,
  } = useSlider(isLargeScreen);

  const handlerTouchStart = () => {
    setIsTouched(true);
  };
  const handlerTouchEnd = () => {
    setIsTouched(false);
  };

  return (
    <CardWrapper
      className={!isLargeScreen && isTouched ? 'on' : ''}
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
