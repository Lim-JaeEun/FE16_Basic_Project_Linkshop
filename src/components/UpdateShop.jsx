import styled from 'styled-components';
import { applyFontStyles } from '../styles/mixins';
import theme, { FontTypes, ColorTypes } from '../styles/theme';
import FileInput from './FileInput';
import closeEyeIcon from '../assets/icon/btn_visibility_off.svg';
import openEyeIcon from '../assets/icon/btn_visibility_on.svg';

const DEFAULT_EYE_SIZE = '20px';

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

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const ShopImg = styled.div`
  ${applyFontStyles(FontTypes.SEMIBOLD14, ColorTypes.SECONDARY_BLACK)}
`;

const Description = styled.div`
  ${applyFontStyles(FontTypes.REGULAR17, ColorTypes.SECONDARY_GRAY_300)}
`;

const StLabel = styled.label`
  ${applyFontStyles(FontTypes.SEMIBOLD14, ColorTypes.SECONDARY_BLACK)}
`;

const StInput = styled.input`
  ${applyFontStyles(FontTypes.REGULAR17, ColorTypes.SECONDARY_GRAY_300)};
`;

const CloseEyeIcon = styled.img`
  aspect-ratio: 1/1;
`;

const UpdateShop = () => {
  return (
    <Container>
      <ImageGroup>
        <Wrapper>
          <ShopImg>상품 대표 이미지</ShopImg>
          <Description>상품 이미지를 첨부해주세요.</Description>
        </Wrapper>
        <FileInput />
      </ImageGroup>

      <FormGroup>
        <StLabel htmlFor='name'>이름</StLabel>
        <StInput id='name' placeholder='표시하고 싶은 이름을 적어 주세요.' />
      </FormGroup>

      <FormGroup>
        <StLabel htmlFor='url'>Url</StLabel>
        <StInput id='url' placeholder='Url을 입력해주세요.' />
      </FormGroup>

      <ImageGroup>
        <Wrapper>
          <StLabel htmlFor='userId'>유저 ID</StLabel>
          <StInput id='userId' placeholder='유저 ID를 입력해주세요.' />
        </Wrapper>
        <CloseEyeIcon
          src={closeEyeIcon}
          alt='유저ID 가리기 아이콘'
          width={DEFAULT_EYE_SIZE}
        />
      </ImageGroup>

      <ImageGroup>
        <Wrapper>
          <StLabel htmlFor='password'>비밀번호</StLabel>
          <StInput id='password' placeholder='비밀번호를 입력해주세요.' />
        </Wrapper>
        <CloseEyeIcon
          src={closeEyeIcon}
          alt='비밀번호 가리기 아이콘'
          width={DEFAULT_EYE_SIZE}
        />
      </ImageGroup>
    </Container>
  );
};

export default UpdateShop;
