import styled from 'styled-components';

import CardList from '../components/CardList';
import LoadingIndicator from '../components/LoadingIndicator';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { useLinkshopsData } from '../hooks/useLinkshopsData';
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
  const {
    linkshops,
    setKeyword,
    order,
    setOrder,
    cursor,
    isLoading,
    error,
    hasMore,
    handleLoadMore,
  } = useLinkshopsData();

  // Intersection을 활용한 무한 스크롤
  const observerTargetRef = useInfiniteScroll(
    handleLoadMore,
    hasMore,
    isLoading,
  );

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
        $isEmptyList={linkshops.length === 0}
        $isInitialLoad={cursor === 0}
      />
      {hasMore && <StObserveContainer ref={observerTargetRef} />}
    </>
  );
};

export default MainPage;
