import styled from 'styled-components';

import { applyFontStyles } from '../styles/mixins';
import theme, { FontTypes, ColorTypes } from '../styles/theme';

import FileField from './FileField';
import Field from './Field';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${theme.colors[ColorTypes.SECONDARY_WHITE_100]};
  border-radius: 16px;
  padding: 28px;
  gap: 30px;

  border: 1px solid
    ${({ hasError }) =>
      hasError ? theme.colors[ColorTypes.ERROR] : 'transparent'};
`;

const ImageGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ProductImg = styled.div`
  ${applyFontStyles(FontTypes.SEMIBOLD14, ColorTypes.SECONDARY_BLACK)}
`;

const Description = styled.div`
  ${applyFontStyles(FontTypes.REGULAR17, ColorTypes.SECONDARY_GRAY_300)}
`;

const UpdateItemCard = ({
  name,
  price,
  onChange,
  idKey,
  hasError,
  onBlur,
  productFieldErrors,
}) => {
  return (
    <Container hasError={hasError}>
      <ImageGroup>
        <Wrapper>
          <ProductImg>상품 대표 이미지</ProductImg>
          <Description>상품 이미지를 첨부해주세요.</Description>
        </Wrapper>
        <FileField />
      </ImageGroup>

      <Field
        type='text'
        inputId={`productName${idKey}`}
        label='상품 이름'
        placeholder='상품 이름을 입력해 주세요.'
        value={name}
        onChange={e => onChange?.(idKey, 'name', e.target.value)}
        hasError={productFieldErrors.name.hasError}
        errorMessage={productFieldErrors.name.message}
        onBlur={() => onBlur(idKey, 'name', name)}
      />
      <Field
        type='number'
        inputId={`productPrice${idKey}`}
        label='상품 가격'
        placeholder='원화로 표기해 주세요.'
        value={price}
        onChange={e => onChange?.(idKey, 'price', e.target.value)}
        hasError={productFieldErrors.price.hasError}
        errorMessage={productFieldErrors.price.message}
        onBlur={() => onBlur(idKey, 'price', price.toString())}
      />
    </Container>
  );
};

export default UpdateItemCard;
