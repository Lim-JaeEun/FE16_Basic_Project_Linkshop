import styled from 'styled-components';

import searchIcon from '../assets/icon/ic_search.png';

const SearchInputContainer = styled.div`
  position: relative;
  width: 344px;
  height: 50px;
  border: 1px solid #dddcdf;
  border-radius: 49px;
  display: flex;
  align-items: center;
  padding: 0 18.34px;
  gap: 13px;

  /* 태블릿 (768px 이상 1023px 이하): 696px */
  @media (min-width: 768px) {
    width: 696px;
  }

  /* 데스크탑 (1024px 이상): 1199px */
  @media (min-width: 1024px) {
    width: 1199px;
  }
`;

const StyledInput = styled.input`
  flex-grow: 1;
  border: none;
  outline: none;
  background: transparent;
  height: 100%;

  &::placeholder {
    color: ${({ theme }) => theme.colors.secGray300};
  }
`;

const SearchIconWrapper = styled.div`
  width: 23px;
  height: 23px;
  background-image: url(${searchIcon});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  flex-shrink: 0;
`;

function SearchInput({ value, onChange }) {
  return (
    <SearchInputContainer>
      <SearchIconWrapper />
      <StyledInput
        type='text'
        placeholder='이름으로 검색해보세요'
        value={value}
        onChange={onChange}
      />
    </SearchInputContainer>
  );
}

export default SearchInput;
