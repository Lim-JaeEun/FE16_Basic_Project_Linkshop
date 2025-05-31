import styled from 'styled-components';

import { ColorTypes } from '../styles/theme';

const BaseButton = styled.button`
  width: 98px;
  height: 32px;
  color: #ffffff;
  border-radius: 37px;
  background-color: ${({ theme }) => theme.colors[ColorTypes.PRIMARY]};
  font-size: 15px;
  font-weight: 600;
  border: 0;
  cursor: pointer;
`;
function PrimaryButton({ children }) {
  return <BaseButton>{children}</BaseButton>;
}
export default PrimaryButton;
