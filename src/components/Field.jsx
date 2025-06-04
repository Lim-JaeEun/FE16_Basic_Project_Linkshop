import styled from 'styled-components';
import { applyFontStyles } from '../styles/mixins';
import { FontTypes, ColorTypes } from '../styles/theme';

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const StLabel = styled.label`
  ${applyFontStyles(FontTypes.SEMIBOLD14, ColorTypes.SECONDARY_BLACK)}
`;

const StInput = styled.input`
  ${applyFontStyles(FontTypes.REGULAR17, ColorTypes.SECONDARY_GRAY_300)}
  color: ${props => props.theme.colors[ColorTypes.SECONDARY_BLACK]}
`;

const Field = ({ type, inputId, label, placeholder }) => {
  return (
    <FormGroup>
      <StLabel htmlFor={inputId}>{label}</StLabel>
      <StInput
        type={type}
        id={inputId}
        name={inputId}
        placeholder={placeholder}
      />
    </FormGroup>
  );
};

export default Field;
