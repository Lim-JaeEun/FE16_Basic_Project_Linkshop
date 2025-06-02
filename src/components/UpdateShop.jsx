import styled from 'styled-components';
import { applyFontStyles } from '../styles/mixins';
import theme, { FontTypes, ColorTypes } from '../styles/theme';
import FileInput from './FileInput';
import closeEye from '../assets/icon/btn_visibility_off.svg';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${theme.colors[ColorTypes.SECONDARY_WHITE_100]};
  border-radius: 16px;
  padding: 28px;
  gap: 30px;
  margin: 75px auto;
  max-width: 468px;
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

const CloseEyeIcon = styled.img`
  width: 24px;
  height: 24px;
  margin-left: 8px;
`;

const UpdateShop = () => {
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
        <Label>이름</Label>
        <Description>표시하고 싶은 이름을 적어 주세요.</Description>
      </FormGroup>

      <FormGroup>
        <Label>Url</Label>
        <Description>Url을 입력해주세요.</Description>
      </FormGroup>

      <ImageGroup>
        <Wrapper>
          <Label>유저 ID</Label>
          <Description>유저 ID를 입력해주세요.</Description>
        </Wrapper>
        <CloseEyeIcon src={closeEye} alt='유저ID 가리기 아이콘' />
      </ImageGroup>

      <ImageGroup>
        <Wrapper>
          <Label>비밀번호</Label>
          <Description>비밀번호를 입력해주세요.</Description>
        </Wrapper>
        <CloseEyeIcon src={closeEye} alt='비밀번호 가리기 아이콘' />
      </ImageGroup>
    </Container>
  );
};

export default UpdateShop;
