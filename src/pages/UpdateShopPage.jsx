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

  const [formErrors, setFormErrors] = useState({
    name: { hasError: false, message: '' },
    url: { hasError: false, message: '' },
    userId: { hasError: false, message: '' },
    password: { hasError: false, message: '' },
  });
  // 각 상품 필드별 유효성 검사 상태 (ex: [{ name: false, price: false }, { name: false, price: false }])
  const [productErrors, setProductErrors] = useState([]);

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

    // 초기 상품 오류 상태 설정: 모든 상품 필드를 false로 초기화
    setProductErrors(
      mockData.products.map(() => ({
        name: { hasError: false, message: '' },
        price: { hasError: false, message: '' },
      })),
    );
  }, []);

  // userId 유효성 검사 함수
  const validateUserId = id => {
    if (id.trim() === '') {
      return { hasError: true, message: '필수 입력 항목입니다.' };
    }
    // 띄어쓰기 또는 특수기호 (알파벳, 숫자 외) 검사
    const regex = /^[a-zA-Z0-9]+$/;
    if (!regex.test(id)) {
      return {
        hasError: true,
        message: '아이디에 띄어쓰기, 특수기호를 사용할 수 없습니다.',
      };
    }
    return { hasError: false, message: '' };
  };

  // password 유효성 검사 함수
  const validatePassword = password => {
    if (password.trim() === '') {
      return { hasError: true, message: '필수 입력 항목입니다.' };
    }
    // 영문+숫자 6자 이상
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    if (!regex.test(password)) {
      return {
        hasError: true,
        message: '비밀번호는 영문+숫자 6자 이상을 입력해야 합니다.',
      };
    }
    return { hasError: false, message: '' };
  };

  // 상품 데이터 변경 핸들러: 특정 상품의 요소 업데이트
  const handleProductChange = (index, field, value) => {
    setProductFormData(prev => {
      const updated = [...prev];
      updated[index][field] = value;
      return updated;
    });

    // 상품 필드 값이 변경될 때 해당 필드의 에러 상태 초기화
    setProductErrors(prev => {
      const updated = [...prev];
      if (updated[index]) {
        // 해당 인덱스가 존재하는지 확인
        updated[index][field] = { hasError: false, message: '' };
      }
      return updated;
    });
  };

  // 상품 필드 focus out (blur) 시 유효성 검사
  const handleProductBlur = (index, field, value) => {
    const isEmpty = value.toString().trim() === '';
    if (isEmpty) {
      setProductErrors(prev => {
        const updated = [...prev];
        if (updated[index]) {
          updated[index][field] = {
            hasError: true,
            message: '필수 입력 항목입니다.',
          };
        }
        return updated;
      });
    }
  };

  // 상점 정보 변경 핸들러: 입력 필드의 ID에 따라 해당 폼 데이터 업데이트
  const handleChange = e => {
    const { id, value } = e.target;
    setFormdata(prev => ({
      ...prev,
      [id]: value, // 변경된 필드 업데이트
    }));

    // 필드별 유효성 검사를 바로 적용
    let validationResult;
    if (id === 'userId') {
      validationResult = validateUserId(value);
    } else if (id === 'password') {
      validationResult = validatePassword(value);
    } else {
      validationResult = { hasError: false, message: '' };
      if (value.trim() === '') {
        validationResult = { hasError: true, message: '필수 입력 항목입니다.' };
      }
    }

    // 상점 필드 값이 변경될 때 해당 필드의 에러 상태 초기화
    setFormErrors(prev => ({
      ...prev,
      [id]: false,
    }));
  };

  // blur 시 필드별 유효성 검사 수행
  const handleShopBlur = (id, value) => {
    let validationResult;
    if (id === 'userId') {
      validationResult = validateUserId(value);
    } else if (id === 'password') {
      validationResult = validatePassword(value);
    } else {
      validationResult = { hasError: false, message: '' };
      if (value.trim() === '') {
        validationResult = { hasError: true, message: '필수 입력 항목입니다.' };
      }
    }
    setFormErrors(prev => ({
      ...prev,
      [id]: validationResult,
    }));
  };

  const handleUpdate = async () => {
    if (isLoading) return;

    setError(null);
    setIsLoading(true);

    let hasOverallError = false;
    const newFormErrors = { ...formErrors };

    // 상점 정보 유효성 재검사
    for (const key in formData) {
      let validationResult;
      if (key === 'userId') {
        validationResult = validateUserId(formData[key]);
      } else if (key === 'password') {
        validationResult = validatePassword(formData[key]);
      } else {
        validationResult = { hasError: false, message: '' };
        if (formData[key].trim() === '') {
          validationResult = {
            hasError: true,
            message: '필수 입력 항목입니다.',
          };
        }
      }

      if (validationResult.hasError) {
        newFormErrors[key] = validationResult;
        hasOverallError = true;
      }
    }
    setFormErrors(newFormErrors);

    // 상품 정보 유효성 재검사
    const newProductErrors = [...productErrors];
    productFormData.forEach((product, idx) => {
      // 상품 이름 검사
      if (product.name.trim() === '') {
        newProductErrors[idx].name = {
          hasError: true,
          message: '필수 입력 항목입니다.',
        }; // 수정된 부분: 메시지 추가
        hasOverallError = true;
      } else {
        newProductErrors[idx].name = { hasError: false, message: '' };
      }
      // 상품 가격 검사
      if (product.price.toString().trim() === '') {
        newProductErrors[idx].price = {
          hasError: true,
          message: '필수 입력 항목입니다.',
        }; // 수정된 부분: 메시지 추가
        hasOverallError = true;
      } else {
        newProductErrors[idx].price = { hasError: false, message: '' };
      }
    });
    setProductErrors(newProductErrors);

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
          <UpdateProduct
            products={productFormData}
            onChange={handleProductChange}
            productErrors={productErrors}
            onBlur={handleProductBlur}
          />
          <UpdateShop
            formData={formData}
            onChange={handleChange}
            formErrors={formErrors}
            onBlur={handleShopBlur}
          />
          <BtnWrapper>
            <StButton onClick={handleUpdate} disabled={isLoading}>
              {isLoading ? '수정 중...' : '수정하기'}
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
