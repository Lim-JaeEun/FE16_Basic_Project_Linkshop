// import React from 'react';

import styled from 'styled-components';

import BackIcon from '../assets/icon/btn_back.png';

const StyledHeaderBar = styled.header`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: #ffffff;
  width: 100%;
  height: 56px;
  padding: 0 25px;
  box-sizing: border-box;
  position: sticky;
  top: 0; /* HeroSection 바로 아래에 붙도록 top 값 조정 필요 시 DetailShopPage에서 HeroSection 높이 고려 */
  z-index: 10;
`;

const HeaderLeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    display: block;
  }
`;

const HeaderText = styled.span`
  font-size: 16px;
  color: #888790;
  font-weight: 600;
  padding-left: 5px;
`;

const LinkHeader = ({ onGoBack }) => {
  return (
    <StyledHeaderBar>
      <HeaderLeftSection>
        <IconButton onClick={onGoBack} aria-label='뒤로가기'>
          <img src={BackIcon} alt='뒤로가기' />
          <HeaderText>돌아가기</HeaderText>
        </IconButton>
      </HeaderLeftSection>
    </StyledHeaderBar>
  );
};

export default LinkHeader;
