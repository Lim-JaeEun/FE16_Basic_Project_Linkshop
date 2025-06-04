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

const AddItemCard = styled.button`
  text-align: right;
  top: 16px;
  right: 16px;

  ${applyFontStyles(FontTypes.MEDIUM16, ColorTypes.PRIMARY)}
`;

const UpdateProduct = ({ hasError }) => {
  return (
    <Container>
      <AddItemCard>추가</AddItemCard>
      <UpdateItemCard hasError={hasError} />
      <UpdateItemCard hasError={hasError} />
    </Container>
  );
};

export default UpdateProduct;
