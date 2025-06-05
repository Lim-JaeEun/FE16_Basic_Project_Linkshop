import { useEffect, useState } from 'react';

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
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const [keyword, setKeyword] = useState('');
  const [order, setOrder] = useState('recent');
  const [cursor, setCursor] = useState(0);
  const [linkshops, setListshops] = useState(null);

  useEffect(() => {
    const loadOptions = {
      keyword: keyword,
      orderBy: order,
      cursor: 0,
    };

    const loadLinkshops = async loadOptions => {
      setIsPending(true);
      setError(null);

      try {
        const data = await getLinkshops(loadOptions);
        if (cursor === 0) setListshops(data.list);
        else setListshops(prev => setListshops([...prev, ...data.list]));
        setCursor(data.nextCursor);
      } catch (error) {
        setError(error);
      } finally {
        setIsPending(false);
      }
    };

    loadLinkshops(loadOptions);
  }, [order, keyword]);

  const handleSearchChange = e => {
    setKeyword(e.target.value);
    setCursor(0);
  };

  const handleOrderClick = selectedOrder => {
    setOrder(selectedOrder);
    setCursor(0);
  };

  if (error) {
    return <p>{error.message}</p>; // Error 발생 시 Error 페이지로 보내주는 것도 괜찮을 듯.
  }

  return (
    <MainPageWrapper>
      <SearchInput value={keyword} onChange={handleSearchChange} />
      <StOrderSelector order={order} onClick={handleOrderClick} />
      {isPending ? (
        <p>pending상태</p> // indicator 구현하면 예쁠듯
      ) : (
        <CardList cardData={linkshops} />
      )}
    </MainPageWrapper>
  );
};

export default MainPage;
