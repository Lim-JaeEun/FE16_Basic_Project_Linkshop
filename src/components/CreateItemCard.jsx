import styled from 'styled-components';

import Field from './Field';
import FileField from './FileField';
import theme from '../styles/theme';
import { useState } from 'react';

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  width: 344px;
  padding: 22px 28px;
  border-radius: 25px;
  margin: 0 auto;
  gap: 30px;
  background-color: ${theme.colors.secWhite100};
  border: ${({ isFormValid }) =>
    isFormValid === false ? `1px solid ${theme.colors.err}` : 'none'};

  @media (min-width: 768px) {
    width: 696px;
  }
`;

const CreateItemCard = ({ idKey }) => {
  const [isFormValid, setIsFormValid] = useState();
  //다수의 form에서 쓰이니까 커스텀 훅 하는게 좋음

  return (
    <FormContainer isFormValid={isFormValid}>
      <FileField
        placeholder='상품 이미지를 첨부해주세요.'
        inputId={`productImage${idKey}`}
        label='상품 대표 이미지'
      />
      <Field
        placeholder='상품 이름을 입력해주세요.'
        inputId={`productName${idKey}`}
        type='text'
        label='상품 이름'
      />
      <Field
        placeholder='원화로 표기해 주세요.'
        inputId={`productPrice${idKey}`}
        type='number'
        label='상품 가격'
      />
    </FormContainer>
  );
};

export default CreateItemCard;
