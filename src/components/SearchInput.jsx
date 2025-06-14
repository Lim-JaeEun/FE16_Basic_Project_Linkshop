import { useEffect, useState } from 'react';

import styled from 'styled-components';

import searchIcon from '../assets/icon/ic_search.png';

const SearchInputContainer = styled.div`
  position: relative;
  width: 100%;
  height: 50px;
  border: 1px solid #dddcdf;
  border-radius: 49px;
  display: flex;
  align-items: center;
  padding: 0 18.34px;
  gap: 13px;
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

function SearchInput({ onChange: handleSearchChange }) {
  const [debouncedValue, setDebouncedValue] = useState('');

  const handleDebouncedValue = e => {
    setDebouncedValue(e.target.value);
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      handleSearchChange(debouncedValue);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [debouncedValue]);

  return (
    <SearchInputContainer>
      <SearchIconWrapper />
      <StyledInput
        type='text'
        placeholder='이름으로 검색해보세요'
        value={debouncedValue}
        onChange={handleDebouncedValue}
      />
    </SearchInputContainer>
  );
}

export default SearchInput;
