import { useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import UpdateProduct from '../components/UpdateProduct';
import UpdateShop from '../components/UpdateShop';
import BaseButton from '../components/PrimaryButton';
import theme from '../styles/theme';

const BtnWrapper = styled.div`
  max-width: 500px;
  margin: 0 auto 124px;
`;

const StButton = styled(BaseButton)`
  background-color: ${({ theme, disabled }) =>
    disabled ? theme.colors.secGray200 : theme.colors.primary};
  color: ${theme.colors.secWhite100};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
`;

const UpdateShopPage = ({ onSuccess }) => {
  const [isDisable, setIsDisable] = useState(true);

  const navigate = useNavigate();
  const { URLid } = useParams();

  const handleUpdate = () => {
    // 1. 업데이트 로직 수행 (예: API 호출)
    // await updateShop(URLid, updatedData);

    // 2. 성공 시 토스트 띄우기
    onSuccess?.();

    // 3. 상세 페이지로 이동
    navigate(`/link/${URLid}`);
  };

  return (
    <div>
      <UpdateProduct />
      <UpdateShop />
      <BtnWrapper>
        <StButton
          onClick={handleUpdate}
          disabled={isDisable}
          width='100%'
          height='50px'
        >
          수정하기
        </StButton>
      </BtnWrapper>
    </div>
  );
};

export default UpdateShopPage;
