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

  // 상점 정보 필드별 유효성 검사 상태 (에러 메시지 포함)
  const [formErrors, setFormErrors] = useState({
    name: { hasError: false, message: '' },
    url: { hasError: false, message: '' },
    userId: { hasError: false, message: '' },
    password: { hasError: false, message: '' },
  });
  // 각 상품 필드별 유효성 검사 상태
  const [productErrors, setProductErrors] = useState([]);

  const [isFormValid, setIsFormValid] = useState(false);

  const navigate = useNavigate();
  const { URLid } = useParams();

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

  const checkFormValidity = (
    currentFormData,
    currentProductFormData,
    currentOriginalPassword,
  ) => {
    let overallValid = true;

    // 상점 필드 유효성 검사
    for (const key in currentFormData) {
      let validationResult;
      if (key === 'userId') {
        validationResult = validateUserId(currentFormData[key]);
      } else if (key === 'password') {
        // 비밀번호는 실제 비밀번호 일치 로직과는 별개로, '형식' 유효성을 여기서 검사
        validationResult = validatePassword(currentFormData[key]);
      } else {
        validationResult = { hasError: false, message: '' };
        if (currentFormData[key].trim() === '') {
          validationResult = {
            hasError: true,
            message: '필수 입력 항목입니다.',
          };
        }
      }
      if (validationResult.hasError) {
        overallValid = false;
      }
    }

    // 상품 필드 유효성 검사
    currentProductFormData.forEach(product => {
      if (product.name.trim() === '') {
        overallValid = false;
      }
      if (product.price.toString().trim() === '') {
        overallValid = false;
      }
    });

    // 사용자가 입력한 password가 originalPassword와 일치하는지 확인
    // 이 조건은 '버튼 활성화'에 영향을 줍니다.
    if (currentFormData.password !== currentOriginalPassword) {
      overallValid = false;
    }

    return overallValid;
  };

  // 컴포넌트 마운트 시 mockData를 불러와 상태 초기화
  useEffect(() => {
    const mockData = generateMockLinkshopData();
    setShopData(mockData); // 전체 상점 데이터 설정
    // 상점 폼 데이터 설정
    setFormdata({
      name: mockData.name,
      url: mockData.shop.shopUrl,
      userId: mockData.userId,
      password: '', // 초기 비밀번호는 비워두어 사용자가 직접 입력하도록 유도
    });
    // 상품 폼 데이터 설정
    setProductFormData(
      mockData.products.map(p => ({
        name: p.name,
        price: p.price,
      })),
    );
    // Mock 데이터에서 불러온 '실제' 비밀번호를 originalPassword 상태에 저장
    setOriginalPassword(mockData.password);

    setProductErrors(
      mockData.products.map(() => ({
        name: { hasError: false, message: '' },
        price: { hasError: false, message: '' },
      })),
    );
  }, []);

  useEffect(() => {
    // shopData가 null이 아닐 때만 유효성 검사를 수행 (초기 렌더링 시 shopData가 없을 수 있음)
    if (shopData) {
      const isValid = checkFormValidity(
        formData,
        productFormData,
        originalPassword,
      );
      setIsFormValid(isValid);
    }
  }, [formData, productFormData, originalPassword, shopData]); // originalPassword와 shopData도 의존성에 추가

  // 상품 데이터 변경 핸들러: 특정 상품의 요소 업데이트
  const handleProductChange = (index, field, value) => {
    setProductFormData(prev => {
      const updated = [...prev];
      updated[index][field] = value;
      return updated;
    });
    setProductErrors(prev => {
      const updated = [...prev];
      if (updated[index]) {
        updated[index][field] = { hasError: false, message: '' };
      }
      return updated;
    });
  };

  // 상품 필드 focus out (blur) 시 유효성 검사
  const handleProductBlur = (index, field, value) => {
    const isEmpty = value.toString().trim() === ''; // 숫자를 문자열로 변환하여 검사
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
    } else {
      setProductErrors(prev => {
        const updated = [...prev];
        if (updated[index]) {
          updated[index][field] = { hasError: false, message: '' };
        }
        return updated;
      });
    }
  };

  // 상점 정보 변경 핸들러: 입력 필드의 ID에 따라 해당 폼 데이터 업데이트
  const handleChange = e => {
    const { id, value } = e.target;
    setFormdata(prev => ({
      ...prev, // 이전 폼 데이터 복사
      [id]: value, // 변경된 필드 업데이트
    }));
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

  // 상점 필드 focus out (blur) 시 유효성 검사
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

    let overallValidForSubmission = true;
    const newFormErrors = { ...formErrors };

    // 상점 정보 필드 재검사
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

      newFormErrors[key] = validationResult; // 에러 객체 업데이트
      if (validationResult.hasError) {
        overallValidForSubmission = false; // 하나라도 에러 있으면 제출 불가
      }
    }
    setFormErrors(newFormErrors); // 최종 폼 에러 상태 반영

    // 상품 정보 필드 재검사
    const newProductErrors = [...productErrors]; // 현재 상품 에러 상태 복사
    productFormData.forEach((product, idx) => {
      const productErrorItem = {
        name: { hasError: false, message: '' },
        price: { hasError: false, message: '' },
      };
      // 상품 이름 검사
      if (product.name.trim() === '') {
        productErrorItem.name = {
          hasError: true,
          message: '필수 입력 항목입니다.',
        };
        overallValidForSubmission = false;
      }
      // 상품 가격 검사
      if (product.price.toString().trim() === '') {
        productErrorItem.price = {
          hasError: true,
          message: '필수 입력 항목입니다.',
        };
        overallValidForSubmission = false;
      }
      newProductErrors[idx] = productErrorItem; // 에러 배열 업데이트
    });
    setProductErrors(newProductErrors); // 최종 상품 에러 상태 반영

    // 비밀번호 일치 검사 (유효성 검사를 통과한 후에만 진행)
    if (formData.password !== originalPassword) {
      overallValidForSubmission = false;
      setError('비밀번호가 일치하지 않습니다. 다시 확인해주세요.');
    } else if (!overallValidForSubmission) {
      // 비밀번호는 일치하지만 다른 필드 오류가 있을 경우
      setError('입력값을 다시 확인해주세요.'); // 더 일반적인 에러 메시지
    }

    // 최종 유효성 검사 실패 시 함수 종료
    if (!overallValidForSubmission) {
      setIsLoading(false); // 로딩 상태 해제
      return;
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
            productErrors={productErrors}
            onBlur={handleProductBlur}
          />
          {/* UpdateShop 컴포넌트에 formData와 변경 핸들러 전달 */}
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
