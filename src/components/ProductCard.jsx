// import React from 'react';

import styled from 'styled-components';

import LinkshopProductImage from './LinkshopProductImage'; // 경로 확인
import { applyFontStyles } from '../styles/mixins'; // 경로 확인
import { FontTypes } from '../styles/theme'; // 경로 확인

const StyledProductItemCard = styled.div`
  display: flex;
  align-items: center;
  background-color: #fafafb;
  border-radius: 24px;
  padding: 16px;
  gap: 16px;

  @media (min-width: 1024px) {
    /* 데스크톱 그리드 아이템으로서의 스타일 */
  }
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
  min-width: 0; /* flex 아이템 내용이 넘칠 때 중요 */
`;

const ProductName = styled.h3`
  ${applyFontStyles(
    FontTypes.MEDIUM17,
  )} /* 예시 FontType, 실제 정의된 값 사용 */
  color: #1c1c1e;
  /* font-weight: 500; // applyFontStyles에 포함되어 있을 수 있음 */
  margin: 0 0 8px 0;
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;

  @media (min-width: 768px) {
    /* font-size: 16px; // applyFontStyles 사용 시 여기서 직접 설정 불필요할 수 있음 */
  }
`;

const ProductPrice = styled.p`
  font-size: 16px; /* 필요시 FontType 사용 */
  font-weight: bold;
  color: #000000;

  @media (min-width: 768px) {
    font-size: 17px;
  }
`;

// 가격 포맷팅 함수
const formatPrice = price => {
  if (price === null || price === undefined) return '';
  return `₩${price.toLocaleString()}`;
};

const ProductCard = ({ product }) => {
  if (!product) return null;

  return (
    <StyledProductItemCard>
      <LinkshopProductImage src={product.imageUrl} name={product.productName} />
      <ProductInfo>
        <ProductName>{product.productName}</ProductName>
        <ProductPrice>{formatPrice(product.price)}</ProductPrice>
      </ProductInfo>
    </StyledProductItemCard>
  );
};

export default ProductCard;
