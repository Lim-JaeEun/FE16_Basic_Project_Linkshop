import { useCallback, useEffect, useRef, useState } from 'react';

import styled from 'styled-components';

import CardList from '../components/CardList';
import LoadingIndicator from '../components/LoadingIndicator';
import { useAsync } from '../hooks/useAsync';
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

const StObserveContainer = styled.div`
  height: 20px;
  margin-bottom: -20px;
`;

const MainPage = () => {
  const [linkshops, setLinkshops] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [order, setOrder] = useState('recent');
  const [cursor, setCursor] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const {
    execute: loadLinkshops,
    data: pageData = {},
    isLoading,
    error,
  } = useAsync(getLinkshops, { delayLoadingTransition: true });

  const observerTargetRef = useRef();

  // 초기 데이터 및 검색과 정렬 변경 시 데이터 로드
  useEffect(() => {
    setLinkshops([]);
    setCursor(0);
    setHasMore(true);

    const initialLoadOptions = {
      keyword: keyword.trim(),
      orderBy: order,
      cursor: 0,
    };
    loadLinkshops(initialLoadOptions);
  }, [loadLinkshops, keyword, order]);

  // 로드된 데이터로 상태를 업데이트
  useEffect(() => {
    if (pageData && pageData.list) {
      cursor
        ? setLinkshops(prev => [...prev, ...pageData.list])
        : setLinkshops(pageData.list);

      setCursor(pageData.nextCursor);
      setHasMore(pageData.nextCursor !== null);
    }
  }, [pageData]);

  // 데이터를 더 불러오는 함수
  const handleLoadMore = useCallback(() => {
    if (!isLoading && hasMore) {
      const nextLoadOptions = {
        keyword: keyword.trim(),
        orderBy: order,
        cursor: cursor,
      };
      loadLinkshops(nextLoadOptions);
    }
  }, [keyword, order, cursor, isLoading, hasMore]);

  // Intersection API를 활용한 무한 스크롤
  useEffect(() => {
    if (!observerTargetRef.current) return;

    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          handleLoadMore();
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
      },
    );

    observer.observe(observerTargetRef.current);

    return () => {
      observer.disconnect();
    };
  }, [isLoading, hasMore, handleLoadMore]);

  const handleSearchChange = keyword => {
    setKeyword(keyword);
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
        <SearchInput onChange={handleSearchChange} />
        <StOrderSelector order={order} onClick={handleOrderClick} />
        <CardList cardData={linkshops} isLoading={isLoading} />
      </MainPageWrapper>
      <LoadingIndicator
        $isLoading={isLoading}
        $hasMore={hasMore}
        $isInitialLoad={cursor === 0}
      />
      {hasMore && <StObserveContainer ref={observerTargetRef} />}
    </>
  );
};

export default MainPage;
