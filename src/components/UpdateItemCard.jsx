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

const Wrapper = styled.div``;

const FormGroup = styled.div``;

const Label = styled.div`
  ${applyFontStyles(FontTypes.SEMIBOLD14, ColorTypes.SECONDARY_BLACK)}
`;

const Description = styled.div`
  ${applyFontStyles(FontTypes.REGULAR17, ColorTypes.SECONDARY_GRAY_300)}
`;

const UpdateItemCard = () => {
  return (
    <Container>
      <ImageGroup>
        <Wrapper>
          <Label>상품 대표 이미지</Label>
          <Description>상품 이미지를 첨부해주세요.</Description>
        </Wrapper>
        <FileInput />
      </ImageGroup>

      <FormGroup>
        <Label>상품 이름</Label>
        <Description>상품 이름을 입력해 주세요.</Description>
      </FormGroup>

      <FormGroup>
        <Label>상품 가격</Label>
        <Description>원화로 표기해 주세요.</Description>
      </FormGroup>
    </Container>
  );
};

export default UpdateItemCard;
