import styled from 'styled-components';

import { ColorTypes } from '../styles/theme';

const BaseButton = styled.button`
  color: #ffffff;
  border: none;
  border-radius: 37px;
  background-color: ${({ theme }) => theme.colors[ColorTypes.PRIMARY]};

  /*기본값*/
  width: ${({ width = '98px' }) => width};
  height: ${({ height = '32px' }) => height};
  font-size: ${({ fontSize = '15px' }) => fontSize};
  font-weight: ${({ fontWeight = 600 }) => fontWeight};
`;

export default BaseButton;
