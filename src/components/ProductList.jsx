// import React from 'react';

import styled from 'styled-components';

import ProductCard from './ProductCard'; // ProductCard 컴포넌트 import

const StyledProductListSection = styled.section`
  padding: 0 16px 16px;
  margin-top: 24px;
`;

const SectionTitle = styled.h2`
  font-size: 16px;
  font-weight: 600;
  color: #2c2c2e;
  margin-bottom: 16px;
  padding: 0 16px;
`;

const StyledProductList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  @media (min-width: 1024px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    padding: 0;
  }
`;

const ProductList = ({ title, products }) => {
  return (
    <StyledProductListSection>
      <SectionTitle>{title}</SectionTitle>
      <StyledProductList>
        {products.map(product => (
          <ProductCard key={product.productId} product={product} />
        ))}
        {/* {products.length === 0 && <p>등록된 상품이 없습니다.</p>} */}
      </StyledProductList>
    </StyledProductListSection>
  );
};

export default ProductList;
