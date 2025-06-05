import { useState } from 'react';
import styled from 'styled-components';

import { applyFontStyles } from '../styles/mixins';
import theme, { FontTypes, ColorTypes } from '../styles/theme';

import FileField from './FileField';
import Field from './Field';
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
  max-width: 500px;

  border: 1px solid
    ${({ hasError }) =>
      hasError ? theme.colors[ColorTypes.ERROR] : 'transparent'};

  @media (min-width: 768px) {
    max-width: 696px;
  }
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

const ShopImg = styled.div`
  ${applyFontStyles(FontTypes.SEMIBOLD14, ColorTypes.SECONDARY_BLACK)}
`;

const Description = styled.div`
  ${applyFontStyles(FontTypes.REGULAR17, ColorTypes.SECONDARY_GRAY_300)}
`;

const CloseEyeIcon = styled.img`
  aspect-ratio: 1/1;
  cursor: pointer;
`;

const UpdateShop = ({ idKey, hasError, formData, onChange }) => {
  const [openPassword, setOpenPassword] = useState(false);

  const togglePassword = () => {
    setOpenPassword(prev => !prev);
  };

  return (
    <Container hasError={hasError}>
      <ImageGroup>
        <Wrapper>
          <ShopImg>상품 대표 이미지</ShopImg>
          <Description>상품 이미지를 첨부해주세요.</Description>
        </Wrapper>
        <FileField />
      </ImageGroup>

      <Field
        type='text'
        inputId={`name${idKey}`}
        label='이름'
        placeholder='표시하고 싶은 이름을 적어 주세요.'
        hasError={hasError}
        value={formData.name}
        onChange={onChange}
      />

      <Field
        type='url'
        inputId={`url${idKey}`}
        label='Url'
        placeholder='Url을 입력해주세요.'
        hasError={hasError}
        value={formData.url}
        onChange={onChange}
      />

      <Field
        type='text'
        inputId={`userId${idKey}`}
        label='유저 ID'
        placeholder='유저 ID를 입력해주세요.'
        hasError={hasError}
        value={formData.userId}
        onChange={onChange}
      />

      <ImageGroup>
        <Field
          type={openPassword ? 'text' : 'password'}
          inputId={`password${idKey}`}
          label='비밀번호'
          placeholder='비밀번호를 입력해주세요.'
          hasError={hasError}
          value={formData.password}
          onChange={onChange}
        />
        <CloseEyeIcon
          src={openPassword ? openEyeIcon : closeEyeIcon}
          alt='비밀번호 토글 아이콘'
          width={DEFAULT_EYE_SIZE}
          onClick={togglePassword}
        />
      </ImageGroup>
    </Container>
  );
};

export default UpdateShop;
