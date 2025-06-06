import { useState } from 'react';
import styled from 'styled-components';

import { applyFontStyles } from '../styles/mixins';
import theme, { FontTypes, ColorTypes } from '../styles/theme';

import FileField from './FileField';
import Field from './Field';
import closeEyeIcon from '../assets/icon/btn_visibility_off.svg';
import openEyeIcon from '../assets/icon/btn_visibility_on.svg';

const DEFAULT_EYE_SIZE = '20px';

const ShopSectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 696px;
  margin: 75px auto;

  @media (min-width: 768px) {
    gap: 16px;
  }
`;

const ShopTitle = styled.h2`
  ${applyFontStyles(FontTypes.SEMIBOLD16, ColorTypes.SECONDARY_BLACK)};
  display: none;
  text-align: left;

  @media (min-width: 768px) {
    display: block;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${theme.colors[ColorTypes.SECONDARY_WHITE_100]};
  border-radius: 16px;
  padding: 28px;
  gap: 30px;
  width: 100%;

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

const UpdateShop = ({ formData, onChange, formErrors, onBlur }) => {
  // 비밀번호 가시성 상태 관리
  const [openPassword, setOpenPassword] = useState(false);

  // 비밀번호 가시성 토글 함수
  const togglePassword = () => {
    setOpenPassword(prev => !prev);
  };

  const containerHasError = Object.values(formErrors).some(
    error => error.hasError,
  );

  return (
    <ShopSectionWrapper>
      <ShopTitle>내 쇼핑몰</ShopTitle>
      <Container hasError={containerHasError}>
        <ImageGroup>
          <Wrapper>
            <ShopImg>상품 대표 이미지</ShopImg>
            <Description>상품 이미지를 첨부해주세요.</Description>
          </Wrapper>
          <FileField />
        </ImageGroup>

        <Field
          type='text'
          inputId='name'
          label='이름'
          placeholder='표시하고 싶은 이름을 적어 주세요.'
          value={formData.name}
          onChange={onChange}
          hasError={formErrors.name.hasError}
          errorMessage={formErrors.name.message}
          onBlur={() => onBlur('name', formData.name)}
        />

        <Field
          type='url'
          inputId='url'
          label='Url'
          placeholder='Url을 입력해주세요.'
          value={formData.url}
          onChange={onChange}
          hasError={formErrors.url.hasError}
          errorMessage={formErrors.url.message}
          onBlur={() => onBlur('url', formData.url)}
        />

        <Field
          type='text'
          inputId='userId'
          label='유저 ID'
          placeholder='유저 ID를 입력해주세요.'
          value={formData.userId}
          onChange={onChange}
          hasError={formErrors.userId.hasError}
          errorMessage={formErrors.userId.message}
          onBlur={() => onBlur('userId', formData.userId)}
        />

        <ImageGroup>
          <Field
            type={openPassword ? 'text' : 'password'}
            inputId='password'
            label='비밀번호'
            placeholder='비밀번호를 입력해주세요.'
            value={formData.password}
            onChange={onChange}
            hasError={formErrors.password.hasError}
            errorMessage={formErrors.password.message}
            onBlur={() => onBlur('password', formData.password)}
          />
          <CloseEyeIcon
            src={openPassword ? openEyeIcon : closeEyeIcon}
            alt='비밀번호 토글 아이콘'
            width={DEFAULT_EYE_SIZE}
            onClick={togglePassword}
          />
        </ImageGroup>
      </Container>
    </ShopSectionWrapper>
  );
};

export default UpdateShop;
