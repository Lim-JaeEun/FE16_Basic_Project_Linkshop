import { useCallback, useEffect, useState } from 'react';

import { useAsync } from './useAsync';
import { getLinkshops } from '../api/api';

export const useLinkshopsData = () => {
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

  return {
    linkshops,
    keyword,
    setKeyword,
    order,
    setOrder,
    cursor,
    isLoading,
    error,
    hasMore,
    handleLoadMore,
  };
};
