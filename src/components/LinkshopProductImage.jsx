import { useEffect, useState } from 'react';

import styled, { keyframes } from 'styled-components';

const DEFAULT_PRODUCT_IMG = 'https://placehold.co/95x95';

const skeletonPulse = keyframes`
  0% { filter: brightness(1); }
  50% { filter: brightness(0.9); }
  100% { filter: brightness(1); }
`;

const ProductImgWrapper = styled.div`
  width: 95px;
  height: 95px;
  border-radius: 15px;
  overflow: hidden;
  position: relative;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  aspect-ratio: 1/1;
  transition:
    filter 0.4s ease,
    opacity 0.4s ease;
  filter: ${({ $isLoading }) => ($isLoading ? 'blur(10px)' : 'none')};
  opacity: ${({ $isLoading }) => ($isLoading ? 0.6 : 1)};
`;

const SkeletonOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #eee;
  animation: ${skeletonPulse} 1.5s infinite ease-in-out;
  border-radius: 15px;
  z-index: 1;
  opacity: ${({ $isLoading }) => ($isLoading ? 1 : 0)};
  transition: opacity 0.4s ease;
  pointer-events: none;
`;

function LinkshopProductImage({ src, alt }) {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setCurrentSrc(src);
    setIsLoading(true); // 새 src가 들어오면 로딩 다시 시작
  }, [src]);

  const handleImageError = () => {
    if (currentSrc !== DEFAULT_PRODUCT_IMG) {
      setCurrentSrc(DEFAULT_PRODUCT_IMG);
    }
  };

  return (
    <ProductImgWrapper>
      <SkeletonOverlay $isLoading={isLoading} />
      <ProductImage
        src={currentSrc || DEFAULT_PRODUCT_IMG}
        alt={alt}
        width='95'
        height='95'
        loading='lazy'
        onLoad={() => {
          // 캐시문제로 상세페이지에서 상품이미지가 안뜨는 현상발생 => 타임아웃으로 수정완료
          setTimeout(() => {
            setIsLoading(false);
          }, 100);
        }}
        onError={handleImageError}
        $isLoading={isLoading}
      />
    </ProductImgWrapper>
  );
}

export default LinkshopProductImage;
