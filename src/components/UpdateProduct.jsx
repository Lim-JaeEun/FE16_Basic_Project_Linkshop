import styled from 'styled-components';

import { applyFontStyles } from '../styles/mixins';
import { FontTypes, ColorTypes } from '../styles/theme';
import UpdateItemCard from './UpdateItemCard';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin: 0 auto;
  max-width: 696px;

  @media (min-width: 768px) {
    max-width: 696px;
  }
`;

const ProductGroupHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;

  @media (min-width: 768px) {
    justify-content: space-between;
  }
`;

const ProductListTitle = styled.h2`
  ${applyFontStyles(
    FontTypes.SEMIBOLD16,
    ColorTypes.SECONDARY_BLACK,
  )} display: none;

  @media (min-width: 768px) {
    display: block;
  }
`;

const AddItemCard = styled.button`
  text-align: right;
  ${applyFontStyles(FontTypes.MEDIUM16, ColorTypes.PRIMARY)}
`;

const UpdateProduct = ({
  products, // 상품 데이터 배열
  onChange, // 상품 정보 변경 핸들러
  productErrors, // 상품별 에러 상태
  onBlur, // 상품 필드 blur 시 유효성 검사 핸들러
  onAddProduct, // 새 상품 추가 핸들러
  productImages, // 각 상품의 이미지 URL
  onImageChange, // 이미지 파일 변경 핸들러
}) => {
  return (
    <Container>
      <ProductGroupHeader>
        <ProductListTitle>대표 상품</ProductListTitle>
        <AddItemCard onClick={onAddProduct}>추가</AddItemCard>
      </ProductGroupHeader>
      {products.map((product, idx) => (
        <UpdateItemCard
          key={idx}
          idKey={idx}
          name={product.name}
          price={product.price}
          onChange={onChange}
          hasError={
            productErrors[idx]?.name.hasError ||
            productErrors[idx]?.price.hasError
          }
          productFieldErrors={productErrors[idx]}
          onBlur={onBlur}
          currentImage={productImages[idx]}
          onImageChange={onImageChange}
        />
      ))}
    </Container>
  );
};

export default UpdateProduct;
