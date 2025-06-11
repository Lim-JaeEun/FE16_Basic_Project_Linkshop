import styled from 'styled-components';

import noResultImg from '../assets/img/Img_search_null.png';
import { FontTypes } from '../styles/theme';
import { applyFontStyles } from './../styles/mixins';

const NoResultImg = styled.img``;

const NoSearchResultWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 32px;
  width: 100%;

  & p {
    ${applyFontStyles(FontTypes.MEDIUM17)}
    text-align: center;
  }
`;

const NoSearchResult = () => {
  return (
    <NoSearchResultWrapper>
      <NoResultImg
        src={noResultImg}
        alt='검색 결과가 없음을 알리는 이미지'
        width={375}
        height={'auto'}
      />
      <p>
        검색 결과가 없어요
        <br />
        지금 프로필을 만들고 내 상품을 소개해보세요
      </p>
    </NoSearchResultWrapper>
  );
};

export default NoSearchResult;
