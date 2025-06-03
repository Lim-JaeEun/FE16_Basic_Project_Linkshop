// import React from 'react';
import styled from 'styled-components';
// import { useNavigate } from 'react-router-dom';
import BackgroundImg from '../assets/img/img_detailpage_bg_mobile.png';
// console.log('ProfileImage imported as URL:', ProfileImage);
import ProfileImage from '../components/ProfileImage';
import BackIcon from '../assets/icon/btn_back.png';
import ShareIcon from '../assets/icon/btn_share.png';
import MoreIcon from '../assets/icon/btn_kebap.png'; 
import HeartIcon from '../assets/icon/btn_empty_heart.png';

// --- Styled Components ---

const PageWrapper = styled.div`
  min-height: 100vh;
  background-color: #fff; /* 페이지 배경색 예시 */
`;

// HeroSection을 유지할 경우 (상단 배경 이미지)
const HeroSection = styled.div`
  width: 100%;
  height: 70px;
  background-image: url(${BackgroundImg});
  background-size: cover;
  background-position: center;
`;

const HeaderBar = styled.header`
  display: flex;
  justify-content: flex-start; /* 왼쪽 정렬 */
  align-items: center;
  width: 100%;
  height: 56px;
  padding: 0 12px;
  box-sizing: border-box;
  position: sticky;
  top: 0;
  z-index:10;
  background-color: #fff;
`;

const HeaderLeftSection = styled.div` /* HeaderBar 내부의 왼쪽 컨텐츠를 위한 명시적 그룹 */
  display: flex;
  align-items: center;
  gap: 8px;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  padding: 8px;
  margin: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    display: block;
  }
`;

const HeaderText = styled.span`
  font-size: 16px;
  color: #333;
  font-weight: 500;
`;

const ContentContainer = styled.main`
   padding-top: 56px; /* 현재 HeaderBar가 sticky 이므로 유지 */
`;

// --- Shop Info Section Styled Components ---
const ShopInfoWrapper = styled.div`
  background-color: #FAFAFB;
  margin: 16px;
  padding: 20px;
  border-radius: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const ShopTopControls = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between; /* 왼쪽 좋아요, 오른쪽 아이콘 그룹 */
  align-items: center;
  margin-bottom: 20px; /* 프로필 이미지와의 간격 늘림 */
  height: 23px; /* 아이콘 크기 등 고려한 높이 */
`;

const LikeInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 6px; /* 아이콘과 숫자 사이 간격 */
  font-size: 15px;
  color: #555;
  cursor: pointer;
`;

const ShopActionIcons = styled.div` /* 카드 내 오른쪽 아이콘 그룹 */
  display: flex;
  align-items: center;
  gap: 0px; /* 아이콘 버튼 자체에 패딩이 있으므로 간격 조절 */
`;

const ShopName = styled.h1`
  font-size: 24px; /* 이름 크기 조정 */
  font-weight: bold;
  color: #222;
  margin: 0 0 6px 0; /* 핸들과의 간격 조정 */
`;

const ShopHandle = styled.p`
  font-size: 15px; /* 핸들 크기 조정 */
  color: #777;
  margin: 0;
`;
// --- End of Shop Info Section Styled Components ---


// --- DetailShopPage Component ---
const DetailShopPage = () => {
  // const navigate = useNavigate();

  const handleGoBack = () => {
    console.log("뒤로가기 버튼 클릭");
    // 예: navigate(-1);
  };

  // 카드 내부 아이콘 핸들러
  const handleCardShare = () => {
    console.log("카드 공유 아이콘 클릭");
  };

  const handleCardMoreOptions = () => {
    console.log("카드 더보기 아이콘 클릭");
  };

  const handleLikeClick = () => {
    console.log("좋아요 클릭");
  }

  // 가짜 데이터
  const shopData = {
    profileImageUrl: 'null',
    name: '너구리 직구상점',
    handle: '@pumpkinraccoon',
    likes: 65,
  };

  return (
    <PageWrapper>
      <HeroSection /> {/* 상단 이미지가 필요하면 주석 해제 */}

      <HeaderBar>
        {/* HeaderBar에는 이제 뒤로가기 관련 요소만 남습니다. */}
        <HeaderLeftSection>
          <IconButton onClick={handleGoBack} aria-label="뒤로가기">
            <img src={BackIcon} alt="뒤로가기" />
          </IconButton>
          <HeaderText>돌아가기</HeaderText>
        </HeaderLeftSection>
        {/* 공유, 더보기 아이콘은 HeaderBar에서 제거됨 */}
      </HeaderBar>

      <ContentContainer>
        <ShopInfoWrapper>
          <ShopTopControls>
            <LikeInfo onClick={handleLikeClick}>
      <img
        src={HeartIcon}
        alt="좋아요"
        style={{ width: '22px', height: '22px' }} // 아이콘 크기는 원하는 대로 조절
      />
      <span>{shopData.likes}</span>
            </LikeInfo>

            {/* 카드 내부에 공유 및 더보기 아이콘 추가 */}
            <ShopActionIcons>
              <IconButton onClick={handleCardShare} aria-label="공유하기">
                <img src={ShareIcon} alt="공유" />
              </IconButton>
              <IconButton onClick={handleCardMoreOptions} aria-label="더보기">
                <img src={MoreIcon} alt="더보기" />
              </IconButton>
            </ShopActionIcons>
          </ShopTopControls>

          <ProfileImage src={shopData.profileImageUrl} size="88px" />
          <ShopName>{shopData.name}</ShopName>
          <ShopHandle>{shopData.handle}</ShopHandle>
        </ShopInfoWrapper>

        <div style={{ padding: '16px', textAlign: 'center', marginTop: '20px' }}>
          대표 상품 목록 등 추가 콘텐츠 영역
        </div>
      </ContentContainer>
    </PageWrapper>
  );
};

export default DetailShopPage;