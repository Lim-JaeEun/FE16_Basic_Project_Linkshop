import styled from 'styled-components';

import Card from './Card';
import NoSearchResult from './NoSearchResult';

const CardListWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex-wrap: wrap;

  @media (min-width: 768px) {
    gap: 16px;
  }

  @media (min-width: 1024px) {
    flex-direction: row;
    justify-content: flex-start;
    gap: 24px;
  }
`;

function CardList({ cardData, isLoading, onClick: handleClick }) {
  if (!isLoading && cardData.length === 0) {
    return <NoSearchResult />;
  }

  return (
    <CardListWrapper>
      {cardData.map(cardItem => (
        <Card
          key={cardItem.id}
          name={cardItem.name}
          userId={cardItem.userId}
          imageUrl={cardItem.shop.imageUrl}
          likes={cardItem.likes}
          isLiked={false}
          onClick={handleClick}
          productsCount={cardItem.productsCount}
          productImageSrcs={cardItem.products.map(product => product.imageUrl)}
        />
      ))}
    </CardListWrapper>
  );
}

export default CardList;
