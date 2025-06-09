// src/pages/DetailShopPage.jsx
import { useEffect, useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

import { getLinkshopDetail } from '../api/api';
import DeskTopBackgroundImg from '../assets/img/img_detailpage_bg_desktop.png';
import BackgroundImg from '../assets/img/img_detailpage_bg_mobile.png';
import TabletBackgroundImg from '../assets/img/img_detailpage_bg_tablet.png';
import LinkHeader from '../components/LinkHeader';
import PasswordModal from '../components/PasswordModal';
import ProductList from '../components/ProductList';
import ShopProfileCard from '../components/ShopProfileCard';
import Toast from '../Toast';
import { useAsync } from './../hooks/useAsync';

// --- 페이지 레벨 Styled Components ---
const PageWrapper = styled.div`
  min-height: 100vh;
  background-color: #ffffff;
`;

const MainContentLayoutWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  @media (min-width: 768px) and (max-width: 1023px) {
    max-width: 720px;
  }
  @media (min-width: 1024px) {
    max-width: 960px;
  }
`;

const HeroSection = styled.div`
  width: 100%;
  height: 80px;
  background-image: url(${BackgroundImg});
  background-size: 100%;
  background-repeat: repeat-x;
  background-position: top center;
  @media (min-width: 768px) {
    background-image: url(${TabletBackgroundImg});
  }
  @media (min-width: 1024px) {
    background-image: url(${DeskTopBackgroundImg});
  }
`;

const ContentContainer = styled.main`
  width: 100%;
`;
// --- End of 페이지 레벨 Styled Components ---

const DetailShopPage = () => {
  // --- 상태 관리 및 핸들러, 데이터는 이전과 동일하게 유지 ---
  const navigate = useNavigate();
  const { URLid } = useParams();
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isActionMenuOpen, setIsActionMenuOpen] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  const [toastMessage, setToastMessage] = useState('');

  const { data: shopInfo, execute: getLinkshop } = useAsync(getLinkshopDetail, {
    delayLoadingTransition: false,
  });

  const initialShopData = {
    shopId: 1,
    shopName: '너구리 직구상점',
    shopUrl: null,
    category: '해외직구',
    likeCount: 0,
    isInitiallyLiked: false,
    userId: 101,
    handle: '@pumpkinraccoon',
  };

  const [isLiked, setIsLiked] = useState(initialShopData.isInitiallyLiked);
  const [currentLikeCount, setCurrentLikeCount] = useState(
    initialShopData.likeCount,
  );

  useEffect(() => {
    getLinkshop(URLid);
  }, []);

  const handleGoBack = () => {
    navigate('/list');
  };
  const handleShareLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      alert('URL이 복사되었습니다!');
    } catch {
      alert('URL 복사에 실패했습니다.');
    }
  };
  const handleToggleActionMenu = () => {
    setIsActionMenuOpen(prev => !prev);
  };
  const handleEditClick = () => {
    navigate(`/link/${URLid}/edit`);
  };
  const handleDeleteClick = () => {
    console.log('DetailShopPage의 handleDeleteClick 함수 실행됨!');
    setIsActionMenuOpen(false);
    setPasswordError('');
    setIsPasswordModalOpen(true);
  };
  const handlePasswordSubmit = async password => {
    try {
      const response = await fetch(
        `https://linkshop-api.vercel.app/16-5/linkshops/${URLid}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ currentPassword: password }),
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        setPasswordError(errorData.message || '비밀번호가 일치하지 않습니다.');
        return;
      }

      setIsPasswordModalOpen(false);
      setToastMessage('정상적으로 삭제되었습니다.');

      setTimeout(() => {
        navigate('/list');
      }, 1000);
    } catch (error) {
      console.error('삭제 요청 중 에러 발생:', error);
      setPasswordError('삭제 처리 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  const handleCloseModal = () => {
    setIsPasswordModalOpen(false);
    setPasswordError('');
  };
  const handleLikeClick = () => {
    const newLikedState = !isLiked;
    const newLikesCount = newLikedState
      ? currentLikeCount + 1
      : currentLikeCount - 1;
    setIsLiked(newLikedState);
    setCurrentLikeCount(newLikesCount);
  };

  return (
    <PageWrapper>
      <MainContentLayoutWrapper>
        <HeroSection />
        <LinkHeader onGoBack={handleGoBack} />
        <ContentContainer>
          <ShopProfileCard
            shopInfo={shopInfo}
            isLiked={isLiked}
            onLikeClick={handleLikeClick}
            onShareClick={handleShareLink}
            onMoreOptionsClick={handleToggleActionMenu}
            isActionMenuOpen={isActionMenuOpen}
            onEditActionClick={handleEditClick}
            onDeleteActionClick={handleDeleteClick}
          />
          <ProductList title='대표 상품' shopInfo={shopInfo} />
        </ContentContainer>
      </MainContentLayoutWrapper>
      {isPasswordModalOpen && (
        <PasswordModal
          isOpen={isPasswordModalOpen}
          onClose={handleCloseModal}
          onSubmit={handlePasswordSubmit}
          error={passwordError}
          title='정말로 삭제하시겠습니까?'
          description={'삭제를 원하시면 비밀번호를 입력해주세요.'}
          submitButtonText='삭제하기'
        />
      )}
      <Toast message={toastMessage} />
    </PageWrapper>
  );
};

export default DetailShopPage;
