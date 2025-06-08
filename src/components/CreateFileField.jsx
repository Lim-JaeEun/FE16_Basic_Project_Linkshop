import { useEffect, useState } from 'react';

import styled from 'styled-components';

import { FieldContainer, NoneValidMessage } from './CreateField';
import { uploadImage } from '../api/api';
import closeBtn from '../assets/icon/btn_close.png';
import defaultProductImg from '../assets/img/img_product.png';
import defaultShopImg from '../assets/img/img_profile_full.svg';
import { applyFontStyles } from '../styles/mixins';
import { FontTypes, ColorTypes } from '../styles/theme';
import theme from '../styles/theme';

const AddFileButton = styled.label`
  position: absolute;
  top: 13px;
  right: 0;
  width: 76px;
  height: 31px;
  border: 1px solid ${theme.colors.pri};
  border-radius: 8px;
  padding: 6px 12px;
  font-size: 14px;
  font-weight: 500;
  color: ${theme.colors.pri};
  white-space: nowrap;
`;

const STFileInput = styled.input`
  display: none;
`;

const STTitle = styled.div`
  ${applyFontStyles(FontTypes.SEMIBOLD14)};
`;

const STPlaceholder = styled.div`
  ${applyFontStyles(FontTypes.REGULAR17, ColorTypes.SECONDARY_GRAY_300)}
`;

const PreviewWrapper = styled.div`
  position: relative;
  width: 95px;
  height: 95px;
`;

const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 15px;
`;

const DeletePreviewButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  width: 16px;
  height: 16px;
  border-radius: 9999px;
  background-color: ${theme.colors.secGray300};
`;

export const ButtonX = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  filter: invert(99%) sepia(0%) saturate(0%) hue-rotate(262deg) brightness(110%)
    contrast(101%);
  width: 70%;
  height: 70%;
`;

const NONE_VALID_MESSAGE = '이미지를 업로드해 주세요.';

const FileField = ({
  placeholder,
  inputId,
  label,
  onCheckValidForm,
  onSaveProductInfo,
  setIsDisabled,
}) => {
  const [selectedFileUrl, setSelectedFileUrl] = useState(async () => {
    const defaultImg =
      label === '프로필 이미지' ? defaultShopImg : defaultProductImg;
    const res = await fetch(defaultImg);
    const blob = await res.blob();
    const file = new File([blob], 'default-image.png', { type: blob.type });
    const url = await uploadImage(file);
    setSelectedFileUrl(prev => url);
    onCheckValidForm(prev => true);
  });
  const [previewImage, setPreviewImage] = useState(() => {
    return label === '프로필 이미지' ? defaultShopImg : defaultProductImg;
  });
  const [isFileSelected, setIsFileSelected] = useState(true);

  const handleChangeImage = async e => {
    const file = e.target.files[0];
    //유효성 검사
    if (!file.type.startsWith('image/')) {
      alert('이미지 파일만 업로드할 수 있습니다.');
      return;
    }

    const url = await uploadImage(file);
    const preview = URL.createObjectURL(file);
    setPreviewImage(prev => preview);
    setSelectedFileUrl(prev => url);
    setIsFileSelected(prev => true);
    onCheckValidForm(prev => true);
    setIsDisabled(prev => false);
  };

  const handleDeleteImage = () => {
    setPreviewImage(prev => null);
    setSelectedFileUrl(prev => null);
    setIsFileSelected(prev => false);
    onCheckValidForm(prev => false);
    setIsDisabled(prev => true);
  };

  useEffect(() => {
    if (!onSaveProductInfo) {
      return;
    }
    onSaveProductInfo(prev => {
      if ('shop' in prev) {
        return {
          ...prev,
          shop: {
            ...prev.shop,
            imageUrl: selectedFileUrl,
          },
        };
      }
      return { ...prev, imageUrl: selectedFileUrl };
    });
  }, [selectedFileUrl]);

  return (
    <FieldContainer>
      <AddFileButton htmlFor={inputId}>파일 첨부</AddFileButton>
      <STFileInput
        id={inputId}
        type='file'
        accept='image/png image/jpeg'
        onChange={handleChangeImage}
      />
      <STTitle>{label}</STTitle>
      <STPlaceholder>{placeholder}</STPlaceholder>
      {isFileSelected === false ? (
        <NoneValidMessage>{NONE_VALID_MESSAGE}</NoneValidMessage>
      ) : (
        <PreviewWrapper>
          <PreviewImage src={previewImage} alt='첨부 파일 미리보기 이미지' />
          <DeletePreviewButton onClick={handleDeleteImage}>
            <ButtonX src={closeBtn} alt='업로드 이미지를 취소하는 x버튼' />
          </DeletePreviewButton>
        </PreviewWrapper>
      )}
    </FieldContainer>
  );
};

export default FileField;
