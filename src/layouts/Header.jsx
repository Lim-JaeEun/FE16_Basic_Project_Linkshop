import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

// --- Styled Components ---

const Stheader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background-color: #fff;
  box-sizing: border-box;
  margin-top : 42px;
  margin-bottom: 32px;
  height: 36px; /* 모든 화면 크기에서 헤더 높이 36px로 고정 */

  /* 공통: 좌우 중앙 정렬 (데스크탑) */
  margin-left: auto;
  margin-right: auto;

  /* 데스크탑 (1024px 이상으로 가정) */
  padding: 0 1.5rem; /* 상하 패딩 0, 좌우 패딩으로 내부 여백 확보 */
  max-width: 1199px;

  /* 태블릿 (768px ~ 1023px) */
  @media (max-width: 1023px) {
    padding: 0 1rem;
    max-width: 100%;
    margin-left: 0;
    margin-right: 0;
    margin-top:40px;
  }

  /* 모바일 (767px 이하) */
  @media (max-width: 767px) {
    margin-top:28px;
    padding: 0 0.75rem;
  }
`;

// 로고
const Logo = styled.a`
  font-weight: 900;
  color: #000;
  text-decoration: none;
  line-height: 36px; /* 헤더 높이에 맞춰 수직 중앙 정렬 */
  margin: 0;
  padding: 0;

  /* 데스크탑 로고 글자 크기 */
  font-size: 1.5rem;

  /* 태블릿 */
  @media (max-width: 1023px) {
    font-size: 1.6rem;
  }

  /* 모바일 */
  @media (max-width: 767px) {
    font-size: 1.7rem;
  }
`;

// 버튼을 담는 컨테이너
const ButtonContainer = styled.div`
  display: flex;
  align-items: center; /* 내부 버튼(들)을 수직 중앙 정렬 */
  gap: 10px; /* 여러 버튼이 올 경우 버튼 사이의 간격 */
  height: 100%; /* 부모 높이(36px)를 채우도록 설정 */
`;


const Header = () => {
  return (
    <>
      <Stheader>
        <Logo href="/list">LINK SHOP</Logo>
        <ButtonContainer>버튼
          {/* 다른 팀원이 여기에 버튼 컴포넌트를 추가할 예정입니다.*/}
        </ButtonContainer>
      </Stheader>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Header;