import styled from 'styled-components';
import searchIconPng from '../assets/icon/ic_search.png';

const StyledHeader = styled.header`
  display: flex;
  flex-direction: column;
  padding: 1.5rem;       /* 내부 여백은 그대로 유지 */
  background-color: #fff; /* 배경색도 흰색으로 유지 */
  gap: 1.25rem;          /* 첫 번째 줄과 두 번째 줄 사이의 간격도 유지 */

  /* --- 헤더를 화면 중앙에 배치하기 위한 스타일--- */
  max-width: 1200px;
  width: 100%;           /* 화면 너비가 1200px보다 작을 경우에는 100%를 채워서 반응형으로 동작 */
  margin : 0 auto;
  
`;

const TopRow = styled.div`
  display: flex;
  justify-content: space-between; /* 로고는 왼쪽, 버튼은 오른쪽에 배치 */
  align-items: center; /* 세로 중앙 정렬 */
  width: 100%; /* 부모 너비(StyledHeader)를 꽉 채움 */
`;

const Logo = styled.h1`
  font-size: 2rem;
  font-weight: 900; /* 매우 굵은 글씨체 */
  color: #000; /* 검은색 */
  margin: 0; /* h1 태그의 기본 마진 제거 */
`;

const CreateButton = styled.button`
  padding: 10px 20px; /* 버튼 내부 여백 */
  background-color: #3E45EC;
  color: white; /* 글자색 흰색 */
  border: none; /* 테두리 없음 */
  border-radius: 37px; /* 버튼 모서리 둥글게 */
  cursor: pointer;
  font-size: 0.95rem; /* 글자 크기 */
  font-weight: 500; /* 글자 굵기 */

  &:hover {
    background-color:rgb(39, 44, 188); /* 마우스 올렸을 때 약간 어두운 파란색 */
  }
`;

// 검색창 전체를 감싸는 컨테이너
const SearchInputWrapper = styled.div`
  position: relative; /* 아이콘을 absolute positioning 하기 위함 */
  width: 100%; /* 부모 너비(StyledHeader)를 꽉 채움 */
  display: flex; /* 내부 요소 정렬 */
  align-items: center; /* 세로 중앙 정렬 */
`;

// 검색 아이콘 스타일
const IconSpan = styled.span`
  position: absolute; /* SearchInputWrapper 기준으로 절대 위치 */
  left: 15px; /* 왼쪽에서 15px 떨어진 곳에 배치 */
  top: 50%; /* 상단에서 50% 위치 */
  transform: translateY(-50%); /* Y축으로 자신의 높이의 50%만큼 올려 중앙 정렬 */
  pointer-events: none; /* 아이콘이 마우스 이벤트를 가로채지 않도록 설정 */
`;

const SearchInput = styled.input`
  width: 100%; /* SearchInputWrapper 너비를 꽉 채움 */
  padding: 14px 20px 14px 45px; /* 안쪽 여백: 상 14px, 우 20px, 하 14px, 좌 45px (왼쪽은 아이콘 공간 확보) */
  border: 1px solid #DDDCDF; /* 테두리 색상 */
  border-radius: 49px; /* 모서리 둥글게 */
  font-size: 1rem;
  box-sizing: border-box;
  outline: none; /* 포커스 시 기본 아웃라인 제거 */

  &::placeholder {
    color: #888790; /* placeholder 글자 색상 */
  }

  &:focus {
    border-color: #777; /* 포커스 시 테두리 색상 */
  }
`;

const SearchIconImage = styled.img`
  width: 18px;
  height: 18px;
  display: block; 
`;

// --- Header Component ---

const Header = () => {
  return (
    <StyledHeader>
      <TopRow>
        <Logo>LINK SHOP</Logo>
        <CreateButton>생성하기</CreateButton>
      </TopRow>
      
      <SearchInputWrapper>
        <IconSpan>
          <SearchIconImage src={searchIconPng} alt="검색 아이콘" /> 
        </IconSpan>
        <SearchInput type="text" placeholder="샵 이름으로 검색해 보세요." />
      </SearchInputWrapper>
    </StyledHeader>
  );
};

export default Header;