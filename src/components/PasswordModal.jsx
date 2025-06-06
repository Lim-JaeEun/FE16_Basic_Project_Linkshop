import { useState } from 'react';

import styled, { css } from 'styled-components';

import CloseIcon from '../assets/icon/btn_close.png'; // 닫기 아이콘 import (경로 확인)

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  position: relative; /* 닫기 버튼의 위치 기준점 */
  background-color: white;
  padding: 32px 24px 24px;
  border-radius: 16px; /* 이미지와 유사하게 변경 */
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
  width: 360px; /* 너비 조정 */
  max-width: 90%;
  display: flex;
  flex-direction: column;
  gap: 12px; /* 내부 요소 간격 조정 */
`;

const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  line-height: 1;
`;

const ModalTitle = styled.h2`
  margin: 0;
  font-size: 20px; /* 크기 조정 */
  font-weight: 700; /* 굵게 */
  text-align: center;
  color: #333;
`;

const DescriptionText = styled.p`
  margin: 4px 0 12px 0; /* 위아래 간격 조정 */
  font-size: 14px;
  color: #666;
  text-align: center;
  white-space: pre-wrap; /* 줄바꿈 적용 */
  line-height: 1.5;
`;

const InputWrapper = styled.div`
  width: 100%;
`;

const InputField = styled.input`
  width: 100%;
  padding: 12px 10px;
  border: 1px solid #ddd; /* 테두리 색상 연하게 */
  border-radius: 8px; /* radius 조정 */
  font-size: 16px;
  box-sizing: border-box;
  transition: border-color 0.2s;

  &:focus {
    border-color: #555; /* 포커스 시 테두리 색상 예시 */
    outline: none;
  }

  ${({ hasError }) =>
    hasError &&
    css`
      border-color: #e53e3e;
      &:focus {
        border-color: #e53e3e;
      }
    `}
`;

const ErrorText = styled.p`
  color: #e53e3e;
  font-size: 13px;
  margin: 8px 0 0 4px; /* 위치 조절 */
  text-align: left;
`;

// 버튼은 하나만 있으므로 ButtonGroup 불필요, 버튼 스타일만 수정
const SubmitButton = styled.button`
  width: 100%;
  padding: 14px 16px; /* 패딩 조정 */
  margin-top: 8px;
  border-radius: 8px; /* radius 조정 */
  border: none;
  font-size: 16px;
  font-weight: 600; /* 굵게 */
  cursor: pointer;
  transition: background-color 0.2s;
  background-color: #3e45ec;
  color: white;

  &:hover {
    opacity: 0.85;
  }
`;

const PasswordModal = ({
  isOpen,
  onClose,
  onSubmit,
  error,
  title, // prop 추가
  description, // prop 추가
  submitButtonText, // prop 추가
}) => {
  const [password, setPassword] = useState('');

  if (!isOpen) {
    return null;
  }

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(password);
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <CloseButton onClick={onClose} aria-label='닫기'>
          <img src={CloseIcon} alt='닫기' />
        </CloseButton>

        <ModalTitle>{title}</ModalTitle>

        {description && <DescriptionText>{description}</DescriptionText>}

        <form onSubmit={handleSubmit}>
          <InputWrapper>
            <InputField
              type='password'
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder='비밀번호'
              autoFocus
              hasError={!!error}
            />
            {error && <ErrorText>{error}</ErrorText>}
          </InputWrapper>

          <SubmitButton type='submit'>{submitButtonText}</SubmitButton>
        </form>
      </ModalContent>
    </ModalOverlay>
  );
};

export default PasswordModal;
