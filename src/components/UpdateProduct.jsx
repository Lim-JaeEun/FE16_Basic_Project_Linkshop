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
`;

const AddProduct = styled.button`
  text-align: right;
  top: 16px;
  right: 16px;

  ${applyFontStyles(FontTypes.MEDIUM16, ColorTypes.PRIMARY)}
`;

const UpdateProduct = () => {
  return (
    <Container>
      <AddProduct>추가</AddProduct>
      <UpdateItemCard />
      <UpdateItemCard />
    </Container>
  );
};

export default UpdateProduct;
