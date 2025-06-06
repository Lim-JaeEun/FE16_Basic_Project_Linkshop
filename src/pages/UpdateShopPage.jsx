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
  padding: 0 0.75rem;
`;

const BtnWrapper = styled.div`
  max-width: 696px;
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
  const [productFormData, setProductFormData] = useState([]);
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
  const [productErrors, setProductErrors] = useState([]);
  const [isFormValid, setIsFormValid] = useState(false);

  const navigate = useNavigate();
  const { URLid } = useParams();

  // Product 카드 추가 버튼
  const handleAddProduct = () => {
    setProductFormData(prev => [...prev, { name: '', price: '' }]);
    setProductErrors(prev => [
      ...prev,
      {
        name: { hasError: false, message: '' },
        price: { hasError: false, message: '' },
      },
    ]);
  };

  // 유저 ID 유효성 검사
  const validateUserId = id => {
    if (id.trim() === '')
      return { hasError: true, message: '필수 입력 항목입니다.' };
    const regex = /^[a-zA-Z0-9]+$/;
    if (!regex.test(id)) {
      return {
        hasError: true,
        message: '아이디에 한글, 띄어쓰기, 특수기호를 사용할 수 없습니다.',
      };
    }
    return { hasError: false, message: '' };
  };

  // 비밀번호 유효성 검사
  const validatePassword = password => {
    if (password.trim() === '')
      return { hasError: true, message: '필수 입력 항목입니다.' };
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    if (!regex.test(password)) {
      return {
        hasError: true,
        message: '비밀번호는 영문+숫자 6자 이상을 입력해야 합니다.',
      };
    }
    return { hasError: false, message: '' };
  };

  // 폼 유효성 종합 검사
  const checkFormValidity = (
    currentFormData,
    currentProductFormData,
    currentOriginalPassword,
  ) => {
    let overallValid = true;
    Object.entries(currentFormData).forEach(([key, value]) => {
      if (key === 'userId' && validateUserId(value).hasError)
        overallValid = false;
      else if (key === 'password' && validatePassword(value).hasError)
        overallValid = false;
      else if (value.trim() === '') overallValid = false;
    });
    currentProductFormData.forEach(product => {
      if (!product.name.trim() || !product.price.toString().trim())
        overallValid = false;
    });
    if (currentFormData.password !== currentOriginalPassword)
      overallValid = false;
    return overallValid;
  };

  // 초기 데이터 로드
  useEffect(() => {
    const mockData = generateMockLinkshopData();
    setShopData(mockData);
    setFormdata({
      name: mockData.name,
      url: mockData.shop.shopUrl,
      userId: mockData.userId,
      password: '',
    });
    setProductFormData(
      mockData.products.map(p => ({ name: p.name, price: p.price })),
    );
    setOriginalPassword(mockData.password);
    setProductErrors(
      mockData.products.map(() => ({
        name: { hasError: false, message: '' },
        price: { hasError: false, message: '' },
      })),
    );
  }, []);

  // 유효성 자동 확인
  useEffect(() => {
    if (shopData) {
      const isValid = checkFormValidity(
        formData,
        productFormData,
        originalPassword,
      );
      setIsFormValid(isValid);
    }
  }, [formData, productFormData, originalPassword, shopData]);

  // 상품 변경 처리
  const handleProductChange = (index, field, value) => {
    setProductFormData(prev => {
      const updated = [...prev];
      updated[index][field] = value;
      return updated;
    });
    setProductErrors(prev => {
      const updated = [...prev];
      if (updated[index])
        updated[index][field] = { hasError: false, message: '' };
      return updated;
    });
  };

  // 상품 blur 유효성 검사
  const handleProductBlur = (index, field, value) => {
    const isEmpty = value.toString().trim() === '';
    setProductErrors(prev => {
      const updated = [...prev];
      if (updated[index]) {
        updated[index][field] = isEmpty
          ? { hasError: true, message: '필수 입력 항목입니다.' }
          : { hasError: false, message: '' };
      }
      return updated;
    });
  };

  // 상점 정보 변경 핸들러
  const handleChange = e => {
    const { id, value } = e.target;
    setFormdata(prev => ({ ...prev, [id]: value }));
    let result =
      id === 'userId'
        ? validateUserId(value)
        : id === 'password'
          ? validatePassword(value)
          : {
              hasError: value.trim() === '',
              message: value.trim() === '' ? '필수 입력 항목입니다.' : '',
            };
    setFormErrors(prev => ({ ...prev, [id]: result }));
  };

  // 상점 blur 시 유효성 검사
  const handleShopBlur = (id, value) => {
    let result =
      id === 'userId'
        ? validateUserId(value)
        : id === 'password'
          ? validatePassword(value)
          : {
              hasError: value.trim() === '',
              message: value.trim() === '' ? '필수 입력 항목입니다.' : '',
            };
    setFormErrors(prev => ({ ...prev, [id]: result }));
  };

  // 최종 제출 처리
  const handleUpdate = async () => {
    if (isLoading) return;
    setError(null);
    setIsLoading(true);

    let overallValidForSubmission = true;
    const newFormErrors = { ...formErrors };
    for (const key in formData) {
      const value = formData[key];
      const result =
        key === 'userId'
          ? validateUserId(value)
          : key === 'password'
            ? validatePassword(value)
            : {
                hasError: value.trim() === '',
                message: value.trim() === '' ? '필수 입력 항목입니다.' : '',
              };
      newFormErrors[key] = result;
      if (result.hasError) overallValidForSubmission = false;
    }
    setFormErrors(newFormErrors);

    const newProductErrors = [...productErrors];
    productFormData.forEach((product, idx) => {
      const itemErrors = {
        name: { hasError: false, message: '' },
        price: { hasError: false, message: '' },
      };
      if (!product.name.trim())
        itemErrors.name = { hasError: true, message: '필수 입력 항목입니다.' };
      if (!product.price.toString().trim())
        itemErrors.price = { hasError: true, message: '필수 입력 항목입니다.' };
      if (itemErrors.name.hasError || itemErrors.price.hasError)
        overallValidForSubmission = false;
      newProductErrors[idx] = itemErrors;
    });
    setProductErrors(newProductErrors);

    if (formData.password !== originalPassword) {
      overallValidForSubmission = false;
      setError('비밀번호가 일치하지 않습니다. 다시 확인해주세요.');
    } else if (!overallValidForSubmission) {
      setError('입력값을 다시 확인해주세요.');
    }

    if (!overallValidForSubmission) return setIsLoading(false);

    const dataToSubmit = {
      name: formData.name,
      userId: formData.userId,
      password: formData.password,
      shop: { shopUrl: formData.url, ...(shopData && shopData.shop) },
      products: productFormData,
    };

    try {
      console.log(
        `[Mock Data Update] ${URLid}번 링크샵 데이터 업데이트 요청:`,
        dataToSubmit,
      );
      await new Promise(resolve => setTimeout(resolve, 500));
      alert('Mock 데이터 수정 완료! (콘솔 확인)');
      onSuccess?.();
      navigate(`/link/${URLid}`);
    } catch (err) {
      console.error('데이터 업데이트 중 예상치 못한 오류:', err);
      setError(
        '데이터 수정 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      {shopData && (
        <>
          <UpdateProduct
            products={productFormData}
            onChange={handleProductChange}
            productErrors={productErrors}
            onBlur={handleProductBlur}
            onAddProduct={handleAddProduct}
          />
          <UpdateShop
            formData={formData}
            onChange={handleChange}
            formErrors={formErrors}
            onBlur={handleShopBlur}
          />
          <BtnWrapper>
            <StButton
              onClick={handleUpdate}
              disabled={isLoading || !isFormValid}
            >
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
