import { useEffect, useState } from 'react';

import styled, { keyframes } from 'styled-components';

const DEFAULT_PRODUCT_IMG = 'https://placehold.co/95x95';

const skeletonPulse = keyframes`
  0% { background-color: #eee; }
  50% { background-color: #ddd; }
  100% { background-color: #eee; }
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
  animation: ${skeletonPulse} 1.5s infinite ease-in-out;
  border-radius: 15px;
  z-index: 1;
  display: ${({ $isLoading }) => ($isLoading ? 'block' : 'none')};
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
        onLoad={() => setIsLoading(false)}
        onError={handleImageError}
        $isLoading={isLoading}
      />
    </ProductImgWrapper>
  );
}

export default LinkshopProductImage;
