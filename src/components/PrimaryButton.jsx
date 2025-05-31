import styled from 'styled-components';

import { applyFontStyles } from '../styles/mixins';
import { FontTypes, ColorTypes } from '../styles/theme';

const BaseButton = styled.button`
  border-radius: 37px;
  background-color: ${({ theme }) => theme.colors[ColorTypes.PRIMARY]};
  width: ${({ width = '98px' }) => width};
  height: ${({ height = '36px' }) => height};
  ${({
    $fontType = FontTypes.REGULAR16,
    $color = ColorTypes.SECONDARY_WHITE_50,
  }) => applyFontStyles($fontType, $color)};
`;

export default BaseButton;
