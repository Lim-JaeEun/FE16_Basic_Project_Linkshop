import { useState, useEffect } from 'react';

import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';

import UpdateProduct from '../components/UpdateProduct';
import UpdateShop from '../components/UpdateShop';
import BaseButton from '../components/PrimaryButton';
import theme from '../styles/theme';
import { generateMockLinkshopData } from '../utils/generateMockLinkshopData';

const Container = styled.div`
  margin-top: 124px;
`;

const BtnWrapper = styled.div`
  max-width: 500px;
  margin: 0 auto 124px;

  @media (min-width: 768px) {
    max-width: 696px;
  }
`;

const StButton = styled(BaseButton)`
  width: 100%;
  height: 50px;
  background-color: ${({ theme, disabled }) =>
    disabled ? theme.colors.secGray200 : theme.colors.primary};
  color: ${theme.colors.secWhite100};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
`;

const UpdateShopPage = ({ onSuccess }) => {
  // 버튼 활성화 여부 확인
  const [isDisable, setIsDisable] = useState(false);

  const [shopData, setShopData] = useState(null);
  const [productFormData, setProductFormData] = useState([]);
  const [formData, setFormdata] = useState({
    name: '',
    url: '',
    userId: '',
    password: '',
  });

  // 에러메세지 UI 확인용
  const hasError = false;

  const navigate = useNavigate();
  const { URLid } = useParams();

  // mockData 사용
  useEffect(() => {
    const mockData = generateMockLinkshopData();
    setShopData(mockData);
    setFormdata({
      name: mockData.name,
      url: mockData.shop.shopUrl,
      userId: mockData.userId,
      password: mockData.password,
    });
    setProductFormData(
      mockData.products.map(p => ({
        name: p.name,
        price: p.price,
      })),
    );
  }, []);

  const handleProductChange = (index, field, value) => {
    setProductFormData(prev => {
      const updated = [...prev];
      updated[index][field] = value;
      return updated;
    });
  };

  const handleUpdate = () => {
    // 1. 업데이트 로직 수행 (예: API 호출)
    // await updateShop(URLid, updatedData);
    console.log('수정된 데이터:', {
      ...shopData,
      name: formData.name,
      userId: formData.userId,
      password: formData.password,
      shop: {
        ...shopData.shop,
        shopUrl: formData.url,
      },
    });

    // 수정 확인
    alert('Mock 데이터 수정 완료 (콘솔 확인)');
    // 2. 성공 시 토스트 띄우기
    onSuccess?.();

    // 3. 상세 페이지로 이동
    navigate(`/link/${URLid}`);
  };

  const handleChange = e => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value,
    }));
  };

  return (
    <Container>
      {shopData && (
        <>
          <UpdateProduct
            products={productFormData}
            onChange={handleProductChange}
            hasError={hasError}
          />
          <UpdateShop
            formData={formData}
            onChange={handleChange}
            hasError={hasError}
          />
          <BtnWrapper>
            <StButton onClick={handleUpdate} disabled={isDisable}>
              수정하기
            </StButton>
          </BtnWrapper>
        </>
      )}
    </Container>
  );
};

export default UpdateShopPage;
