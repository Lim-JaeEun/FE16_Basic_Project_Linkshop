// src/pages/UpdateShopPage.jsx

import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';

import UpdateProduct from '../components/UpdateProduct';
import UpdateShop from '../components/UpdateShop';
import BaseButton from '../components/PrimaryButton';
import theme from '../styles/theme';
import { getLinkshopDetail, updateLinkshop, uploadImage } from '../api/api';

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
  const [productImages, setProductImages] = useState([]);
  const [shopImageUrl, setShopImageUrl] = useState(null);

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
    shopImage: { hasError: false, message: '' },
  });
  const [productErrors, setProductErrors] = useState([]);
  const [isFormValid, setIsFormValid] = useState(false);

  const navigate = useNavigate();
  const { URLid } = useParams();

  /** 상품 추가 핸들러 */
  const handleAddProduct = () => {
    setProductFormData(prev => [...prev, { name: '', price: '' }]);
    setProductErrors(prev => [
      ...prev,
      {
        name: { hasError: false, message: '' },
        price: { hasError: false, message: '' },
        productImage: { hasError: false, message: '' },
      },
    ]);
    setProductImages(prev => [...prev, null]);
  };

  /** 이미지 파일 변경 및 업로드 핸들러 */
  const handleImageChange = async (index, file) => {
    if (!file) {
      setProductImages(prev => {
        const updated = [...prev];
        updated[index] = null;
        return updated;
      });
      handleProductBlur(index, 'productImage', null);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const imageUrl = await uploadImage(file);
      setProductImages(prev => {
        const updated = [...prev];
        updated[index] = imageUrl;
        return updated;
      });
      console.log(`상품 ${index} 이미지 업로드 성공:`, imageUrl);
      handleProductBlur(index, 'productImage', imageUrl);
    } catch (err) {
      console.error(`상품 ${index} 이미지 업로드 실패:`, err);
      setError(err.message || '이미지 업로드에 실패했습니다.');
      setProductImages(prev => {
        const updated = [...prev];
        updated[index] = null;
        return updated;
      });
      handleProductBlur(index, 'productImage', null);
    } finally {
      setIsLoading(false);
    }
  };

  /** 상점 대표 이미지 변경 및 업로드 핸들러 */
  const handleShopImageChange = async file => {
    if (!file) {
      setShopImageUrl(null);
      handleShopBlur('shopImage', null);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const imageUrl = await uploadImage(file);
      setShopImageUrl(imageUrl);
      console.log('상점 이미지 업로드 성공:', imageUrl);
      handleShopBlur('shopImage', imageUrl);
    } catch (err) {
      console.error('상점 이미지 업로드 실패:', err);
      setError(err.message || '상점 이미지 업로드에 실패했습니다.');
      setShopImageUrl(null);
      handleShopBlur('shopImage', null);
    } finally {
      setIsLoading(false);
    }
  };

  /** 상점 대표 이미지 삭제 핸들러 */
  const handleRemoveShopImage = () => {
    setShopImageUrl(null);
    handleShopBlur('shopImage', null);
  };

  /** 유저 ID 유효성 검사 */
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

  /** 비밀번호 유효성 검사 */
  const validatePassword = password => {
    // 비밀번호 필드가 비어있으면 유효성 에러를 발생시키지 않음
    if (password.trim() === '') {
      return { hasError: false, message: '' };
    }
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    if (!regex.test(password)) {
      return {
        hasError: true,
        message: '비밀번호는 영문+숫자 6자 이상을 입력해야 합니다.',
      };
    }
    return { hasError: false, message: '' };
  };

  /** 폼 전체 유효성 검사 (순수 함수) */
  const checkFormValidity = (
    currentFormData,
    currentProductFormData,
    currentOriginalPassword,
    currentShopImageUrl,
    currentProductImages,
    currentFormErrors,
    currentProductErrors,
  ) => {
    let overallValid = true;

    // 1. 기본 폼 필드 유효성 검사
    if (!currentFormData.name.trim()) {
      overallValid = false;
    }
    if (!currentFormData.url.trim()) {
      overallValid = false;
    }
    const userIdValidation = validateUserId(currentFormData.userId);
    if (userIdValidation.hasError) {
      overallValid = false;
    }
    // 비밀번호가 입력된 경우에만 유효성 검사 수행
    if (currentFormData.password.trim() !== '') {
      const passwordValidation = validatePassword(currentFormData.password);
      if (passwordValidation.hasError) {
        overallValid = false;
      }
    }

    // 2. 상품 폼 필드 유효성 검사
    currentProductFormData.forEach(product => {
      if (!product.name.trim() || !product.price.toString().trim()) {
        overallValid = false;
      }
    });

    // 3. 비밀번호 변경 시 원본 비밀번호 불일치 확인 (새 비밀번호가 입력된 경우만)
    if (
      currentFormData.password.trim() !== '' &&
      currentFormData.password !== currentOriginalPassword
    ) {
      overallValid = false;
    }

    // 4. 이미지 필드 유효성 검사
    if (!currentShopImageUrl) {
      overallValid = false;
    }
    currentProductImages.forEach(imageUrl => {
      if (!imageUrl) {
        overallValid = false;
      }
    });

    // 5. 현재 formErrors와 productErrors 객체 자체에 hasError: true가 있는지 확인
    const hasFormErrorsInState = Object.values(currentFormErrors).some(
      err => err.hasError,
    );
    const hasProductErrorsInState = currentProductErrors.some(prodErr =>
      Object.values(prodErr).some(err => err.hasError),
    );

    if (hasFormErrorsInState || hasProductErrorsInState) {
      overallValid = false;
    }

    return overallValid;
  };

  /** 초기 데이터 로드 */
  useEffect(() => {
    const fetchDetail = async () => {
      setError(null);
      setIsLoading(true);

      try {
        if (!URLid) {
          setError(
            '상세 정보를 불러올 수 없습니다: 페이지 ID가 누락되었습니다.',
          );
          return;
        }

        const data = await getLinkshopDetail(URLid);
        setShopData(data);
        setFormdata({
          name: data.name,
          url: data.shop?.shopUrl || '',
          userId: data.userId,
          password: '',
        });
        setProductFormData(
          data.products?.map(p => ({ name: p.name, price: p.price })) || [],
        );
        setOriginalPassword(data.password);
        setShopImageUrl(data.shop?.imageUrl || null);

        setProductErrors(
          (data.products || []).map(() => ({
            name: { hasError: false, message: '' },
            price: { hasError: false, message: '' },
            productImage: { hasError: false, message: '' },
          })),
        );
        setProductImages((data.products || []).map(p => p.imageUrl || null));
      } catch (e) {
        console.error('상세 정보 로드 실패:', e);
        setError(
          e.response?.data?.message ||
            '상세 정보를 불러오지 못했습니다. 네트워크 또는 서버 문제일 수 있습니다.',
        );
      } finally {
        setIsLoading(false);
      }
    };
    fetchDetail();
  }, [URLid]);

  /** 폼 유효성 자동 확인 */
  useEffect(() => {
    if (shopData) {
      const isValid = checkFormValidity(
        formData,
        productFormData,
        originalPassword,
        shopImageUrl,
        productImages,
        formErrors,
        productErrors,
      );
      setIsFormValid(isValid);
    }
  }, [
    formData,
    productFormData,
    originalPassword,
    shopData,
    shopImageUrl,
    productImages,
    formErrors,
    productErrors,
  ]);

  /** 상품 정보 변경 핸들러 */
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

  /** 상품 필드 blur 시 유효성 검사 */
  const handleProductBlur = (index, field, value) => {
    let errorResult = { hasError: false, message: '' };

    if (field === 'productImage') {
      if (!value) {
        errorResult = {
          hasError: true,
          message: '상품 이미지를 첨부해주세요.',
        };
      }
    } else {
      const isEmpty = value.toString().trim() === '';
      errorResult = isEmpty
        ? { hasError: true, message: '필수 입력 항목입니다.' }
        : { hasError: false, message: '' };
    }
    setProductErrors(prev => {
      const updated = [...prev];
      if (updated[index]) {
        updated[index][field] = errorResult;
      }
      return updated;
    });
  };

  /** 상점 정보 변경 핸들러 */
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

  /** 상점 필드 blur 시 유효성 검사 */
  const handleShopBlur = (id, value) => {
    let result;
    if (id === 'userId') {
      result = validateUserId(value);
    } else if (id === 'password') {
      // 비밀번호가 비어있으면 유효성 에러를 발생시키지 않음 (수정 안 함으로 간주)
      if (value.trim() === '') {
        result = { hasError: false, message: '' };
      } else {
        result = validatePassword(value);
      }
    } else if (id === 'shopImage') {
      if (!value) {
        result = { hasError: true, message: '상점 이미지를 첨부해주세요.' };
      } else {
        result = { hasError: false, message: '' };
      }
    } else {
      result = {
        hasError: value.trim() === '',
        message: value.trim() === '' ? '필수 입력 항목입니다.' : '',
      };
    }
    setFormErrors(prev => ({ ...prev, [id]: result }));
  };

  /** 개별 상품 삭제 핸들러 */
  const handleDeleteProduct = indexToDelete => {
    if (!window.confirm('정말로 이 상품을 삭제하시겠습니까?')) {
      return;
    }
    setProductFormData(prev =>
      prev.filter((_, index) => index !== indexToDelete),
    );
    setProductImages(prev =>
      prev.filter((_, index) => index !== indexToDelete),
    );
    setProductErrors(prev =>
      prev.filter((_, index) => index !== indexToDelete),
    );
  };

  /** 링크샵 수정 최종 제출 핸들러 */
  const handleUpdate = async () => {
    if (isLoading) return;
    setError(null);
    setIsLoading(true);

    let overallValidForSubmission = true;
    const tempFormErrors = { ...formErrors };
    const tempProductErrors = [...productErrors];

    // 1. 기본 폼 필드 유효성 검사 (제출 시점에 한 번 더)
    for (const key in formData) {
      const value = formData[key];
      let result;
      if (key === 'userId') {
        result = validateUserId(value);
      } else if (key === 'password') {
        // 비밀번호가 비어있으면 유효성 에러를 발생시키지 않음 (수정 안 함으로 간주)
        if (value.trim() === '') {
          result = { hasError: false, message: '' };
        } else {
          result = validatePassword(value);
        }
      } else {
        // name, url
        result = {
          hasError: value.trim() === '',
          message: value.trim() === '' ? '필수 입력 항목입니다.' : '',
        };
      }
      tempFormErrors[key] = result;
      if (result.hasError) overallValidForSubmission = false;
    }
    // 상점 이미지도 제출 시점에 유효성 검사
    if (!shopImageUrl) {
      tempFormErrors.shopImage = {
        hasError: true,
        message: '상점 이미지를 첨부해주세요.',
      };
      overallValidForSubmission = false;
    } else {
      tempFormErrors.shopImage = { hasError: false, message: '' };
    }
    // 제출 시점에만 최종 formErrors 업데이트
    setFormErrors(tempFormErrors);

    // 2. 상품 폼 필드 유효성 검사 (제출 시점에 한 번 더)
    productFormData.forEach((product, idx) => {
      const itemErrors = {
        name: { hasError: false, message: '' },
        price: { hasError: false, message: '' },
        productImage: { hasError: false, message: '' }, // 이미지 에러 필드 포함
      };
      if (!product.name.trim())
        itemErrors.name = { hasError: true, message: '필수 입력 항목입니다.' };
      if (!product.price.toString().trim())
        itemErrors.price = { hasError: true, message: '필수 입력 항목입니다.' };

      // 상품 이미지 유효성 검사
      if (!productImages[idx]) {
        itemErrors.productImage = {
          hasError: true,
          message: '상품 이미지를 첨부해주세요.',
        };
      }

      if (
        itemErrors.name.hasError ||
        itemErrors.price.hasError ||
        itemErrors.productImage.hasError
      )
        overallValidForSubmission = false;
      tempProductErrors[idx] = itemErrors;
    });
    // 제출 시점에만 최종 productErrors 업데이트
    setProductErrors(tempProductErrors);

    // 3. 비밀번호 일치 여부 확인 (새 비밀번호가 입력된 경우만)
    if (
      formData.password.trim() !== '' &&
      formData.password !== originalPassword
    ) {
      overallValidForSubmission = false;
      setError('현재 비밀번호가 일치하지 않습니다. 다시 확인해주세요.');
    }

    // 4. 최종 유효성 검사 결과에 따라 처리
    if (!overallValidForSubmission) {
      setError('입력값을 다시 확인해주세요.');
      setIsLoading(false);
      return;
    }

    const dataToSubmit = {
      name: formData.name,
      userId: formData.userId,
      password: formData.password.trim() !== '' ? formData.password : undefined,
      shop: {
        shopUrl: formData.url,
        imageUrl: shopImageUrl || undefined,
      },
      products: productFormData.map((p, index) => ({
        name: p.name,
        price: Number(p.price),
        imageUrl: productImages[index] || undefined,
      })),
    };

    try {
      console.log(
        `[API Update] ${URLid}번 링크샵 데이터 업데이트 요청:`,
        dataToSubmit,
      );
      await updateLinkshop(URLid, dataToSubmit);

      alert('링크샵 수정 완료!');
      onSuccess?.();
      navigate(`/link/${URLid}`);
    } catch (err) {
      console.error('링크샵 수정 실패 (API 응답):', err);
      setError(
        err.response?.data?.message ||
          '링크샵 수정 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      {isLoading && !shopData ? (
        <p style={{ textAlign: 'center', marginTop: '20px' }}>
          데이터를 불러오는 중...
        </p>
      ) : shopData ? (
        <>
          <UpdateProduct
            products={productFormData}
            onChange={handleProductChange}
            productErrors={productErrors}
            onBlur={handleProductBlur}
            onAddProduct={handleAddProduct}
            productImages={productImages}
            onImageChange={handleImageChange}
            onDeleteProduct={handleDeleteProduct}
          />
          <UpdateShop
            formData={formData}
            onChange={handleChange}
            formErrors={formErrors}
            onBlur={handleShopBlur}
            shopImageUrl={shopImageUrl}
            onShopImageChange={handleShopImageChange}
            onRemoveShopImage={handleRemoveShopImage}
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
      ) : (
        !isLoading &&
        error && (
          <p style={{ color: 'red', textAlign: 'center', marginTop: '20px' }}>
            {error}
          </p>
        )
      )}
    </Container>
  );
};

export default UpdateShopPage;
