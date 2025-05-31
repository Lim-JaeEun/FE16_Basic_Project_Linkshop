import { css } from 'styled-components';

export const applyFontStyles = (fontType, color = 'secBlack') => css`
  font-size: ${({ theme }) => theme.fonts[fontType].fontSize};
  font-weight: ${({ theme }) => theme.fonts[fontType].fontWeight};
  color: ${({ theme }) => theme.colors[color]};
`;
