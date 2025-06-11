import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { createLinkshop, uploadImage } from '../api/api';
import ConfirmCreateModal from '../components/ConfirmCreateModal';
import CreateProducts from '../components/CreateProducts';
import CreateShop from '../components/CreateShop';
import ErrorModal from '../components/ImageFormatErrorModal';
import BaseButton from '../components/PrimaryButton';
import { useAsync } from '../hooks/useAsync';
import theme from '../styles/theme';
import { ColorTypes } from '../styles/theme';
import deepIsEmpty from '../utils/deepIsEmpty';

const PageContainer = styled.div`
  min-width: 375px;
  margin: 0 auto;
  width: 100%;
  padding: 0 16px;
  @media (min-width: 768px) {
    width: 744px;
    padding: 0 24px;
  }
`;

const CreateButton = styled(BaseButton)`
  width: 344px;
  height: 50px;
  margin: 0 auto 124px;
  display: block;
  background-color: ${({ disabled }) =>
    disabled === true
      ? theme.colors[ColorTypes.SECONDARY_GRAY_200]
      : theme.colors[ColorTypes.PRIMARY]};

  @media (min-width: 768px) {
    width: 696px;
  }
`;

const INITIAL_DATA = {
  shop: { imageUrl: null, urlName: null, shopUrl: null },
  products: [],
  password: null,
  userId: null,
  name: null,
};

function CreateShopPage({ onSuccess }) {
  const [completeData, setCompleteData] = useState(INITIAL_DATA);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [disabled, setDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  //isDisabled => ui에 영향을 주지 않고 필드의 데이터값이 유효한지 확인하는 용도
  //disabled => 실제 버튼이 활성화ui에 영향을 주는 상태, isDisabled와 completeData를 교차검증하여 최종적으로 상태가 변경
  const { execute: asyncUploadImage, error: imageError } = useAsync(
    uploadImage,
    { delayLoadingTransition: true },
  );
  const {
    execute: asyncCreateLinkshop,
    isLoading: createLoading,
    error: createError,
  } = useAsync(createLinkshop, { delayLoadingTransition: true });
  const navigate = useNavigate();

  const handleConfirm = () => {
    setIsConfirmModalOpen(false);
    onSuccess?.();
    navigate('/list');
  };

  const handleCloseModal = () => {
    setIsErrorModalOpen(false);
  };

  const onSuccsessCreate = res => {
    if (res) {
      setIsConfirmModalOpen(true);
    }
  };

  const onFailCreate = () => {
    setIsErrorModalOpen(true);
    setIsLoading(prev => false);
    if (createError?.request?.response.includes('아이디입니다')) {
      setDisabled(prev => true);
    }
  };

  const handleCreate = async () => {
    setIsLoading(prev => true);
    // 이미지 업로드 -> 데이터 전송 두 종류 api 순차 실행
    const copiedList = completeData.products.map(product => {
      return { ...product };
    });
    for (const product of copiedList) {
      product.imageUrl = await asyncUploadImage(product.imageUrl);
      delete product.id;
    }

    const copiedShop = { ...completeData.shop };
    copiedShop.imageUrl = await asyncUploadImage(copiedShop.imageUrl);

    const dataForSubmit = {
      ...completeData,
      products: [...copiedList],
      shop: { ...copiedShop },
    };

    const res = await asyncCreateLinkshop(dataForSubmit);

    onSuccsessCreate(res);
  };

  //폼 하나의 검사가 통과하고, 나머지에 빈값이 없지만 오류값은 있는 경우 -> 해결하려면 모든 필드에서도 버튼 컨트롤을 해야함
  useEffect(() => {
    if (!isDisabled && deepIsEmpty(completeData)) {
      setIsDisabled(prev => true);
      setDisabled(prev => true);
    } else if (isDisabled) {
      setDisabled(prev => true);
    } else if (!isDisabled && !deepIsEmpty(completeData)) {
      setDisabled(prev => false);
    }
  }, [isDisabled, completeData]);

  useEffect(() => {
    const current = createLoading;
    setIsLoading(prev => (prev !== current ? createLoading : prev));
  }, [createLoading]);

  useEffect(() => {
    if (imageError || createError) {
      onFailCreate();
    }
  }, [imageError, createError]);

  return (
    <PageContainer>
      <CreateProducts
        setIsDisabled={setIsDisabled}
        onSaveCompleteData={setCompleteData}
      />
      <CreateShop
        setIsDisabled={setIsDisabled}
        onSaveCompleteData={setCompleteData}
      />
      <CreateButton
        type='button'
        onClick={handleCreate}
        disabled={disabled || isLoading}
      >
        {isLoading ? '생성중입니다..' : '생성하기'}
      </CreateButton>
      <ConfirmCreateModal
        onConfirm={handleConfirm}
        isOpen={isConfirmModalOpen}
        message='등록이 완료되었습니다.'
      />
      <ErrorModal
        onConfirm={handleCloseModal}
        isOpen={isErrorModalOpen}
        message={
          createError?.request?.response?.includes('아이디입니다')
            ? `이미 존재하는 아이디입니다.\n다른 아이디를 입력해 주세요.`
            : `요청을 보내는중 문제가 발생했습니다.\n다시 시도해 주세요.`
        }
      />
    </PageContainer>
  );
}

export default CreateShopPage;
