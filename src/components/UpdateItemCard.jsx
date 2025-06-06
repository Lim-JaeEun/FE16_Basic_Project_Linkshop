import styled from 'styled-components';
import { useState, useEffect } from 'react';

import { applyFontStyles } from '../styles/mixins';
import theme, { FontTypes, ColorTypes } from '../styles/theme';

import FileField from './FileField';
import Field from './Field';
import DeleteImg from '../assets/icon/btn_close.png';
import {
  TextGroup,
  Wrapper,
  Description,
  PreviewGroup,
  ImgGroup,
  PreviewImg,
  DeleteBtn,
  ButtonX,
} from './UpdateShop';

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

const ProductImg = styled.div`
  ${applyFontStyles(FontTypes.SEMIBOLD14, ColorTypes.SECONDARY_BLACK)}
`;

const UpdateItemCard = ({
  name,
  price,
  onChange,
  idKey,
  hasError,
  onBlur,
  productFieldErrors,
  currentImage,
  onImageChange,
}) => {
  const [localItemImageUrl, setLocalItemImageUrl] = useState(null);
  const [displayImageUrl, setDisplayImageUrl] = useState(currentImage);

  // currentImage 또는 localItemImageUrl이 변경될 때 displayImageUrl 업데이트
  useEffect(() => {
    setDisplayImageUrl(localItemImageUrl || currentImage);
  }, [currentImage, localItemImageUrl]);

  // 컴포넌트 언마운트 또는 localItemImageUrl 변경 시 이전 로컬 URL 해제
  useEffect(() => {
    return () => {
      if (localItemImageUrl) {
        URL.revokeObjectURL(localItemImageUrl);
      }
    };
  }, [localItemImageUrl]);

  /** 파일 선택 핸들러 */
  const handleFileSelect = async file => {
    if (localItemImageUrl) {
      URL.revokeObjectURL(localItemImageUrl);
    }
    if (file) {
      const newLocalUrl = URL.createObjectURL(file);
      setLocalItemImageUrl(newLocalUrl);
      onImageChange(idKey, file);
      onBlur(idKey, 'productImage', newLocalUrl);
    } else {
      setLocalItemImageUrl(null);
      onImageChange(idKey, null);
      onBlur(idKey, 'productImage', null);
    }
  };

  /** 이미지 삭제 핸들러 */
  const handleDeleteImage = () => {
    if (localItemImageUrl) {
      URL.revokeObjectURL(localItemImageUrl);
    }
    setLocalItemImageUrl(null);
    onImageChange(idKey, null);
    onBlur(idKey, 'productImage', null);
  };

  return (
    <Container hasError={hasError}>
      <PreviewGroup>
        <TextGroup>
          <Wrapper>
            <ProductImg>상품 대표 이미지</ProductImg>
            <Description>상품 이미지를 첨부해주세요.</Description>
          </Wrapper>
          <FileField onFileChange={handleFileSelect} />
        </TextGroup>
        {displayImageUrl && (
          <ImgGroup>
            <PreviewImg src={displayImageUrl} alt='상품 이미지' />
            <DeleteBtn onClick={handleDeleteImage}>
              <ButtonX src={DeleteImg} alt='이미지 삭제' />
            </DeleteBtn>
          </ImgGroup>
        )}
      </PreviewGroup>

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
