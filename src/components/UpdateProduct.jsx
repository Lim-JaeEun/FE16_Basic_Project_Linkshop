import { applyFontStyles } from '../styles/mixins';
import { FontTypes, ColorTypes } from '../styles/theme';

import styled from 'styled-components';
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
  ${applyFontStyles(FontTypes.SEMIBOLD16, ColorTypes.SECONDARY_BLACK)}
  display: none;

  @media (min-width: 768px) {
    display: block;
  }
`;

const AddItemCard = styled.button`
  text-align: right;
  ${applyFontStyles(FontTypes.MEDIUM16, ColorTypes.PRIMARY)}
`;

const UpdateProduct = ({ products, onChange, productErrors, onBlur }) => {
  return (
    <Container>
      <ProductGroupHeader>
        <ProductListTitle>대표 상품</ProductListTitle>
        <AddItemCard>추가</AddItemCard>
      </ProductGroupHeader>
      {products.map((product, idx) => (
        <UpdateItemCard
          key={idx}
          idKey={idx}
          name={product.name}
          price={product.price}
          onChange={onChange}
          hasError={
            productErrors[idx]
              ? productErrors[idx].name.hasError ||
                productErrors[idx].price.hasError
              : false
          }
          productFieldErrors={productErrors[idx]}
          onBlur={onBlur}
        />
      ))}
    </Container>
  );
};

export default UpdateProduct;
