import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { createLinkshop } from '../api/api';
import ConfirmCreateModal from '../components/ConfirmCreateModal';
import CreateProducts from '../components/CreateProducts';
import CreateShop from '../components/CreateShop';
import BaseButton from '../components/PrimaryButton';
import theme from '../styles/theme';
import { ColorTypes } from '../styles/theme';
import deepIsEmpty from '../utils/deepIsEmpty';

const PageContainer = styled.div`
  width: 375px;
  margin: 0 auto;

  @media (min-width: 768px) {
    width: 744px;
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const navigate = useNavigate();

  const handleConfirm = () => {
    setIsModalOpen(false);
    navigate('/list');
  };

  const handleCreate = async () => {
    // 1. 데이터 저장 로직 수행 (예: API 호출)
    const copiedList = completeData.products.map(product => {
      return { ...product };
    });
    for (const product of copiedList) {
      delete product.id;
    }

    const dataForSubmit = {
      ...completeData,
      products: [...copiedList],
    };

    const { responseData, error } = await createLinkshop(dataForSubmit);
    if (error) {
      alert(error.message);
      return;
    }

    // 2. 성공 시 토스트 띄우기
    onSuccess?.();

    // 3. 모달 띄우기
    setIsModalOpen(true);
  };

  //폼 하나의 검사가 통과하고, 나머지에 빈값이 없지만 오류값은 있는 경우 -> 해결하려면 모든 필드에서도 버튼 컨트롤을 해야함
  useEffect(() => {
    if (!isDisabled && deepIsEmpty(completeData)) {
      setIsDisabled(prev => true);
    }
  }, [isDisabled]);

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
      <CreateButton type='button' onClick={handleCreate} disabled={isDisabled}>
        생성하기
      </CreateButton>
      <ConfirmCreateModal
        onConfirm={handleConfirm}
        isOpen={isModalOpen}
        message='등록이 완료되었습니다.'
      />
    </PageContainer>
  );
}

export default CreateShopPage;
