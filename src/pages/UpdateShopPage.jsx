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
  const [shopData, setShopData] = useState(null);
  // 상품 데이터 폼 상태 관리 (여러 개의 상품을 배열로 관리)
  const [productFormData, setProductFormData] = useState([]);
  // 상점 정보 폼 상태 관리
  const [formData, setFormdata] = useState({
    name: '',
    url: '',
    userId: '',
    password: '',
  });

  const [originalPassword, setOriginalPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { URLid } = useParams();

  // 컴포넌트 마운트 시 mockData를 불러와 상태 초기화
  useEffect(() => {
    const mockData = generateMockLinkshopData();
    setShopData(mockData); // 전체 상점 데이터 설정
    // 상점 폼 데이터 설정
    setFormdata({
      name: mockData.name,
      url: mockData.shop.shopUrl,
      userId: mockData.userId,
      password: '',
    });
    // 상품 폼 데이터 설정
    setProductFormData(
      mockData.products.map(p => ({
        name: p.name,
        price: p.price,
      })),
    );
    setOriginalPassword(mockData.password);
  }, []);

  // 상품 데이터 변경 핸들러: 특정 상품의 요소 업데이트
  const handleProductChange = (index, field, value) => {
    setProductFormData(prev => {
      const updated = [...prev];
      updated[index][field] = value;
      return updated;
    });
  };

  // 상점 정보 변경 핸들러: 입력 필드의 ID에 따라 해당 폼 데이터 업데이트
  const handleChange = e => {
    const { id, value } = e.target;
    setFormdata(prev => ({
      ...prev, // 이전 폼 데이터 복사
      [id]: value, // 변경된 필드 업데이트
    }));
  };

  const handleUpdate = async () => {
    if (isLoading) return;

    setError(null);
    setIsLoading(true);

    if (formData.password !== originalPassword) {
      setError('비밀번호가 일치하지 않습니다. 다시 확인해주세요.');
      alert('비밀번호가 일치하지 않습니다. 수정할 수 없습니다.');
      setIsLoading(false); // 로딩 상태 해제
      return; // 함수 실행 중단
    }

    const dataToSubmit = {
      name: formData.name,
      userId: formData.userId,
      password: formData.password,
      shop: {
        shopUrl: formData.url,
        // shopData가 null이 아닐 때만 shopData.shop을 렌더링
        ...(shopData && shopData.shop),
      },
      products: productFormData,
    };

    try {
      // 1. 실제 API 호출 대신 console.log로 데이터 확인
      console.log(
        `[Mock Data Update] ${URLid}번 링크샵 데이터 업데이트 요청:`,
        dataToSubmit,
      );

      // 2. Mock 데이터 업데이트를 시뮬레이션하기 위한 지연 시간
      await new Promise(resolve => setTimeout(resolve, 500)); // 0.5초 지연

      // 3. Mock 데이터 업데이트가 성공했다고 가정
      alert('Mock 데이터 수정 완료! (콘솔 확인)');
      onSuccess?.();
      navigate(`/link/${URLid}`);
    } catch (err) {
      console.error('데이터 업데이트 중 예상치 못한 오류:', err);
      setError(
        '데이터 수정 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
      );
      alert('데이터 수정 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      {/* shopData가 있을 때만 자식 컴포넌트 렌더링 */}
      {shopData && (
        <>
          {/* UpdateProduct 컴포넌트에 productFormData와 변경 핸들러 전달 */}
          <UpdateProduct
            products={productFormData}
            onChange={handleProductChange}
            // hasError는 정적 UI 확인용이므로 제거하거나 필요한 경우 동적 로직으로 대체
            // hasError={hasError}
          />
          {/* UpdateShop 컴포넌트에 formData와 변경 핸들러 전달 */}
          <UpdateShop
            formData={formData}
            onChange={handleChange}
            // hasError는 정적 UI 확인용이므로 제거하거나 필요한 경우 동적 로직으로 대체
            // hasError={hasError}
          />
          <BtnWrapper>
            <StButton onClick={handleUpdate} disabled={isLoading}>
              {/* isDisable 상태를 사용하지 않으므로 disabled를 false로 설정 */}
              수정하기
            </StButton>
          </BtnWrapper>
          {error && (
            <p style={{ color: 'red', textAlign: 'center', marginTop: '20px' }}>
              {error}
            </p>
          )}
        </>
      )}
    </Container>
  );
};

export default UpdateShopPage;
