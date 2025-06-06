// import React from 'react';

import styled from 'styled-components';

const StyledButton = styled.button`
  background: none;
  border: none;
  padding: 8px;
  margin: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%; /* 원형 배경 효과를 위해 추가 (선택 사항) */
  transition: background-color 0.2s;

  &:hover {
    background-color: #f0f0f0; /* 마우스 오버 시 배경색 */
  }

  img {
    display: block;
  }
`;

const IconButton = ({ children, onClick, label }) => {
  return (
    <StyledButton onClick={onClick} aria-label={label}>
      {children}
    </StyledButton>
  );
};

export default IconButton;
