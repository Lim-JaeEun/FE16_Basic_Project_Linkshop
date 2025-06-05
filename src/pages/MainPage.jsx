import { useEffect, useRef, useState, useCallback } from 'react';

import styled from 'styled-components';

import CardList from '../components/CardList';
import { getLinkshops } from './../api/api';
import OrderSelector from './../components/OrderSelector';
import SearchInput from './../components/SearchInput';

const MainPageWrapper = styled.div`
  --content-max-width: 1200px;
  --page-spacing-x-mobile: 16px;
  --page-spacing-x-tablet: 24px;
  --page-spacing-x-desktop: 24px;

  margin: 0 var(--page-spacing-x-mobile);

  @media (min-width: 768px) {
    margin: 0 var(--page-spacing-x-tablet);
  }

  @media (min-width: 1024px) {
    max-width: calc(
      var(--content-max-width) + var(--page-spacing-x-desktop) * 2
    );
    margin: 0 auto;
    padding: 0 var(--page-spacing-x-desktop);
  }
`;

const StOrderSelector = styled(OrderSelector)`
  --order-selector-spacing-y-mobile: 20px;
  --order-selector-spacing-y-tablet: 28px;
  --order-selector-spacing-y-desktop: 40px;

  margin: var(--order-selector-spacing-y-mobile) 0;

  @media (min-width: 768px) {
    margin: var(--order-selector-spacing-y-tablet) 0;
  }

  @media (min-width: 1024px) {
    margin: var(--order-selector-spacing-y-desktop) 0;
  }
`;

const MainPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [keyword, setKeyword] = useState('');
  const [order, setOrder] = useState('recent');
  const [cursor, setCursor] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [linkshops, setLinkshops] = useState([]);

  const observeRef = useRef();

  const loadLinkshops = useCallback(async loadOptions => {
    if (loadOptions.cursor === null) return;

    setIsLoading(true);
    setError(null);

    try {
      const { list: newList, nextCursor } = await getLinkshops(loadOptions);

      if (loadOptions.cursor === 0) setLinkshops(newList);
      else setLinkshops(prev => [...prev, ...newList]);

      nextCursor !== null ? setHasMore(true) : setHasMore(false);
      setCursor(nextCursor);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 초기 데이터 및 검색과 정렬 변경 시 데이터 로드
  useEffect(() => {
    const loadOptions = {
      keyword: keyword,
      orderBy: order,
      cursor: 0,
    };

    setLinkshops([]);
    loadLinkshops(loadOptions);
  }, [loadLinkshops, order, keyword]);

  // 무한 스크롤
  useEffect(() => {
    if (isLoading || !hasMore) return;

    const loadOptions = {
      keyword: keyword,
      orderBy: order,
      cursor: cursor,
    };

    const intersectionOptions = {
      root: null, // 뷰포트를 기준으로 관찰 (기본값)
      rootMargin: '0px',
      threshold: 0.1, // 타겟 요소의 10%가 뷰포트에 들어오면 콜백 실행
    };

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && hasMore) {
          loadLinkshops(loadOptions);
        }
      });
    }, intersectionOptions);

    if (observeRef.current) observer.observe(observeRef.current);

    return () => {
      if (observeRef.current) observer.unobserve(observeRef.current);
    };
  }, [loadLinkshops, cursor]);

  const handleSearchChange = e => {
    setKeyword(e.target.value);
  };

  const handleOrderClick = selectedOrder => {
    setOrder(selectedOrder);
  };

  if (error) {
    return <p>{error.message}</p>; // Error 발생 시 Error 페이지로 보내주는 것도 괜찮을 듯.
  }

  return (
    <>
      <MainPageWrapper>
        <SearchInput value={keyword} onChange={handleSearchChange} />
        <StOrderSelector order={order} onClick={handleOrderClick} />
        <CardList cardData={linkshops} />
        {isLoading && (
          <p style={{ width: '100%', textAlign: 'center' }}>
            데이터 불러오는 중...
          </p> // indicator 구현하면 예쁠듯. 임시 텍스트
        )}
      </MainPageWrapper>
      {hasMore && !isLoading && (
        <div ref={observeRef} style={{ height: '20px' }} />
      )}
    </>
  );
};

export default MainPage;
