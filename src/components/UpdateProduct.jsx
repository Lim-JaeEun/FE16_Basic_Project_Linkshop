import { applyFontStyles } from '../styles/mixins';
import { FontTypes, ColorTypes } from '../styles/theme';

import styled from 'styled-components';
import UpdateItemCard from './UpdateItemCard';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin: 0 auto;
  max-width: 500px;

  @media (min-width: 768px) {
    max-width: 696px;
  }
`;

const AddItemCard = styled.button`
  text-align: right;
  top: 16px;
  right: 16px;

  ${applyFontStyles(FontTypes.MEDIUM16, ColorTypes.PRIMARY)}
`;

const UpdateProduct = ({ products, onChange }) => {
  return (
    <Container>
      <AddItemCard>추가</AddItemCard>
      {products.map((product, idx) => (
        <UpdateItemCard
          key={idx}
          idKey={idx}
          // hasError={hasError}
          name={product.name}
          price={product.price}
          onChange={onChange}
        />
      ))}
    </Container>
  );
};

export default UpdateProduct;
