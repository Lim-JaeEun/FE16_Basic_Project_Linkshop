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
  transition: background-color 0.2s;

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
