// components/LinkshopProductImage.jsx
import { useEffect, useState } from 'react'; // useState 훅 import

import styled from 'styled-components';

const DEFAULT_PRODUCT_IMG = 'https://placehold.co/95x95';
const ProductImgWrapper = styled.div`
  width: 95px;
  height: 95px;
  overflow: hidden;
  border-radius: 15px;
`;
const ProductImage = styled.img`
  width: 100%;
  height: 100%;

  object-fit: cover;
  object-position: center;
  aspect-ratio: 1/1;
`;

function LinkshopProductImage({ src, alt }) {
  const [currentSrc, setCurrentSrc] = useState(src); // 이미지 URL을 관리할 상태

  useEffect(() => {
    setCurrentSrc(src);
  }, [src]);

  const handleImageError = () => {
    // 현재 이미지가 이미 기본 이미지라면 더 이상 변경하지 않음
    if (currentSrc !== DEFAULT_PRODUCT_IMG) {
      setCurrentSrc(DEFAULT_PRODUCT_IMG); // 기본 이미지로 교체
    }
  };

  return (
    <ProductImgWrapper>
      <ProductImage
        src={currentSrc || DEFAULT_PRODUCT_IMG} // currentSrc가 없거나 null이면 기본 이미지 사용
        alt={alt}
        onError={handleImageError} // 이미지 로드 실패 시 handleImageError 함수 호출
      />
    </ProductImgWrapper>
  );
}

export default LinkshopProductImage;
