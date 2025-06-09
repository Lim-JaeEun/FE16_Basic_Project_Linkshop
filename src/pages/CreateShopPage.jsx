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
  const [disabled, setDisabled] = useState(true);
  //isDisabled => ui에 영향을 주지 않고 필드의 데이터값이 유효한지 확인하는 용도
  //disabled => 실제 버튼이 활성화ui에 영향을 주는 상태, isDisabled와 completeData를 교차검증하여 최종적으로 상태가 변경
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

    console.log(dataForSubmit);

    const { error } = await createLinkshop(dataForSubmit);
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
      setDisabled(prev => true);
    } else if (isDisabled) {
      setDisabled(prev => true);
    } else if (!isDisabled && !deepIsEmpty(completeData)) {
      setDisabled(prev => false);
    }
  }, [isDisabled]);

  console.log(completeData);
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
      <CreateButton type='button' onClick={handleCreate} disabled={disabled}>
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
