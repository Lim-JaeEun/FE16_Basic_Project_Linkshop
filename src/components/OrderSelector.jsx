import { useState } from 'react';

import styled, { keyframes } from 'styled-components';

import arrowBtn from '../assets/icon/btn_filter_arrow.png';
import closeBtn from '../assets/icon/btn_filter_close.png';
import checkedImg from '../assets/icon/ic_filter_check.png';
import BaseModal from '../layouts/BaseModal';
import { applyFontStyles } from '../styles/mixins';
import { ColorTypes, FontTypes } from '../styles/theme';
import { ORDER_OPTIONS } from './../constants/orderOptions';

const StOrderSelector = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.34375rem;

  ${applyFontStyles(FontTypes.MEDIUM18)}
`;

const StSelectorArrowImg = styled.img``;

const slideUp = keyframes`
  from {
    transform: translateY(100vh);
  } to {
    transform: translateY(0px);
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0; 
  }
  to {
    opacity: 1; 
  }
`;

const StOrderModal = styled(BaseModal)`
  position: relative;
  width: 100%;
  height: 100vh;
  top: 50%;
  padding: 36px 24px 24px 24px;
  border-radius: 28px;
  background-color: ${({ theme }) =>
    theme.colors[ColorTypes.SECONDARY_WHITE_50]};
  z-index: 1001;

  // Animation for mobile viewport: slide-up (bottom sheet)
  animation-name: ${slideUp};
  animation-duration: 0.4s;
  animation-timing-function: ease-out;
  animation-fill-mode: forwards;

  // Viewport: Tablet & Desktop
  @media (min-width: 768px) {
    width: 376px;
    height: 300px;
    left: 50%;
    transform: translate(-50%, -50%);

    // Animation for Tablet&Desktop viewport: fade-in
    animation-name: ${fadeIn};
    animation-duration: 0.25s;
    animation-timing-function: ease-in-out;
    animation-fill-mode: forwards;
  }
`;

const StOrderModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.5rem;
`;

const StModalTitle = styled.span`
  ${applyFontStyles(FontTypes.SEMIBOLD17)}
  font-size: 1.125rem;
`;

const StCloseImg = styled.img`
  position: absolute;
  right: 1.5rem;
  top: 1.5rem;
  cursor: pointer;
`;

const StOptionButton = styled.button`
  position: relative;
  width: 100%;
  text-align: left;
  padding-bottom: 1rem;
  border-bottom: 1px solid;
  border-bottom-color: ${({ theme }) =>
    theme.colors[ColorTypes.SECONDARY_GRAY_100]};

  ${({ $value, $highlightKey }) => {
    const result =
      $value === $highlightKey
        ? applyFontStyles(FontTypes.BOLD16, ColorTypes.ERROR)
        : applyFontStyles(FontTypes.MEDIUM16);

    return result;
  }}
`;

const StCheckedImg = styled.img`
  position: absolute;
  top: 0;
  right: 0;
`;

const OrderSelector = ({ className, order, onClick: handleClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleModalOpenClick = () => {
    setIsOpen(true);
  };

  const handleModalCloseClick = () => {
    setIsOpen(false);
  };

  const handleOrderClick = selectedOrder => {
    handleClick(selectedOrder);
    setIsOpen(false);
  };

  return (
    <>
      <StOrderSelector className={className} onClick={handleModalOpenClick}>
        {ORDER_OPTIONS[order]}
        <StSelectorArrowImg
          src={arrowBtn}
          alt='정렬 방식 드롭다운 화살표 이미지'
        />
      </StOrderSelector>
      <StOrderModal isOpen={isOpen}>
        <StOrderModalContent>
          <StCloseImg src={closeBtn} onClick={handleModalCloseClick} />
          <StModalTitle>정렬</StModalTitle>
          {Object.entries(ORDER_OPTIONS).map(([key, value]) => (
            <StOptionButton
              key={key}
              $value={value}
              $highlightKey={ORDER_OPTIONS[order]}
              onClick={() => handleOrderClick(key)}
            >
              {value}
              {value === ORDER_OPTIONS[order] && (
                <StCheckedImg src={checkedImg} alt='선택된 정렬 체크 이미지' />
              )}
            </StOptionButton>
          ))}
        </StOrderModalContent>
      </StOrderModal>
    </>
  );
};

export default OrderSelector;
