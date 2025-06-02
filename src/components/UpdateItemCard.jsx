import styled from 'styled-components';
import { applyFontStyles } from '../styles/mixins';
import theme, { FontTypes, ColorTypes } from '../styles/theme';
import FileInput from './FileInput';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${theme.colors[ColorTypes.SECONDARY_WHITE_100]};
  border-radius: 16px;
  padding: 28px;
  gap: 30px;
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

const FormGroup = styled.div`
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

const StLabel = styled.label`
  ${applyFontStyles(FontTypes.SEMIBOLD14, ColorTypes.SECONDARY_BLACK)}
`;

const StInput = styled.input`
  ${applyFontStyles(FontTypes.REGULAR17, ColorTypes.SECONDARY_GRAY_300)}
`;

const UpdateItemCard = () => {
  return (
    <Container>
      <ImageGroup>
        <Wrapper>
          <ProductImg>상품 대표 이미지</ProductImg>
          <Description>상품 이미지를 첨부해주세요.</Description>
        </Wrapper>
        <FileInput />
      </ImageGroup>

      <FormGroup>
        <StLabel htmlFor='productName'>상품 이름</StLabel>
        <StInput id='productName' placeholder='상품 이름을 입력해 주세요.' />
      </FormGroup>

      <FormGroup>
        <StLabel htmlFor='productPrice'>상품 가격</StLabel>
        <StInput id='productPrice' placeholder='원화로 표기해 주세요.' />
      </FormGroup>
    </Container>
  );
};

export default UpdateItemCard;
